# B2B niche page architecture

Author: Nadia (search).
**Revision 3, 2026-09-29.** Supersedes revision 2 of 2026-09-28, which was written against a
120-sub-niche spine. The operator has since locked a **11,561-entity** taxonomy
(`data/b2b/icp/icp-taxonomy.json`, v2.0.0) and supplied 682 AI prompts and 1,023 PPC keywords with it.
Branch `b2b-ai-search`, HEAD `9299e1d`.

Status: **recommendation, not approved.** Not reviewed by Ruth (brand-guard). No page publishes off
this document until the open decisions in §0.3 are settled and the wave gate in §8 is green.

Scope: how to publish the B2B niche universe as pages that earn traffic and citations, without
repeating `/locations/*` — 632 pages in the Search Console top 1,000 earning **0.13 clicks each per
quarter** (`docs/seo/gsc-url-group-baseline.md`).

**What revision 3 does not change.** The wave gate mechanism in §8.3 is untouched — same committed
file, same six assertions, same stale-pull build failure. The per-page assertions in §8.2 are extended,
not rewritten. The ranking-versus-citation separation in §9 is untouched. §0.4 — the observation block
as the only non-templatable thing on the page — is untouched and matters more at 11,561 than it did at
120, because it is now the only thing standing between this taxonomy and the largest scaled-content
programme this domain has ever attempted.

**What revision 3 does change: the arithmetic, and the unit.** Revision 2 counted pages and measured
waves in pages. At four levels and 11,561 entities, a page count is the wrong unit — it makes an
8,823-row leaf level look like an 8,823-page decision, which it is not. §1.6 restates the wave in the
unit that actually binds.

## What changed since revision 2

| # | Change | Where it lands |
|---|---|---|
| 1 | **The taxonomy is now four levels and 11,561 entities**, operator-locked v2.0.0: 21 industries · 341 sub-industries · 2,376 niches · 8,823 sub-niches. Revision 2's two-level, 135-entity ceiling is obsolete. | §0.2, §1.2, §1.6 |
| 2 | **The operator assigned `fit` and `priority` per niche.** Fit: AI SEO 1,059 / PPC 190 / Both 1,127. Priority: A 888 / B 1,173 / C 315. Both are on the **niche** (level 3) and on nothing else. That single fact decides §1.7. | §1.7, §1.6 |
| 3 | **682 `ai_prompts` and 1,023 `ppc_keywords` were supplied, at sub-industry level — two prompts and three keywords per sub-industry, 341 × 2 and 341 × 3, verified.** I sampled both. **Both sets are Family B.** Not one of the 1,023 keywords is a term Qognition would bid on for its own acquisition. The operator supplied 1,705 Family B strings and **zero** Family Q strings. | §2.1, §3.1, §3.2 |
| 4 | **New §1.7: which level earns a page, answered per fit type.** This is the load-bearing section of revision 3 and it replaces revision 2's §1.3 as the place the volume decision is actually made. | New §1.7 |
| 5 | **The ICP taxonomy is an ungated island.** `grep -rn "b2b/icp" app components lib data scripts` returns nothing. No route, no sitemap entry, no gate, no ceiling assertion. `publishedIcpPaths()` returns `[]` by hand-written code and **nothing asserts that it stays empty**. `scripts/check-b2b.cjs` guards `data/b2b/verticals.ts` and knows nothing about this file. | §0.2, §8.1, §8.5 |
| 6 | **There are now three spines claiming `/industries/*`,** and all three claim `financial-services`. Legacy `data/industries.ts` (11), `data/b2b/verticals.ts` (15/120), `data/b2b/icp` (21/341/2,376/8,823). The middle one describes the same 15 industries as the new one under **different slugs** (`saas-software` vs `saas-and-software`). Two of them cannot both be a URL source. | §0.2, §0.3 decision 7 |
| 7 | **Rule 7 is currently unexecutable.** It says build under the canonical id "listed at the bottom of INDEX.md". There is no `INDEX.md` in this repo and no `docs/icp/` directory; rules 1, 7 and 9 all cite paths that do not exist. I also cannot reproduce the "5 deliberate overlaps": measured, there is **one** duplicated niche slug and name (`facilities-management-firms`, `02.16.04` and `07.14.06`), zero duplicate ids and zero duplicate full paths. | §0.3 decision 8, NEEDS DATA |
| 8 | **Rule 8 defers almost the whole PPC layer.** Of 888 priority-A niches, **15 are `PPC` fit** — 1.7%. The PPC-fit population is 115 B and 60 C. Building A first is correct and it means the paid door is served by §2.5's demand probe and the `/ppc` layer page, not by this family, for a long time. | §1.6, §1.7, §2.5 |
| 9 | Off-page source maps extended to the six new industries. | `docs/seo/b2b-offpage-authority.md` §3.16–§3.21 |
| 10 | The glossary content-model fix (§7.4 step 1) **still comes before every wave, and the case for it is stronger, not weaker.** Reasoning in §7.5. | §7.5, §1.6 |

### Carried forward from revision 2, unchanged

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

**The taxonomy is locked, it is four levels deep, and it does not generate routes.** Measured
directly from `data/b2b/icp/icp-taxonomy.json` on 2026-09-29:

| Level | Name | Count | Carries `fit` | Carries `priority` | Carries prompts / keywords |
|---|---|---:|---|---|---|
| 1 | industry | 21 | no | no | no |
| 2 | sub-industry | 341 | no | no | **yes — 2 prompts, 3 keywords, `geo_angle`, `buyer_titles`, `client_value`, `min_firm_size`** |
| 3 | niche | 2,376 | **yes** | **yes** | no |
| 4 | sub-niche | 8,823 | no | no | no |

Three things follow immediately and they run through the rest of this document.

- **Level 2 is the only level with editorial raw material.** Every one of the 341 sub-industries has
  all six operator fields populated — I checked all 341, not a sample. Levels 1, 3 and 4 have
  `id`, `slug`, `name` and nothing else, except that level 3 also has `fit` and `priority`.
- **Level 3 is the only level with a build instruction.** `fit` and `priority` exist on the niche and
  nowhere else. Rule 8's build order is expressed in a field that only 2,376 of the 11,561 entities
  have.
- **Level 4 has no operator input of any kind.** 8,823 rows of `{id, slug, name}`. A page there would
  be built entirely from a name. That is the whole argument of §1.7 and it is arithmetic, not taste.

Sub-niche depth: min 0, median 4, mean 3.71, p90 5, max 10. Eight niches have zero sub-niches. 8,759
of the 8,823 sub-niche slugs are unique; 62 slugs are reused across 126 entities
(`commercial-due-diligence` three times, `data-center-decommissioning` three times).

`data/b2b/verticals.ts` still holds the previous 15 meta-verticals and 120 sub-niches. Every entity in
it defaults to `state: 'spine'`: no page, no sitemap entry, 404 on request. `publishedEntities()`
returns an empty array today and that is the intended state at rest. Promotion requires a named
reviewer, a review date, and the ceiling raised in `scripts/check-b2b.cjs` in the same commit.

**The new taxonomy has none of that protection.** `grep -rn "b2b/icp" app components lib data scripts`
returns **nothing**. No route reads it, no sitemap generator reads it, and — the part that matters —
**no gate reads it**. `publishedIcpPaths()` returns `[]` because a human wrote `return []`, and there
is no assertion anywhere that it keeps returning `[]`, no `ICP_PUBLISHED_CEILING` equivalent to
`B2B_PUBLISHED_CEILING`, and no entry in `scripts/check-b2b.cjs`. The file's own header says this is
"the single most important function in the file". It is currently the only thing holding, and it is
holding on a comment. §8.5 specifies the fix and it is Wave 0 work.

**There are three spines and they collide.** Measured:

| Spine | File | Level-1 count | Level-1 slugs |
|---|---|---:|---|
| Legacy | `data/industries.ts` | 11 | `law-legal`, `accounting-cpa`, `financial-services`, `consulting`, `real-estate`, `manufacturing`, `coaching`, `industrial-trade`, `care-homes`, `elder-care`, `waste-management` |
| Revision-2 | `data/b2b/verticals.ts` | 15 | `saas-software`, `professional-services`, … `emerging-micro-niches` |
| ICP v2.0.0 | `data/b2b/icp` | 21 | `saas-and-software`, `professional-and-business-services`, … `franchising-and-multi-location` |

`financial-services` is claimed by **all three**. `scripts/check-b2b.cjs` §2 catches the
legacy ↔ revision-2 case and fails the build loudly. It does not know the ICP spine exists, so the
same collision from the ICP side is currently silent. Beyond that one slug, the revision-2 and ICP
spines describe **the same fifteen industries under different slugs**. They cannot both be a URL
source without Qognition publishing two near-duplicate hubs for fifteen industries, which is
self-competition by construction and is what §8.2 assertion 17 exists to prevent. This is decision 7
in §0.3 and it is not mine to settle alone, because rule 6 makes the slugs the operator's.

**One consequence already visible in the repo.** The single authored body,
`data/b2b/bodies/manufacturing-industrial/cnc-machining.ts`, is written against the revision-2 slug
path. In the ICP spine the equivalent entity is
`manufacturing-and-industrial/precision-manufacturing-and-machining/cnc-machining-shops` (`05.01.01`)
and it is **priority B** — deferred by rule 8. The priority-A machining entity in the new taxonomy is
`aerospace-and-aviation/aerospace-component-manufacturing/aerospace-precision-machining-shops`
(`16.05.01`), in an industry that did not exist in revision 2. The authored work is not lost, but it
is not on the A-first path and its path does not resolve against the locked spine.

**The path references in `docs/icp-positioning.md` do not resolve.** Rule 1 cites `INDEX.md`, rules 1
and 7 cite `docs/icp/icp-taxonomy.json`, rule 9 cites `docs/icp/industries/<NN-slug>.md`. None of
those exist. The real paths are `docs/icp-industries/<NN-slug>.md` and
`data/b2b/icp/icp-taxonomy.json`, and **there is no `INDEX.md` anywhere in the repo**. I am not
proposing an edit — the file is operator-locked and rule 12 says stop and ask. I am recording it
because **rule 7 cannot be executed as written**: the canonical id for an overlap is defined as
something that lives in a file that does not exist.

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
7. **Which spine is the URL source, and what happens to the other two.** Rule 6 says slugs come from
   the JSON, which makes the ICP spine the only legitimate source for any new URL. That implies
   `data/b2b/verticals.ts` is retired **as a route source** — not deleted, because
   `scripts/check-b2b.cjs` and the authored body depend on it, and not redirected, because none of it
   has ever been published so there is nothing to redirect. It also implies the legacy
   `data/industries.ts` hubs keep `/industries/financial-services` and the ICP `financial-services`
   industry does **not** get that URL until the operator says so.
   **No rollback is needed for any of this because no URL changes**: all three spines are unpublished
   or already live and untouched. The decision is about which file a *future* URL comes from.
   `[NEEDS DATA: operator decision — ICP spine is the sole route source for new URLs; verticals.ts
   demoted to a data-only artefact; legacy retains financial-services]`
8. **How rule 7 is executed without `INDEX.md`.** The rule needs a canonical-id list and there is no
   file to read it from. Measured, the collision set is one pair, not five:
   `facilities-management-firms` at `02.16.04`
   (`professional-and-business-services/specialist-business-services`) and `07.14.06`
   (`construction-real-estate-and-built-environment/commercial-real-estate-services`). Zero duplicate
   ids, zero duplicate full paths, and `nicheBySlug` in `data/b2b/icp/index.ts` is keyed on the full
   three-segment path, so its "first writer wins" guard **can never fire** — the comment describes a
   protection the key makes impossible. `allIcpNiches()` therefore returns **2,376**, not the 2,371
   the header comment and `counts.unique_niches` both claim.
   `[NEEDS DATA: the canonical id for each declared overlap, and reconciliation of unique_niches 2,371
   against the 2,376 the data produces]`

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

1. No page may imply that a firm outside the 21 industries is not a fit. The disqualifiers are the
   only disqualifiers: pre-revenue, B2C, low-ticket transactional, needs leads this week, wants a
   one-off project, cannot edit their own website, no sales follow-up.
2. No page may imply that AI search is required to work with Qognition. A firm that wants classic SEO
   only, or PPC only, is in the ICP. The conversion block must have a door for them (§4.3).

### 1.2 Page types that earn

| Type | URL pattern | Taxonomy level | Ceiling | Recommended committed build | What it earns |
|---|---|---|---:|---:|---|
| **A. Industry hub** | `/industries/<industry>` | 1 | 21 | **21, last** | Head and mid-tail commercial queries; the crawl hub; the entity anchor |
| **A2. Sub-industry page** | `/industries/<industry>/<sub-industry>` | 2 | 341 | **313** (those with ≥1 priority-A child) | The **editorial unit**. The only level the operator gave prompts, keywords, buyer titles and client value to |
| **B. Niche page** | `/industries/<industry>/<sub-industry>/<niche>` | 3 | 2,376 | **conditional — see §1.7** | Mid-tail commercial and problem-aware queries; the citation surface |
| **—. Sub-niche** | *no URL* | 4 | 8,823 | **0** | On-page section, schema value and internal-anchor vocabulary. §1.7. |
| **C. Prompt-set library** | `/insights/<industry>-buyer-prompts` | — | 21 | **21, one per industry, last** | Citation magnet and lead magnet. The literal prompt set, published |
| **D. Comparison** | `/comparisons/<slug>` | — | — | **~10** | Highest purchase intent on the site. Hand-written only |
| **E. Annual observation report** | `/insights/<slug>` | — | — | **4/year** | External citation and link acquisition. See `docs/seo/b2b-offpage-authority.md` §4 |

**The ceiling the taxonomy permits is 11,561 URLs. The number I would publish in the first twelve
months is a low three-figure number, and the operator's own rule 8 is what makes that consistent
with "the operator wants all of them".**

Those two sentences are not in tension and it is worth being explicit about why, because this is the
thing most likely to be misread. Rule 8 does not say build all of them. It says **priority-A first**,
and it assigns a priority to every one of the 2,376 niches. 888 of them are A. A staged build with a
measured gate between stages is the only way "all of them" is ever reachable, because the alternative
— publishing several thousand pages against a domain currently earning 187 clicks a quarter — trips
`CLAUDE.md` §7 test 5 so hard that the whole family becomes a liability rather than an asset. The
operator gets all of them by going in the order they specified, at the rate the evidence allows.

**The arithmetic of "priority A first", measured.** 888 A niches sit under **313** distinct
sub-industries across **all 21** industries. So A-first does not narrow the industry footprint at all;
it narrows the leaf count. Publishing the A cohort at level 3 implies publishing 313 level-2 parents
and 21 level-1 parents, because §5 rule 9 forbids orphans and §5 rule 10 caps depth. That is
**1,222 pages** before a single B or C niche. At the 15–25 pages/month rate revision 2 assumed, the A
cohort alone is a four-to-seven-year programme.

That number is the reason §1.7 exists. 1,222 is not the answer. It is the number you get if you assume
level 3 automatically earns a URL, and that assumption is exactly what needs testing.

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

> **Revision 3 note.** This table maps revision 1's eleven onto `data/b2b/verticals.ts`'s fifteen. Both
> of those are now superseded by the 21-industry ICP spine, and none of the slugs below are the slugs a
> new URL may use — rule 6 makes `data/b2b/icp/icp-taxonomy.json` the only legitimate source. The table
> is kept because the two mappings that **change the buyer** (cybersecurity, and testing/inspection)
> are still true and still trap anyone carrying old work forward. Read it as history, not as a route
> map, and see §0.3 decision 7.


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

### 1.6 What a wave is at 11,561, and what its entry test measures

**This section is the schedule. Its input — which levels are in a cohort at all — is §1.7. Read §1.7
first if you are deciding scope rather than dates.**

#### The unit changed, and that is the substantive change in revision 3

Revision 2 measured a wave in pages, because at 120 entities a page and an editorial decision were the
same thing. At 11,561 they are not. The unit that binds is the **sub-industry**: it is the only level
the operator populated with buyer titles, client value, a `geo_angle`, two Family B prompts and three
PPC keywords, and it is therefore the smallest unit that can be researched, written and reviewed as
one piece of work. Everything above it is an aggregation of it; everything below it is a section of it
until proven otherwise.

> **A wave is one industry's priority-A cohort:** its sub-industry pages that have at least one
> priority-A child, plus the level-3 priority-A niches inside them that pass the §1.7 screen, plus the
> industry hub — published together and gated together.

Twenty-one waves, one per industry. Measured cohort sizes, before the §1.7 screen removes level-3
pages:

| Industry | A niches | Sub-industries with ≥1 A | Cohort pages (L2+L3) | A: AI SEO | A: PPC | A: Both |
|---|---:|---:|---:|---:|---:|---:|
| `saas-and-software` | 80 | 16 | 96 | 26 | 0 | 54 |
| `healthcare-and-life-sciences` | 55 | 18 | 73 | 27 | 2 | 26 |
| `manufacturing-and-industrial` | 55 | 18 | 73 | 23 | 0 | 32 |
| `technology-and-it-services` | 55 | 16 | 71 | 11 | 0 | 44 |
| `emerging-and-micro-niches` | 53 | 17 | 70 | 28 | 0 | 25 |
| `professional-and-business-services` | 53 | 16 | 69 | 29 | 2 | 22 |
| `automotive-heavy-equipment-and-mobility` | 51 | 16 | 67 | 14 | 3 | 34 |
| `financial-services` | 50 | 15 | 65 | 26 | 1 | 23 |
| `environmental-engineering-and-testing` | 46 | 16 | 62 | 15 | 2 | 29 |
| `franchising-and-multi-location` | 45 | 17 | 62 | 11 | 0 | 34 |
| `logistics-supply-chain-and-transportation` | 42 | 16 | 58 | 20 | 0 | 22 |
| `commercial-and-facility-services` | 40 | 16 | 56 | 14 | 0 | 26 |
| `government-nonprofit-and-institutional` | 37 | 16 | 53 | 27 | 0 | 10 |
| `aerospace-and-aviation` | 37 | 14 | 51 | 18 | 0 | 19 |
| `energy-and-utilities` | 36 | 13 | 49 | 19 | 2 | 15 |
| `agriculture-and-food` | 35 | 14 | 49 | 11 | 2 | 22 |
| `hospitality-travel-and-events` | 31 | 14 | 45 | 9 | 1 | 21 |
| `education-and-training` | 30 | 13 | 43 | 15 | 0 | 15 |
| `retail-cpg-and-brand-enablement` | 25 | 13 | 38 | 7 | 0 | 18 |
| `construction-real-estate-and-built-environment` | 22 | 11 | 33 | 8 | 0 | 14 |
| `media-marketing-and-creative` | 10 | 8 | 18 | 7 | 0 | 3 |
| **Total** | **888** | **313** | **1,201** (+21 hubs = **1,222**) | **365** | **15** | **508** |

**Why the industry and not the sub-industry is the wave unit, and it is not tidiness.** A sub-industry
cohort is one level-2 page plus a median of three A niches: four pages. The §8.3 entry test asserts
`pagesWithAtLeastOneImpression28d / indexablePages >= 0.60`. On four pages that threshold is 2.4 pages
— it is a coin flip dressed as a measurement, and it would gate a 2,376-page programme on noise. An
18-to-96-page cohort makes 0.60 mean something. **The cohort size is chosen so the gate is
informative**, and that is the only reason.

Rule 8 says priority-A first. It does not say priority-A simultaneously.

#### Wave 0 — plumbing. Still zero new pages, and it grew

| Item | Status |
|---|---|
| `/industries` publication gate, `lib/industryPublication.ts` + `scripts/check-industry-gate.cjs` | **DONE**, commit `e483547` |
| **The glossary content-model fix, §7.4 step 1** | Outstanding. Still ahead of every wave — reasoning restated for this scale in §7.5 |
| **An `ICP_PUBLISHED_CEILING` assertion over `data/b2b/icp`** | **New and urgent.** Nothing currently gates 11,561 entities. §8.5 |
| **Decision 7: which spine is the URL source** | New. §0.3 |
| **Decision 8: rule 7's canonical-id list, and the 2,371 / 2,376 reconciliation** | New. §0.3 |
| The observation store and the first prompt runs (`OPERATOR-DECISIONS` blocker on `runAudit()`) | Outstanding |
| The Family Q derivation run once, per §3.3, and committed before any page cites it | New |

#### Wave 1 — and it is designed to answer §1.7 with data, not just judgement

Wave 1 is still the evidence cohort: the only sub-industries where reported work exists
(`docs/research/b2b-vertical-substance.md` §2.3), remapped onto the locked slugs.

| Level-2 page | A niches |
|---|---:|
| `technology-and-it-services/managed-it-services` | 2 |
| `technology-and-it-services/managed-security-services` | 3 |
| `technology-and-it-services/cloud-consultancies` | 5 |
| `saas-and-software/cybersecurity-saas` | 9 |
| `saas-and-software/vertical-saas` | 3 |
| **5 level-2 pages** | **22 A niches** |

**All five level-2 pages publish. The 22 A niches split into two pre-registered arms.**

- **Arm 1 — own URL.** Within each parent, niches at an even index when sorted by slug get a level-3
  page.
- **Arm 2 — section.** The rest are written as `<h2>` sections on the parent level-2 page, to the same
  standard, by the same reviewer, with the same observation method.

Same publish date. Roughly 11 and 11. The split rule is deterministic, keyed on slug, and committed
before publication so it cannot be chosen after the fact.

**What this measures, 90 days later.** Per arm: (a) impressions at 28 days, (b) — the one that
matters — **whether the level-3 URL earned an impression for a query its level-2 parent did not also
earn an impression for in the same window**, and (c) whether arm-2 parents out-earned arm-1 parents,
which is the cannibalisation read.

**What it does not establish.** n ≈ 11 per arm, no randomisation across inherent-demand confounders,
one industry pair, one quarter. This is a **directional read, not a causal one**, and I will report it
as one. It is still strictly better than the alternative, which is deciding 2,376 URLs on taste. It
also costs nothing extra: arm 2's copy has to be written either way, as sections.

#### Waves 2 onward

Order: **evidence first, then operator priority density, then vocabulary depth and off-page fit.** Not
A-count alone.

| Wave | Industry | Cohort (pre-screen) | Why here | Gate to enter |
|---|---|---:|---|---|
| 1 | the 5 sub-industries above | 5 L2 + 22 L3 split into arms | The only cohort with reported work. Prove the format and settle §1.7 where it is cheapest | §8 gate green on Wave 0 |
| 2 | `manufacturing-and-industrial` | 73 | Richest standards vocabulary; three of the four dated trigger events land here (off-page §5.1–5.3); best registry fit (IAF CertSearch, Nadcap, Cyber AB) | Wave 1 passes §8.3 tests 1–7 |
| 3 | `technology-and-it-services` (remainder) | 71 − wave 1 | Finishes the cohort Wave 1 opened; vendor partner directories are the strongest off-page asset in the document | Wave 2 passes |
| 4 | `professional-and-business-services` | 69 | Referral market being disintermediated by assistants. **Hold `b2b-marketing-and-demand-gen-agencies` until §3.2's collision decision is made** | Wave 3 passes |
| 5 | `saas-and-software` (remainder) | 96 − wave 1 | Largest A cohort, best-instrumented off-page vertical. Two-part wave if reviewer rate requires | Wave 4 passes |
| 6 | `environmental-engineering-and-testing` | 62 | **Promoted above the revision-2 tier order.** Accreditation registries (NELAP/TNI, A2LA, ISO/IEC 17025) are machine-readable answers to the exact Family B prompts the operator supplied. Closest structural analogue to manufacturing, and uncontested | Wave 5 passes |
| 7 | `aerospace-and-aviation` | 51 | FAA/EASA Part 145, AS9100/AS9110, Nadcap. Same registry argument, higher contract values | Wave 6 passes |
| 8 | `logistics-supply-chain-and-transportation` | 58 | Carried from revision 2 | Wave 7 passes |
| 9 | `financial-services` | 65 | Flagship (commercial insurance). **Blocked on `OPERATOR-DECISIONS` #7, named compliance reviewer, and #8, client-name use.** If neither clears, the wave does not run — it does not run partially | Wave 8 passes **and** #7 cleared |
| 10 | `healthcare-and-life-sciences` | 73 | Same compliance-reviewer requirement. Do not ship before #7 has a precedent from wave 9 | Wave 9 passes |
| 11–21 | the remaining 11 industries | 18–67 each | Ordered on the measured rate, not now. Re-derive the order from waves 1–10's own results rather than from this table | Each on its predecessor |

`emerging-and-micro-niches` (70) goes last within any grouping it appears in, for revision 2's reason:
it has 53 A niches and no research behind any of them, so every page is carried entirely by the
observation block.

#### The rate, restated

```
waves per year = reviewer hours per year ÷ (cohort pages × hours per page review)
```

`[NEEDS DATA: reviewer hours available per month]` and `[NEEDS DATA: measured hours per page review,
first ten pages]`. At revision 2's plausible 15–25 pages/month and the §1.7 screen removing roughly
half of level 3, a median 56-page cohort is a 1.5–3 month build plus a 90-day gate, so **two to three
industries per year**. The full priority-A programme is therefore a multi-year commitment, and I would
rather say that now than have it discovered at wave 4.

I am not arguing the taxonomy down. Every row stays in the file. Priorities B and C stay at spine and
their release condition is unchanged from revision 2 (§1.6 in that revision, restated): one inbound
qualified lead that reached a walkthrough, **or** a paid demand probe that bought clicks at an accepted
cost per qualified lead over a minimum two-week window with a stated budget. Both are measurements.
Neither is a volume estimate.

### 1.7 Which level earns a page

**This is the section that decides the size of the programme, and it is the one to argue with.**

Revision 2 §1.3 argued one strong page per sub-niche beats industry × service. That argument survives
and is unchanged. What it did not have to answer is the harder question this taxonomy asks: given four
levels, **at which level does an entity have demand of its own, rather than being a section of its
parent?**

#### 1.7.1 The test, stated before the answers

An entity earns its own URL when all four hold. Any one failing puts it on its parent's page as a
section.

| # | Test | Why it is the test |
|---|---|---|
| 1 | **A distinct buyer.** Its `buyer_titles` set is not the set of its parent. | §8.2 assertion 7 already enforces this on published pages. Applying it *before* publication is the cheap version. |
| 2 | **A distinct Family Q prompt.** A question about *this* entity's visibility that is not a paraphrase of its parent's (§3.3's derivation). | A page's job in this family is to be the cited answer to a Family Q prompt. No distinct prompt, no distinct job. |
| 3 | **A distinct comparison axis.** The 3–5 axes buyers compare on differ from the parent's. | §4.1 block 6. If the axes are the same, blocks 4, 6 and 7 are the same, and §8.2 assertion 8's 40% shingle bar is unpassable. |
| 4 | **A distinct observation.** Running its prompts returns a materially different set of cited domains from its parent's. | This is a measurement, so it can only be applied after the first panel run. It is the tiebreak, and Wave 1's arm split is how it gets taken. |

#### 1.7.2 Level 4 — sub-niche. **No page. All three fit types. No exceptions.**

8,823 entities, and this is not a close call.

- **There is no operator input at level 4.** `{id, slug, name}`. A page built from a name is a template
  by definition. §8.2 assertion 8 requires ≥40% unique 5-gram shingles against every other published
  page in the family; with a median of four siblings sharing one parent's entire vocabulary, buyer,
  standards set and comparison axis, that bar is arithmetically unreachable.
- **The sub-niches under a niche are capabilities of the same firm, not different firms.** `16.01.01`
  Heavy maintenance (C/D-check) providers has sub-niches `Narrowbody heavy checks`,
  `Widebody heavy checks`, `Regional jet & turboprop checks`, `Structural repair & corrosion
  programs`. One MRO does all four. Qognition's buyer there is one VP of Business Development with
  one budget. Four URLs, one buyer, one offer — that is the industry × service grid rotated ninety
  degrees, and §1.3 already killed it.
- **The demand that exists at level 4 is Family B demand.** "narrowbody heavy maintenance checks in
  Europe" is typed by an airline's fleet planner. Nobody types "narrowbody heavy checks marketing
  agency". §1.1 forbids building a ranking target on the client's buyer's query, and level 4 is that
  failure at 8,823× scale.
- **Test 2 cannot be passed at level 4 in principle.** A sub-niche is a capability of a firm that has
  already been identified at level 3. There is no separate buyer, so there is no separate question
  about that buyer's visibility, so there is no Family Q prompt to be cited for. §3.3.

**What level 4 is for instead, and it is genuinely valuable.** Three jobs, all on the parent's page:

1. **The coverage grid.** A table on the level-3 (or level-2) page listing the sub-niches as the
   capabilities the buyer's own customers ask for. Tabular, server-rendered, extractable — §3.4.
2. **The entity vocabulary.** 8,823 rows of capability language, spelled the way the industry spells
   it. This is exactly what §3.4's entity-consistency requirement needs and it is the operator's
   words, not ours.
3. **The prompt qualifier bank, which solves a real scaling problem.** §8.2 assertion 3 requires ≥8
   distinct prompts per page and assertion 4 forbids sharing a prompt with any other page. The
   operator supplied two per sub-industry. The other six must come from somewhere, and inventing them
   breaches rule 10's spirit. Level 4 is the source. Worked example, `18.02` Specialty, Industrial
   Cleaning & Restoration — supplied: *"cleanroom cleaning contractors experienced with GMP
   pharmaceutical facilities"*. Level-4 rows under `18.02.01` are `Semiconductor fab cleanroom
   services`, `Compounding pharmacy cleanroom cleaning`, `Biotech lab & vivarium cleaning`. Three more
   distinct prompts, in the operator's vocabulary, derived not invented. **This is how assertion 4
   stays passable at scale.**

If Kyle needs one sentence for ADR-0008: **level 4 is data, never a route.**

#### 1.7.3 Level 3 — niche. The answer differs by fit, and this is why the operator's field matters

2,376 entities, 888 of them priority A. The operator put `fit` here and nowhere else, which is a
strong hint that this is the level where the buy-versus-earn question is actually decided.

**`PPC` fit — 190 niches, 15 of them A. No organic page at level 3. Barely one at level 2.**

The reasoning runs through the supplied keywords and it is the cleanest of the three. The operator's
1,023 `ppc_keywords` are **Family B** — `commercial roof repair`, `pfas testing lab`,
`environmental testing lab`, `crm software for small business` (§2.1, §3.2). Those are the terms
Qognition's *client* bids on. Qognition does not bid on them, ever. Qognition's own paid term for that
niche is `ppc agency for <something>` or `google ads for <something>`, and at level 3 that string does
not exist as a query — nobody searches `google ads agency for kitchen exhaust hood cleaning
companies`. The modifier a paid-search buyer actually types is level-2-shaped at best and usually
level-1-shaped.

So for `PPC` fit the page is the wrong artefact at every level below the industry, and the correct
artefacts are the three revision 2 already specified: a `noindex, follow` `/lp/<campaign>` destination
(§2.5), one line in the level-2 page's fixed service block, and the `/ppc` layer page carrying the
head term. **Rule 8 defers 175 of the 190 anyway** — 115 B and 60 C — so this costs almost nothing in
the A-first build, and that alignment is worth noticing rather than treating as a coincidence.

> One thing the operator should see: **of 888 priority-A niches, 15 are `PPC` fit. 1.7%.** Building A
> first is correct and it means the paid door is served by `/ppc` and `/lp/*` for years, not by this
> family. If PPC is expected to carry pipeline sooner than that, the lever is §2.5's demand probe and
> Marcus's campaign structure, not a niche page.

**`AI SEO` fit — 1,059 niches, 365 of them A. Page only on passing §1.7.1. Default is a section.**

`AI SEO` fit means research-led buying with no clean commercial search demand. The win is a
**citation**, and the only thing that earns one here is the observation block (§0.4). The observation
block is produced by running a prompt panel — and the panel is supplied at level 2. A level-3 page
therefore has to justify a panel of its own, which means passing test 4: its prompts return a
materially different set of cited domains from its parent's.

That is frequently true and frequently false, and which it is depends on the niche, not on the level.
`technology-and-it-services/cybersecurity-consulting-and-testing` has A children
`penetration-testing-firms`, `incident-response-and-dfir-firms`,
`virtual-and-fractional-ciso-services`, `ot-ics-security-consultancies`. Those are four different
purchases with four different buyers and four genuinely different cited-source landscapes — DFIR
answers cite incident-response vendors and CISA advisories, pen-test answers cite CREST and OSCP
registries. They pass. By contrast `saas-and-software/cybersecurity-saas` has A children
`cloud-security`, `application-security`, `data-security`, `network-security` — four category labels
whose answers will cite the same analyst properties, the same review platforms and largely the same
vendors. They fail test 4 and belong as sections.

**My estimate is that roughly half the `AI SEO` A niches pass, and I am labelling it as an estimate.**
It is a judgement from query shape and buyer structure, not a measurement, and there is no keyword
export in this repo to check it against. `[NEEDS DATA: the §1.7.1 screen run over all 365 priority-A
`AI SEO` niches, with the four test outcomes recorded per niche]` Wave 1's arm split is the first real
evidence and it should move this number.

**`Both` fit — 1,127 niches, 508 of them A. This is the default level-3 page population.**

`Both` means the niche has a research-led prompt surface **and** commercial demand. That is the only
combination where one URL can carry the observation block, the mid-tail organic target and a
conversion block a paid visitor would also accept — which is precisely the page §2.5 says is hard to
build and §1.3 says is worth building once rather than three times. It is also where test 3 passes
most often, because a niche with commercial demand has a comparison axis buyers state out loud.

They still go through §1.7.1. A `Both` niche that shares its parent's buyer and axis is a section like
any other.

#### 1.7.4 Level 2 — sub-industry. **Always a page, for the 313 with a priority-A child.**

This is the editorial unit and the recommendation is unconditional. It is the only level with buyer
titles, client value, a `geo_angle`, supplied prompts and supplied keywords; it is the level a Family Q
prompt is naturally phrased at (§3.3); and it is the level that can absorb its children as sections
when they fail §1.7.1, which is what makes the whole design elastic instead of all-or-nothing.

The 28 sub-industries with no priority-A child stay at spine under rule 8.

#### 1.7.5 Level 1 — industry. **A page, 21 of them, published last within its wave.**

A hub earns its place as a crawl and entity anchor and as the carrier of the head term (§2.3). It does
not earn its place as a page that ranks — nothing on a domain at 187 clicks a quarter is going to hold
`aerospace marketing agency` — and a hub published before its children is a link block with a
paragraph on top, which is the exact shape §1.4 rejects. Publish it in the same wave as its children
and last in the ordering. §5's depth rule has something to say about this too; see §5.1 rule 10.

#### 1.7.6 The recommendation in one table

| Level | Entities | Recommended pages | Basis |
|---|---:|---|---|
| 1 industry | 21 | **21**, last in each wave | Crawl and entity anchor |
| 2 sub-industry | 341 | **313** with a priority-A child | The editorial unit. Unconditional |
| 3 niche, `Both` fit | 1,127 (508 A) | **508 A candidates**, each through §1.7.1 | Observation block plus commercial demand on one URL |
| 3 niche, `AI SEO` fit | 1,059 (365 A) | **~180 estimated**, each through §1.7.1 | Passes only where the cited-source landscape genuinely differs from the parent's |
| 3 niche, `PPC` fit | 190 (15 A) | **0** | `/lp/*`, the service block line, and `/ppc`. Not an indexable page |
| 4 sub-niche | 8,823 | **0** | Coverage grid, entity vocabulary, prompt qualifier bank. Data, never a route |

**Ceiling permitted: 11,561. Recommended priority-A programme: 21 + 313 + roughly 690 = about 1,020,
over multiple years, each wave gated.** The number is soft on purpose — §1.7.1 decides it entity by
entity and Wave 1 is designed to move it. What is not soft is the shape: **level 2 always, level 3
conditionally, level 4 never.**

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

#### The 1,023 supplied `ppc_keywords` are Universe B. All of them.

**New in revision 3, and it is the most consequential correction in this section.** The operator
supplied three PPC keywords per sub-industry, 341 × 3 = 1,023, verified by count. I sampled them across
all 21 industries and scanned the whole set for agency, marketing, SEO and ads language. The result is
unambiguous:

> **Not one of the 1,023 is a term Qognition would bid on for its own acquisition.**

`crm software for small business` · `pfas testing lab` · `commercial roof repair` ·
`packaging machinery manufacturer` · `refinery turnaround contractors` ·
`industrial outdoor storage` · `aircraft leasing companies`. Every one is a term **Qognition's client**
bids on. They are the paid-search half of the Family B diagnosis — the demand the client is failing to
capture — and they are the raw material of the paid section of the observation, in exactly the way the
682 prompts are the raw material of the organic section.

Three consequences, and they are not cosmetic:

1. **No `ppc_keywords` string may appear as a `primaryQuery`, a title, an H1 or a bid target in any
   Qognition campaign.** This is the same failure mode as `geo_angle` leaking into a ranking target,
   one field over, at 1,023× the count. §8.2 gets a new assertion for it (21).
2. **The paid layer for this family is therefore not built from the supplied keywords at all.** It is
   built from Universe A PPC-service strings — `b2b ppc agency for manufacturers`,
   `google ads agency for msps` — which the operator did not supply and which §2.4 lists.
   `[NEEDS DATA: whether a Universe A PPC keyword set exists anywhere outside this document]`
3. **The supplied keywords have a real and different job**: they are the second half of every page's
   diagnosis block. "Here are the three paid terms your buyers use, here is who is buying them, here is
   who the assistants named for the same question." That is a sales asset built entirely from operator
   data, and it costs nothing to produce.

There is a small collision set where a supplied string is simultaneously Universe B and Universe A.
It is five keywords and four prompts, it is a positioning problem as much as a search one, and it is
handled in §3.2.

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

### 2.4 Tiers across all 15 meta-verticals — **superseded, kept as shape reference**

> **Revision 3 note.** The strings below were written against `data/b2b/verticals.ts`'s fifteen and are
> **not** a keyword plan for the locked spine. They are kept for one reason: they are the only worked
> examples in either document of **Universe A** query shape — what Qognition's own buyer types — and
> §2.1 has just established that the operator's 1,023 supplied keywords are all Universe B. Read them
> as a template for deriving Universe A strings per sub-industry, and never as slugs (rule 6).

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

**Revision 3 adds the level dimension.** Family B is supplied at level 2 and derivable at level 4
(§3.2 finding 4). Family Q is derivable at levels 1, 2 and 3, and **does not exist at level 4**
(§3.3). That asymmetry is not incidental — it is the mechanism by which the taxonomy tells you where a
page belongs, and §1.7 is built on it.

**One more line, carried from revision 2 because the ICP widened.** Family Q has a third shape:
prompts where the asker wants classic SEO or PPC help and has not thought about AI search at all
("how do manufacturers generate leads besides thomasnet"). Those are in the ICP by `CLAUDE.md` §2 and
they are currently absent from the tracked set. Add them. Record the addition and the reason, per
§9.2 — comparability is the whole value of the panel and a silent set change destroys it.

### 3.2 The supplied 682, verified

The operator supplied 682 `ai_prompts`: two per sub-industry, 341 × 2, at level 2 and at no other
level. The brief states they are Family B. **I verified that rather than assuming it**, because the
whole architecture rests on the split and an error here is an error on every page.

#### Method

Three passes, all reproducible from `data/b2b/icp/icp-taxonomy.json`:

1. **Systematic sample.** Every 17th prompt in document order, 41 prompts, which hits all 21
   industries and 41 distinct sub-industries.
2. **Adversarial scan.** The full 682 against a regex for the vocabulary a Family Q prompt would have
   to contain — `marketing|seo|leads?|agency|agencies|advertis|chatgpt|ai search|generate|get found|
   rank|website|demand gen|grow my|market my|promote`. 29 hits, every one read in full.
3. **Structural read** of the four sub-industries whose vendor category *is* a marketing agency, since
   those are the only places the two families can collide by construction.

#### Finding 1 — all 682 are Family B. The classification is correct.

Every prompt has the same asker: **a buyer looking for a supplier.** "best independent MRO for
narrowbody heavy maintenance checks in Europe." "best Nadcap accredited materials testing lab for
fatigue and tensile testing." "which Tier 2 suppliers can build low-volume wire harnesses for a new
commercial vehicle program." None asks about the asker's own visibility, marketing, rankings or AI
presence. **Qognition can never be the cited answer to any of them, and none may be a ranking target.**

#### Finding 2 — Family B has two sub-shapes and they are worth separating, because they sell differently

| Shape | Roughly | Example | What it means for the page |
|---|---|---|---|
| **B-vendor** | the large majority | "best equipment financing companies for construction businesses" | A shortlist request. The observation shows the client which competitors were named. This is the diagnosis. |
| **B-problem** | a visible minority | "how do I get a GSA schedule for my IT services company" · "how to achieve zero liquid discharge at a food processing plant" · "should we rent or buy a trade show booth for eight shows a year" | A how/should question. **The client can realistically become the cited answer to these with one content asset.** This is the prescription, and it is the more saleable half. |

Revision 2 did not make this distinction because the prompt set was hand-written and uniformly
B-vendor. The operator's set is richer than that, and a page that shows the client both shapes — "here
is the question you cannot win, and here is the one you can" — is a materially better diagnosis than
one that shows only the first. **Tag each supplied prompt B-vendor or B-problem when the panel is
built**, and render them as separate rows in the observation table.

#### Finding 3 — the collision set. Four prompts, five keywords, and it is a positioning problem

There are four sub-industries where the vendor category being shortlisted **is a marketing agency**.
In those, a Family B prompt is simultaneously a prompt Qognition could itself be cited for.

| Sub-industry | Supplied prompt or keyword | Why it collides |
|---|---|---|
| `professional-and-business-services/b2b-marketing-and-demand-gen-agencies` | "best B2B demand generation agency for SaaS companies" · "top ABM agencies for enterprise tech companies" · `b2b marketing agency` · `abm agency` · **`b2b seo agency`** | Its `geo_angle` reads *"Agencies buy GEO for themselves, then need to win 'best B2B agency for X' answers"* — so the operator's intent is white-label: Qognition sells **to** these agencies. But `b2b seo agency` is also Qognition's own head term. |
| `franchising-and-multi-location/franchise-marketing-and-lead-generation-agencies` | "best franchise development marketing agency to generate qualified franchise leads" · **"agency that manages local SEO and paid media for 300 franchise locations"** · `franchise marketing agency` · `franchise development marketing` | The second prompt is one Qognition could answer directly. Same white-label-versus-direct ambiguity. |
| `retail-cpg-and-brand-enablement/marketplace-and-retail-media-agencies` | `amazon marketing agency` · `walmart marketplace agency` · `shopper marketing agency` | Weaker collision: these agencies serve consumer brands, and rule 4 bars DTC brands as Qognition clients. Qognition sells to the agency, not the brand. Flagged for completeness. |
| `media-marketing-and-creative/*` | `b2b pr agency` · `presentation design agency` · `influencer marketing platform` | Same weaker pattern. |

**What follows, and none of it is optional.**

1. **No collision string may be a ranking target on its own sub-industry page.** A page at
   `/industries/professional-and-business-services/b2b-marketing-and-demand-gen-agencies` built to rank
   for `b2b seo agency` is written for two incompatible readers at once — the agency owner buying
   white-label, and the CMO buying Qognition direct. §8.2 assertion 18's ban on `geo_angle` as a
   ranking target extends to these strings; assertion 22 makes it mechanical.
2. **No collision keyword may be bid on from that sub-industry's campaign.** Bidding `b2b seo agency`
   inside a vertical campaign aimed at agencies spends Qognition's own head-term budget on a
   white-label audience and competes with Qognition's own `/ai-seo` and `/ppc` pages. Marcus owns the
   call; the flag is mine.
3. **`b2b seo agency` and `abm agency` belong to Qognition's own Family Q**, on `/ai-seo` and `/ppc`,
   tracked in Qognition's own panel, and nowhere else.
4. **Wave 4 holds `b2b-marketing-and-demand-gen-agencies` until the operator decides** whether
   Qognition sells white-label to agencies at all. It is a positioning question, not a search one.
   Ruth sees any copy on that page and on `franchise-marketing-and-lead-generation-agencies` before
   either ships. `[NEEDS DATA: operator decision — does Qognition sell white-label to B2B marketing
   and franchise marketing agencies, and if so how is that reconciled with competing for the same
   prompts]`

#### Finding 4 — 682 prompts do not fill 682 pages' panels, and level 4 is why

§8.2 assertion 3 requires **≥8 distinct prompts per page**; assertion 4 forbids any prompt being shared
between two pages. Two supplied prompts per sub-industry is a quarter of one page's minimum. The gap
is six prompts per page, and inventing them would be exactly the fabrication rule 10 forbids.

The source is level 4, per §1.7.2 job 3: **compose the supplied prompt with the sub-niche names under
the relevant niche.** Every resulting prompt is the operator's own vocabulary, distinct by
construction because sub-niche slugs are 99.3% unique (8,759 of 8,823), and auditable back to two
locked fields.

Worked, from `18.02` Specialty, Industrial Cleaning & Restoration:

| Source | Prompt |
|---|---|
| supplied | "cleanroom cleaning contractors experienced with GMP pharmaceutical facilities" |
| supplied | "who handles large-loss commercial water damage restoration for a hospital" |
| `18.02.01` sub-niche `Semiconductor fab cleanroom services` | "who does cleanroom cleaning for a semiconductor fab" |
| `18.02.01` sub-niche `Compounding pharmacy cleanroom cleaning` | "cleanroom cleaning contractor for a 503B compounding pharmacy" |
| `18.02.02` sub-niche `Tank & vessel cleaning` | "industrial tank and vessel cleaning contractor for a refinery turnaround" |
| `18.02.02` sub-niche `Heat exchanger cleaning` | "who does hydroblasting and heat exchanger cleaning on a plant outage schedule" |
| `18.02.03` sub-niche `Document & electronics recovery` | "document and electronics recovery after a commercial water loss" |
| `18.02.03` sub-niche `National-account priority response programs` | "restoration contractor with a national priority response program for multi-site retail" |

Eight distinct prompts, two operator-supplied and six operator-derived, nothing invented.
**This is what the 8,823 rows are for.**

### 3.3 Family Q, derived per level — because the operator supplied none

**The operator supplied 1,705 Family B strings and zero Family Q strings.** That is not an oversight:
the taxonomy describes the client's market, and Family Q describes Qognition's. But **Family Q is what
a page targets**, so it has to exist before a page can be written, and it has to be derived by a rule
rather than written by feel, or the tracked panel stops being comparable month to month (§9.2).

#### The derivation rule

> **Family Q at level L is the question Qognition's buyer asks about their own visibility, phrased in
> the vocabulary the operator supplied at level 2.**

Every derived prompt must be traceable to a supplied field — `buyer_titles` supplies the asker,
`client_value` supplies the stakes, `geo_angle` supplies the failure mode, and the Family B prompt
supplies the qualifier the buyer is absent from. A derived prompt that cannot be traced to one of those
four is invented and does not go in the panel.

#### Level 1 — industry. Thin, head-shaped, 2 per industry. 42 total.

The only genuinely head-shaped Family Q prompts in the family. They go in the **cross-vertical panel**
and are run monthly regardless of which waves have shipped, because they are the series that shows
whether Qognition is becoming visible at all.

- "which agencies do AI search optimisation for `<industry>` companies?"
- "how do `<industry>` companies get named when buyers ask an assistant for a supplier?"

#### Level 2 — sub-industry. The richest layer, and where the tracked panel lives. 3 shapes × 341.

| Shape | Template | Traced to |
|---|---|---|
| **Q-absence** | "why doesn't ChatGPT recommend my `<sub-industry noun>` when buyers ask for `<supplied Family B qualifier>`?" | `ai_prompts` + `geo_angle` |
| **Q-method** | "what does a `<sub-industry noun>` need on its website for AI assistants to match it to `<supplied qualifier>`?" | `ai_prompts` + `geo_angle` |
| **Q-channel** | "how do `<sub-industry noun>` firms generate leads besides `<the incumbent channel or directory named in the industry brief>`?" | `docs/icp-industries/<NN>.md` + revision 2 §3.1's widened-ICP shape |

Worked, `19.08` Environmental Testing Labs (supplied prompt: *"best labs for EPA 1633 PFAS analysis
with fast turnaround"*; supplied `geo_angle`: *"Named by AI for 'certified lab for [method or analyte]
in [state]'"*):

- Q-absence — "why doesn't ChatGPT recommend my environmental lab when consultants ask for EPA 1633
  PFAS analysis?"
- Q-method — "what does an environmental testing lab need on its website for AI assistants to match it
  to a specific EPA method and state certification?"
- Q-channel — "how do environmental labs win consultant and utility accounts besides state
  certification lists and RFP portals?"

**341 × 3 = 1,023 candidate Family Q prompts. Do not track 1,023.** §9.2's comparability rule means
the panel only grows when a set change is recorded with a reason. **Track the three for a sub-industry
from the month its page publishes**, plus the 42 level-1 prompts and revision 2 §3.3's six
cross-vertical prompts, permanently. At the end of the priority-A programme that is roughly
42 + 6 + 939 prompts — large, but it grew one cohort at a time with a dated line each time, which is
the only way a panel that size stays worth anything.

#### Level 3 — niche. Family Q exists **only** where it is not a paraphrase of the parent's.

This is where the Family Q derivation and §1.7 meet, and it is the single most useful thing in this
section:

> **A niche that cannot produce a Family Q prompt distinct from its parent's is a niche that must not
> have a page.**

That is §1.7.1 test 2, and it is testable in minutes per niche with no data source beyond the locked
taxonomy and the industry brief. It passes for
`technology-and-it-services/cybersecurity-consulting-and-testing/incident-response-and-dfir-firms` —
"how does a DFIR firm get named when a CISO asks an assistant who to call during a live breach?" is
not a paraphrase of anything its parent asks. It fails for
`saas-and-software/cybersecurity-saas/network-security` — "why doesn't ChatGPT recommend my network
security product?" is the parent's Q-absence prompt with one word changed.

When it passes, the niche's Family Q prompt **replaces** the parent's in the panel for that niche and
is tracked from the niche page's publication date. When it fails, the niche is a section and adds no
prompt at all.

#### Level 4 — sub-niche. **No Family Q exists. Zero prompts, 8,823 entities.**

A sub-niche is a capability of a firm already identified at level 3. There is no separate buyer,
therefore no separate question about that buyer's visibility, therefore nothing to be cited for. This
is not a capacity judgement — it is that the prompt cannot be written without inventing a buyer who
does not exist. It is the cleanest proof available that level 4 is a section, and it is why §1.7.2
takes no exceptions.

#### What goes in the tracked file

`clients/qognition-agency/deliverables/geo-citations.md`, or its in-repo equivalent. Appended, never
overwritten. Per §9.2: date, engine, model version, prompt, **family and level** (new in revision 3 —
a panel mixing Q1, Q2 and Q3 prompts without labelling the level is uninterpretable), cited or not,
which URL, what was said. Every set change gets a dated line with the reason.

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
  Sydney, DesignRush and Tracxn say Gurugram. **Publishing roughly 1,020 new pages on top of a contradicted
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
| 5 | **Vocabulary and standards** | ≥6 terms, each with its issuing body and what it gates. No term may appear on more than 25% of pages in the family. | The 25% cap is what stops "ISO 9001" being the entire vocabulary of the manufacturing branch. **Revision 3: the cap is now per parent, not per family** — at ~1,020 pages a 25% family-wide cap is trivially met by any term while three sibling pages under one sub-industry still share every standard they name. Assert it at both scopes: ≤25% of the family, and ≤60% of the published pages under any one level-2 parent. |
| 6 | **The comparison axis** | The 3–5 axes buyers in this niche actually compare on, stated as axes, not benefits. | Machining: tolerance, certification scope, capacity, lead time, NPI support. MDR: MTTD/MTTR, coverage hours, telemetry sources, escalation model, contracted SLA. 3PL: network footprint, WMS and EDI capability, SKU profile fit, temperature control, billing model. |
| 7 | **Why this niche loses the AI answer** | One specific failure mechanism, evidenced from block 3. | Manufacturing: directories and marketplaces occupy the cited slots. Distribution: the distributor is named instead of the principal. Professional services: the Big Four are named because they publish. Government: the registry is cited and the vendor is not. Each is a different fix. |
| 8 | **Proof, or the absence of it, stated** | Either a case-study id that resolves in `data/case-studies`, or `clientProof: 'none'` and a rendered sentence saying no client has been published in this niche. | `CLAUDE.md` §11 forbids implying experience because a page exists. **Most of these pages will carry the honesty line**: Iris's evidence map gives real reported work in four sub-niches out of 120. That line is itself a differentiator; nobody else writes it. |
| 9 | **The conversion event** | The free snapshot, with a niche-specific qualifying question, **plus a second door for SEO-only and PPC-only prospects** (new, §1.1). One primary CTA. | The qualifying question differs: "how many of your part numbers appear on your own site?" vs "which certifications are on a page an assistant can read?" |
| 10 | **Named reviewer and review date** | Real person, ISO date, within 180 days. | `CLAUDE.md` §7 requires it. §8 enforces it. |

### 4.2 Uniqueness, measured

- ≥40% unique 5-gram shingles against **every** other published page in the family, not just the
  nearest sibling. `CLAUDE.md` §7 says "closest sibling"; measuring against all is cheap and catches
  the case where three pages are each 45% unique against their neighbour and 90% identical as a set.
  At the priority-A programme's ~1,020 pages this is the assertion most likely to fail, and it should
  be: `manufacturing-and-industrial` alone has 18 level-2 pages and 55 priority-A niches sharing one
  standards vocabulary, and `environmental-engineering-and-testing` has 46 priority-A niches that all
  name ISO/IEC 17025. **A shingle check against every other published page is O(n²) and at ~1,020 pages
  that is ~520,000 comparisons per build** — still cheap, but it is a build-time cost that should be
  measured before it is assumed. If it becomes the slow step, shingle-hash the corpus once and compare
  against the index, not pairwise. Do not weaken the assertion to make the build faster.
- ≥60% unique against the parent hub.
- ≥900 words of prose excluding navigation and boilerplate. Word count is not quality. It is a floor
  that catches stubs, and I am naming it as that.

### 4.3 The conversion event, per industry

The event is the same across the family — a booked qualified walkthrough is the North Star
(`CLAUDE.md` §3) — but the offer wording has to fit the sales cycle, and since the ICP widened every
page needs a second door.

> **Revision 3.** The table below is keyed on `data/b2b/verticals.ts` slugs and covers eight of the
> twenty-one industries. The **pattern** transfers; the slugs do not (rule 6). Derive the framing for
> the remaining thirteen from two supplied fields rather than by writing it fresh: `client_value` sets
> the sales-cycle reality (a $250k–$5M heavy-check contract is not a $25k/yr lab account) and the
> sub-industry's `fit` sets the second door — `AI SEO` → classic SEO, `PPC` → paid, `Both` → offer
> whichever the prospect asked about first. `[NEEDS DATA: conversion-event framing for the thirteen
> industries not in this table, derived and reviewed before their wave]`

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
## 5. Internal linking model at 11,561

Rules, written so they can be generated and asserted. **Nothing here modifies an existing link, an
existing canonical, an existing redirect or any `robots` directive.** Every rule below applies to new
pages only, so the rollback for any of it is reverting the commit — there is nothing to undo at
Google's end because nothing live changes in either direction.

### 5.0 What breaks at four levels, before the rules

Two of revision 2's rules do not survive the arithmetic and have to be re-stated rather than carried:

**The depth rule breaks.** Revision 2 rule 10 said every page ≤3 clicks from `/`, with the path
`/` → `/industries` → `/industries/<vertical>` → `/industries/<vertical>/<sub-niche>`. At four levels
the natural path to a level-3 niche page is `/` → `/industries` → `/industries/<industry>` →
`/industries/<industry>/<sub-industry>` → the niche. **That is four clicks, and it is not fixable by
wishing.** The fix is stated in rule 10 below and it is a constraint on ADR-0008, not a preference.

**The "hub links to every child" rule breaks.** Revision 2 rule 2 forbade pagination and truncation on
hubs, which was comfortable at 13 children. `manufacturing-and-industrial` has 21 sub-industries and
162 niches. A hub that lists every descendant is a directory, which rule 12's ceiling already forbids.
Restated in rule 2 below: **published children only, never descendants, never unpublished rows as
text.**

### 5.1 The rules

1. **Up.** Every page links to its immediate parent exactly twice: once in the breadcrumb, once in the
   body's first 200 words. Anchor = the parent's `name` from the JSON, verbatim (rule 6).
2. **Down, published-only.** A page links to its **published immediate children** and to nothing
   deeper. No pagination, no "show more" behind JavaScript, no truncation of the published set.
   **Unpublished children do not appear at all — not as links, not as plain text, not as a greyed
   list.** A page that lists 18 unpublished rows as text is a directory stub, and it is the exact
   shape `/locations/*` had.
3. **Sideways, deterministic.** Each page links to **3–5 siblings**, selected by: shared buyer title
   first, then shared standard or accreditation, then alphabetical by slug as tiebreak. Same input,
   same output, every build. Never random, never all. **Selection is keyed on slug, never on array
   position** — §7.2 is the post-mortem for what positional selection does at scale, and it did it at
   320 pages, not 11,561.
4. **Cross-parent, capped at 2**, and only where a standard, accreditation or buyer role is genuinely
   shared. No cross-link without a shared entity that is named on both pages. At 11,561 entities the
   temptation to build a similarity graph is strong and it is the mesh in disguise; see rule 14.
5. **Service links are a fixed block.** Every page links to `/seo`, `/local-seo`, `/ai-seo`, `/geo` and
   `/ppc` once each, in one block, same order everywhere. This block is the structural alternative to
   industry × service pages: the combination is expressed as a link, not a URL.
6. **Proof links are conditional.** Link to a case study only where one resolves for that entity.
   Otherwise link to `/case-studies/methodology` alongside the honesty line. Never fuzzy-match a study
   to an entity — require an explicit id or none.
7. **Prompt library.** Each level-2 page links to its industry's Type C page; the Type C page links
   back to every published level-2 page in that industry. This is the second inbound link that
   satisfies rule 9.
8. **Anchor text varies deterministically.** Three patterns chosen by a stable hash **of the slug**,
   not by `index % 3`: bare name, name + "buyers", name + "in AI answers". Identical exact-match anchor
   across hundreds of pages is a footprint and it reads like a machine.
9. **Orphan rule.** Every indexable page has ≥2 inbound in-content links from published indexable
   pages. Parent + prompt library satisfies it as a floor. **Corollary that is a build-order
   constraint: a level-3 page may not publish before its level-2 parent, and a level-2 page may not
   publish before its industry hub is at least routable.**
10. **Depth rule, restated for four levels.** Every published page ≤3 clicks from `/`. The only way
    that holds is: **`/industries` links directly to published level-2 pages, not only to the 21
    hubs.** Path becomes `/` → `/industries` → `/industries/<industry>/<sub-industry>` → niche = three
    clicks. The industry hub stays in the graph as the entity anchor and the breadcrumb parent; it is
    not the only path down. If ADR-0008 cannot deliver that, the alternative is that level-3 pages
    accept depth 4 and the rule is formally relaxed **with the operator told what it costs** — deeper
    pages get crawled less often, and freshness is a real input to AI citation (§1.4). I would rather
    change the index page than relax the rule.
11. **Connectivity rule.** Within a parent, the sibling link graph forms **one** connected component.
12. **Link ceiling.** ≤40 in-content internal links per page. Above that the page is a directory, and
    directories are the thing these pages exist to displace. A level-2 page with 9 published children
    + 5 siblings + 5 service links + parent + library + proof is 22. Comfortable. A level-2 page
    listing all 21 of its niches is not.
13. **No in-content link from an indexable page to a noindex page.** Footer utility links exempt. This
    stops crawl budget draining into the `/growth` noindex briefs, the noindex place profiles, and the
    `/lp/*` paid destinations in §2.5.
14. **Sub-niche names are never links.** 8,823 sub-niche names appear as on-page vocabulary and in the
    coverage grid. None may be a link, and none may be a `#fragment` link either — a fragment inflates
    the internal link count against rule 12 while adding no crawl path. Stating it because somebody
    will otherwise "help".
15. **No entity appears in two families.** Carried from §8.2 assertion 17 and extended: no entity id is
    published under both `/industries/*` and `/growth/industries/*`, **and no industry is published
    from two spines** (§0.3 decision 7).

### 5.2 The constraint ADR-0008 has to satisfy — for Kyle

Kyle owns the mechanism. `scripts/check-b2b.cjs` §4 already forbids `data/navigation.ts` and
`components/shared/CrossLinks.tsx` from importing the spine, and that assertion is right and should not
be weakened — it is what stops one taxonomy edit changing every page on the site. What follows is the
**SEO constraint the mechanism has to satisfy**, stated as properties rather than as an implementation,
because the implementation is his call.

| # | Constraint | Why it is a constraint and not a preference |
|---|---|---|
| **C1** | **No component's link set may be a function of the whole taxonomy.** A page's outbound in-content links must be computable from the entity, its parent and its published siblings — O(siblings), not O(11,561). | This is the generalisation of the rule the gate already enforces. §7.2 is the worked failure: `relatedTerms` computed as a modulo over a mutable array meant one upstream row change silently rewired 320 pages' internal links, and the snapshot assertion passed because it compared slug *sets*. At 11,561 the same shape rewires the whole family. |
| **C2** | **Determinism, keyed on slug.** Same committed data → byte-identical link graph, every build, on every machine. No positional indexing, no `Math.random`, no "recently published", no build-time ordering dependence. | Same post-mortem. A non-deterministic link graph cannot be asserted, so it cannot be gated, so it is not protected by anything. |
| **C3** | **`/industries` must be able to link directly to published level-2 pages.** | Rule 10. Without it, every level-3 page is at depth 4 and the whole family is crawled at the priority of a footer link. This is the one constraint that requires something to change on an existing page, and it is an **additive** change to one index page — no removal, no canonical, no redirect, no `robots` change. Rollback is reverting that commit; the pre-existing links stay. |
| **C4** | **Inbound link count per page must be a function of level and priority, not of population size.** | The point of a hierarchical graph is that crawl priority flows to the pages you chose. A mesh flattens it: when everything links to everything, nothing is signalled as important, and the thing you lose is precisely the ability to concentrate on the priority-A cohort that rule 8 exists to prioritise. |
| **C5** | **No mesh footer, no mega-menu, no A-Z index of the taxonomy.** Not now, not as a "temporary" internal-linking aid. | It is the `/locations` sidebar failure at 90× the scale — a link tax paid on every page on the site into a family that has earned nothing yet, and §5.3 records what that sidebar already cost. It also breaks C1 and C4 simultaneously. |
| **C6** | **Unpublished entities must be invisible, not merely unlinked.** No text lists, no greyed rows, no `disabled` anchors, no `<link rel>` hints, no sitemap entry. | A page that enumerates 18 things it does not have is a stub with a directory on it. This is also what makes the §1.7 "section not page" decision safe: a folded-in niche appears as an `<h2>` with real content, never as a dead list item. |
| **C7** | **The link graph must be assertable by a script that reads only committed data.** | Every rule in §5.1 is written to be checkable. If the mechanism computes links at request time from something not in the repo, §8.2 assertion 13 cannot run and the graph is ungated. |
| **C8** | **Whatever holds the published set must be an explicit hand-written allowlist**, not a predicate derived from the data. | `lib/industryPublication.ts` states the reason in its own comment and it is right: a list derived from the data agrees with the data by construction and therefore gates nothing. The point of the list is that it **can** disagree. At 11,561 this matters more, not less. §8.5. |

**What I am explicitly not asking for.** I am not asking for a similarity engine, an embedding-based
related-pages block, or a generated "you might also like" module. Rule 3's three-key deterministic
sibling selection is sufficient, it is auditable, and it is the only version that can be asserted.
Anything smarter is a system whose output nobody can predict before a build, attached to the crawl
graph of a family that is meant to be the domain's recovery.

### 5.3 What this replaces

The existing sub-industry template's sidebar links to `/locations`, `/resources` and `/directory` on
every page. Those are three of the four worst clicks-per-page families on the domain. **I am not
proposing any change to existing pages** — but new rows must not inherit that sidebar block. At
revision 2's 75 pages it was a link tax paid 75 times into families earning 0.08–0.13 clicks per page
per quarter. At the priority-A programme's roughly 1,020 pages it is paid 1,020 times. If the shared
component makes that unavoidable, that is a reason to give new rows their own sidebar variant (§0.3
decision 6), and at this scale the decision is no longer marginal.

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
### 7.5 Does the glossary fix still come first at 11,561? Yes, and the case is stronger

I put the §7.4 step 1 fix ahead of every wave in revision 2, at a 135-page ceiling. The operator is
right to re-ask it at 11,561, because "a small fix blocking a large programme" is exactly the shape of
a rule that should be re-examined rather than inherited. **It holds, and three things about this scale
strengthen it rather than weakening it.**

**1. The blast radius argument gets worse, not better.** The §7.4 case rests on one sentence:
seven consumers of `INDUSTRIES` were enumerated and there were eight, and the eighth **removes**
published URLs when unrelated data changes upstream. The lesson is not "there is a bug in
`seoExpansion.ts`". The lesson is **"an enumeration of consumers, written by careful people, was
wrong."** Revision 3 has now found the same class of error twice more, in this session: nothing in the
repo imports `data/b2b/icp` — including the gate that is supposed to guard it (§8.5) — and there are
three spines claiming `/industries/*` with only one of the three collisions currently asserted
(§0.2). A programme about to add an order of magnitude more data is not the moment to trust the next
enumeration either.

**2. The mechanism is positional, and §5's whole design is now built on the opposite.** §5.2 C2 makes
slug-keyed determinism a constraint on ADR-0008, justified by citing §7.2 as the post-mortem. It is
not coherent to require slug-keyed determinism for the new family while leaving the old family's
`relatedTerms` computed as `[(index+7) % n, (index+19) % n, (index+31) % n]` over a truncated, mutable
array. Either positional derivation of a link graph is unsafe or it is not.

**3. The cost of the fix did not change and the cost of the failure did.** Step 1 is replacing
`slice(0, 320)` with an explicit allowlist seeded from the current published set — byte-identical
output on landing, a no-op at Google's end, revert restores `slice(0, 320)`. It is the cheapest item
in either document. What changed is what it is protecting: a wave commit now touches a 2.2MB data file
under active weekly edit rather than a 120-row TypeScript literal.

**What it does not block.** Step 1 blocks **publication**, not work. Wave 0's other items — the ICP
ceiling assertion, the spine decision, the Family Q derivation, the first prompt runs, the §1.7.1
screen — all proceed in parallel and none of them touches `SERVICES`, `INDUSTRIES` or `LOCATIONS`.
Steps 2 through 5 of §7.4 are **not** wave blockers and never were; only step 1 is.

#### A measurement correction, carried honestly

The operator's brief refers to **162 location terms** in the glossary and rule 5 forbids pruning them.
**I measure 135.** Method, run on 2026-09-29 against `data/seoExpansion.ts` and `data/locations.ts`:
`GLOSSARY_TERMS` is 320 entries; 135 of them begin with a city name from `LOCATIONS`; the same 135 is
returned by matching on location slug prefix; they represent **45 distinct cities** out of the 70 the
source array feeds in, which is the §7.2 truncation biting inside the `LOCATIONS` block. Category
counts on the published 320: `Digital marketing` 131, `Local SEO` 129, `AI search` 30, `Lead
generation` 14, `Paid media` 12, `Technical SEO` 4.

I could not reproduce 162 by term prefix, slug prefix, category, or any combination. It may count a
different source array, a pre-truncation figure, or a different definition of "location term".
`[NEEDS DATA: how the 162 figure is derived, so the two counts can be reconciled]`

**The constraint is unaffected either way.** Rule 5 says do not expand, do not delete, do not redirect,
do not noindex, and do not prune. Nothing in this document does any of those to any glossary term,
location page or city page, and §7.4 step 1 is specifically designed so that the published set is
**byte-identical** on landing — which is the only change to that family I am recommending at all.
§7.4 step 5 (whether location terms deserve 135 of 320 slots) stays explicitly out of scope and needs
the backlink export first.

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
| **19** | **No page asserts or implies that a firm outside the taxonomy is not a fit, and no page makes AI search a condition of engagement.** Denylist seeded with `only work with`, `exclusively for`, `if you are not`, `must already` | The widened ICP being narrowed back by copy |
| **20** | **Every published entity's `industrySlug`, `subIndustrySlug`, `nicheSlug` and rendered `name` are byte-identical to `data/b2b/icp/icp-taxonomy.json`.** No derived, pluralised, title-cased or "friendlier" variant anywhere in page data | Rule 6. A renamed slug is an invented slug, and at this scale it will happen by accident before it happens by intent |
| **21** | **No string from any sub-industry's `ppc_keywords` appears in a title, an H1, a meta description or a `primaryQuery` field on any page** | §2.1. The supplied keywords are Universe B. This is assertion 18's failure mode one field over and 1,023× the count |
| **22** | **No string in the §3.2 finding-3 collision set appears as a `primaryQuery` on any `/industries/*` page** (`b2b seo agency`, `b2b marketing agency`, `abm agency`, `franchise marketing agency`, `franchise development marketing`) | Those five are Qognition's own Family Q. A vertical page targeting them competes with `/ai-seo` and `/ppc` and addresses two incompatible readers |
| **23** | **Every prompt in a page's observation set is either verbatim from that sub-industry's `ai_prompts`, or composes a supplied prompt with a `sub_niches[].name` from an entity beneath the page.** Every prompt carries `family: 'B'` and `shape: 'vendor' \| 'problem'`; every Family Q prompt carries `family: 'Q'` and `level: 1 \| 2 \| 3` | §3.2 finding 4 and §3.3. This is what makes assertion 4 passable at scale without inventing a prompt, and what keeps the panel interpretable |
| **24** | **A level-3 entity may not be `published` unless its §1.7.1 screen record exists**, naming the four test outcomes, the reviewer and the date; and its level-2 parent is already `published` | §1.7 and §5.1 rule 9. Without it, "level 3 earns a page" quietly becomes the default again |
| **25** | **No sub-niche (level-4) id appears as a route segment, a sitemap entry, an `href`, or a fragment link anywhere** | §1.7.2 and §5.1 rule 14. 8,823 entities, zero routes, asserted rather than assumed |

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

7. **New in revision 3 — the level test, and it is the only structural addition to the mechanism.**
   `levelThreeWithParentIndependentImpression / levelThreePublished >= 0.40`, where the numerator
   counts level-3 pages that earned ≥1 impression for at least one query for which the **level-2
   parent earned no impression in the same window**.

   The mechanism is unchanged: a committed file, a stale pull fails the build, an unmet ratio blocks
   the next wave. What test 7 adds is that the gate now measures **whether the level it is scaling is
   the right level**, not only whether the cohort earned something. At 120 entities that question did
   not arise. At 2,376 possible level-3 URLs it is the question.

   **What failing it means, and it is not "stop".** If test 7 fails for a cohort, the next wave
   publishes **level 2 only**, with its priority-A niches folded in as §1.7 sections. The programme
   continues at a third of the page count and most of the coverage. Re-test at the next cohort. A
   level-3 page that only ever earns impressions for queries its parent also earns is not adding
   demand; it is splitting it, and that is cannibalisation with extra reviewer hours attached.

   Wave 1's pre-registered arm split (§1.6) is the first read on this. `[NEEDS DATA: the 0.40
   threshold is my judgement from query-shape reasoning, not a measurement. Revisit it against Wave
   1's arms before it gates Wave 3.]`

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

### 8.5 The ICP taxonomy has no gate at all, and that is Wave 0's first item

`scripts/check-b2b.cjs` opens by declaring a ceiling:

```js
const B2B_PUBLISHED_CEILING = 0;
```

with a comment explaining exactly why it is a literal rather than a computed value — *"a ceiling
derived from the data agrees with the data by construction and gates nothing"*. That reasoning is
correct and it is the best thing in the file.

**It guards `data/b2b/verticals.ts`. Nothing guards `data/b2b/icp`.**
`grep -rn "b2b/icp" app components lib data scripts` returns nothing. The only thing standing between
11,561 entities and a route is `publishedIcpPaths()` returning a hand-written `[]`, and **no assertion
anywhere requires it to keep doing so.** The function's own docstring calls it "the single most
important function in the file" and "what stands between the taxonomy and the scaled-content pattern
that produced 2,161 location pages at 0.13 clicks each". It is doing that job on a comment.

**Wave 0 item, and it is three assertions in one file:**

1. `ICP_PUBLISHED_CEILING`, a literal, starting at `0`, raised by exactly one cohort's size in that
   cohort's commit by a human who is therefore on the diff. Same pattern, same reasoning, same file as
   `B2B_PUBLISHED_CEILING`.
2. **Slug disjointness across all three spines**, not two. The existing §2 check catches
   legacy ↔ `verticals.ts` and fails loudly on `financial-services`. The same collision from the ICP
   side is currently silent, and the ICP spine additionally shares fifteen industries with
   `verticals.ts` under near-identical slugs. Assert that no ICP industry slug is routable while a
   legacy or `verticals.ts` entity owns the same URL.
3. **The blast-radius grep extended.** §4 of the gate greps `data/navigation.ts`,
   `components/shared/CrossLinks.tsx` and `lib/sitemap.ts` for imports of `data/b2b`. Extend the
   pattern to `data/b2b/icp` explicitly — the current string match may or may not catch it depending
   on how the import is written, and "may or may not" is not a gate.

**Until all three land, no entity from this taxonomy may be promoted past `spine`, regardless of how
green §8.2 and §8.3 are.** A per-page gate on a family with no ceiling is a lock on a door in a wall
that has not been built.

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

- Date, engine, model version, prompt, **family (`B` / `Q`), shape (`vendor` / `problem`) and level
  (1 / 2 / 3)**, cited or not, which URL, what was said. The three new columns are revision 3's
  addition: at 11,561 entities a panel that mixes level-1 and level-3 Family Q prompts without
  labelling which is which cannot be read, and a month-on-month comparison of an unlabelled panel is
  worse than no comparison because it looks authoritative.
- Family Q prompts for Qognition's own visibility — 42 level-1 prompts and revision 2's six
  cross-vertical prompts permanently, plus three level-2 prompts per sub-industry **from the month
  that sub-industry's page publishes**, plus one level-3 prompt per niche that passed §1.7.1 test 2.
  Every addition gets a dated line with the reason (§3.3).
- Family B prompts as the per-entity observation the pages publish — supplied verbatim or composed
  from level-4 sub-niche names, never invented (§3.2 finding 4, §8.2 assertion 23)

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
| 1 | **No gate over `data/b2b/icp`** — no ceiling, no consumer, no assertion (§8.5) | Every wave. This is now item 1, ahead of everything |
| 2 | **The glossary content-model fix** (§7.4 step 1, restated for scale in §7.5) | Wave 0, and therefore every wave |
| 3 | **Which spine is the URL source** (§0.3 decision 7) — three spines claim `/industries/*`, all three claim `financial-services` | Any new URL at all |
| 4 | **Rule 7 has no `INDEX.md` to read canonical ids from** (§0.3 decision 8), and `unique_niches: 2,371` does not reconcile with the 2,376 the data produces | Overlap handling; the count in every report |
| 5 | Reviewer throughput per month | The wave schedule, and the §1.7.1 screen rate |
| 6 | Is the observation engine real — G.O.L.E.M yes, `runAudit()` no | Every page in the family |
| 7 | The office-claim contradiction (`OPERATOR-DECISIONS` #1), extending to third-party directories | Entity consistency for ~1,020 new pages, and all off-page work |
| 8 | The agreed indexable-pages-to-sessions ratio | Wave gate test 6 |
| 9 | Whether new rows may use a sidebar variant omitting `/locations`, `/resources`, `/directory` (§5.3) | Every new page's link tax, now paid ~1,020 times |
| 10 | Named compliance reviewer (`OPERATOR-DECISIONS` #7) | Wave 9 (`financial-services`) and Wave 10 (`healthcare-and-life-sciences`) |
| 11 | Paid budget for Qognition's own site | §2.5's demand probe, and therefore the priority-B and C release |
| 12 | Whether to restore a real page at `/glossary/ai-seo-and-sge-strategy-audit` (§7.4 step 4) | Recovering the domain's best ranking asset |
| 13 | Competitor-brand bidding: yes or no (§2.5) | Marcus's campaign build; Ruth reviews the ad copy either way |
| 14 | **Does Qognition sell white-label to B2B marketing and franchise marketing agencies** (§3.2 finding 3) | Wave 4's composition, and five keywords that are both Universe A and Universe B |
| 15 | **ADR-0008's mechanism against the C1–C8 constraints** (§5.2) | The link graph for the whole family |

### NEEDS DATA

Carried from revision 2 and still open:

- Keyword export with volume and difficulty for §2.4, US market, Australia secondary
- Reviewer hours per month, and measured hours per page review, first ten pages
- Backlink export before any consolidation decision, and before §7.4 step 5
- Confirmation that no edge bot management is challenging `OAI-SearchBot`, `PerplexityBot` or
  `Claude-SearchBot`, verified from server logs
- The agreed indexable-pages-to-organic-sessions ratio referenced in `CLAUDE.md` §7
- Primary log-level evidence on `llms.txt` fetch rates
- Whether any assistant parses `FAQPage` JSON-LD; no primary source either way
- Monthly paid budget available for Qognition's own site, or confirmation it is zero
- Which of the 31 never-published glossary terms have standalone demand

New in revision 3:

- **Operator decision: the ICP spine is the sole route source for new URLs**, `data/b2b/verticals.ts`
  demoted to a data-only artefact, legacy retains `/industries/financial-services` (§0.3 decision 7)
- **The canonical id for each declared overlap**, and reconciliation of `counts.unique_niches: 2,371`
  against the 2,376 rows `allIcpNiches()` returns. Measured, there is one duplicated niche slug
  (`facilities-management-firms`, `02.16.04` and `07.14.06`), not five (§0.3 decision 8)
- **How the "162 location terms" figure is derived.** I measure 135, by two independent methods, across
  45 distinct cities (§7.5). Rule 5's protection applies either way and nothing here prunes any of them
- **Operator decision: does Qognition sell white-label to B2B marketing and franchise marketing
  agencies**, and how that is reconciled with competing for the same prompts (§3.2 finding 3)
- **Whether a Universe A PPC keyword set exists anywhere outside this document.** The supplied 1,023
  are all Universe B (§2.1)
- **The §1.7.1 screen run over all 365 priority-A `AI SEO` niches**, with the four test outcomes
  recorded per niche. My "roughly half pass" is a judgement from query shape, labelled as one (§1.7.3)
- **Validation of the 0.40 threshold in wave-gate test 7** against Wave 1's pre-registered arms before
  it gates Wave 3 (§8.3)
- Off-page: live verification of every row in the six new source maps, with a fetch date
  (`docs/seo/b2b-offpage-authority.md` §0.2, §3.16–§3.21)

---

**Not reviewed by Ruth (brand-guard).** Nothing here is client-facing yet, but the page copy this
architecture produces will be, and it goes through the gate before it ships.
