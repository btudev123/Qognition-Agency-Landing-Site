
import { Service } from '../types';

const COMMON_FAQS = [
    { question: "How do you integrate AI into your workflow?", answer: "We utilize a proprietary stack of LLMs for data analysis, semantic entity mapping, and predictive trend modeling, while maintaining human oversight for strategic creativity." },
    { question: "What is your typical engagement model?", answer: "We operate primarily on a retainer basis for long-term growth partnerships, with project-based execution for specific technical infrastructure builds." },
    { question: "How do you handle data privacy?", answer: "We are fully GDPR, CCPA, and SOC2 compliant. Your proprietary data is never used to train public models without explicit consent." }
];

export const SERVICES: Service[] = [
  {
    id: 'seo',
    title: 'SEO & Organic Growth',
    shortDescription: 'Technical & Content SEO for Enterprise Scale.',
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
        { name: 'Technical SEO', slug: 'technical-seo', description: 'Crawlability, indexing, Core Web Vitals, schema, canonicals, and JavaScript rendering audits.' },
        { name: 'Content Strategy', slug: 'content-strategy', description: 'Buyer-intent topic clusters, editorial calendars, content briefs, refreshes, and internal link systems.' },
        { name: 'Link Building', slug: 'link-building', description: 'Digital PR, authority assets, editorial outreach, and risk-controlled backlink acquisition.' },
        { name: 'Local SEO', slug: 'local-seo', description: 'Google Business Profile, city pages, review systems, maps visibility, and local conversion paths.' },
        { name: 'Scalable SEO Pages', slug: 'programmatic-seo', description: 'Service, industry, location, glossary, comparison, and directory page systems with original content and strong internal links.' },
        { name: 'E-E-A-T SEO', slug: 'eeat-seo', description: 'Author profiles, proof blocks, expert quotes, citations, reviews, and trust architecture for competitive niches.' }
    ],
    process: [
        { title: "Audit & Forensic Analysis", description: "Deep dive into log files, crawl budgets, and JS rendering issues." },
        { title: "Semantic Mapping", description: "Building topic clusters that position you as the topical authority." },
        { title: "Execution & Monitoring", description: "Rapid deployment of fixes and real-time rank tracking." }
    ],
    techStack: ["Ahrefs", "SEMRush", "Screaming Frog", "Clearscope", "Google Search Console API", "Python Scripts"],
    relatedIndustries: ["Law Firms & Legal", "Financial Services", "E-commerce"],
    faqs: [
        { question: "How long to see SEO results?", answer: "Typically 3-6 months for significant revenue impact, though technical fixes often yield immediate visibility gains within weeks." },
        { question: "Do you handle international SEO?", answer: "Yes, we specialize in complex hreflang implementations and multi-regional site architecture for global brands." },
        { question: "What is your approach to link building?", answer: "We focus exclusively on high-authority, editorial links. No PBNs, no spam. We use digital PR and data journalism to earn placements in tier-1 publications." },
        { question: "How do you prepare for Google SGE?", answer: "We optimize for 'Information Gain' and entity authority, ensuring your content answers complex queries that AI snapshots are likely to surface." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'smm',
    title: 'Social Media Marketing',
    shortDescription: 'Brand building across social ecosystems.',
    fullDescription: 'Data-driven social strategies that build community and drive revenue. We manage end-to-end creative, from short-form video production to community management, ensuring your brand voice resonates globally.',
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
        { name: 'Social Strategy', slug: 'social-strategy', description: 'Platform-specific positioning, content pillars, posting cadence, and KPI systems.' },
        { name: 'LinkedIn Thought Leadership', slug: 'linkedin-thought-leadership', description: 'Founder-led posts, executive POVs, B2B authority, and sales-support content.' },
        { name: 'Short-Form Video', slug: 'short-form-video', description: 'Reels, TikTok, Shorts, hooks, scripts, edit direction, and performance feedback loops.' },
        { name: 'Community Management', slug: 'community-management', description: 'Daily engagement, comment response, reputation handling, and community growth routines.' },
        { name: 'Influencer Marketing', slug: 'influencer-marketing', description: 'Creator discovery, outreach, briefs, approvals, tracking, and campaign reporting.' },
        { name: 'Social Analytics', slug: 'social-analytics', description: 'Channel dashboards, content scoring, audience insights, and conversion attribution.' }
    ],
    process: [
        { title: "Persona Development", description: "Identifying exactly who your audience is and where they live online." },
        { title: "Content Engine", description: "High-volume, high-quality production of Reels, TikToks, and posts." },
        { title: "Amplification", description: "Strategic boosting and cross-platform distribution." }
    ],
    techStack: ["Sprout Social", "Hootsuite", "Canva Enterprise", "Adobe Creative Suite", "TikTok Ads Manager"],
    relatedIndustries: ["Real Estate", "Coaching", "Care Homes"],
    faqs: [
        { question: "Which platforms do you cover?", answer: "We cover the full spectrum: LinkedIn, Instagram, TikTok, X (Twitter), YouTube, and even emerging platforms like Threads." },
        { question: "Is content creation included?", answer: "Yes, we have a full in-house production studio for video, motion graphics, and static design." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'ai-seo',
    title: 'AI SEO & SGE Strategy',
    shortDescription: 'Next-Gen Search Strategy for LLMs.',
    fullDescription: 'Prepare for SGE (Search Generative Experience) and LLM-based discovery. We optimize your entity graph for machine readability, ensuring your brand is cited by ChatGPT, Gemini, and Claude.',
    icon: 'Brain',
    kpis: ['SGE Visibility', 'Entity Authority', 'LLM Citations'],
    subServices: [
        { name: 'AI Search Visibility', slug: 'ai-search-visibility', description: 'Optimize for ChatGPT, Gemini, Perplexity, AI Overviews, and answer-engine citations.' },
        { name: 'LLM Optimization', slug: 'llm-optimization', description: 'llm.txt, entity summaries, structured content, and machine-readable source-of-truth pages.' },
        { name: 'Entity Optimization', slug: 'entity-optimization', description: 'Strengthening Knowledge Graph clarity, schema markup, mentions, and proof consistency.' },
        { name: 'AEO Strategy', slug: 'answer-engine-optimization', description: 'Direct-answer formatting, FAQ architecture, summaries, and extractable answer blocks.' },
        { name: 'AI Content Governance', slug: 'ai-content-governance', description: 'Human review workflows, originality checks, evidence rules, and AI content quality controls.' },
        { name: 'AI Search Monitoring', slug: 'ai-search-monitoring', description: 'Citation tracking, competitor answer audits, prompt demand mapping, and visibility reporting.' }
    ],
    process: [
        { title: "Entity Gap Analysis", description: "Determining missing nodes in your brand's knowledge graph." },
        { title: "Schema Injection", description: "Implementing advanced JSON-LD to feed search engines structured data." },
        { title: "LLM Training Content", description: "Creating content specifically structured for ingestion by Large Language Models." }
    ],
    techStack: ["InLinks", "Schema App", "OpenAI API", "Google Knowledge Graph API"],
    relatedIndustries: ["Tech SaaS", "Financial Services", "Medical"],
    faqs: [
        { question: "What is AI SEO?", answer: "It is the process of optimizing your digital presence to be understood and cited by AI models (LLMs) and AI-powered search engines like Google SGE." },
        { question: "How is this different from traditional SEO?", answer: "Traditional SEO focuses on keywords and links. AI SEO focuses on entities, relationships, and structured data that machines can parse." },
        ...COMMON_FAQS
    ]
  },
  {
    id: 'web-development',
    title: 'Web Design & Development',
    shortDescription: 'High-performance Next.js sites.',
    fullDescription: 'We build the fastest, most secure websites on the web using React, Next.js, and headless CMS architecture. Our sites are not just brochures; they are high-performance growth engines.',
    icon: 'Code',
    kpis: ['100 PageSpeed', '<1s Load Time', 'Award-Winning UI'],
    subServices: [
        { name: 'Next.js SEO', slug: 'nextjs-seo', description: 'App Router architecture, static generation, metadata, schema, sitemaps, and indexing checks.' },
        { name: 'Conversion Websites', slug: 'conversion-websites', description: 'High-performance marketing sites built around offers, proof, forms, and booked calls.' },
        { name: 'Landing Pages', slug: 'landing-pages', description: 'Campaign pages with message match, fast load times, proof blocks, and CRM-ready forms.' },
        { name: 'Headless CMS', slug: 'headless-cms', description: 'Sanity, Contentful, and CMS workflows for publishing SEO pages without developer bottlenecks.' },
        { name: 'E-commerce Web Design', slug: 'ecommerce-web-design', description: 'Shopify Plus, product storytelling, collection SEO, CRO, and checkout journey improvements.' },
        { name: 'Web Performance', slug: 'web-performance', description: 'Lighthouse, Core Web Vitals, image delivery, hydration cost, and third-party script governance.' }
    ],
    process: [
        { title: "UX Discovery", description: "Wireframing and user journey mapping." },
        { title: "Component Development", description: "Building a reusable design system in React/Tailwind." },
        { title: "Performance Tuning", description: "Code splitting, image optimization, and edge caching." }
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Sanity CMS", "Vercel"],
    relatedIndustries: ["SaaS", "Luxury Retail", "Manufacturing"],
    faqs: [
        { question: "Do you use templates?", answer: "Never. Every line of code is bespoke to your brand requirements." },
        { question: "Why Next.js over WordPress?", answer: "Security, speed, and scalability. Headless architectures allow for instantaneous page loads and better SEO core web vitals." },
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
        { name: 'Brand Strategy', slug: 'brand-strategy', description: 'Positioning, messaging, category narrative, audience insight, and proof architecture.' },
        { name: 'Visual Identity', slug: 'visual-identity', description: 'Logo systems, typography, color, layout, iconography, and brand guidelines.' },
        { name: 'Creative Direction', slug: 'creative-direction', description: 'Campaign concepts, moodboards, content direction, art direction, and launch creative.' },
        { name: 'Graphic Design', slug: 'graphic-design', description: 'Social assets, ad creatives, pitch visuals, one-pagers, carousels, and lead magnet design.' },
        { name: 'Motion Design', slug: 'motion-design', description: 'Short-form motion, kinetic typography, product explainers, social cuts, and launch videos.' },
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
    id: 'ppc',
    title: 'PPC & Performance',
    shortDescription: 'Paid acquisition with high ROAS.',
    fullDescription: 'Scientific paid media management across Google, Meta, and LinkedIn. We use predictive analytics and first-party data to bid smarter and scale faster.',
    icon: 'Zap',
    kpis: ['-25% CPA', '3.5x ROAS', 'Scale to $1M+ Spend'],
    subServices: [
        { name: 'Google Ads Management', slug: 'google-ads-management', description: 'Search, Performance Max, Shopping, lead generation, and ROAS optimization.' },
        { name: 'Landing Page CRO', slug: 'landing-page-cro', description: 'Message match, proof, forms, speed, offers, and conversion experimentation.' },
        { name: 'Meta Ads', slug: 'meta-ads', description: 'Facebook and Instagram campaigns with creative testing, retargeting, and funnel reporting.' },
        { name: 'LinkedIn Ads', slug: 'linkedin-ads', description: 'B2B targeting, ABM campaigns, lead gen forms, thought leadership ads, and pipeline tracking.' },
        { name: 'Retargeting Systems', slug: 'retargeting-systems', description: 'Cross-platform remarketing journeys based on intent, page depth, CRM stage, and audience quality.' },
        { name: 'Paid Media Analytics', slug: 'paid-media-analytics', description: 'GA4, Looker, offline conversions, CRM imports, UTMs, and executive ROAS reporting.' }
    ],
    process: [
        { title: "Audit & Opportunity", description: "Analyzing account history to find wasted spend." },
        { title: "Creative Strategy", description: "Designing high-converting ad assets." },
        { title: "Bid Management", description: "Algorithmic bidding strategies for maximum efficiency." }
    ],
    techStack: ["Google Ads Editor", "Meta Ads Manager", "Supermetrics", "Looker Studio"],
    relatedIndustries: ["E-commerce", "SaaS", "Local Services"],
    faqs: [
        { question: "What is your minimum budget?", answer: "We typically work with ad spends starting at $5k/month to ensure statistical significance." },
        { question: "Do you charge a % of spend?", answer: "Our pricing is a hybrid of flat fee and performance incentives, ensuring our goals are aligned with yours." },
        ...COMMON_FAQS
    ]
  }
];
