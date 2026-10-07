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
  const profileSentence = `For ${audience}, start by checking whether ${tool.name} has capabilities relevant to the task. A directory category match does not establish suitability.`;

  return {
    ...tool,
    id: `${tool.id}-${profileSlug}`,
    slug: `${tool.id}-${profileSlug}`,
    categorySlug,
    name: `${tool.name} for ${profileName}`,
    shortDescription: `${tool.name} evaluated for ${profileName}.`,
    fullDescription: `${tool.fullDescription}\n\nThis profile provides evaluation questions for ${profileName}. ${profileSentence} Assess implementation effort, data handling, integration limits and how you would verify a useful outcome.`,
    tags: Array.from(new Set([...tool.tags, profileName, 'Qognition Directory'])).slice(0, 5),
    agencyVerdict: `${tool.agencyVerdict} For a possible ${profileName} use case, first verify feature fit. This generated profile is a planning reference, not a hands-on review, endorsement or record of Qognition implementation.`,
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
      `Check whether ${tool.name} supports the required data inputs, integrations and exports.`,
      `Evaluate the tool separately from the service scope; confirm who would own setup, review and ongoing operation.`
    ],
    pros: [
      `A defined ${profileName} task makes a small evaluation easier to assess.`,
      `Documented inputs and outputs help determine whether the tool belongs in your workflow.`,
      `A trial can reveal review effort and operating limits before a wider commitment.`
    ],
    cons: [
      'Results depend on data quality and team ownership.',
      'The tool alone will not fix weak positioning, poor tracking, or thin content.',
      'Implementation can drift without a clear reporting cadence.'
    ],
    alternatives,
    implementationSteps: [
      `Define the exact ${profileName} workflow and success metric.`,
      `Verify supported capabilities, permissions, tracking and approval requirements before connecting data.`,
      `Run a small pilot, document outputs, then expand to more campaigns or pages.`,
      `Review quality weekly and retire workflows that do not create pipeline or visibility.`
    ],
    workflowExample: `An evaluation for ${profileName} starts with a defined task and representative inputs. If ${tool.name} supports the task, trial it with limited permissions, inspect the outputs and compare effort and quality with your current process. No integration or performance outcome is assumed.`,
    seoNotes: `A tool may have no direct SEO role. Evaluate ${tool.name} only where its verified capabilities address a concrete requirement. Search content still needs useful expertise, supporting evidence and editorial review.`,
    faqs: [
      {
        question: `Is ${tool.name} good for ${profileName}?`,
        answer: `This profile does not establish that ${tool.name} supports ${profileName}. Check the current vendor documentation against the exact task, then evaluate a small example before committing.`
      },
      {
        question: `What should teams check before adopting ${tool.name}?`,
        answer:
          'Check integrations, data ownership, reporting, pricing at scale, user permissions, and whether the tool improves an existing bottleneck.'
      },
      {
        question: `Does Qognition implement ${tool.name}?`,
        answer:
          'Implementation is not implied by inclusion in this directory. Send your requirements so we can assess fit, relevant experience, access needs and delivery responsibilities before proposing any work.'
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
