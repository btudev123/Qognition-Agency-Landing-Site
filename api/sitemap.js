export default async function handler(request, response) {
  const baseUrl = 'https://qognitionagency.com';
  
  // Cache for 24 hours (86400 seconds), allow stale serve while revalidating
  response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  
  // 1. Define Static Core Routes
  const staticPages = [
    '',
    '/services',
    '/work',
    '/regions',
    '/about',
    '/contact',
    '/directory',
    '/industries'
  ];

  try {
    // 2. Fetch Dynamic Topics for Programmatic SEO
    const API_KEY = process.env.PH_API_KEY || "7F2ibwHqAZ82bsGNiIhZADWvF7sc2pqt3QQK-gAs55c";
    const API_SECRET = process.env.PH_API_SECRET || "bQ7BWD2gdTSy1e1LCg-1b2eGYqFfWKaf0Jn3adYI2RI";

    // Get Token
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
    const accessToken = tokenData.access_token;

    // Fetch Topics
    const topicsQuery = `
      query {
        topics(first: 50, order: FOLLOWERS_COUNT) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `;

    let dynamicTopics = [];
    if (accessToken) {
      const graphRes = await fetch("https://api.producthunt.com/v2/api/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ query: topicsQuery })
      });
      const graphData = await graphRes.json();
      dynamicTopics = graphData?.data?.topics?.edges?.map(edge => edge.node.slug) || [];
    }

    // 3. Construct XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${baseUrl}${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>${url === '' ? '1.0' : '0.8'}</priority>
            </url>
          `;
        })
        .join('')}
      ${dynamicTopics
        .map((slug) => {
          return `
            <url>
              <loc>${baseUrl}/directory/${slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;

    response.setHeader('Content-Type', 'text/xml');
    response.write(sitemap);
    response.end();

  } catch (e) {
    console.error(e);
    response.status(500).json({ error: 'Error generating sitemap' });
  }
}