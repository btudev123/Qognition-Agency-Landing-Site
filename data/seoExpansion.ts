import {
  ComparisonPage,
  FreeToolPage,
  GlossaryTerm,
  ResourceLeadMagnet,
  Service,
  ServiceSubPage,
  SubService,
  TeamMember
} from '../types';
import { INDUSTRIES } from './industries';
import { LOCATIONS } from './locations';
import { hasOffice } from './siteConfig';
import { SERVICES } from './services';
import { RESOURCES_FROM_AUDITS } from './auditOffers';

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const serviceFaq = (topic: string) => [
  {
    question: `How fast can ${topic.toLowerCase()} improve performance?`,
    answer:
      'Timing depends on the starting website, available evidence, implementation access and buying cycle. We agree milestones and review dates; we do not promise a ranking or revenue deadline.'
  },
  {
    question: `Does Qognition handle strategy and execution for ${topic.toLowerCase()}?`,
    answer:
      'The proposal identifies research, implementation, review and reporting responsibilities. Work is scoped to your business problem and existing team.'
  },
  {
    question: `Can ${topic.toLowerCase()} work with an existing internal team?`,
    answer:
      'Yes. Qognition can operate as the strategy lead, embedded execution pod, or specialist layer beside your internal marketing and engineering teams.'
  }
];

/* Title and meta description for a custom entry, built exactly as
   buildGeneratedServiceSubPage builds them. Used where a draft proposed new meta
   that the owner (Nadia, search) has not yet approved: the page body changes,
   the meta stays what the generator would emit. */
const generatedMeta = (serviceId: string, slug: string) => {
  const sub = SERVICES.find((service) => service.id === serviceId)?.subServices.find(
    (item) => (item.slug || slugify(item.name)) === slug
  );
  if (!sub) throw new Error(`generatedMeta: no sub-service ${serviceId}/${slug}`);
  return {
    title: `${sub.name} Services`,
    description: `${sub.description} Part of a scoped B2B program supporting buyer discovery and evaluation.`
  };
};

const CUSTOM_SERVICE_SUB_PAGES: ServiceSubPage[] = [
  {
    serviceId: 'seo',
    slug: 'technical-seo',
    title: 'Technical SEO Services',
    description: 'Technical SEO audits, crawl optimization, Core Web Vitals, indexation, schema, and Next.js rendering fixes.',
    h1: 'Technical SEO Services for Fast, Indexable Websites',
    intro:
      'We fix the crawl, rendering, speed, schema, and architecture issues that stop qualified pages from ranking. The goal is simple: make every important page easy for Google, AI search engines, and users to understand.',
    deliverables: ['Crawl and indexation audit', 'Core Web Vitals roadmap', 'Schema and canonical fixes', 'Next.js rendering review'],
    sections: [
      {
        title: 'Crawl and Rendering Architecture',
        content:
          'We audit status codes, canonical chains, duplicate routes, JavaScript rendering, blocked assets, sitemap coverage, and internal link depth so priority pages are discoverable before any content campaign begins.'
      },
      {
        title: 'Performance and UX Signals',
        content:
          'We prioritize Core Web Vitals, image delivery, route-level payloads, layout stability, and mobile interactions because technical SEO now overlaps heavily with conversion and user trust.'
      },
      {
        title: 'Structured Data and Entity Clarity',
        content:
          'We add Service, FAQPage, BreadcrumbList, Organization, Review, Article, and SoftwareApplication schema where it is useful and truthful, creating cleaner context for search engines and AI answer systems.'
      }
    ],
    faqs: serviceFaq('Technical SEO'),
    relatedLinks: [
      { label: 'Next.js SEO', href: '/services/web-development/nextjs-seo' },
      { label: 'AI Search Visibility', href: '/services/ai-seo/ai-search-visibility' },
      { label: 'AI Search Visibility Report', href: '/free-ai-audit' }
    ]
  },
  {
    serviceId: 'seo',
    slug: 'content-strategy',
    title: 'SEO Content Strategy Services',
    description: 'Search intent research, content briefs, topic clusters, editorial calendars, and content refreshes built for revenue.',
    h1: 'SEO Content Strategy That Builds Qualified Demand',
    intro:
      'We build content systems around buyer intent, internal links, topical authority, and measurable pipeline instead of publishing generic articles that never influence revenue.',
    deliverables: ['Topic cluster map', 'Revenue keyword research', 'Content brief templates', 'Refresh and pruning plan'],
    sections: [
      {
        title: 'Intent Mapping',
        content:
          'Every topic is mapped to awareness, evaluation, buying, or retention intent. This prevents a blog from becoming a traffic vanity project and keeps content tied to sales conversations.'
      },
      {
        title: 'Editorial Systems',
        content:
          'We create repeatable briefs, author rules, SME interview prompts, fact-checking standards, and internal linking maps so teams can publish consistently without losing quality.'
      },
      {
        title: 'Authority Compounding',
        content:
          'The strongest content programs connect glossary pages, service pages, location pages, case studies, tools, and articles into one discoverable knowledge graph.'
      }
    ],
    faqs: serviceFaq('SEO Content Strategy'),
    relatedLinks: [
      { label: 'Content Idea Generator', href: '/free-tools/content-idea-generator' },
      { label: 'Digital Marketing Glossary', href: '/glossary' },
      { label: 'Scalable SEO Pages', href: '/glossary/programmatic-seo' }
    ]
  },
  {
    serviceId: 'seo',
    slug: 'link-building',
    title: 'Authority and Link Building Services',
    description: 'Digital PR, linkable assets, expert commentary, partner links, and authority building without spam.',
    h1: 'Authority Building and Digital PR for Search Growth',
    intro:
      'We build authority through useful assets, expert POVs, partner ecosystems, and credible outreach. No link farms, no spam, and no shortcuts that put your domain at risk.',
    deliverables: ['Authority gap analysis', 'Digital PR angles', 'Linkable asset plan', 'Monthly link quality report'],
    sections: [
      {
        title: 'Linkable Asset Strategy',
        content:
          'Calculators, original research, benchmark reports, glossary hubs, and comparison pages give publishers a real reason to reference your site.'
      },
      {
        title: 'Relevance Over Volume',
        content:
          'We prioritize contextual links from relevant websites, industry publications, partners, communities, and high-quality resource pages over raw link count.'
      },
      {
        title: 'Risk Controls',
        content:
          'Every campaign includes anchor text controls, toxic link monitoring, placement review, and a clear record of outreach work.'
      }
    ],
    faqs: serviceFaq('Link Building'),
    relatedLinks: [
      { label: 'SEO ROI Calculator', href: '/free-tools/seo-roi-calculator' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Digital PR', href: '/glossary/digital-pr' }
    ]
  },
  {
    serviceId: 'ai-seo',
    slug: 'ai-search-visibility',
    title: 'AI Search Visibility Services',
    description: 'AI SEO and GEO for B2B discovery across Google AI Overviews, AI Mode, ChatGPT, Gemini and Perplexity.',
    h1: 'AI Search Visibility for LLMs, AI Overviews, and Answer Engines',
    intro:
      'Search discovery now happens across Google, AI Overviews, ChatGPT, Gemini, Perplexity, and vertical answer engines. We help your brand become easier to cite, summarize, and trust.',
    deliverables: ['Entity audit', 'LLM citation map', 'Answer-ready content briefs', 'Accurate content and supported schema'],
    sections: [
      {
        title: 'Entity and Evidence Layer',
        content:
          'We clarify who you are, what you offer, who you serve, which proof assets support your claims, and how those facts should appear across visible pages, relevant profiles and accurate structured data.'
      },
      {
        title: 'Answer-Ready Content',
        content:
          'We structure pages with direct answers, comparisons, definitions, FAQs, original opinions, and proof blocks so AI systems can extract helpful passages without guessing.'
      },
      {
        title: 'Citation Monitoring',
        content:
          'We record observed brand mentions, competitor citations and cited sources against a defined question set. The observations inform research; they do not reveal the private selection rules of an AI platform.'
      }
    ],
    faqs: serviceFaq('AI Search Visibility'),
    relatedLinks: [
      { label: 'Free AI Audit', href: '/free-ai-audit' },
      { label: 'LLM Transparency', href: '/llm' },
      { label: 'E-E-A-T', href: '/glossary/e-e-a-t' }
    ]
  },
  {
    serviceId: 'ai-seo',
    slug: 'llm-optimization',
    title: 'LLM Optimization Services',
    description: 'AI-search discovery through accessible service information, consistent business facts and useful evidence.',
    h1: 'LLM Optimization for Discoverable Brand Knowledge',
    intro:
      'We organize your website so large language models can understand your services, markets, proof, expertise, and preferred source pages.',
    deliverables: ['Search access review', 'Entity summary pages', 'Structured content blocks', 'Source-of-truth cleanup'],
    sections: [
      {
        title: 'Machine-Readable Positioning',
        content:
          'We create concise, accurate summaries of your services, markets, leadership, verified work, engagement scope and resources.'
      },
      {
        title: 'Prompt Demand Mapping',
        content:
          'We identify prompts your buyers ask AI systems and build content that answers those prompts with credible, internally linked evidence.'
      },
      {
        title: 'Governance',
        content:
          'We keep claims, facts, and proof references consistent so AI systems do not receive conflicting signals across the site.'
      }
    ],
    faqs: serviceFaq('LLM Optimization'),
    relatedLinks: [
      { label: 'AI Search Strategy', href: '/services/ai-seo/ai-search-visibility' },
      { label: 'llm.txt', href: '/llm' },
      { label: 'Resources', href: '/resources' }
    ]
  },
  {
    serviceId: 'ppc',
    slug: 'google-ads-management',
    title: 'Google Ads Management Services',
    description: 'Search, Performance Max, Shopping, lead generation, landing pages, tracking, and ROAS optimization.',
    h1: 'Google Ads Management for Qualified Pipeline',
    intro:
      'We build paid search systems around conversion quality, query intent, landing page relevance, budget pacing, and transparent ROAS.',
    deliverables: ['Account audit', 'Keyword and query strategy', 'Landing page plan', 'ROAS reporting dashboard'],
    sections: [
      {
        title: 'Search Intent and Budget Control',
        content:
          'We separate high-intent demand capture from broad prospecting so budgets do not disappear into low-quality clicks.'
      },
      {
        title: 'Landing Page Alignment',
        content:
          'Paid media performs better when the landing page matches the query, offer, proof, and objections behind the click.'
      },
      {
        title: 'Measurement Hygiene',
        content:
          'We review conversion actions, offline imports, CRM stages, UTMs, and attribution settings so reported ROAS reflects business reality.'
      }
    ],
    faqs: serviceFaq('Google Ads Management'),
    relatedLinks: [
      { label: 'Google Ads Budget Calculator', href: '/free-tools/google-ads-budget-calculator' },
      { label: 'ROAS Calculator', href: '/free-tools/roas-calculator' },
      { label: 'PPC Services', href: '/services/ppc' }
    ]
  },
  {
    serviceId: 'ppc',
    slug: 'landing-page-cro',
    title: 'Landing Page CRO Services',
    description: 'Conversion-focused landing pages, experimentation, analytics, copy, UX, and funnel optimization.',
    h1: 'Landing Page CRO for More Leads From Existing Traffic',
    intro:
      'We improve the page experience after the click: message match, proof, friction, speed, forms, offers, analytics, and testing.',
    deliverables: ['Landing page audit', 'Experiment backlog', 'Form and CTA optimization', 'Heatmap and analytics review'],
    sections: [
      {
        title: 'Message Match',
        content:
          'We align ad promise, search intent, page headline, proof, and CTA so visitors understand why they should convert now.'
      },
      {
        title: 'Proof and Friction',
        content:
          'We add case-study evidence, FAQs, clear next steps, field reduction, and trust signals where they reduce buyer anxiety.'
      },
      {
        title: 'Testing Roadmap',
        content:
          'The work is prioritized by expected impact, traffic level, implementation effort, and measurement confidence.'
      }
    ],
    faqs: serviceFaq('Landing Page CRO'),
    relatedLinks: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Google Ads Management', href: '/services/ppc/google-ads-management' },
      { label: 'SEO ROI Calculator', href: '/free-tools/seo-roi-calculator' }
    ]
  },
  {
    serviceId: 'web-development',
    slug: 'nextjs-seo',
    title: 'Next.js SEO Development Services',
    description: 'Next.js App Router SEO, static generation, schema, sitemaps, performance, and scalable landing page architecture.',
    h1: 'Next.js SEO Development for Crawlable Growth Sites',
    intro:
      'We build Next.js websites that are fast, indexable, structured, and ready for scalable SEO pages without relying on client-side rendering for core content.',
    deliverables: ['App Router architecture', 'Static params and metadata', 'Sitemap segmentation', 'Performance optimization'],
    sections: [
      {
        title: 'Server-First SEO',
        content:
          'Important titles, descriptions, canonicals, H1s, body content, links, and JSON-LD are rendered before JavaScript so search engines can understand the page immediately.'
      },
      {
        title: 'Programmatic Route Design',
        content:
          'We model services, industries, locations, tools, glossary terms, and resources as typed data so every URL can be generated, linked, and monitored.'
      },
      {
        title: 'Technical Guardrails',
        content:
          'We validate sitemap URLs, canonical hosts, route params, robots rules, metadata, and duplicate content risk before launch.'
      }
    ],
    faqs: serviceFaq('Next.js SEO'),
    relatedLinks: [
      { label: 'Technical SEO', href: '/services/seo/technical-seo' },
      { label: 'AI Search Visibility Report', href: '/free-ai-audit' },
      { label: 'Website Traffic Estimator', href: '/free-tools/website-traffic-estimator' }
    ]
  },
  {
    serviceId: 'web-development',
    slug: 'conversion-websites',
    title: 'Conversion Website Development',
    description: 'High-performance websites built for leads, SEO, brand trust, analytics, and scalable content operations.',
    h1: 'Conversion Websites Built for Search and Sales',
    intro:
      'We design and build websites that look premium, load quickly, explain the offer clearly, and convert qualified visitors into meetings.',
    deliverables: ['Conversion architecture', 'Design system', 'Next.js build', 'Analytics and CRM handoff'],
    sections: [
      {
        title: 'Lead-Focused Information Architecture',
        content:
          'Service pages, industry pages, location hubs, resources, case studies, pricing, and proof blocks are arranged so visitors can self-qualify quickly.'
      },
      {
        title: 'Design Without SEO Tradeoffs',
        content:
          'The site keeps motion and brand polish, but not at the expense of readable content, clear links, mobile usability, or performance.'
      },
      {
        title: 'Launch and Iteration',
        content:
          'After launch we monitor crawl data, form submissions, analytics, search queries, and conversion paths to prioritize the next improvement.'
      }
    ],
    faqs: serviceFaq('Conversion Website Development'),
    relatedLinks: [
      { label: 'Lead Generation Roadmap', href: '/lead-generation-roadmap' },
      { label: 'Landing Page CRO', href: '/services/ppc/landing-page-cro' },
      { label: 'Case Studies', href: '/case-studies' }
    ]
  },
  {
    serviceId: 'smm',
    slug: 'linkedin-thought-leadership',
    title: 'LinkedIn Thought Leadership Services',
    description: 'Founder-led LinkedIn strategy, executive content, B2B distribution, and authority-building content systems.',
    h1: 'LinkedIn Thought Leadership for B2B Demand',
    intro:
      'We turn leadership expertise into consistent LinkedIn content that supports sales, recruiting, partnerships, and search authority.',
    deliverables: ['Executive POV map', 'Content calendar', 'Repurposing workflow', 'Engagement and pipeline reporting'],
    sections: [
      {
        title: 'Founder-Led Positioning',
        content:
          'We define the opinions, frameworks, stories, and proof points your leadership team should own in market.'
      },
      {
        title: 'Content Repurposing',
        content:
          'Strong LinkedIn posts become blog articles, case-study snippets, newsletter issues, resource pages, and internal links.'
      },
      {
        title: 'Distribution Rhythm',
        content:
          'We balance educational posts, proof posts, teardown posts, product/service POVs, and direct response CTAs.'
      }
    ],
    faqs: serviceFaq('LinkedIn Thought Leadership'),
    relatedLinks: [
      { label: 'Content Strategy', href: '/services/seo/content-strategy' },
      { label: 'Blog', href: '/blog' },
      { label: 'Resources', href: '/resources' }
    ]
  },
  /* docs/copy/2026-10/services-geo.md. Meta pending Nadia, so generatedMeta. */
  {
    serviceId: 'ai-seo',
    slug: 'generative-engine-optimization',
    ...generatedMeta('ai-seo', 'generative-engine-optimization'),
    h1: 'Generative Engine Optimization (GEO) for B2B Firms',
    intro:
      'GEO is the work that affects how ChatGPT, Perplexity, Gemini, Claude and Copilot describe your firm when a buyer asks them for a supplier. It covers what your own site states, what third-party sources say about you, and whether your company name resolves to you. We record every answer with its prompt, platform and date.',
    deliverables: [
      'A prompt set built from your buyers’ real questions',
      'A dated baseline on the assistants we agree for your market',
      'Company-fact fixes across your site, schema and main profiles',
      'A source map: the third-party pages answers cite for your buyers’ questions',
      'Re-runs on the agreed schedule, compared with the baseline',
      'Referral visits and enquiries, reported in their own columns'
    ],
    sections: [
      {
        title: 'What GEO is, and how it differs from AI SEO',
        content:
          'AI SEO is the work on Google AI Overviews and AI Mode. GEO is the work on the assistants. They share foundations, but each assistant searches, selects and cites sources in its own way. So we measure them separately and never merge them into one score.'
      },
      {
        title: 'What we change, and what we can’t',
        content:
          'We can change what your site says and how consistently your company is described, and we can work on whether the sources answers cite describe you accurately. We cannot decide what an assistant says. No one can, so we don’t promise a citation or a date for one.'
      },
      {
        title: 'Why other sites matter',
        content:
          'When an assistant cites sources, they are often directories, trade publications, comparison pages and association listings rather than your own site. We find the sources that appear for your buyers’ questions and work on the ones you can influence honestly: profiles you own, publications that cover your field, listings that are wrong.'
      },
      {
        title: 'How we measure it',
        content:
          'We fix the prompt set and the platforms before the first run. Each answer is recorded with its date and the sources it cited, then re-run on the agreed schedule. A change can be checked against the recorded answer, not taken on trust.'
      }
    ],
    faqs: [
      {
        question: 'Is GEO just SEO with a new name?',
        answer:
          'No. SEO is about Google’s search results. GEO is about what assistants say when someone asks them a question. Good SEO helps, but a page can rank well and still not be cited.'
      },
      {
        question: 'Can you get us recommended by ChatGPT?',
        answer:
          'No one can promise that. We work on what the assistants draw on and record what they say, with dates, so you can see whether it is changing.'
      },
      {
        question: 'Which assistants do you test?',
        answer:
          'ChatGPT, Perplexity, Gemini, Claude and Copilot, plus Google AI Overviews and AI Mode under AI SEO. We agree the set for your market before the first run.'
      },
      {
        question: 'How do you choose the prompts?',
        answer:
          'From your sales team’s questions, your buyers’ language and the comparisons they make. Once agreed, the set stays fixed, so each run compares with the last.'
      }
    ],
    relatedLinks: [
      { label: 'AI SEO and GEO for B2B', href: '/services/ai-seo' },
      { label: 'Answer Engine Optimization (AEO)', href: '/services/ai-seo/answer-engine-optimization' },
      { label: 'AI citation and mention tracking', href: '/services/ai-seo/ai-citation-tracking' },
      { label: 'Request a free AI visibility audit', href: '/free-ai-audit' },
      { label: 'Book a call', href: '/book' }
    ]
  },
  /* docs/copy/2026-10/services-local-seo.md. Meta pending Nadia, so generatedMeta.
     No profile or city page for a place the client has no presence (CLAUDE.md §4). */
  {
    serviceId: 'seo',
    slug: 'local-seo',
    ...generatedMeta('seo', 'local-seo'),
    h1: 'Local SEO for B2B Companies',
    intro:
      'Local SEO is the work on Google Maps, the local pack, Bing Places, your Business Profile, reviews and listings. For a B2B firm it matters when buyers choose by location: a lab within courier range, an MSP that can send an engineer on site, a broker licensed in their state. If location doesn’t shape the decision, we’ll say so.',
    deliverables: [
      'A check of whether location shapes your buyers’ decision at all',
      'Business Profile and Bing Places fixes, for real addresses only',
      'Categories and services that match what you sell to businesses',
      'Consistent name, address and phone across the listings your buyers use',
      'A review request process for real clients, with no incentives',
      'Location pages only where you have a presence or documented demand'
    ],
    sections: [
      {
        title: 'When local matters in B2B',
        content:
          'It matters when the buyer needs you nearby: on-site service, sample delivery, a license that applies in one state, a site visit before a contract. It matters less when you sell software or advice that works anywhere. We check this first, because local work on the wrong firm is wasted effort.'
      },
      {
        title: 'Real locations only',
        content:
          'We set up and fix profiles for addresses where you operate. We don’t create profiles or city pages for places where you have no presence. Listing an office that doesn’t exist misleads buyers.'
      },
      {
        title: 'Reviews from real clients',
        content:
          'A B2B buyer reads reviews for evidence of the work, not star counts. We help you ask real clients at the right moment and reply to every review. We never buy, gate or incentivize reviews.'
      },
      {
        title: 'How we measure it',
        content:
          'Business Profile actions (calls, direction requests and website clicks), rankings in the local pack for the queries that matter, and the enquiries that follow. Each is reported in its own column.'
      }
    ],
    faqs: [
      {
        question: 'Do B2B companies need local SEO?',
        answer:
          'Only when the buyer chooses by location. If your buyers would hire you from anywhere, we’ll put the effort into SEO, AI SEO or GEO instead.'
      },
      {
        question: 'Can you create listings in cities where we don’t have an office?',
        answer:
          'No. A profile needs a real address where you serve clients. We can build market pages that explain how you serve a region remotely, labelled as such.'
      },
      {
        question: 'Does local SEO affect AI answers?',
        answer:
          'Assistants and Google’s AI features can draw on listings, profiles and reviews when a question involves a place. We test those questions separately and report them with dates.'
      },
      {
        question: 'Can we do local SEO without the rest?',
        answer:
          'Yes, if location is what limits your enquiries. On the call, we’ll tell you if something else is holding it back.'
      }
    ],
    relatedLinks: [
      { label: 'B2B SEO services', href: '/services/seo' },
      { label: 'AI SEO and GEO for B2B', href: '/services/ai-seo' },
      { label: 'Perth SEO for B2B companies', href: '/locations/perth/seo' },
      { label: 'Book a call', href: '/book' }
    ]
  }
];

const serviceOutcomeCopy: Record<string, string> = {
  seo: 'qualified organic demand, better indexation, and stronger authority',
  smm: 'consistent social visibility, community trust, and content-assisted pipeline',
  'ai-seo': 'LLM citations, answer-engine visibility, and entity clarity',
  'web-development': 'faster pages, clearer journeys, and higher conversion rates',
  'branding-creative': 'stronger positioning, memorable creative, and better campaign recall',
  ppc: 'lower wasted spend, better lead quality, and measurable revenue efficiency'
};

const buildGeneratedServiceSubPage = (service: Service, subService: SubService): ServiceSubPage => {
  const slug = subService.slug || slugify(subService.name);
  const serviceOutcome = serviceOutcomeCopy[service.id] || 'clearer buyer information and a dependable enquiry journey';
  return {
    serviceId: service.id,
    slug,
    title: `${subService.name} Services`,
    description: `${subService.description} Part of a scoped B2B program supporting buyer discovery and evaluation.`,
    h1: `${subService.name} for B2B Buyer Journeys`,
    intro:
      `${subService.description} We agree how this work supports your buyer journey, which team owns it and how an interested buyer can make contact. Scope and measurement follow the service rather than a fixed package.`,
    deliverables: [
      `${subService.name} audit and opportunity map`,
      'Buyer-intent messaging and page architecture',
      'Implementation sprint plan with ownership',
      'Analytics, reporting, and conversion QA',
      'Internal links to services, industries, locations, case studies, and tools',
      'Schema and crawlability review before launch'
    ],
    sections: [
      {
        title: 'Key Takeaways',
        content:
          `${subService.name} should not operate as an isolated task. It works best when it is tied to a clear offer, a measurable buyer action, and a page or campaign system that compounds over time.`
      },
      {
        title: 'What Qognition Builds',
        content:
          `We connect ${subService.name.toLowerCase()} to ${service.title.toLowerCase()} strategy, content, creative, analytics, and CRM handoff. The intended outcome is ${serviceOutcome}. We review implementation and actual enquiries before drawing conclusions about performance.`
      },
      {
        title: 'How It Gets Discovered',
        content:
          'For web deliverables, review visible content, headings, internal links, canonical metadata and appropriate structured data. Treat search-crawler access and model-training permissions as separate decisions. For off-site assets, connect the relevant content to an accessible source page.'
      },
      {
        title: 'How We Measure It',
        content:
          `The scorecard depends on the channel, but usually includes visibility, qualified traffic, assisted conversions, booked calls, lead quality, conversion rate, revenue influence, and the next highest-impact sprint.`
      }
    ],
    faqs: serviceFaq(subService.name),
    relatedLinks: [
      { label: service.title, href: `/services/${service.id}` },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Locations', href: '/locations' },
      { label: 'Industries', href: '/industries' },
      { label: 'Tools Directory', href: '/directory' },
      { label: 'Book a call', href: '/book' },
      { label: 'Send an enquiry', href: '/contact#enquiry' }
    ]
  };
};

const generatedServiceSubPages = SERVICES.flatMap((service) =>
  service.subServices.map((subService) => buildGeneratedServiceSubPage(service, subService))
);

const customKeys = new Set(CUSTOM_SERVICE_SUB_PAGES.map((page) => `${page.serviceId}/${page.slug}`));

export const SERVICE_SUB_PAGES: ServiceSubPage[] = [
  ...CUSTOM_SERVICE_SUB_PAGES,
  ...generatedServiceSubPages.filter((page) => !customKeys.has(`${page.serviceId}/${page.slug}`))
];

export const getServiceSubPage = (serviceId: string, slug: string) =>
  SERVICE_SUB_PAGES.find((page) => page.serviceId === serviceId && page.slug === slug);

export const getServiceSubPages = (serviceId: string) =>
  SERVICE_SUB_PAGES.filter((page) => page.serviceId === serviceId);

export const RESOURCES: ResourceLeadMagnet[] = RESOURCES_FROM_AUDITS;

export const FREE_TOOLS: FreeToolPage[] = [
  {
    slug: 'seo-roi-calculator',
    title: 'SEO ROI Calculator',
    description: 'Estimate traffic, leads, revenue, and payback period from an SEO investment.',
    h1: 'SEO ROI Calculator',
    intro:
      'Estimate how much revenue SEO could generate from improved rankings, higher traffic, lead conversion, close rate, and average deal value.',
    inputs: ['Monthly organic visits', 'Expected traffic lift', 'Visitor-to-lead conversion rate', 'Close rate', 'Average deal value'],
    outputs: ['Estimated monthly leads', 'Estimated monthly revenue', 'Payback period', 'ROI multiple'],
    useCases: ['Prioritize SEO investment', 'Build a board-level forecast', 'Compare SEO against paid acquisition'],
    faqs: serviceFaq('SEO ROI')
  },
  {
    slug: 'google-ads-budget-calculator',
    title: 'Google Ads Budget Calculator',
    description: 'Estimate monthly Google Ads spend from CPC, conversion rate, target leads, and target ROAS.',
    h1: 'Google Ads Budget Calculator',
    intro:
      'Model how much Google Ads budget you need to hit a lead or revenue target based on CPC, conversion rate, close rate, and deal value.',
    inputs: ['Target leads', 'Average CPC', 'Landing page conversion rate', 'Close rate', 'Average deal value'],
    outputs: ['Recommended monthly spend', 'Expected pipeline', 'Expected ROAS', 'Lead target feasibility'],
    useCases: ['Set launch budgets', 'Pressure-test ROAS targets', 'Compare paid search scenarios'],
    faqs: serviceFaq('Google Ads Budget')
  },
  {
    slug: 'website-traffic-estimator',
    title: 'Website Traffic Estimator',
    description: 'Estimate rough organic traffic potential from keyword demand, ranking position, and click-through rate.',
    h1: 'Website Traffic Estimator',
    intro:
      'Estimate traffic potential for a page or topic cluster using search volume, expected ranking position, and CTR assumptions.',
    inputs: ['Keyword monthly searches', 'Expected ranking position', 'Estimated CTR', 'Number of target pages'],
    outputs: ['Estimated monthly visits', 'Topic cluster traffic', 'Opportunity score'],
    useCases: ['Validate content ideas', 'Estimate location page upside', 'Compare service page opportunities'],
    faqs: serviceFaq('Website Traffic Estimation')
  },
  {
    slug: 'roas-calculator',
    title: 'ROAS Calculator',
    description: 'Calculate return on ad spend, required revenue, and break-even ROAS for paid media campaigns.',
    h1: 'ROAS Calculator',
    intro:
      'Calculate whether paid media is profitable by comparing spend, revenue, margin, and target return on ad spend.',
    inputs: ['Ad spend', 'Revenue from ads', 'Gross margin', 'Target ROAS'],
    outputs: ['ROAS', 'Profit after media', 'Break-even revenue', 'Target revenue gap'],
    useCases: ['Audit paid media profitability', 'Set campaign targets', 'Explain ROAS to stakeholders'],
    faqs: serviceFaq('ROAS')
  },
  {
    slug: 'content-idea-generator',
    title: 'Content Idea Generator',
    description: 'Generate SEO content ideas from a keyword, audience, funnel stage, and service offer.',
    h1: 'Content Idea Generator',
    intro:
      'Turn a keyword or service topic into practical blog, glossary, comparison, case study, and lead magnet ideas.',
    inputs: ['Seed keyword', 'Audience', 'Funnel stage', 'Service offer'],
    outputs: ['Blog ideas', 'Comparison angles', 'Glossary terms', 'Lead magnet concepts'],
    useCases: ['Build editorial calendars', 'Repurpose LinkedIn posts', 'Find internal link targets'],
    faqs: serviceFaq('Content Ideation')
  },
  {
    slug: 'automation-roi-calculator',
    title: 'Automation ROI Calculator',
    description: 'Calculate how much time and money automation can save your business. Input manual hours, labor cost, and setup budget.',
    h1: 'Automation ROI Calculator',
    intro:
      'Estimate the ROI of automating manual workflows. See hours saved, cost reduction, and payback period for your automation investment.',
    inputs: ['Hours spent on manual tasks per week', 'Hourly cost of person doing the work', 'Automation setup cost'],
    outputs: ['Hours saved per year', 'Annual cost savings', '3-year ROI multiple', 'Payback period in months'],
    useCases: ['Build a business case for automation', 'Prioritize which processes to automate first', 'Compare build vs buy decisions'],
    faqs: serviceFaq('Automation ROI')
  },
  {
    slug: 'finance-health-score',
    title: 'Finance Health Score',
    description: 'Quick 6-question self-assessment of your financial operations. Get a score and personalized recommendations.',
    h1: 'Finance Health Score',
    intro:
      'Assess your financial operations across bookkeeping, tax strategy, cash flow, reporting, payroll, and CFO access.',
    inputs: ['6 yes/no/partial questions'],
    outputs: ['Score out of 100', 'Category breakdown', 'Top gaps identified', 'Personalized recommendations'],
    useCases: ['Audit your finance function', 'Prepare for fundraising due diligence', 'Identify the biggest risk areas'],
    faqs: serviceFaq('Finance Health Check')
  }
];

export const COMPARISONS: ComparisonPage[] = [
  {
    slug: 'qognition-vs-webfx',
    title: 'Qognition vs WebFX',
    description: 'Compare Qognition and WebFX for SEO, PPC, web development, AI search, strategy, and execution model.',
    h1: 'Qognition vs WebFX',
    category: 'competitor',
    summary:
      'Use this page as a buying checklist when comparing proposals from Qognition and WebFX. Ask each team for the exact scope, delivery owners, relevant evidence and reporting method. Qognition focuses on AI SEO and GEO for B2B companies, with PPC scoped separately.',
    decisionFactors: ['Agency size and delivery model', 'Technical implementation depth', 'AI search readiness', 'Speed of iteration'],
    qognitionFit: ['Consider when B2B and service businesses that need qualified leads', 'Strong fit when SEO and web engineering must move together'],
    alternatives: ['WebFX', 'NP Digital', 'Dentsu', 'In-house team'],
    faqs: serviceFaq('Agency Comparison')
  },
  {
    slug: 'qognition-vs-np-digital',
    title: 'Qognition vs NP Digital',
    description: 'Compare Qognition and NP Digital for SEO strategy, paid media, content, AI search, and B2B lead generation.',
    h1: 'Qognition vs NP Digital',
    category: 'competitor',
    summary:
      'Compare the actual proposals from Qognition and NP Digital rather than assuming a name determines fit. Ask how technical implementation, expert review, AI-search observations and sales outcomes are handled. This page does not rank either agency or claim independently measured superiority.',
    decisionFactors: ['Global agency scale', 'Senior attention', 'Technical SEO and Next.js depth', 'Lead generation focus'],
    qognitionFit: ['Consider when teams that want direct strategy access', 'Strong fit for SEO plus conversion website builds'],
    alternatives: ['NP Digital', 'WebFX', 'Dentsu', 'Specialist SEO consultant'],
    faqs: serviceFaq('Agency Comparison')
  },
  {
    slug: 'qognition-vs-dentsu',
    title: 'Qognition vs Dentsu',
    description: 'Compare Qognition and Dentsu for enterprise marketing, digital strategy, SEO, PPC, and implementation speed.',
    h1: 'Qognition vs Dentsu',
    category: 'competitor',
    summary:
      'For a Qognition and Dentsu comparison, start with your procurement requirements and the work to be delivered. Review ownership, platform coverage, evidence, reporting access and how scope changes are handled. The right choice depends on the proposal and your internal capabilities.',
    decisionFactors: ['Enterprise procurement needs', 'Media buying scale', 'Implementation speed', 'SEO and conversion focus'],
    qognitionFit: ['Consider when ambitious growth teams that need action quickly', 'Strong fit for SEO, paid search, and landing page execution'],
    alternatives: ['Dentsu', 'WebFX', 'NP Digital', 'Boutique performance agency'],
    faqs: serviceFaq('Agency Comparison')
  },
  {
    slug: 'seo-agency-vs-in-house-seo',
    title: 'SEO Agency vs In-House SEO',
    description: 'Compare hiring an SEO agency versus building an in-house SEO team for cost, speed, control, and expertise.',
    h1: 'SEO Agency vs In-House SEO: Which Is Better?',
    category: 'strategy',
    summary:
      'In-house SEO gives control and institutional knowledge. A strong agency adds breadth, speed, technical specialists, content systems, and external pattern recognition.',
    decisionFactors: ['Hiring cost', 'Speed to execution', 'Technical complexity', 'Content production capacity', 'Reporting expectations'],
    qognitionFit: ['Best when you need strategy and implementation now', 'Strong fit as a specialist layer beside an internal marketer'],
    alternatives: ['Hire in-house', 'Use a freelancer', 'Use a full-service agency', 'Build a hybrid team'],
    faqs: serviceFaq('SEO Agency vs In-House SEO')
  },
  ...['London', 'Dubai', 'Bangalore', 'Sydney', 'New York'].map((city) => ({
    slug: `best-digital-marketing-agency-in-${slugify(city)}`,
    title: `Choosing a B2B Search Agency for ${city}`,
    description: `How to choose the best digital marketing agency in ${city} for SEO, Google Ads, web development, and lead generation.`,
    h1: `Choosing a B2B Search Agency for ${city}`,
    category: 'city' as const,
    summary: `When evaluating an agency for ${city}, ask which buyers you can actually serve, what local evidence the page needs and how the team will measure enquiries. A city in a page title does not establish an office or local delivery experience.${hasOffice(city) ? ` Qognition has an office in ${city}.` : ` Qognition serves ${city} remotely.`}`,
    decisionFactors: ['Local market experience', 'SEO and PPC capability', 'Case-study quality', 'CRM and analytics setup', 'Landing page quality'],
    qognitionFit: [`Consider when companies targeting ${city} plus national or international markets`, 'Strong fit for technical SEO, paid search, and conversion websites'],
    alternatives: ['Local freelancer', 'Traditional media agency', 'Large network agency', 'In-house marketer'],
    faqs: serviceFaq(`Digital Marketing Agency in ${city}`)
  }))
];

const coreTerms = [
  'AI SEO',
  'AI Overviews',
  'Answer Engine Optimization',
  'B2B Lead Generation',
  'Backlink Authority',
  'Brand Search',
  'Canonical Tag',
  'Click Through Rate',
  'Content Brief',
  'Content Cluster',
  'Content Decay',
  'Content Gap',
  'Content Pruning',
  'Conversion Rate Optimization',
  'Core Web Vitals',
  'Crawl Budget',
  'Customer Acquisition Cost',
  'Digital PR',
  'Domain Authority',
  'E-E-A-T',
  'Entity SEO',
  'FAQ Schema',
  'First Input Delay',
  'Google Ads',
  'Google Business Profile',
  'Google Search Console',
  'Hreflang',
  'Internal Linking',
  'Keyword Cannibalization',
  'Keyword Difficulty',
  'Landing Page',
  'Lead Magnet',
  'Local SEO',
  'LLM Optimization',
  'Marketing Attribution',
  'Meta Description',
  'Noindex',
  'Open Graph',
  'Organic CTR',
  'Page Speed',
  'Scalable SEO Pages',
  'Rank Tracking',
  'Redirect Chain',
  'Return on Ad Spend',
  'Robots.txt',
  'Schema Markup',
  'Search Generative Experience',
  'Search Intent',
  'Sitemap XML',
  'Technical SEO',
  'Topical Authority',
  'UTM Parameters',
  'Website Traffic'
];

// Stable terminology preserves existing glossary URLs when service labels change.
const glossaryServiceTitles: Record<string, string> = {
  "strategy": "Strategy & Consulting",
  "branding-creative": "Branding & Creative",
  "web-development": "Web Design & Development",
  "seo": "SEO & Organic Growth",
  "ai-seo": "GEO & AI Search",
  "ppc": "Paid Media (PPC)",
  "content": "Content Marketing",
  "smm": "Social Media Marketing",
  "video": "Video & Multimedia",
  "email-automation": "Email & Marketing Automation",
  "cro-analytics": "CRO & Analytics"
};

const generatedTerms = [
  ...SERVICES.flatMap((service) => [
    `${glossaryServiceTitles[service.id] || service.title} Strategy`,
    `${glossaryServiceTitles[service.id] || service.title} Audit`,
    `${glossaryServiceTitles[service.id] || service.title} Reporting`,
    `${glossaryServiceTitles[service.id] || service.title} KPIs`
  ]),
  ...INDUSTRIES.flatMap((industry) => [
    `${industry.name} Marketing`,
    `${industry.name} SEO`,
    `${industry.name} PPC`,
    `${industry.name} Lead Generation`,
    ...industry.subIndustries.slice(0, 4).map((sub) => `${sub.name} Marketing`)
  ]),
  ...LOCATIONS.slice(0, 70).flatMap((location) => [
    `${location.name} SEO`,
    `${location.name} Digital Marketing`,
    `${location.name} Lead Generation`
  ]),
  ...[
    'Technical SEO Audit',
    'Next.js SEO',
    'Dynamic Rendering',
    'Static Site Generation',
    'Server Components',
    'Hydration',
    'JSON-LD',
    'Breadcrumb Schema',
    'Review Schema',
    'Service Schema',
    'SoftwareApplication Schema',
    'HubSpot Lead Capture',
    'SEO ROI',
    'Google Ads Budget',
    'ROAS',
    'Quality Score',
    'Landing Page Message Match',
    'Conversion Tracking',
    'Offline Conversion Import',
    'CRM Attribution',
    'LinkedIn Thought Leadership',
    'Founder-Led Growth',
    'Case Study Marketing',
    'Glossary SEO',
    'Comparison Page SEO',
    'Location Page SEO',
    'Service Area Page',
    'AI Citation',
    'Perplexity SEO',
    'ChatGPT Search',
    'Gemini SEO'
  ]
];

const glossarySource = Array.from(new Set([...coreTerms, ...generatedTerms]));

const categoryForTerm = (term: string) => {
  const lower = term.toLowerCase();
  if (lower.includes('ai') || lower.includes('llm') || lower.includes('gemini') || lower.includes('chatgpt')) return 'AI search';
  if (lower.includes('ads') || lower.includes('ppc') || lower.includes('roas')) return 'Paid media';
  if (lower.includes('location') || lower.includes('local') || LOCATIONS.some((location) => lower.includes(location.name.toLowerCase()))) return 'Local SEO';
  if (lower.includes('schema') || lower.includes('crawl') || lower.includes('next.js') || lower.includes('sitemap')) return 'Technical SEO';
  if (lower.includes('lead') || lower.includes('conversion') || lower.includes('landing')) return 'Lead generation';
  return 'Digital marketing';
};

const glossaryDefinitions: Record<string, string> = {
  "AI SEO": "AI SEO describes work intended to support discovery through AI-assisted search. At Qognition, the work connects technical accessibility and useful buyer information with dated observations of how a business is represented.",
  "AI Overviews": "AI Overviews are generated summaries within Google Search that can include links to supporting pages. Eligibility relies on the underlying Search requirements; inclusion is not guaranteed.",
  "Answer Engine Optimization": "Answer engine optimization is a term for making useful information easier to retrieve and understand in answer-based experiences. Clear explanations and evidence matter; an answer format does not guarantee a citation.",
  "B2B Lead Generation": "B2B lead generation creates opportunities for business buyers to identify themselves and discuss a need. Lead quality depends on fit and intent, with sales qualification separate from a download or form submission.",
  "Backlink Authority": "Backlink authority describes the relevance and credibility associated with links from other websites. A third-party score is a proxy, not a search engine\u2019s disclosed assessment of a business.",
  "Brand Search": "Brand search is a query containing a business, product or other recognized brand name. Separate it from non-branded demand when reviewing search performance and acquisition activity.",
  "Canonical Tag": "A canonical link identifies the preferred URL for a page or substantially similar content. It is a consolidation signal, not a substitute for a sound URL structure or an access control.",
  "Click Through Rate": "Click-through rate is clicks divided by impressions for the same defined source and period. The denominator, placement and query mix must be comparable before interpreting a change.",
  "Content Brief": "A content brief defines the audience, question, intended contribution, evidence and next step for an asset. It should identify the subject expert and reviewer as well as keywords.",
  "Content Cluster": "A content cluster links related resources around a subject or buying problem. Each page needs its own useful purpose; internal links should help readers move between learning, evaluation and commercial detail.",
  "Content Decay": "Content decay is a decline in an asset\u2019s usefulness or performance over time. Investigate outdated facts, changed demand, competing resources and technical problems before assuming a rewrite is required.",
  "Content Gap": "A content gap is information a relevant audience needs that the current material does not adequately provide. A competitor\u2019s page alone is not proof that a matching page is useful.",
  "Content Pruning": "Content pruning reviews whether existing assets should be improved, consolidated or retired. Assess their purpose, search value and inbound links before changing availability or indexing.",
  "Conversion Rate Optimization": "Conversion rate optimization improves the path to a defined action. For a B2B site, confirmed enquiries and bookings should be measured separately from clicks and calendar views.",
  "Core Web Vitals": "Core Web Vitals measure aspects of page loading, responsiveness and visual stability. Use field measurements where available and connect technical findings to the affected user journey.",
  "Crawl Budget": "Crawl budget describes the resources a search engine allocates to crawling a site. For a growing catalogue, useful URLs, accessible pages and controlled duplication are practical concerns.",
  "Customer Acquisition Cost": "Customer acquisition cost divides the included acquisition costs by acquired customers over a defined period or cohort. State which costs and customers are counted before comparing programs.",
  "Digital PR": "Digital PR seeks relevant editorial attention through useful expertise, information or research. Keep outreach records and distinguish earned coverage from paid placements.",
  "Domain Authority": "Domain Authority is a third-party metric associated with Moz. It is not a Google ranking score, a certification or evidence that a particular page will be selected for an AI answer.",
  "E-E-A-T": "E-E-A-T refers to experience, expertise, authoritativeness and trustworthiness in Google\u2019s quality-evaluation framework. Credible authorship and supported claims help readers assess content; there is no universal E-E-A-T score to install.",
  "Entity SEO": "Entity SEO concerns the clarity of people, organizations, products and their relationships in content and supporting records. Describe real, supported relationships rather than inventing schema connections.",
  "FAQ Schema": "FAQPage structured data describes visible questions and answers where the type is appropriate. It does not guarantee rich-result eligibility, search placement or AI citations.",
  "First Input Delay": "First Input Delay is a historical responsiveness metric measuring the delay before a browser begins handling a first interaction. Do not treat an old FID result as a complete assessment of current page responsiveness.",
  "Google Ads": "Google Ads is Google\u2019s advertising platform. A B2B campaign needs appropriate targeting, a useful destination and a clear definition of the enquiry or sales outcome being measured.",
  "Google Business Profile": "Google Business Profile provides eligible businesses with information that can appear on Google surfaces. Locations, categories and reviews must describe the real business and follow platform requirements.",
  "Google Search Console": "Google Search Console provides site owners with search-performance and technical information. It is useful for investigating discovery and indexing, while customer and revenue outcomes require other records.",
  "Hreflang": "Hreflang identifies language or regional alternatives for equivalent content. Publish consistent, reciprocal references between complete versions rather than linking to unfinished translations.",
  "Internal Linking": "Internal linking connects pages within a site. Descriptive links help readers find related evidence and move from educational material to the relevant service and contact path.",
  "Keyword Cannibalization": "Keyword cannibalization describes situations where overlapping pages compete for the same intended search purpose. Review the actual content and search data before consolidating URLs.",
  "Keyword Difficulty": "Keyword difficulty is a tool-specific estimate of ranking competition. It should inform research alongside buyer relevance and existing capability, not decide a content plan by itself.",
  "Landing Page": "A landing page is the destination for a visit from a campaign or other source. Its information and next action should match the promise that brought the visitor there.",
  "Lead Magnet": "A lead magnet is a useful resource offered in exchange for contact information. Explain what is delivered and keep consent for optional follow-up distinct from the requested transaction.",
  "Local SEO": "Local SEO improves accurate discovery for businesses with genuine local relevance. Service coverage and eligible business profiles matter; a city name alone does not justify a separate page.",
  "LLM Optimization": "LLM optimization is a broad term for work around how language-model systems use and represent information. Website improvements cannot directly control a model\u2019s training or guarantee a recommendation.",
  "Marketing Attribution": "Marketing attribution assigns credit to observed interactions under a defined model. It does not fully recover unobserved conversations, AI answers or other influences on a B2B purchase.",
  "Meta Description": "A meta description summarizes a page in its HTML metadata. Search engines may use another passage instead, so it should accurately describe the page rather than promise a fixed snippet.",
  "Noindex": "Noindex asks supporting search engines not to include a page in their index. A crawler must be able to access the instruction; blocking the URL in robots.txt can prevent that.",
  "Open Graph": "Open Graph metadata describes a page for sharing previews, including a title, description and image. Preview text must reflect the visible page and its supported claims.",
  "Organic CTR": "Organic click-through rate compares clicks and impressions from unpaid search within a defined dataset. Changes can reflect query mix and result layout as well as the page itself.",
  "Page Speed": "Page speed describes how quickly useful content and interactions become available. Assess the affected devices and visits rather than treating one synthetic test score as the whole experience.",
  "Scalable SEO Pages": "Scalable SEO pages use structured content and reusable templates to serve distinct search needs. Every published page still needs useful information, evidence and review; changing names alone is insufficient.",
  "Rank Tracking": "Rank tracking records observed positions for specified queries, locations and conditions. Those observations are a sample and should not be confused with AI-answer visibility or sales outcomes.",
  "Redirect Chain": "A redirect chain sends a request through multiple URLs before reaching its destination. Review the chain for unnecessary hops, loops and incorrect final destinations.",
  "Return on Ad Spend": "Return on ad spend divides attributed revenue by advertising spend. It is not profit and depends on the attribution model and the completeness of the revenue data.",
  "Robots.txt": "Robots.txt communicates crawl instructions to cooperating agents. It is not authentication, and search-crawler permissions should be reviewed separately from model-training permissions.",
  "Schema Markup": "Schema markup adds structured descriptions of visible entities and content. It should be accurate and relevant; additional markup cannot substitute for useful information or guarantee inclusion.",
  "Search Generative Experience": "Search Generative Experience was a name used for Google\u2019s experimental generative search experience. Current program planning should use the platform\u2019s current feature names and documented requirements.",
  "Search Intent": "Search intent is the task a person is trying to complete with a query. In B2B, similar words can reflect learning, supplier evaluation or an active procurement need.",
  "Sitemap XML": "An XML sitemap lists URLs a site wants search engines to discover. Include canonical, published, indexable pages and use truthful modification dates; listing does not guarantee indexing.",
  "Technical SEO": "Technical SEO reviews whether useful pages can be crawled, rendered, indexed and understood. Prioritize defects affecting meaningful content and verify the result of each implementation.",
  "Topical Authority": "Topical authority is a descriptive term for credible coverage of a subject. It should come from useful expertise and evidence, not the number of near-duplicate pages published.",
  "UTM Parameters": "UTM parameters label campaign links so analytics can identify source context. Preserve first-touch and last-touch records separately and avoid putting personal information in URLs.",
  "Website Traffic": "Website traffic measures observed visits under a tool\u2019s definitions and consent conditions. Relevant visitors, confirmed enquiries and sales outcomes are different measures."
};

const definitionForTerm = (term: string): string => {
  if (glossaryDefinitions[term]) return glossaryDefinitions[term];
  const industry = INDUSTRIES.find(item => term.startsWith(item.name));
  const subindustry = INDUSTRIES.flatMap(item => item.subIndustries).find(item => term.startsWith(item.name));
  const location = [...LOCATIONS].sort((a, b) => b.name.length - a.name.length).find(item => term.startsWith(item.name + ' '));
  if (location) {
    const topic = term.slice(location.name.length + 1);
    const purpose = topic === 'SEO' ? 'search discovery for the buyers and applications a business can actually serve' : topic === 'Lead Generation' ? 'relevant enquiries with enough context for sales follow-up' : 'the channels and information a defined audience needs before contacting a supplier';
    return `${term} concerns ${purpose} in ${location.name}. Review real service coverage, language and regional evidence before creating or promoting a location page.`;
  }
  if (subindustry) return `${term} connects the audience and service scope of ${subindustry.name.toLowerCase()} with useful discovery and evaluation content. ${subindustry.description} The page describes a planning topic rather than verified client experience.`;
  if (industry) {
    const topic = term.slice(industry.name.length + 1);
    const purpose = topic === 'PPC' ? 'paid-campaign targeting, exclusions and qualified-enquiry measurement' : topic === 'Lead Generation' ? 'the path from relevant buyer interest to a confirmed enquiry' : topic === 'SEO' ? 'retrievable service information and relevant search demand' : 'the relationship between audience, offer, evidence and sales follow-up';
    return `${term} addresses ${purpose}. ${industry.description} Define the exact buyer and applicable service before choosing the next action.`;
  }
  const service = Object.entries(glossaryServiceTitles).find(([, label]) => term.startsWith(label + ' '));
  if (service) {
    const suffix = term.slice(service[1].length + 1);
    const purpose: Record<string, string> = {
      Strategy: 'defines the audience, problem, delivery responsibilities and sequence of work',
      Audit: 'records the current state, supporting evidence and issues to investigate before implementation',
      Reporting: 'explains completed work and observed outcomes, with source definitions and measurement limitations',
      KPIs: 'identifies the measures used to evaluate agreed objectives rather than promising a particular result',
    };
    return `${term} ${purpose[suffix] || 'connects the work to a defined business need'}. For B2B programs, keep search discovery, enquiries and sales acceptance distinct.`;
  }
  return `${term} is a topic to evaluate within the relevant search, content or measurement workflow. Define its role, source information and intended buyer action before treating it as a required deliverable.`;
};

export const GLOSSARY_TERMS: GlossaryTerm[] = glossarySource.slice(0, 320).map((term, index, all) => ({
  slug: slugify(term),
  term,
  category: categoryForTerm(term),
  definition: definitionForTerm(term),
  relatedTerms: [all[(index + 7) % all.length], all[(index + 19) % all.length], all[(index + 31) % all.length]].map(slugify)
}));

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: 'prabal-bhandari',
    name: 'Prabal Bhandari',
    role: 'CEO',
    focus: 'AI growth strategy, client vision, market expansion',
    bio: 'Prabal leads Qognition as an AI growth marketing partner for companies that need clearer positioning, qualified pipeline, and modern search visibility across Google and LLM-powered discovery.'
  },
  {
    slug: 'manish-kunwar',
    name: 'Manish Kunwar',
    role: 'CTO',
    focus: 'Next.js systems, automation, analytics, AI infrastructure',
    bio: 'Manish owns the technical architecture behind fast Next.js sites, scalable SEO systems, automation workflows, analytics, and the engineering layer that keeps growth measurable.'
  },
  {
    slug: 'nimesh-shakya',
    name: 'Nimesh Shakya',
    role: 'Design Head',
    focus: 'Visual systems, UX direction, brand experience',
    bio: 'Nimesh leads design systems and web experience direction so Qognition’s growth work feels premium, usable, and conversion-focused without weakening SEO or performance.'
  },
  {
    slug: 'richa-sharma',
    name: 'Richa Sharma',
    role: 'Creative Director',
    focus: 'Campaign ideas, brand storytelling, creative systems',
    bio: 'Richa turns positioning into creative direction, campaign narratives, social ideas, and brand moments that help buyers understand why a company is different.'
  },
  {
    slug: 'kushal-adhikari',
    name: 'Kushal Adhikari',
    role: 'Lead Graphic Designer',
    focus: 'Campaign visuals, social design, lead magnet design',
    bio: 'Kushal builds the visual assets that support ads, social content, resources, case studies, sales collateral, and conversion pages.'
  },
  {
    slug: 'sabina-thapa',
    name: 'Sabina Thapa',
    role: 'Lead Content Strategist',
    focus: 'Content systems, editorial strategy, B2B messaging',
    bio: 'Sabina leads content strategy across blogs, resources, service pages, industry pages, case studies, and internal linking systems built for search and sales.'
  },
  {
    slug: 'sujan-rai',
    name: 'Sujan Rai',
    role: 'Lead SEO Executive',
    focus: 'Technical SEO, local SEO, AI search visibility',
    bio: 'Sujan manages SEO execution across crawlability, keyword intent, schema, location pages, Search Console checks, and AI-readable content structures.'
  }
];

// Compatibility export: the public engagement page describes scope, not pricing tiers.
export const PRICING_PACKAGES: { name: string; price: string; bestFor: string; includes: string[] }[] = [];
