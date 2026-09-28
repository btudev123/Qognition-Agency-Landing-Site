# B2B niche page architecture

Author: Nadia (search).
**Revision 2, 2026-09-28.** Supersedes revision 1 of the same date, which assumed 11 meta-verticals
and a wedge premise that has since been falsified.
Branch `b2b-ai-search`.

Status: **recommendation, not approved.** Not reviewed by Ruth (brand-guard). No page publishes off
this document until the open decisions in §0.3 are settled and the wave gate in §8 is green.

Scope: how to publish the B2B niche universe as pages that earn traffic and citations, without
repeating `/locations/*` — 632 pages in the Search Console top 1,000 earning **0.13 clicks each per
quarter** (`docs/seo/gsc-url-group-baseline.md`).

## What changed since revision 1

| # | Change | Where it lands |
|---|---|---|
| 1 | `/industries/*` accepted as the public family. **§0.3 decision 1 is closed.** | §0.3, §1.2 |
| 2 | Taxonomy locked at **15 meta-verticals, 120 sub-niches** in `data/b2b/verticals.ts`, with S/A/B tiers and a per-sub-niche `geoAngle`. Revision 1 assumed 11 and named two verticals that no longer exist as verticals. | §0.2, §1.6, all of §2 and §3 |
| 3 | Wave 0's publication gate **is built** (commit `e483547`). `lib/industryPublication.ts` plus `scripts/check-industry-gate.cjs`. Revision 1's §7.1 prerequisite is done, and what shipped is stronger than what I specified. | §8.1 |
| 4 | **An eighth consumer of `INDUSTRIES` was found**: `/glossary/*`, via a truncated concatenation in `data/seoExpansion.ts`. It silently unpublishes live URLs. It has already fired in production on the domain's best-ranking URL. | New §7, in full |
| 5 | **The ICP widened.** Any B2B firm, $3M–$1B+, 20–10,000+ staff, needing AI SEO **or** SEO **or** PPC. Any one qualifies. The taxonomy is a route to market, not a gate. | §0.1, §1.1 |
| 6 | **PPC is in scope.** Marcus owns the paid structure. This document owns the on-page interaction and the buy-versus-earn call. | New §2.5 |
| 7 | **The wedge premise was falsified.** Gorilla 76 publishes AEO-for-manufacturers with a measurement method close to ours. Anything resting on "nobody proves outside SaaS" is removed. | §0.4, §1.4, §2.2 |

---

## 0. What this is built on

### 0.1 The constraints I am working inside

| Constraint | Source | Effect on the design |
|---|---|---|
| No existing meta title, description, URL or internal link changes | Operator, 2026-09-28 | New URLs only. The shipped gate asserts this mechanically: the sitemap must stay at 4,422 entries. |
| `/industries/[industry]` and `/industries/[industry]/[subIndustry]` templates are kept and reused | Operator | New pages are new rows in a new spine at `data/b2b/`, rendered by the existing route files via one branch (ADR-0007 §2.4). Volume comes from data, not new routes. |
| The taxonomy is locked | Operator, 2026-09-28, `data/b2b/verticals.ts` | I do not argue rows in or out. I do decide **which rows get published, in what order, and which stay at `spine`**, because publication is a rate and an evidence question, not a taxonomy question. |
| **The ICP is the gate, not the taxonomy** | `CLAUDE.md` §2 | A B2B firm in the revenue and staff band qualifies whether or not its industry has a page. Pages exist so that copy can be written to somebody in particular. No page may read as a qualification test. |
| **Any one of AI SEO, SEO or PPC qualifies** | `CLAUDE.md` §2 | No page may require the reader to want AI search before Qognition will talk to them. AI search is what we lead with, not a condition of entry. This changes the conversion block on every page in §4.3. |
| PPC is a real service, priced separately | `CLAUDE.md` §1 | A vertical page may sell paid media alongside organic. It may **not** imply PPC is inside the retainer price. §2.5. |
| Claims discipline | `CLAUDE.md` §4 | No number without a measurement. No promise of rankings or citations. A sampled AI result is an observation on a date. |
| pSEO governance | `CLAUDE.md` §7 | Five expansion tests, a publishing bar, a kill rule. §8 turns that prose into assertions. |
| No industry × service × city pages | `CLAUDE.md` §7, §11 | Killed in §1.4 with reasons, not just compliance. |
| Guardrails | `clients/qognition-agency/guardrails.md` | No "#1", "best", "leading", "guaranteed". No superlative market-position claim without a cited, dated source. This bites hardest on comparison pages (§1.2 Type D) and on any award or ranked-list placement (see `docs/seo/b2b-offpage-authority.md` §5). |

### 0.2 The facts that decide the design

**The domain has almost no organic demand today.** 187 clicks and 73.7K impressions over
26 Jun – 25 Sep 2026; 62 of those clicks are the homepage. 3.89K pages indexed. Adding pages to a
site at this ratio is not neutral — `CLAUDE.md` §7 test 5 (indexable pages ÷ monthly organic
sessions) already fails before a single new page ships. This does not block the build. It does mean
**every wave after Wave 1 is gated on the previous wave's own impressions**, not on the site's.

**There is no client evidence in most of this universe.** `docs/research/b2b-vertical-substance.md`
§2.3 settles it: real reported work exists in cybersecurity services, IT services and cloud, and
partially in B2B SaaS — all white-label under NDA, all self-reported, no verified export. Insurance
has six diagnostic records. **Everywhere else there is nothing.** A manufacturing or logistics page
cannot lean on a case study. It needs a different, honest source of substance. That source is §0.4.

**The taxonomy is locked and it does not generate routes.** `data/b2b/verticals.ts` holds 15
meta-verticals and 120 sub-niches. Every entity defaults to `state: 'spine'`: no page, no sitemap
entry, 404 on request. `publishedEntities()` returns an empty array today and that is the intended
state at rest. Promotion requires a named reviewer, a review date, and the ceiling raised in
`scripts/check-b2b.cjs` in the same commit.

**The `/industries/*` hole is closed.** `lib/industryPublication.ts` freezes the 11 industry hubs and
66 sub-industry pages that were live on 2026-09-28 as an explicit, hand-written allowlist. Revision 1
proposed "publication field, absent means grandfathered". What shipped is stronger, and the comment
in the file says why: a list derived from the data agrees with the data by construction and therefore
gates nothing. The point of the list is that it **can** disagree. Take the win and do not soften it.

**There is a second hole, and it is worse.** `/glossary/*` is an eighth consumer of `INDUSTRIES` that
neither I nor Kyle listed. It silently unpublishes live URLs when unrelated data changes upstream. It
has already fired, in production, on the best-ranking URL the domain had. Full treatment in §7.

**The wedge premise was falsified.** The earlier claim — no AI-search agency has published a case
study outside B2B SaaS — is dead as of `docs/research/b2b-vertical-substance.md`. Gorilla 76
publishes a dedicated AEO-for-manufacturers page with a measurement method close to ours. Thrive
publishes an industrial-equipment GEO case. Ranked lists of manufacturing, legal and
professional-services GEO agencies exist. **Do not restore the sentence anywhere, including in page
copy generated from this architecture.**

What survives every source, and is what §0.4 is built on: nobody publishes a **named client with a
dated, reproducible measurement**. Commercial insurance remains the one genuinely uncontested
vertical, and is the only place the occupancy argument may be led with.

### 0.3 Decisions

**Closed.**

1. ~~`/industries/*` or `/growth/industries/*` as the public family.~~ **Accepted 2026-09-28:
   `/industries/*`,** with a third spine at `data/b2b/` rendered through the existing routes
   (ADR-0007 §2.3). The disjointness rule in §8.2 assertion 17 still stands so the two families never
   both index the same niche. No canonical, redirect or robots change on any existing `/growth` URL
   is proposed or implied.

**Open, and only the operator can settle them.**

2. **Editorial throughput.** The rate is set by named-reviewer capacity, not URL availability.
   `[NEEDS DATA: how many niche pages per month can carry a named reviewer and a real review date]`
   Everything in §1.6 is expressed as a function of that number.
3. **Whether the observation engine is real yet.** The whole architecture rests on first-party prompt
   runs. G.O.L.E.M persists raw answers, cited URLs and model versions (`CLAUDE.md` §1).
   `lib/auditEngine.ts` `runAudit()` does not — it fetches one page plus robots, sitemap and
   `llm.txt` and regex-scores it. `docs/OPERATOR-DECISIONS.md` carries this as a blocker.
   **No page may describe a prompt run that was not run.**
4. **The glossary content-model fix** (§7.4). Until it lands, every commit that touches `SERVICES`,
   `INDUSTRIES` or `LOCATIONS` is a commit that can silently unpublish members of the domain's best
   programmatic family. The current mitigation is a frozen snapshot plus an assertion, which makes
   the failure loud but does not remove it.
5. **Whether any paid budget exists for Qognition's own acquisition.** `context.md` records
   "$0/month own marketing spend — organic and manual only". `CLAUDE.md` §3 puts paid last in the
   channel order. §2.5's demand-probe recommendation needs a number.
   `[NEEDS DATA: monthly paid budget available for Qognition's own site, or confirmation it is zero]`
6. **Whether new rows may use a sidebar variant** that omits `/locations`, `/resources` and
   `/directory` (§5.2).

### 0.4 The one thing that makes this work

Every page in this family must carry something that cannot be produced by substituting a niche name
into a template. On this site, in these verticals, there is exactly one such thing available at scale
and it is already owned:

> **The observed AI answer landscape for that niche, on a date.** Run the niche's real buyer prompts
> across ChatGPT, Perplexity, Gemini and AI Overviews. Record which vendors were named, which URLs
> were cited, and what the cited pages had in common. Store the raw answers. Publish the observation
> with the platform, the prompt set and the date.

That block is original first-party data, it differs per niche by construction, it is exactly what
`CLAUDE.md` §4 says an honest AI claim looks like, and it is the reason a model would cite the page
rather than restate consensus. It is also the sales asset: the page shows the buyer the shape of the
answer they are absent from, and the snapshot is the obvious next step.

**What the falsified wedge changes here, and it is not much.** Revision 1 justified this block partly
on being first into non-SaaS verticals. That justification is gone. The block's value was never
occupancy; it is **re-derivability**. Gorilla 76 anonymises by policy. Thrive's case is unnamed and
undated. First Page Sage ranks itself first on its own list. The defensible position is a stored
answer with a model version and a date that a third party could re-run. Competitors can copy the
format in a week. They cannot copy a time series they did not start.

Two consequences for the pages:

- **Never write "nobody else does this."** Write what was run, when, on what, and offer the method.
- **Lead the occupancy argument in commercial insurance only.** Everywhere else, lead with the
  method and the date.

Everything else in this document is scaffolding around that block.

---

## 1. Page architecture

### 1.1 The buyer split that decides every page

`CLAUDE.md` §2: *"Our buyer: owner, CEO, marketing or growth leader. Our client's buyer: procurement,
engineers, IT leaders, finance leaders. Keep these distinct on every page."*

This is not a copy note. It is the architecture, and `data/b2b/verticals.ts` encodes it in its own
header comment.

- **Qognition ranks for queries its own buyer types.** A marketing leader at a machine shop searching
  `seo agency for cnc machine shops` or `why doesn't chatgpt recommend my machine shop`.
- **Qognition documents the queries its client's buyer types.** `Find ISO 9001 and AS9100 certified
  CNC machining suppliers for titanium aerospace parts with 5-axis capability` is asked by a commodity
  manager. Qognition is not a machining supplier. A page that tries to rank for it is lying to the
  model, and will bounce the one visitor it gets.

The `geoAngle` field on each sub-niche is the operator's read of the **Family B** opportunity. It is
the diagnosis sold to the client. It is never a ranking target, and no `geoAngle` string may be used
as an H1, a title tag or a primary query mapping. That is worth an assertion (§8.2, new #18).

**What the widened ICP changes.** The page is written to a vertical; the offer is not restricted to
it. Two rules follow:

1. No page may imply that a firm outside the 15 verticals is not a fit. The disqualifiers are the
   only disqualifiers: pre-revenue, B2C, low-ticket transactional, needs leads this week, wants a
   one-off project, cannot edit their own website, no sales follow-up.
2. No page may imply that AI search is required to work with Qognition. A firm that wants classic SEO
   only, or PPC only, is in the ICP. The conversion block must have a door for them (§4.3).

### 1.2 Page types that earn

| Type | URL pattern | Ceiling | Recommended committed build | What it earns |
|---|---|---:|---:|---|
| **A. Meta-vertical hub** | `/industries/<meta-vertical>` | 15 | **8** (tier S and A only) | Head and mid-tail commercial queries; the crawl hub; the entity anchor for the vertical |
| **B. Sub-niche page** | `/industries/<meta-vertical>/<sub-niche>` | 120 | **75** (tier S and A only) | Mid-tail commercial and problem-aware queries; the citation surface; the bulk of the value |
| **C. Prompt-set library** | `/insights/<vertical>-buyer-prompts` | 15 | **8** | Citation magnet and lead magnet. The literal prompt set, published |
| **D. Comparison** | `/comparisons/<slug>` | — | **~10** | Highest purchase intent on the site. Hand-written only. More important since the wedge was falsified: named competitors now exist |
| **E. Annual observation report** | `/insights/<slug>` | — | **4/year** | External citation and link acquisition. See `docs/seo/b2b-offpage-authority.md` §4 |

**Ceiling 135 pages from the taxonomy. Recommended committed build 101 including C and D.** The
44-page difference is tier B, held at `spine`. I am not arguing the taxonomy down: every row stays in
the file, and §1.6 states the exact condition that releases tier B. I am declining to commit reviewer
capacity to 45 sub-niches in verticals where there is no evidence, no vocabulary depth in Iris's
research, and no demand signal.

Types A and B reuse the existing route files unchanged. C, D and E use existing families.
**No new routes are required for any of this.** That is deliberate:
`components/growth/GrowthPage.tsx` already establishes the pattern that a new page type is a new
`kind` plus a branch, never a new route, and `/industries/*` should hold the same line.

### 1.3 Where depth beats breadth

**One strong page per sub-niche. Never a page per industry × service × buyer.**

The industry × service grid is the location-page failure in a different costume. Concretely:
`/industries/manufacturing-industrial/cnc-machining/ai-seo` and `.../geo` would contain the same
observed prompt run, the same buyer titles, the same standards vocabulary, and differ only in which
of the four layers the copy emphasises. That is a ~15% delta on a 40% uniqueness bar. It also
contradicts the offer: `CLAUDE.md` §1 says all four layers are in every retainer and are **never sold
separately**, so a page selling one layer into one niche is selling something that does not exist.

The widened ICP makes this worse, not better. Now that any one of AI SEO, SEO or PPC qualifies, the
naive move is to build the grid three ways. Do not. The layer pages (`/seo`, `/local-seo`, `/ai-seo`,
`/geo`, `/ppc`) already exist and are the correct home for service depth. Each sub-niche page links to
all five, once each, in one fixed block (§5).

### 1.4 Page types I am recommending against, with reasons

| Rejected | Why |
|---|---|
| industry × service | §1.3. Also `CLAUDE.md` §7 and §11 forbid it. |
| industry × geography | The 0.13 clicks/page evidence is on this domain, not borrowed. Do not re-run the experiment. |
| industry × buyer-role | `/industries/<v>/<n>/for-procurement` targets the client's buyer, not Qognition's. Wrong audience, no conversion path, and it implies Qognition sells to procurement. |
| A page per `geoAngle` | New in this revision, because the field now exists and is tempting. `geoAngle` describes the Family B opportunity. A page built on it is a page built on the client's buyer's query. Same failure as the row above, one field further in. |
| A dated URL per monthly observation | `/industries/x/y/observations/2026-10` creates a thin page per niche per month and splits the signal. The observation lives **on** the sub-niche page; prior months go into a dated changelog block on the same URL. One URL that gets fresher beats twelve that get stale. Freshness is a real signal in AI citation: cited URLs run ~25.7% fresher than organic results ([Ahrefs, 17M citations](https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/)). |
| A glossary URL per niche term | See §7. The family is not junk, but it cannot absorb new terms without a content-model fix, and until that lands **no new glossary term may be added by any mechanism.** |
| Free tools / calculators per niche | `docs/OPERATOR-DECISIONS.md` flags seven existing calculators that output projected numbers with no measurement behind them. Adding more breaches `CLAUDE.md` §4. |
| A "why us vs Gorilla 76" page per vertical | Newly tempting now that named competitors exist. One comparison page per competitor, hand-written, sourced and dated (Type D). Not one per vertical per competitor — that is the grid again, and guardrails forbid unsourced competitive superlatives at any scale. |

### 1.5 The remap from revision 1's eleven

Revision 1 named eleven meta-verticals. Four of them are not verticals in the locked taxonomy. Anyone
carrying revision-1 work forward needs this table, because two of the mappings change the buyer.

| Revision 1 | Locked taxonomy | Note |
|---|---|---|
| Manufacturing and industrial | `manufacturing-industrial` (S, 13) | Direct. |
| B2B SaaS and software | `saas-software` (S, 10) | Direct. |
| Professional and advisory services | `professional-services` (S, 9) | Direct. |
| IT services and MSPs | `it-services` (S, 8) | Direct. |
| Logistics and supply chain | `logistics-supply-chain` (A, 9) | Direct. |
| Healthcare and life sciences B2B | `healthcare-life-sciences` (A, 7) | Direct. |
| Financial services B2B | `financial-services` (A, 7) | Direct. Commercial insurance is a sub-niche here and is the flagship. |
| Construction and built environment | `construction-real-estate` (B, 8) | Direct, plus PropTech and CRE services. |
| Energy and utilities | `energy-utilities` (B, 7) | Direct. |
| Education and training | `education-training` (B, 6) | Direct. |
| **Cybersecurity** | **Dissolved.** → `saas-software/cybersecurity-saas` and `it-services/msp-mssp` | **This changes the buyer.** A CISO buying a SIEM and a CISO buying managed detection are different purchases with different comparison axes. Revision 1's single cybersecurity prompt set must be split, not copied to both. |
| **Testing, inspection and certification** | **Dissolved.** → `manufacturing-industrial/quality-inspection-iso` and `agriculture-food/food-safety-testing` | Notified-body and accreditation vocabulary now lives under manufacturing. The EU MDR notified-body prompt moves to `healthcare-life-sciences/medtech-devices`. |
| **Wholesale and distribution** | **Dissolved into a cross-vertical pattern.** → `manufacturing-industrial/industrial-distributors`, `construction-real-estate/building-materials` and `/hvac-electrical-roofing-distribution`, `hospitality-travel-events/foodservice-distribution`, `media-marketing-creative/print-promotional-distributors` | Distribution is now a pattern across four verticals rather than a vertical. This is the strongest legitimate use of the cross-vertical link cap in §5 rule 4: these five sub-niches share a buyer problem (the distributor is named instead of the principal) and a comparison axis (stock depth, PunchOut, lead time). |
| — | **New, no revision-1 coverage:** `hospitality-travel-events` (B, 6), `agriculture-food` (B, 6), `media-marketing-creative` (B, 6), `government-nonprofit` (B, 6), `emerging-micro-niches` (A, 12) | `emerging-micro-niches` is tier A and is the only tier-A vertical with no Iris research behind it at all. §2.4 and §3.2 treat it accordingly. |

### 1.6 Waves, and the number I would actually publish

**Ceiling 135. Recommended committed build 101.** Not several hundred at once, and not because I am
arguing volume down — because the rate is a resource fact. Each page needs a prompt run (automatable
via G.O.L.E.M), a standards and buyer-title pass by someone who knows the niche, and a named reviewer
who will put their name on a review date. The first is cheap. The third is the ceiling.

```
pages per month = reviewer hours per month ÷ hours per page review
```

`[NEEDS DATA: reviewer hours available per month]` and `[NEEDS DATA: measured hours per page review,
first ten pages]`. At a plausible 15–25 pages/month the committed build lands in **5–8 months**.
Publish the schedule against the measured rate after Wave 1, not against an estimate.

Waves are ordered by **evidence first, then tier, then vocabulary depth.** Not by tier alone. Wave 1
is the only cohort where Qognition has anything reported to stand on, and that is the cohort the
format has to be proved on.

| Wave | Contents | New indexable | Why this order | Gate to enter |
|---|---|---:|---|---|
| **0** — plumbing | **DONE** for `/industries` (commit `e483547`). Outstanding: the `data/b2b/` spine wired to the templates, `scripts/check-b2b.cjs`, the observation store, the first prompt runs, **and the glossary content-model fix (§7.4)**. Zero new pages. | 0 | So Wave 1 cannot repeat `/locations`, and cannot silently unpublish `/glossary`. | Decisions 2, 3 and 4 in §0.3 settled |
| **1** — hubs + evidence cohort | 4 tier-S hubs (`saas-software`, `professional-services`, `manufacturing-industrial`, `it-services`) + the 4 sub-niches where reported work exists: `it-services/msp-mssp`, `it-services/cloud-consultancies`, `saas-software/cybersecurity-saas`, `saas-software/vertical-saas` | **8** | These four sub-niches are the only ones that can carry an anonymised scope statement under `CLAUDE.md` §4 rather than an empty proof block. Prove the format where the format is easiest. | §8 gate green |
| **2** — manufacturing in depth | `manufacturing-industrial`, all 13 | **13** | Richest standards vocabulary in Iris's research, and three of the four dated trigger events land here (ISO 9001:2026, FDA QMSR, CMMC). Best off-page fit by a distance. | Wave 1 passes `CLAUDE.md` §7 tests 1–5 |
| **3** — professional services | `professional-services`, all 9 | **9** | Referral market being disintermediated by assistants; queries are non-branded and event-shaped. Iris rates AI search as mattering more here than in manufacturing. | Wave 2 passes |
| **4** — tier S complete | `it-services` remaining 6 + `saas-software` remaining 8 | **14** | Finishes tier S: 4 hubs + 40 sub-niches. | Wave 3 passes |
| **5** — financial services, flagship | 4 tier-A hubs + `financial-services` all 7, including `commercial-insurance` | **11** | Commercial insurance is the one uncontested vertical and the only one where the occupancy argument may be led with. **Blocked on `OPERATOR-DECISIONS` #7 (named compliance reviewer) and #8 (client-name use).** If those do not clear, publish the other 6 and hold insurance. | Wave 4 passes **and** #7 cleared |
| **6** — logistics + healthcare | `logistics-supply-chain` 9 + `healthcare-life-sciences` 7 | **16** | Healthcare needs the same compliance-reviewer treatment as insurance. Do not ship it before #7 has a precedent. | Wave 5 passes |
| **7** — emerging | `emerging-micro-niches` all 12 | **12** | Tier A, but no research behind it and no vocabulary depth. It goes last within tier A because every page will be carried entirely by the observation block. | Wave 6 passes |
| **Tier B** — 7 hubs + 45 sub-niches | **Held at `spine`.** Release condition below. | 0 | | See below |
| **Continuous** | 8 prompt libraries, ~10 comparisons, 4 annual reports, monthly re-runs on every published page | — | External citation, link acquisition, freshness | — |

Running total through Wave 7: **8 hubs + 75 sub-niches = 83**, plus 8 libraries and ~10 comparisons.

**The tier B release condition, stated so it is not a matter of taste.** A tier B vertical leaves
`spine` when **either**:

- an inbound qualified lead from that vertical has reached a walkthrough (one is enough — a real
  buyer beats a demand estimate), **or**
- a paid demand probe (§2.5) bought clicks at a cost per qualified lead the operator accepts, over a
  minimum two-week window with a stated budget.

Both are measurements. Neither is a volume estimate. Until one of them exists, a tier B vertical gets
**zero pages**, not a hub. A childless hub is a thin page with a link block, which is the thing this
whole architecture exists to avoid.

A wave does not begin because the previous one shipped. It begins because the previous one's cohort
passed the five tests in `CLAUDE.md` §7, recorded in a committed file with a pull date (§8.3). If the
file is stale, the build fails and nothing new publishes. That is the whole point.

---
## 2. Keyword mapping per tier

### 2.1 Read this first

**No search volume, difficulty or traffic figure appears below.** There is no keyword export in this
repo — I checked `data/` again on this revision and there is still none — and no connected Ahrefs or
Semrush source. `[NEEDS DATA: keyword export with volume and difficulty for the strings in §2.4, US
market, Australia secondary]` Until that exists, "genuine" and "vanity" below are judgements from
query shape and buyer intent, and are labelled as such.

**Every string below is Universe A — what Qognition's own buyer types.** Universe B (what the
client's buyer asks an assistant) is §3, and is documentation, never a ranking target. Mixing the two
is the single most likely way this build fails, and `data/b2b/verticals.ts` now has a `geoAngle`
field on 20 sub-niches that reads exactly like a keyword and is not one.

**Targeting a superlative query is not making a superlative claim.** `best industrial seo agencies`
is a legitimate mid-tail target. The page that serves it may not call Qognition the best of anything
without a cited, dated source (`guardrails.md`). Those two sentences have to both be true on the same
page, and the way they are both true is that the page ranks the *criteria*, not the vendors.

### 2.2 Which tiers are real

| Tier | Commercial reality | Verdict |
|---|---|---|
| **Head** — `industrial marketing agency`, `saas marketing agency` | Contested by generalist agencies with a decade of links. Qognition has 187 clicks a quarter. Now also contested by named AI-search entrants (Gorilla 76, Thrive, First Page Sage, RevenueZen). | **Vanity at this domain authority.** Target it on the hub page because the hub needs a head term, but do not fund content against it and do not report on it. Buy it instead if it is worth having (§2.5). |
| **Mid-tail** — `seo agency for cnc machine shops`, `ai search visibility for mdr providers` | Thin volume, high qualification. The person typing this has the problem and a budget line. | **Genuine.** This is the tier the whole build is aimed at. |
| **Comparison** — `best industrial seo agencies 2026`, `gorilla 76 alternative` | Real intent, and assistants lean on comparison and listicle pages when asked to shortlist vendors. Named-competitor comparisons only became available when the wedge was falsified. | **Genuine but small.** Hand-written pages only, ~10 total, every claim sourced and dated, Ruth gates each one. |
| **Problem-aware** — `chatgpt recommends my competitor not me` | Almost no measurable volume in classic keyword tools, and disproportionate value: it is the exact sentence the offer answers, and it is the sentence a person types into an assistant. | **Genuine, and under-served.** This is the tier most likely to earn a citation rather than a click. Report it under citation, not ranking. |
| **Purchase** — `ai search visibility agency pricing`, `geo retainer cost` | Highest intent on the site. `/pricing` publishes no prices (`CLAUDE.md` §5), which caps how well these can be served. | **Genuine, partially blocked.** Unblocked by `OPERATOR-DECISIONS` #5. |
| **PPC-service** — `b2b ppc agency for manufacturers`, `linkedin ads agency for saas` | **New in this revision.** PPC now qualifies a prospect on its own. These are commercial-intent strings Qognition has never targeted because PPC was treated as a footnote. | **Genuine and currently unserved.** One `/ppc` layer page carries the head; the sub-niche pages carry the vertical modifier in the same block as the organic layers. No separate PPC page per niche. |
| **Informational head** — `what is generative engine optimization`, `ai seo statistics` | This is the 50,978-impressions-80-clicks signature already on this domain. | **Vanity. Do not build this tier into the niche family at all.** It belongs in `/insights`, funded by original data, or nowhere. |

### 2.3 How tiers map to page types

| Tier | Page that carries it | H1 shape |
|---|---|---|
| Head | Hub (Type A) only | `AI search visibility for <vertical>` |
| Mid-tail | Sub-niche (Type B) | `<sub-niche>: what buyers ask AI, and who gets named` |
| Comparison | Type D only | Written, never generated. Sourced and dated |
| Problem-aware | Sub-niche page's opening block, in the buyer's own sentence | — |
| Purchase | `/pricing` and the hub's conversion block. Never a per-niche pricing page | — |
| PPC-service | `/ppc` for the head; one line in the sub-niche's fixed service block for the vertical modifier | — |
| Informational head | Not in this family | — |

One page per sub-niche carries mid-tail, problem-aware, PPC-modifier and the conversion. That is the
whole reason a single deep page beats a grid.

### 2.4 Tiers across all 15 meta-verticals

Strings are lowercase as typed. Tier key: **H** head · **M** mid-tail · **C** comparison ·
**P** problem-aware · **$** purchase · **A** ads / PPC-service.
Verticals are grouped by demand tier as locked in `data/b2b/verticals.ts`.

---

#### TIER S

**`saas-software` — SaaS and Software** (10 sub-niches)
- H `b2b saas seo agency` · `saas marketing agency` · `geo agency for saas`
- M `geo agency for b2b saas` · `ai search visibility for vertical saas` · `seo agency for developer tools` · `ai search agency for mlops vendors` · `seo for fintech saas` · `ai visibility for grc software` · `marketing agency for shopify app developers`
- C `best b2b saas seo agencies` · `geo agency vs ai visibility platform` · `profound alternative for saas` (see vanity note)
- P `chatgpt recommends my competitor not me` · `our g2 profile outranks our own website` · `we're not in chatgpt's shortlist for our category` · `our category page ranks but ai names someone else`
- $ `ai search visibility agency pricing` · `geo retainer cost b2b saas`
- A `b2b saas ppc agency` · `google ads agency for saas` · `linkedin ads agency for b2b software`
- **Flagged vanity:** `profound vs peec ai`, `ai visibility tracking tools compared`. High intent for *tool buyers*, who are not the ICP. Attracting them costs money and produces no walkthroughs.

**`professional-services` — Professional and Business Services** (9)
- H `marketing agency for accounting firms` · `law firm seo agency` · `seo for consulting firms`
- M `ai search visibility for cpa firms` · `marketing for fractional cfo firms` · `seo agency for transfer pricing advisors` · `marketing agency for corporate law boutiques` · `seo for rpo and executive search firms` · `ai search for eor and peo providers` · `marketing agency for translation companies`
- C `best professional services marketing agencies` · `legal marketing agency vs in-house`
- P `chatgpt recommends the big four not our firm` · `clients ask ai for a specialist and we're not named` · `our partners' expertise isn't visible online` · `referrals dried up and we have no inbound`
- $ `professional services marketing retainer cost` · `cpa firm marketing agency pricing`
- A `ppc agency for law firms` · `google ads for accounting firms` · `linkedin ads for consulting firms`

**`manufacturing-industrial` — Manufacturing and Industrial** (13)
- H `industrial marketing agency` · `manufacturing marketing agency` · `seo for manufacturers`
- M `seo agency for cnc machine shops` · `b2b seo for contract manufacturers` · `digital marketing for aerospace suppliers` · `ai search optimization for industrial manufacturers` · `marketing agency for packaging machinery manufacturers` · `seo for injection moulding companies` · `marketing for industrial automation integrators` · `seo for specialty chemical suppliers` · `marketing agency for industrial distributors`
- C `best industrial seo agencies` · `thomasnet alternative for lead generation` · `industrial marketing agency vs in house marketing manager` · `gorilla 76 alternative`
- P `why doesn't chatgpt recommend my machine shop` · `we only get rfqs from thomasnet` · `our website doesn't rank for our own part numbers` · `buyers find our distributor instead of us`
- $ `industrial seo agency pricing` · `manufacturing marketing retainer cost`
- A `google ads for manufacturers` · `b2b ppc agency for industrial companies`

**`it-services` — Technology and IT Services** (8)
- H `msp marketing agency` · `it services marketing agency`
- M `seo agency for msps` · `ai search visibility for microsoft partners` · `marketing for salesforce consultancies` · `seo for netsuite implementation partners` · `marketing agency for aws consulting partners` · `seo for data centre and colocation providers` · `marketing agency for ucaas providers` · `seo for ai implementation consultancies`
- C `best msp marketing agencies` · `msp lead generation vs seo` · `channel co-marketing vs own demand`
- P `chatgpt lists the national msps not us` · `our microsoft partner badge doesn't generate leads` · `we win on referral and nothing else`
- $ `msp marketing retainer pricing`
- A `google ads for msps` · `ppc agency for it services`
- **Note:** `msp-mssp` absorbs revision 1's cybersecurity *services* strings. `seo agency for mssps`, `ai search visibility for mdr providers`, `marketing agency for penetration testing firms`, `which mssps support cmmc level 2` all live here, **not** under SaaS.

---

#### TIER A

**`financial-services` — Financial Services** (7) · flagship sub-niche `commercial-insurance`
- H `commercial insurance marketing agency` · `fintech marketing agency`
- M `marketing agency for commercial lenders` · `ai search visibility for payment providers` · `seo for regtech vendors` · `marketing for wholesale insurance brokers` · `seo for equipment finance companies` · `marketing agency for fund administrators` · `ai search for crypto custody providers`
- C `best insurance marketing agencies`
- P `brokers find the aggregators not us` · `chatgpt names the carrier not the agency` · `our submissions come from three brokers and nowhere else`
- $ `insurance marketing agency pricing`
- A `google ads for commercial insurance brokers` · `linkedin ads for fintech`
- **Constraint:** state advertising rules apply and `OPERATOR-DECISIONS` #7 is unresolved. No page in this vertical publishes without a named compliance reviewer.

**`healthcare-life-sciences` — Healthcare and Life Sciences** (7)
- H `life sciences marketing agency` · `medical device marketing agency`
- M `seo for contract research organisations` · `ai search visibility for cdmos` · `marketing agency for revenue cycle management companies` · `seo for health it vendors` · `marketing for dental service organisations` · `seo for medical billing companies`
- C `best life sciences marketing agencies`
- P `sponsors don't find our cdmo` · `our capabilities page doesn't match how sponsors search` · `klas ranks us but buyers never reach the site`
- $ `life sciences marketing agency pricing`
- A `ppc agency for medical device companies`
- **Constraint:** treat as regulated for review purposes even though Qognition is not. Same named-reviewer requirement as insurance.

**`logistics-supply-chain` — Logistics, Supply Chain and Transportation** (9)
- H `logistics marketing agency` · `3pl marketing agency`
- M `seo for freight forwarders` · `ai search visibility for 3pls` · `marketing agency for customs brokers` · `seo for cold chain logistics providers` · `marketing for tms and wms vendors` · `seo for fleet telematics providers` · `marketing agency for reverse logistics providers`
- C `best logistics marketing agencies` · `freight marketplace vs direct shipper acquisition`
- P `shippers find the marketplaces not us` · `our 3pl never appears in ai shortlists` · `we lose rfps we were never invited to`
- $ `3pl marketing agency cost`
- A `google ads for 3pl fulfilment` · `ppc agency for freight brokers`

**`emerging-micro-niches` — Emerging and Micro-Niches** (12)
- H none worth naming. The categories do not have head terms yet, which is the point of the tier.
- M `marketing agency for ai implementation firms` · `seo for fractional executive marketplaces` · `marketing agency for nearshore bpo` · `ai search visibility for robotics as a service` · `marketing for cannabis b2b suppliers` · `seo for water treatment technology companies` · `marketing agency for private equity portfolio services`
- C — nothing yet. Comparison pages need an established set to compare.
- P `nobody searches for what we do yet` · `we have to explain the category before we can sell` · `chatgpt describes our category wrong`
- $ — none.
- A `google ads for ai consulting firms` (the only sub-niche here with reliable ad inventory)
- **Judgement, and it is the honest one:** this vertical's value is **category definition, not query capture.** The page that wins here is the one that defines the vocabulary an assistant then reuses. That is a citation play with essentially no ranking component, and it must be reported that way. Several sub-niches here have structural off-page problems — cannabis cannot buy Google Ads, space and defence carry ITAR constraints, quantum has almost no trade press. See `docs/seo/b2b-offpage-authority.md` §3.15.

---

#### TIER B — probe only, no pages until §1.6's release condition is met

Strings are listed so a paid demand probe can be built (§2.5). They are **not** a content plan.

**`construction-real-estate`** (8) — M `marketing agency for commercial general contractors` · `seo for proptech companies` · `marketing for architecture and engineering firms` · `seo for building materials distributors` · P `we only get work through the same three developers` · A `google ads for commercial contractors`

**`energy-utilities`** (7) — M `marketing agency for commercial solar epc` · `seo for ev charging providers` · `marketing for energy procurement consultants` · `seo for carbon accounting software` · P `incentive changes killed our inbound` · A `google ads for commercial solar`

**`education-training`** (6) — M `marketing agency for lms vendors` · `seo for compliance training providers` · `marketing for edtech companies` · P `procurement shortlists us out before we hear about it` · A `google ads for corporate training providers`

**`hospitality-travel-events`** (6) — M `marketing agency for hotel tech` · `seo for corporate travel management companies` · `marketing for event tech platforms` · P `hotel tech report ranks us and nothing happens` · A `google ads for foodservice distributors`

**`agriculture-food`** (6) — M `marketing agency for agtech` · `seo for food co-packers` · `marketing for food safety testing labs` · P `buyers ask for sqf certified suppliers and we're not listed` · A `google ads for food ingredient suppliers`

**`media-marketing-creative`** (6) — M `marketing agency for b2b publishers` · `seo for promotional products distributors` · `white label seo for agencies` · P `we sell marketing and can't market ourselves` · A — none recommended; this vertical will click your ads and not buy.

**`government-nonprofit`** (6) — M `marketing agency for govtech vendors` · `seo for defence suppliers` · `marketing for nonprofit tech` · P `we win on the schedule and never on discovery` · A — **do not buy.** Public-sector procurement does not start in a search ad. The off-page registries in `docs/seo/b2b-offpage-authority.md` §3.14 are the entire play here.

### 2.5 PPC and organic on the same page

Marcus owns campaign structure, bidding, match types and budget. This section owns three things only:
what happens on the page, what the cannibalisation risk actually is, and which of the strings above
are better bought than earned.

**The cannibalisation question is usually asked wrong.** Cannibalisation, in the sense that matters
here, is *two of your own indexable URLs competing for one query*. Paid and organic appearing on the
same SERP is not that. Whether the paid click was incremental to the organic click is a real question
and it is **not answerable from platform reporting** — it needs a holdout or a pause test, and that is
Marcus's design, not mine. Do not let anyone report "paid and organic both grew" as evidence of
anything.

**The risk that is real, and is mine.** A page built to be cited and a page built to convert paid
traffic are different documents:

| | Page built to be cited | Page built for paid traffic |
|---|---|---|
| Length | ≥900 words of prose, tables, standards vocabulary | As short as converts |
| Outbound links | Many, to primary sources. Required by §8.2 assertion 5 | Ideally none |
| Internal links | 3–5 siblings, 5 service links, hub, prompt library | One CTA |
| Opening | Answer-first, self-contained claim | Offer-first, message-matched to the ad |
| Success | A stored answer citing the URL | A form fill |

Trying to make one URL do both produces a page that is bad at both. **The resolution is a separate
paid destination, not a compromised organic page.**

**Recommendation.** Paid traffic lands on `/lp/<campaign>` pages that are `noindex, follow` and are
excluded from every sitemap generator. The `/industries/*` page stays the public, indexable,
citable artefact and is never used as an ad destination.

> **Rollback, named as required.** The `noindex` is one `robots` value in the `/lp/*` route's
> `generateMetadata`, plus one exclusion predicate in `lib/sitemap.ts`. Reverting the commit restores
> default indexing. **No existing URL's robots directive, canonical or redirect is touched**, so
> there is nothing to undo at Google's end. If `/lp/*` pages have already been live and indexed when
> a revert happens, the correct recovery is to re-apply `noindex` and wait for re-crawl, never to
> 410 them. `scripts/check-publication.cjs` asserts every baseline URL stays discoverable and `/lp/*`
> is not in the baseline, so the exclusion cannot break that assertion.

**Which of §2.4's strings are better bought than earned.**

| Tier | Buy or earn | Reasoning |
|---|---|---|
| **Head** | **Buy, if at all.** | Contested by agencies with a decade of links and now by named AI-search entrants. Earning `industrial marketing agency` on a domain with 187 clicks a quarter is a multi-year project with no interim value. Buying it is instant, expensive and poorly qualified. My recommendation is neither: skip head terms entirely until a wave cohort has proved it can rank mid-tail. Put it on the hub for structural reasons and ignore it in reporting. |
| **Mid-tail** | **Earn.** | This is where the pages are and where the qualification is. Also thin enough that ad inventory is unreliable — the exact-match volumes will be too low to hold a campaign together and broad match will spend the budget on the head term you decided to skip. |
| **Comparison** | **Earn, and do not bid on competitor brand names without a decision.** | Competitor-brand bidding is legal in the US in most circumstances and is a real option now that named competitors exist. It also invites retaliation, raises everyone's CPCs, and sits close enough to the guardrails' superlative rules that Ruth should see the ad copy before it runs. This is an operator decision with Marcus and Ruth, not a default. |
| **Problem-aware** | **Earn. Cannot usefully be bought.** | These are sentences, not keywords. There is no reliable exact-match inventory for `chatgpt recommends my competitor not me`, and broad match against it will serve on `chatgpt` and burn the budget in a day. It is also the tier most likely to produce a citation rather than a click, and you cannot buy a citation. |
| **Purchase** | **Buy.** | Highest intent, smallest set, and the organic route is blocked anyway because `/pricing` publishes no prices (`OPERATOR-DECISIONS` #5). A paid landing page can answer a pricing query honestly today; an organic page cannot until #5 clears. |
| **PPC-service** | **Buy and earn.** | A firm searching `google ads agency for manufacturers` is in the ICP on the PPC door alone. Buying it is the fastest proof that door exists. Earning it belongs on `/ppc`, not on a per-niche page. |

**The use of paid that matters most here is not acquisition. It is the demand probe.** A tier B
vertical currently has no evidence of anything. Writing eight pages into it costs weeks of reviewer
capacity — the scarcest resource in §1.6. A two-week paid test against the tier B strings in §2.4
costs money instead of capacity and returns a measurement: clicks at a cost, leads at a cost, or
neither. That measurement is the tier B release condition in §1.6, and it is the single highest-value
thing paid budget can do for this architecture.

It requires a budget. `[NEEDS DATA: monthly paid budget available for Qognition's own site]`
`context.md` records $0 and `CLAUDE.md` §3 puts paid last in the channel order, so **today this
recommendation is unfunded and tier B simply stays at `spine`.** That is an acceptable resting state
and I would rather state it than design around a budget nobody has approved.

**What a sub-niche page may and may not say about PPC.** It may say Qognition runs paid media for
firms in this vertical, and link to `/ppc` once from the fixed service block. It may not state or
imply that paid media is included in the retainer price, because it is priced as a percentage of ad
spend with a monthly minimum (`CLAUDE.md` §1). It may not publish that percentage or that minimum
until `OPERATOR-DECISIONS` #6 lands.

---
## 3. The GEO layer

### 3.1 Two prompt families, and which one a page can win

**Family B — the client's buyer.** Long, qualified by size, geography, certification and application.
Asked before a vendor is contacted, often before a Google search happens at all. Qognition can never
be the cited answer to these, because Qognition does not make pumps. **Qognition runs them, records
the answers, and publishes the observation.** They are the raw material of the page, not its target.
The `geoAngle` field in `data/b2b/verticals.ts` is a one-line summary of the Family B opportunity for
that sub-niche, written by the operator. It is a sales diagnosis. It is not a query.

**Family Q — Qognition's own buyer.** Meta questions about visibility in that vertical. These are the
prompts a page in this family can plausibly be cited for, and they are the ones to put in the tracked
prompt set for Qognition's own citation reporting.

Every sub-niche page needs both: Family B as observed data, Family Q as the question the page itself
answers.

**One more line, added in this revision because the ICP widened.** Family Q now has a third shape:
prompts where the asker wants classic SEO or PPC help and has not thought about AI search at all
("how do manufacturers generate leads besides thomasnet"). Those are in the ICP by `CLAUDE.md` §2 and
they are currently absent from the tracked set. Add them. Record the addition and the reason, per
§9.2 — comparability is the whole value of the panel and a silent set change destroys it.

### 3.2 Family B prompts, all 15 meta-verticals

Written in the shape the operator supplied. Each should be run across ChatGPT, Perplexity, Gemini and
Google AI Overviews, with the raw answer, the cited URLs, the model version and the date persisted.

Coverage is deliberately uneven: tier S and A verticals get a publishable panel (the §8.2 minimum is
8 distinct prompts per page, so these are seeds, not the full set); tier B verticals get two, enough
to run a probe and not enough to imply a page is coming.

---

**`saas-software`**
1. "What is the best SOC 2 compliance automation platform for a 60-person company that also needs ISO 27001 and HIPAA, cheaper than Vanta, with a real auditor network?"
2. "Which contract lifecycle management tools integrate natively with Salesforce and support Word redlining for a 200-seat legal team with EU data residency?"
3. "Recommend a warehouse management system for a 3PL running multi-client billing with Shopify and NetSuite integrations and EDI 940/945 support."
4. "Which MLOps platforms support on-prem GPU clusters and model governance documentation for an EU AI Act high-risk classification?"
5. "Find a core banking platform for a US credit union under $2B in assets with FedNow support and a documented Fiserv migration path."
6. "Which dental practice management systems support multi-location DSO reporting and integrate with Weave and Dentrix?"
7. "Best authentication API for a B2B app that needs SCIM provisioning, SAML SSO and a self-hosted option."

**`professional-services`**
1. "Which mid-size US accounting firms specialise in transfer pricing documentation for a manufacturer with entities in Mexico, Germany and Singapore?"
2. "Find a corporate law boutique handling cross-border SaaS M&A under $50M with experience defending earn-out disputes in Delaware."
3. "Who performs R&D tax credit studies for software companies and will defend the claim through an IRS examination?"
4. "Recommend a fractional CFO firm for a $15M ARR SaaS business preparing for a Series B, with ASC 606 revenue recognition experience."
5. "Which employment law firms advise on multi-state remote workforce compliance for a 400-person company, including California and New York?"
6. "Find an EOR that can hire in Brazil, Poland and Vietnam with a documented permanent-establishment position and no minimum headcount."
7. "Which RPO providers run high-volume industrial hiring in the US Southeast with a documented time-to-fill under 25 days?"

**`manufacturing-industrial`**
1. "Find ISO 9001 and AS9100D certified CNC machining suppliers for titanium aerospace parts with 5-axis capability and ITAR registration, US Midwest, lead time under 8 weeks."
2. "Which contract electronics manufacturers handle low-volume high-mix PCBA to IPC-A-610 Class 3 with AS9100, minimum order under 500 units?"
3. "I need an EMS partner in Mexico or the US Southwest for automotive electronics, IATF 16949 certified, with in-house conformal coating and ESD-controlled areas."
4. "Who supplies API 610 centrifugal pumps for sour service meeting NACE MR0175, with API 682 seal plans and a 12-week delivery?"
5. "Compare packaging machinery OEMs for aseptic filling under 200 bottles per minute with FDA and EHEDG compliant designs and US service coverage."
6. "Which precision engineering firms can hold ±5 micron tolerance on Inconel with CMM inspection reports and PPAP documentation?"
7. "Which of my suppliers are CMMC Level 2 ready for a DoD contract with the 48 CFR clause in it?"
8. "Find an ISO 9001 certified injection moulder transitioning to the 2026 revision with medical-grade cleanroom capability."

**`it-services`**
1. "Find a Microsoft Solutions Partner for Modern Work with Copilot deployment experience for a 300-seat professional services firm in Texas."
2. "Which NetSuite implementation partners specialise in multi-entity manufacturing with WIP costing and landed cost tracking?"
3. "Recommend a co-managed IT provider for a 500-person manufacturer needing OT network segmentation and CMMC Level 2 readiness."
4. "Which Salesforce consultancies have done Revenue Cloud implementations with CPQ migration for a usage-based pricing model?"
5. "Compare MDR providers for a 400-employee manufacturer with OT and ICS environments, 24/7 SOC coverage, and a documented MTTD under 15 minutes."
6. "Which MSSPs support CMMC Level 2 readiness for a defense supplier with 300 endpoints and a GCC High tenant?"
7. "Find a CREST-accredited penetration testing firm for a PCI DSS 4.0 assessment of a payments platform, available in Q1, with retest included."
8. "Which colocation providers in the US Midwest offer 20kW-per-rack density with a documented PUE and direct cloud on-ramps?"

**`financial-services`**
1. "Which commercial insurance wholesalers write excess casualty for staffing firms in California with admitted and non-admitted options?"
2. "Find an equipment finance provider for $2M of CNC machinery on a 60-month term for a company with three years trading history."
3. "Recommend a B2B payments provider supporting ACH, virtual cards and NetSuite reconciliation for a distributor with 4,000 invoices a month."
4. "Which RegTech vendors handle transaction monitoring for a state-chartered bank under $10B with FinCEN reporting built in?"
5. "Find an invoice factoring company for a freight brokerage with non-recourse terms and same-day funding."
6. "Which fund administrators service sub-$100M private credit funds with investor portal and ILPA-compliant reporting?"

**`healthcare-life-sciences`**
1. "Find a CDMO for sterile fill-finish of a lyophilised biologic at 50L scale, FDA-inspected with no Form 483 observations in the last three years."
2. "Which CROs run decentralised Phase II rare disease trials under the EU CTR with 21 CFR Part 11 compliant eClinical systems?"
3. "Who provides 510(k) regulatory consulting for a Class II device with software-as-a-medical-device components and EU MDR follow-on?"
4. "Which revenue cycle management vendors handle denials management for a 12-site orthopaedic group on Epic?"
5. "Which contract manufacturers are aligned to the FDA QMSR that took effect in February 2026 and hold ISO 13485?"
6. "Which notified bodies can certify a Class IIb medical device under EU MDR with a lead time under nine months?"

**`logistics-supply-chain`**
1. "Find a 3PL in the US Southeast with FDA-registered food-grade warehousing, a WMS supporting EDI 940/945, and dedicated Shopify fulfilment."
2. "Which pharmaceutical cold chain forwarders hold IATA CEIV Pharma and GDP certification for lanes from Frankfurt to São Paulo?"
3. "Who handles customs brokerage for Section 301 tariff engineering and foreign trade zone management on China-origin electronics?"
4. "Recommend a 4PL that can run control-tower visibility across three existing carriers without replacing our TMS."
5. "Which flatbed carriers are authorised for over-dimensional wind components across the US Midwest with permit management included?"
6. "Which returns and reverse-logistics providers handle electronics refurbishment with R2v3 certification?"

**`emerging-micro-niches`**
1. "Which AI implementation consultancies have delivered production LLM systems in regulated industries with documented evaluation methodology?"
2. "Find a nearshore BPO in Colombia or Mexico for bilingual technical support with SOC 2 and a documented attrition rate."
3. "Which Robotics-as-a-Service providers offer warehouse picking on a per-pick pricing model with no capex?"
4. "Which cannabis testing labs are ISO/IEC 17025 accredited and licensed in both California and Michigan?"
5. "Find a satellite imagery provider with sub-50cm resolution and an API, licensed for commercial redistribution."
6. "Which water treatment technology firms handle PFAS remediation for industrial dischargers under the 2024 EPA limits?"

---

**Tier B — two each, probe only.**

- **`construction-real-estate`** · "Find a commercial general contractor in Denver for a 60,000 sq ft tilt-up warehouse targeting LEED Gold under a GMP contract." · "Which BIM consultants do MEP clash detection in Revit for healthcare projects with OSHPD experience?"
- **`energy-utilities`** · "Find an EPC contractor for a 20MW behind-the-meter solar plus storage project with NERC compliance experience." · "Which EV charging providers handle NEVI-funded corridor sites with Buy America compliant hardware?"
- **`education-training`** · "Which corporate training providers deliver OSHA 30 and lockout/tagout across 12 US manufacturing sites with SCORM LMS delivery?" · "Find an LMS that supports IACET CEU tracking and integrates with Workday Learning."
- **`hospitality-travel-events`** · "Which hotel property management systems support multi-property revenue management with Opera migration and a documented API?" · "Find a corporate travel management company for a 600-person firm with NDC content and duty-of-care tracking."
- **`agriculture-food`** · "Which co-packers run high-acid aseptic beverage lines with SQF certification and minimum runs under 5,000 units?" · "Find a precision agriculture platform with variable-rate prescription export to John Deere Operations Center."
- **`media-marketing-creative`** · "Which promotional products distributors are ASI-registered and can run a 5,000-unit branded apparel programme with on-demand fulfilment?" · "Find a B2B content syndication network with verified intent data and a documented lead rejection process."
- **`government-nonprofit`** · "Which FedRAMP Moderate authorised vendors provide permitting software for a city of 200,000?" · "Find a CMMC Level 2 certified defence supplier registered in SAM.gov with a small-business set-aside designation."

### 3.3 Family Q prompts — what a page in this family can be cited for

These go into the tracked prompt set for Qognition's own citation reporting, re-run monthly into
`clients/qognition-agency/deliverables/geo-citations.md` or its in-repo equivalent. **Appended, never
overwritten.** Same prompts every month, so months are comparable.

**Cross-vertical (run every month regardless of which waves have shipped)**
- "Which agencies do generative engine optimisation for B2B companies?"
- "Is there data on which sources AI assistants cite when asked to recommend B2B vendors?"
- "What certifications should a supplier put on its site so AI assistants can match it to an RFQ?"
- "How do I find out whether ChatGPT recommends my company?"
- "What is the difference between AI SEO and GEO?"
- *(new, from the widened ICP)* "Which agencies do both SEO and Google Ads for B2B companies?"

**Per meta-vertical**

| Vertical | Family Q prompts |
|---|---|
| `saas-software` | "Why does ChatGPT recommend my competitor and not my software?" · "How does a vertical SaaS company get into AI-generated category shortlists?" · "Does having G2 reviews affect whether AI recommends your software?" |
| `professional-services` | "How can a mid-size accounting firm appear in AI answers instead of the Big Four?" · "How do law firms get named when someone asks an assistant for a specialist?" · "How do consulting firms generate inbound leads besides referrals?" |
| `manufacturing-industrial` | "Why doesn't ChatGPT recommend my CNC machine shop when buyers ask for aerospace suppliers?" · "How do manufacturers generate RFQs besides Thomasnet?" · "What should a contract manufacturer put on its site so AI can match it to a capability query?" |
| `it-services` | "How do MSPs get named in AI-generated vendor shortlists?" · "How does a Microsoft partner get found when buyers ask an assistant instead of searching?" · "Why does ChatGPT name the national MSPs and not regional ones?" |
| `financial-services` | "How does a commercial insurance broker appear in AI answers instead of the aggregators?" · "How do fintech vendors get cited by AI assistants?" |
| `healthcare-life-sciences` | "How does a CDMO get found by sponsors using AI search?" · "What do medical device suppliers need on their site for AI assistants to match them to a requirement?" |
| `logistics-supply-chain` | "What do 3PL websites need for AI assistants to include them in shortlists?" · "How do freight forwarders get found before an RFP list is written?" |
| `emerging-micro-niches` | "How does a company market a category that does not have a name yet?" · "How do you get an AI assistant to describe your category correctly?" |
| Tier B | None tracked until the vertical leaves `spine`. Adding them early inflates the panel and dilutes the monthly comparison. |

Note the shape of the last cross-vertical prompt and of the manufacturing set: they are where the two
families meet. A page that documents which certifications appeared in the cited answers is answering
a Family Q question **using** Family B data. That is the citable position, and it is the only one
this family has.

### 3.4 What a page must contain to be the cited answer

Extraction first, then entity, then citation-worthiness. Skipping to the third on a page nothing can
extract from is wasted work.

**Extractable**
- The answer in the first 60 words, self-contained, no pronoun referring to the H1.
- One claim per paragraph. No claim requiring three paragraphs of prior context.
- Real `<h2>`/`<h3>` headings that are the questions, not labels like "Our approach".
- Tabular data in `<table>`. The observed-answer block is tabular by nature: prompt × engine ×
  vendors named × URLs cited × date. Put it in a table.
- Server-rendered HTML. Next.js App Router already satisfies this; do not move any of these blocks
  into a client component behind an interaction.

**Entity-consistent**
- One organisation name, one description, one address, everywhere. `lib/schema.ts` already pins
  address to `data/siteConfig.ts` with the comment that entity resolution depends on it. That work is
  blocked by `OPERATOR-DECISIONS` #1: `/contact` says Mumbai, `/about` and `/team` say Bangalore and
  Sydney, DesignRush and Tracxn say Gurugram. **Publishing 83 new pages on top of a contradicted
  entity weakens every one of them**, and the contradiction is worse than revision 1 knew because it
  now reaches third-party directories, which is off-page territory
  (`docs/seo/b2b-offpage-authority.md` §2). Settle #1 before Wave 2.
- The niche's own entities spelled the way the industry spells them: `AS9100D` not `AS 9100`,
  `IATF 16949` not `TS 16949`, `IATA CEIV Pharma` not `CEIV`, `ISO 9001:2026` not `ISO 9001 2026`.
  A wrong standard name is a competence signal to a human and an entity mismatch to a model.

**Citation-worthy**
- Original data the page owns: the observation block. Nothing else on the page qualifies.
- A named author with credentials, and a named reviewer with a date.
- Dated claims. "We ran 12 prompts across four engines on 14 October 2026" is citable. "AI is changing
  B2B buying" is not.
- Specific numbers from the observation, never from a benchmark.

**What earns nothing** — and I want this on the record because it is what most GEO decks sell: no
schema type causes AI Overview or AI Mode inclusion, and Google says so directly in
[AI Features and Your Website](https://developers.google.com/search/docs/appearance/ai-features).
See §6.

---

## 4. What makes each page genuinely distinct

This is the section that decides whether the build works. A page that could be produced by
substituting a niche name into a template is the failure mode, and the existing templates contain
live examples of it — `app/industries/[industry]/[subIndustry]/page.tsx` renders "Quick summary:
{name} marketing needs industry proof…" and "This page links upward to {industry}, sideways to
services and proof". Those sentences are the template speaking about itself. New rows must not feed
anything of that kind, and §8 bans the strings.

### 4.1 Required blocks, sub-niche page (Type B)

Each block has a mechanical minimum. The minimum is not the target; it is the point below which the
build fails.

| # | Block | Minimum substance | Why it cannot be templated |
|---|---|---|---|
| 1 | **Answer-first opener** | ≤60 words. Names the sub-niche, the buyer role, and the surface where the buyer is absent. | The buyer role differs per niche. |
| 2 | **The buyer, named** | ≥3 real job titles, each with the artefact they actually research. Set must be unique across the family. | A commodity manager at an aerospace prime researches an AS9100 scope certificate. A CISO researches an MDR provider's MTTD claim. These do not interchange. |
| 3 | **Observed AI answers** | ≥8 distinct prompts, ≥3 engines, dated within 90 days, rendered as a table: prompt · engine · vendors named · URLs cited · date. Raw answers stored and re-derivable (`CLAUDE.md` §1, G.O.L.E.M). | This is measurement. It cannot be written. |
| 4 | **What the cited pages had in common** | ≥3 observations drawn from block 3, each pointing at a specific cited URL. | Derived from that niche's actual results. |
| 5 | **Vocabulary and standards** | ≥6 terms, each with its issuing body and what it gates. No term may appear on more than 25% of pages in the family. | The 25% cap is what stops "ISO 9001" being the entire vocabulary of the manufacturing branch, which now has 13 pages rather than 14. |
| 6 | **The comparison axis** | The 3–5 axes buyers in this niche actually compare on, stated as axes, not benefits. | Machining: tolerance, certification scope, capacity, lead time, NPI support. MDR: MTTD/MTTR, coverage hours, telemetry sources, escalation model, contracted SLA. 3PL: network footprint, WMS and EDI capability, SKU profile fit, temperature control, billing model. |
| 7 | **Why this niche loses the AI answer** | One specific failure mechanism, evidenced from block 3. | Manufacturing: directories and marketplaces occupy the cited slots. Distribution: the distributor is named instead of the principal. Professional services: the Big Four are named because they publish. Government: the registry is cited and the vendor is not. Each is a different fix. |
| 8 | **Proof, or the absence of it, stated** | Either a case-study id that resolves in `data/case-studies`, or `clientProof: 'none'` and a rendered sentence saying no client has been published in this niche. | `CLAUDE.md` §11 forbids implying experience because a page exists. **Most of these pages will carry the honesty line**: Iris's evidence map gives real reported work in four sub-niches out of 120. That line is itself a differentiator; nobody else writes it. |
| 9 | **The conversion event** | The free snapshot, with a niche-specific qualifying question, **plus a second door for SEO-only and PPC-only prospects** (new, §1.1). One primary CTA. | The qualifying question differs: "how many of your part numbers appear on your own site?" vs "which certifications are on a page an assistant can read?" |
| 10 | **Named reviewer and review date** | Real person, ISO date, within 180 days. | `CLAUDE.md` §7 requires it. §8 enforces it. |

### 4.2 Uniqueness, measured

- ≥40% unique 5-gram shingles against **every** other published page in the family, not just the
  nearest sibling. `CLAUDE.md` §7 says "closest sibling"; measuring against all is cheap and catches
  the case where three pages are each 45% unique against their neighbour and 90% identical as a set.
  With 75 committed sub-niche pages this matters more than it did at a notional 190, not less —
  manufacturing alone has 13 pages that share a standards vocabulary.
- ≥60% unique against the parent hub.
- ≥900 words of prose excluding navigation and boilerplate. Word count is not quality. It is a floor
  that catches stubs, and I am naming it as that.

### 4.3 The conversion event, per meta-vertical

The event is the same across the family — a booked qualified walkthrough is the North Star
(`CLAUDE.md` §3) — but the offer wording has to fit the sales cycle, and since the ICP widened every
page needs a second door.

| Vertical | Sales cycle reality | Snapshot framing | Second door |
|---|---|---|---|
| `saas-software` | Short, self-serve influenced, category-comparison heavy | "Which competitors are named in your category's prompts" | Paid: category and competitor terms |
| `professional-services` | Referral-dominant, partner-led | "What an assistant says when a client asks for a specialist in your practice area" | Classic SEO: practice-area pages |
| `manufacturing-industrial` | Long, RFQ-driven, engineer-influenced | "Which of your capabilities an assistant can actually read" | Classic SEO: part numbers and capability pages |
| `it-services` | Local and channel-mediated | "Whether the national providers own your local shortlist" | Local SEO + paid: partner-badge terms |
| `financial-services` | Regulated, private research before contact | "Whether your appointments and licences survive an assistant's summary" | Classic SEO, compliance-reviewed |
| `healthcare-life-sciences` | Committee, compliance-gated | "Whether your certifications and inspection history survive an assistant's summary" | Classic SEO, compliance-reviewed |
| `logistics-supply-chain` | RFP cycles, incumbent-heavy | "Whether you appear at all before the RFP list is written" | Paid: lane and service terms |
| `emerging-micro-niches` | Category still forming | "How assistants currently describe your category, and whether you are in it" | Content and PR, not search |

Do not promise a placement, a ranking or a citation in any of these (`CLAUDE.md` §4). Describe what
the snapshot observes, and on what date.

---
## 5. Internal linking model

Rules, written so they can be generated and asserted. Nothing here modifies an existing link.

### 5.1 The rules

1. **Up.** Every sub-niche links to its meta-vertical hub exactly twice: once in the breadcrumb, once
   in the body's first 200 words. Anchor = the hub's name.
2. **Down.** Every hub links to every published child. No pagination, no "show more" behind
   JavaScript, no truncation. A hub that hides children creates orphans. At 13 children
   (`manufacturing-industrial`) this is comfortable; it is the reason the 40-link ceiling in rule 12
   is set where it is.
3. **Sideways, deterministic.** Each sub-niche links to **3–5 siblings**, selected by: shared buyer
   title first, then shared standard, then alphabetical as tiebreak. Same input, same output, every
   build. Never random, never all.
4. **Cross-vertical, capped at 2**, and only where a standard or buyer role is genuinely shared.
   ISO 27001 links `it-services/msp-mssp` ↔ `saas-software/cybersecurity-saas`. IATF 16949 links
   `manufacturing-industrial` ↔ `logistics-supply-chain`. **The distribution cluster identified in
   §1.5 is the clearest legitimate use**: `manufacturing-industrial/industrial-distributors`,
   `construction-real-estate/building-materials`,
   `construction-real-estate/hvac-electrical-roofing-distribution`,
   `hospitality-travel-events/foodservice-distribution` and
   `media-marketing-creative/print-promotional-distributors` share a buyer problem and a comparison
   axis. Since four of those five are tier B and unpublished, the cluster is mostly dormant — which
   is fine, and is a reason not to hard-code it. No cross-link without a shared entity.
5. **Service links are a fixed block.** Every sub-niche links to `/seo`, `/local-seo`, `/ai-seo`,
   `/geo` and `/ppc` once each, in one block, same order everywhere. **Five links, not four** — `/ppc`
   is added in this revision because PPC now qualifies a prospect on its own. This block is the
   structural alternative to industry × service pages: the combination is expressed as a link, not a
   URL.
6. **Proof links are conditional.** Link to a case study only where one resolves for that niche.
   Otherwise link to `/case-studies/methodology` alongside the honesty line. Never link a niche to an
   unrelated study — `studiesForTopic()` in the existing template does fuzzy topic matching and will
   happily attach a dental study to a pumps page. For new rows, require an explicit id or none.
7. **Prompt library.** Each sub-niche links to its vertical's Type C page; the Type C page links back
   to every sub-niche in that vertical. This is the second inbound link that satisfies rule 9.
8. **Anchor text varies deterministically.** Three patterns, chosen by `index % 3`: bare niche name,
   niche name + "buyers", niche name + "in AI answers". Identical exact-match anchor on 75 pages is a
   footprint, and it also reads like a machine.
9. **Orphan rule.** Every indexable page has ≥2 inbound in-content links from other indexable pages.
   Hub + prompt library satisfies it as a floor; sibling links raise it.
10. **Depth rule.** Every page ≤3 clicks from `/`. Path: `/` → `/industries` →
    `/industries/<vertical>` → `/industries/<vertical>/<sub-niche>`.
11. **Connectivity rule.** Within a hub, the sibling link graph must form **one** connected component.
12. **Link ceiling.** ≤40 in-content internal links per page. Above that the page is a directory, and
    directories are the thing the pages are supposed to displace.
13. **No in-content link from an indexable page to a noindex page.** Utility links in the footer are
    exempt. This stops crawl budget draining into the `/growth` noindex subniche briefs, the noindex
    place profiles, and the `/lp/*` paid destinations in §2.5.

### 5.2 What this replaces

The existing sub-industry template's sidebar links to `/locations`, `/resources` and `/directory` on
every page. Those are three of the four worst clicks-per-page families on the domain. **I am not
proposing any change to existing pages** — but new rows must not inherit that sidebar block. It is a
link tax paid 75 times into families that earn 0.08 to 0.13 clicks per page per quarter. If the
shared component makes that unavoidable, that is a reason to give new rows their own sidebar variant
(§0.3 decision 6).

---

## 6. Schema and technical, as of September 2026

### 6.1 What is real

| Type | Page | Status |
|---|---|---|
| `BreadcrumbList` | every page | Real. Still a supported rich result and already emitted by both templates. Keep. |
| `Organization` | site-wide, one place | Real, and load-bearing for entity resolution across ChatGPT, Perplexity and Gemini. Blocked by the office-claim contradiction (`OPERATOR-DECISIONS` #1). |
| `Article` + `author` as a `Person` with real credentials | Type C, Type E, and the observation block if given its own dated section | Real for E-E-A-T and for author entity resolution. No guaranteed rich result. |
| `Dataset` | the observation block | Defensible: it genuinely is a dated dataset with a publisher and a temporal coverage. Eligible for Google Dataset Search. Low cost, honest, and I have **no evidence** it affects AI citation. Mark it as an experiment, not a tactic. |
| `Service` | hub and sub-niche | Already emitted. No rich result, no harm, and it states the entity relationship plainly. Keep. |
| `DefinedTerm` | `/glossary/*` | Already emitted by `app/glossary/[term]/page.tsx`. Correct type for the content. Note that the content it describes is a single templated sentence per term (§7.3), so the markup is currently more honest than the page. |

### 6.2 What is dead, and what is folklore

- **`FAQPage` is finished.** Restricted to well-known government and health sites in
  [August 2023](https://developers.google.com/search/blog/2023/08/howto-faq-changes), and per
  reporting the rich result
  [stopped appearing entirely around May 2026](https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957),
  with the search appearance and Rich Results Test support dropped mid-2026 and the Search Console
  API field removed in August 2026. Both existing industry templates still emit it. **Do not remove
  it from existing pages** — it is inert, not harmful, and removing it would be a change for no gain.
  **Do not add it to new pages as an SEO tactic.** Whether any assistant parses `FAQPage` JSON-LD:
  `[NEEDS DATA: no primary source either way]`. What demonstrably is extracted is the visible Q&A in
  real headings, so put the questions in `<h2>`/`<h3>` and answer them in the first sentence.
- **`HowTo` is dead** and has been since 2023.
- **No schema causes AI Overviews or AI Mode inclusion.** Google states there is no special
  structured data needed and no additional requirements beyond standard crawlability and internal
  linking ([AI Features and Your Website](https://developers.google.com/search/docs/appearance/ai-features),
  [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
  Anyone selling GEO as a markup technique is selling folklore — `CLAUDE.md` §11 already forbids it
  and this is the citation for why.
- **`llms.txt` does close to nothing.** Google has said on the record it does not support it and
  compares it to the keywords meta tag; third-party log studies through 2026 report AI crawlers
  fetching it at negligible rates while crawling HTML directly. The repo ships `/llms.txt` and
  `/llms-full.txt` already. **Keep them** — they cost nothing, some smaller tools do read them, and
  removing them is churn — but they must never appear in a deliverable as a lever.
  `[NEEDS DATA: primary log-level evidence on llms.txt fetch rates; the circulating figures are
  third-party blog studies of varying method]`
- **"Share of AI answers" as a metric.** No public source of truth exists. First-party G.O.L.E.M
  observations against a fixed prompt set are the only defensible version, and they are a sample on a
  date, not a share.

### 6.3 Technical that actually matters here

1. **Crawlability by the assistants.** `app/robots.txt/route.ts` already allows `OAI-SearchBot`,
   `Claude-SearchBot`, `PerplexityBot` and separately `GPTBot`, `ClaudeBot`, `Google-Extended`. This
   is correct and unusually well done. Do not narrow it.
2. **CDN-level blocking is the silent killer.** Bot management at the edge can block AI crawlers
   regardless of robots.txt. `[NEEDS DATA: confirm the Vercel firewall and any proxy in front of
   qognitionagency.com is not challenging OAI-SearchBot, PerplexityBot or Claude-SearchBot — verify
   from server logs, not from robots.txt]`
3. **Ranking and citation are separate systems, with evidence.** ~37.9% of AI Overview citations come
   from the top 10 organic for the query
   ([Ahrefs](https://ahrefs.com/blog/ai-overview-citations-top-10/)), but only ~12% of URLs cited by
   ChatGPT, Gemini and Copilot rank in Google's top 10 for the same prompt
   ([Ahrefs](https://ahrefs.com/blog/ai-search-overlap/)). Perplexity sits between them. **This is the
   empirical basis for reporting rankings and citations separately.** Work that moves one does not
   reliably move the other. It is also the basis for the off-page model in
   `docs/seo/b2b-offpage-authority.md`: a link that helps ranking and a placement that gets retrieved
   are frequently different placements.
4. **Freshness has a mechanism.** Cited URLs run ~25.7% fresher than organic results
   ([Ahrefs, 17M citations](https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/)).
   The monthly observation re-run on the same URL is a freshness strategy that is also true.
5. **Search Console generative AI reporting is live.** Google's generative AI performance reports
   covering AI Overviews and AI Mode impressions rolled out globally by 31 August 2026
   ([Search Engine Land](https://searchengineland.com/google-search-console-ai-performance-reports-and-search-generative-ai-control-rolling-out-globally-486269)).
   **They report impressions, pages, countries, devices and dates — no click data.** This is a
   measurement input for §8.3's wave gate, and it belongs under citation, labelled as impressions.
6. **Sitemap.** Add the new family to `sitemapIndexes` with `lastmod = reviewedAt`, and only for
   pages where the publication state is `published`. `changefreq` and `priority` are ignored by
   Google; leave the existing values alone rather than churn them.

---

## 7. The eighth consumer of `INDUSTRIES`, and the content-model fix

ADR-0007 §2.1 enumerated seven consumers of `data/industries.ts`. `lib/industryPublication.ts`
repeats the same seven. **There are eight.** The eighth was found by negative-testing the industry
gate on 2026-09-28 and it is the most dangerous of them, because it is the only one that **removes**
published URLs rather than adding them.

### 7.1 The mechanism

`data/seoExpansion.ts`:

```ts
const generatedTerms = [
  ...SERVICES.flatMap(...),     // 4 terms per service
  ...INDUSTRIES.flatMap(...),   // 4 per industry + 1 per sub-industry, capped at 4
  ...LOCATIONS.slice(0, 70).flatMap(...),  // 3 per location
  ...[ 31 hand-written technical terms ]
];
const glossarySource = Array.from(new Set([...coreTerms, ...generatedTerms]));
export const GLOSSARY_TERMS = glossarySource.slice(0, 320).map(...)
```

`app/glossary/[term]/page.tsx` sets `dynamicParams = false` and derives `generateStaticParams` from
`GLOSSARY_TERMS`. **The array position of a term decides whether its URL exists.**

`INDUSTRIES` is enumerated *before* `LOCATIONS`, so adding one industry row pushes location-derived
terms past the 320 cap and off the end. The sitemap total does not move, because the glossary
contributes a fixed 320 either way. Four in, three out, net −1 hidden inside a 4,422-entry file.

### 7.2 What I verified today, and it is worse than the count suggests

Measured directly against the current data on 2026-09-28:

| Finding | Value |
|---|---|
| Source terms generated before dedupe | 44 from `SERVICES` (11 × 4), 88 from `INDUSTRIES` (11 × 4 + 44 sub), 210 from `LOCATIONS` (70 × 3), 31 hand-written, plus `coreTerms` |
| Published after the cap | 320 |
| **Where the cap bites** | Inside the `LOCATIONS` block. **135 of 210 location-derived terms survive; 75 are already cut.** |
| **Hand-written technical terms published** | **Zero of 31.** Every one is past the cap and has never had a URL. |
| Terms that have never published | `Technical SEO Audit`, `Next.js SEO`, `JSON-LD`, `Breadcrumb Schema`, `Review Schema`, `Service Schema`, `SEO ROI`, `ROAS`, `Quality Score`, `Conversion Tracking`, `CRM Attribution`, `Comparison Page SEO`, **`AI Citation`, `Perplexity SEO`, `ChatGPT Search`, `Gemini SEO`**, and 15 others |
| Published glossary composition | 129 of 320 categorised `Local SEO`, 131 `Digital marketing`. The family is overwhelmingly `<City> SEO`, `<City> Digital Marketing`, `<City> Lead Generation` |

Two things follow that were not visible from the count.

**First: the four glossary terms most relevant to what this company now sells have never existed as
pages.** `AI Citation`, `Perplexity SEO`, `ChatGPT Search` and `Gemini SEO` are sitting at the tail of
a hand-written array, permanently truncated, while 135 templated city pages publish ahead of them.
The domain's single best programmatic family is spending its entire quota on the term type that
`/locations/*` already proved earns 0.13 clicks per page.

**Second: the failure has already fired, in production, on the most valuable URL the domain had.**
`/glossary/ai-seo-and-sge-strategy-audit` held **position 7.9 on 1,497 impressions** for "sge seo
audits" and related queries — the best-ranking URL on the site
(`docs/seo/gsc-url-group-baseline.md`). It is not in the current 320. It returned 404 until
2026-09-27 and is now a 301 to `/free-ai-audit` in `next.config.mjs`, with a comment noting the
demand was being thrown away. **That is this mechanism, with a name and a date.** The risk described
in `scripts/check-industry-gate.cjs` is not hypothetical; it is a post-mortem.

**Third, and this is the part the existing assertion does not cover.** `relatedTerms` is computed as
`[all[(index+7) % all.length], all[(index+19) % all.length], all[(index+31) % all.length]]` over the
**truncated** array. A single upstream row change does not only move the boundary — it renumbers
every index and **rewires the internal related-links block on all 320 glossary pages**. The snapshot
assertion in `scripts/check-industry-gate.cjs` compares slug *sets*, so a change that happens to
preserve the set while rotating every page's outbound links passes the gate silently. That is a
crawl-graph change disguised as a data edit.

### 7.3 Why this family is worth protecting at all

`/glossary/*` earns **0.25 clicks per page per quarter**, the best of any programmatic group on the
domain, roughly double `/locations/*`, and it held the best-ranking URL. `CLAUDE.md` §7 says
explicitly not to treat it as uniformly thin.

It is also, on inspection, thin: every definition is the same sentence with the term substituted in.
It ranks despite the content, not because of it, which means the family's value is a demand signal
about the *terms*, not an endorsement of the *pages*. That reading changes the fix. The goal is not
"publish more glossary pages". It is "stop letting an unrelated data edit decide which of the good
terms exist".

### 7.4 The content-model fix

The current mitigation is a frozen snapshot plus two assertions. That makes the failure loud, which
is a real improvement, but the hole is still there: the published URL set is still a side effect of
array order and a magic number.

**Recommendation, in order. Each step is independently shippable.**

1. **Break the derivation. Make the published set explicit.**
   Replace `slice(0, 320)` with an explicit `PUBLISHED_GLOSSARY_SLUGS` allowlist, built once from the
   current 320 and thereafter edited by hand — the same pattern as `lib/industryPublication.ts`, and
   for the same reason stated in that file's comment: a list derived from the data agrees with the
   data by construction and gates nothing. `GLOSSARY_TERMS` becomes a lookup over the full source
   set, filtered by the allowlist. The cap disappears as a concept.
   *Effect:* an industry row can be added without touching a single glossary URL. Adding a glossary
   URL becomes a deliberate act with a reviewer.
   *Rollback:* restore `slice(0, 320)`. The allowlist is seeded from the current published set, so
   the set is byte-identical on landing and the revert is a no-op at Google's end. No canonical, no
   redirect, no robots directive on any live URL is touched in either direction.

2. **Pin `relatedTerms` to slugs, not indices.**
   Compute related terms from an explicit map or from a stable hash of the slug, never from a
   positional offset into a mutable array. Until this lands, **any** change to the source arrays
   rewires 320 pages' internal links invisibly.
   *Rollback:* the modulo expression is three lines. Reverting restores the old behaviour.

3. **Rescue the terms that were never published — but only under the §8.2 bar.**
   `AI Citation`, `ChatGPT Search`, `Perplexity SEO`, `Gemini SEO`, `JSON-LD` and the schema terms are
   directly on-offer for what this company sells and have never had a URL. They are not free wins:
   published at today's one-sentence quality they would be 31 more thin pages, which is the thing
   `CLAUDE.md` §7 forbids. Add them **one at a time, hand-written, with a named reviewer**, and only
   where the term has standalone demand. `[NEEDS DATA: keyword export to decide which of the 31 have
   standalone demand]`

4. **Restore a real page at `/glossary/ai-seo-and-sge-strategy-audit`.**
   The `next.config.mjs` comment already recommends this and it is right. A 301 from an
   informational-commercial query to an offer page converts worse than a definitional page that links
   to the offer, and it discards the ranking. This is a decision for the operator because it means
   removing a live redirect.
   *Rollback:* the redirect rule is four lines in `next.config.mjs`. If the restored page
   underperforms the redirect over a 90-day window, re-add the rule and delete the page's allowlist
   entry. **`scripts/check-publication.cjs` asserts every baseline URL stays discoverable, so the
   page and the redirect removal must land in the same commit or the build breaks.** That coupling is
   deliberate and should be left alone.

5. **Decide whether the location-derived terms deserve 135 of 320 slots.**
   Out of scope for this document, because it touches existing pages, and it needs the backlink
   export first. `[NEEDS DATA: backlink export — a URL with external links is never 410'd regardless
   of clicks]`

**Until step 1 lands, no wave publishes.** It is added to Wave 0 in §1.6. The reason is
proportionality: a wave commit touches `data/b2b/`, not `INDUSTRIES`, so it should be safe — but
"should be" is exactly the reasoning that produced seven enumerated consumers when there were eight.

**One more, for whoever maintains the enumeration.** The seven-consumer list in
`lib/industryPublication.ts` and ADR-0007 §2.1 is now known to be incomplete. The correct instruction
is not "add an eighth line". It is: **before any change to `SERVICES`, `INDUSTRIES` or `LOCATIONS`,
grep for every import of the module and check whether any consumer truncates, slices, caps or indexes
positionally.** Those are the three operations that turn an additive data change into a subtractive
publication change.

---
## 8. The publishing gate

`CLAUDE.md` §7 is prose. This is the same thing as assertions. **The wave gate mechanism in §8.3 is
unchanged from revision 1 and is not up for redesign.** It is the part of this document that makes
everything else safe.

### 8.1 Prerequisite: close the hole — **DONE for `/industries`, outstanding for `/glossary`**

**Shipped 2026-09-28, commit `e483547`.** `lib/industryPublication.ts` plus
`scripts/check-industry-gate.cjs`:

- The 11 industry hubs and 66 sub-industry pages live on 2026-09-28 are frozen as an explicit,
  hand-written allowlist. Anything not enumerated is not published.
- A sub-industry is published only if its parent is too, so an unpublished parent cannot strand an
  orphan.
- `generateStaticParams` on all three affected routes and both sitemap generators are filtered.
- The counts (`11`, `66`) are asserted in the gate script, so raising them requires editing the
  script in the same diff, with a reviewer named in the commit message.
- No allowlist entry may be a ghost: every id must still resolve against live data.
- The operator's hard constraint is asserted rather than asserted-about: **the sitemap must hold
  exactly 4,422 entries.** Proved byte-identical on landing.

Revision 1 proposed a `publication` field where absence meant grandfathered. What shipped is stronger
and the reasoning in the file is correct: absence-means-published leaves the hole exactly where it
was. **Do not soften this to a field-based default later for ergonomics.**

**Rollback (unchanged):** delete the two filters in `lib/sitemap.ts` and the module is inert. No URL,
redirect, canonical or robots directive on any existing page was touched, so there is nothing to undo
externally.

**Still outstanding:** the equivalent for `/glossary/*` (§7.4 step 1), and `scripts/check-b2b.cjs` for
the new `data/b2b/` spine. Wave 1 does not publish until both exist.

### 8.2 Per-page assertions — all must pass to reach `state: 'published'`

Assertions 1–17 are unchanged from revision 1. 18 and 19 are added in this revision.

| # | Assertion | Fails when |
|---|---|---|
| 1 | `publication.reviewedBy` is a non-empty name from an allowlist of real people; `reviewedAt` is a valid ISO date ≤180 days before build date | Anonymous or stale review |
| 2 | `evidence.length >= 1`, and every entry resolves to either an observation-run id in the observation store or a case-study id in `ALL_CASE_STUDIES` | Evidence is a sentence rather than an artefact |
| 3 | Observation block: ≥8 distinct prompts, ≥3 distinct engines, every prompt has `observedAt` ≤90 days old and either ≥1 cited URL or explicit `noCitations: true` | Stale, thin, or invented |
| 4 | No prompt string is shared with any other page's set | Same prompt set pasted across niches |
| 5 | ≥3 `facts[]`, each with a `source` URL whose host is not `qognitionagency.com` and whose path is not `/` | Self-referential or homepage-shaped "sources" |
| 6 | ≥6 standards terms, each with `standardBody`, each appearing in the rendered body text; no term on >25% of published pages in the family | Vocabulary is generic |
| 7 | ≥3 buyer titles; the set is not identical to any other page's set | Buyer is a placeholder |
| 8 | Shingle uniqueness ≥40% against every other published page in the family, ≥60% against the parent hub | Template substitution |
| 9 | ≥900 words of prose excluding nav and boilerplate | Stub |
| 10 | No string from the boilerplate denylist appears in page data. Seed with `Quick summary:`, `This page links upward to`, `Qognition builds these pages as useful vertical growth assets`, `We translate this requirement into`, plus the banned vocabulary in `CLAUDE.md` §10 | The template talking about itself |
| 11 | Any field whose text contains a percentage or a multiplier (regex `\d+\s*%` or `\d+x`) carries a sibling `source` field | Unsourced number, breaching `CLAUDE.md` §4 |
| 12 | Either a resolving case-study id, or `clientProof: 'none'` **and** the rendered no-client sentence present | Implied experience |
| 13 | Inbound in-content links from published pages ≥2; outbound sibling links 3–5, all resolving to published pages; click depth from `/` ≤3; no in-content link to a noindex URL | Orphan, dead end, or crawl waste |
| 14 | Hub sibling graph is one connected component | Split branch |
| 15 | Title ≤60 chars, description 110–160 chars, canonical equals self | Metadata defects at scale |
| 16 | **The page path does not appear in `docs/repositioning/legacy-sitemap-baseline.json`** | Proves mechanically that the operator's "new pages only" constraint is honoured |
| 17 | No niche id is published in both `/industries/*` and `/growth/industries/*` | Self-competition between the two families |
| **18** | **No `geoAngle` string from `data/b2b/verticals.ts` appears in a title, an H1, a meta description or a `primaryQuery` field** | Family B leaking into a ranking target — the single failure mode the taxonomy header warns about |
| **19** | **No page asserts or implies that a firm outside the 15 verticals is not a fit, and no page makes AI search a condition of engagement.** Denylist seeded with `only work with`, `exclusively for`, `if you are not`, `must already` | The widened ICP being narrowed back by copy |

### 8.3 The wave gate — how `CLAUDE.md` §7's five tests become a build failure

**Unchanged from revision 1.** A committed file, `docs/seo/wave-gate.json`:

```json
{
  "pulledAt": "2026-11-04",
  "source": "Google Search Console, domain property, Performance > Pages, 28-day window",
  "waves": [
    {
      "wave": 1,
      "publishedAt": "2026-10-06",
      "indexablePages": 8,
      "pagesWithAtLeastOneImpression28d": 6,
      "pagesTop20ForPrimaryQuery": 1,
      "conversions": 0,
      "medianPositionTrend": "improving",
      "siteIndexablePages": 3907,
      "siteMonthlyOrganicSessions": 0
    }
  ]
}
```

The script asserts, for wave *N+1* to contain any published page:

1. `pulledAt` is ≤30 days before build date. **A stale pull fails the build.**
2. ≥90 days since wave *N* `publishedAt`.
3. `pagesWithAtLeastOneImpression28d / indexablePages >= 0.60`.
4. `pagesTop20ForPrimaryQuery >= 1 || conversions >= 1`.
5. `medianPositionTrend` is `flat` or `improving`.
6. `siteIndexablePages / siteMonthlyOrganicSessions` within the agreed ratio.
   `[NEEDS DATA: the agreed ratio — CLAUDE.md §7 references it but does not state a number. Until it
   is set, this assertion cannot run and the gate is incomplete.]`

Wave 1 itself has no predecessor, so it enters on §8.2 alone. Every later wave enters on measurement
or not at all.

`siteMonthlyOrganicSessions` is currently near zero, so test 6 will fail on arithmetic unless either
the ratio is defined generously or the dead families are pruned. Pruning is outside this document's
scope — it touches existing pages — but it is the dependency, it is already a blocker in
`docs/OPERATOR-DECISIONS.md`, and `CLAUDE.md` §7 requires pulling Search Console data per URL group
before removing or noindexing anything, which `docs/seo/gsc-url-group-baseline.md` has now done for
the main groups.
**`[NEEDS DATA: backlink export — a URL with external links is never 410'd regardless of clicks]`**

**One note the widened ICP adds, and it does not change the mechanism.** Test 4 accepts a conversion
as an alternative to a top-20 ranking. With PPC in scope, a paid conversion on a `/lp/*` page is
**not** a conversion for this purpose. The gate measures whether the *organic cohort* earned
something. Count only conversions attributed to an organic session landing on a page in that cohort.

### 8.4 The kill rule, also scripted

`CLAUDE.md` §7: zero impressions after 180 days → consolidate and 301. Scripted as: any page whose
wave entry is >180 days old and whose `impressions28d` is 0 in the latest pull is reported by the
script as a kill candidate. The script **reports**; it does not redirect. A redirect is a human
decision with a rollback, and the rollback for any 301 in this family is: remove the rule from
`next.config.mjs`, restore the page's `published` state on the row, and re-submit the URL in Search
Console. Note that `scripts/check-publication.cjs` asserts every baseline URL stays discoverable, so
any redirect must land in the same commit as its `lib/legacy-publication.ts` change or the build
breaks — that coupling is deliberate and should be left alone.

---

## 9. Measurement, reported separately

Ranking and citation are different outcomes produced by different work, and the evidence in §6.3 says
they only partially overlap. They are reported under separate headings, always. A client who reads a
#3 ranking as a citation will spend the next quarter's budget wrong.

Off-page reporting adds a third heading — entity consistency — which belongs to neither. See
`docs/seo/b2b-offpage-authority.md` §6.

### 9.1 Ranking

Source: Search Console, per URL group, 28-day windows.

- Impressions and clicks per wave cohort
- Pages with ≥1 impression, as a fraction of the cohort
- Median position, trend
- Pages top-20 for their primary mapped query

**Paid is reported separately again**, under Marcus's heading, and is never blended into this one.
A blended "search" number hides which half is working.

### 9.2 Citation

Source: first-party prompt runs. Fixed prompt set, same prompts every month, per vertical. Appended,
never overwritten, so months are comparable.

- Date, engine, model version, prompt, cited or not, which URL, what was said
- Family Q prompts for Qognition's own visibility
- Family B prompts as the per-niche observation the pages publish

Changing the tracked prompt set is recorded with the reason, in the same file. Comparability is the
entire value. The widened ICP requires adding SEO-only and PPC-only Family Q prompts (§3.1) — that is
a set change and it gets a dated line saying so.

Google's generative AI performance reports give **impressions only, no clicks**, so AI Overview
impressions are a third series and belong under citation, clearly labelled as impressions. Do not add
them to the ranking clicks number.

### 9.3 What is not reported

No estimated volume. No estimated difficulty. No "share of AI answers". No projected traffic. No
citation that was not observed in an output someone looked at. No blended paid-and-organic figure
presented as a search result.

---

## 10. Open items

| # | Item | Blocks |
|---|---|---|
| 1 | Reviewer throughput per month (§0.3 #2) | The wave schedule |
| 2 | Is the observation engine real — G.O.L.E.M yes, `runAudit()` no (§0.3 #3) | Every page in the family |
| 3 | **The glossary content-model fix** (§7.4 step 1) | Wave 0, and therefore every wave |
| 4 | The office-claim contradiction (`OPERATOR-DECISIONS` #1), now known to extend to third-party directories | Entity consistency for 83 new pages, and all off-page work |
| 5 | The agreed indexable-pages-to-sessions ratio | Wave gate test 6 |
| 6 | Whether new rows may use a sidebar variant omitting `/locations`, `/resources`, `/directory` | §5.2 |
| 7 | Named compliance reviewer (`OPERATOR-DECISIONS` #7) | Wave 5 (insurance) and Wave 6 (healthcare) |
| 8 | Paid budget for Qognition's own site | §2.5's demand probe, and therefore the tier B release |
| 9 | Whether to restore a real page at `/glossary/ai-seo-and-sge-strategy-audit` (§7.4 step 4) | Recovering the domain's best ranking asset |
| 10 | Competitor-brand bidding: yes or no (§2.5) | Marcus's campaign build; Ruth reviews the ad copy either way |

### NEEDS DATA

- Keyword export with volume and difficulty for §2.4, US market, Australia secondary
- Reviewer hours per month, and measured hours per page review, first ten pages
- Backlink export before any consolidation decision, and before §7.4 step 5
- Confirmation that no edge bot management is challenging `OAI-SearchBot`, `PerplexityBot` or `Claude-SearchBot`, verified from server logs
- The agreed indexable-pages-to-organic-sessions ratio referenced in `CLAUDE.md` §7
- Primary log-level evidence on `llms.txt` fetch rates
- Whether any assistant parses `FAQPage` JSON-LD; no primary source either way
- Monthly paid budget available for Qognition's own site, or confirmation it is zero
- Which of the 31 never-published glossary terms have standalone demand

---

**Not reviewed by Ruth (brand-guard).** Nothing here is client-facing yet, but the page copy this
architecture produces will be, and it goes through the gate before it ships.
