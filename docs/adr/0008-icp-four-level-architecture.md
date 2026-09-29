# ADR-0008: The ICP taxonomy as a four-level page architecture

- Status: **proposed**
- Date: 2026-09-29
- Branch: `b2b-ai-search`, at `9299e1d`
- Author: Kyle (architect). **Interface only. No feature code.** Implementation goes to Luke (`backend-dev`) and Mira (`frontend-dev`). Owen (`quality`) reviews before anything lands.
- Depends on: ADR-0001 (route map, `/growth` freeze, `data/industries.ts` freeze), ADR-0002 (Sanity-with-committed-floor), ADR-0006 (compile-error-beats-a-policy), ADR-0007 (the B2B spine, publication union, gate chain)
- **Amends ADR-0007** in four places: §5.2 (crawl-depth ceiling of 3), §2.3 and §5.2 (meta-verticals are grouping only and never a URL segment), §5 (`related` declared, max 4), §6.3 item 9 and §6.5 (the ceiling as a single integer). Everything else in ADR-0007 is carried forward unchanged and is cited rather than restated.
- Constrains: `data/b2b/**`, `lib/b2b/**`, `app/industries/**`, `lib/sitemap.ts`, `scripts/check-b2b.cjs`, `scripts/check-industry-gate.cjs`

## Precedence, stated first because it decides two of the six questions

`docs/icp-positioning.md` is operator-locked and outranks `CLAUDE.md`, which outranks this ADR.
Where I read them as conflicting I say so and stop rather than pick. There is one such conflict and
it is in §4.

The four hard constraints I was given are treated as axioms throughout: legacy city and local pages
are untouched (rule 5); slugs and ids come from the JSON and are never invented or renamed (rule 6);
the 5 declared overlaps build under the canonical id (rule 7); existing meta titles, descriptions,
URLs and internal linking do not change.

## Decision, in one sentence each

1. **URL shape.** Routes exist at all four levels. `/industries/<industry>/<sub-industry>/<niche>` is the deepest level that is a page *by default*; the 8,823 sub-niches are addressable `#<slug>` sections on their niche page and are promoted to their own URL individually, through the same authored-body gate as every other level. *(Nadia's revision 3 agrees on levels 1–3 and disagrees on where a promoted sub-niche's URL hangs. Measured trade in §2.5; open, and it blocks nothing before Wave 3.)*
2. **Collisions.** The entire collision surface between the ICP taxonomy and the legacy spine is **one string, `financial-services`, at the industry level only** — measured, not assumed. Ownership resolves per path prefix, longest legacy match first; because `data/industries.ts` is exactly two levels deep, segments 3 and 4 can have no legacy claimant.
3. **Two taxonomies.** `data/b2b/verticals.ts` stops being a taxonomy and becomes a 15-entry alias map over `data/b2b/icp/`. Mira's two authored bodies are re-keyed, not orphaned and not rewritten.
4. **Build.** SSG and `dynamicParams = false` retained at all four levels. The fallback ladder opens level 4 first, then level 3, never levels 1–2.
5. **Ceiling.** The single integer is replaced by a cohort allowlist. **The promotion unit is the sub-industry cohort**: one sub-industry page plus its priority-A niches. Typically 4 pages, worst case 11. That is the unit a human can actually review.
6. **Linking.** `related` is deleted. The taxonomy tree *is* the link graph. Maximum generated link block anywhere in the system is 21. There are exactly 18 cross-tree links site-wide, all operator-supplied.

## Tenancy

Derived from the code today, 2026-09-29, not carried over from ADR-0007. `package.json` contains no
auth dependency (`next-auth`, `@auth/*`, `@clerk/*`, `@supabase/*`, `lucia`, `passport`,
`jsonwebtoken`, `iron-session`: none). A grep for
`getServerSession|userId|tenantId|organizationId|accountId|workspaceId` across `lib app components`
returns two hits and **both are prose inside comments** asserting the absence
(`lib/b2b/observationStore.ts:17`, `app/api/audit/route.ts:47`). There is no `middleware.ts`;
`proxy.ts` is unrelated. **Single-tenant public marketing site.** Nothing in this ADR touches a
query, an endpoint or a cache key that is scoped to a customer. The only untrusted-input surface
remains the audit target URL guarded by `normalizeTargetUrl` (ADR-0003), untouched here.

---

## 1. Verified state

Every row computed from the repo at `9299e1d` on 2026-09-29 by walking
`data/b2b/icp/icp-taxonomy.json`. Nothing here is recalled and nothing is from the `counts` block
except where the column says so.

### 1.1 The taxonomy

| Fact | Value | How |
|---|---:|---|
| Industries | 21 | walked |
| Sub-industries | 341 | walked |
| Niches | 2,376 | walked |
| Sub-niches | 8,823 | walked |
| **Total entities** | **11,561** | walked; matches the file's own `counts` block |
| Niche priority A / B / C | 888 / 1,173 / 315 | `counts.priority` |
| Niche fit AI SEO / PPC / Both | 1,059 / 190 / 1,127 | `counts.fit` |
| Declared overlaps (rule 7) | 5 | `overlaps` |
| Dedupe log entries | 13 | `dedupe_log` |
| Industries flagged `is_new_industry` | 6 (ids 16–21) | walked |
| File size | 2,230,578 bytes | `stat` |

### 1.2 Where the substance is. This is the single most decision-relevant table in the ADR.

| Level | Count | Fields the operator supplied | Populated |
|---|---:|---|---|
| Industry | 21 | `id`, `slug`, `name`, **`note`**, `is_new_industry` | `note` on 21/21 |
| Sub-industry | 341 | `id`, `slug`, `name`, `is_new`, **`geo_angle`**, **`buyer_titles`**, **`min_firm_size`**, **`client_value`**, **`ai_prompts`**, **`ppc_keywords`**, `niches` | all six on **341/341** |
| Niche | 2,376 | `id`, `slug`, `name`, `is_new`, `fit`, `priority`, `sub_niches` | no prose field at all |
| Sub-niche | 8,823 | `id`, `slug`, `name` | **nothing else exists** |

A sub-niche record is a name. There is no fourth field to find. Any page built from one can only be
a name substituted into a template, which is the artefact CLAUDE.md §7 forbids by name and the exact
thing `scripts/check-b2b.cjs` items 5–7 exist to fail. §2 is built on this row.

### 1.3 Slug uniqueness, at every shape considered

| Shape | Distinct paths | Collisions |
|---|---:|---:|
| `<industry>` | 21 | 0 |
| `<industry>/<sub>` | 341 | 0 |
| `<industry>/<sub>/<niche>` | 2,376 | **0** |
| `<industry>/<sub>/<niche>/<sub-niche>` | 8,823 | **0** |
| **Full four-level path set** | **11,561** | **0** |
| Flat `<industry>/<niche>` (the flatter alternative) | 2,376 | 0 |
| Flat `<industry>/<sub-niche>` | 8,822 | **1** — `technology-and-it-services/migration-and-modernization-partners` |
| Three-segment `<industry>/<niche>/<sub-niche>` | 8,823 | 0 |
| Bare niche slugs, globally | 2,375 | 1 — `facilities-management-firms` |
| Bare sub-niche slugs, globally | 8,759 | **62** |
| Niche/sub-niche name clash inside one industry | — | 0 |

### 1.4 The collision surface against the legacy spine

`data/industries.ts` holds **11 industry ids** and **66 sub-industry slugs**, both verified by count.

| Checked | Collisions |
|---|---|
| ICP industry (21) × legacy industry id (11) | **1: `financial-services`** |
| ICP industry (21) × legacy sub slug (66) | 0 |
| ICP sub-industry (341) × legacy industry id | 0 |
| ICP sub-industry (341) × legacy sub slug | 0 |
| ICP niche (2,376) × legacy industry id | 0 |
| ICP niche (2,376) × legacy sub slug | 0 |
| ICP sub-niche (8,823) × legacy industry id | 0 |
| ICP sub-niche (8,823) × legacy sub slug | 0 |
| ICP industry × `META_VERTICALS` id (15) | 1: `financial-services` |
| ICP sub-industry × `META_VERTICALS` sub-niche id (120) | 22 shared strings |
| ICP niche × `META_VERTICALS` sub-niche id | 4 shared strings |

**One string. `financial-services`. At one level.** That is the whole legacy collision surface at
four levels, and §3 is short because of it.

### 1.5 The 5 overlaps, resolved

Rule 7's overlaps are **semantic**, not path collisions. Four of the five pairs have different
slugs; all five have different full paths. Only `facilities-management-firms` shares a slug, and even
that pair differs at segment 1.

| Buyer | Canonical | Duplicate |
|---|---|---|
| Outsourced / fractional CFO firms | `02.06.01` `professional-and-business-services/outsourced-finance-and-transaction-advisory/outsourced-cfo-firms` | `04.16.01` `financial-services/outsourced-finance-and-risk-advisory/fractional-cfo-firms` |
| Translation & localization agencies | `02.16.01` `…/specialist-business-services/translation-and-localization-agencies` | `13.09.01` `media-marketing-and-creative/translation-and-transcreation/translation-and-transcreation-agencies` |
| Facilities management firms | `02.16.04` `…/specialist-business-services/facilities-management-firms` | `07.14.06` `construction-real-estate-and-built-environment/commercial-real-estate-services/facilities-management-firms` |
| AI implementation consultancies | `09.11.01` `technology-and-it-services/ai-implementation-and-automation/ai-implementation-and-automation-consultancies` | `15.01.01` `emerging-and-micro-niches/ai-implementation-consultancies/ai-implementation-consultancies` |
| Longevity clinic vendors | `15.03.02` `emerging-and-micro-niches/longevity-clinic-vendors/longevity-diagnostic-labs` | `03.17.01` `healthcare-and-life-sciences/longevity-and-aesthetic-clinic-vendors/vendors-serving-longevity-clinics` |

**Consequence: rule 7 is a canonical-tag and content problem, not a routing problem.** No resolver
change is needed for it. Both paths are legitimate URLs; the duplicate carries
`<link rel="canonical">` to the canonical path and renders a pointer instead of a body.

### 1.6 Branching factors, which decide §7

| Edge | min | median | p90 | max |
|---|---:|---:|---:|---:|
| `/industries` → industries | — | — | — | **21** |
| industry → sub-industries | 13 | 16 | — | **21** |
| sub-industry → niches | 1 | 7 | 9 | **10** |
| niche → sub-niches | 0 | 4 | 5 | **10** |

Eight niches have zero sub-niches. Priority-A niches per sub-industry: 888 / 341 ≈ **2.6 mean**.

### 1.7 Repo state at `9299e1d`

| Fact | Value | Source |
|---|---|---|
| `B2B_PUBLISHED_CEILING` | `0` | `scripts/check-b2b.cjs:39` |
| Routable B2B entities | 2, both `draft` | `b2bHubParams()` → `[manufacturing-industrial]`, `b2bSubNicheParams()` → `[manufacturing-industrial/cnc-machining]`, executed |
| Published B2B entities | 0 | `publishedEntities()` |
| `resolveSubIndustry('financial-services','commercial-insurance')` | **`undefined`** | executed |
| Sitemap total, gate-asserted | 4,422 | `scripts/check-industry-gate.cjs:77` |
| `/industries` hub links | legacy 11 only | `app/industries/page.tsx:85` `INDUSTRIES.map(...)` |
| `dynamicParams` on both industry routes | `false` | both files |
| `components/b2b/*.tsx` with `'use client'` | **0 of 5** | read |
| `app/sitemaps/[sitemap]/route.ts` | `dynamic = 'force-static'` | read |

---

## 2. URL shape at four levels

### 2.1 Decision

```
/industries                                                   hub, 21 links          (exists)
/industries/<industry>                                        21 pages               (route exists)
/industries/<industry>/<sub-industry>                          341 pages              (route exists)
/industries/<industry>/<sub-industry>/<niche>                  2,376 pages            NEW ROUTE
/industries/<industry>/<sub-industry>/<niche>/<sub-niche>       0 by default           NEW ROUTE
                                                              8,823 sections + anchors
```

All four levels have a route file. All four levels have an address. **Three levels are a page by
default; the fourth is a section with a stable `#<sub-niche-slug>` anchor on its niche page, and is
promoted to its own URL one at a time through the same gate as everything else.** Nothing is "not
built". The default state of level 4 is section-not-page, and the reason is in §1.2, not in a
preference for fewer pages.

Both new routes carry `export const dynamicParams = false`.

Full build-out under the default: **2,738 URLs** (21 + 341 + 2,376), not 11,561, with all 11,561
entities addressable and linked.

### 2.2 Why the full path and not something flatter

**The flatter `<industry>/<niche>` deletes the only level that can be written from supplied data.**
341 of 341 sub-industries carry `geo_angle`, `buyer_titles`, `min_firm_size`, `client_value`,
`ai_prompts` and `ppc_keywords`. Niches carry `fit` and `priority` and no prose. Removing the
sub-industry from the URL removes the page whose content already exists in the operator's file and
keeps the page that has to be researched from scratch. That is backwards.

**The flat form is collision-free by luck; the full path is collision-free by construction.**
`<industry>/<niche>` has 0 collisions *today* (§1.3) — but 62 bare sub-niche slugs and 1 bare niche
slug already repeat globally, and the flat sub-niche form already collides once
(`technology-and-it-services/migration-and-modernization-partners`). `icp-taxonomy.json` is edited by
hand by the operator and bumped to v2.1 when they choose; rule 6 forbids renaming a slug to resolve a
clash. A shape that stays valid only while nobody adds a second `crm` is not a shape. The parent-scoped
path cannot collide, whatever v2.1 contains.

**The path is 1:1 with the id.** `05.01.01.03` maps to exactly four segments and back. Rule 7's
"canonical id" is then a path, not a lookup table that somebody has to maintain — and a lookup table
is where an invented slug gets in.

**Sub-industry is the one honest crawl node.** A niche page's parent has to be something. Under the
flat shape the parent is the industry, which has 113 niches on average — a 113-link page. Under the
full shape it is the sub-industry, median 7.

### 2.3 Why sub-niches are sections and not URLs by default

Because §1.2 is true. Three fields: `id`, `slug`, `name`. Eight thousand eight hundred and
twenty-three pages whose only distinguishing input is a name is the location-page failure at four
times the scale, and `scripts/check-b2b.cjs` items 5 (Jaccard ≥ 0.60), 6 (template substitution) and
7 (12-word boilerplate) would fail every one of them — correctly.

What the anchor buys, concretely:

- each sub-niche renders as `<h3 id="<slug>">` with its name and its place in the tree, so
  `/industries/a/b/c#sub-niche` is linkable, shareable and citable
- Google and the assistants resolve a fragment to its parent document, so the topical signal
  **concentrates** on the niche page instead of splitting across ten thin children
- the niche page becomes long enough to be a real answer rather than a stub with ten links
- promotion later is **additive and needs no redirect**: the anchor keeps resolving, the section
  becomes a two-line summary plus a link, no URL moves and nothing 301s

**The honest cost if the operator wants all 11,561 as pages instead.** ADR-0007 §3.1's bar is ≥3
sourced facts and ≥3 FAQs per published page, each fact carrying `url`, `publisher` and `accessedAt`,
each page carrying a named reviewer and a date. That is **34,683 sourced facts, 34,683 FAQs and
11,561 named reviews**. This ADR does not forbid it. It puts the number on the table, and it makes
the route exist so the answer can be yes one page at a time.

### 2.4 What this costs, stated

| Cost | Value | Mitigation |
|---|---|---|
| Crawl depth. ADR-0007 §5.2 set 3; this amends it | niche = 4 clicks from `/`; promoted sub-niche = 5 | Every intermediate level is a real page with real children and its own authored body. The depth ceiling was a proxy for "is there a page nobody links to"; §7 replaces the proxy with a reachability walk from `/industries`. |
| URL length | mean 131 chars, max 203 (`construction-real-estate-and-built-environment/building-materials-and-products-manufacturers/plumbing-and-fire-protection-products-manufacturers/sprinkler-heads-and-fire-protection-components`) | Inside every practical limit. `[UNVERIFIED: whether Google truncates the breadcrumb trail in SERP display at this length. Not answerable from the repo.]` |
| Two new route files, four renders in the tree | — | One branch per file, ADR-0007 §2.4's pattern, not a new template family |
| 2,738 potential URLs vs 77 today | 35× | The ceiling in §6 is what governs the rate; the shape governs the destination |

### 2.5 Where this disagrees with Nadia, measured rather than argued

`docs/seo/b2b-niche-architecture.md` revision 3 landed on the working tree while this ADR was being
written (772 insertions, uncommitted at the time of reading). **We converge independently on almost
everything**: the substance gradient in §1.2, the sub-industry as the editorial unit, sub-niches as
anchored sections rather than pages, and three spines claiming `financial-services`. Her §3.4 reaches
§2.3's conclusion from the content side, which is the strongest confirmation this shape is going to
get.

**We disagree on one thing: where a *promoted* sub-niche's URL hangs.** Her §3.5 says it does not
nest — `/industries/<industry>/<sub-industry>/<leaf>`, where a leaf is **either** a promoted niche
**or** a promoted sub-niche, both mounting as children of the sub-industry page. Max crawl depth 4.
Mine nests, and a promoted sub-niche is depth 5.

Her argument is good and it is the right instinct: the sub-industry is the page that holds the
evidence, so a leaf should hang off the page that can support it, and one less level of depth is one
less level of depth. I measured her shape before disagreeing with it.

| | Nadia, flat leaf | This ADR, nested |
|---|---|---|
| Crawl depth for a promoted sub-niche | **4** | 5 |
| Merged leaf namespace, `<industry>/<sub-industry>/<leaf>` | 11,198 leaves → **11,198 distinct paths** | 11,561 entities → 11,561 distinct paths |
| Entities that get an address | **11,560 of 11,561** | **11,561 of 11,561** |
| Within-sub-industry slug clashes | **1** | 0 |
| Max children on a sub-industry page | **55** (262 of 341 exceed 25) | 10 |
| Dotted id ↔ path | 4-part id → 3 segments; a leaf's true parent is not in its URL | 1:1 at every level |
| Breadcrumb vs URL | A promoted sub-niche's breadcrumb shows its niche; its URL does not. They disagree. | Agree |

The one clash is `technology-and-it-services/cloud-consultancies/migration-and-modernization-partners`,
which is **two different sub-niches** — `09.05.01.01` and `09.05.02.01`, under two different niches —
sharing a slug. Under the flat leaf shape one of them cannot have a URL, and **rule 6 forbids renaming
either.** Her §3.5 anticipates this and asks for a gate assertion that no niche slug collides with a
sub-niche slug inside a sub-industry; the assertion is correct and it **fails on the current locked
file**, which she did not have the count for.

**Recommend nesting, and it is close enough that it is a decision, not a ruling.** The deciding
factors are not depth: they are that the flat shape starts one entity short with no legal remedy, and
that it puts up to 55 children on a page whose job is to be readable. The blast radius either way is
small — by Nadia's own estimate a "low single-digit percentage of 8,823" is ever promoted, so this
governs maybe 100–300 URLs in total, and none of them in the first year of waves.

`[DECISION: Kyle recommends nested. Nadia recommends flat leaf. Owen to adjudicate on the numbers
above, or the operator to pick. Levels 1–3 are not in dispute and can proceed either way.]`

---

## 3. The collision surface, and whether the resolver generalises

### 3.1 The surface is one string

§1.4. `financial-services` collides at the industry level. Nothing collides at sub-industry, niche or
sub-niche against either legacy set. The reason is structural, not lucky: **`data/industries.ts` is
exactly two levels deep**, so the legacy tree can never claim segment 3 or segment 4. At four levels,
the collision question reduces to the two segments it already was.

### 3.2 The rule that generalises

Not "legacy wins per parent" and not "legacy wins per sub-slug". Both are special cases of:

> **Ownership is decided per path prefix, longest legacy match first. Legacy wins at whatever depth
> it holds a row, and nowhere below it.**

```ts
// lib/b2b/registry.ts — interface only
export type Level = 'industry' | 'sub-industry' | 'niche' | 'sub-niche';

/** Longest legacy prefix match. Returns the depth at which legacy claims the path, or 0. */
export function legacyClaimDepth(path: readonly string[]): 0 | 1 | 2;

export type IcpRecord = {
  readonly level: Level;
  readonly path: readonly string[];          // exactly `level` segments, from the JSON
  readonly id: string;                       // the dotted id, e.g. '05.01.01'
  readonly canonicalPath?: readonly string[]; // set only on the 5 rule-7 duplicates
  readonly state: 'draft' | 'published';
};

/** Undefined for spine, for an unknown slug, and for a path legacy claims at this depth. */
export function resolveIcp(path: readonly string[]): IcpRecord | undefined;
```

This collapses `resolveIndustry` and `resolveSubIndustry` into one function over a path array, which
is the only shape that does not need a fifth copy when a fifth level is asked for. The four route
files each call it with their own segment count.

### 3.3 The 2026-09-29 per-sub-slug change: right idea, does not work today, and does not yet generalise

I read `lib/b2b/registry.ts#resolveSubIndustry` and then executed it. **Three things block it, and I
measured the outcome rather than reasoning about it.**

**Blocker 1 — the resolver contradicts its own gate.** `resolveSubIndustry` still requires the
*parent vertical* to be routable:

```ts
if (!routableState(vertical.publication)) return undefined;
```

while `scripts/check-b2b.cjs` item 2 asserts that a vertical whose id collides with a legacy id must
**not** be routable. The two conditions are mutually exclusive for `financial-services`. Measured:
`resolveSubIndustry('financial-services','commercial-insurance')` returns **`undefined`**. The commit
that "unblocked commercial insurance" fixed the legacy-first test and left the parent-routable test
standing behind it.

**Blocker 2 — `generateMetadata` was not changed with the resolver.** In
`app/industries/[industry]/[subIndustry]/page.tsx` the metadata branch is still **per parent**:

```ts
const legacyIndustry = INDUSTRIES.find((item) => item.id === industry);
if (legacyIndustry) return getSubIndustryMetadata(industry, subIndustry);
```

For a B2B child under a legacy parent, `getSubIndustryMetadata` finds the industry, fails to find the
sub-industry, and returns `metadataFor({ title: 'Vertical Not Found', noIndex: true })`
(`lib/seo.ts:349–356`) — while the default export below it renders the B2B page. **Metadata and body
would disagree on the same URL.** Latent today only because blocker 1 keeps the route out of
`generateStaticParams`. It goes live the moment blocker 1 is fixed.

**Blocker 3 — the orphan assertion is correct and would fail.** `scripts/check-b2b.cjs` §8 asserts
`parent.source === 'b2b'` for every routable sub-niche. A B2B child under a legacy parent fails it —
and it *is* an orphan, because the legacy hub renders `industry.subIndustries.map` and has no
knowledge of the B2B child. The gate is right; the design was incomplete.

### 3.4 The one colliding parent: four options, and I am not choosing

| | `/industries/financial-services` | Cost |
|---|---|---|
| A | Legacy keeps the hub, ICP children hang off it unchanged | The 16 ICP sub-industries of industry `04` are orphans. Ships the failure §7 exists to prevent. |
| B | Root the ICP tree for `04` under a different slug | **Impossible.** Rule 6 forbids renaming. |
| C | **Legacy hub gains one appended `<section>` listing the ICP children.** Existing meta, H1, description, copy, card order and every existing link untouched. | An *addition* to one existing page. The operator's constraint says internal linking does not change; adding a block changes it by addition. **Needs an explicit yes.** |
| D | Industry `04` is never published | Loses financial services, which contains commercial insurance — the flagship (CLAUDE.md §2). |

**Recommend C.** It is the same interpretation ADR-0007 §"Hard constraint" escalated for
`/industries` and never got an answer to, and it is needed on exactly one page because there is
exactly one collision. `[DECISION FOR OPERATOR]`

### 3.5 What has to change in the same wave, for the resolver to generalise

1. Replace the parent-routable precondition with a **parent-reachable** precondition. Under C, the
   legacy `financial-services` hub is reachable and lists its ICP children, so it is satisfied.
2. Mirror the per-prefix branch into `generateMetadata` on **every** one of the four routes.
   Blocker 2 is a two-line fix and a four-line test; it must not be found by a reader of the served
   HTML a second time.
3. Change `check-b2b.cjs` §8 from "parent record is b2b" to **"an inbound link to this exact path
   exists in the rendered graph"**, which is what it was trying to say and is what survives a legacy
   parent that links its ICP children.
4. Add an assertion that the four-level path set has **zero duplicates** (0 today, §1.3). This is the
   only gate that can catch a v2.1 hand-edit introducing one.

---

## 4. The two taxonomies

### 4.1 First, the conflict I will not resolve silently

`CLAUDE.md` §2 names **both** files as authoritative, eleven lines apart:

- the ICP table row: *"Go-to-market taxonomy — `data/b2b/icp/icp-taxonomy.json`, operator-locked
  v2.0.0. 21 industries, 341 sub-industries, 2,376 niches, 8,823 sub-niches"*
- eleven lines later: *"The authoritative list lives in `data/b2b/verticals.ts`, not in prose here,
  so that it has one representation a script can read."* — followed by the table of 15 meta-verticals.

`docs/icp-positioning.md` rule 1 admits only `icp-taxonomy.json`, and it outranks `CLAUDE.md`. So the
JSON wins on precedence. But the CLAUDE.md sentence is still in the file and will be read as law by
the next person. **One of those two sentences has to be deleted and that is an operator edit, not
mine.** `[DECISION FOR OPERATOR: delete the "authoritative list lives in data/b2b/verticals.ts"
paragraph and the 15-vertical table from CLAUDE.md §2, or tell me the JSON is not authoritative.]`

### 4.2 Decision: a view, not a retirement and not a second source

`data/b2b/verticals.ts` **stops being a taxonomy** and becomes a 15-entry alias map. It is not
deleted, because deleting it loses the mapping that keeps Mira's work and two draft URLs alive.

Grounds:

- Under rule 6, `verticals.ts`'s 15 ids and 120 sub-niche ids are **not from the JSON**. `saas-software`
  is not `saas-and-software`; `manufacturing-industrial` is not `manufacturing-and-industrial`. Keeping
  them as a live URL source is a standing rule-6 breach that gets worse with every page published under
  one.
- They are not a different taxonomy. **22 ICP sub-industry slugs are byte-identical to `META_VERTICALS`
  sub-niche ids** (`horizontal-saas`, `vertical-saas`, `ai-ml-tooling`, `cybersecurity-saas`,
  `health-it`, `payments`, `crypto-web3-b2b`, `packaging-manufacturers`, `construction-tech`,
  `proptech`, `utilities-software`, `cloud-consultancies`, `compliance-training`, `hotel-tech`,
  `foodservice-distribution`, `hospitality-staffing`, `nonprofit-tech`, `association-management`,
  `ai-implementation-consultancies`, `longevity-clinic-vendors`, `private-equity-services`,
  `robotics-as-a-service`), and 4 ICP *niche* slugs likewise. They are **one taxonomy at two
  resolutions**, and the same string means a different level in each. Running both is how a link
  silently points at the wrong depth.
- Keeping both also keeps two publication mechanisms, two gates and two graphs, which is the "three
  spines" cost ADR-0007 §9 already recorded as bad and accepted at 120 entities. At 11,561 it is not
  acceptable.

What survives in the file:

```ts
/* The 15 vertical ids and 120 sub-niche ids that shipped before the v2.0 lock, mapped to
 * their home in data/b2b/icp/. HAND-WRITTEN, and the gate asserts every target resolves
 * in icp-taxonomy.json — a derived map would agree by construction and gate nothing, which
 * is lib/industryPublication.ts's argument and it holds here.
 *
 * This file no longer declares a taxonomy and no longer holds a publication state.
 * It exists so that no authored body and no draft URL is lost in the move.
 * An entry is deletable once its redirect has been live 180 days. */
export const LEGACY_VERTICAL_ALIAS: ReadonlyMap<string, readonly string[]>;
```

Everything else moves: `publication` goes to a new module keyed by ICP path (§6); `tier` is checked
row by row against the JSON's `note` field (21/21 industries carry one; `01` and `15` carry literal
tier strings, the other 19 carry a sentence, so this is a per-row read and not a mapping); `why` is
authored copy and moves into the industry body, not into the taxonomy.

### 4.3 Mira's work, placed exactly. Do not lose this table.

| Artefact | Current key | ICP home | ICP id | Level | Priority |
|---|---|---|---|---|---|
| `data/b2b/bodies/manufacturing-industrial/hub.ts` | `manufacturing-industrial` | `manufacturing-and-industrial` | `05` | **industry** | n/a |
| `data/b2b/bodies/manufacturing-industrial/cnc-machining.ts` | `manufacturing-industrial/cnc-machining` | `manufacturing-and-industrial/precision-manufacturing-and-machining/cnc-machining-shops` | `05.01.01` | **niche** | **B**, fit Both |

Three consequences, all of them things a reviewer needs to see before the diff:

1. **The slug is `cnc-machining-shops`, not `cnc-machining`.** Rule 6 says the JSON wins. This is a
   re-key and a file move. **The prose does not change by one character.** The `B2BBody` type is
   unaffected; `data/b2b/index.ts`'s map key and the file path under `bodies/` change.
2. **Her niche page's parent does not exist yet.** `precision-manufacturing-and-machining` (`05.01`,
   5 niches) has no page. Under the four-level shape, promoting the niche requires authoring the
   sub-industry above it. That is one extra page, and it is exactly what §6's cohort unit already
   bundles.
3. **Under rule 8 it is not in the first wave.** `cnc-machining-shops` is priority **B**. It stays
   `state: 'draft'`, keeps rendering, keeps its noindex, and is promoted when its sub-industry cohort
   comes up — or earlier by an explicit named exception on the cohort line (§6). It is not deleted
   and it is not orphaned.

### 4.4 The two URLs that move, and why I think that is allowed — but am not deciding

| From | To | Status today |
|---|---|---|
| `/industries/manufacturing-industrial` | `/industries/manufacturing-and-industrial` | `draft`, **noindex**, absent from every sitemap, absent from `docs/repositioning/legacy-sitemap-baseline.json` |
| `/industries/manufacturing-industrial/cnc-machining` | `/industries/manufacturing-and-industrial/precision-manufacturing-and-machining/cnc-machining-shops` | same |

My reading is that the hard constraint protects existing *indexed* URLs and the baseline register, and
that a noindex draft that has never been in a sitemap is not covered. **That is my reading of the
operator's constraint, so it is confirmed before the wave, not after.** `[DECISION FOR OPERATOR]`

Recommend a 301 on each rather than a 404. That is two entries in `next.config.mjs`, and ADR-0007 §6.2
applies unchanged: **`scripts/check-publication.cjs` cannot read `next.config.mjs`**, so it cannot
verify a redirect, cannot detect a chain and cannot detect a redirect to a 404. Both entries are
checked by hand against the served response, and the check is named in the wave's PR description.

---

## 5. `generateStaticParams` at this scale

### 5.1 What I measured, on this machine, and what I did not

**Measured.** `routesForSitemap`'s dedupe at `lib/sitemap.ts:346` is
`all.findIndex(other => other.path === entry.path) === index` — O(n²) in the family size. Run over
11,561 synthetic four-level industry paths:

| n | wall-clock |
|---:|---:|
| 2,000 | 12 ms |
| 4,000 | 46 ms |
| 8,000 | 195 ms |
| 11,561 | 151 ms |

The last row is inside run-to-run noise, and the honest conclusion is the one the numbers support:
**this is not the wall.** It is called twice per build (`check-industry-gate.cjs:75`,
`check-publication.cjs:18`), over all 17 families, and costs a few hundred milliseconds. It *becomes*
a wall at the 50,000-URL family cap ADR-0007 §6.3 item 11 already set, where the same quadratic is
roughly 20× the work. Leave it; note it; do not spend a wave on it now.

**Measured.** The `industries` sitemap family at 11,561 URLs renders to **3,018,016 bytes = 2.88 MB**
of XML. The protocol limits are 50,000 URLs and 50 MB uncompressed, so this is inside both.
`app/sitemaps/[sitemap]/route.ts` is `dynamic = 'force-static'`, so the string is built once at build
time and not per request.

**Measured.** `data/b2b/icp/icp-taxonomy.json` is **2,230,578 bytes**, imported under
`resolveJsonModule: true` into `data/b2b/icp/index.ts`, which builds three `Map`s at module scope.

**Not measured, and I will not estimate it.**
`[NEEDS DATA: Vercel build wall-clock for this repo — one baseline reading, and one per-wave delta.]`
Open since ADR-0007 §6.5 and still open. CLAUDE.md §6 and the project memory both record that build
verification happens on Vercel because this repo cannot be built reliably from the iCloud path. **I
have no measurement and I am not going to produce a number that sounds right.**

### 5.2 What breaks, by mechanism rather than by invented number

1. **Not the params array.** 11,561 objects of four short strings is a few megabytes of heap. Nobody
   should spend a wave here.
2. **Per-page render × page count is the cost.** Next 16 App Router SSG renders each param to HTML
   *and* an RSC flight payload and writes both. 2,738 pages under the recommended default is ~35× the
   current 77; 11,561 is ~150×. The multiplier is known; the per-page cost is not, which is why the
   budget in ADR-0007 §6.5 is a **delta** budget and why one measurement unblocks it.
3. **The specific, repo-shaped hazard: the 2.1 MB JSON must never cross a serialization boundary.**
   All five files in `components/b2b/` are Server Components today (verified: no `'use client'` in
   any). If a future one becomes a Client Component and takes an ICP record as a prop, whatever is
   reachable from that prop is serialized into the RSC payload of every page that renders it.
   **Rule, gate-asserted:** route and component code may import only the narrow accessors from
   `data/b2b/icp/index.ts` (`getIcpIndustry`, `getIcpSubIndustry`, `getIcpNiche`, …) and may never
   import `ICP_INDUSTRIES` or the JSON directly. Add a grep to `check-b2b.cjs` for
   `icp-taxonomy.json` and `ICP_INDUSTRIES` outside `data/b2b/icp/`.
4. **`dynamicParams = false` at all four levels.** ADR-0007 §6.4's four reasons hold, and the second
   gets stronger here: an unknown slug must 404, and with 8,823 non-routing sub-niches the set of
   unknown slugs under the level-4 route is larger than the set of known ones.

### 5.3 The fallback ladder, pre-agreed and ordered

ADR-0007 §6.4's escape hatch ("flip the `draft` tier to `dynamicParams = true`") does not survive,
because `dynamicParams` is a property of a **route segment**, not of an entity's publication state.
The replacement:

| If | Then | Why it is safe |
|---|---|---|
| Build delta per wave > 90 s (ADR-0007 §6.5, retained) | **Split the wave.** Always the first remedy. | The wave is already the unit |
| Build wall-clock approaches the platform limit | `dynamicParams = true` **on the level-4 route only**, with `revalidate`, *and* an explicit allowlist check in the page that calls `notFound()` for any path not promoted | Level 4 is the only tier that is ever large, and the only one whose default is "no page". The allowlist check reproduces the 404 at request time, so an unknown slug still 404s and `check-b2b.cjs` can still assert the allowlist. |
| Still breached | Same treatment for level 3 | — |
| Levels 1–2 | **Never.** 362 pages stay fully static forever. | They are the crawl entry points for everything below |
| Still breached | `[UNVERIFIED: whether this repo's Vercel plan's build timeout and memory ceiling accommodate this page count. A plan question, not a code question.]` | — |

**The number I refuse to give is the page count at which this build breaks.** I have no Vercel
measurement, and the two variables that decide it — per-page render cost for the authored template,
and the plan's build timeout — are both unmeasured here. Wave 0 (§9) exists to take that measurement
before any page rides on it.

---

## 6. The publication ceiling at 11,561, and the promotion unit

### 6.1 The integer does not survive

`B2B_PUBLISHED_CEILING = 0` answers *how many*. At 11,561 the question is *which*. A ceiling of 25 in
an 11,561-entity space is 462 waves and tells a reviewer nothing about whether these 25 are the right
25, whether they share a parent, or whether their parents exist.

### 6.2 Decision: the promotion unit is the sub-industry cohort

> **One sub-industry page, plus the priority-A niches beneath it, plus the sub-niche sections those
> niches carry.** Typically 1 + 3 = 4 pages. Worst case 1 + 10 = 11.

Four reasons, each from a measured number:

1. **It is the only level where the operator supplied substance.** 341/341 sub-industries carry all
   six prose fields (§1.2). The cohort's parent page can be written from the locked file without
   inventing anything, and its children inherit that context.
2. **It is reviewable in one sitting.** Niches per sub-industry: min 1, median 7, p90 9, max 10
   (§1.6). Priority-A niches per sub-industry: 2.6 mean. A reviewer reads one parent, three children,
   checks that each child's three `SourceRef`s resolve, and signs their name.
3. **It cannot orphan.** The sub-industry page lists its niches; each niche breadcrumbs to its
   parent; the parent breadcrumbs to its industry hub. Every page in the cohort has an inbound link
   from inside the cohort or from the level directly above, by construction (§7).
4. **It is one commit.** `git revert` of that commit is the whole rollback, unchanged from
   ADR-0007 §7.

### 6.3 The units rejected, and why

| Unit | Why not |
|---|---|
| **Per niche** | 2,376 waves, and the uniqueness gate (`check-b2b.cjs` item 5, Jaccard against siblings) has nothing to run against when a page ships alone. Reviewable, but not *checkable*. |
| **Per priority band** | 888 pages in one promotion is reviewable by nobody. Worse: priority is a **sort key, not a cohort** — the 888 A-niches are scattered across all 341 sub-industries, so an A-band wave publishes 888 children under 341 unpublished parents. Every one is an orphan. |
| **Per industry** | ~16 sub-industries and ~113 niches per industry. Too big to review, and it front-loads the C-priority tail. |
| **Per sub-niche** | The default state of a sub-niche is a section, so there is nothing to promote unless a body has been authored, which is the individual exception in §6.4 item 4. |

### 6.4 The mechanism, replacing the single integer

```js
/* scripts/check-b2b.cjs
 *
 * The ceiling becomes a LIST for lib/industryPublication.ts's stated reason: a number
 * derived from the data agrees with the data by construction and gates nothing, and a
 * number that is not derived still only tells you how many, never which. At 11,561
 * entities "which" is the only question worth asserting. */
const PUBLISHED_COHORTS = Object.freeze([
  // '<industry-slug>/<sub-industry-slug>'   one line per promoted cohort, in wave order
]);
const EXPECTED_PUBLISHED_PAGES = 0;   // raised by exactly this wave's size, in this wave's commit
```

Assertions:

1. **Every published entity's path has a prefix in `PUBLISHED_COHORTS`.** A published page outside a
   promoted cohort fails the build and is named.
2. **`publishedPages().length === EXPECTED_PUBLISHED_PAGES`** — equality, not `<=`. A page falling
   *out* of publication is as loud as one falling in. ADR-0007's `<=` could not see a page silently
   dropping.
3. **Every cohort's sub-industry page is itself published.** No cohort of children under an
   unpublished parent.
4. **At most one non-priority-A niche per cohort, and only when named inline.** This is how Mira's
   existing draft is promoted without pretending it is an A:
   `'manufacturing-and-industrial/precision-manufacturing-and-machining'  // +cnc-machining-shops (B, ADR-0008 §4.3)`
5. **At most 2 cohorts per wave**, and ADR-0007 §7's ≤25-published-pages-per-wave ceiling is retained
   as the outer bound.
6. **Every promoted sub-niche has its own authored body**, with the same `AuthoredBody` tuple arity as
   every other level. There is no reduced bar for level 4.
7. **Wave *n*'s entry criterion is wave *n−1*'s exit criterion**, unchanged from ADR-0007 §7, which
   is CLAUDE.md §7's five tests measured on everything published so far.

### 6.5 Build order, and the gap in it

Rule 8 says priority-A first. **`priority` exists only on the niche.** There is no priority, no tier
and no rank on a sub-industry, which is the unit this ADR promotes. Do not invent one.

The deterministic default I propose, labelled in the gate as a derivation and not as operator data:

> Industries in the operator's locked order (`01`…`21`). Within an industry, sub-industries sorted by
> count of priority-A niches descending, then by `id` ascending.

`[NEEDS DATA: the operator's build order for the 341 sub-industries, or confirmation that the derived
order above is acceptable. Rule 8 orders 2,376 niches and is silent on the 341 parents.]`

### 6.6 Which of these a human can actually review

| Unit | Reviewable | Why |
|---|---|---|
| **Sub-industry cohort, ≤11 pages** | **Yes** | One parent, ≤10 children, ≤30 `SourceRef`s to resolve. A reviewer can read all of it and put their name on it. |
| A single niche page | Reviewable, not checkable | The uniqueness gate needs siblings |
| A priority band (888) | No | — |
| A whole level (2,376 / 8,823) | No | — |
| The whole taxonomy (11,561) | No | It was reviewed as **data**, once, by the operator, which is exactly why ADR-0007's spine-first design was right and is retained |

---

## 7. Internal linking at 11,561

### 7.1 `related` is deleted

ADR-0007 §5 declared `related: readonly Slug[]`, max 4, hand-picked. At 11,561 entities that is 46,244
hand-written slugs. It does not survive and it should not be replaced by a computed similarity set —
that is the 49-link mesh the original ADR was right to refuse.

### 7.2 What replaces it: the taxonomy *is* the link graph

Nothing is declared and nothing is similarity-computed. Four link classes, all derived from the JSON's
own tree, all bounded:

| Class | Source | Count on a page | Direction |
|---|---|---:|---|
| Breadcrumb | the path itself | ≤ 4 | up |
| Children | the entity's own array | 21 / ≤21 / ≤10 / 0 | down |
| Siblings | same parent, minus self, routable only, taxonomy order | cap **5** (`SIBLING_CAP`, retained) | sideways, in-tree |
| Cross-tree pointer | `overlaps` (5) and `dedupe_log` (13) in the JSON | ≤ 1 | sideways, out-of-tree |

**The mesh cannot form, and the reason is a measured number, not a policy.** §1.6: the largest
branching factor anywhere in the tree is **21** (`/industries` → industries, and
`manufacturing-and-industrial` → its sub-industries). Sub-industry → niches maxes at 10. Niche →
sub-niches are anchors on the same document and are not links at all. So the largest generated link
block in the entire system is 21, and the sideways block stays inside ADR-0007 §5.3's cap of 12.
A 49-link footer was a real risk when `related` was going to be computed. It is not a risk when the
only cross-tree links in the whole system are the **18 the operator wrote down**.

The children block stays **uncapped** for ADR-0007 §5.1's reason — it is the orphan-prevention
mechanism, and capping it silently orphans the overflow — and the measured maximum of 21 means
uncapped costs nothing.

### 7.3 The cross-tree links, precisely

- **The 5 `overlaps`.** Both paths are legitimate URLs (§1.5). The **canonical id builds the page**.
  The duplicate path renders a short pointer section and carries `<link rel="canonical">` to the
  canonical path. Rule 7 satisfied with no resolver change.
- **The 13 `dedupe_log` rows.** Each records a niche removed from one industry and kept in another.
  Each generates one pointer from the removed industry's sub-industry page to the kept niche.
  Thirteen links, site-wide.
- **Nothing else.** No `buyer_titles` similarity join, no shared-standard join, no computed relatedness.
  Those were considered and rejected: they are a similarity set with extra steps, and the first time
  somebody widens the threshold to "improve interlinking" the mesh is back.

### 7.4 Orphans, when `navigation.ts` and `CrossLinks.tsx` are off limits

Every level below the industry hub is linked by its parent, by construction, and the gate asserts it.
**The whole tree hangs on one link, and that link does not exist.** `app/industries/page.tsx:85`
renders `INDUSTRIES.map(...)` over the legacy 11 only. `b2bHubParams()` returns
`manufacturing-industrial`, which is therefore **already an orphan today** — tolerable only because
it is `draft`/noindex, which `lib/b2b/graph.ts` says in its own comment.

This is ADR-0007 §12's last unanswered item and it is now load-bearing for 11,561 entities instead of
120.

| | Option | Cost |
|---|---|---|
| **A** | **Append one `<section>` to `app/industries/page.tsx` listing the 21 ICP industries.** Existing meta, H1, description, card order and every existing link untouched. 21 new links, on one page. | An *addition* to an existing page. The constraint says internal linking does not change; adding a block changes it by addition. **Needs an explicit yes.** |
| B | A new hub at a new URL, e.g. `/industries/sectors` | Moves the problem. The new hub is itself an orphan unless something links it, which is option A with an extra hop and an extra URL. |
| C | Sitemap-only discovery | **Rejected.** A sitemap is a discovery hint that carries no link and no equity. This is how 11,561 URLs become "Crawled — currently not indexed". |
| D | Nothing is ever published; the tree stays draft/noindex | Honest, costs nothing, delivers nothing. |

**Recommend A.** Same ask as ADR-0007, still unanswered, and now it gates everything.
`[DECISION FOR OPERATOR]`

### 7.5 The gate changes this forces

`lib/b2b/graph.ts` today hardcodes both of the things §7 depends on:

- `inboundCount()` returns `0` for every hub by construction, with a comment saying so
- `depthFromRoot()` returns a literal `2` or `3`

Both are replaced by a **real reachability walk from `/industries`** over the rendered link graph, and
`check-b2b.cjs` asserts every `published` entity is reachable from it. That is what the depth ceiling
was a proxy for, and the proxy does not survive four levels. The depth *number* is then reported, not
asserted: ADR-0007 §5.2's ceiling of 3 is amended to **4 for a niche, 5 for a promoted sub-niche**,
and reachability is the assertion.

---

## 8. Alternatives rejected

**Flat `/industries/<industry>/<niche>`, sub-industry as grouping only.** §2.2. It deletes the one
level that carries all six of the operator's prose fields, makes the industry page a 113-link parent,
and is collision-free only by coincidence of the current lock.

**All 11,561 as pages in the default shape.** §2.3. 34,683 sourced facts. Not forbidden — the route
exists and promotion is per entity — but not the default, because §1.2 says a sub-niche record is a
name.

**Sub-niches as query parameters (`?variant=`) or as a separate `/sub-niches/*` family.** The first is
not a crawlable URL and would need a canonical anyway; the second mints a new URL family for content
that is, by every reading, an industry page — the same objection ADR-0007 §8 made to `/niches/*`.

**Meta-verticals as a URL segment.** ADR-0007 §5.2 forbade it and this ADR makes it moot: the ICP
industry *is* the top segment, it is operator-supplied, and no grouping layer needs to become a path
segment.

**Keeping `data/b2b/verticals.ts` as a second live taxonomy.** §4.2. Rule-6 breach, 22 shared slugs
meaning different levels in the two trees, two publication mechanisms, two graphs, two gates.

**Deleting `data/b2b/verticals.ts` outright.** Loses the alias map, which is the only thing keeping
two draft URLs and two authored bodies from becoming a 404 and an unreferenced file.

**Publishing all 888 priority-A niches as one wave.** §6.3. 888 orphans under 341 unpublished parents.

**Generating sub-niche bodies from the niche body with the name substituted.** The `check-b2b.cjs`
items 5–7 exist to fail exactly this, whoever proposes it and however good the template is
(ADR-0007 §8, retained verbatim in spirit).

**Any city, region or geo cross at any level.** Named here so it is on the record: 11,561 × 340
`LOCATIONS` is one data edit away, and CLAUDE.md §7 and §11 both forbid it by name. Rule 5 says legacy
city pages are not expanded, deleted, redirected or noindexed. The gate's existing blast-radius greps
(`check-b2b.cjs` item 4) must be extended to assert `data/locations.ts` and `data/b2b/icp` never
appear in the same module.

---

## 9. Staged rollout

Each wave is one commit. Each reverts with `git revert` of that commit alone.

**Wave 0 — mechanism and one measurement. Zero new URLs.**
Ships: the two new route files with empty `generateStaticParams`; `resolveIcp` and
`legacyClaimDepth`; the reachability walk replacing `inboundCount`/`depthFromRoot`; the
`PUBLISHED_COHORTS` allowlist at empty with `EXPECTED_PUBLISHED_PAGES = 0`; the three gate assertions
in §3.5; the import-boundary grep in §5.2 item 3.
**Exit:** `pnpm build` green on Vercel with all nine gates. Sitemap XML byte-identical. `legacy-page-register.json`
diff empty. `check-industry-gate.cjs`'s 4,422 assertion unchanged. **And the Vercel build wall-clock
recorded, which closes ADR-0007 §6.5's open item.**

**Wave 1 — the taxonomy swap. Zero new URLs.**
Ships: `verticals.ts` reduced to `LEGACY_VERTICAL_ALIAS`; Mira's two bodies re-keyed to their ICP
paths (§4.3); the two 301s (§4.4); publication state moved to the ICP-path-keyed module.
**Entry:** operator answers §4.1 (the CLAUDE.md conflict) and §4.4 (the two draft URLs).
**Exit:** both draft URLs serve their new paths; both old paths 301, verified by reading the served
response, not by reading `next.config.mjs`; routes still 2; sitemap still byte-identical.

**Wave 2 — the entry point.**
Ships: the appended section on `app/industries/page.tsx` (§7.4 option A) and the 21 industry pages as
`draft`.
**Entry:** operator answers §7.4. Without it, nothing below can publish and Wave 3 does not start.

**Wave 3 onward — cohorts.**
Each wave ≤ 2 cohorts and ≤ 25 newly published pages. Entry for wave *n* is the exit of wave *n−1*
plus CLAUDE.md §7's five tests on everything published so far. **If a wave fails its exit criteria the
next wave does not ship**; the remedy is improve-or-prune on what is published, not more pages
(ADR-0007 §7, retained). Kill rule inherited unchanged: zero impressions after 180 days →
consolidate and 301, GSC pulled first, backlinked URLs never 410'd.

---

## 10. Consequences

**Good.** All 11,561 entities are addressable and linked at a default cost of 2,738 URLs. The four
hard constraints are satisfiable: one string collides and one page needs an appended block to resolve
it. The promotion unit is small enough that a named human can genuinely review it, which is the thing
ADR-0007's integer ceiling could not deliver at this scale. The link graph needs no declaration and
cannot mesh, because the taxonomy's own branching factor caps it at 21. Three latent defects in the
current resolver are named with their mechanism rather than left to be found in served HTML.

**Bad, and accepted.** Crawl depth goes to 4, and 5 for a promoted sub-niche. Two draft URLs move and
need redirects that no gate in this repo can verify. `verticals.ts` survives as an alias map that is
pure migration debt and will be read as something more important than it is for as long as it exists.
The sub-industry build order is derived, not supplied, and derived orders get argued with.

**Ugly.** The legacy `financial-services` hub will list ICP children it knows nothing about, from a
data source it does not import, under a heading that has to explain why the page has two kinds of
child. That is the price of one colliding string plus a constraint that forbids renaming either side,
and it will look like a mistake to whoever reads it in a year. It should carry a comment pointing at
§3.4.

**The honest cost.** 2,738 pages at ADR-0007's bar is 8,214 sourced facts and 2,738 named reviews. At
2 cohorts and ≤25 pages per wave, and ADR-0007 §7's ≥90-day expansion criterion on a branch, this
taxonomy does not fully publish this decade. That is not a defect of the architecture; it is the
architecture correctly reporting what the content budget would have to be. If the budget is not
there, this ADR converts "11,561 thin pages shipped" into "11,561 entities addressable and forty good
pages", which is the right failure mode and will not feel like one.

---

## 11. What would make this decision wrong later

1. **The sub-niche anchors work.** If niche pages start ranking for sub-niche-specific *queries* in
   GSC, level 4 never needs to be a page and the depth-4 route can be deleted. Measure at +90 days on
   the first cohort, by query, not by page — GSC does not report fragments, so the fragment itself is
   not measurable and the query is the only available test. `[UNVERIFIED: whether any fragment-level
   reporting exists in this account. Not answerable from the repo.]`
2. **The opposite.** If niche pages plateau while sub-niche-specific queries get impressions that go
   nowhere, level 4 is a real page level and the default flips. The route already exists, so this is a
   ceiling change, not an architecture change. That is the point of building the route empty.
3. **The operator edits the JSON to v2.1 and introduces a duplicate full path.** Zero today (§1.3).
   The §3.5 item 4 assertion is the only thing that can catch it, and it must be in Wave 0, not later.
4. **§3.4 option C is refused.** Then industry `04` cannot publish, which costs commercial insurance —
   the flagship. If that happens, the decision to revisit is not this ADR, it is the constraint.
5. **The Vercel measurement comes back bad at 362 pages** (levels 1–2 alone). Then the shape is wrong,
   not the rate, and §5.3's ladder never gets a chance to help. Re-argue this ADR, do not tune the
   ceiling.
6. **`verticals.ts` is kept as a second live source anyway.** Then the rule-6 breach is permanent and
   the 22 shared slugs (§4.2) start meaning two different things in two trees. Delete the alias map's
   reason to exist and this ADR is half wrong.
7. **`data/industries.ts` gains a twelfth row.** `check-industry-gate.cjs`'s `EXPECTED_INDUSTRIES = 11`
   fails the build, which is intended (ADR-0007 §10.5) — and now it also means the legacy claim depth
   in §3.2 has to be re-derived, because a new legacy id could collide with any of the 21.
8. **A second brand or a client-facing portal appears.** Introduces a tenancy model and voids the
   tenancy note above, same as ADR-0001 §8.4 and ADR-0007.

---

## 12. Rollback

| Change | Rollback |
|---|---|
| A cohort wave | `git revert` that commit. It touches `data/b2b/bodies/**`, the publication module and two constants in `check-b2b.cjs`. Pages leave `generateStaticParams` and the sitemap on the next deploy. No redirect: they were never in the baseline and, under §9's wave gate, have been live at most 28 days. |
| Any single page | `state: 'published'` → `'draft'`. One word. Page stays at 200, goes noindex, leaves the sitemap. ADR-0007's mechanism, unchanged. |
| A promoted sub-niche | Demote to `'draft'`, then to section-only. The `#anchor` on the parent niche page has been resolving the whole time, so there is **nothing to redirect**. This is the main reason level 4 defaults to a section. |
| The level-3 and level-4 routes | Delete both route directories. Levels 1–2 are untouched files, so the 77 legacy pages cannot be affected. |
| `resolveIcp` / `legacyClaimDepth` | Restore `resolveIndustry` / `resolveSubIndustry` from `9299e1d`. Both are additive; the legacy early-return is unchanged in either version. |
| The `/industries` appended section (§7.4 A) | Delete the block. It is one `<section>` at the end of the existing JSX; nothing above it was edited, so the page reverts byte-identically. |
| Wave 1's two 301s | Delete both `next.config.mjs` entries. Both sources were noindex drafts absent from every sitemap, so nothing external depends on them. |
| `verticals.ts` → alias map | `git revert` Wave 1. Mira's bodies revert to their original keys and file paths with their prose unchanged, because the re-key never touched the prose. |
| The whole ADR | Revert Waves 0–N. Verified by grep: outside `data/b2b/` and `lib/b2b/` themselves, the only importers are the two industry route files and one type-only import in `lib/audit/aiVisibility.ts:55` (`data/b2b/observations/evidence`, unrelated to pages and untouched here). `data/b2bPages` is a different module with a confusingly similar name and is not part of this. |

**Rollback triggers.** Any of: a manual action in Search Console on the `/industries/*` group; the
group's median position degrading over two consecutive 28-day periods after a wave; any published
page found to contain a number without a `SourceRef`; or `legacy-page-register.json` producing a
non-empty diff on any wave. The first two revert the most recent wave. The third is a CLAUDE.md §4
claims defect and demotes to `draft` immediately, before diagnosis. **The fourth means the hard
constraint has been breached and the wave does not merge at all.**

**Verification before any wave merges.** `pnpm build` green on Vercel with all nine gates. The
`legacy-page-register.json` diff **empty**. The `check-industry-gate.cjs` sitemap assertion updated by
exactly the wave's page count and by no more. Those three artefacts are the review surface for this
ADR and should be checked, not skimmed.

---

## 13. Open items

**Decisions only the operator can make.** Every one of these blocks a specific wave.

1. `[DECISION FOR OPERATOR]` §4.1 — `CLAUDE.md` §2 names both `icp-taxonomy.json` and
   `data/b2b/verticals.ts` as authoritative, eleven lines apart. One sentence has to go. Blocks Wave 1.
2. `[DECISION FOR OPERATOR]` §4.4 — may the two noindex draft URLs move to their ICP paths with a 301?
   My reading is yes; it is your constraint. Blocks Wave 1.
3. `[DECISION FOR OPERATOR]` §7.4 — may `app/industries/page.tsx` gain one appended section linking the
   21 ICP industries? Without it every page below is an orphan. **Blocks every wave from 2 onward**,
   and has been open since ADR-0007 §12.
4. `[DECISION FOR OPERATOR]` §3.4 — the `financial-services` hub. Option C, or industry `04` does not
   publish. Blocks any cohort under industry `04`, including commercial insurance.

**Data I do not have.**

5. `[NEEDS DATA: Vercel build wall-clock for this repo, baseline and per-wave delta.]` Open since
   ADR-0007 §6.5. Wave 0 takes it. No number in this ADR is an estimate of it.
6. `[NEEDS DATA: the operator's build order for the 341 sub-industries.]` §6.5. `priority` exists only
   at niche level. A derived default is proposed and is labelled as derived.
7. `[NEEDS DATA: agreed indexable-pages-to-monthly-organic-sessions ratio.]` CLAUDE.md §7 criterion 5.
   Inherited from ADR-0007 §12 and still not assertable from the repo. §6.4's cohort allowlist stands
   in. Do not pretend the ratio is being checked.
8. `[NEEDS DATA: backlink export for /industries/*.]` Inherited from ADR-0007 §12. Not blocking here
   (nothing is being removed) but it blocks the 180-day kill rule when it arrives.

**Unverified.**

9. `[UNVERIFIED: whether Google truncates the breadcrumb trail in SERP display at 203 characters.]` §2.4.
10. `[UNVERIFIED: whether this repo's Vercel plan's build timeout and memory ceiling accommodate 2,738
    prerendered pages.]` §5.3. A plan question, not a code question.
11. `[UNVERIFIED: the exact tag dispatch in app/api/revalidate/route.ts.]` Inherited from ADR-0002 §3
    via ADR-0007 §12. A four-level ICP page needs a Sanity tag; the 60-second `revalidate` in `query()`
    is the safety net if it is missed.
12. `[UNVERIFIED: whether any fragment-level reporting exists in this GSC account.]` §11 item 1. It
    decides how the anchor-versus-page question is measured, not whether the shape is right.

**Open disagreement with Nadia, unresolved.**

13. `[DECISION]` §2.5 — where a promoted sub-niche's URL hangs. Nadia's revision 3 §3.5 wants a flat
    leaf under the sub-industry (depth 4); this ADR nests (depth 5). Measured trade in §2.5. Her shape
    leaves one entity with no legal URL and puts up to 55 children on a sub-industry page; mine costs
    one level of depth on maybe 100–300 URLs ever. **Levels 1–3 are not in dispute and Waves 0–2 do
    not depend on the answer**, so this does not block the rollout — it blocks the first level-4
    promotion, which is years out. Owen or the operator adjudicates.

**Depends on Nadia.** `docs/seo/b2b-niche-architecture.md` revision 3 was uncommitted on the working
tree when this was written, so §2.5's reading of it is a snapshot. It defines the content bar, and
§2's shape assumes a niche page can carry ten sub-niche sections and stay coherent. If Nadia's bar
says a niche page holds five, the sub-niche section list needs **grouping, not truncation** —
truncation orphans, for §7.2's reason.
