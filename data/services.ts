
import { Service } from '../types';

const COMMON_FAQS = [
    { question: "How do you integrate AI into your workflow?", answer: "We utilize a proprietary stack of LLMs for data analysis, semantic entity mapping, and predictive trend modeling, while maintaining human oversight for strategic creativity." },
    { question: "What is your typical engagement model?", answer: "We operate primarily on a retainer basis for long-term growth partnerships, with project-based execution for specific technical infrastructure builds. Engagements start at $500/mo." },
    { question: "How do you handle data privacy?", answer: "We are fully GDPR, CCPA, and SOC2 compliant. Your proprietary data is never used to train public models without explicit consent." }
];

// Ordered to match the site's 11-category navigation:
// Strategy · Branding · Web · SEO · GEO/AI · Paid Media · Content · Social · Video · Email · CRO
export const SERVICES: Service[] = [
  {
    id: 'strategy',
    title: 'Strategy & Consulting',
    shortDescription: 'Marketing consulting for founders: positioning, go-to-market, channel mix, and budget allocation.',
    fullDescription: 'Marketing consulting that answers four questions before you spend: who exactly you serve, why you win against the alternatives, which channels are worth funding, and how each dollar of budget becomes pipeline. You get a written GTM plan, a positioning statement your whole team can use, a channel-by-channel budget model, and a measurement plan that ties spend to revenue — fractional CMO leadership without the full-time cost.',
    icon: 'Compass',
    kpis: ['Clear GTM Plan', 'Lower CAC', 'Faster Decisions'],
    expertQuote: {
        author: 'Daniel Okoye',
        role: 'Head of Strategy',
        quote: 'Most marketing fails before the first campaign launches — wrong audience, fuzzy positioning, no measurement plan. Strategy is the cheapest leverage you will ever buy.'
    },
    deepDive: [
        {
            title: 'Positioning Is the Multiplier',
            content: 'A sharp position makes every downstream channel cheaper and more effective. We pressure-test your category, promise, proof, and differentiation against the real alternatives buyers consider, then translate that into messaging the whole funnel can use.'
        },
        {
            title: 'Channel & Budget Allocation',
            content: 'We map demand by channel, model expected CAC and payback, and sequence investment so early wins fund later bets. No guesswork, no spray-and-pray — a written plan with owners, milestones, and a measurement framework.'
        }
    ],
    subServices: [
        { name: 'Marketing Audit', slug: 'marketing-audit', description: 'Full-funnel review of channels, messaging, analytics, and spend to find the highest-impact fixes first.' },
        { name: 'Go-to-Market Strategy', slug: 'go-to-market-strategy', description: 'ICP, positioning, channel mix, launch sequence, and measurement plan for new products or markets.' },
        { name: 'Competitive Analysis', slug: 'competitive-analysis', description: 'Share-of-voice, messaging, pricing, and channel teardown of the competitors your buyers actually compare.' },
        { name: 'Buyer Persona Development', slug: 'buyer-persona-development', description: 'Research-backed personas with jobs-to-be-done, objections, and the language that moves them.' },
        { name: 'Customer Journey Mapping', slug: 'customer-journey-mapping', description: 'TOFU→MOFU→BOFU journey with triggers, content, and conversion paths at every stage.' },
        { name: 'Channel & Budget Planning', slug: 'channel-budget-planning', description: 'Demand modeling, CAC/payback forecasting, and a phased budget allocation across channels.' },
        { name: 'Fractional CMO', slug: 'fractional-cmo', description: 'Senior marketing leadership on retainer — strategy, team direction, and board-ready reporting.' }
    ],
    process: [
        { title: 'Discovery & Audit', description: 'Map the current state — channels, data, positioning, and economics.' },
        { title: 'Strategy & Roadmap', description: 'Define positioning, channel mix, budget, and a sequenced 90-day plan.' },
        { title: 'Enablement', description: 'Hand off a measurement framework and lead execution or advise your team.' }
    ],
    techStack: ['Notion', 'Figma', 'GA4', 'HubSpot', 'Looker Studio', 'Clay'],
    relatedIndustries: ['SaaS', 'Professional Services', 'Financial Services'],
    faqs: [
        { question: 'What does a fractional CMO actually do?', answer: 'Sets strategy, owns the marketing number, directs vendors and in-house staff, and reports to the founder or board — at a fraction of a full-time hire.' },
        { question: 'How fast do I get a strategy?', answer: 'A full go-to-market plan typically takes 2–3 weeks; a focused marketing audit can be delivered in 48–72 hours.' },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'branding-creative',
    title: 'Branding & Creative',
    shortDescription: 'Identity, design systems, campaigns, and creative direction for brands that need to look as sharp as they perform.',
    fullDescription: 'We turn strategy into a brand system people recognize, trust, and remember. Qognition blends positioning, visual identity, conversion copy, design systems, campaign creative, and AI-assisted production so every touchpoint feels premium and commercially useful.',
    icon: 'Palette',
    kpis: ['Clearer Positioning', '+38% CTA Lift', 'Launch-Ready Assets'],
    expertQuote: {
        author: 'Richa Sharma',
        role: 'Creative Director',
        quote: 'Strong creative is not decoration. It is the fastest way to make a buyer understand why you are different, why they should trust you, and why they should act now.'
    },
    deepDive: [
        {
            title: 'Positioning Before Pixels',
            content: 'Creative work starts with the market, not the moodboard. We clarify audience, category, promise, proof, objections, tone, and conversion intent before designing a single asset.'
        },
        {
            title: 'Design Systems That Scale',
            content: 'A premium brand needs repeatable patterns. We build logo usage, type systems, color rules, landing page sections, social templates, ad modules, and content guidelines that can scale across channels.'
        },
        {
            title: 'Creative That Supports Growth',
            content: 'Campaign assets are judged by recall, clarity, engagement, click quality, landing page conversion, and sales usefulness. The goal is brand trust that turns into qualified demand.'
        }
    ],
    subServices: [
        { name: 'Brand Naming', slug: 'brand-naming', description: 'Naming strategy, generation, screening, and domain/trademark checks for products and companies.' },
        { name: 'Logo Design', slug: 'logo-design', description: 'Distinctive primary, secondary, and responsive logo systems with usage rules.' },
        { name: 'Visual Identity', slug: 'visual-identity', description: 'Logo systems, typography, color, layout, iconography, and brand guidelines.' },
        { name: 'Brand Messaging & Voice', slug: 'brand-messaging-voice', description: 'Positioning, narrative, tone of voice, and a messaging hierarchy the whole team can use.' },
        { name: 'Brand Guidelines', slug: 'brand-guidelines', description: 'A living brand book covering identity, voice, usage, and channel-specific patterns.' },
        { name: 'Rebranding', slug: 'rebranding', description: 'Strategic repositioning and visual overhaul with a migration plan that protects equity.' },
        { name: 'Packaging Design', slug: 'packaging-design', description: 'Retail and DTC packaging that earns shelf and unboxing attention.' },
        { name: 'Graphic Design', slug: 'graphic-design', description: 'Social assets, ad creatives, pitch visuals, one-pagers, carousels, and lead magnet design.' },
        { name: 'Motion Graphics & Animation', slug: 'motion-design', description: 'Short-form motion, kinetic typography, product explainers, social cuts, and launch videos.' },
        { name: 'Illustration', slug: 'illustration', description: 'Custom illustration systems and iconography that make a brand ownable.' },
        { name: 'Pitch Deck & Sales Collateral', slug: 'pitch-deck-design', description: 'Investor decks, sales one-pagers, and proposal templates designed to win.' },
        { name: 'Creative Direction', slug: 'creative-direction', description: 'Campaign concepts, moodboards, content direction, art direction, and launch creative.' },
        { name: 'Conversion Copywriting', slug: 'conversion-copywriting', description: 'Homepage, landing page, ad, email, and sales copy built around action and trust.' }
    ],
    process: [
        { title: 'Positioning Sprint', description: 'Define the audience, promise, proof, category, and messaging hierarchy.' },
        { title: 'Creative System', description: 'Build the identity, templates, asset rules, and channel-specific creative direction.' },
        { title: 'Launch and Learn', description: 'Ship assets into ads, SEO pages, social, and sales workflows, then improve based on engagement and conversion data.' }
    ],
    techStack: ['Figma', 'Adobe Creative Cloud', 'Canva Enterprise', 'Midjourney', 'Firefly', 'Notion'],
    relatedIndustries: ['SaaS', 'E-commerce', 'Professional Services'],
    faqs: [
        { question: 'Can branding improve lead generation?', answer: 'Yes. Better positioning and creative reduce confusion, increase trust, and make paid, SEO, social, and sales journeys easier to convert.' },
        { question: 'Do you design full brand systems or only campaign assets?', answer: 'Both. Qognition can build a complete identity system or create campaign-specific assets inside an existing brand.' },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'web-development',
    title: 'Web Design & Development',
    shortDescription: 'High-performance sites that convert — Next.js, Webflow, WordPress, and Shopify.',
    fullDescription: 'We build the fastest, most secure websites on the web using React, Next.js, and headless architecture — plus Webflow, WordPress, and Shopify when the team needs to own publishing. Our sites are not brochures; they are high-performance growth engines built around offers, proof, and booked calls.',
    icon: 'Code',
    kpis: ['100 PageSpeed', '<1s Load Time', 'Award-Winning UI'],
    subServices: [
        { name: 'UX/UI Design', slug: 'ux-ui-design', description: 'Research, wireframes, prototypes, and conversion-focused interface design.' },
        { name: 'WordPress Development', slug: 'wordpress-development', description: 'Fast, secure, SEO-ready WordPress builds with clean publishing workflows.' },
        { name: 'Webflow Development', slug: 'webflow-development', description: 'Pixel-perfect Webflow sites the marketing team can edit without developers.' },
        { name: 'Shopify Development', slug: 'shopify-development', description: 'Shopify and headless commerce builds tuned for speed and conversion.' },
        { name: 'Landing Page Design', slug: 'landing-pages', description: 'Campaign pages with message match, fast load times, proof blocks, and CRM-ready forms.' },
        { name: 'E-commerce Development', slug: 'ecommerce-web-design', description: 'Storefronts, product storytelling, collection SEO, and checkout journey improvements.' },
        { name: 'CMS Migration', slug: 'cms-migration', description: 'Safe migrations between CMS platforms with redirects, parity, and zero SEO loss.' },
        { name: 'Page Speed Optimization', slug: 'page-speed-optimization', description: 'Core Web Vitals, image delivery, hydration cost, and third-party script governance.' },
        { name: 'Accessibility (WCAG)', slug: 'accessibility-wcag', description: 'WCAG 2.2 AA audits and remediation for compliant, usable sites.' },
        { name: 'Website Maintenance & Care', slug: 'website-maintenance', description: 'Updates, monitoring, backups, security, and continuous conversion improvements.' },
        { name: 'Mobile App Development', slug: 'mobile-app-development', description: 'React Native and PWA apps connected to your marketing and data stack.' },
        { name: 'Next.js & SEO Builds', slug: 'nextjs-seo', description: 'App Router architecture, static generation, metadata, schema, sitemaps, and indexing checks.' },
        { name: 'Conversion Websites', slug: 'conversion-websites', description: 'High-performance marketing sites built around offers, proof, forms, and booked calls.' },
        { name: 'Headless CMS', slug: 'headless-cms', description: 'Sanity, Contentful, and CMS workflows for publishing SEO pages without developer bottlenecks.' },
        { name: 'Web Performance', slug: 'web-performance', description: 'Lighthouse, Core Web Vitals, image delivery, and runtime cost optimization.' }
    ],
    process: [
        { title: 'UX Discovery', description: 'Wireframing and user journey mapping.' },
        { title: 'Component Development', description: 'Building a reusable design system in React/Tailwind.' },
        { title: 'Performance Tuning', description: 'Code splitting, image optimization, and edge caching.' }
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Webflow', 'Shopify', 'WordPress', 'Sanity CMS', 'Vercel'],
    relatedIndustries: ['SaaS', 'E-commerce', 'Manufacturing'],
    faqs: [
        { question: 'Do you use templates?', answer: 'Never. Every line of code is bespoke to your brand requirements.' },
        { question: 'Why Next.js over WordPress?', answer: 'Security, speed, and scalability. Headless architectures allow for instantaneous page loads and better SEO core web vitals — though we build excellent WordPress and Webflow sites when in-house editing matters more.' },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'seo',
    title: 'SEO & Organic Growth',
    shortDescription: 'Technical, content, and off-page SEO for enterprise scale.',
    fullDescription: 'We dominate search results by combining technical excellence with semantic authority. Our strategies are future-proofed against core updates and AI search transitions (SGE). We move beyond keywords to own the entire entity graph of your brand.',
    icon: 'Search',
    kpis: ['+200% Organic Traffic', 'Top 3 Keywords', '50% Lower CAC'],
    expertQuote: {
        author: "Dr. Elena Vance",
        role: "Head of Search Engineering",
        quote: "In the era of SGE, keywords are dead. Entities and relationships are the new currency. If Google doesn't understand 'who' you are, it won't rank 'what' you sell."
    },
    deepDive: [
        {
            title: "The Paradigm Shift: From Keywords to Entities",
            content: "Traditional SEO focused on 'strings'—keywords placed strategically in title tags and headers. Modern SEO, powered by Knowledge Graph technology and LLMs, focuses on 'things'—entities. \n\nOur proprietary methodology maps your brand's entity in Wikidata and Google's Knowledge Graph API. By ensuring your digital identity is unambiguously resolved, we help you rank for conceptual queries, not just exact match keywords. This protects your visibility against the volatility of Search Generative Experience (SGE) rollouts."
        },
        {
            title: "Core Web Vitals & Technical Speed",
            content: "Google has confirmed that Core Web Vitals (CWV) are a ranking factor. We don't just patch WordPress sites; we re-architect them using Next.js and Vercel Edge Networks. \n\nBy utilizing edge caching, advanced image optimization pipelines (AVIF/WebP), and minimizing main-thread JavaScript execution, we consistently achieve sub-100ms Time to First Byte (TTFB). This technical superiority directly correlates with crawl budget efficiency, ensuring Google indexes your content faster than your competitors."
        },
        {
            title: "Information Gain & Content Strategy",
            content: "With AI flooding the web with derivative content, Google's algorithms now prioritize 'Information Gain'—content that provides unique value not found elsewhere. \n\nOur editorial team includes subject matter experts who produce original research, data studies, and expert analysis. We don't just summarize the top 10 results; we create the source material that everyone else links to. This approach builds durable backlink profiles naturally."
        }
    ],
    subServices: [
        { name: 'On-Page SEO', slug: 'on-page-seo', description: 'Titles, headings, internal links, content depth, and entity coverage on every page.' },
        { name: 'Off-Page SEO', slug: 'off-page-seo', description: 'Digital PR, authority signals, brand mentions, and editorial outreach.' },
        { name: 'Technical SEO', slug: 'technical-seo', description: 'Crawlability, indexing, Core Web Vitals, schema, canonicals, and JavaScript rendering audits.' },
        { name: 'Local SEO', slug: 'local-seo', description: 'Google Business Profile, city pages, review systems, maps visibility, and local conversion paths.' },
        { name: 'E-commerce SEO', slug: 'ecommerce-seo', description: 'Category and product page optimization, faceted navigation, and shopping feed alignment.' },
        { name: 'International SEO', slug: 'international-seo', description: 'hreflang, multi-region architecture, and localized content for global brands.' },
        { name: 'Programmatic SEO', slug: 'programmatic-seo', description: 'Service, industry, location, glossary, comparison, and directory page systems with original content and strong internal links.' },
        { name: 'Keyword Research', slug: 'keyword-research', description: 'Buyer-intent keyword and topic mapping tied to revenue, not vanity volume.' },
        { name: 'Link Building', slug: 'link-building', description: 'Digital PR, authority assets, editorial outreach, and risk-controlled backlink acquisition.' },
        { name: 'Content Optimization', slug: 'content-optimization', description: 'Refreshing and upgrading existing pages for information gain and ranking recovery.' },
        { name: 'Schema Markup', slug: 'schema-markup', description: 'JSON-LD for Organization, Service, FAQ, Article, Review, and entity clarity.' },
        { name: 'SEO Audits', slug: 'seo-audits', description: 'Forensic technical, content, and authority audits with a prioritized roadmap.' },
        { name: 'Site Migration SEO', slug: 'site-migration-seo', description: 'Redirect mapping, parity checks, and traffic protection through replatforms and redesigns.' },
        { name: 'Content Strategy', slug: 'content-strategy', description: 'Buyer-intent topic clusters, editorial calendars, content briefs, and internal link systems.' },
        { name: 'E-E-A-T SEO', slug: 'eeat-seo', description: 'Author profiles, proof blocks, expert quotes, citations, reviews, and trust architecture for competitive niches.' }
    ],
    process: [
        { title: "Audit & Forensic Analysis", description: "Deep dive into log files, crawl budgets, and JS rendering issues." },
        { title: "Semantic Mapping", description: "Building topic clusters that position you as the topical authority." },
        { title: "Execution & Monitoring", description: "Rapid deployment of fixes and real-time rank tracking." }
    ],
    techStack: ["Ahrefs", "SEMRush", "Screaming Frog", "Clearscope", "Google Search Console API", "Python Scripts"],
    relatedIndustries: ["Law & Legal", "Financial Services", "E-commerce"],
    faqs: [
        { question: "How long to see SEO results?", answer: "Typically 3-6 months for significant revenue impact, though technical fixes often yield immediate visibility gains within weeks." },
        { question: "Do you handle international SEO?", answer: "Yes, we specialize in complex hreflang implementations and multi-regional site architecture for global brands." },
        { question: "What is your approach to link building?", answer: "We focus exclusively on high-authority, editorial links. No PBNs, no spam. We use digital PR and data journalism to earn placements in tier-1 publications." },
        { question: "How do you prepare for Google SGE?", answer: "We optimize for 'Information Gain' and entity authority, ensuring your content answers complex queries that AI snapshots are likely to surface." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'ai-seo',
    title: 'GEO & AI Search',
    shortDescription: 'Get cited by ChatGPT, Gemini, Perplexity, and Google AI Overviews.',
    fullDescription: 'Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) for the new search reality. We optimize your entity graph for machine readability, structure content for extraction, and track your brand mentions across LLMs — so you are the answer, not a footnote.',
    icon: 'Brain',
    kpis: ['AI Citations', 'Entity Authority', 'AI Overview Coverage'],
    subServices: [
        { name: 'Generative Engine Optimization (GEO)', slug: 'generative-engine-optimization', description: 'Optimize to be cited by ChatGPT, Gemini, and Perplexity through structure, entities, and proof.' },
        { name: 'Answer Engine Optimization (AEO)', slug: 'answer-engine-optimization', description: 'Direct-answer formatting, FAQ architecture, summaries, and extractable answer blocks for Google AI Overviews.' },
        { name: 'AI Citation & Mention Tracking', slug: 'ai-citation-tracking', description: 'Monitor how and where AI engines cite your brand vs competitors, with prompt demand mapping.' },
        { name: 'Entity & Knowledge Graph', slug: 'entity-optimization', description: 'Strengthen Knowledge Graph clarity, schema markup, mentions, and proof consistency.' },
        { name: 'Voice Search Optimization', slug: 'voice-search-optimization', description: 'Conversational query coverage and concise, spoken-answer-ready content.' },
        { name: 'AI Search Visibility', slug: 'ai-search-visibility', description: 'Cross-engine visibility programs across ChatGPT, Gemini, Perplexity, and AI Overviews.' },
        { name: 'LLM Optimization', slug: 'llm-optimization', description: 'llms.txt, entity summaries, structured content, and machine-readable source-of-truth pages.' },
        { name: 'AI Content Governance', slug: 'ai-content-governance', description: 'Human review workflows, originality checks, evidence rules, and AI content quality controls.' },
        { name: 'AI Search Monitoring', slug: 'ai-search-monitoring', description: 'Citation tracking, competitor answer audits, and visibility reporting.' }
    ],
    process: [
        { title: "Entity Gap Analysis", description: "Determining missing nodes in your brand's knowledge graph." },
        { title: "Schema & Structure", description: "Implementing advanced JSON-LD and extraction-friendly content structure." },
        { title: "Citation Tracking", description: "Monitoring AI engine mentions and iterating toward consistent citations." }
    ],
    techStack: ["InLinks", "Schema App", "OpenAI API", "Perplexity", "Google Knowledge Graph API"],
    relatedIndustries: ["SaaS", "Financial Services", "Professional Services"],
    faqs: [
        { question: "What is GEO?", answer: "Generative Engine Optimization is the practice of structuring your content and entities so generative AI engines like ChatGPT, Gemini, and Perplexity cite your brand in their answers." },
        { question: "How is this different from traditional SEO?", answer: "Traditional SEO focuses on keywords and links for ranked results. GEO/AEO focuses on entities, structure, and proof so AI engines extract and cite you in synthesized answers." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'ppc',
    title: 'Paid Media (PPC)',
    shortDescription: 'Performance advertising across search, social, retail, and CTV.',
    fullDescription: 'Scientific paid media management across Google, Meta, LinkedIn, TikTok, Amazon, and beyond. We use predictive analytics, first-party data, and creative testing to bid smarter, lower CPA, and scale spend without losing efficiency. Management is 15% of ad spend.',
    icon: 'Zap',
    kpis: ['-25% CPA', '3.5x ROAS', 'Scale to $1M+ Spend'],
    subServices: [
        { name: 'Google Search Ads', slug: 'google-ads-management', description: 'Search campaigns engineered for lead quality and ROAS, not just clicks.' },
        { name: 'Google Shopping Ads', slug: 'google-shopping-ads', description: 'Feed optimization and Shopping campaigns for e-commerce revenue.' },
        { name: 'Performance Max', slug: 'performance-max', description: 'Asset-group structure, audience signals, and exclusions that make PMax profitable.' },
        { name: 'Microsoft / Bing Ads', slug: 'bing-ads', description: 'Lower-CPC search demand capture across the Microsoft ad network.' },
        { name: 'Meta Ads', slug: 'meta-ads', description: 'Facebook and Instagram campaigns with creative testing, retargeting, and funnel reporting.' },
        { name: 'LinkedIn Ads', slug: 'linkedin-ads', description: 'B2B targeting, ABM campaigns, lead gen forms, and pipeline tracking.' },
        { name: 'TikTok Ads', slug: 'tiktok-ads', description: 'Native short-form ad creative and scaling for performance and awareness.' },
        { name: 'YouTube Ads', slug: 'youtube-ads', description: 'Video campaigns for demand generation and retargeting at efficient CPV.' },
        { name: 'Amazon Ads', slug: 'amazon-ads', description: 'Sponsored Products, Brands, and Display to win the retail shelf.' },
        { name: 'Retargeting Campaigns', slug: 'retargeting-systems', description: 'Cross-platform remarketing journeys based on intent, page depth, and CRM stage.' },
        { name: 'Programmatic Advertising', slug: 'programmatic-advertising', description: 'DSP-based display and native buying with audience and brand-safety controls.' },
        { name: 'Connected TV (CTV) Ads', slug: 'ctv-ads', description: 'Streaming TV campaigns with measurable reach and outcome tracking.' },
        { name: 'Ad Creative Production', slug: 'ad-creative-production', description: 'High-velocity static and video ad creative built for testing.' },
        { name: 'Feed Management', slug: 'feed-management', description: 'Product feed cleanup, enrichment, and optimization across channels.' },
        { name: 'Landing Page CRO', slug: 'landing-page-cro', description: 'Message match, proof, forms, speed, offers, and conversion experimentation.' },
        { name: 'Paid Media Analytics', slug: 'paid-media-analytics', description: 'GA4, Looker, offline conversions, CRM imports, UTMs, and executive ROAS reporting.' }
    ],
    process: [
        { title: "Audit & Opportunity", description: "Analyzing account history to find wasted spend." },
        { title: "Creative Strategy", description: "Designing high-converting ad assets." },
        { title: "Bid Management", description: "Algorithmic bidding strategies for maximum efficiency." }
    ],
    techStack: ["Google Ads Editor", "Meta Ads Manager", "TikTok Ads Manager", "Supermetrics", "Looker Studio"],
    relatedIndustries: ["E-commerce", "SaaS", "Real Estate"],
    faqs: [
        { question: "What is your minimum budget?", answer: "We typically work with ad spends starting at $5k/month to ensure statistical significance." },
        { question: "How do you charge?", answer: "Management is 15% of total ad spend, aligning our incentives with efficient scale." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'content',
    title: 'Content Marketing',
    shortDescription: 'Strategy, writing, and assets that earn trust and rankings.',
    fullDescription: 'Content that does a job: rank, educate, and convert. We build the strategy, produce the assets — blogs, pillar pages, ebooks, case studies, infographics — and tie every piece to a buyer stage and a measurable action. Original, expert-led, and AI-assisted, never AI slop.',
    icon: 'FileText',
    kpis: ['+180% Organic Reach', 'Topical Authority', 'Lower CAC'],
    subServices: [
        { name: 'Content Strategy', slug: 'content-strategy', description: 'Audience, pillars, topic clusters, and an editorial plan tied to pipeline.' },
        { name: 'Blog Writing', slug: 'blog-writing', description: 'Expert-led, SEO-structured articles with information gain and internal links.' },
        { name: 'Copywriting', slug: 'copywriting', description: 'Conversion copy for pages, ads, and campaigns built around action.' },
        { name: 'Pillar Pages & Topic Clusters', slug: 'pillar-pages-topic-clusters', description: 'Hub-and-spoke content architecture that builds topical authority.' },
        { name: 'Ebooks & Whitepapers', slug: 'ebooks-whitepapers', description: 'Gated long-form assets that generate and nurture leads.' },
        { name: 'Case Studies', slug: 'case-studies-content', description: 'Proof-driven narratives with hard numbers for BOFU conversion.' },
        { name: 'Infographics', slug: 'infographics', description: 'Linkable visual assets that earn backlinks and social shares.' },
        { name: 'Ghostwriting / Thought Leadership', slug: 'ghostwriting-thought-leadership', description: 'Founder and executive POV content for LinkedIn and owned channels.' },
        { name: 'Content Repurposing', slug: 'content-repurposing', description: 'Turn one asset into many across blog, social, email, and video.' },
        { name: 'Editorial Calendar Management', slug: 'editorial-calendar-management', description: 'Planning, briefs, production, and publishing cadence management.' }
    ],
    process: [
        { title: 'Strategy & Briefs', description: 'Map topics to intent and write data-backed briefs.' },
        { title: 'Production', description: 'Expert-led writing, design, and editing with QA.' },
        { title: 'Distribution & Refresh', description: 'Publish, repurpose, and update for compounding returns.' }
    ],
    techStack: ['Clearscope', 'Surfer', 'Ahrefs', 'Notion', 'Grammarly', 'Frase'],
    relatedIndustries: ['SaaS', 'Professional Services', 'Coaching'],
    faqs: [
        { question: 'Is the content AI-generated?', answer: 'We use AI to accelerate research and drafting, but every asset is directed, edited, and fact-checked by human experts for originality and information gain.' },
        { question: 'How do you measure content ROI?', answer: 'Organic traffic, assisted conversions, leads, and pipeline influence — not vanity pageviews.' },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'smm',
    title: 'Social Media Marketing',
    shortDescription: 'Brand building and community across social ecosystems.',
    fullDescription: 'Data-driven social strategies that build community and drive revenue. We manage end-to-end creative, from short-form video production to community management, ensuring your brand voice resonates on every platform.',
    icon: 'Globe',
    kpis: ['+150% Engagement', '4x ROAS', 'Viral Reach'],
    expertQuote: {
        author: "Marcus Chen",
        role: "Creative Director",
        quote: "Content is no longer king; context is. A video that works on TikTok will fail on LinkedIn if the contextual wrapper isn't adjusted for the mindset of the user."
    },
    deepDive: [
        {
            title: "Algorithmic Resonance",
            content: "Each platform's algorithm prioritizes different signals. TikTok values watch time and retention; LinkedIn values comment density and dwell time. Our content production is reverse-engineered from these algorithmic requirements."
        }
    ],
    subServices: [
        { name: 'Social Media Strategy', slug: 'social-strategy', description: 'Platform-specific positioning, content pillars, posting cadence, and KPI systems.' },
        { name: 'Organic Social Management', slug: 'organic-social-management', description: 'End-to-end channel management, scheduling, and optimization.' },
        { name: 'Content Creation', slug: 'social-content-creation', description: 'Static, carousel, and video content tuned per platform.' },
        { name: 'Short-Form Video', slug: 'short-form-video', description: 'Reels, TikTok, Shorts, hooks, scripts, edit direction, and performance feedback loops.' },
        { name: 'Community Management', slug: 'community-management', description: 'Daily engagement, comment response, reputation handling, and community growth.' },
        { name: 'Social Listening', slug: 'social-listening', description: 'Brand and category monitoring for insight, reputation, and content ideas.' },
        { name: 'Social Commerce', slug: 'social-commerce', description: 'Shoppable content and in-platform storefronts that convert.' },
        { name: 'LinkedIn Thought Leadership', slug: 'linkedin-thought-leadership', description: 'Founder-led posts, executive POVs, B2B authority, and sales-support content.' },
        { name: 'Influencer Marketing', slug: 'influencer-marketing', description: 'Creator discovery, outreach, briefs, approvals, tracking, and campaign reporting.' }
    ],
    process: [
        { title: "Persona Development", description: "Identifying exactly who your audience is and where they live online." },
        { title: "Content Engine", description: "High-volume, high-quality production of Reels, TikToks, and posts." },
        { title: "Amplification", description: "Strategic boosting and cross-platform distribution." }
    ],
    techStack: ["Sprout Social", "Hootsuite", "Canva Enterprise", "Adobe Creative Suite", "TikTok Ads Manager"],
    relatedIndustries: ["Real Estate", "Coaching", "E-commerce"],
    faqs: [
        { question: "Which platforms do you cover?", answer: "We cover the full spectrum: LinkedIn, Instagram, TikTok, X (Twitter), YouTube, and emerging platforms like Threads." },
        { question: "Is content creation included?", answer: "Yes, we have a full in-house production studio for video, motion graphics, and static design." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'video',
    title: 'Video & Multimedia',
    shortDescription: 'Expert multimedia production: explainers, product films, testimonials, podcasts, and motion graphics.',
    fullDescription: 'Expert multimedia production, end to end. We script, shoot, edit, and optimize explainer videos, product films, customer testimonials, YouTube programs, podcasts, and motion graphics — each cut for the platform it runs on and the funnel stage it serves. Video is the highest-converting and most-shared format online, and every asset we produce is built to be measured against pipeline, not views.',
    icon: 'Video',
    kpis: ['2x Time-on-Page', 'Higher Trust', 'More Shares'],
    subServices: [
        { name: 'Explainer Videos', slug: 'explainer-videos', description: 'Concise, animated or live-action videos that make a complex offer clear.' },
        { name: 'Product Videos', slug: 'product-videos', description: 'Feature walkthroughs and demos that drive consideration and conversion.' },
        { name: 'Testimonial Videos', slug: 'testimonial-videos', description: 'Customer-proof films that accelerate BOFU decisions.' },
        { name: 'YouTube Channel Management', slug: 'youtube-channel-management', description: 'Strategy, production cadence, and optimization for a YouTube growth engine.' },
        { name: 'Podcast Production', slug: 'podcast-production', description: 'Booking, recording, editing, and repurposing for an owned audio channel.' },
        { name: 'Animation & Motion Graphics', slug: 'animation-motion-graphics', description: 'Brand motion, kinetic typography, and animated explainers.' }
    ],
    process: [
        { title: 'Pre-Production', description: 'Scripting, storyboarding, and shot planning tied to the goal.' },
        { title: 'Production', description: 'Filming or animation with brand-consistent direction.' },
        { title: 'Post & Distribution', description: 'Editing, captions, platform cuts, and performance optimization.' }
    ],
    techStack: ['Adobe Premiere', 'After Effects', 'DaVinci Resolve', 'Descript', 'Figma'],
    relatedIndustries: ['SaaS', 'Coaching', 'E-commerce'],
    faqs: [
        { question: 'Do you handle filming or just editing?', answer: 'Both. We run full production — script to final cut — or edit and optimize footage you already have.' },
        { question: 'Can you repurpose one shoot into many assets?', answer: 'Yes. A single shoot becomes explainers, social cuts, ads, and testimonial clips for compounding ROI.' },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'email-automation',
    title: 'Email & Marketing Automation',
    shortDescription: 'Lifecycle email, SMS/WhatsApp, flows, and CRM automation.',
    fullDescription: 'The highest-ROI channel in marketing, done right. We build segmentation, automated lifecycle flows, newsletters, and SMS/WhatsApp programs — plus the CRM and automation infrastructure (HubSpot, Klaviyo) that turns leads into revenue while you sleep.',
    icon: 'Mail',
    kpis: ['40x Email ROI', 'Automated Revenue', 'Higher LTV'],
    subServices: [
        { name: 'Email Campaign Management', slug: 'email-campaign-management', description: 'Planning, building, and sending campaigns that drive opens, clicks, and revenue.' },
        { name: 'Newsletter Management', slug: 'newsletter-management', description: 'Owned-audience newsletters that build trust and pipeline.' },
        { name: 'Automated Flows', slug: 'automated-flows', description: 'Welcome, abandonment, win-back, and post-purchase flows that run on autopilot.' },
        { name: 'List Segmentation', slug: 'list-segmentation', description: 'Behavioral and lifecycle segmentation for relevant, higher-converting sends.' },
        { name: 'Email Deliverability', slug: 'email-deliverability', description: 'Authentication, warmup, and reputation management to reach the inbox.' },
        { name: 'SMS & WhatsApp Marketing', slug: 'sms-whatsapp-marketing', description: 'Permission-based SMS and WhatsApp campaigns and flows for high open rates.' },
        { name: 'Marketing Automation Setup', slug: 'marketing-automation-setup', description: 'HubSpot and Klaviyo implementation, workflows, and integrations.' },
        { name: 'Lead Nurturing Workflows', slug: 'lead-nurturing-workflows', description: 'Stage-based nurture sequences that move MQLs to SQLs.' },
        { name: 'CRM Setup & Management', slug: 'crm-setup-management', description: 'Pipeline design, lead routing, scoring, and reporting in your CRM.' }
    ],
    process: [
        { title: 'Audit & Architecture', description: 'Review lists, deliverability, and lifecycle gaps.' },
        { title: 'Build Flows', description: 'Implement segmentation, automations, and CRM logic.' },
        { title: 'Optimize', description: 'A/B test, monitor deliverability, and grow LTV.' }
    ],
    techStack: ['HubSpot', 'Klaviyo', 'Customer.io', 'Twilio', 'Postmark'],
    relatedIndustries: ['E-commerce', 'SaaS', 'Coaching'],
    faqs: [
        { question: 'Which platforms do you work in?', answer: 'Primarily HubSpot and Klaviyo, plus Customer.io and others depending on your stack and goals.' },
        { question: 'Can you fix our deliverability?', answer: 'Yes — authentication (SPF/DKIM/DMARC), list hygiene, warmup, and content fixes to get you back in the inbox.' },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'cro-analytics',
    title: 'CRO & Analytics',
    shortDescription: 'Testing, tracking, and attribution that turn traffic into revenue.',
    fullDescription: 'Traffic is wasted without conversion and measurement. We run structured experimentation (A/B testing, funnel and landing-page optimization) and build the analytics backbone — GA4, GTM, server-side tracking, and attribution — so every decision is evidence-based.',
    icon: 'BarChart3',
    kpis: ['+35% Conversion', 'Clean Attribution', 'Evidence-Based Decisions'],
    subServices: [
        { name: 'A/B Testing', slug: 'ab-testing', description: 'Hypothesis-driven experiments with statistical rigor and a prioritized backlog.' },
        { name: 'Landing Page Optimization', slug: 'landing-page-optimization', description: 'Message match, proof, and friction reduction to lift conversion.' },
        { name: 'Funnel Optimization', slug: 'funnel-optimization', description: 'End-to-end funnel diagnosis and fixes from click to closed.' },
        { name: 'Heatmaps & Session Recording', slug: 'heatmaps-session-recording', description: 'Behavioral analysis with Clarity/Hotjar to find friction and opportunity.' },
        { name: 'GA4 Setup', slug: 'ga4-setup', description: 'Clean GA4 implementation with events, conversions, and reporting.' },
        { name: 'Google Tag Manager Setup', slug: 'google-tag-manager-setup', description: 'GTM containers, triggers, and a maintainable tagging structure.' },
        { name: 'Conversion Tracking', slug: 'conversion-tracking', description: 'Accurate cross-channel conversion measurement and goal mapping.' },
        { name: 'Server-Side Tracking', slug: 'server-side-tracking', description: 'Server-side GTM for durable, privacy-resilient measurement.' },
        { name: 'Attribution Modeling', slug: 'attribution-modeling', description: 'Multi-touch attribution that credits the channels that actually drive revenue.' },
        { name: 'Reporting Dashboards', slug: 'reporting-dashboards', description: 'Looker Studio dashboards that turn data into decisions.' }
    ],
    process: [
        { title: 'Measure', description: 'Stand up clean tracking and a single source of truth.' },
        { title: 'Diagnose', description: 'Find the highest-leverage conversion leaks.' },
        { title: 'Experiment', description: 'Test, learn, and compound wins.' }
    ],
    techStack: ['GA4', 'Google Tag Manager', 'Microsoft Clarity', 'Optimizely', 'Looker Studio', 'Segment'],
    relatedIndustries: ['E-commerce', 'SaaS', 'Financial Services'],
    faqs: [
        { question: 'How long until an A/B test is conclusive?', answer: 'It depends on traffic and baseline conversion, but we size tests up front so you know the timeline before launching.' },
        { question: 'Why server-side tracking?', answer: 'It improves data accuracy and resilience against ad blockers and browser privacy changes, protecting your measurement and ad performance.' },
        ...COMMON_FAQS
    ]
  }
];

// Services that generate per-location pages (/locations/[loc]/[service]).
// Gated to the original 6 so we keep the matrix at LOCATIONS × 6 (no new thin
// pages, no removed URLs). The 5 new categories live as global service pages;
// high-value location combos can be promoted later via the relevance mesh.
export const LOCATION_MATRIX_SERVICE_IDS = [
  'seo',
  'smm',
  'ai-seo',
  'web-development',
  'branding-creative',
  'ppc',
] as const;

export const LOCATION_MATRIX_SERVICES = SERVICES.filter((s) =>
  (LOCATION_MATRIX_SERVICE_IDS as readonly string[]).includes(s.id),
);
