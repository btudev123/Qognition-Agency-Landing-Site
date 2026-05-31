# Qognition Agency — Project Bible

> Hub + 4 Spokes architecture for qognition.com. Single domain, single capture layer, four integrated divisions. Positioned as the AI-native operating partner for founders and growth-stage companies. Optimized for SEO + LLM citation + high lead conversion.

---

## 1. Business model

Qognition is an **operating partner** for founders — not an advisor, not a vendor. We run four functions so founders can build:

| Spoke | What we sell | Primary buyer | Sales cycle | Pricing model |
|---|---|---|---|---|
| **Marketing** | SEO, AI search, paid media, content, brand, CRO | CMO / Founder | 2–6 weeks | Retainer $3–20K/mo |
| **Tech** | Websites, web apps, integrations, performance | CTO / Founder | 4–12 weeks | Project $10–200K |
| **Finance** | Bookkeeping, tax, fractional CFO, payroll | CFO / Founder | 2–4 weeks | Retainer $500–7.5K/mo |
| **Automation** | AI agents, workflows, CRM automation, data pipelines | COO / Ops lead | 3–8 weeks | Project + retainer |

**Each spoke targets a different buyer.** Cross-sell happens in the relationship, not on the homepage. Each spoke operates as a specialized division, unified visually under Qognition.

**Why integrated matters:** Founders waste 40% of their time on non-core functions. Qognition consolidates four vendor relationships into one operating partnership. One SLA. One relationship. One standard of execution.

---

## 2. Competitive landscape

### 2.1 Direct competitors (integrated model — highest threat)

| Competitor | Divisions | Overlap | Qognition advantage |
|---|---|---|---|
| **OuterSpace** | Digital, Finance, Tech | Near-identical model | We're AI-native; they're traditional. We lead "operating partner"; they lead "services." |
| **Nibnox** | Branding, Dev, AI Automation | 3 of 4 spokes (no finance) | Finance spoke is our wedge against them. Integrated model more complete. |
| **Agility Associates** | Accounting, Design, Automation, CRM | 3 of 4 spokes (weak on marketing) | Marketing spoke is deeper. We're brand-led; they're IT-led. |
| **Centerline Business Services** | Accounting, Marketing, Strategy | Consulting-heavy, light on execution | We execute, not just advise. Tech + Automation spokes are real delivery arms. |
| **RecruitHub** | Accounting, Branding, Tech | Niche-locked (recruitment only) | Industry-agnostic. Broader TAM. Not niche-dependent. |

**Key takeaway:** OuterSpace is the competitor to beat. They've validated the model. Our moat: (1) AI-native positioning, (2) "operating partner" brand vs. "vendor" brand, (3) deeper per-spoke expertise, (4) speed — first to own this position in search.

### 2.2 Indirect competitors (pure-play marketing — fragmented, less threatening)

These firms compete with our Marketing spoke only. They lack Tech, Finance, and Automation — which makes them potential acquisition/partnership targets, not existential threats.

| Competitor | Specialty | Relevance |
|---|---|---|
| **WebFX** | Full-funnel digital for SMBs/mid-market | Closest pure-play analog to our Marketing spoke. Use as credibility shorthand: "Like WebFX, but integrated across marketing, tech, finance, and AI." |
| **Disruptive Advertising** | Paid search, paid social, SEO, CRO | Performance marketing specialist. Competes on Marketing spoke only. |
| **OuterBox** | Search, paid media, performance web (mid-market/enterprise) | Upmarket from us. Overlaps on Marketing + partial Tech. |
| **Digital Neighbor** | Technical SEO, content, paid, CRO | Revenue-attribution positioning is sharp. Competes on Marketing spoke. |
| **SmartSites** | Broad digital, innovation positioning | Broad but shallow. Competes on Marketing spoke. |
| **ForeFront Web** | Google Premier Partner, strategy-first web + digital | Competes on Marketing + partial Tech. |
| **Intero Digital** | Comprehensive digital marketing | Generalist. Competes on Marketing spoke. |

### 2.3 Competitive positioning map

```
                        EXECUTION-HEAVY
                              │
                    Qognition ●
                              │
              OuterSpace ●    │
                              │
    Agility Associates ●      │
                              │
    ─────────────────────────────────────
    TRADITIONAL ──────────────┼────────── AI-NATIVE
                              │
                              │
         Centerline ●         │    ● Nibnox
                              │
                              │  ● WebFX, SmartSites,
                              │    Digital Neighbor, etc.
                              │
                        ADVISORY
```

Qognition occupies the top-right quadrant: AI-native + execution-heavy. No competitor currently holds this position. OuterSpace is closest (top-left). Nibnox is closest on the AI axis but advisory-light on execution. **Speed matters — this window is closing.**

---

## 3. Brand architecture: Hub + 4 Spokes

```
qognition.com (parent hub — "The Operating Partner for Founders")
├── /marketing/*   → Spoke 1 — AI-native growth marketing
├── /tech/*        → Spoke 2 — software, sites, integrations
├── /finance/*     → Spoke 3 — bookkeeping, tax, fractional CFO
├── /automation/*  → Spoke 4 — AI agents, workflows, data pipelines
```

**Why subdirectories, not subdomains:**
- All link equity compounds on one domain
- Single Next.js codebase, single deploy, single CRM
- Spoke-specific theming via URL-aware CSS custom properties
- Each spoke reads as a dedicated division — "Qognition Finance" not "qognition.com/finance" in perception

**Each spoke functions as a specialized mini-agency** with its own homepage, sub-service pages, audit funnel, pricing page, case studies, and booking flow. The parent unifies through global nav, footer, design system, and team page.

---

## 4. Full URL / page architecture

### 4.1 Parent hub (shared across all spokes)

```
/                                  Hub homepage — integrated model pitch + 4 spoke entry cards
/about                             Company story + operating partner philosophy
/team                              Full team, organized by spoke division
/process                           Engagement model — how we operate as partners
/case-studies                      All wins, filterable by spoke + industry
/case-studies/[slug]               Individual case study
/pricing                           Master pricing overview (4 columns)
/book                              Master booking — "Not sure which spoke?" routing
/contact                           General contact
/resources                         Cross-spoke resource hub
/resources/[slug]                  Guides, templates, calculators, reports
/blog                              Editorial + thought leadership
/blog/[category]                   Category pages
/blog/[slug]                       Posts
/comparisons                       Agency comparison pages (high-intent SEO)
/comparisons/[slug]                e.g., /comparisons/qognition-vs-outerspace
/sitemap                           HTML sitemap
/legal/privacy
/legal/terms
/legal/cookies
```

### 4.2 Marketing spoke (`/marketing/*`)

```
/marketing                         Spoke homepage — AI-native growth marketing
/marketing/seo                     Traditional SEO + technical SEO retainers
/marketing/ai-seo                  AI search / AEO / LLM visibility / programmatic SEO
/marketing/paid-media              Google Ads + Meta + LinkedIn (consolidated from "ppc")
/marketing/content                 Content marketing + production + strategy
/marketing/email-lifecycle         Email marketing + lifecycle automation
/marketing/brand-strategy          Brand strategy, positioning, messaging (absorbed from Brand spoke)
/marketing/visual-identity         Logo, design system, brand guidelines
/marketing/cro                     Conversion rate optimization + landing page optimization
/marketing/social                  Social media management + strategy
/marketing/audit                   Free Marketing + AI Search Audit (lead magnet)
/marketing/pricing                 Marketing tiers (Growth / Scale / Enterprise)
/marketing/case-studies            Filtered case studies
/marketing/process                 90-day marketing engagement model
/marketing/faq                     Marketing-specific FAQ
/marketing/resources               ROI calculators, SEO ROI estimator, ad spend calculator
/marketing/book                    Book a marketing strategy call
```

**Note:** Brand spoke is absorbed into Marketing. Brand strategy, visual identity, naming, and messaging are sub-services under Marketing — where the brand buyer (CMO/Founder) already lives. This reduces spoke count, simplifies navigation, and keeps the brand buyer's journey in one funnel.

### 4.3 Tech spoke (`/tech/*`)

```
/tech                              Spoke homepage — software + sites + integrations
/tech/websites                     Marketing websites + landing pages
/tech/web-apps                     Custom SaaS + web applications
/tech/ecommerce                    Shopify, headless commerce
/tech/nextjs-seo                   Next.js sites optimized for SEO + performance
/tech/integrations                 API + third-party integrations
/tech/performance                  Core Web Vitals + speed optimization + audits
/tech/mvp                          MVP development for early-stage founders
/tech/audit                        Free Tech + Performance Audit
/tech/pricing                      Tech packages (Sprint / Project / Retainer)
/tech/case-studies                 Filtered case studies
/tech/process                      Discovery → Architecture → Build → Ship → Iterate
/tech/faq
/tech/resources                    Tech checklists, stack comparison guides,估算工具
/tech/book                         Book a tech scoping call
```

**Renamed from "Build" to "Tech."** "Build" is ambiguous — is it construction? "Tech" is broader, more searchable, and encompasses strategy + architecture + development + performance. The MVP sub-service opens a funnel for early-stage founders who will grow into multi-spoke clients.

### 4.4 Finance spoke (`/finance/*`)

```
/finance                            Spoke homepage — financial operations for founders
/finance/bookkeeping                Monthly bookkeeping + reconciliation
/finance/tax                        Tax preparation + planning + strategy
/finance/fractional-cfo             Strategic finance leadership
/finance/payroll                    Payroll management + compliance
/finance/financial-reporting        Monthly close + board-ready reporting
/finance/cash-flow                  Cash flow modeling + forecasting
/finance/audit                      Free Finance Health Check
/finance/pricing                    Finance tiers (Bookkeeping / CFO / Combined)
/finance/case-studies               Filtered case studies
/finance/process                    Onboarding → Cleanup → Monthly close → Strategic cadence
/finance/faq
/finance/resources                  Tax calendars, expense policy templates, cash flow calculators
/finance/book                        Book a finance discovery call
```

**Renamed from "Books" to "Finance."** Broader, more aspirational, higher perceived value. "Books" implies bookkeeping only. "Finance" signals strategic value — fractional CFO, cash flow strategy, financial modeling. This also aligns with how OuterSpace brands its finance division.

### 4.5 Automation spoke (`/automation/*`)

```
/automation                         Spoke homepage — AI agents + intelligent automation
/automation/ai-agents               Custom LLM-powered agents for business operations
/automation/workflow-automation     n8n, Make, Zapier — end-to-end process automation
/automation/integrations            CRM + tool stack integrations
/automation/data-pipelines          ETL, data sync, dashboards, reporting automation
/automation/crm-automation          HubSpot, Attio, Pipedrive — pipeline + workflow automation
/automation/no-code-stack           No-code + low-code architecture for founders
/automation/audit                   Free Automation Opportunity Map
/automation/pricing                 Automation packages (Sprint / Build / Retainer)
/automation/case-studies            Filtered case studies
/automation/process                 Audit → Map → Build → Monitor → Optimize
/automation/faq
/automation/resources               Automation ROI calculator, stack templates, AI agent library
/automation/book                    Book an automation strategy call
```

**Renamed from "Flow" to "Automation."** Higher search volume, clearer value proposition. "Flow" is clever. "Automation" is searched. AI agents as a first-class sub-service signals our AI-native positioning.

### 4.6 API routes

```
/api/lead                          POST — single capture endpoint, all forms
/api/audit-request                 POST — audit-specific intake with spoke routing
/api/newsletter                    POST — newsletter signup
/api/contact                       POST — general contact
/api/og/[spoke]                    GET — dynamic OG images per spoke
```

### 4.7 Pages to DELETE / noindex / consolidate

These pages are dragging down site quality (HCU-vulnerable, thin content):

```
/directory                         DELETE — irrelevant pSEO noise
/comparisons                       KEEP BUT REWRITE — competitor comparisons are high-intent, high-converting pages when done with real depth
/glossary                          CONSOLIDATE — merge top 20 definitions into /resources as a glossary section
/free-tools                        AUDIT — keep only tools that actually work and generate leads; delete the rest
/languages                         DELETE — premature i18n
/global                            DELETE
/regions/*                         DELETE unless actively servicing with case studies
/sitemaps/*                        CONSOLIDATE — keep one XML sitemap
/llm                               DELETE if thin; merge useful content into /resources/llm-visibility
/services                          DELETE — 301 redirect to / (hub)
/industries                        CONSOLIDATE into case studies filter + /resources/industry-guides
/locations                         DELETE unless a physical office exists
```

**Rule:** If a page doesn't generate leads, build authority, or rank for a buyer-intent query — delete it. Less is more. Every page must earn its place.

---

## 5. Positioning & messaging strategy

### 5.1 Master positioning

**"The Operating Partner for Founders"**

Not an agency. Not a consultancy. Not an outsourced vendor. An operating partner — we run the functions so founders can build the business.

**One-liner (homepage H1 candidate):**
"We run marketing, tech, finance, and automation so founders can build."

### 5.2 Competitive positioning by audience

| Audience | Their alternative | Our wedge |
|---|---|---|
| Founder comparing us to OuterSpace | "They do the same thing" | "We're AI-native. They bolt AI onto traditional services. We build with AI from the ground up — which means faster delivery, lower cost, better results." |
| Founder comparing us to WebFX | "WebFX is bigger" | "WebFX does marketing. We do marketing, tech, finance, and AI. One partner instead of four vendors. And we're founder-led, not PE-owned." |
| Founder with no agency yet | "Why do I need an agency?" | "You don't need an agency. You need someone to run the functions you don't have time to run. That's what an operating partner does." |
| Founder with separate vendors | "I already have a bookkeeper, an agency, a dev shop" | "How much time do you spend coordinating them? We consolidate four relationships into one. One SLA. One standard. One invoice." |

### 5.3 Spoke-specific positioning

| Spoke | H1 format | Differentiator |
|---|---|---|
| Marketing | "AI-native growth marketing for founders who need revenue, not reports" | AI-first. Results within 90 days or we work free. |
| Tech | "We build software that drives revenue — not just code that compiles" | Revenue-focused engineering. No vanity metrics. Ship speed + quality. |
| Finance | "Financial operations that give founders back their Saturdays" | Tech-enabled finance. Real-time dashboards. Strategic, not just compliant. |
| Automation | "AI agents and automation that run your ops while you sleep" | AI-native automation. Custom agents, not just Zapier zaps. |

### 5.4 Authority content strategy

To win LLM citations and search authority, publish original data:

- **"State of AI Marketing" annual report** (Q4 each year) — original survey data, cited by industry media
- **"Founder Finance Benchmarks"** — anonymized financial benchmarks by industry/stage
- **"Automation ROI Report"** — real ROI data from client engagements (anonymized)
- **Quarterly SaaS performance benchmarks** — CWV, conversion rates, SEO trends

These become the moat. Competitors can copy design. They can't copy original data.

---

## 6. Per-spoke conversion playbook

### 6.1 Spoke homepage section sequence (REQUIRED for every spoke)

```
1. Hero
   - H1: outcome-led, ICP-specific, ONE sentence
   - Subhead: one sentence on why Qognition specifically
   - Primary CTA: "Get your free [Spoke] Audit"
   - Secondary CTA: "Book a 20-min strategy call"
   - Above-fold proof: 5-7 logos OR "Trusted by X founders"
   - Hero asset: real product screenshot OR founder Loom OR demo, NOT stock art

2. Pain block (3 specific pains)
   - "You're probably struggling with X, Y, or Z"
   - Each pain uses the ICP's actual language (from sales calls, not copywriting)
   - Format: pain statement → why it happens → what it costs them

3. Solution snapshot
   - 3-step process visual (60-second skim)
   - "Here's how we fix it" — concrete, not abstract

4. Outcomes (proof)
   - 3 case studies with HARD NUMBERS
   - Format: "[Company] — We took [Metric] from X to Y in Z weeks"
   - Each links to full case study
   - Include one "failure" or "what we learned" for credibility

5. What's included (service grid)
   - 4-8 sub-services as cards
   - Each card: icon + service name + one-line outcome + link to sub-service page

6. How we work (process timeline)
   - Week-by-week or phase-based
   - Specific deliverables per phase
   - "Week 1: discovery. Week 2: audit + recommendations. Week 3-12: execution."

7. Pricing transparency
   - Show ranges or tiers (don't hide)
   - "Starts at $X/mo" or "$X–Y projects"
   - Include what drives price variation (complexity, scope, speed)

8. Team (real faces)
   - 3-5 team members with credentials
   - "Worked at [Notable Co]" or "10 years in [domain]"
   - Link to full /team page

9. Risk reversal / guarantee
   - Spoke-specific guarantee
   - "If we don't [specific outcome], we [specific remedy]"
   - OR "Free audit first, no commitment — we earn the relationship"

10. FAQ (top 6 objections)
    - Use FAQPage schema
    - Each answer 60-120 words
    - Address real objections from sales calls, not generic FAQ

11. Final CTA block
    - Repeat primary CTA
    - Inline Calendly OR 4-field audit form
    - Never bury booking behind another click
```

### 6.2 Conversion rules — non-negotiable

| Rule | Why |
|---|---|
| ONE H1 per page | SEO + cognitive clarity |
| ONE primary CTA above fold | Decision fatigue kills conversion |
| Inline Calendly on final CTA | Each extra click drops ~30% of prospects |
| Real team photos — zero stock photography | #1 trust killer in 2026 |
| Specific numbers, never "many" or "hundreds" | "47 SaaS founders" converts better than "many clients" |
| Sticky CTA on scroll (mobile + desktop) | Always present on long-form pages |
| Founder Loom on every spoke homepage | 2-3 min personal video. Typically doubles time-on-page and trust signals. |
| Exit-intent popup with spoke-specific lead magnet | Recovers ~5-10% of abandoning visitors |
| Cookie-based personalization | Returning visitor sees their last-viewed spoke highlighted |
| Mobile-first audit forms (4 fields max) | Mobile = 60%+ of traffic |
| Schema markup per page type | Organization, Service, FAQPage, BreadcrumbList, Article, Review |
| Loading speed: LCP < 2.5s on 4G | Direct ranking + conversion impact |
| No carousels or auto-rotating sliders | They kill conversion. Static grids or manual accordions only. |

### 6.3 Sub-service page template

Every `/spoke/sub-service` page follows:

```
1. Hero — specific outcome H1 + primary CTA
2. The problem with how it's usually done (differentiator setup)
3. Our approach (3-4 paragraphs + visual diagram)
4. Deliverables — exact list of what they receive
5. Timeline — weeks/phases with specific milestones
6. 2-3 mini case studies with hard numbers
7. FAQ (4-5 questions, FAQPage schema)
8. Final CTA — inline form or Calendly
```

### 6.4 Audit page template (highest-converting pages)

These are the lead magnets. They must be treated with extreme care. Each generates qualified leads by delivering real value before any money changes hands.

```
1. Hero
   - H1: "Free [Spoke] Audit — [Specific outcome] in [timeframe]"
   - Sub: "We'll review your [X], [Y], [Z] and send a [deliverable] within 48 hours"
   - Primary CTA: form inline or directly below fold
   - NO navigation links in hero (focus on conversion)

2. What you'll get (the deliverables)
   - 8-12 item checklist with checkmark icons
   - 1-2 screenshot examples (blurred real client data with permission)
   - Specific format: "12-page deck" or "15-min Loom video walkthrough" — no vague promises

3. Sample audit (proof of quality)
   - Screenshot or embedded Loom of a real audit deliverable
   - "Here's what you'll receive →"
   - Shows the depth — this is the moat

4. Who this is for (qualification)
   - 3-4 bullets: "You're a founder/operator doing [$X–Y revenue] who [specific pain]"
   - Filters out tire-kickers without being exclusionary
   - "This is NOT for you if [polite disqualifier]"

5. Process (transparency = trust)
   - "1. Fill the form (2 min). 2. We review within 24 hours. 3. You receive the audit within 48 hours. 4. Optional: 30-min walkthrough call to discuss findings."

6. FAQ
   - "Is this really free?" — Yes. No credit card. No commitment. We earn the relationship.
   - "What's the catch?" — There isn't one. We're betting that the quality of this audit proves our value better than any sales pitch.
   - "How long does it take to get my audit?" — 48 hours or less.
   - "Will you sell my data or spam me?" — Never. One follow-up email to schedule the walkthrough. That's it.

7. Form (NEVER more than 4 fields)
   - Name | Email | Company URL | One qualifying question (e.g., "What's your biggest [spoke] challenge?")
   - Honeypot field for spam prevention
   - GDPR consent checkbox if EU traffic expected
   - Submit button: outcome-focused microcopy ("Get My Free Audit" not "Submit")
```

### 6.5 Lead magnets per spoke

| Spoke | Lead magnet | Deliverable format | Time to deliver |
|---|---|---|---|
| Marketing | Free Marketing + AI Search Audit | 12-page deck + 15-min Loom | 48 hours |
| Tech | Free Tech + Performance Audit | Lighthouse report + site audit deck + 10-min Loom | 48 hours |
| Finance | Free Finance Health Check | 1-page benchmark report + 15-min Loom walkthrough | 48 hours |
| Automation | Free Automation Opportunity Map | Process diagram + ROI estimate + 10-min Loom | 72 hours |

**These are not gated PDFs.** They are real, manually-produced work samples delivered within 48-72 hours. Each audit is a mini-engagement that proves our value before any contract. This is the competitive moat — no competitor does this at scale.

---

## 7. Lead capture architecture

### 7.1 Single endpoint, four funnels

Every form on the site POSTs to `/api/lead` with a `service` field:

```ts
POST /api/lead
{
  service: "marketing" | "tech" | "finance" | "automation" | "unsure",
  intent: "audit" | "consultation" | "pricing" | "contact",
  source_page: string,         // e.g. "/marketing/audit"
  utm: { source, medium, campaign, term, content },
  contact: {
    name: string,
    email: string,
    company?: string,
    company_url?: string,
    phone?: string,
    message?: string
  },
  metadata: {
    spoke_visited_first?: string,    // cookie-based
    pages_viewed?: number,
    time_on_site?: number,
    referrer?: string
  }
}
```

### 7.2 What `/api/lead` does

1. Validate + sanitize input (Zod schema)
2. Honeypot check + rate-limit check (Upstash or Vercel KV)
3. Create contact in CRM (HubSpot / Attio)
4. Tag with `service` → routes to correct pipeline
5. Slack alert to spoke owner with full context + source page
6. Trigger spoke-specific email nurture sequence
7. If `intent: audit` → send confirmation email + Calendly link for walkthrough
8. Log to analytics (GA4 event + Vercel Analytics)
9. Return 200 with redirect target or thank-you page URL

### 7.3 CRM pipeline structure

```
CRM
├── Pipeline: Marketing Leads     → owner: marketing closer
├── Pipeline: Tech Leads          → owner: tech closer
├── Pipeline: Finance Leads       → owner: finance partner
├── Pipeline: Automation Leads    → owner: automation lead
└── Pipeline: Unsure / Multi      → owner: chief of staff

Stages (consistent across all pipelines):
1. New lead
2. Audit delivered / discovery scheduled
3. Discovery call complete
4. Proposal sent
5. Negotiation
6. Closed-won / Closed-lost
```

### 7.4 Cross-sell mechanism (relationship-layer, not homepage)

Cross-sell does NOT belong on the homepage or spoke homepages. It happens in the relationship:

1. **Discovery call script**: every closer asks "How are you handling [other 3 functions] today?" — flag interest in CRM
2. **Onboarding intake form**: standard question — "Which other functions need attention?"
3. **Quarterly business review** (existing clients): structured review across all four functions. "Here's marketing progress. Want us to assess your finance/tech/automation?"
4. **Internal Slack `#cross-sell-signals`**: auto-flagged when client mentions another spoke's pain point
5. **Annual operating partner review**: once per year, full audit across all four functions for existing clients

---

## 8. Tech stack

This repo: **Next.js 16 + React 19 + TypeScript + Tailwind CSS** (App Router).

### 8.1 Key dependencies

- `next` ^16.2.5
- `react` ^19.2.6
- `framer-motion` — animations (sparingly; conversion > flair)
- `lucide-react` — icons
- `tailwindcss` ^3.4.18
- Future: `@vercel/analytics`, `@vercel/speed-insights`, `zod` (validation), schema generators

### 8.2 Deployment

- Hosted on **Vercel** (already configured — see `/.vercel`)
- Preview deployments for every spoke PR
- Production: `qognition.com` (parent), no subdomains

### 8.3 Cache + ISR strategy

- Static pages: ISR with `revalidate: 3600` (case studies, blog, resources)
- Spoke homepages: ISR with `revalidate: 600`
- Audit + book pages: dynamic (always fresh — forms must not cache)
- Use Next.js 16 Cache Components where appropriate (`use cache` directive)

### 8.4 Code organization

```
app/
├── (hub)/              # parent routes — homepage, about, team, process
├── marketing/          # marketing spoke (absorbed brand)
├── tech/               # tech spoke (was build)
├── finance/            # finance spoke (was books)
├── automation/         # automation spoke (was flow)
├── api/
│   ├── lead/route.ts
│   ├── audit-request/route.ts
│   └── newsletter/route.ts
├── layout.tsx          # root layout with shared shell
└── globals.css

components/
├── shared/             # nav, footer, CTAs, LeadForm (spoke-aware via props)
├── hub/                # parent-specific components
├── spokes/
│   ├── marketing/
│   ├── tech/
│   ├── finance/
│   └── automation/
└── ui/                 # primitive UI kit (Button, Input, Card, Badge)

lib/
├── crm.ts              # CRM client (HubSpot/Attio)
├── analytics.ts        # GA4 + Vercel Analytics events
├── schema.ts           # JSON-LD generators per page type
├── spokes.ts           # spoke config (colors, names, copy, owners)
└── validation.ts       # Zod schemas for forms

data/
├── case-studies.ts     # case study data (tagged by spoke + industry)
├── team.ts             # team members (tagged by spoke division)
├── pricing.ts          # pricing tiers per spoke
├── faqs/               # per-spoke FAQ data
└── competitors.ts      # competitor data for comparison pages
```

### 8.5 Spoke-aware theming

Each spoke gets an accent color injected via CSS custom properties, derived from the URL segment:

```ts
// lib/spokes.ts
const SPOKE_CONFIG = {
  marketing:  { accent: "#7C3AED", accentLight: "#A78BFA", label: "Marketing" },
  tech:       { accent: "#2563EB", accentLight: "#60A5FA", label: "Tech" },
  finance:    { accent: "#059669", accentLight: "#34D399", label: "Finance" },
  automation: { accent: "#F59E0B", accentLight: "#FBBF24", label: "Automation" },
};
```

CSS consumes these as `var(--accent)` and `var(--accent-light)`. Base components stay shared; only accent-driven elements change per spoke. Spoke layouts apply the vars via a `<SpokeLayout spoke="marketing">` wrapper.

---

## 9. SEO + LLM citation strategy

### 9.1 Per-spoke SEO architecture

Each spoke is treated as its own topical authority hub:

- **Spoke hub** (`/marketing`) targets head term: "AI growth marketing agency" or similar
- **Sub-service pages** target mid-tail: "programmatic SEO services for SaaS," "fractional CFO for startups"
- **Audit pages** target transactional: "free SEO audit," "free tech performance audit"
- **Blog/resources** target long-tail informational + top-of-funnel
- **Comparison pages** target competitor-name + "alternative" / "vs" queries (high intent)
- Internal linking: every sub-service links back to its spoke hub + 2-3 sibling sub-services

### 9.2 Schema markup (every page)

```ts
// Required JSON-LD per page type:
- Hub homepage:       Organization + WebSite + BreadcrumbList
- Spoke hub:          Service + BreadcrumbList + FAQPage
- Sub-service:        Service + BreadcrumbList + FAQPage
- Case study:         Article + BreadcrumbList + Review
- Audit / book:       WebPage + BreadcrumbList + Service
- Team:               Organization + Person[]
- Blog post:          Article + BreadcrumbList + Person (author)
- Comparison:         Article + BreadcrumbList + Organization
```

### 9.3 LLM citation optimization

For ChatGPT, Perplexity, Claude, and Google AI Overviews visibility:

- **Be the answer**: definitive FAQ-style content per service question — structure answers as featured snippets
- **Original data + research**: publish quarterly data reports ("State of AI SEO 2026," "Founder Finance Benchmarks")
- **Get cited externally**: Reddit, Hacker News, niche founder communities (heavily weighted in LLM retrieval)
- **Clean HTML semantics**: `<article>`, `<section>`, `<h2>` hierarchy, no JS-only rendered text
- **`/llms.txt` and `/llms-full.txt`** at root: machine-readable content index for LLM crawlers
- **`robots.txt`**: explicitly allow GPTBot, Claude-Web, PerplexityBot, GoogleOther, AppleBot

### 9.4 E-E-A-T signals

- Real author bios on every blog post (photo + credentials + social links + "About the author" box)
- Date last updated visible on all content pages
- Outbound links to authoritative, primary sources
- Internal expert quotes attributed to specific team members ("Sarah, our Head of Finance, says...")
- Case studies with verifiable client names (with permission) or anonymized with industry + size

### 9.5 Comparison page SEO (high-intent competitor capture)

Comparison pages (`/comparisons/qognition-vs-outerspace`, etc.) capture prospects actively researching alternatives. Rules:

- Be fair. Acknowledge competitor strengths. Then show where Qognition is different.
- Use a consistent comparison format: overview → services → pricing → ideal client → key differences → summary table
- Include Schema.org `Article` + `Organization` markup
- Link to the relevant spoke hub(s) as next step
- Never disparage. Facts only. "OuterSpace is strong in X. Qognition is built differently for Y."

---

## 10. Brand system

### 10.1 Master brand

- **Name**: Qognition
- **Tagline**: "The Operating Partner for Founders"
- **Secondary tagline**: "Marketing · Tech · Finance · Automation"
- **Logo lockups**: `Qognition` / `Qognition Marketing` / `Qognition Tech` / `Qognition Finance` / `Qognition Automation`

### 10.2 Per-spoke identity

| Spoke | Accent | Light variant | Icon vocabulary | Energy |
|---|---|---|---|---|
| Marketing | `#7C3AED` Electric Purple | `#A78BFA` | Charts, growth arrows, bullseyes | Ambitious, data-driven |
| Tech | `#2563EB` Cobalt Blue | `#60A5FA` | Code brackets, blueprints, gears | Precise, reliable |
| Finance | `#059669` Emerald Green | `#34D399` | Calculator, ledger, shield | Stable, trustworthy |
| Automation | `#F59E0B` Amber Orange | `#FBBF24` | Nodes, lightning, connections | Dynamic, intelligent |

### 10.3 Shared design system

- **Typography**: Geist (Sans) for UI + body. One display weight + one body weight.
- **Spacing scale**: Tailwind defaults (4px base)
- **Border radius**: 8px default, 12px for cards, 9999px for pills/badges
- **Shadows**: Soft, modern (avoid heavy drop shadows). Use `shadow-sm` and `shadow-md` sparingly.
- **Animation**: framer-motion, max 200ms transitions, respect `prefers-reduced-motion`
- **Dark mode**: Not required for v1. Light theme only. Add dark mode in v2 if demand exists.

---

## 11. Build phasing (120-day launch plan)

Do not launch all 4 spokes at once. Each spoke needs a dedicated closer, at least 2 case studies, and the full conversion stack before going live.

### Phase 1 — Foundation + Cleanup (Weeks 1-3)
- [ ] Delete/noindex thin pages (directory, locations, regions, languages, global, glossary, llm)
- [ ] 301 redirect old URLs to new structure
- [ ] Set up new URL structure shells for 4 spokes
- [ ] Build `/api/lead` endpoint with CRM + Slack integration
- [ ] New hub homepage with 4 spoke entry cards
- [ ] Marketing spoke gets full content (first to launch); other 3 spokes show "Coming Q4 2026" placeholders
- [ ] Migrate top 10 case studies into new structure
- [ ] Set up CRM with 4 pipelines
- [ ] Build shared component library (LeadForm, SpokeHero, ServiceGrid, PricingTable, AuditForm)

### Phase 2 — Marketing spoke launch (Weeks 4-7)
- [ ] Marketing spoke: all sub-service pages + audit page + pricing + case studies + FAQ
- [ ] Marketing audit funnel live: form → CRM → Slack → email nurture → Calendly
- [ ] Founder Loom video on marketing homepage
- [ ] 3 comparison pages: Qognition vs. WebFX, vs. OuterSpace, vs. Digital Neighbor
- [ ] Run outbound (50 ICP/week) using "Free Marketing Audit" as wedge
- [ ] Goal: 5 booked discovery calls/week by end of phase

### Phase 3 — Tech spoke (Weeks 8-11)
- [ ] Tech spoke: all sub-service pages + audit + pricing + case studies
- [ ] Update hub homepage: Marketing + Tech live, Finance + Automation "Coming soon"
- [ ] 2 comparison pages: Qognition vs. traditional dev shops, vs. OuterSpace Tech
- [ ] Cross-sell to existing Marketing clients
- [ ] Goal: 3 tech discovery calls/week by end of phase

### Phase 4 — Automation spoke (Weeks 12-15)
- [ ] Automation spoke: all sub-service pages + audit + pricing + case studies
- [ ] Update hub homepage: 3 spokes live, Finance "Coming soon"
- [ ] AI agents sub-service page as flagship offering
- [ ] Cross-sell automation to existing Marketing + Tech clients
- [ ] Goal: 2 automation discovery calls/week by end of phase

### Phase 5 — Finance spoke (Weeks 16-20)
- [ ] Finance spoke: all sub-service pages + audit + pricing + case studies
- [ ] Update hub homepage: all 4 spokes live
- [ ] This spoke needs a dedicated finance person — hire before launching
- [ ] Cross-sell finance to existing clients across all 3 spokes
- [ ] Goal: 2 finance discovery calls/week by end of phase

**Rule:** never launch a spoke without (a) a dedicated closer/owner, (b) at least 2 real case studies with numbers, (c) the full 11-section conversion stack from §6.1, (d) a working audit funnel.

---

## 12. Standards & conventions

### 12.1 Component naming

- Spoke-specific: `<MarketingHero />`, `<TechPricing />` — when component logic is genuinely spoke-specific
- Shared parameterized: `<SpokeHero spoke="marketing" />` — preferred pattern (uses spoke config)
- Audit components: `<AuditForm spoke="marketing" />` — always parameterized
- Always TypeScript. Never `any`. Export types alongside components.

### 12.2 File naming

- `kebab-case` for routes and file paths: `/marketing/ai-seo/page.tsx`
- `PascalCase` for components: `SpokeHero.tsx`
- `camelCase` for utilities and data: `getSpokeConfig.ts`, `caseStudies.ts`

### 12.3 Form handling

- All forms use the same `<LeadForm>` component, parameterized by `spoke` + `intent`
- Zod validation on both client (form state) and server (API route)
- Honeypot field always included (hidden field that bots fill in)
- Rate limit at `/api/lead` (Vercel KV or Upstash Redis)
- Success state: inline thank-you message + Calendly embed (no page redirect)
- Error state: inline error, never an alert()

### 12.4 Analytics events (GA4 + Vercel Analytics)

```
- spoke_view                  { spoke }
- lead_form_start             { spoke, intent }
- lead_submit_attempt         { spoke, intent, source_page }
- lead_submit_success         { spoke, intent }
- audit_request               { spoke }
- calendly_open               { spoke }
- calendly_book               { spoke }
- cross_sell_click            { from_spoke, to_spoke }
- comparison_page_view        { competitor }
- resource_download           { spoke, resource_name }
- calculator_interaction      { spoke, calculator_type }
```

### 12.5 Accessibility

- All forms: keyboard-navigable, labeled inputs, focus-visible indicators
- Color contrast: WCAG AA minimum on all text. AAA on body text.
- Spoke accent colors validated for contrast on white (#fff) and light gray (#f9fafb) backgrounds
- `prefers-reduced-motion` respected everywhere (disable framer-motion animations)
- Skip-to-content link as first focusable element on every page
- All images: meaningful `alt` text. Decorative images: `alt=""`

### 12.6 Performance budgets

- LCP < 2.5s on 4G mobile
- CLS < 0.05
- INP < 200ms
- Page weight < 500KB on first load (homepage + spoke hubs)
- Images: Next.js `<Image>`, AVIF format, lazy loading below fold
- Fonts: `next/font` with subsetting, max 2 weights per font family
- JavaScript: minimize client-side JS. Prefer Server Components. Client Components only when interactivity required.

---

## 13. Anti-patterns (what NOT to do)

- ❌ Adding more than 4 spokes. Four is the ceiling. Any new capability becomes a sub-service under an existing spoke.
- ❌ Generic stock photos of "people in offices." Real team photos or none.
- ❌ Multi-step forms before email capture. Email first, qualify later.
- ❌ Hidden pricing. Show ranges or tiers. Hiding pricing kills conversion for high-intent buyers.
- ❌ "Contact us" as the only CTA. Every CTA must use a specific outcome: "Get your free audit," "Book a strategy call."
- ❌ Building all 4 spokes before any spoke produces leads. Sequential launch only.
- ❌ Subdomains (`marketing.qognition.com`). Kills SEO authority. One domain, subdirectories.
- ❌ Auto-translating before English converts. Premature i18n is a distraction.
- ❌ Carousels, sliders, auto-rotating hero sections. They destroy conversion rates.
- ❌ Pop-ups on first scroll or immediate entry. Exit-intent only. Respect the visitor.
- ❌ "Trusted by 1000+ companies" without logos or specifics. Show logos or remove the claim.
- ❌ Jargon without translation. "We optimize your martech stack for ROAS" → "We make your marketing dollars work harder."
- ❌ Linking to old `/services/*`, `/directory/*`, `/glossary/*` URLs. 301 redirect or delete.
- ❌ Launching a spoke without a dedicated closer. A spoke without an owner is a leaky bucket.

---

## 14. Quick reference

### 14.1 Critical files

- `app/page.tsx` — Hub homepage (the integrated model pitch)
- `app/marketing/page.tsx` — Marketing spoke homepage
- `app/tech/page.tsx` — Tech spoke homepage
- `app/finance/page.tsx` — Finance spoke homepage
- `app/automation/page.tsx` — Automation spoke homepage
- `app/api/lead/route.ts` — Single lead capture endpoint
- `lib/spokes.ts` — Spoke configuration (colors, copy, owners, pricing)
- `lib/crm.ts` — CRM integration
- `components/shared/LeadForm.tsx` — Universal form component
- `components/shared/SpokeLayout.tsx` — Spoke-aware layout wrapper (sets CSS vars)

### 14.2 External services to provision

- **CRM**: HubSpot (Free CRM tier to start) or Attio — 4 pipelines, 5 stages each
- **Booking**: Cal.com — 4 owners, 1 routing form for "unsure" leads
- **Email nurture**: Loops.so or Customer.io — 4 sequences (one per spoke) + 1 cross-spoke nurture
- **Slack**: webhooks to `#leads-marketing`, `#leads-tech`, `#leads-finance`, `#leads-automation`, `#cross-sell-signals`
- **Analytics**: GA4 + Vercel Analytics + Vercel Speed Insights
- **Rate limiting**: Vercel KV or Upstash Redis
- **Form spam prevention**: Honeypot fields (no CAPTCHA — conversion killer)

### 14.3 Pre-launch checklist (per spoke)

- [ ] Spoke homepage with all 11 sections from §6.1
- [ ] All sub-service pages (5-8 per spoke) following template from §6.3
- [ ] Audit page following template from §6.4
- [ ] Pricing page with transparent tiers + ranges
- [ ] At least 2 case studies with hard numbers
- [ ] FAQ with 6+ questions + FAQPage schema
- [ ] 4-field audit form working end-to-end (form → API → CRM → Slack → email)
- [ ] CRM pipeline created + closer assigned
- [ ] Slack channel created + webhook tested
- [ ] Email nurture sequence drafted (4-7 emails, value-first, no hard sell in email 1)
- [ ] Cal.com link for spoke owner
- [ ] Founder/owner Loom welcome video (2-3 min)
- [ ] Schema.org JSON-LD validated (Google Rich Results Test)
- [ ] Mobile + desktop QA (Chrome, Safari, Firefox)
- [ ] LCP < 2.5s verified (PageSpeed Insights + Vercel Speed Insights)
- [ ] Comparison pages for top 2-3 competitors in that spoke

---

## 15. North star

Every decision on this site optimizes for one metric: **booked discovery calls per spoke per week.**

Not traffic. Not impressions. Not "engagement." Not newsletter signups. Calls booked with qualified ICPs who have budget, authority, and need.

Secondary metrics (supporting, not primary):
- Audit request-to-discovery-call conversion rate (target: >40%)
- Discovery call-to-proposal rate (target: >60%)
- Cross-spoke revenue per client (target: 2+ spokes within 12 months)
- Time-to-first-value per spoke (target: audit delivered within 48 hours)

If a page, feature, design choice, or marketing campaign doesn't move qualified discovery calls — kill it or redesign it until it does.
