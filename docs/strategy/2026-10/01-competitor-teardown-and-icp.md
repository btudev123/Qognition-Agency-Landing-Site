# 01 · Competitor teardown and ICP in buyer language

**Plan step 2.1 · Iris (research) · 2026-10-06 · INTERNAL. Not client-facing. Not reviewed by Ruth.**

**The decision this informs:** this file is for MARS (2.4 offer architecture), Marcus (2.3 objection table and CRO), Rafael (2.5 account lists) and Nadia (2.2 cohort order). It answers three questions:

- What should Qognition's funnel copy from seven named agencies, and what should it beat?
- Is the §1 wedge still true as written?
- Which eight cohorts should go into the next publication waves?

**Confidence labels, used on every finding:**

| Label | Meaning |
|---|---|
| **[O] observed** | I read it on the cited page on 2026-10-06 |
| **[R] reported** | Someone else says it, usually a search-result summary or a third-party page I did not open. Do not cite it publicly without opening the primary |
| **[I] inferred** | My reasoning. A hypothesis, not a fact |

**Method and its limits. Read this before relying on any quote.**

- Pages were read with a fetch tool that returns a model-summarised rendering of the server HTML, not the raw page. Every quote below is short and was asked for verbatim, but **re-check any quote against the live page before it goes in a deck, an ad or a page.** Raw snapshots were not persisted.
- **Anything injected by JavaScript is invisible to that tool.** That covers chat widgets, scheduler embeds (Chili Piper, Calendly, HubSpot meetings), sticky-header behaviour and WhatsApp buttons. "Not observed" in the CTA columns means *not in the fetched HTML*, not *absent*. `[NEEDS DATA: a 10-minute browser pass on the seven homepages and contact pages, desktop and 375px, logging chat, scheduler, sticky header and WhatsApp.]`
- No traffic, ad-spend, ranking or conversion estimates appear for any competitor. No reliable public source exists, so none are given.
- **Blocklisted figures.** The ABM Agency's homepage H1 carries an ROI multiple of the same unsourced kind CLAUDE.md §1 blocklists. It is described here and not reproduced. Several other competitor performance figures are also left out where the proof *style* makes the point without the number.

---

## 0. Headline findings

1. **[O] The wedge holds, but in a narrower form than CLAUDE.md §1 states it. A rival is closing in.**
   - None of the seven agencies publishes a named client with a dated, reproducible AI-search measurement. §A.4 scores each one.
   - The closest case found today is outside the seven. NUOPTIMA, an MSP-focused GEO agency, published a single-snapshot test of a named, disclosed client on MSP Today on 2026-08-25. It stated the platforms (ChatGPT, Gemini, Claude, Perplexity, web search on) and the query count (40).
   - It falls short of reproducible: only 4 of its 10 prompts are published, with no run date, no model versions, no per-prompt results and no raw answers.
   - So the wedge survives only if it names those elements. See the proposed §1 wording in §D.
2. **[O] Qognition has not yet published a dated, reproducible measurement either.** All 45 case studies are `projected` (CLAUDE.md §2).
   - **[I]** Today the wedge is a method claim, not a demonstrated one, and the first agency to publish a full run owns it.
   - **[I]** The quickest route needs no client: publish dated Family B observations per cohort, giving run date, models, the full prompt set and stored answers. Scriblr already stores all of these, per CLAUDE.md §1.
3. **[O] Four of the seven publish a price signal. Three publish none.**

   | Agency | Price signal |
   |---|---|
   | WebFX | Full AI SEO tier table, scoped by prompts × engines × assets |
   | Omniscient | A $10,000/month floor |
   | Powered by Search | A "$25K+/month" investment floor |
   | iPullRank | Investment ranges by stage |
   | Directive, The ABM Agency, First Page Sage | None on the pages I opened |

   The 2026-10-03 authority note bans public prices, ranges and tiers for Qognition. That decision stands. The competitor pattern means Qognition has to qualify through the form and the call rather than through a price. Marcus owns that.
4. **[O] Generic B2B SaaS is the most crowded position on the board.** Omniscient, Powered by Search, Directive and First Page Sage all lead with SaaS, and Powered by Search shows named cybersecurity SaaS clients. This matches pass 2's "do not publish a generic B2B SaaS page".
5. **[I] Three of the seven sit inside Qognition's own white-label client segment.**
   - Directive and Powered by Search are demand-gen agencies (02.13.01). The ABM Agency is an ABM agency (02.13.02).
   - Under the 2026-09-29 operator decision they are prospects as well as competitors.
   - Decision for the operator: does this teardown stay strictly internal, and are these three excluded from any comparison copy? See §A.7.

---

## Part A · Competitor teardown

### A.1 Side-by-side profiles

All rows were accessed 2026-10-06. Every cell is [O] unless it is labelled otherwise.

| Competitor | Who they sell to | Core claim | Pricing model and published prices | Proof they show | Gaps | Sources |
|---|---|---|---|---|---|---|
| **Omniscient Digital** | "marketing leaders at ambitious B2B brands"; B2B software. Its `/ai-info/` page lists B2B SaaS, technology, VC-backed, mid-market and enterprise | H1: "SEO, GEO, and content should drive business growth, not just traffic." GEO page: "become the trusted source LLMs cite" | No pricing page. Homepage and GEO page both say: "Full-service engagements start at $10,000 a month." | 15 case studies, 14 named, mostly SaaS. Headline percentages and pipeline dollars with no measurement window on the index. The Convert case names its tracker (Peec AI), gives a 60-day window, before/after levels and 4 sample prompts | No industry pages observed. No AI models named and no dates in the Convert case. No measurement method on the GEO page | [home](https://beomniscient.com/), [contact](https://beomniscient.com/contact/), [GEO](https://beomniscient.com/services/generative-engine-optimization/), [case index](https://beomniscient.com/case-studies/), [Convert](https://beomniscient.com/case-studies/convert-case-study/), [ai-info](https://beomniscient.com/ai-info/) |
| **Directive** | B2B in technology, industrial and services. 10 industry pages plus `/verticals/industrial/` | H1: "Rethink the Potential of Your B2B Agency". Sub-line: from "MQLs to qualified pipeline" | None published | Large logo wall (Amazon, Uber Freight, Cisco, SentinelOne, Gong, others) and an aggregate revenue-generated claim with no method. Named case studies; 3 of 6 on the index mention AI search. The Case Status case names Scrunch and the platforms (ChatGPT, Perplexity, Google AI Mode) and mentions a nine-month engagement | Homepage has no GEO positioning apart from a proprietary "Stratos" platform. Case Status gives no prompt count and no measurement dates. The manufacturing page has no GEO content | [home](https://directiveconsulting.com/), [industries](https://directiveconsulting.com/industries/), [manufacturing](https://directiveconsulting.com/industries/manufacturing-and-industrial/), [success stories](https://directiveconsulting.com/success-stories/), [Case Status](https://directiveconsulting.com/case-studies/how-case-status-turned-ai-search-into-a-20-lift-in-bookings/), [book](https://directiveconsulting.com/book-intro-call/), [RFP](https://directiveconsulting.com/request-for-proposal/) |
| **WebFX** | "marketing teams who need to prove revenue impact". Broad, including local and home services | Sub-line: "Your Revenue Growth Partner in the AI Era" | **Most transparent of the seven.** AI SEO plans run Bronze $3,000 to Enterprise+ $68,250 a month, then Global Enterprise+ at custom. All are 6-month commitments, scoped by "prompts × 10 LLMs" and assets per month. SEO "Starting at $3,000/month". The proposal form's budget dropdown starts at "$1,500-5,000/month" | Named case studies with AI metrics, measured in WebFX's own OmniSEO platform. Aggregate revenue claim and a "#1 Rated Agency on Clutch & G2" superlative, both with no method. The 10X Engineered Materials case says "10+ generative engines" | No prompts, no dates and no model list in the case opened. The manufacturing hub carries no GEO content | [home](https://www.webfx.com/), [AI SEO pricing](https://www.webfx.com/seo/pricing/ai-seo/), [SEO pricing](https://www.webfx.com/pricing/), [proposal](https://www.webfx.com/free-quote/), [industries](https://www.webfx.com/industries/), [manufacturing](https://www.webfx.com/industries/manufacturing/), [cases](https://www.webfx.com/portfolio/case-studies/), [10X case](https://www.webfx.com/portfolio/case-studies/10x-materials-omniseo/), [enterprise GEO](https://www.webfx.com/seo/services/enterprise-ai-search-optimization) |
| **Powered by Search** | "B2B marketing teams investing $25K+/month". Weighted to SaaS and cybersecurity. Not a fit: "pre-revenue, B2C, or still getting buy-in for your marketing budget" | H1: "The B2B Marketing Agency". Sub-line: "Get 30% more sales ready opportunities in 90 days. Guaranteed." No terms found on the page. GEO page: "Ranking #1 doesn't matter if AI doesn't mention you" | No pricing page. The $25K+/month floor is on `/assessment/`. **[I]** It is unclear whether that means fee or total media plus SEO spend | Named cybersecurity clients (Cyera, Fortra, ThreatX, SentinelOne, Varonis), some PDFs with 12-month windows. **None of the case studies on the index concern AI search.** The GEO page shows AI-citation percentages with no client attached | A guarantee with no visible terms on the homepage, while the GEO page says "No credible agency can guarantee deterministic inclusion in AI-generated answers". **[I]** The two cover different outcomes, but the unconditioned guarantee is the weaker line. No industry pages beyond developers and startups | [home](https://www.poweredbysearch.com/), [assessment](https://www.poweredbysearch.com/assessment/), [GEO](https://www.poweredbysearch.com/services/generative-engine-optimization/), [results](https://www.poweredbysearch.com/clients-results/), [developers](https://www.poweredbysearch.com/marketing-to-developers/) |
| **The ABM Agency** | Enterprise. Industries: industrial manufacturing, technology, SaaS, cybersecurity, medical and pharma, financial services | H1 combines "ABM, Agentic AI tools and AEO Expertise" with an ROI multiple. The figure is blocklisted-shape and not reproduced here. GEO page: "AI is rewriting search — GEO helps you stay visible." | None published | Large logo wall (Siemens, Palo Alto Networks, Okta, IBM, DuPont, others). 11 case studies, mostly anonymised by descriptor. The cybersecurity case names Palo Alto Networks and is dated 2022–2024, but it is **ABM only, with no GEO**. The GEO page cites industry zero-click statistics and names no client | No AI-search case study observed. The industrial ABM page carries survey percentages with no source. Pass 3 found its self-ranked aerospace list | [home](https://abmagency.com/), [contact](https://abmagency.com/contact-us/), [GEO](https://abmagency.com/b2b-geo-services/), [cyber case](https://abmagency.com/enterprise-cyber-security-company-case-study/), [industrial](https://abmagency.com/account-based-marketing-for-industrial-and-manufacturing-companies/) |
| **First Page Sage** | Implied B2B. A SaaS lead-gen page is written to SaaS buyers ("design engineers", "free trial requests") | H1: "Get Qualified Leads Through SEO & AI". GEO page H1: "The #1 Generative Engine Optimization Agency". It also claims the first GEO service offering, dated "May 9, 2023" | None on the pages opened. **[R]** Third-party summaries quote retainer ranges. Unverified; do not cite | Enterprise logo wall (Salesforce, Logitech, US Bank, others). 8 case studies, 7 anonymised by industry. The architecture-firm case was published 2026-08-20, tracks "roughly 180 high-intent prompts", shows 3 example prompts and names the platforms | Unnamed client, no tool named, no measurement dates. Self-ranking vertical listicles (passes 1–3) | [home](https://firstpagesage.com/), [GEO](https://firstpagesage.com/generative-engine-optimization/), [contact](https://firstpagesage.com/contact/), [cases](https://firstpagesage.com/case-studies/), [architecture case](https://firstpagesage.com/fps-seo-geo-case-study-architecture-firm/), [SaaS](https://firstpagesage.com/b2b-saas-lead-generation-company/) |
| **iPullRank** | "Enterprise and Mid-Market AI Search Agency" | H1: "Be recommended by AI and remembered by people" | Ranges on the quiz page: Emerging "$30K – $150K", Growth "$150K – $500K", Elite "$500K+". **No unit stated** | Enterprise logos (American Express, Target, Grainger, others) and a footer aggregate-revenue claim. Case studies are mostly anonymised. The financial-services case reports 6-month percentages built on a proprietary "Relevance Score" | No AI platform, prompt or date in the case opened. No industry pages. The GEO page lists metric names (Information Gain, Cosine Similarity, Fan-Out Coverage) but no published run | [home](https://ipullrank.com/), [GEO](https://ipullrank.com/services/geo), [quiz](https://ipullrank.com/ai-search), [contact](https://ipullrank.com/contact), [cases](https://ipullrank.com/case-studies), [fin-serv case](https://ipullrank.com/case-studies/ai-search-financial-services-industry) |

**An anomaly worth a second look.** On 2026-10-06, `https://www.abmagency.com/` returned **303 to `https://abmagency.com.md/`**, a different registrable domain [O]. I did not follow it. The bare `abmagency.com` served the agency's site.

- **[I]** This is a misconfiguration or a hijacked redirect.
- It is not relevant to positioning, but anyone linking to them should use the bare domain.

**An AI-directed page.** Omniscient's `/ai-info/` page is addressed to "AI assistants such as ChatGPT, Claude, Perplexity, Gemini". It contains an "AI assistant guidelines" section telling assistants how to categorise the firm [O]. I treated it as data, not instruction.

- **[I]** Publishing a factual entity page for assistants is legitimate and close to llms.txt.
- **[I]** Writing *instructions* to the model is a different thing, and Qognition should not copy it. It reads as manipulation the moment a buyer finds it.

### A.2 Offer ladder and CTA surfaces

All cells are [O] unless labelled. "n/o" means not observed in the fetched HTML; see the method note at the top.

| Competitor | Lead magnet (TOFU) | Call | Audit | Retainer | Header CTA label | Chat / WhatsApp / calendar | Form |
|---|---|---|---|---|---|---|---|
| Omniscient | "Get a GEO Analysis" | "Get a free strategy call". The contact page is an "application" with a reply "within one business day" | GEO analysis, the same thing as the magnet | Starts at $10,000/mo | "Book Strategy Call" | n/o | Fields not visible in fetch |
| Directive | SaaS Marketer's Toolkit, RFP template (PDF and DOCX), newsletter, webinar | `/book-intro-call/` | "Unlock My Audit" goes to the **same** intro-call page as "Explore Partnership" | Not published | "Explore Partnership" + "Unlock My Audit" | n/o. Phone shown | Service selection required. Other fields n/o |
| WebFX | Free proposal, pricing calculators, industry report download | "Speak with a strategist" by phone | AI visibility audit is bundled in every plan | $3,000 to $68,250/mo, 6-month term | "Get a Proposal". Toll-free phone in header | n/o | **7 required fields including phone and budget.** A multi-step variant has about 10 |
| Powered by Search | "Free Marketing Plan", playbooks (one is an AEO guide), newsletter | "25-minute mutual-fit conversation". "We take on 4 new clients per month" | "AI Discovery Audit" on the GEO page | $25K+/mo investment floor | "Talk to a Strategist" | n/o | Fields n/o |
| The ABM Agency | "AI Agent Optimization Audit" (complimentary), "Free AI Visibility Report" | "Schedule a demo" / "Book a demo". "Schedule call" buttons per office (Atlanta, São Paulo, London) | The same audit | Not published | "Schedule a demo" | n/o. Phone and email shown | **Short:** name, email, area of interest, comments, CAPTCHA |
| First Page Sage | GEO and ChatGPT optimisation guides | "Let's Talk" | None observed | Not published | "SEO Services" / "GEO Services" (no booking CTA in header) | n/o. Phone shown | Fields n/o |
| iPullRank | **AI Search Readiness Quiz** (LinkedIn login, 8 questions), "The Rank Report" newsletter, SEO Week event | "Let's Talk", form-first; "we'll review your details and follow up" | Strategy program | Stage ranges $30K to $500K+ | "START HERE" (goes to the quiz) | n/o | Includes a stage selector (Emerging / Growth / Elite) |

**[I] What the ladder pattern says.**

- Every one of the seven runs a free diagnostic leading to a call. That makes Qognition's "free snapshot → walkthrough" table stakes, not a differentiator.
- What differs is what the free thing *contains*. None of the seven, on the pages read, promises a dated output with the prompt set and models stated. That is the wedge expressed as a lead magnet.
- **[O]** Two of the seven use the calendar or the call itself as the CTA (Directive, The ABM Agency). Two make the form the gate and reply later (Omniscient, iPullRank). Qognition's "Book a call" primary with "Send an enquiry" secondary covers both.

### A.3 Vertical and programmatic footprint

All [O] unless labelled.

| Competitor | Footprint observed |
|---|---|
| WebFX | About 21 industry categories. Manufacturing alone links 12 sub-industry pages. An **industry × service** URL pattern exists (`/industries/home-services/agency/ai-seo/`). **[I]** This is the industry × service programmatic pattern CLAUDE.md §7 forbids Qognition from copying |
| Directive | 10 industry pages and an industrial vertical page. The manufacturing page uses real buyer vocabulary (RFQ forms, spec sheets, SCADA/DCS, controls engineers) but has no GEO content |
| The ABM Agency | 5 industry ABM pages, plus self-ranked AEO/GEO listicles by vertical (pass 3) |
| First Page Sage | Industry lead-gen pages (SaaS observed) plus a self-ranking listicle programme across legal, aerospace and industrial (passes 1–3) |
| Powered by Search | Developers and startups only. No industry pages |
| Omniscient, iPullRank | No industry pages observed |

**[I] Implication.** No one in the seven goes below sub-industry level with GEO-specific, buyer-specific content. Qognition's four-level taxonomy is deeper than anything here. The risk is thinness, not occupancy, and the §7 bar already guards against it.

### A.4 Reproducibility scorecard (the wedge, per competitor)

This scores one AI-search proof item per competitor: the case study or page most favourable to them that I opened. ✓ means the element is present on that page, ~ partial, ✗ absent. All [O].

| Element → | Named client | Run dates (start/end) | AI platforms named | Model versions | Prompt count | Full prompt set | Tool named | Raw answers / re-derivable |
|---|---|---|---|---|---|---|---|---|
| Omniscient, Convert case | ✓ | ~ (60 days, "2025", no dates) | ✗ | ✗ | ✗ | ~ (4 samples) | ✓ Peec AI | ✗ |
| Directive, Case Status | ✓ | ~ (nine months, "early 2025") | ✓ | ✗ | ✗ | ✗ | ✓ Scrunch | ✗ |
| WebFX, 10X Engineered Materials | ✓ | ✗ (client since 2023) | ~ ("10+ generative engines") | ✗ | ✗ | ✗ | ✓ OmniSEO (own) | ✗ |
| Powered by Search, GEO page | ✗ (no client on the AI figures) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| The ABM Agency | No AI-search case observed. The named Palo Alto Networks case is ABM only | | | | | | | |
| First Page Sage, architecture case | ✗ | ✗ (published 2026-08-20, "two years") | ✓ | ✗ | ✓ (~180) | ~ (3 samples) | ✗ | ✗ |
| iPullRank, financial services | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ~ (proprietary "Relevance Score") | ✗ |
| *Outside the seven:* NUOPTIMA on MSP Today, 2026-08-25 | ✓ (disclosed as a client) | ✗ (publication date only, single snapshot) | ✓ (4, web search on) | ✗ | ✓ (10 prompts × 4 = 40) | ~ (4 of 10) | ✗ | ✗ |

**[O] No row has run dates, model versions, the full prompt set or raw answers.** Those four columns are the defensible wedge.

**[I]** Scriblr's design (persisted raw answers, cited URLs and model versions, per CLAUDE.md §1) fills exactly those four columns. Qognition should state the wedge in those terms, because a sceptic can check it column by column.

**[R] The adjacent field is moving.** NUOPTIMA also publishes dated city "MSP AI visibility rankings" (Dallas, Houston, Chicago, Austin, Las Vegas). The Dallas page tested ChatGPT and Gemini on 4 queries, dated "August 2026", with prompts not published [O on the Dallas page only]. **[I]** Managed IT (09.01) now has a specialist doing near-wedge publication. See Part C.

### A.5 Copy, beat, and where each is weak against the wedge

| Competitor | Copy (structure, never claims) | Beat | Weak against the wedge | Strong against Qognition (honest) |
|---|---|---|---|---|
| Omniscient | Name the tracker and give before/after **levels**, not only % change, plus sample prompts in the case study | Publish the full prompt set, run dates, model versions and stored answers. Omniscient stops at four sample prompts | No run dates or models; its strongest AI case is 60 days with no calendar dates [O] | 14 named SaaS clients with pipeline-dollar outcomes. Qognition's B2B record is NDA [O CLAUDE.md §2] |
| Directive | Buyer-vocabulary industry pages (RFQ, spec sheets, controls engineers). An **RFP template** as a MOFU magnet for buyers running agency selection | Go below industry level. Directive stops at 10 hubs with no GEO content on the one opened | AI cases name the tracker but no prompt count or dates [O] | Logo wall and scale. Six named offices [O]. Qognition must never imply offices (CLAUDE.md §4) |
| WebFX | **Scope dimensions** on /pricing (prompts tracked, engines, assets per month) with **no prices** shown. The 10-03 authority note bans tiers and prices but not describing what scope is measured in | Dated, re-derivable measurement. OmniSEO is a closed dashboard; no case opened shows a prompt or a date | Own-tool metric with no published run [O] | Owned tracker sold standalone, published price ladder, about 21 industry hubs, toll-free phone [O]. **[R]** Large review volume |
| Powered by Search | An explicit **not-a-fit line** and a short, named call length ("25-minute mutual-fit"). Their GEO-page no-guarantee sentence is the right register | Never print a guarantee. Theirs carries no visible terms [O] | AI-citation percentages with no client attached; no AI-search case study on the index [O] | Named cybersecurity SaaS logos, which matters directly for cohort 4 in Part C [O] |
| The ABM Agency | Very short form (4 fields) [O] | Unsourced figures. Its H1 multiple is the blocklisted shape | No AI-search case observed; GEO page names no client [O] | Enterprise logos. Dated, named ABM case (2022–2024) [O] |
| First Page Sage | Prompt **count** plus example prompts in a case study | Name the client or explain why not (Qognition's NDA sentence). Name the tool | Anonymous client, no tool, no dates; self-ranking listicles [O] | Volume of vertical content and lists. "First GEO service" priority claim [O, unverified] |
| iPullRank | A readiness **self-assessment** as TOFU. **[I]** Drop the LinkedIn login, because it is a gate that costs completions | Publish an actual run. iPullRank names metrics (cosine similarity, fan-out coverage) but publishes no run in the case opened | No platform, prompt or date [O] | Thought leadership, an event, enterprise logos [O] |

**Do not copy:**

- Guarantees.
- Office-specific scheduling (no offices).
- Aggregate "revenue generated for clients" figures.
- Self-ranking listicles.
- Instruction-to-AI pages.
- Industry × service programmatic URLs.
- Any competitor figure, in any form, that would imply Qognition measured it.

### A.6 GEO and AI-search claims, side by side

All [O].

| Competitor | How they describe GEO |
|---|---|
| Omniscient | "become the trusted source LLMs cite" |
| Directive | Homepage silent. Case studies use "LLM referrals", "AI search visibility" |
| WebFX | "Search and AI", OmniSEO "10 AI answer engines" |
| Powered by Search | "Organic Visibility systems … across Google Search, AI answers, and the wider web" |
| The ABM Agency | "get your brand cited in Gemini, ChatGPT, and Perplexity" |
| First Page Sage | "makes your products or services more likely to be recommended by AI platforms like ChatGPT" |
| iPullRank | "Relevance Engineering", "AI Search Readiness" |

**[I]** Nobody separates AI SEO (Google AI Overviews and AI Mode) from GEO (assistants) the way CLAUDE.md §1's four-layer table does. That distinction is a small, real clarity advantage, worth keeping consistent on every page.

### A.7 Decision for the operator: competitors who are also prospects

Under the 2026-09-29 decision, B2B marketing, demand-gen and ABM agencies are a white-label client segment.

- **[I]** Directive (02.13.01), Powered by Search (02.13.01) and The ABM Agency (02.13.02) are in that segment.
- **[I]** Omniscient, First Page Sage, iPullRank and WebFX arguably sit in 02.13.03 (B2B SEO and content agencies).

**Recommendation [I]:**

- This file stays internal.
- No public comparison page names any of the seven.
- Rafael excludes the three demand-gen and ABM agencies from competitive displacement messaging until the operator decides whether they are white-label targets.

---

## Part B · ICP in buyer language

### B.1 What "buyer language" means here, and what is missing

No real buyer speech appears in this section, because none is available to me.

- There are no discovery-call notes, won/lost notes or enquiry free-text in the repo.
- Vendor blogs asserting what buyers do are not buyer speech, and I have not used them as such.
- `[NEEDS DATA: verbatim buyer language. The GHL enquiry "message" field export, the walkthrough-call notes, and any won/lost notes from the 45 named programmes and 4 white-label engagements.]`

What is used instead, labelled per row:

- **Our buyer titles, their buyer and Family B prompts** are quoted from `data/b2b/icp/icp-taxonomy.json` v2.0.0 (operator-locked 2026-09-29). That is **operator-authored taxonomy text, not observed buyer speech.**
- **Family Q prompts** are **[I] my hypotheses** of what our buyer types into an assistant about their own visibility. They are written in the voice of the taxonomy's buyer titles. Validate them against the first 20 walkthrough calls before Theo writes against them.

The buyer split, restated:

- **Our buyer** is owner, CEO, or marketing or growth leader.
- **Our client's buyer** is procurement, engineers, IT leaders, finance leaders.
- Family Q targets the first. Family B is what we observe for the second (CLAUDE.md §2).

### B.2 The operator's priority list mapped to the taxonomy

Priority and fit come from the JSON. "A niches" lists only the priority-A niche IDs under each sub-industry.

| Operator item | Taxonomy IDs (sub-industry → A niches) | Fit / priority | Our buyer (taxonomy) | Their buyer (taxonomy geo_angle) | Family Q [I] | Family B (taxonomy) |
|---|---|---|---|---|---|---|
| **Cybersecurity SaaS** | `01.05` → 01.05.01, .02, .03, .04, .05, .06, .08, .09, .10 (9 of 10 are A; .07 email security is B) | Both or AI SEO / A | CMO, VP Marketing, Head of Demand Generation, Director of Product Marketing | "CISOs and IT leads" asking which tools satisfy SOC 2, ISO 27001, NIS2 or cyber-insurance requirements | "Why does ChatGPT list [competitor] for SOC 2 automation and never us?" · "What does Perplexity cite when someone asks for the best CNAPP for a 500-seat company?" | "best compliance automation tool to get SOC 2 in 90 days" · "[vendor] vs [vendor] EDR for a 500-seat company" |
| **GRC** | `01.05.04` GRC (Both/A). Adjacent: `04.13` Compliance/RegTech → 04.13.01, .03, .05. Services: `09.04` → 09.04.01, .03, .06 | Both / A | as 01.05; 04.13 adds Head of Sales | 04.13: "compliance officers" | "Are we named when buyers ask an assistant how to get NIS2 or DORA ready?" | 04.13: "best KYB vendor for a B2B payments fintech" · 09.04: "best CMMC Level 2 consultant for a small defense subcontractor" |
| **Fintech infra** | `04.12` → 04.12.01, .02, .03, .04, .05, .07, .08 · `04.11` Payments → 04.11.02, .03, .04, .05, .07 · `01.03.02` Payments APIs (Both/A) · `01.06` Finance, spend and procurement SaaS (all 9 A) | Mostly AI SEO / A in 04.12; Both / A in 04.11 | CMO, VP Marketing, Head of Demand Generation, VP Product Marketing (04.12); Head of Partnerships (04.11) | "AI comparisons of core, lending, insurance and data platforms by institution type" (04.12) | "Why doesn't ChatGPT name us when a $2B bank asks for a core banking platform?" | "best core banking platform for a $2B community bank" · "payfac vs ISO partnership for a vertical SaaS company" |
| **HR and payroll** | `01.12` → 01.12.01, .02, .03, .04, .05, .08 | Both / A (except .08, AI SEO / A) | VP Marketing, Head of Demand Generation, CMO, Director of Growth | "HR and finance leaders" | "Which payroll vendors does ChatGPT recommend for a 150-person company, and why not us?" | "best payroll software for a 150-employee company in 3 US states" · "best ATS for high-volume hourly hiring across 40 locations" |
| **RevOps** | `01.08` → 01.08.01, .02, .03, .04. **Flag:** `01.08.08` "RevOps & CRM data tools" is **priority B** | Both / A; .08 is AI SEO / B | VP Marketing, Head of Demand Generation, CMO, Director of Product Marketing | "revenue leaders" building a sales stack | "When a CRO asks an assistant to build a sales stack, are we on the list?" | "best sales engagement platform for a 20-rep SDR team" |
| **Devtools** | `01.03` → 01.03.01, .02, .03, .06, .10 | AI SEO or Both / A | VP Marketing, **Head of Developer Relations**, Head of Growth, Director of Product Marketing | developers in "AI coding assistants, docs-led answers" | "Do coding assistants recommend our SDK when a developer asks for SSO?" | "best authentication API for a B2B SaaS app that needs SSO" |
| **Supply-chain SaaS** | Lives in industry 06, not 01: `06.13` → 06.13.01, .02, .04, .07, .08 · `06.14` → 06.14.01, .03 · `06.11.04` GTM software (AI SEO/A) | Both or AI SEO / A | CMO, VP Marketing, Head of Demand Generation, VP Product Marketing | shippers, 3PL operators, manufacturers | "Why is [competitor] the WMS ChatGPT names for 3PLs?" | "best WMS for a 3PL that needs multi-client billing" · "[vendor] vs [vendor] TMS for a mid-size manufacturer" |
| **Legal tech** | `01.15` → 01.15.01, .02, .04, .05, .08 | Both or AI SEO / A | VP Marketing, CMO, Head of Demand Generation, Director of Growth | "general counsel, legal ops and law-firm partners" | "Which CLMs does an assistant name for a mid-market legal team, and what does it say about us?" | "best CLM for a mid-market legal team that lives in the CRM" |
| **Construction tech** | Industry 07: `07.09` → 07.09.01, .02, .03 | Both / A | VP Marketing, Head of Demand Generation, CMO, Director of Growth | contractors by trade and size | "Are we in the answer when an electrical contractor asks for estimating software?" | "best estimating software for commercial electrical contractors" |
| **PropTech** | Industry 07: `07.10` → 07.10.01, .02, .04 | Both or AI SEO / A | VP Marketing, CMO, Head of Demand Generation, VP Sales | "owners and operators" | "Why does ChatGPT recommend [competitor] for commercial property management?" | "best property management software for a commercial office portfolio" |
| **Health admin** | **No sub-industry by this name.** Nearest: `03.08.02` RCM software (Both/A), `03.08.05` patient access (Both/A), `03.09.04` payer core admin and claims (AI SEO/A), `03.09.06` prior authorization (AI SEO/**B**), services `03.10.01` RCM outsourcing (Both/A). **Operator to pick** | mixed | CMO, VP Marketing, Head of Demand Generation (03.08); CMO, VP Growth Marketing, CRO (03.09) | "CIOs and practice leaders" (03.08); "payer, health-system and employer leaders" (03.09) | "Are we named when a hospital CFO asks for denial-management vendors?" | "patient intake software that integrates with our EHR" · "payment integrity vendors for a regional health plan" |
| **AI infra** | `01.04` → 01.04.02, .03, .04, .05, .06, .07, .08 (.01 MLOps is B) | AI SEO / A (agents and coding assistants are Both) | Head of Marketing, VP Growth, Head of Developer Relations, Founder/CEO | engineers asking "how to build, evaluate and ship with LLMs" | "Which eval platforms does Claude recommend, and why are we missing?" | "best LLM evaluation platform for a customer support agent" · "managed vs open-source vector database for RAG at 50M embeddings" |
| **Manufacturers and industrial suppliers** | Industry `05`, 21 sub-industries, 55 A niches. Strongest A depth: `05.06` (5), `05.20` (5), `05.21` (5), `05.12` (4), `05.18` (4), `05.02` / `05.03` / `05.05` / `05.07` / `05.08` / `05.09` / `05.14` / `05.15` (3 each). **Zero A niches:** `05.04` OEM components, `05.13` motors and drives, `05.19` textiles | Industry mix: Both/A 32, AI SEO/A 23, Both/B 52 | e.g. 05.03: President/Owner, VP Sales, Director of Business Development, Marketing Manager | "engineers and sourcing teams" | "Why doesn't ChatGPT list us when an engineer asks for an ISO 13485 contract manufacturer in Mexico?" | 05.02: "contract manufacturer in Mexico for box build and final assembly" · 05.03: "best robotic palletizing integrator for a food plant" |
| **CPA, tax, transaction advisory** | `02.05` → all 5 A (02.05.01 to .05) · `02.06` → 02.06.01, .03, .04, .05, .06 (.02 bookkeeping is PPC/C). **Overlap:** outsourced CFO canonical is `02.06.01`; `04.16.01` is the duplicate | Both / A (02.05); AI SEO / A for QoE, restructuring and LMM M&A | Managing Partner, CMO, Director of Marketing, Chief Growth Officer (02.05); Founder/CEO, Managing Director, Partner BD (02.06) | "founders and PE firms" (02.06) | "Why does an assistant name only the Big Four when a PE associate asks who does QoE?" | "best CPA firm for a $50M construction company" · "who does quality of earnings reports for lower middle market deals" |
| **Corporate law** | `02.01` → 02.01.01, .02, .03, .04 | Both or AI SEO / A | Managing Partner, CMO, Director of Business Development, Marketing Director | deal, fund and IP clients by practice and jurisdiction | "Which firms does ChatGPT name for mid-market M&A in our state, and why not us?" | "best mid-market M&A law firm for selling a $50M manufacturing company" |
| **Consulting and SI partners** | `02.07` → .01 to .04 · `02.08` → .01 to .04 · `09.06` → .01 to .03 · `09.07` → .01, .02, .03, .05, .06, .08 · `09.08` → .01, .02, .04, .05. **Overlap:** AI implementation canonical is `09.11.01`; `15.01.01` is the duplicate | Mostly AI SEO / A (02.07, 02.08); Both / A (09.06 to 09.08) | Managing Partner/CEO, VP Marketing, Partner Marketing Manager or Head of Alliances (09.07, 09.08) | "finance and ops leaders" picking an implementer (09.07) | "When a CFO asks which NetSuite partner should rescue their implementation, are we named?" | "our ERP implementation is failing, how do we find a partner to rescue it" · "best CRM implementation partner for a mid-size financial services firm" |
| **MSSP / MDR** | `09.02` → 09.02.01, .02, .03 · adjacent `09.03` (6 A) and `09.01` (.01, .02) | Both / A | CMO, VP Marketing, Head of Demand Generation, CRO | buyers comparing "24/7 coverage, response times and compliance fit" | "Why does ChatGPT recommend [competitor] as the MDR for manufacturers?" | "MSSP vs MDR provider for a 500-employee manufacturer with no in-house security team" |
| **Logistics, 3PL, cold chain, customs** | `06.01` → .01, .02, .03, .05 · `06.08` → .01, .03, .06, .07, .08, .09 · `06.11` → .01, .02, .04 · `06.02` → .01, .03, .04 | Both or AI SEO / A | Chief Commercial Officer, VP Sales & Marketing or VP BD, Director of Marketing; Head of Life Sciences Sales (06.08) | shippers by "order volume, channel mix, product type" (06.01); "food and pharma shippers" (06.08) | "Are we named when a pharma shipper asks for a GDP-compliant 3PL in Europe?" | "best refrigerated 3PL for a frozen food brand selling into grocery chains" · "cryogenic logistics providers for cell and gene therapy shipments in Europe" · "best customs broker for importing machinery into the UK" |

### B.3 Where the operator's list falls outside, or rubs against, the taxonomy

1. **China and India city targeting is not in the CLAUDE.md market list.**
   - CLAUDE.md §2 lists 14 markets with no China or India, and is USD only.
   - `docs/icp-positioning.md` v2.1 (2026-10-03) says "Maintain the agreed Austria, China and India coverage".
   - **The two operator documents contradict each other.** The taxonomy carries no geography at all.
   - **Decision for the operator:** do China and India stay coverage-only (existing pages kept, not expanded), or become target markets for city pages? Either way, the authority note's rule applies: "naming a city alone is insufficient." I have not included either in Part C.
2. **"Health admin" has no single home.** It spans 03.08, 03.09 and 03.10. The operator needs to pick the buyer: provider admin, payer admin, or the RCM outsourcer.
3. **Supply-chain, construction and proptech SaaS sit outside industry 01.** They live in 06.13/06.14, 07.09 and 07.10. Page copy should be written to those industries' buyers, not to "SaaS". Rule 6 in `docs/icp-positioning.md` keeps IDs as-is.
4. **RevOps is named a priority by the operator, but `01.08.08` is priority B in the locked JSON.** The A niches in 01.08 are engagement, intelligence, conversation intelligence and CPQ. Decision: follow the JSON, or have the operator re-grade.
5. **"Fintech infra" splits four ways** (04.12, 04.11, 01.03.02, 01.06). Pick one for any cohort; they have different buyers.
6. **Eight niches have no sub-niches,** all in industry 06: `06.02.06`, `06.02.08`, `06.02.09`, `06.04.06`, `06.04.07`, `06.09.04`, `06.11.03` (duty drawback, B), `06.14.06` (load boards, B).
   - An enquiry from these can only be attributed at niche level.
   - **[I]** Kyle's Phase 3 ADR should state how these resolve. "Every sub-niche resolves to a journey" is vacuously true for them.
7. **Overlaps.** Use canonical IDs only: 02.06.01 (not 04.16.01) and 09.11.01 (not 15.01.01).

---

## Part C · Recommended first eight cohorts

### C.1 Criteria, and the data I do not have

**How each criterion is sourced:**

- **Demand.** I have no search-volume, GSC or AI-referral data. `[NEEDS DATA: Nadia 2.2, GSC impressions per URL group and query cluster, and keyword volumes for each cohort's PPC terms.]` As a proxy only, I use the JSON's `fit`. Per the JSON definitions, "Both" or "PPC" means "strong commercial search demand"; "AI SEO" means "thin search volume, high-value AI prompts". That is operator classification, not measurement.
- **Competition.** Taken from pages opened today [O], prior passes 1–3 [O at their dates], or search results not opened [R].
- **Budget fit.** The JSON's `min_firm_size` and `client_value`, which are operator-authored. Priority A means "client contracts ≥ $50k/yr … $5k–20k/mo realistic".
- **Proof Qognition can show.** CLAUDE.md §2 only:
  - white-label (NDA, reported) in managed IT and cloud, cybersecurity and B2B SaaS (partial)
  - 6 named commercial insurance programmes (diagnostic; KPIs are targets)
  - TIC wave 1 published

**Cohort unit.** One sub-industry plus selected A niches (ADR-0008 §6.2). Wave 1 shows a cohort need not carry every A niche.

### C.2 The eight, in recommended order

| # | Cohort | A niches / A sub-niches | Demand proxy | Competition | Budget fit | Proof available | Why here |
|---|---|---|---|---|---|---|---|
| 1 | **`04.05` Commercial insurance carriers & distribution** (lead with 04.05.01 brokers, 04.05.02 MGAs) | 2 / 8 | Both / A | **Uncontested** in passes 1–3, last checked 2026-09-29 [O then]. Re-run the search the day the wave ships | $10M+ revenue or $50M+ written premium | 6 named diagnostic programmes (targets, not results) | The only position that is both uncontested and backed by named work |
| 2 | **`19.11` Product testing & certification labs** (TIC, continuing wave 1) | 6 / 29 | Mixed. Pass 3 counts it as the densest certification vocabulary | **Vacant** in pass 3, 2026-09-29 [O then] | per taxonomy, industry 19 | Wave 1 pattern and sources already in `data/b2b/icp/authored/` | Same verified vacancy and an authoring pattern that already passed review. Cheapest wave per page |
| 3 | **`09.02` Managed security services** (MSSP, MDR, SOC-as-a-service) | 3 / 11 | Both / A | **[R]** Cybersecurity GEO listicles exist (Pepper, Gracker, GTM 80/20, not opened). NUOPTIMA sells GEO to MSPs. No MSSP-specific dated measurement seen | $5M+ revenue or 40+ staff; $50k–$500k per client per year | White-label cybersecurity delivery (reported, NDA) | Real delivery adjacency and a clear Family B prompt in the taxonomy. Smaller than 01.05 |
| 4 | **`01.05` Cybersecurity SaaS**, narrowed to 01.05.04 GRC plus 2 to 3 A niches with dated compliance clocks (NIS2, DORA, CMMC) | 9 / 40 (publish a subset) | Both / A | **Contested [O]:** Powered by Search shows named cyber SaaS clients; Omniscient runs cybersecurity programmes [R]. Pass 2 says publish narrow only | $5M+ ARR or Series A+; $15k–$500k ACV | White-label B2B SaaS (partial) and cybersecurity (reported) | The operator's top SaaS item. Defensible only with dated regulatory facts from pass 2. Never a generic SaaS page |
| 5 | **`02.06` Outsourced finance & transaction advisory** (QoE, valuation, LMM M&A, restructuring, outsourced CFO) | 5 / 22 | AI SEO / A for QoE, M&A and restructuring | **[R]** Professional-services GEO lists exist (RevenueZen; CountingWorks for accounting). No QoE or valuation specialist seen. `[NEEDS DATA: targeted search]` | $3M+ revenue or 20+ staff; $30k–$500k per engagement | None in this vertical | **[I]** Its buyers' advisers (M&A advisors) are Qognition's #2 acquisition channel (CLAUDE.md §3). One page can serve both prospect and partner |
| 6 | **`06.08` Cold chain & life-sciences logistics** (pharma 3PL and GDP, clinical trial, CGT, med device) | 6 / 23 | Mixed; Both / A for cold-chain providers and cold storage | **[R]** Logistics GEO specialists exist (Web Tonic, EurekaRank, Orvio, not opened), aimed at brokers and 3PLs. No GxP or CGT specialist seen | $15M+ revenue or multi-facility network; $100k–$5M+ per contract | None in this vertical | **[I]** Certification-dense (GDP, DEA, ISO 13485 named in the taxonomy), so it meets §7's "≥3 entity-specific facts" the way TIC did |
| 7 | **`05.03` Industrial automation & robotics** (integrators, controls/PLC, custom machine builders) | 3 / 16 | Both / A | **Occupied:** WebFX (12 manufacturing sub-pages) [O], Directive [O], ABM industrial [O], First Page Sage industrial list naming automation [O pass 3] | $8M+ revenue or 40+ engineers; $150k–$3M per project | None in this vertical | Operator priority, and the narrowest manufacturing cohort with Family B prompts ("robotic palletizing integrator for a food plant"). Compete on depth, not occupancy. **Alternate if Nadia's data disagrees: `09.07` ERP & finance system partners** (6 A, $100k–$1.5M per implementation; competition not checked) |
| 8 | **`02.13` B2B marketing & demand-gen agencies, white-label** (02.13.01, 02.13.02), agency-principal voice | 2 / 7 | Both or AI SEO / A | **[I]** Three of the seven profiled are in this segment, so they are buyers here, not rivals | $3M+ revenue or 25+ staff | Method and tooling (Scriblr) | Partnerships with agency networks are channel #2. Ruth-gated (CLAUDE.md §2). Must not target the five head terms |

### C.3 Where this differs from the plan's proposed order, and why

| Plan proposal | This file | Reason |
|---|---|---|
| "managed IT and MSSP" | **09.02 MSSP/MDR only.** 09.01 managed IT deferred | **[O]** NUOPTIMA publishes dated city-level MSP AI visibility rankings and a named-client MSP test. 09.01 now has a specialist doing near-wedge work. 09.02 has not been observed with one |
| "CPA / transaction advisory" | **02.06** first, 02.05 later | 02.06's A niches are AI-SEO-led (thin search, high-value prompts), which suits the method. 02.05's are Both/A and more contested at the accounting level [R]. It also aligns with the M&A-advisor channel [I] |
| "3PL / cold chain" | **06.08 cold chain** only | Certification vocabulary carries the §7 bar. 06.01 3PL is where the logistics GEO specialists aim [R] |
| "SaaS cybersecurity / GRC" | Kept, **narrowed** | Pass 2 plus Powered by Search's named cyber logos [O] |
| Others | Unchanged | Commercial insurance, TIC, industrial automation and B2B agencies match the plan |

### C.4 Not in the first eight, with the reason

- **Generic B2B SaaS (01.01, 01.02) and the other SaaS sub-items** (HR, RevOps, devtools, AI infra, legal tech). This is the most crowded field [O §0.4]. Revisit after a dated Family B observation exists to lead with.
- **Corporate law (02.01).** First Page Sage's self-ranked law-firm GEO list exists (pass 1). Practice-by-jurisdiction depth needs bar-rule review on legal advertising. `[NEEDS DATA: state bar advertising rules for the target jurisdictions]`
- **Broad manufacturing (05.x beyond 05.03).** Occupied (CLAUDE.md §1, passes 1–3, WebFX today).
- **Construction tech and proptech (07.09, 07.10).** Industry 07 has only 22 A niches across 16 sub-industries, the thinnest A-depth of the industries on the operator's list.

---

## D. Proposed edit to CLAUDE.md §1 (diff for operator approval, not applied)

```diff
 What survives every source, and it got stronger on second pass: **nobody publishes a named client
-with a dated, reproducible measurement.**
+with a dated, reproducible measurement**, meaning run dates, model versions, the full prompt set
+and the stored answers. Closest observed (2026-10-06): NUOPTIMA on MSP Today, 2026-08-25, names
+its client, its four assistants and a 40-query count, but publishes 4 of 10 prompts, no run date,
+no model versions and no answers. None of iPullRank, Directive, Omniscient, Powered by Search,
+First Page Sage, WebFX or The ABM Agency publishes all four (docs/strategy/2026-10/
+01-competitor-teardown-and-icp.md §A.4). State the claim with its four elements so a reader can
+check it column by column.
```

---

## NEEDS DATA

- A browser pass on the seven homepages and contact pages (chat, scheduler embed, sticky header, WhatsApp, form fields), desktop and 375px.
- Verbatim buyer language: the GHL enquiry `message` export, walkthrough-call notes, won/lost notes.
- Nadia 2.2: GSC impressions and query clusters per cohort, and keyword volumes for each cohort's PPC terms.
- The reporting export that fills `actual` on the 45 case studies (carried from CLAUDE.md §2).
- A targeted competition search for 02.06 (QoE, valuation), 06.08 (GxP, CGT logistics), 09.02 (MSSP/MDR-specific GEO) and 09.07 (ERP partners).
- A re-run of the commercial insurance and TIC vacancy searches on the day each wave ships. They were last checked 2026-09-29.
- State bar advertising rules for any corporate-law cohort.
- An operator decision on China and India: coverage-only or target markets (§B.3.1).
- An operator decision on the "health admin" home and the RevOps priority grade (§B.3.2, §B.3.4).
- An operator decision on whether the three demand-gen and ABM agencies are white-label targets (§A.7).

## Sources (all accessed 2026-10-06 unless stated)

**Primary, opened:** every URL in the §A.1 Sources column, plus:

- MSP Today, NUOPTIMA article, 2026-08-25: <https://www.msptoday.com/topics/msp-today/articles/464047-we-asked-four-ai-assistants-recommend-an-msp.htm>
- NUOPTIMA Dallas ranking: <https://nuoptima.com/msp-visibility-rankings/dallas>
- WebFX home-services AI SEO page: <https://www.webfx.com/industries/home-services/agency/ai-seo/>
- Redirect observed: `https://www.abmagency.com/` → 303 → `https://abmagency.com.md/` (not followed)

**Reported only, search results not opened:**

- Cybersecurity GEO lists: <https://www.pepper.inc/blog/geo-agencies-for-cybersecurity/>, <https://gracker.ai/blog/top-aeo-agencies-cybersecurity-companies-2026>, <https://www.gtm8020.com/blog/geo-agencies-cybersecurity-companies>
- Logistics GEO list: <https://www.webtonic.io/blog/best-geo-gen-engine-opt-agencies-for-logistics-and-supply-chain>
- Accounting and professional-services GEO: <https://revenuezen.com/top-geo-agencies-professional-services-firms/>, <https://www.countingworkspro.com/blog/how-accounting-firms-win-visibility-in-the-ai-search-era>
- NUOPTIMA MSP GEO service: <https://nuoptima.com/generative-engine-optimization-geo-services>

**Repo:**

- `CLAUDE.md`
- `docs/icp-positioning.md` v2.1
- `data/b2b/icp/icp-taxonomy.json` v2.0.0
- `docs/icp-industries/*.md`
- `docs/research/b2b-vertical-substance*.md` (passes 1–3)
- `lib/b2b/icpPublication.ts` (wave 1 state)
