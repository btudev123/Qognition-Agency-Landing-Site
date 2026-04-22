export default async function handler(request, response) {
  // Ideally, move these to Vercel Environment Variables in your dashboard
  const API_KEY = process.env.PH_API_KEY || "7F2ibwHqAZ82bsGNiIhZADWvF7sc2pqt3QQK-gAs55c";
  const API_SECRET = process.env.PH_API_SECRET || "bQ7BWD2gdTSy1e1LCg-1b2eGYqFfWKaf0Jn3adYI2RI";
  
  // Cache successful responses for 1 hour
  response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  try {
    // 1. Get Access Token (Server-to-Server)
    const tokenRes = await fetch("https://api.producthunt.com/v2/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: API_KEY,
        client_secret: API_SECRET,
        grant_type: "client_credentials",
      }),
    });

    const tokenData = await tokenRes.json();
    
    if (!tokenData.access_token) {
        throw new Error("Failed to authenticate with Product Hunt");
    }

    // 2. Execute GraphQL Query
    const { query, variables } = request.body;
    
    const graphRes = await fetch("https://api.producthunt.com/v2/api/graphql", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenData.access_token}`
      },
      body: JSON.stringify({ query, variables })
    });

    const data = await graphRes.json();
    response.status(200).json(data);

  } catch (error) {
    console.error("API Proxy Error:", error);
    response.status(500).json({ error: "Failed to fetch data from Product Hunt" });
  }
}