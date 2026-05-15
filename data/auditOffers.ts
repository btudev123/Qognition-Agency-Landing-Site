import { AuditOffer, ResourceLeadMagnet } from '../types';

export const AUDIT_OFFERS: AuditOffer[] = [
  {
    slug: 'free-seo-audit',
    type: 'seo',
    title: 'SEO Audit Free',
    shortTitle: 'SEO Audit',
    description:
      'Get a fast SEO audit covering titles, meta descriptions, H1s, canonicals, sitemap access, robots.txt, schema, internal links, and conversion readiness.',
    h1: 'Free SEO Audit for Lead Generation Websites',
    eyebrow: 'Free SEO Audit',
    cta: 'Run My Free SEO Audit',
    audience: 'Founders, consultants, clinics, law firms, accountants, SaaS teams, and B2B service companies',
    checks: ['Metadata', 'Headings', 'Canonical URL', 'Robots.txt', 'Sitemap', 'Internal links', 'Schema', 'HTTPS'],
    outcomes: ['Find indexation gaps', 'Spot weak page signals', 'Prioritize quick SEO fixes', 'Turn traffic into booked calls'],
    sections: [
      {
        title: 'What the audit checks',
        content:
          'The audit reviews the signals that matter before a page can rank or convert: title tag, meta description, H1, canonical, sitemap access, robots rules, links, structured data, and HTTPS.'
      },
      {
        title: 'Why it helps',
        content:
          'Most SEO problems are not mysterious. They are usually missing metadata, unclear headings, thin internal links, blocked discovery paths, slow pages, or weak conversion prompts.'
      },
      {
        title: 'What happens next',
        content:
          'You receive a branded report instantly. If the score shows meaningful gaps, Qognition can turn the findings into a 30-day implementation sprint.'
      }
    ],
    faqs: [
      {
        question: 'Is the SEO audit really free?',
        answer: 'Yes. The instant audit is free and gives a practical first-pass view of technical and on-page issues.'
      },
      {
        question: 'Does it replace a full technical SEO audit?',
        answer:
          'No. It is a fast diagnostic. A full audit adds crawl data, analytics, Search Console, logs, Core Web Vitals, competitors, and revenue prioritization.'
      },
      {
        question: 'Can Qognition fix the issues?',
        answer: 'Yes. We can turn the audit into a focused roadmap, implementation sprint, or ongoing SEO growth program.'
      }
    ]
  },
  {
    slug: 'free-ai-audit',
    type: 'ai',
    title: 'AI Audit Free',
    shortTitle: 'AI Audit',
    description:
      'Check whether your website gives AI search systems clear brand, service, proof, schema, and source-of-truth signals.',
    h1: 'Free AI Search Readiness Audit',
    eyebrow: 'Free AI Audit',
    cta: 'Run My Free AI Audit',
    audience: 'Teams that want visibility in AI Overviews, ChatGPT-style answers, Gemini, Perplexity, and answer engines',
    checks: ['Entity clarity', 'Structured data', 'FAQ content', 'Robots access', 'llm.txt', 'Proof assets', 'Service clarity'],
    outcomes: ['Improve AI answer readiness', 'Clarify brand facts', 'Find blocked AI bots', 'Map missing proof assets'],
    sections: [
      {
        title: 'AI search needs proof',
        content:
          'AI systems are more likely to cite and summarize websites that clearly explain who they serve, what they do, why they are credible, and where the supporting evidence lives.'
      },
      {
        title: 'What the audit checks',
        content:
          'The audit looks for structured pages, schema, concise answers, clear service language, robots access for major AI/search bots, and machine-readable discovery files.'
      },
      {
        title: 'How Qognition uses it',
        content:
          'We use the findings to build answer-ready pages, entity summaries, comparison content, case-study proof, and internal links that help both buyers and AI systems understand the brand.'
      }
    ],
    faqs: [
      {
        question: 'Will this show exactly how ChatGPT ranks my brand?',
        answer:
          'No public tool can guarantee that. This audit checks the website signals that make your brand easier for AI systems to understand and cite.'
      },
      {
        question: 'Which AI systems does this support?',
        answer: 'The checks are built around AI Overviews, ChatGPT-style discovery, Gemini, Perplexity, Claude, and common AI/search crawlers.'
      },
      {
        question: 'What is the fastest AI visibility win?',
        answer: 'Usually clear service pages, concise answers, proof-rich case studies, schema, and an accurate llm.txt file.'
      }
    ]
  },
  {
    slug: 'branding-audit',
    type: 'branding',
    title: 'Branding Audit',
    shortTitle: 'Branding Audit',
    description:
      'Review whether your positioning, homepage message, proof, visual system, and CTAs make the business feel trustworthy and conversion-ready.',
    h1: 'Branding Audit for B2B Lead Generation',
    eyebrow: 'Branding Audit',
    cta: 'Run My Branding Audit',
    audience: 'Companies whose service quality has outgrown their website, messaging, or creative system',
    checks: ['Homepage clarity', 'Positioning', 'Visual consistency', 'Proof blocks', 'CTA clarity', 'Trust signals'],
    outcomes: ['Clarify the offer', 'Strengthen trust', 'Improve CTA flow', 'Align creative with revenue goals'],
    sections: [
      {
        title: 'Branding should reduce doubt',
        content:
          'A strong B2B brand makes the buyer understand the offer quickly, believe the company can deliver, and know what action to take next.'
      },
      {
        title: 'What the audit checks',
        content:
          'The audit reviews the first-screen message, service clarity, visual consistency, proof, case-study access, testimonials, CTAs, and whether the page feels credible for high-value buyers.'
      },
      {
        title: 'How it becomes action',
        content:
          'Qognition can translate the findings into messaging, design direction, landing page improvements, creative systems, and sales collateral.'
      }
    ],
    faqs: [
      {
        question: 'Is this only a logo audit?',
        answer: 'No. It focuses on positioning, trust, conversion clarity, proof, and the visual system across the website.'
      },
      {
        question: 'Can branding affect lead quality?',
        answer: 'Yes. Clear positioning and credible proof help better-fit buyers self-select and reduce low-quality enquiries.'
      },
      {
        question: 'Can Qognition redesign the brand after the audit?',
        answer: 'Yes. We can handle brand strategy, creative direction, design systems, and conversion website execution.'
      }
    ]
  },
  {
    slug: 'social-media-audit',
    type: 'social',
    title: 'Social Media Audit',
    shortTitle: 'Social Audit',
    description:
      'Check whether your social presence supports authority, founder visibility, content consistency, lead capture, and buyer trust.',
    h1: 'Free Social Media Audit for B2B Growth',
    eyebrow: 'Social Media Audit',
    cta: 'Run My Social Media Audit',
    audience: 'Founders, B2B teams, agencies, consultants, professional services, and teams using LinkedIn or Instagram to build demand',
    checks: ['Profile clarity', 'Posting consistency', 'Content pillars', 'CTA flow', 'Proof content', 'Founder authority'],
    outcomes: ['Improve content direction', 'Strengthen founder authority', 'Fix weak CTAs', 'Turn attention into enquiries'],
    sections: [
      {
        title: 'Social should create demand',
        content:
          'For B2B teams, social media works best when founder POV, proof, education, and offers all point toward a clear next step.'
      },
      {
        title: 'What the audit checks',
        content:
          'The audit reviews profile clarity, consistency, proof content, authority signals, landing page handoff, and whether your content gives buyers a reason to keep listening.'
      },
      {
        title: 'How Qognition improves it',
        content:
          'We turn the gaps into a practical content system: pillars, hooks, post formats, repurposing workflows, creative templates, and lead capture.'
      }
    ],
    faqs: [
      {
        question: 'Which platforms does this apply to?',
        answer: 'The audit is strongest for LinkedIn, Instagram, YouTube Shorts, and founder-led B2B content.'
      },
      {
        question: 'Do you create the content after the audit?',
        answer: 'Yes. Qognition can support strategy, copy, creative, publishing workflows, and reporting.'
      },
      {
        question: 'How often should a B2B brand post?',
        answer: 'Most founder-led programs should start with 3 to 5 strong posts per week rather than daily low-quality content.'
      }
    ]
  },
  {
    slug: 'free-llm-audit',
    type: 'llm',
    title: 'LLM Audit Free',
    shortTitle: 'LLM Audit',
    description:
      'Check whether GPTBot, ClaudeBot, PerplexityBot, CCBot, Googlebot, and AI discovery paths can understand your website.',
    h1: 'Free LLM Visibility Audit',
    eyebrow: 'Free LLM Audit',
    cta: 'Run My Free LLM Audit',
    audience: 'Brands that want to be discoverable in AI assistants, answer engines, and LLM-powered research workflows',
    checks: ['AI bot access', 'robots.txt', 'llm.txt', 'Content Signals', 'Schema', 'Entity summary', 'Canonical pages'],
    outcomes: ['Find blocked AI access', 'Improve LLM source pages', 'Clarify crawl guidance', 'Build AI-ready content paths'],
    sections: [
      {
        title: 'LLMs need clean source material',
        content:
          'AI assistants rely on clear, consistent, crawlable source pages. If your facts are scattered, blocked, or vague, your brand becomes harder to cite.'
      },
      {
        title: 'What the audit checks',
        content:
          'The audit checks robots.txt, AI crawler access, llm.txt, schema, canonical signals, and whether the page gives clear summaries that can be parsed without guessing.'
      },
      {
        title: 'What to build next',
        content:
          'The next step is usually a source-of-truth content layer: services, case studies, leadership, pricing guidance, resources, glossary pages, and AI-readable summaries.'
      }
    ],
    faqs: [
      {
        question: 'Does this guarantee AI citations?',
        answer: 'No. It improves readiness and removes blockers, but citations depend on authority, content quality, user prompts, and external signals.'
      },
      {
        question: 'Should AI bots be allowed?',
        answer: 'For Qognition-style discoverability goals, yes for search and AI input, while opting out of model training through Content Signals.'
      },
      {
        question: 'What is llm.txt?',
        answer: 'It is a concise machine-readable guide that tells AI systems the most important facts and URLs on the website.'
      }
    ]
  }
];

export const RESOURCES_FROM_AUDITS: ResourceLeadMagnet[] = AUDIT_OFFERS.map((offer) => ({
  slug: offer.slug,
  title: offer.title,
  description: offer.description,
  format: offer.eyebrow,
  readingTime: 'Instant',
  gated: true,
  audience: offer.audience,
  highlights: offer.outcomes,
  sections: offer.sections,
  auditType: offer.type,
  href: `/${offer.slug}`,
  ctaLabel: offer.cta
}));

export const getAuditOfferBySlug = (slug: string) => AUDIT_OFFERS.find((offer) => offer.slug === slug);
