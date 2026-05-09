import {
  ComparisonPage,
  FreeToolPage,
  GlossaryTerm,
  ResourceLeadMagnet,
  ServiceSubPage,
  TeamMember
} from '../types';
import { INDUSTRIES } from './industries';
import { LOCATIONS } from './locations';
import { SERVICES } from './services';

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
      'Most clients see implementation wins in the first 30 to 60 days, while durable SEO and pipeline gains compound over 3 to 6 months.'
  },
  {
    question: `Does Qognition handle strategy and execution for ${topic.toLowerCase()}?`,
    answer:
      'Yes. Each engagement includes audit, roadmap, implementation, reporting, and ongoing optimization so the work does not stop at recommendations.'
  },
  {
    question: `Can ${topic.toLowerCase()} work with an existing internal team?`,
    answer:
      'Yes. Qognition can operate as the strategy lead, embedded execution pod, or specialist layer beside your internal marketing and engineering teams.'
  }
];

export const SERVICE_SUB_PAGES: ServiceSubPage[] = [
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
      { label: 'Technical SEO Checklist', href: '/resources/technical-seo-audit-checklist-nextjs' }
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
      { label: 'Programmatic SEO', href: '/glossary/programmatic-seo' }
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
      { label: 'Case Studies', href: '/work' },
      { label: 'Digital PR', href: '/glossary/digital-pr' }
    ]
  },
  {
    serviceId: 'ai-seo',
    slug: 'ai-search-visibility',
    title: 'AI Search Visibility Services',
    description: 'Optimize for ChatGPT, Gemini, Perplexity, SGE, AI Overviews, and LLM citation visibility.',
    h1: 'AI Search Visibility for LLMs, AI Overviews, and Answer Engines',
    intro:
      'Search discovery now happens across Google, AI Overviews, ChatGPT, Gemini, Perplexity, and vertical answer engines. We help your brand become easier to cite, summarize, and trust.',
    deliverables: ['Entity audit', 'LLM citation map', 'Answer-ready content briefs', 'AI crawler files and schema'],
    sections: [
      {
        title: 'Entity and Evidence Layer',
        content:
          'We clarify who you are, what you offer, who you serve, which proof assets support your claims, and how those facts should appear across pages, schema, sitemaps, and llm.txt.'
      },
      {
        title: 'Answer-Ready Content',
        content:
          'We structure pages with direct answers, comparisons, definitions, FAQs, original opinions, and proof blocks so AI systems can extract helpful passages without guessing.'
      },
      {
        title: 'Citation Monitoring',
        content:
          'We track where your brand appears, which competitors are cited, and which missing proof points prevent your content from being selected.'
      }
    ],
    faqs: serviceFaq('AI Search Visibility'),
    relatedLinks: [
      { label: '2026 AI SEO Guide', href: '/resources/2026-guide-ai-seo-sge' },
      { label: 'LLM Transparency', href: '/llm' },
      { label: 'E-E-A-T', href: '/glossary/e-e-a-t' }
    ]
  },
  {
    serviceId: 'ai-seo',
    slug: 'llm-optimization',
    title: 'LLM Optimization Services',
    description: 'LLM discoverability, entity feeds, llm.txt, AI crawler readiness, and answer engine optimization.',
    h1: 'LLM Optimization for Discoverable Brand Knowledge',
    intro:
      'We organize your website so large language models can understand your services, markets, proof, expertise, and preferred source pages.',
    deliverables: ['llm.txt strategy', 'Entity summary pages', 'Structured content blocks', 'Source-of-truth cleanup'],
    sections: [
      {
        title: 'Machine-Readable Positioning',
        content:
          'We create concise, accurate, crawlable summaries of your services, markets, leadership, case studies, pricing guidance, and resources.'
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
    description: 'Next.js App Router SEO, static generation, schema, sitemaps, performance, and crawlable programmatic pages.',
    h1: 'Next.js SEO Development for Crawlable Growth Sites',
    intro:
      'We build Next.js websites that are fast, indexable, structured, and ready for programmatic SEO without relying on client-side rendering for core content.',
    deliverables: ['App Router architecture', 'Static params and metadata', 'Sitemap segmentation', 'Performance optimization'],
    sections: [
      {
        title: 'Server-First SEO',
        content:
          'Important titles, descriptions, canonicals, H1s, body content, links, and JSON-LD are rendered before JavaScript so crawlers receive the page immediately.'
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
      { label: 'Next.js Audit Checklist', href: '/resources/technical-seo-audit-checklist-nextjs' },
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
          'The site keeps motion and brand polish, but not at the expense of readable content, crawlable links, mobile usability, or performance.'
      },
      {
        title: 'Launch and Iteration',
        content:
          'After launch we monitor crawl data, form submissions, analytics, search queries, and conversion paths to prioritize the next improvement.'
      }
    ],
    faqs: serviceFaq('Conversion Website Development'),
    relatedLinks: [
      { label: 'Pricing Guide', href: '/pricing' },
      { label: 'Landing Page CRO', href: '/services/ppc/landing-page-cro' },
      { label: 'Case Studies', href: '/work' }
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
  }
];

export const getServiceSubPage = (serviceId: string, slug: string) =>
  SERVICE_SUB_PAGES.find((page) => page.serviceId === serviceId && page.slug === slug);

export const getServiceSubPages = (serviceId: string) =>
  SERVICE_SUB_PAGES.filter((page) => page.serviceId === serviceId);

export const RESOURCES: ResourceLeadMagnet[] = [
  {
    slug: '2026-guide-ai-seo-sge',
    title: 'The 2026 Guide to AI SEO and SGE',
    description:
      'A practical guide to ranking in AI Overviews, answer engines, ChatGPT-style discovery, Gemini, and Perplexity.',
    format: 'PDF and checklist',
    readingTime: '34 min',
    gated: true,
    audience: 'CMOs, founders, SEO leads, and B2B growth teams',
    highlights: ['AI search ranking factors', 'Entity and citation checklist', 'Prompt demand mapping', 'LLM-ready content formats'],
    sections: [
      {
        title: 'What Changed',
        content:
          'AI search rewards pages that are easy to summarize, cite, and verify. Brand entities, original proof, structured answers, and credible authorship matter more than generic keyword repetition.'
      },
      {
        title: 'What to Build',
        content:
          'The highest-return assets are service pages, comparison pages, glossary pages, case studies, original tools, and expert-led guides that answer specific buying questions.'
      },
      {
        title: 'How to Measure',
        content:
          'Track branded search, AI referral traffic, citation presence, assisted conversions, keyword movement, and sales calls where prospects mention AI tools or answer engines.'
      }
    ]
  },
  {
    slug: 'technical-seo-audit-checklist-nextjs',
    title: 'Technical SEO Audit Checklist for Next.js Websites',
    description:
      'A launch checklist for Next.js App Router sites covering metadata, static params, canonicals, JSON-LD, sitemaps, robots, and Core Web Vitals.',
    format: 'Checklist',
    readingTime: '22 min',
    gated: true,
    audience: 'Founders, marketers, and engineering teams shipping SEO-critical Next.js sites',
    highlights: ['App Router metadata checks', 'Static generation QA', 'Schema checklist', 'Curl-based pre-JavaScript checks'],
    sections: [
      {
        title: 'Rendering Checks',
        content:
          'Use curl and view-source checks to confirm that title, meta description, canonical, H1, primary body copy, internal links, and JSON-LD exist before JavaScript.'
      },
      {
        title: 'Indexing Checks',
        content:
          'Validate sitemap coverage, robots rules, canonical host consistency, duplicate route handling, noindex usage, and 404 behavior for generated params.'
      },
      {
        title: 'Performance Checks',
        content:
          'Review LCP assets, font loading, image sizing, route payloads, cumulative layout shift, hydration cost, and third-party scripts.'
      }
    ]
  },
  {
    slug: 'free-seo-audit-checklist',
    title: 'Free SEO Audit Checklist',
    description:
      'A founder-friendly SEO checklist for finding technical, content, authority, local, and conversion gaps before hiring an agency.',
    format: 'Checklist and spreadsheet',
    readingTime: '18 min',
    gated: true,
    audience: 'SMBs, consultants, clinics, law firms, accounting firms, and B2B service companies',
    highlights: ['Technical SEO triage', 'Content gap review', 'Local SEO checklist', 'Lead capture audit'],
    sections: [
      {
        title: 'Technical Baseline',
        content:
          'Check whether search engines can crawl and index your priority pages, understand your page templates, and access a current XML sitemap.'
      },
      {
        title: 'Content Baseline',
        content:
          'Identify missing service pages, thin location pages, weak blog coverage, unsupported claims, and pages with unclear search intent.'
      },
      {
        title: 'Conversion Baseline',
        content:
          'Review CTAs, forms, lead magnets, testimonials, pricing guidance, case studies, and analytics events.'
      }
    ]
  }
];

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
      'WebFX is a large established agency. Qognition is built for companies that want senior strategy, faster execution, technical SEO, Next.js implementation, and AI search visibility in one focused team.',
    decisionFactors: ['Agency size and delivery model', 'Technical implementation depth', 'AI search readiness', 'Speed of iteration'],
    qognitionFit: ['Best for B2B and service businesses that need qualified leads', 'Strong fit when SEO and web engineering must move together'],
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
      'NP Digital brings a large global agency footprint. Qognition is stronger for clients that want a leaner senior team focused on technical SEO, content systems, conversion pages, and AI search discoverability.',
    decisionFactors: ['Global agency scale', 'Senior attention', 'Technical SEO and Next.js depth', 'Lead generation focus'],
    qognitionFit: ['Best for teams that want direct strategy access', 'Strong fit for SEO plus conversion website builds'],
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
      'Dentsu is a global network agency suited to complex enterprise media programs. Qognition is better suited when the priority is fast execution, technical growth infrastructure, and clear lead generation outcomes.',
    decisionFactors: ['Enterprise procurement needs', 'Media buying scale', 'Implementation speed', 'SEO and conversion focus'],
    qognitionFit: ['Best for ambitious growth teams that need action quickly', 'Strong fit for SEO, paid search, and landing page execution'],
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
    title: `Best Digital Marketing Agency in ${city}`,
    description: `How to choose the best digital marketing agency in ${city} for SEO, Google Ads, web development, and lead generation.`,
    h1: `Best Digital Marketing Agency in ${city}`,
    category: 'city' as const,
    summary: `The best agency in ${city} should understand local search behavior, buyer intent, competitive density, landing page conversion, and the regional proof your buyers expect.`,
    decisionFactors: ['Local market experience', 'SEO and PPC capability', 'Case-study quality', 'CRM and analytics setup', 'Landing page quality'],
    qognitionFit: [`Best for companies targeting ${city} plus national or international markets`, 'Strong fit for technical SEO, paid search, and conversion websites'],
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
  'Programmatic SEO',
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

const generatedTerms = [
  ...SERVICES.flatMap((service) => [
    `${service.title} Strategy`,
    `${service.title} Audit`,
    `${service.title} Reporting`,
    `${service.title} KPIs`
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

export const GLOSSARY_TERMS: GlossaryTerm[] = glossarySource.slice(0, 320).map((term, index, all) => ({
  slug: slugify(term),
  term,
  category: categoryForTerm(term),
  definition: `${term} is a digital growth concept Qognition uses when planning SEO, paid media, content, analytics, and conversion systems. In practical terms, it affects how buyers discover a brand, evaluate trust, and turn search demand into measurable pipeline.`,
  relatedTerms: [all[(index + 7) % all.length], all[(index + 19) % all.length], all[(index + 31) % all.length]].map(slugify)
}));

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: 'alex-morgan',
    name: 'Alex Morgan',
    role: 'Chief Strategy Officer',
    focus: 'AI search, positioning, enterprise growth strategy',
    bio: 'Alex leads growth strategy across SEO, paid media, AI search visibility, and executive-level roadmap design for ambitious B2B teams.',
    image: '/images/team/alex-morgan.jpg'
  },
  {
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Head of SEO Services',
    focus: 'Technical SEO, content systems, programmatic SEO',
    bio: 'Sarah oversees technical SEO, topic architecture, indexation strategy, content quality systems, and search-led revenue planning.',
    image: '/images/team/sarah-chen.jpg'
  },
  {
    slug: 'maya rao'.replace(' ', '-'),
    name: 'Maya Rao',
    role: 'Director of Performance Marketing',
    focus: 'Google Ads, paid social, CRO, revenue analytics',
    bio: 'Maya leads paid acquisition programs with a focus on qualified pipeline, landing page economics, and CRM-backed reporting.'
  },
  {
    slug: 'daniel-kim',
    name: 'Daniel Kim',
    role: 'Lead Growth Engineer',
    focus: 'Next.js, analytics, HubSpot integrations, automation',
    bio: 'Daniel builds the technical growth infrastructure behind crawlable websites, calculators, lead capture, analytics, and marketing automation.'
  }
];

export const PRICING_PACKAGES = [
  {
    name: 'Growth Sprint',
    price: 'From $3,500/mo',
    bestFor: 'SMBs and founder-led teams that need SEO, content, and conversion momentum.',
    includes: ['SEO and content roadmap', 'Technical fixes', 'Monthly reporting', 'Lead capture improvements']
  },
  {
    name: 'Performance Engine',
    price: 'From $7,500/mo',
    bestFor: 'B2B teams scaling SEO, Google Ads, landing pages, and HubSpot reporting.',
    includes: ['SEO and paid media pods', 'Landing page experiments', 'CRM attribution', 'Biweekly strategy calls']
  },
  {
    name: 'Enterprise Authority',
    price: 'Custom',
    bestFor: 'Multi-market teams that need AI search, programmatic SEO, content operations, and executive reporting.',
    includes: ['Programmatic SEO architecture', 'AI search visibility', 'Digital PR assets', 'Executive dashboards']
  }
];
