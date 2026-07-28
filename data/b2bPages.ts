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
  },
  {
    // Pillar page. Consolidates the "openai api seo" cluster, which was ranking
    // ~6.2 on scattered directory pages with no page actually about the topic.
    slug: 'openai-api-seo',
    title: 'OpenAI API for SEO: How to Build Search Workflows That Scale',
    description:
      'A practical engineering guide to using the OpenAI API for SEO — content generation, entity extraction, internal linking, schema markup, and clustering — plus the guardrails that keep scaled output indexable.',
    h1: 'OpenAI API for SEO: Build Search Workflows That Scale',
    eyebrow: 'AI SEO Engineering',
    summary:
      'The OpenAI API is useful for SEO when it does the work humans are bad at repeating: clustering thousands of queries, extracting entities, drafting schema, and auditing internal links. It fails when it is used to mass-produce pages nobody asked for. This guide covers both sides.',
    sections: [
      {
        title: 'Where the OpenAI API genuinely wins at SEO',
        content:
          'Four workloads justify the API cost. Keyword clustering: embeddings group thousands of queries by semantic intent far faster than manual sorting. Entity extraction: pull the people, products, and concepts from a corpus to build topical maps. Schema generation: turn unstructured page content into valid JSON-LD at scale. Internal link auditing: embed every page, then surface the pairs that should be linked but are not. Each produces a reviewable artifact, not a published page.'
      },
      {
        title: 'Models, cost, and the structured-output rule',
        content:
          'Use the smallest model that clears the quality bar — cheap models handle classification and extraction; reserve frontier models for reasoning over ambiguous intent. Always request structured JSON output with a strict schema rather than parsing prose. Batch requests where latency does not matter, cache aggressively on stable inputs, and log token spend per workflow so an experiment cannot quietly become a five-figure line item.'
      },
      {
        title: 'The guardrail that decides whether this works',
        content:
          'Google does not penalize AI-assisted content; it penalizes unhelpful content produced at scale. The distinction is whether a page answers a query a real person typed. Gate every generated page behind three checks: verified search demand, a factual review by someone who knows the subject, and something on the page that exists nowhere else — original data, a real screenshot, a genuine opinion. Pages failing any check should never ship.'
      },
      {
        title: 'A reference pipeline',
        content:
          'Pull queries from Search Console. Embed and cluster them. Map each cluster to an existing URL or flag it as a gap. For gaps, generate a brief — not a draft — containing intent, entities to cover, questions to answer, and internal links to include. A human writes or heavily edits from that brief. Generated JSON-LD is validated before deploy. The API never writes directly to production.'
      }
    ],
    checklist: [
      'Structured JSON outputs, never prose parsing',
      'Embeddings for clustering, not generation',
      'Per-workflow token budget + logging',
      'Human review gate before publish',
      'Schema validated pre-deploy',
      'Search Console feedback loop'
    ],
    faqs: [
      {
        question: 'Will Google penalize content generated with the OpenAI API?',
        answer:
          'No — Google has stated that how content is produced matters less than whether it is helpful. What gets penalized is scaled content abuse: publishing large volumes of pages with no original value to manipulate rankings. AI-assisted content that is reviewed, accurate, and genuinely useful ranks normally. The production method is not the risk; the absence of value is.'
      },
      {
        question: 'Which OpenAI model should we use for SEO workflows?',
        answer:
          'Match the model to the task. Embedding models handle keyword clustering and internal-link similarity at very low cost. Small chat models are sufficient for classification, entity extraction, and metadata drafting. Reserve the largest reasoning models for genuinely ambiguous work like intent disambiguation or competitive gap analysis. Most teams overspend by defaulting every call to the biggest model.'
      },
      {
        question: 'Can the OpenAI API write schema markup reliably?',
        answer:
          'Yes, with a strict output schema and a validation step. Request JSON-LD as structured output constrained to the exact Schema.org types you need, then validate the result programmatically before it reaches production. Never trust unvalidated markup — invalid JSON-LD is silently ignored by search engines, so failures are invisible without a check.'
      },
      {
        question: 'How much does an OpenAI-powered SEO workflow cost to run?',
        answer:
          'Clustering a few thousand keywords with embeddings typically costs cents, not dollars. Costs escalate when teams use large models for high-volume generation. Log token usage per workflow from day one, set a monthly budget alert, and cache responses for inputs that do not change. Most SEO workloads are embedding-heavy and generation-light, which keeps spend low.'
      },
      {
        question: 'Can Qognition build this pipeline for us?',
        answer:
          'Yes. This is the overlap between our Marketing and Automation work — we build the clustering, briefing, schema, and internal-linking pipelines, wire them to Search Console, and keep the human review gate in place. Start with the free AI search audit to see which parts of the pipeline would move your numbers first.'
      }
    ],
    relatedLinks: [
      { label: 'AI Search Visibility Guide', href: '/improve-ai-search-visibility' },
      { label: 'Free AI Audit', href: '/free-ai-audit' },
      { label: 'AI Search Visibility Service', href: '/services/ai-seo' },
      { label: 'Free SEO Audit', href: '/free-seo-audit' }
    ]
  },
  {
    // Dedicated page for the "improve ... ai search visibility" cluster, which
    // was ranking ~1.8 against pages not actually about the topic.
    slug: 'improve-ai-search-visibility',
    title: 'How to Improve Your AI Search Visibility (ChatGPT, Perplexity, AI Overviews)',
    description:
      'A step-by-step guide to getting your brand cited by ChatGPT, Perplexity, Claude, and Google AI Overviews — crawler access, answer-shaped content, entity consistency, and third-party citations.',
    h1: 'How to Improve Your AI Search Visibility',
    eyebrow: 'AI Search / AEO / GEO',
    summary:
      'AI assistants do not rank pages, they assemble answers from sources they can retrieve and trust. Visibility therefore depends on four things: letting the crawlers in, structuring content so it can be lifted as an answer, keeping your entity consistent everywhere, and being cited on sources the models already weight heavily.',
    sections: [
      {
        title: 'Step 1 — Let the AI crawlers in',
        content:
          'Most invisibility is self-inflicted. Check robots.txt for explicit allow rules covering GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, and AppleBot. Blocking Google-Extended removes you from AI Overviews. Equally important: assistants generally do not execute JavaScript, so any text rendered only on the client is invisible to them. Server-render the content you want quoted.'
      },
      {
        title: 'Step 2 — Write content shaped like an answer',
        content:
          'Retrieval favors passages that stand alone. Lead each section with a direct, complete answer in the first two sentences, then support it. Use question-shaped H2s that mirror how people actually ask. Keep the answer within a single passage rather than spread across the page — a model lifting one chunk should get a coherent, quotable response without needing surrounding context.'
      },
      {
        title: 'Step 3 — Make your entity unambiguous',
        content:
          'Models resolve brands as entities. Your name, description, category, and URL must match across your site schema, LinkedIn, Crunchbase, G2, and every directory you appear in. Conflicting descriptions fragment the entity and reduce confidence. Publish Organization JSON-LD with sameAs links to every profile you control, and keep one canonical one-sentence description used verbatim everywhere.'
      },
      {
        title: 'Step 4 — Earn citations where models actually look',
        content:
          'Retrieval leans heavily on a narrow set of high-trust sources: Reddit, Wikipedia, YouTube, G2, industry publications, and well-established niche communities. A mention in a relevant Reddit thread or a comparison roundup often influences AI answers more than a link from a low-authority blog. Original data is the strongest lever — publish benchmarks or survey results that others must cite by name.'
      },
      {
        title: 'Step 5 — Measure it, because rankings will not tell you',
        content:
          'Traditional rank tracking does not capture AI visibility. Build a prompt set of 30–50 buying questions in your category and test them monthly across ChatGPT, Perplexity, Claude, and AI Overviews. Record whether you are mentioned, how you are described, and which source was cited. That citation source is your roadmap — it tells you exactly which third-party page to influence next.'
      }
    ],
    checklist: [
      'robots.txt allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended',
      'Key content server-rendered, not JS-only',
      'Answer in the first two sentences of each section',
      'Organization schema with complete sameAs',
      'One canonical brand description everywhere',
      'Monthly prompt-set citation tracking'
    ],
    faqs: [
      {
        question: 'What is AI search visibility and how is it different from SEO?',
        answer:
          'SEO optimizes for a ranked list of links; AI search visibility optimizes for being included in a generated answer. The mechanics differ — there is no position one, the assistant synthesizes several retrieved sources into one response. Being cited depends on crawler access, passage-level clarity, entity trust, and third-party corroboration rather than purely on backlinks and rankings.'
      },
      {
        question: 'How do I get ChatGPT to mention my brand?',
        answer:
          'Three requirements. First, ChatGPT must be able to retrieve your content — allow GPTBot and OAI-SearchBot in robots.txt and server-render your text. Second, your content must contain a clear, self-contained answer to the question being asked. Third, your brand should appear on the third-party sources ChatGPT already trusts for your category, particularly Reddit, established review sites, and industry publications.'
      },
      {
        question: 'Does blocking AI crawlers hurt my visibility?',
        answer:
          'Yes, directly. Blocking GPTBot removes you from ChatGPT browsing results. Blocking Google-Extended removes you from Google AI Overviews while leaving normal Google Search rankings intact. Many sites blocked these crawlers during the 2023 training-data backlash and never revisited the decision — it is worth auditing robots.txt specifically for this, because the loss is silent.'
      },
      {
        question: 'How long does it take to improve AI search visibility?',
        answer:
          'Crawler access and server-rendering fixes can change results within weeks, since retrieval is refreshed frequently. Entity consistency and citation-building take longer — typically one to two quarters — because they depend on third-party sources updating. Teams starting from blocked crawlers usually see the fastest movement, as that single fix removes a hard barrier.'
      },
      {
        question: 'Can Qognition run this for us?',
        answer:
          'Yes. Our AI search work covers the full stack: crawler and rendering audit, answer-shaped content restructuring, entity and schema consolidation, citation-source outreach, and monthly prompt-set tracking so you can see movement. The free AI audit shows which of the five steps is currently costing you the most visibility.'
      }
    ],
    relatedLinks: [
      { label: 'Free AI Audit', href: '/free-ai-audit' },
      { label: 'OpenAI API for SEO', href: '/openai-api-seo' },
      { label: 'Free LLM Visibility Audit', href: '/free-llm-audit' },
      { label: 'AI Search Visibility Service', href: '/services/ai-seo' }
    ]
  }
];

export const getB2BMoFuPage = (slug: string) => B2B_MOFU_PAGES.find((page) => page.slug === slug);
