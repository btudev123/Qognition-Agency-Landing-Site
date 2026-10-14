# /industries rebuild on the locked taxonomy: architecture spec

Author: Nadia (search). 2026-10-08. Branch `main`, HEAD `fbcff5c`.
Status: **spec for operator approval. No code, no commit.** Kyle owns the mechanism changes it implies
(ADR-0008 amendments in §5.3), Mira builds the templates, Iris and Theo produce the bodies, Ruth gates
every user-facing label and body, Owen gates the code, Prabal signs each page.

Authority: CLAUDE.md authority block, operator decisions of 2026-10-08:
"/industries is rebuilt on the 21 taxonomy industries, with the 341 sub-industries under them. The
legacy 11 hubs and 66 sub-pages keep their URLs and are mapped in; nothing is redirected without
Search Console data. /industries title, meta and URL stay fixed (priority page)." Niche and sub-niche
pages come after the operator approves this design, "researched and substantive, never a name swapped
into a template".

Builds on, and does not restate: ADR-0008 (four-level URL shape, resolver, cohorts),
`docs/seo/b2b-niche-architecture.md` rev 4 (screens, prompt families, link rules, per-page
assertions), ADR-0010 (journeys, previews, lead contract), `docs/icp-positioning.md` v2.1.

---

## 0. Verified state, measured today

Every row was read from the repo or executed against it on 2026-10-08. Nothing is recalled.

| Fact | Value | Source |
|---|---:|---|
| Sitemap entries, total | 4,434 | `routesForSitemap` over all families, executed |
| `/industries` family entries | 86 = 1 index + 11 legacy hubs + 66 legacy sub-pages + 8 ICP | executed |
| ICP pages published | 8: 1 industry, 2 sub-industries, 3 niches, 2 sub-niches, all TIC (industry 19) | `lib/b2b/icpPublication.ts` |
| ICP sign-off type | one literal, `'Prabal (CEO, Qognition Agency)'`, review date 2026-09-29 | `IcpSignOff` |
| `/growth/industries/*` | 1 index + 8 sectors + 69 indexable niches in the sitemap; 103 noindex niches | `growthPublicationManifest`, executed |
| `/services/<service>/industries/<legacy>` | 121 sitemap entries (11 services x 11 legacy hubs) | executed |
| `/industries/executive-search` | static route, 200, indexable by default, **not in the sitemap, no inbound link anywhere** | grep of `app components data lib` |
| Spine drafts from `data/b2b/verticals.ts` | `/industries/manufacturing-industrial`, `/industries/manufacturing-industrial/cnc-machining`, noindex, not in sitemap | `b2bHubParams()`, executed |
| Stored observation runs (Scriblr answers in repo) | **0** | `data/b2b/observations/index.ts`: `OBSERVATION_RUNS = []` |
| Industry photos available | 4 of 21 (3 `featured/*` plus TIC) | `data/b2b/icp/industryImages.json` |
| Industry icons available | 21 of 21 | `data/b2b/icp/industryVisuals.ts` |
| GSC data for any `/industries/*` URL | **none.** The baseline has no `/industries/*` row and no per-URL data | `docs/seo/gsc-url-group-baseline.md` |
| Agent markdown for `/industries/*` | falls through to the generic sitewide block, **HTTP 200 for any path, including paths that 404 in HTML** | `app/agent-markdown/route.ts` |
| ICP page schema provider | inline `{ name: 'Qognition' }`, no `@id` | `lib/b2b/icpMetadata.ts` `icpSchema` |
| Sitewide Organization | `'Qognition Agency'`, `@id` `${SITE_URL}/#organization` | `lib/schema.ts` |
| `/industries` in global nav | yes | `data/navigation.ts` |

Three of those rows are defects this spec fixes in passing: the agent-markdown soft 200 (§5.5), the
ICP schema provider contradicting the sitewide entity (§6.2), and the orphaned executive-search page
(§1.5).

---

## 1. URL model

### 1.1 The shape is settled by implementation

ADR-0008's nested shape is what shipped. Wave 1 published two sub-niches at four segments, so the
Kyle-versus-Nadia question in ADR-0008 §2.5 is closed in Kyle's favour and I accept it. Nothing here
reopens it.

| Level | URL | Entities | Page by default? |
|---|---|---:|---|
| Index | `/industries` | 1 | yes, priority page #10 |
| 1 industry | `/industries/<industry>` | 21 | yes, this build |
| 2 sub-industry | `/industries/<industry>/<sub-industry>` | 341 | yes, this build |
| 3 niche | `/industries/<industry>/<sub-industry>/<niche>` | 2,376 | slot. A page only when it passes the level-3 screen (§3.3) |
| 4 sub-niche | `/industries/<industry>/<sub-industry>/<niche>/<sub-niche>` | 8,823 | slot. Default is an anchored section `#<slug>` on the niche page (§3.4) |

Slugs and ids come from `data/b2b/icp/icp-taxonomy.json` only (positioning rule 6). Display names
pass through one function, `industryDisplayName`, which strips the literal suffix ` (B2B)` and
nothing else, everywhere a name renders: card, H1, breadcrumb, schema, llms.txt, agent markdown.

### 1.2 Who owns `/industries/<slug>`, in resolution order

| Order | Owner | Claims | State |
|---|---|---|---|
| 1 | Static routes | `/industries/executive-search` | live, orphaned |
| 2 | Legacy `data/industries.ts` | exactly its own rows at depth 1 and 2. Nothing below | 11 + 66 live |
| 3 | Spine `data/b2b/verticals.ts` | `manufacturing-industrial` and one child | draft, noindex |
| 4 | ICP taxonomy | everything on `ICP_PUBLISHED` | 8 live |
| 5 | Preview candidates (`lib/nicheCandidates`) | preview deployments only | never production |
| 6 | 404 | everything else | |

This order stays. It is the "legacy wins at its own depth and nowhere below" rule from ADR-0008 §3.2,
and it is why one colliding string does not block a whole industry.

### 1.3 The one collision: `/industries/financial-services`

Measured surface: one string, at depth 1. Legacy holds it with "Financial Services & Investment"
(wealth management, mutual funds, financial planning). ICP industry 04 is "Financial Services (B2B)":
lending, commercial insurance, payments, fund services. Same name, different entity. The operator's
decision that `/industries` uses only the 21 industries makes the status quo untenable: the hub's
Financial Services card must point somewhere, and pointing it at a wealth-management page puts two
entities under one name, which is the contradiction that costs a citation.

| Option | What happens | Cost |
|---|---|---|
| **B (recommended)** | The URL stays. Its body becomes the ICP industry 04 page. The six legacy sub-pages keep their URLs and stay linked from a short "Earlier guides in this section" block at the foot of the new page | Title, meta and H1 of an existing URL change. Queries it ranks for today may be lost if they are consumer intent. **Gated on GSC for that URL first** |
| A | Legacy keeps the URL and body. ICP 04 never gets an industry page. Its 16 sub-industries publish, link up to `/industries` directly, and the breadcrumb shows "Financial Services" as unlinked text | The flagship industry (commercial insurance) has no hub, and the hub card for industry 04 cannot be a link |

Rollback for B: the legacy body component and data row are not deleted. The change is one branch in
the industry route's render and metadata plus one exception in `resolveIcp` for this slug; reverting
that commit restores the legacy page byte-identically at the same URL. Nothing redirects in either
direction. `scripts/check-icp.cjs` R5b asserts today that ICP never resolves this slug and has to be
amended in the same commit, with Owen reviewing.

### 1.4 The 11 legacy hubs and 66 sub-pages

**What changes on them in this build.** Two things, and only if the operator says yes (decision D2):

1. They come off the `/industries` hub. The legacy 11-card grid is removed. Every legacy page stays
   reachable: sub-pages from their legacy hub, legacy hubs from `components/shared/CrossLinks.tsx` on
   service and region pages, which this build does not touch.
2. Each legacy page whose ICP owner (table below) is published gains **one** in-body link to it,
   anchor = the ICP display name. That is how "mapped in" becomes a crawl signal. It is an addition to
   the page's links, not a change to an existing one.

Title, meta, canonical, robots and body copy on legacy pages do not change, apart from the
financial-services hub under option B.

**Classes.**

- **Keep.** No B2B home in the taxonomy, usually because the page addresses a consumer buyer. Stays
  exactly as it is. A later decision under the §7 kill rule, with GSC data, never in this build.
- **Owner.** The legacy URL becomes the canonical page for a taxonomy entity. One row: financial
  services, under option B.
- **Redirect candidate.** A published ICP page will cover the same buyer. Executes only when every
  prerequisite below holds. Until then the legacy page stays live and links to its owner.

**Redirect prerequisites, every candidate, all must hold (CLAUDE.md §7):**

| # | Data or condition | Where it comes from |
|---|---|---|
| G1 | 16 months of Performance data for the exact URL: clicks, impressions, average position, and the full query list | GSC, Performance, page filter "exact URL", export |
| G2 | Index status and Google-selected canonical | GSC URL Inspection, per URL |
| G3 | External links to the URL. **Any external link means 301, never 410** | GSC Links report (top linked pages) plus a third-party backlink export `[NEEDS DATA]` |
| G4 | Leads that landed on the URL: `contact_submitted`, `walkthrough_booked` | GA4, landing page dimension |
| G5 | The ICP target is published, indexed (G2 on the target) and has been live at least 28 days | GSC on the target |
| G6 | Intent match: the majority of G1 queries are answered by the target's H1 and body, judged by a named reviewer and recorded | reviewer note in the redirect commit |

If G1 shows zero impressions for 180 days and G3 shows no links, the §7 kill rule applies directly
(consolidate and 301). If G6 fails, the row becomes Keep. **A specific legacy page is never redirected
to a broader ICP page because its matching niche page is not published yet.** That is a soft 404 with
extra steps. It waits.

Rollback for any executed redirect: delete its `next.config.mjs` entry. The legacy data row, page
component and `lib/industryPublication.ts` allowlist entry are retained for 180 days after the
redirect ships, so the revert restores the page byte-identically. The same revert restores
`EXPECTED_INDUSTRIES` / `EXPECTED_SUB_INDUSTRIES` and the sitemap total in
`scripts/check-industry-gate.cjs`. `scripts/check-publication.cjs` cannot read `next.config.mjs`, so
each redirect is verified by reading the served response, and the PR says so (ADR-0008 §4.4).

**The map.** Proposed by name and buyer. **It is a judgement, not a match**, and it is frozen in a
hand-written table (`LEGACY_ICP_OWNER`) reviewed by Owen and the operator, for the reason
`lib/industryPublication.ts` gives: a derived map agrees with the data by construction and gates
nothing. `*` marks a row where the legacy name could be read as consumer intent; G1 queries decide.
L1/L2/L3 is the level of the target. Paths are relative to `/industries/`.

| Legacy URL | Class | ICP owner (target if redirected) | Level |
|---|---|---|---|
| `law-legal` | Keep (holds consumer children) | owner link: `professional-and-business-services` | L1 |
| `law-legal/corporate-law` | Redirect candidate | `professional-and-business-services/corporate-and-transactional-law-firms` | L2 |
| `law-legal/criminal-defense` | Keep | none (consumer) | |
| `law-legal/family-divorce` | Keep | none (consumer) | |
| `law-legal/ip-law` | Redirect candidate | `…/corporate-and-transactional-law-firms/ip-and-patent-law-firms` | L3 |
| `law-legal/real-estate-law` | Redirect candidate `*` | `…/corporate-and-transactional-law-firms/commercial-real-estate-and-construction-law-firms` | L3 |
| `law-legal/litigation` | Redirect candidate | `…/disputes-employment-and-regulatory-law-firms/commercial-litigation-law-firms` | L3 |
| `accounting-cpa` | Redirect candidate | `professional-and-business-services/cpa-tax-and-audit-firms` | L2 |
| `accounting-cpa/chartered-accounting` | Redirect candidate | `…/cpa-tax-and-audit-firms/full-service-cpa-firms` | L3 |
| `accounting-cpa/tax-consultancy` | Redirect candidate `*` | `…/cpa-tax-and-audit-firms/tax-advisory-firms` | L3 |
| `accounting-cpa/audit-assurance` | Redirect candidate | `…/cpa-tax-and-audit-firms/audit-and-assurance-firms` | L3 |
| `accounting-cpa/payroll-services` | Redirect candidate | `…/peo-eor-and-hr-outsourcing/outsourced-payroll-providers` | L3 |
| `accounting-cpa/bookkeeping` | Redirect candidate | `…/outsourced-finance-and-transaction-advisory/bookkeeping-as-a-service-firms` (priority C, so a long wait) | L3 |
| `accounting-cpa/tax-advisory` | Redirect candidate | `…/cpa-tax-and-audit-firms/tax-advisory-firms` | L3 |
| `financial-services` | **Owner** (option B) | becomes ICP industry 04 at the same URL | L1 |
| `financial-services/wealth-management` | Keep | none. ICP 04.10 sells *to* advisers, a different buyer | |
| `financial-services/investment-advisory` | Keep | none, same reason | |
| `financial-services/fintech` | Redirect candidate `*` | `financial-services/financial-software-and-data-infrastructure` | L2 |
| `financial-services/mutual-funds` | Redirect candidate `*` | `financial-services/asset-management-and-fund-services` | L2 |
| `financial-services/insurance` | Redirect candidate | `financial-services/commercial-insurance-carriers-and-distribution` | L2 |
| `financial-services/financial-planning` | Keep | none (consumer) | |
| `consulting` | Redirect candidate | `professional-and-business-services/management-and-strategy-consulting` | L2 |
| `consulting/strategy-consulting` | Redirect candidate | `…/management-and-strategy-consulting/strategy-consulting-firms` | L3 |
| `consulting/operations-consulting` | Redirect candidate | `…/operations-and-transformation-consulting/operations-consulting-firms` | L3 |
| `consulting/hr-consulting` | Redirect candidate | `…/hr-benefits-and-compensation-consulting/hr-consulting-firms` | L3 |
| `consulting/startup-advisory` | Keep | none (pre-revenue buyers are outside the ICP) | |
| `consulting/risk-compliance` | Keep | no single owner; G1 queries may later point at 04.13 or 09.04 | |
| `consulting/digital-transformation` | Redirect candidate | `…/operations-and-transformation-consulting/digital-transformation-consultancies` | L3 |
| `real-estate` | Keep (holds a consumer child) | owner link: `construction-real-estate-and-built-environment` | L1 |
| `real-estate/commercial-real-estate` | Redirect candidate | `construction-real-estate-and-built-environment/commercial-real-estate-services` | L2 |
| `real-estate/residential-agencies` | Keep | none (consumer) | |
| `real-estate/property-management` | Redirect candidate `*` | `…/commercial-real-estate-services/commercial-property-management-firms` | L3 |
| `real-estate/facility-management` | Redirect candidate | `professional-and-business-services/specialist-business-services/facilities-management-firms` (rule-7 canonical, not the 07.14 duplicate) | L3 |
| `real-estate/leasing-consultants` | Redirect candidate `*` | `…/commercial-real-estate-services/tenant-representation-firms` | L3 |
| `real-estate/real-estate-investment` | Keep | none. ICP 07.16 is developers, a different buyer | |
| `manufacturing` | Redirect candidate | `manufacturing-and-industrial` | L1 |
| `manufacturing/b2b-manufacturing` | Redirect candidate | `manufacturing-and-industrial` | L1 |
| `manufacturing/industrial-equipment` | Redirect candidate | `manufacturing-and-industrial/industrial-machinery-and-machine-tools` | L2 |
| `manufacturing/oem` | Redirect candidate | `manufacturing-and-industrial/oem-components-and-hardware` | L2 |
| `manufacturing/raw-materials` | Redirect candidate `*` | `manufacturing-and-industrial/chemicals-and-specialty-materials` | L2 |
| `manufacturing/factory-automation` | Redirect candidate | `manufacturing-and-industrial/industrial-automation-and-robotics` | L2 |
| `manufacturing/engineering-fabrication` | Redirect candidate | `manufacturing-and-industrial/metal-fabrication-forming-and-finishing` | L2 |
| `coaching` | Keep (mostly consumer children) | owner link: `education-and-training` | L1 |
| `coaching/exam-coaching` | Keep | none (consumer) | |
| `coaching/career-coaching` | Keep | none (consumer) | |
| `coaching/business-coaching` | Redirect candidate `*` | `education-and-training/executive-development-and-coaching/executive-coaching-firms` | L3 |
| `coaching/corporate-training` | Redirect candidate | `education-and-training` | L1 |
| `coaching/skill-development` | Keep | none (consumer) | |
| `coaching/certification-coaching` | Keep | none (consumer test preparation) | |
| `industrial-trade` | Keep (mixed children) | owner link: `manufacturing-and-industrial` | L1 |
| `industrial-trade/manufacturing-units` | Redirect candidate | `manufacturing-and-industrial` | L1 |
| `industrial-trade/heavy-equipment` | Redirect candidate | `automotive-heavy-equipment-and-mobility/heavy-equipment-dealers-and-parts` | L2 |
| `industrial-trade/b2b-factories` | Redirect candidate | `manufacturing-and-industrial/contract-manufacturing-and-ems` | L2 |
| `industrial-trade/industrial-supplies` | Redirect candidate | `manufacturing-and-industrial/industrial-distribution-and-mro` | L2 |
| `industrial-trade/export-import` | Keep | none. ICP 06.11 sells *to* traders, a different buyer | |
| `industrial-trade/logistics` | Redirect candidate | `logistics-supply-chain-and-transportation` | L1 |
| `care-homes` and its 6 sub-pages | Keep (7 rows) | none. Care operators sell to families. ICP 15.17 is vendors to operators, a different buyer | |
| `elder-care` and its 6 sub-pages | Keep (7 rows) | none, same reason | |
| `waste-management` | Redirect candidate | `commercial-and-facility-services/commercial-waste-and-recycling` | L2 |
| `waste-management/waste-collection` | Redirect candidate | `…/commercial-waste-and-recycling/commercial-solid-waste-haulers` | L3 |
| `waste-management/recycling-scrap` | Redirect candidate | `…/commercial-waste-and-recycling/recycling-and-material-recovery-services` | L3 |
| `waste-management/e-waste` | Redirect candidate | `technology-and-it-services/it-asset-lifecycle-and-field-services/it-asset-disposition-providers` | L3 |
| `waste-management/biomedical-waste` | Redirect candidate | `…/commercial-waste-and-recycling/regulated-medical-waste-services` | L3 |
| `waste-management/hazardous-waste` | Redirect candidate | `environmental-engineering-and-testing/industrial-hazardous-waste-management` | L2 |
| `waste-management/scrap-processing` | Redirect candidate | `…/commercial-waste-and-recycling/recycling-and-material-recovery-services` | L3 |

Totals: **1 Owner, 32 Keep, 44 Redirect candidates** (22 with an L1 or L2 target that this build can
publish, 22 waiting for niche pages). Every redirect candidate needs G1 to G6. None executes in this
build, because no target has been live 28 days.

One taxonomy finding on the way through, for the operator rather than for routing:
`18.09.04 regulated-medical-waste-services` and `03.13.06 medical-waste-management` describe the same
buyer and are not one of the five declared overlaps. Not renamed, not canonicalised here (rule 6). A
candidate for v2.1's overlap list.

### 1.5 The other `/industries/*` URLs

| URL | This build | Later, and the rollback |
|---|---|---|
| `/industries/executive-search` | Keep. Not added to the sitemap: it is an indexable orphan, and the fix is an inbound link, not a sitemap row. It gains one inbound link from its ICP owner `professional-and-business-services/recruitment-rpo-and-executive-search` once that publishes | Redirect candidate to `…/recruitment-rpo-and-executive-search/executive-search-firms` (L3) under G1 to G6. Rollback as §1.4 |
| `/industries/manufacturing-industrial` and `/cnc-machining` (spine drafts) | Unchanged. Noindex, not in the sitemap | 301 to `manufacturing-and-industrial` and `…/precision-manufacturing-and-machining/cnc-machining-shops` when those publish. **Still an open operator decision from ADR-0008 §4.4.** Rollback: delete the two `next.config.mjs` entries |
| `/services/<service>/industries/<legacy>` (121) | Unchanged. **Never extended to the 21 ICP industries**: service x industry pages are the §11 anti-pattern. The combination is a link (the service block, §4), not a URL | GSC review under §7 as a group |

### 1.6 The `/growth` family and `B2B_PROOF_BY_PATH`

`/growth/industries/*` is a third industry tree in the sitemap: 8 sectors and 69 indexable niches,
signed by "Qognition editorial implementation review", which is not a named person. It is frozen by
ADR-0001 and stays frozen. What changes is ownership of the topic.

**Rule (niche-architecture assertion 17, restated for this build): no buyer is the primary topic of an
indexable page in both `/industries/*` and `/growth/industries/*`.** When an ICP page publishes over a
growth page's topic, the growth page becomes a consolidation candidate under the same G1 to G6 as §1.4,
with the ICP page as target. Until it executes, the growth page links to its ICP owner once, as legacy
pages do. No canonical tags across families: a cross-canonical between two different bodies is a hint
Google may ignore, and it is a canonical change that would need its own rollback for no gain.

| Growth sector | ICP owner |
|---|---|
| `/growth/industries/b2b-software` | `saas-and-software` |
| `/growth/industries/industrial-manufacturing` | `manufacturing-and-industrial` |
| `/growth/industries/professional-services` | `professional-and-business-services` |
| `/growth/industries/cybersecurity` | `technology-and-it-services` (managed security and consulting) |
| `/growth/industries/logistics-supply-chain` | `logistics-supply-chain-and-transportation` |
| `/growth/industries/compliance-risk-govtech` | no single owner (14, 04.13, 09.04). Keep |
| `/growth/industries/life-sciences-biotech` | `healthcare-and-life-sciences` |
| `/growth/industries/energy-mining` | `energy-and-utilities` |

The 69 growth niches are mapped one by one in the wave that publishes their owner, not here.

**`B2B_PROOF_BY_PATH` stays exactly as it is** for the ten growth paths, and
`scripts/check-industry-gate.cjs` keeps freezing it. It currently also asserts that no `/industries`
route renders a named B2B programme. That assertion is amended, not deleted: ICP pages get their own
hand-written, frozen map, `ICP_PROOF_BY_PATH`, and the gate asserts that a named programme renders on
exactly those paths and no others. HVAC and dental never appear in either map. Proposed entries,
mirroring the growth map's sector judgements so the same client is proof for the same buyer in both
families:

| ICP path (under `/industries/`) | Named programmes |
|---|---|
| `technology-and-it-services` | falcon-security, sophos, brixio |
| `technology-and-it-services/managed-security-services` | sophos, falcon-security |
| `technology-and-it-services/managed-security-services/mdr-providers` (L3, when published) | sophos |
| `technology-and-it-services/cybersecurity-consulting-and-testing` | falcon-security, brixio |
| `technology-and-it-services/cloud-consultancies` | brixio |
| `saas-and-software` | talentera, sophos |
| `saas-and-software/cybersecurity-saas` | sophos |
| `saas-and-software/hr-payroll-and-workforce-tech` | talentera |
| `saas-and-software/hr-payroll-and-workforce-tech/ats-and-recruiting-software` (L3) | talentera |
| `financial-services/commercial-insurance-carriers-and-distribution` | the insurance programmes, labelled targets until `actual` is filled |

Every other ICP page renders the existing fixed sentence ("We have not published a client programme in
this sector…") and the insurance programmes as method, which `IcpProofBlock` already does. Reviewer for
the map: Owen, plus the operator's written-permission record for the four named clients.

---

## 2. The `/industries` hub

### 2.1 Fixed, and not touched

| | Value | Source |
|---|---|---|
| URL | `/industries` | priority page #10 |
| Title | `B2B Industries We Serve: AI SEO, SEO & PPC \| Qognition` | `SEO_OVERRIDES['/industries']`, `lib/seo.ts:78` |
| Meta description | "AI SEO, GEO, SEO and PPC for B2B firms. Find your sector, from SaaS and IT services to manufacturing, testing labs and professional services." | same |
| H1 | "Industries We Serve" | `app/industries/page.tsx`, Theo copy v1 keeps it |

One observation for the operator, not a change: the memory file's target keyword for this page is
"digital marketing by industry", and it appears in neither the title nor the H1. The body may carry the
phrase once, naturally, in the first 100 words. Changing the title is the operator's call and outside
this spec.

### 2.2 Sections, in order

The light and dark rhythm is the design (§9). Labels are plain English and go to Ruth before wiring.

| # | Section, user-facing label | Surface | Content | Links |
|---|---|---|---|---|
| 1 | Hero. Badge "Industries", H1 fixed | light | Theo's approved sub-line, then a 40 to 60 word answer block (§6.1) that says what we do, for which buyers, and that a sector page is published only after review | none, or one "Book a call" button |
| 2 | "Find your industry" | light | The 21-card grid (§2.3) | up to 21, published industries only |
| 3 | "Find your sector" | light | The sector finder (§2.4) | published sub-industries only |
| 4 | "Where to start" | dark | Three journey doors (§2.5) | 4 |
| 5 | "Client programmes" | dark | Named B2B programmes and insurance (§2.6) | up to 5 |
| 6 | "What we do in every sector" | light | The five layers, one line each, defined exactly as CLAUDE.md §1 defines them | 5: SEO, Local SEO, AI SEO, GEO, PPC |
| 7 | "Questions buyers ask us" | light | 6 FAQs (§2.7) | 0 to 2 |
| 8 | Closing CTA, "Need a market-specific plan?" | dark | Theo v1 body. "Book a call" primary, "Send an enquiry" secondary, same tab | 2 |

Removed: the legacy 11-card grid (D2), the "Core Services Across Industries" chip list, which links all
eleven `SERVICES` including channels the operator no longer sells (section 6 replaces it), and the red
pain-point boxes.

### 2.3 The 21-industry grid

- **Order:** taxonomy id, `01` to `21`. Deterministic, operator-supplied, and it puts SaaS first.
- **Card:** `INDUSTRY_ICON[slug]` in an icon tile; display name; one authored sentence of at most 20
  words saying who buys and what they check first; three example sector names from that industry.
- **Photos:** the three `featured/*` photos head a featured row (SaaS, professional services,
  manufacturing). A photo on every card needs 17 more Pexels images under the existing rules: places,
  equipment and abstract scenes, never people in offices, no credit line.
  `[NEEDS DATA: 17 industry photos, if per-card photos are wanted. Elena briefs, fetch-case-study-images script fetches.]`
  The grid works with icons alone.
- **Linking:** a card is a link only when its industry is on `ICP_PUBLISHED`. Otherwise the name is
  text. This is the existing `publishedSectors.has()` guard and `check-icp.cjs` R5b counts it; keep both.
  Example sector names follow the same rule: a link when published, text when not.
- **Never printed:** counts of sub-industries, niches or sub-niches ("and 12 more" goes), priority
  bands, revenue floors, the industry `note` field (several carry dollar estimates the operator wrote
  for qualification, not for publication). Positioning v2.1: "explain the client's buying decision
  rather than exposing internal taxonomy counts, priority bands or revenue floors."

### 2.4 Sub-industry discovery: the sector finder

The hub links published sub-industries **directly**, not only through their industry page. That is
what keeps a sub-industry one click from `/industries` and a niche two (§4.4).

- Server-rendered HTML, grouped by industry, one `<details>` per industry. Links are in the DOM
  whether a group is open or closed, so crawlers and assistants see all of them without JavaScript.
- **Published sub-industries only.** An unpublished sector is not listed, not greyed out, not "coming
  soon". A list of things that do not exist is the `/locations/*` shape (niche-architecture rule 2).
  The industry cards already say where we sell.
- A filter box ("Type your sector") is a progressive enhancement over the rendered list. It filters
  what is on the page. It never loads hidden text and never imports the 2.2 MB taxonomy into a client
  component (ADR-0008 §5.2 item 3). Searching niche names is a later enhancement, from a small derived
  index fetched on focus, never rendered as hidden text.
- At full build this section carries up to 341 links. It is exempt from the 40-link ceiling in §4.2
  for one reason: it is the index the whole family hangs on, and capping it orphans the overflow.

### 2.5 Journey entry points

| Door, plain-English label | Stage | Target |
|---|---|---|
| "Learn how buyers choose suppliers now" | TOFU | `/insights` until each industry has its own published guide (D6) |
| "Check what AI tells your buyers about you" | MOFU | `/free-ai-audit` (Free AI visibility audit, no turnaround promise) |
| "See how we measure" | MOFU | `/case-studies/methodology` |
| "Talk to us" | BOFU | `/book` primary, `/contact#enquiry` secondary |

No door links a `/resources/b2b-search/*` page. Those are preview-only and noindex, and an indexable
page never links a noindex page (niche-architecture rule 13). CTA hrefs on indexable pages stay clean
(`/book`, not `/book?industry_id=…`). Taxonomy context for attribution travels with the click into
first-party storage, owned by Marcus and Mira, so 11,561 pages never mint parameter variants of `/book`.

### 2.6 What the hub says about case studies

- It shows the four named B2B programmes (Falcon Security, Brixio, Talentera, Sophos) as cards, each
  linking `/case-studies/<id>`, with `B2B_PROOF_LINE` as the source line, and one line linking the
  insurance programmes, labelled as targets.
- **HVAC and dental: nothing.** Not rendered, not mentioned, not counted, not linked by name. The hub
  prints **no programme count**, because the only sitewide count (49) includes consumer sectors, and
  a count on a B2B page reads as B2B proof. `/case-studies` stays reachable through the global nav.

### 2.7 FAQ

Six questions, answer first, 40 to 60 words each, one claim per answer. Theo writes, Ruth gates.
Proposed questions:

1. Do you work with firms in industries that are not listed here? (Yes. The list is where we write
   pages, not who we talk to. CLAUDE.md §2.)
2. Do I have to want AI search to work with you? (No. SEO, AI SEO or PPC alone qualifies.)
3. What is the difference between SEO, AI SEO and GEO? (The four-layer table, verbatim definitions.)
4. Can you guarantee ChatGPT or Google's AI recommends my firm? (No. We do not control those systems.)
5. How do you check what AI tells buyers about my firm? (Platform, date, question and answer, across
   ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews.)
6. Have you worked in my industry? (Where we have, the page names the client programme. A sector page
   on its own is not a claim of experience. CLAUDE.md §11.)

### 2.8 Hub schema

| Node | Content | Fixes |
|---|---|---|
| `CollectionPage` | `name` = the H1, `description` = the meta description verbatim, `url`, `publisher: { '@id': ORG_ID }`, `mainEntity` → the ItemList | today's `description` is the retired "AI growth marketing pages for SEO, PPC, web design…" string and contradicts the meta |
| `ItemList` | one `ListItem` per **published** industry: `position`, `name` (display name), `url` | none today |
| `BreadcrumbList` | Home → Industries | unchanged |
| `FAQPage` | the six visible FAQs, byte-identical to the rendered text | none today |

No `Service`, `Organization` duplicate, rating or review markup on the hub.

---

## 3. Page types by level

### 3.1 The two prompt families, one rule for every level

- **Family B** is the question our client's buyer asks ("best labs for EPA 1633 PFAS analysis with
  fast turnaround"). Supplied as `ai_prompts` (682, at sub-industry level) and, as Google demand,
  `ppc_keywords` (1,023). We run them, record the answers and publish the observation. **We can never be
  the cited answer to one.** They appear only inside the observation block and the "What your buyers
  type into Google" block, never in a title, H1, meta description, anchor or `primaryQuery`.
  `check-icp.cjs` R10 already enforces this for `ai_prompts` and `ppc_keywords`; extend it to anchors.
- **Family Q** is the question our buyer asks about their own visibility ("why doesn't ChatGPT
  recommend my environmental lab when consultants ask for EPA 1633 PFAS analysis?"). This is what a
  page targets: it becomes `buyerQuestion`, shapes the H1, and goes in our tracked prompt set from the
  day the page publishes, with a dated line recording the addition (§6.5).
- Per level: L1 has 2 head-shaped Family Q prompts. L2 has 3 shapes (absence, method, channel). L3 has
  one only if it is not a paraphrase of its parent's, and **no distinct Family Q means no page**. L4 has
  none, ever, and a level-4 page is justified only by its own Family B observation (§3.4).

### 3.2 Common to every ICP page

- **The body is authored, one file per entity** under `data/b2b/icp/authored/`. The template is the
  layout. The copy is never generated from it with a name swapped in.
- **Section order** follows `docs/copy/2026-10/plain-english-templates.md` §9 and maps to the journey:

| Stage | Sections, plain-English labels |
|---|---|
| TOFU: understand the problem | Hero with the answer-first opener (≤60 words, gated) and "Written for" line · "What your buyers ask AI" (dark, observation) · "Why firms like yours get left out" · "Who your buyers are" · "What they compare" · "Terms your buyers check" |
| MOFU: evaluate the work | "Pick the layer you need" (dark, five layer links) · "Facts, with sources" · "What your buyers type into Google" · "Client programmes" (dark) · "Questions buyers ask us" |
| BOFU: act | Closing CTA (dark): "Book a call", "Send an enquiry" · "Related pages" |

- Each level omits the slots it has no data for. An empty section is omitted, never filled
  (CLAUDE.md §4).
- **New on every page:** a visible line "Reviewed by <name>, <role>, on <date>. Last checked <date>."
  `reviewedBy` and `lastReviewed` in schema (§6.4). The name must match `/team`.
- **Never rendered:** `client_value`, `min_firm_size`, priority, fit, taxonomy counts, any blocklisted
  figure, any benchmark-derived number.

### 3.3 Level 1, industry (21) and level 2, sub-industry (341): this build

| | Level 1, industry | Level 2, sub-industry |
|---|---|---|
| **TOFU job** | How buyers in this industry shortlist suppliers now, and where AI answers enter that | What this sector's buyers ask AI and Google, what comes back, and why most firms in it are missing |
| **MOFU job** | Which of the five layers matters most in this industry, and how we check it | The comparison axes and terms buyers filter on, the layer order (fit-led), sourced facts, proof |
| **BOFU job** | Book a call; route to the right sector page | Book a call or send an enquiry |
| **Required sections** | Hero · "Why firms like yours get left out" · "Who your buyers are" · **"Sectors in <industry>"** (published children, lifted up the page because on a hub it is the main path down) · "Pick the layer you need" · Facts · Client programmes · FAQs · CTA · Related. **No vocabulary, no axes, by type.** Optional slot "What we observed across this industry", rendered only once 3 or more of its sub-industry panels exist, as a dated summary of those panels | All §3.2 sections. Vocabulary and axes required. "Sectors in <sub-industry>" lists niches as authored scope rows (one distinguishing sentence each), linking only published niches |
| **Taxonomy fields that feed it** | `name`; `note` as internal research input only, never rendered; `sub_industries` for children | `name`; `geo_angle` → "Why firms like yours get left out", rewritten, never verbatim in title, H1 or meta; `buyer_titles` → "Written for" (our buyer); `ai_prompts` → observation panel, composed with niche names to reach 8 prompts; `ppc_keywords` → "What your buyers type into Google" (their demand, never our target); `client_value` and `min_firm_size` → qualification only, never rendered; `niches` → scope rows and children |
| **Research each page needs** | `docs/icp-industries/NN-*.md` brief; Iris: 3 to 5 sourced industry-level facts (regulators, standards bodies, trade associations, government statistics, each with URL, publisher, access date, observed or reported); buyer roles; Marcus: whether paid demand exists at industry level | The brief section for that sub-industry; Iris: 5 sourced facts, 6 or more vocabulary terms with the issuing body, 3 buyer roles, 3 comparison axes; a Scriblr panel run (§3.5); Marcus: confirm `ppc_keywords` demand from a real source before the block renders a claim about it |
| **Minimum sourced facts** | ≥3 entity-specific (not on any sibling industry page), target 5 | ≥5, of which ≥2 are not true of the parent industry in general |
| **Other minimums** | ≥3 buyer roles · ≥3 FAQs · ≥600 words of prose excluding nav and boilerplate | ≥3 buyer roles, set not identical to any other page · ≥3 axes · ≥6 terms, ≥3 not on the parent page · ≥3 FAQs · ≥900 words of prose |
| **Uniqueness (§7)** | 5-word shingle Jaccard, entity name substituted out, **< 0.60 against every page in the family** (≥40% unique, the existing `check-icp.cjs` gate) | < 0.60 against every page in the family, **and < 0.40 against its parent industry** |
| **Observation** | none of its own; aggregate slot as above | **Required to publish (D5):** ≥8 distinct prompts, ≥3 engines, every answer stored with engine, model version, date ≤90 days old |
| **Family Q** | 2 head prompts, e.g. "which agencies do AI search optimisation for <industry> companies?" | 3 shapes; the absence or method shape becomes `buyerQuestion` |
| **Publishes when** | in the same commit as its first sub-industries, last in that commit's order (niche-architecture §1.7.5) | its industry page is published or publishing in the same commit |

The 28 sub-industries with no priority-A niche get pages too (the operator said 341), and go last
within their industry.

### 3.4 Level 3, niche (2,376) and level 4, sub-niche (8,823): slots, specified now

These are not built in this phase. The slots are specified so this build needs no rework.

**What exists in the data:** a niche is `id, slug, name, fit, priority, sub_niches`. A sub-niche is
`id, slug, name`. Nothing else. Every page at these levels is built from research, not from the file.

| | Level 3, niche | Level 4, sub-niche |
|---|---|---|
| **Default state** | A scope row on its sub-industry page: name plus one authored distinguishing sentence | A section on its niche page: `<h3 id="<slug>">`, its name, and its authored content. Addressable as `…/<niche>#<slug>`. Before its niche has a page, it is named inside the niche's scope row on the sub-industry page |
| **Becomes a page when** | It passes the four-test screen: distinct buyer, distinct Family Q prompt, distinct comparison axes, distinct observation (niche-architecture §1.7.1), with a committed screen record | It passes all six gates L4-1 to L4-6 (niche-architecture §1.7.2.2), with a committed screen record. **And not before an external, dated prompt-capture source exists** (L4-6), because a leaf has no supplied prompts |
| **PPC-fit** | 190 niches. Never an organic page. Served by `/services/ppc`, the sub-industry's paid block and noindex `/lp/*` destinations | inherits |
| **TOFU / MOFU / BOFU** | TOFU and MOFU sections on the page; BOFU CTA | Same. A sub-niche is a capability of a firm already identified at L3, so it is an observation and coverage asset, not a new door into the funnel |
| **Research each page needs** | Buyer roles from trade bodies and job postings; vocabulary and standards from primary issuers; comparison axes from RFQ/RFP templates and procurement guides; ≥4 sourced facts; Family B prompts (supplied prompt composed with the niche name, plus external capture); a Scriblr panel; a distinct Family Q prompt; the cited-domain landscape from the panel; Marcus on paid demand | Everything L3 needs, at leaf level, plus a discriminating standard (≥3 terms not on parent or siblings) and a discriminating buyer role |
| **Minimums** | ≥4 sourced facts, ≥2 not on parent · ≥6 terms, ≥3 not on parent or siblings · ≥3 buyer roles, ≥1 not on parent · ≥3 axes distinct from parent · ≥3 FAQs · ≥900 words, ≥600 not on parent · shingle < 0.60 family-wide · own panel with cited-domain Jaccard vs parent ≤ 0.60 | ≥3 sourced facts, all not on parent · ≥900 words, ≥700 not on parent · shingle < 0.45 against parent and each published sibling · own panel ≥8 prompts, ≥3 engines, cited-domain Jaccard vs parent ≤ 0.60 · removing its prompts leaves the parent's panel ≥8 |
| **Family Q** | One, distinct, or no page | None |
| **Rule-7 overlaps** | A duplicate path renders a pointer and canonicals to the canonical path (existing). **The overlap does not cascade to its children** (positioning v2.1): each sub-niche resolves from its own id | resolves from its own id |

**The journey contract for all 8,823 leaves (ADR-0010).** Every leaf keeps its journey record. What
changes is where its BOFU link points: today `lib/nicheJourneys.ts` sets `bofu.href` to the four-level
path unconditionally, which is a 404 for every unpublished leaf. The rule becomes **nearest published
address**: its own page, else `<niche page>#<slug>`, else `<sub-industry page>#<niche-slug>`. TOFU and
MOFU are shared at the level where the buying task is genuinely shared (positioning v2.1: "shared
assets require real relevance").

**The two sub-niche pages already published** (TIC, 2026-09-29) predate any stored observation run, so
neither has passed L4-1. Both are re-screened at the TIC branch's 90-day gate (not before 2026-12-28).
A failure means GSC first, then a 301 to the niche page, never a quiet 404. Rollback: re-add the path
to `ICP_PUBLISHED`.

### 3.5 The observation block, because nothing on these pages is citable without it

Sourced third-party facts make a page accurate. They do not make it the source a model cites, because
the regulator is the source. The only original data these pages can own is the dated record of what the
engines said. **Zero runs are stored today, including for the eight published TIC pages.** Requiring
it at L2 (D5) means Scriblr runs ≥8 prompts on ≥3 engines per sub-industry before publication and
monthly after, with raw answers, cited URLs and model versions committed to
`data/b2b/observations/`. `[NEEDS DATA: Scriblr panel runs for each sub-industry, stored in the repo.]`

---

## 4. The internal-link graph

### 4.1 Link classes

| Class | Source | Where | Direction |
|---|---|---|---|
| Breadcrumb | the path | every page | up |
| Body parent link | the path | every page, in the first 200 words, anchor = parent's display name | up |
| Children | the entity's own array, **published only** | L0, L1, L2, L3 | down |
| Siblings | same parent, published, sorted by slug, capped at 5 | L1 to L4 | across |
| Hub finder | published sub-industries | L0 only | down, skips a level |
| Cross-tree | the 5 `overlaps` and the 13 `dedupe_log` rows (11 of 18 resolve today) | where declared, ≤2 per page | across trees |
| Service block | fixed: `/services/seo`, `/services/seo/local-seo`, `/services/ai-seo`, `/services/ai-seo/generative-engine-optimization`, `/services/ppc` | every page | out |
| Proof | `ICP_PROOF_BY_PATH` named programmes; insurance programmes; `/case-studies/methodology` | every page | out |
| Journey | `/free-ai-audit`, `/book`, `/contact#enquiry` | every page | out |
| Legacy and growth owner links | `LEGACY_ICP_OWNER`, the growth map in §1.6 | on legacy and growth pages, pointing in | in |
| Case-study back-links | B2B case-study pages → their ICP sector pages, ≤2 each | `/case-studies/<id>` | in |
| Service pages | each layer page links `/industries` once in body, plus up to 3 hand-picked published industry pages | `/services/*` | in |
| Location | `/industries` links the markets overview once. **No generated industry x location links anywhere.** A location link on an ICP page only where the authored body states a sourced market-specific fact, ≤2 | L0; rare | out |

`SERVICE_LINKS` in `lib/b2b/graph.ts` has no PPC entry today. Add `/services/ppc`. B2B PPC is a real
service (§1) and the fit-led order on a PPC-led sub-industry has nothing to point at without it. The
targets are the priority service URLs, not the `/seo` style routes CLAUDE.md §5 lists.

Not used, and not to be added: similarity joins on buyer titles or standards, "related industries"
computed from anything, `relatedTerms`-style positional selection. The taxonomy is the graph (ADR-0008
§7.2).

### 4.2 Bounds per page

In-content internal links, excluding the header, footer and same-page `#fragment` links.

| Page | Min | Max at full build | Ceiling |
|---|---:|---:|---|
| `/industries` | 30 | ~380 (21 cards + up to 341 finder + doors, proof, layers, CTA) | exempt, it is the index (§2.4) |
| L1 industry | 12 | ~38 (2 up, ≤21 children, 3–5 siblings, 5 layers, ≤3 proof, 3 journey) | 40 |
| L2 sub-industry | 12 | ~33 (2 up, ≤10 children, 3–5 siblings, ≤2 cross, 5 layers, ≤3 proof, 3 journey) | 40 |
| L3 niche | 12 | ~33 | 40 |
| L4 sub-niche | 12 | ~23 | 40 |

The minimum of 12 is what the fixed blocks produce on their own (2 up, 3 siblings, 5 layers, methodology
and booking). A page below it is missing a fixed block, and the gate names it.

### 4.3 Anchor rules

1. Up, child and sibling anchors are the entity's display name, verbatim. No keyword-stuffed variants.
2. In-body contextual links vary by a stable hash of the **slug** across three plain-English patterns:
   "<name>", "<name> buyers", "<name> in AI answers". Never `index % 3`.
3. Service block anchors are the layer names, exactly: SEO, Local SEO, AI SEO, GEO, PPC.
4. No Family B string (`ai_prompts`, `ppc_keywords`) is ever an anchor.
5. None of the five agency head terms (`b2b marketing agency`, `b2b seo agency`, `abm agency`,
   `franchise marketing agency`, `franchise development marketing`) is ever an anchor or a target on an
   ICP page.
6. No "click here", "learn more" or "read more" as a whole anchor.
7. A name is never a link to a page that does not exist. A `#fragment` link only points at a section on
   the page the reader is on.

### 4.4 Reachability, and no orphans

`/industries` is in the global nav, so it is one click from every page.

| Level | Clicks from `/industries` | Clicks from `/` | Path |
|---|---:|---:|---|
| L1 industry | 1 | 2 | grid |
| L2 sub-industry | 1 | 2 | finder; 2 via its industry |
| L3 niche | 2 | 3 | finder → sub-industry |
| L4 sub-niche page | 3 | 4 | finder → sub-industry → niche |

Asserted, not assumed. `scripts/check-icp.cjs` R3 already walks from `/industries`; it is extended to:

1. walk the **rendered** link graph, including the finder, from `/industries`;
2. require every published ICP page to be reachable within the click counts above;
3. require ≥2 inbound in-content links from published indexable pages (parent plus finder or sibling or
   case study);
4. fail on any in-content link from a published page to an unpublished ICP path or to a noindex URL.

Build-order corollary: a page may not publish before its parent is published or publishing in the
same commit. Legacy pages are not orphaned by D2: sub-pages keep their legacy hub, hubs keep
`CrossLinks`, and the owner links add inbound edges rather than remove any.

---

## 5. Indexation and sitemap

### 5.1 How a page enters the index

A path enters `generateStaticParams`, the sitemap, llms.txt and agent markdown in one move: being added
to `ICP_PUBLISHED` with an `IcpReview`, in the same commit as its authored body. Nothing else
publishes anything. Draft and spine paths 404 under `dynamicParams = false` and never appear in a
sitemap (existing behaviour, keep it).

Per page, before `ICP_PUBLISHED`, CLAUDE.md §7 mapped to gates:

| §7 requirement | Gate |
|---|---|
| Answers one buyer question no other indexable page answers | distinct Family Q `buyerQuestion`, asserted unique across the family |
| ≥3 entity-specific facts not derivable by substitution | `facts` tuple ≥3, each with a third-party `SourceRef`; L2 needs ≥5, ≥2 not true of the parent |
| ≥40% unique against its closest sibling | shingle Jaccard < 0.60 (existing), plus the parent bounds in §3 |
| Named reviewer and review date | `IcpSignOff` literal type plus runtime re-assertion (existing) |
| Cites real evidence | sourced facts plus, at L2 and below, a stored observation run (D5) |

### 5.2 The 362, and what has to change in the gates

| Gate change | File | Per wave |
|---|---|---|
| Add the wave's paths with one review record | `lib/b2b/icpPublication.ts` `ICP_PUBLISHED` | yes |
| Declare the wave unit | `ICP_PUBLISHED_COHORTS`, amended to accept an **industry wave**: `'<industry>'` covering the industry page plus its sub-industries | yes |
| Raise the published ceiling by exactly the wave's page count, equality not `<=` | `scripts/check-icp.cjs` | yes |
| Raise the sitemap total by exactly the wave's page count | `scripts/check-industry-gate.cjs` (4,434 today) | yes |
| Wave size: amend R4d from "≤2 cohorts, ≤25 pages" to "≤1 industry wave (≤22 pages) or ≤2 niche cohorts (≤25 pages)" | `scripts/check-icp.cjs` | once, Kyle and Owen |
| Name the reviewer in the commit message | git | yes |
| Add `ICP_PROOF_BY_PATH` and amend the "no named programme on `/industries`" assertion | `data/case-studies`, `scripts/check-industry-gate.cjs` | once, Owen |
| Add `/services/ppc` to `SERVICE_LINKS` | `lib/b2b/graph.ts` | once |
| Extend R3 reachability as §4.4 | `scripts/check-icp.cjs` | once |
| Legacy allowlist and `EXPECTED_INDUSTRIES = 11` / `EXPECTED_SUB_INDUSTRIES = 66` | unchanged in this build | only when a redirect executes |

**Wave order and the 90-day rule.** CLAUDE.md §7 says a branch expands only when ≥90 days have passed
since its last wave and its pages pass the impression, ranking and position tests. This spec defines a
branch as **one industry**. So each of the 20 unpublished industries can have one first wave (industry
page plus sub-industries) now. TIC cannot add pages before 2026-12-28, and only if its eight pass.
Niche pages in any industry wait 90 days after that industry's first wave and need its tests to pass.
Test 5 (indexable pages ÷ organic sessions) cannot be checked:
`[NEEDS DATA: the agreed ratio]`.

Recommended first waves, by evidence a reader can check, not by size: **09 Technology & IT Services**
and **01 SaaS & Software** (the four named B2B programmes are proof there), **04 Financial Services**
(commercial insurance, the uncontested vertical; blocked on D1), **05 Manufacturing & Industrial**
(deepest research file and an existing authored body), then the rest in taxonomy order. The operator
sets the order (`[NEEDS DATA: operator build order]`, open since ADR-0008 §6.5).

**No date is attached to any of this.** The rate is set by research, panel runs and one reviewer's
sign-off capacity (D4), and the §7 tests decide whether each branch keeps growing.

### 5.3 Then the 11,561

- L3 and L4 enter only through their screens (§3.4). Expect a minority to pass; niche-architecture
  §1.7.6 estimates roughly 1,200 to 1,500 pages across all four levels, and labels that an estimate.
- When L3 begins, split the sitemap family into `industries` (legacy, L1, L2) and `industries-deep`
  (L3, L4), so GSC's Page indexing report gives indexation per level. At 11,561 the family is 2.88 MB,
  inside the protocol limits (ADR-0008 §5.1).
- `lastmod` is the review date or the body's last edit, never the build date.
- `[NEEDS DATA: Vercel build wall-clock, baseline and per-wave delta]`. ADR-0008 §5.3's fallback
  ladder (level 4 dynamic first, levels 1 and 2 never) applies unchanged.

### 5.4 Submission

Sitemap index in GSC (exists) and in Bing Webmaster Tools. Bing's index feeds ChatGPT search and
Copilot, so it matters for GEO in a way it never did for classic SEO. IndexNow on publish is a
cheap addition for Bing and is not built today (Jonas). `[NEEDS DATA: whether Bing Webmaster Tools is
verified for qognitionagency.com.]`

### 5.5 llms.txt and agent markdown

| Surface | Today | Spec |
|---|---|---|
| `llms.txt` | "Industry pages" lists every `ICP_PUBLISHED` record | List `/industries` and published **industry** pages only, one line each: display name and meta description. At 362 a full list stops being a summary |
| `llms-full.txt` | same list | Published industry and sub-industry pages with their answer-first opener. L3 when published. Never L4 |
| Agent markdown (`Accept: text/markdown`) | **no `/industries` handler. Any path returns the generic site block with HTTP 200, including paths that 404 in HTML** | Add handlers: `/industries` renders the published industry list; a published ICP page renders H1, opener, buyers, facts with source and access date, the observation table with engine, date and prompt, FAQs, canonical and "last reviewed". Legacy hubs render their own H1 and description. **Any path that 404s in HTML returns 404 in markdown** |

The last row is a sitewide defect, not only an industries one: an assistant fetching a mistyped
`/industries/...` path gets a 200 with our company description, which is a soft 404 served to the
exact crawlers this programme is for.

---

## 6. AI SEO and GEO specifics

Ranking (Google results and AI Overviews/AI Mode) and citation (ChatGPT, Perplexity, Gemini, Claude,
Copilot) are different wins and are reported under separate headings (§6.5). The page work below
serves both, in this order. Skipping to citation-worthiness on a page nothing can extract from is
wasted work.

### 6.1 Extractability: answer-ready blocks

- The opener answers the page's Family Q question in ≤60 words (gated), self-contained, no pronoun
  that needs the H1 to make sense.
- H2s are the questions a buyer would ask where that reads naturally ("Why firms like yours get left
  out"), and the first sentence under each answers it.
- One claim per paragraph. No claim that needs three paragraphs of context.
- Tabular data in `<table>`: comparison axes, vocabulary (term, issuing body, what it gates), and the
  observation (prompt, engine, date, firms named, URLs cited).
- Every block server-rendered. Nothing behind a tab, accordion or client fetch except the hub filter,
  which only filters links already in the HTML.
- No `nosnippet`, `data-nosnippet` or `max-snippet` restrictions on these pages. AI Overviews and AI
  Mode draw on the normal index and snippet eligibility; there is no special markup for them
  ([Google, AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)).

### 6.2 Entity consistency

| Entity | Rule | Defect today |
|---|---|---|
| The agency | `Qognition Agency`, `@id` `${SITE_URL}/#organization`, via `orgRef()` on every node | `icpSchema` emits an inline `{ name: 'Qognition' }` with no `@id` on every ICP page. That is a second organisation to a parser, and "Qognition" alone collides with Qognition Labs. Use `orgRef()` |
| Industry and sector names | One display function, the same string in card, H1, breadcrumb, schema, llms.txt and agent markdown | none found |
| Standards and credentials | Spelled as the issuer spells them (`AS9100D`, `ISO/IEC 17025`, `IATF 16949`). Edition year only when sourced | none found |
| Offices | Only `OFFICES_SENTENCE`. Industry pages make no location claim | none found |
| Reviewer | Same name and role as `/team` | none found |
| Organization `knowsAbout` | Never lists the 21 industries. A schema claim of expertise in every sector is flattering, not true | none found |
| Salt Accounting Group | No `subOrganization` or `parentOrganization` edge, ever (standing decision) | none found |

### 6.3 Citation-worthiness: citable facts per page

| Level | Citable facts required | What counts |
|---|---|---|
| L1 | ≥3, target 5 | A regulatory instrument, standard or registry with its issuing body and access date; a government or trade-body statistic with its date |
| L2 | ≥5, plus the observation | as above, plus our dated panel record |
| L3 | ≥4, plus its own observation | as above |
| L4 | ≥3, plus its own observation | as above |

What does not count: vendor-blog statistics, anything from the CLAUDE.md §1 blocklist, the taxonomy's
`client_value` or `min_firm_size`, a benchmark presented as a result, any count of our own taxonomy.
Every claim is dated on the page. "We asked ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews
eight questions on 14 October 2026" is citable. "AI is changing B2B buying" is not.

### 6.4 Schema, per level

Mark up what is true. Nothing here makes a page appear in an AI answer; it makes the page unambiguous.

| Node | L1 | L2 to L4 | Notes |
|---|---|---|---|
| `WebPage` (L1: `CollectionPage`) | yes | yes | `lastReviewed`, `reviewedBy` (Person, name as on `/team`), `publisher: orgRef()` |
| `BreadcrumbList` | yes | yes | existing `icpSchema`, unchanged |
| `Service` | yes | yes | `provider: orgRef()`, `audience: { '@type': 'BusinessAudience', name: <display name> }`, `serviceType` the layers the page actually sells |
| `FAQPage` | yes | yes | byte-identical to the visible FAQs. Google limited FAQ rich results to well-known government and health sites in 2023 ([Google](https://developers.google.com/search/blog/2023/08/howto-faq-changes)), so expect **no rich result**. The value is clean question-and-answer pairs for parsers |
| `ItemList` | children | children | published children only |
| Never | | | `AggregateRating`, `Review`, `LocalBusiness`, `HowTo`, a `Dataset` for the observation, `knowsAbout` lists |

### 6.5 Measurement, reported separately

**Ranking.** GSC Performance per sitemap family and per level: impressions, clicks, average position
for each page's Family Q queries, indexation from the Page indexing report. These feed the §7 wave
tests. No ranking target is set or promised.

**Citation.** Our own tracked prompt set: the 2 Family Q prompts per industry and 3 per sub-industry,
added **from the month each page publishes**, each addition recorded with date and reason, re-run
monthly with the same prompts so months compare. Appended to
`~/qognition-ops/clients/qognition-agency/deliverables/geo-citations.md`, which **does not exist yet**:
`[NEEDS DATA: the baseline Qognition prompt set and its first run]`. The Family B panels on the pages
are page content, not our citation metric. A page that ranks third is not a page that is cited; the two
are never added together.

---

## 7. Risks

| Risk | How it would happen here | How this spec prevents it |
|---|---|---|
| **Scaled content abuse** ([Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content)) | 341 pages from one layout, filled by swapping the sub-industry name and its supplied fields | One authored body per entity; shingle gate < 0.60 family-wide and < 0.40 against the parent; 12-word boilerplate ceiling (existing); ≥5 sourced facts; a stored observation at L2. A page that cannot pass these does not publish, and the screen is not lowered to make it pass |
| Doorway pattern | Niche and sub-niche pages differing only by name | L3 and L4 are slots with screens; default is a section with an anchor; no Family Q means no page |
| Cannibalisation | Legacy, ICP and `/growth` pages on the same buyer | One owner per buyer (§1.4, §1.6); owner links point at the ICP page; consolidation only on G1 to G6 |
| A weak domain absorbing more pages | 683 URLs not indexed and 632 `/locations/*` pages at 0.13 clicks each per quarter | Industry waves, the 90-day rule per branch, the kill rule, and sitemap split by level so indexation is visible |
| Review becomes attribution | One literal sign-off for 359 more pages, and the 2026-09-29 harness incident | Per-page review record, sign-off type plus runtime assertion (existing); D4 on capacity |
| Pages with no original data | 0 observation runs stored | D5: no L2 page without a stored panel run |
| Entity contradiction | Inline "Qognition" provider; stale hub schema description; financial-services name collision | §6.2 fixes; D1 |
| Family B leaking into targets | A supplied prompt or keyword becomes a title, H1 or anchor | R10 extended to anchors (§3.1) |
| Prompt supply at level 4 | A leaf has no supplied prompts, so its panel would be invented | L4 blocked until an external, dated capture source exists |
| Crawl depth | Niche at depth 3 and sub-niche at 4 from `/` | Finder links L2 from the hub; reachability walk asserts click counts |
| Build time | 362 then up to ~1,500 prerendered pages | ADR-0008 §5.3 ladder; per-wave build delta recorded |

**Rollback triggers** (ADR-0008 §12, unchanged): a manual action on `/industries/*`; the group's median
position degrading over two consecutive 28-day periods after a wave; any published number without a
`SourceRef`; any change to the legacy page register. The first two revert the most recent wave. The
third demotes the page to draft at once. The fourth blocks the merge.

**Rollback, by change**

| Change | Rollback |
|---|---|
| An industry wave | `git revert` of that commit. Pages leave params, sitemap, llms.txt and agent markdown on the next deploy. Live under 90 days and absent from the legacy baseline, so no redirect |
| Hub rebuild (D2) | Revert the hub commit. The legacy grid component is retained until the first redirect executes |
| Financial-services owner swap (D1, option B) | Revert one commit; legacy body returns at the same URL. No redirect existed |
| Owner links on legacy and growth pages | Delete the block. Additions only |
| Any executed redirect | Delete the `next.config.mjs` entry; legacy row and component retained 180 days |
| `ICP_PROOF_BY_PATH` | Revert; the gate's original "no named programme on `/industries`" assertion returns with it |
| Agent-markdown handlers | Revert the route file; the generic fallback returns |

---

## 8. Decisions for the operator

| # | Decision | Recommendation |
|---|---|---|
| D1 | Who owns `/industries/financial-services` | ICP industry 04 takes the URL (option B), after GSC is pulled for it. Title, meta and H1 of that URL change |
| D2 | Remove the legacy 11-card grid from `/industries`, and add one owner link on each mapped legacy page | Yes. Legacy pages stay live and linked; nothing redirects |
| D3 | Wave unit and order for the 362 | One industry per wave (industry page plus its sub-industries, ≤22 pages). Order: 09, 01, 04, 05, then taxonomy order |
| D4 | Sign-off capacity | Prabal is the only permitted reviewer, for 359 more pages (20 industry and 339 sub-industry pages). Name a second reviewer in `IcpSignOff`, or accept that his calendar sets the pace. Also: may the reviewer's name show on the page |
| D5 | Stored Scriblr panel required before an L2 page publishes | Yes. Without it no page in the family carries original data |
| D6 | TOFU and MOFU assets | 21 industry-level guides plus shared MOFU (audit, methodology, layer pages). The 682 templated `/resources/b2b-search` pages stay preview-only and noindex |
| D7 | Niche and sub-niche pages publish only through their screens; everything else is an anchored section | Yes. This is what "no thin template" means at 11,561 |

Still open from ADR-0008 §4.4: the 301s for the two noindex spine drafts.

## 9. NEEDS DATA

- GSC, 16 months, per URL: `/industries/financial-services` first (D1), then the 76 other legacy
  `/industries/*` URLs, `/industries/executive-search`, the 78 `/growth/industries/*` URLs and the 121
  `/services/*/industries/*` URLs. Performance with queries, URL Inspection, Links report.
- Backlink export for the same URLs.
- GA4 landing-page conversions (`contact_submitted`, `walkthrough_booked`) for the same URLs.
- Scriblr panel runs per sub-industry, stored in `data/b2b/observations/` (0 today).
- The operator's build order for the 21 industries and 341 sub-industries.
- The agreed indexable-pages ÷ organic-sessions ratio (§7 test 5).
- 17 industry photos, if per-card photos are wanted.
- An external, dated prompt-capture source and method (blocks every L4 page).
- Dotted ids for the 7 `dedupe_log` rows that do not resolve.
- Vercel build wall-clock, baseline and per-wave delta.
- Bing Webmaster Tools verification status.
- The baseline Qognition Family Q prompt set and its first run (`geo-citations.md` does not exist).
- Demand data for `ppc_keywords` from a real source before any page states paid demand (Marcus).
