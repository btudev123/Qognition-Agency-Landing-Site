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
    subServices: [
        { name: 'Technical SEO', description: 'Crawlability, indexing, and core web vitals optimization. Javascript rendering audits.' },
        { name: 'Content SEO', description: 'Semantic clustering and authority building via long-form expert content.' },
        { name: 'Link Acquisition', description: 'High-DR backlink campaigns through digital PR and data journalism.' }
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
    subServices: [
        { name: 'Strategy & Direction', description: 'Platform-specific content roadmaps and voice definition.' },
        { name: 'Community Management', description: '24/7 engagement and growth. Crisis management protocols.' },
        { name: 'Influencer Marketing', description: 'Global creator partnerships and campaign management.' }
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
        { name: 'Entity Optimization', description: 'Strengthening Knowledge Graph presence and schema markup.' },
        { name: 'SGE Readiness', description: 'Formatting content for AI snapshots and direct answers.' },
        { name: 'Voice Search', description: 'Conversational query optimization for natural language.' }
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
        { name: 'Corporate Sites', description: 'Scalable marketing sites with enterprise-grade security.' },
        { name: 'E-commerce', description: 'Shopify Plus & Headless Commerce implementations.' },
        { name: 'WebGL Experiences', description: 'Immersive 3D interactions and scroll-telling.' }
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
    id: 'ppc',
    title: 'PPC & Performance',
    shortDescription: 'Paid acquisition with high ROAS.',
    fullDescription: 'Scientific paid media management across Google, Meta, and LinkedIn. We use predictive analytics and first-party data to bid smarter and scale faster.',
    icon: 'Zap',
    kpis: ['-25% CPA', '3.5x ROAS', 'Scale to $1M+ Spend'],
    subServices: [
        { name: 'Google Ads', description: 'Search, Display, and Shopping campaign management.' },
        { name: 'Social Ads', description: 'Meta, LinkedIn, TikTok Ads for full-funnel growth.' },
        { name: 'Retargeting', description: 'Cross-platform dynamic remarketing sequences.' }
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