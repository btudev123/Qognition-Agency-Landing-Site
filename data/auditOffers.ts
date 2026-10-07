import { AuditOffer, ResourceLeadMagnet } from '../types';

export const AUDIT_OFFERS: AuditOffer[] = [
  {
    slug: 'free-ai-audit',
    type: 'ai',
    title: 'AI Search Visibility Report',
    shortTitle: 'AI Search Visibility Report',
    description:
      'Review technical readiness and request a human assessment of the commercial questions and sources relevant to your business.',
    h1: 'AI Search Visibility Report',
    eyebrow: 'AI Search Visibility Report',
    cta: 'Request a review',
    audience: 'Founders and growth teams who want visibility in AI Overviews, ChatGPT-style answers, Gemini, Perplexity, and answer engines',
    checks: ['Entity clarity', 'Structured data', 'FAQ content', 'Robots access', 'Proof assets', 'Service clarity'],
    outcomes: ['Improve AI answer readiness', 'Clarify brand facts', 'Review search access', 'Map missing proof assets'],
    sections: [
      {
        title: 'AI search needs proof',
        content:
          'AI systems are more likely to cite and summarize websites that clearly explain who they serve, what they do, why they are credible, and where the supporting evidence lives.'
      },
      {
        title: 'What the report looks at',
        content:
          'We review accessible page content, clear service information, supported claims and search access. Actual AI mentions and citations require a separate, dated observation of an answer.'
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
        answer: 'Start with the specific issue supported by the findings. There is no universal shortcut or special file that guarantees AI citations.'
      }
    ]
  }
];

export const RESOURCES_FROM_AUDITS: ResourceLeadMagnet[] = AUDIT_OFFERS.map((offer) => ({
  slug: offer.slug,
  title: offer.title,
  description: offer.description,
  format: offer.eyebrow,
  readingTime: 'Scope confirmed after enquiry',
  gated: true,
  audience: offer.audience,
  highlights: offer.outcomes,
  sections: offer.sections,
  auditType: offer.type,
  href: `/${offer.slug}`,
  ctaLabel: offer.cta
}));

export const getAuditOfferBySlug = (slug: string) => AUDIT_OFFERS.find((offer) => offer.slug === slug);
