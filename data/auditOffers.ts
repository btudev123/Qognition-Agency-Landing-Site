import { AuditOffer, ResourceLeadMagnet } from '../types';

export const AUDIT_OFFERS: AuditOffer[] = [
  {
    slug: 'free-ai-audit',
    type: 'ai',
    title: 'AI Search Visibility Report',
    shortTitle: 'AI Search Visibility Report',
    description:
      'A human-reviewed look at how visible and citable your brand is across AI search systems, delivered within 48 hours.',
    h1: 'AI Search Visibility Report',
    eyebrow: 'AI Search Visibility Report',
    cta: 'Request My AI Search Visibility Report',
    audience: 'Founders and growth teams who want visibility in AI Overviews, ChatGPT-style answers, Gemini, Perplexity, and answer engines',
    checks: ['Entity clarity', 'Structured data', 'FAQ content', 'Robots access', 'llm.txt', 'Proof assets', 'Service clarity'],
    outcomes: ['Improve AI answer readiness', 'Clarify brand facts', 'Find blocked AI bots', 'Map missing proof assets'],
    sections: [
      {
        title: 'AI search needs proof',
        content:
          'AI systems are more likely to cite and summarize websites that clearly explain who they serve, what they do, why they are credible, and where the supporting evidence lives.'
      },
      {
        title: 'What the report looks at',
        content:
          'We review structured pages, schema, concise answers, clear service language, robots access for major AI/search bots, and machine-readable discovery files.'
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
          'No public tool can guarantee that. This report checks the website signals that make your brand easier for AI systems to understand and cite.'
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
  }
];

export const RESOURCES_FROM_AUDITS: ResourceLeadMagnet[] = AUDIT_OFFERS.map((offer) => ({
  slug: offer.slug,
  title: offer.title,
  description: offer.description,
  format: offer.eyebrow,
  readingTime: '48 hours',
  gated: true,
  audience: offer.audience,
  highlights: offer.outcomes,
  sections: offer.sections,
  auditType: offer.type,
  href: `/${offer.slug}`,
  ctaLabel: offer.cta
}));

export const getAuditOfferBySlug = (slug: string) => AUDIT_OFFERS.find((offer) => offer.slug === slug);
