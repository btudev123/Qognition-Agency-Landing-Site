# Audit of the 1,023 supplied PPC keywords, and the 190 PPC-only niches

Owner: Marcus (performance). Date: 2026-09-29. Branch: `b2b-ai-search`. HEAD at time of audit: `9299e1d`.
Status: judgement on query shape. **Not a measurement.** Extends `b2b-paid-structure.md` §3, does not
replace it. Nothing here is copy. Ruth runs before any sentence derived from it reaches a page.

Reads: `docs/icp-positioning.md` (operator-locked, outranks `CLAUDE.md`), `data/b2b/icp/index.ts`,
`data/b2b/icp/icp-taxonomy.json` v2.0.0, `docs/performance/b2b-paid-structure.md`,
`docs/performance/conversion-events.md`, `docs/performance/snapshot-funnel.md`,
`docs/seo/b2b-niche-architecture.md` §2.2–§2.5 (Nadia), `lib/analytics.ts`, `docs/copy/ppc.md`.

---

## 0. The target, first, and the honest statement about what this document can be

Every recommendation in here opens with a target or it does not open. Nothing has changed since
`b2b-paid-structure.md` §0:

- `[NEEDS DATA: monthly booked-walkthrough target]`
- `[NEEDS DATA: allowable cost per booked walkthrough]`
- `[NEEDS DATA: target cost per qualified lead, per client]`
- `[NEEDS DATA: lead to closed-won rate and average first-year contract value, per client]`

**There is still no ad account connected to this repository, no keyword export in it, and no
historical performance data anywhere in it.** I re-checked at `9299e1d`. That means:

> **Everything in this document is a judgement on the shape of a query string. It is not a
> measurement, it is not a volume estimate, and it must never be reported as one.** A query shape
> tells you what a person probably wants. It tells you nothing about how many of them there are, what
> the auction costs, or whether the term has any inventory at all. Three of the four viability tests
> in `b2b-paid-structure.md` §3 can be run on shape alone. The fourth — economics — cannot, and it is
> the one that decides whether any of this gets built.

`[NEEDS DATA: search volume, competition and inventory for the priority query set, per industry, per
market, from a live keyword tool. None exists in this repository.]`

---

## 1. What the 1,023 keywords actually are, which is not what the field name says

Before judging the terms, three structural facts, all derived from the file rather than asserted.

### 1.1 It is exactly three keywords per sub-industry. Every sub-industry. All 341.

341 × 3 = 1,023. The distribution has no other value in it: every one of the 341 sub-industries
carries exactly three terms, none carries two and none carries four. 1,015 of the 1,023 strings are
unique; eight appear twice (§1.3).

**This is a seed set, not a keyword list, and the uniformity is the proof.** A real keyword list is
lumpy — a vertical with genuine demand yields forty terms and a vertical without yields none. A list
that is uniformly three deep across 341 sub-industries was written to be representative, not to be
exhaustive, and it is excellent at the job it was actually doing: it labels what each sub-industry's
buyer sounds like.

What it cannot do is build an account. Three exact terms will not fill an ad group, will not sustain
a bid strategy, and will not survive a search term report. Treat the 1,023 as **341 seed clusters**
and expand each one from the platform's own data at build time. Anyone who uploads these as a
keyword list has mistaken a taxonomy field for a media plan.

### 1.2 They are Family B. The field name does not say so, and that is the highest-risk defect here.

`data/b2b/icp/index.ts` labels `ai_prompts` explicitly: *"These are Family B: the CLIENT'S buyer
asking. We are never the cited answer to one."* The same file describes `ppc_keywords` only as
*"1,023 supplied terms for the paid layer"* — with no family label at all.

The terms settle the question. `boom lift rental`. `aog aircraft parts`. `pfas testing lab`.
`dog daycare franchise`. `swppp consultant`. Those are what **our client's** buyer types. They are
not what a $10M manufacturer looking for an AI-search agency types. `conversion-events.md` §0 exists
to protect exactly this distinction, and it is undefended in this field.

**The failure mode is concrete and expensive.** Somebody builds Qognition's own Google Ads account
from `ppc_keywords` because the field is called `ppc_keywords`, and Qognition spends its budget
buying clicks from people who want to rent a boom lift. The `unknown` provenance variant in
`conversion-events.md` §1 was invented to stop a template guessing; this field needs the same
treatment.

**Recommendation.** Add the label to the type, not to a comment. `ppc_keywords` gets renamed or
documented as `client_buyer_keywords` in `data/b2b/icp/index.ts`'s interface, with the same one-line
header `ai_prompts` already carries. This is a documentation change to a file that reads a locked
JSON; it does not touch `icp-taxonomy.json` and so does not breach positioning rule 6.

### 1.3 Two consequences of the duplicates, and one genuine Family Q find

Eight strings appear under two different sub-industries:

| String | Parent A | Parent B |
|---|---|---|
| `quality of earnings report cost` | `outsourced-finance-and-transaction-advisory` | `capital-markets-and-m-and-a-advisory` |
| `fractional cfo services` | `outsourced-finance-and-risk-advisory` | `fractional-executive-firms-and-marketplaces` |
| `pallet racking installation` | `material-handling-and-intralogistics` | `warehouse-automation-and-material-handling` |
| `cold storage warehouse` | `cold-chain-and-life-sciences-logistics` | `cold-storage-and-food-logistics` |
| `cmmc compliance consultant` | `security-compliance-and-audit-services` | `government-contracting-services` |
| `ai consulting services` | `ai-implementation-and-automation` | `ai-implementation-consultancies` |
| `itad services` | `it-asset-lifecycle-and-field-services` | `waste-and-circular-economy-tech` |
| `corporate shuttle service` | `commercial-mobility-and-transit-services` | `parking-operations-and-campus-mobility` |

These are the keyword-layer shadow of the five deliberate niche overlaps positioning rule 7 already
handles. Rule 7's remedy — build under the canonical id, link from the duplicate — transfers cleanly:
**a duplicated seed cluster belongs to one campaign and is a negative in the other.** If both sides
ever run live, they are two of the client's own ad groups bidding against each other on one query,
and that is the only thing in this document that is genuinely called cannibalisation. Nadia's §2.5 is
right that the word is usually misapplied to paid-versus-organic; here it applies literally.

**And the Family Q find.** Inside `franchising-and-multi-location`, the sub-industry
`franchise-marketing-and-lead-generation-agencies` carries `franchise marketing agency`,
`franchise lead generation` and `franchise development marketing`. Those are not only that client's
buyer's terms — they are **terms Qognition itself would bid on** to reach a franchisor. Three Family Q
strings are sitting in a field that is Family B everywhere else. They are also the only place in the
1,023 where Qognition is simultaneously a potential vendor *to* the sub-industry and a competitor
*of* it. Worth naming as a conflict for the operator, not worth resolving here.

---

## 2. Query-shape classification across the corpus

Counts below are mechanical passes over all 1,023 strings, reproducible from
`data/b2b/icp/icp-taxonomy.json`. The **judgement** is in the commentary, and it is labelled as
judgement throughout.

| Shape marker | Count | What it means for the build |
|---|---|---|
| Carries a service / vendor head-noun (`services`, `agency`, `consultant`, `distributor`, `supplier`, `contractor`, `firm`, `company`, `provider`) | 434 | The healthiest group. A vendor head-noun is the single strongest commercial-intent signal available in a B2B string |
| Carries a software head-noun (`software`, `platform`, `system`, `tool`, `app`, `saas`) | 149 | Commercial, but the auction is the most expensive in the corpus and the conversion event varies four ways (`conversion-events.md` §3.2) |
| Carries a price modifier (`cost`, `pricing`, `quote`, `rates`, `fees`) | 33 | Highest intent in the corpus. Smallest set. Buy these first |
| Carries `for <qualifier>` | 96 | Self-qualifying. Cheapest qualified traffic available. Under-used at 96 of 1,023 |
| `near me` | 8 | Geo-bounded, archetype D. Fine, and requires location targeting to match |
| Bracketed placeholder (`[city]`, `[destination]`) | 3 | **Not keywords.** Templates that leaked into the field. See §3.4 |
| Informational marker (`what is`, `how to`, `guide`, `checklist`, `vs`) | 1 | Near-zero. Notable, and to the operator's credit |
| Superlative (`best`, `top`, `leading`) | 0 | Zero. Also to the operator's credit — these are the terms an agency list usually opens with, and they are the worst-converting in B2B |
| **No commercial modifier of any kind** | **366** | The group that needs the most work. §3.1 |

**The headline judgement on quality: this is a better-written keyword set than most agency
deliverables I have audited.** One informational term in 1,023 and zero superlatives is unusual. The
operator wrote category-and-capability strings, not content-marketing strings. The defects below are
real but they are defects of *grain and match-type exposure*, not of intent.

---

## 3. The four defect classes, with the terms named

### 3.1 The 366 bare category nouns — genuinely commercial, catastrophic on broad match

366 of 1,023 carry no vendor noun, no price modifier and no `for` qualifier. `contract manufacturing
services` is fine. But `excavator for sale`, `semi trucks for sale`, `warehouse management system`,
`conference venues`, `commercial energy audit`, `alta survey`, `data annotation services` are bare
category or product nouns.

**These are not informational terms wearing a commercial coat.** Their intent is genuinely
commercial — nobody idly searches `api 653 tank inspection`. The problem is different and it is the
one `b2b-paid-structure.md` §2.1 named for Archetype A: **a bare category noun is the exact string
that broad match destroys.** `excavator for sale` on broad match serves on used-equipment classifieds,
hobby buyers, overseas resellers and people researching excavator prices with no intent to buy at all.
`warehouse management system` serves on students, job seekers and every WMS vendor's competitor team.

The 366 are concentrated where the archetype predicts: manufacturing (36), franchising (35),
hospitality (24), agriculture (24), aerospace (23), TIC (21).

**Ruling.** Exact and phrase only for the whole group, at launch, without exception. Broad match on a
bare category noun is not a targeting decision, it is a budget-disposal decision. The negative list is
the primary deliverable for every one of these, exactly as §2.1 says for Archetype A, and it is now
true for a third of the corpus rather than one vertical.

### 3.2 Informational wearing a commercial coat — a much smaller group than expected

Only one string carries an explicit informational marker: `how to franchise a business`
(`franchise-development-consulting-and-brokerage`). And I would **defend** it. A founder typing that
is at the top of the exact funnel that sub-industry sells into, the sub-industry's client value is
`$60k–$250k per franchise program build`, and the conversion is a named consultation. That is a
legitimate buy.

The genuinely informational-in-disguise group is smaller and different from the usual suspects:

| String | Sub-industry | Why it reads commercial and is not |
|---|---|---|
| `hotel feasibility study` | `hospitality-travel-and-events` | Reads like a purchase. Is dominated by students, lenders reading someone else's study, and people looking for a template. The buyer who commissions one is a developer who already has a consultant |
| `elevator modernization cost` | `elevator-door-and-loading-dock-services` | A price modifier on a capex item researched by building owners at budget time, months from a vendor decision. Real, but long-cycle. Do not judge it on the same window as the rest of the ad group |
| `franchise expo` | `franchise-expos-media-and-lead-portals` | Navigational. The searcher wants a specific show's dates, not an exhibitor sales conversation |
| `quantum computing services` | `emerging-and-micro-niches` | The category vocabulary has not settled. `verticals.ts` says so and Nadia's §2.4 says so. This is a research query in commercial clothing |
| `commercial water leak detection system` | `emerging-and-micro-niches` | Straddles a facility-manager purchase and a homeowner product search at very different volumes |

Five of 1,023. That is a low defect rate and I will say so plainly.

### 3.3 Terms that will serve on irrelevant traffic — the consumer and job-seeker collision

157 strings carry a token whose dominant search population is **not** a B2B buyer. The largest
clusters: `franchise` (48), `training` (23), `staffing` (15), `hotel` (12), `rental` (11),
`insurance` (10), `certification` (9).

Three sub-cases, and they need different remedies.

**(a) The operator already solved most of it, and the fix is visible in the data.** Industry 18
prefixes almost everything with `commercial`: `commercial cleaning services`, `commercial water damage
restoration`, `commercial roll off dumpster rental`, `warehouse pest control company`. That single
modifier is what separates a facility director from a homeowner, and it is applied consistently across
all 16 sub-industries. Whoever wrote industry 18 has run a B2B service account. Do not let a later
expansion pass strip the modifier.

**(b) The unsolved residue.** Terms where the B2B qualifier is missing and the consumer volume is
larger by an order of magnitude:

| String | Sub-industry | The collision |
|---|---|---|
| `professional skincare` / `white label skincare manufacturer` | `longevity-and-aesthetic-clinic-vendors`, `private-label-and-contract-manufacturing` | Pulls solo estheticians and consumers. `white label` carries some load; `professional` carries almost none |
| `security awareness training`, `osha 30 training for employers` | `education-and-training` | `for employers` does real work on the second. The first has no qualifier and will serve on individuals buying their own certificate |
| `conference venues`, `corporate event venues [city]` | `hospitality-travel-and-events` | Consumer and social event planners at far higher volume than the corporate meeting planner who is the buyer |
| `business insurance quotes`, `trucking insurance quotes` | `financial-services` | Owner-operator and micro-business volume swamps the commercial risk manager. Below positioning rule 3's affordability floor by a wide margin |
| `equipment rental company`, `boom lift rental`, `crane rental services` | `equipment-rental-companies` | Genuine, but the same words serve DIY and single-day hire. The negative burden is the campaign |
| `private jet charter for business` | `business-aviation-services` | `for business` is doing heroic work against an enormous consumer-luxury query set. It will not hold on phrase match |

**(c) The franchising case, which is its own category and the largest single risk in the corpus.**
48 of 51 franchising keywords contain `franchise`, and the sub-industries split cleanly in two:

- Sub-industries 1–10 are **franchisors**. Their buyer is a franchise candidate — an individual
  investor. `gym franchise cost`, `coffee franchise for sale`, `dog daycare franchise`. This is
  correct Family B and it does **not** breach positioning rule 4, because our client is the
  franchisor, not the candidate.
- Sub-industries 11–17 are **vendors to franchisors**. Their buyer is a Chief Development Officer.
  `franchise my business`, `outsourced franchise sales`, `franchise management software`. Also correct.

The risk is not rule 4. It is that **franchise-opportunity search is the most portal-saturated and
lead-broker-saturated query class in B2B.** The searcher on `fitness franchise opportunities` is
competing for attention with franchise directories that have spent fifteen years buying that term,
and the candidate who clicks is overwhelmingly someone who fails the franchisor's liquid-capital
requirement. Test 4 in `b2b-paid-structure.md` §3 asks whether non-buyers can be excluded. **Here they
cannot be excluded by negatives, because they type the same words as the buyer.** The only instrument
that separates them is a liquid-capital and net-worth question on the form, which means the entire
qualification burden lands on the landing page. That is §6.

### 3.4 Terms that name a competitor or a brand — and the ones that are not keywords at all

**No keyword in the 1,023 names a competitor.** Not one agency, consultancy or direct rival of any
client appears anywhere in the corpus, and there are no `alternative to X` or `X vs Y` strings at all.
That matters for one specific reason: **Nadia's §2.2 competitor-brand-bidding question
(`OPERATOR-DECISIONS` #10) is genuinely still open**, rather than pre-empted by a list somebody
uploaded and nobody reviewed.

**Six keywords do name a brand, and they are a different and more interesting class: the
ecosystem-partner term.**

| String | Sub-industry |
|---|---|
| `aws consulting partner` | `cloud-consultancies` |
| `netsuite implementation partner` | `erp-and-finance-system-partners` |
| `salesforce consulting partner` | `crm-and-enterprise-platform-partners` |
| `amazon marketing agency` | `marketplace-and-retail-media-agencies` |
| `walmart marketplace agency` | `marketplace-and-retail-media-agencies` |
| `tiktok shop agency` | `marketplace-and-retail-media-agencies` |

These are not competitor bidding. In every case **our client is a partner in that ecosystem** and the
brand name is the only way their buyer can describe what they need. They are among the highest-intent
strings in the corpus — nobody types `netsuite implementation partner` casually — and I would buy
every one of them.

But they carry two constraints that competitor terms do not, and both bind the **ad copy** rather than
the keyword:

1. **Platform trademark policy.** Bidding on a trademarked term and *using it in ad text* are governed
   separately, and the second is restricted. Which of the six may appear in a headline depends on the
   client's actual partner status and on the platform's current policy.
2. **The partner programme's own brand guidelines.** AWS, NetSuite, Salesforce, Amazon and TikTok all
   publish rules binding how a certified partner may use the mark in paid advertising. Breaching them
   risks the client's partner status, which is worth far more than the campaign.

`[NEEDS DATA: for each of the six, the client's actual partner tier and certification, plus that
programme's current brand-usage rules for paid advertising. Ad copy using any of these six marks does
not ship without both, and Ruth sees it either way.]`

This also refines Iris §5.3's observation, recorded in `conversion-events.md` §3.4, that cloud
consultancies must name the **specific** partner designation. That is a credibility requirement on the
page. It is also, on this evidence, a compliance requirement in the ad.

Three strings, however, are not keywords:

- `corporate housing [city]`
- `corporate event venues [city]`
- `destination management company [destination]`

All three are in `hospitality-travel-and-events`. Bracketed placeholders are template fragments. If
these reach a campaign builder unresolved they either become literal keywords containing square
brackets, which match nothing, or they become a geo-expansion loop, which is the scaled-content
pattern `data/b2b/icp/index.ts` exists to prevent, moved into the ad account. And positioning rule 5
puts city pages under a freeze. **Resolve or remove. Do not expand.**

---

## 4. Testing the 190 PPC-only niches against my §3 viability work

The operator marked 190 niches `fit: PPC` — paid beats organic, no AI SEO angle. Distribution:

| Industry | PPC-only | of total niches |
|---|---|---|
| healthcare-and-life-sciences | 19 | 151 |
| commercial-and-facility-services | 17 | 112 |
| professional-and-business-services | 16 | 101 |
| manufacturing-and-industrial | 15 | 162 |
| automotive-heavy-equipment-and-mobility | 15 | 125 |
| environmental-engineering-and-testing | 15 | 114 |
| construction-real-estate-and-built-environment | 14 | 111 |
| hospitality-travel-and-events | 12 | 88 |
| media-marketing-and-creative | 10 | 69 |
| agriculture-and-food | 8 | 110 |
| financial-services / logistics / energy / retail-cpg | 7 each | — |
| saas-and-software / education-and-training | 5 each | — |
| franchising / technology-and-it-services | 4, 3 | — |
| emerging-and-micro-niches / aerospace-and-aviation | 2 each | — |
| **government-nonprofit-and-institutional** | **0** | 121 |

### 4.1 Where the operator and I agree, including the three verticals I said not to buy

**Government, nonprofit and institutional: zero PPC-only niches.** My §3 verdict was "not
paid-viable". The operator reached the same place from the other direction. Strong agreement.

**Emerging and micro-niches: 2 PPC-only out of 114.** My §3 said "mostly NOT paid-viable, and this is
the clearest case of paid wasting a client's money". The two the operator did mark are
`Offshore staffing & dedicated team providers` and `Senior care staffing` — both staffing, both with
a real searching buyer, and both inside the exception set I named. Agreement, and the operator's
grain is finer than mine.

**Healthcare and life sciences: 19 PPC-only, the largest count of any industry — and I agree with
almost all of it.** My §3 said "mostly not paid-search viable. Exceptions: health IT, medical
staffing, medical billing." Read the operator's 19 and the pattern is unmistakable: `Medical staffing
firms` [A], `Travel nurse staffing` [A], `Credentialing and payer enrollment services`,
`Behavioral health billing and RCM`, `Dental supply distributors`, `Vet supply distributors`, `Lab
supply distributors`, `Medical waste management`, `Refurbished medical equipment dealers`,
`Occupational health and employer testing`, `503B outsourcing and compounding facilities`.

**Not one of them is MedTech device selection, CRO selection or CDMO selection** — the three I said a
click cannot enter because they run through conferences, KOLs and a Value Analysis Committee. The
operator did not put those in PPC. **My §3 row was correct in its exclusions and too coarse in its
exceptions**, and the operator's list is the better one. I am recording that as a correction to my own
work, not as a disagreement.

**Platform-restricted categories: 11 of 15 correctly held at AI SEO.** Cannabis testing labs, cannabis
payment processors, cannabis wholesale, hemp ingredients, psychedelic vendors, online casino platforms,
casino game studios, crypto compliance, crypto-as-a-service — all `AI SEO`, none `PPC`. That is the
right call for the right reason (these categories cannot buy the ads), and it matches Nadia's §3.15.
Four are marked `Both` and I flag them in §4.2(d) as policy questions, not as errors.

### 4.2 Where I disagree with the operator's fit assignment, per niche, with the reason

Four classes. The test each one fails is named.

**(a) Fails test 2 — the conversion event is offline and a cold click cannot enter it.** These are
marked `Both`, which asserts paid viability. `conversion-events.md` §2 classifies their event as
`capture: 'offline'`.

| Niche | Operator | My call | Reason |
|---|---|---|---|
| `Regional commercial general contractors` (construction) | Both [B] | **AI SEO** | Work arrives by bid invitation and prequalification through ISNetworld and Avetta. `conversion-events.md` §3.8 has `commercial-contractors` at `bid-invitation` + `prequalification-submission`, both `offline`. Selling a GC paid search is selling them a channel their market does not use |
| `Specialty finish trade subcontractors` (construction) | Both [C] | **AI SEO** | Selected by the GC from a bid list, not by an owner searching. Priority C removes the economic case as well |
| `Architectural millwork & casework contractors` (construction) | Both [C] | **AI SEO** | Same. The buyer is the GC or the architect's spec, and `building-materials`' real event is `spec-request` |
| `Public sector staffing` (government) | Both [B] | **AI SEO** | Won on a state master contract or an RFP schedule. The searching buyer is the candidate, not the agency |
| `ITAR-registered precision machine shops` (government) | Both [B] | **AI SEO** | Program awards flow through prime supplier qualification. Also carries ITAR constraints on what may be published at all |
| `Military cable & wire harness assemblers` (government) | Both [B] | **AI SEO** | Same structure |

I am **not** contesting `MIL-SPEC component & obsolescence distributors` [Both, B] in the same
sub-industry. A buyer searching a discontinued part number is transactional, reachable cold, and maps
to `cross-reference-lookup`. The operator drew that line correctly and I want the disagreement narrow
enough to be actionable.

**(b) Fails test 4 — the non-buyers cannot be excluded, or a platform policy gates the category.**

| Niche | Operator | My call | Reason |
|---|---|---|---|
| `Professional skincare and injectable suppliers` | PPC [C] | **AI SEO**, or `Both` at best | Two separate problems stacked. `professional skincare supplier` pulls consumers and solo operators at far higher volume than the clinic group that is the buyer, and injectables sit inside platform healthcare-advertising policy. PPC-*only* means paid carries the whole vertical, and paid is the channel most likely to be refused here |
| `Lab equipment manufacturers` | PPC [B] | **Both** | Not a targeting failure — an auction failure. On `lab equipment` terms the manufacturer bids against its own distributors and against marketplaces that can quote instantly. The manufacturer's real event is `evaluation-unit` and it loses the click to whoever quotes fastest |
| `Business loan marketplaces & brokerages` | PPC [C] | **AI SEO** | The single most saturated auction in B2B financial services, and the searcher on `small business loans` is overwhelmingly below positioning rule 3's affordability floor as a *client*, which is irrelevant, but is also overwhelmingly a micro-business as the *client's buyer*, which is not |

**(c) Under-called — marked AI SEO where the query is transactional and deadline-triggered.** Softer
disagreements, and I would want volume before acting on any of them.

| Niche | Operator | My call | Reason |
|---|---|---|---|
| `Oil & gas inspection services` | AI SEO [B] | **Both** | Regulatory inspection intervals are a recurring deadline. `api 653 tank inspection` sits in the corpus already under TIC and works there |
| `Utility asset inspection services` | AI SEO [B] | **Both** | Same trigger shape. Storm-response and compliance-cycle demand is searched |
| `Emergency management consultancies` / `Emergency management software` | AI SEO [B] | **Both** | Deadline-driven (grant cycles, post-incident). These are not the procurement half of industry 14 |

**(d) Policy check, not a verdict.** Four restricted-category niches are marked `Both`:
`Cannabis cultivation equipment & design-build` [A], `Cannabis extraction & processing equipment` [B],
`Cannabis packaging` [B], `Crypto payment gateways & stablecoin settlement` [B]. Equipment and
packaging adjacent to a prohibited category are a grey zone that platforms adjudicate case by case,
and the cost of guessing wrong is an account suspension rather than a wasted click.
`[NEEDS DATA: current Google Ads and Microsoft Ads policy position on cannabis-adjacent equipment,
packaging and services advertising, and on crypto payment infrastructure, by target market. Confirm at
the platform's own policy documentation. Do not infer from the category name.]`

### 4.3 The correction I owe my own §3

The operator's expansion from 15 verticals to 21 industries exposes that **my §3 verdicts were written
at the wrong grain, and the industry label was never the right unit for a paid-viability call.**

`government-nonprofit-and-institutional` is the clearest case. I marked the whole vertical "not
paid-viable". The operator's 40 `Both` niches show the vertical actually contains three different
businesses:

1. **Firms whose revenue arrives through a public solicitation** — defence subcontractors, public
   sector staffing. Not paid-viable. I was right, and this is the group §4.2(a) contests.
2. **GovTech and NonprofitTech software vendors** — `Permitting software` [A], `Donor management
   software` [A], `Association management software` [A], `Grants management software`,
   `Mass notification & critical event management` [A]. These are software companies. A city clerk
   searches `permitting software`; a development director searches `donor management software`. The
   event is a demo. **Paid-viable, and my blanket verdict was wrong.**
3. **Compliance-trigger consultancies** — `CMMC & DFARS compliance consultants` [A], `GSA schedule
   consultants`, `SBIR/STTR proposal consultants`. A deadline-driven searching buyer, same shape as
   compliance training, which I already marked conditionally viable. **Paid-viable. Wrong again.**

The same correction applies in construction. I said "not viable for AEC firms". But `Geotechnical
engineering firms` [A], `Insurance claims engineering firms` [A] and `Civil engineering & land
development firms` [B] have a private, deadline-driven, searching buyer — a developer who cannot file
a permit without a geotech report, an adjuster with an open claim. Those are good paid verticals. What
is not viable is the *hard-bid public-work half* of the same sub-industry.

**The rule that replaces the industry verdict, and it is the unifying finding of this whole audit:**

> **Paid viability is a property of the conversion event's `capture` field, not of the industry
> label.** Where `conversion-events.md` resolves the event to `offline`, a cold click cannot reach it
> and paid cannot work, whatever the industry is called. Where it resolves to `on-page-form`,
> `file-upload`, `gated-download` or `self-serve`, paid can work, whatever the industry is called.

That makes `b2b-paid-structure.md` §3 a derived table rather than a primary one, and it makes the
`ConversionProfile` type the thing that decides whether an account gets built. It also means the
`unknown` provenance variant now blocks two things instead of one: publication of a page, and the
build of a paid account. I would add that second consequence to the gate rule in §1.1 explicitly.

---

## 5. The contradiction inside the operator's own field definitions: 60 niches are both

`docs/icp-positioning.md` defines the two fields independently:

- **Fit `PPC`** — *"clear commercial search demand"*.
- **Priority `C`** — *"fits, but thinner budgets, **low search demand** or long cycles; opportunistic only"*.

**60 niches carry `fit: PPC` and `priority: C` simultaneously.** They assert clear commercial search
demand and low search demand about the same niche. Examples: `Commercial duct & air system cleaning`,
`Concrete scanning & GPR services`, `Used oil & solvent recycling`, `Court reporting & deposition
services`, `Office water & hydration services`, `Fleet graphics & wrap providers`, `Automatic door
service & inspection`, `Grease trap & liquid waste pumping`.

Three readings, and the operator has to pick:

1. **Priority C means budget, not demand, for these rows.** Most likely, and most of the 60 read that
   way: `Grease trap & liquid waste pumping` has obvious commercial demand and a small firm behind it.
   If so, the field definition's "low search demand" clause is what needs narrowing.
2. **Fit PPC means "paid is the only channel that could work", not "demand is proven".** Also
   defensible, and it changes what the field means everywhere else.
3. **Some rows are genuinely miscoded.** Probably a minority.

**Why this is not pedantry.** The full PPC-only priority split is **A 15 / B 115 / C 60**. Positioning
rule 8 says build priority A first. So 175 of the 190 PPC-only niches are *not* in the first build
wave, and 60 of them sit in a cell that says "buy ads here" and "there is not much to buy" at once.
Anyone sequencing the paid layer off `fit` alone will start with the 60. Anyone sequencing off
`priority` alone will never reach them.

**The 15 PPC-only priority-A niches are the entire near-term paid layer**, and they are worth naming
because they are the only rows where both fields agree:

`Multi-specialty staffing firms` · `PEOs` · `Medical staffing firms` · `Travel nurse staffing` ·
`Business-purpose real estate lenders` · `Retail energy providers for business` · `Industrial
generator dealers & service` · `Event AV & staging rental` · `Farm equipment dealers` · `Food cold
storage warehouses` · `Automotive lift & shop equipment suppliers` · `Car wash equipment & chemical
suppliers` · `General construction equipment rental` · `Accredited calibration labs` · `Construction
materials testing firms`

Every one is archetype D or a transactional distributor: a searching buyer, a geography or a
specification, and a quote or assessment reachable from a cold click. That is a coherent list and it
is the one I would build against.

### 5.1 The economics question that gates all 190, and it cannot be answered today

`b2b-paid-structure.md` §7.1 records the pricing model: **a percentage of managed ad spend with a
monthly minimum.** `docs/icp-positioning.md` rule 3 now publishes the retainer floor: **$3,000/month,
never below.**

Those two facts together create a constraint nobody has computed. A percentage-of-spend model with a
$3,000 monthly minimum implies a **minimum viable client media budget** — below it, the client is
paying a minimum that is a large multiple of the percentage, and the engagement is bad value for them
before a single ad runs. A PPC-only niche is exactly where this bites hardest, because paid is the
whole engagement; there is no AI SEO layer carrying the retainer.

I cannot compute the number and I will not estimate it.

`[NEEDS DATA: the management fee percentage and the monthly minimum. Open since `docs/copy/ppc.md` and
still open at `9299e1d`. `OPERATOR-DECISIONS` #6.]`
`[NEEDS DATA: the minimum monthly media budget below which Qognition declines a paid engagement.]`

**Until both land, no PPC-only niche can be assessed for commercial viability at all** — only for
channel viability, which is what §4 does. The `min_firm_size` floors in the taxonomy are consistent
with rule 3 (146 sub-industries at `$5M+`, 89 at `$10M+`, 61 at `$3M+`), so the *client* can afford
the retainer. Whether the *media budget* on top clears the bar is a different number and it is
missing.

---

## 6. The landing-page destination question

### 6.1 The premise needs correcting first, and the correction is the answer

The question as posed is: Nadia's §2.5 proposes `/lp/<campaign>`, and at 190 PPC niches that is up to
190 landing pages.

**It is not 190, and the reason is §1.2.** Nadia's §2.5 governs **Qognition's own** paid destinations,
for **Qognition's own** campaigns, buying **Qognition's own** Family Q strings — the `A` tier in her
§2.4 (`google ads for manufacturers`, `ppc agency for law firms`, `b2b saas ppc agency`). The 190
PPC-only niches are a segmentation of **who Qognition sells to**. They are not campaigns Qognition
runs. Multiplying one by the other is the Family B / Family Q collapse that `conversion-events.md` §0
exists to prevent, arriving this time through the routing layer instead of the CTA.

A niche is not a campaign. `fit: PPC` on `Accredited calibration labs` means *when Qognition wins a
calibration lab as a client, paid is the lever we pull inside that client's account*. It does not mean
Qognition runs a campaign called "calibration labs".

**So Nadia's recommendation holds, unchanged and unqualified:** paid traffic lands on `/lp/<campaign>`,
`noindex, follow`, excluded from every sitemap generator; `/industries/*` stays the citable artefact
and is never an ad destination. Her reasoning — that a page built to be cited and a page built to
convert are different documents, and one URL doing both is bad at both — is unaffected by the taxonomy
growing to 11,561 entities, because none of those entities is a campaign.

### 6.2 The real number

Bounded by Nadia's own `A`-tier strings, which is the only place in the repo where Qognition-side ad
targets are actually written down: **21 strings across 13 verticals** (16 across the eight tier-A verticals, 5 across five tier-B
verticals), with two verticals
(`media-marketing-creative`, `government-nonprofit`) carrying an explicit *do not buy*.

That is the ceiling on campaigns, not the floor on pages. Pages are fewer than campaigns, because the
unit of a landing page is the **offer plus the message-match group**, not the keyword:

| Layer | Distinct pages | Why |
|---|---|---|
| Offer | 1 | There is one offer: the free snapshot, then a booked walkthrough. `CLAUDE.md` §3. It does not vary by vertical |
| Vertical message-match | ≤ 8 | One per tier-A vertical in Nadia's §2.4, and only for verticals actually funded |
| Door | 2 | The AI SEO door and the PPC door. `docs/icp-positioning.md` says a PPC-only prospect is fully in the ICP, and `ppc-v2.md` says `/ppc` is currently the only surface that tells them so |
| Purchase-intent | 1 | Nadia's Purchase tier is "buy", blocked organically by `OPERATOR-DECISIONS` #5. One page answering a pricing query honestly |

**Realistic first build: three to five `/lp/*` pages. Ceiling at full funding: around ten.** Not 190,
not 21, and the difference between three and ten is a budget decision, not an architecture one.

And the budget is `[NEEDS DATA: monthly paid budget available for Qognition's own site]`, recorded as
$0 in `context.md`, with `CLAUDE.md` §3 putting paid last in the channel order. **At $0, the correct
number of `/lp/*` pages is zero**, and Nadia already said the resting state is acceptable. I agree and
I would rather leave it there than build a route nobody can send traffic to.

### 6.3 How it is built without becoming a second thin-page family

This is the part of the question that survives the correction, because it is a real risk: `/lp/*`
under-specified today is `/locations/*` in eighteen months. Five constraints, each mechanically
enforceable.

**1. A hard ceiling in code, in the same commit as the route.** `data/b2b/icp/index.ts` already
carries the pattern — `publishedIcpPaths()` returns empty and the comment says promotion needs a named
reviewer and the ceiling raised in the same commit. `/lp/*` gets the identical treatment: a
`PUBLISHED_LP_CAMPAIGNS` array, and `scripts/check-b2b.cjs` fails the build when it exceeds the
declared ceiling. The ceiling is a number in the repo that a human has to raise on purpose.

**2. No dynamic segment that can enumerate.** `/lp/[campaign]` with a `generateStaticParams` reading
from the taxonomy is how 190 pages appear by accident. The route takes an explicit array of hand-named
campaigns. If adding a page is not a file, it will eventually be a loop.

**3. A page cannot exist before the campaign that points at it.** Reverse the usual order: the ad
group, the message match and the primary conversion event are agreed first, and the page is built to
that specification. A `/lp/*` page with no live campaign behind it is deleted, not archived. This is
the single strongest anti-thin-page rule available, because it makes traffic a precondition rather
than a hope.

**4. Every page carries the qualification instrument, and that is what makes it not thin.** §3.3(c)
established that in the highest-risk query classes the non-buyer types the same words as the buyer and
negatives cannot separate them. The form does. `snapshot-funnel.md` §4 already specifies four fields
plus post-capture qualification; a `/lp/*` page is the same form with the vertical's own qualifying
question. Content thinness is not the failure mode of a page whose job is a qualified form fill —
**unqualified traffic is**, and the instrument against it is on the page, not in the ad account.

**5. `noindex, follow` plus sitemap exclusion, asserted by a test, from the first commit.** Nadia's
rollback note is already written and already correct. The one thing I would add: `scripts/check-
publication.cjs` should assert `/lp/*` is **absent** from the sitemap, not merely that the baseline is
unaffected. An absence that nothing tests is an absence that returns.

**One thing `/lp/*` must not be used for.** Nadia's §2.5 proposes paid as a *demand probe* for tier-B
verticals, and calls it the highest-value thing paid budget can do for the architecture. I agree that
it is the right use. I do not agree that it can be read as a test. A two-week probe at a budget nobody
has approved, in a vertical with no baseline, produces a click count and a lead count — not a
significant result, and not a comparison against anything. **Report it as "we bought N clicks at a
cost and got M leads", which is a fact, and never as "this vertical converts at X", which would be a
rate from a sample too small to carry one.** The moment that number gets a confidence interval
attached to it in a deck, it has been over-read. `b2b-paid-structure.md` §5.1 says most paid-versus-
organic experiments at B2B volumes cannot reach significance; a single-arm probe cannot reach it
either, because it has no arm to compare to.

---

## 7. What is still blocking, re-verified at `9299e1d`

I re-checked all three rather than assuming. None is fixed. **Do not design around them as if they
were.**

1. **No click ID is captured anywhere in the repository.** `grep` for `gclid`, `wbraid`, `gbraid`,
   `msclkid`, `li_fat_id` and `ttclid` across `lib/`, `app/`, `components/` and `scripts/` returns
   nothing. Without it, offline conversion import is impossible, which means bidding optimises for the
   form fill and never for the sale. This blocks every account build in §4 and §5, in every niche,
   regardless of fit.

2. **`walkthrough_booked` does not exist.** It appears in `docs/design/products.md`, in my own three
   files and in `CLAUDE.md` §8. It appears in no code. The declared North Star event is unimplemented,
   which means there is nothing to bid toward and nothing to report against.

3. **`docs/copy/ppc.md` still claims the capability in the present tense.** Line 58 lists
   *"Conversion tracking that survives the sales cycle, including click ID capture and offline
   conversion import from your CRM"* as a deliverable. `docs/copy/ppc-v2.md` describes itself as
   "three additions, no replacements" and does not touch §3 or §4.
   `[UNVERIFIED: Ruth's replacement sentence is not present anywhere in this repository at `9299e1d`.
   I searched `docs/copy/`, `docs/OPERATOR-DECISIONS.md` and the last twelve commits. If it was
   supplied, it was never applied.]` The fix is one sentence in one file and it should not wait.

4. **Attribution is still stored in `sessionStorage`.** `lib/analytics.ts` uses
   `ATTRIBUTION_STORAGE_KEY` against `w.sessionStorage`. `docs/copy/ppc.md` §4 tells clients
   *"attribution has to outlive the session"* on a site whose own attribution does not. That is a
   credibility problem on the page that sells the capability, not only a measurement problem.

A note on ordering that §5.1's economics question makes sharper: **item 1 is not a paid-layer
nice-to-have, it is the precondition for the entire 190-niche PPC layer having a measurable outcome.**
Building campaigns before it lands means spending a client's money into a reporting chain that stops
at the form fill.

---

## 8. NEEDS DATA register

Carried forward and still open from `b2b-paid-structure.md` §9: items 1–15, all of them. Nothing in
the taxonomy import closed any of them.

New, from this audit:

16. **Family label on `ppc_keywords`.** Operator confirmation that the 1,023 are the client's buyer's
    terms (Family B), so the label can be added to `data/b2b/icp/index.ts`. §1.2.
17. **Resolution of the three bracketed placeholders** in `hospitality-travel-and-events`, or their
    removal. §3.4.
18. **Canonical-side decision for the eight duplicated seed clusters**, on the rule-7 pattern: one
    campaign owns it, the other negates it. §1.3.
19. **Reconciliation of `fit: PPC` with `priority: C`** for the 60 niches that carry both. Which field
    means what. §5.
20. **Current Google Ads and Microsoft Ads policy position** on cannabis-adjacent equipment, packaging
    and services, and on crypto payment infrastructure, by target market. §4.2(d).
21. **Operator ruling on the 12 fit disagreements** in §4.2(a)–(c). The six in (a) are the ones that
    matter most, because a `Both` assignment on an offline conversion event will eventually be read as
    permission to sell a client a channel their market does not use.
22. **The minimum monthly media budget** below which Qognition declines a paid engagement, and its
    relationship to the $3,000 retainer floor. §5.1. Blocks any commercial assessment of all 190
    PPC-only niches.
23. **Whether the `unknown` gate in `conversion-events.md` §1.1 also blocks a paid account build**,
    not only page publication. §4.3.
24. **Partner tier, certification and current brand-usage rules for paid advertising** for each of the
    six ecosystem-brand terms in §3.4 (AWS, NetSuite, Salesforce, Amazon, Walmart, TikTok). Blocks ad
    copy using those marks, not the keywords themselves.
