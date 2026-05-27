
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 Create file
 Documents/GitHub/qognition-agency-landing/CLAUDE.md
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
    1 # Qognition Agency — Project Bible
    2
    3 > Hub + 5 Spokes architecture for qognition.com. Single domain, single capture layer, five focused conversion funnels. Optimized for SEO + LLM citation + high lead conversion.
    4
    5 ---
    6
    7 ## 1. Business model
    8
    9 Qognition is an operating partner for founders and growth-stage companies, delivering five capabilities under one roof:
   10
   11 | Spoke | What we sell | Primary buyer | Sales cycle | Pricing model |
   12 |---|---|---|---|---|
   13 | **Marketing** | SEO, AI search, PPC, social, content | CMO / Founder | 2–6 weeks | Retainer $3–15K/mo |
   14 | **Build** | Websites, web apps, software, integrations | CTO / Founder | 4–12 weeks | Project $10–150K |
   15 | **Books** | Bookkeeping, tax, fractional CFO | CFO / Founder | 2–4 weeks | Retainer $500–5K/mo |
   16 | **Flow** | Automation, AI agents, ops infra | COO / Ops lead | 3–8 weeks | Project + retainer |
   17 | **Brand** | Strategy, identity, naming, creative | Founder / CMO | 6–12 weeks | Project $15–80K |
   18
   19 **The architecture must respect that each spoke has a different buyer.** Cross-sell happens in the relationship, not on the homepage. Each spoke runs as a focused mini-agency, unified visually under
      the Qognition parent.
   20
   21 ---
   22
   23 ## 2. Brand architecture: Hub + 5 Spokes
   24
   25 ```
   26 qognition.com (parent hub — umbrella brand, story, trust)
   27 ├── /marketing/*   →  Spoke 1 — focused mini-site for marketing buyers
   28 ├── /build/*       →  Spoke 2 — focused mini-site for tech buyers
   29 ├── /books/*       →  Spoke 3 — focused mini-site for finance buyers
   30 ├── /flow/*        →  Spoke 4 — focused mini-site for ops buyers
   31 └── /brand/*       →  Spoke 5 — focused mini-site for brand buyers
   32 ```
   33
   34 **Why subdirectories, not subdomains or separate domains:**
   35 - All link equity compounds on one domain (massive SEO advantage)
   36 - Single Next.js codebase, single deploy, single CRM, single analytics
   37 - Spoke-specific theming via URL-aware design tokens
   38
   39 **Each spoke acts like a focused agency.** Each has its own homepage, sub-service pages, audit funnel, pricing page, case studies, and CTA. The parent unifies them through the global nav, footer, des
      ign system, and team page.
   40
   41 ---
   42
   43 ## 3. Full URL / page architecture
   44
   45 ### 3.1 Parent hub (shared across all spokes)
   46
   47 ```
   48 /                                  Hub homepage (5 spoke entry cards + master CTA)
   49 /about                             Company story
   50 /team                              Full team (cross-spoke)
   51 /process                           How we work (general engagement model)
   52 /case-studies                      All wins, filterable by spoke
   53 /case-studies/[slug]               Individual case study
   54 /pricing                           Master pricing matrix (5 columns, one per spoke)
   55 /book                              Master booking — "Not sure where to start" route
   56 /contact                           General contact form
   57 /resources                         Cross-spoke resource hub
   58 /resources/[slug]                  Guides, templates, calculators
   59 /blog                              Editorial
   60 /blog/[category]                   Category pages
   61 /blog/[slug]                       Posts
   62 /sitemap                           HTML sitemap
   63 /legal/privacy
   64 /legal/terms
   65 /legal/cookies
   66 ```
   67
   68 ### 3.2 Marketing spoke (`/marketing/*`)
   69
   70 ```
   71 /marketing                         Spoke homepage
   72 /marketing/seo                     Traditional SEO retainers
   73 /marketing/ai-seo                  AI search / AEO / LLM visibility
   74 /marketing/ppc                     Paid ads (Google + Meta + LinkedIn)
   75 /marketing/social                  Social media management
   76 /marketing/content                 Content marketing + production
   77 /marketing/email                   Email + lifecycle marketing
   78 /marketing/audit                  → Free Marketing + SEO Audit (lead magnet)
   79 /marketing/pricing                 Marketing tiers (Starter / Growth / Scale)
   80 /marketing/case-studies            Filtered case studies
   81 /marketing/process                 90-day marketing engagement model
   82 /marketing/faq                     Marketing-specific FAQ
   83 /marketing/resources               Templates, calculators (SEO ROI, ad spend)
   84 /marketing/book                    Book a marketing strategy call
   85 ```
   86
   87 ### 3.3 Build spoke (`/build/*`)
   88
   89 ```
   90 /build                             Spoke homepage
   91 /build/websites                    Marketing websites
   92 /build/web-apps                    Custom SaaS / web apps
   93 /build/ecommerce                   Shopify, headless commerce
   94 /build/nextjs-seo                  Next.js sites optimized for SEO
   95 /build/api-integrations            API + 3rd-party integrations
   96 /build/performance                 Core Web Vitals + speed optimization
   97 /build/audit                      → Free Tech + Performance Audit
   98 /build/pricing                     Build packages (Sprint / Project / Retainer)
   99 /build/case-studies                Filtered
  100 /build/process                     Build phases (Discovery → Design → Build → Ship)
  101 /build/faq
  102 /build/resources                   Tech checklists, stack guides
  103 /build/book                        Book a tech scoping call
  104 ```
  105
  106 ### 3.4 Books spoke (`/books/*`)
  107
  108 ```
  109 /books                             Spoke homepage
  110 /books/bookkeeping                 Monthly bookkeeping
  111 /books/tax                         Tax preparation + planning
  112 /books/fractional-cfo              Fractional CFO services
  113 /books/payroll                     Payroll management
  114 /books/financial-reporting         Monthly close + reporting
  115 /books/cash-flow                   Cash flow management + forecasting
  116 /books/audit                      → Free Books Health Check
  117 /books/pricing                     Books tiers (Bookkeeping / CFO / Combined)
  118 /books/case-studies                Filtered
  119 /books/process                     Onboarding → Cleanup → Monthly close
  120 /books/faq
  121 /books/resources                   Tax calendars, expense templates
  122 /books/book                        Book a books discovery call
  123 ```
  124
  125 ### 3.5 Flow spoke (`/flow/*`)
  126
  127 ```
  128 /flow                              Spoke homepage
  129 /flow/workflow-automation          n8n, Make, Zapier workflows
  130 /flow/ai-agents                    LLM-powered agents
  131 /flow/integrations                 CRM + tool integrations
  132 /flow/data-pipelines               ETL, data sync, dashboards
  133 /flow/crm-automation               HubSpot, Attio, Pipedrive automation
  134 /flow/no-code-stack                No-code + low-code architectures
  135 /flow/audit                       → Free Automation Opportunity Map
  136 /flow/pricing                      Flow packages (Sprint / Build / Retainer)
  137 /flow/case-studies                 Filtered
  138 /flow/process                      Audit → Map → Build → Monitor
  139 /flow/faq
  140 /flow/resources                    Automation calculators, stack templates
  141 /flow/book                         Book a flow strategy call
  142 ```
  143
  144 ### 3.6 Brand spoke (`/brand/*`)
  145
  146 ```
  147 /brand                             Spoke homepage
  148 /brand/brand-strategy              Strategy + positioning
  149 /brand/visual-identity             Logo, system, guidelines
  150 /brand/naming                      Naming + verbal identity
  151 /brand/messaging                   Voice, tone, taglines, copy
  152 /brand/creative-direction          Creative leadership
  153 /brand/rebrand                     Rebrand projects
  154 /brand/audit                      → Free Brand Coherence Audit
  155 /brand/pricing                     Brand tiers (Refresh / Identity / Full rebrand)
  156 /brand/case-studies                Filtered
  157 /brand/process                     Discovery → Strategy → Identity → Rollout
  158 /brand/faq
  159 /brand/resources                   Brand templates, audit checklists
  160 /brand/book                        Book a brand discovery call
  161 ```
  162
  163 ### 3.7 API routes
  164
  165 ```
  166 /api/lead                          POST — single capture endpoint, all forms
  167 /api/audit-request                 POST — audit-specific intake
  168 /api/newsletter                    POST — newsletter signup
  169 /api/contact                       POST — general contact
  170 /api/og/[spoke]                    GET — dynamic OG images per spoke
  171 ```
  172
  173 ### 3.8 Pages to DELETE / noindex from current site
  174
  175 These are dragging down site quality (HCU vulnerable):
  176
  177 ```
  178 /directory                         DELETE — irrelevant pSEO noise
  179 /comparisons                       DELETE unless rewritten with real depth
  180 /glossary                          DELETE or merge top 20 into /resources
  181 /free-tools                        AUDIT — keep only tools that actually work
  182 /languages                         DELETE — premature i18n
  183 /global                            DELETE
  184 /regions/uae-ksa                   DELETE unless actively servicing
  185 /regions/india                     DELETE unless actively servicing
  186 /regions/australia                 DELETE unless actively servicing
  187 /sitemaps/*                        Keep one consolidated XML sitemap
  188 /llm                               DELETE if thin
  189 ```
  190
  191 **Rule:** If a page doesn't generate leads, build authority, or rank — kill it. Less = more.
  192
  193 ---
  194
  195 ## 4. Per-spoke conversion playbook (highest conversion focus)
  196
  197 ### 4.1 Spoke homepage section sequence (REQUIRED for every spoke)
  198
  199 ```
  200 1. Hero
  201    - H1: outcome-led, ICP-specific, ONE sentence
  202    - Subhead: one sentence on how
  203    - Primary CTA: "Get your free [Spoke] Audit"
  204    - Secondary CTA: "Book a 20-min strategy call"
  205    - Above-fold proof: 5-7 logos OR "Trusted by 50+ founders"
  206    - Hero asset: real product screenshot OR founder Loom OR demo, NOT stock art
  207
  208 2. Pain block (3 specific pains)
  209    - "You're probably struggling with X, Y, or Z"
  210    - Each pain quotes the ICP's actual language
  211
  212 3. Solution snapshot
  213    - 3-step process visual
  214    - "Here's how we fix it" in 60 seconds
  215
  216 4. Outcomes (proof)
  217    - 3 case studies with HARD NUMBERS
  218    - Format: "[Logo] We took [Metric] from X to Y in Z weeks"
  219    - Each links to full case study
  220
  221 5. What's included
  222    - Service grid (5-6 sub-services as cards)
  223    - Each card links to its sub-service page
  224
  225 6. How we work (process)
  226    - Week-by-week or phase-based timeline
  227    - "Week 1: discovery. Week 2: audit. Week 3-12: execution."
  228
  229 7. Pricing transparency
  230    - Show ranges or tiers (don't hide)
  231    - "Starts at $X/mo" or "$X-Y projects"
  232
  233 8. Team
  234    - 3-5 real faces with credentials
  235    - "Worked at [Notable Co]" badges
  236
  237 9. Risk reversal / guarantee
  238    - "If we don't [outcome], we [refund/work free/etc]"
  239    - OR "Free audit first, no commitment"
  240
  241 10. FAQ (top 6 objections)
  242     - Use FAQPage schema
  243     - Each answer 60-120 words
  244
  245 11. Final CTA block
  246     - Repeat primary CTA
  247     - Inline Calendly OR audit form
  248     - DO NOT bury booking behind another click
  249 ```
  250
  251 ### 4.2 Conversion rules — non-negotiable
  252
  253 | Rule | Why |
  254 |---|---|
  255 | ONE H1 per page | SEO + clarity |
  256 | ONE primary CTA above fold | Decision fatigue kills conversion |
  257 | Inline Calendly on final CTA | Each extra click drops 30% |
  258 | Real photos of team — no stock | Trust killer in 2026 |
  259 | Specific numbers, never "many" | "We've helped 47 SaaS founders" > "many clients" |
  260 | Sticky CTA on scroll | Always visible on long pages |
  261 | Founder Loom on every spoke homepage | 2-3 min personal video. Doubles trust. |
  262 | Exit-intent popup with secondary magnet | Recovers ~5-10% of leavers |
  263 | Cookie-based personalization | Returning visitor sees their last spoke |
  264 | Mobile-first audit forms (4 fields max) | Mobile = 60%+ of traffic |
  265 | Schema markup per page | Organization, Service, FAQPage, BreadcrumbList |
  266 | Loading speed <2.5s LCP | Direct conversion + ranking impact |
  267
  268 ### 4.3 Sub-service page template
  269
  270 Every `/spoke/sub-service` page follows:
  271
  272 ```
  273 1. Hero (specific outcome H1, primary CTA)
  274 2. The problem with how it's usually done (the differentiator setup)
  275 3. Our approach (3-4 paragraphs + visual)
  276 4. Deliverables list (what they actually receive)
  277 5. Timeline (weeks / phases)
  278 6. 2-3 mini case studies with numbers
  279 7. FAQ (4-5 questions, FAQPage schema)
  280 8. Final CTA (same as spoke — inline form/Calendly)
  281 ```
  282
  283 ### 4.4 Audit page template (the lead magnet)
  284
  285 These are the highest-converting pages. Treat with extreme care.
  286
  287 ```
  288 1. Hero
  289    - H1: "Free [Service] Audit — find [specific outcome] in [timeframe]"
  290    - Sub: "We'll review your [X], [Y], [Z] and send a [deliverable] in 48 hours"
  291    - Primary CTA: form to the right or below fold
  292
  293 2. What you'll get (the deliverables)
  294    - 10-15 item checklist with checkmarks
  295    - 1-2 screenshot examples (blurred client data)
  296    - "8-12 page deck" or "20-min Loom video" — be specific
  297
  298 3. Sample audit (proof of quality)
  299    - Screenshot of a real audit (with permission/blurred)
  300    - "Here's what one looks like →"
  301
  302 4. Who this is for
  303    - 3 bullets: "You're a SaaS founder doing $X-Y ARR who..."
  304    - Filters out tire-kickers
  305
  306 5. Process (transparency)
  307    - "1. Fill the form. 2. We review in 24h. 3. You get the audit in 48h. 4. Optional 30-min walkthrough call."
  308
  309 6. FAQ
  310    - "Is this really free?"
  311    - "What's the catch?"
  312    - "How long does it take?"
  313    - "Will you sell my data?"
  314
  315 7. Form (NEVER more than 4 fields)
  316    - Name | Email | Company URL | One question (e.g., "Biggest challenge?")
  317    - Honeypot field for spam
  318    - GDPR checkbox if EU traffic
  319 ```
  320
  321 ### 4.5 Lead magnets per spoke
  322
  323 | Spoke | Lead magnet | Deliverable format |
  324 |---|---|---|
  325 | Marketing | Free Marketing + AI Search Audit | 10-min Loom + 1-page summary |
  326 | Build | Free Tech + Performance Audit | Lighthouse report + 8-min Loom |
  327 | Books | Free Books Health Check | 1-page benchmark report + Loom |
  328 | Flow | Free Automation Opportunity Map | Process diagram + ROI estimate |
  329 | Brand | Free Brand Coherence Audit | 10-page deck + Loom walkthrough |
  330
  331 **These are not gated PDFs.** They are real samples of the work, sent within 48 hours, manually produced. This is the moat.
  332
  333 ---
  334
  335 ## 5. Lead capture architecture
  336
  337 ### 5.1 Single endpoint, five funnels
  338
  339 Every form on the site POSTs to `/api/lead` with a `service` field:
  340
  341 ```ts
  342 POST /api/lead
  343 {
  344   service: "marketing" | "build" | "books" | "flow" | "brand" | "unsure",
  345   intent: "audit" | "consultation" | "pricing" | "contact",
  346   source_page: string,         // e.g. "/marketing/audit"
  347   utm: { source, medium, campaign, term, content },
  348   contact: {
  349     name: string,
  350     email: string,
  351     company?: string,
  352     company_url?: string,
  353     phone?: string,
  354     message?: string
  355   },
  356   metadata: {
  357     spoke_visited_first?: string,    // cookie
  358     pages_viewed?: number,
  359     time_on_site?: number,
  360     referrer?: string
  361   }
  362 }
  363 ```
  364
  365 ### 5.2 What `/api/lead` does
  366
  367 1. Validate + sanitize input
  368 2. Honeypot + rate-limit check
  369 3. Create contact in CRM (HubSpot / Attio / Pipedrive)
  370 4. Tag with `service` → routes to correct pipeline
  371 5. Slack alert to spoke owner with full context
  372 6. Trigger spoke-specific email nurture sequence
  373 7. If `intent: audit` → send confirmation + Calendly link for walkthrough
  374 8. Log to analytics (GA4 event + Vercel Analytics)
  375 9. Return 200 with redirect target
  376
  377 ### 5.3 CRM pipeline structure
  378
  379 ```
  380 CRM
  381 ├── Pipeline: Marketing Leads     → owner: marketing closer
  382 ├── Pipeline: Build Leads         → owner: build closer
  383 ├── Pipeline: Books Leads         → owner: books partner
  384 ├── Pipeline: Flow Leads          → owner: flow lead
  385 ├── Pipeline: Brand Leads         → owner: brand lead
  386 └── Pipeline: Unsure / Multi      → owner: chief of staff (you)
  387
  388 Stages (consistent per pipeline):
  389 1. New lead
  390 2. Audit delivered / discovery scheduled
  391 3. Discovery call complete
  392 4. Proposal sent
  393 5. Negotiation
  394 6. Closed-won / Closed-lost
  395 ```
  396
  397 ### 5.4 Cross-sell mechanism
  398
  399 Cross-sell is NOT a homepage feature. It happens in:
  400
  401 1. **Discovery call**: every closer asks "Are you happy with your [other 4 services]?" — flag interest
  402 2. **Onboarding intake**: standard question — "What other functions need attention?"
  403 3. **Quarterly business review** (existing clients): "Here's marketing progress. Want us to look at [other spoke]?"
  404 4. **Internal Slack `#cross-sell-signals` channel** — auto-flagged opportunities
  405
  406 ---
  407
  408 ## 6. Tech stack
  409
  410 This repo: **Next.js 16 + React 19 + TypeScript + Tailwind CSS** (App Router).
  411
  412 ### 6.1 Key dependencies
  413
  414 - `next` ^16.2.5
  415 - `react` ^19.2.6
  416 - `framer-motion` — animations (sparingly, conversion > flair)
  417 - `lucide-react` — icons
  418 - `tailwindcss`
  419 - Future: `@vercel/analytics`, `@vercel/speed-insights`, schema generators
  420
  421 ### 6.2 Deployment
  422
  423 - Hosted on **Vercel** (already configured — see `/.vercel`)
  424 - Use Vercel preview deployments for every spoke PR
  425 - Production: `qognition.com` (parent), no subdomains
  426
  427 ### 6.3 Cache + ISR strategy
  428
  429 - Static pages: ISR with `revalidate: 3600` (case studies, blog)
  430 - Spoke homepages: ISR with `revalidate: 600`
  431 - Audit + book pages: dynamic (always fresh)
  432 - Use Next.js 16 Cache Components where appropriate (`use cache` directive)
  433
  434 ### 6.4 Code organization
  435
  436 ```
  437 app/
  438 ├── (hub)/              # parent routes — homepage, about, team, process
  439 ├── marketing/          # marketing spoke
  440 ├── build/              # build spoke
  441 ├── books/              # books spoke
  442 ├── flow/               # flow spoke
  443 ├── brand/              # brand spoke
  444 ├── api/
  445 │   ├── lead/route.ts
  446 │   ├── audit-request/route.ts
  447 │   └── newsletter/route.ts
  448 ├── layout.tsx          # root layout with shared shell
  449 └── globals.css
  450
  451 components/
  452 ├── shared/             # nav, footer, CTAs, forms (spoke-aware)
  453 ├── hub/                # parent-specific components
  454 ├── spokes/
  455 │   ├── marketing/
  456 │   ├── build/
  457 │   ├── books/
  458 │   ├── flow/
  459 │   └── brand/
  460 └── ui/                 # primitive ui (buttons, inputs)
  461
  462 lib/
  463 ├── crm.ts              # CRM client (HubSpot/Attio)
  464 ├── analytics.ts        # GA4 + Vercel Analytics events
  465 ├── schema.ts           # JSON-LD generators per page type
  466 ├── spokes.ts           # spoke config (colors, names, copy)
  467 └── validation.ts       # zod schemas for forms
  468
  469 data/
  470 ├── case-studies.ts     # case study data (tagged by spoke)
  471 ├── team.ts
  472 ├── pricing.ts
  473 └── faqs/{spoke}.ts
  474 ```
  475
  476 ### 6.5 Spoke-aware theming
  477
  478 Each spoke gets accent color injected via CSS vars from URL:
  479
  480 ```ts
  481 // app/[spoke]/layout.tsx
  482 const SPOKE_COLORS = {
  483   marketing: { accent: "#7C3AED", accentLight: "#A78BFA" }, // Electric Purple
  484   build:     { accent: "#2563EB", accentLight: "#60A5FA" }, // Cobalt Blue
  485   books:     { accent: "#059669", accentLight: "#34D399" }, // Emerald Green
  486   flow:      { accent: "#F59E0B", accentLight: "#FBBF24" }, // Amber Orange
  487   brand:     { accent: "#EC4899", accentLight: "#F472B6" }, // Magenta Pink
  488 };
  489 ```
  490
  491 CSS uses `var(--accent)` for the spoke color — base components stay shared.
  492
  493 ---
  494
  495 ## 7. SEO + LLM citation strategy
  496
  497 ### 7.1 Per-spoke SEO
  498
  499 Each spoke is treated as its own topical authority hub:
  500
  501 - **Hub page** (`/marketing`) targets head term: "AI growth marketing agency" or similar
  502 - **Sub-service pages** target mid-tail: "Programmatic SEO services for SaaS"
  503 - **Audit page** targets transactional: "Free SEO audit"
  504 - **Blog/resources** target long-tail informational queries
  505 - Internal linking: every sub-service links back to spoke hub + 2-3 sibling sub-services
  506
  507 ### 7.2 Schema markup (every page)
  508
  509 ```ts
  510 // Required JSON-LD per page type:
  511 - Homepage:        Organization + WebSite + BreadcrumbList
  512 - Spoke hub:       Service + BreadcrumbList + FAQPage
  513 - Sub-service:     Service + BreadcrumbList + FAQPage
  514 - Case study:      Article + BreadcrumbList + Review (if applicable)
  515 - Audit / book:    WebPage + BreadcrumbList + Service
  516 - Team:            Organization + Person[]
  517 - Blog post:       Article + BreadcrumbList + Person (author)
  518 ```
  519
  520 ### 7.3 LLM citation optimization
  521
  522 For ChatGPT / Perplexity / Claude search visibility:
  523
  524 - **Be the answer**: write definitive FAQ-style content per service question
  525 - **Original data + research**: publish quarterly data reports per spoke (e.g., "State of AI SEO 2026")
  526 - **Get cited externally**: Reddit, Hacker News, niche communities (heavily weighted in retrieval)
  527 - **Clean HTML semantic structure**: `<article>`, `<section>`, `<h2>`, no JS-only rendered text
  528 - **`/llms.txt` and `/llms-full.txt`** at root: list crawlable content for LLMs
  529 - **`robots.txt`** explicitly allows GPTBot, Claude-Web, PerplexityBot, GoogleOther
  530
  531 ### 7.4 E-E-A-T signals
  532
  533 - Real author bios on every blog post (with credentials + photo + social)
  534 - "About the author" boxes
  535 - Date last updated visible on content pages
  536 - Outbound links to authoritative sources
  537 - Internal expert quotes ("our CFO advisor says...")
  538
  539 ---
  540
  541 ## 8. Brand system
  542
  543 ### 8.1 Master brand
  544
  545 - **Name**: Qognition
  546 - **Tagline**: TBD — should emphasize "operating partners" angle
  547 - **Logo lockups**: `Qognition` / `Qognition Marketing` / `Qognition Build` / etc.
  548
  549 ### 8.2 Per-spoke identity
  550
  551 | Spoke | Accent | Light variant | Icon style |
  552 |---|---|---|---|
  553 | Marketing | `#7C3AED` Electric Purple | `#A78BFA` | Charts, arrows, growth |
  554 | Build | `#2563EB` Cobalt Blue | `#60A5FA` | Code brackets, blueprints |
  555 | Books | `#059669` Emerald Green | `#34D399` | Calculator, ledger |
  556 | Flow | `#F59E0B` Amber Orange | `#FBBF24` | Nodes, connections |
  557 | Brand | `#EC4899` Magenta Pink | `#F472B6` | Type, geometric shapes |
  558
  559 ### 8.3 Shared system
  560
  561 - **Typography**: one display font (TBD — recommend Geist or Inter) + one body font
  562 - **Spacing scale**: Tailwind defaults
  563 - **Border radius**: 8px default, 12px for cards
  564 - **Shadows**: soft, modern (avoid heavy)
  565 - **Animation**: framer-motion, max 200ms transitions, respect `prefers-reduced-motion`
  566
  567 ---
  568
  569 ## 9. Build phasing (90-day launch plan)
  570
  571 Do not launch all 5 spokes at once. That spreads thin and kills conversion per spoke.
  572
  573 ### Phase 1 — Foundation (Weeks 1-3)
  574 - Set up Hub + Marketing spoke fully built
  575 - `/api/lead` working end-to-end with CRM + Slack
  576 - New homepage with 5 service cards (only Marketing has full content; others are "Coming soon" placeholders)
  577 - Kill / noindex thin pages from old site
  578 - Migrate top 10 case studies into new structure
  579
  580 ### Phase 2 — Marketing spoke launch (Weeks 4-6)
  581 - Marketing spoke goes live with all sub-services + audit + pricing
  582 - Run outbound (50 ICP/week) using Marketing audit as wedge
  583 - Goal: 5 booked discovery calls per week
  584
  585 ### Phase 3 — Build spoke (Weeks 7-10)
  586 - Add Build spoke (cross-sell to Marketing clients)
  587 - Update homepage to feature 2 spokes
  588 - Marketing + Build is the natural pairing
  589
  590 ### Phase 4 — Brand spoke (Weeks 11-13)
  591 - Add Brand spoke (natural pair with Marketing)
  592 - Update homepage to feature 3 spokes
  593
  594 ### Phase 5 — Flow spoke (Weeks 14-16)
  595 - Add Flow spoke (ops infra for existing clients)
  596
  597 ### Phase 6 — Books spoke (Weeks 17-20)
  598 - Add Books spoke LAST (different buyer entirely, needs dedicated person)
  599
  600 **Rule:** never launch a spoke without (a) a dedicated owner/closer, (b) at least 2 real case studies, (c) the full conversion stack from section 4.1.
  601
  602 ---
  603
  604 ## 10. Standards & conventions
  605
  606 ### 10.1 Component naming
  607
  608 - Spoke components: `<MarketingHero />`, `<BuildPricing />`
  609 - Shared components: `<SpokeHero spoke="marketing" />` — preferred (uses spoke config)
  610 - Audit components: `<AuditForm spoke="marketing" />`
  611 - Always TypeScript, never `any`
  612
  613 ### 10.2 File naming
  614
  615 - `kebab-case` for routes and files: `/marketing/ai-seo/page.tsx`
  616 - `PascalCase` for components: `SpokeHero.tsx`
  617 - `camelCase` for utilities: `getSpokeConfig.ts`
  618
  619 ### 10.3 Form handling
  620
  621 - All forms use the same `<LeadForm>` component, parameterized by `spoke` + `intent`
  622 - Zod validation on both client and server
  623 - Honeypot field always included
  624 - Rate limit at `/api/lead` (Vercel Edge Config or Upstash)
  625
  626 ### 10.4 Analytics events (GA4 + Vercel)
  627
  628 ```
  629 - spoke_view              { spoke }
  630 - lead_submit_attempt     { spoke, intent, source_page }
  631 - lead_submit_success     { spoke, intent }
  632 - audit_request           { spoke }
  633 - calendly_open           { spoke }
  634 - calendly_book           { spoke }
  635 - cross_sell_click        { from_spoke, to_spoke }
  636 ```
  637
  638 ### 10.5 Accessibility
  639
  640 - All forms keyboard-navigable
  641 - Color contrast WCAG AA minimum (AAA preferred)
  642 - Spoke accent colors validated for contrast on white + dark backgrounds
  643 - `prefers-reduced-motion` respected
  644 - Skip-to-content links on every page
  645
  646 ### 10.6 Performance budgets
  647
  648 - LCP < 2.5s on 4G
  649 - CLS < 0.05
  650 - INP < 200ms
  651 - Page weight < 500KB on first load (homepage + spoke hubs)
  652 - Images via Next.js `<Image>`, AVIF preferred
  653 - Fonts via `next/font`, max 2 weights per font
  654
  655 ---
  656
  657 ## 11. Anti-patterns (what NOT to do)
  658
  659 - ❌ Adding more services to the homepage hero. ONE wedge per page.
  660 - ❌ Generic stock photos of "people in offices." Real team photos only.
  661 - ❌ Multi-step forms before email capture. Email first, qualify later.
  - Content production: 5x — each spoke needs its own SEO + LinkedIn + case studies
  - Time to traction: 12-18 months before all 5 funnels produce reliably
  - Cost: ~$8-15K/month in tools + content + ads to feed 5 funnels properly
  - What kills this model: spreading thin. If marketing converts and books doesn't, founders default to "let's just be a marketing agency" — and the moat dies.

  The way to NOT spread thin: launch one spoke per quarter, not all 5 at once.

  Recommended sequence

  Q1 (now): Build the architecture. Launch parent + Marketing spoke (your strongest). Get to 5 clients.
  Q2: Add Build spoke. Cross-sell to Marketing clients.
  Q3: Add Brand spoke (natural pair with marketing).
  Q4: Add Flow (automation) — sell as ops layer on top.
  Year 2: Add Books last — totally different buyer, needs dedicated person.

  This way you build the multi-funnel infrastructure once, fill it in sequence, and don't drown.

  Want me to:

  1. Generate the full URL/page architecture for all 5 spokes (every page you need, naming, internal linking map)?
  2. Design the /api/lead routing logic (TypeScript code, CRM integration, Zapier flows)?
  3. Spec the parent homepage (the master hub copy + design — the trickiest page since it has to balance all 5)?
  4. Draft the 5 spoke homepages (one ICP + one CTA each, copy-complete)?

