
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
  // Skip Twitter posting if API keys aren't configured
  if (!API_KEY || !API_SECRET || !ACCESS_TOKEN || !ACCESS_TOKEN_SECRET) {
    console.log("Twitter API keys not configured, skipping tweet");
    return { text: content, id: "mock-id" };
  }

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

  const headers: HeadersInit = {};
  if (MESSARI_API_KEY) {
    headers["x-messari-api-key"] = MESSARI_API_KEY;
  }

  const responses = await Promise.all(
    endpoints.map(endpoint =>
      fetch(endpoint, { headers })
    )
  );

  const [marketData, news, metrics] = await Promise.all(
    responses.map(r => r.json())
  );

  // Analyze for security insights
  const securityInsights = [];

  // Check for unusual price movements
  const priceChange24h = marketData.data?.market_data?.percent_change_24h || 0;
  if (Math.abs(priceChange24h) > 10) {
    securityInsights.push({
      type: "Unusual Price Movement",
      description: `Significant price movement detected: ${priceChange24h.toFixed(2)}% in 24h. Large price swings can indicate market manipulation or liquidity issues.`,
      severity: Math.abs(priceChange24h) > 20 ? "high" : "medium"
    });
  }

  // Analyze news for security-related content
  const securityNews = news.data?.filter((item: any) => {
    const text = ((item.title || "") + " " + (item.content || "")).toLowerCase();
    return text.includes("hack") || 
           text.includes("security") || 
           text.includes("vulnerability") ||
           text.includes("exploit");
  }) || [];

  if (securityNews.length > 0) {
    securityInsights.push({
      type: "Security News Detected",
      description: `${securityNews.length} security-related news items in the last 24h. Monitor these developments closely.`,
      severity: securityNews.length > 3 ? "high" : "medium"
    });
  }

  // Check for unusual transaction volume
  const txVolume = metrics.data?.transaction_volume?.volume_last_24_hours;
  const avgVolume = metrics.data?.transaction_volume?.volume_last_24_hours_overstatement_multiple;
  
  if (txVolume && avgVolume && txVolume > avgVolume * 1.5) {
    securityInsights.push({
      type: "High Transaction Volume",
      description: `Transaction volume is significantly above average. This could indicate increased on-chain activity or potential security events.`,
      severity: "medium"
    });
  }

  // Check for market concentration/whale activity
  const supply = metrics.data?.supply;
  if (supply && supply.circulating_supply && supply.supply_distribution && supply.supply_distribution.top_10_accounts > 0.5) {
    securityInsights.push({
      type: "High Concentration Risk",
      description: `More than 50% of supply is concentrated in top 10 accounts. This centralization poses governance and market risks.`,
      severity: "critical"
    });
  }

  // If no insights were found, add a baseline security status
  if (securityInsights.length === 0) {
    securityInsights.push({
      type: "Normal Security Status",
      description: "No significant security issues detected at this time.",
      severity: "low"
    });
  }

  return {
    insights: securityInsights,
    marketData: marketData.data,
    securityNews,
    metrics: metrics.data
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json().catch(() => ({}));
    const skipTweet = requestData.skipTweet === true;
    
    const analysis = await analyzeSolanaData();
    
    // Post tweets if not skipped and Twitter is configured
    const tweets = [];
    if (!skipTweet && API_KEY && API_SECRET && ACCESS_TOKEN && ACCESS_TOKEN_SECRET) {
      // Generate tweet thread content
      const tweetContent = "🔒 Solana Security Insights\n\n" +
        `Current Status:\n` +
        `${analysis.insights.map((insight: any) => 
          `• ${insight.type}: ${insight.severity.toUpperCase()}`
        ).join("\n")}`;

      try {
        const tweetResult = await postTweet(tweetContent);
        tweets.push(tweetResult);
      } catch (error) {
        console.error("Failed to post tweet:", error);
      }
    }
    
    return new Response(
      JSON.stringify({ ...analysis, tweets }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );
  } catch (error: any) {
    console.error("Error in analyze-and-tweet function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});
