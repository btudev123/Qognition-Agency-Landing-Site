import { getPublishedInsightPaths } from '../data/growth-insights';
import { getGrowthSitemapEntries } from './growth/publication';
import { getPublishedLocalePaths } from './growth-locales';
import { isLegacyIndexable, isExistingRedirect } from './legacy-publication';
import { BLOG_POSTS } from '../data/blog';
import { B2B_MOFU_PAGES } from '../data/b2bPages';
import { DIRECTORY_PRODUCTS } from '../data/directoryProducts';
import { GLOBAL_MARKETS, LANGUAGE_SEO_PAGES } from '../data/internationalSeo';
import { INDUSTRIES } from '../data/industries';
import { isPublishedIndustry, isPublishedSubIndustry } from './industryPublication';
import { b2bSitemapPaths } from './b2b/registry';
import { LOCATIONS } from '../data/locations';
import { REGIONS } from '../data/regions';
import { COMPARISONS, FREE_TOOLS, GLOSSARY_TERMS, RESOURCES, SERVICE_SUB_PAGES } from '../data/seoExpansion';
import { SERVICES, LOCATION_MATRIX_SERVICES } from '../data/services';
// `SERVICES` collides with the marketing services above — these are the three case-study
// service keys ('ai-seo' | 'ppc' | 'social'), not the site's service pages.
import { CASE_STUDIES, NICHES, SERVICES as CASE_STUDY_SERVICES, STATES } from '../data/case-studies';
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

const xml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');

// Partition discovery by page family. Sitemap order does not control rankings.
export const sitemapIndexes = [
  'growth',
  'insights',
  'translations',
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
  { path: '/', priority: 1.0, changefreq: 'weekly', title: 'Qognition — AI-native B2B Growth' },
  { path: '/about', priority: 0.82, changefreq: 'monthly', title: 'About Qognition' },
  { path: '/team', priority: 0.74, changefreq: 'monthly', title: 'Our Team' },
  { path: '/process', priority: 0.78, changefreq: 'monthly', title: 'How We Work' },
  { path: '/pricing', priority: 0.90, changefreq: 'weekly', title: 'Tailored Growth Engagements' },
  { path: '/book', priority: 0.88, changefreq: 'weekly', title: 'Book a Strategy Call' },
  { path: '/contact', priority: 0.82, changefreq: 'monthly', title: 'Contact Qognition' },
  { path: '/case-studies', priority: 0.88, changefreq: 'monthly', title: 'Case Studies' },
  { path: '/blog', priority: 0.82, changefreq: 'weekly', title: 'Blog' },
  { path: '/resources', priority: 0.86, changefreq: 'weekly', title: 'Resources' },
  { path: '/comparisons', priority: 0.84, changefreq: 'weekly', title: 'Agency Comparisons' },
  { path: '/free-ai-audit', priority: 0.94, changefreq: 'weekly', title: 'AI Search Visibility Report' },
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
    { path: '/marketing/book', priority: 0.88, changefreq: 'weekly', title: 'Book a Marketing Strategy Call' },
    { path: '/marketing/pricing', priority: 0.88, changefreq: 'weekly', title: 'Marketing Pricing' },
    { path: '/tech', priority: 0.93, changefreq: 'weekly', title: 'Revenue-Focused Engineering' },
    { path: '/tech/book', priority: 0.86, changefreq: 'weekly', title: 'Book a Tech Scoping Call' },
    { path: '/tech/pricing', priority: 0.86, changefreq: 'weekly', title: 'Tech Pricing' },
    { path: '/finance', priority: 0.90, changefreq: 'weekly', title: 'Financial Operations for Founders' },
    { path: '/finance/book', priority: 0.84, changefreq: 'weekly', title: 'Book a Finance Discovery Call' },
    { path: '/finance/pricing', priority: 0.84, changefreq: 'weekly', title: 'Finance Pricing' },
    { path: '/automation', priority: 0.92, changefreq: 'weekly', title: 'AI Agents & Intelligent Automation' },
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

/* Gated by lib/industryPublication.ts. Before that gate existed, adding a row to
   INDUSTRIES put an indexable page in the sitemap at priority 0.90 with no
   review step anywhere in between, which is how 2,161 location pages happened.
   The allowlist currently contains every live URL, so this filter removes
   nothing today; it removes everything added tomorrow without a decision. */
export const industryRoutes = (): SitemapEntry[] => [
  /* Published B2B entities. This was exported from lib/b2b/registry.ts and called
     from nowhere, so a `published` promotion would have produced a page that is
     index:true, absent from the sitemap, and absent from every internal link,
     with every gate green. Owen found it.

     It contributes ZERO entries today because publishedEntities() is empty, and
     scripts/check-industry-gate.cjs asserts the sitemap total, so the wiring is
     provably inert until someone deliberately promotes something. */
  ...b2bSitemapPaths().map((path) => ({
    path,
    priority: 0.90,
    changefreq: 'weekly' as const,
  })),
  ...INDUSTRIES.filter((industry) => isPublishedIndustry(industry.id)).map((industry) => ({
    path: `/industries/${industry.id}`,
    priority: 0.90,
    changefreq: 'weekly' as const,
    title: industry.name,
  })),
  ...INDUSTRIES.flatMap((industry) =>
    industry.subIndustries
      .filter((subIndustry) => isPublishedSubIndustry(industry.id, subIndustry.slug))
      .map((subIndustry) => ({
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
    LOCATION_MATRIX_SERVICES.map((service) => ({
      path: `/locations/${location.slug}/${service.id}`,
      priority: 0.80,
      changefreq: 'weekly' as const,
    }))
  ),
  /* SERVICES x INDUSTRIES. This is the multiplying term and the reason the gate
     matters more here than anywhere else: one unreviewed industry row becomes
     eleven indexable service-by-industry URLs, each with an interpolated meta
     title. CLAUDE.md §11 forbids the pattern by name. */
  ...SERVICES.flatMap((service) =>
    INDUSTRIES.filter((industry) => isPublishedIndustry(industry.id)).map((industry) => ({
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

export const caseStudyRoutes = (): SitemapEntry[] => [
  { path: '/case-studies/methodology', priority: 0.7, changefreq: 'monthly' },
  ...NICHES.map((niche) => ({
    path: `/case-studies/industry/${niche}`,
    priority: 0.78,
    changefreq: 'monthly' as const,
  })),
  ...CASE_STUDY_SERVICES.map((service) => ({
    path: `/case-studies/service/${service}`,
    priority: 0.78,
    changefreq: 'monthly' as const,
  })),
  ...STATES.map((state) => ({
    path: `/case-studies/location/${state.code.toLowerCase()}`,
    priority: 0.74,
    changefreq: 'monthly' as const,
  })),
  ...CASE_STUDIES.map((study) => ({
    path: `/case-studies/${study.id}`,
    priority: 0.82,
    changefreq: 'monthly' as const,
    title: study.headline,
    imageUrl: `${SITE_URL}${study.image.src}`,
    imageTitle: study.image.alt,
  })),
];

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
    insights: () => getPublishedInsightPaths().map(path => ({path, lastmod:'2026-09-24'})),
    growth: () => getGrowthSitemapEntries().map(page => ({path: page.path, lastmod: page.lastModified})),
    translations: () => getPublishedLocalePaths().map(path => ({path, lastmod: '2026-09-24'})),
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
  return (map[name]?.() || []).filter((entry, index, all) => isLegacyIndexable(entry.path) && !isExistingRedirect(entry.path) && all.findIndex(other => other.path === entry.path) === index);
};

const hasImages = (entries: SitemapEntry[]) => entries.some((e) => e.imageUrl);
const hasNews = (entries: SitemapEntry[]) => entries.some((e) => e.publishedAt);

export const renderSitemapIndex = () => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexes
  .map(
    (name) => `  <sitemap>
    <loc>${SITE_URL}/sitemaps/${name}.xml</loc>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

export const renderUrlSet = (entries: SitemapEntry[]) => {
  const withImages = hasImages(entries);
  const withNews = false;

  const namespaces = [
    'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    withImages ? 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : '',
    withNews ? 'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"' : '',
  ].filter(Boolean).join('\n        ');

  const urlNodes = entries.filter(entry => isLegacyIndexable(entry.path) && !isExistingRedirect(entry.path))
    .map((entry) => {
      const imageBlock =
        entry.imageUrl
          ? `
    <image:image>
      <image:loc>${xml(entry.imageUrl)}</image:loc>${entry.imageTitle ? `\n      <image:title>${entry.imageTitle.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</image:title>` : ''}
    </image:image>`
          : '';

      const newsBlock = '';

      return `  <url>
    <loc>${xml(SITE_URL + (entry.path === '/' ? '' : entry.path))}</loc>${entry.lastmod ? `\n    <lastmod>${xml(entry.lastmod)}</lastmod>` : ''}
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
