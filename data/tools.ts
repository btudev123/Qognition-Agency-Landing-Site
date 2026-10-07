
import { Tool, ToolCategory } from '../types';

export const TOOLS: Tool[] = [
    // --- LLMs ---
    {
        id: 'openai',
        name: 'OpenAI API',
        category: 'LLMs & AI Models',
        shortDescription: "API access to OpenAI models.",
        fullDescription: "OpenAI API is a candidate for model-backed research, drafting and application workflows. Evaluate the currently available models against your task, latency, data-handling and cost requirements.",
        pricing: 'Paid',
        websiteUrl: 'https://openai.com/api',
        tags: ['LLM', 'AI', 'API'],
        agencyVerdict: "Test representative inputs and review failures before choosing a model. Record output quality and operating cost for your own workload.",
        relatedServiceId: 'ai-seo'
    },
    {
        id: 'claude',
        name: 'Claude',
        category: 'LLMs & AI Models',
        shortDescription: "AI assistance for research, writing and coding.",
        fullDescription: "Claude can be evaluated for drafting, analysis and software workflows. Model availability, context limits and account features change; check current documentation before planning an integration.",
        pricing: 'Paid',
        websiteUrl: 'https://www.anthropic.com/',
        tags: ['LLM', 'AI', 'Coding'],
        agencyVerdict: "Assess source fidelity, editing effort and handling of long inputs with your own examples. Human review remains necessary before publishing claims.",
        relatedServiceId: 'seo'
    },
    {
        id: 'gemini',
        name: 'Google Gemini',
        category: 'LLMs & AI Models',
        shortDescription: "Google’s family of AI models and assistant tools.",
        fullDescription: "Gemini is a candidate for text and multimodal workflows. Confirm the capabilities, limits and data terms of the specific model and product you intend to use.",
        pricing: 'Freemium',
        websiteUrl: 'https://deepmind.google/technologies/gemini/',
        tags: ['LLM', 'Multimodal', 'Google'],
        agencyVerdict: "Compare relevant model outputs against a documented evaluation set. A large input window does not establish a complete or accurate website audit.",
        relatedServiceId: 'ai-seo'
    },
    {
        id: 'mistral',
        name: 'Mistral AI',
        category: 'LLMs & AI Models',
        shortDescription: "AI models and deployment options.",
        fullDescription: "Mistral offers models and related developer services. Check the licence and deployment requirements of the selected model before considering it for a private environment.",
        pricing: 'Freemium',
        websiteUrl: 'https://mistral.ai/',
        tags: ['Open Source', 'LLM', 'Privacy'],
        agencyVerdict: "Assess operational skills, infrastructure and data requirements alongside answer quality. Hosting a model yourself does not by itself establish compliance.",
        relatedServiceId: 'web-development'
    },

    // --- Engineering ---
    {
        id: 'vercel',
        name: 'Vercel',
        category: 'Engineering & Dev',
        shortDescription: "A deployment platform for web applications.",
        fullDescription: "Vercel is a candidate for hosting and deploying web applications, including Next.js sites. Evaluate deployment workflows, runtime requirements, observability and expected usage before choosing a plan.",
        pricing: 'Freemium',
        websiteUrl: 'https://vercel.com',
        tags: ['Hosting', 'Cloud', 'Next.js'],
        agencyVerdict: "Measure performance on representative routes and devices. Hosting choice alone does not guarantee loading speed or search visibility.",
        relatedServiceId: 'web-development'
    },
    {
        id: 'supabase',
        name: 'Supabase',
        category: 'Engineering & Dev',
        shortDescription: "A Postgres-based application platform.",
        fullDescription: "Supabase provides a platform for database-backed applications. Confirm the current database, authentication, API and hosting capabilities against your technical requirements.",
        pricing: 'Freemium',
        websiteUrl: 'https://supabase.com',
        tags: ['Database', 'Backend', 'Postgres'],
        agencyVerdict: "Evaluate access controls, backups, workload limits, migrations and operating costs. Benchmark the expected workload before making scale assumptions.",
        relatedServiceId: 'web-development'
    },
    {
        id: 'cursor',
        name: 'Cursor',
        category: 'Engineering & Dev',
        shortDescription: "An AI-assisted code editor.",
        fullDescription: "Cursor is an editor that can assist with coding tasks. Evaluate it against the repository, development conventions and review requirements your team actually uses.",
        pricing: 'Freemium',
        websiteUrl: 'https://cursor.com',
        tags: ['IDE', 'AI', 'Coding', 'Developer Tools'],
        agencyVerdict: "Review proposed changes, run relevant checks and measure task outcomes. Productivity depends on the task and review effort; no delivery-speed multiplier is assumed.",
        relatedServiceId: 'web-development'
    },
    {
        id: 'linear',
        name: 'Linear',
        category: 'Engineering & Dev',
        shortDescription: "Issue and project tracking for software teams.",
        fullDescription: "Linear is a candidate for coordinating issues and project work. Check how its current workflows and integrations fit your team’s planning and reporting needs.",
        pricing: 'Paid',
        websiteUrl: 'https://linear.app',
        tags: ['Project Management', 'Agile'],
        agencyVerdict: "Trial ownership, prioritisation and handover with one project before changing the wider delivery process.",
        relatedServiceId: 'web-development'
    },

    // --- Marketing ---
    {
        id: 'hubspot',
        name: 'HubSpot',
        category: 'Marketing & Sales',
        shortDescription: "CRM and related sales and marketing tools.",
        fullDescription: "HubSpot is a candidate for managing customer records and related sales and marketing workflows. Product capabilities and limits depend on the selected plans.",
        pricing: 'Freemium',
        websiteUrl: 'https://hubspot.com',
        tags: ['CRM', 'Automation', 'Email'],
        agencyVerdict: "Map lifecycle definitions, permissions, consent, integrations and data exports before designing a workflow. Confirm what the chosen account can support.",
        relatedServiceId: 'ppc'
    },
    {
        id: 'ahrefs',
        name: 'Ahrefs',
        category: 'Marketing & Sales',
        shortDescription: "Search research and website analysis tools.",
        fullDescription: "Ahrefs is a candidate for backlink research, keyword investigation and site analysis. Its datasets and estimates should be considered alongside first-party search and conversion data.",
        pricing: 'Paid',
        websiteUrl: 'https://ahrefs.com',
        tags: ['SEO', 'Analytics', 'Backlinks', 'Competitive Intelligence', 'Keyword Difficulty'],
        agencyVerdict: "Use estimated metrics to investigate opportunities, then inspect search results and business relevance. A tool score is not a prediction of ranking or revenue.",
        relatedServiceId: 'seo'
    },
    {
        id: 'lemlist',
        name: 'Lemlist',
        category: 'Marketing & Sales',
        shortDescription: "Tools for organising outbound sequences.",
        fullDescription: "Lemlist is a candidate for managing prospecting workflows. Confirm current sending, integration and account controls before considering it for a campaign.",
        pricing: 'Paid',
        websiteUrl: 'https://lemlist.com',
        tags: ['Email', 'Outreach', 'B2B'],
        agencyVerdict: "Review targeting, contact provenance, suppression and message relevance before sending. Automation alone does not establish permission or improve replies.",
        relatedServiceId: 'ppc'
    },
    {
        id: 'typeform',
        name: 'Typeform',
        category: 'Marketing & Sales',
        shortDescription: "Forms and surveys for collecting information.",
        fullDescription: "Typeform is a candidate for surveys, questionnaires and enquiry collection. Evaluate the form experience, accessibility, integrations and data handling against the information you need.",
        pricing: 'Freemium',
        websiteUrl: 'https://typeform.com',
        tags: ['Lead Gen', 'Forms', 'UX'],
        agencyVerdict: "Compare completion and enquiry quality using your own audience. Conversational presentation does not guarantee better conversion.",
        relatedServiceId: 'web-development'
    },

    // --- Design ---
    {
        id: 'figma',
        name: 'Figma',
        category: 'Design & Creative',
        shortDescription: "Collaborative design and prototyping tools.",
        fullDescription: "Figma is a candidate for interface design, prototyping and design handover. Confirm the capabilities and collaboration terms needed for your project.",
        pricing: 'Freemium',
        websiteUrl: 'https://figma.com',
        tags: ['Design', 'UI/UX', 'Prototyping', 'Design Systems'],
        agencyVerdict: "Evaluate how design decisions, components and specifications reach implementation. Agree review ownership before using a prototype as a delivery reference.",
        relatedServiceId: 'web-development'
    },
    {
        id: 'midjourney',
        name: 'Midjourney',
        category: 'Design & Creative',
        shortDescription: "AI image-generation tools.",
        fullDescription: "Midjourney is a candidate for visual exploration and generated imagery. Check current access methods, licensing and usage terms before incorporating outputs into published material.",
        pricing: 'Paid',
        websiteUrl: 'https://midjourney.com',
        tags: ['AI Art', 'Generative', 'Images'],
        agencyVerdict: "Review accuracy, brand fit and rights for each intended use. Generated imagery should not be presented as a photograph of actual clients or completed work.",
        relatedServiceId: 'smm'
    },
    {
        id: 'spline',
        name: 'Spline',
        category: 'Design & Creative',
        shortDescription: "Tools for creating interactive 3D content.",
        fullDescription: "Spline is a candidate for 3D design and interactive web content. Confirm export, hosting and integration options for the experience you intend to build.",
        pricing: 'Freemium',
        websiteUrl: 'https://spline.design',
        tags: ['3D', 'WebGL', 'Animation'],
        agencyVerdict: "Test loading cost, accessibility, mobile behaviour and reduced-motion handling. Add 3D only when it helps the visitor understand or complete a task.",
        relatedServiceId: 'web-development'
    },
    {
        id: 'firefly',
        name: 'Adobe Firefly',
        category: 'Design & Creative',
        shortDescription: "Adobe’s generative creative tools.",
        fullDescription: "Adobe Firefly is a candidate for generated creative assets. Check the current product capabilities and applicable terms for the asset and account involved.",
        pricing: 'Paid',
        websiteUrl: 'https://firefly.adobe.com',
        tags: ['AI', 'Adobe', 'Enterprise'],
        agencyVerdict: "Review the output and permitted use for each project. No generated asset should be described as free of copyright or other rights issues without a specific basis.",
        relatedServiceId: 'smm'
    },

    // --- Social ---
    {
        id: 'sprout',
        name: 'Sprout Social',
        category: 'Social & Community',
        shortDescription: "Social publishing, management and reporting tools.",
        fullDescription: "Sprout Social is a candidate for coordinating social channels and reporting. Confirm network support, approval controls and data availability for the accounts involved.",
        pricing: 'Paid',
        websiteUrl: 'https://sproutsocial.com',
        tags: ['Social Media', 'Analytics', 'Enterprise'],
        agencyVerdict: "Evaluate permissions, review workflow and useful reporting against your team’s needs. Channel activity and commercial outcomes should be measured separately.",
        relatedServiceId: 'smm'
    },
    {
        id: 'taplio',
        name: 'Taplio',
        category: 'Social & Community',
        shortDescription: "Tools for planning LinkedIn content.",
        fullDescription: "Taplio is a candidate for organising LinkedIn content work. Check current product features and the platform rules that apply to any proposed workflow.",
        pricing: 'Paid',
        websiteUrl: 'https://taplio.com',
        tags: ['LinkedIn', 'Personal Branding', 'AI'],
        agencyVerdict: "Keep expertise, authorship and approvals clear. Evaluate whether the workflow helps your audience rather than assuming more activity creates qualified demand.",
        relatedServiceId: 'smm'
    },
    {
        id: 'hypefury',
        name: 'Hypefury',
        category: 'Social & Community',
        shortDescription: "Tools for planning and scheduling social content.",
        fullDescription: "Hypefury is a candidate for social publishing workflows. Confirm current channel support, scheduling controls and account terms before using it.",
        pricing: 'Paid',
        websiteUrl: 'https://hypefury.com',
        tags: ['Twitter', 'X', 'Growth'],
        agencyVerdict: "Review relevance and timing before reusing content. Measure meaningful audience responses separately from impressions and posting volume.",
        relatedServiceId: 'smm'
    },

    // --- Finance ---
    {
        id: 'stripe',
        name: 'Stripe',
        category: 'Finance & Ops',
        shortDescription: "Payment and billing infrastructure.",
        fullDescription: "Stripe is a candidate for payment and billing workflows. Confirm supported countries, business types, payment methods and integration requirements for the specific use case.",
        pricing: 'Freemium',
        websiteUrl: 'https://stripe.com',
        tags: ['Payments', 'Billing', 'API'],
        agencyVerdict: "Evaluate reconciliation, refunds, subscription handling and failure states. Payment-provider suitability varies by business and operating market.",
        relatedServiceId: 'web-development'
    },
    {
        id: 'mercury',
        name: 'Mercury',
        category: 'Finance & Ops',
        shortDescription: "Business financial-services tools.",
        fullDescription: "Mercury is a candidate to investigate for eligible business financial operations. Confirm account eligibility, the service providers involved and applicable terms directly with the provider.",
        pricing: 'Free',
        websiteUrl: 'https://mercury.com',
        tags: ['Banking', 'Startups', 'Fintech'],
        agencyVerdict: "Compare operational requirements, account controls and integrations. This directory is an evaluation reference, not financial advice or a recommendation to open an account.",
        relatedServiceId: 'ppc'
    },
    {
        id: 'brex',
        name: 'Brex',
        category: 'Finance & Ops',
        shortDescription: "Business spending and expense-management tools.",
        fullDescription: "Brex is a candidate to investigate for business expense workflows. Confirm eligibility, available products and current account terms directly with the provider.",
        pricing: 'Free',
        websiteUrl: 'https://brex.com',
        tags: ['Credit Cards', 'Expense Management'],
        agencyVerdict: "Evaluate approval controls, reconciliation and reporting for the intended use. Availability and terms depend on the business and account.",
        relatedServiceId: 'ppc'
    },

    // --- AI Agents ---
    {
        id: 'auto-gpt',
        name: 'AutoGPT',
        category: 'AI Agents',
        shortDescription: "Tools for building agent workflows.",
        fullDescription: "AutoGPT is a candidate for exploring multi-step AI workflows. Inspect the current project, licence, deployment requirements and tool permissions before use.",
        pricing: 'Open Source',
        websiteUrl: 'https://news.agpt.co/',
        tags: ['Agents', 'Automation', 'Experimental'],
        agencyVerdict: "Start with bounded tasks and reviewable outputs. External actions require explicit limits, approval where appropriate and an observable failure path.",
        relatedServiceId: 'ai-seo'
    },
    {
        id: 'perplexity',
        name: 'Perplexity',
        category: 'AI Agents',
        shortDescription: "An AI-assisted search and answer service.",
        fullDescription: "Perplexity is a candidate for exploring questions and locating web sources. Inspect cited material directly before relying on an answer or publishing a factual claim.",
        pricing: 'Freemium',
        websiteUrl: 'https://perplexity.ai',
        tags: ['Search', 'Research', 'AI'],
        agencyVerdict: "Record the query, date and sources when using answers in research. A citation is a lead to evidence, not independent verification of a claim.",
        relatedServiceId: 'seo'
    },
    {
        id: 'agent-gpt',
        name: 'AgentGPT',
        category: 'AI Agents',
        shortDescription: "A reference for browser-based agent workflows.",
        fullDescription: "AgentGPT is a candidate to investigate when exploring browser-based AI agents. Confirm the project’s current availability, supported actions and operating requirements before planning around it.",
        pricing: 'Freemium',
        websiteUrl: 'https://agentgpt.reworkd.ai/',
        tags: ['Agents', 'No-Code', 'Automation'],
        agencyVerdict: "Use a small, bounded evaluation with inspectable outputs. Do not assume autonomous execution is suitable for an unsupervised production process.",
        relatedServiceId: 'ai-seo'
    }
];
