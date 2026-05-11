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
  ['scalable-seo-pages', 'scalable SEO pages', 'companies launching useful landing page systems'],
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
  const alternatives = TOOLS.filter((candidate) => candidate.id !== tool.id && candidate.category === tool.category)
    .slice(0, 3)
    .map((candidate) => candidate.name);
  const serviceId = serviceForProfile(profileSlug, tool.relatedServiceId);
  const profileSentence = `${tool.name} is strongest for ${audience} when the team has a clear owner, clean data inputs, and a measurable conversion or visibility goal.`;

  return {
    ...tool,
    id: `${tool.id}-${profileSlug}`,
    slug: `${tool.id}-${profileSlug}`,
    categorySlug,
    name: `${tool.name} for ${profileName}`,
    shortDescription: `${tool.name} evaluated for ${profileName}.`,
    fullDescription: `${tool.fullDescription}\n\nThis directory profile focuses on how ${tool.name} supports ${audience}. ${profileSentence} Qognition reviews fit, implementation effort, SEO impact, data needs, and the kind of marketing stack where the product makes sense.`,
    tags: Array.from(new Set([...tool.tags, profileName, 'Qognition Directory'])).slice(0, 5),
    agencyVerdict: `${tool.agencyVerdict} For ${profileName}, we judge it by setup speed, integration depth, reporting clarity, and whether it improves measurable pipeline or organic visibility.`,
    relatedServiceId: serviceId,
    source: 'generated',
    profileSlug,
    profileName,
    audience,
    bestFor: [
      audience,
      `teams that already use ${tool.category.toLowerCase()} tools`,
      `operators who need ${profileName} workflows tied to reporting`
    ],
    useCases: [
      `Build a repeatable ${profileName} workflow with documented inputs and outputs.`,
      `Connect ${tool.name} to analytics, CRM, or content operations so performance can be measured.`,
      `Use ${tool.name} as a specialist layer beside Qognition's ${serviceId.replace(/-/g, ' ')} execution.`
    ],
    pros: [
      `Strong fit for ${profileName} when the use case is specific.`,
      `Clear role inside a modern ${tool.category.toLowerCase()} stack.`,
      `Can support faster execution when paired with documented process.`
    ],
    cons: [
      'Results depend on data quality and team ownership.',
      'The tool alone will not fix weak positioning, poor tracking, or thin content.',
      'Implementation can drift without a clear reporting cadence.'
    ],
    alternatives,
    implementationSteps: [
      `Define the exact ${profileName} workflow and success metric.`,
      `Connect source data, permissions, tracking, and approval steps before scaling.`,
      `Run a small pilot, document outputs, then expand to more campaigns or pages.`,
      `Review quality weekly and retire workflows that do not create pipeline or visibility.`
    ],
    workflowExample: `A practical ${profileName} workflow starts with a weekly brief, uses ${tool.name} to accelerate research or production, pushes outputs into a review queue, and measures the impact in search visibility, qualified leads, or campaign efficiency.`,
    seoNotes: `For SEO teams, ${tool.name} should support original content, better internal links, cleaner workflows, or stronger proof. Avoid publishing generic AI output or near-duplicate pages just because the tool makes them easy to produce.`,
    faqs: [
      {
        question: `Is ${tool.name} good for ${profileName}?`,
        answer: `${tool.name} can be useful for ${profileName} when it is tied to a clear workflow, quality control, and measurable business outcome.`
      },
      {
        question: `What should teams check before adopting ${tool.name}?`,
        answer:
          'Check integrations, data ownership, reporting, pricing at scale, user permissions, and whether the tool improves an existing bottleneck.'
      },
      {
        question: `Does Qognition implement ${tool.name}?`,
        answer:
          'Qognition helps clients evaluate, integrate, and operationalize growth tools when they support SEO, paid media, content, automation, or conversion goals.'
      }
    ]
  };
};

export const DIRECTORY_PRODUCTS: DirectoryProduct[] = TOOLS.flatMap((tool) =>
  PRODUCT_PROFILES.map((profile) => buildProduct(tool, profile))
);

export const getDirectoryProduct = (categorySlug: string, productSlug: string) =>
  DIRECTORY_PRODUCTS.find((product) => product.categorySlug === categorySlug && product.slug === productSlug);

export const getDirectoryProductsByCategory = (categorySlug?: string) =>
  categorySlug ? DIRECTORY_PRODUCTS.filter((product) => product.categorySlug === categorySlug) : DIRECTORY_PRODUCTS;
