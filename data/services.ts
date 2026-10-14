import type { Service } from '../types';

// Stable IDs and sub-service slugs preserve existing public routes.
export const SERVICES: Service[] = [
  {
    "id": "strategy",
    "title": "B2B Search & Growth Strategy",
    "shortDescription": "Choose the buyers, search questions and next steps that matter to your sales team.",
    "fullDescription": "A search program starts with a commercial decision: which buyers should find you, and what do they need to believe before making contact? We map your offer, buying committee, current search coverage and sales feedback. The resulting plan assigns priorities, owners and measures across AI SEO, GEO, content and any separately scoped paid campaigns.",
    "icon": "Compass",
    "kpis": [
      "Buyer and application map",
      "Prioritized search roadmap",
      "Defined qualification criteria"
    ],
    "deepDive": [
      {
        "title": "Start with the buying decision",
        "content": "We review sales questions, objections and alternatives. Those inputs shape service pages, comparison content and the questions included in a repeatable AI-search panel."
      },
      {
        "title": "Choose work that can be measured",
        "content": "Technical fixes, expert content and authority work have different dependencies. We sequence them against available evidence and access, then define how enquiries and sales feedback will inform the next review."
      }
    ],
    "subServices": [
      {
        "name": "Marketing Audit",
        "slug": "marketing-audit",
        "description": "Full-funnel review of channels, messaging, analytics, and spend to find the highest-impact fixes first."
      },
      {
        "name": "Go-to-Market Strategy",
        "slug": "go-to-market-strategy",
        "description": "ICP, positioning, channel mix, launch sequence, and measurement plan for new products or markets."
      },
      {
        "name": "Competitive Analysis",
        "slug": "competitive-analysis",
        "description": "Share-of-voice, messaging, pricing, and channel teardown of the competitors your buyers actually compare."
      },
      {
        "name": "Buyer Persona Development",
        "slug": "buyer-persona-development",
        "description": "Research-backed personas with jobs-to-be-done, objections, and the language that moves them."
      },
      {
        "name": "Customer Journey Mapping",
        "slug": "customer-journey-mapping",
        "description": "TOFU→MOFU→BOFU journey with triggers, content, and conversion paths at every stage."
      },
      {
        "name": "Channel & Budget Planning",
        "slug": "channel-budget-planning",
        "description": "Demand modeling, CAC/payback forecasting, and a phased budget allocation across channels."
      },
      {
        "name": "Fractional CMO",
        "slug": "fractional-cmo",
        "description": "Senior marketing leadership on retainer — strategy, team direction, and board-ready reporting."
      }
    ],
    "process": [
      {
        "title": "Agree the buyer and scope",
        "description": "Review your offer, existing activity, audience and the evidence available to support the work."
      },
      {
        "title": "Implement and review",
        "description": "Assign owners, deliver the agreed assets and check technical accuracy, claims and conversion paths."
      },
      {
        "title": "Learn from enquiries",
        "description": "Review discovery data and sales feedback together, then prioritize the next changes."
      }
    ],
    "techStack": [
      "Notion",
      "Figma",
      "GA4",
      "HubSpot",
      "Looker Studio",
      "Clay"
    ],
    "relatedIndustries": [
      "SaaS",
      "Manufacturing",
      "Professional Services"
    ],
    "faqs": [
      {
        "question": "How does AI support the work?",
        "answer": "AI can assist research, grouping and drafting. A person reviews sources, technical recommendations and publishable claims. We agree access and data handling before using business information in any tool."
      },
      {
        "question": "How is an engagement scoped?",
        "answer": "We agree the buyer groups, services, markets, responsibilities and measurement before work starts. SEO and AI-search work can run alongside your internal team. PPC is scoped separately."
      },
      {
        "question": "What should we expect from a first call?",
        "answer": "We discuss what you sell, who buys it, your current acquisition activity and the problem you need to solve. You can also send an enquiry with that context."
      }
    ]
  },
  {
    "id": "branding-creative",
    "title": "B2B Messaging & Creative",
    "shortDescription": "Explain complex offers clearly across search pages, sales material and campaigns.",
    "fullDescription": "A buyer should understand what you provide, where it fits and which evidence supports it. We translate positioning into page copy, diagrams, sales material and campaign assets within your brand system. This work supports AI SEO and GEO by making business facts consistent and useful to people evaluating a supplier.",
    "icon": "Palette",
    "kpis": [
      "Clear service explanation",
      "Consistent claims",
      "Useful sales assets"
    ],
    "deepDive": [
      {
        "title": "Make expertise understandable",
        "content": "Translate product detail and specialist knowledge into applications, buying criteria and answers. Keep necessary technical language and explain what it changes for the buyer."
      },
      {
        "title": "Use the identity your buyers recognize",
        "content": "Work within the existing logo, typography and components unless a redesign is explicitly in scope. Review proof, accessibility and conversion paths with every asset."
      }
    ],
    "subServices": [
      {
        "name": "Brand Naming",
        "slug": "brand-naming",
        "description": "Naming strategy, generation, screening, and domain/trademark checks for products and companies."
      },
      {
        "name": "Logo Design",
        "slug": "logo-design",
        "description": "Distinctive primary, secondary, and responsive logo systems with usage rules."
      },
      {
        "name": "Visual Identity",
        "slug": "visual-identity",
        "description": "Logo systems, typography, color, layout, iconography, and brand guidelines."
      },
      {
        "name": "Brand Messaging & Voice",
        "slug": "brand-messaging-voice",
        "description": "Positioning, narrative, tone of voice, and a messaging hierarchy the whole team can use."
      },
      {
        "name": "Brand Guidelines",
        "slug": "brand-guidelines",
        "description": "A living brand book covering identity, voice, usage, and channel-specific patterns."
      },
      {
        "name": "Rebranding",
        "slug": "rebranding",
        "description": "Strategic repositioning and visual overhaul with a migration plan that protects equity."
      },
      {
        "name": "Packaging Design",
        "slug": "packaging-design",
        "description": "Packaging and product-information design for manufacturers and business suppliers."
      },
      {
        "name": "Graphic Design",
        "slug": "graphic-design",
        "description": "Social assets, ad creatives, pitch visuals, one-pagers, carousels, and lead magnet design."
      },
      {
        "name": "Motion Graphics & Animation",
        "slug": "motion-design",
        "description": "Short-form motion, kinetic typography, product explainers, social cuts, and launch videos."
      },
      {
        "name": "Illustration",
        "slug": "illustration",
        "description": "Custom illustration systems and iconography that make a brand ownable."
      },
      {
        "name": "Pitch Deck & Sales Collateral",
        "slug": "pitch-deck-design",
        "description": "Investor decks, sales one-pagers, and proposal templates designed to win."
      },
      {
        "name": "Creative Direction",
        "slug": "creative-direction",
        "description": "Campaign concepts, moodboards, content direction, art direction, and launch creative."
      },
      {
        "name": "Conversion Copywriting",
        "slug": "conversion-copywriting",
        "description": "Homepage, landing page, ad, email, and sales copy built around action and trust."
      }
    ],
    "process": [
      {
        "title": "Agree the buyer and scope",
        "description": "Review your offer, existing activity, audience and the evidence available to support the work."
      },
      {
        "title": "Implement and review",
        "description": "Assign owners, deliver the agreed assets and check technical accuracy, claims and conversion paths."
      },
      {
        "title": "Learn from enquiries",
        "description": "Review discovery data and sales feedback together, then prioritize the next changes."
      }
    ],
    "techStack": [
      "Figma",
      "Adobe Creative Cloud",
      "Canva Enterprise",
      "Midjourney",
      "Firefly",
      "Notion"
    ],
    "relatedIndustries": [
      "SaaS",
      "Manufacturing",
      "Professional Services"
    ],
    "faqs": [
      {
        "question": "How does AI support the work?",
        "answer": "AI can assist research, grouping and drafting. A person reviews sources, technical recommendations and publishable claims. We agree access and data handling before using business information in any tool."
      },
      {
        "question": "How is an engagement scoped?",
        "answer": "We agree the buyer groups, services, markets, responsibilities and measurement before work starts. SEO and AI-search work can run alongside your internal team. PPC is scoped separately."
      },
      {
        "question": "What should we expect from a first call?",
        "answer": "We discuss what you sell, who buys it, your current acquisition activity and the problem you need to solve. You can also send an enquiry with that context."
      }
    ]
  },
  {
    "id": "web-development",
    "title": "B2B Website & Search Implementation",
    "shortDescription": "Build accessible pages that buyers can read, search systems can retrieve and sales teams can follow up.",
    "fullDescription": "We connect the technical website to the buying journey: accessible service pages, crawlable content, useful internal links and dependable enquiry forms. The implementation can support your existing CMS and development team. Performance, publishing controls and CRM handoff are agreed and tested before launch.",
    "icon": "Code",
    "kpis": [
      "Crawl and rendering checks",
      "Accessible enquiry journeys",
      "Reliable CRM handoff"
    ],
    "subServices": [
      {
        "name": "UX/UI Design",
        "slug": "ux-ui-design",
        "description": "Research, wireframes, prototypes, and conversion-focused interface design."
      },
      {
        "name": "WordPress Development",
        "slug": "wordpress-development",
        "description": "Fast, secure, SEO-ready WordPress builds with clean publishing workflows."
      },
      {
        "name": "Webflow Development",
        "slug": "webflow-development",
        "description": "Pixel-perfect Webflow sites the marketing team can edit without developers."
      },
      {
        "name": "Shopify Development",
        "slug": "shopify-development",
        "description": "Shopify and headless commerce builds tuned for speed and conversion."
      },
      {
        "name": "Landing Page Design",
        "slug": "landing-pages",
        "description": "Campaign pages with message match, fast load times, proof blocks, and CRM-ready forms."
      },
      {
        "name": "E-commerce Development",
        "slug": "ecommerce-web-design",
        "description": "Storefronts, product storytelling, collection SEO, and checkout journey improvements."
      },
      {
        "name": "CMS Migration",
        "slug": "cms-migration",
        "description": "Plan URL mapping, content parity, redirect checks and post-launch monitoring when changing a CMS."
      },
      {
        "name": "Page Speed Optimization",
        "slug": "page-speed-optimization",
        "description": "Core Web Vitals, image delivery, hydration cost, and third-party script governance."
      },
      {
        "name": "Accessibility (WCAG)",
        "slug": "accessibility-wcag",
        "description": "Review interfaces against agreed WCAG criteria and remediate documented accessibility issues."
      },
      {
        "name": "Website Maintenance & Care",
        "slug": "website-maintenance",
        "description": "Updates, monitoring, backups, security, and continuous conversion improvements."
      },
      {
        "name": "Mobile App Development",
        "slug": "mobile-app-development",
        "description": "React Native and PWA apps connected to your marketing and data stack."
      },
      {
        "name": "Next.js & SEO Builds",
        "slug": "nextjs-seo",
        "description": "App Router architecture, static generation, metadata, schema, sitemaps, and indexing checks."
      },
      {
        "name": "Conversion Websites",
        "slug": "conversion-websites",
        "description": "High-performance marketing sites built around offers, proof, forms, and booked calls."
      },
      {
        "name": "Headless CMS",
        "slug": "headless-cms",
        "description": "Sanity, Contentful, and CMS workflows for publishing SEO pages without developer bottlenecks."
      },
      {
        "name": "Web Performance",
        "slug": "web-performance",
        "description": "Lighthouse, Core Web Vitals, image delivery, and runtime cost optimization."
      }
    ],
    "process": [
      {
        "title": "Agree the buyer and scope",
        "description": "Review your offer, existing activity, audience and the evidence available to support the work."
      },
      {
        "title": "Implement and review",
        "description": "Assign owners, deliver the agreed assets and check technical accuracy, claims and conversion paths."
      },
      {
        "title": "Learn from enquiries",
        "description": "Review discovery data and sales feedback together, then prioritize the next changes."
      }
    ],
    "techStack": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Webflow",
      "Shopify",
      "WordPress",
      "Sanity CMS",
      "Vercel"
    ],
    "relatedIndustries": [
      "SaaS",
      "Manufacturing",
      "Professional Services"
    ],
    "faqs": [
      {
        "question": "Do we need to replace our website?",
        "answer": "Not necessarily. We first review your current publishing, performance and conversion requirements. Existing components and CMS workflows can remain where they meet those needs."
      },
      {
        "question": "How does AI support the work?",
        "answer": "AI can assist research, grouping and drafting. A person reviews sources, technical recommendations and publishable claims. We agree access and data handling before using business information in any tool."
      },
      {
        "question": "How is an engagement scoped?",
        "answer": "We agree the buyer groups, services, markets, responsibilities and measurement before work starts. SEO and AI-search work can run alongside your internal team. PPC is scoped separately."
      },
      {
        "question": "What should we expect from a first call?",
        "answer": "We discuss what you sell, who buys it, your current acquisition activity and the problem you need to solve. You can also send an enquiry with that context."
      }
    ],
    "deepDive": [
      {
        "title": "Protect the paths buyers already use",
        "content": "Inventory current URLs and important content before changing a website. Test redirects only where required and preserve useful pages, metadata and conversion paths."
      },
      {
        "title": "Treat forms as part of the product",
        "content": "A success message must mean the enquiry was saved. Validate inputs, handle failures and test booking confirmations separately from clicks or calendar views."
      }
    ]
  },
  {
    "id": "seo",
    "title": "B2B SEO",
    "shortDescription": "Help buying teams find the right service, application and supplier information in search.",
    "fullDescription": "Enterprise SEO for a B2B company covers three things. Technical work, so Google can crawl and index every page that matters. Commercial pages that answer what a buying team checks before it shortlists. Authority work, so other sites back up what you claim. We measure it against qualified enquiries, not traffic.",
    "icon": "Search",
    "kpis": [
      "Rankings for buyer queries",
      "Indexable priority pages",
      "Qualified organic enquiries"
    ],
    "deepDive": [
      {
        "title": "Start with pages Google can reach",
        "content": "We check status codes, canonicals, rendering, sitemaps and internal links. Then we fix whatever stops your commercial pages being found, starting with the pages closest to a sale."
      },
      {
        "title": "Publish what buyers need to compare",
        "content": "Applications, specifications, integrations, implementation effort and limits. We write with your subject experts and add evidence they can stand behind, instead of repeating what already ranks."
      },
      {
        "title": "Report search and sales separately",
        "content": "Search Console shows discovery. Analytics shows visits. Your CRM shows enquiries and opportunities. We keep them in separate columns and say where a journey cannot be attributed."
      },
      {
        "title": "SEO is the base for AI search",
        "content": "Google's AI Overviews and AI Mode draw on pages Google can crawl and index. The same technical and content work that ranks you in Google is the foundation for AI SEO and GEO.",
        "link": {
          "label": "AI SEO and GEO",
          "href": "/services/ai-seo"
        }
      }
    ],
    "subServices": [
      {
        "name": "On-Page SEO",
        "slug": "on-page-seo",
        "description": "Titles, headings, internal links, content depth, and entity coverage on every page."
      },
      {
        "name": "Off-Page SEO",
        "slug": "off-page-seo",
        "description": "Digital PR, authority signals, brand mentions, and editorial outreach."
      },
      {
        "name": "Technical SEO",
        "slug": "technical-seo",
        "description": "Crawlability, indexing, Core Web Vitals, schema, canonicals, and JavaScript rendering audits."
      },
      {
        "name": "Local SEO",
        "slug": "local-seo",
        "description": "Google Maps, the local pack, Business Profile, reviews and listings, for B2B firms whose buyers choose by location."
      },
      {
        "name": "E-commerce SEO",
        "slug": "ecommerce-seo",
        "description": "Category and product pages for B2B catalogs: parts, materials, lab supplies and equipment."
      },
      {
        "name": "International SEO",
        "slug": "international-seo",
        "description": "hreflang, multi-region structure and localized pages for B2B firms selling into several countries."
      },
      {
        "name": "Programmatic SEO",
        "slug": "programmatic-seo",
        "description": "Page systems for services, industries and locations, each with original facts and a reason to exist. We don't publish a page because a URL combination exists."
      },
      {
        "name": "Keyword Research",
        "slug": "keyword-research",
        "description": "Buyer-intent keyword and topic mapping, focused on the queries that come before an enquiry."
      },
      {
        "name": "Link Building",
        "slug": "link-building",
        "description": "Digital PR, authority assets, editorial outreach, and risk-controlled backlink acquisition."
      },
      {
        "name": "Content Optimization",
        "slug": "content-optimization",
        "description": "Refreshing and upgrading existing pages for information gain and ranking recovery."
      },
      {
        "name": "Schema Markup",
        "slug": "schema-markup",
        "description": "Accurate structured data for visible organization, service, article and breadcrumb information."
      },
      {
        "name": "SEO Audits",
        "slug": "seo-audits",
        "description": "Forensic technical, content, and authority audits with a prioritized roadmap."
      },
      {
        "name": "Site Migration SEO",
        "slug": "site-migration-seo",
        "description": "Redirect mapping, parity checks, and traffic protection through replatforms and redesigns."
      },
      {
        "name": "Content Strategy",
        "slug": "content-strategy",
        "description": "Buyer-intent topic clusters, editorial calendars, content briefs, and internal link systems."
      },
      {
        "name": "E-E-A-T SEO",
        "slug": "eeat-seo",
        "description": "Author profiles, proof blocks, expert quotes, citations, reviews, and trust architecture for competitive niches."
      }
    ],
    "process": [
      {
        "title": "Crawl and baseline",
        "description": "Crawl the site, pull Search Console data and record a dated baseline."
      },
      {
        "title": "Fix and publish",
        "description": "Ship technical fixes and commercial pages in priority order, each with an owner."
      },
      {
        "title": "Earn references",
        "description": "Build mentions and links from sources your buyers already trust."
      },
      {
        "title": "Review against enquiries",
        "description": "Compare rankings, visits and qualified enquiries with the baseline on the agreed schedule."
      }
    ],
    "techStack": [
      "Ahrefs",
      "Semrush",
      "Screaming Frog",
      "Clearscope",
      "Google Search Console API",
      "Python Scripts"
    ],
    "relatedIndustries": [
      "SaaS",
      "Manufacturing",
      "Professional Services"
    ],
    "faqs": [
      {
        "question": "How does SEO relate to AI search?",
        "answer": "Google's AI features draw on pages it can crawl and index, so technical SEO and clear commercial pages are the foundation. We still measure AI answers separately from rankings, because a page can rank and not be cited."
      },
      {
        "question": "Do you guarantee rankings?",
        "answer": "No. Google controls its results. We commit to the agreed work, a dated baseline and a report you can check against it."
      },
      {
        "question": "Do you work on large or multi-market sites?",
        "answer": "Yes. Large sites need crawl budget, international setup and page templates handled carefully. We scope that on the call, once we have seen the site."
      },
      {
        "question": "How does AI support the work?",
        "answer": "AI can assist research, grouping and drafting. A person reviews sources, technical recommendations and publishable claims. We agree access and data handling before using business information in any tool."
      },
      {
        "question": "How is an engagement scoped?",
        "answer": "We agree the buyer groups, services, markets, responsibilities and measurement before work starts. SEO can run on its own or beside AI SEO and GEO. PPC is scoped separately."
      },
      {
        "question": "What happens on the first call?",
        "answer": "It takes 15 minutes. We cover who you sell to, what we would check first, and whether we are a fit. You can send an enquiry instead if you prefer."
      }
    ]
  },
  {
    "id": "ai-seo",
    "title": "AI SEO & GEO for B2B",
    "shortDescription": "Make your expertise easier to discover, assess and cite across Google and AI search.",
    "fullDescription": "AI SEO is the work on Google AI Overviews and AI Mode. GEO is the work on assistants: ChatGPT, Perplexity, Gemini, Claude and Copilot. Both depend on clear pages, consistent company facts and what other sites say about you. We run both for B2B firms and record every answer with its prompt, platform and date.",
    "icon": "Brain",
    "kpis": [
      "Answers observed, by prompt and date",
      "Sources cited, by category",
      "Qualified enquiries"
    ],
    "subServices": [
      {
        "name": "Generative Engine Optimization (GEO)",
        "slug": "generative-engine-optimization",
        "description": "Work on how ChatGPT, Perplexity, Gemini, Claude and Copilot describe your firm: entity clarity, third-party sources and answer-ready pages."
      },
      {
        "name": "Answer Engine Optimization (AEO)",
        "slug": "answer-engine-optimization",
        "description": "Direct answers, summaries and FAQ structure that Google AI Overviews and AI Mode can extract and attribute."
      },
      {
        "name": "AI Citation & Mention Tracking",
        "slug": "ai-citation-tracking",
        "description": "A fixed prompt set, re-run on schedule, recording which firms each platform names and which sources it cites."
      },
      {
        "name": "Entity & Knowledge Graph",
        "slug": "entity-optimization",
        "description": "Consistent company facts across your site, schema and third-party profiles, so your name resolves to your company."
      },
      {
        "name": "Voice Search Optimization",
        "slug": "voice-search-optimization",
        "description": "Short, spoken-style answers for conversational questions about your services."
      },
      {
        "name": "AI Search Visibility",
        "slug": "ai-search-visibility",
        "description": "One view of how Google's AI features and the assistants answer your buyers' questions, by platform and date."
      },
      {
        "name": "LLM Optimization",
        "slug": "llm-optimization",
        "description": "Organize accurate business facts, retrievable content and source references for AI-search discovery."
      },
      {
        "name": "AI Content Governance",
        "slug": "ai-content-governance",
        "description": "Human review workflows, originality checks, evidence rules, and AI content quality controls."
      },
      {
        "name": "AI Search Monitoring",
        "slug": "ai-search-monitoring",
        "description": "Scheduled re-runs of your prompt set, with competitor mentions and cited sources compared against the baseline."
      }
    ],
    "process": [
      {
        "title": "Fix the prompt set",
        "description": "Agree the buyer questions, platforms and markets. Run the baseline and date it."
      },
      {
        "title": "Fix what you control",
        "description": "Correct company facts, structured data and answer-ready pages on your site."
      },
      {
        "title": "Work on the sources",
        "description": "Improve the third-party pages that answers cite for your buyers' questions."
      },
      {
        "title": "Re-run and compare",
        "description": "Re-run the same prompt set on schedule and report the changes next to your enquiries."
      }
    ],
    "techStack": [
      "InLinks",
      "Schema App",
      "OpenAI API",
      "Perplexity",
      "Google Knowledge Graph API"
    ],
    "relatedIndustries": [
      "SaaS",
      "Manufacturing",
      "Professional Services"
    ],
    "faqs": [
      {
        "question": "Can you guarantee AI recommendations?",
        "answer": "No. Each platform controls its own answers. We control the quality of the work and how each observation is recorded: the prompt, the platform, the date and the sources cited."
      },
      {
        "question": "Will an llms.txt file or schema markup get us cited?",
        "answer": "No. A text file or a schema type is not a shortcut. We treat llms.txt as optional housekeeping and use schema only to describe what the page already shows."
      },
      {
        "question": "How long before we see a change?",
        "answer": "Fixes on your own site can be checked as soon as they ship. Changes in AI answers depend on each platform and on third-party sources, so we don't put a date on them. You see the same prompt set re-run on the agreed schedule from the start, so you compare like with like."
      },
      {
        "question": "Can you work alongside our SEO agency?",
        "answer": "Yes. We can run AI SEO and GEO as a specialist layer while another team runs SEO. The proposal names who owns each task, so nothing is done twice."
      },
      {
        "question": "How does AI support the work?",
        "answer": "AI can assist research, grouping and drafting. A person reviews sources, technical recommendations and publishable claims. We agree access and data handling before using business information in any tool."
      },
      {
        "question": "What happens on the first call?",
        "answer": "It takes 15 minutes. We cover who you sell to, what we would check first in Google and AI search, and whether we are a fit. You can send an enquiry instead if you prefer."
      }
    ],
    "deepDive": [
      {
        "title": "Make your company unambiguous",
        "content": "Google and the assistants need to know exactly who you are. We align your name, services, locations, people and credentials across your site, your structured data and your main third-party profiles. Structured data describes what the page shows. It never adds a claim the page cannot support."
      },
      {
        "title": "Test the questions your buyers ask",
        "content": "We agree the buyer questions, platforms, markets and language before the first run. Then we re-run the same set on a fixed schedule. Each answer is recorded with its date and cited sources, so a change can be examined instead of reduced to a score."
      },
      {
        "title": "Work on the sources answers draw from",
        "content": "AI answers often cite pages other than yours: directories, trade publications, comparison pages and association listings. We find the ones that appear for your buyers' questions and work on getting them to describe you accurately."
      },
      {
        "title": "Connect answers to enquiries",
        "content": "An answer that names you only helps if the buyer can act on it. We link answer-ready pages to your service pages and a clear way to book a call. Referral visits and enquiries are reported in their own columns."
      }
    ]
  },
  {
    "id": "ppc",
    "title": "B2B PPC",
    "shortDescription": "Connect paid search and selected social campaigns to qualified enquiries and sales feedback.",
    "fullDescription": "B2B PPC should be judged on qualified enquiries and booked meetings, not clicks or form fills. That means bidding on the right queries, excluding the wrong ones, and sending each campaign to a page that makes the same promise. Management is scoped separately from AI SEO and GEO, and ad spend stays separate from our fee.",
    "icon": "Zap",
    "kpis": [
      "Qualified enquiry share",
      "Cost per qualified enquiry",
      "Sales-accepted opportunities"
    ],
    "subServices": [
      {
        "name": "Google Search Ads",
        "slug": "google-ads-management",
        "description": "Search campaigns built on exact and phrase match, with exclusions treated as part of the work."
      },
      {
        "name": "Google Shopping Ads",
        "slug": "google-shopping-ads",
        "description": "Feed optimization and Shopping campaigns for e-commerce revenue."
      },
      {
        "name": "Performance Max",
        "slug": "performance-max",
        "description": "Review asset groups, audience signals, exclusions and lead quality before allocating more spend."
      },
      {
        "name": "Microsoft / Bing Ads",
        "slug": "bing-ads",
        "description": "Evaluate relevant B2B search demand across the Microsoft advertising network."
      },
      {
        "name": "Meta Ads",
        "slug": "meta-ads",
        "description": "Facebook and Instagram retargeting for B2B buyers who have already visited your site."
      },
      {
        "name": "LinkedIn Ads",
        "slug": "linkedin-ads",
        "description": "Targeting by job title, company size and industry, with lead gen forms connected to your CRM."
      },
      {
        "name": "TikTok Ads",
        "slug": "tiktok-ads",
        "description": "Native short-form ad creative and scaling for performance and awareness."
      },
      {
        "name": "YouTube Ads",
        "slug": "youtube-ads",
        "description": "Video campaigns that retarget site visitors and reach buyers researching your category."
      },
      {
        "name": "Amazon Ads",
        "slug": "amazon-ads",
        "description": "Sponsored Products, Brands, and Display to win the retail shelf."
      },
      {
        "name": "Retargeting Campaigns",
        "slug": "retargeting-systems",
        "description": "Cross-platform remarketing journeys based on intent, page depth, and CRM stage."
      },
      {
        "name": "Programmatic Advertising",
        "slug": "programmatic-advertising",
        "description": "DSP-based display and native buying with audience and brand-safety controls."
      },
      {
        "name": "Connected TV (CTV) Ads",
        "slug": "ctv-ads",
        "description": "Streaming TV campaigns with measurable reach and outcome tracking."
      },
      {
        "name": "Ad Creative Production",
        "slug": "ad-creative-production",
        "description": "Static and video ad creative, produced in sets so variants can be compared."
      },
      {
        "name": "Feed Management",
        "slug": "feed-management",
        "description": "Product feed cleanup, enrichment, and optimization across channels."
      },
      {
        "name": "Landing Page CRO",
        "slug": "landing-page-cro",
        "description": "Message match, proof, forms, speed, offers, and conversion experimentation."
      },
      {
        "name": "Paid Media Analytics",
        "slug": "paid-media-analytics",
        "description": "GA4, Looker Studio, UTM rules and reporting by campaign, qualified enquiry and sales outcome."
      }
    ],
    "process": [
      {
        "title": "Audit the account",
        "description": "Review search terms, exclusions, conversion actions and landing pages before changing any bid."
      },
      {
        "title": "Rebuild on intent",
        "description": "Group campaigns by buying intent, with exact and phrase match first."
      },
      {
        "title": "Read search terms early",
        "description": "Read the search terms report often in the first weeks and add exclusions as the work."
      },
      {
        "title": "Reallocate on quality",
        "description": "Move budget on cost per qualified enquiry, never on clicks or raw form volume."
      }
    ],
    "techStack": [
      "Google Ads Editor",
      "Meta Ads Manager",
      "TikTok Ads Manager",
      "Supermetrics",
      "Looker Studio"
    ],
    "relatedIndustries": [
      "SaaS",
      "Manufacturing",
      "Professional Services"
    ],
    "faqs": [
      {
        "question": "Is PPC included with AI SEO and GEO?",
        "answer": "No. PPC is scoped and priced separately. A firm that wants only PPC is a full client, and it can run beside search work or on its own."
      },
      {
        "question": "Will you guarantee a cost per lead?",
        "answer": "No. We commit to the account work and to reporting cost per qualified enquiry in a form you can check yourself. We won't name a figure before we have seen your data."
      },
      {
        "question": "Do you need access to our ad accounts?",
        "answer": "Yes, plus analytics and your CRM if you want campaigns judged on sales outcomes."
      },
      {
        "question": "Which platforms do you run?",
        "answer": "Google Ads and LinkedIn, with Meta for retargeting where it fits. We recommend platforms after seeing where your buyers search."
      },
      {
        "question": "How does AI support the work?",
        "answer": "AI can assist research, grouping and drafting. A person reviews sources, technical recommendations and publishable claims. We agree access and data handling before using business information in any tool."
      },
      {
        "question": "What happens on the first call?",
        "answer": "It takes 15 minutes. Bring a recent export from your ad account and the cost per lead you want to reach. We tell you what we would check first and whether we are a fit."
      }
    ],
    "deepDive": [
      {
        "title": "Separate research from buying intent",
        "content": "Search terms tell you who is learning and who is choosing a supplier. We split campaigns by intent and match each ad to a page that makes the same promise."
      },
      {
        "title": "Build the exclusion list first",
        "content": "In the first weeks, the search terms report is the work. We exclude job seekers, students, bargain hunters and consumer searches, so more of the budget reaches buyers."
      },
      {
        "title": "Use sales outcomes to improve campaigns",
        "content": "Connect campaign context to the enquiry record and review disqualification reasons. Where consent and systems permit, reconcile later outcomes with the originating campaign."
      },
      {
        "title": "How management is priced",
        "content": "Management is priced as a share of ad spend, with a monthly minimum. Your written scope gives both figures."
      }
    ]
  },
  {
    "id": "content",
    "title": "B2B Content for Search & Evaluation",
    "shortDescription": "Turn subject expertise into useful answers, comparisons and commercial pages.",
    "fullDescription": "Your engineers, consultants and product specialists know why buyers choose one approach over another. We turn that knowledge into sourced articles, service explanations and evaluation material. Every asset has a reader, a question and an appropriate next step toward an enquiry or sales conversation.",
    "icon": "FileText",
    "kpis": [
      "Buyer-question coverage",
      "Relevant content journeys",
      "Content-assisted enquiries"
    ],
    "subServices": [
      {
        "name": "Content Strategy",
        "slug": "content-strategy",
        "description": "Audience, pillars, topic clusters, and an editorial plan tied to pipeline."
      },
      {
        "name": "Blog Writing",
        "slug": "blog-writing",
        "description": "Expert-led, SEO-structured articles with information gain and internal links."
      },
      {
        "name": "Copywriting",
        "slug": "copywriting",
        "description": "Conversion copy for pages, ads, and campaigns built around action."
      },
      {
        "name": "Pillar Pages & Topic Clusters",
        "slug": "pillar-pages-topic-clusters",
        "description": "Hub-and-spoke content architecture that builds topical authority."
      },
      {
        "name": "Ebooks & Whitepapers",
        "slug": "ebooks-whitepapers",
        "description": "Gated long-form assets that generate and nurture leads."
      },
      {
        "name": "Case Studies",
        "slug": "case-studies-content",
        "description": "Evidence-led narratives that distinguish reported outcomes, research and illustrative scenarios."
      },
      {
        "name": "Infographics",
        "slug": "infographics",
        "description": "Linkable visual assets that earn backlinks and social shares."
      },
      {
        "name": "Ghostwriting / Thought Leadership",
        "slug": "ghostwriting-thought-leadership",
        "description": "Founder and executive POV content for LinkedIn and owned channels."
      },
      {
        "name": "Content Repurposing",
        "slug": "content-repurposing",
        "description": "Turn one asset into many across blog, social, email, and video."
      },
      {
        "name": "Editorial Calendar Management",
        "slug": "editorial-calendar-management",
        "description": "Planning, briefs, production, and publishing cadence management."
      }
    ],
    "process": [
      {
        "title": "Agree the buyer and scope",
        "description": "Review your offer, existing activity, audience and the evidence available to support the work."
      },
      {
        "title": "Implement and review",
        "description": "Assign owners, deliver the agreed assets and check technical accuracy, claims and conversion paths."
      },
      {
        "title": "Learn from enquiries",
        "description": "Review discovery data and sales feedback together, then prioritize the next changes."
      }
    ],
    "techStack": [
      "Clearscope",
      "Surfer",
      "Ahrefs",
      "Notion",
      "Grammarly",
      "Frase"
    ],
    "relatedIndustries": [
      "SaaS",
      "Manufacturing",
      "Professional Services"
    ],
    "faqs": [
      {
        "question": "How does AI support the work?",
        "answer": "AI can assist research, grouping and drafting. A person reviews sources, technical recommendations and publishable claims. We agree access and data handling before using business information in any tool."
      },
      {
        "question": "How is an engagement scoped?",
        "answer": "We agree the buyer groups, services, markets, responsibilities and measurement before work starts. SEO and AI-search work can run alongside your internal team. PPC is scoped separately."
      },
      {
        "question": "What should we expect from a first call?",
        "answer": "We discuss what you sell, who buys it, your current acquisition activity and the problem you need to solve. You can also send an enquiry with that context."
      }
    ],
    "deepDive": [
      {
        "title": "Interview the people doing the work",
        "content": "Use expert interviews, product documentation and approved evidence to explain applications and tradeoffs. A claim without substantiation stays out of the draft."
      },
      {
        "title": "Link learning to evaluation",
        "content": "Connect problem-led articles to selection criteria and then to the relevant commercial page. Keep useful information accessible without requiring a form at every step."
      }
    ]
  },
  {
    "id": "smm",
    "title": "B2B Social & Expert Content",
    "shortDescription": "Put useful expertise where your buying committee already spends time.",
    "fullDescription": "Choose social channels from actual audience behaviour and delivery capacity. Founder perspectives, technical explanations and practical examples can support trust before a buyer reaches your website. We connect relevant posts to resources and commercial pages, then assess observable referrals and enquiries without claiming every impression caused a sale.",
    "icon": "Globe",
    "kpis": [
      "Relevant referral visits",
      "Commercial conversations",
      "Resource engagement"
    ],
    "deepDive": [
      {
        "title": "Choose a credible point of view",
        "content": "Use opinions a named expert can defend and examples they can substantiate. Adapt the presentation to the channel without changing the underlying facts."
      },
      {
        "title": "Give interested readers somewhere useful to go",
        "content": "Link to a specific guide, application or service page. A social response should lead to a conversation relevant to the original question."
      }
    ],
    "subServices": [
      {
        "name": "Social Media Strategy",
        "slug": "social-strategy",
        "description": "Platform-specific positioning, content pillars, posting cadence, and KPI systems."
      },
      {
        "name": "Organic Social Management",
        "slug": "organic-social-management",
        "description": "End-to-end channel management, scheduling, and optimization."
      },
      {
        "name": "Content Creation",
        "slug": "social-content-creation",
        "description": "Static, carousel, and video content tuned per platform."
      },
      {
        "name": "Short-Form Video",
        "slug": "short-form-video",
        "description": "Reels, TikTok, Shorts, hooks, scripts, edit direction, and performance feedback loops."
      },
      {
        "name": "Community Management",
        "slug": "community-management",
        "description": "Daily engagement, comment response, reputation handling, and community growth."
      },
      {
        "name": "Social Listening",
        "slug": "social-listening",
        "description": "Brand and category monitoring for insight, reputation, and content ideas."
      },
      {
        "name": "Social Commerce",
        "slug": "social-commerce",
        "description": "Shoppable content and in-platform storefronts that convert."
      },
      {
        "name": "LinkedIn Thought Leadership",
        "slug": "linkedin-thought-leadership",
        "description": "Founder-led posts, executive POVs, B2B authority, and sales-support content."
      },
      {
        "name": "Influencer Marketing",
        "slug": "influencer-marketing",
        "description": "Creator discovery, outreach, briefs, approvals, tracking, and campaign reporting."
      }
    ],
    "process": [
      {
        "title": "Agree the buyer and scope",
        "description": "Review your offer, existing activity, audience and the evidence available to support the work."
      },
      {
        "title": "Implement and review",
        "description": "Assign owners, deliver the agreed assets and check technical accuracy, claims and conversion paths."
      },
      {
        "title": "Learn from enquiries",
        "description": "Review discovery data and sales feedback together, then prioritize the next changes."
      }
    ],
    "techStack": [
      "Sprout Social",
      "Hootsuite",
      "Canva Enterprise",
      "Adobe Creative Suite",
      "TikTok Ads Manager"
    ],
    "relatedIndustries": [
      "SaaS",
      "Manufacturing",
      "Professional Services"
    ],
    "faqs": [
      {
        "question": "How does AI support the work?",
        "answer": "AI can assist research, grouping and drafting. A person reviews sources, technical recommendations and publishable claims. We agree access and data handling before using business information in any tool."
      },
      {
        "question": "How is an engagement scoped?",
        "answer": "We agree the buyer groups, services, markets, responsibilities and measurement before work starts. SEO and AI-search work can run alongside your internal team. PPC is scoped separately."
      },
      {
        "question": "What should we expect from a first call?",
        "answer": "We discuss what you sell, who buys it, your current acquisition activity and the problem you need to solve. You can also send an enquiry with that context."
      }
    ]
  },
  {
    "id": "video",
    "title": "B2B Video & Product Explanations",
    "shortDescription": "Explain products, applications and delivery clearly with video.",
    "fullDescription": "Video can help a buying team assess a complex product or understand how an engagement works. We plan scripts, demonstrations and repurposed assets around the questions that delay a decision. Production requirements, customer permissions and distribution are agreed before recording.",
    "icon": "Video",
    "kpis": [
      "Useful product explanations",
      "Accessible captions",
      "Relevant enquiry paths"
    ],
    "subServices": [
      {
        "name": "Explainer Videos",
        "slug": "explainer-videos",
        "description": "Concise, animated or live-action videos that make a complex offer clear."
      },
      {
        "name": "Product Videos",
        "slug": "product-videos",
        "description": "Feature walkthroughs and demos that drive consideration and conversion."
      },
      {
        "name": "Testimonial Videos",
        "slug": "testimonial-videos",
        "description": "Customer-proof films that accelerate BOFU decisions."
      },
      {
        "name": "YouTube Channel Management",
        "slug": "youtube-channel-management",
        "description": "Strategy, production cadence, and optimization for a YouTube growth engine."
      },
      {
        "name": "Podcast Production",
        "slug": "podcast-production",
        "description": "Booking, recording, editing, and repurposing for an owned audio channel."
      },
      {
        "name": "Animation & Motion Graphics",
        "slug": "animation-motion-graphics",
        "description": "Brand motion, kinetic typography, and animated explainers."
      }
    ],
    "process": [
      {
        "title": "Agree the buyer and scope",
        "description": "Review your offer, existing activity, audience and the evidence available to support the work."
      },
      {
        "title": "Implement and review",
        "description": "Assign owners, deliver the agreed assets and check technical accuracy, claims and conversion paths."
      },
      {
        "title": "Learn from enquiries",
        "description": "Review discovery data and sales feedback together, then prioritize the next changes."
      }
    ],
    "techStack": [
      "Adobe Premiere",
      "After Effects",
      "DaVinci Resolve",
      "Descript",
      "Figma"
    ],
    "relatedIndustries": [
      "SaaS",
      "Manufacturing",
      "Professional Services"
    ],
    "faqs": [
      {
        "question": "How does AI support the work?",
        "answer": "AI can assist research, grouping and drafting. A person reviews sources, technical recommendations and publishable claims. We agree access and data handling before using business information in any tool."
      },
      {
        "question": "How is an engagement scoped?",
        "answer": "We agree the buyer groups, services, markets, responsibilities and measurement before work starts. SEO and AI-search work can run alongside your internal team. PPC is scoped separately."
      },
      {
        "question": "What should we expect from a first call?",
        "answer": "We discuss what you sell, who buys it, your current acquisition activity and the problem you need to solve. You can also send an enquiry with that context."
      }
    ],
    "deepDive": [
      {
        "title": "Show the application",
        "content": "Explain the starting problem, demonstrate the relevant workflow and identify limitations. Buyers need enough context to judge whether the approach fits their situation."
      },
      {
        "title": "Make the information usable",
        "content": "Provide captions, a transcript and descriptive supporting content. Link the video to the relevant service or application page rather than ending at a view count."
      }
    ]
  },
  {
    "id": "email-automation",
    "title": "B2B Email & Lead Follow-up",
    "shortDescription": "Carry enquiry context into relevant follow-up and a clear sales handoff.",
    "fullDescription": "A useful follow-up begins with what the person requested. We design contact journeys, consent-aware nurture and CRM routing so enquiries reach an owner with the right context. Content engagement and sales qualification stay separate; a download does not automatically make someone sales-ready.",
    "icon": "Mail",
    "kpis": [
      "Confirmed enquiry capture",
      "Assigned follow-up",
      "Sales handoff quality"
    ],
    "subServices": [
      {
        "name": "Email Campaign Management",
        "slug": "email-campaign-management",
        "description": "Planning, building, and sending campaigns that drive opens, clicks, and revenue."
      },
      {
        "name": "Newsletter Management",
        "slug": "newsletter-management",
        "description": "Owned-audience newsletters that build trust and pipeline."
      },
      {
        "name": "Automated Flows",
        "slug": "automated-flows",
        "description": "Requested-resource delivery, enquiry follow-up and permission-based nurture with clear stop conditions."
      },
      {
        "name": "List Segmentation",
        "slug": "list-segmentation",
        "description": "Behavioral and lifecycle segmentation for relevant, higher-converting sends."
      },
      {
        "name": "Email Deliverability",
        "slug": "email-deliverability",
        "description": "Review authentication, sending practices, list quality and reputation; inbox placement remains variable."
      },
      {
        "name": "SMS & WhatsApp Marketing",
        "slug": "sms-whatsapp-marketing",
        "description": "Permission-based messaging with an appropriate purpose and a clear opt-out."
      },
      {
        "name": "Marketing Automation Setup",
        "slug": "marketing-automation-setup",
        "description": "CRM and workflow implementation based on your existing systems and agreed ownership."
      },
      {
        "name": "Lead Nurturing Workflows",
        "slug": "lead-nurturing-workflows",
        "description": "Consent-based follow-up with sales confirmation before an SQL classification."
      },
      {
        "name": "CRM Setup & Management",
        "slug": "crm-setup-management",
        "description": "Pipeline design, lead routing, scoring, and reporting in your CRM."
      }
    ],
    "process": [
      {
        "title": "Agree the buyer and scope",
        "description": "Review your offer, existing activity, audience and the evidence available to support the work."
      },
      {
        "title": "Implement and review",
        "description": "Assign owners, deliver the agreed assets and check technical accuracy, claims and conversion paths."
      },
      {
        "title": "Learn from enquiries",
        "description": "Review discovery data and sales feedback together, then prioritize the next changes."
      }
    ],
    "techStack": [
      "HubSpot",
      "Klaviyo",
      "Customer.io",
      "Twilio",
      "Postmark"
    ],
    "relatedIndustries": [
      "SaaS",
      "Manufacturing",
      "Professional Services"
    ],
    "faqs": [
      {
        "question": "How does AI support the work?",
        "answer": "AI can assist research, grouping and drafting. A person reviews sources, technical recommendations and publishable claims. We agree access and data handling before using business information in any tool."
      },
      {
        "question": "How is an engagement scoped?",
        "answer": "We agree the buyer groups, services, markets, responsibilities and measurement before work starts. SEO and AI-search work can run alongside your internal team. PPC is scoped separately."
      },
      {
        "question": "What should we expect from a first call?",
        "answer": "We discuss what you sell, who buys it, your current acquisition activity and the problem you need to solve. You can also send an enquiry with that context."
      }
    ],
    "deepDive": [
      {
        "title": "Keep the request and the permission clear",
        "content": "Send the information a person requested and record optional marketing consent separately. Stop nurture when someone replies, books, opts out or moves into an active sales conversation."
      },
      {
        "title": "Make the next action visible",
        "content": "Keep the service interest, originating page and agreed next step with the contact. Preserve existing owners and advanced lifecycle stages rather than resetting a relationship on each form submission."
      }
    ]
  },
  {
    "id": "cro-analytics",
    "title": "B2B Conversion & Measurement",
    "shortDescription": "Make enquiries and booked calls easier, then measure what actually happened.",
    "fullDescription": "We review the path from discovery to enquiry, identify friction and improve the information buyers need to act. Analytics is designed around confirmed events, appropriate consent and sales feedback. Experiments are prioritized against traffic and decision risk, with no implied promise of a particular lift.",
    "icon": "BarChart3",
    "kpis": [
      "Confirmed enquiries",
      "Completed bookings",
      "Sales acceptance"
    ],
    "subServices": [
      {
        "name": "A/B Testing",
        "slug": "ab-testing",
        "description": "Hypothesis-driven experiments with statistical rigor and a prioritized backlog."
      },
      {
        "name": "Landing Page Optimization",
        "slug": "landing-page-optimization",
        "description": "Message match, proof, and friction reduction to lift conversion."
      },
      {
        "name": "Funnel Optimization",
        "slug": "funnel-optimization",
        "description": "End-to-end funnel diagnosis and fixes from click to closed."
      },
      {
        "name": "Heatmaps & Session Recording",
        "slug": "heatmaps-session-recording",
        "description": "Behavioral analysis with Clarity/Hotjar to find friction and opportunity."
      },
      {
        "name": "GA4 Setup",
        "slug": "ga4-setup",
        "description": "Clean GA4 implementation with events, conversions, and reporting."
      },
      {
        "name": "Google Tag Manager Setup",
        "slug": "google-tag-manager-setup",
        "description": "GTM containers, triggers, and a maintainable tagging structure."
      },
      {
        "name": "Conversion Tracking",
        "slug": "conversion-tracking",
        "description": "Accurate cross-channel conversion measurement and goal mapping."
      },
      {
        "name": "Server-Side Tracking",
        "slug": "server-side-tracking",
        "description": "Server-side GTM for durable, privacy-resilient measurement."
      },
      {
        "name": "Attribution Modeling",
        "slug": "attribution-modeling",
        "description": "Assign credit to observed interactions under an agreed model, with data gaps and limitations documented."
      },
      {
        "name": "Reporting Dashboards",
        "slug": "reporting-dashboards",
        "description": "Looker Studio dashboards that turn data into decisions."
      }
    ],
    "process": [
      {
        "title": "Agree the buyer and scope",
        "description": "Review your offer, existing activity, audience and the evidence available to support the work."
      },
      {
        "title": "Implement and review",
        "description": "Assign owners, deliver the agreed assets and check technical accuracy, claims and conversion paths."
      },
      {
        "title": "Learn from enquiries",
        "description": "Review discovery data and sales feedback together, then prioritize the next changes."
      }
    ],
    "techStack": [
      "GA4",
      "Google Tag Manager",
      "Microsoft Clarity",
      "Optimizely",
      "Looker Studio",
      "Segment"
    ],
    "relatedIndustries": [
      "SaaS",
      "Manufacturing",
      "Professional Services"
    ],
    "faqs": [
      {
        "question": "How does AI support the work?",
        "answer": "AI can assist research, grouping and drafting. A person reviews sources, technical recommendations and publishable claims. We agree access and data handling before using business information in any tool."
      },
      {
        "question": "How is an engagement scoped?",
        "answer": "We agree the buyer groups, services, markets, responsibilities and measurement before work starts. SEO and AI-search work can run alongside your internal team. PPC is scoped separately."
      },
      {
        "question": "What should we expect from a first call?",
        "answer": "We discuss what you sell, who buys it, your current acquisition activity and the problem you need to solve. You can also send an enquiry with that context."
      }
    ],
    "deepDive": [
      {
        "title": "Fix the journey before adding more traffic",
        "content": "Check message clarity, evidence, mobile usability, form errors and next-step expectations. An interested buyer should not have to guess how to contact you."
      },
      {
        "title": "Keep event definitions honest",
        "content": "A click is not a booking. A booking is not an SQL. Define each event, reconcile it with its source system and show attribution limitations in reporting."
      }
    ]
  }
];

export const LOCATION_MATRIX_SERVICE_IDS = ['seo', 'smm', 'ai-seo', 'web-development', 'branding-creative', 'ppc'] as const;
export const LOCATION_MATRIX_SERVICES = SERVICES.filter((service) => (LOCATION_MATRIX_SERVICE_IDS as readonly string[]).includes(service.id));

/* Sub-services we do not run for clients (operator, 2026-10-08: no TikTok, Amazon or
   streaming-TV ads). Their pages stay live and their rows stay in SERVICES so the URLs
   keep resolving, but nothing advertises them: they are kept out of the /services/ppc
   list, the schema.org OfferCatalog and any llms or agent-markdown service list. Keyed
   `<serviceId>/<slug>`. */
export const NOT_OFFERED_SUB_SERVICES: ReadonlySet<string> = new Set([
  'ppc/tiktok-ads',
  'ppc/amazon-ads',
  'ppc/ctv-ads',
]);

const subServiceSlugOf = (sub: { name: string; slug?: string }) =>
  sub.slug || sub.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** The sub-services a service may advertise: every row except the ones we do not offer. */
export const offeredSubServices = <T extends { name: string; slug?: string }>(serviceId: string, subs: readonly T[]): T[] =>
  subs.filter((sub) => !NOT_OFFERED_SUB_SERVICES.has(`${serviceId}/${subServiceSlugOf(sub)}`));
