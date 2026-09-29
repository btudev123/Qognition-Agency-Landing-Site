# `/` : Homepage v2. AI SEO and GEO for B2B firms

Owner: Theo (content). Date: 2026-09-28. Branch: `b2b-ai-search`.
Status: **draft. Not approved copy until Ruth (`brand-guard`) has run.**

Supersedes `docs/copy/home.md`. That draft sold a four-layer retainer to three named verticals.
This one narrows to the operator's instruction of 2026-09-28: **AI SEO and GEO, for B2B firms and B2B
service providers.** Section structure is fixed and comes from `app/HomePage.tsx` (Mira is harvesting
it in parallel). This file writes what goes inside the sections. It changes no component.

---

## Brief delta

The `00-brief.md` homepage brief still holds on three of its four points. Only the audience changed.

1. **Search intent.** Unchanged. Mostly not search. The page opens after a referral, a LinkedIn post,
   an outbound snapshot email, or a brand search for "Qognition". Secondary: "AI SEO agency B2B",
   "GEO agency", "AI search visibility agency".
2. **AI-citation angle.** The four-layer definition, one sentence per surface, with the surfaces
   named. It now lives in the service-grid intro rather than a standalone table section, because
   there is no table section in this structure. It is still the most liftable block on the page.
3. **Internal links.** In: `/insights`, `/about`, `/case-studies`, LinkedIn.
   Out: `/audit` (primary), `/geo`, `/ai-seo`, `/seo`, `/local-seo`, `/pricing`, `/case-studies`,
   `/case-studies/methodology`, sector pages.
4. **The one claim this page owns.** *We name the platform, the prompt set and the date on every
   observation, and we label our own case-study numbers as targets until the client's reporting
   proves them.* Nobody in this category does either on a homepage.

**Audience change, stated once.** Not "insurance, professional services, IT services". The page now
addresses B2B firms and B2B service providers generally, with sectors carried in the Coverage grid.
See Conflict 1 at the bottom, which the operator has to settle.

---

## `<title>` and meta description

```html
<title>AI SEO and GEO for B2B Firms | Qognition Agency</title>
<meta name="description" content="AI SEO and GEO for B2B firms and service providers. We sample the questions your buyers ask ChatGPT, Perplexity and Google AI, then show you what came back and when.">
```

Title 47 characters plus brand. Description 156 characters.

---

## 1. Hero

Masked-word H1 at `clamp(40px, 5.8vw, 84px)` in a 600px column. Two display lines, each short enough
to hold at 84px.

**Badge** (mono, uppercase, above the H1)

```
AI SEO AND GEO FOR B2B FIRMS
```

**H1** (two masked lines)

```
Line 1:  Your buyers ask AI
Line 2:  who to hire.
```

**Subhead**

> Most B2B firms have never checked the answer. We sample the questions your buyers ask, on named
> platforms, on a stated date, and send you what came back.

The second sentence of `CLAUDE.md` §1's approved H1 is the first sentence of this subhead. It is
load-bearing. **If the subhead is cut or shortened, the H1 becomes an unsourced assertion about
buyer behaviour with nothing under it.** Ruth should treat the pair as one unit.

**Primary CTA**

```
Get your free snapshot
```

**Secondary CTA**

```
Book a 20-minute walkthrough
```

**AI engine chips, label above the logo row**

```
PLATFORMS WE SAMPLE
```

Replaces the live label "Built to win citations in". That line promises citations, which §4 of
`CLAUDE.md` forbids and which we cannot deliver on a third-party system. "Platforms we sample" is
true, is the actual job, and sets up the snapshot.

Chips stay as built: ChatGPT, Claude, Gemini, Perplexity, Google AI.
`[NEEDS DATA: final platform list, and whether Claude is inside the free snapshot. OPERATOR-DECISIONS
item 4 has the homepage selling five platforms in one place and four in another. These chips and the
`/audit` list must be the same set before ship.]`

---

## 2. Service grid: 11 cards

Replaces the 11 retired services in `data/services.ts`. Section header first, then the four-layer
definition as the intro, then the cards.

**Eyebrow**

```
WHAT IS IN THE RETAINER
```

**H2** (two masked lines)

```
Line 1:  Four surfaces.
Line 2:  Eleven jobs.
```

**Section intro.** This is the liftable block. Keep it as real text, four defined sentences.

> Most of this industry uses four words interchangeably. They are four different places.
> **SEO** is Google's search results. **Local SEO** is Google Maps, the local pack, Business Profile,
> reviews and listings. **AI SEO** is Google AI Overviews and AI Mode. **GEO** is the assistants:
> ChatGPT, Perplexity, Gemini, Claude and Copilot.
>
> All four are in every retainer and we do not sell them separately, because the last two do not work
> without the first two. Tiers differ by scope: locations covered, prompts tracked, assets produced.
> [See how pricing is scoped](/pricing)

Mira: if a real `<table>` can be added inside this section without touching the grid, the four rows
lift better as a table than as prose. Prose is the fallback, not the preference.

### The 11 cards

Each card has an eyebrow (mono, uppercase, currently fed by `service.kpis[0]`), a title, and a
one-line outcome. The card component also renders up to four sub-items. Those are supplied so the
component does not need changing. Card order matters: AI SEO and GEO lead, SEO and Local SEO are the
supporting layers, per the sitewide emphasis order in `CLAUDE.md` §1.

| # | Eyebrow | Title | One-line outcome | Sub-items | Links to |
|---|---|---|---|---|---|
| 01 | `CHATGPT · PERPLEXITY · GEMINI` | **GEO** | Assistants build answers from sources they retrieve, and most of those sources are not your website. This is the work on the ones that are. | Third-party sources · Association profiles · Review platforms · Trade press | `/geo` |
| 02 | `AI OVERVIEWS · AI MODE` | **AI SEO** | Google extracts passages and attributes them. We write pages it can extract and make the attribution unambiguous. | Passage structure · Extractable answers · Attribution · Search Console AI impressions | `/ai-seo` |
| 03 | `BUYER QUESTIONS` | **Answer engine optimisation** | One page per question your buyer actually asks, answered in the first paragraph, reviewed by someone who does the work. | Question mapping · Answer-first structure · Named reviewer · Source attribution | `/ai-seo` |
| 04 | `WHO YOU ARE` | **Entity optimisation** | One description of your firm across your site, your schema, your Business Profile, your listings and your people's profiles. Where they disagree, we fix the disagreement. | Naming audit · Organisation data · Schema matched to visible text · Profile consistency | `/geo` |
| 05 | `THE PROMPT SET` | **Commercial prompt tracking** | We build the question set from your buyers' words. You edit it. It becomes the measurement instrument for the whole engagement. | Buying-stage labels · Market variants · Your edits · Method notes | `/audit` |
| 06 | `SAME PROMPTS, NEW DATE` | **AI visibility monitoring** | The set reruns on a schedule. You see the platform, the prompts, the date, and what changed since the last run. | Fixed cadence · Dated observations · Citation sources · Competitor comparison | `/audit` |
| 07 | `SOURCES YOU DO NOT OWN` | **Off-site evidence** | Association directories, review platforms, trade publications and expert commentary published under the names of your actual people. | Directory and association entries · Review platforms · Trade press · Named-author commentary | `/geo` |
| 08 | `WRITTEN WITH YOUR PEOPLE` | **Content production** | We write it, from about an hour a month with your subject-matter people. Content written without them does not get retrieved. | Interviews · Drafting · Expert review · Publication | `/ai-seo` |
| 09 | `CRAWL AND INDEX` | **Technical SEO** | Crawlability, rendering, structure and internal links. This is the unglamorous half, and skipping it is why most GEO work produces nothing. | Crawl and render · Indexation · Site structure · Internal links | `/seo` |
| 10 | `MAPS AND LISTINGS` | **Local SEO** | Business Profile, categories, reviews and listing consistency. For a multi-partner firm the map pack is a named-person problem as much as a listings problem. | Business Profile · Categories · Review process · Listing consistency | `/local-seo` |
| 11 | `WHAT MOVED, AND WHEN` | **Measurement and reporting** | Search Console generative AI impressions, classic rankings, Maps performance and the conversions your CRM recorded, in one dated monthly record. | Search Console AI impressions · Rankings · Maps · CRM conversions | `/pricing` |

**Closing line under the grid**

> B2B PPC is a separate offer, priced separately. [See how that works](/ppc)

---

## 3. Methodology

Four numbered steps with ghost numerals and a timeline rail, ending in a word marquee. Titles render
with a full stop appended by the component, so each title is a single word.

**Eyebrow**

```
THE METHODOLOGY
```

**H2** (one masked line)

```
How it runs.
```

**Section intro**

> Four phases, one team, a fixed rhythm. Each phase has a deliverable you can hold, a named owner,
> and an exit criterion you can check. We do not control ChatGPT, Google or Perplexity, and we will
> not tell you when you will appear in them. What we commit to is the work, the measurement, and a
> dated record of both.

### The four phases

| # | Title | Timeline | Blurb |
|---|---|---|---|
| 01 | **Baseline** | `WEEK 1–2` | We record where you stand before we touch anything. A crawl of your site, your Search Console and Business Profile data, your listings and reviews, and a prompt set built from your buyers' questions, run across the named platforms and written down with the date. |
| 02 | **Entity** | `WEEK 3–6` | Assistants need to be certain who you are before they name you. One consistent description of your firm across site, schema, Business Profile, listings, association entries and your team's public profiles. Technical SEO and site structure run in parallel. |
| 03 | **Evidence** | `WEEK 7–12` | The work moves off your site, because the sources an assistant retrieves are mostly not yours. Association profiles, industry directories, review platforms, trade publications and commentary published under the names of your people. |
| 04 | **Rerun** | `ONGOING` | The same prompt set, the same platforms, a new date, and what changed. Alongside it: Search Console generative AI impressions, classic rankings, Maps performance and the conversions your CRM recorded. |

Phase 04 is where Google's own data enters the report. Google added generative AI performance
reporting to Search Console, available worldwide from **31 August 2026**. It reports impressions from
AI Overviews, AI Mode and generative AI features, **not clicks**. So we can show you movement on
Google's AI surfaces from Google's own numbers, and we cannot show you traffic from them.

Source: Google Search Central.
`[NEEDS DATA: the URL that carries the 31 August 2026 worldwide availability statement. The
`developers.google.com/search/blog/2026/06/gen-ai-performance-reports` slug is dated 2026/06 and
contradicts the sentence. OPERATOR-DECISIONS lists this as a BLOCKER. A page arguing that we date our
claims cannot ship a link that disagrees with its own date. Cite the correct URL or drop the date.]`

### Word marquee

**Eyebrow** (replaces "Powered by", which implied a partner relationship with the platforms named)

```
IN SCOPE
```

**Marquee terms**

```
ChatGPT · Perplexity · Gemini · Claude · Copilot · Google AI Overviews · AI Mode ·
Search Console AI impressions · Google Business Profile · Schema.org entities ·
Association directories · Review platforms · Trade press · Named-author commentary ·
Internal linking · llms.txt · robots.txt
```

Nothing in this list is a logo, a badge or a partnership. It is the surfaces we sample and the assets
we work on. Keep it that way. `data/trust.ts` carries five platform "partner" logos marked
`[UNVERIFIED]`; none of them belong anywhere near this marquee.

---

## 4. Selected works: framing only

Case study cards with mono pills and tabular KPIs. **I am writing the framing, not the cards.** The
KPI rows come from `data/case-studies/` and `caseStudyEvidence()` decides how they render. That
mechanism stays exactly as it is: one KPI row without an `actual` makes the whole record projected,
and the page labels its numbers as **targets**. Do not weaken it, do not special-case the homepage,
and do not put a benchmark-derived figure in `actual`.

**Eyebrow**

```
SELECTED WORKS
```

**H2** (two masked lines)

```
Line 1:  Live engagements.
Line 2:  Targets, not results.
```

Replaces "Receipts, not promises." That header claimed proof over a grid of numbers that are targets.
It was the single largest claims defect on the page.

**Framing paragraph** (right column, above the "All case studies" button)

> Every number on these cards is a target the programme was built to reach, not an outcome a client
> has reported. They stay labelled that way until the client's own reporting export fills the
> measured column. One unproven figure marks the whole record, so three good numbers cannot carry a
> fourth.
> [How we handle evidence](/case-studies/methodology)

**Second framing paragraph** (the one published fact in this category, and why it sits here)

> Almost nothing has been published about who actually gets cited in B2B AI answers. The clearest
> study we have found covers one category. Wellows ran 1,960 insurance prompts, which produced 34,238
> citations across 3,831 domains. Insurer-owned domains took **4.6%** of those citations. The single
> most-cited domain was Reddit, at **3.5%**. Wellows is an agency working in this category, so treat
> it as vendor research. We cite it because the method is published.
> Source: Wellows, *AI Visibility for Insurance Marketing Agencies*, 12 August 2026.
> [Read the study](https://wellows.com/blog/ai-visibility-for-insurance-marketing-agencies/)

Two constraints on that paragraph. It names insurance because that is the sample. **It must not be
generalised to "B2B" or to any sector the study did not cover.** And it must be coordinated with
Nadia before it appears in outbound, because it is a competitor's research.

**Button**

```
All case studies →
```

`[NEEDS DATA: which records surface on this grid. The featured id is hard-coded to
`fox-service-company`, an HVAC engagement, and the grid pulls HVAC and dental records. On a homepage
addressed to B2B firms and B2B service providers, an HVAC and dental grid argues against the page.
Operator decision: feature the insurance records, or accept an off-audience grid, or hold the section
until a B2B record is publishable.]`

`[NEEDS DATA: current reconciled-to-reporting count and the date it was checked, from
`/case-studies/methodology`. Do not state a count in copy without it.]`

---

## 5. Coverage: 8 sectors

Eight industry cells that invert to near-black on hover. Sourced from `data/growth/taxonomy.ts`,
`growthSectors`, which contains exactly eight. Cell numbering renders `01 / 08` and so on.

**Eyebrow**

```
COVERAGE
```

**H2** (two masked lines)

```
Line 1:  Sectors we
Line 2:  build for.
```

Replaces "Industries we dominate. Globally." That heading carried a superlative with no source and a
global claim the offices question has not settled. It also breaks the `CLAUDE.md` §11 anti-pattern
about implying experience in an industry because a page exists for it.

**Line under the H2** (one sentence, and it does real work)

> These are the sectors we build the programme for. They are not a claim of published results in
> each one, and we will say so on the call.

Each cell names **your client's buyer**, never ours. Our buyer is the owner, CEO, marketing or growth
leader reading this page. The buyer in these notes is theirs.

| # | Name | Note | Tags (cell shows the first two) | Slug |
|---|---|---|---|---|
| 01 | **B2B software and SaaS** | Evaluators compare fit, integrations and switching cost long before a demo is booked. | Vertical SaaS · RevOps · DevTools · Security software | `b2b-software` |
| 02 | **Professional B2B services** | A founder, CFO or general counsel looking for a specialist, usually against a deadline. | CPA and tax · Law · Advisory · IT consulting | `professional-services` |
| 03 | **Cybersecurity** | A CISO or IT director who has already read a vendor comparison an assistant wrote for them. | MSSP · MDR · IAM · AppSec | `cybersecurity` |
| 04 | **Industrial and manufacturing** | Engineering and procurement check specifications and certifications before an RFQ is sent. | OEM · Automation · Components · Contract manufacturing | `industrial-manufacturing` |
| 05 | **Logistics and supply chain** | Shippers settle mode, lane and handling fit before anyone asks for a rate. | Forwarding · 3PL · Cold chain · Warehousing | `logistics-supply-chain` |
| 06 | **Compliance, risk and GovTech** | Control owners want to see which obligations the product covers and which stay with their team. | RegTech · ESG · Risk · GovTech | `compliance-risk-govtech` |
| 07 | **Life sciences and biotech** | Scientific and business-development buyers check capability and method before a study inquiry. | CRO · Lab platforms · Trials · Informatics | `life-sciences-biotech` |
| 08 | **Energy and mining technology** | Operations and commercial leads test site fit and stated assumptions before a feasibility call. | EnergyTech · MiningTech · Renewables · Projects | `energy-mining` |

**Button**

```
All sectors →
```

`[NEEDS DATA: the href for each cell. `getNichePath()` resolves niches, not sectors. The sector
route is `/growth/industries/<slug>`, but `CLAUDE.md` §5 lists only three industry routes
(`/industries/insurance`, `/industries/professional-services`, `/industries/it-services`). Eight
cells pointing at three pages is a dead-end grid. Kyle owns this.]`

---

## 6. Final CTA

Huge display type over the drifting orb mesh. Two lines at `clamp(56px, 9vw, 180px)`, so each line
holds at roughly twelve characters.

**H2** (two masked lines)

```
Line 1 (gradient):  Check the
Line 2:             answer.
```

It closes the loop the H1 opened. The hero says most B2B firms have never checked the answer. The
last thing on the page tells them to.

**Body** (right column)

> We build a prompt set from your buyers' questions, run a sample of it across the platforms, crawl
> your site for the signals that feed those answers, and send you what we saw with the date on it. A
> sample is a sample: a different day or a different account can return a different answer, and we
> will say that in the document. If you are already well positioned, we will tell you that too.

**Primary CTA**

```
Get your free snapshot
```

**Secondary CTA**

```
Book a 20-minute walkthrough
```

The live body copy promises delivery "within 48 hours". That comes out. OPERATOR-DECISIONS item 2 has
the snapshot SLA unresolved.
`[NEEDS DATA: snapshot turnaround the team can hold at current volume. Until it exists, no turnaround
appears on this page. A missed self-imposed SLA on a page whose whole argument is honesty costs more
than the conversion the number buys.]`

---

## What must not come back

Ruth returned twenty items on the previous deck. These are the ones this structure keeps inviting.

- **"Every quarter your CAC drops."** Live in `METHOD_DATA[3].blurb`. An unmeasured number dressed as
  a mechanism. Nothing in this file replaces it with another one.
- **"Built to win citations in."** Hero label. Promises placement in third-party systems.
- **"Receipts, not promises."** A proof claim over a grid of targets.
- **"Industries we dominate. Globally."** Superlative with no source, plus a global claim.
- **Any sentence asserting what an assistant "currently" returns** without a platform, a prompt set
  and a date. The insurance H1 was blocked for exactly this. Nothing on this page states a present
  state of ChatGPT, Perplexity, Gemini, Claude, Copilot or Google AI.
- **Invented engagement or reach figures.** `StatBand` sits between the service grid and the
  methodology in `HomePage.tsx` and is not in the section list I was given.
  `[NEEDS DATA: what StatBand renders. If any figure in it is not measured, it is cut, not rewritten.]`
- **`AICitationSimulator.tsx`**, which fabricates an AI answer with invented citations. It is on the
  delete list and must not be reintroduced to illustrate this page.

Also checked against `standards/anti-slop.md` and `CLAUDE.md` §10: no em dashes anywhere in this
file's copy, no "unlock", "supercharge", "leverage", "seamless", "game-changer", "elevate",
"seamlessly", "robust", "empower", no "landscape" as a metaphor, no "not just X, it's Y", no
rhetorical-question section openers, no superlatives.

---

## Conflicts surfaced, not resolved

1. **Insurance is the flagship vertical and is not one of the eight sectors.** `CLAUDE.md` §2 names US
   commercial and specialty insurance as the flagship, `00-brief.md` builds the deepest page around
   it, and the Wellows study is insurance research. `data/growth/taxonomy.ts` has no insurance sector,
   and the instruction for this file was to source the eight from taxonomy. So the homepage now shows
   eight sectors that exclude the one vertical we have the most evidence and the deepest page for.
   Two clean options: replace the weakest taxonomy cell with insurance, or keep the eight and carry
   insurance as the named flagship in Selected works. My view in one line: keep the eight, because
   the operator's instruction narrowed the audience to B2B firms and service providers rather than to
   insurance, and insurance is better argued on its own page than as one cell of eight. The decision
   is the operator's.
2. **The narrowed instruction and `CLAUDE.md` §2 disagree on audience width.** §2 names three
   verticals. The operator's instruction of 2026-09-28 says B2B firms and B2B service providers. This
   file follows the operator. If §2 is still correct, the Coverage grid is wrong and needs rebuilding
   against three sectors, not eight.
3. **`~/qognition-ops/clients/qognition-agency/context.md` is still stale.** It describes an eleven
   service marketing agency with a $500/mo entry tier. Every future marketing run plans against that
   file. It needs rewriting to the single-offer model or this conflict repeats on every deliverable.
4. **Routes.** `/geo`, `/ai-seo`, `/seo`, `/local-seo`, `/ppc`, `/audit` do not exist in `app/` yet.
   Every link in this file is written to the `CLAUDE.md` §5 route map. Eighteen rules in
   `next.config.mjs` still point at `/free-ai-audit` and have to re-point together.

---

## Build notes for Mira

- One H1 on the page. Every other heading is H2 or lower.
- The four-layer definition in the service-grid intro is the block a model is most likely to lift.
  Real text in the DOM, not an image, not a canvas, not a JS-only render.
- The hero subhead is part of the H1 claim. It does not get truncated on mobile.
- Both external sources render as live outbound links. The Google one does not ship until the URL
  in NEEDS DATA is settled.
- Card eyebrows are currently fed by `service.kpis[0]`. The eyebrow column in this file is the
  string to render, whatever field it comes from.
- Nothing in this file changes `caseStudyEvidence()` or any KPI rendering path.
