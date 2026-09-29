# ADR-0002: Editable content model for pricing, case studies and industry pages

- Status: proposed
- Date: 2026-09-28
- Depends on: ADR-0001
- Constrains: `lib/sanityContent.ts`, `sanity/schemaTypes/*`, `data/case-studies/*`, `app/pricing`, `app/industries/*`

## Decision

**Hybrid, following the pattern already documented in `lib/sanityContent.ts`:** Sanity is the source
of truth when it answers, committed TypeScript under `data/` is the floor when it does not.

Applied per content type, and not uniformly, because the three types have different failure costs:

| Content | Where it is editable | Fallback | Why |
|---|---|---|---|
| Pricing tiers | Sanity `pricingTier` | `data/pricing.ts` | Operator changes scope wording often. Nothing here can become a false claim. |
| Industry pages | Sanity `industryPage` | `data/industry-pages.ts` | Same. Prose about a vertical. |
| Case study **KPIs** | **Code only. Not editable.** | n/a | `caseStudyEvidence()` is the claims gate. A CMS field for `actual` is a text box that turns a target into a published result. |
| Case study **prose** | Sanity `caseStudyNarrative` | the record in `data/case-studies/*` | Summary, quotes and FAQs carry no numbers, so they carry no claims risk. |

New document types. **`growthPublication` is not reused** for any of this: its `path` field validates
against `/^\/(?:[a-z]{2}(?:-[A-Za-z]+)?\/)?growth(?:\/|$)/`, so it cannot express `/pricing` or
`/industries/insurance`, and its required `originalContext` field is correct for a programmatic page
and meaningless on a pricing tier.

---

## 1. Why hybrid and not the alternatives

### Rejected: a single typed config file

Fails the requirement outright. The operator must edit without code, and editing
`data/pricing.ts` means a branch, a PR, a build gate run and a deploy.

### Rejected: Sanity as the only read path

Two verified hazards in this repo make a no-fallback read path a production outage waiting to happen.

1. `lib/sanity.ts` already ships `isSanityConfigured()`, described in its own comment as existing
   "so callers can fall back to local data". The codebase has already concluded that Sanity may not
   be configured.
2. The project memory records that **Vercel env vars were registered with empty values**, which
   silently breaks integrations. An empty `NEXT_PUBLIC_SANITY_PROJECT_ID` with no fallback blanks the
   pricing page in production and nothing throws.

`lib/sanityContent.ts` already argues this in prose and it is worth quoting, because it is the
existing decision and this ADR is extending it rather than inventing anything:

> a Sanity outage, a network blip, or a document that has not been migrated yet must never blank a
> page that used to render. Sanity is the source of truth when it answers, and the repo is the floor
> when it does not.

### Rejected: everything in Sanity including case study KPIs

This is the one place the hybrid is asymmetric, and it is deliberate. CLAUDE.md §4 says case-study
KPIs are labelled targets until `actual` is populated from client reporting, that `caseStudyEvidence()`
enforces this in one place, and that a benchmark-derived figure must never go in `actual`.
`data/case-studies/types.ts` backs that up in its own comment: "There is no third state and no default."

A Sanity string field named `actual` is a text box. It cannot distinguish a figure copied from a
client reporting export from a figure someone estimated on a call. Putting it in the CMS relocates
the single most consequential claim on the site from a reviewed code change into an unreviewed one.

Project memory also records the current state: 45 real clients, KPI numbers staying labelled as
targets until the reporting export fills the `actual` columns. The export, not a human typing, is the
intended write path.

---

## 2. Schemas

### 2.1 `pricingTier`

Tiers are shown by scope with **no prices published**. This is enforced structurally: there is no
price field to fill in.

```ts
// sanity/schemaTypes/pricing.ts
defineType({ name: 'pricingTier', type: 'document', fields: [
  defineField({ name: 'tierKey', type: 'string',
    options: { list: ['growth','authority','dominance','enterprise'] },
    validation: r => r.required() }),          // stable join key to the fallback
  defineField({ name: 'displayName', type: 'string', validation: r => r.required() }),
  defineField({ name: 'order', type: 'number', validation: r => r.required().integer().min(1) }),
  defineField({ name: 'isAnchor', type: 'boolean', initialValue: false,
    description: 'Exactly one tier is the anchor. Authority by default.' }),
  defineField({ name: 'positioningLine', type: 'string',
    description: 'One sentence. Who this scope is for. No numbers that were not measured.' }),

  // Scope. The only axis tiers differ on.
  defineField({ name: 'locationsCovered', type: 'string', validation: r => r.required() }),
  defineField({ name: 'promptsTracked',   type: 'string', validation: r => r.required() }),
  defineField({ name: 'assetsProduced',   type: 'string', validation: r => r.required() }),
  defineField({ name: 'additionalScope', type: 'array',
    of: [{ type: 'object', fields: [
      { name: 'label', type: 'string' }, { name: 'value', type: 'string' } ] }] }),

  defineField({ name: 'reviewer',   type: 'string' }),
  defineField({ name: 'reviewedAt', type: 'datetime' }),
],
validation: r => r.custom(v => {
  const t = v as { reviewer?: string; reviewedAt?: string } | undefined;
  if (!t) return true;
  if (!t.reviewer || !t.reviewedAt) return 'A tier needs a named reviewer and a review date.';
  return true;
}) })
```

**Deliberately absent:** `price`, `priceFrom`, `currency`, `monthlyFee`, anything numeric-with-a-unit.
There is no field for a price, so a price cannot be published by editing content. Changing that
requires a schema change, which is a code review.

**Not editable, because it is a business invariant rather than content:** every tier includes every
layer. `includedLayers` is rendered from a constant in `data/pricing.ts`, identical for all four tiers.
An operator cannot accidentally ship a tier that drops Local SEO, which would contradict CLAUDE.md §1.

**Required build gate.** Add to `scripts/check-publication.cjs`: the four `tierKey` values resolve,
exactly one has `isAnchor`, and no rendered tier string matches
`/[$£€]\s?\d|\d+\s?(k|K)\b|\bper month\b|\bpm\b/`. Schema absence stops a price *field*; the gate
stops a price typed into `positioningLine`. Both are needed.

### 2.2 `industryPage`

```ts
defineType({ name: 'industryPage', type: 'document', fields: [
  defineField({ name: 'slug', type: 'slug',
    options: { source: 'h1' }, validation: r => r.required() }),   // insurance | professional-services | it-services
  defineField({ name: 'h1',       type: 'string', validation: r => r.required() }),
  defineField({ name: 'intro',    type: 'text', rows: 3, validation: r => r.required() }),
  defineField({ name: 'ourBuyer', type: 'text', rows: 3,
    description: 'Owner, CEO, marketing or growth leader at the firm.' }),
  defineField({ name: 'theirBuyer', type: 'text', rows: 3,
    description: 'Who buys from the client. Keep distinct from ourBuyer (CLAUDE.md §2).' }),
  defineField({ name: 'buyerPrompts', type: 'array', of: [{ type: 'string' }],
    description: 'Real prompts this vertical is asked. Feeds the snapshot prompt set.' }),
  defineField({ name: 'body',  type: 'array', of: [{ type: 'block' }], validation: r => r.required() }),
  defineField({ name: 'faqs',  type: 'array', of: [{ type: 'object', fields: [
    { name: 'question', type: 'string' }, { name: 'answer', type: 'text' } ] }] }),
  defineField({ name: 'status', type: 'string',
    options: { list: ['draft','review','published'], layout: 'radio' }, initialValue: 'draft' }),
  defineField({ name: 'reviewer',   type: 'string' }),
  defineField({ name: 'reviewedAt', type: 'datetime' }),
],
validation: r => r.custom(v => {
  const p = v as { status?: string; reviewer?: string; reviewedAt?: string; body?: unknown[] } | undefined;
  if (!p) return true;
  if (p.status === 'published' && (!p.reviewer || !p.reviewedAt || !p.body?.length))
    return 'Publication requires body content and an explicit reviewer and date.';
  return true;
}) })
```

This mirrors the `growthPublication` validator's publish rule on purpose. That rule is good and
should be the house standard; it just should not be reached by reusing a `/growth`-scoped document
type.

### 2.3 `caseStudyNarrative`

Prose only, joined to the code record by `caseId` (`data/case-studies/types.ts` already describes
`caseId` as "Source sheet identifier, retained for reconciliation against reporting exports").

```ts
defineType({ name: 'caseStudyNarrative', type: 'document', fields: [
  defineField({ name: 'caseId', type: 'string', validation: r => r.required() }),
  defineField({ name: 'summary', type: 'text', rows: 4 }),
  defineField({ name: 'clientQuote', type: 'object', fields: [
    { name: 'text', type: 'text' }, { name: 'attribution', type: 'string' },
    { name: 'approvedAt', type: 'date' } ] }),
  defineField({ name: 'faqs', type: 'array', of: [{ type: 'object', fields: [
    { name: 'question', type: 'string' }, { name: 'answer', type: 'text' } ] }] }),
] })
```

**No `kpis`, no `actual`, no `baseline`, no `target`, no `change`.** Those stay in
`data/case-studies/*.ts` and keep flowing through `caseStudyEvidence()`. If a narrative field ever
needs a number, that number is already in the KPI rows and should be rendered from there.

The existing Sanity `caseStudy` type (`sanity/schemaTypes/caseStudy.ts`) is registered in
`schemaTypes` but holds zero documents and predates the current record shape, per the comment in
`lib/sanityContent.ts`. Leave it registered and unused, or remove it in a separate commit. Do not
extend it.

---

## 3. Read path and fallback behaviour

New functions in `lib/sanityContent.ts`, using the file's existing `query()` helper unchanged, so
tagging, the 60-second revalidate and the try/catch-to-null contract are inherited rather than
reimplemented.

```ts
export async function getPricingTiers(): Promise<PricingTier[]> {
  if (!isSanityConfigured()) return PRICING_TIERS;               // no network call at all
  const result = await query<PricingTier[]>(
    `*[_type == "pricingTier"] | order(order asc) { ... }`, {}, [tagFor('pricingTier')]);
  if (isEmpty(result)) return PRICING_TIERS;
  return mergeWithFallback(result!, PRICING_TIERS);
}
```

### Fallback rules, stated exactly

| Condition | Behaviour |
|---|---|
| Sanity not configured (`isSanityConfigured()` false) | Return the committed data. Do not issue a request. |
| Sanity unreachable, times out, or throws | `query()` logs `[sanity] query failed, falling back to local data` and returns `null`. Return the committed data. |
| Sanity reachable, zero documents | `isEmpty()` true. Return the committed data. |
| Sanity returns a partial set (2 of 4 tiers) | **Merge by `tierKey`.** CMS documents win per key; missing keys come from the committed set. A pricing page that renders two tiers is worse than one that renders four with two stale. |
| Sanity returns a tier with a required field empty | Field-level fallback to the committed value for that field. |
| Industry page missing | Return the committed page, as `getPillarPage()` already does. The route is fixed and in the sitemap, so it must never 404 on a CMS gap. |

`mergeWithFallback` is the one piece of genuinely new behaviour here. The existing helpers are
all-or-nothing per document; pricing needs per-key merge because a partial tier set is a broken page
rather than a stale one.

### Revalidation

Unchanged from the existing mechanism: `/api/revalidate` receives the Sanity webhook and invalidates
by tag. New tags `sanity:pricingTier`, `sanity:industryPage`, `sanity:caseStudyNarrative` must be
added to whatever that route dispatches on. `[UNVERIFIED: the exact tag dispatch in
app/api/revalidate/route.ts was not read for this ADR.]` Check it before implementing; the 60-second
`revalidate` in `query()` is the safety net if a webhook is missed, so a missed tag degrades to a
one-minute delay rather than stale-forever.

---

## 4. Consequences

**Good.** The operator edits pricing scope, industry prose and case study narrative in Sanity Studio
with no deploy. Sanity becoming unavailable degrades to the last committed content instead of a blank
page or a 500. The claims gate stays in code where it gets reviewed. Nothing here can publish a price
or an unverified KPI without a schema change.

**Bad, and accepted.** Two sources of truth drift. A tier edited in Sanity and never back-ported
leaves `data/pricing.ts` stale, and nobody notices until Sanity goes down and the old wording
reappears. Mitigations considered and rejected: asserting parity at build time makes the build depend
on Sanity being up, which trades a content risk for a deploy risk. Accepted instead with a review
trigger in §5. The per-key merge in §3 also means the page can render a mix of CMS and committed
content, which is correct behaviour but harder to reason about when debugging.

**Awkward.** Case studies are editable for prose and not for numbers. That is a real seam the
operator will hit and must be told about, or they will look for the KPI fields and file a bug.

---

## 5. What would make this decision wrong

1. **Drift becomes real.** Sanity and `data/pricing.ts` diverge for more than one editing cycle, or a
   fallback render ships wording the operator thought they had changed. Then either back-porting
   becomes a checklist item or the fallback becomes a deliberate "last known good" cache written on
   successful fetch.
2. **The operator wants a fifth tier or a new scope axis.** The schema handles new tiers only via the
   `tierKey` option list, which is a code change. If tiers change more than about twice a year, drop
   the enum and key on the slug.
3. **Sanity proves reliable for a full quarter with env vars verified non-empty.** The fallback is
   insurance against a specific, recorded failure. If that failure stops recurring, the maintenance
   cost of the second copy stops being worth it for industry pages, though not for pricing.
4. **`actual` starts being populated by an automated reporting import.** At that point the write path
   is a machine, not a person, and case study KPIs could move to a CMS-backed store safely. That is
   the specific condition, not "we got more comfortable with it".

---

## 6. Rollback

| Change | Rollback |
|---|---|
| `pricingTier` read path | Change `getPricingTiers()` to `return PRICING_TIERS`. One line. Committed data is complete by construction, so the page is unchanged. |
| `industryPage` read path | Same shape, return the committed page. |
| `caseStudyNarrative` | Same. Case study KPIs never went through Sanity, so there is nothing to restore. |
| Schema types | Remove from `sanity/schemaTypes/index.ts`. Documents are orphaned, not deleted, so re-adding the type restores them. |
| The price-pattern build gate | Delete the assertion. It is additive. |

**Migration direction matters.** Ship `data/pricing.ts` and `data/industry-pages.ts` **complete and
rendering** first, in their own commit, with the read path still returning the committed data. Point
the read path at Sanity in a second commit. That way the rollback target is a state that has already
been observed working in production, not one that is only believed to work.

**Rollback trigger:** any production render of `/pricing` or an industry page that is blank, missing a
tier, or showing a figure the operator did not enter.
