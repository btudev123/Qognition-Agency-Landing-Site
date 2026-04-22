
import { Tool, ToolCategory } from '../types';

export const TOOLS: Tool[] = [
    // --- LLMs ---
    {
        id: 'openai',
        name: 'OpenAI API',
        category: 'LLMs & AI Models',
        shortDescription: 'The industry standard for LLM integration.',
        fullDescription: 'OpenAI provides the models (GPT-4o, GPT-4 Turbo) that power the majority of modern AI applications. Their API is robust, scalable, and offers the best general-purpose reasoning capabilities on the market.',
        pricing: 'Paid',
        websiteUrl: 'https://openai.com/api',
        rating: 4.9,
        tags: ['LLM', 'AI', 'API'],
        agencyVerdict: "The default choice for 90% of our AI integrations. GPT-4o's speed makes it viable for real-time applications.",
        relatedServiceId: 'ai-seo'
    },
    {
        id: 'claude',
        name: 'Claude 3.5 Sonnet',
        category: 'LLMs & AI Models',
        shortDescription: 'The best model for coding and creative writing.',
        fullDescription: 'Anthropic\'s Claude 3.5 Sonnet offers a massive context window and a more natural, human-like writing style compared to GPT. It excels at complex coding tasks and nuaced content generation.',
        pricing: 'Paid',
        websiteUrl: 'https://www.anthropic.com/',
        rating: 4.9,
        tags: ['LLM', 'AI', 'Coding'],
        agencyVerdict: "We prefer Claude for generating long-form content and SEO articles because it sounds less 'robotic' than GPT.",
        relatedServiceId: 'seo'
    },
    {
        id: 'gemini',
        name: 'Google Gemini',
        category: 'LLMs & AI Models',
        shortDescription: 'Multimodal AI with massive context windows.',
        fullDescription: 'Gemini 1.5 Pro features a 1M+ token context window, allowing it to process entire codebases or books in a single prompt. Deeply integrated with the Google Cloud ecosystem.',
        pricing: 'Freemium',
        websiteUrl: 'https://deepmind.google/technologies/gemini/',
        rating: 4.7,
        tags: ['LLM', 'Multimodal', 'Google'],
        agencyVerdict: "Essential for analyzing large datasets. We use it to audit entire client websites in one go.",
        relatedServiceId: 'ai-seo'
    },
    {
        id: 'mistral',
        name: 'Mistral AI',
        category: 'LLMs & AI Models',
        shortDescription: 'Open-weight models for private deployment.',
        fullDescription: 'Mistral provides high-performance models that can be self-hosted, offering data privacy and lower latency for specialized enterprise applications.',
        pricing: 'Freemium',
        websiteUrl: 'https://mistral.ai/',
        rating: 4.6,
        tags: ['Open Source', 'LLM', 'Privacy'],
        agencyVerdict: "Our go-to for clients with strict data sovereignty requirements (Fintech/Health).",
        relatedServiceId: 'web-development'
    },

    // --- Engineering ---
    {
        id: 'vercel',
        name: 'Vercel',
        category: 'Engineering & Dev',
        shortDescription: 'The frontend cloud for Next.js.',
        fullDescription: 'Vercel provides the best deployment experience for Next.js applications. Their edge network ensures our client sites load instantly anywhere in the world.',
        pricing: 'Freemium',
        websiteUrl: 'https://vercel.com',
        rating: 5.0,
        tags: ['Hosting', 'Cloud', 'Next.js'],
        agencyVerdict: "The gold standard. If you are using Next.js, you should be on Vercel.",
        relatedServiceId: 'web-development'
    },
    {
        id: 'supabase',
        name: 'Supabase',
        category: 'Engineering & Dev',
        shortDescription: 'The open source Firebase alternative.',
        fullDescription: 'Supabase gives you a dedicated Postgres database, authentication, instant APIs, and edge functions. It scales infinitely and offers full SQL power.',
        pricing: 'Freemium',
        websiteUrl: 'https://supabase.com',
        rating: 4.9,
        tags: ['Database', 'Backend', 'Postgres'],
        agencyVerdict: "We build all our client backends on Supabase. It allows us to ship 3x faster than traditional setups.",
        relatedServiceId: 'web-development'
    },
    {
        id: 'cursor',
        name: 'Cursor',
        category: 'Engineering & Dev',
        shortDescription: 'The AI code editor.',
        fullDescription: 'Cursor is a fork of VS Code with native AI integration. It can scan your codebase to write code, fix bugs, and refactor files intelligenty.',
        pricing: 'Freemium',
        websiteUrl: 'https://cursor.com',
        rating: 5.0,
        tags: ['IDE', 'AI', 'Coding'],
        agencyVerdict: "Every engineer at Qognition uses Cursor. It effectively doubles our development velocity.",
        relatedServiceId: 'web-development'
    },
    {
        id: 'linear',
        name: 'Linear',
        category: 'Engineering & Dev',
        shortDescription: 'Issue tracking that isn\'t slow.',
        fullDescription: 'Linear is the standard for modern software teams. It is fast, keyboard-centric, and beautiful. It makes project management bearable.',
        pricing: 'Paid',
        websiteUrl: 'https://linear.app',
        rating: 4.8,
        tags: ['Project Management', 'Agile'],
        agencyVerdict: "We manage all client sprints in Linear. It keeps the engineering team focused.",
        relatedServiceId: 'web-development'
    },

    // --- Marketing ---
    {
        id: 'hubspot',
        name: 'HubSpot',
        category: 'Marketing & Sales',
        shortDescription: 'CRM platform for scaling companies.',
        fullDescription: 'HubSpot integrates marketing, sales, and service hubs. It is powerful for tracking the full lifecycle of a lead from first click to closed deal.',
        pricing: 'Freemium',
        websiteUrl: 'https://hubspot.com',
        rating: 4.6,
        tags: ['CRM', 'Automation', 'Email'],
        agencyVerdict: "Great for mid-market companies. We frequently build custom integrations between HubSpot and client websites.",
        relatedServiceId: 'ppc'
    },
    {
        id: 'ahrefs',
        name: 'Ahrefs',
        category: 'Marketing & Sales',
        shortDescription: 'The SEO powerhouse.',
        fullDescription: 'Ahrefs is essential for backlink analysis, keyword research, and competitive intelligence. Their data is second only to Google.',
        pricing: 'Paid',
        websiteUrl: 'https://ahrefs.com',
        rating: 4.9,
        tags: ['SEO', 'Analytics'],
        agencyVerdict: "We don't do SEO without Ahrefs. It's that simple.",
        relatedServiceId: 'seo'
    },
    {
        id: 'lemlist',
        name: 'Lemlist',
        category: 'Marketing & Sales',
        shortDescription: 'Cold email automation with personality.',
        fullDescription: 'Lemlist allows for personalized cold outreach at scale, including custom images and dynamic variables to increase reply rates.',
        pricing: 'Paid',
        websiteUrl: 'https://lemlist.com',
        rating: 4.5,
        tags: ['Email', 'Outreach', 'B2B'],
        agencyVerdict: "Our tool of choice for B2B lead generation campaigns.",
        relatedServiceId: 'ppc'
    },
    {
        id: 'typeform',
        name: 'Typeform',
        category: 'Marketing & Sales',
        shortDescription: 'Forms people actually enjoy.',
        fullDescription: 'Typeform creates conversational forms that convert higher than standard inputs. Great for surveys, quizzes, and lead capture.',
        pricing: 'Freemium',
        websiteUrl: 'https://typeform.com',
        rating: 4.7,
        tags: ['Lead Gen', 'Forms', 'UX'],
        agencyVerdict: "We use Typeform for client onboarding and complex lead qualification flows.",
        relatedServiceId: 'web-development'
    },

    // --- Design ---
    {
        id: 'figma',
        name: 'Figma',
        category: 'Design & Creative',
        shortDescription: 'The collaborative interface design tool.',
        fullDescription: 'Figma is the industry standard for UI/UX design. Its multiplayer features allow designers and developers to collaborate in real-time.',
        pricing: 'Freemium',
        websiteUrl: 'https://figma.com',
        rating: 5.0,
        tags: ['Design', 'UI/UX', 'Prototyping'],
        agencyVerdict: "Everything starts in Figma. It is the operating system for our design team.",
        relatedServiceId: 'web-development'
    },
    {
        id: 'midjourney',
        name: 'Midjourney',
        category: 'Design & Creative',
        shortDescription: 'Generative AI for high-fidelity images.',
        fullDescription: 'Midjourney creates the most artistic and realistic AI images available. It is command-line based (Discord) but produces stunning results.',
        pricing: 'Paid',
        websiteUrl: 'https://midjourney.com',
        rating: 4.9,
        tags: ['AI Art', 'Generative', 'Images'],
        agencyVerdict: "We use Midjourney for storyboarding, moodboards, and social media assets.",
        relatedServiceId: 'smm'
    },
    {
        id: 'spline',
        name: 'Spline',
        category: 'Design & Creative',
        shortDescription: '3D design tool for the web.',
        fullDescription: 'Spline makes 3D accessible. It allows us to create interactive 3D scenes that run natively in the browser without heavy code.',
        pricing: 'Freemium',
        websiteUrl: 'https://spline.design',
        rating: 4.8,
        tags: ['3D', 'WebGL', 'Animation'],
        agencyVerdict: "The secret to our immersive websites. It enables 3D without the headache of Three.js.",
        relatedServiceId: 'web-development'
    },
    {
        id: 'firefly',
        name: 'Adobe Firefly',
        category: 'Design & Creative',
        shortDescription: 'Commercially safe AI generation.',
        fullDescription: 'Firefly is integrated into Photoshop and Illustrator. It is trained on Adobe Stock, making it safe for commercial work without copyright issues.',
        pricing: 'Paid',
        websiteUrl: 'https://firefly.adobe.com',
        rating: 4.5,
        tags: ['AI', 'Adobe', 'Enterprise'],
        agencyVerdict: "We use Firefly for client work where copyright safety is paramount.",
        relatedServiceId: 'smm'
    },

    // --- Social ---
    {
        id: 'sprout',
        name: 'Sprout Social',
        category: 'Social & Community',
        shortDescription: 'Enterprise social media management.',
        fullDescription: 'Sprout offers deep listening, analytics, and scheduling capabilities. It is built for large teams and complex approval workflows.',
        pricing: 'Paid',
        websiteUrl: 'https://sproutsocial.com',
        rating: 4.7,
        tags: ['Social Media', 'Analytics', 'Enterprise'],
        agencyVerdict: "The best tool for managing enterprise social accounts across multiple regions.",
        relatedServiceId: 'smm'
    },
    {
        id: 'taplio',
        name: 'Taplio',
        category: 'Social & Community',
        shortDescription: 'LinkedIn growth automation.',
        fullDescription: 'Taplio uses AI to help generate content, schedule posts, and engage with leads specifically on LinkedIn.',
        pricing: 'Paid',
        websiteUrl: 'https://taplio.com',
        rating: 4.8,
        tags: ['LinkedIn', 'Personal Branding', 'AI'],
        agencyVerdict: "We use Taplio to manage the personal brands of our C-suite clients.",
        relatedServiceId: 'smm'
    },
    {
        id: 'hypefury',
        name: 'Hypefury',
        category: 'Social & Community',
        shortDescription: 'Twitter/X growth tool.',
        fullDescription: 'Hypefury is designed to maximize engagement on X (Twitter). It features auto-plugging, thread scheduling, and evergreen recycling.',
        pricing: 'Paid',
        websiteUrl: 'https://hypefury.com',
        rating: 4.6,
        tags: ['Twitter', 'X', 'Growth'],
        agencyVerdict: "Excellent for building Twitter authority and driving traffic to newsletters.",
        relatedServiceId: 'smm'
    },

    // --- Finance ---
    {
        id: 'stripe',
        name: 'Stripe',
        category: 'Finance & Ops',
        shortDescription: 'Financial infrastructure for the internet.',
        fullDescription: 'Stripe is the standard for accepting payments online. Its API is developer-friendly, robust, and supports every business model.',
        pricing: 'Freemium',
        websiteUrl: 'https://stripe.com',
        rating: 5.0,
        tags: ['Payments', 'Billing', 'API'],
        agencyVerdict: "We integrate Stripe into 100% of our e-commerce and SaaS builds.",
        relatedServiceId: 'web-development'
    },
    {
        id: 'mercury',
        name: 'Mercury',
        category: 'Finance & Ops',
        shortDescription: 'Banking for startups.',
        fullDescription: 'Mercury offers a tech-first banking experience with API access, virtual cards, and seamless integration with accounting software.',
        pricing: 'Free',
        websiteUrl: 'https://mercury.com',
        rating: 4.9,
        tags: ['Banking', 'Startups', 'Fintech'],
        agencyVerdict: "The best banking experience for digital-native companies.",
        relatedServiceId: 'ppc'
    },
    {
        id: 'brex',
        name: 'Brex',
        category: 'Finance & Ops',
        shortDescription: 'Corporate cards and spend management.',
        fullDescription: 'Brex helps scaling companies manage spend with high limits and rewards tailored for tech companies.',
        pricing: 'Free',
        websiteUrl: 'https://brex.com',
        rating: 4.7,
        tags: ['Credit Cards', 'Expense Management'],
        agencyVerdict: "Good for managing ad spend and software subscriptions.",
        relatedServiceId: 'ppc'
    },

    // --- AI Agents ---
    {
        id: 'auto-gpt',
        name: 'AutoGPT',
        category: 'AI Agents',
        shortDescription: 'Autonomous AI agent runner.',
        fullDescription: 'AutoGPT attempts to achieve a goal by breaking it into sub-tasks and executing them using the internet and other tools.',
        pricing: 'Open Source',
        websiteUrl: 'https://news.agpt.co/',
        rating: 4.3,
        tags: ['Agents', 'Automation', 'Experimental'],
        agencyVerdict: "Promising for research, but still experimental for production workflows.",
        relatedServiceId: 'ai-seo'
    },
    {
        id: 'perplexity',
        name: 'Perplexity',
        category: 'AI Agents',
        shortDescription: 'AI-powered answer engine.',
        fullDescription: 'Perplexity replaces Google for complex queries. It scans the web and synthesizes an answer with citations.',
        pricing: 'Freemium',
        websiteUrl: 'https://perplexity.ai',
        rating: 5.0,
        tags: ['Search', 'Research', 'AI'],
        agencyVerdict: "We use Perplexity for rapid market research and fact-checking.",
        relatedServiceId: 'seo'
    },
    {
        id: 'agent-gpt',
        name: 'AgentGPT',
        category: 'AI Agents',
        shortDescription: 'Browser-based autonomous agents.',
        fullDescription: 'AgentGPT allows you to configure and deploy autonomous AI agents directly in the browser to accomplish tasks.',
        pricing: 'Freemium',
        websiteUrl: 'https://agentgpt.reworkd.ai/',
        rating: 4.5,
        tags: ['Agents', 'No-Code', 'Automation'],
        agencyVerdict: "A great way to prototype agent workflows without code.",
        relatedServiceId: 'ai-seo'
    }
];
