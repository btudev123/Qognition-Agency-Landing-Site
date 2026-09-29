# The ICP page system: what is authored, what is derived, and which levels can carry a page

Owner: Theo (content). Date: 2026-09-29. Branch: `b2b-ai-search`. HEAD at time of writing: `9299e1d`.
Status: **system specification. Nothing here is approved until Ruth (`brand-guard`) has run.**

Reads against, in this order: `docs/icp-positioning.md` (operator-locked v2.0, outranks `CLAUDE.md`),
`data/b2b/icp/index.ts` and `icp-taxonomy.json`, `docs/icp-industries/*.md`, `CLAUDE.md` §4 §7 §10 §11,
`docs/seo/b2b-niche-architecture.md` §4.1 (Nadia), `docs/adr/0007-b2b-niche-page-architecture.md` (Kyle),
`data/b2b/types.ts`, `components/b2b/*`.

Worked examples: `docs/copy/icp-worked-branch-contract-manufacturing.md`.

---

## 0. The problem stated honestly

11,561 entities. 21 industries, 341 sub-industries, 2,376 niches, 8,823 sub-niches.

Two route segments exist: `/industries/[industry]` and `/industries/[industry]/[subIndustry]`.
Four taxonomy levels. That gap is the first thing to settle, and it is settled in §3, not by adding
segments until the numbers match.

The failure this system exists to prevent is already in the repo and shipping today.
`data/seoExpansion.ts:384 buildGeneratedServiceSubPage()` builds 119 sub-service pages in which two
of four `sections` are verbatim literal constants and five of six `deliverables` are constants. The
variable part is a name interpolated into a fixed sentence. That is a template wearing a page's
clothes, and at 11,561 entities it is not a survivable pattern.

The counter-pattern is not "try harder". It is **construction**: a page is distinct because every
rendered block is keyed to a field that differs per entity in the source data, and no rendered block
is keyed to a constant. Effort is not a mechanism. Construction is.

---

## 1. The operator's fields, and where each one is allowed to go

This is the centre of the system. The operator supplied six fields per sub-industry and two per
niche. Each has exactly one destination and at least one prohibition. Most of the damage available
at this scale comes from wiring one of them to the wrong slot.

| Operator field | Level it lives at | Where it goes | Where it must never go |
|---|---|---|---|
| `note` | industry | The industry page's lead argument. 21 authored strings, one per industry, already written by the operator | Not a fact. It is the operator's commercial read, so it is never rendered with a figure in it |
| `geo_angle` | sub-industry | Frames the observation block: what we are looking for when we run the panel | **Never an H1, a title tag, a meta description or a target query.** It describes the Family B opportunity. Nadia §1.1 and §8.2 assertion 18 |
| `buyer_titles` | sub-industry | **Our** buyer. Drives the conversion block, the register of the copy, and the outbound target list | **Never `body.buyers[]`.** See §2 |
| `min_firm_size` | sub-industry | The qualification line and the second door. "$10M+ revenue or 100+ employees" is a fit statement | Never a disqualifier sentence. The ICP band is the gate, not the taxonomy (`CLAUDE.md` §2) |
| `client_value` | sub-industry | What one won program is worth **to the client**. Sets why a retainer is rational for them | **Never in the same block as our price.** "$250k–$10M+ per OEM program" beside "$3,000–$20,000/month" reads as a promised return. `CLAUDE.md` §4 |
| `ai_prompts` | sub-industry | Seeds for the observed-answer panel. Family B. We run them, record them, publish the observation | **Never a target query, never an H1, never an FAQ question.** We can never be the cited answer to one |
| `ppc_keywords` | sub-industry | The **client's** paid-search demand. Evidence we know their paid landscape, and the input to the paid-angle block | **Never our own target or our own bid list.** `contract manufacturing services` is typed by an OEM sourcing a builder, not by a CM's marketing director hiring us |
| `fit` | niche | Leads the page angle. Rule 8. See §6 | Never rendered as a label. A reader does not need to know we classified them |
| `priority` | niche | Build order only | Never rendered anywhere, in any form |

### 1.1 The two prohibitions that will actually get broken

**`ai_prompts` and `ppc_keywords` are both the client's buyer's language.** They look like keyword
research because they are keyword research, for a different company. A build that sets
`electronics contract manufacturer` as a page's target query produces a page that competes with its
own prospect, lies to the model about what the page is, and bounces the one visitor it gets. This is
the `/locations/*` failure in a new costume: 632 pages in the Search Console top 1,000 earning 0.13
clicks each per quarter (`docs/seo/gsc-url-group-baseline.md`).

The rule, stated so it can be asserted: **no string from `ai_prompts` or `ppc_keywords` may appear in
an H1, a `<title>`, a `metaDescription`, an FAQ question, or a `buyerQuestion`.** They may appear in
the observed-answer table, in the paid-demand block, and in prose that explicitly attributes them to
the client's buyer. A gate can check this as string containment against the taxonomy.

**`client_value` sits one paragraph from a claims breach.** The field is there so the copy can explain
why a firm winning $250k programs can rationally spend $3,000 to $20,000 a month. The moment that
arithmetic is rendered as a sentence, it is a revenue promise. Write what one program is worth to
them. Never write what we would return.

---

## 2. `buyer_titles` is not `body.buyers[]`, and this is the rule-2 trap

`data/b2b/types.ts` is explicit: `BuyerRole` is "a buyer role on the **CLIENT's** side", and
`researches` is "the artefact this role actually reads".

The operator's `buyer_titles` for Contract Manufacturing & EMS are VP Business Development, VP Sales
& Marketing, Chief Commercial Officer, Director of Marketing. Those are the people who hire **us**.

`body.buyers[]` for the same entity is a VP of Operations at an OEM, a supplier quality engineer, a
commodity manager, an NPI lead. Those are the people whose searches **we observe**.

Wiring `buyer_titles` into `body.buyers[]` produces a page that tells a contract manufacturer's
marketing director that a contract manufacturer's marketing director researches certificate scope.
It is wrong, it is obviously wrong to the reader, and at 341 sub-industries it is wrong 341 times
before anyone notices. It is also the most common way rule 2 gets broken without anyone writing the
word "restaurant".

**The mechanical version.** Two blocks, two audiences, and neither may borrow from the other:

- The **buyers block** is Family B. Client's buyer. Titles plus the artefact, never a title alone.
- The **conversion block** is Family Q. Our buyer. Uses `buyer_titles` verbatim so the reader sees
  their own job on the page.

---

## 3. Which levels can carry a real page

Verdicts first. The reasoning follows.

| Level | Entities | Verdict | Committed pages, honest estimate |
|---|---:|---|---|
| 1 · industry | 21 | **Page.** Thin by nature and must not pretend otherwise | 16 to 21, after the collisions in §7 |
| 2 · sub-industry | 341 | **Page. This is the workhorse level** | 341 is the ceiling. Rate-limited by reviewers, not by URLs |
| 3 · niche | 2,376 | **Page, conditionally.** Most niches are their parent with a narrower label | A minority of the 888 priority-A niches |
| 4 · sub-niche | 8,823 | **Not a page, with one named exception.** On-page section | Low single-digit percentage of 8,823 |

### 3.1 Level 1, industry. A page, and a small one

Twenty-one pages. Each carries the head term, the entity anchor for the vertical, and the crawl hub
for everything below it. The operator wrote a `note` for each one and those 21 strings are genuinely
different from each other, so the lead argument is unique by construction.

What an industry page must not do is pretend to be a sub-industry page. Manufacturing & Industrial
spans a machine shop, a packaging OEM, a chemical distributor and a mining contractor. A buyers
block written to hold all four is written to none of them. So the industry page carries the buyer
roles that are genuinely common across the vertical (design engineer, supplier quality, commodity
manager) and sends everything specific downward.

**The counting trap.** "21 sub-industries, 162 niches, 652 sub-niches" is a fact about our taxonomy,
not about the world. It may appear as navigation. It may never be rendered as a market statistic.

### 3.2 Level 2, sub-industry. The workhorse, and the only level unique by construction

341 pages, and the only level where the operator attached six distinct fields to every row. A
sub-industry page is differentiated before a word is written: different `geo_angle`, different
`buyer_titles`, different `min_firm_size`, different `client_value`, different `ai_prompts`,
different `ppc_keywords`.

This is also where the authored cost lands, and the operator should see the arithmetic rather than
discover it. Nadia's minimum observed panel is 8 distinct prompts across 3 engines (§4.1 block 3).
The operator supplied 2 per sub-industry. So **6 more prompts must be authored per page by someone
who knows the niche, and then run**: 341 × 6 = 2,046 authored prompts, plus 341 × 8 × 3 = 8,184
engine runs before a single panel is publishable. That is the real unit cost of this level, and it
is not reducible by better tooling, because the authoring half is a knowledge task.

### 3.3 Level 3, niche. A page only when it changes the committee or the axes

A niche carries exactly two data fields: `fit` and `priority`. That is not enough to differentiate a
page, and any system that says otherwise is proposing a template with two variables.

**The promotion test. All three must be true:**

1. **Different committee.** At least two roles in `body.buyers[]` are not on the parent's list, or
   the same role researches a different artefact.
2. **Different axes.** At least three of the parent's comparison axes are replaced, not narrowed.
   "Tolerance, but tighter" is not a different axis.
3. **Different vocabulary.** At least four terms that do not appear on the parent, each with an
   issuing body and what it gates.

A niche that fails any of the three is a section on its parent page: a row in the scope table and a
sibling entry, not a URL.

**And a fourth requirement that is not a test but a blocker:** three entity-specific sourced facts
that are not inherited from the parent. `data/b2b/types.ts` makes this a compile error rather than a
review finding, because `facts` is a 3-tuple with rest. §4 of the worked-examples document shows a
priority-A niche in the richest branch in this repo failing exactly this, which is the system
working and is the most useful thing in that document.

### 3.4 Level 4, sub-niche. Not a page, except when the trigger changes

8,823 sub-niches, and the overwhelming majority are **scope variants of their niche**. 5-axis versus
Swiss-type machining. Box build versus electromechanical assembly. Compression versus extension
springs. Same buyer, same buying trigger, same comparison axes, narrower scope.

A scope variant is not a page. It is:

- a row in the niche page's scope table, with the one fact that distinguishes it;
- a vocabulary entry where the term is genuinely a term of art;
- an anchor target with a stable `#id`, so an internal link or an external citation can point at it.

That last point matters more than it sounds. A sub-niche rendered as a labelled section with a
stable anchor is retrievable and citable without being a URL. The thing the operator wants from
depth 4 is that a buyer searching a narrow term finds a specific answer. An anchor delivers that.
A page delivers that plus 8,822 thin URLs.

**The one exception: a sub-niche that changes the buying trigger.** Not the scope, the trigger. If
the event that starts the search is different, then the buyer, the urgency, the axes and the
evidence are all different, and it is a different page.

`05.02.01.05 Reshoring & dual-sourcing programs` passes: the trigger is a disruption, a tariff move
or a customer sourcing mandate, the search runs the same day, the buyer is supply chain rather than
operations, and the axes are time to first article, tooling transferability, duty and origin, and
qualification burden. Its four siblings under the same niche all fail: box build, electromechanical
assembly, build-to-print and turnkey are scope tiers of one relationship.

One in five, in a priority-A niche, in the best-evidenced branch in the repo. That is the honest
rate to plan against until measurement says otherwise.

### 3.5 What a promoted level-4 entity does to the URL

It does not nest. A five-segment URL at depth 5 from the homepage is a worse page for a better
reason, and it breaks Nadia's depth rule (§5.1 rule 10) twice over.

**Recommendation to Kyle, as an ADR-0007 amendment:** one new dynamic segment,
`/industries/[industry]/[subIndustry]/[leaf]`, where a leaf is **either** a promoted niche **or** a
promoted sub-niche. Both mount as children of the sub-industry page, which is the page that holds
the operator payload and the inbound links. Where a niche page exists, it also links to its promoted
sub-niche, so the niche keeps its role in the graph without owning the segment.

Consequences to accept, stated so they are decided rather than discovered:

- Maximum crawl depth becomes 4, not 3. ADR-0007 §5.2's ceiling moves by one, with the argument that
  the ceiling exists to prevent orphans and the parent-renders-children mechanism already prevents
  them. Crawl budget is not the binding constraint on a 3.89K-page domain; evidence per page is.
- A gate assertion is needed: no niche slug may collide with a sub-niche slug **within the same
  sub-industry**, because they now share one namespace.
- The sitemap family and `lib/b2b/graph.ts` stay a tree. Nothing becomes a mesh.

This is a mechanism decision and it is Kyle's, not mine. What is mine is the content requirement it
serves: **a promoted sub-niche must be reachable from the page that has the evidence, not from a
page that exists only to hold it.**

---

## 4. Authored versus derived

### 4.1 The construction rule

> **No rendered sentence may contain the entity's name unless the rest of that sentence also came
> from that entity's own record.**

That single rule separates every legitimate derivation from every template. It is already
mechanically checkable: ADR-0007 §6.3 item 6 substitutes the entity name and its aliases with a
sentinel and fails on near-identical hashes, and item 7 fails any sentence of 12 or more words
appearing verbatim in more than three published bodies.

Derived and safe: blocks whose **shape** is fixed and whose **content** comes entirely from the
record. The facts block, the buyers block, the vocabulary block, the axes block, the observation
table. Shape is furniture. Content is the page.

Derived and forbidden: any prose assembled by interpolating a name into a fixed sentence. "Quick
summary: {name} marketing needs industry proof." "This page links upward to {industry}, sideways to
services and proof." Both of those are live in the existing templates today and both are the
template speaking about itself.

### 4.2 Minimum authored payload, by level

**Level 1, industry.** Renders through `components/b2b/VerticalHubPage.tsx` with a `HubBody`.

| Field | Minimum | Source |
|---|---|---|
| `buyerQuestion` | 1, Family Q, answerable by this page alone | Authored |
| `opener` | 60 words, answer-first, no pronoun referring to the H1 | Authored |
| `metaDescription` | 160 characters, separate field, different job from the opener | Authored |
| `buyers` | 3 or more roles common to the whole vertical, each with `researches` | Authored |
| `facts` | 3 or more, each sourced, each carrying the §5 provenance unit | Iris, then authored |
| `whyTheAnswerIsLost` | 1 mechanism that holds across the vertical | Authored |
| `faqs` | 3 or more, including the honesty question and the guarantee question | Authored |
| `proof` | `kind: 'none'` with a rendered statement, unless a case study resolves | Fixed by §8 |
| `snapshotQuestion` | 1, specific enough that a reader can answer it about themselves | Authored |
| lead argument | The operator's `note`, edited for register only | Operator |

**Level 2, sub-industry.** Renders through `components/b2b/SubNichePage.tsx` with a `SubNicheBody`.
Everything above, plus:

| Field | Minimum | Source |
|---|---|---|
| `vocabulary` | 6 or more terms, each with issuing body and what it gates. No term on more than 25% of the family | Authored, verified by Iris |
| `comparisonAxes` | 3 to 5 axes, stated as axes and not as benefits | Authored |
| observed panel | 8 distinct prompts, 3 engines, dated within 90 days | 2 from the operator, 6 authored, all run |
| paid-demand block | The 3 `ppc_keywords`, attributed to the client's buyer | Operator, framed by authoring |
| qualification line | `min_firm_size` and `client_value`, kept apart from our price | Operator, framed by authoring |

**Level 3, niche.** The same `SubNicheBody`, but only the **delta** is authorable. Reusing the
parent's facts fails the uniqueness gate, which is the intended behaviour. If the delta cannot be
written, the entity stays `state: 'spine'` and becomes a section on the parent.

**Level 4, sub-niche.** Authored payload is **one sentence**: the fact that distinguishes this scope
from its siblings, rendered as a row in the parent's scope table. A promoted sub-niche carries the
full level-3 payload and is no longer level 4 in any sense that matters.

### 4.3 The constructions that are banned outright

- A section heading that is a constant across the family and is also an argument. Labels are fine.
  "How It Gets Discovered" over generated prose is not.
- A deliverables list where more than one entry is shared with a sibling page.
- An FAQ answer that survives a find-and-replace of the entity name.
- A `researches` value that would be true for any role in the vertical.
- A comparison axis that is a benefit. "Quality" is not an axis. "Certificate scope by site" is.
- A vocabulary entry with no issuing body. That is a glossary line, and `/glossary/*` already shows
  what a family of those is worth.

---

## 5. The provenance unit. Ruth's rule, made mechanical

Ruth returned FIX on six of nine files and the recurring defect was the same every time: a figure
that carried its publisher, its date and its caveat in my draft arrived in the rendered string
carrying the figure alone. The draft was a table with columns. The page is a sentence with none.

**The binding unit. Four elements, indivisible:**

1. the figure;
2. the publisher, named in the rendered string;
3. the access date;
4. the sample statement, which is **either** the stated sample ("750 engineers surveyed") **or** the
   explicit absence ("the publisher does not state the sample size").

All four in the rendered copy, or the figure does not appear. There is no three-element version.

### 5.1 Which slots carry provenance structurally, and which do not

`components/b2b/blocks.tsx` `FactsBlock` renders `publisher`, `url` and `Accessed {accessedAt}` as
their own fields. So elements 2 and 3 are structural inside `facts[]`. **Element 4 is not.** Nothing
in the component renders a sample size. So even inside `facts[]`, the sample statement must be
written into the `claim` string.

Every other string field on a body renders as bare prose with no provenance affordance at all:

`opener` · `metaDescription` · `whyTheAnswerIsLost` · `buyers[].researches` · `vocabulary[].gates` ·
`comparisonAxes[].whatBuyersAsk` · `faqs[].answer` · `proof.statement` · `snapshotQuestion` ·
`DraftBody.summary`

In those slots, **all four elements go in the sentence, or the figure does not go in the sentence.**
In practice the right answer is almost always to move the figure to `facts[]` and let the FAQ point
at it.

### 5.2 A live violation, in shipped code

`data/b2b/bodies/manufacturing-industrial/cnc-machining.ts`, first FAQ answer:

> "The 2026 State of Marketing to Engineers research records technical buyers completing 62% of the
> journey before contacting a vendor."

Figure present. Publisher partial: the report is named, but GlobalSpec, TREW Marketing and Elektor
International Media are not. No access date. No sample statement, and this is the one source in the
whole palette whose summary page does not state n. That is Ruth's defect, in `data/`, on the branch,
today. It needs fixing in the same pass as anything else that touches that file.

The corrected form:

> "The 2026 State of Marketing to Engineers report from GlobalSpec, TREW Marketing and Elektor
> International Media records technical buyers completing 62% of the journey before contacting a
> vendor, read on 28 September 2026. The publisher does not state the sample size."

Longer, and that is the cost. It is also the sentence a model can lift and attribute, which is the
whole point of the block.

### 5.3 The gate item this needs

**`scripts/check-b2b.cjs`, new item 12.** Over every string field in `data/b2b/bodies/**` other than
`facts[].source`:

- Find any digit adjacent to `%`, any "out of N", any "N in N", any integer of three or more digits,
  and any four-digit year used as a measurement rather than a date of effect.
- For each hit, require in the **same string**: a publisher name drawn from a closed list, a date,
  and one of the two sample clauses.
- Fail with the file, the field and the offending substring named.

This is the mechanical form of Ruth's rule, it is cheap, and it is the only thing that stops the
defect recurring on page 400 when nobody is reading drafts against tables any more.

---

## 6. The template's own constants, which the gate cannot see

ADR-0007 §6.3 item 7 caps boilerplate by scanning **bodies**. The constants that matter most are not
in bodies. They are in the components, where the gate does not look.

From `components/b2b/SubNichePage.tsx`, rendered identically on every page in the family:

- The H1: `AI search visibility for {subNiche.label}.` A constant with one variable. It also does
  not match Nadia §2.3, which specifies the sub-niche H1 as `<sub-niche>: what buyers ask AI, and
  who gets named`. One of the two is wrong and it should be decided rather than left divergent.
- `"This page sits under {label}, which covers the rest of the vertical and the same four search
  surfaces."` Fourteen words of constant on every page, invisible to item 7.

From `blocks.tsx`, three sentences of constant prose above every facts block, two above every
vocabulary block.

**The rule.** Template-level prose is **furniture, not argument**. A constant may be a label or a
column header. A constant may not be a sentence that makes a claim, and no constant may exceed one
sentence. Anything longer moves into the authored payload, where it becomes per-entity and where the
uniqueness gate can see it.

**Gate extension:** item 7's scan must include string literals in `components/b2b/*.tsx`. A twelve
word sentence rendered on 341 pages is worse than the same sentence stored on 4 of them, and today
only the second one fails the build.

---

## 7. Rule 8: leading with the fit, at levels where fit does not exist

`fit` is a **niche** field. Levels 1, 2 and 4 do not have one. Rule 8 still applies to every page, so
it needs a derivation that is stated rather than improvised.

| Level | Leading angle |
|---|---|
| 1 · industry | The modal fit of its niches. Ties lead with Both |
| 2 · sub-industry | The modal fit of its own niches. Ties lead with Both. Rendered as the order of the two argument blocks, never as a label |
| 3 · niche | Its own `fit`, directly |
| 4 · promoted sub-niche | Its parent niche's `fit`, and where the paid half is genuinely thin the page says so and says why |

What "leading with the fit" means in copy, concretely:

- **AI SEO.** The page opens on the citation and comparison angle: what an assistant returns when the
  client's buyer asks, what the cited pages had in common, and why the client is absent from the
  comparison.
- **PPC.** The page opens on the paid-search angle: the demand that already exists in the client's
  category, using their `ppc_keywords`, and what it costs them to be absent from it.
- **Both.** Both blocks, citation first, paid second, and one sentence connecting them. Never one
  block pretending to be two.

**The PPC block has a hard boundary.** It may say we run paid media for firms in this vertical and
link to `/ppc` once. It may not state or imply that paid is inside the retainer price, because it is
priced as a percentage of ad spend with a monthly minimum (`CLAUDE.md` §1). It may not publish that
percentage or that minimum until `OPERATOR-DECISIONS` #6 lands.

---

## 8. Collisions with the taxonomies already on this domain

The ICP taxonomy is not the only industry list on qognitionagency.com. `data/industries.ts` holds 11
industries and 66 sub-industries, live and indexable. They overlap.

**One hard slug collision.** ICP industry `04` has slug `financial-services`. `data/industries.ts`
has `id: 'financial-services'`. ADR-0007 §6.3 item 2 fails the build on exactly this, and it is right
to: a collision silently shadows a legacy page on a shared route.

**Seven entity overlaps**, where the slugs differ but the entity is the same or contains the other:

| Legacy entry | ICP entity | Nature |
|---|---|---|
| `manufacturing` "Manufacturing & Industrial" | `05` `manufacturing-and-industrial`, same display name | Same entity, two URLs |
| `industrial-trade` "Industrial & Trade" | `05` | Legacy is a subset |
| `law-legal`, `accounting-cpa`, `consulting` | `02` `professional-and-business-services` sub-industries | Legacy sits one level below the ICP industry |
| `real-estate` | `07` `construction-real-estate-and-built-environment` | Legacy is a subset |
| `coaching` | `10` `education-and-training` | Partial, and legacy includes consumer coaching, which rule 4 excludes |
| `waste-management` | `18` / `19` | Split across two ICP industries |
| `care-homes`, `elder-care` | none | Consumer. Outside the ICP entirely (rule 4) |

Two URLs for one entity is an entity-resolution defect before it is an SEO problem. Nadia §3.4 makes
entity consistency a precondition for citation, and `OPERATOR-DECISIONS` #1 already records the
company's own entity being contradicted across `/contact`, `/about` and third-party directories.
Adding a second Manufacturing & Industrial page makes that worse on a page we control completely.

### 8.1 Two options, and a recommendation

**Option A, recommended. One entity, one URL.** Where a legacy industry covers the same entity, the
legacy URL **is** the level-1 hub. Its copy is rewritten in place through `data/industries.ts`, which
is what `docs/copy/industries-manufacturing.md` already specifies for `/industries/manufacturing`. ICP
sub-industries mount beneath it at `/industries/manufacturing/<sub-industry-slug>`.

- Costs: the URL carries the legacy slug, not the ICP slug, which brushes rule 6. The registry must
  resolve a B2B child under a legacy parent, a case ADR-0007 did not contemplate. The legacy parent
  page needs a children block, which is an addition to an existing page and is the same operator
  decision ADR-0007 already flagged as blocking for `/industries/page.tsx`.
- Gains: no duplicate entity, no new URL family, no consolidation decision deferred forever, and the
  level-1 copy is already written.

**Option B. New hub at the ICP slug**, legacy page left live. Cheap to build, and it leaves two
industry pages about the same entity competing on the same domain, which the uniqueness gate will
flag against each other and which splits the entity. It also defers a 301 decision that gets harder
every month the new page accrues links.

**Recommendation: Option A, with the rule 6 tension declared and signed off, not quietly absorbed.**
Rule 6 governs slugs and IDs as data. This is a route-map decision on a route map that was never
derived from the taxonomy. That distinction is defensible, and it is the operator's to confirm.

`financial-services` needs the same decision and cannot wait, because it fails the build.

---

## 9. What this system actually authorises, in numbers

The operator asked for a system for 11,561 pages. The honest output of this system is not 11,561
pages, and saying so now is cheaper than discovering it at page 400.

| Level | Entities | Pages this system authorises | Why |
|---|---:|---|---|
| 1 | 21 | 16 to 21 | After §8's collisions resolve |
| 2 | 341 | 341, rate-limited | Unique by construction. The limit is reviewer capacity and prompt runs, not quality |
| 3 | 2,376 | A minority of 888 priority-A | Three-part test in §3.3, plus three non-inherited sourced facts |
| 4 | 8,823 | Low single-digit percentage | Trigger-change test only. The rest are sections with anchors |

Everything not promoted stays `state: 'spine'`: no route, no sitemap entry, 404 on request, zero
crawl cost, zero build cost. The taxonomy stays complete and reviewable as data. That is the correct
resting state and it is not a failure of the build.

**The binding constraint is not URLs and it is not writing.** It is three sourced facts and a named
reviewer per page. `CLAUDE.md` §7 requires both, `data/b2b/types.ts` makes the first a compile error,
and `ReviewerName` being a closed union makes the second one. Neither is reducible by tooling.

---

## 10. What must never appear on a page built from this system

- A figure without all four elements of the §5 provenance unit.
- A string from `ai_prompts` or `ppc_keywords` as a target query, H1, title, meta description or FAQ
  question.
- `client_value` in the same block as our price, or any arithmetic joining them.
- A price, a plan or an implication below $3,000 per month (rule 3).
- Any consumer framing. The buyer is always the B2B firm (rule 2). "Restaurant tech" is the software
  company. "Home services franchisors" is the franchisor recruiting franchisees.
- An invented client, logo, result, metric, testimonial or case study (rule 10). Marked TODO instead.
- A proof block on any vertical outside managed IT and cloud, cybersecurity, and B2B SaaS in part.
  Everywhere else the `none` variant renders and says why.
- The HVAC or dental case studies on any B2B page, in any framing.
- Any present-state assertion about what an assistant returns, without platform, prompt set and date.
- Any promise of ranking, citation or placement.
- A greyed-out, blurred or placeholder observation row. The `unobserved` state is designed and is
  load-bearing copy.
- Banned words: unlock, elevate, leverage, seamless, cutting-edge, game-changer, revolutionize,
  supercharge, "in today's fast-paced world", plus `CLAUDE.md` §10's list. No em dashes.

---

## 11. NEEDS DATA and open decisions

- `[NEEDS DATA: reviewer hours available per month, and measured hours per page review for the first
  ten pages.]` Every volume number in §9 is a ceiling, not a schedule, until this exists. Carried
  from Nadia §1.6.
- `[NEEDS DATA: the observation engine. No prompt run has been executed against any B2B entity.
  `OBSERVATION_RUNS` and `STORED_ANSWERS` are both empty and that is the correct state today. No page
  may describe a run that was not run.]` Carried from Nadia §0.3 decision 3.
- `[NEEDS DATA: named reviewer and review date per page.]` Required by `CLAUDE.md` §7 and by
  `ReviewerName`. Not something content can supply.
- `[NEEDS DATA: sample size and field dates for the 2026 State of Marketing to Engineers report. The
  summary page does not state n.]` Until it exists, every figure from it carries the explicit absence
  clause, which is the §5 rule working as intended rather than a gap.
- `[NEEDS DATA: primary-source verification of issuing body and current edition for vocabulary terms
  not in Iris's sourced list, specifically IPC-A-610, J-STD-001 and AS6081.]` Vocabulary terms are not
  sourced by the type system, so they need a research pass before a body file is written.
- **Operator decision: §8.1 Option A or Option B.** Blocks level 1 in five industries and blocks the
  build outright for `financial-services`.
- **Operator decision, via Kyle: the `[leaf]` segment in §3.5.** Blocks every level-3 and level-4 page.
- **Kyle: gate items 12 (§5.3) and the item 7 extension (§6).** Neither is a content change.
- Carried, unresolved: `OPERATOR-DECISIONS` #1 (the office claim, which weakens every page built on
  the contradicted entity) and #6 (the PPC fee and minimum, which caps what the paid block can say).
