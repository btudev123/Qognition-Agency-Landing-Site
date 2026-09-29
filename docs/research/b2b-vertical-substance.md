# B2B vertical substance

Owner: Iris (research). Date: 2026-09-28. Branch: `b2b-ai-search`.
Status: research input for Nadia (keyword and prompt architecture) and Kyle (data model). Not copy.
Nothing here is approved for a client-facing page until Ruth has run.

This file supplies the per-vertical material that a template cannot fake: real buyer titles, the
research a buyer does before contacting anyone, the certification and standards vocabulary they
filter on, the axis they compare on, the trigger event, the honest position on AI search, and the
conversion event that fits.

---

## 0. How to read this

Every factual claim carries a source URL, the date I accessed it, and one of three labels.

| Label | Means |
|---|---|
| **observed** | I fetched the primary source myself and read the statement there |
| **reported** | A secondary source states it. I could not reach the primary, or the primary is paywalled or blocks automated fetch |
| **inferred** | My reasoning from the above. Not a fact. Argue with it |

All access dates are 2026-09-28 unless stated. Where I could not verify, the line reads
`[NEEDS DATA: ...]` rather than a plausible-sounding number.

**What I did not do.** I did not sample any AI assistant. Nothing in this file is a citation
measurement. Statements about who "ranks" or "gets cited" for a query are observations of a web
search index on 2026-09-28, which is a different thing, and I say so every time. Running the actual
prompt sets is G.O.L.E.M's job and is listed in §9.

**Sites that blocked automated fetch** and therefore appear as *reported* rather than *observed*:
`iso.org`, `iaqg.org`, `americanbar.org` (all HTTP 403), `ecfr.gov` (redirect loop),
`partner.microsoft.com` (TLS failure). Where this happened I found the same statement on the
organisation's own domain through search, or on an accredited body's site, and labelled accordingly.

---

## 1. The finding that changes the plan

`CLAUDE.md` §1 states the wedge as: every serious AI-search competitor proves exclusively in B2B
SaaS, so verticals where none has published a case study are open. `docs/copy/00-brief.md` promotes
that to the one claim the whole site owns.

**As of 2026-09-28 that premise is no longer safe for manufacturing, and it is weakening in
professional services.** It still holds in its stronger form, which is the form worth keeping. The
distinction matters and is set out in §2.

Named competitors moved in, or third parties now rank them in these verticals:

| Vertical | Who is now positioned there | Evidence quality | Source, accessed 2026-09-28 |
|---|---|---|---|
| Manufacturing and industrial | **Gorilla 76** publishes a dedicated AI search / AEO / GEO for manufacturers page and works almost exclusively with manufacturers, OEMs, custom machine builders, contract shops, robotics integrators | Anonymised only. States plainly: "we anonymized the examples, changing the industry, product and specifics of each one to protect private company information" | [gorilla76.com/ai-search-aeo-geo-for-manufacturers](https://www.gorilla76.com/ai-search-aeo-geo-for-manufacturers) · observed |
| Manufacturing and industrial | **Thrive Internet Marketing Agency** publishes an industrial-equipment-manufacturer GEO case | Client not named, no dates. Headline metric is "ChatGPT mentions of the brand grew from 7 to 12". Also "+68% in ChatGPT traffic", "+47% in Bing traffic", and a "+5,556% total AI traffic growth" figure attributed to "2025 internal performance results" | [thriveagency.com/news/top-generative-engine-optimization-geo-agencies](https://thriveagency.com/news/top-generative-engine-optimization-geo-agencies/) · observed |
| Manufacturing and industrial | Apollo Technical, a trade site, published a ranked list on 2026-08-16 naming **First Page Sage, Driven Metrics, Genevate, Signal Hill Strategies, Gorilla 76, Siana Marketing, Focus Digital**. Stated methodology: six months, 49 agencies assessed on manufacturing client depth, AI citation strength, verified case studies, research output | Third-party listicle. Several entries are described in the list itself as still accumulating case studies | [apollotechnical.com/the-top-ranked-manufacturing-geo-agencies](https://www.apollotechnical.com/the-top-ranked-manufacturing-geo-agencies/) · observed |
| Legal | First Page Sage published a law-firm GEO agency ranking on 2026-09-18 assessing ~53 agencies on six weighted criteria, naming **First Page Sage, Legal Guardian Digital, Focus Digital, Genevate, Pearl Lemon, Grow Law Marketing, RocketPilots, iLawyer Marketing, Forward Lawyer Marketing** | Self-ranking list: the publisher places itself first. Most entries carry named clients but no dated GEO metrics. One entry states "All available case studies anonymized" | [firstpagesage.com/seo-blog/the-top-law-firm-generative-engine-optimization-geo-agencies](https://firstpagesage.com/seo-blog/the-top-law-firm-generative-engine-optimization-geo-agencies/) · observed |
| Professional services | RevenueZen published a professional-services GEO agency list on 2026-06-12 naming itself plus **Omniscient Digital, Animalz, Siege Media, NoGood, Foundation** | **No dated professional-services client results on the page for any of the six.** Four of the six are SaaS-content shops positioned sideways into the category | [revenuezen.com/top-geo-agencies-professional-services-firms](https://revenuezen.com/top-geo-agencies-professional-services-firms/) · observed |
| Accounting, CPA | The Rank Collective publishes a GEO-for-accounting-firms page | Not fetched this pass | [therankcollective.com/industries/geo-for-accounting-firms](https://therankcollective.com/industries/geo-for-accounting-firms/) · reported, via search result 2026-09-28. `[NEEDS DATA: fetch and assess proof quality]` |

**What the revised claim should be.** Not "nobody is there". The accurate and still-strong claim is
about evidence, and it survives every source above:

> Agencies now market AI search to manufacturers and professional-services firms. Not one of them
> publishes a named client with a dated, reproducible AI-visibility measurement. Thrive's
> manufacturing case is unnamed and undated. Gorilla 76 anonymises by its own published policy.
> RevenueZen's professional-services list contains no dated client result for any agency on it,
> including RevenueZen.

That is a claim about method, it is checkable by the reader on the day they read it, and it is the
claim Qognition's `caseStudyEvidence()` discipline actually entitles it to make. It also ages
better: a competitor naming one client does not destroy it.

**One competitor is worth studying rather than dismissing.** Gorilla 76's published measurement
method is close to Qognition's own stated discipline: five buyer questions per buying intent, run
monthly across four AI platforms, scored into four appearance states (named and recommended, cited
only, used without credit, absent), with the explicit statements that "any single run is noise" and
that "the same question returns different answers run to run"
([source](https://www.gorilla76.com/ai-search-aeo-geo-for-manufacturers), observed 2026-09-28).
**Inferred:** the "we date our observations" differentiator is not unique in manufacturing. It is
unique in *insurance*, where I found no equivalent. Lead the differentiator where it is still true.

Gorilla 76's page also carries the claim "92% of B2B professionals using AI said it shaped their
vendor shortlist" with no source visible on the page.
`[NEEDS DATA: original source for the 92% figure. Do not repeat it until traced. It contradicts the
trust findings in §4.2, which are primary and dated.]`

---

## 2. What Qognition can actually claim, per vertical

This section governs what every industry page is allowed to imply. `CLAUDE.md` §11 forbids implying
experience in an industry because a page exists for it.

### 2.1 The published case-study library

Read from `data/case-studies/` on 2026-09-28. **observed, from the repo:**

- 50 records total: 20 HVAC, 20 dental, 10 insurance.
- 45 carry `publishGate: 'publish'`, 5 carry `'hold'`.
- **Zero records populate `actual` on any KPI.** `grep -c "actual:"` returns 0 across all three
  files. Under `caseStudyEvidence()` in `data/case-studies/types.ts`, that makes every record
  `projected`, so every KPI renders as a target and none is a reported result.
- Markets are US metros. HVAC spans TX, NY, WA, MA. Insurance spans CO and others.

**What this supports.** Diagnostic depth in HVAC contracting, dental practices and independent
insurance agencies. The records contain genuinely specific findings, for example an insurance agency
publishing no street address for either office while its inner pages issued an https-to-http 302
(`data/case-studies/insurance.ts`, `alliance-insurance-group`). That is real diagnostic work and it
is publishable as diagnosis.

**What this does not support.** Any outcome claim in any of the three, because no KPI has an
`actual`. And note that HVAC here is **HVAC contracting**, a local services business. It is not
HVAC *equipment manufacturing*, which is a different vertical with a different buyer, and the two
must not be blurred on any page. See §3.7.

### 2.2 The IDM engagement record

Source: `~/Downloads/Qognition_IDM_Standalone_Case_Studies.pdf`, 6 pages, dated 21 SEP 2026,
reference QOG-IDM-20260918-R3. I extracted and read all six pages myself on 2026-09-28.

Four reported engagements:

| Engagement | Reported scope | Market and duration | Vertical it evidences |
|---|---|---|---|
| Brixio | AI SEO, GEO, prompt research, whitepaper work, B2B lead generation | UAE. One year SEO/content, six months lead generation, ongoing | Enterprise cloud security; IT services |
| Sophos | LinkedIn, B2B lead generation, AI SEO, GEO | USA-facing, eight months | Cybersecurity software, MDR / security operations |
| Falcon Security | Company-page positioning, executive branding, named-account outreach, B2B lead generation, qualification handoff | USA. "Actual duration not supplied" | Cybersecurity services |
| Talentera | LinkedIn ads, B2B lead generation, PPC, AI SEO | Saudi Arabia, three months, US$20,000 reported LinkedIn budget | B2B SaaS, HR tech. The document states it is "a recruitment-platform engagement, not a cybersecurity performance case" |

Buying groups named in the document, which are directly reusable as research input: CISO, CIO, Head
of Cloud/Infrastructure, Network Security, Security Architecture, SOC, with procurement involved in
evaluation. Falcon adds IAM/PAM and GRC owners. Segments: UAE enterprise banking, aviation,
healthcare, energy, telecom and conglomerates at 500 to 10,000 employees; US enterprises in banking,
healthcare, energy, manufacturing and technology.

**The constraints, quoted from the document itself.** All observed.

1. "Qognition reports that the work described was delivered through **white-label arrangements under
   signed NDAs**."
2. "Numerical outcomes are **illustrative estimates** from the accompanying campaign model; verified
   historical campaign exports were not supplied. **These figures are not submitted as achieved
   client results**."
3. "Named organizations are retained from the submitted proposal to identify the reported work; they
   **do not imply direct contracting, endorsement or permission to contact them**."
4. Every page footer: "PERFORMANCE FIGURES ARE ESTIMATES / NOT VERIFIED RESULTS".
5. "The material does not establish a verified cybersecurity lead-generation results case in the UAE
   or Saudi Arabia."
6. Page 6: "We cannot provide direct introductions, named testimonials or additional attribution
   without the relevant written permissions. This document does not authorize client contact." And:
   "NDA restrictions do not turn estimates into verified results."

**One refinement I have to add, because it changes what the anonymised claim is.** The document does
not only hold the numbers at arm's length. It holds the *scope and duration* at arm's length too:

- "Service scopes and durations reflect **Qognition's supplied account** of its work."
- On Falcon: "The actual campaign duration and Falcon's exact legal entity/service catalog remain
  **unverified**."
- On Brixio: "No downloadable whitepaper with verified Qognition authorship was located in the
  reviewed pages. **Whitepaper delivery is Qognition-reported**; public article existence does not
  establish agency authorship."

So the honest label on the whole engagement record is **reported**, not observed. A firm describing
its own work is entitled to do that, and an anonymised scope statement is publishable. The operator
should simply know that it rests on self-report, that no export backs it, and that if a prospect
asks for a reference the NDA blocks it. Plan the sales answer to "can I speak to one of them" before
the page goes live, not after.

**The publishable shape.** Anonymised, scope and duration only, no numbers, no sector inference
beyond what the engagement was:

> "AI SEO and GEO for an enterprise cloud-security provider in the UAE. One year of content and
> technical work, six months of lead generation, ongoing. Delivered white-label under NDA, so the
> client is not named."

Saying "delivered white-label under NDA" in the sentence is worth doing. It explains the anonymity
instead of leaving the reader to assume the client does not exist, and it is true.

**Absolutely not publishable.** The figures are listed once here, and only here, so that a writer
can recognise and reject them. This paragraph is the blocklist. Do not copy any value out of it
into copy, a chart, a deck, an ad or a proposal:

114 MQLs, 50 SQLs, 41 meetings, 11 opportunities, US$660,000
pipeline, 92 MQLs, US$432,000, 124 MQLs, US$210,000, US$345 cost per MQL, +100% sessions, +35.3%
sessions. Every one is model output. The Falcon chain is 3,000 first touches x 3.8%, then assumed
step conversions of 44%, 82%, 80% and 33%. It is arithmetic on assumptions, and under `CLAUDE.md` §4
it cannot appear in copy, a chart or an ad.

### 2.3 The evidence map

| Vertical | Real work? | What a page may imply | What it may not |
|---|---|---|---|
| **Cybersecurity services and software** | **Yes, reported.** Two of four IDM engagements. Sophos is USA-facing MDR/secops demand; Falcon is US enterprise security services | Anonymised scope and duration. Named buying-group knowledge. AI SEO and GEO specifically, not just lead gen | Any name. Any number. Any UAE or Saudi *results* claim, which the document itself rules out |
| **IT services, MSP, cloud** | **Yes, reported.** Brixio is UAE enterprise technology with current cloud-security relevance | Anonymised scope and duration. UAE enterprise context | Client name. Whitepaper authorship as a proof asset, since the document could not verify it |
| **B2B SaaS** | **Partial, reported.** Talentera is a recruitment-platform engagement. Three months, LinkedIn ads, PPC, AI SEO | Anonymised: "a recruitment software platform in Saudi Arabia, three months". Honest that it is short and paid-led | That it demonstrates AI-search outcomes. Three months with a US$20,000 LinkedIn budget is a paid engagement with AI SEO attached |
| **Insurance** | **Yes, diagnostic only.** 6 published records | Named diagnostic findings, if OPERATOR-DECISIONS #8 clears client-name use | Any outcome. Every KPI is a target |
| **Professional services: CPA, tax, law, consulting** | **No.** Nothing | Method, standards literacy, the free snapshot | Any experience of any kind. Write these pages as capability and method, never as track record |
| **Manufacturing and industrial** | **No.** Nothing. HVAC in the library is contracting, not equipment manufacturing | Method and vocabulary only | Any manufacturing experience. This is the vertical most at risk of a §11 breach, because the HVAC records sit one directory away and read as adjacent |
| **Logistics, healthcare and life sciences, financial services, construction** | **No.** Nothing | Method only | Anything else |

**Inferred, and it is the practical consequence:** six of the twelve verticals have to carry the
page on original research and standards literacy rather than on proof. That is survivable, and §7 of
`CLAUDE.md` already demands three entity-specific facts not derivable by substituting a name. It
does mean the manufacturing pages cannot be shipped on the same template as insurance, because
insurance has a proof block and manufacturing has an empty one. Do not leave a proof section with a
placeholder in it. `CLAUDE.md` §4: omit the section.

---

## 3. Manufacturing and industrial

Priority vertical. Treated at depth because one vertical done properly is the proof that the model
scales.

### 3.1 Who buys, by job title

There is no single manufacturing buyer. There are three, they enter at different moments, and they
disqualify on different things. Getting this wrong is the most common failure in industrial content.

| Role | Real titles | What they own | When they enter |
|---|---|---|---|
| **Technical specifier** | Design Engineer, Mechanical Engineer, Applications Engineer, Process Engineer, Controls Engineer, R&D Engineer, Tooling Engineer | Whether the part, machine or material can meet the requirement | First. Often long before anyone else knows a search happened |
| **Commercial buyer** | Procurement Director, Strategic Sourcing Manager, Category Manager, Purchasing Manager, Supply Chain Manager, Commodity Manager | Price, lead time, supply risk, terms, whether a new supplier can be added at all | Second, and holds the veto |
| **Quality and compliance gate** | Quality Manager, QA/QC Manager, Supplier Quality Engineer, Director of Quality, Regulatory Affairs Manager | Whether the supplier survives qualification. Audits, PPAP, certification scope | Third, and can kill a deal after it is technically won |
| **Operational sponsor** | Plant Manager, Operations Director, VP Manufacturing, Maintenance Manager, Continuous Improvement Manager | Downtime, throughput, the business case | Present on capex and automation, absent on components |
| **Economic approver** | VP Operations, COO, CFO, GM, President | Sign-off above threshold | Last, on capex |

**The structural fact most industrial pages miss.** EETech's Buyer Journey Study 2026 surveyed 750
engineers and found 84% are decision-makers or strong influencers, yet identifies a distinct
"procurement handoff problem" where engineers champion a product and the approved-vendor-list
process then blocks it. The study also found engineers under AVL constraints can often introduce a
new vendor **if given proper justification materials**
([eetech.com/buyer-journey-study-2026](https://www.eetech.com/buyer-journey-study-2026), observed
2026-09-28).

**Inferred, and it is the most actionable thing in this section:** the highest-value asset on an
industrial page is not the capability list. It is the artefact the engineer forwards internally to
get a new supplier onto the AVL. Nobody writes that page. It is also exactly the kind of structured,
factual, self-contained content that gets retrieved and cited, so it serves AI search and the human
buyer with the same document.

Same study: "availability has become more critical than technical performance in vendor selection
decisions" (observed, same source). Lead time and stock position are a ranking factor in the buyer's
head, not a footnote.

### 3.2 What the buyer researches before contacting anyone

Primary source: the **2026 State of Marketing to Engineers** report, conducted by GlobalSpec, TREW
Marketing and Elektor International Media
([trewmarketing.com/state-of-marketing-to-engineers-research-report](https://www.trewmarketing.com/state-of-marketing-to-engineers-research-report),
observed 2026-09-28). All figures below are observed from that page.
`[NEEDS DATA: exact sample size and field dates. The summary page does not state n.]`

- Technical buyers complete **62% of the buying journey before contacting a vendor**. For engineers
  aged 35 and under it is approximately **66%**.
- **Technical publications** are now the primary research destination, up 37 percentage points.
- **94%** watch work-related video, preferring how-to guides and product demos.
- **94%** subscribe to work-related newsletters; 63% engage by reading articles.
- **91%** attend at least one webinar annually; 49% attend four or more.
- **68%** listen to work-related podcasts.
- Engineering experts at vendor companies are the most trusted content authors: **66%** rate them
  very or extremely trustworthy.
- **53%** say brand familiarity influenced their most recent purchase.

Concretely, before an RFQ is sent, the sequence looks like: datasheet, then drawing or CAD model,
then material and tolerance capability, then certification scope, then lead time, then a named
application that resembles theirs.

On CAD specifically, TraceParts surveyed 2,563 designers and engineers and the widely repeated
figures are that 82% of CAD/BIM downloads convert to a sale and 90% of downloaded parts are
purchased. I could reach only secondary restatements of this
([traceparts news item](https://info.traceparts.com/news/digital-parts-catalogs/2563-designers-and-engineers-answered-the-traceparts-survey-aimed-at-understanding-their-expectations-of-industrial-parts-suppliers/),
listed 2026-09-28 but not fetched; figures via
[3dfindit.com](https://www.3dfindit.com/en/corporate/engiclopedia/infographic-6-marketing-initiatives-to-take-today-based-on-engineers-buying-behavior-in-2020)).
**reported.** `[NEEDS DATA: primary TraceParts survey PDF and its field date. The 3dfindit page is
2020-era. Do not put these numbers on a page until the primary and its date are in hand.]`

**Buyer language.** I did not find a defensible corpus of verbatim industrial buyer quotes this
pass. I am not inventing any. `[NEEDS DATA: verbatim buyer language. Best available sources, in
order: (1) transcripts of Gorilla 76's manufacturing podcast, which is public; (2) r/Manufacturing,
r/MachinePorn and r/AskEngineers threads on choosing a supplier; (3) Practical Machinist forum
threads on vetting a shop; (4) Qognition's own sales-call notes if any exist. Quote with attribution
and date, per method rule 5.]`

### 3.3 The vocabulary, by sub-vertical

This is the section that makes each page distinct, and the section where an error is worse than
silence. Everything below is either observed from the standards body or the regulator, or labelled.

#### Cross-cutting quality systems

| Standard | Status on 2026-09-28 | Source, confidence |
|---|---|---|
| **ISO 9001:2026** | **Published 16 September 2026**, twelve days before this file. Supersedes ISO 9001:2015. Reported changes: emphasis on quality culture and leadership, and risk and opportunities separated so organisations proactively pursue beneficial results. Described as strengthening and clarifying rather than introducing a new approach. Part of ISO's first digitally enhanced content offering from 1 October 2026. The DIS was approved at 97% after comments closed 19 November 2025; the development track was extended to 36 months to add a second Committee Draft stage | [iso.org/news/2026/09/ISO9001-2026](https://www.iso.org/news/2026/09/ISO9001-2026) and [iso.org/standard/9001](https://www.iso.org/standard/9001) · **reported**. iso.org returns HTTP 403 to automated fetch, so this is from ISO's own domain via search result, not a page I read. The 36-month track is **observed** from [committee.iso.org TC176/SC2](https://committee.iso.org/sites/tc176sc2/home/news/content-left-area/news-and-updates/Update%20-%20Revision%20of%20ISO%209001.html) |
| ISO 9001 transition deadline | Certified organisations reported to have until **30 September 2029**. Also reported: new and initial accredited certifications may be issued only to the 2026 edition from 31 March 2028, and IAF ceased operating on 1 January 2026, succeeded by Global Accreditation Cooperation Incorporated (Global ACI) | Multiple certification bodies, e.g. [DQS](https://www.dqsglobal.com/en/explore/blog/iso-9001-2026-changes-timeline-transition) · **reported**. `[NEEDS DATA: the transition dates and the IAF/Global ACI succession from the accreditation body directly. Certification-body blogs have a commercial interest in urgency. Verify before any page states a deadline.]` |
| **IATF 16949:2016** | Automotive QMS. First edition. "Cancels and replaces ISO/TS 16949:2009 (3rd edition)". Applies across the automotive supply chain worldwide. IATF maintains liaison committee status with ISO to stay aligned with ISO 9001. No newer revision stated on the site | [iatfglobaloversight.org](https://www.iatfglobaloversight.org/iatf-169492016/about/) · **observed** |
| **AS9100 / EN9100 / JISQ9100** | The aerospace QMS built on ISO 9001. Reported that IAQG is renaming the series from "AS" to "IA" in its SAE publishing partnership, so the next revision publishes as **IA9100**, expected around late 2026 with industry publications extending the window to mid-2027, and a transition likely running to 2029. Reported to preserve product safety, configuration management and counterfeit-parts clauses while modernising supplier management and digital assurance | [Quality Magazine](https://www.qualitymag.com/articles/98831-a-deeper-dive-into-aero-quality-upcoming-ia9100-series-standards-updates), [CVG Strategy](https://cvgstrategy.com/ia9100-series-standards/) · **reported**. iaqg.org returns 403. `[NEEDS DATA: IA9100 publication date and name confirmed by IAQG or SAE directly. Do not print "IA9100" as fact on a page until confirmed. Until then write AS9100 and note a revision is expected.]` |
| **Nadcap** | Special-process accreditation for Aviation, Defense and Space, founded 1990, administered by the **Performance Review Institute (PRI)**, governed by the Nadcap Management Council. **24 critical process accreditations**, each with a Task Group. Includes heat treating, non-destructive testing, welding, chemical processing, additive manufacturing, elastomer seals and composites | [p-r-i.org/nadcap](https://www.p-r-i.org/nadcap/) · **observed** |
| **ISO 13485:2016** | Medical device QMS. See the QMSR row, which changed its status in the US in February | see below |
| ISO 14001, ISO 45001, ISO 50001 | Environmental, occupational health and safety, energy management | `[NEEDS DATA: current edition years, verified at the standards body. iso.org blocks automated fetch. Do not print edition years unverified.]` |

#### Medical device and medical contract manufacturing

**The single most useful dated fact available for this sub-vertical.** The FDA's **Quality
Management System Regulation (QMSR) became effective 2 February 2026**. It amends **21 CFR Part
820** and **incorporates by reference ISO 13485:2016** together with **clause 3 of ISO 9000:2015**.
From that date the FDA discontinued the **Quality System Inspection Technique (QSIT)** and began
using the updated **Inspection of Medical Device Manufacturers Compliance Program 7382.850**. All
manufacturers marketing devices in the US had to be compliant by that date
([fda.gov QMSR](https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-management-system-regulation-qmsr),
**observed** 2026-09-28).

Reported in the same search, from FDA's FAQ page: the FDA will not require ISO 13485 certificates,
and the QMSR gives the FDA authority to inspect management review, quality audits and supplier audit
reports, the exceptions in the old QS regulation not being carried over
([fda.gov QMSR FAQ](https://www.fda.gov/medical-devices/quality-management-system-regulation-qmsr/quality-management-system-regulation-frequently-asked-questions),
**reported**, listed in search but not fetched directly).

**Inferred:** that last point is a live commercial anxiety for every medical contract manufacturer
right now. Their customers' auditors gained access to supplier audit reports seven months ago, under
an inspection programme nobody has much experience of yet. A page that explains what a device OEM's
supplier-qualification team now asks a contract manufacturer for, post-QSIT, is a page no
AI-search agency has written and that a real buyer would forward. Worth more than ten capability
pages.

#### Aerospace and defense

- **AS9100** and **Nadcap** as above.
- **ITAR**, the International Traffic in Arms Regulations, administered by the State Department's
  Directorate of Defense Trade Controls. `[NEEDS DATA: exact CFR part range and the registration
  requirement, quoted from the primary. ecfr.gov redirected my fetch to an unblock page and
  pmddtc.state.gov rendered as an empty shell. Do not print CFR citations from memory.]`
- **CMMC**. The **48 CFR CMMC acquisition rule is effective 10 November 2025**. DoD published the
  final DFARS rule integrating CMMC 2.0 into contracts on **10 September 2025**. The clause is
  **DFARS 252.204-7021**. Implementation runs on a **four-phase plan over three years**, so roughly
  to 2028. Contractors handling FCI and CUI must hold the required CMMC level as a condition of
  award
  ([Federal Register 2025-17359](https://www.federalregister.gov/documents/2025/09/10/2025-17359/defense-federal-acquisition-regulation-supplement-assessing-contractor-implementation-of),
  [acquisition.gov DFARS 252.204-7021](https://www.acquisition.gov/dfars/252.204-7021-contractor-compliance-cybersecurity-maturity-model-certification-level-requirements.),
  [business.defense.gov CMMC one-pager](https://business.defense.gov/Portals/57/Documents/1%20pagers/CMMC%20What%20Every%20DoD%20Contactor%20Needs%20to%20Know.pdf))
  · **observed** for the rule and clause number, **reported** for the phase structure.
- Underlying control set: **NIST SP 800-171**. `[NEEDS DATA: current revision. Rev 3 was in
  progress; confirm at csrc.nist.gov before printing a revision number.]`

**Inferred:** CMMC is the strongest trigger event in the entire manufacturing set. It is a legal
condition of award with a published phase-in, it hits thousands of small and mid-size suppliers who
have no compliance function, and it creates a supplier-selection question that buyers will
absolutely ask an assistant: which of my suppliers is CMMC ready. That is a supplier-discovery query
with a compliance filter, which is the exact shape AI assistants answer well.

#### CNC machining, precision engineering, tooling

Filters a buyer applies, and the vocabulary a page must get right:

- Tolerance capability, stated as an achievable range, not "tight tolerances".
- **GD&T** per **ASME Y14.5**. `[NEEDS DATA: current edition year, verified at asme.org.]`
- Materials by designation, not family: 6061-T6, 7075-T651, 17-4 PH, Inconel 718, PEEK, Ti-6Al-4V.
- Machine envelope, axis count, pallet size, bar capacity, spindle speed.
- Inspection: CMM, first article inspection, **AS9102** FAI for aerospace.
  `[NEEDS DATA: AS9102 current revision.]`
- Certificates of conformance, material certs, traceability to heat lot.
- **PPAP** and **APQP** for automotive, AIAG reference manuals.
  `[NEEDS DATA: current AIAG PPAP edition.]`
- Quantity bands: prototype, bridge, low-volume production. A shop's real answer to "minimum order"
  is a qualifier the buyer wants before they call.

#### Contract manufacturing and EMS

- Board assembly: SMT, through-hole, mixed technology.
- **IPC-A-610** acceptability of electronic assemblies and **IPC J-STD-001** soldering requirements,
  with class (1, 2, 3) being the thing the buyer actually filters on.
  `[NEEDS DATA: current revisions of IPC-A-610 and J-STD-001.]`
- **ISO 13485** if medical, **AS9100** if aerospace, **IATF 16949** if automotive, **ITAR
  registration** if defense.
- Counterfeit-parts control, **AS5553** for aerospace electronic parts.
  `[NEEDS DATA: confirm AS5553 scope and revision.]`
- Component sourcing model, franchised versus broker, and AVL control.
- Test: ICT, flying probe, functional test, boundary scan, X-ray for BGA.
- New Product Introduction and product transfer: the documentation pack a customer must hand over.

#### Industrial automation and robotics

- Control ecosystem is the first filter: Rockwell/Allen-Bradley, Siemens, Beckhoff, Mitsubishi,
  Omron. A page that does not name the ecosystem is unusable.
- Fieldbus and protocol: EtherNet/IP, PROFINET, EtherCAT, Modbus TCP, IO-Link, OPC UA.
- Safety: functional safety rated by **Performance Level** per **ISO 13849** or **SIL** per **IEC
  62061**. Machinery safety of the integrated cell. `[NEEDS DATA: current editions of ISO 13849-1
  and IEC 62061; also confirm the status of the EU Machinery Regulation 2023/1230, which replaces
  the Machinery Directive and has an application date that matters to exporters.]`
- Robot specifics: payload, reach, repeatability, IP rating, end-of-arm tooling, cycle time.
- Collaborative operation per **ISO/TS 15066**. `[NEEDS DATA: confirm status, TS or now a standard.]`
- Commissioning and FAT/SAT responsibilities, which is the commercial argument, not a technical
  detail.

#### Pumps, valves, bearings, actuators

Selection is the content. The buyer arrives with an operating envelope.

- Pumps: flow, head, NPSH available and required, fluid compatibility, viscosity, duty cycle, seal
  plan. **API 610** for centrifugal pumps in petroleum, petrochemical and gas; **ANSI/HI** standards
  from the Hydraulic Institute. `[NEEDS DATA: current API 610 edition.]`
- Valves: pressure class, temperature, body and trim material, end connection, actuation, leakage
  class, fugitive emissions. **API 6D** for pipeline valves, **API 598** testing, **ASME B16.34**.
  `[NEEDS DATA: current editions.]`
- Bearings: dynamic and static load rating, limiting speed, lubrication, ABEC/ISO precision class,
  boundary dimensions per ISO 15. `[NEEDS DATA: confirm ISO 15 scope.]`
- Actuators: force or torque, stroke, control interface, duty cycle, failure mode.
- Hazardous area: **ATEX** in the EU, **IECEx** internationally, Class/Division or Zone in North
  America. `[NEEDS DATA: verify ATEX directive number and IECEx scheme description at the primary.]`

#### Packaging machinery

- Product format and pack format are the opening question: bottle, pouch, carton, case, bundle.
- Throughput in packs or cases per minute, at a stated OEE.
- **Changeover time** between formats, which is the number the plant manager cares about most.
- Line integration: upstream filler, downstream palletiser, and who owns the interface.
- Hygienic design where food or pharma: **3-A Sanitary Standards**, EHEDG guidelines, washdown IP
  rating. `[NEEDS DATA: verify 3-A and EHEDG scope descriptions at the primary.]`
- Serialisation and coding for pharma.
- The customer's own certification drives the spec: their **SQF**, **BRCGS** or **FSSC 22000** food
  safety scheme, or **GMP** for pharma, sets what the machine has to support.
  `[NEEDS DATA: confirm current SQF, BRCGS and FSSC 22000 editions and that all three remain GFSI
  recognised.]`

**Note the direction of travel**, because it is a genuine insight and easy to get backwards: the
packaging machinery builder is not certified to SQF. Its *customer* is. The machine has to survive
the customer's audit. A page written as "we are SQF certified" would be wrong and a food-industry
buyer would spot it instantly.

#### Specialty chemicals and materials

- Identification: CAS number, grade, purity, particle size distribution.
- Documentation: technical data sheet, **safety data sheet** in the destination format,
  certificate of analysis.
- Regulatory: **REACH** registration in the EU, **TSCA** inventory in the US, **RoHS** for
  substances in electronics, food-contact approval where relevant.
  `[NEEDS DATA: verify REACH registration thresholds and current RoHS directive/exemption status.]`
- Supply: minimum order quantity, lead time, packaging, stability and shelf life, second-source
  availability.
- Application limits stated as limits, which is both good engineering and what `CLAUDE.md` §4
  requires.

#### Industrial distributors

Different business entirely. The buyer is not specifying, they are sourcing.

- Line card, which brands are franchised and which are not.
- Stock position and same-day or next-day availability. Per EETech, availability now outranks
  technical performance in selection (observed, cited in §3.1).
- Cross-reference and interchange: the single highest-intent query in distribution is a competitor
  part number.
- Technical support depth, kitting, VMI, integrated supply, EDI and punchout to the customer's ERP.
- Territory and service coverage.

#### HVAC equipment, water treatment, laboratory instrumentation, material handling, construction and heavy equipment, EV components, solar

Present in `data/growth/taxonomy.ts` and real sub-verticals, but I did not verify their standards to
publication confidence this pass.
`[NEEDS DATA: AHRI certification programmes and scope; ASHRAE standard numbers and editions; AMCA;
NSF/ANSI 61 for drinking-water contact; ISO 17025 for calibration and testing laboratories; ANSI
MH-series for material handling; ISO 3834 for welding quality requirements; IEC 61215 and IEC 61730
for PV modules; UL 1741 and IEEE 1547 for grid interconnection; AQMD and local air permitting where
it bites. Do not publish a standards list for these until each is checked at its own body.]`

### 3.4 The comparison axis

What actually gets weighed when a shortlist forms. **Inferred** from §3.1 to §3.3 and stated as
inference:

1. **Can you make it at all.** Process, size, material, tolerance. Binary. Most suppliers fail here
   and never find out, because the engineer left the site without contacting anyone.
2. **Can you prove it.** Certification scope, and *scope* is the operative word. "ISO 9001
   certified" without the registered scope is close to meaningless to a quality manager, who wants
   to know whether the certificate covers the process and the site in question.
3. **Can you be qualified.** Will surviving our supplier audit, PPAP or first-article process take
   six weeks or nine months.
4. **Can you supply.** Lead time, capacity, second source, stock.
5. **Price.** Genuinely fourth or fifth, for engineered parts. It moves to first for catalogue
   components and distribution.
6. **Risk.** Single site, financial stability, geography, tariff exposure, whether there is a US
   footprint.

**Inferred:** items 2 and 3 are where the content gap is. Almost every manufacturer publishes
capability, which is axis 1. Almost none publishes what qualification with them actually involves,
which is axis 3, and which is the thing that decides whether procurement will take the risk.

### 3.5 The commercial problem and the trigger event

The commercial problem: **the firm is invisible at specification.** By the time an RFQ arrives the
shortlist was decided by an engineer who never made contact. With 62% of the journey complete before
vendor contact (observed, §3.2), a supplier absent from that 62% is competing on price at the end,
if invited at all.

Trigger events, ranked by how sharply they force a search:

| Trigger | Why it forces a search now |
|---|---|
| **Supplier failure or quality escape** | Fastest trigger in manufacturing. A line is down or a lot is rejected. Search happens the same day |
| **CMMC phase-in** | A legal condition of award with a published schedule to ~2028 (observed, §3.3) |
| **FDA QMSR** | Effective 2 February 2026 (observed). Device OEMs re-examining supplier qualification under an inspection programme nobody has practice with |
| **ISO 9001:2026 transition** | Published 16 September 2026 (reported). Every certified manufacturer has to transition, and many will look for help. The window opened twelve days ago |
| **Reshoring, nearshoring, tariff exposure** | Sourcing teams looking for domestic or nearshore capacity against a specification they already hold. `[NEEDS DATA: a dated source for current reshoring volume. Do not quantify without one.]` |
| **New product introduction** | Engineer needs a supplier for a part that does not exist yet. The highest-value search and the least served |
| **Capacity constraint** | Existing supplier cannot take the volume |
| **Key person leaving** | The engineer who knew which shop to call has gone |

### 3.6 Does AI search matter here, honestly

**Yes, but not in the way the category sells it, and the honest version is more persuasive.**

Evidence for, all observed from the 2026 State of Marketing to Engineers report:

- **69% of technical buyers use generative AI during purchasing decisions.**
- **75% notice AI-generated search summaries.**

Evidence against overclaiming, from the same report and the same page:

- Technical buyers rate AI trustworthiness at **4.7 out of 10**.
- **69% continue on to the actual search results** after seeing an AI summary.
- Traditional search engines remain dominant; AI summaries function as a starting point.

And on volume, from the strongest primary study I could reach: Semrush analysed over 1 billion lines
of US clickstream data from a 200 million user panel covering October 2024 to February 2026,
published 7 April 2026. ChatGPT outbound referral traffic grew **206% year on year** comparing
January 2025 with January 2026, while ChatGPT's own total traffic plateaued at around 1 billion
monthly visits from November 2025. **Over 30% of all ChatGPT referral traffic goes to 10 domains**,
and **21.6% of all ChatGPT referrals go to Google**. Between **65% and 85% of prompts could not be
matched to any keyword** in Semrush's 27 billion keyword database. The industries receiving most
referrals are online services, computer software and development, mass media and publishing, and
education ([semrush.com/blog/chatgpt-search-insights](https://www.semrush.com/blog/chatgpt-search-insights/),
**observed** 2026-09-28).

Note what is *not* in that study: it contains no conversion-rate comparison between ChatGPT
referrals and organic search. A figure of that shape circulates widely and is often attributed to
Semrush. It is not there. Do not attribute it to them.
`[NEEDS DATA: a primary, dated source for any AI-referral conversion-rate claim, or drop the claim.]`

**The honest synthesis, and this is inference:** in manufacturing, AI search is a
**shortlist-formation channel, not a traffic channel.** Referral volume to industrial domains will
be small, the top-ten-domain concentration says most referrals go elsewhere entirely, and engineers
distrust the output and click through anyway. What matters is whether the firm's name appears in the
two or three suggestions the assistant offers, because that shapes which sites the engineer then
visits through Google. A manufacturer measuring this by AI referral sessions will conclude it does
not matter and be wrong. Measuring mention and citation share on a fixed prompt panel is the only
method that sees it. That is precisely what G.O.L.E.M does, and it is the strongest product-to-
vertical fit in this document.

It also means the page must not promise traffic. It should promise measurement and say so plainly.

### 3.7 The conversion event

**RFQ, not demo, not discovery call.** And it is worth being exact about which RFQ.

| Sub-vertical | Fitting conversion event | Why |
|---|---|---|
| CNC machining, precision engineering, tooling | **Upload a drawing or STEP file for quotation** | The buyer has the file. Asking for a call instead adds a week and loses them |
| Contract manufacturing, EMS | **Capability enquiry with a BOM or gerbers**, plus a "request our quality certification pack" | Two different moments. Both are real conversions |
| OEM components, pumps, valves, bearings | **Product selection or sizing request**, plus **CAD download** | CAD download is a conversion event in its own right. Instrument it |
| Industrial automation, robotics, packaging machinery | **Application review or line assessment** | Capex. Nobody quotes a cell from a form |
| Specialty chemicals | **Sample request** and **technical data sheet download** | Sample request is the strongest intent signal in the vertical |
| Industrial distributors | **Quote on part number**, plus **cross-reference lookup** | Transactional. Any friction kills it |

**Inferred, and it has a direct implication for Qognition's own funnel:** the industrial equivalent
of Qognition's free snapshot is not a "book a call" CTA. It is a document the buyer can take away.
Qognition sells to the manufacturer's marketing or commercial leader, so Qognition's own conversion
event stays the snapshot and the walkthrough. But the *advice on the page* about the client's
conversion event must be RFQ-shaped, or a commercial director will read it and conclude Qognition
has never sold anything industrial. `CLAUDE.md` §2 already insists our buyer and our client's buyer
stay distinct in every sentence. This vertical is where that rule earns its keep.

### 3.8 Sales cycle and deal size

`[NEEDS DATA: sourced cycle length and deal size by manufacturing sub-vertical. I found no
defensible primary this pass and will not estimate. Candidate sources: Thomasnet/Thomas industrial
buying survey; IEEE GlobalSpec Digital Media Use in the Industrial Sector; NAM or industry
association procurement studies; Qognition's own proposal history if any industrial deals exist,
which per §2.3 they do not.]`

What can be said without a number, and is **inferred** from the structure in §3.1 and §3.4: cycle
length tracks the qualification burden, not the price. A catalogue component under an existing
approved supplier can close in days. The same value of part from a new supplier needing audit and
PPAP takes months, because the gating step is quality approval, not budget. Any page implying a
uniform industrial sales cycle is wrong on its face to anyone in the industry.

---

## 4. B2B SaaS

Covered second because it is where every competitor already proves, which changes what a page here
has to do. This page cannot win on "we understand SaaS". It can only win on the vertical inside the
vertical.

### 4.1 Who buys

| Segment | Economic buyer | Technical evaluator | Blocker who is rarely addressed |
|---|---|---|---|
| Vertical SaaS | VP Operations, or the line-of-business head | Operations manager who knows the workflow | Whoever owns the incumbent system and its data |
| Dev tools and APIs | VP Engineering, Head of Platform, Director of Engineering | Staff or senior engineer who will trial it | Procurement and security review, which kills bottom-up adoption late |
| AI and ML tooling | CTO, Head of AI, Head of Data | ML engineer, data scientist | Legal and privacy, over training data and model terms |
| Cybersecurity SaaS | **CISO** | Security architect, SOC lead, detection engineer | The team that has to operate it daily. "Who runs this at 2am" |
| Fintech SaaS | CFO, VP Finance, Controller | Finance systems owner | Compliance, audit and the external auditor |
| Data and analytics | CDO, VP Data, Head of Analytics | Data engineer, analytics engineer | Data governance, and whoever owns the warehouse bill |

The buying group named in the IDM document for security specifically, and directly reusable: CISO,
CIO, Head of Cloud/Infrastructure, Network Security, Security Architecture, SOC, with procurement in
evaluation, plus IAM/PAM and GRC owners (observed from the document, §2.2).

### 4.2 What they research first

For dev tools and APIs the order is documentation, then a free tier or sandbox, then pricing, then a
status page, then changelog velocity. For security and fintech the order inverts: the trust centre
and the SOC 2 report come before the product.

`[NEEDS DATA: a current, dated primary on B2B software buying behaviour. Candidates: G2 Buyer
Behavior Report, TrustRadius B2B Buying Disconnect, 6sense B2B Buyer Experience Report, Gartner B2B
buying research. I did not verify any this pass and will not restate their well-known figures from
memory.]`

### 4.3 Vocabulary and compliance

| Item | What it actually is | Source, confidence |
|---|---|---|
| **SOC 2** | An **attestation report**, not a certification. Issued by a CPA firm. Five Trust Services Criteria: Security, Availability, Processing Integrity, Confidentiality, Privacy. AICPA describes these as attestation engagements and publishes "SOC 2 Reporting on an Examination of Controls at a Service Organization" | [aicpa-cima.com SOC suite](https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services) and [AICPA SOC 2 topic page](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2) · **observed** for the five categories and the attestation framing. `[NEEDS DATA: confirm from AICPA that Security is the only mandatory category and the Type 1 vs Type 2 definition. Neither AICPA page stated it. Do not print "SOC 2 certified" anywhere; it is the tell that a writer does not know the vertical]` |
| **EU AI Act** | In force 1 August 2024. Prohibited practices and AI literacy obligations applied from **2 February 2025**. GPAI model obligations from **2 August 2025**. General applicability, Article 50 transparency obligations, and the Commission's enforcement powers including fines, from **2 August 2026**. Providers of GPAI models placed on the market before 2 August 2025 must comply by **2 August 2027**. High-risk Annex III areas including biometrics, critical infrastructure, education, employment, migration and border control apply from **2 December 2027**. Systems embedded in regulated products from **2 August 2028** | [digital-strategy.ec.europa.eu regulatory framework](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) and [artificialintelligenceact.eu implementation timeline](https://artificialintelligenceact.eu/implementation-timeline/) · **observed** for the dates via the Commission's own domain and the tracking site |
| ISO/IEC 27001 | Information security management. `[NEEDS DATA: confirm 2022 edition and transition status at the standards body. iso.org blocks fetch]` | n/a |
| ISO/IEC 42001 | AI management system. `[NEEDS DATA: confirm publication year and scope at the primary]` | n/a |
| FedRAMP, StateRAMP, TX-RAMP | US public-sector cloud authorisation. `[NEEDS DATA: current FedRAMP authorisation paths and whether the 20x programme has changed the route to authorisation. This changed recently and a stale description would be obvious to a govtech buyer]` | n/a |
| PCI DSS | Payment card data. `[NEEDS DATA: confirm v4.0.1 status and which future-dated requirements have now become mandatory]` | n/a |
| HIPAA, HITRUST | See §6.4 | n/a |

**Inferred, and it is the wedge for the AI and ML tooling page:** the EU AI Act's Article 50
transparency obligations and the Commission's fining powers both landed on 2 August 2026, seven
weeks ago. High-risk obligations do not land until December 2027. Almost every vendor page in this
space is written as though the whole Act arrived at once. A page that sets out precisely which
obligations are live today, which arrive in December 2027, and what a buyer should therefore ask a
vendor *now*, is genuinely distinct, dated, and exactly the shape a model retrieves and cites.

### 4.4 Comparison axis, trigger, conversion, cycle

- **Comparison axis:** build versus buy versus incumbent; time to first value; whether it fits the
  existing stack; total cost including the internal headcount to operate it; switching and migration
  cost; the security review it must survive.
- **Trigger events:** funding round; a new exec hire, because new executives replace tools; a
  security incident or a failed audit; renewal of the incumbent; hitting a scale ceiling; a
  compliance date, of which the EU AI Act and CMMC are the live examples.
- **Conversion event:** varies sharply and getting it wrong is fatal. Dev tools and APIs convert on
  **self-serve signup or sandbox key**, and a "book a demo" gate destroys them. Vertical SaaS and
  fintech convert on **demo**. Cybersecurity converts on **assessment, POC or trial**, rarely a
  cold demo. Data platforms convert on **architecture or technical consultation**.
- **Sales cycle and deal size:** `[NEEDS DATA: sourced by segment. Do not restate industry-blog ACV
  bands.]`

### 4.5 Competitive gap

**None. This is the contested vertical.** Radyant, LoudFace, Omnius, Minuttia, Graphite and
Omniscient all prove here, per `CLAUDE.md` §1, and RevenueZen's own list names Omniscient, Animalz,
Siege Media, NoGood and Foundation as the professional-services alternatives, which shows how
SaaS-centric the supply side is (observed, §1).

**Inferred:** do not compete on B2B SaaS generally. If a SaaS page is published at all, publish it
narrowly, on **cybersecurity SaaS and security operations**, where §2.3 says there is real reported
delivery experience, and on the compliance-date content in §4.3, where the material is dated and
specific. A generic B2B SaaS page is the one page on this site with no wedge at all.

---

## 5. High-value professional services

### 5.1 Who buys, and the thing that makes this vertical different

The buyer is usually the firm's own leadership, and the firm is a partnership. That changes
everything about the sale.

| Segment | Economic buyer | Who else must agree |
|---|---|---|
| Corporate law, M&A, IP, tax law | **Managing Partner**, Practice Group Leader, Chief Marketing or Business Development Officer | The practice's partners individually, because each owns their own book and their own name |
| CPA firms, transfer pricing, outsourced accounting | **Managing Partner**, Partner in Charge, Director of Growth | Other partners; the firm's risk or compliance partner |
| Fractional CFO, advisory boutiques | Founder or Managing Director | Usually nobody. Fastest decision in this group |
| Management, IT, ERP and cyber consulting | Managing Partner, Practice Lead, CMO | Delivery leadership, whose utilisation the pipeline affects |
| SAP, Salesforce, Microsoft partners | CEO, CRO, Alliance Director | The vendor alliance manager, which is a genuine external stakeholder |

**Inferred, and it is the single most useful thing to know about selling to this vertical:** the
objection is never price. It is "will this make our partners look unprofessional to their peers".
Marketing at a professional-services firm is constrained by the partners' reputational risk and, for
lawyers, by enforceable rules. Any page that reads like performance-marketing copy is disqualified
before the first paragraph.

### 5.2 What the buyer researches

Two distinct readers, and both matter:

- **The firm as our buyer:** what other firms of their type have done, whether the agency
  understands professional privilege and advertising rules, and whether the work will embarrass
  them. They read the agency's own writing as the work sample.
- **Their client, the end buyer:** a General Counsel, CFO or Head of Tax searching for someone to
  handle a specific event. They search the event, not the service. "Section 382 limitation after
  acquisition", not "tax services".

`[NEEDS DATA: verbatim buyer language. Sources worth mining, all public: the ABA Journal comments;
r/Lawyertalk and r/Accounting threads on choosing outside counsel or an advisor; the
Chambers and Legal 500 published client-feedback quotes, which are real, attributed buyer language
and are exactly what method rule 5 asks for.]`

### 5.3 The regulatory vocabulary, and the constraint

**Lawyer advertising is rule-governed and the rules are enforceable.** ABA **Model Rule 7.1**:
"A lawyer shall not make a false or misleading communication about the lawyer or the lawyer's
services." A communication is false or misleading if it contains a material misrepresentation of
fact or law, or omits a fact necessary to make the statement as a whole not materially misleading.
A truthful statement is misleading if there is a substantial likelihood it will lead a reasonable
person to form a specific conclusion about the lawyer or the services for which there is no
reasonable factual foundation. An appropriate disclaimer may preclude a finding that a statement
creates unjustified expectations
([ABA Model Rule 7.1](https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_7_1_communication_concerning_a_lawyer_s_services/),
[North Carolina State Bar Rule 7.1](https://www.ncbar.gov/for-lawyers/ethics/rules-of-professional-conduct/rule-71-communications-concerning-a-lawyers-services/))
· **reported**. americanbar.org returns HTTP 403 to automated fetch, so this is ABA's own text via
search result plus a state bar's adopted version, not a page I read directly.

**Critical:** the Model Rules are a model. Each state adopts its own version and they differ,
sometimes materially, on testimonials, past results and required disclaimers.
`[NEEDS DATA: state-by-state variation for the states Qognition will actually target. This is the
same unresolved issue as OPERATOR-DECISIONS #7 for insurance, and it has the same answer shape: a
named reviewer and a named list of states.]`

**Inferred, and it is an unusually good fit:** Rule 7.1 and `CLAUDE.md` §4 say almost the same
thing. No claim without a reasonable factual foundation, no omission that misleads, disclaimers
where a statement could create unjustified expectations. An agency whose house rule already forbids
unmeasured numbers and unprovable promises is structurally easier for a law firm to buy from. That
is a real differentiator, it is demonstrable rather than asserted, and no competitor in §1 has it.

Other vocabulary, by segment:

| Segment | Terms a buyer filters on | Confidence |
|---|---|---|
| CPA and audit | AICPA peer review; PCAOB registration and inspection for public-company audit; independence rules; IRS **Circular 230** for practice before the IRS; EA, CPA and state licensure; engagement letter scope | `[NEEDS DATA: verify Circular 230 current revision and peer review programme details at irs.gov and aicpa-cima.com]` |
| Transfer pricing | OECD Transfer Pricing Guidelines; **IRC §482** in the US; master file, local file and country-by-country reporting; advance pricing agreements; **Pillar Two** global minimum tax and its jurisdictional effective dates | `[NEEDS DATA: verify Pillar Two implementation dates by jurisdiction at oecd.org. This is high-value and high-risk; get it right or omit it]` |
| Corporate and M&A law | Deal-value league tables; Chambers and Legal 500 band; jurisdiction and bar admission; conflicts clearance | `[NEEDS DATA: confirm Chambers band structure and methodology]` |
| IP | USPTO registration number; patent bar admission; technology-area specialism; PCT and EPO practice | `[NEEDS DATA: verify at uspto.gov]` |
| ERP and consulting partners | **Microsoft**: six Solutions Partner designations, namely Data & AI (Azure), Digital & App Innovation (Azure), Infrastructure (Azure), Business Applications, Modern Work and Security. Attaining one requires at least **70 of 100** partner capability score points, with points in every subcategory, across Performance (net customer adds), Skilling (intermediate and advanced certifications) and Customer Success (usage growth and deployments). A designation is the **prerequisite for specializations**, which validate deeper project-based expertise in specific technical scenarios | [learn.microsoft.com Solutions Partner FAQs](https://learn.microsoft.com/en-us/partner-center/membership/solutions-partner-faq) and [partner capability score](https://learn.microsoft.com/en-us/partner-center/membership/partner-capability-score) · **observed** |
| | **Salesforce** partner tiers and **SAP** PartnerEdge tiers | `[NEEDS DATA: verify current tier names and criteria at each vendor. These get renamed often and a stale tier name is an instant credibility loss with an alliance director]` |

### 5.4 Comparison axis, trigger, conversion, cycle

- **Comparison axis:** the named individual, not the firm. Then relevant matter or engagement
  experience, jurisdiction or licence coverage, conflicts, fee structure (hourly, fixed, capped,
  contingent), and bench depth behind the named partner.
- **Trigger events:** a transaction; an audit, examination or investigation; a regulatory deadline;
  litigation; a funding round or exit; a key hire or departure; a restructuring; a new filing
  obligation.
- **Conversion event:** **consultation**, and it must be framed as consultation with a named person.
  Not "book a demo", not "get a quote". For accounting, a **scoped engagement conversation**. For
  fractional CFO, a **discovery call** is genuinely correct, the one place in this vertical where it
  is.
- **Sales cycle and deal size:** `[NEEDS DATA: sourced. Do not estimate. Realistically this is
  better answered from Qognition's own pipeline once professional-services deals exist.]`

### 5.5 Why AI search matters here, and it matters more than in manufacturing

**Inferred, and I flag it as inference because I have no vertical citation measurement to support
it.** Professional-services buying is a referral market being partially disintermediated. The
historical path was "ask someone you trust who to use". An assistant now answers that question
directly, in the same conversational shape, and the answer is a short list of named firms. That is
closer to how this vertical already buys than it is to how manufacturing buys, and unlike
manufacturing the queries are almost entirely non-branded and event-shaped.

`[NEEDS DATA: run a G.O.L.E.M prompt panel on professional-services selection queries across
ChatGPT, Perplexity, Gemini, Claude and Copilot, and record which domain classes get cited:
directories, review sites, Reddit, publishers, or firm-owned domains. This is the single
highest-value measurement Qognition could produce for this vertical and it would be original. It is
the direct analogue of the Wellows insurance study cited in docs/copy/00-brief.md, and that study is
a competitor's. Producing our own is better than citing theirs.]`

### 5.6 Competitive gap

Contested, but thinly. Per §1: RevenueZen positions here and names five mostly-SaaS agencies
alongside itself, with **no dated client result on the page for any of them**. The legal sub-niche is
more crowded, with First Page Sage, Genevate, iLawyer Marketing and others, but that list is
published by one of its own entrants, which ranks itself first.

Accounting and tax, transfer pricing, and the ERP and alliance-partner segments look genuinely
under-occupied. `[NEEDS DATA: confirm with a dated SERP and AI-citation check on "GEO for CPA firms",
"AI search for transfer pricing", "AI visibility for Salesforce partners" before treating this as
settled.]`

---

## 6. The remaining six, in brief

Deliberately shorter. Each is a real vertical and none has enough verified material yet for a
publishable deep page. Treat this section as scaffolding for later work, not as page-ready
substance.

### 6.1 Cybersecurity services

- **Buyers:** CISO, CIO, Head of Cybersecurity, IT Security, SOC Manager, Security Architect, plus
  IAM/PAM and GRC owners, with procurement in evaluation (observed from the IDM document, §2.2).
- **Researches first:** coverage and exclusions, who operates what, escalation responsibility, MTTD
  and MTTR definitions, and the incident-response retainer terms.
- **Vocabulary:** SOC 2 (§4.3), ISO 27001, NIST CSF, MITRE ATT&CK, CMMC and NIST SP 800-171 (§3.3),
  PCI QSA and ASV, FedRAMP 3PAO, CREST.
  `[NEEDS DATA: verify CREST accreditation categories and the current PCI QSA programme at their
  primaries.]`
- **Comparison axis:** coverage versus what stays the client's job. This is the whole sale. The
  taxonomy file already says it well: "Documented coverage and exclusions. Deployment and escalation
  responsibilities."
- **Trigger:** breach, failed audit, cyber-insurance renewal questionnaire, a customer security
  questionnaire the firm cannot answer, a compliance date.
- **Conversion:** **security assessment or posture review**. Not a demo.
- **AI search:** `[NEEDS DATA]`. **Inferred:** buyers here are the most sceptical of AI output of any
  group in this document, and the most likely to use it anyway for vendor discovery.
- **Evidence:** **Qognition has real reported delivery here** (§2.3). This is the one non-insurance
  vertical where a page can honestly say the work has been done. Anonymised, no numbers.
- **Competitive gap:** `[NEEDS DATA: not checked this pass.]`

### 6.2 Logistics and supply chain

- **Buyers:** VP Supply Chain, Director of Logistics, Transportation Manager, Head of Procurement,
  plus Trade Compliance Manager for cross-border.
- **Vocabulary:** **CTPAT**, the Customs Trade Partnership Against Terrorism, established November
  2001, administered by US Customs and Border Protection through seven field offices. Voluntary.
  Over **11,400 certified partners**, representing more than **52% of US cargo imports by value**.
  Eligible participants include US importers and exporters, highway carriers, rail and sea carriers,
  licensed customs brokers, marine port authorities and terminal operators, freight consolidators,
  ocean transportation intermediaries, NVOCCs, Mexican and Canadian manufacturers and Mexican
  long-haul carriers. Benefits include reduced examinations, front-of-line and FAST lane access, and
  an assigned Supply Chain Security Specialist
  ([cbp.gov/border-security/ports-entry/cargo-security/ctpat](https://www.cbp.gov/border-security/ports-entry/cargo-security/ctpat)
  · **observed**).
- Also relevant, unverified: AEO in the EU, IATA CEIV for pharma and perishables, GDP for
  pharmaceutical distribution, FMCSA authority and safety rating, TAPA FSR, ISO 28000.
  `[NEEDS DATA: verify each at its primary.]`
- **Comparison axis:** lane coverage, mode, capacity commitment, on-time performance, EDI or API
  integration, claims ratio, and whether they will hold a rate.
- **Trigger:** a tender cycle, a service failure, a tariff or route change, a new facility, a peak
  season crunch.
- **Conversion:** **rate request or lane quote**, and **tender invitation** for enterprise. Not a
  demo.
- **Evidence:** none. **Competitive gap:** `[NEEDS DATA]`.

### 6.3 IT services and MSPs

- **Buyers:** IT Director, VP IT, CIO at mid-market; owner or CFO at small business. For cloud
  partners, Head of Infrastructure and Head of Platform.
- **Vocabulary:** Microsoft Solutions Partner designations and specializations (§5.3, observed);
  Azure Expert MSP `[NEEDS DATA: verify the programme still exists under that name]`; SOC 2; CIS
  Controls; HIPAA business associate agreements; CMMC for defense-adjacent clients.
- **Comparison axis:** SLA and response times, help-desk location and hours, co-managed versus fully
  managed, per-user versus per-device pricing, onboarding cost, and exit terms. Exit terms are
  researched far more than MSP marketing assumes.
- **Trigger:** an incident, an MSP contract renewal, a failed backup or restore, an acquisition, a
  cyber-insurance requirement, the internal IT lead resigning.
- **Conversion:** **IT assessment or network audit**. This is close in shape to Qognition's own
  snapshot, which makes it the easiest vertical to write about credibly.
- **Evidence:** **real reported delivery, via Brixio** (§2.3), anonymised, UAE enterprise.
- **Competitive gap:** `[NEEDS DATA]`. Note `CLAUDE.md` §2 already lists IT services as a named
  secondary vertical, so this page is going to exist regardless.

### 6.4 Healthcare and life sciences B2B

- **Buyers:** for providers, CMIO, CNIO, VP Clinical Operations, Director of Revenue Cycle,
  Materials Manager, and a Value Analysis Committee that most vendor pages ignore entirely. For
  pharma and biotech, VP Research, Head of CMC, Director of Quality, Procurement.
- **Vocabulary:** HIPAA and business associate agreements; **HITRUST CSF**, which offers **e1**
  (foundational, 43 core controls, valid 1 year), **i1** (threat-adaptive, 182 control requirements,
  valid 1 year) and **r2** (tailored, highest control requirements, valid 2 years), harmonising
  ISO/IEC, NIST, HIPAA, PCI and GDPR into one control library
  ([hitrustalliance.net/hitrust-framework](https://hitrustalliance.net/hitrust-framework)
  **observed**); ISO 13485 and FDA QMSR (§3.3, observed); 21 CFR Part 11 for electronic records;
  GxP, meaning GMP, GLP and GCP; ISO 14971 for risk management; EU MDR and IVDR.
  `[NEEDS DATA: verify 21 CFR Part 11, ISO 14971 and the MDR/IVDR transition dates at their
  primaries.]`
- **Comparison axis:** clinical evidence, integration with the EHR (Epic and Cerner named
  explicitly), implementation burden on clinical staff, reimbursement pathway, and the security
  review.
- **Trigger:** a regulatory deadline, a contract renewal, a GPO agreement, an audit finding, a new
  service line.
- **Conversion:** **clinical or technical evaluation**, and for devices a **sample or evaluation
  unit**. A demo alone rarely moves a Value Analysis Committee.
- **Evidence:** none. **Competitive gap:** `[NEEDS DATA]`.

### 6.5 Financial services B2B

- **Buyers:** CFO, Controller, Head of Treasury, Chief Risk Officer, Chief Compliance Officer, Head
  of Operations. At banks and insurers, add the third-party risk management function, which is
  effectively a second sales cycle.
- **Vocabulary:** **SOC 1**, which is the one that matters here and is distinct from SOC 2 because
  it addresses controls relevant to a user entity's financial reporting; SOC 2; PCI DSS; GLBA;
  NYDFS Part 500; DORA in the EU; FINRA and SEC registration.
  `[NEEDS DATA: verify SOC 1 scope wording at AICPA, and DORA application dates at the primary.]`
- **Comparison axis:** regulatory fit, auditability, integration with core systems, vendor
  financial stability, concentration risk, and the third-party risk questionnaire.
- **Trigger:** a regulatory exam, an audit finding, a core system migration, a merger, a new
  reporting obligation.
- **Conversion:** **consultation** or **scoped assessment**. Long procurement.
- **Evidence:** none directly. The IDM record names banking as a target segment in both UAE and US
  security engagements, which is context, not experience in financial services marketing.
- **Competitive gap:** `[NEEDS DATA]`.

### 6.6 Construction and the built environment

- **Buyers:** for contractors, VP Preconstruction, Chief Estimator, Project Executive, VDC Manager.
  For owners and developers, Director of Construction, Facilities Director. For specialty trades,
  the owner or the estimating lead.
- **Vocabulary:** ISO 19650 for BIM information management; LEED and WELL; OSHA and EMR, where the
  **experience modification rate is a hard prequalification filter**; AISC certification for steel
  fabricators and erectors; bonding capacity and surety; prequalification systems such as ISNetworld
  and Avetta; Buy Clean requirements and Environmental Product Declarations.
  `[NEEDS DATA: verify every one of these at its primary. Construction has the loosest standards
  vocabulary of the twelve and the highest risk of a confident error.]`
- **Comparison axis:** relevant project type and size, bonding capacity, safety record via EMR,
  schedule reliability, self-perform capability, and geographic coverage.
- **Trigger:** a project award, a prequalification deadline, a bid invitation, a schedule failure,
  a new programme of work.
- **Conversion:** **bid invitation** or **prequalification submission**. Emphatically not a demo,
  and only rarely a discovery call.
- **Evidence:** none. **Competitive gap:** Siana Marketing appears in the Apollo Technical ranking
  as an AEC and construction specialist (observed, §1). `[NEEDS DATA: assess.]`

---

## 7. What this means for the page architecture

For Nadia and Kyle, stated as inference from everything above.

1. **The conversion event is a per-vertical field, not a site-wide constant.** RFQ, drawing upload,
   sample request, CAD download, assessment, rate request, consultation, bid invitation, sandbox
   key. `data/growth/taxonomy.ts` already carries a `metrics` array per sector that gestures at
   this. It needs to become explicit, because the page template branches on it.
2. **Certification scope is a first-class field, not body copy.** Standard, edition year, scope
   statement, issuing body, verification link. That structure is what makes a page citable, and it
   is where a wrong value does real damage. It should be typed so an unverified edition year cannot
   silently ship, in the same spirit as the `provenance: 'illustrative'` contract in ADR 0006.
3. **Proof blocks must be able to be absent.** Six of twelve verticals have no evidence. A template
   that renders an empty proof section, or worse a generic one, breaches `CLAUDE.md` §4 and §11.
   Absence has to be a valid state, not a styling problem.
4. **The buyer role model is three-sided in manufacturing and two-sided in professional services.**
   A single `buyer` string per niche, which is what the taxonomy has today, cannot express the
   specifier / procurement / quality split, and that split is most of what makes an industrial page
   distinct.
5. **Standards content has a review date and an owner, because standards move.** ISO 9001 changed
   twelve days ago. The FDA's device QMS regime changed in February. CMMC is phasing in through
   2028. The EU AI Act phases through 2028. A page listing standards without a reviewed date will be
   wrong within a year, and `CLAUDE.md` §7 already requires a named reviewer and review date before
   `indexable: true`.

---

## 8. Proposed edits to CLAUDE.md

Not applied. `CLAUDE.md` is the project bible and I do not overwrite it. For the operator to accept
or reject.

**§1, the wedge paragraph.** Current text:

> **Wedge:** verticals where no AI-search agency has published a single case study. Every serious
> competitor (Radyant, LoudFace, Omnius, Minuttia, Graphite, Omniscient) proves exclusively in B2B
> SaaS. We prove in insurance, professional services, IT services and manufacturing.

Proposed:

> **Wedge:** verticals where no AI-search agency publishes a **named client with a dated
> measurement**. As of 2026-09-28 several agencies market AI search to manufacturers and
> professional-services firms, and Gorilla 76 publishes a measurement method close to ours. Not one
> publishes a named client with a reproducible dated result: Thrive's manufacturing case is unnamed
> and undated, Gorilla 76 anonymises by published policy, and RevenueZen's professional-services
> list carries no dated result for any agency on it. The competitor set still proves overwhelmingly
> in B2B SaaS. See `docs/research/b2b-vertical-substance.md` §1.
>
> **We prove** in insurance (diagnostic only, every KPI a target) and, anonymised under NDA, in
> **cybersecurity and enterprise IT services**. We do **not** prove in manufacturing or professional
> services and those pages must not imply that we do.

**§2, add after the "Not a fit" list:**

> **Reported, unnameable experience.** Four engagements delivered white-label under NDA are recorded
> in `Qognition_IDM_Standalone_Case_Studies.pdf` (21 Sep 2026): enterprise cloud security in the UAE,
> US-facing security operations, US enterprise security services, and a Saudi recruitment-software
> platform. Scope and duration may be described anonymously. **No figure from that document may
> appear anywhere in any form**; every number in it is model output from assumed conversion rates.
> Scope and duration are Qognition's own account and are not independently verified, so the correct
> label is reported, not measured.

**§11, add one anti-pattern:**

> - Publishing a proof or case-study block on a vertical page where no engagement exists. Absence is
>   a valid state. Omit the section.

---

## 9. NEEDS DATA register

Consolidated, deduplicated, ordered by what blocks the most work.

**Blocking any manufacturing page**

1. Verbatim industrial buyer language, sourced and dated. §3.2.
2. Current editions of the sub-vertical standards named in §3.3, each verified at its own body:
   ASME Y14.5, AS9102, IPC-A-610, IPC J-STD-001, AS5553, AIAG PPAP, API 610, API 6D, ASME B16.34,
   ISO 13849-1, IEC 62061, ISO/TS 15066, ATEX, IECEx, 3-A, EHEDG, SQF, BRCGS, FSSC 22000, REACH,
   RoHS, ISO 14001, ISO 45001, ISO 50001, NIST SP 800-171 revision.
3. ITAR CFR part range and the DDTC registration requirement, from the primary. §3.3.
4. IA9100 name and publication date confirmed by IAQG or SAE. §3.3.
5. ISO 9001:2026 transition deadline and the IAF to Global ACI succession, from an accreditation
   body rather than a certification body's blog. §3.3.
6. Sales cycle and deal size by manufacturing sub-vertical. §3.8.
7. HVAC equipment, water treatment, lab instrumentation, material handling, heavy equipment, EV and
   solar standards. §3.3.

**Blocking any AI-search claim on any page**

8. A G.O.L.E.M prompt panel per vertical, recording platform, prompt set, date and cited domain
   classes. Nothing in this file is a citation measurement. §0, §3.6, §5.5.
9. A primary, dated source for any AI-referral conversion-rate claim, or drop the claim. It is not in
   the Semrush study. §3.6.
10. The source for Gorilla 76's "92% of B2B professionals" figure, before anyone repeats it. §1.

**Blocking the B2B SaaS and professional-services pages**

11. A current dated primary on B2B software buying behaviour. §4.2.
12. AICPA confirmation that Security is the only mandatory Trust Services Category, and the Type 1
    versus Type 2 definition. §4.3.
13. ISO/IEC 27001 and ISO/IEC 42001 editions; FedRAMP current authorisation paths; PCI DSS current
    version status. §4.3.
14. State-by-state lawyer advertising variation for the target states, with a named reviewer. §5.3.
    Same shape as OPERATOR-DECISIONS #7.
15. Circular 230 revision; OECD Pillar Two dates by jurisdiction; Chambers band methodology; USPTO
    practitioner requirements; current Salesforce and SAP partner tier names. §5.3.
16. Sales cycle and deal size for professional services. §5.4.

**Blocking the six brief verticals**

17. Competitive gap check per vertical for cybersecurity services, logistics, IT services,
    healthcare and life sciences, financial services, construction. Not run this pass. §6.
18. Standards verification for each of the six, per the bracketed notes in §6.
19. Fetch and assess The Rank Collective's accounting GEO page and the other vertical GEO pages
    surfaced in §1 but not opened.

**Operator decisions this research surfaced**

20. Can the anonymised IDM engagements be described publicly at all, given the commissioning
    agencies control attribution? The document says scope description is Qognition's own account,
    but it does not say Qognition is free to publish it. Confirm before any page uses it.
21. What is the sales answer when a prospect asks to speak to one of the anonymised references? The
    NDA blocks introductions. Decide before the page ships, not after.
