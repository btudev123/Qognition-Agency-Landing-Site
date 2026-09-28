# ADR-0001: Route and redirect map for the B2B AI search repositioning

- Status: proposed
- Date: 2026-09-28
- Branch: `b2b-ai-search` (HEAD 006e80e)
- Supersedes: nothing. Constrains: `next.config.mjs`, `lib/legacy-publication.ts`, `lib/sitemap.ts`, `scripts/check-publication.cjs`

## Decision

The five layer pages ship as **conventional top-level `app/` routes** (`/seo`, `/local-seo`,
`/ai-seo`, `/geo`, `/ppc`), not as `GrowthPageKind` branches and not under `/services/*`. The legacy
`/services/*` tree keeps its page files and is demoted, never deleted. `/audit` becomes the canonical
audit URL and all 18 existing redirect sources are re-pointed to it in the same commit so no chain
forms.

## Tenancy note

Not applicable, and derived rather than assumed. There is no auth dependency in `package.json` (no
`next-auth`, `clerk`, `@supabase`), and `grep` for `getServerSession|userId|tenantId|organizationId|
accountId` across `lib app components` returns zero hits. This is a single-tenant public marketing
site. The one place untrusted input reaches a fetch is the audit/snapshot target URL, which is an
SSRF surface guarded by `normalizeTargetUrl` in `lib/auditEngine.ts`, not a tenancy boundary. See
ADR-0003.

---

## 1. Top level vs `/services/*`

### Decision: top level.

### What is actually there

`docs/repositioning/legacy-sitemap-baseline.json` (captured 2026-09-24, 4,246 URLs) breaks
`/services` down as:

| Depth | Count | Example |
|---|---|---|
| Hub | 1 | `/services` |
| Service | 11 | `/services/seo`, `/services/ai-seo`, `/services/ppc` |
| Sub-service | 119 | `/services/seo/technical-seo` |
| Service x industry | 121 | `/services/strategy/industries/law-legal` |
| **Total** | **252** | |

Only three of the eleven overlap the new IA: `/services/seo` ("SEO & Organic Growth"),
`/services/ai-seo` ("GEO & AI Search"), `/services/ppc` ("Paid Media (PPC)"). There is no
`local-seo` and no separate `geo` page anywhere in the tree.

### Why top level wins

1. **`/services/ai-seo` cannot be preserved anyway.** Its title is "GEO & AI Search", which conflates
   the two surfaces CLAUDE.md §1 says must never be blurred. The new IA splits it into `/ai-seo`
   (AI Overviews, AI Mode) and `/geo` (ChatGPT, Perplexity, Gemini, Claude, Copilot). That is a 1 to 2
   split. Whichever page keeps the old URL, the other one is a new URL regardless. The "do not move a
   ranking page" argument, which is the strongest argument for staying put, does not apply to the one
   page the repositioning is actually built on.
2. **`/services/*` is the URL space of the retired agency.** The 121 service x industry pages are
   exactly the pattern CLAUDE.md §11 forbids ("Generating industry x service x city pages"), and they
   are live and in the sitemap today. Mounting the new positioning inside that tree inherits its
   quality problem and makes the eventual cleanup harder, because the pages you want to keep and the
   pages you want to prune share a parent.
3. **Cost of the move is bounded and reversible.** Three URLs move. The page files stay on disk; only
   a 301 rule is added. Reverting is deleting the rule.

### Rejected: keep the layers at `/services/seo` etc.

Preserves three URLs' history at the cost of anchoring the flagship offer inside the retired
taxonomy, and still cannot express the AI SEO / GEO split without inventing `/services/geo`, which is
a new URL in the worse location.

### Rejected: `/services` as the new hub with five children

Same objection, plus the target IA in CLAUDE.md §5 has no services hub. The five layer pages are
siblings reached from global navigation.

---

## 2. Redirect table

**Rule for every row: add a 301, do not delete the page file.** A 301 is reversible in one line. A
deleted route is not. This is what makes the whole table rollback-safe.

### 2.1 Ships only after Search Console review (CLAUDE.md §7)

| From | To | Type | GSC gate |
|---|---|---|---|
| `/services/seo` | `/seo` | 301 | **Required** |
| `/services/ai-seo` | `/ai-seo` | 301 | **Required** |
| `/services/ppc` | `/ppc` | 301 | **Required** |

`/geo` and `/local-seo` are new URLs. No redirect, no history, nothing to check.

### 2.2 Ships immediately (no ranking history at risk)

| From | To | Type | Note |
|---|---|---|---|
| `/free-ai-audit` | `/audit` | 301 | See §3 |
| 18 existing sources currently pointing at `/free-ai-audit` | `/audit` | 301 (edit in place) | See §3 |

### 2.3 Deferred pending Search Console, with the expected action stated

No rule is written for these until the data is pulled. Listed so the decision is not re-litigated.

| Group | Count | Expected action if data confirms |
|---|---|---|
| `/services/*/industries/*` | 121 | `indexable: false` via `LEGACY_REVIEWS`. Not 410, not deleted. Backlinked URLs are never 410'd (CLAUDE.md §7). |
| `/services/ai-seo/llm-optimization` | 1 | 301 to `/geo`. It is a GEO-surface page under an AI-SEO parent. |
| `/services/ai-seo/ai-search-visibility` | 1 | 301 to `/ai-seo`. |
| `/services/seo/{technical-seo,content-strategy,link-building}` | 3 | Retain. These are supporting layers inside the retainer, and consolidating three URLs into one parent needs evidence, not a hunch. |
| Remaining `/services/*` sub-services | 114 | Retain, out of navigation, re-assess at the 180-day kill rule. |

### 2.4 URLs that must be checked in Search Console before any rule ships

Pull impressions, clicks, average position and backlinks for the last 90 days for each. Ship nothing
in §2.1 or §2.3 until this is in hand.

1. `/services/seo`
2. `/services/ai-seo`
3. `/services/ppc`
4. `/services` (the hub, because demoting it changes internal link flow to all 251 children)
5. The `/services/*/industries/*` group as a group (121 URLs)
6. `/services/ai-seo/llm-optimization` and `/services/ai-seo/ai-search-visibility`
7. `/free-ai-audit` (baseline, to prove the `/audit` move did not lose anything)

Context for the sceptical: the known site-wide numbers are 187 clicks and 73.7K impressions over
25 Jun to 24 Sep 2026 at average position 32.3, and the single best page was a **glossary** URL at
position 7.9 with 1,497 impressions that was returning 404. Per-URL performance for the `/services`
tree is `[UNVERIFIED: not present in this repo]`. That is precisely why the gate exists: this domain
has already demonstrated that a page nobody expected to matter was the one that mattered.

---

## 3. `/audit` and the no-chain requirement

### Current state, verified

- `app/free-ai-audit/page.tsx` exists and returns 200.
- `/free-seo-audit`, `/free-llm-audit`, `/branding-audit`, `/social-media-audit` already 301 to
  `/free-ai-audit`.
- **18 redirect rules in `next.config.mjs` target `/free-ai-audit`**, including the recovered
  `/glossary/ai-seo-and-sge-strategy-audit`.
- `next.config.mjs` already carries the author's intent inline: *"TODO: re-point to /audit when the
  snapshot page ships. Re-point, never chain."*

### Decision

`/audit` is canonical. In **one commit**:

1. Create `app/audit/page.tsx`.
2. Add `/free-ai-audit` to `/audit` (301).
3. **Rewrite all 18 existing rules** to point at `/audit` instead of `/free-ai-audit`.

Result: 19 rules, all one hop, zero chains. Doing step 2 without step 3 creates 18 two-hop chains,
including on the one URL that holds position 7.9.

The 18 sources, for the implementer:

```
/automation/audit          /branding-audit            /finance/audit
/free-llm-audit            /free-seo-audit            /marketing/audit
/social-media-audit        /tech/audit
/glossary/ai-seo-and-sge-strategy-audit
/glossary/ai-seo-and-sge-strategy-strategy
/resources/2026-guide-ai-seo-sge
/resources/branding-audit                 /resources/free-ai-audit
/resources/free-llm-audit                 /resources/free-seo-audit
/resources/free-seo-audit-checklist       /resources/social-media-audit
/resources/technical-seo-audit-checklist-nextjs
```

### The build gate will fail unless updated

`scripts/check-publication.cjs` asserts, for every baseline URL that is neither a known redirect nor
explicitly de-indexed:

```js
assert.ok(entries.some(e=>e.path===row.path),'Legacy route disappeared from discovery: '+row.path);
```

So every source and destination change above **must** be mirrored into `isExistingRedirect()` in
`lib/legacy-publication.ts`, which is a hardcoded regex plus array. `/free-ai-audit`, `/services/seo`,
`/services/ai-seo` and `/services/ppc` must be added there in the same commit. This is a feature, not
an obstacle: the gate is what stops a redirecting URL from staying in the XML sitemap. The new routes
(`/seo`, `/local-seo`, `/ai-seo`, `/geo`, `/ppc`, `/audit`) must be added to `coreRoutes` in
`lib/sitemap.ts` to enter discovery at all.

---

## 4. New pages: conventional routes, not `GrowthPageKind`

### Decision: conventional `app/` routes. Keep the `Publication` discipline, not the `/growth` machinery.

### Derived from the code, not from taste

1. **The manifest is structurally welded to `/growth`.** `getGrowthStaticParams()` computes
   `page.path.slice('/growth/'.length)`. `getGrowthPage()` builds `/growth${segments}`. The Sanity
   `growthPublication.path` field validates against
   `/^\/(?:[a-z]{2}(?:-[A-Za-z]+)?\/)?growth(?:\/|$)/`. Adding `/seo` means changing the prefix
   contract in three places plus the Sanity validator, with 50 localized paths asserted at exactly 50
   in `check-publication.cjs` riding on it.
2. **`GrowthPage.tsx` is a taxonomy renderer, not a page framework.** All 12 branches emit the same
   shell: breadcrumbs, eyebrow, H1, intro, `Actions()`, sections, banner. The money pages need
   different things per page: an inline lead form on `/audit`, a four-column scope table on
   `/pricing`, `FAQPage` schema, a tier comparison. Ten more branches turns a 119-line component into
   a router with twenty divergent layouts. That is the moment a switch stops paying for itself.
3. **The gate answers a question these pages do not ask.** The three flags exist because for a
   combinatorially generated URL, "may this page exist?" is genuinely open, and the manifest is how
   you say no. For 15 hand-authored pages the answer is always yes. The gate would carry no
   information.
4. **`GrowthPage.tsx` copy is the previous positioning.** It renders generic "AI-native B2B growth"
   pillars and 8 sectors with no insurance vertical. Reusing the component means either rewriting all
   of it or shipping the old message under new URLs.

### What is kept

The `Publication` type in `data/growth/types.ts` (`status` / `indexable` / `inNavigation` as three
orthogonal flags) is the best idea in this codebase and it is **not** growth-specific. The new routes
declare the same three flags in a small `lib/routes/publication.ts` manifest that `lib/seo.ts` and
`lib/sitemap.ts` read. Same discipline, no `/growth` coupling, no parallel rendering system.

### Rejected: new `GrowthPageKind` branches

Requires un-welding the `/growth` prefix from four places including a Sanity regex validator, to gain
a gate that always returns true, in order to render bespoke layouts through a component built for
uniform ones.

### Rejected: a second manifest-driven catch-all at `/[...segments]`

A root catch-all collides with `app/[spoke]/`, which still exists (see §5) and still matches any
single segment. Static segments win over dynamic ones in Next.js, so real folders are the predictable
choice.

---

## 5. The two competing hubs

### Verified state

- `/services` (legacy): 252 URLs, live, in the sitemap.
- `/growth/services`: served by `app/growth/[[...segments]]/page.tsx` from
  `lib/growth/publication.ts`. Absent from the 2026-09-24 sitemap baseline, so it postdates it.
- `app/[spoke]/` **still exists** with `VALID_SPOKES = ['marketing','tech','finance','automation']`,
  even though `next.config.mjs` 301s all four away. It is unreachable dead code for spokes, and is
  additionally used to serve non-English growth locales.

### Decision

**Neither becomes the new hub.** The target IA has no services hub; the five layer pages are siblings
in global navigation.

| Tree | Action | Why |
|---|---|---|
| `/services/*` | Retain all 252 URLs. Remove from primary navigation. Demote per §2.3 after GSC review. | Preserves link equity and the 3.89K indexed pages while the new IA earns its own. |
| `/growth/*` | **Freeze.** No new pages, no new kinds, `inNavigation: false` on all records. Schedule a GSC-gated consolidate-or-kill decision at the 180-day mark. | It is a third positioning layered on two others. Three hubs is one more than two. |
| `app/[spoke]/**` | Extract the growth-locale handling to its own route, then delete the spoke branch. | `VALID_SPOKES` is provably unreachable. Dead code that looks live is how the spoke model gets rebuilt by accident, which CLAUDE.md §11 lists first among anti-patterns. |

Do not delete `/growth` in this change. Freezing is reversible and costs nothing; deleting 2 minutes
before the GSC pull is the mistake §7 was written to prevent.

---

## 6. The two competing industry taxonomies

### Verified state

| Source | Count | Entries |
|---|---|---|
| `data/industries.ts` | 11 | law-legal, accounting-cpa, financial-services, consulting, real-estate, manufacturing, coaching, industrial-trade, care-homes, elder-care, waste-management |
| `data/growth/taxonomy.ts` | 8 sectors | software, industrial, professional, cybersecurity, logistics, compliance, life-sciences, energy |

**Neither contains insurance.** The flagship vertical is absent from both. `data/industries.ts` is
also consumer-flavoured in a way that fights the positioning (criminal defense, family and divorce,
care homes, elder care, coaching), and it is the multiplicand behind the 121 forbidden
`/services/*/industries/*` pages.

### Decision

**Neither is adopted.** `/industries/insurance`, `/industries/professional-services` and
`/industries/it-services` are three hand-authored pages backed by a new narrow type in
`data/industry-pages.ts` (see ADR-0002).

The reasoning is short: you cannot "choose" a taxonomy that does not contain your flagship vertical.
And both existing taxonomies are combinatorial engines whose purpose is to produce many pages, which
is the opposite of what three deep pages need. `data/case-studies/types.ts` already has
`Niche = 'hvac' | 'dental' | 'insurance'` and `data/case-studies/insurance.ts` holds 10 records, so
insurance already exists in the codebase as evidence. It just does not exist as an industry page.

`data/industries.ts` is retained unchanged to keep the 78 existing `/industries/*` baseline URLs
alive and passing the build gate. It is frozen: no new entries, and it must not back a new page.

`/industries/insurance` and the existing `app/industries/[industry]/page.tsx` collide on the URL
space. Static segments win, so `app/industries/insurance/page.tsx` takes precedence over the dynamic
route for that one slug. The precedent is already in the tree: `app/industries/executive-search/page.tsx`.

---

## 7. Consequences

**Good.** The flagship offer lives at short, head-term URLs outside the retired taxonomy. AI SEO and
GEO get separate URLs, so the distinction CLAUDE.md §1 insists on is enforced by the IA rather than
by copy discipline. No URL is deleted, so every step is reversible. The existing three-flag
publication discipline is preserved without dragging `/growth` along.

**Bad, and accepted.** Three URLs with unknown ranking history move. The site carries three service
trees at once (`/services`, `/growth`, top-level) until the GSC-gated cleanups run, which is
confusing to anyone reading the repo and requires the freeze in §5 to be actually observed. The
`/services/*` internal link graph weakens when the tree leaves primary navigation, which will show up
as position drift on the 251 children before any redirect ships.

**Ugly.** `scripts/check-publication.cjs` and `lib/legacy-publication.ts` must be edited in lockstep
with every `next.config.mjs` change or the build fails. That coupling is deliberate and should not be
loosened.

## 8. What would make this decision wrong

Revisit if any of these become true.

1. The Search Console pull shows `/services/seo`, `/services/ai-seo` or `/services/ppc` holding a
   top-10 position or meaningful backlinks. Then keep the URL and put the new page there, accepting
   the AI SEO / GEO split lands on a fresh `/geo` only.
2. Top-level layer pages show no impressions after 90 days while `/services/*` retains them. That
   means the redirects lost equity rather than moved it. Revisit before the 180-day kill rule.
3. The number of hand-authored pages passes roughly 40. At that point a manifest-driven renderer
   starts paying for itself and §4 should be re-argued.
4. A second brand or a client-facing portal appears. That introduces a tenancy model and this ADR's
   §"Tenancy note" is void.

## 9. Rollback

Every step is a config revert. No route files are deleted anywhere in this ADR, which is what makes
this possible.

| Change | Rollback |
|---|---|
| §2.1 `/services/*` 301s | Delete the three rules from `next.config.mjs`; remove the three paths from `isExistingRedirect()`. Pages return 200 on the next deploy. |
| §3 `/audit` cutover | Revert the 18 rewritten rules and delete the `/free-ai-audit` to `/audit` rule. `app/free-ai-audit/page.tsx` is untouched, so it serves immediately. Leave `app/audit/page.tsx` in place; an orphan 200 is harmless. |
| §4 new routes | Delete the route folders and their `coreRoutes` entries. Nothing else references them. |
| §5 `/growth` freeze | Set `inNavigation: true` in `lib/growth/publication.ts`. One flag, which is the point of the three-flag design. |
| §5 `app/[spoke]` deletion | `git revert`. Verify growth-locale routes still resolve before merging the deletion, not after. |
| §6 industry pages | Delete the three static folders; `app/industries/[industry]/page.tsx` resumes handling those slugs. |

**Rollback trigger:** any of the three moved `/services` URLs losing more than half its impressions
over 28 days with no corresponding gain on the new URL, measured against the pre-redirect baseline
captured in §2.4.

**Verification before merge:** `pnpm build` must pass with `scripts/check-publication.cjs` and
`scripts/audit-headings.mjs` green. The publication script rewrites
`docs/repositioning/legacy-page-register.json`; that diff is the review artifact and should be read,
not skimmed.
