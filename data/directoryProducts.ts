import { DirectoryProduct, Tool } from '../types';
import { TOOLS } from './tools';

const CATEGORY_SLUGS: Record<string, string> = {
  'LLMs & AI Models': 'llm',
  'Engineering & Dev': 'engineering',
  'Marketing & Sales': 'marketing',
  'Design & Creative': 'design',
  'Social & Community': 'social',
  'Finance & Ops': 'finance',
  'AI Agents': 'ai-agents'
};

const PRODUCT_PROFILES = [
  ['ai-content-workflows', 'AI content workflows', 'teams building search-ready content systems'],
  ['seo-automation', 'SEO automation', 'growth teams automating technical and content SEO'],
  ['local-seo', 'local SEO', 'service businesses competing in local markets'],
  ['programmatic-seo', 'programmatic SEO', 'companies launching scalable landing page systems'],
  ['conversion-rate-optimization', 'conversion rate optimization', 'teams improving landing page performance'],
  ['b2b-lead-generation', 'B2B lead generation', 'sales teams building predictable pipeline'],
  ['saas-growth', 'SaaS growth', 'software teams scaling qualified demos'],
  ['ecommerce-growth', 'e-commerce growth', 'commerce brands improving acquisition and retention'],
  ['paid-search', 'paid search', 'marketers optimizing high-intent Google Ads traffic'],
  ['paid-social', 'paid social', 'teams running Meta, LinkedIn, and TikTok campaigns'],
  ['analytics-reporting', 'analytics reporting', 'operators centralizing campaign intelligence'],
  ['crm-automation', 'CRM automation', 'sales and marketing teams reducing manual work'],
  ['email-marketing', 'email marketing', 'lifecycle teams building smarter nurture journeys'],
  ['cold-outreach', 'cold outreach', 'B2B teams personalizing outbound at scale'],
  ['social-media-management', 'social media management', 'brands publishing consistently across channels'],
  ['linkedin-growth', 'LinkedIn growth', 'founders and executives building authority'],
  ['ai-agents', 'AI agents', 'teams delegating repeatable research and operations'],
  ['marketing-ops', 'marketing operations', 'teams connecting data, tools, and workflows'],
  ['web-development', 'web development', 'engineering teams shipping faster websites'],
  ['nextjs-development', 'Next.js development', 'teams building fast, indexable web apps'],
  ['landing-pages', 'landing pages', 'marketers creating high-converting campaign pages'],
  ['technical-seo', 'technical SEO', 'teams fixing crawl, rendering, and performance issues'],
  ['enterprise-seo', 'enterprise SEO', 'large sites managing complex organic growth'],
  ['ai-search-visibility', 'AI search visibility', 'brands preparing for answer engines and LLM citations'],
  ['content-briefs', 'content briefs', 'editors improving search intent coverage'],
  ['keyword-research', 'keyword research', 'teams finding high-value search demand'],
  ['competitive-intelligence', 'competitive intelligence', 'operators tracking market moves'],
  ['creative-production', 'creative production', 'teams scaling design and ad assets'],
  ['video-marketing', 'video marketing', 'brands producing short-form and social creative'],
  ['design-systems', 'design systems', 'product teams standardizing UI delivery'],
  ['productivity', 'productivity', 'teams reducing repetitive busywork'],
  ['project-management', 'project management', 'teams coordinating delivery and accountability'],
  ['customer-support', 'customer support', 'teams improving response quality and speed'],
  ['reputation-management', 'reputation management', 'local brands growing trust signals'],
  ['review-generation', 'review generation', 'service teams improving Google Business Profile trust'],
  ['international-seo', 'international SEO', 'brands expanding across regions and languages'],
  ['market-research', 'market research', 'strategists validating positioning and demand'],
  ['sales-enablement', 'sales enablement', 'teams turning marketing assets into revenue'],
  ['workflow-automation', 'workflow automation', 'teams connecting tools without friction'],
  ['founder-led-growth', 'founder-led growth', 'founders turning expertise into inbound demand']
] as const;

const serviceForProfile = (profileSlug: string, fallback?: string) => {
  if (profileSlug.includes('seo') || profileSlug.includes('search') || profileSlug.includes('keyword')) return 'seo';
  if (profileSlug.includes('paid') || profileSlug.includes('lead') || profileSlug.includes('sales')) return 'ppc';
  if (profileSlug.includes('social') || profileSlug.includes('video') || profileSlug.includes('linkedin')) return 'smm';
  if (profileSlug.includes('web') || profileSlug.includes('nextjs') || profileSlug.includes('landing')) return 'web-development';
  if (profileSlug.includes('ai') || profileSlug.includes('automation') || profileSlug.includes('research')) return 'ai-seo';
  return fallback || 'seo';
};

const buildProduct = (tool: Tool, profile: (typeof PRODUCT_PROFILES)[number]): DirectoryProduct => {
  const [profileSlug, profileName, audience] = profile;
  const categorySlug = CATEGORY_SLUGS[tool.category] || tool.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return {
    ...tool,
    id: `${tool.id}-${profileSlug}`,
    slug: `${tool.id}-${profileSlug}`,
    categorySlug,
    name: `${tool.name} for ${profileName}`,
    shortDescription: `${tool.name} evaluated for ${profileName}.`,
    fullDescription: `${tool.fullDescription}\n\nThis directory profile focuses on how ${tool.name} supports ${audience}. Qognition reviews fit, implementation effort, SEO impact, data needs, and the kind of marketing stack where the product makes sense.`,
    tags: Array.from(new Set([...tool.tags, profileName, 'Qognition Directory'])).slice(0, 5),
    agencyVerdict: `${tool.agencyVerdict} For ${profileName}, we judge it by setup speed, integration depth, reporting clarity, and whether it improves measurable pipeline or organic visibility.`,
    relatedServiceId: serviceForProfile(profileSlug, tool.relatedServiceId),
    source: 'generated'
  };
};

export const DIRECTORY_PRODUCTS: DirectoryProduct[] = TOOLS.flatMap((tool) =>
  PRODUCT_PROFILES.map((profile) => buildProduct(tool, profile))
);

export const getDirectoryProduct = (categorySlug: string, productSlug: string) =>
  DIRECTORY_PRODUCTS.find((product) => product.categorySlug === categorySlug && product.slug === productSlug);

export const getDirectoryProductsByCategory = (categorySlug?: string) =>
  categorySlug ? DIRECTORY_PRODUCTS.filter((product) => product.categorySlug === categorySlug) : DIRECTORY_PRODUCTS;
