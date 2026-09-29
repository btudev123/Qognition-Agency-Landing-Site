# Worked branch: four levels, one priority-A chain

Owner: Theo (content). Date: 2026-09-29. Branch: `b2b-ai-search`.
Status: **draft copy. Not approved until Ruth (`brand-guard`) has run.**

System: `docs/copy/icp-page-system.md`. Brief: `docs/copy/00-brief-v2-b2b-universe.md`.
Industry brief read before writing, per rule 9: `docs/icp-industries/05-manufacturing-and-industrial.md`.
Substance: `docs/research/b2b-vertical-substance.md` §3 (Iris, 2026-09-28).

## The chain, and why this one

```
05        manufacturing-and-industrial        Manufacturing & Industrial
 05.02    contract-manufacturing-and-ems      Contract Manufacturing & EMS
  05.02.01   full-service-contract-manufacturers    priority A · fit Both
   05.02.01.05  reshoring-and-dual-sourcing-programs
```

Chosen because the evidence is deepest here and nowhere else comes close. Four dated, sourced
regulatory facts land in this branch (FDA QMSR, the CMMC acquisition rule and its DFARS clause, IATF
16949, Nadcap). The industry brief is the longest of the 21. The buyer research is the only
primary-sourced buyer research in the repo. And the sub-industry's own `ai_prompts` name a shortlist
question and a country, which is exactly the shape the observation panel is built from.

It was also chosen because it is hard. There is **zero Qognition delivery history in manufacturing**,
so every page below carries the `proof: none` statement rather than a case study. If the system holds
here it holds where there is more to lean on.

**One thing the operator should read before the copy.** Three of these four pages are publishable
today. The third is not, and the reason is worth more than the copy: in a priority-A niche, in the
best-evidenced branch in this repo, I cannot find three sourced facts that are not its parent's. The
type system stops it publishing. That is the honest price of depth 3, shown rather than asserted.

---

# Page 1 · Level 1, industry

**Entity** `05` `manufacturing-and-industrial` · Manufacturing & Industrial
**Leading angle** Both, provisionally. `[NEEDS DATA: the modal fit across this industry's 162 niches,
computed from `icp-taxonomy.json` rather than estimated. Both is the safe default under
`icp-page-system.md` §7 and is what the copy below assumes, but the derivation should be a script and
not a judgement.]`
**The one claim this page owns**

> An industrial buyer eliminates suppliers from facts that are readable, and the industry publishes
> those facts as adjectives on a page and as numbers inside a PDF. The elimination is invisible: no
> enquiry arrives, so nothing is logged.

**Route, and the decision it depends on.** Under `icp-page-system.md` §8.1 Option A this page is the
existing `/industries/manufacturing`, rewritten in place, and the copy below merges into the plan
already in `docs/copy/industries-manufacturing.md` (§0 collisions, §3 `painPoints`, §4 `solutions`,
§5 `faqs`). Under Option B it is a new URL at `/industries/manufacturing-and-industrial` and ships as
the body below. **Recommendation: Option A.** The blocks below are written so both readings work.

**Target files (Option B / new-spine form)**
`data/b2b/bodies/manufacturing-industrial/hub.ts`, exporting a `HubBody` from `data/b2b/types.ts`.
Renders through `components/b2b/VerticalHubPage.tsx`.

| Block | Target component | Content |
|---|---|---|
| H1 | `VerticalHubPage.tsx` L65 | Template constant plus label. See note below |
| Question + opener | `VerticalHubPage.tsx` L77-L82 | `body.buyerQuestion`, `body.opener` |
| Operator lead | `VerticalHubPage.tsx` L94-L97 aside | The operator's `note` |
| Observed answers | `components/b2b/ObservationBlock.tsx` | `unobserved` state today |
| Why the answer is lost | `blocks.tsx` `WhyLostBlock` | `body.whyTheAnswerIsLost` |
| The buyer, named | `blocks.tsx` `BuyersBlock` | `body.buyers` |
| Dated facts | `blocks.tsx` `FactsBlock` | `body.facts` |
| Sub-industries | `blocks.tsx` `ChildrenBlock` | Derived from the graph |
| Service links | `blocks.tsx` `ServiceLinksBlock` | Fixed 5-link block |
| Proof | `blocks.tsx` `ProofBlock` | `body.proof`, `kind: 'none'` |
| FAQs | `blocks.tsx` `FaqsBlock` | `body.faqs` |
| Snapshot CTA | `blocks.tsx` `SnapshotCta` | `body.snapshotQuestion` |

**Two notes on the shell, both for Kyle rather than for copy.** The H1 is the constant
`AI search visibility for {vertical.label}.`, and the eyebrow above it renders
`Tier {vertical.tier} vertical`. The eyebrow publishes our internal demand classification to the
reader, tells them nothing they can act on, and is the same string on every page in the tier. It
should be the operator's `note` category or nothing. Per `icp-page-system.md` §6 the H1 constant also
diverges from Nadia §2.3.

### `buyerQuestion`

> Why does a buyer finish researching our category without ever reaching our site?

### `opener` (59 words)

> Industrial buyers narrow a field from facts they can read: process, material, certification scope,
> capacity and lead time. Most manufacturers publish those as adjectives on a web page and as numbers
> inside a PDF. Directories and marketplaces publish the same facts as structured text per supplier.
> The directory gets named in the comparison, and the manufacturer never sees the search that removed
> it.

### `metaDescription` (147 characters)

> Buyers shortlist manufacturers from facts they can read. We measure what assistants answer about
> your category, name the platform, and date every observation.

### Operator lead, rendered in the aside

The operator's `note`, used verbatim as the one place the spine speaks:

> One won OEM program, supply contract or equipment order is worth six to seven figures, and engineers
> and sourcing teams now shortlist suppliers on Google and in AI answers before they call sales.

### `buyers` (client's buyer, Family B)

Four roles that hold across the whole vertical. Anything narrower belongs at level 2.

1. **Design or application engineer at an OEM.** Researches whether the part or the machine is
   makeable here before anyone is contacted: capability stated as a range, materials by designation,
   envelope and capacity. They already have the model or the specification.
2. **Supplier quality engineer.** Researches certificate scope by site, first article and inspection
   practice, material traceability, and whether sub-tier control is documented, because their employer
   inherits it. This role rarely shows up in a supplier's analytics and routinely decides the outcome.
3. **Commodity manager or strategic buyer.** Researches which registration covers which plant, whether
   it is current, real minimum order quantity, and whether a second source exists. They are assembling
   the internal justification that gets a new supplier onto the approved vendor list.
4. **Plant or reliability manager.** Researches lead time behaviour, spares and service coverage, and
   what happens when a line stops. Their search starts on the day of the failure.

### `facts`

Each carries the four-element provenance unit from `icp-page-system.md` §5, inside the `claim` string,
because `FactsBlock` renders publisher, URL and access date but not sample size.

1. > The 2026 State of Marketing to Engineers report, conducted by GlobalSpec, TREW Marketing and
   > Elektor International Media, records technical buyers completing 62% of the buying journey before
   > contacting any vendor, and approximately 66% for engineers aged 35 and under. Read on 28 September
   > 2026. The publisher does not state the sample size.
   `source:` `https://www.trewmarketing.com/state-of-marketing-to-engineers-research-report` ·
   GlobalSpec, TREW Marketing and Elektor International Media · `2026-09-28` · `observed`

2. > The same report finds engineering experts at vendor companies are the most trusted content
   > authors, with 66% rating them very or extremely trustworthy. Read on 28 September 2026. The
   > publisher does not state the sample size.
   `source:` same URL · `2026-09-28` · `observed`

3. > The EETech Buyer Journey Study 2026 surveyed 750 engineers, found 84% are decision-makers or
   > strong influencers, and identifies a distinct procurement handoff problem in which an engineer
   > champions a supplier and the approved vendor list process then blocks it. The same study finds
   > availability has become more critical than technical performance in vendor selection. Stated
   > sample: 750 engineers. Read on 28 September 2026.
   `source:` `https://www.eetech.com/buyer-journey-study-2026` · EETech · `2026-09-28` · `observed`

4. > The FDA's Quality Management System Regulation became effective on 2 February 2026. It amends
   > 21 CFR Part 820 and incorporates ISO 13485:2016 by reference together with clause 3 of ISO
   > 9000:2015. From that date the FDA discontinued the Quality System Inspection Technique and began
   > using Compliance Program 7382.850.
   `source:` `https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-management-system-regulation-qmsr`
   · U.S. Food and Drug Administration · `2026-09-28` · `observed`

5. > The 48 CFR CMMC acquisition rule took effect on 10 November 2025 under clause DFARS
   > 252.204-7021. A supplier holding federal contract information or controlled unclassified
   > information needs the required level as a condition of award.
   `source:` `https://www.acquisition.gov/dfars/252.204-7021-contractor-compliance-cybersecurity-maturity-model-certification-level-requirements.`
   · Acquisition.gov, DFARS 252.204-7021 · `2026-09-28` · `observed`

No figure in facts 4 and 5, so no sample clause. Dates of effect are not measurements.

### `whyTheAnswerIsLost`

> The industrial answer is a filtered list, and filtering needs comparable values. An assistant asked
> for a supplier with a process, a certification and a region has to place firms side by side on the
> same fields. Directories, marketplaces and RFQ platforms expose exactly those fields, as text, per
> supplier. A manufacturer's own site typically exposes an equipment list, a photograph of the floor,
> a certificate as a scanned image and a capability claim written as an adjective. There is nothing to
> place in the comparison, so the manufacturer is not in the comparison. This is not a ranking problem
> and more pages will not fix it.

### `faqs`

1. **Q.** Nobody buys a machined part or a production line from an assistant. Why does this matter?
   **A.** Because the shortlist forms before the enquiry. The 2026 State of Marketing to Engineers
   report from GlobalSpec, TREW Marketing and Elektor International Media records 62% of the technical
   buying journey completed before any vendor is contacted, read on 28 September 2026, and the
   publisher does not state its sample size. The purchase still happens on a call. The decision about
   which three companies get the call does not. That is the part this work moves.

2. **Q.** We sell through distributors and reps. Does any of this reach us?
   **A.** It reaches you as a naming problem. When the comparison is assembled from published,
   comparable facts, the party that published them gets named. In this vertical that is usually the
   distributor, the marketplace or the directory, not the principal. The fix is not to bypass the
   channel. It is to make sure the facts that identify you as the source are readable on a page you
   own, so the channel's listing and your own site resolve to the same entity.

3. **Q.** Which of our certifications actually matter here?
   **A.** The scope, not the badge. A quality manager is deciding whether qualifying you takes six
   weeks or nine months, and that turns on which processes and which site the certificate covers and
   whether the registration is current. The same applies to AS9100 in aerospace, IATF 16949 in
   automotive, ISO 13485 in medical, and to Nadcap, which is administered by the Performance Review
   Institute and covers 24 separate critical process accreditations rather than being a single badge.

4. **Q.** Have you done this for a manufacturer before?
   **A.** No, and we are not going to imply otherwise because a page exists. Where we have delivered
   is managed IT and cloud, cybersecurity, and B2B SaaS in part, all white-label under signed NDAs,
   which means we can walk you through scope and method but cannot name a client or arrange a
   reference call. The standards vocabulary and the buying committee change between verticals, and an
   adjacent case that does not transfer is worse than no case. What we can do first is run your
   buyers' prompts and show you what came back, with the date on it.

5. **Q.** Can you guarantee we get recommended when a buyer asks an assistant for suppliers?
   **A.** No, and nobody can. We do not own or control these systems, their retrieval changes without
   notice, and the same prompt can return different answers on different days. What we commit to is
   the work, a prompt set you build with us and can inspect, and a dated record of what changed. Every
   number we hand you carries the platform, the prompt set and the date it was observed, so you can
   rerun it yourself.

### `proof`

`kind: 'none'`

> No Qognition client has been published in manufacturing or industrial. Our delivered work is in
> managed IT and cloud, cybersecurity, and B2B SaaS in part, all white-label under NDA. This page is
> capability and method, and says so rather than implying a track record it does not have.

### `snapshotQuestion`

> Which of your capabilities can an assistant read today without opening a PDF?

### Links

**In:** `/industries` hub card. **Out:** the 21 sub-industry children via `ChildrenBlock`; `/seo`,
`/local-seo`, `/ai-seo`, `/geo`, `/ppc` via `ServiceLinksBlock`; `/free-ai-audit`; `/pricing`;
`/case-studies/methodology` from the proof block.

### NEEDS DATA

- `[NEEDS DATA: observed panel. No prompt run exists for this entity. Renders unobserved.]`
- `[NEEDS DATA: named reviewer and review date.]`
- `[NEEDS DATA: sample size and field dates for the 2026 State of Marketing to Engineers report.]`

---

# Page 2 · Level 2, sub-industry

**Entity** `05.02` `contract-manufacturing-and-ems` · Contract Manufacturing & EMS
**Leading angle** Both. Its six niches split four Both, two AI SEO. Citation block first, paid second.
**Route** `/industries/manufacturing/contract-manufacturing-and-ems` (Option A)
**The one claim this page owns**

> A contract manufacturer is eliminated on three values before a conversation starts: volume band,
> certificate scope by site, and country of build. Those are also the three most contract
> manufacturers state as adjectives. Flexible volumes, fully certified, global footprint. An assistant
> comparing builders needs values, so it names the firms that published values.

**Target file** `data/b2b/bodies/manufacturing-industrial/contract-manufacturing-and-ems.ts`,
exporting a `SubNicheBody`. Renders through `components/b2b/SubNichePage.tsx`.

### Operator payload, and where each field lands on this page

| Field | Value | Destination on this page |
|---|---|---|
| `geo_angle` | "Shortlisted by AI tools when OEMs ask who can build, scale or reshore a product, with volume range, certifications and locations cited" | Frames `ObservationBlock`. Never the H1 or the title |
| `buyer_titles` | VP Business Development · VP Sales & Marketing · Chief Commercial Officer · Director of Marketing | The conversion block and the register. **Not** `body.buyers[]` |
| `min_firm_size` | $10M+ revenue or 100+ employees | The qualification line |
| `client_value` | $250k–$10M+ per year per OEM program | The qualification line, kept away from our price |
| `ai_prompts` | 2 supplied | Seeds 2 of the 8 required panel prompts |
| `ppc_keywords` | `contract manufacturing services` · `electronics contract manufacturer` · `pcb assembly services` | The paid-demand block, attributed to the client's buyer |

### `buyerQuestion`

> Why do OEMs shortlist three contract manufacturers and never ask us to quote?

### `opener` (58 words)

> A contract manufacturer is screened out on volume band, certificate scope and country of build
> before anyone makes contact. Those three values decide the shortlist. Most contract manufacturers
> publish them as claims rather than values, so an assistant assembling a comparison has nothing to
> place in the row, and it fills the row from a sourcing platform instead.

### `metaDescription` (152 characters)

> OEMs screen contract manufacturers on volume band, certificate scope by site and country. We measure
> what assistants answer for your category, and date it.

### `buyers` (client's buyer)

1. **VP of Operations or Supply Chain at an OEM.** Researches whether the stated volume band actually
   covers their annual quantity and their mix, and whether a program can go from build one to steady
   state without a second transfer.
2. **Supplier quality engineer.** Researches certificate scope by site, first article practice, and
   whether sub-tier supplier control is documented, because their employer inherits the weakest tier
   in the chain.
3. **Commodity manager or strategic sourcing lead.** Researches which plant holds which registration,
   whether it is current, real minimum order quantity, and whether a second source can be qualified on
   the same tooling.
4. **Hardware engineering lead or NPI manager.** Researches whether design for manufacture engagement
   happens before the drawing is frozen, and what documentation travels with the build when it moves
   from prototype to production.

### `comparisonAxes`

| Axis | What buyers ask |
|---|---|
| Volume band and mix | What annual quantity, at what mix, without a transfer? A firm that quotes 500 and 500,000 is read as quoting neither |
| Certificate scope by site | Which registration covers which plant, and is it current? Scope is the question. The logo is not |
| Country of build and duty exposure | Which country builds it, and what changes if a tariff moves or the customer issues a sourcing mandate? |
| Sub-tier control | Who controls your suppliers' quality, and is that documented? The OEM inherits it |
| NPI to production path | Does the program move from prototype to production inside one organisation, and what documentation moves with it? |

### `vocabulary`

| Term | Issued by | What it gates |
|---|---|---|
| AS9100 | International Aerospace Quality Group, published through SAE | Aerospace and defense programs. A revision of the series is expected. Write AS9100 and do not print a successor designation until the issuing body confirms it |
| IATF 16949 | IATF Global Oversight | Automotive programs. The 2016 edition is a first edition that cancels and replaces ISO/TS 16949:2009. A firm still describing itself as TS 16949 certified is naming a withdrawn standard |
| ISO 13485 | International Organization for Standardization | Medical device work, and since 2 February 2026 it is incorporated by reference into the FDA's QMSR rather than sitting beside it |
| DFARS 252.204-7021 and CMMC | U.S. Department of Defense, via Acquisition.gov | Defense work. The required level is a condition of award where federal contract information or controlled unclassified information is involved |
| ITAR registration | U.S. State Department, Directorate of Defense Trade Controls | Defense article work and who may see the drawing pack. A hard yes or no filter, not a capability claim |
| PPAP and APQP | Automotive Industry Action Group | Automotive production part approval. The submission level the customer requires changes the work substantially and is the most common scoping surprise |
| IPC-A-610 | IPC | Acceptance of electronic assemblies. The class the customer requires changes inspection, rework rules and cost `[VERIFY: issuing body and current edition against the primary before this ships]` |
| J-STD-001 | IPC | Soldering process requirements, and the pairing with IPC-A-610 that a serious EMS buyer checks for `[VERIFY: as above]` |
| Turnkey versus consigned material | Not a standard. A commercial term | Who owns the parts, the shortage risk and the working capital. Buyers use it to mean different things and it belongs here for that reason |

Two of nine terms are marked for verification and neither ships until Iris confirms the issuing body
and the current edition. Six of the nine appear on other manufacturing pages, which is inside Nadia's
25% cap only because this branch is large. `[NEEDS DATA: run the 25% cap across the branch once five
pages exist.]`

### Observed answers

Renders the `unobserved` state from `components/b2b/ObservationBlock.tsx`. The panel, for when the run
happens. Two supplied by the operator, six authored, all Family B and none of them a target query.

1. "best electronics contract manufacturer for low-volume high-mix industrial products" *(operator)*
2. "contract manufacturer in Mexico for box build and final assembly" *(operator)*
3. "who can take over a product build from an OEM that is exiting its own manufacturing"
4. "contract manufacturer that can hold an AS9100 scope across two plants for an aerospace subassembly"
5. "EMS partner for a connected industrial device that needs regulatory testing and firmware loading"
6. "second source contract manufacturer for a control panel currently built by one supplier in China"
7. "which contract manufacturers can build to ISO 13485 and take a device program through validation"
8. "contract manufacturer that can quote both 500 units and 50,000 units of the same assembly"

Panel note that renders with the block: eight prompts, four engines, run on a schedule, raw answers
stored so every row re-derives.

### The paid-demand block (the PPC half of Both)

Placed after the citation argument, before the facts. Target: a new authored block, or the FAQ slot
until one exists.

> Three terms carry the paid demand in this category: `contract manufacturing services`,
> `electronics contract manufacturer` and `pcb assembly services`. Those are your buyer's words, not
> yours, and that is the point. They are the terms your paid programme competes on and they are not
> terms this page tries to rank for. We run paid media alongside the retainer for firms in this
> vertical. It is priced separately, on ad spend with a monthly minimum, and it is never inside the
> retainer price.

`[NEEDS DATA: search volume and cost data for the three terms. No keyword export exists in this repo
and no Ahrefs or Semrush source is connected. Nadia §2.1.]`
`[NEEDS DATA: the PPC management percentage and monthly minimum. OPERATOR-DECISIONS #6.]`

### The qualification line (our buyer, Family Q)

> This is written for a VP of Business Development, a Chief Commercial Officer or a marketing director
> at a contract manufacturer doing $10M or more, or running 100 or more people. One won OEM program in
> this category runs from $250,000 to $10M a year. Retainers start at $3,000 a month.

Note the construction. The client's program value and our retainer are in separate sentences with no
arithmetic between them. Joining them would be a revenue promise (`CLAUDE.md` §4).

### `facts`

Facts 4 and 5 from page 1 carry directly and are the right facts here, plus two that are specific to
this level:

1. > IATF 16949:2016 is the automotive quality management standard and is a first edition that cancels
   > and replaces ISO/TS 16949:2009.
   `source:` `https://www.iatfglobaloversight.org/iatf-169492016/about/` · IATF Global Oversight ·
   `2026-09-28` · `observed`

2. > Nadcap special process accreditation for aviation, defense and space is administered by the
   > Performance Review Institute and covers 24 critical process accreditations, each with its own task
   > group, including heat treating, non-destructive testing, welding, chemical processing and additive
   > manufacturing. A builder that outsources a special process inherits its subcontractor's
   > accreditation gap.
   `source:` `https://www.p-r-i.org/nadcap/` · Performance Review Institute · `2026-09-28` · `observed`

3. FDA QMSR, as page 1 fact 4.
4. CMMC and DFARS 252.204-7021, as page 1 fact 5.
5. EETech 2026 availability finding, as page 1 fact 3.

The uniqueness gate will see three shared facts with the parent. That is inside the bar because the
opener, the buyers, the axes, the vocabulary, the failure mechanism and every FAQ differ. It is worth
watching: if a level-2 page ever shares more than three facts with its parent and differs only in
label, it is a section on the parent.

### `whyTheAnswerIsLost`

> The comparison here is a matrix and contract manufacturers publish a brochure. When an assistant is
> asked to compare builders for a described product, it fills a grid: volume, certification, country,
> capability, contact. Sourcing platforms and industry directories expose those as fields per supplier
> because their whole product is the grid. A contract manufacturer's site typically exposes a services
> list, a plant photograph, a certificate as an image, and a page called Capabilities that contains no
> values. There is nothing to put in the row, so the firm is not in the grid.

### `faqs`

1. **Q.** Our customers are under NDA. We cannot publish who we build for. Does that rule this out?
   **A.** No, and the constraint is normal here. Almost nothing a buyer filters on is confidential.
   Volume band, certificate scope by site, process capability, test capability, country of build and
   documentation practice are all publishable without naming a customer, a price or a part. Where a
   genuine restriction exists, such as ITAR-controlled work, the fact of the registration is itself the
   publishable signal.

2. **Q.** We already come up on the sourcing platforms. Is that not the same thing?
   **A.** It is the opposite of the same thing. When the platform publishes the comparable fields, the
   platform is the cited source and you are an entry inside it. That works until the buyer asks a
   question the platform's fields do not answer, which is most questions about scope, transfer and
   sub-tier control. The work is not to leave the platform. It is to make sure your own pages answer
   the questions the platform cannot, so you are the source on those.

3. **Q.** How many prompts do you run, and how often?
   **A.** We agree a panel with you rather than picking for you. For this category it is eight to
   twenty prompts spanning volume, certification, country and application, run across ChatGPT,
   Perplexity, Gemini and Google AI Overviews. Re-runs are scheduled and the whole history stays on one
   page rather than being split across a page per month. Every row stores the raw answer so it can be
   re-derived rather than believed.

4. **Q.** We want Google Ads, not AI search. Are we a fit?
   **A.** Yes. Any one of AI SEO, classic SEO or paid search qualifies, and plenty of firms in this
   category start with paid because the demand is already there and measurable. Paid is priced
   separately from the retainer, on ad spend with a monthly minimum, so the two decisions can be made
   independently.

5. **Q.** Have you worked with a contract manufacturer before?
   **A.** No. Our delivered work is in managed IT and cloud, cybersecurity, and B2B SaaS in part, all
   white-label under signed NDAs, so we can walk you through scope and method but cannot name a client.
   We are not going to present an adjacent case as if it transfers, because the buying committee and
   the standards vocabulary in this category do not resemble any of them. The first thing we can do is
   run your buyers' prompts and show you the answers, with the date on them.

6. **Q.** Can you guarantee placement in an AI answer?
   **A.** No. We do not control these systems, their retrieval changes without notice, and the same
   prompt returns different answers on different days. What is committed is the run, the record and the
   date.

### `proof`

`kind: 'none'`, same statement as page 1, scoped to contract manufacturing and EMS.

### `snapshotQuestion`

> Is your volume band and your certificate scope by site on a page an assistant can read, or in a
> capabilities PDF?

### Links

**In:** the industry page's `ChildrenBlock`; the breadcrumb and the in-body up-link (two links to the
parent, per Nadia §5.1 rule 1). **Out:** 3 to 5 siblings via `SiblingsBlock`, selected by shared buyer
title then shared standard; the five service links; `/free-ai-audit`; `/pricing`; the promoted
sub-niche in page 4.

### NEEDS DATA

- `[NEEDS DATA: observed panel. Eight prompts specified above, none run.]`
- `[NEEDS DATA: named reviewer and review date.]`
- `[NEEDS DATA: IPC-A-610 and J-STD-001 issuing body and current edition, primary source.]`
- `[NEEDS DATA: keyword volume and cost for the three ppc_keywords.]`
- `[NEEDS DATA: PPC management percentage and monthly minimum. OPERATOR-DECISIONS #6.]`

---

# Page 3 · Level 3, niche. And why it does not publish today

**Entity** `05.02.01` `full-service-contract-manufacturers` · priority A · fit Both
**Route** `/industries/manufacturing/contract-manufacturing-and-ems/full-service-contract-manufacturers`,
which requires the `[leaf]` segment in `icp-page-system.md` §3.5.
**Ships as** `state: 'draft'`. `DraftBody` only. `noindex`, absent from the sitemap, linked from its
parent, and rendered with `components/b2b/DraftNotice.tsx`.

**Why draft rather than published, stated plainly.** This niche passes the three-part promotion test
in `icp-page-system.md` §3.3 and fails the fourth requirement. It has a different vocabulary, different
axes and a partly different committee. It does not have **three sourced facts that are not its
parent's**. Every regulatory fact available to it (QMSR, CMMC, IATF, Nadcap) belongs to Contract
Manufacturing & EMS as a whole. `facts` is a 3-tuple in `data/b2b/types.ts`, so this is a compile
error rather than a review finding, and that is the system working correctly.

This is the single most useful page in this document. In the richest branch in the repo, in a
priority-A niche, depth 3 stalls on evidence, not on writing.

### `DraftBody.buyerQuestion`

> We say full-service. Why do OEMs still ask who does the rest?

### `DraftBody.summary`

> Full-service is a scope claim, and buyers treat scope claims as unverified until a boundary is
> published. The question behind the shortlist is which activities this builder owns outright, which
> it subcontracts, and who controls the sub-tier. Most full-service pages answer the first and skip
> the other two, and the comparison then gets made without them.

### The ownable claim, for when it publishes

> A contract manufacturer that publishes its boundary, including what it subcontracts, is compared. A
> contract manufacturer that publishes only its capability list is filtered. Nobody in this category
> publishes the boundary, because it reads like an admission. To a supplier quality engineer it reads
> like the only honest page on the site.

### The authored delta, ready for the day the facts exist

**`comparisonAxes`**, none of which are the parent's:

| Axis | What buyers ask |
|---|---|
| Material ownership | Turnkey or consigned, and who carries shortage risk and working capital when an allocation hits? |
| Subcontract boundary | Which operations leave the building, to whom, and who audits them? |
| Test ownership | In-circuit, functional and burn-in test, developed by whom and owned by whom at end of life? |
| Fulfilment and direct ship | Does the product ship to the OEM or to the OEM's customer, and who owns the serial record? |
| Program management model | One named programme manager, or a queue? This is the axis every buyer asks about last and weights first |

**`vocabulary`** delta, four or more terms not on the parent: box build, build to print versus build to
specification, turnkey versus consigned, approved vendor list and sub-tier control, NPI transfer
package. These are scope terms rather than standards, which is exactly why they are the delta: the
parent page's vocabulary is a standards vocabulary and this page's is a commercial one.

**`buyers`** delta: the parent's four, minus the design engineer, plus a **Director of Supply Chain**
who researches whether the builder's own supplier base overlaps their own, because an overlap is
concentration risk rather than convenience.

### What is blocking, precisely

`[NEEDS DATA: three or more sourced facts specific to full-service contract manufacturing and not
inherited from Contract Manufacturing & EMS. Iris pass required. Candidate directions, none of them
verified and none of them writable today: published data on the proportion of contract manufacturing
programs that involve a second transfer; any primary source on sub-tier control requirements flowing
down from OEM quality agreements; any primary source on turnkey versus consigned material
prevalence.]`

Until that lands, this entity is a `draft` page and its scope table is also rendered as a section on
its parent, so the content is not lost and no thin URL is created.

### NEEDS DATA

- `[NEEDS DATA: three non-inherited sourced facts. Blocking.]`
- `[NEEDS DATA: the `[leaf]` route segment. Blocking for the URL.]`
- `[NEEDS DATA: named reviewer and review date.]`

---

# Page 4 · Level 4, sub-niche. The one that earns it

**Entity** `05.02.01.05` `reshoring-and-dual-sourcing-programs`
**Leading angle** Both, inherited from the parent niche, with the paid half explicitly qualified.
**Route** `/industries/manufacturing/contract-manufacturing-and-ems/reshoring-and-dual-sourcing-programs`.
Mounted under the **sub-industry**, not under the niche, per `icp-page-system.md` §3.5.
**Body** full `SubNicheBody`. Renders through `components/b2b/SubNichePage.tsx`.

### Why this one and not its four siblings

| Sub-niche | Trigger | Buyer | Verdict |
|---|---|---|---|
| Box build & systems integration | Same as the niche | Same | Section. Row in the scope table |
| Electromechanical assembly | Same | Same | Section |
| Build-to-print manufacturing | Same | Same | Section |
| Turnkey product manufacturing | Same | Same | Section, and it is a commercial term already in the vocabulary block |
| **Reshoring & dual-sourcing programs** | **A disruption, a tariff move, a customer sourcing mandate, or a single-source finding in an audit** | **Supply chain, not operations** | **Page** |

One in five. The test is the trigger, never the scope.

### The one claim this page owns

> A second-source search starts on the day something breaks and runs to a decision inside that week.
> There is no window in which to request a capabilities deck. Whatever decides the shortlist has to be
> already published, already readable and already attributable, or the decision is made without you in
> it.

Supported by a sourced finding rather than asserted: the EETech Buyer Journey Study 2026 records that
availability has become more critical than technical performance in vendor selection.

### `buyerQuestion`

> A customer just asked us to become their second source. Why did they call three other builders first?

### `opener` (57 words)

> Dual sourcing is decided under time pressure by a supply chain lead, not an engineer, and it is
> decided from whatever is already published. The questions are narrow: can this builder take the
> tooling, how long to a qualified first article, which country, and what documentation transfers.
> Builders who answer those in advance are on the list. Everyone else is contacted later, if at all.

### `metaDescription` (156 characters)

> Second-source decisions run in days, from published facts. We measure what assistants answer when a
> buyer looks for a dual source, and date every observation.

### `buyers`

1. **Director or VP of Supply Chain at an OEM.** Researches which builders can take over a defined
   assembly, in which country, with what qualification path, and what the transfer costs in weeks. They
   are usually acting on a risk finding or a customer mandate, and they have a date.
2. **Supplier quality engineer.** Researches what a requalification actually involves at this builder:
   first article, process validation, and whether the existing documentation package can be used or has
   to be rebuilt.
3. **Commodity manager.** Researches tooling ownership and transferability, minimum order quantity at
   the second source, and whether dual sourcing splits volume in a way that loses both prices.
4. **Programme or NPI manager at the incumbent's customer.** Researches whether the second source can
   run in parallel without a design change, which is the question that decides whether the programme is
   a dual source or a migration.

### `comparisonAxes`

| Axis | What buyers ask |
|---|---|
| Time to qualified first article | Weeks from purchase order to an accepted first article, stated as a range with the assumptions named |
| Tooling ownership and transferability | Who owns the tool, can it move, and what is remade rather than moved? |
| Country of build, origin and duty | Where does it get built, what origin does that create, and what happens to duty and to a customer sourcing mandate? |
| Qualification burden carried by the customer | How much of the requalification work lands on the OEM's own quality team? This is the axis that decides it and the one nobody publishes |
| Parallel running capacity | Can this builder run alongside the incumbent at partial volume without a design change? |

### `vocabulary`

| Term | Issued by | What it gates |
|---|---|---|
| First article inspection | Customer quality agreement, referencing the applicable quality management system | Acceptance of the first production part from a new process at a new supplier. The forms and the ballooned drawing are what the customer's quality engineer asks for |
| PPAP resubmission | Automotive Industry Action Group | An automotive second source is a new PPAP, not a copy of the incumbent's. The submission level changes the timeline materially |
| Approved vendor list | Customer's own procurement process | Whether the second source can be bought from at all. An engineer who wants to introduce a builder has to justify it through this process |
| Sub-tier concentration | Not a standard. A risk term | Whether a second source is genuinely independent. Two builders sharing one sub-tier supplier are one source wearing two names |
| ISO 13485 and the FDA QMSR | International Organization for Standardization, and the U.S. Food and Drug Administration | A device second source is a supplier qualification event under a regulation that changed on 2 February 2026 |
| DFARS 252.204-7021 and CMMC | U.S. Department of Defense, via Acquisition.gov | A defense second source must hold the required CMMC level as a condition of award, so dual sourcing inside DoD supply chains has a named clause gating it |
| IATF 16949 | IATF Global Oversight | The automotive second source's own certification. A builder still naming ISO/TS 16949:2009 is naming a withdrawn standard |

### `facts`

Three of these are genuinely about dual sourcing rather than about manufacturing generally, which is
what makes this a page and not a section.

1. > The EETech Buyer Journey Study 2026 surveyed 750 engineers and found that availability has become
   > more critical than technical performance in vendor selection decisions. The same study found 84%
   > of those surveyed are decision-makers or strong influencers, and identifies a procurement handoff
   > problem in which an engineer champions a supplier and the approved vendor list process blocks it.
   > Stated sample: 750 engineers. Read on 28 September 2026.
   `source:` `https://www.eetech.com/buyer-journey-study-2026` · EETech · `2026-09-28` · `observed`

2. > The 48 CFR CMMC acquisition rule took effect on 10 November 2025 under clause DFARS 252.204-7021.
   > A second source on a defense program handling federal contract information or controlled
   > unclassified information needs the required level as a condition of award, so a dual-sourcing
   > decision inside a DoD supply chain is gated by a named clause rather than by preference.
   `source:` `https://www.acquisition.gov/dfars/252.204-7021-contractor-compliance-cybersecurity-maturity-model-certification-level-requirements.`
   · Acquisition.gov, DFARS 252.204-7021 · `2026-09-28` · `observed`

3. > The FDA's Quality Management System Regulation became effective on 2 February 2026, amending 21
   > CFR Part 820 and incorporating ISO 13485:2016 by reference. From that date the FDA discontinued
   > the Quality System Inspection Technique and began using Compliance Program 7382.850. Management
   > review, quality audits and supplier audit reports are inspectable under the new regulation because
   > the exceptions in the old one were not carried over, which changes what a device second source has
   > to be able to show.
   `source:` `https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-management-system-regulation-qmsr`
   · U.S. Food and Drug Administration · `2026-09-28` · `observed`

4. > IATF 16949:2016 is a first edition that cancels and replaces ISO/TS 16949:2009, so an automotive
   > second source's approval runs under the current standard and the incumbent's older documentation
   > does not transfer.
   `source:` `https://www.iatfglobaloversight.org/iatf-169492016/about/` · IATF Global Oversight ·
   `2026-09-28` · `observed`

### Observed answers

`unobserved` today. The panel, eight prompts, all Family B, all authored for this entity:

1. "second source contract manufacturer for a wire harness currently built by a single supplier in Asia"
2. "which US contract manufacturers can take over an existing build with customer-owned tooling"
3. "how long does it take to qualify a second source for a medical device subassembly"
4. "dual source manufacturer for a control panel that has to stay IATF 16949 certified"
5. "contract manufacturer that can run in parallel with our current supplier at partial volume"
6. "reshoring partner for an assembly currently built offshore, without a design change"
7. "which contract manufacturers are CMMC ready and can act as a second source on a defense program"
8. "contract manufacturer in Mexico for box build and final assembly" *(operator, inherited from 05.02
   and kept because it is the same buying question with a country attached)*

### `whyTheAnswerIsLost`

> The second-source question is asked in the present tense and answered from what is already indexed.
> A buyer under pressure asks who can take this over, and an assistant answers from pages that already
> state a transfer path, a qualification timeline and a country. Almost nobody publishes those, because
> they read like commitments. So the answer gets assembled from sourcing platforms, from the incumbent's
> competitors' marketing pages, and from whoever has written anything at all about taking over an
> existing build. Being good at transfers and being findable during one are unrelated, and only the
> second is visible in the answer.

### The paid half, qualified rather than claimed

> There is real paid demand in this category on `contract manufacturing services` and
> `electronics contract manufacturer`. There is very little on the sentences a supply chain lead
> actually types during a second-source search, because those are sentences rather than keywords and
> broad match against them will spend the budget on the head term. This is a page built to be found in
> a research moment, not bought into one. We will say so rather than sell you a campaign against
> inventory that is not there.

That paragraph is the fit rule doing its job: the entity's `fit` is Both, the paid half is genuinely
thin here, and the page says why instead of padding.

### `faqs`

1. **Q.** Our transfer experience is our best asset and it is all under NDA. What can we publish?
   **A.** The method, without the customers. A transfer path stated as stages with a week range, what
   you need from the customer at each stage, what documentation you rebuild versus reuse, and what you
   will not take on. None of that names a client and all of it is what the buyer is trying to find out.
   The page that says what you will not take on is the one that gets believed.

2. **Q.** Is reshoring not just a news cycle?
   **A.** The page is not built on a trend, it is built on a trigger. A single-source risk finding, a
   customer sourcing mandate, a supplier failure or a duty change all produce the same search, and they
   happen whether or not reshoring is in the news. What we measure is what an assistant answers when
   that search runs, and we date it.

3. **Q.** How is this different from your Contract Manufacturing page?
   **A.** Different buyer and different clock. The main page is written for an OEM choosing a builder
   for a new product over months. This one is written for a supply chain lead replacing or backing up a
   builder in days. The certifications overlap. Almost nothing else does.

4. **Q.** Have you done this in manufacturing?
   **A.** No. Our delivered work is in managed IT and cloud, cybersecurity, and B2B SaaS in part, all
   white-label under signed NDAs. We can show you method and scope and cannot name a client. The first
   step we can take is running the eight prompts on this page against your category and showing you
   what came back, with the date.

5. **Q.** Can you guarantee we appear when someone searches for a second source?
   **A.** No. We do not control these systems and their answers vary between runs. What is committed is
   the run, the record and the date.

### `proof`

`kind: 'none'`, scoped to reshoring and dual sourcing.

### `snapshotQuestion`

> If a customer needed a second source next week, which of your transfer facts could they find without
> contacting you?

### Links

**In:** the sub-industry page (parent, two links per Nadia §5.1 rule 1) and the niche page
`full-service-contract-manufacturers` once it publishes. **Out:** five service links; 3 to 5 siblings;
`/free-ai-audit`; `/pricing`.

**One cross-link, and a rule-2 note.** `05.02.06 Mexico shelter & nearshoring providers` is a priority
A niche in the same sub-industry and it overlaps this page's territory. It must not be merged into it.
A shelter operator is a **different kind of firm**, and on that page the shelter operator is our
client, not the OEM. Confusing them would put a page in front of an OEM's supply chain director and
sell it to a Mexican shelter company. Cross-link once, in each direction, with the distinction stated
in the anchor context.

### NEEDS DATA

- `[NEEDS DATA: observed panel. Eight prompts specified, none run.]`
- `[NEEDS DATA: named reviewer and review date.]`
- `[NEEDS DATA: the `[leaf]` route segment.]`
- `[NEEDS DATA: a primary source on typical second-source qualification timelines. Every week range in
  the transfer discussion above is deliberately unquantified for this reason.]`

---

## What the four pages show, taken together

| Level | Publishable today | What it costs | What it gives |
|---|---|---|---|
| 1 · industry | Yes | 5 facts, 4 buyer roles, 5 FAQs. One page per industry | The entity anchor and the crawl hub. Little else, and it should not pretend otherwise |
| 2 · sub-industry | Yes | The above plus 9 vocabulary terms, 5 axes, 6 authored prompts, a paid block | The workhorse. Unique by construction because the operator attached six fields to it |
| 3 · niche | **No.** Draft | The above plus 3 non-inherited sourced facts, which do not exist yet | A genuinely different commercial argument, when the evidence arrives |
| 4 · promoted sub-niche | Yes | Same as level 2 | A different buyer on a different clock. Worth a URL precisely because of that |

The operator's question was whether depth 4 earns its place. In this branch, one sub-niche out of five
does, and it earns it more clearly than the level-3 niche above it does. Depth is not the variable.
**The variable is whether the buying trigger changes**, and that can happen at any level or at none.
