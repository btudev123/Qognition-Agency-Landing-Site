import { B2BMoFuPage } from '../types';

const baseFaqs = (topic: string) => [
  {
    question: `Who should use this ${topic.toLowerCase()} guide?`,
    answer:
      'It is written for founders, CMOs, consultants, professional services firms, SaaS teams, and B2B companies that need qualified pipeline instead of vague awareness.'
  },
  {
    question: 'What should we do first?',
    answer:
      'Start with the free audit, fix the biggest website and tracking gaps, then build one focused campaign around a high-intent audience and offer.'
  },
  {
    question: 'Can Qognition implement this?',
    answer:
      'Yes. Qognition can own the strategy, landing pages, SEO, paid media, content, HubSpot tracking, and reporting needed to execute the plan.'
  }
];

export const B2B_MOFU_PAGES: B2BMoFuPage[] = [
  {
    slug: 'b2b-marketing-strategies',
    title: 'Best B2B Marketing Strategies for Lead Generation',
    description:
      'A practical guide to B2B marketing strategies that create qualified leads through SEO, paid media, content, landing pages, social proof, and CRM follow-up.',
    h1: 'Best B2B Marketing Strategies for Lead Generation',
    eyebrow: 'B2B Lead Generation',
    summary:
      'The strongest B2B marketing strategies connect a sharp offer, high-intent traffic, proof, conversion pages, and fast follow-up. Traffic alone is not the goal; sales-qualified opportunities are.',
    sections: [
      {
        title: 'Start with a painful buying problem',
        content:
          'B2B buyers move when the cost of doing nothing is clear. Your strategy should name the problem, quantify the risk, show proof, and make the next step feel low-friction.'
      },
      {
        title: 'Build acquisition around intent',
        content:
          'Use SEO for compounding demand, paid search for immediate tests, LinkedIn for authority, retargeting for trust, and landing pages for specific offers instead of sending every visitor to a generic homepage.'
      },
      {
        title: 'Connect marketing to pipeline',
        content:
          'Every campaign should carry UTMs, CRM source fields, lifecycle stages, and conversion events so you can see which channels create qualified calls and revenue.'
      }
    ],
    checklist: ['One clear ICP', 'One primary offer', 'Dedicated landing pages', 'CRM tracking', 'Proof-rich case studies', 'Five-email nurture'],
    faqs: baseFaqs('B2B marketing strategy'),
    relatedLinks: [
      { label: 'Free SEO Audit', href: '/free-seo-audit' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Lead Generation Techniques', href: '/lead-generation-techniques' }
    ]
  },
  {
    slug: 'lead-generation-techniques',
    title: 'Effective Lead Generation Techniques for B2B Companies',
    description:
      'Learn the B2B lead generation techniques Qognition uses to turn search demand, paid traffic, LinkedIn attention, and audit tools into booked calls.',
    h1: 'Effective Lead Generation Techniques for B2B Companies',
    eyebrow: 'Lead Generation',
    summary:
      'B2B lead generation works when the offer is useful before the sales call. Audits, calculators, benchmark reports, webinars, and case-study downloads reduce friction while capturing intent.',
    sections: [
      {
        title: 'Use low-friction offers',
        content:
          'A free SEO audit, AI visibility audit, calculator, or benchmark report is easier to accept than a sales call. It captures real demand while giving the prospect useful insight.'
      },
      {
        title: 'Route leads by intent',
        content:
          'Someone requesting an audit should enter a different follow-up path than someone reading a blog post. Use HubSpot stages and source fields to separate research leads from sales-ready buyers.'
      },
      {
        title: 'Make proof easy to find',
        content:
          'Case studies, before/after metrics, timelines, screenshots, testimonials, and industry-specific examples help a buyer justify the next step internally.'
      }
    ],
    checklist: ['Audit widget above the fold', 'Dedicated offer page', 'Thank-you/report experience', 'Calendly CTA', 'Nurture sequence', 'Sales alert'],
    faqs: baseFaqs('lead generation'),
    relatedLinks: [
      { label: 'Free AI Audit', href: '/free-ai-audit' },
      { label: 'SEO ROI Calculator', href: '/free-tools/seo-roi-calculator' },
      { label: 'B2B Email Best Practices', href: '/email-marketing-best-practices' }
    ]
  },
  {
    slug: 'content-marketing-for-b2b',
    title: 'Content Marketing Strategies for B2B Businesses',
    description:
      'How B2B companies should build content around buyer problems, search intent, founder POV, case studies, lead magnets, and internal links.',
    h1: 'Content Marketing Strategies for B2B Businesses',
    eyebrow: 'B2B Content Marketing',
    summary:
      'B2B content should help buyers make decisions. The best programs mix SEO pages, comparison content, founder POV, case studies, glossary pages, and gated assets tied to sales follow-up.',
    sections: [
      {
        title: 'Map content to buying stages',
        content:
          'Top-of-funnel content earns attention, middle-of-funnel content explains options, and bottom-of-funnel content proves Qognition can solve the problem.'
      },
      {
        title: 'Use original POV',
        content:
          'Generic AI-written articles rarely build authority. Use founder opinions, client patterns, teardown lessons, audits, benchmarks, and clear recommendations.'
      },
      {
        title: 'Link every page to action',
        content:
          'Each guide should connect to services, case studies, audit tools, glossary definitions, comparison pages, and Calendly so readers never hit a dead end.'
      }
    ],
    checklist: ['Topic cluster map', 'Industry pages', 'Case-study library', 'Audit CTA', 'Author profile', 'Internal links'],
    faqs: baseFaqs('B2B content marketing'),
    relatedLinks: [
      { label: 'Content Strategy Services', href: '/services/seo/content-strategy' },
      { label: 'Branding Audit', href: '/branding-audit' },
      { label: 'Blog', href: '/blog' }
    ]
  },
  {
    slug: 'email-marketing-best-practices',
    title: 'B2B Email Marketing Best Practices',
    description:
      'B2B email marketing best practices for audit follow-up, nurture sequences, segmentation, subject lines, CRM routing, and sales handoff.',
    h1: 'B2B Email Marketing Best Practices',
    eyebrow: 'Email Nurture',
    summary:
      'B2B email works when it follows a real signal. A prospect who requested an audit should receive useful context about their score, not a generic newsletter.'
    ,
    sections: [
      {
        title: 'Reference the trigger',
        content:
          'The first email should mention the audit type, score, and strongest gap. Specific follow-up feels helpful; generic follow-up feels automated.'
      },
      {
        title: 'Use a five-email sequence',
        content:
          'Send the report, explain the biggest issue, show a relevant case study, offer a practical checklist, then invite the prospect to book a strategy call.'
      },
      {
        title: 'Segment by fit',
        content:
          'Use company type, audit score, URL, source, and stated need to route leads into sales-ready, nurture, or low-fit paths.'
      }
    ],
    checklist: ['Audit report email', 'Problem explainer', 'Relevant case study', 'Checklist/resource', 'Calendly invite', 'CRM stage update'],
    faqs: baseFaqs('B2B email marketing'),
    relatedLinks: [
      { label: 'Lead Generation Techniques', href: '/lead-generation-techniques' },
      { label: 'HubSpot Lead Capture', href: '/glossary/hubspot-lead-capture' },
      { label: 'Free LLM Audit', href: '/free-llm-audit' }
    ]
  },
  {
    slug: 'b2b-social-media-marketing',
    title: 'B2B Social Media Marketing Strategies',
    description:
      'A practical B2B social media strategy for founder-led content, LinkedIn thought leadership, proof assets, short-form video, and lead capture.',
    h1: 'B2B Social Media Marketing Strategies',
    eyebrow: 'B2B Social Media',
    summary:
      'B2B social media should build trust before the sales call. Founder POV, proof, education, commentary, and lead magnets give buyers a reason to engage.'
    ,
    sections: [
      {
        title: 'Build around founder authority',
        content:
          'Buyers trust people before brands. Founder-led posts, contrarian lessons, teardown threads, and behind-the-scenes proof make the company easier to remember.'
      },
      {
        title: 'Turn services into content pillars',
        content:
          'Use SEO, AI visibility, paid media, web design, branding, and lead generation as recurring pillars with examples, mistakes, frameworks, and client stories.'
      },
      {
        title: 'Send attention to a low-friction offer',
        content:
          'Every strong social program needs a capture path. Send readers to a free audit, calculator, case study, benchmark report, or newsletter instead of only asking for a call.'
      }
    ],
    checklist: ['Founder POV', 'Proof posts', 'Educational carousels', 'Short video', 'Audit CTA', 'Weekly reporting'],
    faqs: baseFaqs('B2B social media'),
    relatedLinks: [
      { label: 'Social Media Audit', href: '/social-media-audit' },
      { label: 'LinkedIn Thought Leadership', href: '/services/smm/linkedin-thought-leadership' },
      { label: 'Case Studies', href: '/case-studies' }
    ]
  }
];

export const getB2BMoFuPage = (slug: string) => B2B_MOFU_PAGES.find((page) => page.slug === slug);
