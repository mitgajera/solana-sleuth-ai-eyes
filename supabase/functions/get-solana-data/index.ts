
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the API key from Supabase secrets
    const apiKey = Deno.env.get('MESSARI_API_KEY')
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Messari API key not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Parse request to get the data type
    const url = new URL(req.url)
    const dataType = url.searchParams.get('type') || 'transactions'
    
    let endpoint = ''
    
    // Determine which Messari API endpoint to call
    switch(dataType) {
      case 'transactions':
        endpoint = 'https://data.messari.io/api/v1/assets/sol/metrics/market-data'
        break;
      case 'news':
        endpoint = 'https://data.messari.io/api/v1/news'
        break;
      case 'assets':
        endpoint = 'https://data.messari.io/api/v1/assets/sol/metrics'
        break;
      default:
        endpoint = 'https://data.messari.io/api/v1/assets/sol/metrics/market-data'
    }
    
    console.log(`Fetching data from endpoint: ${endpoint}`)
    
    // Call Messari API with the API key
    const response = await fetch(endpoint, {
      headers: {
        'x-messari-api-key': apiKey
      }
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Error: ${response.status} - ${errorText}`)
      return new Response(
        JSON.stringify({ 
          error: `Failed to fetch Messari data: ${response.status}`,
          details: errorText 
        }),
        { 
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    
    const data = await response.json()
    
    // Return the data
    return new Response(
      JSON.stringify(data),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error in Solana data function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
