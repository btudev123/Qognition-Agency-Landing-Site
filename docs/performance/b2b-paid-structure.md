# B2B paid media structure

> **Superseded in part, operator 2026-10-14.** GoHighLevel and Upstash are removed. Leads are emailed to hello@ through Resend, and calls are booked through Cal.com on /book. Sections below that describe GHL or Upstash are kept for history.

Owner: Marcus (performance). Date: 2026-09-28. Branch: `b2b-ai-search`.
Status: structure and viability input for the `/services/ppc` page, for ADR-0007, and for the
account build we run on a client. Not copy. Nothing here ships to a client-facing page until Ruth
has run.

Reads: `CLAUDE.md` §1 (PPC as a real service), §2 (the locked ICP), §3 (the funnel and the channel
order), §4 (claims discipline), §8 (measurement), `data/b2b/verticals.ts`,
`docs/research/b2b-vertical-substance.md` (Iris), `docs/copy/ppc.md`, `lib/analytics.ts`,
`lib/validation.ts`, `app/api/lead/route.ts`.

---

## 0. The target, first, because a structure without one is decoration

Every recommendation below opens with a target or it does not open. There are two levels and they
are different numbers.

**Qognition's own paid target.** `CLAUDE.md` §3 sets the North Star as booked qualified walkthroughs
per month and puts paid **last** in the channel order. So the honest statement is that Qognition has
no paid target because Qognition should not be running paid for itself yet.

- `[NEEDS DATA: monthly booked-walkthrough target]`
- `[NEEDS DATA: allowable cost per booked walkthrough]`
- `[NEEDS DATA: walkthrough to retainer close rate]`

**The client's paid target**, which is the one this document is actually about. No account gets
built without both of these, supplied by the client, in writing:

- `[NEEDS DATA: target cost per qualified lead, per client]`
- `[NEEDS DATA: lead to closed-won rate and average first-year contract value, per client]`

Those two produce the break-even, and the break-even is the only number that decides whether a
budget conversation is allowed to happen. See §6.

**There is no ad account connected to this repository and no historical performance data exists
anywhere in it.** I checked. There is no Google Ads link, no Search Console export of paid data, no
platform report, no spend record. Every CPC, CPL, CPA, ROAS, impression share and conversion-rate
figure that could appear in this document is therefore absent by design rather than omission.
Category benchmarks are not this account's numbers and are not a substitute for them. Where a
decision depends on a number, the number is marked `[NEEDS DATA]` and the decision waits.

---

## 1. Check the signal before touching the structure

This is the section that outranks the rest. A bid strategy does not survive a weak conversion
signal, and five specific things in this repository break the signal today. All five are verified
from the code, not assumed.

### 1.1 No click ID is captured anywhere

`grep` for `gclid`, `wbraid`, `gbraid`, `msclkid` and `li_fat_id` across the repository returns
**zero matches**. `lib/validation.ts` has no field for any of them. `app/api/lead/route.ts` does not
read them. `lib/analytics.ts` reads UTMs only.

Consequence: **offline conversion import is impossible today.** A lead captured from a paid click
cannot be matched back to that click when it closes eight weeks later, on any platform. Smart
bidding therefore optimises toward the form fill, which in a considered B2B purchase is the wrong
target and reliably buys the cheapest, worst leads.

This is not a nice-to-have. It is the precondition for the whole service.

### 1.2 `docs/copy/ppc.md` already claims the capability that does not exist

The page copy says, in §3, "Conversion tracking that survives the sales cycle, including click ID
capture and offline conversion import from your CRM", and repeats it in §4. Under `CLAUDE.md` §4
that is a claim the repository cannot support on the day it ships.

Two acceptable resolutions. Either ship the capture first and then the sentence, or rewrite the
sentence to future tense and scope it to the client's stack rather than ours. Do not ship it as
written.

### 1.3 `walkthrough_booked`, the declared North Star event, is not implemented

`CLAUDE.md` §8 states it is "server-side only, from the GoHighLevel webhook". There is no inbound
GoHighLevel webhook route. `app/api/` contains `audit`, `health`, `integrations/status`, `lead`,
`ph` and `revalidate`. None of them receives a booking. `grep` for `walkthrough_booked` across the
repository returns nothing.

Consequence: the North Star is currently unmeasured. `booking_widget_view` fires in
`components/shared/CalBooking.tsx` and its comment correctly says an iframe view is not a meeting.
That comment is right and must stay. It also means the funnel currently ends, as far as analytics is
concerned, at "somebody looked at a calendar".

### 1.4 Attribution is stored in `sessionStorage`, which `CLAUDE.md` §8 forbids

`lib/analytics.ts` writes `qognition_attribution_v2` to `w.sessionStorage`. §8 says "Attribution must
outlive the session. A multi-week consideration purchase loses first touch if it is stored in
`sessionStorage`." The file does exactly the thing the bible prohibits. The `mergeAttribution`
first-touch logic is correct; the storage medium discards it on tab close.

### 1.5 The qualification data the MQL rule depends on is behind a collapsed accordion

`lib/leadQualification.ts` grades a lead MQL only when `employee_band` or `revenue_band` is present.
In `components/shared/LeadForm.tsx` both of those live inside a `<details>` element that is closed by
default. Most visitors will never open it, so most leads will be graded `Lead` regardless of who
they are. The grading is not wrong, it is starved.

Two further defects in the same file, both directly against the ICP locked on 2026-09-28:

- `size` passes only `'20-99'` and `'100-300'`. The ICP is **20 to 10,000+ staff**. A 2,000-person
  firm fails the size test.
- `revenue` passes only `'3m-10m'`, `'10m-50m'` and `'50m-500m'`. The ICP is **$3M to $1B+**. A firm
  at `'over-500m'` fails the revenue test.

Because the rule is `size || revenue`, a large qualified firm that answers both questions honestly is
graded **below** a mid-market firm that answers one. That is backwards, and it is the same firm
`CLAUDE.md` §2 says stays eligible as inbound.

Finally, `service` in `lib/validation.ts` is still the retired spoke enum
(`marketing | tech | finance | automation | unsure`). There is no way to record whether a lead wants
AI SEO, SEO or PPC. **That is the ICP's qualifying axis and it is not captured on any form.** For a
paid media service sold into all 15 verticals, this is the single most consequential gap in the lead
schema, because it means every paid lead arrives untagged by the thing it was bought for.

### 1.6 Order of work

Nothing in §2 onward is worth building before these are closed, in this order:

1. Click ID capture on the lead record (§1.1). Blocks all paid measurement.
2. `service` enum replaced with the three real needs (§1.5). Blocks routing and reporting.
3. GoHighLevel inbound webhook and `walkthrough_booked` (§1.3). Blocks the North Star.
4. Attribution moved off `sessionStorage` (§1.4). Blocks multi-week attribution.
5. Qualification bands fixed and surfaced (§1.5). Blocks MQL grading.
6. `docs/copy/ppc.md` claim corrected (§1.2). Blocks shipping the page.

---

## 2. Account structure by archetype, not by vertical

Fifteen verticals do not produce fifteen builds. They produce **four archetypes**, and the archetype
is decided by what the buyer types and what they are willing to do on the first visit, not by the
industry label. A CNC machine shop and a horizontal SaaS vendor differ on six specific axes, and
listing channels obscures all six.

| | **A. Specification-led industrial** | **B. Category-comparison software** | **C. Credential-gated advisory** | **D. Operational service vendor** |
|---|---|---|---|---|
| Example | CNC machining, sheet metal, OEM components, specialty chemicals | Horizontal SaaS, dev tools, AI/ML tooling, martech | Legal, CPA, consulting, commercial insurance, fractional CFO | MSP, 3PL, IT staffing, commercial solar EPC, compliance training |
| What the buyer types | A **specification**: material, tolerance, process, part number, certification | A **category plus a qualifier**: "X software for Y", "alternative to Z" | An **event**: "Section 382 limitation after acquisition", "WARN Act defence" | A **service plus a boundary**: geography, seat count, lane, vertical |
| Conversion event bid target | Drawing or STEP upload, sample request, cross-reference lookup. See `conversion-events.md` | Sandbox key or demo, and the two are not interchangeable | Consultation with a **named person** | Assessment, audit, rate request |
| Dominant match-type posture | **Exact and phrase only.** Broad against a spec vocabulary buys hobbyists and students | Phrase and broad with a hard negative list against research intent | Phrase and exact. Broad buys people who have the problem and no budget | Phrase and exact, geo-bounded |
| Primary negative problem | Job seekers, students, hobbyists, overseas resellers, "how to" | Free-tier hunters, competitors, job seekers, students, "is X free" | Consumers with the same word ("insurance", "lawyer"), DIY intent | Job seekers, the consumer version of the same service |
| LinkedIn's role | Weak. The specifier is an engineer who researches in publications, not a feed. Iris §3.2 | Strong. Title and account targeting map onto the buying group cleanly | Strong for the firm's own leadership, useless for their client's event-driven search | Strong for account-based expansion, weak for cold acquisition |
| The thing that breaks it | Long-tail spec queries each carry little volume, so conversion counts starve smart bidding | A demo gate on a dev-tools campaign destroys it outright. Iris §4.4 | The advertising rules are enforceable, and they bind the agency too. Iris §5.3 | Adverse geography. A national campaign for a regional operator |
| Landing page must carry | The capability grid **plus the qualification path**, which almost nobody publishes. Iris §3.4 axis 3 | Pricing, or a credible reason there is none, and the security posture | The named individual, their credential, and the jurisdiction | Coverage, exclusions, response times, and exit terms |

### 2.1 What actually differs, said plainly

**Archetype A cannot use the bid strategies the platforms want to sell it.** The conversion event is
a drawing upload, the buyer is one engineer at one moment, and the query set is a long tail of
specifications each of which carries a handful of searches a month. That produces a monthly
conversion count in single digits for most accounts. Automated bidding needs conversion volume to
learn; below that, it either stalls or spends the budget discovering the same thing a negative list
would have told it for free. The structure that works is a small number of tightly themed exact and
phrase ad groups, manual or enhanced CPC until volume exists, and a negative list that is treated as
the primary deliverable rather than housekeeping.
`[NEEDS DATA: Google Ads' current documented conversion-volume guidance for Target CPA and Maximize
Conversions on Search. Confirm at the platform's own documentation before quoting a threshold. Do
not print a number from memory.]`

**Archetype B breaks on the conversion event, not on the targeting.** Iris §4.4 is unambiguous:
dev tools and APIs convert on a self-serve signup or a sandbox key, and a "book a demo" gate
destroys them. Vertical SaaS and fintech convert on a demo. Cybersecurity converts on an assessment
or a POC, rarely a cold demo. Data platforms convert on an architecture consultation. Four
conversion events inside one meta-vertical. A single account template across them is wrong in three
of the four cases, and the cost of being wrong is not a lower conversion rate, it is a campaign that
produces nothing at all.

**Archetype C has a compliance layer above the account.** Lawyer advertising is rule-governed by
ABA Model Rule 7.1 as adopted state by state, and the states differ materially on testimonials, past
results and required disclaimers (Iris §5.3, reported). An ad we write for a law firm is a
communication about that lawyer's services. Financial products carry platform-level certification
and restriction regimes of their own.
`[NEEDS DATA: state-by-state lawyer advertising variation for the states we will target, with a
named reviewer. Same shape as OPERATOR-DECISIONS #7.]`
`[NEEDS DATA: current Google Ads and LinkedIn Ads policy requirements for financial services
advertisers, by product and geography.]`
Until both are answered, no ad copy ships in legal or regulated financial lines.

**Archetype D is the one where geography does the work.** Coverage, exclusions and exit terms are
what the buyer researches (Iris §6.3), the conversion is an assessment, and the account lives or
dies on location targeting and a service-area negative strategy. It is also the closest in shape to
Qognition's own snapshot, which makes it the easiest to write about honestly.

### 2.2 What every archetype shares

- One conversion action designated **primary**, matching `conversion-events.md`, and everything else
  set to secondary and excluded from bidding.
- Click IDs on the lead record at the moment of capture (§1.1).
- Offline conversion import from the client's CRM once a stage is closed-won, not at MQL.
- Search term reports read weekly for the first eight weeks, and the negative list is the artefact.
- Paid and organic reported per query group, separately, never blended. See §5.
- Brand campaigns budgeted, reported and judged separately from everything else. See §5.2.

---

## 3. Which verticals are genuinely paid-viable

> **Partly superseded, 2026-09-29.** `docs/performance/icp-keyword-audit.md` §4 re-tests this table
> against the operator's locked 21-industry taxonomy and its per-niche `fit` field. Three verdicts
> below were written at the wrong grain and are corrected there: **government and institutional**
> (the GovTech/NonprofitTech software half and the compliance-trigger consultancies are paid-viable;
> only the solicitation-led half is not), **healthcare and life sciences** (the exclusions were right,
> the exceptions were too narrow), and **construction** (geotechnical, civil/land-development and
> forensic/claims engineering have a private, deadline-driven, searching buyer; the hard-bid half does
> not). The replacement rule, and the reason an industry label was never the right unit for this call:
> **paid viability is a property of the conversion event's `capture` field.** Where
> `conversion-events.md` resolves the event to `offline`, no account should be built, whatever the
> industry is called. Read §4.3 of the audit before acting on any row below.

**This is an assessment of market structure, not a measurement.** I have no volume data. The test I
am applying has four parts, and a vertical has to pass all four:

1. A query exists that a buyer actually types at the point of decision.
2. The conversion event is reachable from a cold click. If the way in is a tender, a bid list, a
   prequalification system or a GPO agreement, a click cannot enter it.
3. Deal economics support a paid CPC given the close rate. See §6.
4. Non-buyers can be excluded. If the same words are used by consumers, students or job seekers at
   ten times the volume, the negative burden may exceed the value.

Before any account goes live in any vertical below, a keyword volume pull is required.
`[NEEDS DATA: search volume and competition for the priority query set, per vertical, per market,
from a live keyword tool. None exists in this repository.]`

| Meta-vertical | Verdict | Reasoning |
|---|---|---|
| **SaaS and Software** | **Viable, split by sub-niche** | Category and alternative queries are real and commercial. But the conversion event differs four ways inside the vertical (Iris §4.4) and a demo gate kills dev tools and APIs outright. Never run one build across it. Also the most expensive auction of the fifteen, against funded competitors |
| **Professional and Business Services** | **Viable, rule-constrained** | The buyer searches the **event**, not the service (Iris §5.2). That is high-intent and cheap relative to the head term. Blocked until the advertising-rule work in §2.1 is done for legal. Accounting, consulting, HR and marketing-adjacent are viable now |
| **Manufacturing and Industrial** | **Conditionally viable, and the most often built wrong** | Passes 1, 2 and 4. Fails 1 at the category level: "CNC machining" as a head term buys students and hobbyists. Works on a narrow exact and phrase core around process, material, tolerance and certification, with the drawing upload as the conversion. Structurally starves automated bidding (§2.1). Microsoft Ads is under-weighted here and reaches a desktop, senior audience; LinkedIn is weak because the specifier is not the one on LinkedIn |
| **Technology and IT Services** | **Viable, highest competition** | "Managed IT services [metro]", "MSP for [vertical]" are commercial, geo-bounded, and the assessment is reachable cold. Contract values structurally support the CPC. `[NEEDS DATA: client contract value and close rate]` |
| **Healthcare and Life Sciences** | **Mostly not paid-search viable. Exceptions: health IT, medical staffing, medical billing** | MedTech, CDMO and CRO selection runs through conferences, KOLs, regulatory pathway and a Value Analysis Committee (Iris §6.4). Search volume for supplier selection is thin and directory-dominated, and a click cannot enter a VAC. Paid here means LinkedIn ABM against a named account list, not search. Platform health-advertising policies apply on top `[NEEDS DATA: current policy scope]` |
| **Financial Services** | **Split** | Payments, commercial lending, insurance brokerage and outsourced finance: viable, real query volume, consultation reachable cold. Institutional wealth, crypto and Web3: platform certification and restriction regimes gate entry `[NEEDS DATA]`. RegTech: LinkedIn, not search |
| **Logistics, Supply Chain and Transportation** | **Viable for 3PL, freight and warehousing. Not for enterprise TMS or WMS** | Rate requests and lane quotes are reachable from a cold click and are the real conversion (Iris §6.2). Enterprise TMS and WMS run through RFP cycles a click cannot enter. Split the vertical before building |
| **Emerging and Micro-Niches** | **Mostly NOT paid-viable, and this is the clearest case of paid wasting a client's money** | `data/b2b/verticals.ts` says it itself: "Category vocabulary is still forming". A query for a category nobody has named yet does not exist, so paid spend here is money spent discovering there is no demand. This is precisely the vertical where GEO and organic are the right answer and paid is not. Exceptions where the query does exist: fractional executive marketplaces, nearshore and offshore BPO, private equity services |
| **Construction, Real Estate and Built Environment** | **Not viable for GCs, specialty trades or AEC firms. Viable for building materials distribution, PropTech and ConTech** | Fails test 2 outright for the first group: work arrives through bid invitation and prequalification systems such as ISNetworld and Avetta (Iris §6.6). A click does not get a contractor onto a bid list. Selling paid search to a GC is selling them a channel their market does not use |
| **Energy and Utilities** | **Viable for commercial solar EPC, EV charging, energy procurement broking. Not for oil and gas services or renewable project development** | The first three have a triggered, searching buyer. The last two are relationship and tender markets where the buyer is known to the seller before any search happens |
| **Education and Training** | **Conditionally viable for compliance training and LMS. Not for higher-ed or K-12 vendors** | Compliance training has a deadline-driven searching buyer. Institutional edtech runs on published procurement criteria and conference cycles (Iris, `verticals.ts` `why`), which a click cannot enter |
| **Hospitality, Travel and Events** | **Viable for hotel tech and event tech. Not for DMCs or MICE. Highest negative-keyword burden of the fifteen** | The B2B layer sits under a consumer industry using identical vocabulary. "Hotel booking software" and "hotel booking" are different intents at wildly different volumes. Budget the negative work as a first-class line item or do not run it |
| **Agriculture and Food** | **Thin. Viable for food safety testing and certification labs, and co-packers. Not for AgTech or crop inputs** | AgTech and crop inputs sell through dealer and distributor networks, not search. Testing and co-packing have a searching buyer with a compliance trigger `[NEEDS DATA: volume]` |
| **Media, Marketing and Creative** | **Viable with adverse selection. Print and promotional distribution is the strongest sub-niche** | They understand the product, which shortens the sale (`verticals.ts`), and they buy on price and churn, which shortens the retainer. Print and promo distribution is transactional and converts on a quote |
| **Government, Nonprofit and Institutional** | **Not paid-viable** | Fails test 2 completely. Procurement is public, published, and entered through registration and solicitation response. A click does not put a vendor on a solicitation. Defence contracting especially: the money that would go to media belongs in capture management. Recommending paid here is recommending the client waste it |

**Summary.** Of fifteen, four are cleanly viable (SaaS, professional services, IT services,
logistics in part), four are viable only after splitting the vertical (manufacturing, financial
services, energy, construction), three are conditional or thin (education, hospitality, agriculture),
one is viable with a warning (media), and **three should generally be told no**: government and
institutional, most of healthcare and life sciences, and most of emerging micro-niches. Saying no in
those three is the service. It is also the thing that makes the yes credible in the other twelve.

---

## 4. Landing page match

The ad promise and the page headline are the same promise, or the account leaks and no bid
adjustment recovers it.

Concretely, per archetype:

- **A.** An ad answering a tolerance or certification query lands on a page whose first heading
  names that tolerance or certification, with the upload path visible without scrolling. Not the
  capability overview.
- **B.** An ad answering "alternative to X" lands on a page that names X. If it lands on the
  homepage the click is wasted, and the platform will report it as a conversion anyway if a form
  exists anywhere on the page.
- **C.** An ad answering an event query lands on a page carrying the named individual who handles
  that event, their credential and their jurisdiction. Not the practice-area index.
- **D.** An ad carrying a geography lands on a page that states coverage, exclusions and response
  times for that geography.

The template that renders "Book a demo" on every page is the specific failure this whole exercise
exists to prevent. See `conversion-events.md`.

---

## 5. Paid and organic on the same term

### 5.1 The honest answer to "am I paying for a click I already earned"

It is an experiment, not an opinion, and most of the time at B2B volumes **the experiment cannot
reach significance**. Say that before running it, not after six weeks.

The arithmetic for a two-proportion test at 80% power and 5% two-sided significance approximates to:

```
n per arm  ≈  16 · (1 − p) / (p · r²)
```

where `p` is the baseline conversion rate on the query group and `r` is the relative effect worth
detecting. A brand-query holdout is not measuring conversion rate, it is measuring total conversions
with paid on versus off, but the volume requirement behaves the same way: detecting a modest relative
change needs a multiple of the events you currently get. On a brand query group producing a handful
of conversions a month, a properly powered holdout runs for quarters, and by then seasonality,
competitor entry and SERP layout have all changed underneath it.

So the sequence is:

1. Pull the actual brand-query volume and conversion count first.
   `[NEEDS DATA: brand-query clicks and conversions, last 90 days, per client, from Search Console
   and the ad platform.]`
2. Run the arithmetic above with those numbers **before** designing the test.
3. If it cannot reach significance, say so and do not run it. Do not run it anyway and read the
   result.

### 5.2 What to do instead, when the test is not available

- **Never blend brand into the account CPA.** Brand conversions are cheap and they flatter every
  other number in the report. Brand gets its own budget, its own line, its own commentary.
- **Defensive brand bidding is a cost, not a channel.** Where a competitor bids on the client's
  brand, bidding back is insurance. Budget-cap it and report it as insurance. It is not a conversion
  channel and must never be presented as one.
- **Do not bid on a non-brand term where the client holds organic position 1 and no competitor ad
  sits above them.** That is the one case where the click really was already earned.
- **That rule is weaker in 2026 than it was**, and the reason is AI Overviews. An organic position 1
  under an AI Overview is not the click-through that an organic position 1 without one was. "We
  already rank" is no longer sufficient grounds to stay out of the auction.
  `[NEEDS DATA: AI Overview presence rate on the client's money queries, from a rank tracker that
  records SERP features, dated.]`
- **A pre and post comparison of combined paid plus organic clicks on a brand query group, with paid
  paused, is directional and must be labelled directional.** It is not causal. Seasonality and
  competitor movement are not controlled. Publishing it as an incrementality result would be the
  same offence `CLAUDE.md` §4 forbids elsewhere.

### 5.3 Reporting

Paid and organic are reported separately per query group, always, in the same way Nadia reports
ranking and citation separately (`docs/seo/b2b-niche-architecture.md` §8). A single blended
"search performance" number hides which of the two is working and is the reporting equivalent of
bundling the offers, which `CLAUDE.md` §1 already rejects.

---

## 6. Economics before scale

**Break-even cost per lead = (average first-year gross margin per client) × (lead to closed-won
rate).**

Both inputs come from the client. Neither can be estimated, and neither exists in this repository.

- `[NEEDS DATA: average first-year contract value and gross margin, per client]`
- `[NEEDS DATA: lead to closed-won rate, per client]`

**Standing rule, no exceptions.** No budget increase is ever proposed without the current cost per
qualified lead and the account-level constraint stated in the same message. The constraint is
whichever of these is actually binding: impression share lost to budget, impression share lost to
rank, conversion volume too low for the bid strategy, or the sales team's capacity to follow up.
Naming the wrong constraint and adding budget is the most common way an account gets worse while
spending more.

**If the per-deal economics do not work at the client's current contract value, more budget makes the
loss bigger.** Say the loss out loud, with the break-even figure, and let the operator decide. Do not
soften it into a recommendation to "optimise first".

---

## 7. What the site may claim about paid, and what it may not

### 7.1 May claim

- The channels we run and the structure we build. Description of method is not a performance claim.
- That management is priced as a **percentage of managed ad spend with a monthly minimum**, and that
  media is billed by the platform directly to the client with no markup.
  `[NEEDS DATA: the percentage and the monthly minimum. `docs/copy/ppc.md` already carries this
  NEEDS DATA and it is still open. No figure ships without operator confirmation.]`
- That PPC **stands alone**. `CLAUDE.md` §2 is explicit that a firm wanting only paid media is fully
  in the ICP. The page must not require a prospect to want AI search first, and must not imply PPC is
  inside the retainer price.
- That ads are not retrieved as sources by assistants, so paid does not improve AI search visibility.
  This is a limit, stated plainly, and it is the most credible sentence on the page.
- What we measure and how, **once §1 is closed**. Not before.

### 7.2 Must not claim

- **Any ROAS, CPA, CPL, CPC, CTR or conversion-rate figure.** None exists in this repository for any
  account. Not as a result, not as a benchmark, not as an illustration, not in a chart.
- **"Typical results", "clients typically see", "on average our accounts".** There is no average
  because there is no measured set.
- Any category benchmark presented as an expectation the reader should hold.
- Any guarantee of lead volume, cost, ranking or placement. `CLAUDE.md` §4.
- Click ID capture and offline conversion import as a present-tense capability of this site.
  See §1.2.
- Any figure from `Qognition_IDM_Standalone_Case_Studies.pdf`. Iris §2.2 blocklists them explicitly.
  The Talentera engagement in particular names a US$20,000 LinkedIn budget and a three-month
  duration; it is self-reported scope with model-generated outcomes and is not a paid media proof
  point. Do not use it as one.
- Partner or certification badges not currently held.
  `[NEEDS DATA: current Google Partner, Microsoft Advertising Partner and LinkedIn Marketing Partner
  status. Do not display a badge without it.]`
- Experience in a vertical because a vertical page exists. `CLAUDE.md` §11. The paid page is the
  most tempting place to breach this, because paid case studies are the genre's currency and we have
  none.

### 7.3 The line that replaces the numbers

The differentiator on this page is the same one as everywhere else on the site: method, dated, and
checkable. "Here is the structure, here is the measurement chain, here is what we will not claim" is
a stronger page in a category where every competitor leads with an unverifiable multiple. It also
happens to be the only page we are entitled to write.

---

## 8. Route note, flagged rather than decided

`CLAUDE.md` §5 lists the route as `/ppc`. The page exists today at `/services/ppc` with a metadata
override in `lib/seo.ts`, and ADR-0007 **cancels** the `/services/*` to top-level 301s under its hard
constraint that no existing meta title, description, URL or internal link changes.

These two cannot both be right. I am not picking. **Operator decision:** either `CLAUDE.md` §5 is
amended to say `/services/ppc`, or ADR-0007's hard constraint is lifted for this one URL and the 301
is scheduled with the Search Console pull that `CLAUDE.md` §7 requires before any redirect.

---

## 9. NEEDS DATA register

Blocking any account build:

1. Target cost per qualified lead, per client.
2. Lead to closed-won rate and average first-year contract value and gross margin, per client.
3. Search volume and competition for the priority query set, per vertical, per market.
4. Google Ads' current documented conversion-volume guidance for Target CPA and Maximize
   Conversions on Search.

Blocking the `/services/ppc` page:

5. The management fee percentage and monthly minimum.
6. The minimum monthly media budget.
7. Current Google, Microsoft and LinkedIn partner status.
8. Correction of the click ID and offline import claim in `docs/copy/ppc.md` §3 and §4.

Blocking regulated verticals:

9. State-by-state lawyer advertising variation for target states, with a named reviewer.
10. Current platform policy requirements for financial services advertisers, by product and
    geography.
11. Current platform policy scope for healthcare and life sciences advertisers.

Blocking the paid and organic question:

12. Brand-query clicks and conversions, last 90 days, per client.
13. AI Overview presence rate on the client's money queries, dated, from a SERP-feature-aware
    tracker.

Blocking Qognition's own paid:

14. Monthly booked-walkthrough target and allowable cost per booked walkthrough.
15. Walkthrough to retainer close rate.
