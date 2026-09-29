# B2B off-page authority and citation acquisition

Author: Nadia (search). Written 2026-09-28 against branch `b2b-ai-search`.
**Revision 2, 2026-09-29** — extended for the operator-locked 21-industry taxonomy
(`data/b2b/icp/icp-taxonomy.json` v2.0.0, 11,561 entities). Companion to
`docs/seo/b2b-niche-architecture.md` (revision 3), which covers on-page and the publication mechanics.
This document covers everything that happens on domains Qognition does not own.

**What revision 2 changes: §3 only.** The four-level retrieval ladder in §4.1 is unchanged. The
pre-qualification rule in §4.2 — *never pursue or pay for a placement on a domain that has never
appeared as a cited source in the client's panel* — is unchanged and is the single most important
sentence in the document. The three reporting headings in §6 are unchanged. §5's dated trigger events
are unchanged; two of the six new industries feed directly into §5.3 (CMMC) and one into §5.1
(ISO 9001:2026), noted in place.

**What revision 2 adds: §3.16–§3.21**, source maps for the six industries the locked taxonomy
introduces — Aerospace & Aviation, Automotive/Heavy Equipment & Mobility, Commercial & Facility
Services, Environmental/Engineering & Testing, Retail CPG & Brand Enablement, and Franchising &
Multi-Location. **§0.2's standing caveat applies to every row of them and applies harder**, because
these six were compiled in one pass and none has been fetched or contacted.

Status: **recommendation, not approved.** Not reviewed by Ruth (brand-guard). Nothing here is
client-facing. Several sections below produce client-facing artefacts (pitches, ranked-list
applications, award entries) and every one of those goes through Ruth before it leaves the building.

---

## 0. What this is, and the constraints it is written inside

**Off-page is where ranking and citation diverge most.** The on-page doc establishes the empirical
basis (§6.3 there): ~37.9% of AI Overview citations come from the top 10 organic for the query
([Ahrefs](https://ahrefs.com/blog/ai-overview-citations-top-10/)), but only ~12% of URLs cited by
ChatGPT, Gemini and Copilot rank in Google's top 10 for the same prompt
([Ahrefs](https://ahrefs.com/blog/ai-search-overlap/)). Applied to off-page, that means something
concrete and uncomfortable:

> **A link that helps you rank and a placement that gets you cited are frequently different
> placements on different domains, acquired by different work.**

An off-page programme that optimises for referring domains will buy the first and miss the second. An
off-page programme that optimises for "being mentioned somewhere an AI reads" will buy the second and
miss the first. This document keeps them separate throughout and reports them separately in §6.

### 0.1 Constraints that shape every recommendation here

| Constraint | Source | Effect |
|---|---|---|
| **Every delivered engagement is white-label under NDA** | `docs/research/b2b-vertical-substance.md` §2.2 | **Qognition cannot do client-result PR.** No named client, no testimonial, no reference call, no logo. The document itself states it "does not authorize client contact". Every digital PR angle in §5 is therefore **data-led, not result-led**. This is the single biggest constraint in the document and most off-page playbooks assume the opposite. |
| **No superlative without a cited, dated source** | `clients/qognition-agency/guardrails.md` | Blocks the entire "get on a Top 10 agencies list and put the badge in the footer" motion unless the list has a published, dated methodology and Qognition did not pay for placement. §7.7. |
| **No performance statistics without a verifiable source and date** | `guardrails.md`, `CLAUDE.md` §4 | A pitch to a trade publication cannot contain a client number. It can contain a first-party observation with a date. |
| **The entity is currently self-contradictory across third-party sources** | `OPERATOR-DECISIONS` #1; `context.md` site reconciliation | `/contact` says Mumbai. `/about` and `/team` say Bangalore and Sydney. DesignRush and Tracxn say Gurugram. **This is off-page's problem, not just on-page's**, and it blocks §2. |
| **No `subOrganization` / `parentOrganization` edge between Qognition Agency and Salt Accounting Group** | `context.md`, standing decision | Applies to third-party profiles too. Do not let a directory listing create the relationship edge that the schema decision forbids. Disclose common ownership in prose, never in structured relationship data. |
| **$0/month own marketing spend** | `context.md` | Every paid placement in §3 is a recommendation conditional on budget. `[NEEDS DATA: off-page budget, or confirmation it is zero]` Most of the highest-value items here are free and cost time instead. |
| **Acquisition is not inbound at current volumes** | `CLAUDE.md` §3 | Off-page is a 6–18 month compounding asset. It is not this quarter's pipeline and must not be sold internally as if it were. |
| **No backlink data exists in this repo** | `docs/seo/gsc-url-group-baseline.md` | The ranking half of §6 cannot be baselined yet. `[NEEDS DATA: backlink export]` |

### 0.2 A standing caveat on every source named in §3

I have **not** fetched, verified or contacted any publication, association or directory named in §3
during this pass. The lists are compiled from domain knowledge of these verticals. Publications
merge, shut and change link policy constantly — one example already in the set: HARO shut in December
2024 and reopened in a degraded form in April 2025 (§7.8), and Gartner's review properties changed
owner in February 2026 (§3.1).

**Before any outreach, every row gets a verification pass**: does the domain resolve, is it still
publishing, does it accept contributed content, does it nofollow, and — decisively — has it ever
appeared as a cited source in the prompt panel (§4.2). `[NEEDS DATA: live verification of every row
in §3, with a fetch date]`

Treat §3 as a research target list, not a fact table.

---

## 1. The model: four asset classes

Most off-page work fails because it treats one thing (a link) as the unit. There are four units here
and they behave differently.

| Class | What it is | Primary effect | Reported under |
|---|---|---|---|
| **1. Entity records** | Structured third-party records of who the firm is: name, description, address, founding, leadership, credentials. Wikidata, LinkedIn, Crunchbase, Google Business Profile, professional registries, government registrations. | Resolves the entity so a model can hold a coherent picture of the firm. Mostly `nofollow` and worth nothing for ranking. | **Entity** (§6.3) |
| **2. Retrieved intermediaries** | The pages assistants actually lift from when asked to shortlist a vendor: review platforms, ranked lists, trade-media roundups, association member directories, forums. | Citation. A mention here can put the client's name in an answer **without any link to the client at all.** | **Citation** (§6.2) |
| **3. Editorial links** | Classic earned links from pages with editorial standards: trade press articles, standards-body commentary, research citations. | Ranking authority, and sometimes citation if the host page is itself retrieved. | **Ranking** (§6.1), and citation if it reaches L2 |
| **4. First-party citable assets** | Original data the client owns that other people cite. The observation report in the on-page doc §0.4. | Both, and it is the only class that produces classes 2 and 3 as a side effect rather than by asking. | Both, separately |

**The ordering that matters.** Class 1 before everything. A model that cannot resolve the entity
cannot reliably attach a class 2 or class 3 mention to it. Publishing a strong mention of a firm
whose name, location and description contradict each other across six sources spends the mention on
disambiguation instead of on authority.

**The class most off-page budget goes to is class 3. The class that most decides citation is class
2.** That is the central misallocation in this discipline and it is why §3 is organised by source
rather than by tactic.

---

## 2. Entity consistency is the prerequisite, and it is currently broken

`context.md` and `OPERATOR-DECISIONS` #1 record four different answers to where Qognition is:

| Source | Says |
|---|---|
| `/contact` | London, New York, Dubai, **Mumbai** |
| `/about`, `/team` | London, New York, Dubai, **Bangalore**, Sydney |
| DesignRush, Tracxn | **Gurugram** |
| `/locations/new-york` | disclaims offices that do not exist |
| Footer | LDN · NYC · DXB · BLR · SYD |

Two of those are third-party. That makes this an off-page defect, and the off-page version is harder
to fix than the on-page version because the correction has to be requested and accepted on each
platform, each with its own process and latency.

**Nothing in §3 should be started before decision #1 lands.** Acquiring new entity records while the
entity is contradicted multiplies the contradiction across more sources, and every new record is one
more thing to go back and correct.

**The entity fields that must agree everywhere**, once #1 lands:

- Legal and trading name, spelled identically. `Qognition Agency`, never `Qognition` alone in a name
  field, never `Qognition Agency Pvt Ltd` on some and not others.
- One-sentence description, identical string across all platforms. Write it once, in the repo, and
  paste it. `[NEEDS DATA: the canonical one-sentence description, operator-approved]`
- Founding year. `[NEEDS DATA: founding year — it appears nowhere in this repo]`
- Headquarters, one place, matching `data/siteConfig.ts`.
- Countries served, explicitly labelled as served and never as offices (`CLAUDE.md` §4).
- Leadership names and titles matching `/team`. Note that `/team` currently carries **no LinkedIn
  link on any of the seven leaders** (`context.md`). A named author with credentials is a
  citation-worthiness requirement in the on-page doc §3.4, and an unlinked name is a weaker entity
  than a linked one. Adding those links is the cheapest entity work available.
- Sibling relationship disclosed **in prose only**. Qognition Labs may be linked freely. Salt
  Accounting Group must not receive a machine-readable relationship edge in any directory profile
  that offers a "parent company" or "subsidiaries" field, for the reason recorded in `context.md`:
  a relationship edge is the mechanism by which a retrieval system transfers an unregulated agency's
  claim latitude onto a regulated accounting entity. If a platform requires a parent-company field,
  leave it blank.

**The universal entity record set**, applicable to Qognition and to every client in every vertical:

| Record | Effort | Notes |
|---|---|---|
| Google Business Profile | Self-serve | Only where a real address exists. `CLAUDE.md` §4 forbids presenting countries served as offices, and that rule does not stop at the domain boundary. |
| Bing Places | Self-serve | Materially relevant: Copilot's grounding draws on Bing. |
| LinkedIn company page + complete leader profiles | Self-serve | Consistently one of the most-cited domains in AI-answer studies, especially Perplexity ([Peec AI](https://peec.ai/blog/top-domains-cited-by-ai-search-analysis-based-on-30m-sources)). Method caveats in §4.4. |
| Crunchbase | Self-serve, paid tier for control | Widely ingested. Free profile is enough. |
| **Wikidata** | Credentialed | Worth doing where a reliable public reference exists. Structured, openly licensed, and consumed broadly. **Not the same as Wikipedia** — see §7.9. |
| Wikipedia | **Do not pursue.** | §7.9 |
| Clutch / DesignRush / The Manifest / Sortlist | Self-serve | For Qognition itself and for `media-marketing-creative` clients. For everyone else these are the wrong directories. |
| The vertical's own registry | Credentialed | This is the one that matters and it differs per vertical. §3. |

---

## 3. The per-vertical source map

Twenty-one sections. §3.1–§3.15 are keyed on `data/b2b/verticals.ts`'s fifteen meta-verticals and were
written in revision 1; §3.16–§3.21 are keyed on the six industries the locked ICP taxonomy adds.

> **A naming caution that matters operationally.** The slugs in §3.1–§3.15 are **not** the locked
> taxonomy's slugs (`saas-software` there, `saas-and-software` in the JSON), and the architecture doc
> §0.3 decision 7 has not yet settled which spine owns a URL. **None of the headings below may be used
> as a slug, an id or a route segment** — rule 6. They are section labels for a research document.
> §3.16–§3.21 use the locked slugs because those industries exist only in the locked taxonomy.

**Columns.** *Class* is from §1. *Effort*: **Self-serve** (days, no gatekeeper) · **Credentialed**
(weeks; needs a membership, certification or verified status) · **Editorial** (months; needs a pitch
a human accepts on merit) · **Closed** (not acquirable at this ICP size). *Buys* is the report
heading it lands under: **RANK** · **CITE** · **ENTITY**.

Read §0.2 before using any of this.

---

### 3.1 `saas-software` — SaaS and Software (tier S)

The best-instrumented vertical for off-page, and the only one where review platforms are decisive.

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **G2** | 2 | Credentialed | CITE, ENTITY | **G2 acquired Capterra, Software Advice and GetApp from Gartner; announced 29 Jan 2026, closed 5 Feb 2026** ([PR Newswire](https://www.prnewswire.com/news-releases/g2-to-acquire-capterra-software-advice-and-getapp-from-gartner-302673901.html)). One owner now holds four of the top B2B review properties. That concentrates the risk and the opportunity in one relationship. |
| Capterra / Software Advice / GetApp | 2 | Credentialed | CITE | Same owner since Feb 2026. Treat as one acquisition motion, not four. |
| TrustRadius, PeerSpot | 2 | Credentialed | CITE | Second tier. Worth it where the category is thin on G2. |
| Gartner Peer Insights | 2 | Credentialed | CITE | Reachable at this ICP size. Gartner MQ and Forrester Wave are **Closed** — revenue thresholds. |
| Reddit (`r/sysadmin`, `r/devops`, `r/SaaS`, category subs) | 2 | Editorial | CITE | Consistently among the most-cited domains across studies. **Participation only, disclosed.** §7.10. |
| Hacker News, Stack Overflow, GitHub `awesome-*` lists | 2 | Editorial | CITE | For `dev-tools-apis` specifically, a GitHub list inclusion is a genuinely retrieved artefact. |
| The New Stack, InfoWorld, VentureBeat, The Stack | 3 | Editorial | RANK, CITE | Realistic at this company size with a data-led pitch. |
| TechCrunch, The Information | 3 | Closed in practice | — | Funding-news gated. Do not build a plan on it. |
| SOC 2 / ISO 27001 auditor and Trust Center listings, Vanta/Drata customer directories | 1 | Credentialed | ENTITY | Underused. A compliance-platform trust listing is a dated third-party record of a real credential. |

**The honest position on G2 and Capterra, because the evidence conflicts and vendors sell it as
settled.** One 2026 study reports 100% of tools named in ChatGPT B2B software answers had Capterra
reviews and 99% had G2 reviews ([Quoleady](https://www.quoleady.com/llmo-research/)). Another, running
40 categories ten times each, reports G2 and Capterra receiving zero citations across 233
recommendations, summarised in
[Strive Labs](https://strivelabs.ai/blog/g2-capterra-ai-answers/). Both are vendor-published with
undisclosed or partial method. **Both cannot be right, and the correlation study does not establish
causation in either direction** — the tools with reviews are also the tools with market share.

What to do with that: **do not sell G2 placement as a citation lever.** Recommend it as (a) a real
buyer surface in its own right and (b) an entity record, then **measure it at L2 on the client's own
prompt panel** (§4). That converts a contested industry claim into a first-party observation, which
is the only form of it Qognition is allowed to publish anyway.

### 3.2 `professional-services` — Professional and Business Services (tier S)

Credential registries dominate. The buyer's trust path is licence → peer list → firm.

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| State bar and state CPA society directories | 1 | Credentialed | ENTITY | Free, authoritative, and the licence is the entity's strongest third-party fact. |
| AICPA, ABA, ACC, SHRM, ASA (staffing), NAPEO (PEO), IMC USA member directories | 1 | Credentialed | ENTITY, CITE | Membership fee. Member directories are structured and get retrieved for "find a firm that does X". |
| Chambers and Partners, Legal 500, Best Lawyers, Super Lawyers, Martindale-Hubbell | 2 | Editorial / Credentialed | CITE, ENTITY | Chambers and Legal 500 are submission-based with real editorial process — months of effort, high retrieval value for legal shortlisting. |
| Accounting Today Top 100, INSIDE Public Accounting IPA 500 | 2 | Credentialed | CITE | Revenue-threshold ranked lists. Genuine, methodology-published, and therefore usable under `guardrails.md` if the firm qualifies. |
| Accounting Today, Journal of Accountancy, Bloomberg Tax, Tax Notes, Law360, Consulting Magazine | 3 | Editorial | RANK, CITE | Contributed-article programmes exist at several. A partner byline is the realistic route. |
| Avvo, Clutch | 2 | Self-serve | ENTITY | Low value here. Avvo skews consumer, Clutch skews agency. |

### 3.3 `manufacturing-industrial` — Manufacturing and Industrial (tier S)

The richest off-page vertical in the taxonomy, and the one where **certification registries are the
highest-value asset** because the Family B prompts are certification-qualified by construction (see
architecture doc §3.2).

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **IAF CertSearch, ANAB accredited-certificate directory** | 1 | Credentialed | ENTITY, CITE | **The single best recommendation in this document.** Family B prompts ask for ISO 9001 / AS9100 / IATF 16949 certified suppliers. These registries are the authoritative, machine-readable answer to exactly that. A certificate that is not in an accredited registry is a claim; one that is, is a record. Most manufacturers hold the certificate and have never checked their registry entry. |
| NADCAP / PRI Qualified Manufacturers List | 1 | Credentialed | ENTITY | Aerospace special processes. Same argument. |
| **Cyber AB CMMC Marketplace** | 1 | Credentialed | ENTITY, CITE | See §5.3. Defence-supply-chain discovery runs through it. |
| **SAM.gov entity registration** | 1 | Credentialed | ENTITY | Government-run, free, machine-readable, and an unforgeable record of what the firm is registered to do. |
| Thomasnet / Thomas, GlobalSpec (IEEE), Kompass, MFG.com | 2 | Self-serve / paid | CITE | The incumbent discovery layer, and the thing the client is complaining about ("we only get RFQs from Thomasnet"). Being listed is table stakes; the strategy is not to beat them but to be the named supplier *inside* the answer they are cited in. |
| NAM, AMT, SME, PMA, NTMA, FMA, IPC, SMTA, PMMI, A3 member directories | 1 | Credentialed | ENTITY, CITE | Membership fee. Several publish capability-searchable directories. |
| **NIST MEP centres (51, one per state and Puerto Rico)** | 3 | Editorial | RANK, CITE | Underrated. Publicly funded, regionally focused, hungry for practical content, `.org` and `.gov`-adjacent, and far less competitive than national trade press. The best realistic editorial link in this vertical. |
| IndustryWeek, Modern Machine Shop, Production Machining, The Fabricator, Quality Magazine, Quality Digest, Assembly, Machine Design, Plastics Technology, Packaging World, Control Engineering, Automation World | 3 | Editorial | RANK, CITE | Real editorial desks, small teams, receptive to dated original data. See §5.1 and §5.2. |
| ASQ community and publications | 3 | Editorial | CITE | The audience for the ISO 9001:2026 angle. |
| Review platforms | — | — | — | **There is no meaningful review platform for industrial suppliers.** Anyone selling one is selling a directory. Say so to clients; it is a useful credibility moment. |

### 3.4 `it-services` — Technology and IT Services (tier S)

**Vendor partner directories are the decisive asset here** and they are widely neglected.

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **Microsoft Solutions Partner directory / AppSource, AWS Partner Finder, Google Cloud partner directory, Salesforce AppExchange consultant listings, NetSuite SuiteLife, HubSpot Solutions Directory, Cisco / Fortinet / CrowdStrike partner locators** | 1 + 2 | Credentialed | ENTITY, CITE | Structured, authoritative, vendor-owned, and directly answering the Family B shape ("find a Microsoft Solutions Partner for Modern Work in Texas"). **If the client already holds the certification, the profile is free and usually half-completed.** Highest ratio of value to effort in the entire document. |
| **Cyber AB CMMC Marketplace** | 1 | Credentialed | ENTITY, CITE | Same as §3.3, from the supplier side. Directly tied to the §5.3 trigger. |
| **FedRAMP / StateRAMP marketplace** | 1 | Credentialed | ENTITY, CITE | Public authoritative vendor list. Only for firms that hold an authorisation. |
| CompTIA, ASCII Group, IAMCP, ISACA, (ISC)² directories | 1 | Credentialed | ENTITY | Membership fee. |
| **CRN (MSP 500, Solution Provider 500, Tech Elite 250), Channel Futures MSP 501** | 2 | Credentialed | CITE | The canonical ranked lists in this vertical. Application-based with published criteria, which is what makes them usable under `guardrails.md`. Annual submission windows — diary them. |
| ChannelE2E, MSSP Alert, Redmond Channel Partner, Data Center Dynamics, Data Center Frontier | 3 | Editorial | RANK, CITE | Receptive to channel-relevant data. `MSSP Alert` is the direct audience for §5.3. |
| Clutch, G2 (for the tools the MSP resells) | 2 | Self-serve | ENTITY | Secondary. |
| Reddit `r/msp`, `r/sysadmin` | 2 | Editorial | CITE | Genuinely influential in this vertical and genuinely hostile to marketing. §7.10 applies hard. |

### 3.5 `financial-services` — Financial Services (tier A, flagship)

Regulated. Every item here is reviewed by the named compliance reviewer before it is pursued
(`OPERATOR-DECISIONS` #7).

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **State DOI licensee lookups, NAIC records, FINRA BrokerCheck, NMLS Consumer Access, SEC IAPD** | 1 | Credentialed | ENTITY | Regulator-run. The strongest entity records available in any vertical, and the ones a compliance-minded buyer actually checks. |
| Big I (Independent Insurance Agents & Brokers), **WSIA**, PIA, RIMS, ELFA, IFA, ABA, ICBA, America's Credit Unions member directories | 1 | Credentialed | ENTITY, CITE | WSIA matters specifically for the wholesale and surplus-lines sub-niche in the Family B prompts. |
| AM Best ratings and Best's Directory | 1 | Closed / Credentialed | ENTITY | Carrier-side. Not acquirable for brokers. |
| Insurance Journal, Business Insurance, Carrier Management, Risk & Insurance, American Banker, Banking Dive, PYMNTS, Finextra, Tearsheet, ABA Banking Journal | 3 | Editorial | RANK, CITE | Data-led pitches land here. Result-led pitches cannot be made (§0.1). |
| Datos Insights (formerly Aite-Novarica), Celent | 2 | Closed | — | Analyst, paid, and generally out of band at this ICP size. |
| G2 / Capterra for the fintech sub-niches | 2 | Credentialed | CITE | §3.1 applies. |

### 3.6 `healthcare-life-sciences` — Healthcare and Life Sciences (tier A)

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **FDA establishment registration and device listing, FDA inspection classification database, EUDAMED, NANDO notified-body list** | 1 | Credentialed | ENTITY, CITE | Government-run and directly answering the Family B prompts ("FDA-inspected with no Form 483 observations", "which notified bodies can certify a Class IIb device"). |
| ISO 13485 accredited-certificate registries | 1 | Credentialed | ENTITY | As §3.3. |
| **KLAS Research** | 2 | Credentialed | CITE | The dominant review and ranking surface for health IT. Black Book is second. |
| AdvaMed, MDMA, RAPS, AAMI, HIMSS, HFMA, DIA member directories | 1 | Credentialed | ENTITY, CITE | |
| MedTech Dive, Medical Design & Outsourcing, MassDevice, Fierce Biotech, Endpoints News, Clinical Leader, Outsourced Pharma, **HIStalk**, Becker's | 3 | Editorial | RANK, CITE | HIStalk has outsized influence in health IT relative to its size. Becker's runs many list formats. |
| RAPS *Regulatory Focus* | 3 | Editorial | CITE | The audience for §5.2. |
| G2 / Capterra for health IT | 2 | Credentialed | CITE | Weak here; KLAS dominates. |

### 3.7 `logistics-supply-chain` — Logistics, Supply Chain and Transportation (tier A)

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **FMCSA SAFER / carrier registry, CBP CTPAT validated-partner status, FDA food-facility registration, bonded-warehouse and FTZ listings** | 1 | Credentialed | ENTITY | Government-run, checkable, and exactly what the Family B prompts qualify on. |
| **IATA CEIV Pharma certified-company list, GDP certification, SQF / BRCGS / AIB certificate registries** | 1 | Credentialed | ENTITY, CITE | Directly answers the cold-chain prompt in the architecture doc §3.2. |
| **Inbound Logistics Top 100 3PL, Multichannel Merchant Top 3PL, Food Logistics / Supply & Demand Chain Executive award lists** | 2 | Credentialed | CITE | Application-based annual lists with published criteria. These are the retrieved artefacts in this vertical, in the absence of a review platform. |
| CSCMP, TIA, NCBFAA, IWLA, WERC, IANA member directories | 1 | Credentialed | ENTITY, CITE | NCBFAA matters specifically for the customs-brokerage sub-niche. |
| FreightWaves, Journal of Commerce, Supply Chain Dive, DC Velocity, Logistics Management, Transport Topics, Modern Materials Handling | 3 | Editorial | RANK, CITE | FreightWaves publishes heavily and moves fast; good fit for dated data. |
| Review platforms | — | — | — | None dominant. Do not promise one. |

### 3.8 `emerging-micro-niches` — Emerging and Micro-Niches (tier A)

**The off-page play here is structurally different and should be sold differently.** The category
vocabulary is still forming, so there is no established directory to be listed in and no trade desk
to pitch. The highest-value acquisition is not a link; it is **authoring the definitional artefact
that later gets retrieved.**

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **Wikidata item for the category** (not the company) | 1 | Credentialed | ENTITY | Where a category genuinely lacks an item and a reliable reference exists. |
| GitHub `awesome-*` lists, category wikis, well-maintained comparison repos | 2 | Editorial | CITE | For the technical sub-niches. Cheap and genuinely retrieved. |
| **A dated, first-party market map published by the client** | 4 | Editorial | RANK, CITE | The only reliable route. This is the architecture doc §0.4 applied at category level. |
| ISO/IEC 17025 accreditation registries (testing labs, incl. cannabis) | 1 | Credentialed | ENTITY | |
| Vertical-specific: AgFunder, SpaceNews, Waste Dive, WaterWorld, Senior Housing News, PE Hub | 3 | Editorial | RANK, CITE | Thin desks, receptive to data, low competition. |
| Reddit and Discord category communities | 2 | Editorial | CITE | §7.10. |

**Structural dead ends in this vertical, named so nobody sells around them.**
`cannabis-hemp-b2b` cannot buy Google Ads and is excluded from most mainstream ad platforms and many
directories, so paid and directory levers are unavailable and PR carries disproportionate weight.
`space-satellite-suppliers` and parts of `defence`-adjacent work carry ITAR and EAR constraints on
what may be published at all — a capability page can be an export-control problem, and that is a
legal review, not a marketing decision. `quantum-computing-services` has almost no trade press and
essentially no buyer-side directory; the only realistic surfaces are arXiv-adjacent, academic and
conference. Say these out loud in the sales conversation; they are the kind of specific that proves
competence.

### 3.9 – 3.15 Tier B verticals

These verticals are held at `spine` in the architecture doc §1.6 and get **no off-page programme
until they leave it.** The maps below exist so that a probe or an inbound client can be served
immediately, not to justify starting work.

**3.9 `construction-real-estate`** — **ENR** (the ENR Top lists are the canonical retrieved artefact
in this vertical; application-based, published criteria) · Construction Dive · Building Design+Construction ·
Bisnow · GlobeSt · Commercial Observer. Associations: AGC, ABC, AIA, ACEC, NAIOP, BOMA, IREM, CoreNet.
Registries: **USGBC LEED project directory** and state contractor licence boards (class 1, strong).
Data: Dodge Construction Network, ConstructConnect.

**3.10 `energy-utilities`** — **Solar Power World Top Solar Contractors** and **NABCEP certified-installer
directory** (class 1 and 2, both strong and both application-based). Utility Dive, pv magazine,
Renewable Energy World, POWER, Oil & Gas Journal, Hart Energy, Canary Media, Latitude Media.
Associations: SEIA, ACP, ESA, EEI, NRECA, APPA, NECA, IREC. **Verify Greentech Media's status before
listing it anywhere — it was absorbed into Wood Mackenzie and should not be pitched as a live outlet
without checking.**

**3.11 `education-training`** — **IACET accredited-provider registry** and **ANSI accreditation
directories** (class 1). Training Industry Top 20 lists and directory, eLearning Industry directory
(both class 2, application-based). Media: Chief Learning Officer, EdSurge, Inside Higher Ed, Campus
Technology. Associations: ATD, SHRM, ISTE, EDUCAUSE, ACTE. Review: G2 and Capterra carry the LMS
categories and are live here.

**3.12 `hospitality-travel-events`** — **Hotel Tech Report** is the dominant review platform for hotel
tech and is the single most important row in this vertical (class 2, credentialed). GBTA member
directory, Northstar and Skift Meetings, BTN Corporate Travel 100. Associations: AHLA, HFTP, HSMAI,
GBTA, MPI, PCMA, IAEE, ILEA, National Restaurant Association. Media: Hospitality Net, Skift, Hotel
Technology News, Nation's Restaurant News, Restaurant Business.

**3.13 `agriculture-food`** — **SQF, BRCGS, FSSC 22000 and GLOBALG.A.P. certificate registries**, and the
**USDA Organic Integrity Database** (class 1; public, searchable, authoritative, and exactly what the
Family B prompts qualify on). Associations: IFT, AFIA, AFFI, IFPA, ASABE, NAMA. Media: Food Dive,
Food Business News, Food Processing, Food Engineering, AgFunderNews, Feedstuffs, Meatingplace,
Progressive Farmer.

**3.14 `government-nonprofit`** — **The strongest class-1 set in the whole taxonomy, and it is almost
entirely free.** `SAM.gov` entity registration · **`USASpending.gov` award history**, which is an
unforgeable third-party record of what the firm has actually delivered and is the closest thing to a
public case study any vendor in this taxonomy has · GSA Advantage and GSA Schedule listings · FPDS ·
SBA Dynamic Small Business Search · NASPO ValuePoint · state procurement portals · **FedRAMP
marketplace** · **Cyber AB CMMC Marketplace**. Nonprofit side: Candid/GuideStar profile and IRS Form
990, Charity Navigator. Associations: NASCIO, NIGP, NCMA, NDIA, AFCEA, PSC, ASAE, AFP. Media: GovTech,
StateScoop / EdScoop / FedScoop, Route Fifty, Federal News Network, Washington Technology, Defense
News, Breaking Defense, The NonProfit Times, Chronicle of Philanthropy.
**Do not buy search ads into this vertical** (architecture doc §2.4) — public procurement discovery
runs through these registries, not through a SERP.

**3.15 `media-marketing-creative`** — Clutch, Agency Spotter, The Manifest, DesignRush, Sortlist (class
1 and 2; the same set Qognition uses for itself, which makes this vertical a useful internal test
case). **ASI and PPAI supplier directories** are the entity record for promotional products. Media: Ad
Age, Adweek, Digiday, PRWeek, PR Daily, Folio, Printing Impressions, MarketingProfs. Associations:
ANA, 4A's, PRSA, AAF, PRINTING United.
**Caution:** this vertical is full of firms that will read the content, take the method and not buy.
It is also the vertical where a competitor is most likely to be the one reading. Publish anyway — the
method is not the moat, the time series is — but do not fund it ahead of tier S.

---

### 3.16 – 3.21 The six industries added by the locked taxonomy

**Read §0.2 before using any of this, and read it twice for these six.** Every row was compiled in a
single pass from domain knowledge of the verticals. Nothing below has been fetched, verified or
contacted. `[NEEDS DATA: live verification of every row in §3.16–§3.21, with a fetch date — does the
domain resolve, is it still publishing, does it accept contributed content, does it nofollow, and has
it ever appeared as a cited source in the panel]`

**The pre-qualification rule (§4.2) governs all of it.** Not one of these is a target until it has
appeared as a cited source for a prompt in the client's panel. The maps are a research target list.
They are the input to the panel comparison, not a work plan.

Columns as §3: *Class* from §1 · *Effort* Self-serve / Credentialed / Editorial / Closed ·
*Buys* **RANK** · **CITE** · **ENTITY**.

---

### 3.16 `aerospace-and-aviation` — Aerospace & Aviation

14 sub-industries, 107 niches, 37 priority-A. **Structurally the closest analogue to
`manufacturing-industrial`, and it may be better**: the regulator itself publishes the authoritative
supplier registry, which is rarer than it sounds and is exactly what the Family B prompts qualify on
("business jet service center with hangar slots for a 12-year inspection").

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **FAA Part 145 repair-station listings and the FAA registry; EASA Part 145 / Part 21 approved-organisation lists; UK CAA and Transport Canada equivalents** | 1 | Credentialed | ENTITY, CITE | **The best recommendation in this section.** Government-published, machine-readable, and the unforgeable record of what a shop is *approved* to do — which is the qualifier every supplied prompt in this industry contains. Most operators hold the approval and have never checked how their entry reads. |
| **Nadcap / PRI Qualified Manufacturers List; AS9100, AS9110, AS9120 certificates in the IAQG OASIS database** | 1 | Credentialed | ENTITY, CITE | OASIS is the aerospace supply chain's own accredited-certificate registry. Same argument as IAF CertSearch in §3.3, in a supply chain that checks it more. Feeds §5.1's ISO 9001:2026 angle via the AS91xx revision cycle. |
| **ASA-100 (Aviation Suppliers Association) accreditation and the ASA member directory; AC 00-56 accredited distributors** | 1 | Credentialed | ENTITY | The parts-distribution half of the industry (`16.04`) is qualified almost entirely on this. Free-to-low-cost and widely half-completed. |
| **Cyber AB CMMC Marketplace** | 1 | Credentialed | ENTITY, CITE | Defence-adjacent aerospace suppliers. **Directly tied to §5.3's dated trigger**, which is already in this document and needs no new research. |
| ILS (Inventory Locator Service), PartsBase, Aviation Suppliers Marketplace, Locatory | 2 | Self-serve / paid | CITE | The incumbent discovery layer, and the thing the client complains about. Being listed is table stakes. The strategy is §3.3's: be the named supplier *inside* the answer these are cited in, not to beat them. |
| NBAA, NATA, AEA, ARSA, GAMA, AIA, MRO Association member and service-provider directories | 1 | Credentialed | ENTITY, CITE | Membership fee. NBAA and NATA directories are genuinely used by charter and FBO buyers. |
| Aviation Week Network (Aviation Week & Space Technology, Inside MRO, ShowNews), Aviation International News, FlightGlobal, Flight Safety Foundation, AIN Product Support Survey | 3 | Editorial | RANK, CITE | Real desks, receptive to dated original data. **The AIN Product Support Survey is a published, methodology-stated ranked list** and is therefore usable under `guardrails.md` if the client places. |
| MRO Network / Aviation Week MRO events, Aircraft Commerce, Avionics International, Rotor & Wing International, Vertical Magazine | 3 | Editorial | RANK, CITE | Second tier, still real. |
| Review platforms | — | — | — | **None exist for aerospace suppliers.** The approval registry is the review platform. Say so; it is a useful credibility moment with a client who has been sold a directory package. |

**What to lead with:** approval-registry hygiene (FAA/EASA entry, OASIS certificate scope, ASA-100
listing), then the observation block. Not editorial. Editorial in this industry takes months and the
registries are free and unworked.

---

### 3.17 `automotive-heavy-equipment-and-mobility` — Automotive, Heavy Equipment & Mobility

16 sub-industries, 125 niches, 51 priority-A. **Two off-page markets that barely overlap**, and
treating them as one is the mistake to avoid: the OEM supply chain (`17.01`–`17.05`) is certification-
and program-gated, while dealer, aftermarket and equipment (`17.06`–`17.15`) is dealer-network,
trade-show and buyer's-guide territory.

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **IATF 16949 certificates in the IATF database; IAF CertSearch; ISO 14001 and ISO 45001 entries** | 1 | Credentialed | ENTITY, CITE | The supply-chain half's equivalent of §3.3's registry argument. A Tier 2 that cannot be verified as IATF-certified does not get into a shortlist answer. |
| **AIAG membership and the AIAG published-standards ecosystem (PPAP, APQP, FMEA)** | 1 | Credentialed | ENTITY | Credential and vocabulary source. Also the entity most likely to be cited when an answer explains *how* a supplier is qualified. |
| **Nadcap** (special processes shared with §3.16), **UL / ETL / FMVSS and E-mark certification records** | 1 | Credentialed | ENTITY | Specialty-vehicle and component makers. |
| **NTEA Member Directory and the NTEA Truck Equipment Guide; AED (Associated Equipment Distributors) member directory; AEM member directory; ARA (American Rental Association)** | 1 + 2 | Credentialed | ENTITY, CITE | **The strongest and most neglected set here.** `17.10`–`17.14` — upfitters, truck bodies, equipment dealers, rental — are discovered through these, and the profiles are usually half-completed. Free or membership-priced. |
| **SEMA and AAPEX exhibitor directories; Auto Care Association; MEMA / MEMA Aftermarket Suppliers** | 2 | Credentialed | ENTITY, CITE | Aftermarket entity records with real retrieval value. Exhibitor directories persist and get indexed. |
| Automotive News (including the Top Suppliers list), Automotive Dive, WardsAuto, SAE Media, Just Auto, Autobody News | 3 | Editorial | RANK, CITE | **Automotive News's supplier ranking is revenue-threshold and methodology-published**, so it is usable under `guardrails.md` for the firms that qualify. |
| Equipment World, Construction Equipment, Diesel Progress, Rental Equipment Register, Trucking Info / Heavy Duty Trucking, Fleet Owner, Transport Topics | 3 | Editorial | RANK, CITE | The heavy-equipment and fleet half. Smaller desks, receptive to dated data, far less contested than the automotive trades. |
| Auto Dealer Today, CBT News, Automotive News Fixed Ops Journal, Dealer Marketing Magazine | 3 | Editorial | RANK | Dealer-tech half (`17.07`–`17.09`). |
| G2, Capterra | 2 | Self-serve | ENTITY | Live and meaningful **only** for `17.07` dealer software and `17.02` vehicle software. Worthless for the rest of the industry — do not let one map imply otherwise. |

---

### 3.18 `commercial-and-facility-services` — Commercial & Facility Services

16 sub-industries, 112 niches, 40 priority-A. **The one industry in this set where review platforms
and local signals genuinely matter to a B2B buyer**, because facility managers shortlist regionally.
That creates a rule-5 hazard and it needs saying plainly.

> **Rule 5 note, because this industry invites the mistake.** City and local pages are legacy. **Do not
> build a new city page, a new local landing page, or a new location-modified programmatic page for any
> entity in this industry, however strong the local signal looks.** The correct expression of regional
> relevance here is off-page — a GBP-equivalent profile on the association directory, a certified-firm
> registry entry with real coverage data — and never a new URL on this domain. Nothing in this section
> proposes deleting, redirecting or noindexing an existing city page either.

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **IICRC certified-firm locator; RIA (Restoration Industry Association) member directory; NADCA (air duct) certified-member directory; NAFA / IKECA for kitchen exhaust** | 1 | Credentialed | ENTITY, CITE | **The best class-1 set here.** `18.02` restoration and specialty cleaning is shortlisted on exactly these certifications, and the locators are searchable, indexed and usually half-filled. |
| **BSCAI and ISSA member directories; ISSA CIMS-GB certified-organisation list; GBAC STAR facility accreditation** | 1 | Credentialed | ENTITY, CITE | `18.01` janitorial. CIMS certification is the closest thing this industry has to ISO 9001 and it is checkable. |
| **IFMA and BOMA member and service-provider directories; BOMA BEST / BOMA 360 designations** | 1 | Credentialed | ENTITY | The buyer's own associations. A vendor listed where the facility manager already is, is a retrieval path most competitors have not taken. |
| **NFPA-adjacent: state fire-protection contractor licences, NICET certified-technician records, AFSA and NFSA member directories** | 1 | Credentialed | ENTITY, CITE | `18.05` fire and life safety. Licence records are government-published and unforgeable. |
| **NPMA (pest), AWT (water treatment), NALP and SIMA (landscaping and snow), TRSA (uniform and linen), NAID AAA certification (secure destruction), IAPMO/UA for plumbing** | 1 | Credentialed | ENTITY | One per sub-industry. **NAID AAA is the strongest of these** — `18.14` secure destruction is bought on it and the certified-member list is the shortlist. |
| ASIS International and the PSA / ESA directories; UL-listed central-station records | 1 | Credentialed | ENTITY | `18.04` security. |
| Facility Executive, FacilitiesNet / Building Operating Management, Cleaning & Maintenance Management, ISSA Today, Restoration & Remediation, Cleanfax, Security Systems News, SDM Magazine, Waste Dive, Landscape Management, Snow Business | 3 | Editorial | RANK, CITE | Small desks, practical audiences, receptive to dated original data. Among the least contested editorial targets in the whole document. |
| Google Business Profile, Yelp, Angi-type properties | 2 | Self-serve | ENTITY | **Real here and only here in this set** — but the client's, never Qognition's, and never as a reason to build a page on this domain. See the rule-5 note above. |

---

### 3.19 `environmental-engineering-and-testing` — Environmental, Engineering & Testing (TIC)

16 sub-industries, 114 niches, 46 priority-A. **The single best-fitting industry for this whole
off-page model, and the architecture doc promotes it to wave 6 for that reason.** Every Family B prompt
the operator supplied is qualified by an accreditation, a method number or a state certification —
"best labs for EPA 1633 PFAS analysis with fast turnaround", "best Nadcap accredited materials testing
lab for fatigue and tensile testing", "who can do air dispersion modeling for a PSD permit
application". Accreditation registries are the authoritative machine-readable answer to exactly those.

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **TNI / NELAP accredited-laboratory database; A2LA, ANAB, PJLA and IAS directories of ISO/IEC 17025 accredited labs; state primacy-agency certified-lab lists (per state, per method)** | 1 | Credentialed | ENTITY, CITE | **The single highest-value row in revision 2.** Public, searchable, method-and-analyte-scoped, and it is the literal answer to the supplied prompts. A lab holds the accreditation and its scope document is usually the only place the method list appears — which means the registry is more retrievable than the lab's own site. Fix that asymmetry first. |
| **NIST NVLAP accredited-laboratory directory; ILAC MRA signatory lookup** | 1 | Credentialed | ENTITY, CITE | `19.10` calibration and metrology is bought on NVLAP scope. |
| **AIHA Laboratory Accreditation Programs (IHLAP, EMLAP, ELLAP); NVLAP asbestos (NVLAP/AIHA) lists** | 1 | Credentialed | ENTITY | `19.06` and `19.08.04`. |
| **Nadcap materials-testing accreditation; ASTM and ISO method registries** | 1 | Credentialed | ENTITY, CITE | `19.12`. Shared credential with §3.16, which makes it a legitimate cross-industry link under architecture doc §5.1 rule 4. |
| **ASNT and API certification records (API 510 / 570 / 653, AWS CWI); NACE/AMPP certified-inspector registries** | 1 | Credentialed | ENTITY | `19.09` asset integrity. Person-level credentials that the firm can aggregate and publish; the registries are the third-party check. |
| **ACEC member directory and the ACEC Engineering Excellence Awards; NCEES and state PE board records; NGWA certified-contractor directory** | 1 + 2 | Credentialed | ENTITY, CITE | `19.14` and `19.01`. **ACEC's awards have published criteria**, so a win is usable under `guardrails.md`. |
| **EPA-published lists**: SW-846 and CWA method references, the National Contingency Plan contractor lists, state brownfield and LSP/LSRP registries | 1 | Credentialed | ENTITY, CITE | Government-published and frequently cited by assistants answering regulatory questions, which is the §4.2 test passing before you run it. |
| Environmental Business Journal (EBJ) rankings and awards; ENR Top 200 Environmental Firms | 2 | Credentialed | CITE | Revenue-threshold, methodology-published, application-based. Genuine and usable. |
| Environment + Energy Leader, Waste Dive, Water Environment Federation / WEF publications, Pollution Engineering, Lab Manager, American Laboratory, Quality Magazine, Materials Evaluation (ASNT) | 3 | Editorial | RANK, CITE | Real desks. Lab Manager and Materials Evaluation are unusually receptive to method-led original data. |
| Review platforms | — | — | — | **None.** The accreditation scope document is the review. |

**Why this industry goes early.** It has the registry density of manufacturing, higher contract values
than facility services, no compliance-reviewer blocker of the kind that holds financial services and
healthcare, and the tightest fit between what the operator supplied and what a registry can answer.
The architecture doc's wave 6 placement is on this reasoning and it is the one order change revision 3
makes against revision 2's tiering.

---

### 3.20 `retail-cpg-and-brand-enablement` — Retail, CPG & Brand Enablement

13 sub-industries, 88 niches, 25 priority-A. **The weakest off-page industry of the six**, and it
should be said up front rather than discovered. Discovery here runs through buyer relationships,
category reviews and trade shows, not through published registries, and several sub-industries are
agencies — which triggers the collision handled in the architecture doc §3.2 finding 3.

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **GS1 US member and GTIN records; SQF, BRCGS and FSSC 22000 certificate registries (for `20.02` private label and `20.12` sourcing); Sedex / SMETA and amfori BSCI audit records** | 1 | Credentialed | ENTITY | The only genuine class-1 set here. Supply-chain and food-safety credentials are checkable; nothing else in this industry is. |
| **ECRM / RangeMe supplier profiles; Faire, Mable and Abound seller profiles; NACDS, PLMA and Expo West / Fancy Food exhibitor directories** | 2 | Self-serve / Credentialed | ENTITY, CITE | The actual discovery layer for `20.01` brokerage and `20.13` wholesale. Exhibitor directories persist and index. |
| **Amazon Service Provider Network; Walmart Marketplace solution-provider listings; Shopify Partner directory; TikTok Shop partner listings** | 1 + 2 | Credentialed | ENTITY, CITE | **The strongest row in this section, and the direct analogue of §3.4's vendor partner directories.** For `20.09` marketplace agencies these are structured, platform-owned and answer the Family B shape exactly. Usually half-completed. |
| **EXHIBITOR Magazine's All-Star Awards and the EDPA member directory; IFAI / ARA for fixtures and displays; POPAI/Shop! member directory and OMA awards** | 2 | Credentialed | CITE | `20.03` and `20.04`. Published criteria, so usable under `guardrails.md`. |
| Grocery Dive, Retail Dive, Supermarket News, Store Brands, Progressive Grocer, Packaging Dive, Packaging World, Modern Retail, Digital Commerce 360, Path to Purchase IQ, Chain Store Age | 3 | Editorial | RANK, CITE | Real desks, receptive to category data. |
| Clutch, Agency Spotter, DesignRush | 2 | Self-serve | ENTITY | For the agency sub-industries only, and **read the architecture doc §3.2 finding 3 first**: these are the same directories Qognition uses for itself, so a placement here is simultaneously an entity record for a target and a competitive surface. That is not a reason to skip it. It is a reason to have decided the white-label question before pitching. |
| Review platforms | — | — | — | Nothing authoritative. Anyone selling a "CPG supplier review platform" is selling a directory. |

**Honest assessment:** this industry gets the smallest off-page budget of the six and should. Its
priority-A cohort is 25 — the second smallest in the taxonomy — and its discovery is relationship-led
in a way registries cannot substitute for.

---

### 3.21 `franchising-and-multi-location` — Franchising & Multi-Location (B2B side)

17 sub-industries, 113 niches, 45 priority-A. **The most unusual off-page profile in the document**,
because the authoritative record is a *regulatory disclosure filing* and because the ranked lists in
this industry have a well-known pay-for-placement problem that `guardrails.md` bites directly on.

| Source | Class | Effort | Buys | Notes |
|---|---|---|---|---|
| **State franchise registration filings (CA DFPI, NY, IL, MD, MN, VA, WA and the other registration states) and the FDD itself** | 1 | Credentialed | ENTITY, CITE | **The best class-1 row here and the least worked.** The FDD is a public, dated, government-filed document containing unit counts, Item 19 financial performance representations, litigation history and fee structure. It is the most verifiable record any entity in this taxonomy has, and it is retrieved when an assistant is asked about a brand's real economics. Most franchisors treat it as a compliance artefact and never as a discoverable one. |
| **FRANdata / FRANchise Registry; SBA franchise directory listing** | 1 | Credentialed | ENTITY | Lending-gated, checkable, and the thing a franchise-broker answer leans on. |
| **IFA (International Franchise Association) membership and supplier-forum directory; IFA Franchise Action Network; CFE (Certified Franchise Executive) records** | 1 | Credentialed | ENTITY, CITE | The industry's own association. The supplier directory is the entity record for `21.11`–`21.17` — the vendors that serve franchisors, which is where most of the priority-A weight sits. |
| Franchise Times Top 400 / Zor Awards; Entrepreneur Franchise 500; Franchise Business Review awards; FRANCHISE 50 and similar | 2 | Credentialed | CITE | **Handle with care.** `guardrails.md` allows a superlative only with a cited, dated, published methodology and no paid placement. Several lists in this industry accept payment for placement or for the badge. **§7.7 applies here more than anywhere else in the document: verify the methodology is published and that placement was not bought, in writing, before any badge or claim is used.** Franchise Business Review's is survey-based and is the most defensible of the set. |
| Franchise Times, Franchising World (IFA), 1851 Franchise, Global Franchise, Multi-Unit Franchisee / MUFC, Restaurant Franchising & Innovation Summit coverage, QSR Magazine, Nation's Restaurant News | 3 | Editorial | RANK, CITE | Genuinely receptive desks and a small industry where a data-led pitch lands. **Multi-Unit Franchisee reaches the area-developer buyer in `21.16`, which almost nobody targets.** |
| Franchise portals — Franchise Gator, Franchise Direct, FranchiseOpportunities, BeTheBoss, Franchise Help | 2 | Self-serve / paid | CITE | **The incumbent discovery layer and the thing the client complains about**, exactly as Thomasnet is in §3.3. Being listed is table stakes. The strategy is the same: be the named brand *inside* the answer the portal is cited in. Note `21.14` is itself these portals as an ICP, which makes this row both a target list and a client list. |
| G2, Capterra | 2 | Self-serve | ENTITY | Live and meaningful for `21.17` franchise software only. |
| Clutch, Agency Spotter | 2 | Self-serve | ENTITY | `21.13` franchise marketing agencies. **Same collision as §3.20 — read the architecture doc §3.2 finding 3 before pitching.** Two of the five colliding strings are this sub-industry's. |

**Two cautions specific to this industry.**

1. **Rule 2, and it is easy to breach here.** The buyer is the **franchisor** or the **vendor serving
   franchisors**, never a franchisee candidate and never a consumer. An off-page placement pitched at
   candidate-facing franchise media is a placement in front of the wrong audience, however good the
   domain looks. `21.14`'s candidate-facing portals are a *client category*, not a placement target.
2. **Rule 5, again.** `21.13` includes agencies that run local SEO across hundreds of locations, and
   the vocabulary will pull toward multi-location and city pages. **Nothing in this industry justifies
   a new city or local page on this domain**, and nothing here proposes deleting, redirecting or
   noindexing an existing one.

---

### 3.22 What the six change about the programme as a whole

**They strengthen the model rather than dilute it, and there is one reason.** The single best asset
class in this document is class 1 — accredited registries, licence records and government-published
lists — because they are authoritative, machine-readable, free or cheap, usually half-completed, and
they answer the Family B prompt shape directly. Five of the six new industries have a **stronger**
class-1 set than the median of the original fifteen:

| Industry | Class-1 strength | Anchor |
|---|---|---|
| `environmental-engineering-and-testing` | **Highest in the document** | TNI/NELAP, A2LA/ANAB ISO/IEC 17025, state certified-lab lists, NVLAP |
| `aerospace-and-aviation` | Very high | FAA/EASA Part 145, IAQG OASIS, Nadcap, ASA-100 |
| `franchising-and-multi-location` | High and almost entirely unworked | State FDD filings, FRANdata, SBA franchise directory |
| `commercial-and-facility-services` | High | IICRC, NADCA, NAID AAA, CIMS-GB, state licence boards |
| `automotive-heavy-equipment-and-mobility` | Moderate, split across two markets | IATF database, NTEA, AED, AEM |
| `retail-cpg-and-brand-enablement` | **Low** | GS1, SQF/BRCGS, marketplace partner directories |

**The sequencing consequence.** §8's sequencing is unchanged in mechanism and gains one line: off-page
work follows the architecture doc's wave order, and that order now puts
`environmental-engineering-and-testing` at wave 6 and `aerospace-and-aviation` at wave 7, ahead of
several original tier-A verticals. The justification is on this page: registry density and Family B
prompt fit, not novelty.

**And the constraint that does not move.** None of the above is a target until §4.2's rule is
satisfied. A registry with a perfect structural argument that never appears as a cited source in the
client's panel is a **ranking** target, reported under the ranking heading, budgeted as such, and never
reported as AI-search work. That sentence is the whole document and the six new industries do not get
an exemption from it.

---
---
## 4. How an acquisition is measured

The operator's framing is the right one and it should be the first line of any off-page report:
**a link that is never retrieved is not a citation win.** It may still be a ranking win. It is not
the same win, and conflating them is how an off-page budget gets spent for twelve months with nothing
to show under the heading the client actually cares about.

### 4.1 The retrieval ladder

Every placement sits at exactly one of four levels. The level is an observation with a date, not a
status.

| Level | Claim | How it is established | Cost to check |
|---|---|---|---|
| **L0 — Placed** | The URL exists and contains the mention or link | Fetch the URL, assert the string is present in the served HTML. Store the fetch date and an archived copy. | Seconds, automatable |
| **L1 — Retrievable** | The host page can be read and indexed by the systems that matter | Host page is `200`, not `noindex`, not behind a login or paywall, the mention is in server-rendered HTML rather than injected by JavaScript, the host's `robots.txt` does not block `GPTBot` / `OAI-SearchBot` / `PerplexityBot` / `ClaudeBot`, and the URL is present in at least one general index. | Minutes, automatable |
| **L2 — Retrieved** | The host page URL appeared as a **cited source** in an answer to a prompt in the tracked panel | G.O.L.E.M stored answer: prompt, engine, model version, date, cited URL list. The placement's URL is in that list. | Free once the panel runs |
| **L3 — Attributed** | The answer **named the client** *and* cited the placement URL in the same response | Same stored answer. Both conditions in one record. | Free once the panel runs |

**L0 is where almost every off-page report stops, and L0 alone is a receipt, not a result.** An
agency that reports "we secured 14 placements this quarter" has reported L0 fourteen times.

**L1 is where a surprising number of placements die.** Common causes, all checkable: the host renders
contributed content client-side; the directory profile is behind a login; the association member
directory is a JavaScript search widget with no crawlable URL per member; the publication `noindex`es
its contributed-content section; the host blocks AI crawlers at the edge even though its `robots.txt`
is permissive. **A placement that cannot reach L1 should be declined before it is pursued**, which is
the point of checking.

**L2 is the only direct evidence of citation value.** Nothing else is. Not domain rating, not
traffic estimates, not "AI visibility scores" from a third-party tool.

**L3 is the strongest claim available and it is still an observation on a date.** It is not proof of
causation — see §4.3.

### 4.2 The pre-qualification rule, which is the operationally important part

> **Never pursue or pay for a placement on a domain that has never appeared as a cited source for any
> prompt in the client's panel.**

The panel already exists — it is the Family B and Family Q prompt set from the architecture doc §3,
run monthly. Its by-product is a **list of the domains that actually get cited for that client's
buyer's questions.** That list is the target list. It costs nothing extra to produce because the
panel is already running for the pages.

This inverts the normal order of off-page work. The usual order is: build a prospect list from a
backlink tool, filter by domain rating, pitch. The order here is: run the panel, extract the cited
domains, rank by frequency across prompts and engines, and pitch **those**. One is a proxy. The other
is a measurement of the exact system the client is trying to appear in.

Two consequences worth stating:

- **A high-authority domain that never appears in the panel is a ranking target, not a citation
  target.** Pursue it under the ranking heading and budget it as such. Do not let it be reported as
  AI-search work.
- **A low-authority domain that appears in the panel repeatedly is a citation target** and may be
  worth more than the high-authority one, despite looking worse in every backlink tool. A small trade
  association directory that gets cited for "find a CEIV Pharma certified forwarder" is a better
  acquisition than a DR 70 general business blog that never appears.

This rule is also what makes paid placements defensible. A sponsored article on a trade site whose
URLs already reach L2 for panel prompts is a rational purchase with a testable hypothesis. The same
spend on a site that has never reached L2 is a donation. §7.1 and §7.7.

### 4.3 What can and cannot be concluded from a move

After a placement reaches L2 or L3, the temptation is to report it as lift. Do not.

**What can honestly be said:** "On 14 October we observed `<url>` cited in answers to 3 of the 12
prompts in the panel on ChatGPT and Perplexity. That URL contains the client's name and a link. On 14
September, before the placement, `<url>` was not cited for any prompt in the panel." That is two
dated observations and a factual statement about what changed between them.

**What cannot be said:** that the placement *caused* the citation, that citation share moved, or that
the client is now "more visible in AI search" by any percentage. The confounds are unresolvable
without an experiment nobody is going to run: model versions change between runs, retrieval indexes
refresh on their own schedule, competitors act, and the panel is a sample.

**The closest defensible design**, and it should be stated as a limitation every time it is used: run
the panel N times before the placement and N times after, on the same prompts, recording model
versions, and report the change as an observation with the confounds named in the same paragraph.
`[NEEDS DATA: how many runs per month G.O.L.E.M can sustain per client panel — N=1 is not a
pre/post design and should not be described as one]`

**Never estimate citation share.** No public source of truth exists. First-party panel observations
are a sample on a date, not a share, and the architecture doc §9.3 already forbids it.

### 4.4 The kill signal

> **A placement that has been at L0 or L1 for 90 days and has never reached L2 for any prompt in the
> panel is not a citation asset.** Report it as such.

If a whole *class* of placement fails this test across many acquisitions — say, every guest post on
general business sites — stop buying that class and say why in the report. This is the off-page
equivalent of the kill rule in `CLAUDE.md` §7, and it is the mechanism that stops an off-page budget
running on faith.

It also produces, over a few quarters, the single most valuable thing Qognition could own in this
space: **a first-party, dated dataset of which source types actually get retrieved, per vertical.**
That is a citable asset in its own right (class 4, §1) and it is the natural feed for the annual
observation report in the architecture doc §1.2 Type E.

### 4.5 A note on the published studies, and why the ladder exists

The public evidence on which domains get cited is real but weak in method. Reported findings include
Reddit ranking first or second on most engines and Wikipedia strongest on ChatGPT
([Orbit Media, 13,184 citations](https://www.orbitmedia.com/blog/ai-citation-sources/);
[Peec AI, 30M sources](https://peec.ai/blog/top-domains-cited-by-ai-search-analysis-based-on-30m-sources)),
alongside an analysis of 200 million prompts reporting that no single domain exceeds ~5% of citations
on any platform and that the long tail carries the rest
([Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns)). Those two shapes are not
contradictory but they support very different strategies, and none of these studies covers the
verticals in `data/b2b/verticals.ts` specifically.

**That is the argument for the ladder.** A general study cannot tell you whether `wsia.org` gets
cited for wholesale excess casualty prompts. The client's own panel can, in one run, for free. Use
the published studies to set expectations in a sales conversation, clearly attributed and dated, and
use the panel to decide where the money goes.

---

## 5. Digital PR keyed to dated trigger events

Four dated, public, non-negotiable compliance events sit inside this taxonomy right now. Each one
forces a real search by real buyers, and each one has a **supplier-discovery** shape — which is
Family B, which is the thing Qognition measures. That is the connection that makes these angles
Qognition's rather than a compliance consultant's.

**The constraint that shapes all four.** Qognition cannot pitch client results (§0.1). Every angle
below is therefore a **first-party measurement pitch**: we ran a prompt panel on a dated question,
here is what the assistants said, here is the method, here is the raw data. That is publishable under
`CLAUDE.md` §4, it is the one thing competitors cannot copy retroactively, and it is genuinely
interesting to a trade editor because nobody else has run it.

**And the boundary, stated once and applying to all four.** Qognition is not a certification body, a
regulatory consultancy, an auditor or a legal adviser. No artefact may read as compliance advice,
assess anyone's compliance status, or imply Qognition audits anything. Every one of these goes to
Ruth, and the FDA and CMMC angles should carry the same named-reviewer requirement as the insurance
page (`OPERATOR-DECISIONS` #7).

### 5.1 ISO 9001:2026 — published 16 September 2026

*Source: `docs/research/b2b-vertical-substance.md` §3.3, reported from iso.org. Supersedes ISO
9001:2015. Part of ISO's first digitally enhanced content offering from 1 October 2026.*

**Why it is a trigger:** every certified manufacturer has to transition. The window opened twelve
days before this document. Certification is the primary qualifier in the manufacturing Family B
prompts.

**The angle, and it is not "we help you transition".** It is: *when a buyer asks an assistant to find
an ISO 9001 certified supplier, what does the assistant actually do with the certificate?* Run a dated
panel of certification-qualified supplier-discovery prompts across four engines and record:

- how often an **accreditation registry** (IAF CertSearch, ANAB) is cited versus a directory versus
  the supplier's own site;
- how often any named supplier appears at all;
- whether the answer distinguishes the 2015 and 2026 revisions, or treats "ISO 9001" as undifferentiated;
- whether certificate scope (which sites, which processes) survives into the answer.

That last one is the commercially useful finding, and it is a genuine question nobody has published
an answer to.

**Outreach targets:** Quality Magazine, Quality Digest, ASQ community, IndustryWeek, The Fabricator,
Modern Machine Shop, and the NIST MEP centre newsletters (§3.3 — 51 regional outlets, low
competition, high relevance).
**Timing:** the 1 October digital-content milestone is a natural news peg. Ship before it.
**Class:** produces class 3 and class 4 assets, and drives class 1 work for clients (registry entries).

### 5.2 FDA QMSR — effective 2 February 2026

*Source: `docs/research/b2b-vertical-substance.md` §3.3, observed from fda.gov. Amends 21 CFR Part
820 and aligns it with ISO 13485. The FDA has inspection authority over management review, quality
audits and supplier audits under the new regime.*

**Why it is a trigger:** device OEMs are re-examining supplier qualification under an inspection
programme nobody has practice with, seven months in.

**The angle:** run the supplier-qualification prompts (architecture doc §3.2,
`healthcare-life-sciences` 1 and 5) and record whether assistants surface FDA's own registration and
inspection databases, whether inspection history reaches the answer at all, and whether "QMSR" is
recognised as distinct from the pre-2026 regime. A finding either way is publishable and dated.

**Outreach targets:** MedTech Dive, Medical Design & Outsourcing, MassDevice, Med Device Online,
RAPS *Regulatory Focus*, Clinical Leader, Outsourced Pharma.
**Risk:** highest of the four. Healthcare is the vertical where a claim slip is most expensive and
the audience is the most literate about regulatory language. Named compliance reviewer required. No
artefact may characterise anyone's QMSR readiness.

### 5.3 CMMC — 48 CFR acquisition rule effective 10 November 2025

*Source: `docs/research/b2b-vertical-substance.md` §3.3, observed. DoD published the final DFARS rule
integrating CMMC 2.0 on 10 September 2025; phase-in runs to roughly 2028. Iris rates it "the
strongest trigger event in the entire manufacturing set."*

**Why it is the best of the four.** It is a legal condition of contract award with a published
schedule, it is live now rather than prospective, and the discovery question — *which of my suppliers
is CMMC ready* — is literally a Family B supplier-discovery prompt. It also lands on **two** tier-S
verticals at once: `manufacturing-industrial` (defence suppliers) and `it-services` (the MSPs and
MSSPs selling CMMC readiness, who are themselves Qognition's ICP and its one vertical with real
reported delivery).

**The angle:** run CMMC-readiness supplier-discovery prompts and record whether the Cyber AB CMMC
Marketplace is cited, whether SAM.gov is cited, whether any individual supplier or assessor is named,
and how often the answer conflates CMMC levels or cites the superseded pre-48-CFR position. Publish
the panel, the dates, the engines and the raw answers.

**Outreach targets:** MSSP Alert, ChannelE2E, Channel Futures, CRN, Washington Technology, National
Defense (NDIA), Federal News Network, and the CMMC-focused practitioner podcasts.
**Commercial line:** this is the one angle where the PR audience and the sales audience are the same
people. An MSP reading it in MSSP Alert is in the ICP.
**Risk:** do not publish anything that reads as an assessment of any organisation's CMMC status. The
panel observes what assistants say, not what anyone's compliance posture is.

### 5.4 EU AI Act Article 50 — transparency obligations applying from 2 August 2026

*Source: `docs/research/b2b-vertical-substance.md` §4.3, observed via the Commission's own domain.
General applicability, Article 50 transparency obligations and the Commission's enforcement powers
including fines apply from 2 August 2026. High-risk Annex III areas follow from 2 December 2027.*

**Why it is a trigger:** it hits `saas-software/ai-ml-tooling` (tier S) and
`emerging-micro-niches/ai-implementation-firms` (tier A), and it is the live compliance deadline in
Iris's SaaS trigger list.

**The angle, and there is a genuinely novel one here.** The obvious version is to run vendor-discovery
prompts qualified on AI Act documentation. The better version is reflexive: **the assistants
themselves are subject to Article 50 transparency obligations.** A dated study of how each engine
discloses AI-generated content and synthetic output when asked directly, run across four engines, is
original, topical and has not been published as far as I can tell. `[NEEDS DATA: confirm no
equivalent study exists before pitching it as novel]`

**Outreach targets:** IAPP (large, active governance audience with a member directory), Tech Policy
Press, The Stack, InfoWorld, VentureBeat, EU-focused technology press.

**The honest caveat, and it should be in the internal brief so nobody misreads the result.**
Qognition's markets are US primary and Australia secondary (`CLAUDE.md` §2). An EU regulation angle
earns EU links and EU citations. **This is an authority and citation play, not a pipeline play**, and
it should be budgeted and reported as such. If the goal for a quarter is booked walkthroughs, §5.3 is
the one to run.

### 5.5 The recurring trigger, which costs nothing

The quarterly observation report (architecture doc §1.2 Type E) is itself a dated event. It does not
depend on a regulator's calendar, it is repeatable, it compounds into a time series, and it is the
only class-4 asset that runs on a schedule Qognition controls. Four a year, each with a per-vertical
cut, each pitched to the three or four trade desks in §3 for that vertical.

**Sequencing recommendation:** §5.3 first (best fit, live now, ICP audience), §5.1 second (largest
addressable audience, freshest peg), §5.5 continuously, §5.2 and §5.4 only once a compliance reviewer
is in place and there is capacity.

---
## 6. Reporting — three headings, never merged

Ranking and citation are reported separately throughout this engagement (architecture doc §9).
Off-page adds a third series that belongs to neither, and putting entity work under either heading is
a category error that makes both look wrong.

### 6.1 Ranking (off-page contribution)

Source: a backlink export plus the Search Console Links report. **Neither exists yet.**
`[NEEDS DATA: backlink export — this half of the report cannot be baselined without it]`

- Referring domains gained this period, with the acquiring activity named
- Each new referring page's own indexation status (an unindexed linking page contributes nothing)
- Anchor text distribution, watched for over-optimisation
- Links lost, and why
- **L0 and L1 counts.** These are the ranking-side ladder levels.

Never reported here: any citation observation, any AI-answer result, domain rating as an outcome.

### 6.2 Citation (off-page contribution)

Source: first-party prompt panel, appended monthly, never overwritten.

- **L2 events:** date, engine, model version, prompt, the cited placement URL, what the answer said
- **L3 events:** the same, plus confirmation the client was named in the same answer
- Cited-domain frequency table for the panel — which domains got cited, how often, on which engines.
  This is both a report and the next period's target list (§4.2)
- Placements at L0/L1 for >90 days with no L2, listed by name as kill candidates (§4.4)
- Changes to the prompt set, with the date and the reason

Never reported here: referring domains, domain rating, "share of AI answers", any percentage
describing visibility, any number not traceable to a stored answer.

### 6.3 Entity consistency

Source: a manual or scripted audit of the surfaces in §2, quarterly.

- Number of surfaces checked, and the date
- Fields compared: name, description, HQ, founding year, leadership, credentials
- **Contradictions found, listed explicitly with both values** — this is the report, not a score
- Contradictions corrected this period, and which platform each correction is pending on
- New entity records created

This heading has no ranking metric and no citation metric and that is the point. It reports whether
the thing being ranked and cited is a single coherent entity. Today, for Qognition itself, it would
open with four different headquarters (§2), which is exactly why it deserves its own heading.

---

## 7. What does not work, and why — so nobody sells it

Each item states the mechanism, not just the verdict, because "Google penalises it" is not a reason
anyone can act on.

### 7.1 Paid guest posts on "DA 50+" sites

Two independent failures. **Ranking:** Google's site reputation abuse policy targets third-party
content published on a host domain primarily to exploit the host's ranking signals, and enforcement
moved from manual-action-only to algorithmic during 2025 ([Google spam
policies](https://developers.google.com/search/docs/essentials/spam-policies)). A human editor
approving the post does not exempt it if the post is there for the ranking signal.
**Citation:** these pages are not read by anyone, so they do not get retrieved. They sit at L0
forever. Run them through §4.4 and they are all kill candidates.

Both outcomes are zero and the invoice is real. The nuance worth keeping: *genuine* contributed
content, on a publication whose audience is the client's buyer, with editorial standards and
disclosure, is a legitimate class-3 asset. The distinguishing question is whether the piece would
exist on that site if it carried no link.

### 7.2 Link exchanges, PBNs and link inserts

Direct violations of Google's link spam policy. Beyond that: even when they briefly move rankings,
only ~12% of URLs cited by ChatGPT, Gemini and Copilot rank in Google's top 10 for the same prompt
(§0), so a ranking-only lever is the weakest possible lever against a primary objective that is
citation-shaped. Buying risk for the metric that matters least is a poor trade at any price.

### 7.3 Mass directory submission packages

The "200 citations for $199" product is a **Local SEO** tactic aimed at businesses that appear in a
local pack. Most firms in this taxonomy do not. For a CDMO, a 3PL or a fund administrator, a bulk
listing on a general business aggregator buys nothing at any level of the ladder, and it actively
creates entity risk: bulk submissions propagate whatever NAP string they are given, and if that
string is wrong — as Qognition's own currently is across four sources (§2) — the package multiplies
the contradiction across hundreds of low-quality sources that are then slow and tedious to correct.

Legitimate exception: a client with genuine physical service areas. That is Local SEO layer work and
it is scoped as such, with the vertical's own registries (§3) doing the heavy lifting rather than a
generic pack.

### 7.4 `llms.txt` as a crawler or off-page lever

Carried forward from the architecture doc §6.2, restated here because it is most often sold as an
off-page or technical-authority item. Google has said on the record that it does not support it and
compared it to the keywords meta tag; third-party log studies through 2026 report negligible fetch
rates while AI crawlers take the HTML directly. The repo ships both files and should keep them —
they cost nothing and some smaller tools read them. **They must never appear in a deliverable as a
lever.** `[NEEDS DATA: primary log-level evidence on llms.txt fetch rates]`

### 7.5 Schema as a citation-acquisition tactic

Carried forward and restated for the same reason. **No schema type causes AI Overview or AI Mode
inclusion**, and Google says so directly in [AI Features and Your
Website](https://developers.google.com/search/docs/appearance/ai-features). **`FAQPage` is finished
as a rich result**, restricted in 2023 and reported as no longer appearing around May 2026, with the
Search Console API field removed in August 2026. Structured data is entity hygiene (class 1). It is
not an acquisition channel and it is not off-page at all. Anyone selling GEO as a markup technique is
selling folklore (`CLAUDE.md` §11).

### 7.6 Press-release wire distribution, bought for links

The syndicated copies are overwhelmingly `nofollow`, canonicalised to the origin or duplicated across
hundreds of low-value hosts. They sit at L0 and almost never reach L2.

**The exception, and it is a real one, but it is a different purchase.** A wire release is sometimes
the only way to create a **dated, third-party-hosted, machine-readable record of a fact** — a
certification achieved, a leadership appointment, an office opened, an acquisition. That is a class-1
entity asset. Buy it for the record, price it as a record, and never report it under ranking or
citation.

### 7.7 Buying a place on a "Top 10 agencies" list

This is the seduction of the whole discipline, because these pages **do** get retrieved. It fails on
two counts.

**Guardrails.** `clients/qognition-agency/guardrails.md` prohibits superlative market-position claims
without a cited, dated source and prohibits "#1", "best" and "leading". A placement that was
purchased is not a source. Presenting a paid placement as a ranking is also squarely within the FTC
substantiation posture recorded in `context.md`. Ruth blocks it.

**Credibility.** Iris already documented the failure mode: First Page Sage ranks itself first on its
own list (`docs/research/b2b-vertical-substance.md` §5.6). Buyers in these verticals have noticed.

**What is legitimate, and there is a lot of it.** Application-based industry lists with **published
methodology and no pay-to-enter**: CRN MSP 500, Channel Futures MSP 501, ENR's Top lists, Inbound
Logistics Top 100 3PL, Solar Power World Top Solar Contractors, Accounting Today Top 100, IPA 500,
Training Industry Top 20. These are earned, dated and sourceable, which is exactly what the guardrails
require. Most have annual windows. Put them in a calendar; missing the window costs a year.

### 7.8 HARO-style reactive sourcing, at scale

HARO was folded into Connectively, which shut on 9 December 2024
([Search Engine Roundtable](https://www.seroundtable.com/haro-connectively-platform-closing-38388.html));
HARO reopened under its old name in April 2025 and is widely reported as degraded by AI-generated
responses. The replacements (Qwoted, Featured, Help a B2B Writer, Source of Sources) are real but
fragmented.

The deeper reason not to staff this: **the journalists Qognition needs are not on these platforms.**
The trade desks in §3 are two- to twenty-person teams covering a vertical. You reach them by emailing
the person who wrote last week's piece on the same subject with a dataset they can use. Reactive
sourcing is a low-priority trickle here, not a programme, and treating it as a programme is how an
off-page budget produces general-business links nobody in the vertical reads.

### 7.9 Chasing a Wikipedia article

Notability thresholds are real and are not met by most firms in this ICP. A promotional edit by an
interested party is reverted, and the reversion leaves a durable, publicly visible record on the talk
page that is worse than having no article — and is itself retrievable.

**Wikidata is a different proposition and is worth doing** where a genuine public reference exists.
It is structured, openly licensed, broadly ingested, and does not carry Wikipedia's notability bar in
the same form. Recommend Wikidata. Do not recommend Wikipedia.

### 7.10 Reddit "seeding"

Reddit is among the most-cited domains in every published study (§4.5), which is precisely why it is
sold as a tactic. Undisclosed promotional posting violates Reddit's own rules, and under the FTC
endorsement posture recorded in `context.md` an undisclosed material connection is a substantiation
problem, not just a platform one. Sock-puppet accounts get the domain banned site-wide, which
**permanently removes the single highest-citation-share surface** from the client's reach. The
downside is not a wasted budget; it is a door closing.

The only safe version is a disclosed account that participates genuinely and has standing in the
subreddit. That is a named human spending months, which is a hiring and time-allocation decision, not
a campaign line item. Recommend it as that or not at all.

### 7.11 Any third-party "AI visibility share" or "share of voice" number

No source of truth exists. Every tool producing one is sampling its own prompt set with an
undisclosed method and presenting the result as a market measure. Reporting it would breach
`CLAUDE.md` §4 and the architecture doc §9.3. First-party panel observations, dated and
re-derivable, are the only defensible version — and they are a sample, not a share.

### 7.12 Scaling link acquisition linearly with page count

The architecture publishes 83 pages. The reflex is a link programme sized to 83 pages. **Do not.**
The premise of the whole architecture is that the differentiator is original data (architecture doc
§0.4), and an off-page programme that scales with URL count is the location-pages failure with an
invoice attached. Off-page effort concentrates on the class-4 assets (§5.5) and on the class-1
registries per vertical (§3). Those produce class-2 and class-3 outcomes as a by-product. Ten pages
with a real dataset behind them will out-acquire eighty-three without one.

---

## 8. Sequencing

Ordered by dependency, not by attractiveness. Nothing here is a date; each step gates the next.

| Step | Work | Blocked by |
|---|---|---|
| **0** | Settle `OPERATOR-DECISIONS` #1 and publish one canonical entity string set (§2) | Operator |
| **1** | Correct the existing third-party records that contradict it: DesignRush, Tracxn, LinkedIn, Crunchbase. Add LinkedIn links to all seven `/team` leaders | Step 0 |
| **2** | Run the prompt panel and extract the cited-domain frequency table (§4.2). **This is the target list.** Nothing is pitched before it exists | The observation engine being real (`OPERATOR-DECISIONS`, architecture doc §0.3 #3) |
| **3** | Build the class-1 registry checklist for the four tier-S verticals (§3.1–3.4). For Qognition's own clients this is the first deliverable in any engagement and it is mostly free | Step 2 |
| **4** | Ship the §5.3 CMMC study. Pitch to the §3.4 desks | Steps 2–3; Ruth |
| **5** | Ship the §5.1 ISO 9001:2026 study. Pitch to the §3.3 desks | Step 4 |
| **6** | Establish the quarterly observation report cadence (§5.5) | Step 4 |
| **7** | §5.2 and §5.4 | A named compliance reviewer (`OPERATOR-DECISIONS` #7) |
| **8** | Application-based list windows (§7.7) — calendar them now, they are annual | None; do this immediately |
| **9** | **New in revision 2.** Class-1 registry checklists for the six industries in §3.16–§3.21, built in the architecture doc's wave order — `environmental-engineering-and-testing` first, then `aerospace-and-aviation` | Step 2, and the wave reaching them |
| **10** | **New in revision 2.** Before any `21.13` or `20.09` work: the white-label decision in the architecture doc §3.2 finding 3, and Ruth on any list badge in §3.21 | Operator, then Ruth |

**The cheapest high-value work in this document is steps 1, 3 and 8.** None of them requires budget,
a writer or a pitch. Step 3 in particular — checking whether a client's certifications appear in the
accredited registries their buyers' prompts qualify on — is a free, concrete, verifiable win that
most of these firms have never had anyone do, and it fits inside the free snapshot.

---

## 9. NEEDS DATA

- **Backlink export.** The entire ranking half of §6 cannot be baselined without it, and the
  architecture doc's kill rule also depends on it
- **Live verification of every row in §3**, with a fetch date: does the domain resolve, is it
  publishing, does it accept contributed content, does it nofollow, has it ever reached L2
- **The cited-domain frequency table** from the first full panel run. This is the real target list
  and everything in §3 is a hypothesis until it exists
- **Off-page budget**, or confirmation it is zero
- The canonical one-sentence company description, operator-approved
- Qognition's founding year — it appears nowhere in this repo
- How many panel runs per month G.O.L.E.M can sustain per client (§4.3 — N=1 is not a pre/post design)
- Confirmation that no equivalent study to §5.4's reflexive Article 50 angle already exists
- Primary log-level evidence on `llms.txt` fetch rates
- Whether the seven `/team` leaders consent to public LinkedIn links (§2)

New in revision 2:

- **Live verification of every row in §3.16–§3.21, with a fetch date.** These six were compiled in a
  single pass and none has been fetched or contacted. §0.2's caveat applies harder here than anywhere
  else in the document
- **Franchise ranked lists: which of them accept payment for placement or for a badge**, in writing,
  before any claim is made from one (§3.21, §7.7). `guardrails.md` bites hardest here
- **Whether Qognition sells white-label to the agency sub-industries** (`20.09`, `21.13`, and
  `professional-and-business-services/b2b-marketing-and-demand-gen-agencies`). Five supplied keywords
  are simultaneously the target's and Qognition's own — architecture doc §3.2 finding 3
- **Whether any of the six new industries' registries block AI crawlers at the edge.** A registry that
  is authoritative and unreachable fails at L1 and should be declined before it is pursued (§4.1).
  Checkable from `robots.txt` plus a fetch, and nobody has checked
- **Off-page budget split across 21 industries rather than 15.** The existing `[NEEDS DATA: off-page
  budget]` is now a harder question: at 21 industries and the architecture doc's multi-year wave
  schedule, an unallocated budget will be spread thin enough to measure nothing

---

**Not reviewed by Ruth (brand-guard).** Every outward-facing artefact this document produces — pitch,
study, list application, award entry, directory profile copy — goes through `/ship` before it leaves.
