
import { createHmac } from "node:crypto";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const API_KEY = Deno.env.get("TWITTER_API_KEY")?.trim();
const API_SECRET = Deno.env.get("TWITTER_API_SECRET")?.trim();
const ACCESS_TOKEN = Deno.env.get("TWITTER_ACCESS_TOKEN")?.trim();
const ACCESS_TOKEN_SECRET = Deno.env.get("TWITTER_ACCESS_TOKEN_SECRET")?.trim();
const MESSARI_API_KEY = Deno.env.get("MESSARI_API_KEY");

// Twitter OAuth functions
function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string
): string {
  const signatureBaseString = `${method}&${encodeURIComponent(
    url
  )}&${encodeURIComponent(
    Object.entries(params)
      .sort()
      .map(([k, v]) => `${k}=${v}`)
      .join("&")
  )}`;
  
  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;
  const hmacSha1 = createHmac("sha1", signingKey);
  return hmacSha1.update(signatureBaseString).digest("base64");
}

function generateOAuthHeader(method: string, url: string): string {
  const oauthParams = {
    oauth_consumer_key: API_KEY!,
    oauth_nonce: Math.random().toString(36).substring(2),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: ACCESS_TOKEN!,
    oauth_version: "1.0",
  };

  const signature = generateOAuthSignature(
    method,
    url,
    oauthParams,
    API_SECRET!,
    ACCESS_TOKEN_SECRET!
  );

  return "OAuth " + Object.entries({
    ...oauthParams,
    oauth_signature: signature,
  })
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
    .join(", ");
}

async function postTweet(content: string) {
  const url = "https://api.twitter.com/2/tweets";
  const method = "POST";
  
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: generateOAuthHeader(method, url),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: content }),
  });

  if (!response.ok) {
    throw new Error(`Failed to post tweet: ${await response.text()}`);
  }

  return response.json();
}

async function analyzeSolanaData() {
  // Fetch data from multiple Messari endpoints
  const endpoints = [
    "https://data.messari.io/api/v1/assets/sol/metrics/market-data",
    "https://data.messari.io/api/v1/news",
    "https://data.messari.io/api/v1/assets/sol/metrics"
  ];

  const responses = await Promise.all(
    endpoints.map(endpoint =>
      fetch(endpoint, {
        headers: {
          "x-messari-api-key": MESSARI_API_KEY!
        }
      })
    )
  );

  const [marketData, news, metrics] = await Promise.all(
    responses.map(r => r.json())
  );

  // Analyze for security insights
  const securityInsights = [];

  // Check for unusual price movements
  const priceChange24h = marketData.data?.market_data?.percent_change_24h;
  if (Math.abs(priceChange24h) > 10) {
    securityInsights.push(`🚨 Significant price movement detected: ${priceChange24h.toFixed(2)}% in 24h`);
  }

  // Analyze news for security-related content
  const securityNews = news.data?.filter((item: any) => {
    const text = (item.title + " " + item.content).toLowerCase();
    return text.includes("hack") || 
           text.includes("security") || 
           text.includes("vulnerability") ||
           text.includes("exploit");
  }) || [];

  if (securityNews.length > 0) {
    securityInsights.push(`📰 ${securityNews.length} security-related news items in the last 24h`);
  }

  // Generate tweet thread
  const tweetThread = [
    "🔒 Solana Security Insights\n\n" +
    `Current Status:\n` +
    `Price: $${marketData.data?.market_data?.price_usd.toFixed(2)}\n` +
    `24h Change: ${priceChange24h.toFixed(2)}%\n\n` +
    `${securityInsights.join("\n")}`,
  ];

  // Add security news summary if any
  if (securityNews.length > 0) {
    tweetThread.push(
      "🔍 Recent Security Events:\n\n" +
      securityNews.slice(0, 3).map((news: any) => 
        `• ${news.title}`
      ).join("\n")
    );
  }

  // Post tweet thread
  const tweets = [];
  for (const tweet of tweetThread) {
    const result = await postTweet(tweet);
    tweets.push(result);
  }

  return {
    insights: securityInsights,
    tweets,
    data: {
      marketData: marketData.data,
      securityNews,
      metrics: metrics.data
    }
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!API_KEY || !API_SECRET || !ACCESS_TOKEN || !ACCESS_TOKEN_SECRET) {
      throw new Error("Twitter credentials not configured");
    }

    if (!MESSARI_API_KEY) {
      throw new Error("Messari API key not configured");
    }

    const analysis = await analyzeSolanaData();
    
    return new Response(
      JSON.stringify(analysis),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});
