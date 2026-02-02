export default async function handler(request, response) {
  const baseUrl = 'https://qognitionagency.com';
  
  // Cache for 24 hours to reduce API load
  response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  
  // --- 1. CORE STATIC PAGES ---
  const staticPages = [
    '',
    '/services',
    '/work',
    '/regions',
    '/about',
    '/contact',
    '/directory',
    '/industries',
    '/llm'
  ];

  // --- 2. INTERNAL DYNAMIC DATA ---
  const services = ['seo', 'smm', 'ai-seo', 'web-development', 'ppc'];
  const industries = ['law-legal', 'financial-services', 'ecommerce', 'saas-tech', 'healthcare', 'real-estate'];
  const regions = ['usa', 'uk', 'uae-ksa', 'india', 'australia'];
  const caseStudies = ['fintech-scale', 'saas-brand', 'retail-ai'];
  const toolCategories = ['llms', 'engineering', 'marketing', 'design', 'social', 'finance', 'ai-agents'];

  try {
    // --- 3. EXTERNAL DYNAMIC DATA (Product Hunt) ---
    const API_KEY = process.env.PH_API_KEY || "7F2ibwHqAZ82bsGNiIhZADWvF7sc2pqt3QQK-gAs55c";
    const API_SECRET = process.env.PH_API_SECRET || "bQ7BWD2gdTSy1e1LCg-1b2eGYqFfWKaf0Jn3adYI2RI";

    // A. Authenticate
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

    let phTopics = [];
    let phTools = [];

    if (accessToken) {
        // Query 1: Top 100 Topics & 100 Trending Posts
        const trendingQuery = `
          query {
            topics(first: 100, order: FOLLOWERS_COUNT) {
              edges { node { slug } }
            }
            posts(first: 100, order: RANKING) {
              edges {
                node {
                  id
                  topics(first: 1) { edges { node { slug } } }
                }
              }
            }
          }
        `;

        // Query 2: Top 100 Newest Posts (to maximize coverage)
        const newestQuery = `
          query {
            posts(first: 100, order: NEWEST) {
              edges {
                node {
                  id
                  topics(first: 1) { edges { node { slug } } }
                }
              }
            }
          }
        `;

        // Run fetches in parallel for speed
        const [trendingRes, newestRes] = await Promise.all([
            fetch("https://api.producthunt.com/v2/api/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
                body: JSON.stringify({ query: trendingQuery })
            }),
            fetch("https://api.producthunt.com/v2/api/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
                body: JSON.stringify({ query: newestQuery })
            })
        ]);

        const trendingData = await trendingRes.json();
        const newestData = await newestRes.json();

        // Extract Topics
        phTopics = trendingData?.data?.topics?.edges?.map(edge => edge.node.slug) || [];

        // Combine Tools and Deduplicate by ID
        const trendingTools = trendingData?.data?.posts?.edges?.map(edge => edge.node) || [];
        const newestTools = newestData?.data?.posts?.edges?.map(edge => edge.node) || [];
        
        const allToolsRaw = [...trendingTools, ...newestTools];
        const uniqueTools = new Map();
        
        allToolsRaw.forEach(tool => {
            if (!uniqueTools.has(tool.id)) {
                uniqueTools.set(tool.id, {
                    id: tool.id,
                    category: tool.topics.edges[0]?.node.slug || 'tech'
                });
            }
        });
        
        phTools = Array.from(uniqueTools.values());
    }

    // --- 4. BUILD XML ---
    const generateUrl = (loc, priority = '0.8', freq = 'weekly') => `
      <url>
        <loc>${baseUrl}${loc}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${freq}</changefreq>
        <priority>${priority}</priority>
      </url>
    `;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      
      <!-- Static Pages -->
      ${staticPages.map(page => generateUrl(page, page === '' ? '1.0' : '0.9')).join('')}

      <!-- Services -->
      ${services.map(slug => generateUrl(`/services/${slug}`, '0.9')).join('')}

      <!-- Industries -->
      ${industries.map(slug => generateUrl(`/industries/${slug}`, '0.8')).join('')}

      <!-- Regions -->
      ${regions.map(slug => generateUrl(`/regions/${slug}`, '0.8')).join('')}

      <!-- Case Studies -->
      ${caseStudies.map(slug => generateUrl(`/work/${slug}`, '0.8')).join('')}

      <!-- Directory Categories (Internal) -->
      ${toolCategories.map(slug => generateUrl(`/directory/${slug}`, '0.8', 'daily')).join('')}

      <!-- Directory Topics (Product Hunt - Programmatic) -->
      ${phTopics.map(slug => generateUrl(`/directory/${slug}`, '0.7', 'daily')).join('')}

      <!-- Directory Tools (Product Hunt - Specific Tools) -->
      ${phTools.map(tool => generateUrl(`/directory/${tool.category}/${tool.id}`, '0.6', 'weekly')).join('')}

    </urlset>`;

    response.setHeader('Content-Type', 'text/xml');
    response.write(sitemap);
    response.end();

  } catch (e) {
    console.error(e);
    // Fallback XML to prevent 500 errors
    response.setHeader('Content-Type', 'text/xml');
    response.write(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${baseUrl}</loc></url></urlset>`);
    response.end();
  }
}