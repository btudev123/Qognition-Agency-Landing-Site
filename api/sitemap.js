
export default async function handler(request, response) {
  const baseUrl = 'https://qognitionagency.com';
  
  // Cache for 24 hours to maximize performance
  response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  
  // --- 1. CORE STATIC PAGES (Priority: 1.0 - 0.9) ---
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

  const services = ['seo', 'smm', 'ai-seo', 'web-development', 'ppc'];
  const industries = ['law-legal', 'financial-services', 'ecommerce', 'saas-tech', 'healthcare', 'real-estate'];
  const regions = ['usa', 'uk', 'uae-ksa', 'india', 'australia'];
  const caseStudies = ['fintech-scale', 'saas-brand', 'retail-ai'];
  
  // --- 2. STATIC FALLBACK TOOLS (Guaranteed Indexing) ---
  // These ensures we have high-quality tools even if the API times out.
  const popularTools = [
    'slack', 'notion', 'figma', 'linear', 'zoom', 'discord', 'chatgpt', 'midjourney',
    'canva', 'airtable', 'loom', 'zapier', 'webflow', 'framer', 'shopify', 'stripe',
    'intercom', 'hubspot', 'salesforce', 'mailchimp', 'typeform', 'calendly', 'substack',
    'obsidian', 'roam-research', 'trello', 'asana', 'monday', 'clickup', 'basecamp',
    'jira', 'github', 'gitlab', 'bitbucket', 'docker', 'kubernetes', 'aws', 'vercel',
    'netlify', 'supabase', 'firebase', 'mongodb', 'postgresql', 'redis', 'graphql',
    'apollo', 'react', 'vue', 'angular', 'svelte', 'nextjs', 'nuxtjs', 'gatsby',
    'tailwind', 'bootstrap', 'material-ui', 'ant-design', 'chakra-ui', 'radix-ui',
    'storybook', 'jest', 'cypress', 'playwright', 'selenium', 'puppeteer', 'webpack',
    'vite', 'rollup', 'parcel', 'esbuild', 'babel', 'typescript', 'eslint', 'prettier',
    'vscode', 'intellij', 'sublime-text', 'atom', 'vim', 'emacs', 'terminal', 'iterm2',
    'postman', 'insomnia', 'swagger', 'ngrok', 'sentry', 'datadog', 'new-relic',
    'splunk', 'elk', 'prometheus', 'grafana', 'terraform', 'ansible', 'chef', 'puppet',
    'jenkins', 'circleci', 'travis-ci', 'github-actions', 'gitlab-ci', 'bitbucket-pipelines'
  ];

  try {
    // --- 3. DYNAMIC DATA FETCHING ---
    const API_KEY = process.env.PH_API_KEY || "7F2ibwHqAZ82bsGNiIhZADWvF7sc2pqt3QQK-gAs55c";
    const API_SECRET = process.env.PH_API_SECRET || "bQ7BWD2gdTSy1e1LCg-1b2eGYqFfWKaf0Jn3adYI2RI";

    let phTopics = [];
    let phTools = [];

    // Authenticate
    const tokenRes = await fetch("https://api.producthunt.com/v2/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: API_KEY,
        client_secret: API_SECRET,
        grant_type: "client_credentials",
      }),
    });

    if (tokenRes.ok) {
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        // QUERY 1: Fetch Top 500 Topics (These are all valid directory pages)
        // This is the key to high page count. Every topic is a page.
        const topicsQuery = `
          query {
            topics(first: 100, order: FOLLOWERS_COUNT) {
                edges { node { slug } }
            }
          }
        `;
        
        // QUERY 2: Fetch Trending Tools
        const toolsQuery = `
          query {
            posts(first: 50, order: RANKING) {
              edges { node { slug topics(first: 1) { edges { node { slug } } } } }
            }
          }
        `;

        const fetchGraph = async (query) => {
            const res = await fetch("https://api.producthunt.com/v2/api/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
                body: JSON.stringify({ query })
            });
            return await res.json();
        };

        const [topicsData, toolsData] = await Promise.all([
            fetchGraph(topicsQuery),
            fetchGraph(toolsQuery)
        ]);

        // Process Topics
        if (topicsData?.data?.topics?.edges) {
            phTopics = topicsData.data.topics.edges.map(e => e.node.slug);
        }

        // Process Dynamic Tools
        if (toolsData?.data?.posts?.edges) {
            phTools = toolsData.data.posts.edges.map(e => ({
                id: e.node.slug,
                category: e.node.topics.edges[0]?.node.slug || 'tech'
            }));
        }
    }

    // Combine Dynamic Tools with Static Fallback Tools
    // We map static tools to a generic 'tech' category if we don't know it, 
    // the frontend handles redirect/fetching anyway.
    const allToolsMap = new Map();
    
    // Add dynamic tools first
    phTools.forEach(t => allToolsMap.set(t.id, t));

    // Add static fallback tools (deduplicated)
    popularTools.forEach(slug => {
        if (!allToolsMap.has(slug)) {
            allToolsMap.set(slug, { id: slug, category: 'software' });
        }
    });

    const finalToolList = Array.from(allToolsMap.values());

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
      
      <!-- 1. Core Pages -->
      ${staticPages.map(page => generateUrl(page, page === '' ? '1.0' : '0.9')).join('')}

      <!-- 2. Services (High Priority) -->
      ${services.map(slug => generateUrl(`/services/${slug}`, '0.9')).join('')}

      <!-- 3. Industries -->
      ${industries.map(slug => generateUrl(`/industries/${slug}`, '0.8')).join('')}

      <!-- 4. Regions -->
      ${regions.map(slug => generateUrl(`/regions/${slug}`, '0.8')).join('')}

      <!-- 5. Case Studies -->
      ${caseStudies.map(slug => generateUrl(`/work/${slug}`, '0.8')).join('')}

      <!-- 6. Directory Topics (Category Pages - High Volume) -->
      <!-- We have fetched 100+ topics, creating 100+ landing pages -->
      ${phTopics.map(slug => generateUrl(`/directory/${slug}`, '0.7', 'daily')).join('')}

      <!-- 7. Tools Pages (The Long Tail) -->
      <!-- Combining API results + Static Fallback list to ensure ~200-300 tool pages minimum -->
      ${finalToolList.map(tool => generateUrl(`/directory/${tool.category}/${tool.id}`, '0.6', 'weekly')).join('')}

    </urlset>`;

    response.setHeader('Content-Type', 'text/xml');
    response.write(sitemap);
    response.end();

  } catch (e) {
    console.error("Sitemap Generation Error", e);
    // Emergency Fallback
    response.setHeader('Content-Type', 'text/xml');
    response.write(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${baseUrl}</loc></url></urlset>`);
    response.end();
  }
}
