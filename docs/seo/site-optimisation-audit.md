# Site-wide technical and AI-search audit

Author: Nadia (search).
**Revision 1, 2026-09-29.** Branch `b2b-ai-search`, HEAD `fbf62aa`.

Status: **recommendation, not approved.** Not reviewed by Ruth (brand-guard). Two findings in §4 and
§7.2 are claim-bearing and must reach her before anything is changed on those templates.

Scope: the whole site as it exists on this commit — 17 sitemap families, 4,422 URLs — not the B2B
niche programme, which is `docs/seo/b2b-niche-architecture.md`. Where the two meet, this document
names the dependency and that document owns the decision.

**Constraints honoured.** Rule 5: nothing here expands, deletes, redirects or noindexes a city page,
a location page or a glossary location term. No search volume, difficulty, ranking or traffic figure
is estimated. Ranking and citation are reported under separate headings and never merged.

---

## 0. How to read this

**Measured** means I ran it against this commit and the number is reproducible from the command in the
row. **Judged** means I reasoned from query shape, buyer structure or documented platform behaviour
and no measurement exists in this repo. Every number below is one or the other and says which.

Everything in §1–§6 was measured against a `next build` output dated 2026-09-29 12:07 and a `next
start` server on that build, at HEAD `fbf62aa`. Nothing in this document was measured against
production. Production may differ, and where that matters I have said so. Read §0.1 before acting on
any of it.

### 0.1 A currency warning, and one thing found while checking it

Everything below was measured at HEAD `fbf62aa` against the build of 2026-09-29 12:07. **While this
audit was being written the tree moved**, and by the time the gates were re-run at 12:35 the working
tree carried two further commits (`244b2ee`, `d26f0bb`) and a large body of uncommitted ICP work:
`components/b2b/IcpNichePage.tsx`, `components/b2b/IcpSubNichePage.tsx`, routes at
`app/industries/[industry]/[subIndustry]/[niche]/[subNiche]/`, `lib/b2b/icpPublication.ts`,
`lib/b2b/promptPanel.ts` and a `check-icp.cjs` grown from 105 lines to 471.

Every measurement below still describes the committed state at `fbf62aa`. Anyone reading this after
that work lands should re-run the commands in §0.2 before acting on §2, §3 or §6.

**One observation from that tree that does not wait for a re-run.** `lib/b2b/icpPublication.ts` stages
**65 ICP pages as published** — 4 industries, 24 sub-industries, 17 niches and **20 sub-niches** —
every one of them carrying:

```ts
const R = { reviewedBy: 'Nadia (search)', reviewedAt: '2026-09-29' };
```

**I have not reviewed any of those 65 pages.** `b2b-niche-architecture.md` §8.2 assertion 1 requires
`reviewedBy` to be a real name from an allowlist precisely so that an unreviewed page cannot reach
`published`; a literal that names a reviewer who did not review bypasses the assertion rather than
satisfying it. Three further things about that set, stated as facts rather than as a verdict on
work that is still in progress:

- 65 pages is 2.6× ADR-0007 §7's ≤25-page wave ceiling, which `b2b-niche-architecture.md` §1.6 adopts
  as the gate cohort size.
- The cohort is `manufacturing-and-industrial` and three others. §1.6's Wave 1 is five sub-industries
  in `technology-and-it-services` and `saas-and-software` — the only cohort on the domain with reported
  work behind it, and the one whose pre-registered arm split exists to settle §1.7.
- The 20 level-4 bodies in `data/b2b/icp/bodies.ts` read
  `"[COPY NEEDED] the one fact that separates … from the other scopes under this niche."`

This is uncommitted and may be mid-build. It is recorded here because a reviewer attribution is the
one thing that cannot be fixed later by finishing the copy.

### 0.2 Method

| What | How — reproduce with |
|---|---|
| URL inventory | `routesForSitemap()` over `sitemapIndexes`, the same path `pnpm gates` uses |
| Render behaviour | `.next/prerender-manifest.json`, plus response headers from `next start` |
| Payload | `.next/diagnostics/route-bundle-stats.json`, gzipped on disk |
| Link graph | breadth-first crawl of the running build from `/`, depth 4, 847 pages fetched, 1,522 URLs discovered |
| Schema | JSON-LD parsed out of the served HTML, per template |
| Text | tags stripped from served HTML, script and style blocks removed first |

---

## 1. Findings, ranked by effect on qualified traffic

Ranked on what moves booked calls, which on this domain means: get the pages that can convert crawled
and rendered cheaply, then get them linked, then get them extractable. Cosmetic schema work is at the
bottom because it is worth roughly what it costs.

| # | Finding | Evidence | Effect | Risk of the fix |
|---|---|---|---|---|
| 0 | **65 ICP pages are staged as `published` in the uncommitted tree, all attributed to a reviewer who did not review them, 20 of them with `[COPY NEEDED]` bodies** | Observed 12:35, §0.1 | §8.2 assertion 1 is the assertion that stops unreviewed work publishing, and this routes around it | Low — remove the names, or review the pages. It is uncommitted |
| 1 | **4,388 of 4,422 URLs are dynamically rendered and served `Cache-Control: private, no-cache, no-store`.** One line causes it | Measured, §6.1 | Every crawl of every URL is a cold origin render. On a domain with 683 URLs already not indexed, crawl cost is the binding constraint on indexation | Medium. Route-group change, no URL changes. Rollback §9.1 |
| 2 | **The `/industries` ICP entry link ships 20 links to hard 404s and one to the wrong taxonomy** | Measured, §2.4 | The crawl anchor for the entire 11,561-entity programme currently teaches Googlebot that 95% of that section is dead | Low. Gate the link on published state. Rollback §9.2 |
| 3 | **1,035 URLs are orphaned or one link from orphaned** — `/directory/*` (1,008) sits at depth 4 behind a single inbound link; `/languages/*` (8) and `/global/*` (19) have zero inbound links anywhere in the codebase | Measured, §3.2 | 23% of the index cannot receive crawl priority or internal equity | Low for the link fix. Pruning is a separate decision and is blocked on the backlink export |
| 4 | **The HTML sitemap at `/sitemap` links to 60 URLs.** It is linked from the global footer on all 4,422 pages, so it is the highest-inbound distribution point on the domain and it distributes nothing | Measured, §3.3 | The one zero-risk lever for reaching the deep families is switched off | Low. Adds links only. Touches no URL, canonical, redirect or robots directive |
| 5 | **Ten machine-translated locale homepages receive ~804 sitewide internal links each** (~8,040 links into 50 URLs) while `/directory` receives 1 | Measured, §3.1 | The site's internal equity is concentrated on its thinnest family | Low, and it is a decision not a bug. §3.1 |
| 6 | **320 glossary URLs share exactly one 39-word sentence template.** After removing the term name, 320 definitions collapse to **1** distinct string | Measured, §7.1 | This is the family with the best measured clicks-per-page on the domain (0.25/quarter) and the domain's former best-ranking URL. It is the highest-return content fix available | Low. Additive. No URL touched |
| 7 | **1,000 `/directory/*` pages emit `Product` + `Brand` + `Review` JSON-LD for products that do not exist** — `Product.name` and `brand.name` are both "Figma for cold outreach" | Measured, §4.3 | Misleading structured data at 1,000× scale, on the domain of a company selling entity optimisation. Also an FTC-substantiation exposure on the `reviewBody` | Low technically. **Route to Ruth before changing the copy** |
| 8 | **`/agent-markdown` returns a generic 11-line stub for ~4,300 of 4,422 URLs, each asserting `Canonical: <that URL>`** | Measured, §7.4 | An agent that content-negotiates markdown gets a document claiming to be the canonical representation of a page whose content it does not contain | Low. Fall through to 404 rather than to a stub |
| 9 | **`lastmod` is present on 230 of 4,422 sitemap entries (5.2%); no page outside `/legal/*` renders a visible last-updated date** | Measured, §7.3 | Freshness is one of the few citation factors with a measured mechanism. It is absent from 99.4% of the domain in-page | Low, **but only where a real change date exists.** A build-date `lastmod` is worse than none |
| 10 | **`Organization.name` is emitted as "Qognition" in ~40 places and "Qognition Agency" in the insights family; `og:site_name` takes three different values; no `Organization` node carries an `@id`, and `/insights/*` references an `@id` that resolves to nothing** | Measured, §7.2 | Entity resolution across assistants runs on exactly this. It is also the thing the company sells | Low. One constant, one `@id` |
| 11 | **The blast-radius greps in `check-b2b.cjs` point at `data/navigation.ts`, which is dead code.** The live header is `components/shared/Navigation.tsx` and is in no gate. `app/industries/page.tsx` now imports the ICP spine and is in no gate | Measured, §2.5 | Fourth instance of "an enumeration of consumers, written by careful people, was wrong" | Low |
| 12 | **1,234 of 2,040 `/locations/<city>/<service>` descriptions exceed 160 characters and every one is one of six sentence templates with a place name substituted** | Measured, §2.3 | This is the 0.13-clicks-per-page signature, visible in the metadata | **Rule 5 applies.** Do not prune. §2.3 states what is and is not permitted |
| 13 | **`FAQPage` JSON-LD is emitted on roughly 3,500 URLs and produces nothing** | Measured, §4.2 | Inert, not harmful. Established in `b2b-niche-architecture.md` §6.2 and not re-derived here | Do nothing. Removing it is churn for no gain |

---

## 2. Crawl and indexation

### 2.1 The inventory, measured

4,422 URLs across 17 sitemap families. Reproduce with `routesForSitemap()` over `sitemapIndexes`.

| Family | URLs | Share | `lastmod` | GSC pages in top-1,000 | GSC clicks / quarter |
|---|---:|---:|---:|---:|---:|
| `programmatic` (`/locations/<city>/<service>[/<industry>]`) | 2,161 | 48.9% | 0 | — | — |
| `directory` | 1,007 | 22.8% | 0 | 202 | 17 |
| `locations` | 340 | 7.7% | 0 | — | — |
| `glossary` | 320 | 7.2% | 0 | 60 | 15 |
| `growth` | 163 | 3.7% | 163 | 0 | 0 |
| `services` | 130 | 2.9% | 0 | 34 | 3 |
| `industries` | 77 | 1.7% | 0 | **0** | **0** |
| `case-studies` | 62 | 1.4% | 0 | 27 | 3 |
| `translations` | 50 | 1.1% | 50 | 0 | 0 |
| `core` | 42 | 0.9% | 0 | 3 (`/`, `/team`, +1) | 64 |
| `global` | 18 | 0.4% | 0 | 0 | 0 |
| `insights` | 17 | 0.4% | 17 | 0 | 0 |
| `blog` | 11 | 0.2% | 0 | 5 | 0 |
| `comparisons` | 9 | 0.2% | 0 | 5 | 1 |
| `tools` | 7 | 0.2% | 0 | 0 | 0 |
| `languages` | 7 | 0.2% | 0 | 0 | 0 |
| `resources` | 1 | 0.0% | 0 | 0 | 0 |
| **Total** | **4,422** | | **230** | | |

GSC columns are from `docs/seo/gsc-url-group-baseline.md` (26 Jun – 25 Sep 2026). The GSC `/locations/*`
group of 632 pages and 80 clicks spans both the `locations` and `programmatic` families above; the
table does not split it because the source cannot. Blank means the group does not resolve cleanly onto
one family.

**Click depth of the declared set**, measured: depth 1 = 44 URLs, depth 2 = 817, depth 3 = 3,302,
depth 4 = 258. 75% of the site is three segments deep.

### 2.2 Which families earn their place

Three honest categories.

**Earning.** `/` alone: 62 of the domain's 187 clicks. `/glossary/*`: the best clicks-per-page of any
programmatic family (0.25/quarter) and the domain's former best-ranking URL at position 7.9. `/team`:
2 clicks on 1 page. That is the list.

**Not yet measurable.** `growth` (163), `insights` (17), `translations` (50) — published 2026-09-24,
which is inside the GSC window but barely. Zero rows in the top 1,000 is expected, not a verdict.
Re-read at the 28-day and 90-day marks.

**Measured and not earning.** `/directory/*` at 1,007 URLs and 17 clicks per quarter is the largest
family on the domain that rule 5 does **not** protect. `/services/*` at 130 URLs and 3 clicks. The
location families are the clearest "indexed but worthless" signature on the domain — and rule 5
protects them, so they are not a decision this document is allowed to make.

**The one that should worry the operator.** `/industries/*` has 77 URLs, has been live long enough to
be measured, and produced **zero rows in the GSC top 1,000**. That is the family the entire
11,561-entity programme is about to publish into. It is not an argument against the programme —
nothing else on the domain has demand either — but it means Wave 1's gate is measuring from a true
zero, and §8.3's test 3 threshold of 0.60 should be read in that light.

### 2.3 The programmatic metadata, measured

Over the 2,040 `/locations/<city>/<service>` URLs:

- 2,040 distinct titles, 2,040 distinct descriptions — but **six sentence templates** with a place
  name substituted. Sample: *"Technical, content, and off-page SEO for enterprise scale. Qognition
  provides seo & organic growth for companies targeting North Dakota and nearby revenue markets."*
- **1,234 of 2,040 descriptions exceed 160 characters** and are truncated in the SERP.
- Median title length 32 characters before the layout template appends `| Qognition`.
- The service name is lower-cased mid-sentence by a template (`provides seo & organic growth`), which
  reads as machine output to a human and to a model.

Over the 340 `/locations/<city>` hubs: **70 of 340 titles exceed 60 characters** (21%), 38
descriptions are under 110.

**What rule 5 permits here, and what it does not.** It does not permit pruning, noindexing,
redirecting or consolidating any of these URLs, and this document recommends none of those. It does
not forbid improving a description string on a page that stays exactly where it is. I am **not**
recommending a bulk rewrite either: rewriting 2,040 templated descriptions into 2,040 templated
descriptions is motion, not work. The only change worth making to this family is the one in §3.3 —
make them reachable — and the honest answer on the rest is that it is a strategy decision the operator
has already fenced off.

### 2.4 The `/industries` entry link ships 20 hard 404s — measured

Commit `fbf62aa` appended a section to `/industries` linking all 21 ICP industries at
`/industries/<slug>`. Tested against the running build, every link:

```
404  /industries/saas-and-software
404  /industries/professional-and-business-services
404  /industries/healthcare-and-life-sciences
200  /industries/financial-services      ← resolves to the LEGACY page
404  /industries/manufacturing-and-industrial
…16 more 404s…
```

**20 of 21 are hard 404s.** `app/industries/[industry]/page.tsx` sets `dynamicParams = false` and
`generateStaticParams` is filtered to the published legacy eleven, so an unlisted slug is a 404, not a
soft one.

The twenty-first is worse than a 404. `financial-services` is claimed by both spines. The card labelled
with the ICP taxonomy's Financial Services and its fifteen sub-industries resolves to the legacy
eleven-industry page about a different thing. `scripts/check-icp.cjs` knows about this collision and
**excepts** it:

```js
!sitemapPaths.has(path) || industry.slug === 'financial-services',
```

An exception is not an assertion. It permits the alias without recording that anyone chose it.

The commit message states this is intentional — *"until then the URL 404s… the links light up wave by
wave"*. The intent is right and the mechanism is wrong. A link is indeed not a publication, but a
`<a href>` to a 404 from an indexable page is a crawl instruction, and this domain already has 111
URLs in GSC's not-found bucket. Twenty more, from the page that is supposed to be the entity anchor
for the whole taxonomy, is the opposite of what the anchor is for.

**The shape that keeps the intent and drops the cost:** render the sector name and its sub-sector
string as plain text now; wrap it in a `<Link>` only when `publishedIcpPaths()` contains the target.
The section still exists, still states the two things §11 requires, still lights up wave by wave —
and ships zero dead links. `financial-services` stays unlinked until someone decides, in a commit,
which spine owns that URL.

Rollback: §9.2.

### 2.5 Three gate enumerations are wrong, and this is the fourth instance

`scripts/check-b2b.cjs` §4 greps three files for imports of `data/b2b`, on the stated basis that
*"data/navigation.ts drives the global header"*.

**It does not.** `data/navigation.ts` exports `SPOKE_MENUS`, `INDUSTRY_MENU` and `TOP_NAV`, and
nothing imports any of them. The live header is `components/shared/Navigation.tsx`, a hand-written
six-link nav, and it is in no gate's list. `lib/industryPublication.ts` records
`data/navigation.ts#INDUSTRY_MENU` as consumer 7 of `INDUSTRIES` for the same reason and is wrong for
the same reason.

Meanwhile `app/industries/page.tsx` now imports `ICP_INDUSTRIES` into the render path — a real new
consumer of the ICP spine — and is in no gate's list either.

`b2b-niche-architecture.md` §7.5 argued the glossary fix should come first because *"an enumeration of
consumers, written by careful people, was wrong"*. That was one instance. This is the fourth. The
instruction in §7.4's closing paragraph — grep every import before changing a shared data module,
rather than adding a line to the list — is the correct instruction and it has not been applied to the
gates themselves.

**Fix:** point the blast-radius grep at `components/shared/Navigation.tsx` and
`app/industries/page.tsx`, and either delete `data/navigation.ts` or leave it and stop three documents
claiming it is load-bearing. Deleting dead code is not a URL change and carries no search risk.

---

## 3. Internal link architecture

### 3.1 Where equity pools

Breadth-first crawl of the built site from `/`, depth 4, 847 pages fetched, 1,522 URLs discovered.
Top internal link targets by inbound count across the crawled set:

| Inbound links | Target |
|---:|---|
| 840 | `/insights` |
| 840 | `/legal/privacy` |
| 804 | `/de`, `/fr`, `/nl`, `/sv`, `/da`, `/nb`, `/fi`, `/ar`, `/it`, `/zh-Hans` (each) |
| 770 | `/growth/services/ai-search` |
| 1 | `/directory` |

The global header carries six nav links plus a ten-item language menu; the footer carries the four
growth pillars, `/growth/industries`, `/growth/markets`, `/insights`, `/process`, `/pricing`,
`/about`, `/contact`, `/book`, `/free-ai-audit`, `/legal/*` and `/sitemap`. Every one of those is on
all 4,422 pages.

Two consequences, both measured:

**The ten locale homepages receive roughly 8,040 internal links between them, into 50 URLs whose
publication record is `reviewMethod: 'AI-assisted editorial review'` generated for every locale by a
`.map()` that cannot return anything but `reviewed`.** `LOCALE_PUBLICATIONS` in `lib/growth-locales.ts`
is constructed as `Object.fromEntries(GROWTH_LOCALES.map(...))` with `status: 'reviewed'` hard-coded.
It is the same class of gate as `slice(0, 320)` — a list derived from the data agrees with the data by
construction and gates nothing. `CLAUDE.md` §13 lists "auto-translating before English converts" as an
anti-pattern; the site has done it and then pointed 8,040 internal links at the result.

**`/services` and `/industries` are in the header; `/case-studies`, `/blog`, `/comparisons`,
`/free-tools`, `/resources`, `/locations`, `/glossary`, `/directory` and `/regions` are in neither the
header nor the footer.** The header's "Industries" link points at `/growth/industries`, not
`/industries` — so the family the B2B programme will publish into has no global entry point at all, and
the two families that both use the word "industries" are one nav item apart. `b2b-niche-architecture.md`
§8.2 assertion 17 forbids publishing a niche in both; the navigation currently implies the growth one
is canonical.

### 3.2 Where equity leaks

| Family | URLs | Min click depth from `/` | Inbound in-content links |
|---|---:|---:|---|
| `/directory/*` | 1,008 | 4 (hub only) | 1, from `/industries/<i>/<s>` |
| `/languages/*` | 8 | unreachable | **0 anywhere in the codebase** |
| `/global/*` | 19 | unreachable | 1, from `/languages/<l>` — itself orphaned |
| `/llm` | 1 | 4 | 0 |
| `/locations/*` | 2,381 | 3 | location-internal only |

`/languages/*` and `/global/*` are 27 URLs in the XML sitemap with no path to them from any page on
the site. They exist only because the sitemap declares them.

`/directory/*` is 23% of the declared index reachable through one link on 66 sub-industry pages. On the
crawl, `/directory` itself appeared at depth 4; its 1,007 children are at depth 5 or deeper.

**I am not recommending deletion of any of these.** `CLAUDE.md` §7 requires a Search Console pull per
URL group before removing or noindexing anything, and a URL with external links is never removed
regardless of clicks. `[NEEDS DATA: backlink export]` is the blocker on that decision and it is the
same blocker `b2b-niche-architecture.md` has carried since revision 2.

What I am recommending is §3.3, which is additive and needs no export.

### 3.3 `/sitemap` is the cheapest lever on the domain and it is switched off

`/sitemap` is linked from the global footer, so it has ~4,400 inbound internal links — more than any
other page except the homepage's own chrome. Measured, it links to **60 URLs**, of which 45 are the
header and footer chrome that every page carries. Its page-specific links are `/sitemap.xml` and about
a dozen hub pages.

A real HTML index at that URL would put every family within two clicks of the footer of every page. It
adds links. It changes no URL, no canonical, no redirect, no robots directive and no meta tag. It does
not expand, delete, redirect or noindex a location page — it links to ones that already exist, which
rule 5 does not restrict.

This is the single highest ratio of effect to risk in the document, and it is a day of work.

### 3.4 Link tax per page

Measured unique internal links per template: `/glossary/<term>` 51, of which ~45 are chrome — so a
glossary page spends 88% of its outbound link budget on the same 45 destinations as every other page.
`/services/ai-seo` 91. `/industries/financial-services` 90. `/locations/new-york` 74.

`b2b-niche-architecture.md` §10 open item 9 asks whether new rows may use a sidebar variant that omits
`/locations`, `/resources` and `/directory`. The measurement above is the argument for yes: at ~1,200
new pages, the chrome is 45 links × 1,200 = 54,000 internal links to a fixed set of 45 destinations,
and the page-specific links that the family actually depends on are 5–8 each.

---

## 4. Schema coverage per template

Assessed against what is real in September 2026. `b2b-niche-architecture.md` §6.1–§6.2 establishes
that `FAQPage` is finished as a rich result, `HowTo` is dead, and **no schema causes AI Overview or AI
Mode inclusion**. That is applied here, not re-derived.

### 4.1 What every page carries

`Organization` + `WebSite` from the root layout, on all 4,422 URLs. Measured: 3,880 bytes of JSON-LD on
`/`. `WebSite` carries `name` and `url` and nothing else — no `potentialAction`, which is the only part
of `WebSite` that ever did anything, and that rich result is also retired. It is inert. Leave it.

### 4.2 Per template, measured from served HTML

| Template | URLs | Emitted | Verdict |
|---|---:|---|---|
| `/` | 1 | Organization, WebSite, FAQPage | FAQPage inert. Fine |
| `/services/<s>` | 11 | Service + OfferCatalog + FAQPage + BreadcrumbList | Correct and honest. Keep |
| `/services/<s>/<sub>`, `/services/<s>/industries/<i>` | 241 | Service + FAQPage + Breadcrumb | Fine |
| `/industries/*` | 77 | Service + FAQPage + Breadcrumb | Fine |
| `/locations/*` | 2,381 | Service + `areaServed: City` + FAQPage + Breadcrumb | **Correct, and worth protecting.** `Service` with `areaServed`, not `LocalBusiness`. The site does not claim an office it does not have. `lib/schema.ts` still exports an unused `localBusinessSchema()` that emits `ProfessionalService` per city — **do not wire it up** |
| `/glossary/<t>` | 320 | DefinedTerm + Breadcrumb | Right type. The markup is more honest than the page (§7.1) |
| `/directory/<c>/<p>` | 1,000 | SoftwareApplication + Product + Brand + **Review** + FAQPage + Breadcrumb | **§4.3. The problem** |
| `/directory/<c>` | 7 | CollectionPage + ItemList + Breadcrumb | Correct |
| `/insights/<s>` | 17 | Article + Breadcrumb | `author` is an Organization, not a Person. `publisher.@id` dangles. §7.2 |
| `/blog/<s>` | 11 | Article (author = Person) + Breadcrumb | The only family with a Person author |
| `/growth/*` | 163 | Service or WebPage + Breadcrumb | Correct |
| `/case-studies/<id>` | 45 | Article + Breadcrumb + `about: Organization(client)` | Fine. Claim substantiation is Ruth's, not schema's |
| `/comparisons/<s>` | 9 | FAQPage + Breadcrumb only | No Article. 262 words measured. §7.5 |
| `/free-tools/<t>` | 7 | SoftwareApplication + Offer + Product + FAQPage + Breadcrumb | Fine |
| `/languages/<l>`, `/global/<m>` | 26 | Service + Breadcrumb | Orphaned pages with schema on them |

`lib/seo.ts` and `lib/schema.ts` both define `serviceSchema`, `faqSchema` and `breadcrumbSchema`, and
`lib/seo.ts` additionally defines `locationSchema` and `directoryProductSchema` that **nothing
imports**. Dead duplicate schema generators are how a template silently starts describing the business
two ways. Delete the unused half.

### 4.3 1,000 `Product` + `Brand` + `Review` nodes for products that do not exist

Measured from `/directory/design/figma-cold-outreach`:

```json
{ "@type": "Product",
  "name": "Figma for cold outreach",
  "brand": { "@type": "Brand", "name": "Figma for cold outreach" },
  "review": { "@type": "Review",
    "author": { "@type": "Organization", "name": "Qognition" },
    "reviewBody": "Everything starts in Figma — it is the operating system for our design team. …" } }
```

The `/directory` family is a product × use-case cross: 1,000 URLs asserting `Product` and `Brand`
entities named "`<real product>` for `<use case>`". No such product and no such brand exists. Three
separate problems:

1. **Misleading structured data.** Google's structured data guidelines require markup to describe the
   page's actual primary entity. A `Brand` named "Figma for cold outreach" is not a brand. At 1,000×
   this is a manual-action shape, not a style question.
2. **Entity-graph self-harm.** This domain publishes 1,000 fabricated `Product`/`Brand` nodes under its
   own authority. The company sells entity optimisation. Whatever a retrieval system learns about
   Qognition's reliability as a source, it learns partly from this.
3. **Claim exposure.** `reviewBody` makes a first-person operational claim ("it is the operating system
   for our design team") on 1,000 products, followed by a templated sentence. Under the FTC
   substantiation standard in `guardrails.md`, a first-person endorsement needs to be true of the
   endorser. **This goes to Ruth before a word of it changes.**

The `Review` carries no `reviewRating`, so it produces no rich result either way. Removing the
`Product`/`Brand`/`Review` nodes and keeping `SoftwareApplication` + `Breadcrumb` costs nothing in
search and removes all three problems. Whether the 1,000 URLs should exist at all is a different
decision and is blocked on `[NEEDS DATA: backlink export]`.

### 4.4 What to add, and it is short

- `Organization.@id`, once, in `lib/schema.ts`, so `/insights/*`'s existing `publisher.@id` reference
  resolves. One line.
- `Person` authors on `/insights/*`. Seventeen long-form guides currently authored by an Organization.
  E-E-A-T and author entity resolution both run on a named person with credentials. This is the only
  schema addition in this document I would argue for on its merits.
- Nothing else. No `FAQPage` on new templates, no `Speakable`, no `llms.txt` entry pretending to be a
  lever. `b2b-niche-architecture.md` §6.2 has the citations.

---

## 5. robots.txt, llms.txt, canonicals, hreflang

### 5.1 robots.txt — still unusually good, and one thing changed for the better

`app/robots.txt/route.ts`, measured. `Allow: /`, `Disallow: /api/`, `Disallow: /studio/`, repeated
verbatim for `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, and again for `GPTBot`, `ClaudeBot`,
`Google-Extended`. One sitemap line.

Two notes:

- **`Disallow: /legal/` is gone.** The site reconciliation of 2026-09-14 recorded the footer-linked
  privacy policy and terms as unreachable to buyers and crawlers. They are crawlable now. That was the
  right fix and nobody wrote it down.
- The named-bot blocks are byte-identical to the `*` block, which means they are redundant *today* but
  they are load-bearing *tomorrow*: the moment anyone adds a `Disallow` to `*`, the AI crawlers keep
  their access explicitly. That is the correct way to write this file. **Do not narrow it and do not
  "simplify" it.**

**The thing robots.txt cannot tell you.** Edge bot management overrides it silently.
`[NEEDS DATA: confirm from server logs that the Vercel firewall and any proxy in front of
qognitionagency.com is not challenging OAI-SearchBot, PerplexityBot or Claude-SearchBot.]` This has
been open since `b2b-niche-architecture.md` revision 1 and it is the single cheapest unanswered
question in either document: a CDN rule can make every recommendation in §7 worthless and leaves no
trace in the repo.

### 5.2 llms.txt and llms-full.txt

Present, `force-static`, correct content type. Built from `getPublishedGrowthPages()` only — so they
index the 163-page growth family and omit `/services` (130), `/industries` (77), `/case-studies` (62),
`/glossary` (320), `/insights` (17), `/comparisons` and `/free-tools`.

Per §6.2 of the architecture document, llms.txt is not a lever and must never appear in a deliverable
as one. I am not recommending expansion on retrieval grounds. I am noting one thing that is not about
retrieval: the file's header is the most compact public statement of what this organisation is, and it
says something different from the schema and from the page titles. That belongs in §7.2, not here.

The `Link:` header set by `proxy.ts` advertises `</llm.txt>; rel="alternate"; type="text/plain"`. The
route that exists is `/llms.txt`. `/llm.txt` is not a route. Measured: the header points at a 404 on
every page on the site.

### 5.3 Canonicals

`metadataFor()` sets `alternates.canonical` to the page's own path against `metadataBase`, so every
page self-canonicalises. Correct, and the `robots.index` flag is derived from `isLegacyIndexable(path)`
rather than hand-set, which is the right shape.

One defect worth naming: `getLocationMetadata`, `getServiceMetadata`, `getIndustryMetadata` and five
siblings return `noIndex: true` **with a self-canonical** for a not-found entity. A `noindex` page with
a self-canonical is a contradiction Google resolves by ignoring the canonical; it is harmless here
because those routes mostly set `dynamicParams = false` and 404 first. `/directory/*` and `/blog/*` set
`dynamicParams = true`, so those two families can serve a 200 `noindex` "Tool Not Found" page for any
invented slug. That is a soft-404 generator on the family that already sits at 1,008 URLs. Fix: return
`notFound()` rather than a `noIndex` metadata object.

### 5.4 hreflang — correct, and I expected it not to be

`localeHomeAlternates()` returns 11 locales plus `x-default`, and `app/page.tsx` spreads it onto the
English homepage, so the annotation is **reciprocal**. `localeServiceAlternates(pillar)` does the same
for the four pillar pages and `growthMetadata()` applies it on the English side. `x-default` points at
the English URL. Locale codes (`nb`, `zh-Hans`) are valid.

This is the part of the site most likely to be wrong and it is right. Leave it alone.

The substantive question about the 50 translated URLs is not hreflang, it is §3.1: whether a family
whose publication gate cannot return anything but `reviewed` should be receiving 8,040 internal links.
That is a strategy decision, not a technical defect.

---

## 6. Rendering, Core Web Vitals and payload — from the build, not from assumption

### 6.1 The site does not statically render

Measured, `.next/prerender-manifest.json` on the 2026-09-29 build:

```
prerendered routes:     34
dynamic route shells:    2
```

Twenty-seven files export `generateStaticParams`. **None of those routes is prerendered.** The 34 that
are, are exactly the ones that declare `export const dynamic = 'force-static'` plus the static route
handlers.

Confirmed from the served response headers on `next start`:

```
/team              →  Cache-Control: s-maxage=31536000 · x-nextjs-cache: HIT · x-nextjs-prerender: 1
/                  →  Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
/glossary/ai-seo   →  Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
/locations/new-york→  Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
```

**Cause, single and located:** `app/layout.tsx:104`.

```ts
const locale = (await headers()).get('x-qognition-locale') || 'en';
```

`headers()` in the root layout opts every route in the application into dynamic rendering. It is the
only dynamic API anywhere in the render path — `grep -rn "next/headers" app components lib` returns
one line.

**What it costs.** Every one of ~4,388 URLs is a serverless render on every request, and the response
is explicitly marked `no-store`, so no CDN, no proxy and no browser caches it. Googlebot, OAI-SearchBot,
PerplexityBot and Claude-SearchBot each pay full origin render time for every fetch. On a domain with
3.89K indexed and 683 not indexed, crawl efficiency is the thing standing between the declared set and
the indexed set. It also puts server render time inside every LCP measurement, on every page, for every
user.

**The fix, and it does not change a single URL.** The locale is a function of the URL, not of a header:
the ten non-English locales are `/de`, `/fr`, `/nl`, `/sv`, `/da`, `/nb`, `/fi`, `/ar`, `/it`,
`/zh-Hans`, and every other URL is `en`. The App Router supports multiple root layouts via route
groups — `app/(en)/layout.tsx` with a static `lang="en"`, and `app/(intl)/[locale]/layout.tsx` reading
`params`. Route groups do not appear in URLs, so no path, canonical, redirect, hreflang or sitemap
entry changes. Kyle owns whether that is the right restructure; the measurement above is the reason to
ask him.

Rollback: §9.1.

### 6.2 Payload, measured by gzipping the built chunks

| Route | First-load JS (gzip) | Raw |
|---|---:|---:|
| Shared baseline, every route (`/legal/terms` control) | **157 KB** | 539 KB |
| `/` | 160 KB | 549 KB |
| `/glossary/<term>` | 157 KB | 539 KB |
| `/locations/<city>` | 157 KB | 539 KB |
| `/contact`, `/insights/<slug>`, and 9 others | **228 KB** | 835 KB |
| `/studio/[[...tool]]` | — | 5,691 KB |

Homepage total first-party transfer, measured: HTML 30 KB gzip (160 KB raw), CSS 14 KB gzip (65 KB
raw), JS 160 KB gzip — **204 KB before fonts, images and any third-party tag.** `CLAUDE.md` §12.6 sets
a 500 KB first-load budget; the first-party side is inside it and the margin is what GTM, GA4, Clarity
and the Meta Pixel consume once consent is granted.

**The budget gate measures the wrong quantity.** `scripts/check-served-page.mjs` budgets 40 KB gzip of
*route-specific* JS on `/`, defined as `/` minus the `/legal/terms` control. Measured, that delta is
**3 KB**. The gate passes with 37 KB of headroom while the floor every URL on the site pays is 157 KB.
The delta is a useful number and the gate is well built; it simply does not bound the thing that
matters. Add a second assertion on the absolute baseline, seeded at today's 157 KB so it is a
ratchet rather than a rewrite.

**Homepage HTML is 56% inline script** — 91 KB of the 164 KB document is the RSC flight payload.
Normal for the App Router, and worth knowing for §7: a crawler or an AI fetcher that tokenises the raw
document is spending more than half its budget on serialisation.

### 6.3 Render-blocking

One stylesheet (65 KB raw, 14 KB gzip), 13 preloads, one `next/font` woff2 preloaded with
`display: swap`, ten external scripts all `afterInteractive` and consent-gated. No render-blocking
third-party script in the head. This part is in good shape and I would not touch it.

`scripts/check-served-page.mjs`'s second assertion — that no content is hidden behind an animation that
may never run — is the best gate in the repo and the only one in either document that catches a class
of failure a code review cannot. Leave it exactly as it is.

**Not measured here:** field CWV. `[NEEDS DATA: CrUX / PageSpeed Insights field data for LCP, CLS and
INP on qognitionagency.com, by page group.]` Nothing in this document is a claim about production LCP.

---

## 7. AI-search readiness

Reported separately from §2–§6 throughout, because the work is different. The three passes run in
order: nothing can be citation-worthy that a model cannot extract, and nothing resolves to the right
entity if the entity contradicts itself across surfaces.

### 7.1 Pass one — extractability

**Server-rendered text per template, measured** (tags stripped, scripts and styles removed; the count
includes nav and footer, which is ~140 words):

| Template | Words rendered | H1 | Unique body, approx |
|---|---:|---:|---|
| `/` | 2,349 | 1 | 2,200 |
| `/case-studies/methodology` | 2,048 | 1 | 1,900 |
| `/insights/<slug>` | 973 | 1 | 830 |
| `/directory/<c>/<p>` | 973 | 1 | 830 |
| `/locations/<city>` | 846 | 1 | 700 |
| `/services/<s>` | 821 | 1 | 680 |
| `/locations/<city>/<service>` | 746 | 1 | 600 |
| `/growth/services/<p>` | 701 | 1 | 560 |
| `/free-tools/<t>` | 630 | 1 | 490 |
| `/industries/<i>` | 513 | 1 | 370 |
| `/global/<m>` | 315 | 1 | 175 |
| `/glossary/<term>` | 267 | 1 | **~125** |
| `/comparisons/<s>` | 262 | 1 | **~120** |
| `/languages/<l>` | 193 | 1 | **~50** |

Everything is server-rendered — there is no JS-only text on any template I sampled, and the
`.rf-mask` animation-hiding failure is gated by `scripts/check-served-page.mjs`. That is the hard part
and it is done.

**The glossary, measured precisely.** 320 terms. Removing the term name from each definition leaves
**one** distinct string across all 320:

> *"«T» is a digital growth concept Qognition uses when planning SEO, paid media, content, analytics,
> and conversion systems. In practical terms, it affects how buyers discover a brand, evaluate trust,
> and turn search demand into measurable pipeline."*

Median 39 words. Categories: Digital marketing 131, Local SEO 129, AI search 30, Lead generation 14,
Paid media 12, Technical SEO 4.

There is nothing for a model to lift. A definitional page's entire job is to be the clean, self-contained
answer to "what is X", and this one answers "X is a digital growth concept Qognition uses". At the same
time this family has the **best measured clicks-per-page on the domain** and held its best-ranking URL.
Demand exists; the page does not meet it.

**The thirty `AI search` terms are the single best content opportunity in this audit.** They are the
category Qognition sells, they already have URLs, they already have inbound demand, and they cost one
hand-written 250–400 word definition each with a named reviewer. That is §7.4 step 3 of the
architecture document, and the only thing standing between it and being done is that it was filed
behind a keyword export. It does not need one: the terms are already published and already ranking.

`b2b-niche-architecture.md` §7.4 step 1 — replacing `slice(0, 320)` with an explicit allowlist —
remains the prerequisite, and remains byte-identical on landing.

**Tables.** One `<table>` on the entire site, on `/`. §3.4 of the architecture document requires
tabular data in tables because that is what is demonstrably extracted. Every comparison, pricing and
coverage block on the domain is currently a grid of `<div>`s.

**Comparisons.** Nine URLs at ~262 words each, no `Article` schema, and every competitive claim on them
is unsourced — `context.md` records the competitors section as empty and `guardrails.md` prohibits
superlative or comparative market-position claims without a cited dated source. These are the
highest-intent URLs in the architecture and they are the thinnest. Fixing them is Theo's work against
Iris's research, gated by Ruth, and it is not a technical fix.

### 7.2 Pass two — entity consistency

**On-site, measured. The organisation's own name is emitted four ways:**

| Surface | Value |
|---|---|
| `lib/schema.ts` `Organization.name`, and ~40 inline `provider`/`publisher` nodes | `Qognition` |
| `app/insights/[slug]` `Article.author` and `publisher` | `Qognition Agency` |
| `og:site_name` | `Qognition` (layout, growth), `Qognition Agency` (`metadataFor`, localized) |
| `llms.txt` header | `# Qognition Agency` |
| Footer copyright | `Qognition Agency` |
| Root `<title>` default | `Qognition \| AI-native B2B Growth Agency` |

**The description is emitted three ways:**

- `organizationSchema.description`: *"B2B AI search visibility agency. We get established B2B firms
  found when their buyers ask an AI which vendor to hire."*
- `llms.txt`: *"AI-native B2B growth agency connecting AI Search, Demand, ABM and Revenue Systems."*
- `agent-markdown` fallback: *"an AI growth marketing partner for qualified leads, SEO, AI search
  visibility, PPC, social media, web design, branding, creative, and measurable revenue systems."*

Three self-descriptions on three machine-readable surfaces of one domain, and the third one is served
for ~4,300 URLs. A retrieval system resolving this entity has to pick one. This is the thing the
company sells.

**The dangling `@id`.** `/insights/*` emits `publisher: { "@id": "https://www.qognitionagency.com/#organization", … }`.
No node anywhere on the site carries that `@id`. The reference resolves to nothing, which means the
seventeen guides have a publisher that is not connected to the site's Organization node. One line in
`lib/schema.ts` fixes it.

**`sameAs` versus the footer.** Schema lists `https://twitter.com/qognition_tech`; the footer links
`https://x.com/qognition_tech`. Same profile, two URLs, and neither page links the other three
`sameAs` profiles at all.

**Off-site, not measured.** The second half of entity consistency is whether the site's name, address,
description, founding date and leadership match LinkedIn, Crunchbase, Clutch, DesignRush, Tracxn, G2
and the Google Business Profile. I have not observed those and I will not report them from memory.
`[NEEDS DATA: entity consistency sweep across LinkedIn, Crunchbase, Clutch, DesignRush, Tracxn and GBP,
against `HQ_CITY`/`HQ_REGION`/`HQ_COUNTRY` = Gurugram, Haryana, IN.]`

Two things are known from `context.md` and are live contradictions:
- `OPERATOR-DECISIONS` #1, the office-claim contradiction, is still open. `data/siteConfig.ts` now
  states one answer (Gurugram) and says the live production build claimed four different sets. Until
  the third-party listings are reconciled to Gurugram, every new page in the B2B programme inherits the
  contradiction.
- The three sibling brands cross-reference inconsistently in all directions and the agency site names
  neither sibling while selling both siblings' service lines. The standing decision in `context.md` —
  no `subOrganization`/`parentOrganization` edge to Salt, prose disclosure only — is correct and must
  not be softened when someone tidies the schema.

### 7.3 Pass two and a half — freshness

Cited URLs run measurably fresher than organic results (`b2b-niche-architecture.md` §6.3 item 4).
Measured on this commit:

- `lastmod` on **230 of 4,422** sitemap entries (5.2%): `growth` 163, `translations` 50, `insights` 17.
- `dateModified` / `datePublished` emitted by **three** templates: `/insights/*`, `/case-studies/*`,
  `/blog/*` — 73 URLs.
- A visible last-updated date rendered to a human reader: `/legal/privacy` and `/legal/terms`. Two
  pages.

**What to do, and what not to do.** Add `lastmod` only where a real change date exists in the data —
`case-studies` has `auditedAt`, `blog` has `date`. Do not emit a build date as `lastmod`; a sitemap
that claims 4,422 pages changed today is a signal that the sitemap is not to be trusted, and it is
worse than the current silence. For the families with no change date, the honest fix is to start
recording one, which is the same `reviewedBy`/`reviewedAt` discipline `b2b-niche-architecture.md` §8.2
assertion 1 already requires of new pages.

### 7.4 Retrievability — `/agent-markdown` returns a stub for ~4,300 URLs

`proxy.ts` rewrites any GET with `Accept: text/markdown` to `/agent-markdown?path=…`. The route
handles audit offers, B2B MOFU pages, `/case-studies/<id>`, `/blog/<slug>`, and the four index pages
`/resources`, `/case-studies`, `/free-tools`, `/services`. Everything else falls through.

Measured, requesting `/services/ai-seo` with `Accept: text/markdown`:

```
# Qognition Agency

Qognition is an AI growth marketing partner for qualified leads, SEO, AI search visibility, …

Canonical: https://www.qognitionagency.com/services/ai-seo

## Important Links
- [AI Search Visibility Report](…/free-ai-audit)
…
```

Eleven lines, and it asserts `Canonical:` for the requested URL. So for `/services/<s>` (241),
`/locations/*` (2,381), `/directory/*` (1,008), `/glossary/*` (320), `/growth/*` (163),
`/industries/*` (77) and `/insights/*` (17) — roughly 4,300 URLs — a markdown-negotiating agent
receives the same forty-word blurb, each copy claiming to be the canonical representation of a
different page.

This is worse than not offering the surface. It is a machine-readable duplicate-content family with a
canonical assertion attached.

**Fix:** fall through to the HTML route, or return 404, rather than to a stub. Better, extend
`linesForPath` to the four families that matter — services, industries, insights, glossary — and let
everything else fall through.

**Whether it matters at all:** `[NEEDS DATA: server-log evidence of any crawler sending
`Accept: text/markdown` against this domain.]` Some agents do. I have not observed it here and I am
not going to claim a rate.

### 7.5 What is citation-worthy on this domain today

Honestly assessed, against the §3.4 bar of the architecture document:

- `/case-studies/methodology` — 2,048 words, states a reconciled-to-reporting count of 0, names its
  benchmark vendors and dates. This is the most citable page on the domain and it is the only one that
  would survive a model checking its sources.
- The 45-entry case study library, with `auditedAt`, named benchmark sources with years and URLs, and
  an explicit "not reported results" label. That discipline is rare and it is an asset.
- `/insights/*`, seventeen guides — good length, no named author, no original data, no dated claims.
  Restating consensus is never the source.
- Everything else is either templated or a service page.

**There is no original data on this domain.** `CLAUDE.md` §5.4 lists four annual data products that
would be the moat. None exists. That is the citation-worthiness ceiling and no amount of schema,
`llms.txt` or markdown negotiation raises it.

---

## 8. Ranking and citation, separated

### 8.1 What each finding moves

| Finding | Ranking | Citation | Neither, but real |
|---|---|---|---|
| §6.1 dynamic rendering | ✅ crawl efficiency → indexation | ✅ AI crawler fetch cost | |
| §2.4 twenty 404s | ✅ crawl waste, 404 bucket | ✅ dead ends from the entity anchor | |
| §3.3 HTML sitemap | ✅ discovery and depth | ➖ no direct mechanism | |
| §7.1 glossary content | ✅ 320 URLs with measured demand | ✅ extractable definitional answers | |
| §7.2 entity consistency | ➖ marginal | ✅ this is the mechanism | ✅ brand |
| §7.3 freshness | ➖ crawl scheduling only | ✅ measured mechanism | |
| §4.3 directory Review markup | ⚠️ spam-policy risk | ✅ source reliability | ✅ **Ruth** |
| §4.4 `Person` authors | ➖ E-E-A-T, indirect | ✅ author entity resolution | |
| §7.4 agent-markdown stub | ➖ none | ✅ if any agent negotiates | |
| §4.2 `FAQPage` everywhere | ➖ nothing, it is retired | ➖ no primary source either way | |

Nothing in this document is claimed to cause an AI Overview or AI Mode inclusion. Google states there
is no structured data requirement for those surfaces; the architecture document §6.2 carries the
citations.

### 8.2 How to report it

Unchanged from `b2b-niche-architecture.md` §9. Ranking from Search Console by URL group, 28-day
windows. Citation from first-party prompt runs against a fixed monthly prompt set, appended never
overwritten, with engine and model version. Google's generative-AI performance reports give
impressions only and belong under citation, labelled as impressions, never added to ranking clicks.

**For this audit specifically, the before/after that is worth tracking is not a ranking.** It is:
pages with ≥1 impression as a fraction of the declared 4,422; the GSC "not indexed" count, currently
683 with 111 404s; and median crawl requests per day. All three are Search Console fields, all three
respond to §6.1 and §3.3, and none of them is a ranking promise.

---

## 9. Rollbacks

Every recommendation that touches a directive, with its rollback in the same place.

### 9.1 Static rendering (§6.1)

Change: move the root layout into `app/(en)/layout.tsx` with a literal `lang="en"`, and the ten
locale roots into `app/(intl)/[locale]/layout.tsx` reading `params`.
**No URL, canonical, redirect, robots directive, hreflang annotation or sitemap entry changes** —
route groups are not path segments.
**Rollback:** restore the single `app/layout.tsx` with `await headers()`. Output is byte-identical at
the URL level; the only change Google observes is response caching, and reverting restores the current
behaviour on the next deploy. `scripts/check-publication.cjs` asserts the sitemap holds exactly 4,422
entries either way, so a mistake fails the build rather than reaching production.

### 9.2 `/industries` entry links (§2.4)

Change: in the appended section of `app/industries/page.tsx`, wrap the sector name in `<Link>` only
when `publishedIcpPaths()` contains the target; render plain text otherwise.
**No URL is created, removed or redirected. No canonical, robots or hreflang directive is touched.**
**Rollback:** restore the unconditional `<Link>`, or `git revert fbf62aa` to remove the section
entirely. The section is 51 appended lines in one file and nothing else in the repo depends on it.

### 9.3 `/directory` Product/Brand/Review nodes (§4.3)

Change: emit `SoftwareApplication` + `BreadcrumbList` only; drop the `Product`, `Brand` and `Review`
nodes.
**No URL, canonical, redirect or robots directive is touched. No page copy changes** — the visible
`agencyVerdict` text is a separate decision and belongs to Ruth.
**Rollback:** restore the `@graph` entries. Structured data changes are re-read on the next crawl and
have no persistent effect.

### 9.4 `/directory/*` and `/blog/*` soft-404s (§5.3)

Change: `notFound()` instead of a 200 `noIndex` metadata object for an unresolvable slug.
**Rollback:** restore the metadata object. Note this changes a status code, so if any of those URLs
has an external link, it starts returning 404. `[NEEDS DATA: backlink export]` should be consulted
first, and that makes this item lower priority than its cost suggests.

### 9.5 Not recommended, and why

- **No change to any `/locations/*`, `/glossary/*` location term or city page's URL, canonical, robots
  directive or redirect.** Rule 5.
- **No removal of `FAQPage` from existing templates.** Inert, and removing it is churn.
- **No narrowing of `robots.txt`.** §5.1.
- **No pruning of `/directory/*`, `/languages/*` or `/global/*`** until the backlink export exists.

---

## 10. What this changes for the B2B programme

Three of these findings are new blockers on `docs/seo/b2b-niche-architecture.md` §1.6's Wave 0 and
belong in it:

1. **§2.4, the entry link.** It is live now and it is the crawl anchor for the whole family. Ahead of
   everything, because it is currently teaching Googlebot the opposite of what the anchor is for.
2. **§6.1, dynamic rendering.** Publishing ~1,200 new pages onto an origin that serves every URL
   `no-store` multiplies the crawl cost of every one of them, and §8.3's gate tests 3 and 7 are
   measurements of whether pages earned impressions — which depends on their being crawled.
3. **§2.5, the blast-radius greps.** The gates protecting the taxonomy are pointed at a dead file.

None of them displaces the glossary content-model fix, which remains the publication blocker for the
reasons in §7.5 of that document — and §2.5 above is the fourth instance of the error that argument
rests on.

---

## NEEDS DATA

Carried from `docs/seo/b2b-niche-architecture.md` and still open:

- Keyword export with volume and difficulty, US primary, Australia secondary. There is still none in
  this repo and nothing in this document estimates one.
- Backlink export, before any consolidation, pruning or status-code change. A URL with external links
  is never removed regardless of clicks. This blocks §9.4 and every `/directory`, `/languages` and
  `/global` decision.
- Reviewer hours per month, and measured hours per page review for the first ten pages.
- The agreed indexable-pages-to-organic-sessions ratio referenced by `CLAUDE.md` §7. Wave-gate test 6
  cannot run without it.
- Confirmation from server logs that no edge bot management is challenging `OAI-SearchBot`,
  `PerplexityBot` or `Claude-SearchBot`. Unchanged since revision 1 and still the cheapest unanswered
  question in either document.

New in this audit:

- CrUX or PageSpeed Insights field data for LCP, CLS and INP on `qognitionagency.com`, by page group.
  Nothing in §6 is a claim about production field performance.
- Server-log evidence of any crawler sending `Accept: text/markdown` against this domain, before
  anyone invests in `/agent-markdown` beyond stopping it from lying (§7.4).
- Entity consistency sweep across LinkedIn, Crunchbase, Clutch, DesignRush, Tracxn and the Google
  Business Profile, against `HQ_CITY`/`HQ_REGION`/`HQ_COUNTRY` = Gurugram, Haryana, IN. Not observed,
  not reported (§7.2).
- Whether `data/navigation.ts` should be deleted or wired up. It is dead and three documents believe
  it is load-bearing (§2.5).
- Whether the ten machine-translated locales should keep ~8,040 sitewide internal links. This is a
  strategy decision, not a defect (§3.1).
- Whether `/industries/financial-services` belongs to the legacy spine or the ICP spine. The gate
  currently excepts the collision rather than asserting a decision (§2.4).
- Current written verification for the Google, Meta, TikTok, Snapchat and LinkedIn partner badges
  recorded in `context.md`. Not in this repo; routed to Ruth.
- **Who reviewed the 65 ICP pages staged in `lib/b2b/icpPublication.ts`.** The literal names me and I
  did not (§0.1). Either a real reviewer signs them or the set comes back to `spine`.

**Citation observations:** none. No prompt was run against any engine in the course of this audit, so
no citation is reported. `[NEEDS DATA: first monthly prompt-panel run, per
`b2b-niche-architecture.md` §9.2, appended to `clients/qognition-agency/deliverables/geo-citations.md`.]`
