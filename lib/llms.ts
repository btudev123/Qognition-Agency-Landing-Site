// Optional public text index (llmstxt.org format). Google does not use llms.txt
// as a ranking signal and no assistant is known to require it; treat it as a
// compact, consistent self-description, not a lever. Every statement here must
// match what the site, the schema (lib/schema.ts) and the third-party listings
// say. Revised 2026-10-06 (Nadia): the previous header still described the
// retired "AI Search, Demand, ABM and Revenue Systems" positioning and listed
// none of the priority pages.
//
// Rules for editing: no prices (2026-10-03 authority note), no revenue or staff
// band (removed from the site in 468c739), no unsourced number, no office claim
// outside the five confirmed cities (operator via MARS, 2026-10-08), no guarantee. Rollback: git checkout lib/llms.ts.
import { SITE_URL } from './seo';
import { getPublishedGrowthPages } from './growth/publication';
import { ICP_PUBLISHED } from './b2b/icpPublication';
import { resolveIcp } from './b2b/icpRegistry';
import { icpEntityName } from './b2b/icpMetadata';
import { CONTACT_EMAIL, OFFICE_CITIES_TEXT, PHONE_DISPLAY } from '../data/siteConfig';

const u = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

const header = [
  '# Qognition Agency',
  '',
  '> Qognition Agency is a B2B AI search visibility agency. It runs AI SEO, GEO, SEO, local SEO and B2B PPC for established B2B companies, including SaaS, so they can be found when buyers search Google or ask an AI assistant which vendor to hire.',
  '',
  `- Website: ${SITE_URL}`,
  /* Offices, operator via MARS 2026-10-08: city only, no HQ. Other markets are served remotely. */
  `- Offices: ${OFFICE_CITIES_TEXT}. Other markets are served remotely.`,
  `- Contact: ${CONTACT_EMAIL}, ${PHONE_DISPLAY} (phone and WhatsApp)`,
  `- Book a call: ${u('/book')}`,
  '- Also known as: Qognition. The engineering arm is Qognition Labs (qognitionlabs.com), which builds the in-house tools: Scriblr (AI citation and GEO tracking), LinkersPro (authority and link acquisition) and M.A.R.S.',
  '',
];

const definitions = [
  '## What each service covers',
  '',
  '- SEO: Google search results. Technical fixes, service pages, and mentions and links from trusted sites, judged on enquiries.',
  '- Local SEO: Google Maps, local pack, Bing Places, Business Profile, reviews, listings. For firms whose buyers choose suppliers by location.',
  '- AI SEO: Google AI Overviews and AI Mode.',
  '- GEO (generative engine optimization): ChatGPT, Perplexity, Gemini, Claude, Copilot. The work on what these assistants say when a buyer asks them for a supplier.',
  '- B2B PPC: Google Ads, Microsoft Advertising and LinkedIn campaigns, plus Meta ads to past site visitors, scoped and priced separately from search work.',
  '',
  'Clients can start with AI SEO, GEO, SEO, local SEO or PPC alone and add layers as scope grows. Scope is tailored to locations covered, prompts tracked and assets produced. Prices are not published; they are set in a proposal after a call.',
  '',
  '## How evidence is reported',
  '',
  '- Qognition does not guarantee rankings, citations or placement in any AI system. It does not control those systems.',
  '- An AI answer is reported as an observation: platform, date, prompt and what was said. Rankings and AI citations are reported separately.',
  "- Case studies are Qognition client programmes. The four named B2B programmes show funnel results for a stated reporting window, confirmed by each client's own reporting. HVAC, dental and insurance figures are labelled as targets until client reporting confirms a result for a stated period.",
  '',
];

const keyPages = [
  '## Key pages',
  '',
  `- [AI SEO and GEO for B2B](${u('/')}): what the agency does and who it is for.`,
  `- [Digital marketing services](${u('/services')}): AI SEO, GEO, SEO and PPC, plus the content, web and CRO work that supports them.`,
  `- [Enterprise and B2B SEO services](${u('/services/seo')}): SEO for B2B firms, judged on enquiries, not traffic.`,
  `- [AI SEO and GEO services for B2B](${u('/services/ai-seo')}): work on what Google's AI and AI assistants say about a firm. Every answer tested is reported with its question, AI tool and date. No placement is promised.`,
  `- [Generative Engine Optimization (GEO) for B2B firms](${u('/services/ai-seo/generative-engine-optimization')}): the work on ChatGPT, Perplexity, Gemini, Claude and Copilot answers, with a dated record of each one.`,
  `- [Local SEO for B2B companies](${u('/services/seo/local-seo')}): Google Maps and local listings, for firms whose buyers choose by location.`,
  `- [B2B PPC and paid media management](${u('/services/ppc')}): Google Ads and LinkedIn campaigns, judged on qualified enquiries and booked meetings.`,
  `- [B2B content marketing](${u('/services/content')}): commercial pages, expert guides and buyer evidence.`,
  `- [B2B web design and development](${u('/services/web-development')}): crawlable, accessible sites with tracked enquiry paths.`,
  `- [Conversion rate optimization and analytics](${u('/services/cro-analytics')}): enquiry and booking measurement tied to sales outcomes.`,
  `- [B2B branding and creative](${u('/services/branding-creative')}): naming, identity, messaging and sales assets.`,
  `- [Industries](${u('/industries')}): sector pages for B2B buyers.`,
  `- [Case studies](${u('/case-studies')}): four named B2B programmes with dated results confirmed by client reporting, plus HVAC, dental and insurance programmes whose figures stay labelled as targets until client reporting confirms them.`,
  `- [Free AI visibility audit](${u('/free-ai-audit')}): a human-reviewed audit, requested by form. /free-seo-audit redirects here.`,
  `- [How engagements are scoped](${u('/pricing')})`,
  `- [Process](${u('/process')})`,
  `- [About](${u('/about')})`,
  `- [Contact](${u('/contact')})`,
  '',
  '## Markets served',
  '',
  'These pages describe buyer markets. A market page is not an office claim; offices are listed above.',
  '',
  `- [New York](${u('/locations/new-york')})`,
  `- [London](${u('/locations/london')})`,
  `- [Dubai](${u('/locations/dubai')})`,
  `- [Perth](${u('/locations/perth')})`,
  `- [SEO for Perth B2B companies](${u('/locations/perth/seo')})`,
  `- [AI SEO and GEO for Perth B2B companies](${u('/locations/perth/ai-seo')})`,
  '',
];

/** Reviewed ICP pages only. ICP_PUBLISHED is the page-level publication truth. */
const icpLines = () =>
  [...ICP_PUBLISHED.keys()]
    .map((key) => resolveIcp(key.split('/')))
    .filter((record): record is NonNullable<typeof record> => Boolean(record) && record!.state === 'published')
    .map((record) => `- [AI search visibility for ${icpEntityName(record)}](${u(record.href)}): ${record.body.metaDescription}`);

const growthLines = () =>
  getPublishedGrowthPages()
    .filter((p) => ['pillar', 'sector', 'market'].includes(p.kind) && p.publication.indexable)
    .map((p) => `- [${p.title}](${u(p.path)}): ${p.description}`);

export function buildLlmsTxt() {
  const icp = icpLines();
  return [
    ...header,
    ...definitions,
    ...keyPages,
    ...(icp.length ? ['## Industry pages', '', ...icp, ''] : []),
    '## Optional',
    '',
    `- [Guides and insights](${u('/insights')})`,
    ...growthLines(),
    '',
  ].join('\n');
}

export function buildLlmsFullTxt() {
  const icp = icpLines();
  return [
    ...header,
    ...definitions,
    ...keyPages,
    ...(icp.length ? ['## Industry pages', '', ...icp, ''] : []),
    ...getPublishedGrowthPages()
      .filter((p) => p.publication.indexable)
      .flatMap((p) => [`## ${p.title}`, p.description, `URL: ${u(p.path)}`, '']),
  ].join('\n');
}
