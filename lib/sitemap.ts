import { BLOG_POSTS } from '../data/blog';
import { B2B_MOFU_PAGES } from '../data/b2bPages';
import { DIRECTORY_PRODUCTS } from '../data/directoryProducts';
import { GLOBAL_MARKETS, LANGUAGE_SEO_PAGES } from '../data/internationalSeo';
import { INDUSTRIES } from '../data/industries';
import { LOCATIONS } from '../data/locations';
import { REGIONS } from '../data/regions';
import { COMPARISONS, FREE_TOOLS, GLOSSARY_TERMS, RESOURCES, SERVICE_SUB_PAGES } from '../data/seoExpansion';
import { SERVICES } from '../data/services';
import { CASE_STUDIES } from '../data/work';
import { TOOL_CATEGORIES } from '../constants';
import { SITE_URL } from './seo';

export type SitemapEntry = {
  path: string;
  priority?: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastmod?: string;
  title?: string;
  imageUrl?: string;
  imageTitle?: string;
  publishedAt?: string;
};

const today = new Date().toISOString();

// Ordered by content importance for LLM/SEO crawl budget
export const sitemapIndexes = [
  'spokes',       // highest value — operating partner core pages
  'core',         // hub pages, audits, conversion
  'services',     // service pages
  'case-studies', // proof / E-E-A-T
  'blog',         // topical authority / LLM training
  'industries',   // vertical coverage
  'locations',    // geographic coverage
  'comparisons',  // high-intent competitor capture
  'resources',    // tools + calculators
  'tools',        // free tools
  'programmatic', // location×service matrix
  'directory',    // software profiles
  'glossary',     // semantic entity graph
  'global',       // international
  'languages',    // i18n
];

export const coreRoutes = (): SitemapEntry[] => [
  { path: '/', priority: 1.0, changefreq: 'weekly', title: 'Qognition — The Operating Partner for Founders' },
  { path: '/about', priority: 0.82, changefreq: 'monthly', title: 'About Qognition' },
  { path: '/team', priority: 0.74, changefreq: 'monthly', title: 'Our Team' },
  { path: '/process', priority: 0.78, changefreq: 'monthly', title: 'How We Work' },
  { path: '/pricing', priority: 0.90, changefreq: 'weekly', title: 'Transparent Pricing' },
  { path: '/book', priority: 0.88, changefreq: 'weekly', title: 'Book a Strategy Call' },
  { path: '/contact', priority: 0.82, changefreq: 'monthly', title: 'Contact Qognition' },
  { path: '/case-studies', priority: 0.88, changefreq: 'monthly', title: 'Case Studies' },
  { path: '/blog', priority: 0.82, changefreq: 'weekly', title: 'Blog' },
  { path: '/resources', priority: 0.86, changefreq: 'weekly', title: 'Resources' },
  { path: '/comparisons', priority: 0.84, changefreq: 'weekly', title: 'Agency Comparisons' },
  { path: '/free-seo-audit', priority: 0.94, changefreq: 'weekly', title: 'Free SEO Audit' },
  { path: '/free-ai-audit', priority: 0.92, changefreq: 'weekly', title: 'Free AI Search Audit' },
  { path: '/free-llm-audit', priority: 0.92, changefreq: 'weekly', title: 'Free LLM Visibility Audit' },
  { path: '/branding-audit', priority: 0.88, changefreq: 'weekly', title: 'Free Branding Audit' },
  { path: '/social-media-audit', priority: 0.88, changefreq: 'weekly', title: 'Free Social Media Audit' },
  { path: '/free-tools', priority: 0.86, changefreq: 'weekly', title: 'Free Marketing Tools' },
  { path: '/glossary', priority: 0.80, changefreq: 'weekly', title: 'Marketing Glossary' },
  { path: '/services', priority: 0.92, changefreq: 'weekly', title: 'All Services' },
  { path: '/industries', priority: 0.90, changefreq: 'weekly', title: 'Industries We Serve' },
  { path: '/locations', priority: 0.90, changefreq: 'weekly', title: 'Locations' },
  { path: '/regions', priority: 0.82, changefreq: 'monthly', title: 'Global Regions' },
  { path: '/global', priority: 0.84, changefreq: 'weekly', title: 'Global Markets' },
  { path: '/languages', priority: 0.80, changefreq: 'weekly', title: 'Language Support' },
  { path: '/directory', priority: 0.86, changefreq: 'weekly', title: 'Growth Stack Directory' },
  { path: '/lead-generation-roadmap', priority: 0.84, changefreq: 'monthly', title: 'Lead Generation Roadmap' },
  { path: '/backlink-authority-roadmap', priority: 0.74, changefreq: 'monthly', title: 'Backlink Authority Roadmap' },
  { path: '/llm', priority: 0.72, changefreq: 'monthly', title: 'LLM Transparency' },
  { path: '/docs/api', priority: 0.44, changefreq: 'monthly', title: 'API Documentation' },
  { path: '/sitemap', priority: 0.42, changefreq: 'monthly', title: 'HTML Sitemap' },
  ...B2B_MOFU_PAGES.map((page) => ({
    path: `/${page.slug}`,
    priority: 0.84,
    changefreq: 'monthly' as const,
  })),
  ...REGIONS.map((region) => ({
    path: `/regions/${region.slug}`,
    priority: 0.76,
    changefreq: 'monthly' as const,
  })),
];

export const spokeRoutes = (): SitemapEntry[] => {
  const spokeSubServices: Record<string, string[]> = {
    marketing: ['seo', 'ai-seo', 'paid-media', 'content', 'email-lifecycle', 'brand-strategy', 'visual-identity', 'cro', 'social'],
    tech: ['websites', 'web-apps', 'mobile-app-development', 'ai-agents', 'ecommerce', 'nextjs-seo', 'integrations', 'performance', 'mvp'],
    finance: ['bookkeeping', 'tax', 'fractional-cfo', 'payroll', 'financial-reporting', 'cash-flow'],
    automation: ['ai-agents', 'workflow-automation', 'integrations', 'data-pipelines', 'crm-automation', 'no-code-stack'],
  };

  const spokeHubs: SitemapEntry[] = [
    { path: '/marketing', priority: 0.96, changefreq: 'weekly', title: 'AI-Native Growth Marketing' },
    { path: '/marketing/audit', priority: 0.97, changefreq: 'weekly', title: 'Free Marketing + AI Search Audit' },
    { path: '/marketing/book', priority: 0.88, changefreq: 'weekly', title: 'Book a Marketing Strategy Call' },
    { path: '/marketing/pricing', priority: 0.88, changefreq: 'weekly', title: 'Marketing Pricing' },
    { path: '/tech', priority: 0.93, changefreq: 'weekly', title: 'Revenue-Focused Engineering' },
    { path: '/tech/audit', priority: 0.94, changefreq: 'weekly', title: 'Free Tech + Performance Audit' },
    { path: '/tech/book', priority: 0.86, changefreq: 'weekly', title: 'Book a Tech Scoping Call' },
    { path: '/tech/pricing', priority: 0.86, changefreq: 'weekly', title: 'Tech Pricing' },
    { path: '/finance', priority: 0.90, changefreq: 'weekly', title: 'Financial Operations for Founders' },
    { path: '/finance/audit', priority: 0.91, changefreq: 'weekly', title: 'Free Finance Health Check' },
    { path: '/finance/book', priority: 0.84, changefreq: 'weekly', title: 'Book a Finance Discovery Call' },
    { path: '/finance/pricing', priority: 0.84, changefreq: 'weekly', title: 'Finance Pricing' },
    { path: '/automation', priority: 0.92, changefreq: 'weekly', title: 'AI Agents & Intelligent Automation' },
    { path: '/automation/audit', priority: 0.93, changefreq: 'weekly', title: 'Free Automation Opportunity Map' },
    { path: '/automation/book', priority: 0.86, changefreq: 'weekly', title: 'Book an Automation Strategy Call' },
    { path: '/automation/pricing', priority: 0.86, changefreq: 'weekly', title: 'Automation Pricing' },
  ];

  const subServices: SitemapEntry[] = [];
  for (const [spoke, services] of Object.entries(spokeSubServices)) {
    for (const service of services) {
      subServices.push({
        path: `/${spoke}/${service}`,
        priority: 0.88,
        changefreq: 'weekly',
      });
    }
  }

  return [...spokeHubs, ...subServices];
};

export const serviceRoutes = (): SitemapEntry[] => [
  ...SERVICES.map((service) => ({
    path: `/services/${service.id}`,
    priority: 0.92,
    changefreq: 'weekly' as const,
    title: service.title,
  })),
  ...SERVICE_SUB_PAGES.map((page) => ({
    path: `/services/${page.serviceId}/${page.slug}`,
    priority: 0.86,
    changefreq: 'weekly' as const,
  })),
];

export const industryRoutes = (): SitemapEntry[] => [
  ...INDUSTRIES.map((industry) => ({
    path: `/industries/${industry.id}`,
    priority: 0.90,
    changefreq: 'weekly' as const,
    title: industry.name,
  })),
  ...INDUSTRIES.flatMap((industry) =>
    industry.subIndustries.map((subIndustry) => ({
      path: `/industries/${industry.id}/${subIndustry.slug}`,
      priority: 0.84,
      changefreq: 'weekly' as const,
      title: subIndustry.name,
    }))
  ),
];

export const locationRoutes = (): SitemapEntry[] =>
  LOCATIONS.map((location) => ({
    path: `/locations/${location.slug}`,
    priority: 0.88,
    changefreq: 'weekly',
    title: `Digital Marketing Agency in ${location.name}`,
  }));

export const programmaticRoutes = (): SitemapEntry[] => [
  ...LOCATIONS.flatMap((location) =>
    SERVICES.map((service) => ({
      path: `/locations/${location.slug}/${service.id}`,
      priority: 0.80,
      changefreq: 'weekly' as const,
    }))
  ),
  ...SERVICES.flatMap((service) =>
    INDUSTRIES.map((industry) => ({
      path: `/services/${service.id}/industries/${industry.id}`,
      priority: 0.78,
      changefreq: 'weekly' as const,
    }))
  ),
];

export const blogRoutes = (): SitemapEntry[] =>
  BLOG_POSTS.map((post) => {
    let publishedAt: string | undefined;
    if (post.date) {
      try {
        const d = new Date(post.date);
        if (!isNaN(d.getTime())) publishedAt = d.toISOString().split('T')[0];
      } catch {
        // ignore unparseable dates
      }
    }
    return {
      path: `/blog/${post.id}`,
      priority: 0.74,
      changefreq: 'monthly' as const,
      title: post.title,
      imageUrl: post.image?.startsWith('http') ? post.image : post.image ? `${SITE_URL}${post.image}` : undefined,
      imageTitle: post.title,
      publishedAt,
    };
  });

export const resourceRoutes = (): SitemapEntry[] =>
  RESOURCES.map((resource) => ({
    path: resource.href || `/${resource.slug}`,
    priority: 0.82,
    changefreq: 'monthly',
  }));

export const caseStudyRoutes = (): SitemapEntry[] =>
  CASE_STUDIES.map((study) => ({
    path: `/case-studies/${study.id}`,
    priority: 0.82,
    changefreq: 'monthly',
    title: study.title,
    imageUrl: study.image?.startsWith('http') ? study.image : study.image ? `${SITE_URL}${study.image}` : undefined,
    imageTitle: study.title,
  }));

export const glossaryRoutes = (): SitemapEntry[] =>
  GLOSSARY_TERMS.map((term) => ({
    path: `/glossary/${term.slug}`,
    priority: 0.68,
    changefreq: 'monthly',
    title: term.term || term.slug,
  }));

export const comparisonRoutes = (): SitemapEntry[] =>
  COMPARISONS.map((comparison) => ({
    path: `/comparisons/${comparison.slug}`,
    priority: 0.80,
    changefreq: 'monthly',
    title: comparison.title || comparison.slug,
  }));

export const toolRoutes = (): SitemapEntry[] =>
  FREE_TOOLS.map((tool) => ({
    path: `/free-tools/${tool.slug}`,
    priority: 0.82,
    changefreq: 'monthly',
    title: tool.title || tool.slug,
  }));

export const globalRoutes = (): SitemapEntry[] =>
  GLOBAL_MARKETS.map((market) => ({
    path: `/global/${market.slug}`,
    priority: 0.80,
    changefreq: 'monthly',
    title: market.country,
  }));

export const languageRoutes = (): SitemapEntry[] =>
  LANGUAGE_SEO_PAGES.map((language) => ({
    path: `/languages/${language.slug}`,
    priority: 0.76,
    changefreq: 'monthly',
    title: language.language,
  }));

export const directoryRoutes = (): SitemapEntry[] => [
  ...TOOL_CATEGORIES.map((category) => ({
    path: `/directory/${category.slug}`,
    priority: 0.78,
    changefreq: 'weekly' as const,
    title: category.name,
  })),
  ...DIRECTORY_PRODUCTS.map((product) => ({
    path: `/directory/${product.categorySlug}/${product.slug}`,
    priority: 0.72,
    changefreq: 'monthly' as const,
    title: product.name,
    imageUrl: product.imageUrl?.startsWith('http') ? product.imageUrl : undefined,
    imageTitle: product.name,
  })),
];

export const routesForSitemap = (name: string): SitemapEntry[] => {
  const map: Record<string, () => SitemapEntry[]> = {
    core: coreRoutes,
    spokes: spokeRoutes,
    services: serviceRoutes,
    industries: industryRoutes,
    locations: locationRoutes,
    programmatic: programmaticRoutes,
    blog: blogRoutes,
    directory: directoryRoutes,
    resources: resourceRoutes,
    'case-studies': caseStudyRoutes,
    glossary: glossaryRoutes,
    comparisons: comparisonRoutes,
    tools: toolRoutes,
    global: globalRoutes,
    languages: languageRoutes,
  };
  return map[name]?.() || [];
};

const hasImages = (entries: SitemapEntry[]) => entries.some((e) => e.imageUrl);
const hasNews = (entries: SitemapEntry[]) => entries.some((e) => e.publishedAt);

export const renderSitemapIndex = () => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexes
  .map(
    (name) => `  <sitemap>
    <loc>${SITE_URL}/sitemaps/${name}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

export const renderUrlSet = (entries: SitemapEntry[]) => {
  const withImages = hasImages(entries);
  const withNews = hasNews(entries);

  const namespaces = [
    'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    withImages ? 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : '',
    withNews ? 'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"' : '',
  ].filter(Boolean).join('\n        ');

  const urlNodes = entries
    .map((entry) => {
      const imageBlock =
        entry.imageUrl
          ? `
    <image:image>
      <image:loc>${entry.imageUrl}</image:loc>${entry.imageTitle ? `\n      <image:title>${entry.imageTitle.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</image:title>` : ''}
    </image:image>`
          : '';

      const newsBlock =
        entry.publishedAt && entry.title
          ? `
    <news:news>
      <news:publication>
        <news:name>Qognition Agency</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${entry.publishedAt}</news:publication_date>
      <news:title>${entry.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</news:title>
    </news:news>`
          : '';

      return `  <url>
    <loc>${SITE_URL}${entry.path === '/' ? '' : entry.path}</loc>
    <lastmod>${entry.lastmod || today}</lastmod>
    <changefreq>${entry.changefreq || 'weekly'}</changefreq>
    <priority>${(entry.priority || 0.7).toFixed(2)}</priority>${imageBlock}${newsBlock}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset ${namespaces}>
${urlNodes}
</urlset>`;
};
