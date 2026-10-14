# ADR-0011: The /industries rebuild build contract (levels 1 and 2)

- Status: **proposed**. Owen (`quality`) reviews this contract and every diff built against it. Nothing in it is implemented.
- Date: 2026-10-08. **Amended 2026-10-14 (Amendment 1)**, after Owen returned FIX on 2026-10-14. **Amended again 2026-10-14 (Amendment 2)**, after Owen's re-review returned FIX on four narrow items, **and Amendment 2.1** the same day, after his re-check returned FIX on one.
- Branch: `main`, at `fbcff5c`, working tree dirty (see git status). Read on 2026-10-08. Re-read at `aa0e524` on 2026-10-14 for Amendment 1; none of the files cited below changed between the two. Re-read at `f077cce` for Amendment 2.
- Author: Kyle (architect). **Interface and gate contract only. No feature code.** Luke (`backend-dev`) owns the resolver, gates, ledger, sitemap and agent-markdown work. Mira (`frontend-dev`) owns the hub, the two templates and the legacy owner links. Iris (`research`) and Theo (`content`) fill the bodies. Ruth (`brand-guard`) gates every rendered string. Prabal signs each page.
- Implements: `docs/seo/2026-10-industries-rebuild.md` (Nadia, 2026-10-08), as modified by the operator's 2026-10-08 "Industries rebuild decisions" in the CLAUDE.md authority block.
- Amends ADR-0008 in six places, named where they occur: §3.4 (financial-services), §5.3 (levels 1 and 2 render per request; Amendment 2), §6.2 and §6.4 items 2 and 5 (promotion unit and wave size, for levels 1 and 2 only), §7.4 (the hub), §12 (single-page rollback).
- Depends on: ADR-0006 (closed unions over policies), ADR-0008 (four-level shape, resolver, ceiling), ADR-0010 **§2 only** (preview isolation, `dynamicParams = true` with a server-only preview resolver, the environment table). **Amendment 2:** this ADR does not depend on ADR-0010's lead and booking half (§3 to §5: GHL history, receipts, the Upstash ledger, booking semantics). The operator removed GoHighLevel and Upstash on 2026-10-14 and moved booking to Cal.com (CLAUDE.md authority block, "Lead and booking stack"), so nothing here may cite those sections.
- Constrains: `data/b2b/icp/**`, `lib/b2b/**`, `lib/industries/**` (new), `app/industries/**`, `app/agent-markdown/route.ts`, `app/llms.txt`, `app/llms-full.txt`, `lib/sitemap.ts`, `components/b2b/**`, `scripts/check-icp.cjs`, `scripts/check-industry-gate.cjs`, `scripts/check-served-page.mjs`, `data/case-studies/**` (one new map). Amendment 1 adds: `scripts/icp-sign.mjs`, `scripts/icp-keygen.mjs`, `scripts/icp-brand-check.mjs`, `scripts/lib/icp-*.cjs`, `docs/seo/gsc/**`, `scripts/fixtures/icp/**`.

## Amendment 1, 2026-10-14

Owen (`quality`) reviewed this ADR on 2026-10-14 and returned **FIX**. I re-read every file he cited
before accepting a finding. All eleven findings were confirmed against the code; none is rejected. Two
are resolved differently from his wording, and the reason is written where it is resolved (F4, F11
with O7). Status stays **proposed**.

| Finding | What was wrong | Resolved in |
|---|---|---|
| **F1** Drafts can go live in production | `resolveIcp` (`lib/b2b/icpRegistry.ts:251`) rejects only `'spine'`, and both route files (`[industry]/page.tsx:110`, `[subIndustry]/page.tsx:101`) render any record it returns under `dynamicParams = true`. Today `ICP_DRAFTS` is empty, so nothing leaks yet; this ADR's own §2.1 ("registered and unsigned is a draft") would have made all 359 drafts render in production | §0.1 build order (commit C0 first), §2.5 `resolveIcp` production rule, §12 T1 |
| **F2** Served check names no environment | §4.4 compared HTML and markdown status codes against each other, in whatever environment the build ran | §3.5 (two passes, explicit expected status per path), §12 T1, T2, T18 |
| **F3** Ledger hash proves nothing about Prabal | Anyone can compute a sha256 | §2.2 (Ed25519 signature, passphrase-protected key, committed public key, template digest, per-page `signedAt`), §8 item 3 |
| **F4** Ruth's sign-off not tied to what she read | `provenance.brandCheck` carried no hash, and `provenance` is excluded from the body hash | §1.3, §2.2 (brand checks move to their own file, carry `bodyHash`, written only by Ruth's step), §12 T5 |
| **F5a** No union-overlap gate; wrong prose | Nearest-page containment measures overlap with one page, but the prose said "appears nowhere else" | §3.1 (U2b and U5b, prose rewritten) |
| **F5b** Name substitution misses "&" and short forms | `check-icp.cjs:726` substitutes the raw name before punctuation is normalised, and only the page's own name | §3.1 normalisation |
| **F5c** Taxonomy-derived text counted as authored overlap | Scope rows, breadcrumbs and child names are shared by construction | §3.1 `data-derived`, with a gate that stops it becoming a loophole |
| **F5d** Gates walk different strings | U1 walks hand-picked V1 fields (`check-icp.cjs:714-722`); G5 and U2 were unspecified; U5 did not strip scripts; the breadcrumb `<nav>` sits inside `<main>` (`IcpBlocks.tsx:86`, rendered from `IcpHero`) | §3.1 shared walker and one breadcrumb rule, §3.3 |
| **F6** Two gates fail during drafting | G1 completeness and §2.3 set equality fail until all 359 bodies exist; "empty registers" do not compile with a required `body` | §2.1 register shape, §2.3 two modes, §3.2 G1 |
| **F7** Rollback | Single-page rollback broke set equality and children's up-links; "within 90 days no redirect is owed" has no source in CLAUDE.md and contradicts §7; FS precedence could serve nothing; row 3 left counts stale | §2.3 `ICP_HELD`, §2.5 precedence, §9 rewritten |
| **F8** One `icp` route kind for published and draft | The sitemap and llms.txt could list a draft by type | §2.5 `IndustriesRoute` split |
| **F9** Wave-size gate is vacuous | `check-icp.cjs:375-376`, `COHORTS.length <= 2 \|\| CEILING > 25`, is always true at 367 | §2.4 R4d rewritten over levels 3 and 4, `levels` pinned to `[1, 2]` |
| **F10** "Reported" facts can be laundered | `via` had no source class | §1.2 `ViaSourceClass`, one observed entity fact per page, §3.2 G18 |
| **F11** FS evidence check untestable | "spans at least 480 days" named no file format | §2.5 evidence record and parser |
| Smaller | TIC carries "(TIC)"; O4 is 77 pages; "21 runs in parallel" breaks AGENTS.md; spine collisions; preview precedence; copy gates; O8; Owen's 17 test cases | §0, §4.5 and O9; §4.5 and O4; §2.1; §2.5 and T16; §2.5 and T18; §3.2 G17; §11 O8; §12 |

**Design changes that follow from the findings, named so they are reviewed as changes and not read
as clarifications.**

1. **Signing and publishing are now separate events** (F6, F7). Prabal's signatures are committed
   as he makes them, in signing commits. A signed page is still a draft. Publication is the commit
   that declares `ICP_REBUILD_WAVE`. Before, the ledger itself was the publication commit, which
   would have left 359 uncommitted signatures in the working tree for as long as reading took,
   failing every gate and blocking every preview in between.
2. **Ruth's verdict leaves the body** (F4). It moves to `data/b2b/icp/brandChecks.ts`, outside every
   research agent's write scope.
3. **A held list exists from the start, kept empty** (F7, O2). It is the single-page rollback
   mechanism whatever the operator answers on O2. O2 now asks only whether the first publication may
   go out with entries on it.

## Amendment 2, 2026-10-14

Owen re-reviewed Amendment 1 and returned **FIX** on four narrow items. F1 to F11 are closed, and he
accepted all three departures (F4, the equal union threshold, F11 with O7). I re-read the files each
item cites at `f077cce`. All four are confirmed; none is rejected.

| Item | What was wrong | Resolved in |
|---|---|---|
| **A2-1** §5 claimed static generation | `app/layout.tsx:102` awaits `headers()`, which makes every page route dynamic. Owen built `f077cce` twice: as committed, 17 static, 1 SSG and 71 dynamic routes, with `/industries` and all four `[..]` levels dynamic; with only that line changed, 48 static, 29 SSG and 12 dynamic. And `layout.tsx:108` reads the consent region from `x-vercel-ip-country`, so a static page fails closed to opt-in | §5 rewritten: **option (a), per-request rendering accepted for L1/L2**; option (b) deferred to its own consent ADR; a rule and a test (T25) that `headers()` is not removed without moving the consent default |
| **A2-2** Template digest misses text sources | ICP pages also render text from `data/servicePages.ts` (`PROOF_LINE_B2B`, `PROOF_LINE_INSURANCE`, imported at `IcpBlocks.tsx:11`), `data/case-studies`, `components/visual/*`, `lib/seo.ts` and `lib/schema.ts` (imported by `lib/b2b/icpMetadata.ts`) | §2.2: the digest is the computed project-file import tree, not a hand list; the sign-off chain is allowed before P |
| **A2-3** T3 committed a test private key | That contradicts G2's "no tracked private key" | §12 T3: keys generated in memory at test time, plus a committed fixture public key and pre-signed fixture ledgers; the real gate refuses any key under `scripts/fixtures/` |
| **A2-4** `resolveIcpAuthored` denylist had gaps | It missed `lib/b2b/**`, `lib/nicheCandidates.ts`, `lib/llms.ts` and other runtime files, and `icpRegistry.ts` calls the resolver internally (lines 538, 745, 786, 796) | §2.5: an allowlist (the defining file, `scripts/**`, test files), internal call sites named, and no runtime caller may pass `env` |
| **A2.1** (Amendment 2.1, same day) | The computed digest tree (A2-2) reached two publication-state files: `lib/b2b/icpPublication.ts` (value-imported at `lib/b2b/icpRegistry.ts:59`; §2.4 declares `ICP_REBUILD_WAVE` there) and `lib/industries/financialServicesOwner.ts` (through `resolveIndustriesPath`). P and F would have moved every page's digest and failed their own gate, because P touches no ledger entry and F adds none | §2.2: both excluded, with a gate that they export no rendered string and hide no renderable import; §12 T4 gains P-shaped and F-shaped cases; §0.1 C0 records Owen's two review notes |
| Smaller | §4.7 said llms reads `resolveIndustriesPath`, §2.5 said `publishedIndustriesRoutes()`; `--industry` mode crashed on a broken register; GHL/Upstash removal and Cal.com; T9 and T10 baselines; no form on industry pages; a local build route for C1 | §4.7; §3 intro; header "Depends on"; §12 T9, T10, T24; §0.1 C1 |

## Precedence

The CLAUDE.md authority block outranks Nadia's spec, which outranks ADR-0008 where they differ. The
operator's 2026-10-08 decisions supersede four things in Nadia's spec, and this ADR follows the
operator in each:

| Nadia's spec | Operator, 2026-10-08 | This ADR |
|---|---|---|
| D3: one industry per wave, 90-day rule per branch | All 21 and 341 publish together once every page passes §7 | One publication commit for levels 1 and 2 (§2.4) |
| D5: a stored Scriblr panel is required to publish an L2 page | No stored run required; with none, the observation section is omitted entirely | No observation requirement; omission rule in §4.1 |
| §3.2: visible "Reviewed by <name>" line on every page | Prabal is the reviewer, held in data, not printed | No visible line. Also omitted from JSON-LD (my reading, operator decision O3) |
| D1: financial-services option B "after GSC is pulled" | Same, gated on a flag so code lands first | A typed, committed flag with an evidence record (§2.5) |

Everything else in Nadia's spec stands and is cited by section rather than restated.

## Decision, in one sentence each

1. **Body schema.** Levels 1 and 2 get two new body types (`IcpIndustryBodyV2`, `IcpSubIndustryBodyV2`) in which three entity-specific facts from primary sources are a tuple arity, every fact carries URL, access date, confidence, source class and a verbatim excerpt, and levels 3 and 4 keep their current type unchanged.
2. **Storage.** One file per page in one directory per industry, registered by one barrel per industry, with each page's sign-off recorded in a per-page ledger entry that carries an Ed25519 signature by Prabal's key over the hash of the body he read and the template it rendered in (Amendment 1, F3).
3. **Publication.** The ceiling moves from 8 to **367** (not 370; see §0) in one commit that declares one named rebuild wave and sets the counts, the ceiling and the sitemap total, or to 350 and then 367 if the financial-services flag has not flipped. Signatures land earlier, in their own commits, and publish nothing on their own (Amendment 1).
4. **Gates.** Uniqueness is measured twice on 5-word shingles, at least 40% unique against the nearest page (CLAUDE.md §7's wording) and at least 40% found on no other page at all (Amendment 1, F5a): on the authored body before the build and on the served `<main>` text after it, and the served measures are binding.
5. **Rendering.** The observation band renders only for an `observed` run; the legacy hub grid comes off; one resolver function decides ownership of every `/industries/*` path for HTML, metadata, params, sitemap and agent markdown alike, and **in production it never returns an unpublished ICP page** (Amendment 1, F1).
6. **Build.** All 362 level-1 and level-2 pages render per request, because the root layout reads request headers for the consent region; this is accepted, not worked around (Amendment 2, A2-1, which replaces "fully static"). `dynamicParams = true` stays because ADR-0010's preview resolver needs it, and every build runs the served check twice, once forced to production and once as preview (Amendment 1, F2).

## Tenancy

Re-derived on 2026-10-08, not inherited. `package.json` carries none of `next-auth`, `@auth/*`,
`@clerk/*`, `@supabase/*`, `lucia`, `passport`, `jsonwebtoken`, `iron-session`. There is no
`middleware.ts`; `proxy.ts` sets a locale header, the agent `Link` header and preview `X-Robots-Tag`,
and rewrites `Accept: text/markdown` requests to `/agent-markdown`. A grep for
`tenantId|organizationId|workspaceId|getServerSession` across `lib app components` returns two
files, and both hits are comments asserting the absence (`lib/b2b/observationStore.ts:17`,
`app/api/audit/route.ts:47`). **Single-tenant public marketing site.** Every change here reads
committed data at build time. No query, endpoint or cache key is scoped to a customer. The agent
markdown route is request-time (`dynamic = 'force-dynamic'`) and reads only the request path, which
it must treat as untrusted (§4.4).

---

## 0. Verified state, and one correction to the brief

| Fact | Value | How |
|---|---|---|
| ICP pages published | 8: 1 industry, 2 sub-industries, 3 niches, 2 sub-niches, all TIC | `lib/b2b/icpPublication.ts` `ICP_PUBLISHED` |
| `ICP_PUBLISHED_CEILING` | 8 | `scripts/check-icp.cjs:41` |
| Sitemap total | 4,434 | `scripts/check-industry-gate.cjs:101` |
| Industries / sub-industries in taxonomy | 21 / 341 | walked `icp-taxonomy.json` |
| Sub-industries under `financial-services` (04) | 16 | walked |
| Sub-industries under TIC (19) | 16, of which 2 are published | walked |
| Industry names carrying the literal ` (B2B)` | 10 of 21 | walked |
| Em dashes in industry or sub-industry `name` | 0 | walked |
| Stored observation runs | 0 | `data/b2b/observations/index.ts:56` `OBSERVATION_RUNS = []` |
| `dynamicParams` on the four ICP routes | `true` on all four (ADR-0010 §2). The comments in `app/industries/[industry]/page.tsx:30` and `[subIndustry]/page.tsx:27` still say `false` | read |
| TIC L1 / L2 fact counts | hub 4; environmental-testing-labs 4; real-estate-and-transaction-due-diligence 3 | `grep -c claim:` |
| TIC L1 / L2 authored words | 1,161 / 1,578 / 1,323 | measured over body strings |
| Hub links to ICP pages | gated on `publishedSectors.has(industry.slug)`, asserted by regex in `check-icp.cjs` R5b | read |
| ICP schema provider | inline `{ name: 'Qognition' }`, no `@id` | `lib/b2b/icpMetadata.ts` `icpSchema` |
| Legacy hub schema provider | same inline `'Qognition'`, no `@id` | `app/industries/[industry]/page.tsx` `LegacyIndustryPage` |
| Sitewide organisation | `orgRef()` = `{ '@type': 'Organization', '@id': ORG_ID, name: 'Qognition Agency', url }` | `lib/schema.ts:25` |
| `SERVICE_LINKS` | 4 entries, no PPC | `lib/b2b/graph.ts:24` |
| `/services/ppc` | resolves: `data/services.ts` id `ppc`, `SEO_OVERRIDES['/services/ppc']` | read |
| Agent markdown | `force-dynamic`, generic fallback returns HTTP 200 for any path | `app/agent-markdown/route.ts` |
| `recruitment-rpo-and-executive-search` | exists under `professional-and-business-services` | walked |
| **Added 2026-10-14 (Amendment 1)** | | |
| What `resolveIcp` rejects | `'spine'` only (`lib/b2b/icpRegistry.ts:251`). A `'draft'` state is returned to the route files, which render it with `DraftNotice` in any environment | read |
| What makes a path `'draft'` today | membership of `ICP_DRAFTS` (`lib/b2b/icpPublication.ts:141`), which is empty | read |
| Preview resolver order in the route files | `previewCandidate()` is called before `resolveIcp()` (`[industry]/page.tsx:107-110`, `[subIndustry]/page.tsx:98-101`), so on preview a registered draft would render as a catalogue candidate, not through the real template | read |
| `isPreviewDeployment()` | `VERCEL_ENV === 'production'` forces false; otherwise `VERCEL_ENV === 'preview'` or `QOGNITION_PREVIEW_MODE === '1'` | `lib/deploymentMode.ts` |
| Preview robots header | `X-Robots-Tag: noindex, nofollow, noarchive`, set in `proxy.ts` when `isPreviewDeployment()` | read |
| Wave-size gate R4d | `ICP_PUBLISHED_COHORTS.length <= 2 \|\| ICP_PUBLISHED_CEILING > 25`, true for any cohort count once the ceiling passes 25 | `scripts/check-icp.cjs:375-376` |
| Uniqueness normaliser | lowercases, substitutes the page's own raw name, THEN strips punctuation; walks hand-picked V1 fields | `scripts/check-icp.cjs:714-729` |
| Breadcrumb | `<nav aria-label="Breadcrumb">` rendered by `IcpHero`, inside `<main>` | `components/b2b/IcpBlocks.tsx:84-86, 575` |
| Inline `'Qognition'` provider on legacy pages | 11 hubs (`[industry]/page.tsx`) **and** 66 sub-pages (`[subIndustry]/page.tsx:165`), 77 in all | read |
| Spine ids that equal ICP slugs under `financial-services` | `payments`, `crypto-web3-b2b` (`data/b2b/verticals.ts:152, 155`), both `spine` (no `publication`), both unroutable today because `routableState(undefined)` is `undefined` (`lib/b2b/registry.ts:43-47, 147-148`) | read and walked |
| `industryDisplayName` | exists at `data/b2b/icp/industryVisuals.ts:59`, strips exactly ` (B2B)` (Ruth, 2026-10-07, for the homepage cards); not applied in `titleFor` or `IcpHero`, which use the raw `name` | read |
| Parenthetical suffixes in L1/L2 names | L1: ` (B2B)` x10, ` (TIC)`, ` (B2G-adjacent)`, ` (B2B side)`. L2: ` (B2B)` x3, ` (institutional)`, ` (Production Animals)`, ` (B2B side)`, ` (RaaS)`, ` (non-food)`. Full list in §4.5 | walked |
| Redirect table | `next.config.mjs` `redirects()`, 58 `source:` entries, none beginning `/industries` | grep |
| Ed25519 with an encrypted PKCS#8 key in plain Node | `generateKeyPairSync('ed25519', { privateKeyEncoding: { type: 'pkcs8', format: 'pem', cipher, passphrase } })`, `createPrivateKey({ key, passphrase })`, `sign(null, …)`, `verify(null, …)`. Loading without the passphrase throws | executed on Node v25.2.1, scratch directory, 2026-10-14 |
| **Added 2026-10-14 (Amendment 2)** | | |
| Root layout | `app/layout.tsx:102` `await headers()`; `:108` `regionDefault = !preview && consentDefaultFor(requestHeaders.get('x-vercel-ip-country'))` | read at `f077cce` |
| Route rendering at `f077cce` | as committed: 17 static, 1 SSG, 71 dynamic, every page route dynamic including `/industries` and all four ICP levels. With line 102 changed alone: 48 static, 29 SSG, 12 dynamic | **measured by Owen**, two builds of `f077cce`, 2026-10-14; not re-run by me |
| Text sources outside `components/b2b` and `lib/b2b` | `PROOF_LINE_B2B`, `PROOF_LINE_INSURANCE` from `data/servicePages.ts` (`IcpBlocks.tsx:11`); `../visual/IconTile`, `ProgrammeCard`, `TintedImage` (`IcpBlocks.tsx`); `lib/seo`, `lib/schema` (`lib/b2b/icpMetadata.ts`); `data/case-studies` (proof) | `grep` of imports |
| Runtime callers of the ICP resolver | `lib/b2b/icpRegistry.ts:538, 745, 786, 796` (internal); `lib/b2b/icpMetadata.ts:69`; `lib/llms.ts:92`; `lib/b2b/observationStore.ts:321` (injected as `deps.resolveIcp`); the four ICP route files and `app/industries/page.tsx` | `grep` |
| llms files | `app/llms.txt/route.ts` and `app/llms-full.txt/route.ts` call `buildLlmsTxt` / `buildLlmsFullTxt` in `lib/llms.ts` | read |
| Import aliases | `tsconfig.json` has no `paths`; project imports are relative | read |
| Ed25519 determinism | the same key and message give the same signature (RFC 8032), confirmed in Node | executed, scratch, 2026-10-14 |
| Forms on industry pages today | no `<form>` and no `LeadForm` under `components/b2b` or `app/industries` | `grep` |

**Correction: the ceiling target is 367, not 370.** 8 + 362 double-counts the three TIC pages already
published at levels 1 and 2. New pages are 20 industries + 339 sub-industries = **359**. Final
ceiling = 8 + 359 = **367** (21 + 341 + 3 niches + 2 sub-niches). If financial-services has not
flipped, the publication commit cannot include industry 04 or its 16 sub-industries (§2.5), so it is
8 + 19 + 323 = **350**, and the flip commit adds 17.

**Second finding the brief did not mention.** Two of the three already-published TIC pages at levels
1 and 2 fail the new contract today: both sub-industry pages carry fewer than 5 facts, and none of the
three carries the new required fields. They are migrated, re-checked and re-signed in this programme
(§1.6). They are not grandfathered, because a published page below the bar is the thing §7 exists to
stop.

### 0.1 Build order (Amendment 1, F1)

The order is part of the contract. A commit out of this order is a FIX at review regardless of its
content, because the first two exist to make every later commit safe to land.

| # | Commit | Owner | Must be true before it lands |
|---|---|---|---|
| **C0** | **Production resolver rule and its tests.** `resolveIcp` becomes the production-safe wrapper (§2.5); the unrestricted resolver is renamed `resolveIcpAuthored` and is importable only by gates and tests; the rule applies to today's three states (published, draft, spine); the ledger-and-wave rule of §2.3 arrives in C3, behind the same function. All 8 TIC pages resolve exactly as today. Tests T1 (in-process half), T16 and T17 (§12) land in this commit, each with its seeded failing fixture. Route-file comments that still say `dynamicParams` is `false` are corrected. **Owen's C0 review notes (Amendment 2.1):** (1) **memoise `resolveIcpAuthored`, not `resolveIcp`**, and apply the environment rule after the cache, on every call; a memoised `resolveIcp` would cache one environment's answer, which in-process tests that force production after a preview-mode call would then read back; (2) **the `env`-argument scan (§2.5) must catch indirect calls**: a spread argument (`resolveIcp(...args)`), and `.call` or `.apply` with two or more arguments, on `resolveIcp` and `resolveIndustriesPath`, outside `scripts/**` and test files. It is an AST scan, not a regex over call text | Luke | nothing. **This is the first commit of the programme** |
| **C1** | **Two-pass served check** (§3.5) and its tests T1 (served half), T2, T18, T24, T25. **Local build route (Amendment 2):** Owen built successfully from a git worktree under `/private/tmp` with `pnpm install --offline`, which avoids the iCloud and `node_modules` problems in CLAUDE.md §6. C1 is developed and its two passes are first run that way; Vercel stays the build of record | Luke, Jonas reviews the env handling | C0 |
| C2 | V2 body types (body optional while drafting, §2.1), 21 empty registers, `bodies.ts`, drafting-mode gates (§3.2 G1), shared text walker and normaliser (§3.1), uniqueness gates, source gates (G18), copy gates (G17). Tests T6, T7 (logic), T19, T20, T23 | Luke | C0, C1 |
| C3 | Signing: `icp-keygen.mjs`, `icp-sign.mjs`, `icp-brand-check.mjs`, empty ledger, empty brand-check file, Prabal's public key, canonical-JSON fixture, `ICP_HELD` (empty), the template-tree script (§2.2). Tests T3, T4, T5 | Luke; **Prabal generates the key himself** (§2.2) | C2 |
| C4 | `resolveIndustriesPath` and every consumer (§2.5): four route files, `legacyClaimDepth`, `lib/sitemap.ts`, agent markdown (§4.4), llms.txt (§4.7). Tests T8, T9, T10 (baseline capture), T13, T15 | Luke | C3 |
| C5 | Templates: V2 rendering for levels 1 and 2 (keeping the V1 path for the three TIC bodies until C6), hub (§4.2), observation omission (§4.1), PPC link and fixed FAQs (§4.6), proof map, `data-derived` marking (§3.1), display names per O9 (§4.5). Tests T11, T12, T14, T22 | Mira, Theo, Ruth | C4, and an answer to O9. **Should be final before signing starts.** Amendment 2 allows template sign-offs before P (§2.2), so a later change costs Prabal one template re-read, not 367 page re-reads; it is still cheaper not to need one |
| C6 | TIC migration (§1.6): three bodies to V2, Ruth's brand checks, Prabal re-signs against the final C5 template; the V1 rendering path for levels 1 and 2 is removed in the same commit; the three wave-1 rows for those paths leave `ICP_PUBLISHED` **in the same commit** as their ledger entries arrive, so the 8 TIC URLs serve 200 at every commit (T17) | Iris, Ruth, Prabal; Luke wires | C5 |
| C7 to C27 | Body commits, one industry per commit, as drafts. Waves of at most three industry runs (§2.1) | Iris, Theo | C2, C5 |
| B, R | Ruth brand-check commits (B) and Prabal signing commits (R), per industry; R always after B for the same body, both after that industry's body commit | Ruth, Prabal | the body commit; a brand check before the signature |
| **P** | **Publication commit** (§2.4). Test T7 | Luke; Owen; operator approval | every L1/L2 page signed, or on `ICP_HELD` if the operator allows it (O2) |
| F | Financial-services flip, if O1 is "later" (§2.5). Test T8 | Luke; operator | P, plus the evidence record |
| L | Legacy owner links and earlier-guides blocks (§4.3). The links are read through `icpPublishedHref`, so they can land before P and appear only when their targets publish. Test T10 | Mira | C4 |
| S | Legacy schema provider fix, only on an operator yes to O4 (§4.5) | Mira | its own commit, nothing else in it |

A `body` commit that lands before C0 is the defect F1 describes: it is a registered draft, the old
`resolveIcp` would return it, and production would serve it. That is why C0 is first and not merely early.

---

## 1. Body schema

### 1.1 Which type at which level

| Level | Type | Status |
|---|---|---|
| 1 industry | `IcpIndustryBodyV2` | new, required for every published L1 |
| 2 sub-industry | `IcpSubIndustryBodyV2` | new, required for every published L2 |
| 3 niche, 4 sub-niche | `SubNicheBody & { scope? }` | **unchanged**. The 5 published TIC pages at these levels keep their current bodies and reviews |

`resolveIcp` already rejects a body of the wrong kind for its level (returns `undefined`, so 404) and
`check-icp.cjs` R9 fails loudly. That pairing is retained with the new kinds:
`'icp-industry'` at depth 1, `'icp-sub-industry'` at depth 2, `'sub-niche'` at depths 3 and 4.
A `'hub'` body at depth 1 becomes a gate failure once this lands.

### 1.2 The sourced fact

New file `data/b2b/icp/bodyV2.ts`. Interface only; Luke writes it from this.

```ts
import type { IsoDate, BuyerRole, VocabularyTerm, ComparisonAxis, Faq } from '../types';

/** Where a claim can come from. A class not on either list cannot be typed, so it cannot be cited. */
export type PrimarySourceClass =
  | 'regulator'               // an agency acting under statute: EPA, FDA, FCA, OSHA
  | 'legislation'             // the instrument itself: an Act, a Regulation, a CFR part
  | 'standards-body'          // ISO, IEC, ASTM, ANSI, CEN, SAE
  | 'accreditation-body'      // A2LA, ANAB, UKAS, IAS
  | 'government-statistics'   // BLS, Census, Eurostat, ONS, ABS, StatCan
  | 'intergovernmental'       // OECD, ILAC, IAF, WTO
  | 'trade-association'       // the sector's own association, publishing about its sector
  | 'public-registry'         // a register a buyer can query: FINRA BrokerCheck, FAA registry
  | 'peer-reviewed'           // a journal article with a DOI
  | 'company-filing';         // a statutory filing: 10-K, annual report lodged with a regulator

/** Allowed only as supporting facts, never as one of the three entity facts. */
export type SecondarySourceClass = 'trade-press' | 'news' | 'competitor-page';

export type SourceClass = PrimarySourceClass | SecondarySourceClass;

/**
 * Amendment 1, F10. The class of the page a `reported` claim was actually read on. A competitor's or
 * vendor's page is never a `via`: it is the laundering route (a vendor blog quoting a regulator
 * becomes "the regulator says"). There is no blog class, so a blog cannot be typed as a `via`; a blog
 * mislabelled `trade-press` is caught only by the host list in G18 and by review, and this comment
 * says so rather than implying the type closes it.
 */
export type ViaSourceClass = PrimarySourceClass | 'trade-press' | 'news';

type HttpsUrl = `https://${string}`;

interface SourceCore<C extends SourceClass> {
  readonly url: HttpsUrl;
  readonly publisher: string;
  readonly sourceClass: C;
  /** The day the page was opened and read. Not the day the fact was written down. */
  readonly accessedAt: IsoDate;
  /**
   * A verbatim passage, at most 50 words, copied from the page actually read (the `via` page when
   * `reported`). NEVER RENDERED. It exists so a reviewer, and an offline checker, can confirm the
   * claim against the words the researcher saw, without re-doing the research.
   */
  readonly excerpt: string;
}

/**
 * `observed`: the researcher read the primary page at `url`.
 * `reported`: the primary could not be read (HTTP 403, paywall, PDF behind a form), and the claim
 * was read at `via`. Several standards bodies return 403 to automated retrieval, so this is common
 * and honest. Collapsing it into `observed` is a claims defect (data/b2b/types.ts SourceRef).
 */
export type ObservedRef<C extends SourceClass = SourceClass> = SourceCore<C> & { readonly confidence: 'observed' };

export type ReportedRef<C extends SourceClass = SourceClass> = SourceCore<C> & {
  readonly confidence: 'reported';
  readonly via: {
    readonly url: HttpsUrl;
    readonly publisher: string;
    readonly sourceClass: ViaSourceClass;   // Amendment 1, F10
  };
};

export type SourcedRef<C extends SourceClass = SourceClass> = ObservedRef<C> | ReportedRef<C>;

export interface SourcedFact<C extends SourceClass = SourceClass> {
  /** Rendered. One claim, at most 70 words, dated where it describes a state of the world. */
  readonly claim: string;
  /**
   * The named thing the fact is about: an instrument ("Regulation (EU) 2023/1230"), a standard
   * ("ISO/IEC 17025"), a register, or a named statistic. For an entity fact this string must not
   * equal the anchor of an entity fact on the parent or on any sibling (gate G4). It is the
   * mechanical half of "entity-specific".
   */
  readonly entityAnchor: string;
  readonly source: SourcedRef<C>;
}

/** The three facts that make the page about THIS entity. Primary sources only. */
export type EntityFact = SourcedFact<PrimarySourceClass>;

/** An entity fact whose primary page the researcher read directly. */
export interface ObservedEntityFact extends SourcedFact<PrimarySourceClass> {
  readonly source: ObservedRef<PrimarySourceClass>;
}

/**
 * Amendment 1, F10. At least three entity facts, and the FIRST is observed. A page whose every
 * entity fact was read second-hand is a page about what other people say about the sector; one
 * primary page read directly is the floor. G18 repeats it at runtime, because a cast defeats a tuple.
 */
export type EntityFactSet = readonly [ObservedEntityFact, EntityFact, EntityFact, ...EntityFact[]];

type AtLeast2<T> = readonly [T, T, ...T[]];
type AtLeast3<T> = readonly [T, T, T, ...T[]];
type AtLeast6<T> = readonly [T, T, T, T, T, T, ...T[]];
```

**Excerpt rules, gated (Amendment 1, F10, G18).** The excerpt is at most 50 words. Every number in
`claim` appears in `excerpt` after both are normalised the same way (thousands separators removed,
`per cent` and `%` unified). That is what makes the excerpt checkable: a figure the researcher did
not see on the page they read cannot reach the claim. `url` and `via.url` parse with `new URL()`,
use `https:`, and have a hostname that contains a dot, is not an IP literal, and does not end in a
reserved name (`.example`, `.test`, `.invalid`, `.localhost`, `.local`). The `.example` rule matters
here specifically: ADR-0006's sample brands use `.example` domains, and a sample domain in a fact is a
fabricated source. **The build does not fetch any source URL.** Whether a page still says what the
excerpt says is a review question, not a build gate; an offline link check is logged for Jonas.

`data/b2b/types.ts` `SourceRef` and `Fact` are **not edited**. They stay the contract for levels 3
and 4 and for the spine. The V2 types are a parallel family, not a widening, so no existing body
changes meaning.

### 1.3 Shared fields

```ts
/** A child of this entity, rendered as a row with an authored sentence. Slug from the JSON (rule 6). */
export interface ScopeRowV2 {
  readonly slug: string;
  /** What separates this child from its siblings. One sentence, at most 35 words. Authored. */
  readonly distinguishes: string;
}

export type LayerName = 'SEO' | 'Local SEO' | 'AI SEO' | 'GEO' | 'PPC';

/** Rendered as the intro to "Pick the layer you need". Authored, so the band is not pure template. */
export interface LayerFocus {
  readonly lead: LayerName;
  /** Why this layer comes first for this buyer. At most 60 words. */
  readonly why: string;
}

/** Workflow record. NEVER RENDERED. Agent roles are not sign-off (lib/b2b/icpPublication.ts header). */
export interface BodyProvenance {
  readonly researchedBy: 'Iris (research)';
  readonly researchedAt: IsoDate;
  readonly draftedBy: 'Theo (content)' | 'Iris (research)';
  // Amendment 1, F4: `brandCheck` is REMOVED from the body. See §2.2 "Ruth's verdict".
}

interface BodyV2Common {
  readonly schemaVersion: 2;
  /** <= 160 characters. Never contains a Family B string. */
  readonly metaDescription: string;
  /** Answer-first, <= 60 words, answers the page's Family Q target, no pronoun that needs the H1. */
  readonly opener: string;
  /** "Why firms like yours get left out". One specific failure mechanism. 80 to 250 words. */
  readonly whyFirmsGetLeftOut: string;
  /** The CLIENT's buyer. Never `buyer_titles`, which is OUR buyer and renders in the hero. */
  readonly buyers: AtLeast3<BuyerRole>;
  readonly layerFocus: LayerFocus;
  readonly entityFacts: EntityFactSet;   // Amendment 1: was AtLeast3<EntityFact>; the first is observed
  /** Page-specific FAQs only. Guarantee, pricing and paid-search FAQs are template (§4.6). 40 to 150 words per answer. */
  readonly faqs: AtLeast3<Faq>;
  /** The qualifying question on the closing CTA. */
  readonly snapshotQuestion: string;
  /** Every [NEEDS DATA: ...] the researcher could not close. NEVER RENDERED. Carried up by MARS. */
  readonly researchGaps: readonly string[];
  readonly provenance: BodyProvenance;
}
```

### 1.4 Level 1, industry

```ts
export interface IcpIndustryBodyV2 extends BodyV2Common {
  readonly kind: 'icp-industry';
  /** Two Family Q prompts: questions OUR buyer asks about their own visibility. `primary` is the H1 question. */
  readonly familyQ: { readonly primary: string; readonly secondary: string };
  /** The hub card sentence: who buys and what they check first. At most 20 words. */
  readonly cardLine: string;
  /** "Sectors in <industry>". Exactly one row per sub-industry in the taxonomy, any order. */
  readonly sectors: AtLeast3<ScopeRowV2>;
  /** Optional. Shared or context facts, including secondary classes. Target total facts: 5. */
  readonly supportingFacts: readonly SourcedFact[];
}
```

No vocabulary and no comparison axes at level 1, by type, for the reason `IcpIndustryPage.tsx`
already records: an industry spans buyers whose standards do not interchange.

### 1.5 Level 2, sub-industry

```ts
export interface IcpSubIndustryBodyV2 extends BodyV2Common {
  readonly kind: 'icp-sub-industry';
  /**
   * Three Family Q shapes (Nadia §3.1). `target` picks the one that becomes the H1 question and the
   * opener's question. All three join the tracked prompt set on the day the page publishes.
   */
  readonly familyQ: {
    readonly absence: string;   // "Why doesn't ChatGPT name our firm when ... ?"
    readonly method: string;    // "How do firms like ours get cited when buyers ask ... ?"
    readonly channel: string;   // "Where do buyers of ... look before they shortlist?"
    readonly target: 'absence' | 'method';
  };
  /** One sentence, <= 40 words, rewritten from `geo_angle`. Never verbatim (gate G9). */
  readonly whatWeCheckFor: string;
  readonly comparisonAxes: AtLeast3<ComparisonAxis>;
  /** >= 6 terms, >= 3 of them absent from the parent industry body (gate G7). */
  readonly vocabulary: AtLeast6<VocabularyTerm>;
  /** "Sectors in <sub-industry>". Exactly one row per niche in the taxonomy. Anchored `#<niche-slug>`. */
  readonly scope: readonly ScopeRowV2[];
  /** At least 2, so total facts >= 5 at compile time (Nadia §3.3). Any class. */
  readonly supportingFacts: AtLeast2<SourcedFact>;
}
```

`buyerQuestion` and `proof` are **removed** from the V2 types on purpose:

- `buyerQuestion` was a fourth string that could drift from the Family Q set. It is now derived:
  `familyQ.primary` at L1, `familyQ[familyQ.target]` at L2.
- `proof` let an author choose a client programme. That choice moves to a frozen, gated map,
  `ICP_PROOF_BY_PATH` in `data/case-studies/icpProof.ts`, with Nadia's §1.6 entries as the proposal.
  A research agent never decides which client is proof for which buyer.

### 1.6 Required counts, all levels 1 and 2

Compile-time rows cannot be suppressed except by a cast, and the runtime gate repeats them because a
cast is exactly what a hurried harness writes (R4b's lesson).

| Field | L1 | L2 | Enforced by |
|---|---|---|---|
| Entity facts, primary sources only | >= 3 | >= 3 | tuple arity + G3, G4 |
| Entity facts read directly (`observed`) | >= 1 | >= 1 | tuple position + G18 (Amendment 1) |
| Total facts | >= 3 (target 5) | >= 5 | tuple arity |
| Buyer roles | >= 3 | >= 3, set not identical to any other page's | arity + G6 |
| FAQs (page-specific) | >= 3 | >= 3 | arity |
| Comparison axes | none | >= 3 | arity |
| Vocabulary terms | none | >= 6, >= 3 not in the parent body, none on > 25% of vocabulary-bearing bodies | arity + G7 |
| Scope rows | one per sub-industry, exactly | one per niche, exactly | G8 |
| Family Q prompts | 2 | 3 | type |
| Authored prose | >= 600 words | >= 900 words | G5 |
| Opener | <= 60 words | <= 60 words | existing R10b |
| Meta description | <= 160 chars | <= 160 chars | existing R10b |
| `cardLine` | <= 20 words | n/a | G5 |
| `whatWeCheckFor` | n/a | <= 40 words | G5, G9 |
| `researchGaps` | any, not rendered | any, not rendered | G10 |

"Authored prose" is the output of the one shared walker in §3.1 (Amendment 1, F5d), which is also
what U1, U2 and U2b read. It walks every string in the body that renders inside `<main>` and skips
the keys on one exclusion list. **Superseded wording:** this paragraph used to exclude publishers and
dates while U1 walked a different hand-picked set. Publishers and access dates do render inside
`<main>` (`FactsBlock`, §4.6), so they are now counted; they are a few words per fact and not worth a
second rule.

**TIC migration.** `tic-hub.ts`, `tic-environmental-testing-labs.ts` and
`tic-transaction-due-diligence.ts` are rewritten to V2 by Iris, moved into the TIC directory (§2.1)
with `git mv` so history follows, and re-signed. Their existing `facts` that cite a primary source
become `entityFacts` where their anchors are unique; the First Page Sage fact on the hub becomes a
`supportingFacts` entry with class `competitor-page`. Each of the three needs one entity fact whose
primary page Iris opens and reads directly in the migration (Amendment 1); a TIC fact recorded as
`reported` cannot fill the first slot. Their guarantee and cost FAQs are deleted from
the bodies because the template now carries them (§4.6). The five TIC pages at levels 3 and 4 do not
change.

---

## 2. Storage, registration and publication

### 2.1 Layout: one file per page, one directory per industry

```
data/b2b/icp/
  bodyV2.ts                                   types from §1 (new)
  bodies.ts                                   ICP_BODIES, now built from 21 registers + the 5 TIC L3/L4 files
  authored/
    tic-environmental-analytical-labs.ts      unchanged (L3)
    tic-pfas-labs.ts                          unchanged (L3)
    tic-pfas-drinking-water.ts                unchanged (L4)
    tic-pfas-wastewater.ts                    unchanged (L4)
    tic-phase-i-and-ii-esa.ts                 unchanged (L3)
    <industry-slug>/                          21 directories
      _industry.ts                            the L1 body
      <sub-industry-slug>.ts                  one L2 body per sub-industry, 13 to 21 files
      _register.ts                            this industry's registration, and nothing else
```

Why one file per page and not one per industry: each industry run owns one directory, so no two
agents ever write the same file; Ruth's verdict, Owen's diff and Prabal's signature are each per page,
and a per-page file makes each of them a per-file diff; and a revert of one page is a one-file revert.
The leading underscore cannot collide with a slug, because the taxonomy slug pattern is
`^[a-z0-9]+(?:-[a-z0-9]+)*$` (asserted by `check-icp.cjs`).

**Runs go in waves, not all at once (Amendment 1).** This ADR previously said "21 research runs work
in parallel". AGENTS.md sets the runtime limit at the parent plus three specialists and says to run
the rest in successive waves. So: **at most three industry runs at a time, in the shared checkout, one
directory each.** Not one worktree per run, deliberately: the uniqueness gates (§3.1) compare a page
against every other registered page, so a run in an isolated worktree would self-check against a
tree that does not contain the industries finished since it branched, and pass a page the merged
tree fails. Twenty-one industry runs (TIC's run writes its 14 unbuilt sub-industries as well as the C6
migration), so seven waves of three. MARS orders them.

`_register.ts` shape (Amendment 1, F6: both members optional while drafting):

```ts
import type { IcpIndustryBodyV2, IcpSubIndustryBodyV2 } from '../../bodyV2';
export interface IndustryRegister {
  readonly industry: string;                                   // the industry slug, from the JSON; equals the directory name (G1)
  /** Optional so an empty register compiles. Required at runtime once ICP_REBUILD_WAVE is declared (G1). */
  readonly body?: IcpIndustryBodyV2;
  /** Keyed by sub-industry slug. Partial while drafting; complete at runtime once the wave is declared. */
  readonly subIndustries: Readonly<Partial<Record<string, IcpSubIndustryBodyV2>>>;
}
export declare const REGISTER: IndustryRegister;
```

The type stays optional after publication. Tightening it to required would make the publication commit
touch 21 registers and a type file, which §2.4 forbids; the runtime check in G1 is the guarantee.

`bodies.ts` imports exactly 21 registers by explicit path (21 import lines, written once by Luke with
empty registers, which now compile and fail nothing until bodies arrive) and flattens them into
`ICP_BODIES` keyed `<industry>` and `<industry>/<sub-industry>`.

**Registration is not publication.** A registered body is a draft until it is signed **and** the
rebuild wave is declared (§2.3). Drafts render through the real template only on preview deployments
(ADR-0010 environment table), with `DraftNotice` and `noindex`, so Prabal reviews the page as it will
ship. **In production a draft path 404s, and that is enforced in `resolveIcp` itself (§2.5), not left
to the route files** (Amendment 1, F1). This replaces `ICP_DRAFTS` for levels 1 and 2: a hand list of
359 drafts adds a diff and gates nothing that "registered and unpublished" does not already define.

**Registered means complete.** Every registered body must pass every pre-build body gate, drafts
included. Work in progress is not committed: an agent returns a complete file or a gap report (§10).
What is allowed while drafting is a missing body, never a partial one.

### 2.2 The review ledger: a signature bound to the content

The 2026-09-29 incident (`check-icp.cjs` R4b) showed that a name in a literal is attribution, not
review. At 359 pages one shared `REVIEW` constant would repeat it at scale.

**Amendment 1, F3.** The original design stored only a sha256 of the body. Owen is right that this
proves nothing about Prabal: anyone, including any agent, can compute it and write the entry. A
hash proves the words did not change after the entry was written; it does not prove who wrote the
entry. The ledger entry now carries an **Ed25519 signature made with a key only Prabal holds**.

```ts
// lib/b2b/icpReviewLedger.ts, written only by scripts/icp-sign.mjs, committed in signing commits
export type Sha256 = `sha256-${string}`;     // lowercase hex
export type UtcTimestamp = `${IsoDate}T${string}Z`; // seconds precision, UTC

export interface IcpLedgerEntry {
  readonly path: string;                     // '<industry>' or '<industry>/<sub-industry>'
  readonly reviewedBy: IcpSignOff;           // 'Prabal (CEO, Qognition Agency)', the existing literal type
  /** The moment this page was confirmed in icp-sign.mjs. One per page, never one per batch. */
  readonly signedAt: UtcTimestamp;
  /** sha256 of the canonical JSON of the body as reviewed. */
  readonly bodyHash: Sha256;
  /** sha256 over the template files the page rendered through on the preview he read (below). */
  readonly templateDigest: Sha256;
  /** First 16 hex characters of sha256 over the public key's SPKI DER. Names which committed key verifies this entry. */
  readonly keyId: string;
  /** base64 Ed25519 signature over canonicalJson({ path, reviewedBy, signedAt, bodyHash, templateDigest, keyId }). */
  readonly signature: `ed25519-${string}`;
}
export declare const ICP_REVIEW_LEDGER: readonly IcpLedgerEntry[];
```

`reviewedAt`, where ADR-0008's `IcpReview` needs it, is the date part of `signedAt`. It is derived,
never stored twice.

**The signed payload names its own path**, so an entry cannot be copied from one page to another,
and names the template digest, so an entry cannot be moved onto a template he never saw. A changed
`signedAt` breaks the signature, so the timestamps that make §8 item 3 measurable cannot be edited
into a plausible pace after the fact.

**Keys.**

- `scripts/icp-keygen.mjs` runs on Prabal's machine, **by Prabal**. It calls Node's
  `crypto.generateKeyPairSync('ed25519', …)` with the private key encoded `pkcs8`/`pem` and encrypted
  with `aes-256-cbc` under a passphrase he types (no echo). It writes the encrypted private key to a
  path he chooses **outside the repository** and prints the public key. Nothing else is supported:
  no key in an environment variable, no key in `~/qognition-ops`, no passphrase in a file.
- The public key is committed at `data/b2b/icp/signing/prabal-<keyId>.pub.pem` in C3. Owen reviews
  that commit against Prabal in person or on a call: a public key committed by someone other than its
  holder is the one substitution the signature cannot detect, so this step is human.
- Verification is plain Node: `crypto.verify(null, payload, publicKey, signature)`. No dependency.
  (Verified on Node v25.2.1 on 2026-10-14, §0.)
- The gate fails if any tracked file contains a `PRIVATE KEY-----` PEM header. **No exception for fixtures** (Amendment 2): tests generate keys in memory (§12 T3). The gate also refuses, for the real ledger, any `keyId` whose public key lives under `scripts/fixtures/`.
- **Rotation or loss:** a new key file plus an ADR amendment. Entries keep verifying against the key
  their `keyId` names. A compromised key goes on a committed `REVOKED_KEY_IDS` list, and every entry
  signed by it fails until re-signed. That is a full re-read, which is the correct cost of a lost key.

**What this still cannot stop, said plainly.** Anyone holding both the key file and its passphrase
can sign. The control is that only Prabal holds them, which is a custody fact, not a code fact.
`icp-sign.mjs` requires an interactive terminal (`process.stdin.isTTY`) and the passphrase on each
run, so an agent shell cannot sign by accident, but a determined person at Prabal's keyboard could.

**Canonical JSON.** Keys sorted at every depth; `researchGaps` and `provenance` removed (neither is
rendered); strings NFC-normalised; UTF-8; no insignificant whitespace; numbers as JavaScript
`JSON.stringify` writes them. Specified once in `scripts/lib/icp-canonical.cjs` and imported by the
signer, the brand-check writer and the gate, so they cannot disagree. A committed fixture
(`scripts/fixtures/icp/canonical.json` plus its expected bytes and hash) pins it, and all three
import paths are tested against the same fixture (T4).

**The template digest (rewritten in Amendment 2, A2-2).** Amendment 1 hashed a hand-written file
list limited to `components/b2b` and `lib/b2b`. Owen showed the ICP pages render text from outside
it: the proof lines in `data/servicePages.ts`, the case studies, `components/visual/*`, `lib/seo.ts`
and `lib/schema.ts`. A hand list will always lag the imports, so the digest is now **computed**:

- **Roots:** the two L1/L2 route files (`app/industries/[industry]/page.tsx`,
  `app/industries/[industry]/[subIndustry]/page.tsx`) and the two page components
  (`components/b2b/IcpIndustryPage.tsx`, `IcpSubIndustryPage.tsx`).
- **Walk:** every static `import` and `export … from` of a project file, transitively, resolved as
  relative paths (`tsconfig.json` declares no `paths`, so there are no aliases to resolve; if one is
  added, `scripts/lib/icp-template-tree.cjs` must resolve it in the same commit, and a gate fails on an
  unresolved project import). Type-only imports are included: a type change can change what renders.
- **Excluded:** `node_modules`, every stylesheet (`*.css`, `*.module.css`), and the files whose content
  is already bound per page or is the signature itself: `data/b2b/icp/authored/**`,
  `data/b2b/icp/bodies.ts`, the review ledger, `brandChecks.ts`, `held.ts` and `data/b2b/icp/signing/**`.
  **Amendment 2.1:** also `lib/b2b/icpPublication.ts` and `lib/industries/financialServicesOwner.ts`,
  for the same reason as `held.ts`: they hold publication state, not template. The publication commit
  (P) edits the first to declare `ICP_REBUILD_WAVE`, and the flip (F) edits the second; if either were
  in the tree, P and F would move every page's digest, and P, which touches no ledger entry and adds no
  template sign-off, would fail its own gate. Whether a page is published is decided by §2.3, not by
  what Prabal read, so it has no place in a digest of what he read.
  Excluded files are neither hashed nor walked further. Without the first two exclusions every body
  commit would change every other page's template digest.
  The observation store's run data is excluded too: an observed run is a separate render condition
  (§4.1) and its own review question.
- **What keeps the publication-state exclusion honest (Amendment 2.1).** Excluding a file from the
  digest is only safe if nothing a reader sees comes from it. So a pre-build gate asserts, for
  `icpPublication.ts` and `financialServicesOwner.ts`: (1) **exports have a closed shape**: types,
  functions, path collections (`ICP_PUBLISHED`, `ICP_PUBLISHED_COHORTS`, `ICP_DRAFTS` while it exists,
  `TIC_WAVE_1_LEDGER_PATHS`), `ICP_REBUILD_WAVE` and `FINANCIAL_SERVICES_OWNER`, and nothing else; a new
  export fails until this list is amended; (2) **their value imports are limited** to other excluded
  files and `lib/deploymentMode.ts` (today `icpPublication.ts` has one import, and it is type-only:
  `IsoDate` from `data/b2b/types`), so no renderable module can enter the tree only through them and
  drop out with them; (3) **no non-path string they export reaches a page**: the served check (both
  passes) asserts that none of `ICP_REBUILD_WAVE.id`, `ICP_REBUILD_WAVE.authority`, the
  `FINANCIAL_SERVICES_OWNER` evidence fields, the `IcpSignOff` literal, or any `ICP_HELD` reason
  appears in served `<main>`, `<head>`, JSON-LD or the RSC payload (the reviewer literal is G16
  already). Path strings are not checked as text: a slug normalised to words equals the page's own
  name and would match on every page.
- **Digest:** sha256 over `<repo-relative path>\n<sha256 of contents>\n` for every file in the tree,
  sorted by path. `scripts/lib/icp-template-tree.cjs` also writes the per-file list, so a template
  sign-off can show exactly which files changed.

A template change after signing must not force 367 re-reads, and must not pass silently either. So:
`ICP_TEMPLATE_SIGNOFFS` (same file, same key) holds entries `{ fromDigest, toDigest, changedFiles,
signedAt, keyId, signature }`, each made by Prabal after reading the change on a preview, with
`changedFiles` (from the per-file list) inside the signed payload. **The gate requires every
ledger entry's `templateDigest` to reach the current digest through a chain of template sign-offs.**

**The chain is allowed before P (Amendment 2).** Amendment 1 required it to be empty before
publication. With the computed tree covering `data/case-studies` and `data/servicePages.ts`, an
unrelated edit there, which happens most weeks, would then invalidate every signature made so far.
The chain records each such change and that Prabal looked at it, which is the control; an empty chain
was a stronger promise than the work can keep. The cost is that a page signed early was read in an
older template, and the chain is the honest record of how much older.

**Ruth's verdict, tied to what she read (Amendment 1, F4).** `provenance.brandCheck` is removed from
the body (§1.3). Two reasons, and the second is why I went further than Owen's wording, which kept it
in the body with a hash added. First, `provenance` is excluded from the body hash, so a verdict inside
it was never bound to anything. Second, the body files are inside every research agent's write scope
(§10); a verdict a research agent can type is attribution. So:

```ts
// data/b2b/icp/brandChecks.ts, written only by scripts/icp-brand-check.mjs, run in Ruth's step
export interface IcpBrandCheck {
  readonly path: string;
  readonly by: 'Ruth (brand-guard)';
  readonly at: IsoDate;
  readonly verdict: 'SHIP';            // FIX and REWRITE are not recorded here; they are returned to the author
  readonly bodyHash: Sha256;           // the canonical-JSON hash of the body Ruth read
  readonly templateDigest: Sha256;     // recorded, not matched; the template is Ruth-gated through its own files
}
export declare const ICP_BRAND_CHECKS: readonly IcpBrandCheck[];
```

- `icp-brand-check.mjs --path <p>` computes the hash of the body as it stands and writes the entry. It
  takes no hash argument, so it cannot record a hash for words other than the ones on disk.
- **The gate:** every ledger entry has a brand check with the same `path` and the same `bodyHash`, and
  `at` is on or before the date of `signedAt`. A brand check whose `bodyHash` no longer matches the
  body is stale: it is not deleted, it simply cannot cover a signature (T5).
- `icp-sign.mjs` refuses to sign a page with no matching SHIP.
- **"Only Ruth's step writes it" is procedural, and the ADR says so.** Ruth is an agent and has no key.
  What makes it hold: the file is outside the research brief's write scope (§10); G13 fails if any body
  file contains a `brandCheck` key; and each brand-check commit carries Ruth's verdict text, which Owen
  checks against the entries in it.

**Other rules, unchanged in intent.**

- **The gate recomputes every hash and verifies every signature**, published or not. A body edited
  after signing fails the build and names the page. A Ruth FIX after signing therefore means a new
  brand check and a re-sign, which is correct: the signature is on the words.
- **`scripts/icp-sign.mjs`** takes `--industry <slug>` or explicit paths. For each page in turn it
  prints the path, the preview URL, the body hash, the authored word count, the template digest and
  Ruth's verdict date, then waits for a typed `y`. `signedAt` is the moment of that keystroke. There is
  no "sign all" option, because a batch confirmation gives every page the same timestamp and §8 item 3
  stops being measurable.
- `ICP_PUBLISHED` keeps its shape (`ReadonlyMap<string, IcpReview>`). For levels 1 and 2 it is built
  from the publication rule in §2.3; for levels 3 and 4 it keeps the existing TIC wave-1 rows.
  `icpReviewFor()` returns the ledger-derived review, so `reviewedAt` is per page.
- **Dates:** the date of `signedAt` is on or after every `accessedAt` in the body and not after the
  build date, and no `accessedAt` is more than 180 days before it.
- **Reading pace, reported (§8 item 3).** `node scripts/check-icp.cjs --ledger-report` prints, per
  signing session, pages signed, authored words signed, and the median seconds between consecutive
  `signedAt` values. It is a report, not a gate: the threshold at which a pace stops being reading is
  `[NEEDS DATA: an operator-agreed reading rate]`, and I will not invent one.

### 2.3 Ceiling mechanics

`scripts/check-icp.cjs` replaces the single `ICP_PUBLISHED_CEILING` with per-level equality, so a
swap between levels cannot hide inside an unchanged total:

```js
const EXPECTED_PUBLISHED = Object.freeze({ industry: 21, 'sub-industry': 341, niche: 3, 'sub-niche': 2 });
const ICP_PUBLISHED_CEILING = 367;   // sum, asserted equal to the sum above and to ICP_PUBLISHED.size
```

**The publication rule (Amendment 1).** For a level-1 or level-2 path P, in this order:

```
published(P) =
     P is one of the three TIC wave-1 L1/L2 paths still on the wave-1 rows      (until C6 moves them)
  OR (  ledgerEntryValid(P)                // signature verifies, bodyHash and templateDigest chain hold, brand check matches
    AND (ICP_REBUILD_WAVE !== null         // declared in the publication commit, and only there
         OR P in TIC_WAVE_1_LEDGER_PATHS)  // the three TIC L1/L2 pages, already live, re-signed in C6
    AND P not in ICP_HELD
    AND ancestor(P) is published or P is level 1
    AND (P is not financial-services or a child of it, OR FINANCIAL_SERVICES_OWNER.owner === 'icp') )
```

After C6 the first line is gone and the three TIC paths need a valid ledger entry like everything
else. They were published by the 2026-09-29 wave, not this one, so `TIC_WAVE_1_LEDGER_PATHS` (exactly
those three paths, frozen by count) keeps them live before `ICP_REBUILD_WAVE` is declared. Without it,
C6 would unpublish three live pages (T17).

**The held list.** `data/b2b/icp/held.ts`, `ICP_HELD: ReadonlyMap<string, { reason: string; heldAt:
IsoDate; decidedBy: IcpSignOff }>`, committed empty in C3. It is the single-page rollback mechanism
(§9) and, if the operator allows it (O2), the way the first publication goes out without a page that
cannot meet the bar. **Holding a level-1 path holds its whole subtree**: the gate requires every
child of a held L1 to be held too, in the same commit, because a published L2 under a 404 parent
fails the ancestor chain and its up-link (§3.3).

**Two gate modes, keyed on `ICP_REBUILD_WAVE` (Amendment 1, F6).**

| | Drafting mode (`ICP_REBUILD_WAVE === null`) | Wave mode (declared) |
|---|---|---|
| Bodies | at most one body per L1/L2 path; no body for a path the JSON does not hold; kind matches depth; every present body passes every body gate | additionally: **every** L1/L2 taxonomy path not in `ICP_HELD` has a body, with the same financial-services exception |
| Ledger | every entry verifies; a signed non-TIC path is still a draft | every non-held path has a valid entry, except the financial-services family while the flag is `legacy` (O1 may leave it unsigned until the flip) |
| Set equality | not asserted | published L1/L2 set = taxonomy L1/L2 set, minus `ICP_HELD` (with subtrees), minus `financial-services` and its 16 children while the flag is `legacy` |
| Counts | `EXPECTED_PUBLISHED` equals today's 1 / 2 / 3 / 2 | `EXPECTED_PUBLISHED` equals the equality's arithmetic |

The set equality is the operator's "all of them" written as an equality, and it fails in both
directions: a missing page and an extra page are equally loud. Normally a set derived from the data
gates nothing (`lib/industryPublication.ts` header); here the taxonomy is the operator's list and the
derived side is the ledger, which is independent of it.

`publishedIcpPaths()` in `data/b2b/icp/index.ts` stops being a second hand-typed literal and derives
from `ICP_PUBLISHED`. R1 existed to make two hand-maintained 8-line lists agree. Two 367-line lists
would double the publication diff and add no check the per-level equality, the set equality and the
hash ledger do not already make. **This removes a deliberate safety mechanism, so it is named here
for Owen.**

### 2.4 The publication commit

**One commit. It touches exactly these files and no body, no ledger entry and no brand check**
(Amendment 1: the ledger entries are already committed, in the signing commits, and publish nothing
until this commit declares the wave):

| File | Change |
|---|---|
| `lib/b2b/icpPublication.ts` | `ICP_REBUILD_WAVE` from `null` to the declaration below |
| `scripts/check-icp.cjs` | `EXPECTED_PUBLISHED` to 21 / 341 / 3 / 2 and ceiling 8 to 367 (or 20 / 325 / 3 / 2 and 350), each lowered by any `ICP_HELD` subtree |
| `scripts/check-industry-gate.cjs` | sitemap total 4,434 to **4,792** (or **4,776**), lowered likewise |

```ts
export interface IcpRebuildWave {
  readonly id: '2026-10-industries-rebuild';
  readonly levels: readonly [1, 2];
  readonly authority: string;
}
/** The one exception to ADR-0008 §6.4 assertion 5, named so it cannot be reused by accident. */
export const ICP_REBUILD_WAVE: IcpRebuildWave | null = Object.freeze({
  id: '2026-10-industries-rebuild',
  levels: [1, 2] as const,
  authority: 'CLAUDE.md authority block, operator decisions 2026-10-08, Industries rebuild decisions',
});
```

Revert this one commit and every non-TIC L1/L2 page goes back to being a signed draft. The
signatures survive the revert, so re-publishing is re-declaring, not re-reading.

**R4 and R4d, rewritten (Amendment 1, F9).** Owen is right that the current R4d is vacuous at this
size: `ICP_PUBLISHED_COHORTS.length <= 2 || ICP_PUBLISHED_CEILING > 25` (`check-icp.cjs:375-376`) is
true for any number of cohorts once the ceiling passes 25, and 367 passes it. The total ceiling is the
wrong quantity; the cohort rule governs levels 3 and 4 only. So:

- **R4.** A published path at depth 1 or 2 is covered by `ICP_REBUILD_WAVE` and needs no cohort line.
  A published path at depth 3 or 4 needs a cohort in `ICP_PUBLISHED_COHORTS`.
- **R4d.** `deep = EXPECTED_PUBLISHED.niche + EXPECTED_PUBLISHED['sub-niche']`. Assert
  `ICP_PUBLISHED_COHORTS.length <= 2 || deep > 25`, and assert that every cohort's own L3/L4 page
  count is at most 25. Today `deep` is 5, so the rule binds exactly as it did at a ceiling of 8.
  Levels 1 and 2 no longer appear in the arithmetic at all.
- **R4e, new.** `ICP_REBUILD_WAVE.levels` deep-equals `[1, 2]` (the type says so; the gate repeats it
  for the cast); the source of `lib/b2b/icpPublication.ts` contains exactly one
  `ICP_REBUILD_WAVE` declaration and no other `IcpRebuildWave` value; and no published path at depth 3
  or 4 is attributed to it (T7).

**This amends ADR-0008 §6.2 and §6.4 items 2 and 5 for levels 1 and 2 only.** The 90-day rule and
the cohort unit still govern every niche and sub-niche page.

**Sitemap arithmetic, shown.** 359 new ICP paths, but `/industries/financial-services` is already in
the sitemap as the legacy hub, so the flip adds a body and not a row: 4,434 + 358 = 4,792. With the
flag at `legacy`: 4,434 + 342 = 4,776, and the flip commit then adds 16 rows (the 16 sub-industries).
The 17 FS ledger entries are already committed, signed, and held back by the flag term of the
publication rule; the flip adds none.

The commit message names Prabal as reviewer and the `signedAt` range from the ledger. Bodies land
earlier, in their own commits, as drafts; brand checks and signatures land after them, in their own
commits, still as drafts.

### 2.5 The financial-services flag

A committed constant, not an environment variable. An env var would let a Vercel setting change the
sitemap, the canonical owner of an indexed URL and the gate outcome with no diff and no reviewer, and
the gates (`node scripts/*.cjs`) cannot see Vercel's environment reliably.

```ts
// lib/industries/financialServicesOwner.ts
import type { IsoDate } from '../../data/b2b/types';
import type { IcpSignOff } from '../b2b/icpPublication';

export type FinancialServicesOwner =
  | { readonly owner: 'legacy' }
  | {
      readonly owner: 'icp';
      readonly gsc: {
        readonly pulledAt: IsoDate;
        /** Directory holding the committed part of the export (below). */
        readonly exportDir: `docs/seo/gsc/financial-services-${IsoDate}`;
        /** sha256 of the full export zip as downloaded, which is kept in ~/qognition-ops (O7). */
        readonly zipSha256: Sha256;
        readonly windowStart: IsoDate;    // Nadia G1: 16 months
        readonly windowEnd: IsoDate;
      };
      readonly decidedBy: IcpSignOff;
      readonly decidedAt: IsoDate;
    };

export const FINANCIAL_SERVICES_OWNER: FinancialServicesOwner = { owner: 'legacy' };
```

Flipping to `'icp'` without the evidence record is a compile error. It does not judge the data: the
operator already decided option B. What the record buys is a dated baseline to compare against after
the flip, which is the only way to tell later whether the swap cost traffic.

**The evidence, specified so it can be tested (Amendment 1, F11).** The source is the Search Console
Performance report for the property, exported with **Export, Download CSV**, with two filters set
before export: date range "Last 16 months", and Page, "URL is exactly"
`https://www.qognitionagency.com/industries/financial-services`. Google documents that a CSV export
is a zip with one table per tab (queries, pages, countries, devices, search appearance, dates) plus a
table listing the filters applied. `[UNVERIFIED: the exact file names in the zip. I expect Dates.csv
and Filters.csv and have not opened a real export. The parser is written against the first real
export, which is committed as the T21 fixture, not against my expectation.]`

- **Committed:** the dates table and the filters table only, in `exportDir`, byte-identical to the
  zip's members, plus a `summary.json` (total clicks, total impressions, first and last date, the
  zip's sha256). **Not committed:** the query, page, country and device tables. The query table is the
  sensitive part, and the gate needs none of it. That reconciles F11 with O7: the gate parses real
  export files, and no query data enters the repository.
- **The gate parses** the filters table and requires a page filter whose value is exactly the URL
  above, and no other page filter. It parses the dates table and requires the span from its first to
  its last date to be at least 480 days, the last date within 7 days of `pulledAt`, and `windowStart`
  and `windowEnd` to equal those dates. It recomputes nothing from the zip, which is not in the repo;
  `zipSha256` exists so the raw file in `~/qognition-ops` can be matched to the record later.
- **A short span is a finding, not a parser bug.** If the dates table omits days with no impressions,
  a URL that was quiet early in the window yields a span under 480 days. `[UNVERIFIED: whether the
  dates table emits zero-impression days.]` If it does not, the gate fails and the operator is told
  what the data shows; the threshold is not lowered to fit.
- **The 1,000-row cap.** The Search Console UI truncates each exported table to 1,000 rows. The dates
  table (about 486 rows for 16 months) and the filters table are far inside it, so the gate's inputs
  are complete. The query table may not be, and anything Nadia concludes from it (her G3 and G4) is
  stated as "top 1,000 queries by clicks", or pulled through the Search Console API's
  `searchanalytics.query` with paging, which returns many more rows per request. `[UNVERIFIED: the
  API's current per-request and per-day row limits; Google's 2020 announcement cites 50,000 rows per
  day per search type.]` URL Inspection and the Links report are captured as screenshots in
  `~/qognition-ops`, not gated.

**One ownership function, read by every consumer.** ADR-0008 §3.5 item 2 recorded the defect where
metadata and render branched on different keys for the same URL. The flag must not recreate it. So:

**The production rule for `resolveIcp` (Amendment 1, F1).** Today `resolveIcp` rejects only
`'spine'` (`lib/b2b/icpRegistry.ts:251`) and returns drafts to route files that render them in any
environment. The contract, landing in C0 before any body:

```ts
// lib/b2b/icpRegistry.ts
/**
 * Today's logic, unrestricted: any registered body of the right kind at a taxonomy path.
 * GATES AND TESTS ONLY. Allowlist, not denylist (Amendment 2): only this file, scripts/**, and test
 * files may reference it. Inside this file, only resolveIcp calls it (T1).
 */
export function resolveIcpAuthored(segments: readonly string[]): IcpRecord | undefined;

/**
 * Every runtime consumer. Returns a record only when it is published (§2.3), or when it is a draft
 * AND isPreviewDeployment(env). In production an unpublished record is `undefined`, so the route
 * calls notFound(). `env` defaults to process.env and exists so tests can force production in-process.
 */
export function resolveIcp(segments: readonly string[], env?: Record<string, string | undefined>): IcpRecord | undefined;
```

**Who may call `resolveIcpAuthored` (Amendment 2, A2-4).** Amendment 1 banned it from a list of
runtime directories. That list missed `lib/b2b/**` (where `icpRegistry.ts` itself resolves at lines
538, 745, 786 and 796 to build params, siblings, children and cross-links), `lib/nicheCandidates.ts`,
`lib/llms.ts` and any runtime file added later. So it is an **allowlist**, checked by the gate over
every tracked `.ts`, `.tsx`, `.js`, `.mjs` and `.cjs` file: the identifier may appear only in
`lib/b2b/icpRegistry.ts`, under `scripts/**`, and in test files (`scripts/test-*.cjs` and
`scripts/fixtures/**` today; a `*.test.ts` convention, if one is adopted, is added to the allowlist
in the same commit). Inside `icpRegistry.ts`, `resolveIcp` is its only caller; the four internal call
sites above call `resolveIcp`, so params, siblings, children and cross-links in production can never
name a draft. A runtime module that needs drafts is a design error to raise, not an allowlist entry.

**No runtime caller passes `env` (Amendment 2).** `resolveIcp` and `resolveIndustriesPath` take an
optional `env` so tests can force production in-process. Outside `scripts/**` and test files, the
gate fails on any call to either with a second argument, and on any reference to either passed as a
value with a two-parameter type. **Amendment 2.1:** "a call" includes a spread argument
(`resolveIcp(...args)`) and `.call` / `.apply` with two or more arguments; the scan walks the AST
(C0, Owen's note), because a regex over call text misses all three. The injected `deps.resolveIcp` in `lib/b2b/observationStore.ts:321`
is typed `(segments) => …`, one parameter. Otherwise a runtime file could pass
`{ VERCEL_ENV: 'preview' }` and recreate F1 through the side door.

The rule lives in the resolver and not in the route files, because there are four route files, three
metadata functions, a sitemap, two llms files and an agent-markdown handler, and the defect F1 found is
exactly a consumer that trusted what the resolver handed it. `icpMetadata` and `icpSchema` call
`resolveIcp`, so they inherit it. Gates that need drafts (to name them, to measure them) call
`resolveIcpAuthored`, which today's `icpNameFor` (`check-icp.cjs:704`) already needs.

```ts
// lib/industries/resolveIndustriesPath.ts
export type IndustriesRoute =
  | { readonly kind: 'legacy-hub'; readonly industryId: string }
  | { readonly kind: 'legacy-sub'; readonly industryId: string; readonly slug: string }
  | { readonly kind: 'spine'; readonly vertical: string; readonly subNiche?: string } // ROUTABLE spine only: the two noindex drafts in verticals.ts
  | { readonly kind: 'icp-published'; readonly record: PublishedIcpRecord }
  | { readonly kind: 'icp-draft'; readonly record: IcpRecord }        // constructed only when isPreviewDeployment()
  | { readonly kind: 'candidate'; readonly path: readonly string[] }  // ADR-0010 preview catalogue only
  | { readonly kind: 'not-found' };

/** An IcpRecord whose state is 'published'. Branded so a draft record cannot be passed where this is required. */
export type PublishedIcpRecord = IcpRecord & { readonly state: 'published'; readonly __published: unique symbol };

/** The only place that decides who owns an /industries path. Pure; reads committed data and isPreviewDeployment(env). */
export function resolveIndustriesPath(segments: readonly string[], env?: Record<string, string | undefined>): IndustriesRoute;

/** The sitemap and llms.txt read THIS, never resolveIndustriesPath. Its element type cannot hold a draft. */
export function publishedIndustriesRoutes(): readonly Extract<IndustriesRoute, { kind: 'icp-published' | 'legacy-hub' | 'legacy-sub' }>[];
```

**Why split the kind (Amendment 1, F8).** With one `'icp'` kind holding both, a sitemap that switched
on `kind === 'icp'` would list drafts on any build where `isPreviewDeployment()` is true, and ADR-0010
§2 says preview sitemap endpoints must not enumerate candidates or drafts. With the split, the
sitemap's and llms.txt's input type cannot contain `'icp-draft'` or `'candidate'`, so listing a draft
is a compile error rather than a review catch. T1 checks the served sitemap and llms files anyway.

**Precedence (Amendment 1 changes four lines, marked).**

1. Static routes. Next resolves `/industries/executive-search` before the dynamic segment.
2. **`financial-services` at depth 1 is `icp-published` only when the flag is `icp` AND
   `resolveIcp(['financial-services'])` returns a published record** (F7). If the flag is `icp` and
   the record is not published (no ledger entry, a held page, a broken signature), the path falls
   through to rule 3 and the legacy hub keeps serving, and the gate fails the build loudly (T8). An
   indexed URL never 404s because a flag was flipped ahead of its signature.
3. Legacy at its own depth (the 11 hubs and 66 sub-pages; the six FS sub-pages always).
4. **Spine, routable only** (amended). A `verticals.ts` entity reaches this branch only when
   `routableState()` returns `'draft'` or `'published'`. A spine id that merely exists does not shadow
   an ICP path. This is not hypothetical: `financial-services/payments` and
   `financial-services/crypto-web3-b2b` exist in both `verticals.ts` (spine, unroutable) and the ICP
   taxonomy; today they resolve to ICP or 404 only because `routableState(undefined)` is `undefined`.
   T16 pins it, so promoting either spine entry later fails the build instead of silently replacing two
   ICP pages.
5. `icp-published`.
6. **(Preview only) `icp-draft`, BEFORE candidate** (amended). The route files today call
   `previewCandidate()` before `resolveIcp()` (`[industry]/page.tsx:107-110`,
   `[subIndustry]/page.tsx:98-101`). Under this ADR that order would show Prabal and Ruth a catalogue
   candidate page at every registered draft path instead of the real template, so they would review
   and sign a page that is not the one that ships. Moving the authored draft ahead of the candidate
   fixes what they see (T18).
7. (Preview only) candidate.
8. `not-found`.

Consumers that must call it and nothing else: the four route files' `generateStaticParams`,
`generateMetadata` and default export; `legacyClaimDepth` (returns 0 for `['financial-services']`
when the flag is `icp` and the record is published, and still 2 for its six legacy children);
`industryRoutes` in `lib/sitemap.ts`, through `publishedIndustriesRoutes()` (the legacy hub row is
filtered out when rule 2 holds, so the row is emitted once, by the ICP branch, with no reliance on the
dedupe); the agent-markdown handler (§4.4); llms.txt and llms-full.txt, through
`publishedIndustriesRoutes()`.

`'financial-services'` **stays** in `lib/industryPublication.ts` `PUBLISHED_INDUSTRIES`, because
`isPublishedSubIndustry` requires the parent to be listed and the six legacy sub-pages must keep
resolving. `EXPECTED_INDUSTRIES = 11` and `EXPECTED_SUB_INDUSTRIES = 66` do not change.
`docs/repositioning/legacy-page-register.json` does not change either: `check-publication.cjs` builds
it from the frozen baseline rows, and the URL stays in the sitemap.

`check-icp.cjs` R5b and the `COLLIDING` block become flag-conditional. With `legacy`: today's
assertions, unchanged, plus: no FS path is published even if its ledger entry is valid. With `icp`:
`resolveIcp(['financial-services'])` returns a published level-1 record, **and the build fails if it
does not** (rule 2's runtime fallback to legacy is a safety net, not an accepted state); the evidence
record parses (above); the path appears in the sitemap exactly once; all six legacy FS sub-pages still
resolve and are still in the sitemap; the ICP FS page renders the "Earlier guides in this section"
block listing those six (§4.3).

**This amends ADR-0008 §3.4**: option C (legacy hub lists ICP children) is replaced by Nadia's option
B on the operator's decision.

---

## 3. Gates

Two layers. **Pre-build** (`scripts/check-icp.cjs`, part of `pnpm gates`) runs on committed data and
fails fast for authors. **Post-build** (`scripts/check-served-page.mjs`, which already starts a
`next start` server; Amendment 1 makes it two, §3.5) runs on the HTML and markdown the build actually
serves, and is binding wherever the two could disagree. `check-icp.cjs` gains `--industry <slug>` to run the pre-build body gates
on one industry's registered bodies, so a research run can self-check before handing back.
**Amendment 2:** in `--industry` mode, a register (another run's, or the run's own) that fails to
load or type-check is **reported by path and excluded**, and the run's own pages are still measured
against every register that did load; the report says which registers were excluded, so a pass
there is visibly partial. Two other runs may be mid-write (§2.1), so a crash on their half-written
file would block a run for a reason it does not own. The full gate (`pnpm gates`, every build and
every commit) stays strict: a register that does not load fails the build.

### 3.1 Uniqueness, and exactly how it is measured

**Which strings, one walker (Amendment 1, F5d).** Today U1 reads a hand-picked list of V1 fields
(`check-icp.cjs:714-722`), and nothing said what U2 or G5 read, so three gates could each measure a
different page. Now there is one function, `renderedStrings(body)` in `scripts/lib/icp-text.cjs`,
and U1, U2, U2b, U3, U4 and G5 all call it. It walks the body by key path against a **closed
classification table** in the same file: every key path is either `rendered` (it appears as text
inside `<main>`) or `excluded`. A key in neither list throws, so a new field cannot be silently
counted or silently skipped; whoever adds it classifies it. The table covers V2 and the V1
`SubNicheBody` (levels 3 and 4).

- `excluded`: `kind`, `schemaVersion`, `metaDescription` (renders in `<head>`, not `<main>`), every
  `slug`, `url`, `via.url`, `sourceClass`, `via.sourceClass`, `confidence`, `entityAnchor`,
  `excerpt`, `researchGaps`, `provenance`, `familyQ.target`.
- `rendered`: everything else, including `publisher`, `via.publisher` and `accessedAt`, which
  `FactsBlock` prints (§4.6).
- `familyQ` is the one computed entry: the target (L2) or primary (L1) question is `rendered`; the
  others are `excluded` unless the C5 template renders them, in which case C5 changes the table in the
  same commit.

**Text normalisation, specified once in `scripts/lib/icp-text.cjs` and applied identically to the
page text AND to every name before any substitution (Amendment 1, F5b).** Today's normaliser
(`check-icp.cjs:723-729`) lowercases, substitutes the raw name, and only then strips punctuation, so
"Environmental, Engineering & Testing (TIC)" is never found in a body that writes "environmental,
engineering and testing", and only the page's own name is substituted. The new order:

1. Unicode NFKC, then lowercase. HTML entities decoded first on the served side.
2. `&` becomes ` and `.
3. Every character that is not a letter or a digit becomes a space; whitespace collapses.
4. **Then** name substitution, on whole-word boundaries, longest name first, every match replaced by
   one sentinel token. The name set for page P is, for P **and each of its ancestors**: the raw
   taxonomy `name`; its display name (§4.5, including any O9 decision); the name with any trailing
   parenthetical removed; and any short form listed for that entity in
   `data/b2b/icp/shortNames.ts` (hand-written, e.g. `TIC`, `RaaS`). Short forms are listed, not
   inferred, because a rule like "the parenthetical is a short form" would turn `B2B` and
   `institutional` into sentinels and erase real words from every page.

One sentinel for self and ancestors, deliberately: a child page that copies its parent's sentences
and swaps in its own name then normalises to the same text as the parent, which is the copy U3 exists
to catch. Shingles are 5-word windows (the existing R10b unit).

| Gate | Measure | Threshold | Over |
|---|---|---|---|
| U1, pre-build, existing | Jaccard `|A∩B| / |A∪B|` | < 0.60 | every pair of registered bodies |
| **U2, pre-build** | **Nearest-page uniqueness `1 - max_Q |S(P)∩S(Q)| / |S(P)|`** | **`NEAREST_MIN` = 0.40** | every registered L1/L2 body P against every other registered body Q. The arg-max Q is "the closest sibling" and the failure message names it |
| **U2b, pre-build, new (Amendment 1, F5a)** | **Union uniqueness `1 - |S(P) ∩ ⋃_{Q≠P} S(Q)| / |S(P)|`** | **`UNION_MIN_BODY` = 0.40** | every registered L1/L2 body against all other registered bodies at every level |
| U3, pre-build | Jaccard against its own parent industry body | < 0.40 | every L2 (Nadia §3.3) |
| U4, pre-build, existing | 12-word runs appearing verbatim in more than 3 bodies | 0 | all registered bodies |
| U-floor, both layers, new | `|S(P)|` | >= 100 shingles | every page measured. Below it the gate fails with "too little text to measure", and never computes a ratio (T6) |
| **U5, post-build, binding** | U2's measure on the served text defined below | **`NEAREST_MIN` = 0.40** | every served L1/L2 page against every other served L1/L2 page |
| **U5b, post-build, binding, new (Amendment 1, F5a)** | U2b's measure on the served text | **`UNION_MIN_SERVED` = 0.40** | every served L1/L2 page against every other served ICP page |

**What each measure answers. The earlier prose here was wrong** (Amendment 1, F5a). It said
nearest-page containment measures "what share of this page appears nowhere else". It does not: it
measures what share of this page is NOT in the single most similar page. A page stitched together
from four siblings, a fifth of it from each, scores about 0.80 on that measure and passes, while
almost none of it is original. The union measure is the one that answers "what share appears nowhere
else", and it is the one that catches patchwork.

- **U2 and U5 are CLAUDE.md §7's sentence as written**: "at least 40% unique against its closest
  sibling". They stay because the operator and Owen can read them against that sentence, and because
  their failure message names the page to move away from, which is what a writer needs.
- **U2b and U5b catch patchwork.** Union uniqueness can never exceed nearest-page uniqueness (the
  union of the overlaps contains the largest single overlap). So at equal thresholds U2b failing is
  always at least as early as U2. The thresholds are **three separate constants** so they can move
  independently, and **I set them equal on purpose**: I have no measurement that justifies a different
  number, and a lower union threshold chosen without one would be an invented figure.
  `[NEEDS DATA: U5 and U5b on the three TIC L1/L2 pages on the first build after C2 (where the served U5 and U5b land), which calibrates
  whether 0.40 union is reachable with today's chrome.]` If it is not, the order of remedies is: cut
  chrome; then an ADR amendment that lowers `UNION_MIN_SERVED` only. `NEAREST_MIN` is the operator's
  number and does not move.
- U1 is kept because it catches a different failure (two long pages converging).
- Why Jaccard is not the rule: it is symmetric and diluted by a long neighbour, so a short page can be
  70% inside a long one and still score under 0.60.

**Served text, defined once (Amendment 1, F5c, F5d).** From the served HTML take `<main>`. Remove every
`<script>` element, whatever its type: JSON-LD, and the RSC payload chunks Next writes into inline
scripts, either of which would otherwise count the body twice or count data the reader never sees.
Remove `<style>`, `<template>` and `<noscript>`. Remove every element carrying `data-derived`. Decode
entities, take the text, normalise as above. Header and footer are outside `<main>` and so are out
automatically; there is no separate `nav` rule.

**`data-derived`.** Elements whose text is a taxonomy name, not authored prose, carry
`data-derived="taxonomy"`: each breadcrumb crumb name, the child names in "Sectors in ..." rows and
scope rows (the authored `distinguishes` sentence beside them is NOT marked), sub-niche plain-text
names, and the names in related-page link lists. They are shared between parent and children by
construction; counting them would fail honest pages for listing their own children. **So that it
cannot become a way to hide copy**, the served check asserts every `data-derived` element is a leaf
whose normalised text equals exactly one taxonomy name or display name. A marked element holding a
sentence fails the build (T22).

**The breadcrumb, one rule (Amendment 1, F5d).** The breadcrumb `<nav>` renders inside `<main>`
(`IcpBlocks.tsx:84-86`, from `IcpHero`). Text measures (U5, U5b, G5's served counterpart, the
"first 200 words" position) use the served text above, in which the crumb names are `data-derived`
and gone, and "All industries" stays as chrome. Link counting (§3.3) uses every `<a>` inside
`<main>` after removing scripts, so breadcrumb links **count** toward the 12 to 40 in-content links.
The up-link rule is **not** satisfied by the breadcrumb: it needs an anchor to the parent outside the
breadcrumb `<nav>`, or the rule would be true of every page by construction.

Why U5 and U5b are binding: a crawler reads the template too. If the shared chrome (layer band, fixed
FAQs, CTA, proof sentence) pushes served pages over the line, **the remedy is less chrome, never a
lower threshold**. U2 and U2b are the early warning; U5 and U5b are the rule.

Computation: an inverted index from shingle to body, so each page's overlap with every other page is
one pass over its own shingles. A naive pairwise loop over 367 bodies is roughly 67,000 set
intersections and is the first thing to make the gate slow.

### 3.2 The rest of the content gates

| # | Gate | Layer |
|---|---|---|
| G1 | **Both modes:** body kind matches depth (§1.1); **at most one** registered body per L1/L2 path; no body for a path the JSON does not hold; each `_register.ts` `industry` equals its directory name and no two registers claim one industry; every `.ts` under `authored/<industry>/` is imported by its `_register.ts`; every `_register.ts` is imported by `bodies.ts`. **Wave mode only (Amendment 1, F6):** every L1/L2 taxonomy path not in `ICP_HELD` has **exactly one** body. In drafting mode a missing body is allowed and a partial one is not (§2.1) | pre |
| G2 | **Both modes:** every ledger entry's signature verifies against the committed key its `keyId` names, its `bodyHash` equals the recomputed hash, its `templateDigest` chains to the current digest (§2.2), its dates hold (§2.2), and no key is revoked; no tracked private key. **Wave mode only:** per-level published counts and the L1/L2 set equality (§2.3); every non-held L1/L2 path has an entry; `ICP_HELD` subtrees complete | pre |
| G3 | Every `entityFacts` source class is in `PrimarySourceClass` (runtime repeat of the type) | pre |
| G4 | **Entity-specific.** For every entity fact: its `entityAnchor` (case-insensitive) differs from every entity-fact anchor on its parent and on every sibling; and its normalised `claim` has shingle containment < 0.50 against every fact claim on every other page in the family. A fact reused to make a count is caught by one or the other | pre |
| G5 | Word minimums and maximums from §1.6 | pre |
| G6 | No two L2 bodies carry an identical set of `buyers[].title` | pre |
| G7 | Vocabulary: >= 3 terms whose normalised `term` is absent from the parent L1 body text; the existing 25% cap (with its floor of 2) applied over all vocabulary-bearing bodies | pre |
| G8 | `sectors` slugs equal the industry's sub-industry slugs exactly; `scope` slugs equal the sub-industry's niche slugs exactly | pre |
| G9 | `whatWeCheckFor` shingle containment against the raw `geo_angle` < 0.50 (rewritten, not copied) | pre |
| G10 | **No placeholder.** In every rendered string (all fields except `researchGaps`, `provenance`, `excerpt`): `/\[(COPY NEEDED|NEEDS DATA|UNVERIFIED)|\bTODO\b|\bTBD\b|\bFIXME\b|lorem ipsum|\?\?\?|\{\{|Not tested yet|coming soon/i` | pre and post |
| G11 | **No em dash** (U+2014, `&mdash;`, `&#8212;`) in any body string (existing R10b), and in served `<main>` of every ICP page and `/industries` | pre and post |
| G12 | Family B (R10, extended): no `ai_prompts` or `ppc_keywords` string in `metaDescription`, any `familyQ` field, `snapshotQuestion`, FAQ questions, `cardLine`, or any served anchor text. None of the five agency head terms (`b2b marketing agency`, `b2b seo agency`, `abm agency`, `franchise marketing agency`, `franchise development marketing`) in a title, H1, meta description, `familyQ` or anchor | pre and post |
| G13 | Family Q: each prompt ends with `?`, <= 25 words, and is unique (normalised) across the family. **Brand check (Amendment 1, F4):** every ledger entry has an `ICP_BRAND_CHECKS` entry with the same path and `bodyHash`, verdict `SHIP`, dated on or before the signature; no body file contains a `brandCheck` key | pre |
| G14 | Copy rules from CLAUDE.md §10: none of "unlock", "supercharge", "leverage", "seamless", "game-changer", "in today's digital landscape"; none of "world-class", "industry-leading", "market-leading", "best-in-class", "#1", "number one" outside a fact claim. The list lives in `data/b2b/icp/copyRules.ts` and Ruth owns additions | pre |
| G15 | Existing R10b figure rule: a number in a fact claim states its sample or says the publisher gives none; a number in prose carries publisher, date and sample. Plus the CLAUDE.md §1 blocklist strings, verbatim, nowhere | pre |
| G16 | Served pages never contain "Prabal", "Reviewed by" or "reviewedBy" (operator: held in data, not printed). **Amendment 1:** checked on the whole response, not only `<main>`: visible text, JSON-LD, the RSC payload in inline scripts, `<head>`, agent markdown, llms.txt and llms-full.txt (T13) | post |
| **G17** | **Copy claims (Amendment 1).** In every `rendered` string (§3.1) and in served `<main>`: (a) **"invisible" said about the reader**: `invisible` within 8 words of `you`, `your` or `your firm`, in either order. §4 forbids stating it as fact about the reader; Ruth may clear a specific sentence by adding it to an allow list in `copyRules.ts`, never by loosening the pattern. (b) **"guarantee"** (any form) anywhere except inside the fixed-FAQ block, which the template renders inside an element marked `data-fixed-faq` and which no body can write. (c) **Implied past experience in the sector**: the phrase list in `copyRules.ts` (seed: "our clients in", "clients like you", "we have worked with", "we've worked with", "we have helped", "we've helped", "in our experience with", "firms we work with", "our work in"), Ruth owns additions. CLAUDE.md §11 forbids implying experience because a page exists. (d) **Case-study client names in bodies**: no `client` value from `data/case-studies`, published or held (49 published including the 4 named B2B, plus the 5 held), appears in any body string, normalised as §3.1. Proof renders only from `ICP_PROOF_BY_PATH` (§4.6), so a body that names a client is choosing proof, which §1.5 took away from authors | pre and post |
| **G18** | **Sources (Amendment 1, F10).** For every fact: `excerpt` is at most 50 words; every number in `claim` appears in `excerpt` (§1.2); `url` and `via.url` pass the URL rule (§1.2); `via.sourceClass` is in `ViaSourceClass`; neither `url` nor `via.url` has a host on `data/b2b/icp/excludedSourceHosts.ts` (competitors and vendors; seeded by Iris from the publishers CLAUDE.md §1 names, `[UNVERIFIED: their hostnames, which Iris confirms by opening each]`), except a `supportingFacts` entry of class `competitor-page`, whose host must be on it; `entityFacts[0].source.confidence === 'observed'` | pre |

### 3.3 Internal links, from Nadia §4

In-content links are anchors inside `<main>` after every `<script>` is removed, excluding same-page
`#fragment` links. Breadcrumb links inside `<main>` count (§3.1, one breadcrumb rule). Measured on the
served HTML (binding) and modelled from the registry before the build (R3 and R7, extended).

| Rule | Value |
|---|---|
| L1 and L2 in-content internal links | min 12, max 40 |
| `/industries` | min 30, no maximum (it is the index; Nadia §2.4) |
| Service block on every L1/L2 | exactly the five `SERVICE_LINKS` hrefs, in order, anchors exactly `SEO`, `Local SEO`, `AI SEO`, `GEO`, `PPC` |
| Up link | the parent's display name, linked, inside the first 200 words of the served text (§3.1), by an anchor **outside** the breadcrumb `<nav>` (Amendment 1) |
| Reachability (BFS over served links from `/industries`) | every L1 at depth 1; every L2 at depth 1 (finder) |
| Inbound | every L1 and L2 has >= 2 in-content links from published indexable pages |
| Targets | every in-content href returns 200 in the served build and is not `noindex`; no link to an unpublished ICP path |
| Anchor text | not exactly "click here", "learn more" or "read more"; G12 applies |
| Legacy owner links | each of the 48 mapped legacy pages renders exactly one owner link (§4.3); the 28 unmapped render none, **pending O8** (§11), which may change that to one link to `/industries` |

### 3.4 Sitemap

- `check-industry-gate.cjs`: total 4,434 to 4,792 (flag `icp`) or 4,776 (flag `legacy`), equality.
- `check-icp.cjs` R11: `icpSitemapPaths().length === ICP_PUBLISHED_CEILING`, and every published,
  non-duplicate record's href is in the real sitemap (existing). None of the five rule-7 overlaps is
  at level 1 or 2 (all are niches), so every one of the 362 is canonical and in the sitemap.
- ICP entries gain `lastmod` = the date of the ledger `signedAt` (Nadia §5.3: never the build date). The sitemap reads `publishedIndustriesRoutes()` (§2.5), whose type cannot hold a draft.
- The served check fetches every ICP `<loc>` from the rendered `industries` sitemap and asserts 200,
  not `noindex`, self-canonical. In the production pass only (§3.5): on the preview pass every page is
  `noindex` by design, so this assertion would fail there and prove nothing.

### 3.5 The served check runs twice, in named environments (Amendment 1, F2)

Owen's finding: §4.4 asserted that the HTML status equals the markdown status, in whatever
environment the build happened to run. Two surfaces agreeing on 200 for a draft is agreement, not
correctness, and a Vercel preview build runs with `VERCEL_ENV=preview`, where drafts are meant to
render. So every build runs `scripts/check-served-page.mjs` in two passes, and every assertion states
its expected status explicitly.

**Mechanics.**

- One `next build`. Then **two separate copies of the build output**, one per pass, each served by its
  own `next start` on its own port. Separate copies because a page rendered on demand under
  `dynamicParams = true` may be written to the build's cache on first request, and a draft rendered by
  the preview pass must never be what the production pass is served.
  `[UNVERIFIED: whether Next 16.2.5 persists on-demand renders to the filesystem cache under next start.
  The design does not depend on the answer.]` The production pass runs first.
- **Production pass:** the server process gets `VERCEL_ENV=production` and has
  `QOGNITION_PREVIEW_MODE` **removed** from its environment (not set to `0`; removed).
- **Preview pass:** `VERCEL_ENV=preview`, `QOGNITION_PREVIEW_MODE` removed, so the preview decision
  comes from the same variable Vercel sets.
- **Each pass proves its own environment before asserting anything.** A canary path, one taxonomy niche
  that has no body and is not published, must return **404 in the production pass and 200 in the
  preview pass** (it renders as an ADR-0010 catalogue candidate). If either canary is wrong, the pass
  aborts with "environment did not take", because every later result would be meaningless. This
  matters because `proxy.ts` and `app/layout.tsx:104` both call `isPreviewDeployment()`, and
  `[UNVERIFIED: whether Next inlines process.env.VERCEL_ENV into the proxy bundle at build time or reads
  it at request time under next start]`. The canary answers that question on every build instead of
  my guessing it.
- Both passes run on every build, preview and production alike. On a Vercel preview build the
  production pass is the forced one; on a production build the preview pass is. Either way, both
  environments are asserted against the same build output.

**Production pass, explicit expected statuses.**

| Path | HTML (`Accept: text/html`) | Markdown (`Accept: text/markdown`) | Also |
|---|---|---|---|
| Every registered L1/L2 draft (every unpublished path with a body, not a sample) | **404** | **404** | absent from every sitemap and from llms.txt and llms-full.txt; metadata is not the draft's |
| One real taxonomy niche with no body (the canary) | **404** | **404** | |
| `/industries/not-a-sector` (unknown L1 slug) | **404** | **404** | |
| `/industries/saas-and-software/not-a-sub` (unknown L2 under a real L1) | **404** | **404** | |
| A five-segment path below `/industries` | **404** | **404** | |
| An empty segment (`/industries//x`) and an encoded slash in a segment | **404**, or a redirect to a path that 404s | **404** | never echoes the raw input |
| Every published ICP path | **200** | **200** | `<meta name="robots">` and `X-Robots-Tag` are not `noindex`; self-canonical; in the sitemap once |
| All 77 legacy paths, `/industries/executive-search`, `/industries` | **200** | **200** | |

If no registered draft exists (after the publication commit, every L1/L2 page is published or held),
the pass records "0 registered drafts" and the in-process test T1 carries the assertion with its
injected fixture. A held page is checked as a draft: **404** on both surfaces.

**Preview pass, explicit expectations.**

| Path | Expected |
|---|---|
| Every registered L1/L2 draft | **200**, rendered through the real ICP template (not `NicheCandidatePage`, T18); `DraftNotice` present; `<meta name="robots" content="noindex, nofollow">`; response header `X-Robots-Tag: noindex, nofollow, noarchive` on both the HTML and the markdown response |
| The canary niche | **200** as a candidate, with the same robots meta and header |
| Every published path | **200**, with the same robots meta and header (the whole preview deployment is noindex, ADR-0010 §2) |
| The sitemap and llms files | list no draft and no candidate (ADR-0010 §2: preview sitemaps do not enumerate candidates) |
| The four unknown or malformed paths above | **404** on both surfaces |

**Resolved in Amendment 2.** Owen measured it: every page route is dynamic at `f077cce` because
`app/layout.tsx:102` awaits `headers()` (§0, §5). So each pass renders every page it requests at
request time, against that server's environment. The two-copy rule above stays, because it costs
nothing and does not depend on today's render mode, which §5 says may change under a later consent
ADR. **Both passes send no `x-vercel-ip-country` header except in T25**, so the consent attribute on
`<html>` is the fail-closed opt-in on every measured page, and it sits outside `<main>` in any case.

---

## 4. Rendering changes

### 4.1 The observation band is omitted unless a run is observed

`IcpSubIndustryPage`, `IcpNichePage` and `IcpSubNichePage` render `QuestionsBlock` (the dark band
"The questions your buyers ask AI", including its prompt list) **only when
`observation.status === 'observed'`**. `unobserved`, `loading` and `error` all render nothing: no
heading, no prompt list, no "Not tested yet". At level 1 the optional aggregate slot stays unbuilt.

I read "the observation section is omitted entirely" as the whole band, not only its result table,
because the band's intro promises testing and its prompt list without answers is the templated half
of the page. If the operator meant only the "What AI tools said" sub-block, the change is one
condition (operator decision O6).

When the band is omitted, `whatWeCheckFor` renders as the last paragraph of "Why firms like yours get
left out", so authored copy is never lost with the band. With the band gone the L2 order still
alternates: hero (light), why (light), buyers, axes, vocabulary, layers (dark), facts, paid demand,
programmes (dark), FAQs, CTA (dark), related. Mira confirms the rhythm against §9.

`ObservationStatus` and `UnobservedState` stay in the codebase for the spine pages and ADR-0003; this
contract stops ICP pages calling them with a non-observed view. Gate G10 checks the served HTML.

### 4.2 The hub

Section order and content are Nadia §2.2 to §2.8, unchanged here. The architectural points:

- **Removed:** the legacy 11-card grid, the "Core Services Across Industries" chip list, the three
  generic cards, the red pain-point boxes, and the "and N more" count. Title, meta description, H1
  and URL are fixed (priority page #10) and come from `SEO_OVERRIDES['/industries']` as today.
- **Retained, unreferenced:** the legacy grid moves into `components/industries/LegacyIndustriesGrid.tsx`
  so a revert of the hub commit restores it byte-identically (Nadia §7 rollback table).
- **Links come from one helper**, `icpPublishedHref(path): string | undefined`. The `check-icp.cjs`
  R5b regex over the hub source is replaced by the served-anchor checks in §3.3, which test the
  outcome instead of the spelling.
- **The sector finder** is server-rendered `<details>` per industry with every published sub-industry
  link in the DOM. The filter box is a client island that takes **no props** and filters the rendered
  `<li>` elements by a `data-name` attribute. It must never receive a record, a body or a list, so the
  RSC payload cannot carry the taxonomy (ADR-0008 §5.2 item 3).
- **Cards:** the industry's `cardLine` and three published children as links. No `note`, no counts,
  no priority, no revenue floor.
- **Schema:** `CollectionPage` with `description` equal to the meta description verbatim and
  `publisher: orgRef()`; `ItemList` of published industries; `BreadcrumbList`; `FAQPage`
  byte-identical to the visible FAQs. The current schema description ("AI growth marketing pages for
  SEO, PPC, web design...") is retired.
- **Proof:** the four named B2B programmes and one insurance line; no programme count (Nadia §2.6).

### 4.3 Legacy pages and the two "earlier guides" blocks

- **`LEGACY_ICP_OWNER`**, `data/industries/legacyIcpOwner.ts`, hand-written from Nadia's §1.4 table:
  48 rows (44 redirect candidates and 4 "Keep, owner link" hubs). Not derived; frozen by count.
  Owen and the operator review it as a judgement, not a match.
- Each mapped legacy page renders **one** in-body link to its owner's **nearest published ancestor**,
  anchor = that page's display name. 22 of the 48 owners are niches (level 3), which are not built in
  this phase, so those 22 link to their parent sub-industry until the niche publishes. The map keeps
  the true owner, because the later redirect decision (G1 to G6) is about the true owner. (Operator
  decision O5.)
- Nothing else on a legacy page changes: title, meta, canonical, robots and body copy stay as they
  are. The 28 pages with no B2B owner get no link, **pending O8** (Amendment 1). That is Nadia's
  reading, and it sits against the operator's words "Each legacy page stays live and links to its new
  owner page": for a consumer page there is no owner, so the sentence can be read either as "no link"
  or as "a link to `/industries`". I have not picked; O8 asks.
- The owner links are read through `icpPublishedHref`, so they can land before the publication commit
  and render only once their target is published (§0.1, commit L). Until then a mapped legacy page is
  byte-identical to today (T10).
- **`ICP_EARLIER_GUIDES`**, `data/industries/earlierGuides.ts`, hand-written: a path-keyed list of
  older pages an ICP page links once, at its foot, under "Earlier guides in this section".
  Two entries: `financial-services` lists the six legacy FS sub-pages (only rendered when the flag is
  `icp`), and `professional-and-business-services/recruitment-rpo-and-executive-search` lists
  `/industries/executive-search`. That second entry **is the orphan fix**: the page gains an inbound
  link from its owner and stays out of the sitemap, as Nadia §1.5 specifies. `executive-search` also
  gains one owner link back, like the legacy pages.

### 4.4 Agent markdown returns 404 where HTML does

`app/agent-markdown/route.ts`: `linesForPath` changes its return type to
`{ status: 200 | 404; lines: string[] }`, and every path beginning `/industries` is answered by an
industries handler that calls `resolveIndustriesPath` (§2.5). `not-found` returns HTTP 404 with a
short markdown body ("Not found", plus a link to `/industries`) and `Cache-Control: s-maxage=300`.
Because both surfaces call the same function, the markdown and the HTML cannot disagree about whether a
path exists.

Handlers, from Nadia §5.5: `/industries` lists published industries; an ICP page renders H1, opener,
buyers, facts with publisher, URL and access date, the observation table only when observed, FAQs,
canonical and last-reviewed date (never the reviewer's name); legacy hubs and sub-pages render their
own H1 and description; `/industries/executive-search` renders its title and description.

The `path` query parameter is untrusted: the handler splits on `/`, drops empty segments, rejects more
than 4 segments below `/industries`, and never echoes the raw input into the response.

**Not fixed here:** the generic sitewide fallback still returns 200 for every non-industries path.
Fixing that needs a list of every live non-sitemap route, which is its own decision. Logged for
Nadia and Jonas.

Served check: **superseded by §3.5 (Amendment 1, F2).** This paragraph used to assert only that the
status with `Accept: text/markdown` equals the status without it, which two surfaces can satisfy by
both serving a draft. §3.5 now states the expected status for each path on each surface, in a forced
production pass and a preview pass.

### 4.5 Schema: one organisation

`lib/b2b/icpMetadata.ts` `icpSchema` uses `orgRef()` for `Service.provider` and adds a page node
(`CollectionPage` at L1, `WebPage` at L2) with `publisher: orgRef()` and `lastReviewed` from the
ledger. Per Nadia §6.4: `Service.audience` is a `BusinessAudience` named with the display name;
`ItemList` of published children; `FAQPage` byte-identical to visible FAQs (page-specific and fixed);
never `AggregateRating`, `Review`, `LocalBusiness`, `HowTo`, `Dataset` or `knowsAbout` lists.
**`reviewedBy` is not emitted** (operator decision O3).

All ICP names, in title, H1, breadcrumb, schema, llms.txt and agent markdown, pass through one
display-name function. Applied once, in the `industryView` and `subView` constructors in
`lib/b2b/icpRegistry.ts`, which carry both `name` (raw, for gates and the §3.1 name set) and
`displayName` (for every rendered surface), so no consumer can forget and no gate loses the raw name.

**Correction (Amendment 1). The earlier sentence "The 8 TIC pages are unaffected (TIC carries no
suffix)" was wrong.** Industry 19 is "Environmental, Engineering & Testing (TIC)", and its published
L1 page today renders that full string in its title (`titleFor`, `lib/b2b/icpMetadata.ts:44`) and in
`IcpHero`, because neither calls `industryDisplayName`. The existing `industryDisplayName`
(`data/b2b/icp/industryVisuals.ts:59`) strips exactly ` (B2B)`, on Ruth's 2026-10-07 ruling for the
homepage cards; that ruling did not cover page titles and H1s. Every suffix that would reach an H1 or
a title at levels 1 and 2, walked from the taxonomy on 2026-10-14:

| Suffix | Level | Entities |
|---|---|---|
| ` (B2B)` | L1 | healthcare-and-life-sciences, financial-services, construction-real-estate-and-built-environment, education-and-training, hospitality-travel-and-events, agriculture-and-food, media-marketing-and-creative, aerospace-and-aviation, automotive-heavy-equipment-and-mobility, retail-cpg-and-brand-enablement (10) |
| ` (TIC)` | L1 | environmental-engineering-and-testing (**published**) |
| ` (B2G-adjacent)` | L1 | government-nonprofit-and-institutional |
| ` (B2B side)` | L1 | franchising-and-multi-location |
| ` (B2B)` | L2 | healthcare-and-life-sciences/dental-and-veterinary, financial-services/employee-benefits-and-retirement, financial-services/advisor-and-wealth-platforms |
| ` (institutional)` | L2 | financial-services/asset-management-and-fund-services |
| ` (Production Animals)` | L2 | agriculture-and-food/animal-health |
| ` (B2B side)` | L2 | media-marketing-and-creative/creator-platforms |
| ` (RaaS)` | L2 | emerging-and-micro-niches/robotics-as-a-service |
| ` (non-food)` | L2 | retail-cpg-and-brand-enablement/private-label-and-contract-manufacturing |

Twenty of the 21 L1 names and 269 of the 341 L2 names also contain `&`, which renders as written unless O9 says
otherwise. Which of these suffixes are stripped, kept or rewritten is **operator decision O9**,
because several of them carry meaning: stripping ` (B2B)` from "Dental & Veterinary (B2B)" leaves a
heading that reads as consumer dentistry, which CLAUDE.md keeps off every B2B page as proof, and
stripping ` (institutional)` or ` (non-food)` changes which firms the page is for. **Until O9 is
answered, every name renders raw**, so the published TIC title and H1 do not change (T17 pins them).

The legacy templates carry the same inline `'Qognition'` provider. **Correction (Amendment 1): this is
77 pages, not 11.** The 11 hubs render it from `[industry]/page.tsx` and the 66 sub-pages from
`[subIndustry]/page.tsx:165`. Fixing it changes structured data on 77 existing pages. It is not a
title, meta, URL or link change, but it is a change to legacy pages, so it is a separate commit on an
explicit yes (operator decision O4).

### 4.6 Service links, fixed FAQs, proof, facts

- **PPC:** `SERVICE_LINKS` in `lib/b2b/graph.ts` gains `{ href: '/services/ppc', label: 'PPC', surface: <Theo, Ruth-gated> }`
  as the fifth entry. `LAYER_ICON` gains a PPC icon. `ServiceLinksBlock`'s four-column grid needs a
  five-item layout (Mira). The block's existing line "PPC is scoped separately" stays. The spine
  draft pages share the block and gain the link too; they are noindex, so nothing indexable changes.
- **Fixed FAQs:** `ICP_FIXED_FAQS`, two or three Ruth-approved questions (guarantee, how pricing is
  scoped, paid search alongside the retainer), rendered after the page-specific FAQs on every L1 and
  L2 page and included in `FAQPage`. Written once, because 362 rewordings of "can you guarantee an
  assistant will name us" is the template-spinning §7 forbids, and gate U4 would fail it anyway.
- **Proof:** `IcpProofBlock` reads `ICP_PROOF_BY_PATH` (`data/case-studies/icpProof.ts`, frozen,
  Nadia §1.6 entries). `check-industry-gate.cjs`'s "no named programme on `/industries`" assertion is
  amended to "a named programme renders on exactly the published keys of `ICP_PROOF_BY_PATH` and
  nowhere else". HVAC and dental appear in neither map. Owen reviews the map against the operator's
  permission record.
- **Facts:** `FactsBlock` renders entity facts then supporting facts; each shows the claim, the
  publisher linked to `url`, and "accessed <date>"; a `reported` fact adds "read via <via.publisher>".
  `excerpt`, `sourceClass` and `entityAnchor` are not rendered.
- **L1 layout:** "Sectors in <industry>" renders the `sectors` rows (sentence plus link) directly
  after "Who your buyers are", as Nadia §3.3 lifts it. `RelatedPagesBlock` then carries siblings and
  cross-links only, so children are not linked twice.
- **L2 layout:** scope rows render with `id="<niche-slug>"`, which is the "nearest published address"
  fallback ADR-0010 journeys point at (Nadia §3.4). Sub-niche names render as plain text inside their
  niche's row, with no anchors: one slug repeats inside a single sub-industry
  (`cloud-consultancies/.../migration-and-modernization-partners`, ADR-0008 §2.5), and a duplicate
  `id` is invalid HTML.

### 4.7 llms.txt

`llms.txt` lists `/industries` and the 21 published industry pages, one line each (display name, meta
description). `llms-full.txt` adds the 341 sub-industries with their openers. Neither lists levels 3
or 4 until a niche phase. **Amendment 2, made to agree with §2.5:** both are built by
`buildLlmsTxt` and `buildLlmsFullTxt` in `lib/llms.ts` (called from `app/llms.txt/route.ts` and
`app/llms-full.txt/route.ts`), and both read **`publishedIndustriesRoutes()`** and nothing else, whose
element type cannot hold a draft or a candidate. The direct `resolveIcp` call at `lib/llms.ts:92` is
replaced in C4.

---

## 5. Build and performance

**Amendment 2 (A2-1) replaced the decision in this section.** It used to say "full static generation
for all 362 level-1 and level-2 pages". That is not what the code does, and not because of anything in
this ADR.

**The measured fact.** `app/layout.tsx:102` awaits `headers()` in the root layout, and that makes every
page route dynamic. Owen built `f077cce` twice on 2026-10-14. As committed: 17 static, 1 SSG and 71
dynamic routes, and every page route is dynamic, including `/industries` and all four ICP levels. With
only line 102 changed: 48 static, 29 SSG and 12 dynamic. So today every L1/L2 page would render on
every request, and `generateStaticParams` decides which paths are known, not which are prerendered.

**The trap.** Line 102 is not incidental. `layout.tsx:108` derives the regional consent default from
the `x-vercel-ip-country` request header (operator decision 2026-10-06: opt-out for the US, Canada,
Australia, UAE and Singapore; opt-in elsewhere and when the region is unknown). A static page has no
request headers, so it fails closed to opt-in. Removing `headers()` to get static pages would silently
switch every US, Canadian, Australian, UAE and Singapore visitor to opt-in, which breaks the operator's
consent model without a single failing test today.

**Options.**

- **(a) Accept per-request rendering for levels 1 and 2. Chosen.** The bodies are committed data, the
  render is pure over them and the request's locale and country, and nothing about the ICP pages
  needs static output to be correct.
- **(b) Move locale and consent region out of the layout,** into a cookie or header set by `proxy.ts`
  and read on the client or at the edge, so pages can be static again. This touches consent, analytics
  and every page on the site, so it is **its own consent ADR**, reviewed by Anton (`secops`) and Owen,
  and not something this ADR decides by side effect. Recorded for Kyle as a follow-up, not scheduled.

Owen recommended (a) here with (b) as a separate decision, and I agree.

**The rule (Amendment 2). Do not remove `await headers()` from `app/layout.tsx`, or make the root
layout static by any other means, without first moving the consent default.** The consent ADR in (b) is
the only route to doing so. T25 (§12) enforces it: in the production pass, a request carrying
`x-vercel-ip-country: US` must render `data-consent-default="granted"` and one carrying `GB` must
render `denied`. If a change makes pages static, the US case fails closed to `denied` and the build
fails.

**Why levels 1 and 2 still do not use ISR, with the reasons rewritten for (a).**

1. **ISR is not available while the layout reads `headers()`.** A route that reads request headers is
   dynamic; there is nothing to revalidate. Choosing ISR would mean choosing (b) first.
2. **ISR would buy nothing even after (b).** The bodies change only by commit and re-signature, so
   there is no runtime change for revalidation to pick up. A cache with a timer over content that
   cannot change at runtime is complexity with no input.
3. **U5, U5b and §3.3 stay binding, because the served check renders everything.** Under (a) there is
   no prerendered artefact to inspect; instead both passes of §3.5 request every L1/L2 path, every
   legacy path and every negative, so every page is rendered and measured before deploy. What they
   measure is what a visitor's request renders: the same committed data, the same template, and the
   environment of the pass. The request-dependent parts (`lang`, the consent attribute) are on
   `<html>`, outside `<main>`, so they cannot move a uniqueness score.
4. **The cost moves from build time to request time.** 362 pages are no longer built, so build
   wall-clock barely changes with publication; instead each request renders. That is the number to
   watch: `[NEEDS DATA: TTFB at 367 dynamic ICP pages, p50 and p95, production pass and live, before
   and after P.]` Cost control 1 below (memoise the resolver at module scope) matters more under (a),
   because it is now paid per request, not once per build.

**`dynamicParams` stays `true`** on all four routes, because ADR-0010's preview resolver needs it.
In production the resolver returns `not-found` for anything outside the published set, which is the
behaviour `dynamicParams = false` used to guarantee. **Amendment 1:** that guarantee now lives in
`resolveIcp` itself (§2.5, F1), lands in C0 before any body, and is asserted in-process (T1) and by
the forced production pass (§3.5) on every build. The stale `false` comments in the two route files
are corrected in C0.

**Cost controls, in order:**

1. `resolveIcpAuthored` is pure over committed data: memoise it per path at module scope, and let `resolveIcp` apply the environment rule after the cache (Amendment 2.1, Owen's C0 note; memoising `resolveIcp` itself would cache an environment-dependent answer). `icpSiblings`,
   `icpChildren`, `icpCrossLinks` and the params functions all re-resolve the same paths.
2. No Client Component receives an ICP record or body (ADR-0008 §5.2 item 3, retained). The hub
   filter takes no props (§4.2).
3. Inverted-index uniqueness (§3.1) in the gates.
4. The served check fetches with bounded concurrency from each of its two `next start` servers (§3.5).

**Not measured, and I will not estimate it:** `[NEEDS DATA: TTFB at 367 dynamic ICP pages, p50 and
p95.]` (Amendment 2; this replaces the build wall-clock item as the number that matters, because
under (a) publication adds request-time work, not build-time work). The build wall-clock and the
served-check duration are still recorded in the publication commit's description.
`[UNVERIFIED: the Vercel plan's function duration and memory limits for dynamic routes.]`

**If TTFB is unacceptable:** apply the four controls above first. If it is still too slow, the
remedy is option (b), through its own consent ADR, and not ISR as a tuning step. If 367 dynamic
pages are the wrong shape altogether, that is ADR-0008 §11 item 5 and both ADRs are re-argued.
**Amends ADR-0008 §5.3**, which said levels 1 and 2 are never dynamic: under the current root layout
they are, and this ADR accepts it.

---

## 6. Alternatives rejected

- **One file per industry.** 21 files of 15,000 to 25,000 words each; every Ruth FIX and every
  signature is a diff inside a shared file; two agents editing one industry collide.
- **A single shared `REVIEW` constant for 359 pages,** as wave 1 did for 8. Cheapest, and exactly the
  shape of the 2026-09-29 attribution incident at 45 times the scale.
- **Environment-variable flag for financial-services.** A canonical-owner change with no diff and no
  reviewer, invisible to the node gates. Rejected in §2.5.
- **Jaccard only for uniqueness.** Symmetric and diluted by long neighbours; does not answer the
  operator's "40% unique against the closest sibling" literally. Kept as U1, not as the rule.
- **Body-text uniqueness as the binding measure.** It ignores the template, which the crawler reads.
- **Per-page author choice of proof.** A research agent would be deciding which client implies
  experience in which sector, which is the §11 judgement.
- **ISR for levels 1 and 2.** §5.
- **Keeping `publishedIcpPaths()` as a hand literal.** §2.3.
- **Grandfathering the three TIC L1/L2 pages.** Two fail the L2 fact minimum today.

Rejected in Amendment 1:

- **A bare sha256 ledger** (the original §2.2). Proves the words did not change, not who approved them (F3).
- **An HMAC with a shared secret instead of a signature.** The gate would need the secret to verify,
  so the secret would sit wherever the gate runs, including Vercel and every agent shell. A public-key
  signature verifies with nothing secret in the repo or the build.
- **Ruth's verdict in the body with a hash added** (Owen's wording of F4). Better than today, but the
  body is in the research agents' write scope, so the verdict would still be typeable by the author it
  judges. Moved to its own file instead (§2.2).
- **One worktree per research run.** Isolates writers but blinds the uniqueness gate to industries
  finished after the worktree branched (§2.1).
- **A union threshold lower than 0.40 from the start.** No measurement supports any particular lower
  number (§3.1).
- **An environment-specific resolver selected by the route file** (`if (isPreviewDeployment())` in
  each of four routes). F1 is a consumer trusting the resolver; adding the rule to eleven consumers
  instead of one resolver multiplies the places it can be forgotten.
- **Dropping `await headers()` from the root layout to make L1/L2 static** (Amendment 2). Silently
  moves five markets' visitors from opt-out to opt-in, against the operator's 2026-10-06 consent
  model (§5). Only a consent ADR may change where the region is read.
- **A hand-written template file list** (Amendment 1's digest). Lagged the real imports on day one (§2.2).
- **A committed test private key** (Amendment 1's T3). Contradicted the no-private-key gate (§12 T3).
- **Publishing by ledger entry** (the original §2.4). Forced 359 signatures to stay uncommitted until
  publication, and made the revert of publication discard them (§2.3, Amendment 1 design change 1).

## 7. Consequences

**Good.** The three entity facts, the source class, the excerpt and the access date are structural, so
"fewer than 3 entity-specific sourced facts" is a compile error, and a fact reused from a sibling is a
gate failure that names both pages. Prabal's signature is bound to the words he read, the template he
read them in, and a key nobody else holds (Amendment 1); Ruth's verdict is bound to the words she
read. A draft cannot render in production whatever a route file does, and every build proves it in a
forced production pass. One function
decides every `/industries` path, so HTML, metadata, sitemap and markdown cannot disagree, which closes
the soft 404 and prevents the financial-services flag from recreating ADR-0008's blocker 2.

**Bad, and accepted.** Prabal signs 359 pages; nothing in the repo can make that faster without making
it attribution. Amendment 1 adds to that: he also holds a private key and a passphrase, types the
passphrase at every signing session, confirms each page individually, and re-reads the template once
for every template change after signing. A lost key means every entry it signed is re-read. The
served check now runs two `next start` servers on two copies of the build, roughly doubling its
duration (`[NEEDS DATA: measured]`). Seven research waves instead of one parallel burst make the
calendar longer; the publication date is set by the slowest of seven waves plus Prabal's reading.
Amendment 2 adds: every L1/L2 page renders per request, so publication adds request-time cost on
every visit rather than build-time cost once, and the template digest now moves with unrelated data
edits, so Prabal reviews more template sign-offs than a narrow list would have asked of him. The all-or-nothing publication means the hardest page sets the date for all of them.
Every post-signature edit, including a typo fix, needs a re-sign. Pre-build gates get slower with the
uniqueness index; the served check adds roughly one fetch per page to every build
(`[NEEDS DATA: measured duration]`).

**Ugly.** After the flip, the six legacy FS sub-pages still carry the legacy name "Financial Services &
Investment" in their breadcrumb, pointing at a page now titled for B2B Financial Services. Fixing it
changes six legacy pages, which this build does not do. The legacy hub template keeps the inline
"Qognition" provider until O4 is answered.

## 8. What would make this decision wrong later

1. **The family fails §7's tests at 90 days.** Fewer than 60% of indexable L1/L2 pages with an
   impression in 28 days, or median position worsening over two 28-day periods. Then publishing 359
   at once was wrong for this domain; the remedy is improve-or-prune under the kill rule, and the
   cohort model returns for everything below level 2.
2. **U5 fails broadly on template chrome.** Then the template is too heavy for the body length;
   cut chrome. If cutting chrome cannot get there, the 900-word L2 minimum is too low.
3. **Prabal cannot read 359 pages.** If signatures arrive faster than the pages could be read, the
   ledger has become attribution with a signature on it. **Now measurable (Amendment 1, F3):**
   `check-icp.cjs --ledger-report` gives, per session, authored words signed and the median gap
   between consecutive per-page `signedAt` values, and the signature stops those timestamps being
   edited afterwards. The trigger is a session whose words-per-minute exceeds
   `[NEEDS DATA: an operator-agreed reading rate]`. Then stop and name a second reviewer (`IcpSignOff`
   becomes a two-member union, and a second public key is committed).
4. **The financial-services GSC export shows external links or leads on consumer queries.** The
   operator decided B, but G3 and G4 data that contradicts the premise is a reason to re-ask before
   flipping, not after.
5. **Scriblr runs land.** Not wrong, but the omission rule then renders the band on some pages and not
   others; check the light and dark rhythm per page.
6. **TTFB at 367 dynamic pages is unacceptable** after the cost controls (Amendment 2; this replaced "the build breaches at 367 static pages"). Then the consent ADR in §5 option (b) becomes urgent; if that cannot land, ADR-0008 §11 item 5 applies and the shape is re-argued.
7. **The operator bumps the taxonomy to v2.1.** The L1/L2 set equality fails until the new entity has
   a signed body, by design; a renamed slug orphans its body file, and G1 names it.
8. **A second reviewer or a client portal appears.** Re-derive tenancy; this ADR assumed a
   single-tenant public site.
9. **The signing key is lost, shared or used by anyone but Prabal** (Amendment 1). Revoke it, re-read
   every page it signed. If keeping one person's key private proves unworkable, the signature scheme is
   the wrong control and the ledger falls back to being attribution; say so, do not keep the ceremony.
10. **U5b cannot reach 0.40 on the TIC calibration** without cutting chrome the operator wants
    (Amendment 1, F5a). Then the template is too heavy for the body length, and the choice is shorter
    chrome, longer bodies, or an amendment lowering `UNION_MIN_SERVED` with the measurement attached.
11. **Template sign-offs pile up after publication** (Amendment 1). If the chain in
    `ICP_TEMPLATE_SIGNOFFS` grows by more than a handful of links, the template is changing faster
    than one person can re-read it and the template-digest control has become a formality.
12. **G18's observed-fact floor blocks many pages** because primaries refuse automated reading. That
    is a sourcing problem, not a reason to drop the floor; it goes to the operator through O2.
13. **The consent region moves out of the root layout** (§5 option (b), Amendment 2). Then static generation becomes possible, and §5 is re-decided; the T25 consent canary must keep passing through that change.

## 9. Rollback

**Amendment 1 (F7) rewrote this section.** Three things changed. First, the earlier first row said
"within 90 days of going live no redirect is owed". That rule is not in CLAUDE.md, and CLAUDE.md §7
says the opposite: before removing, redirecting or noindexing anything, pull Search Console data for
that URL group first, and never 410 a backlinked URL. It is deleted. Second, single-page rollback now
uses `ICP_HELD`, because removing a ledger entry broke the set equality and, at level 1, the children's
up-links. Third, every row that changes what is published now names every count it must reset in the
same commit, because a rollback that fails the build is not a rollback.

**Every row that removes a published URL from production starts the same way:** pull Search Console
for the affected URLs (CLAUDE.md §7), and check external links. A URL with impressions or external links
gets a 301 to its nearest published ancestor or to its legacy owner under Nadia's G1 to G6, decided
from that data, in the same commit or before it. A URL with neither may 404. No URL is 410'd.

| Change | Rollback | Counts reset in the same commit |
|---|---|---|
| Publication commit (P) | Search Console first, as above. If the FS flip (F) has landed, roll F back first (row below), or the gate fails on a flag of `icp` with nothing published. Then `git revert` P: `ICP_REBUILD_WAVE` returns to `null`, every non-TIC L1/L2 page is a signed draft again and 404s in production. Signatures are kept, so republishing is re-declaring | the revert restores `EXPECTED_PUBLISHED` (1 / 2 / 3 / 2), the ceiling (8) and the sitemap total (4,434) by itself, because P changed only those and the wave |
| A single L2 page | Search Console for that URL first. Add it to `ICP_HELD` with a reason, the date and `decidedBy`. It 404s in production; its ledger entry stays. **Amends ADR-0008 §12**, which said a demoted page "stays at 200, goes noindex": that is not what the code has done since the four-level routes shipped | `EXPECTED_PUBLISHED['sub-industry']` -1, ceiling -1, sitemap total -1 |
| A single L1 page | Search Console for the page **and its whole subtree** first. Hold the L1 and every L2 under it, in one commit; the gate refuses a held L1 with a published child, because the child's ancestor chain and up-link would point at a 404 | industry -1, sub-industry minus the subtree size, ceiling and sitemap total minus 1 + subtree size |
| A claims defect on a published page (a number without a source) | **Fix the sentence, not the URL**: correct or remove it, new brand check, re-sign. Same day. Holding the page is the fallback only if it cannot stand without the sentence; then the hold lands at once, because §4 outranks every growth rule, and the Search Console pull follows the same day and governs any redirect | as a single page, if held |
| Financial-services flip (F) | **One commit, in this order of effect:** set `FINANCIAL_SERVICES_OWNER` back to `{ owner: 'legacy' }` **and** reset the counts. The 17 ledger entries stay; the flag term of the publication rule (§2.3) unpublishes them. Never split it: counts reset without the flag, or the flag without the counts, fails the gate, and under precedence rule 2 (§2.5) the legacy hub keeps serving either way, so `/industries/financial-services` never 404s during a rollback. Search Console first for the 16 FS sub-industry URLs, which do leave production. The legacy component and data row were never deleted, so the legacy page returns byte-identically. No redirect existed in either direction | `EXPECTED_PUBLISHED` industry 21 to 20, sub-industry 341 to 325; ceiling 367 to 350; sitemap total 4,792 to 4,776 |
| Hub rebuild | Revert the hub commit; `LegacyIndustriesGrid.tsx` restores the grid. `/industries` title, meta, H1 and canonical never changed, so nothing to pull | none |
| Legacy owner links, earlier-guides blocks | Delete the block or the map entry. Additions only | none (the T10 baseline is the target) |
| Observation omission | Revert one condition per template | none |
| Agent-markdown handler | Revert the route file; the generic fallback returns (with its 200) | none |
| `orgRef()` in ICP schema | Revert `icpMetadata.ts` | none; the template digest changes, so a template sign-off is needed if pages are published |
| PPC service link | Remove one array entry | none; template sign-off as above |
| V2 body types and TIC migration (C6) | Revert C6; the three TIC bodies return to `HubBody` / `SubNicheBody` at their old paths, and the three wave-1 rows return to `ICP_PUBLISHED` in the same revert, so the 8 TIC URLs never leave production (T17) | none; TIC stays at 1 / 2 / 3 / 2 throughout |
| Signing mechanism (C3) | Revert only before any non-TIC signature exists; `ICP_PUBLISHED` returns to literal rows with one shared `REVIEW`. After signatures exist, reverting it discards Prabal's reading, so it is a decision for the operator, not a rollback | none |
| Production resolver rule (C0) | **Not rolled back.** Reverting it makes every registered draft live in production (F1). If it is wrong, it is fixed forward | n/a |

**Rollback triggers,** ADR-0008 §12 unchanged: a manual action on `/industries/*`; the group's median
position degrading over two consecutive 28-day periods after publication; any published number without
a source; any change to `legacy-page-register.json`. The first two revert the publication commit,
Search Console first; the third is the claims-defect row; the fourth blocks the merge.

## 10. Research-agent brief (MARS hands this to each industry run, verbatim)

> **You fill one industry: its industry body and every sub-industry body under it.** Repo
> `/Users/qognitionagency/dev/qognition-agency-landing`. Write only inside
> `data/b2b/icp/authored/<industry-slug>/`: `_industry.ts`, one `<sub-industry-slug>.ts` per
> sub-industry, and `_register.ts`. Touch nothing else. Never edit the review ledger, the brand-check
> file, the held list, the signing directory, the ceiling, `bodies.ts` or any gate; never run
> `scripts/icp-sign.mjs`, `scripts/icp-keygen.mjs` or `scripts/icp-brand-check.mjs`; never write a
> `brandCheck` field. Do not commit. Up to two other industry runs are working in this checkout at the
> same time, each in its own directory; never write outside yours, and expect the uniqueness gate to
> measure you against their finished pages.
>
> **Read first.** CLAUDE.md (the authority block, then §1, §2, §4, §10, §11). `docs/icp-positioning.md`.
> `docs/icp-industries/<NN>-<industry-slug>.md`. Your industry's rows in
> `data/b2b/icp/icp-taxonomy.json`. The types in `data/b2b/icp/bodyV2.ts` and ADR-0011 §1, which
> define every field and minimum. `data/b2b/icp/authored/tic-*.ts` show the voice; the V2 types win
> where they differ.
>
> **Two audiences, never mixed.** `buyers[]` is your client's buyer (procurement, engineers, IT,
> finance leaders), and what each one actually reads before choosing a supplier. `buyer_titles` in the
> taxonomy is our buyer (owner, CEO, marketing lead); the template renders it, you do not.
>
> **Family Q, never Family B.** Family B is what your client's buyer asks an AI or types into Google:
> the taxonomy's `ai_prompts` and `ppc_keywords`. We can never be the answer to those, so none of those
> strings may appear in `metaDescription`, `familyQ`, `snapshotQuestion`, `cardLine` or an FAQ
> question. Family Q is what our buyer asks about their own visibility ("Why doesn't ChatGPT name our
> lab when consultants ask for PFAS testing?"). `familyQ` holds 2 such questions at industry level and
> 3 at sub-industry level (absence, method, channel). Each ends with "?", is at most 25 words, and is
> not a paraphrase of the parent's.
>
> **Sources.** Entity facts (at least 3 per page) come only from: a regulator, the legislation itself,
> a standards body, an accreditation body, a government statistics agency, an intergovernmental body,
> the sector's trade association, a public registry, a peer-reviewed paper, or a statutory company
> filing. Supporting facts may also use trade press, news or a competitor's own page. Never cite a
> vendor blog or marketing statistic, a ranked listicle as evidence of a market fact, an AI answer,
> Wikipedia (use it to find the primary, then cite the primary), any figure on the CLAUDE.md §1
> blocklist, or anything from the taxonomy's `note`, `client_value` or `min_firm_size`.
>
> **No invention.** Open every URL you cite, on the day you cite it, and copy a verbatim passage of at
> most 50 words into `excerpt`. Every number in the claim must appear in that excerpt; if it does not,
> choose a passage that contains it or drop the number. If the primary will not load (403, paywall,
> form), you may cite it only through a page that reports it: set `confidence: 'reported'` and fill
> `via` with the page you actually read and its class (a regulator or other primary class, trade press
> or news). A competitor's page, a vendor's page or a blog is never a `via`. **The first entity fact on
> every page must be one whose primary page you opened and read yourself** (`observed`). Edition years and figures only when you read them at the publisher. `entityAnchor`
> names the instrument, standard, register or statistic the fact is about; if a sibling or the parent
> already uses that anchor as an entity fact, yours is not entity-specific, so find another. Never
> reuse a sibling's fact to reach a count. No client names (no name from `data/case-studies`, in any
> field), no claim or phrasing that implies we have worked in this sector ("our clients in", "we have
> helped", "firms we work with"), the word "guarantee" nowhere (the template's fixed FAQ covers it),
> no "invisible" said about the reader, and no number in prose that does not carry its publisher, date
> and sample. The gate checks all of these by pattern; Ruth checks the meaning.
>
> **Gaps.** A `[NEEDS DATA: ...]` never goes in a rendered field. Put each one in `researchGaps`,
> saying what is missing and where it would come from. If a gap means a page cannot reach a minimum
> (3 primary entity facts, 5 facts in total at sub-industry level, the word count), stop that page: do
> not pad it, do not lower the bar, do not borrow from a sibling. Hand it back as blocked with its
> gaps. One blocked page holds the whole publication, so say so early.
>
> **Plain English.** Written for a CEO or marketing lead reading once. Short sentences. One claim per
> paragraph. No em dashes. None of: unlock, supercharge, leverage, seamless, game-changer, "in today's
> digital landscape", world-class, industry-leading, market-leading, best-in-class, number one. Name a
> standard with its issuer the first time it appears. Do not write the guarantee, pricing or
> paid-search FAQs: the template carries them. Write each page from its own sources; a sentence that
> would still be true with another sector's name swapped in does not belong on the page.
>
> **Agency sub-industries.** In `professional-and-business-services/b2b-marketing-and-demand-gen-agencies`,
> `franchising-and-multi-location/franchise-marketing-and-lead-generation-agencies` and
> `franchising-and-multi-location/franchise-development-consulting-and-brokerage`, write to an agency
> principal buying capacity, never to their client. Flag these pages for Ruth.
>
> **Before handing back,** run `node scripts/check-icp.cjs --industry <industry-slug>` and fix every
> failure. Hand back, per page: path, entity facts by source class and confidence, total facts,
> authored word count, nearest page with its uniqueness score and the union uniqueness score from the
> gate, every `researchGaps` line, and any page blocked.

## 11. Open items

**Operator decisions.** Amendment 1 adds O8 and O9, corrects O4's scope, and records Owen's
2026-10-14 recommendation on each of O1 to O7. **They are recommendations only; the operator has
not decided any of them.** Where Owen and I agree, it says so.

- **O1. Financial-services timing.** Pull the Search Console export for `/industries/financial-services`
  before the publication commit, so all 362 publish in one commit at 367; or publish 342 new pages at a
  ceiling of 350 and flip later (+17). *Kyle:* pull first; the export is the only input and the
  operator said "together". *Owen:* pull Search Console first, then one publication at 367. Agreed.
- **O2. All or nothing.** If one page cannot reach the minimums from allowed sources, does every page
  wait, or may the first publication go out with named pages on `ICP_HELD` (a reason each, counts and
  set equality lowered to match)? Amendment 1 builds `ICP_HELD` regardless, because single-page
  rollback needs it (§9); O2 now asks only whether it may be non-empty at publication. Today's
  decision reads as "all wait". *Owen:* build the held list now, kept empty. That is what C3 does; the
  question of using it at publication is still open.
- **O3. Reviewer in JSON-LD.** I read "not printed" as covering structured data, so `reviewedBy` is
  not emitted. Nadia's §6.4 wanted it. One line either way. *Owen:* leave the reviewer out of JSON-LD.
  Agreed.
- **O4. Legacy schema provider.** Fix the inline `'Qognition'` provider to `orgRef()` on the **77**
  legacy pages (11 hubs and 66 sub-pages; the earlier text said 11, corrected in Amendment 1)? It
  changes structured data on existing pages, not their title, meta, URL or links. *Kyle and Owen:* yes,
  as its own commit (S in §0.1), covering all 77.
- **O5. Owner links to unbuilt niches.** 22 legacy pages map to a level-3 owner. They link to the
  owner's nearest published ancestor (the sub-industry) for now. Confirm, or those 22 get no owner link
  until niches publish. *Owen:* link to the nearest published ancestor. Agreed.
- **O6. Scope of "observation section".** Whole band omitted (my reading), or only the result sub-block
  with the prompt list kept. *Owen:* omit the whole band. Agreed.
- **O7. Where the Search Console export lives.** *Owen:* keep the raw export in `~/qognition-ops` and
  commit a summary plus its hash. Amendment 1's F11 design fits that: the raw zip, including every
  query, stays in `~/qognition-ops`; the repository gets only the dates and filters tables (which carry
  no queries), a summary and the zip's sha256, and the gate parses those (§2.5). If the operator
  wants nothing from the export in the repository at all, the gate can check the summary only, but then
  it is checking a file we wrote, not one Google produced.
- **O8. Legacy pages with no B2B owner (new).** 28 legacy pages have no owner in the taxonomy, usually
  because they address a consumer buyer. Nadia's reading is that they get no link; the operator's
  words were "each legacy page stays live and links to its new owner page". Options: (a) no link, as
  Nadia reads it; (b) one link to `/industries`. *Kyle:* (a), because a consumer-intent page linking to
  the B2B index sends the wrong reader to it and adds nothing for the right one; but it is the
  operator's sentence to interpret. Either way the 28 pages' title, meta, canonical and robots do not
  change (T10).
- **O9. Display names in H1s and titles (new).** Which of the suffixes in §4.5 are kept, stripped or
  rewritten at levels 1 and 2? The live TIC page carries "(TIC)" today. Options per suffix: keep as in
  the taxonomy; strip; or rewrite to a plain-English name the operator approves. *Kyle:* strip " (B2B)"
  everywhere **except** "Dental & Veterinary (B2B)", where stripping it makes the heading read as
  consumer dentistry; keep the qualifiers that change who the page is for ("(institutional)",
  "(Production Animals)", "(non-food)", "(B2B side)", "(B2G-adjacent)"); keep "(TIC)" and "(RaaS)",
  which are the terms buyers use. Until answered, every name renders raw and the TIC title does not
  change.

**New follow-up (Amendment 2).** A consent ADR for §5 option (b): moving locale and the consent region out of the root layout. Owner Kyle, reviewers Anton and Owen. Not scheduled; not an operator question unless it changes the consent model itself, which it must not.

**Carried forward, not new.** A specialist reviewer for regulated verticals (insurance, healthcare,
TIC accreditation, aerospace airworthiness, franchise disclosure), open in `data/b2b/types.ts`. The two
spine-draft 301s (ADR-0008 §4.4). Growth-page owner links (Nadia §1.6), which touch the frozen
`/growth` family and need their own decision. The generic agent-markdown fallback's HTTP 200 for every
non-industries path (§4.4), for Nadia and Jonas.

**NEEDS DATA.**

- `[NEEDS DATA: GSC export for /industries/financial-services, 16 months, exact-URL filter, as specified in §2.5.]` Blocks the flip.
- `[NEEDS DATA: TTFB at 367 dynamic ICP pages, p50 and p95, production pass and live, before and after P.]` (Amendment 2; replaces the build wall-clock item)
- `[NEEDS DATA: served-check duration, both passes, at 367 pages plus 77 legacy and the negatives.]`
- `[NEEDS DATA: Prabal's review hours per page, which sets the publication date.]`
- `[NEEDS DATA: an operator-agreed reading rate, which turns §8 item 3 from a report into a trigger.]` (Amendment 1)
- `[NEEDS DATA: U5 and U5b on the three TIC L1/L2 pages on the first build after C2 (where the served U5 and U5b land), to calibrate UNION_MIN_SERVED.]` (Amendment 1)
- `[NEEDS DATA: Theo's PPC surface line for SERVICE_LINKS, Ruth-gated.]`
- `[NEEDS DATA: ICP_FIXED_FAQS copy, Theo, Ruth-gated.]`
- `[NEEDS DATA: the agreed indexable-pages to organic-sessions ratio, CLAUDE.md §7 test 5.]` Still unassertable.

**Unverified.**

- `[UNVERIFIED: the Vercel plan's build timeout and memory ceiling.]`
- `[UNVERIFIED: whether Next 16 accepts a non-literal dynamicParams.]` Not needed by this design, which keeps the literal `true`; recorded because the obvious "env-driven false in production" shortcut depends on it.
- `[UNVERIFIED: the exact file names inside a Search Console Performance CSV export zip, and whether its dates table emits zero-impression days.]` (Amendment 1, §2.5)
- `[UNVERIFIED: the Search Console API's current per-request and per-day row limits.]` (Amendment 1, §2.5)
- `[UNVERIFIED: whether Next 16.2.5 persists on-demand renders to the filesystem cache under next start.]` The two-copy design does not depend on it. (Amendment 1, §3.5)
- `[UNVERIFIED: whether process.env.VERCEL_ENV is inlined into the proxy bundle at build time.]` The canary paths answer it on every build. (Amendment 1, §3.5)
- ~~whether the root layout's `await headers()` makes every route dynamic~~ **Resolved in Amendment 2:** it does, measured by Owen at `f077cce` (§5).
- `[UNVERIFIED: the Vercel plan's function duration and memory limits for dynamic routes.]` (Amendment 2, §5)
- `[UNVERIFIED: the hostnames of the competitor and vendor publishers named in CLAUDE.md §1, for excludedSourceHosts.ts.]` Iris confirms each by opening it. (Amendment 1, G18)

## 12. Test plan (Amendment 1)

Owen's 17 required cases are T1 to T17, in his order. T18 to T23 cover the other findings. T24 and T25 were added in Amendment 2. **Every test
lands with a seeded failing fixture**: a committed input under `scripts/fixtures/icp/` that the
check must reject, run in the same test, so a gate that cannot fail for its own case fails its test.
That is the lesson of commit `a0a9bc5` ("All three gates could not fail for their own case"). "Served"
means the §3.5 pass named; "in-process" means the module is imported with an injected environment and
injected data.

| # | Asserts | Where | Seeded failing fixture | Lands in |
|---|---|---|---|---|
| T1 | A registered L1 draft and a registered L2 draft are absent in production from HTML (404), metadata (not the draft's title or robots), agent markdown (404), the sitemap and llms.txt / llms-full.txt. **Allowlist (Amendment 2):** `resolveIcpAuthored` appears in no tracked file except `lib/b2b/icpRegistry.ts`, `scripts/**` and test files, and inside `icpRegistry.ts` only `resolveIcp` calls it; no runtime file calls `resolveIcp` or `resolveIndustriesPath` with a second (`env`) argument | in-process with `VERCEL_ENV=production`; served production pass; pre-build source scan | an injected L1 and L2 draft body; a fixture runtime module under `lib/` (not `app/`) that references `resolveIcpAuthored`; an internal registry helper fixture that calls it directly; a fixture runtime call `resolveIcp(path, { VERCEL_ENV: 'preview' })` | C0 (in-process, scan), C1 (served) |
| T2 | Malformed and unknown paths 404 on both surfaces in production: unknown L1, unknown L2 under a real L1, a real unpublished niche, a five-segment path, an empty segment, an encoded slash; the raw input is never echoed | served production pass | a resolver stub that returns a record for five segments; a handler stub that echoes `path` | C1 |
| T3 | Ledger tamper: an edited body, an entry moved to another path, an altered `signedAt`, an altered `templateDigest`, a signature by a key that is not committed, a revoked key, a duplicated entry, a private key in a tracked file. **Plus the canonical-JSON fixture**: the signer, the brand-check writer and the gate produce identical bytes and hash for `scripts/fixtures/icp/canonical.json` (key order, nested arrays, NFC vs NFD strings, a number). **Keys (Amendment 2, A2-3): no private key is ever committed, fixtures included.** Tamper cases generate an Ed25519 key pair in memory at test time and never write the private half. For a stable cross-version check, `scripts/fixtures/icp/` holds one fixture **public** key and fixture ledgers signed once in advance with a key that was then discarded; Ed25519 is deterministic (RFC 8032; confirmed in Node, §0), so they verify identically on every run. **When verifying the real ledger, the gate refuses any `keyId` whose public key file lives under `scripts/fixtures/`**, and accepts real keys only from `data/b2b/icp/signing/` | pre-build | one fixture ledger per tamper case; a real-ledger fixture entry whose `keyId` names the fixture public key; a fixture file containing a `PRIVATE KEY-----` header (must fail the no-private-key gate, with no fixtures exception) | C3 |
| T4 | The computed template tree (Amendment 2): a file imported two levels down from a root, outside `components/b2b` and `lib/b2b` (for example a `data/servicePages.ts` string), changes the digest; a stylesheet change and a body change do not; an unresolvable project import fails; a changed tree with no sign-off chain fails, and a valid chain passes before and after P. **Amendment 2.1:** a P-shaped diff (`ICP_REBUILD_WAVE` from `null` to declared, plus the `EXPECTED_PUBLISHED`, ceiling and sitemap-total edits) and an F-shaped diff (`FINANCIAL_SERVICES_OWNER` to `icp` with its evidence record, plus the counts) leave the digest unchanged, while a one-character change to a `data/servicePages.ts` string still moves it; a new string export added to `icpPublication.ts`, and a value import of a component into it, both fail the closed-shape gate | pre-build | a fixture root importing a fixture data file through a fixture component; a fixture import of a missing file; fixture P and F diffs applied to a copy of the tree; a fixture `icpPublication.ts` exporting `WAVE_LABEL = 'Rebuild'` | C3 |
| T5 | A stale Ruth hash: a brand check whose `bodyHash` predates a body edit cannot cover a signature; a `brandCheck` key inside a body fails; `icp-sign.mjs` refuses a page with no matching SHIP | pre-build; signer unit test | a fixture body edited after its brand check | C3 |
| T6 | Uniqueness: (a) a sibling that is a name-swapped clone, including "&" written as "and" and the parent's name swapped, fails U2; (b) a patchwork page built from four siblings, a quarter each, passes U2 and fails U2b; (c) a near-empty page fails U-floor and never yields a ratio; (d) U1, U2, U2b and G5 read the same strings, and a body key missing from the classification table throws; (e) served text excludes every `<script>`, so body text duplicated in JSON-LD or the RSC payload changes no score | pre-build; served | one fixture per case | C2 |
| T7 | Counts at both flag states: 350 published and sitemap 4,776 with the flag `legacy`; 367 and 4,792 with it `icp`; exactly one `ICP_REBUILD_WAVE` declaration, with `levels` exactly `[1, 2]`; R4d binds on levels 3 and 4 only | pre-build | a second wave declaration; `levels: [1, 2, 3]`; three cohorts at a ceiling of 367 (passes today's vacuous R4d, must fail the new one) | C2 (logic), P (values) |
| T8 | Financial-services: flag `legacy` keeps the legacy hub and publishes no FS ICP path even with valid entries; flag `icp` with no published FS record fails the gate while the runtime still serves the legacy hub; flag `icp` with a published record serves ICP once in the sitemap; the six legacy FS sub-pages resolve and stay in the sitemap at both states; the evidence parser rejects a wrong page filter and a short date span | pre-build; served | fixtures for each flag state; a filters table with a "URL contains" filter; a dates table spanning 400 days | C4 |
| T9 | The resolved redirect table is frozen by count and hash, and no `source` begins `/industries`. **Amendment 2:** the hash is over the canonical JSON of the array `await nextConfig.redirects()` returns (`source`, `destination`, `permanent`, plus `has` / `missing` if present), not over the file, so formatting and comments do not move it. The baseline count and hash are captured **after Luke and Mira's pending `next.config.mjs` change for the Cal.com and single-form funnel lands**; 58 is today's `source:` count and is not the baseline | pre-build | a fixture config whose resolved array gains one `/industries` redirect; one that changes only whitespace (must pass) | C4, after that change lands |
| T10 | Legacy pages are byte-identical on title, meta description, canonical and robots: the 77 legacy `/industries` pages and the 121 `/services/*/industries/*` pages (11 services by 11 published hubs). The body diff on the 48 mapped legacy pages is exactly one owner link; the 28 unmapped are unchanged (pending O8). **Amendment 2:** both baselines (head fields and body) are captured **after the current working-tree changes land** (the Cal.com, single-form and copy edits in flight on 2026-10-14), so the test pins the reviewed state rather than a state that is about to move | served production pass, against the committed baseline | a fixture page with a changed meta description; a mapped page with two owner links | C4 (baseline, after those changes land), L |
| T11 | `/industries/executive-search` stays out of the sitemap and gains exactly one inbound in-content link, from its owner's "Earlier guides" block | served | a sitemap fixture that lists it | C5 |
| T12 | `/industries` title, meta description, H1 and canonical are unchanged from the baseline (priority page) | served | a fixture with a changed H1 | C5 |
| T13 | The reviewer's name and the strings "Reviewed by" and "reviewedBy" are absent from every served response for every ICP path: visible text, `<head>`, JSON-LD, the RSC payload, agent markdown, llms.txt, llms-full.txt (G16) | served, both passes | a page fixture that leaks the name only inside the RSC payload | C4 |
| T14 | No HVAC or dental programme renders as proof on any ICP path, `healthcare-and-life-sciences/dental-and-veterinary` included; no pipeline dollar value appears on any ICP page; insurance KPIs render labelled as targets | served; pre-build on `ICP_PROOF_BY_PATH` | a proof map entry pointing a dental study at dental-and-veterinary; a body containing a `$` pipeline figure | C5 |
| T15 | No `undefined`, `NaN` or `[object Object]` in any served ICP, legacy or hub response, HTML or markdown | served, both passes | a fixture view with a missing field | C4 |
| T16 | Spine collisions stay unroutable: `financial-services/payments` and `financial-services/crypto-web3-b2b` never resolve to `kind: 'spine'`; promoting either spine entry to `draft` fails the build | pre-build | a fixture `verticals.ts` with `payments` promoted to `draft` | C0 |
| T17 | TIC continuity: the 8 TIC URLs return 200 in the production pass, with unchanged title and H1 until O9 is answered, at **every** commit in §0.1 | served production pass, every build | a fixture C6 that adds the ledger entries without removing the wave-1 rows, and one that removes the rows without the entries | C0, then every commit |
| T18 | On preview, a registered draft renders through the real ICP template, not `NicheCandidatePage`, with `DraftNotice`, robots meta `noindex, nofollow`, and the `X-Robots-Tag` header on HTML and markdown; the environment canary is 404 in production and 200 in preview | served preview pass | a route fixture with today's order (candidate before draft) | C1 |
| T19 | Copy gates G17: "invisible" near "you" or "your"; "guarantee" outside the `data-fixed-faq` element; each seeded past-experience phrase; a case-study client name in a body | pre-build; served | one body fixture per pattern | C2 |
| T20 | Source gates G18: an excerpt of 51 words; a claim number missing from its excerpt; a `.example` URL, an IP-literal URL and an unparsable URL; a `via` of class `competitor-page`; a host on the excluded list; a page whose first entity fact is `reported` | pre-build | one fact fixture per case | C2 |
| T21 | The FS evidence parser reads the committed dates and filters tables, built from the first real export, not from a hand-written guess at its format | pre-build | the real tables with one row edited | F, or earlier when the export arrives |
| T22 | `data-derived` cannot hide copy: an element so marked holding anything other than exactly one taxonomy name fails | served | a scope row whose `distinguishes` sentence is marked `data-derived` | C5 |
| T23 | Drafting mode: an empty register compiles and passes; a register with one complete body passes; a partial body fails; two registers claiming one industry fail; a body at a path not in the taxonomy fails; wave mode with one missing non-held body fails | pre-build | one fixture per case | C2 |
| T24 | **No lead form on industry pages (Amendment 2).** The operator's 2026-10-14 funnel is one form on /contact and one Cal.com calendar on /book, and no other page renders a lead form. No `<form>` element appears in the served HTML of any ICP L1/L2 page (published in the production pass, drafts in the preview pass), `/industries`, the 77 legacy industry pages or `/industries/executive-search` | served, both passes | a fixture block that renders a `<form>` inside the CTA | C1 |
| T25 | **Consent canary (Amendment 2, §5 rule).** In the production pass, `/industries` and one published ICP page requested with `x-vercel-ip-country: US` render `data-consent-default="granted"`; with `GB`, and with no header, `"denied"`. A change that makes the root layout static fails the US case | served production pass | a fixture layout that drops `headers()` and returns a static page | C1 |
