# ADR-0007: B2B niche entity model and publication mechanics

- Status: proposed
- Date: 2026-09-28
- Branch: `b2b-ai-search`
- Depends on: ADR-0001 (route map, the `/growth` freeze, the `data/industries.ts` freeze), ADR-0002 (Sanity-with-committed-floor hybrid), ADR-0006 (the compile-error-beats-a-policy pattern)
- Constrains: `data/b2b/**`, `app/industries/[industry]/**`, `lib/sitemap.ts`, `scripts/`, `package.json` `gates`
- Amends: ADR-0001 §2.1. The three `/services/*` to top-level 301s are **cancelled for now** under the hard constraint below. ADR-0001 §2.1 is not rejected, it is deferred; its GSC gate in §2.4 still stands whenever it is revived.
- Pairs with: `docs/seo/b2b-niche-architecture.md` (Nadia, in progress). Nadia defines the content bar. This ADR defines what the type system and the gate chain do with it.
- **Interface only.** No feature code. Implementation goes to Luke (`backend-dev`) and Mira (`frontend-dev`). Owen reviews before implementation.

## Decision

The B2B niche universe ships as a **third entity spine in `data/b2b/`**, disjoint from both existing
taxonomies, rendered through the **existing** `/industries/[industry]` and
`/industries/[industry]/[subIndustry]` routes via **one new branch on a discriminated union**.
`data/industries.ts` and `data/growth/taxonomy.ts` are not extended and not merged.

Publication is a **discriminated union on state, not a set of booleans.** A spine entity generates no
route at all. Only the `indexable` variant carries the authored payload, and that payload is a tuple
type, so a page that has not been authored cannot be marked indexable: it is a compile error, not a
review finding.

## Hard constraint governing this ADR

**No existing meta title, meta description, URL or internal link changes.** New pages only.

One place this is interpreted rather than obeyed literally, stated up front so the operator can
overrule it: `app/industries/page.tsx` must gain links to the new master industries, otherwise every
new page is an orphan. That is an *addition* to one existing page, not an edit to any existing link.
The alternative is no hub link and guaranteed orphans, which §5 exists to make impossible. If the
operator wants the hub untouched, this ADR does not work and the entry point has to be decided first.

## Tenancy note

Not applicable, derived not assumed, and unchanged from ADR-0001: no auth dependency in
`package.json`, no `getServerSession|userId|tenantId|organizationId|accountId` in `lib app
components`. Single-tenant public marketing site. Nothing in this ADR touches a query, an endpoint or
a cache key that is scoped to a customer. The only untrusted-input surface remains the audit target
URL guarded by `normalizeTargetUrl` (ADR-0003), which this ADR does not touch.

---

## 1. Verified state

Everything in this table was computed from the repo on 2026-09-28, not recalled.

| Fact | Value | Source |
|---|---:|---|
| `INDUSTRIES` master entries | 11 | `data/industries.ts` |
| `INDUSTRIES` sub-industries | 66 | `data/industries.ts` |
| `SERVICES` | 11 | `data/services.ts` |
| `growthSectors` / niches / sub-niches | 8 / 69 / 103 | `data/growth/taxonomy.ts` |
| `LOCATIONS` × `LOCATION_MATRIX_SERVICES` | 340 × 6 = **2,040** | `data/locations.ts`, `data/services.ts` |
| `SERVICES` × `INDUSTRIES` | 11 × 11 = **121** | `lib/sitemap.ts#programmaticRoutes` |
| `programmatic` sitemap family | **2,161** | 2,040 + 121, computed |
| `industries` sitemap family | 77 | 11 + 66 |
| Total URLs across all 17 sitemap families | **4,422** | `routesForSitemap` over `sitemapIndexes` |
| Legacy sitemap baseline | 4,246 | `docs/repositioning/legacy-sitemap-baseline.json` |

**Correction worth carrying forward.** The "2,161 `/locations/[location]/[service]` pages" figure in
circulation is the *whole* `programmatic` family. It is 2,040 location × service pages **plus the 121
service × industry pages**. That second term is `SERVICES.length × INDUSTRIES.length`, and it is the
single most important number in this ADR, for the reason in §2.1.

**`/industries/*` does not appear in `docs/seo/gsc-url-group-baseline.md` at all.** The top-1,000 GSC
rows contain `/locations/*` (632 pages, 80 clicks), `/directory/*`, `/glossary/*`, `/services/*`,
`/case-studies/*`, `/comparisons/*`, `/blog/*` and two single pages. Not one `/industries/*` URL made
the table. Read against CLAUDE.md §7, criteria 2 and 3 for expanding a branch, "≥60% of its
indexable pages have ≥1 impression in the last 28 days" and "≥1 page ranks top-20 or has produced a
conversion", **`/industries/*` fails both today.**

The operator has heard the volume caution and overruled it, and this ADR does not relitigate it. But
the §7 gate is a written rule in the project bible, and an ADR that quietly stepped over it would be
worthless six months from now. The reconciliation is mechanical, not rhetorical: **Waves 0 and 1 add
zero indexable pages**, so §7 is not breached by the spine. Every wave from 2 onward is metered by
§7's five tests measured on the wave before it (see §7 below). The destination the operator
approved is unchanged. The rate is governed.

### 1.1 The counter-example, verified

`data/seoExpansion.ts:384 buildGeneratedServiceSubPage()` builds 119 sub-service pages. Read: of the
four `sections`, **two are verbatim literal constants** ("How It Gets Discovered", "How We Measure
It") and the other two are the sub-service name interpolated into a fixed sentence. **Five of six
`deliverables` are constants.** The FAQs come from a shared `serviceFaq()` helper. This is the exact
artefact CLAUDE.md §7 forbids, sitting in `data/`, shipping today.

`lib/growth/publication.ts` is the same repo getting it right: `reviewed(!item.parentId)` sets
`indexable: false` for every niche with a parent, which is why 103 sub-niches are noindex. Their
`buyerQuestion` and `evidence` are string-interpolated in `taxonomy.ts`. Auto-derived copy, so
noindex. That rule is correct and this ADR generalises it.

**But note how that correctness was achieved: by a human writing `!item.parentId` in one expression.**
The `Publication` type permits `{ indexable: true, evidence: [] }`. Nothing stops the next author
from calling `reviewed()` with no argument on a derived page. At 103 entities that is a survivable
risk. At several hundred it is a certainty. §3 is the fix.

---

## 2. The entity model

### 2.1 `data/industries.ts` is not extended. It is not a data file, it is a page generator with seven consumers.

Every one of these fans out on array length, and none of them is opt-in:

| # | Consumer | Effect of adding N master industries |
|---|---|---|
| 1 | `app/industries/[industry]/page.tsx` `generateStaticParams` | +N pages |
| 2 | `app/industries/[industry]/[subIndustry]/page.tsx` `generateStaticParams` | +(all sub-industries) pages |
| 3 | `app/services/[service]/industries/[industry]/page.tsx` `generateStaticParams` | **`SERVICES.flatMap(s => INDUSTRIES.map(...))` → 11 × N pages** |
| 4 | `lib/sitemap.ts#industryRoutes` | +N+subs, priority 0.90 / 0.84, **no publication gate exists on `Industry`** |
| 5 | `lib/sitemap.ts#programmaticRoutes` | +11 × N, priority 0.78 |
| 6 | `components/shared/CrossLinks.tsx` | `INDUSTRIES.map(...)` unfiltered, on **every** service, industry and region page |
| 7 | `data/navigation.ts#INDUSTRY_MENU` | `INDUSTRIES.map(...)` × `subIndustries.slice(0,4)` in the **global header**, on every route |

Consumer 3 is decisive on its own. Adding 50 master industries to `INDUSTRIES` creates **550
`/services/{service}/industries/{industry}` pages**. That is the pattern CLAUDE.md §11 lists as an
anti-pattern by name, generated silently, from a data edit, with an interpolated meta title
(`${svc.title} for ${ind.name} | Qognition`) and an interpolated description. No review step sees it.

Consumer 4 is the second: `Industry` has no publication field. There is no `indexable`, no `status`,
no reviewer. Anything added to `INDUSTRIES` is in the XML sitemap at priority 0.90 on the next
deploy. The spine-versus-indexable distinction this ADR is built on **cannot be expressed** in
`data/industries.ts` without changing its type, and changing its type touches all seven consumers.

Consumers 6 and 7 are the third: 50 masters puts 49 links in a `CrossLinks` block on every service,
industry and region page and up to 250 links in the header of every page on the site. That flattens
the link graph to noise and inflates every page's HTML. Worth noting: `scripts/check-served-page.mjs`
would **not** catch it. It measures route-specific client JS as `/` minus a control route, so growth
in the shared header cancels out of the subtraction. The existing budget gate is structurally blind
to nav bloat.

ADR-0001 §6 already froze `data/industries.ts` in prose. This ADR makes the freeze mechanical (§6.2).

### 2.2 `data/growth/taxonomy.ts` is not adopted, and not merged.

Three reasons, all from the code.

1. **It is welded to `/growth`.** `getNichePath()` returns `/growth/industries/${sector.slug}/...`.
   `getGrowthStaticParams()` computes `page.path.slice('/growth/'.length)`. The Sanity
   `growthPublication.path` field validates against
   `/^\/(?:[a-z]{2}(?:-[A-Za-z]+)?\/)?growth(?:\/|$)/`. ADR-0001 §4 catalogued this and declined to
   un-weld it; nothing has changed.
2. **ADR-0001 §5 froze `/growth`**: no new pages, no new kinds, pending a GSC-gated
   consolidate-or-kill at the 180-day mark. Publishing several hundred entities into a tree that is
   scheduled for a kill decision is the worst available option.
3. **The URLs would be wrong.** The operator's constraint is that `/industries/[industry]` and
   `/industries/[industry]/[subIndustry]` are the templates. `taxonomy.ts` cannot produce those
   paths without changing `getNichePath`, which changes 163 existing `/growth/*` sitemap URLs.

Merging the two taxonomies is rejected for the union of both objections: it inherits the seven
consumers *and* the `/growth` prefix contract, and it requires reconciling 11 consumer-flavoured
industries (criminal defense, family and divorce, care homes, elder care, coaching) with 69 B2B
niches, which is a content project with no user-visible payoff.

### 2.3 Decision: a third spine at `data/b2b/`, rendered through the existing routes

```
data/b2b/
  types.ts                    # the union in §3. No data.
  reviewers.ts                # closed union of named reviewers
  verticals/
    insurance-adjacent.ts     # one file per meta-vertical, ~12 files
    industrial.ts
    ...
  bodies/
    <meta>/<slug>.ts          # one file per INDEXABLE entity. Nothing else.
  index.ts                    # concatenates + Object.freeze. Checked, not hand-maintained (§6.3)
lib/b2b/
  registry.ts                 # resolveIndustry(slug) -> IndustryRecord | undefined
  graph.ts                    # parent/child/sibling/related, computed once at module scope
```

"Introduce a third and migrate" is rejected in its migration half. **Nothing migrates.** The legacy
11/66 stay where they are, rendering byte-identical HTML from byte-identical data, because the hard
constraint forbids changing their meta and their links, and because migrating them would reopen all
seven consumers. Three spines coexist: legacy (frozen, 11/66), growth (frozen, 8/69/103), B2B (new,
growing). That is one more tree than anybody wants and §9 records it as a cost.

### 2.4 How the existing templates render both: one branch, not a second template

The house convention is already written down. CLAUDE.md §5 on `components/growth/GrowthPage.tsx`:
*"Discriminated switch on `page.kind`. New page types are a new kind plus a branch, never a new
route."* That is exactly the move here, applied to the industry routes.

```ts
// lib/b2b/registry.ts
export type IndustryRecord =
  | { readonly source: 'legacy'; readonly data: Industry }        // from data/industries.ts
  | { readonly source: 'b2b';    readonly data: B2BIndustry };    // from data/b2b

export function resolveIndustry(slug: string): IndustryRecord | undefined;
export function resolveSubIndustry(industry: string, sub: string): SubIndustryRecord | undefined;
```

`app/industries/[industry]/page.tsx` gains:

- `generateStaticParams` = today's expression **unchanged**, concatenated with the B2B routable set
  (§3). Order preserved: legacy params first.
- `generateMetadata`: `if (record.source === 'legacy')` returns **today's object, character for
  character**. The `b2b` branch returns `metadataFor({ ..., noIndex: state !== 'indexable' })`.
- The render body: `if (record.source === 'legacy')` returns today's JSX, character for character.
  The `b2b` branch renders authored blocks.

This is why the legacy branch must be a literal early return rather than a shared parameterised
render. The three "quick summary" cards on the existing template
(*"Qognition connects industry pages to service pages, location pages, sub-verticals…"*) and the
per-feature constant paragraph on the sub-industry template (*"We translate this requirement into
search pages, ad messaging, creative proof…"*) are literal constants. So is the sidebar block linking
to `/locations`, `/resources`, `/directory` and `/free-tools`. **Those are template-level thin
content and a legacy link path into four families under kill review.** Reusing that render for
several hundred new pages would reproduce the `buildGeneratedServiceSubPage` failure at five times
the scale, on a template we are not allowed to fix because fixing it changes existing pages.

The branch resolves the contradiction: the existing pages keep their existing output, including its
defects, because the constraint says so. New pages get a render whose every block comes from the
authored payload. Same route, same file, same shell, same design system. Different branch.

One consequence to state plainly: the new pages' meta titles are produced by `metadataFor()` under
the `b2b` branch, so they are **not** `"${name} Digital Marketing | Qognition"`. That string is the
retired positioning (CLAUDE.md preamble) and this ADR will not mint several hundred new URLs carrying
it. Existing pages keep it; new ones do not. If the operator wants the string to match across old and
new, that is a change to existing meta titles and is out of scope by their own constraint.

---

## 3. Publication: states, ownership, and what the type makes unrepresentable

### 3.1 The union

`Publication` in `data/growth/types.ts` is the right idea, and ADR-0001 §4 says so, but three
independent booleans plus an unconstrained `evidence: string[]` permits the bad state. Same failure
shape as ADR-0006's rejected `isDemo?: boolean`. So the states become variants, and the payload
travels with the variant:

```ts
// data/b2b/types.ts
export type B2BIndustry = {
  readonly slug: Slug;
  readonly name: string;
  readonly meta: MetaVerticalId;            // grouping only. Never a URL segment. See §5.
  readonly parent?: Slug;                   // absent = master, present = sub-niche
  readonly aliases: readonly string[];       // feeds the uniqueness normaliser in §6.3
} & B2BPublication;

export type B2BPublication =
  /** Exists in the taxonomy. No route, no link, no sitemap entry, no page. Costs nothing. */
  | { readonly state: 'spine' }

  /** A page renders. noindex, absent from the sitemap. Linked only from its parent. */
  | { readonly state: 'draft'; readonly draft: DraftBody }

  /** Indexable. The payload is the bar. */
  | { readonly state: 'published'; readonly body: AuthoredBody; readonly review: Review };

export interface DraftBody {
  readonly summary: string;
  readonly buyerQuestion: string;
}

export interface AuthoredBody {
  /** One buyer question no other indexable page answers. CLAUDE.md §7. */
  readonly buyerQuestion: string;
  readonly intro: string;
  /** Minimum three, enforced by tuple arity. Not `Fact[]`. */
  readonly facts: readonly [Fact, Fact, Fact, ...Fact[]];
  readonly faqs: readonly [FAQ, FAQ, FAQ, ...FAQ[]];
  readonly proof: Proof;
}

export interface Fact {
  readonly claim: string;
  /** Required. CLAUDE.md §4: no number appears anywhere that was not measured. */
  readonly source: SourceRef;
}

export interface SourceRef {
  readonly url: `https://${string}`;        // a relative or empty URL does not typecheck
  readonly publisher: string;
  readonly accessedAt: IsoDate;
}

export type Review = { readonly reviewer: ReviewerName; readonly reviewedAt: IsoDate };
export type IsoDate = `${number}-${number}-${number}`;
```

`ReviewerName` is a closed union in `data/b2b/reviewers.ts`, the ADR-0006 `SampleBrand` pattern:

```ts
/** Named humans who have agreed to be accountable for a page. Adding a member is a reviewed change. */
export type ReviewerName = 'Nadia (search)' | 'Theo (content)' | 'Ruth (brand-guard)' | /* … */;
```

### 3.2 What is now unrepresentable

| Failure | Why it cannot be written |
|---|---|
| An indexable page with no authored body | `state: 'published'` requires `body`. There is no default. |
| An indexable page with fewer than three entity-specific facts | `facts` is a 3-tuple-with-rest, not an array. `[a, b]` does not typecheck. |
| A fact with no source | `source` is required on `Fact`. |
| A source with no URL, or a relative one | `url: \`https://${string}\``. |
| `reviewer: 'TBD'` / `'pending'` / `''` | `ReviewerName` is a closed union. |
| `reviewedAt: 'soon'` | `IsoDate` is a template literal type. |
| A sub-niche silently inheriting its parent's indexability | There is no inheritance. Every entity declares its own variant. |
| A spine entity being crawled | `state: 'spine'` produces no `generateStaticParams` entry, so the route 404s (`dynamicParams = false` is already set on both routes). |

### 3.3 What the type system cannot do, stated so nobody assumes it does

`IsoDate` accepts `1-2-3`. It stops `"soon"`, not `"9999-99-99"`.

More importantly: **TypeScript cannot see string content.** It cannot judge whether a `claim` is a
genuine entity-specific fact or the same sentence with a name swapped, whether the body is 40% unique
against its closest sibling, or whether the buyer question is one a buyer actually asks. Those are
exactly CLAUDE.md §7's substantive tests and they are **string-similarity properties**. They belong
in the gate (§6.3), not the type. Pretending otherwise would be the ADR-0006 failure repeated: a
policy dressed as a mechanism.

The division of labour, therefore:

| Bar | Enforced by |
|---|---|
| Structural completeness (three facts, sourced, reviewed, dated, FAQs) | **Compiler** |
| Not-a-template, ≥40% unique, no shared boilerplate, no orphan, depth ≤3, count ceiling | **`scripts/check-b2b.cjs`** |
| Whether the facts are true, and whether the page is worth a buyer's time | **The named reviewer.** That is what `ReviewerName` being a closed union is for. |

### 3.4 Who sets what

| Field | Set by | Where |
|---|---|---|
| `slug`, `name`, `meta`, `parent`, `aliases` | Kyle + Nadia, one reviewed PR per meta-vertical | `data/b2b/verticals/*.ts` |
| `state` | **Code only. Never Sanity.** Changing it is a reviewed diff in the wave's commit. | `data/b2b/verticals/*.ts` |
| `body` / `draft` | Theo authors, Nadia briefs, Ruth gates | `data/b2b/bodies/**` (floor) and Sanity (§4) |
| `review.reviewer` / `reviewedAt` | The named reviewer, in the PR that flips `state` to `'published'` | same commit |

**The rule that makes the CMS safe: Sanity can make a published page better. It cannot make an
unpublished page public.** `state` is never read from Sanity. This is the same asymmetry ADR-0002 §1
chose for case-study KPIs, for the same reason: the field that decides whether a claim reaches the
public does not belong in a text box.

---

## 4. Where the content lives

Split, following ADR-0002's hybrid rather than inventing a new one.

| Layer | Home | Why |
|---|---|---|
| Spine (slug, name, parent, meta, aliases, `state`) | **Committed TypeScript only** | It drives `generateStaticParams` and the sitemap. A build-time param list read from a CMS makes every deploy depend on Sanity being up. Rejected in ADR-0002 §1, and the project memory records Vercel env vars registered with empty values, which fails silently. |
| Body prose (`intro`, `faqs`, `proof` wording) | **Sanity `b2bIndustryPage`, committed `data/b2b/bodies/*.ts` as the floor** | Exactly `lib/sanityContent.ts`'s existing contract: Sanity is the source of truth when it answers, the repo is the floor when it does not. |
| `facts[].source` and `review` | **Committed only** | These are the claims gate. Same argument as `actual` on a case-study KPI. |

The Sanity document mirrors `industryPage` from ADR-0002 §2.2 with its publish validator, keyed by
`slug`, and **has no `state` field and no `facts[].source` field.** There is nothing in the schema to
type an unsourced number into.

### 4.1 Avoiding a 500KB unreviewable module

Four mechanics, all gate-asserted (§6.3):

1. **One file per meta-vertical** under `data/b2b/verticals/`. Roughly 12 files, each holding its
   masters and their sub-niches as spine entries. A wave touches one or two.
2. **One file per indexable entity** under `data/b2b/bodies/<meta>/<slug>.ts`. Authoring five pages
   is a five-small-file diff. Nobody reviews a thousand-line array.
3. **Hard file-size ceiling: 60KB per file under `data/b2b/`.** Exceeding it fails the build and
   forces a split. Chosen because a file that cannot be read in one sitting will not be read.
4. **The barrel is checked, not trusted.** `data/b2b/index.ts` is hand-written, and the gate asserts
   every `.ts` file in `verticals/` and `bodies/**` is reachable from it. This catches the page that
   was authored and never wired up, and, more usefully, the body file that was deleted while its
   entity still claims `state: 'published'`, which would otherwise be a runtime undefined.

### 4.2 A half-written page cannot publish

It has a name and a variant: `state: 'draft'`, whose payload is a two-field `DraftBody`. You cannot
write `state: 'published'` without a complete `AuthoredBody` in hand, because the compiler asks for
the tuple. There is no intermediate state where a page is "nearly done and indexable". Promotion from
`draft` to `published` is a diff that shows the reviewer's name being added on the same line as the
state change, which is precisely what you want a reviewer to see.

---

## 5. Internal linking: the mechanics

Nadia specifies which links should exist. This is where they are computed and how the failure modes
are closed.

**Computed once, in `lib/b2b/graph.ts`, at module scope.** Build-time Node, zero client JS, one place
to audit, one place a gate can read. No page hand-writes a link list. No component maps over the
whole registry. That is `CrossLinks`'s bug (§2.1, consumer 6) and this ADR does not repeat it.

```ts
// lib/b2b/graph.ts
export interface LinkNode {
  readonly slug: Slug;
  readonly parent?: Slug;                        // declared on the entity
  readonly children: readonly Slug[];            // derived: entities whose parent === this
  readonly siblings: readonly Slug[];            // derived: same parent, minus self
  readonly related: readonly Slug[];             // DECLARED, max 4, must resolve
}
export const B2B_GRAPH: ReadonlyMap<Slug, LinkNode>;
export function inboundCount(slug: Slug): number;
export function depthFromRoot(slug: Slug): number;
```

`related` is **declared, not computed.** A computed "related" list is how you get a 49-link mesh in
every footer. Four, hand-picked, resolved at build time.

### 5.1 Orphans made impossible, by two mechanisms

**Structural.** A parent page renders its children from the graph. `/industries` renders the master
list; each master renders its sub-niches. Any entity with a resolvable `parent` is linked by
construction. This is the same mechanism the existing template already uses
(`industry.subIndustries.map`), so it is proven on this template.

**Asserted.** The gate computes `inboundCount()` for every routable entity and fails on zero. Belt
and braces, because mechanism one depends on a template that someone will edit. A structural
guarantee that nothing checks decays into a historical accident.

### 5.2 Crawl depth ceiling: 3

```
/  →  /industries  →  /industries/{master}  →  /industries/{master}/{sub}
```

`/industries` is in `TOP_NAV` (`data/navigation.ts`) and in `coreRoutes`, so the chain starts at the
homepage. Gate asserts `depthFromRoot(slug) <= 3` for every `state: 'published'` entity.

**Meta-verticals are grouping only and never appear in a URL.** They group the `/industries` listing
into ~12 readable sections and supply the sibling set for related links. Making them a path segment
would add a fourth level and mint a new URL family, forbidden by the hard constraint, and
unnecessary.

### 5.3 Outbound link caps

- Sibling and related blocks on an entity page: **≤ 12 generated links**, gate-asserted.
- The parent's canonical children list is **deliberately uncapped**. It is the orphan-prevention
  mechanism, and capping it would silently orphan the overflow. Where a master has many sub-niches
  the list is grouped visually, not truncated.
- `components/shared/CrossLinks.tsx` and `data/navigation.ts` are **not extended.** Gate asserts
  neither imports from `data/b2b`. Consequence, stated for the operator: new industries will not
  appear in the header mega-menu. That is the price of leaving every existing page's internal links
  untouched, and the `/industries` hub link is sufficient for crawl.

---

## 6. Build, gates and budgets

### 6.1 What runs today

`pnpm build` = `pnpm gates && next build && node scripts/check-served-page.mjs`, where `gates` is
**four** scripts, not three: `audit-headings.mjs`, `check-css-invariants.mjs`, `test-growth.cjs`,
`check-publication.cjs --check`.

Two existing behaviours that matter:

- `check-publication.cjs` builds the legacy register by iterating
  `docs/repositioning/legacy-sitemap-baseline.json`. New URLs are not in the baseline, so **the
  committed register does not change** and `--check` passes untouched. Verified by reading the loop.
- `scripts/audit-headings.mjs` greps only `app` and `components`. Authored prose in `data/` is not
  typography-checked. Correct, because it renders through `Heading`/`Text` in the template.

### 6.2 Explicitly: `check-publication.cjs` cannot see `next.config.mjs`

It imports `lib/sitemap.ts`, `data/aiPlatforms.ts`, `data/growthPositioning.ts`,
`lib/growth/publication.ts`, `lib/growth-locales.ts`, `lib/legacy-publication.ts` and reads the
baseline JSON. **It never reads, parses or requires `next.config.mjs`.** It therefore cannot detect a
redirect chain, a redirect loop, a redirect to a 404, or a redirect whose source is still in the
sitemap-by-another-name. `isExistingRedirect()` is a hand-maintained regex plus array in
`lib/legacy-publication.ts` that must be kept in lockstep by a human.

**No redirects are in scope for this ADR**. New URLs only, no existing URL moves. So the gap does
not bite here. It is written down so that nobody reads a green `check-publication` on a later change
and concludes the redirect table was verified. It was not, and it cannot be by this script.

### 6.3 New gate: `scripts/check-b2b.cjs`

Inserted into `gates` after `test-growth.cjs`. Reuses `scripts/test-growth.cjs`'s exported `load()`
TypeScript transpiler so no new dependency is added.

1. **Spine integrity.** Every `parent` resolves to a master in the same registry. Slugs unique.
2. **Slug disjointness.** No B2B slug collides with an `INDUSTRIES` id, an `INDUSTRIES` sub-industry
   slug, or `executive-search`. A collision silently shadows a legacy page on a shared route.
3. **Legacy freeze.** `INDUSTRIES.length === 11` and total sub-industries `=== 66`. Makes ADR-0001
   ADR-0001 §6's prose freeze mechanical, and stops consumer 3 in §2.1 ever firing by accident.
4. **No blast radius.** `data/navigation.ts`, `components/shared/CrossLinks.tsx` and
   `lib/sitemap.ts#programmaticRoutes` must not reference `data/b2b`. Three greps. Crude and exactly
   sufficient, in the spirit of ADR-0006 §5.
5. **Uniqueness (CLAUDE.md §7, "≥40% unique against its closest sibling").** Normalise each published
   body: lowercase, strip punctuation, replace the entity's own `name` and every `alias` with a
   sentinel. 5-word shingles, Jaccard against every sibling under the same parent. **Fail if
   max ≥ 0.60.**
6. **Template-substitution detector.** After the sentinel substitution in (5), if two bodies hash
   identically or near-identically, fail and name both slugs. This is the mechanical form of
   CLAUDE.md §7's *"never substitute a city or industry name into a template and call it a page"*,
   and it is the check that would have failed `buildGeneratedServiceSubPage` on the day it was
   written.
7. **Boilerplate ceiling.** Any sentence of ≥12 words appearing verbatim in more than 3 published
   bodies fails. Catches the shared-constants failure before it becomes 119 pages of it.
8. **Graph.** `inboundCount(slug) >= 1` for every routable entity; `depthFromRoot(slug) <= 3` for
   every published entity; no entity's generated sibling+related block exceeds 12 links.
9. **Count budget.** `publishedCount <= B2B_PUBLISHED_CEILING`, a literal constant **in the gate
   script**. It starts at `0`. Each wave raises it by exactly that wave's size, in that wave's
   commit. The ceiling is therefore self-documenting and unraisable without review.
10. **File hygiene.** No file under `data/b2b/` exceeds 60KB. Every file in `verticals/` and
    `bodies/**` is reachable from `data/b2b/index.ts`.
11. **Sitemap ceiling.** No sitemap family exceeds 50,000 URLs. `lib/sitemap.ts` has no chunking
    logic (verified: no `chunk`, no `50000`, and the file's only `split` is a date format), and `renderUrlSet` builds
    one string. The largest family today is `programmatic` at 2,161, so this is cheap insurance
    against a future that stops being cheap.

CLAUDE.md §7 criterion 5, "site-wide indexable pages ÷ monthly organic sessions within the agreed
ratio", **cannot be asserted from the repo.** Sessions are not in it.
`[NEEDS DATA: agreed pages-to-sessions ratio, and a monthly organic sessions figure]`. Until it
exists, item 9's reviewed ceiling is the stand-in. Do not pretend the ratio is being checked.

### 6.4 SSG or ISR

**SSG, and `dynamicParams = false` is retained on both routes.** Four reasons:

1. It is already the convention on both routes (verified in both files).
2. An unknown slug must 404. With `dynamicParams = true` it renders a request-time miss instead.
3. ISR's value is content freshness without a deploy, and ADR-0002's Sanity tag-revalidate already
   provides that on top of a static build. ISR would buy nothing and cost a cold path.
4. These are the crawl target. Prerendering them is the entire point.

**Spine entities generate no route.** That is the answer to the build-time question: several hundred
*entities* cost zero build time; only `draft` and `published` entities become pages. Routes generated
by these two files today: 11 + 66 = 77. After Wave 1: still 77. The count grows only as pages are
authored.

**Escape hatch, pre-agreed:** if the budget below is breached, flip **only** the `draft` tier to
`dynamicParams = true` with a `revalidate`. Never the `published` tier.

### 6.5 Budgets

| Budget | Value | Action on breach |
|---|---|---|
| Vercel build wall-clock delta per wave | **≤ 90 seconds** | Apply the §6.4 escape hatch, or split the wave |
| `generateStaticParams` for the two industry routes | ≤ 600 combined | Re-argue this ADR |
| `industries` sitemap family | ≤ 1,000 | Re-argue this ADR |
| Any file under `data/b2b/` | ≤ 60KB | Split the file (gate-enforced) |
| Route-specific client JS on `/` | Unchanged at 40KB (ADR-0005) | n/a. Nothing here ships client JS |

`[NEEDS DATA: current Vercel build wall-clock for this repo.]` Local measurement is not available:
CLAUDE.md §6 records that build verification happens on Vercel because the repo lives in iCloud
Drive. The 90-second figure is a **delta budget** precisely so it does not depend on knowing the
baseline; it needs one measurement before Wave 2 and one after.

---

## 7. Staged rollout

Each wave is one commit. Each reverts with `git revert` of that commit alone, because a wave touches
only `data/b2b/**` plus the one-line ceiling in `scripts/check-b2b.cjs`.

### Wave 0: mechanism, zero new URLs

Ships: `data/b2b/types.ts`, `reviewers.ts`, an empty `index.ts`, `lib/b2b/registry.ts`,
`lib/b2b/graph.ts`, `scripts/check-b2b.cjs` with `B2B_PUBLISHED_CEILING = 0`, the `gates` entry, and
the discriminated branch in both industry routes and in `lib/sitemap.ts#industryRoutes`.

**Exit:** `pnpm build` green. Sitemap XML **byte-identical** to before. `legacy-page-register.json`
diff **empty**. `generateStaticParams` still 77. This wave's whole purpose is to prove the mechanism
costs nothing before any content rides on it.

### Wave 1: the spine, still zero pages

Ships: all ~50 masters and ~400 sub-niches as `state: 'spine'`, across ~12 files in
`data/b2b/verticals/`.

**Entry:** Nadia's taxonomy signed off as data.
**Exit:** gate green; routes still 77; sitemap still byte-identical; zero new links anywhere.

This is the wave that makes the rest cheap. The taxonomy gets reviewed as a data structure, in one
readable diff, with no page, no meta, no link and no crawl consequence. If the taxonomy is wrong,
it is wrong in a file, not in Search Console.

### Wave 2: the first authored pages, highest intent first

Ships: **8 master industries** promoted to `state: 'published'`, from the two meta-verticals closest
to the flagship verticals in CLAUDE.md §2 (insurance-adjacent and B2B professional services). Masters
before sub-niches, always: a master has the head term and is the parent that prevents its children
from being orphans.

**Entry:** `docs/seo/b2b-niche-architecture.md` merged; eight bodies authored; each with three sourced
facts and a named reviewer; Ruth clears the copy.
**Exit, measured at +28 days:** ≥60% of the eight have ≥1 GSC impression; median position flat or
improving; no manual action. These are CLAUDE.md §7 criteria 2 and 4 applied to the wave rather than
to the branch, because the branch has no history to measure.

### Wave 3 and onward: metered

Each wave: **≤ 25 newly published pages.** Entry criterion for wave *n* is the exit criterion of wave
*n−1*, plus CLAUDE.md §7's five tests evaluated on everything published so far. Sub-niches only
become eligible once their master has passed its own exit criteria. A sub-niche under a master with
no impressions is a thin page under an unproven parent.

**If a wave fails its exit criteria, the next wave does not ship.** The remedy is improve-or-prune on
what is already published (CLAUDE.md §7), not more pages. This is the only sentence in this ADR that
constrains the operator's approved volume, and it constrains the *rate*, not the destination.

**Kill rule inherited unchanged:** zero impressions after 180 days → consolidate and 301. Pull
Search Console for the URL group first. Backlinked URLs are never 410'd.

---

## 8. Alternatives rejected

**Extend `data/industries.ts`.** Seven consumers, none opt-in, one of which mints 11 × N pages of a
pattern CLAUDE.md §11 forbids by name, and the `Industry` type has no publication field in which to
say no. §2.1.

**Adopt or merge `data/growth/taxonomy.ts`.** Welded to the `/growth` prefix in four places including
a Sanity regex validator, and `/growth` is frozen pending a kill decision. §2.2.

**A fourth route family, e.g. `/niches/*`.** Rejected by the hard constraint, and rightly: it would
mint a new URL space for content that is, by every reasonable reading, an industry page.

**One big `data/b2b/industries.ts`.** Rejected on review surface. A single module holding several
hundred entities with bodies is not reviewable, and the first unreviewable diff is where the
`buildGeneratedServiceSubPage` copy gets pasted in.

**Put `state` in Sanity so the operator can publish without a deploy.** Rejected. That is a text box
that decides what Google indexes. Same objection ADR-0002 §1 made to a CMS field named `actual`, and
the same answer: the field that gates a public claim lives in code, where it gets reviewed.

**A lint rule instead of the tuple types.** Rejected for ADR-0006's reason: lint rules are
suppressible with a comment, and are suppressed at 6pm. A 3-tuple is not suppressible.

**Generate the bodies from a per-entity data template with more variables.** This is the
`buildGeneratedServiceSubPage` design with better inputs. More variables in the same template still
produces one template. The gate in §6.3 item 6 exists to fail exactly this, whoever proposes it and
however good their template is.

---

## 9. Consequences

**Good.** Several hundred entities exist as a complete, reviewable spine at zero crawl cost and zero
build cost, because a spine entity has no route. Indexability is a variant with a required payload,
so the failure that produced 2,161 programmatic pages is a compile error rather than a review
finding. Every existing page's meta, URL and internal links are untouched, by construction, because
the legacy branch is a literal early return. The legacy taxonomy becomes mechanically frozen, which
it was only rhetorically before. Each wave is one commit and reverts alone.

**Bad, and accepted.** The site now carries **three** industry taxonomies: legacy 11/66 (frozen),
growth 8/69/103 (frozen), B2B (growing). That is genuinely confusing to read and it depends on both
freezes being observed. Gate item 3 enforces the legacy one; `/growth`'s freeze is still prose from
ADR-0001 §5 and is not mechanically enforced. New industries do not appear in the header mega-menu,
so their only navigational entry point is the `/industries` hub.

**Ugly.** The existing `/industries/*` templates contain literal constant cards, a constant paragraph
per feature, and a sidebar linking to `/locations`, `/resources`, `/directory` and `/free-tools`,
four families under kill review. The hard constraint means those defects stay on the 77 existing
pages and are worked around, not fixed, by branching. Anybody reading
`app/industries/[industry]/page.tsx` after this change will see two renders and should be told why in
a comment on the branch, not left to infer it.

**The honest cost.** Several hundred pages of genuinely distinct, sourced, reviewed content is
roughly three sourced facts, three FAQs and a buyer question per page, each with a named human
attached. The type system guarantees that cost is paid before publication. It cannot reduce it. If
the content budget does not exist, this ADR converts that shortfall from "several hundred thin pages
shipped" into "several hundred spine entities and thirty good pages", which is the correct failure
mode but will not feel like one.

---

## 10. What would make this decision wrong later

1. **The `/growth` kill decision lands as "keep and invest."** Then there are two live B2B
   taxonomies with a reason to exist, and merging B2B into `taxonomy.ts` becomes the right call. The
   180-day mark in ADR-0001 §5 is the date to check.
2. **A wave passes its exit criteria but sub-niche pages consistently fail theirs.** That means the
   master level is the right granularity and the sub-niche level is not. Stop at masters; leave the
   sub-niches as spine permanently. This is a likely outcome and it is not a failure of the model.
3. **The uniqueness gate starts being argued with.** If §6.3 items 5–7 are being tuned to let content
   through rather than to catch it, the threshold is not the problem and the content is. Re-read
   CLAUDE.md §7 before touching the constant.
4. **The hard constraint is lifted.** If existing meta titles and internal links become editable, the
   `legacy` branch should be deleted and all industry pages rendered from one authored model. That is
   a better end state and this ADR is shaped around not being allowed to reach it yet.
5. **`data/industries.ts` needs a twelfth entry for a real reason.** Gate item 3 will fail the build.
   That is intended. Raising 11 to 12 means consciously accepting 11 new `/services/*/industries/*`
   pages, and the diff should say so.
6. **A second brand or a client-facing portal appears.** Introduces a tenancy model and voids this
   ADR's tenancy note, same as ADR-0001 §8.4.

---

## 11. Rollback

| Change | Rollback |
|---|---|
| Wave *n* content | `git revert` that wave's commit. It touches only `data/b2b/**` and the ceiling constant. Pages disappear from `generateStaticParams` and the sitemap on the next deploy. No redirect needed: they were never in the baseline and, under the wave gate, have been live for at most 28 days. |
| Any single page | Change `state: 'published'` to `'draft'`. One word. The page stays at 200, goes `noindex`, leaves the sitemap. This is the three-flag design's whole value and it survives the move to a union. |
| The `b2b` branch in the routes | Delete the branch and the `generateStaticParams` concatenation. The legacy branch is a literal early return, so removing the other branch cannot alter what the existing 77 pages emit. |
| `lib/sitemap.ts#industryRoutes` | Remove the appended `...b2bSitemapEntries()`. Existing entries are unchanged and in their original order, so the XML reverts exactly. |
| `scripts/check-b2b.cjs` | Remove one entry from `gates` in `package.json`. Additive, nothing depends on it. |
| The whole ADR | Delete `data/b2b/` and `lib/b2b/`, revert the two route files and `lib/sitemap.ts`, drop the gate. Nothing else in the repo imports them. |

**Rollback trigger.** Any of: a manual action in Search Console on the `/industries/*` group; the
`/industries/*` group's median position degrading for two consecutive 28-day periods after a wave;
or any published B2B page being found to contain a number without a source. The first two revert the
most recent wave. The third is a claims defect under CLAUDE.md §4 and reverts to `draft` immediately,
before diagnosis.

**Verification before merge of any wave.** `pnpm build` green on Vercel with all five gates passing.
The `legacy-page-register.json` diff must be **empty**. If it is not, something has touched an
existing URL and the hard constraint has been breached. That empty diff is the review artefact for
this ADR and should be checked, not skimmed.

---

## 12. Open items

- `[NEEDS DATA: agreed indexable-pages-to-monthly-organic-sessions ratio]` CLAUDE.md §7 criterion 5
  cannot be gated without it. §6.3 item 9's reviewed ceiling stands in.
- `[NEEDS DATA: current Vercel build wall-clock]` needed once, before Wave 2, to make §6.5's delta
  budget measurable.
- `[NEEDS DATA: backlink export for /industries/*]` carried forward from
  `docs/seo/gsc-url-group-baseline.md`. Not blocking here (nothing is being removed), but it blocks
  the 180-day kill rule when it arrives.
- `[UNVERIFIED: the exact tag dispatch in app/api/revalidate/route.ts]` inherited from ADR-0002 §3.
  A new `sanity:b2bIndustryPage` tag must be added there; the 60-second `revalidate` in `query()` is
  the safety net if it is missed.
- **Depends on Nadia.** The content requirements in `docs/seo/b2b-niche-architecture.md` are not
  merged yet. §3's `AuthoredBody` shape encodes CLAUDE.md §7's bar (one unanswered buyer question,
  ≥3 entity-specific facts, real evidence, named reviewer and date). If Nadia's bar is *higher*, the
  tuple arities and the §6.3 thresholds move to match before Wave 2. If it is lower, this ADR's shape
  wins, because it is CLAUDE.md's.
- **Blocked on the operator for the §"Hard constraint" interpretation**: adding master-industry links
  to `app/industries/page.tsx`. Without it, every new page is an orphan.
