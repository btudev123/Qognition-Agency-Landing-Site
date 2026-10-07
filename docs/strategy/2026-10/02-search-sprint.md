# 02 · Search sprint: 14 days, ranked by speed to lead

Author: Nadia (search). 2026-10-06. Plan step 2.2.
Status: **recommendation plus a set of implemented, reversible changes (§3, §4.3, §4.4).** Not reviewed by
Ruth (brand-guard). Not reviewed by Owen (quality). Nothing here is committed or deployed.

**Inputs, and how each one is labelled below.**

- **[O] Observed today.** Served HTML fetched from production (`https://www.qognitionagency.com`), and from
  the dev checkout on `localhost:3123` after the changes in §3. Both on 2026-10-06.
- **[G] GSC.** Read by MARS in Chrome, `sc-domain:qognitionagency.com`, last 3 months to 2026-10-03. The
  page-group split comes from `docs/seo/gsc-url-group-baseline.md`, 26 Jun to 25 Sep 2026, pulled 2026-09-28.
- **[P] Prior audit.** `docs/seo/site-optimisation-audit.md` (2026-09-29) and
  `docs/seo/b2b-offpage-authority.md`. Each was re-checked today before I relied on it.
- **[I] Inference.** Reasoned from the evidence. Not measured.

**What this document will not do.** It does not forecast traffic, rankings, leads or AI citation share,
and it gives no dates for results. Every item names the **leading indicator** that shows whether it
worked. Ranking and citation are reported under separate headings (§8) and are never merged.

**Context drift, recorded.** `~/qognition-ops/clients/qognition-agency/context.md` still describes the
retired positioning: SMB founders, published prices, four services. I planned against `CLAUDE.md`
(2026-10-03 authority note) and the operator's 2026-10-06 brief. `[NEEDS DATA: context.md refresh, Iris
plus the operator]`

---

## 0. The baseline, and what it rules out

| Signal | Value | Source |
|---|---|---|
| Clicks / impressions / CTR / average position | 198 / 73K / 0.3% / 30.3 | [G] |
| Brand clicks: "qognition agency" + "qognition" + "qognitionagency.com" | 38 + 14 + 4 = **56 of 198** | [G] |
| Best non-brand query by clicks | 2 clicks ("ppc performance agency", position 20) | [G] |
| Non-brand queries with one click each | "social media marketing bahrain", "ai seo massachusetts", "vercel crm", "elder seo", "pay per click optimisation hobart", "branding bahrain" | [G] |
| Homepage share of clicks | 62 of 187 | [G], 09-28 |
| `/locations/*` | 632 pages, 80 clicks, 50,978 impressions | [G], 09-28 |
| `/services/*` | 34 pages, **3 clicks** in a quarter | [G], 09-28 |
| Sitemap entries | **4,422**, of which only **230** carry `lastmod` | [O] |
| Sitemap entries in four legacy families (programmatic, directory, locations, glossary) | 3,828 (87%) | [O] |
| Published ICP pages live in production | **0.** All 8 wave-1 TIC URLs return 404. They exist only on this branch | [O] |

**What it rules out.**

1. **Organic search will not produce a forecastable lead count inside 14 days, and I will not pretend
   it will.** What this sprint can do in 14 days is remove what blocks indexing and brand resolution,
   put the operator's priority pages in front of the right queries, and ship the pages that convert.
   The leading indicators in §1 show whether that worked. Paid search is the only channel with
   same-week lead potential. That is Marcus's `03-paid-and-cro.md`, not this document.
2. **There is no ranking equity on the priority service pages to protect.** `/services/*` earned 3
   clicks in a quarter [G]. Aggressive title, H1 and link changes therefore risk very little.
3. **There is no impression data for any ICP cohort, because no ICP page is live** [O]. Cohort order
   (§7) cannot come from impressions yet. The first thing that changes that is shipping wave 1.

---

## 1. The sprint at a glance

Ranked by distance to a booked call. A brand searcher (referral has been about 100% of acquisition,
`CLAUDE.md` §3) is one search from the booking page. A Family Q reader is a page and a form away. A
listicle reader is three steps away.

| # | Item | Owner | Effort | Leading indicator | Blocked by |
|---|---|---|---|---|---|
| 1 | **Ship this branch to production**, after preview review. It fixes the live defects in §2.1 | Jonas, after Owen and Ruth | 1 day of review plus deploy | GSC URL Inspection "live test" shows the §3 titles; Rich Results Test reads one `Organization` with `@id` | Operator approval |
| 2 | Brand-query diagnosis and entity disambiguation (§2.2) | Nadia (diagnosis), MARS (Chrome checks) | 2 hours | Average position for "qognitionagency.com" and "qognition agency", read weekly in GSC | none |
| 3 | Submit each child sitemap separately in GSC, to get indexing by family (§2.3) | Operator or MARS in GSC | 30 minutes | Page indexing report filtered per sitemap: indexed ÷ submitted per family | GSC access |
| 4 | Priority-page titles, descriptions and H1s (§3). **Implemented** | Nadia (done), Owen, Ruth | done | Per-URL CTR and average position in GSC, from the deploy date | item 1 |
| 5 | Internal links into the priority pages (§3.3) | Mira (build), Theo (anchors) | half a day | GSC Links report: internal links to each priority URL; crawl depth | the other developer's nav and footer edits landing |
| 6 | Entity record set, identical on every platform (§4.2) | Operator (accounts), Nadia (strings) | 1 to 2 days, spread out | The citation-check prompts "What is Qognition Agency?" resolve to this company (§4.7) | operator approval of the canonical strings |
| 7 | Ship TIC wave 1 (8 pages, already reviewed) to production | Jonas | part of item 1 | The 8 URLs indexed; impressions above zero in GSC | item 1 |
| 8 | Run the first dated Family B observation (TIC cohort) and publish it (§4.6) | Nadia (prompt set), Luke (runner), Theo (write-up), Ruth | 2 to 3 days | Report page indexed; referring domains to it; citation checks (§4.7) | a provider key and a spend ceiling (`OPERATOR-DECISIONS` #9, #10) |
| 9 | Family Q pages, first three (§5) | Nadia (briefs), Theo (copy), Ruth | 1 to 2 days per page | Indexed; impressions on the target query cluster; `booking_widget_view` from those landing pages in GA4 | Ruth |
| 10 | Answer-first blocks on the seven service pages (§4.1) | Theo, against Nadia's questions | 1 day | Snippet or AI Overview source checks for the listed questions (§4.7) | Ruth |
| 11 | Remove the `no-store` render on every URL (§2.4) | Luke, Jonas | 1 day, plus review | GSC Crawl stats: average response time and pages crawled per day | Owen |
| 12 | List and directory placements (§6) | Iris (verification), Rafael (outreach drafts), operator (sends) | ongoing | Profiles live with identical strings; inclusion confirmed in writing | items 6 and 8 |
| 13 | Next ICP cohorts (§7) | Theo, Nadia, named reviewer | 1 to 2 cohorts a week, per plan Phase 3 | Per-cohort indexed count and impressions | a named reviewer per cohort |

**Suggested day map.** This is an order of work, not a promise of results.

- **Days 1 to 2:** items 1, 2 and 3. Also open the item 6 accounts.
- **Days 3 to 5:** items 5, 6 and 7. Brief the item 9 pages.
- **Days 6 to 10:** items 8, 9 and 10.
- **Days 11 to 14:** item 11, the item 12 outreach, then read every leading indicator and re-rank §7.

---

## 2. Technical: indexing and brand resolution

### 2.1 Production is behind this branch, and production is where the defects are

Each of these was observed live today [O]. Each is already fixed in this checkout.

| Live defect | Fixed by |
|---|---|
| Doubled brand suffix: "Case Studies \| Qognition \| Qognition", "AI Search Visibility Report \| Qognition \| Qognition", and an 85-character `/services` title ending "\| Qognition \| Qognition" | §3. The three pages now route through `metadataFor` |
| `/llm.txt`, advertised in the HTTP `Link:` header of every page, states: offices in NYC, LDN, DXB, BLR and SYD; "Founded 2019"; retainer and project prices; the retired four-spoke model; Salt's regulated finance services | `public/llm.txt` deleted; `/llm.txt` now 308s to `/llms.txt` (`next.config.mjs`); the `proxy.ts` header names `/llms.txt` (§4.4) |
| `/llms.txt` describes the retired "AI Search, Demand, ABM and Revenue Systems" positioning and lists none of the 18 priority pages | `lib/llms.ts` rewrite (§4.4) |
| "delivered within 48 hours" in the `/free-ai-audit` description and on the NY, London, Dubai and Perth pages. The SLA is unconfirmed (`OPERATOR-DECISIONS` #2) | §3. The branch's location template already drops it |
| `/services/ppc` publishes "Management is 15% of total ad spend", against the 2026-10-03 no-public-prices rule | Already absent on the branch |
| The 8 wave-1 TIC pages return 404 | Already published on the branch |
| `Organization.name` "Qognition", `WebSite.name` "Qognition", no `@id`. `/insights/*` references an `@id` that resolved to nothing | §4.3 |

**Note for Iris.** `01-competitor-teardown-and-icp.md` §C.1 lists "TIC wave 1 published" as available
proof. On production it is not yet true. It becomes true when item 1 ships.

### 2.2 "qognitionagency.com" averages position 34.2. The cause is not canonicalisation

**Hypothesis in the brief:** a canonical or duplicate issue. **Tested today, and not supported** [O]:

| Check | Result |
|---|---|
| `http://qognitionagency.com/` | 308 → `https://qognitionagency.com/` → 308 → `https://www.qognitionagency.com/`. That is two hops (§2.5), but it resolves |
| `https://www.qognitionagency.com/` | 200, `<link rel="canonical" href="https://www.qognitionagency.com">`, `index, follow` |
| Trailing slash | `/locations/phoenix/` → 308 → `/locations/phoenix` |
| `/index.html` | 404, so there is no duplicate homepage |
| `?ref=x` | 200 and canonicalised to the clean URL |

**Leading hypothesis: entity collision, observed in one engine.** A web search on 2026-10-06 for the exact
string `"Qognition Agency"` returned only **Cognition Agency**, a UK agency founded in 1998, plus its
DesignRush, G2 and Creativebrief profiles. A search for `qognitionagency.com` returned the same set, and
the tool concluded that "the domain qognitionagency.com doesn't appear to be an active website" [O]. The
engine treats "Qognition" as a misspelling of "Cognition". That engine is not Google. If Google behaves
the same way ("Showing results for cognitionagency…"), a navigational query would average a deep position
even with perfect canonicals. The Cognition collision then has a second form: Cognition, the AI company.

**What settles it** (MARS in Chrome, read-only, 20 minutes):

1. Search Google for `qognitionagency.com` and `qognition agency`, signed out, in a US and an IN locale.
   Record whether there is a "Showing results for" or "Did you mean" line, and the position of our
   homepage.
2. In GSC, filter Performance to query = `qognitionagency.com`. Read the Pages tab (which URL), the
   Countries tab, and the Search appearance tab.
3. In GSC URL Inspection on `/`, compare the user-declared and Google-selected canonical.

**Already implemented toward it** (§4.3): one entity `@id`, `Organization.name` "Qognition Agency" with
`alternateName` "Qognition", and `WebSite.alternateName` including `qognitionagency.com`. Google's
site-name system reads exactly those fields. The rest is off-site (§4.2). Every profile uses
"Qognition Agency", links the domain, and repeats one description, so the entity accumulates sources
that spell it with a Q.

### 2.3 Sitemap health: 4,422 entries, 87% legacy

| Family | Entries | `lastmod` | GSC clicks a quarter [G, 09-28] |
|---|---:|---:|---:|
| `programmatic` (`/locations/<city>/<service>[/<industry>]`) | 2,161 | 0 | inside the 80 for `/locations/*` |
| `directory` | 1,007 | 0 | 17 |
| `locations` | 340 | 0 | inside the 80 |
| `glossary` | 320 | 0 | 15 |
| `growth` | 163 | 163 | 0 |
| `services` | 130 | 0 | 3 |
| `industries` | 77 | 0 | 0 |
| `case-studies` | 62 | 0 | 3 |
| `translations` | 50 | 50 | 0 |
| `core` | 42 | 0 | most of the 62 homepage clicks |
| others (insights, blog, comparisons, tools, global, languages, resources) | 70 | 17 | 1 |

**Step 1, zero risk, this week.** Submit each of the 17 child sitemaps individually in GSC. The Page
indexing report can then be filtered per sitemap, which turns "4,422 entries" into an indexed ÷
submitted ratio per family. Every later decision needs that number. It changes nothing on the site.

**Step 2, DECISION, not this week unless the data supports it.** Take `programmatic` and `directory`
(3,168 entries) out of the sitemap index.

- This is **not** a noindex, a redirect or a deletion. The URLs stay live, linked and indexable.
- It stops the site declaring 3,168 template pages as its priority set.
- `CLAUDE.md` §7 requires Search Console data for a URL group before that group is removed, redirected
  or noindexed. Sitemap exclusion is softer than any of those, but I am holding it to the same bar.
- The prior operator rule protecting city pages (`site-optimisation-audit.md` header, "Rule 5") is
  respected: no city page is removed, redirected or noindexed.
- **Rollback:** restore the two family entries in `sitemapIndexes` (`lib/sitemap.ts`) and resubmit the
  index in GSC.
- **Blocked by:** `[NEEDS DATA: GSC pages export for /locations/*/*/ and /directory/*]`

**`lastmod`.** Add it only where a real change date exists: case studies (`auditedAt`) and blog (`date`).
Never use the build date. Owner Luke. Rollback: remove the field.

### 2.4 Every URL renders with `Cache-Control: private, no-cache, no-store`

Observed on the homepage today [O]. `site-optimisation-audit.md` §6.1 traced it to one line, with a
route-group fix that changes no URL, and its rollback is in §9.1 of that document. It matters because
crawl cost limits indexation on a 4,422-URL site with 683 URLs not indexed [G, 09-28]. Owner: Luke, with
Jonas. Leading indicator: GSC Crawl stats, average response time and pages crawled per day.

### 2.5 Smaller technical items

| Item | Fix | Rollback | Owner |
|---|---|---|---|
| `http://qognitionagency.com` takes two 308 hops | In Vercel domain settings, redirect apex HTTP straight to `https://www.` | Restore the previous domain setting | Jonas |
| `next dev` returned 500 on `/llms.txt`: "A conflicting public file and page file was found". Pre-existing. Production serves the route | **Done 2026-10-07** (Owen P1-6): `public/llms.txt` and `public/llm.txt` deleted with plain `rm`, not staged. Both held the same uncommitted rewrite (sha256 `1c01168b…`), now folded into `lib/llms.ts`. A gate stops either returning (§9) | Copies are saved outside the repo in the session scratchpad (`backup/public-llms.txt`, `backup/public-llm.txt`). Git can only restore the committed, older versions | Nadia (done) |
| `/directory/*` and `/blog/*` can serve 200 `noindex` pages for invented slugs (`dynamicParams = true`) [P §5.3] | Return `notFound()` instead | Revert the two files | Luke |

### 2.6 Two service trees compete for the same queries

| Priority page (operator) | Overlapping page, also indexable, in the sitemap with `lastmod` |
|---|---|
| `/services/seo` | `/growth/services/ai-search/seo` |
| `/services/ai-seo` | `/growth/services/ai-search/ai-seo-geo`, `/growth/services/ai-search/answer-engine-optimization` |
| `/services/ppc` | `/growth/services/demand-generation/google-ads` |

The `/services` hub's body links only to the four `/growth/services/*` pillars, two of which (ABM,
Revenue Systems) describe the retired positioning, and to none of the seven priority service pages [O].

**Recommendation.** `/services/*` are canonical for these commercial intents, because the operator named
them.

- **Step 1, this sprint, links only:** the `/services` hub links to its seven children (§3.3). Each
  overlapping `/growth/services/*` page gets one in-body link to its `/services/*` counterpart.
- **Step 2, DECISION, only after per-URL GSC data:** add `rel=canonical` from the four overlapping
  growth pages to their `/services/*` counterparts.
  - **Rollback:** remove the canonical override in `lib/growth/metadata.ts`.
  - **Not if** any growth page shows impressions the service page does not.

---

## 3. Priority pages: title, description, H1, links

All changes in this section are **implemented** in `lib/seo.ts` (the `SEO_OVERRIDES` and `H1_OVERRIDES`
maps). The rendered result was verified from the dev server, along with every gate (§9). URLs are
unchanged. Rollback for all of §3: `git checkout lib/seo.ts` plus the five consuming files listed in the
hand-off.

### 3.1 Titles

"Live" is production on 2026-10-06 [O]. "New" is the final string in `lib/seo.ts` after Ruth's copy edit of 2026-10-07. Character counts are in brackets.

| # | URL | Target (operator) | Live title | New title |
|---|---|---|---|---|
| 1 | `/` | AI-native growth agency | AI-native B2B Growth Agency \| AI Search, Demand & ABM \| Qognition (65) | **AI-Native B2B Growth Agency: AI SEO & GEO \| Qognition Agency** (60) |
| 2 | `/services` | digital marketing services | B2B Growth Services: AI Search, Demand, ABM & Revenue Systems \| Qognition \| Qognition (85) | **Digital Marketing Services: AI SEO, GEO & PPC \| Qognition** (57) |
| 3 | `/services/seo` | SEO services, enterprise SEO agency | SEO Services for Enterprise Growth \| Qognition Agency (53) | **Enterprise SEO Agency: B2B SEO Services \| Qognition** (51) |
| 4 | `/services/ai-seo` | GEO services, AI search optimization | GEO & AEO Services: Get Cited by ChatGPT & AI Overviews \| Qognition (67) | **GEO Services & AI Search Optimization for B2B \| Qognition** (57) |
| 5 | `/services/ppc` | PPC agency, paid media management | PPC & Paid Media Management Services \| Qognition Agency (55) | **B2B PPC Agency & Paid Media Management \| Qognition** (50) |
| 6 | `/services/web-development` | web design and development | Web Design & Development Agency \| Qognition (43) | **B2B Web Design & Development Agency \| Qognition** (47) |
| 7 | `/services/content` | content marketing services | Content Marketing Services That Drive Organic Growth \| Qognition (64) | **B2B Content Marketing Services: SEO & AI Search \| Qognition** (59) |
| 8 | `/services/branding-creative` | branding and creative agency | Branding & Creative Agency \| Identity & Design \| Qognition (58) | **B2B Branding & Creative Agency \| Brand Identity \| Qognition** (59) |
| 9 | `/services/cro-analytics` | CRO, analytics | CRO & Analytics Agency \| Conversion Rate Optimization \| Qognition (65) | **Conversion Rate Optimization (CRO) & Analytics \| Qognition** (58) |
| 10 | `/industries` | industries | Industries We Serve: Law, Finance, SaaS & More \| Qognition (58) | **B2B Industries We Serve: AI SEO, SEO & PPC \| Qognition** (54) |
| 11 | `/case-studies` | case studies | Case Studies \| Qognition \| Qognition (36) | **Case Studies & Illustrative Scenarios \| Qognition Agency** (56). See decision O7 |
| 12 | `/free-seo-audit` → 308 → `/free-ai-audit` | free SEO audit | AI Search Visibility Report \| Qognition \| Qognition (51) | **Free AI Search & SEO Visibility Audit \| Qognition** (49) |
| 13 | `/locations/new-york` | digital marketing agency New York | Digital Marketing Agency New York \| SEO, PPC, GEO \| Qognition (61) | **Digital Marketing Agency New York: SEO, PPC, GEO \| Qognition** (60) |
| 14 | `/locations/london` | digital marketing agency London | Digital Marketing Agency London \| SEO & AI Search \| Qognition (61) | **Digital Marketing Agency London: SEO & AI Search \| Qognition** (60) |
| 15 | `/locations/dubai` | digital marketing agency Dubai | Digital Marketing Agency Dubai \| SEO, GEO & PPC \| Qognition (59) | unchanged (59) |
| 16 | `/locations/perth/ai-seo` | ai seo perth | Qognition: Perth AI SEO & GEO Agency (36) | **AI SEO Perth: GEO & AI Search Agency for B2B \| Qognition** (56) |
| 17 | `/locations/perth` | digital marketing agency Perth | Digital Marketing Agency in Perth \| SEO, PPC & GEO \| Qognition (62) | **Digital Marketing Agency Perth: SEO, PPC & GEO \| Qognition** (58) |
| 18 | `/locations/perth/seo` | Perth SEO agency | Perth SEO agency \| Expert Enterprise & Local SEO Services in Perth (66, no brand) | **Perth SEO Agency for B2B: Enterprise & Local SEO \| Qognition** (60) |

**Why some titles changed beyond the keyword.**

- **Row 4.** "Get Cited by ChatGPT" reads as a promise of placement in a third-party system, which
  `CLAUDE.md` §4 forbids.
- **Row 2.** "B2B" was kept out of the slot before "marketing", because "b2b marketing agency" is one of
  the five white-label strings no page may target (`CLAUDE.md`, 2026-09-29). This matches Marcus's D1.
- **Row 12.** `/free-seo-audit` is already a 308 to `/free-ai-audit` in production (`next.config.mjs`
  and `lib/legacy-publication.ts`). The brief says not to change URLs, so I did not reverse the
  redirect. The "free SEO audit" intent now lives in the destination's title (decision O5).

### 3.2 Meta descriptions

All 18 are now 120 to 160 characters, with no number and no unconfirmed SLA. Each names the service and
B2B, and ends on the primary CTA.

| URL | Live description, defect only | New description |
|---|---|---|
| `/` | "…connects AI search, demand generation, ABM and revenue systems…" (retired positioning) | Qognition Agency is an AI-native growth agency for B2B companies, including SaaS. AI SEO, GEO, SEO and PPC tied to qualified enquiries. Book a call. |
| `/services` | retired positioning | Digital marketing services for B2B companies: AI SEO, GEO, SEO and PPC, with content, web and CRO that support them. Scoped to your buyers. Book a call. |
| `/services/seo` | no "SEO services" phrase | SEO services for B2B and enterprise companies: technical SEO, commercial content and authority work, measured against qualified enquiries. Book a call. |
| `/services/ai-seo` | no "GEO" phrase | GEO and AI search optimization for B2B: entity work, answer-ready content and dated prompt tracking across ChatGPT, Perplexity, Gemini and AI Overviews. |
| `/services/ppc` | generic | PPC and paid media management for B2B: search and paid social campaigns, landing pages and conversion tracking, judged on qualified enquiries. Book a call. |
| `/services/web-development` | fine; aligned | Web design and development for B2B companies: accessible, fast sites with clear buyer journeys, search foundations and conversion tracking. Book a call. |
| `/services/content` | fine; aligned | Content marketing services for B2B: commercial pages, expert guides and buyer evidence written to rank in Google and be quoted in AI answers. Book a call. |
| `/services/branding-creative` | not B2B | Branding and creative for B2B companies: naming, visual identity, messaging and sales assets that keep your claims consistent everywhere. Book a call. |
| `/services/cro-analytics` | fine; aligned | Conversion rate optimization and analytics for B2B: find form and page friction, track enquiries and bookings, and tie them to sales outcomes. Book a call. |
| `/industries` | "law, finance, consulting, real estate…" (narrow and dated) | AI SEO, GEO, SEO and PPC for B2B firms. Find your sector, from SaaS and IT services to manufacturing, testing labs and professional services. |
| `/case-studies` | 178 characters, truncated | Search and acquisition scenarios across HVAC, dental and insurance, with planning assumptions and attributed benchmarks. Not verified client results. |
| `/free-ai-audit` | "delivered within 48 hours" (unconfirmed SLA) | Request a free, human-reviewed audit of how your firm appears in Google and AI answers. We confirm scope and timing after we review your request. |
| `/locations/new-york` | generic | Qognition helps B2B companies win New York buyers with AI SEO, GEO, SEO and PPC tied to qualified enquiries. Remote delivery. Book a call or enquire. |
| `/locations/london` | "Get a free audit today" | Qognition helps B2B companies win London buyers with AI SEO, GEO, SEO and PPC tied to qualified enquiries. Remote delivery. Book a call or send an enquiry. |
| `/locations/dubai` | "Dubai brands", consumer register | Qognition helps B2B companies selling into Dubai and the UAE with AI SEO, GEO, SEO and PPC. Remote delivery. Book a call or send an enquiry. |
| `/locations/perth` | generic | Qognition helps B2B companies win Perth buyers with AI SEO, GEO, SEO and PPC tied to qualified enquiries. Remote delivery. Book a call or send an enquiry. |
| `/locations/perth/seo` | no brand, no CTA | SEO for Perth B2B companies: technical SEO, local SEO, commercial content and authority work, measured against qualified enquiries. Remote delivery. |
| `/locations/perth/ai-seo` | 178 characters, "Book a free audit" | AI SEO and GEO for Perth B2B companies: how you appear in ChatGPT, Gemini, Perplexity and Google AI Overviews, tracked by prompt and date. Book a call. |

**"Remote delivery"** now appears on all five location descriptions (Ruth extended it to Dubai and
Perth SEO). It keeps `CLAUDE.md` §4 intact: a title that reads "Digital Marketing Agency London" sits
next to a statement that no London office is claimed.

### 3.3 H1s and internal links

"Implemented" means it is live on the branch through `H1_OVERRIDES`. "Proposal" means the H1 is
hand-written copy from the 2026-10-03 rewrite, owned by Theo, or sits in a file I must not touch.

| URL | Live H1 | Branch H1 before me | New H1 | Status | Internal-link change |
|---|---|---|---|---|---|
| `/` | We show you what AI says about your firm. | Get found. Get shortlisted. Build pipeline. | keep; put "AI-native growth agency for B2B: AI SEO and GEO" in the eyebrow | Proposal (Theo; `docs/copy/home-v4.md` is preserved) | Body links to 3 priority pages today. Add in-body links to `/services/ai-seo` ("AI SEO and GEO"), `/services/seo` ("B2B SEO services") and `/services/ppc` ("B2B PPC management") |
| `/services` | Build the journey from discovery to pipeline. | Be easier to find. Give buyers a reason to enquire. | Digital marketing services, led by AI SEO and GEO | Proposal (Theo) | **Links to 0 of its 7 priority children today.** Add a grid linking all 7, with the §3.1 keywords as anchors. Demote the four `/growth/services/*` cards below it |
| `/services/seo` | SEO & Organic Growth | B2B SEO | **Enterprise and B2B SEO Services** | Implemented | Link to `/locations/perth/seo` and the market pages (below) |
| `/services/ai-seo` | GEO & AI Search | AI SEO & GEO for B2B | **AI SEO and GEO Services for B2B** | Implemented. Matches Marcus's ad group 1A | Link to `/free-ai-audit` above the fold (Marcus §3.4) and to `/locations/perth/ai-seo` |
| `/services/ppc` | Paid Media (PPC) | B2B PPC | **B2B PPC and Paid Media Management** | Implemented. Matches Marcus's 2B | none extra |
| `/services/web-development` | Web Design & Development | B2B Website & Search Implementation | **B2B Web Design and Development** | Implemented | Not in the footer today. Add it |
| `/services/content` | Content Marketing | B2B Content for Search & Evaluation | **B2B Content Marketing Services** | Implemented | none extra |
| `/services/branding-creative` | Branding & Creative | B2B Messaging & Creative | **B2B Branding and Creative Services** | Implemented | Not in the footer today. Add it |
| `/services/cro-analytics` | CRO & Analytics | B2B Conversion & Measurement | **Conversion Rate Optimization and Analytics** | Implemented | Not in the footer today. Add it |
| `/industries` | Industries We Serve | Industries We Serve | keep | n/a (`app/industries/*` is another developer's) | Link each published ICP hub as it ships |
| `/case-studies` | Case Studies | Research and planning examples | Case studies and planning scenarios | Proposal (Theo, Ruth). The branch H1 dropped the page's own keyword | none |
| `/free-ai-audit` | Get your AI Search Visibility Report. | same | Request a free AI search and SEO visibility audit | Proposal (Theo). **The body never says "free"** although the title now does; align it (decision O5) | Already 5 in-body inbound links |
| `/locations/new-york`, `/london`, `/dubai`, `/perth` | Digital Marketing Agency in {city} | AI SEO & GEO for B2B companies in {city} | **Digital marketing agency for B2B companies in {city}** | Implemented, these four only. The fallback string for the other 336 is byte-identical to the working tree before this change. See the note under this table | **New York, London and Dubai receive 0 in-body links from any priority page.** Add a "Markets we serve" block on the seven service pages linking all four |
| `/locations/perth/seo` | SEO & Organic Growth in Perth | B2B SEO in Perth | **SEO agency for Perth B2B companies** | Implemented (Ruth's wording) | Cross-link to `/locations/perth/ai-seo`; link up to `/services/seo` |
| `/locations/perth/ai-seo` | GEO & AI Search in Perth | AI SEO & GEO for B2B in Perth | **AI SEO and GEO for Perth B2B companies** | Implemented | Cross-link to `/locations/perth/seo`; link up to `/services/ai-seo` |

**Which change belongs to whom on the location H1 (Owen P2-11).** HEAD renders `Digital Marketing
Agency in {location.name}`. The working tree **before this change** already rendered `AI SEO & GEO for B2B
companies in {location.name}`. That is the other developer's uncommitted 2026-10-03 rewrite:
`app/locations/ProgrammaticLocationView.tsx` was listed as modified in the session-start git status, and
my edit asserted that exact string before replacing it. This change only wraps it in
`h1For(path, <that string>)`. So a diff against HEAD shows a sitewide H1 change, but it is not from this
work, and I have not reverted it (uncommitted drafts are preserved, 2026-10-03 authority note). If the
operator wants HEAD's `Digital Marketing Agency in {city}` back on all 340 pages, that is a one-string
change in the fallback. It reverses the other developer's copy, so it needs their or the operator's
agreement (decision O12).

**Also on the location template (Theo, then Ruth).** Two problems sit in the FAQ on all 340 location
pages, including the four priority ones:

- **"We prioritize … ecommerce, healthcare, and local services"** names B2C segments on a B2B site.
- **"Is this page useful for AI search engines? Yes. The page includes … FAQ schema"** is a question no
  buyer asks. It describes the page's markup to the reader.

Replace both with buyer questions specific to the market. Files: `app/locations/[location]/page.tsx` and
`app/locations/[location]/[service]/page.tsx`.

### 3.4 The operator's sheet: claims checked, and not silently dropped

Each claim was checked against `data/case-studies/*`, `data/case-studies/benchmarks.ts`, `CLAUDE.md` §4
and `clients/qognition-agency/guardrails.md`. The compliant alternative is the one implemented in §3.1
and §3.2. The operator's original wording is kept here so it can be restored the day its evidence exists.

| Operator's proposed wording | Source found | Why it cannot ship now | What would allow it |
|---|---|---|---|
| "+200% organic traffic" | None. Not in the repo. `caseStudyEvidence()` grades all 45 records `projected` | §4: no number that was not measured. The live `/services/seo` carried "+200% Organic Traffic" in September and was flagged then | A named client, a period, a reporting source and permission, entered in `actual` |
| "cut CPA by up to 25%" | None. `benchmarks.ts` has a 25% figure, but it measures the share of ad accounts that never added a negative keyword. That is a different metric and not our result | Unsourced. "Up to" does not make an unmeasured figure compliant | As above, from PPC reporting |
| "+180% organic reach" | None | Unsourced | As above |
| "lift conversions by up to 35%" | None. `benchmarks.ts` has Seer Interactive's "+35%" **organic CTR** lift when a page is cited in an AI Overview. That is third-party, a different metric, and not ours | Using Seer's number as our conversion result would be a misattribution | Our own CRO measurement, or cite Seer **as Seer, about CTR** |
| "100 PageSpeed scores" | None measured. The dead spoke data says "90+" with a free-fix guarantee | Unmeasured, and as a deliverable it is a guarantee | A dated PageSpeed run on named shipped sites, stated as an observation |
| Named clients "NovaPay and Opal Consulting" | Neither name appears anywhere in the repo. Opal Consulting was in the unsourced "Library B"; its page 404'd from its own index (`context.md`, 2026-09-14) | `guardrails.md`: named client results or logos need written permission. No substantiation is on file | Written permission plus the result evidence |
| "Perth's best SEO agency" | none possible | `guardrails.md` prohibits "best" without a cited, dated source | An independent, dated, methodology-backed ranking. Even then, attribute it |
| "delivered within 48 hours" | Unconfirmed (`OPERATOR-DECISIONS` #2) | An SLA we cannot hold at current volume is a broken promise in the first enquiry | The operator confirms an SLA in writing |

---

## 4. GEO quick wins on the marketing site

Three passes in order. Extractability first, because nothing can be cited from a page a model cannot
lift a claim off.

### 4.1 Extractability: answer-first blocks on the seven service pages

Under each H1, add one self-contained answer of 40 to 60 words to the question below. It states what the
service is, for whom, and what it is measured against. It contains no number. The existing FAQ sections
stay.

| Page | The question the block answers |
|---|---|
| `/services/ai-seo` | What is the difference between AI SEO and GEO? Use the four-layer definitions in `CLAUDE.md` §1, verbatim, as a table |
| `/services/seo` | What does enterprise SEO include for a B2B company? |
| `/services/ppc` | How is B2B PPC judged if not on clicks? |
| `/services/content` | What makes B2B content citable by an AI assistant? |
| `/services/web-development` | What does a B2B website need before SEO can work? |
| `/services/cro-analytics` | What should a B2B site track between the first visit and a booked call? |
| `/services/branding-creative` | Why does inconsistent messaging hurt AI search visibility? |

Owner Theo, then Ruth. Leading indicator: the §4.7 checks for these questions.

### 4.2 Entity consistency: on-site done, off-site still open

**On-site, implemented today:** one `Organization` `@id`, one name, one `WebSite` node, the X URL matching
the footer, and `contactPoint` carrying the operator-confirmed phone. Detail in §4.3.

**Off-site, the canonical strings.** The operator approves these once. Then they are pasted, never
retyped.

| Field | Value | Status |
|---|---|---|
| Name | Qognition Agency (never "Qognition" alone in a name field) | ready |
| One-sentence description | "Qognition Agency is a B2B AI search visibility agency that runs AI SEO, GEO, SEO, local SEO and B2B PPC for established B2B companies, including SaaS." | **needs operator approval** |
| Website | https://www.qognitionagency.com | ready |
| Headquarters | Gurugram, Haryana, India (`data/siteConfig.ts`, operator-confirmed 2026-09-28) | ready |
| Countries | listed as **served**, never as offices | ready |
| Phone, email | +1 (236) 349-8449, hello@qognitionagency.com | ready |
| Founded | `[NEEDS DATA: founding year]`. The old `/llm.txt` says 2019; that file also invented five offices, so it is not a source | blocked |
| Leadership | names and titles matching `/team`, each with a LinkedIn link | `[NEEDS DATA: consent from each leader]` |
| Sibling | Qognition Labs linked in prose and on profiles. **Salt Accounting Group: no parent or subsidiary field, ever** (`context.md` standing decision) | ready |

**Records, in order of effort.** Status for each is `[NEEDS DATA: observed]`. I did not open these
profiles today.

| Record | Action |
|---|---|
| LinkedIn company page | Name, description and website identical to the strings above. The vanity URL is `qognition-tech`; changing it breaks existing links, so leave it and fix the visible name |
| Crunchbase | Create or claim. Free tier |
| Clutch, DesignRush, GoodFirms, Sortlist | Create or correct. DesignRush and Tracxn listed Gurugram in September [P]; confirm the name is "Qognition Agency" |
| G2 (services) | Seller profile, if the category exists for agencies |
| Bing Places | Gurugram only. Copilot grounds on Bing |
| Google Business Profile | Only for the real Gurugram address. **No profile for any market city** (`CLAUDE.md` §4) |
| Wikidata | Create once two independent references exist (Crunchbase plus one press mention). **Not Wikipedia** [P §7.9] |

Every description opens with the exact string "Qognition Agency (qognitionagency.com)". That is the
countermeasure to the Cognition collision in §2.2.

### 4.3 Schema: implemented

| Change | File |
|---|---|
| `Organization`: `@id` `…/#organization`, name "Qognition Agency", `alternateName` "Qognition", `knowsAbout` gains PPC and B2B marketing, `sameAs` uses `x.com` to match the footer, `contactPoint` gains telephone and `/contact` | `lib/schema.ts` |
| `WebSite`: `@id` `…/#website`, name "Qognition Agency", `alternateName` ["Qognition", "qognitionagency.com"], `publisher` → the organization `@id`. The inline copy in the layout is replaced by this one function | `lib/schema.ts`, `app/layout.tsx` |
| `provider` and `publisher` on service, location, location-service and blog nodes now reference the organization `@id`. That resolves the dangling `/insights/*` reference | `lib/schema.ts`, `app/locations/[location]/page.tsx`, `app/locations/[location]/[service]/page.tsx` |
| Two em dashes removed from unused schema helpers | `lib/schema.ts` |

**Deliberately not added:**

- **`areaServed` on the organization.** `CLAUDE.md` lists 14 markets and the growth pages list 17;
  that is decision O6.
- **`foundingDate`.** `[NEEDS DATA]`.
- **`Person` nodes for the team.** Blocked on consent.
- **Any edge to Salt.** Standing decision.

**Still open:**

- **25 inline nodes still emit `name: 'Qognition'` with no `@id`**, across `/regions`, `/global`,
  `/languages`, `/case-studies/[id]`, the guide pages, `/free-tools` and `lib/growth/metadata.ts`.
  Owner Luke: one mechanical sweep to `orgRef()`. Exclude `app/industries/*` until the other developer
  finishes.
- **1,007 `/directory/*` pages emit `Product`, `Brand` and `Review` nodes for products that do not
  exist** [P §4.3]. Owner Luke, with Ruth on the `reviewBody` text.

### 4.4 llms.txt: implemented, and it is not a lever

`lib/llms.ts` serves `/llms.txt` and `/llms-full.txt`. It now carries:

- the one-sentence description and the HQ, with markets labelled as served
- the phone and the 30-minute call
- Qognition Labs and its three tools, by the names locked in `CLAUDE.md` §1
- the four-layer definitions, plus PPC as separately scoped
- the no-guarantee and observation rules
- the 16 key pages
- the 8 reviewed ICP pages (resolved from `ICP_PUBLISHED`, so an unreviewed page cannot appear)
- the growth pages, under "Optional"

There are no prices and no revenue band. The band was removed from the site in `468c739`.

**Single source** (Owen P1-6, 2026-10-07): `app/llms.txt/route.ts` → `lib/llms.ts`. Both static copies
in `public/` are deleted, and `/llm.txt` is a 308 to `/llms.txt` in `next.config.mjs` `redirects()`. A
`## Markets served` section lists the six location priority pages, stating that no office exists there.
With that, all 18 priority pages are in the file. `/free-seo-audit` counts through its 308 destination,
`/free-ai-audit`, which the text names. The new section 5 of `scripts/check-funnel.cjs` enforces all of
it (§9).

The sitewide HTTP `Link:` header now points at `/llms.txt` instead of `/llm.txt` (`proxy.ts`). No engine
has documented using llms.txt for retrieval or ranking. The value is consistency: it is the most compact
public self-description, and it contradicted the schema and the pages.

### 4.5 Comparison and "best X for Y" pages Qognition can honestly appear in

**Do not publish a self-ranked list.** `CLAUDE.md` §1 builds the wedge on competitors doing exactly that:
seven of seven lists put the publisher first. `guardrails.md` prohibits "best" without a dated source.
The five live `/comparisons/best-digital-marketing-agency-in-<city>` pages are that pattern. Route them to
Ruth, and build no more.

**What can ship.**

| Page | Format | Input | Owner |
|---|---|---|---|
| "How to evaluate a GEO agency for B2B: what each one publishes" | An evidence grid, not a ranking. Criteria: named client with a dated result; published method; run dates and model versions; pricing visibility; vertical depth. Every cell links its source and access date. Qognition gets a row with honest cells, including "dated client result: not yet published" until it is | Iris `01` §A.4 reproducibility scorecard, which already scores the seven | Iris (cells), Theo, Ruth |
| "Qognition vs <named agency>" for First Page Sage, iPullRank and Omniscient | A sourced, dated comparison. **Not** Directive, Powered by Search or The ABM Agency: they are white-label prospects (Iris `01` §A.7, decision O9) | Iris `01` §A.1 | Iris, Theo, Ruth |
| Refocus `/insights/choosing-a-b2b-growth-agency` to "How to choose an AI SEO or GEO agency", **with the URL unchanged** | Same evidence grid, short form | as above | Theo |

### 4.6 Citation-worthiness: publish the first dated observation

Iris `01` §0.2 found that no agency, including us, has published a dated, reproducible measurement. The
first to do so owns the claim. The quickest version needs no client: a **Family B observation report**
for the TIC cohort. It runs the buyer prompts already defined in `lib/b2b/promptPanel.ts` across the
four platforms, and publishes:

- the full prompt set and run date
- the model versions
- the stored answers
- which firms were named

`scripts/test-b2b-observations.cjs` reports **0 committed runs** today [O]. The TIC pages already
describe this practice ("We run your buyers' prompts across four platforms and publish what came
back"), so the first run also makes those pages true in substance. It is the single most citable asset
this domain can own. It is also the pitch for §6.

Blocked by: a provider key, a spend ceiling and a store (`OPERATOR-DECISIONS` #9 and #10).

### 4.7 Citation tracking: Qognition's named prompt set, v1

These are Family Q prompts: our buyer's questions. Run them monthly, with the same prompts and engines,
so months compare. Each row is appended to
`~/qognition-ops/clients/qognition-agency/deliverables/geo-citations.md` with date, engine, prompt,
cited or not, URL and what was said. The file is created at the first run, so it only ever holds
observations. Engines: ChatGPT (search on), Perplexity, Gemini, Claude, Copilot, Google AI Overviews and
AI Mode.

| ID | Prompt | What it tests |
|---|---|---|
| Q01 | What is Qognition Agency? | Entity resolution. Does it answer about Cognition Agency (UK)? |
| Q02 | Is qognitionagency.com a real company, and what does it do? | Entity resolution via the domain |
| Q03 | Which agencies help B2B companies get recommended by ChatGPT? | Category inclusion |
| Q04 | Best GEO agency for B2B SaaS | Category inclusion in the most contested vertical |
| Q05 | Who can improve AI search visibility for a commercial insurance broker or MGA? | Flagship vertical |
| Q06 | AI SEO agency for environmental testing labs | TIC: the field Iris found vacant |
| Q07 | GEO agency for cybersecurity or MSSP companies | Cohort 3 or 4 |
| Q08 | Why doesn't ChatGPT recommend my company? | The §5 Family Q page target |
| Q09 | How do I get my company cited in Google AI Overviews? | The §5 page target |
| Q10 | What's the difference between AI SEO and GEO? | Definitional; the §4.1 block |
| Q11 | White-label GEO services for marketing agencies | Agency segment |
| Q12 | How much does a GEO retainer cost for a B2B company? | Pricing intent. We publish no prices: what does the answer cite? |

Every row today is `[NEEDS DATA: citation check for <prompt>]`. **I have not run any of them.** Changing
this set requires a recorded reason, because comparability is the point.

---

## 5. Family Q pages to target fast

These are pages for **our** buyer's question, per `CLAUDE.md` §2. None targets a Family B prompt, which
is our client's buyer's question. Each needs a Nadia brief, Theo copy and Ruth. URLs are proposals; none
is a template.

| # | Target query family | Stage | Proposed URL | Don't cannibalise | Evidence it needs |
|---|---|---|---|---|---|
| 1 | "why doesn't ChatGPT recommend my company", "why is my competitor in ChatGPT and not us" | TOFU to MOFU, ends on `/free-ai-audit` | `/insights/why-chatgpt-does-not-recommend-your-company` | Point `/blog/how-to-check-law-firm-visible-on-chatgpt` and `/blog/llm-visibility-audit-checklist` at it | The four-layer model; a diagnostic checklist; one dated observation from §4.6, once it exists |
| 2 | "how to get cited in AI Overviews", "AI Overview sources B2B" | TOFU | `/insights/how-b2b-sites-get-cited-in-ai-overviews` | `/improve-ai-search-visibility` (link to it) | Google's own published guidance, cited and dated. Seer's CTR finding, attributed to Seer. **The title promises nothing** |
| 3 | "AI SEO vs GEO", "GEO vs SEO" | TOFU, high extractability | `/insights/ai-seo-vs-geo` | `/services/ai-seo` §4.1 block (the guide is the long form) | The four-layer definitions table |
| 4 | "GEO agency for SaaS", "AI SEO agency for B2B SaaS" | BOFU | **Decision O8.** Iris advises against a generic SaaS page (`01` §C.4). Recommended: the cybersecurity and GRC SaaS cohort hub (`01` cohort 4) as the SaaS landing page, which also clears Marcus D3 | `/insights/b2b-saas-growth-playbook` | Dated regulatory facts (NIS2, DORA, CMMC) per pass 2 |
| 5 | "AI SEO agency for manufacturers", "manufacturing SEO agency" | BOFU | the `05.03` industrial automation cohort hub (Iris cohort 7) | Legacy `/industries/manufacturing` (Marcus 3C lands there today) | Certification vocabulary; dated facts. The field is occupied, so compete on depth |
| 6 | "how to track brand mentions in ChatGPT" | MOFU | `/insights/how-to-track-ai-brand-mentions` | `/growth/services/ai-search/ai-visibility-monitoring` | Scriblr method with **illustrative** screens (ADR-0006) |
| 7 | "how much does GEO cost", "AI SEO pricing" | MOFU | `/insights/what-drives-the-cost-of-a-geo-retainer` | `/pricing` | **No prices.** Explain the scope drivers (prompts tracked, locations, assets), consistent with the 2026-10-03 rule. Q12 tests what assistants cite here |
| 8 | "white label GEO", "white label AI SEO for agencies" | BOFU, agency principal | the `02.13` cohort page (Iris cohort 8), voice per `CLAUDE.md` §2 | must not target the five head terms | Method and tooling. Ruth-gated. Clears Marcus D4 |

**Order:** 1, 3 and 2 first. They need no client evidence, no compliance reviewer and no cohort
authoring. 4, 5 and 8 follow their cohorts in §7.

---

## 6. Digital PR and list placement

**Rules.**

- **No paid placement presented as a ranking** (`guardrails.md`; prior doc §7.7).
- **No outreach before the entity strings (§4.2) are live.** Otherwise each placement multiplies the
  contradiction.
- **The pitch is the §4.6 report**, not the agency.

| Target type | Targets | Status | Owner |
|---|---|---|---|
| GEO agency listicles for B2B | pepper.inc "Best GEO Agencies for B2B SaaS (2026 Shortlist)", therankmasters.com, saffronedge.com, silverbackstrategies.com, xpanddigital.io, rankai.ai | Seen in search results 2026-10-06, **not opened**. `[NEEDS DATA: for each: inclusion criteria, pay-to-play, self-ranked or not]`. Pitch only those with published criteria and no fee | Iris (verify), Rafael (drafts), operator (sends) |
| Open contribution platforms | AVIXA Xchange carries user-posted GEO agency lists | A contributed post that ranks ourselves is the self-ranking pattern. **Contribute the methodology, not a list** | Theo |
| Agency directories | Clutch, DesignRush, GoodFirms, Sortlist, The Manifest | Profile strings per §4.2. Reviews must come from real clients. The B2B record is under NDA, which limits this | operator |
| Application-based awards with judged categories | Search award programmes with published criteria | `[NEEDS DATA: programme names, windows and fees, verified]`. Calendar them; a missed window costs a year | Iris |
| Trade press for the TIC report | Environmental lab and testing trade outlets in `b2b-offpage-authority.md` §3.19 | Only after the §4.6 report exists | Rafael, Theo |
| Partnerships | Agency networks and M&A advisors (`CLAUDE.md` §3, channels 2 and 3) | Iris `01` cohort 5 serves both prospect and partner | Rafael |

---

## 7. Which priority-A cohorts to publish first

**What the data allows.** GSC shows **no impressions for any ICP cohort, because none is live** [O, G].
The only non-brand query with an ICP-adjacent shape is "ai seo massachusetts" (position 13.2, 54
impressions [G]). It came through a legacy location page, not a cohort. So the order cannot come from
impressions. It comes from three tests:

1. Is the field empty?
2. Is there a record we can point to?
3. Is a reviewed body already built?

I concur with Iris's `01` §C.2 order, with one change at the front:

| Order | Cohort | Why now | Blocked by |
|---|---|---|---|
| **0** | **TIC wave 1, as built** (8 pages, reviewed 2026-09-29) | Zero authoring cost. It is the only reviewed ICP content in the repo, and it 404s in production | item 1 (deploy) |
| 1 | `04.05` Commercial insurance carriers and distribution | Uncontested; 6 named diagnostic programmes | `OPERATOR-DECISIONS` #7 (compliance reviewer), #8 (client names) |
| 2 | `19.11` Product testing and certification labs (TIC, continued) | Vacant; the pattern has passed review | a reviewer |
| 3 | `09.02` Managed security services | White-label delivery adjacency | a reviewer |
| 4 | `01.05.04` Cybersecurity SaaS, GRC, narrow | The operator's SaaS priority, defensibly narrowed. Doubles as the SaaS BOFU page (§5 #4) | a reviewer; decision O8 |
| 5 to 8 | `02.06`, `06.08`, `05.03`, `02.13` | as Iris | as Iris |

**Re-rank rule.** Once wave 1 has been live long enough to show impressions, re-order 2 to 8 by indexed
ratio and impressions per published cohort. `CLAUDE.md` §7's expansion rule then governs later waves.
I give no date for that point.

---

## 8. Reporting: ranking and citation, never merged

### 8.1 Ranking (Google classic search)

- Average position and CTR for the 18 priority URLs, from the deploy date
- Brand queries: "qognition agency", "qognition", "qognitionagency.com"
- Indexed ÷ submitted per child sitemap (§2.3)
- Impressions on the 8 TIC URLs and on each later cohort
- Organic landing pages carrying `booking_widget_view`, `contact_submitted` and (once Marcus's §1.4
  ships) `walkthrough_booked`, in GA4

### 8.2 Citation (AI assistants, AI Overviews and AI Mode)

- The §4.7 set: monthly, by engine, cited or not, which URL, what was said
- Q01 and Q02 entity resolution, reported on its own line
- AI-referrer sessions in GA4 (`chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, `claude.ai`) `[NEEDS DATA: GA4 read]`

A #3 ranking for a query does not mean the page is cited for the matching prompt. A client who reads the
first as the second makes bad budget decisions.

---

## 9. Implemented today, verification and rollback

| What | Verified | Rollback |
|---|---|---|
| Titles, descriptions, H1s (§3) | Dev render of all 18 priority URLs: one H1 each, expected title and description. `tsc --noEmit` clean. `audit-headings` passes | `git checkout lib/seo.ts 'app/services/[service]/page.tsx' app/locations/ProgrammaticLocationView.tsx app/services/page.tsx app/free-ai-audit/page.tsx app/case-studies/page.tsx` |
| Schema (§4.3) | Dev render: one `Organization` and one `WebSite` per page, `@id` linked; `Service.provider` references the `@id` | `git checkout lib/schema.ts app/layout.tsx 'app/locations/[location]/page.tsx' 'app/locations/[location]/[service]/page.tsx'` |
| llms.txt (§4.4) | `/llms-full.txt` rendered from the same builder blocks, with no em dashes. `/llms.txt` 500s in `next dev` only, from the pre-existing public-file conflict (§2.5) | `git checkout lib/llms.ts` |
| `Link:` header → `/llms.txt` | Dev response header confirmed | `git checkout proxy.ts`. Note that file also holds the other developer's preview change, so revert the one string, not the file |
| Static llms files removed, `/llm.txt` 308 → `/llms.txt`, gate added (2026-10-07) | `scripts/check-funnel.cjs` passes. Negative tests, each restored afterwards, failed as intended: `public/llms.txt` present; `/locations/dubai` dropped from `lib/llms.ts`; a `$` added | Delete the `/llm.txt` entry in `next.config.mjs`, delete section 5 of `scripts/check-funnel.cjs`, and restore the two files from the scratchpad copies |
| All 15 gates | 14 pass. `check-niche-journeys` fails on one preserved-asset hash, `app/growth.css`, which the other developer is editing for the sticky header. No file I touched is in that baseline | n/a |

**Not changed:** no URL, redirect, canonical target, robots directive, hreflang, sitemap membership or
noindex. Every recommendation in this document that would change one of those (§2.3 step 2, §2.5,
§2.6 step 2) names its rollback where it is made.

---

## 10. Decisions for the operator

| # | Decision | My recommendation |
|---|---|---|
| O1 | Approve the preview, then production, for this branch (§2.1) | Yes. It is the largest single search lever available this fortnight |
| O2 | Approve the one-sentence entity description (§4.2) | As written, or edit once and freeze it |
| O3 | Remove `programmatic` and `directory` from the sitemap index (§2.3 step 2) | Yes, **after** the GSC pages export confirms negligible clicks. Not a noindex. Rollback named |
| O4 | `/growth/services/*` versus `/services/*` as the canonical service tree (§2.6) | `/services/*`. Links now; canonicals only after data |
| O5 | `/free-seo-audit` stays a 308 to `/free-ai-audit`, with "Free … SEO … Audit" in the destination title (§3.1 row 12) | Keep the redirect. Confirm the audit is free at request, so the page body can say so. Otherwise drop "Free" from the title |
| O6 | Which market list is canonical: 14 in `CLAUDE.md` §2, or 17 on `/growth/markets` | Pick one before `areaServed` goes into schema |
| O7 | Case-study framing. `CLAUDE.md` §2 (2026-09-29) says "45 named clients … lead with the programme count". The branch now labels each case study "an illustrative planning scenario … does not establish a client relationship". These cannot both be true | Resolve before any copy, meta or deck uses "45". I used the branch's framing in meta because it is the more conservative |
| O8 | A generic "GEO agency for SaaS" page (the brief) versus Iris's advice to publish SaaS narrow only | Narrow: cybersecurity and GRC SaaS as the SaaS BOFU page |
| O9 | Comparison pages: exclude Directive, Powered by Search and The ABM Agency, as white-label prospects (Iris §A.7) | Exclude |
| O10 | The operator's sheet claims in §3.4 | Hold every one until its "what would allow it" column is met |
| O11 | Provider key, spend ceiling and store for the first observation run (§4.6) | Approve. This is the asset that makes the wedge demonstrated rather than claimed |
| O12 | Location-template H1 fallback for the 336 non-priority location pages: HEAD's `Digital Marketing Agency in {city}`, or the uncommitted 2026-10-03 `AI SEO & GEO for B2B companies in {city}` (§3.3 note) | The other developer's or the operator's call, not search's. On search grounds, HEAD's string matches the queries these pages get impressions for |

---

## NEEDS DATA

- GSC pages export: `/locations/*/*/` (programmatic), `/directory/*`, the 18 priority URLs, and the URL
  behind "ai seo massachusetts"
- GSC: query `qognitionagency.com` → Pages, Countries and Search appearance tabs; URL Inspection on `/`
  (Google-selected canonical)
- Google SERP for `qognitionagency.com` and `qognition agency`: is there a "Showing results for" line?
  (Chrome, signed out, US and IN)
- Backlink export, before any URL group is removed from anything (`CLAUDE.md` §7)
- GA4: AI-referrer sessions; organic landing pages with `booking_widget_view` and `contact_submitted`
- Citation checks for all 12 prompts in §4.7. None has been run
- Founding year
- Consent from each `/team` leader to public LinkedIn links and `Person` schema
- Observed status of LinkedIn, Crunchbase, Clutch, DesignRush, Tracxn, G2, GoodFirms, Sortlist, Bing
  Places and GBP profiles: name, description and HQ as currently shown
- For each listicle in §6: inclusion criteria, fees, self-ranked or not, with an access date
- Award programmes with judged categories: names, windows and fees
- Provider key, spend ceiling and durable store for the observation runner (`OPERATOR-DECISIONS` #9, #10)
- Server or firewall logs confirming OAI-SearchBot, PerplexityBot and Claude-SearchBot are not challenged
  at the edge [P §5.1]
- A refresh of `clients/qognition-agency/context.md` to the 2026-10-03 positioning
- For the §3.4 claims: a client, period, reporting source and written permission for each
