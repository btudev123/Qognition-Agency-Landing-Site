# Copy brief v2: from insurance-led to the B2B universe

Owner: Theo (content). Date: 2026-09-28. Branch: `b2b-ai-search`.
Status: **brief. No draft in this folder is approved copy until Ruth (`brand-guard`) has run.**

Source of truth: repo `CLAUDE.md` (§1 offer, §2 ICP, §4 claims, §10 copy rules, §11 anti-patterns),
`data/b2b/verticals.ts` (locked taxonomy) and `docs/research/b2b-vertical-substance.md` (Iris).
`~/qognition-ops/clients/qognition-agency/context.md` is stale on this brand and was not used.

**Supersedes `docs/copy/00-brief.md`.** That brief's one claim was *"Every AI-search agency you can
name proves its work in B2B SaaS. We prove it in insurance, professional services and IT services."*
The first half was falsified on 2026-09-28. The second half describes an audience three verticals
wide that the operator has since widened to the whole B2B band. Both halves are retired.

---

## What changed, in four lines

1. **The ICP is the gate and it is wide.** Any B2B company, $3M to $1B+ revenue, 20 to 10,000+ staff,
   that needs AI SEO, SEO **or** PPC. Any one of the three qualifies.
2. **The 15-vertical taxonomy is a route to market, not a qualifier.** A B2B firm inside the band
   qualifies whether or not its industry is listed.
3. **The occupancy wedge is dead everywhere except commercial insurance.** Gorilla 76 publishes
   AEO for manufacturers. Thrive publishes an industrial case. Do not restore any "nobody is there"
   sentence outside insurance.
4. **PPC is a real service, sold beside the retainer and priced on ad spend.** Copy may sell it. Copy
   may not imply it is inside the retainer price.

---

## The one claim the whole site owns now

> Agencies now market AI search to manufacturers, law firms and accountants. Not one of them
> publishes a named client with a dated, reproducible measurement. We publish the platform, the
> prompt set and the date on every observation, and we label our own case-study numbers as targets
> until the client's reporting proves them.

Why this one survives where the last one did not. It is a claim about **method**, not about
territory. A competitor naming one client does not destroy it. It is checkable by the reader on the
day they read it. And `caseStudyEvidence()` in `data/case-studies/types.ts` already enforces the
second sentence in code, which means the site cannot quietly stop being entitled to it.

**What we still never lead with:** "SEO and AI search in one retainer." Six competitors say it.
Scope, described once, never a headline.

---

## The rule that governs every page built from the taxonomy

Two prompt families. Confusing them is the most common failure in this material and it is the
mechanism that produced 2,161 location pages.

| Family | Who asks it | Example | What we do with it |
|---|---|---|---|
| **B** | **Our client's buyer.** Procurement, engineers, IT leaders, finance leaders | "Find ISO 9001 and AS9100 certified CNC machining suppliers in the Midwest" | We run it, record it, publish the observation. We can never be the cited answer to it. Never target it |
| **Q** | **Our buyer.** Owner, CEO, marketing or growth leader | "Why doesn't ChatGPT recommend my machine shop" | This is what a page targets |

Practical test for any sentence on any vertical page: *whose problem is this sentence about?* If the
answer is "the engineer's", it belongs in a Family B illustration. If it is "the commercial
director's", it is the page.

---

## Standing constraints on this whole workstream

- **Meta titles, meta descriptions, URLs and internal linking do not change.** Body copy inside
  existing templates only. One unavoidable collision is documented in `industries-manufacturing.md`
  §0 and is an operator decision, not something I resolved.
- **No invented metric.** Every number carries a publisher, a URL and a date, or it is
  `[NEEDS DATA: ...]`.
- **No promise of placement** in any system we do not control.
- **Never blur AI SEO (Google AI Overviews and AI Mode) with GEO (ChatGPT, Perplexity, Gemini,
  Claude, Copilot).**
- **No em dashes.** Banned words per `CLAUDE.md` §10 and `standards/anti-slop.md`.

---

## The sourced facts this workstream is allowed to use

Everything below comes from `docs/research/b2b-vertical-substance.md` with the publisher, URL and
Iris's access date of 2026-09-28. Nothing else may be quantified.

| Fact | Publisher | Label | Carry this caveat |
|---|---|---|---|
| Technical buyers complete 62% of the buying journey before contacting a vendor; ~66% for engineers 35 and under | 2026 State of Marketing to Engineers (GlobalSpec, TREW Marketing, Elektor) | observed | The summary page does not state its sample size. `[NEEDS DATA: n and field dates]` |
| 69% of technical buyers use generative AI during purchasing decisions; 75% notice AI-generated summaries | same | observed | Same publisher caveat |
| Technical buyers rate AI trustworthiness 4.7 out of 10; 69% continue to the classic results after reading an AI summary | same | observed | Publish this **beside** the 69% adoption figure, never alone. Both halves or neither |
| 66% rate engineering experts at vendor companies very or extremely trustworthy as content authors | same | observed | |
| 750 engineers surveyed; 84% are decision-makers or strong influencers; a distinct procurement handoff problem exists; availability now outranks technical performance in selection | EETech Buyer Journey Study 2026 | observed | |
| Over 30% of all ChatGPT referral traffic goes to 10 domains; 21.6% of referrals go to Google; 65% to 85% of prompts match no keyword in a 27bn keyword database; ChatGPT referrals grew 206% Jan 2025 to Jan 2026 | Semrush clickstream study, published 7 April 2026 | observed | The study contains **no** conversion-rate comparison. Never attribute one to it |
| 1,960 insurance prompts produced 34,238 citations across 3,831 domains; insurer-owned domains took 4.6%; Reddit was the most-cited domain at 3.5% | Wellows, 12 August 2026 | observed | Vendor research. One vertical. Never generalised to "B2B" |
| FDA QMSR effective 2 February 2026, amending 21 CFR Part 820 and incorporating ISO 13485:2016; QSIT discontinued | FDA | observed | |
| CMMC 48 CFR acquisition rule effective 10 November 2025; DFARS clause 252.204-7021; four-phase rollout over three years | Federal Register, acquisition.gov | observed for rule and clause, reported for phasing | |
| ISO 9001:2026 published 16 September 2026 | ISO | **reported**, iso.org blocks automated fetch | Do **not** print the 2029 transition deadline. That is certification-body blog sourcing with a commercial interest in urgency |
| Nadcap administered by PRI, 24 critical process accreditations | p-r-i.org | observed | |
| IATF 16949:2016, first edition, replaces ISO/TS 16949:2009 | iatfglobaloversight.org | observed | |
| Microsoft Solutions Partner: six designations, 70 of 100 capability score points required | learn.microsoft.com | observed | |
| SOC 2 is an attestation report issued by a CPA firm, not a certification. Five Trust Services Criteria | AICPA | observed | Never write "SOC 2 certified" |
| EU AI Act: Article 50 transparency obligations and Commission fining powers applied 2 August 2026; high-risk Annex III areas 2 December 2027 | European Commission | observed | |

**Explicitly banned numbers.** Gorilla 76's "92% of B2B professionals using AI said it shaped their
vendor shortlist" (no source on the page). The TraceParts 82% and 90% CAD-download figures (2020-era
secondary restatement). Every figure in the IDM engagement model, listed in
`b2b-vertical-substance.md` §2.2. None of these appears in copy, a chart, a deck or an ad.

---

## Surface-by-surface brief

Each surface names four things. A surface missing one is not ready to draft.

### `/` homepage → `docs/copy/home-v3.md`

1. **Search intent.** Mostly not search. Opened after a referral, a LinkedIn post, an outbound
   snapshot email, or a brand search. Secondary: "AI SEO agency B2B", "GEO agency", "AI search
   visibility agency".
2. **AI-citation angle.** The four-layer definition table in `FourLayers.tsx`. Real `<table>` markup,
   one sentence per surface, surfaces named. It stays the single most liftable block on the site.
3. **Internal links.** In: `/insights`, `/about`, `/case-studies`, LinkedIn. Out: `/free-ai-audit`
   (primary), `/contact`, `/case-studies`, `/case-studies/methodology`,
   `/case-studies/industry/insurance`, `/pricing`. No new outbound links are introduced, because
   internal linking does not change.
4. **The one claim this page owns.** *We name the platform, the prompt set and the date on every
   observation, and we label our own numbers as targets until the client's reporting proves them.*

### `/industries` hub → `docs/copy/industries-hub.md`

1. **Search intent.** Orientation. "Do they work with firms like mine." Often arrived from the global
   nav after the homepage, occasionally cold from "B2B [industry] marketing agency".
2. **AI-citation angle.** The route-to-market paragraph: what a vertical page is, and the plain
   statement that a listed industry is not a claim of experience in it. Nobody in this category
   publishes that sentence.
3. **Internal links.** Unchanged. The existing card grid and the existing services strip stay exactly
   as they are wired.
4. **The one claim this page owns.** *An industry page here is a statement about where we sell, never
   a statement about where we have worked. Where we have worked is named on it, or the section is
   absent.*

### The four layer pages plus PPC → `seo-v2.md`, `local-seo-v2.md`, `ai-seo-v2.md`, `geo-v2.md`, `ppc-v2.md`

These are delta files. The existing drafts are largely vertical-neutral and survive. Each delta file
carries only the blocks that change, with the reason.

1. **Search intent.** Vocabulary checking, then capability checking. "What is GEO", "GEO vs SEO",
   "AI SEO services", "B2B PPC agency".
2. **AI-citation angle.** One definitional paragraph per page: what the surface is, who operates it,
   what changes visibility on it. Written to be lifted whole.
3. **Internal links.** Unchanged, plus the `/ppc` cross-link that already exists in the drafts.
4. **The one claim each owns.** `/seo`: classic ranking is the input to the AI candidate set, so
   cancelling SEO to fund GEO cancels the input to fund the output. `/local-seo`: for a B2B firm the
   Business Profile is an entity source before it is a lead source. `/ai-seo`: this is the only AI
   surface with first-party reporting, and it reports impressions and not clicks. `/geo`: there is no
   markup that makes an assistant recommend you, and most of the work is off your domain. `/ppc`:
   separating paid from the retainer is what stops an agency paid on ad spend recommending more ad
   spend.

### `/industries/manufacturing` → `docs/copy/industries-manufacturing.md`

The **one worked vertical example**. Chosen deliberately as the hardest case: Tier S demand, the
deepest research file, a live indexable URL with six live sub-industry children, a named competitor
already publishing in it, and **zero delivery history**, so the page has to carry itself on original
substance with an empty proof block. If the pattern holds here it holds everywhere. The easier
variant, for the verticals where delivery exists, is specified in §9 of that file.

1. **Search intent.** A manufacturer's marketing or commercial leader who has been told the RFQs are
   drying up, or who has typed their own category into ChatGPT and not seen the company. Secondary:
   "manufacturing marketing agency", "AEO for manufacturers", "GEO agency manufacturing".
2. **AI-citation angle.** The supplier-qualification paragraph: what a device OEM's supplier-quality
   team now asks a contract manufacturer for since the FDA's QMSR took effect on 2 February 2026 and
   QSIT was discontinued. Self-contained, dated, attributable, and written by nobody else in this
   category.
3. **Internal links.** Unchanged. The template already links the six sub-industries, the recommended
   services, `/industries`, a case study and the sidebar cluster.
4. **The one claim this page owns.** *A manufacturer is eliminated at specification, not at quote.
   With 62% of the technical buying journey finished before a vendor is contacted, the question is
   not whether you rank. It is whether your certification scope, tolerance range and lead time are
   retrievable as facts by the time the engineer stops looking.*

---

## What must not come back

- Any variant of "no AI-search agency has published a case study outside B2B SaaS".
- "We sell to three kinds of firm." The ICP is the band, not the list.
- "$3M to $50M, 20 to 200 staff." The upper bound moved on 2026-09-28.
- Any sentence that makes wanting AI search a condition of the conversation.
- Any sentence that puts PPC inside the retainer price.
- "Receipts, not promises" over a grid of targets.
- "Industries we dominate. Globally."
- Any present-state assertion about what an assistant returns, without a platform, a prompt set and a
  date.
- Any implication of experience in a vertical because a page exists for it.
