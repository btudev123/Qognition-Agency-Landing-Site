import { BLOG_POSTS } from '../data/blog';
import { DIRECTORY_PRODUCTS } from '../data/directoryProducts';
import { INDUSTRIES } from '../data/industries';
import { LOCATIONS } from '../data/locations';
import { REGIONS } from '../data/regions';
import { SERVICES } from '../data/services';
import { CASE_STUDIES } from '../data/work';
import { TOOL_CATEGORIES } from '../constants';
import { SITE_URL } from './seo';

export type SitemapEntry = {
  path: string;
  priority?: number;
  changefreq?: 'daily' | 'weekly' | 'monthly';
};

const today = new Date().toISOString();

export const sitemapIndexes = [
  'core',
  'services',
  'industries',
  'locations',
  'programmatic',
  'blog',
  'directory'
];

export const coreRoutes = (): SitemapEntry[] => [
  { path: '/', priority: 1, changefreq: 'weekly' },
  { path: '/services', priority: 0.95, changefreq: 'weekly' },
  { path: '/industries', priority: 0.95, changefreq: 'weekly' },
  { path: '/locations', priority: 0.95, changefreq: 'weekly' },
  { path: '/regions', priority: 0.85, changefreq: 'monthly' },
  { path: '/work', priority: 0.85, changefreq: 'monthly' },
  { path: '/directory', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/llm', priority: 0.7, changefreq: 'monthly' },
  { path: '/sitemap', priority: 0.4, changefreq: 'monthly' },
  ...REGIONS.map((region) => ({ path: `/regions/${region.slug}`, priority: 0.75, changefreq: 'monthly' as const })),
  ...CASE_STUDIES.map((study) => ({ path: `/work/${study.id}`, priority: 0.7, changefreq: 'monthly' as const }))
];

export const serviceRoutes = (): SitemapEntry[] =>
  SERVICES.map((service) => ({ path: `/services/${service.id}`, priority: 0.95, changefreq: 'weekly' }));

export const industryRoutes = (): SitemapEntry[] => [
  ...INDUSTRIES.map((industry) => ({ path: `/industries/${industry.id}`, priority: 0.9, changefreq: 'weekly' as const })),
  ...INDUSTRIES.flatMap((industry) =>
    industry.subIndustries.map((subIndustry) => ({
      path: `/industries/${industry.id}/${subIndustry.slug}`,
      priority: 0.86,
      changefreq: 'weekly' as const
    }))
  )
];

export const locationRoutes = (): SitemapEntry[] =>
  LOCATIONS.map((location) => ({ path: `/locations/${location.slug}`, priority: 0.88, changefreq: 'weekly' }));

export const programmaticRoutes = (): SitemapEntry[] => [
  ...LOCATIONS.flatMap((location) =>
    SERVICES.map((service) => ({
      path: `/locations/${location.slug}/${service.id}`,
      priority: 0.82,
      changefreq: 'weekly' as const
    }))
  ),
  ...SERVICES.flatMap((service) =>
    INDUSTRIES.map((industry) => ({
      path: `/services/${service.id}/industries/${industry.id}`,
      priority: 0.8,
      changefreq: 'weekly' as const
    }))
  )
];

export const blogRoutes = (): SitemapEntry[] =>
  BLOG_POSTS.map((post) => ({ path: `/blog/${post.id}`, priority: 0.7, changefreq: 'monthly' }));

export const directoryRoutes = (): SitemapEntry[] => [
  ...TOOL_CATEGORIES.map((category) => ({ path: `/directory/${category.slug}`, priority: 0.78, changefreq: 'weekly' as const })),
  ...DIRECTORY_PRODUCTS.map((product) => ({
    path: `/directory/${product.categorySlug}/${product.slug}`,
    priority: 0.72,
    changefreq: 'monthly' as const
  }))
];

export const routesForSitemap = (name: string): SitemapEntry[] => {
  const map: Record<string, () => SitemapEntry[]> = {
    core: coreRoutes,
    services: serviceRoutes,
    industries: industryRoutes,
    locations: locationRoutes,
    programmatic: programmaticRoutes,
    blog: blogRoutes,
    directory: directoryRoutes
  };

  return map[name]?.() || [];
};

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

export const renderUrlSet = (entries: SitemapEntry[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${SITE_URL}${entry.path === '/' ? '' : entry.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq || 'weekly'}</changefreq>
    <priority>${(entry.priority || 0.7).toFixed(2)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
