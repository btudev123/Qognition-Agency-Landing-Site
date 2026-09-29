import { SERVICES } from '../services';

/** Legacy capability coverage, not an endorsement of every historical claim.
 * Old URLs are preserved. These mappings organize the complete existing catalog
 * under the new four-pillar positioning without multiplying duplicate pages. */
const categoryPillar: Record<string,string> = {
  strategy: 'account-based-marketing', 'branding-creative': 'demand-generation',
  'web-development': 'demand-generation', seo: 'ai-search', 'ai-seo': 'ai-search',
  ppc: 'demand-generation', content: 'demand-generation', smm: 'demand-generation',
  video: 'demand-generation', 'email-automation': 'revenue-systems', 'cro-analytics': 'revenue-systems',
};
const override: Record<string,string> = {
  'marketing-audit': 'revenue-systems', 'customer-journey-mapping': 'revenue-systems',
  'channel-budget-planning': 'demand-generation', 'fractional-cmo': 'revenue-systems',
  'go-to-market-strategy': 'demand-generation', 'page-speed-optimization': 'ai-search',
  'web-performance': 'ai-search', 'cms-migration': 'ai-search', 'nextjs-seo': 'ai-search',
  'headless-cms': 'ai-search', 'accessibility-wcag': 'revenue-systems',
  'landing-page-cro': 'revenue-systems', 'paid-media-analytics': 'revenue-systems',
  'email-campaign-management': 'demand-generation', 'newsletter-management': 'demand-generation',
  'email-deliverability': 'account-based-marketing', 'social-listening': 'account-based-marketing',
};

export const legacyGrowthServiceMappings = SERVICES.flatMap((category) => (category.subServices || [])
  // A legacy mapping is keyed by slug; an entry without one cannot resolve to a
  // pillar or a URL, so it is excluded rather than coerced to an empty string.
  .filter((service): service is typeof service & { slug: string } => Boolean(service.slug))
  .map((service) => ({
  id: `${category.id}:${service.slug}`, name: service.name, slug: service.slug,
  legacyCategoryId: category.id, legacyCategoryName: category.title,
  legacyPath: `/services/${category.id}/${service.slug}`,
  pillarId: override[service.slug] || categoryPillar[category.id],
  canonicalPillarPath: `/growth/services/${override[service.slug] || categoryPillar[category.id]}`,
  scope: ['packaging-design','social-commerce','amazon-ads','google-shopping-ads','shopify-development','ecommerce-web-design','mobile-app-development'].includes(service.slug) ? 'Context-dependent supporting capability; confirm B2B fit and delivery scope.' : 'Supporting capability within an agreed growth engagement.',
})));
