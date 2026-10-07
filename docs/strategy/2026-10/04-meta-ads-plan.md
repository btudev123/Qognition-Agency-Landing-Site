# 04 · Meta ads plan for Qognition's own lead generation, October 2026

Owner: Marcus (performance). Date: 2026-10-06. Branch: `codex/sitewide-b2b-funnels`.
Status: internal plan. The ad copy in §3.5 and the form copy in §3.3 are **drafts** and go to Ruth
(`brand-guard`) before anything is uploaded. Nothing in this file is budget approval.

Operator question, 2026-10-06: *"I am thinking Meta ads for Australia or USA. Suggest me a budget and
region and where to target and how, for Oct 2026."*

Reads:
- `CLAUDE.md`: the 2026-10-03 authority block, the 2026-10-06 amendments (regional consent, China and India), and §1 to §4 and §8 to §11.
- `~/qognition-ops/clients/qognition-agency/{context,guardrails,brand-voice}.md` and `~/qognition-ops/standards/output-contract.md`.
- My `03-paid-and-cro.md`, which this plan builds on and does not repeat. Iris's `01-competitor-teardown-and-icp.md`.
- Rafael's `docs/outbound/2026-10-outbound-system.md` and the seven sequence files.
- Code: `lib/consent.ts`, `lib/analytics.ts`, `lib/metaCapi.ts`, `components/shared/{MetaPixel,ConsentManager}.tsx`, `app/layout.tsx`, `app/api/lead/route.ts`, `lib/validation.ts`, `lib/leadCrm.ts`, `.env.example`, `data/siteConfig.ts`, `data/b2b/icp/icp-taxonomy.json`.

Production checks were run with `curl` against www.qognitionagency.com on 2026-10-06. External
sources are listed in §10, each with its date. Labels used throughout: **[O]** observed today, **[R]**
reported by a secondary source, **[I]** my inference. `[UNVERIFIED]` means I could not confirm it at
the primary source.

---

## 0. The answer, then the target

### 0.1 The short answer

| Question | Recommendation |
|---|---|
| Region | **Australia first.** US stays on Google Search (03 §3.5). Revisit US on Meta at day 30 (§1) |
| Budget | **US$1,500 to US$3,000 for the 30-day test**, which is about US$50 to US$100 a day. This is a recommendation, not a forecast (§4) |
| Optimisation event | **Instant-form Lead.** Not link clicks or landing-page views. It will run Learning Limited, and §4.1 explains why that is acceptable |
| Path | **Prospecting:** a Higher Intent instant form, with a GHL booking step on the completion screen. **Retargeting:** the site (`/free-ai-audit`, `/book`) (§3.1) |
| Targeting | Broad Australia, with Advantage+ audience. The creative and the form questions do the qualifying, because on Meta they are the targeting (§2) |
| Launch | Not before the gates in §5 pass. P1 needs six of them. R1 also needs the consent split (on the working tree, unshipped), click-ID capture (not done) and the landing-page fixes |
| Test type | A budget-capped learning trial with fixed kill and scale rules. Not a significance test (§8) |

### 0.2 The target

North Star (`CLAUDE.md` §3): **booked qualified walkthroughs per month.** Primary conversion event in
`context.md`: qualified leads and booked sales calls, as fast as possible.

- **No CPA target is on file.** The break-even in 03 §0.1 replaces it:

  ```
  allowable cost per booked walkthrough = R × g × m × c
  ```

  R is the retainer. Its floor is US$3,000 a month and the average is `[NEEDS DATA]`. g is gross
  margin, m is expected retained months, and c is the walkthrough-to-signed rate. All three are
  `[NEEDS DATA]`.
- **Current cost per qualified lead from paid: none.** No Meta account has spent, and `context.md`
  records own paid spend as $0 a month with paid "not active". So there is no CPA to report. That
  is the honest version of the rule that every budget figure travels with the current CPA.
- **Binding constraint, stated now:**
  1. **Measurement.** MG1 in §5 is on the working tree and not shipped. MG3 is not implemented.
  2. **Snapshot delivery capacity.** It is human-delivered, and its size is `[NEEDS DATA]`. The
     queue is shared with Rafael's outbound (§4.3).
  3. Budget is the third constraint, not the first.

### 0.3 Decisions only the operator can make

| # | Decision | My default until you decide |
|---|---|---|
| M1 | **Turn paid on.** `context.md` says $0, and paid ranks last in `CLAUDE.md` §3 (D0 in 03, still open). Your question reads as interest, not approval. A budget relayed through MARS is not approval | Nothing is spent until you name a number directly |
| M2 | **Australia before the US** on Meta. This inverts the `CLAUDE.md` market order (USA > Canada > Australia) for one channel | Australia, for the reasons in §1 |
| M3 | **Ad account currency and time zone.** Both are fixed when the account is created [R]. `CLAUDE.md`: USD only | USD. Time zone: Australia/Sydney, so Meta's "day" matches the market's day. Say if you report in IST |
| M4 | **Booking on the form's completion screen.** This lets a lead book before the snapshot exists. Rafael's D9 has the snapshot lead to the call | Offer the booking. The snapshot is prepared before the call for bookers, and sent after the fit check to non-bookers |
| M5 | **Revenue bands in USD on an Australian form** | Keep USD, labelled "(USD)" on the question, with a "Prefer not to say" option. Staff band carries the gate when revenue is blank |
| M6 | **Who appears in video**, and whose name is on the replies | `[NEEDS DATA: named person]`. Text-and-screen video until someone is named |
| M7 | **"ChatGPT" in ad text** (the 03 D5 equivalent for Meta) | Two angles use it. `[UNVERIFIED: Meta's treatment of third-party trademarks in ad text]`. Each has a fallback line that says "AI assistant" |
| M8 | **Which contact lists may be uploaded** to Meta as custom audiences | Only current clients and site or form enquirers, and only after the privacy notice covers it (MG7). **Never** Apollo, Clay or Sales Navigator exports, and never the outbound lists (§2.2) |

---

## 1. Australia or the US

**Recommendation: Australia first, on Meta only.**

| Criterion | Australia | US | Label |
|---|---|---|---|
| Market priority, `CLAUDE.md` §2 | 3rd | 1st | [O] |
| In-band ICP pool (B2B, US$3M to US$1B revenue, 20 to 10,000+ staff) | Smaller | Far larger | [I]. `[NEEDS DATA: in-band firm counts per market from Rafael's §4 Apollo filters]` |
| Prospect business hours in IST (team in Gurugram, `data/siteConfig.ts`) | Sydney and Melbourne (AEDT since 4 Oct): **03:30 to 11:30 IST**. Afternoon slots 12:00 to 17:00 AEDT fall at **06:30 to 11:30 IST**. Brisbane: 04:30 to 12:30. Perth: 06:30 to 14:30 | Eastern: **18:30 to 02:30 IST** until 1 Nov, then 19:30 to 03:30. Pacific: 21:30 to 05:30 | [O], time-zone arithmetic. It matches Rafael §7.1 |
| When an evening scroller's lead is answered | A lead sent at 19:00 to 23:00 AEDT arrives at **13:30 to 17:30 IST**, inside the working day. Same-evening reply is possible | A lead sent at 19:00 to 23:00 EDT arrives at 04:30 to 08:30 IST. It waits overnight | [O] arithmetic. That response speed matters is [I]. No measured figure is cited |
| Category competition | No Australian competitor pass exists. Iris's seven profiles are North American agencies | Iris's seven, plus the self-ranking listicle publishers in `CLAUDE.md` §1 | [O] for what exists. `[NEEDS DATA: Iris, an AU pass]`. On Meta, the auction is against every advertiser reaching the same people, so category rivals move price less than they do on Google Search [I] |
| Auction prices (CPM, CPL) | `[NEEDS DATA]` | `[NEEDS DATA]` | No dated public source is used. The first 7 days in the account give the only number worth having |
| Separation from the Google Search test | Clean. Google launches US first (03 §3.5), so an Australian lead in October is Meta, organic or outbound | Confounded. Two paid channels in one market, with the click-ID chain unfinished | [I] |
| What a fixed budget buys | A larger share of a smaller audience. Engagement and retargeting pools fill faster, and frequency climbs faster too | A thin slice of a large audience | [I] |
| Consent model (2026-10-06) | Opt-out | Opt-out | [O]. Equal |
| Outbound overlap | Rafael runs Australian email and LinkedIn first, with calls in the IST morning once someone owns that block | US is outbound's first market. It needs an evening shift that is not yet staffed (Rafael §7.2) | [O] |
| Pricing in USD (`CLAUDE.md`) | A conversation point for an Australian buyer | None | [I] |

**Why Australia wins for this channel.** Meta is an interruption channel. A lead from it is a
person who was scrolling, so the time between their tap and our reply matters more than it does for
a searcher [I]. Australia is the only one of the two markets where the team in India answers inside
the prospect's own day, including their evening. It also keeps the first Meta read separate from the
US Google read.

**What Australia costs us.** The pool is smaller. The real risk is that broad Australian targeting
holds too few in-band decision-makers to produce qualified leads in 30 days. That is exactly the
question this test answers, and §7 stops it early if the answer is no.

**US later, not never.** Extend to the US only under scale rule S2 (§7): AU passes, and a named
person owns the IST evening call block.

**China and India**, added on 2026-10-06: neither is a candidate. Both are opt-in regions under the
new model, and the question was Australia or the US. One related finding goes to Anton: on
production today the pixel loads before any choice in **every** region, including the opt-in ones.
The uncommitted regional split fixes this (MG1). Until it ships, production is out of step with the
2026-10-06 model.

---

## 2. Targeting B2B decision-makers on Meta, honestly

### 2.1 What Meta can and cannot do in October 2026

| Capability | Status | Source |
|---|---|---|
| Job title, employer, school and field-of-study targeting | Facebook **removed more than 3 million self-reported terms** from these fields in September 2017, then **added back about 5,000** common ones. Whatever survives depends on what people typed into their profiles. In a B2B setting that is sparse and often stale | [R] Meta developer blog, 2017-09-20, via search summary. Primary not opened |
| Further consolidation of detailed targeting | Meta announced it was removing more detailed-targeting options because they were little used, too granular or sensitive. Effective **2026-01-15** | [R] Social Media Today, 2025-08-17 |
| Advantage+ audience | **Hard controls:** location, minimum age, excluded custom audiences and language. **Suggestions only:** age range, gender, detailed targeting, custom audiences and lookalikes. Delivery can go beyond the suggestions | [R] Jon Loomer and others. `[UNVERIFIED at Meta's Help Centre]` |
| "Original audiences", where a custom audience is a hard limit | Needed for strict retargeting | `[UNVERIFIED: still available in a new account in Oct 2026]`. Check on the day the account is built |
| Firmographic filters (company size, revenue, industry) | **None.** Meta has no equivalent of LinkedIn's company-size or company-list targeting | [I], from the two rows above |

**What follows.** On Meta, **the creative and the form are the targeting.** The audience settings
decide the country and keep out the people we choose. The ad's first line decides who stops. The
form's questions decide who gets through.

### 2.2 Audiences for the Australia test

| Audience | Source | Legitimate? | Size today | Use |
|---|---|---|---|---|
| **Broad Australia, 25+** | Location (people living in Australia), minimum age 25, English | Yes | Large | **P1 prospecting.** A minimum age of 25 is a hard control that removes most students and junior job seekers [I] |
| Detailed-targeting suggestions | See §2.3 | Yes | n/a | P1 only, as **suggestions**. They steer delivery and do not restrict it |
| **Instant form openers who did not submit**, 30 days | Meta engagement audience | Yes. Meta-side, no upload | Zero until P1 runs | **R1 retargeting** |
| **Video viewers**, 50% or more, 30 days | Meta engagement audience | Yes | Zero until P1 runs | R1 |
| Facebook Page and Instagram engagers, 60 days | Meta engagement audience | Yes | `[NEEDS DATA: page and profile handles; context.md has none]` | R1 |
| **Website visitors**, 30 and 90 days: `/free-ai-audit`, `/book`, `/services/ai-seo/*`, `/industries/*` | Pixel | Yes, under the regional consent model. Australia and the US are opt-out (MG1, MG7) | **Small.** Organic sent 198 clicks to the whole site in the three months to 2026-10-03 (03 §5.4), across every country | R1. It grows from Google (US), outbound replies who visit, and LinkedIn |
| Converters: Lead event, 180 days | Pixel and CAPI | Yes | Small | **Exclusion** from P1 and R1. Exclusions are hard controls |
| **Current clients** | GHL, uploaded and hashed | Yes, if the privacy notice covers it (MG7) | `[NEEDS DATA: client list]` | **Exclusion** only |
| **Lookalike** from GHL contacts who passed the fit check | Customer list | Yes, under the same condition | Probably below Meta's minimum seed. `[UNVERIFIED: current minimum seed size]` `[NEEDS DATA: count of fit-check-passed B2B contacts]` | Not at launch. Under Advantage+ it would only be a suggestion anyway |
| Apollo, Clay or Sales Navigator exports. Rafael's outbound contacts | Licensed prospecting data. These people never gave us their details | **No.** Meta's Custom Audience terms require the advertiser to hold the right to use the data, and the licence terms of those tools are unchecked | n/a | **Never uploaded**, including as exclusions. Outbound prospects reach Meta only through the pixel, when they visit after replying |
| HVAC and dental case-study entities | `data/case-studies` | No. The files say they "do not establish client relationships" (Rafael D1) | n/a | Never a seed. They are also B2C local businesses, which would steer a lookalike to the wrong buyer |

### 2.3 Detailed-targeting suggestions for P1

Every term below needs checking against the Australian audience picker on the day the account is
built (`[UNVERIFIED]`, given the 2026-01-15 consolidation).

- **Use:**
  - Common self-reported titles that survived 2017: Chief Executive Officer, Managing Director, Founder, General Manager, Marketing Director, Head of Marketing.
  - Work and industry categories in management, business and finance.
- **Do not use:** interests such as "search engine optimization", "digital marketing" or "online
  advertising". They recruit SEO practitioners, freelancers, job seekers and **agency staff** [I].
  - Agency principals are a separate white-label segment. `CLAUDE.md` (2026-09-29) says agency
    copy and client copy must not be readable by each other's audience.
  - Meta cannot exclude agency staff reliably, so these ads must read acceptably to an agency
    principal who sees one. Ruth checks this.
- **No agency-segment campaign on Meta.** There is no agency page (03 D4) and no reliable way to
  target or exclude that audience.

### 2.4 Where LinkedIn beats Meta, and where Meta earns its place

| Job | Better channel | Why |
|---|---|---|
| Cold prospecting into an exact ICP: company size, industry, title, seniority | **LinkedIn** | It has firmographic filters and Meta has none (§2.1) |
| Account-based: Rafael's account list as an audience | **LinkedIn** (company-list matching) | It matches companies, not people's personal emails |
| Lead-form data quality (title, company, work email) | **LinkedIn** | Profile data is professional. Meta prefills personal account data [I] |
| Cost per impression | Probably **Meta** | [I]. Widely reported, not measured here. `[NEEDS DATA: both, from the accounts]` |
| Retargeting anyone who engaged anywhere (site, video, form) at frequency | **Meta** | Cheap reach to a small pool of known engagers [I]. This is the layer Meta does best for B2B |
| Owner-operators of 20 to 200-staff firms who are not active on LinkedIn | **Meta** | Breadth [I] |
| Short video attention (Reels, Stories) | **Meta** | Format |

**Position in the plan.** LinkedIn remains the cold-ICP test in 03 §4, held behind its gates. In
Australia, Meta tests whether a broad, creative-qualified approach can produce qualified leads. Once
MG1 and MG3 work, Meta also becomes **the cheap retargeting layer under every channel**: Google
clicks, outbound replies who visit, and LinkedIn clicks.

---

## 3. Offer, path and creative

### 3.0 Objection table for a cold Meta viewer

Every row is an **[I] hypothesis**. Iris (01, B.1) found no buyer speech on file. The first 20
walkthrough calls validate or kill these rows (03 §5.5).

| What stops a B2B decision-maker who is scrolling | What answers it in the ad or form | Angle |
|---|---|---|
| "This is consumer social. Why is an agency here?" | The first line names a B2B buyer's question, not a feature | 1, 4 |
| "AI-search agencies are hype" | We state what nobody can promise, then what we can show | 5 |
| "A free audit means a sales trap" | The snapshot is the deliverable, the call is optional, and a person checks it | 3, 5 |
| "Their numbers will be made up" | Prompt, platform and date on every finding, re-runnable by the buyer | 3 |
| "Is this for a firm like mine?" | The buyer prompt from their own category, plus "for B2B firms with a sales team" | 4 |
| "I don't want to fill in a long form on my phone" | Prefilled fields, one open question, a review screen | Form, §3.3 |
| "Who is behind this?" | A named person in video and on replies (M6) | All. `[NEEDS DATA]` |

### 3.1 Instant form or the site

| | Meta instant form (Higher Intent) | Site: `/free-ai-audit` or `/book` |
|---|---|---|
| Friction | Low. Fields are prefilled and the viewer stays in the app | Higher. Page load, mobile form, cookie bar |
| Intent of a submission | Lower. Prefill makes submitting easy [I]. The review screen and an open question push back | Higher [I] |
| Does the conversion reach Meta today? | **Yes.** The Lead is recorded inside Meta, with no pixel, consent or site code involved | **Not on production** for anyone who ignores the banner. The regional split on the working tree fixes this for AU and US once it ships and passes MG1 |
| Proof the viewer sees | Only what the ad and form intro say | Method, FAQ, "not a fit" list (after the 03 §5.6 rank 3 fixes) |
| Booking path | GHL booking embedded on the completion screen, if our account has the feature. Meta and HighLevel launched it on 2026-06-24, with full rollout in **November 2026**. `[UNVERIFIED: available in our account in October]`. Fallback: a completion-screen link to `/book` with UTMs | `/book` with the GHL calendar. Booking attribution is unverified (03 §1.3) |
| Lead lands in GHL | Through the native integration with field mapping. **Bypasses `/api/lead`**, so there is no `qualifyLead` score and no Resend notification unless a GHL workflow adds them | Through `/api/lead`, with fallback email (2026-10-06 amendment) |
| Lead-quality loop to Meta | The Meta lead ID enables Conversions API for CRM. Conversion Leads optimisation needs **200 leads a month** (Meta developer docs), which this test will not reach | Pixel or CAPI Lead now. Stage events later, matched on hashed email and `fbc` (MG3) |
| Snapshot capacity cost | Higher. More low-intent requests reach the fit check | Lower [I] |

**Decision.** P1 prospecting uses the instant form. Its conversion is the only one that reaches
Meta with today's code, and it can put a GHL booking one tap from the lead. R1 retargeting sends
people who already engaged to the site, where the proof lives.

Comparing the two paths is **not a test** (§8). Each path does a different job, at a different
funnel stage.

### 3.2 Campaign set-up

| Setting | P1 prospecting | R1 retargeting |
|---|---|---|
| Objective | Leads | Leads |
| Conversion location | Instant form, Higher Intent | Website |
| Performance goal | Maximise number of leads | Maximise conversions, event `Lead` (pixel and CAPI, deduplicated on `eventID`) |
| Bid strategy | Highest volume. **No cost cap**: there is no CPL history to set one from | Same |
| Audience | §2.2 broad Australia with suggestions. Exclude converters and clients | Strict custom audiences (§2.2). "Original audiences" if available, so the pool is a limit and not a suggestion |
| Placements | Advantage+ placements **minus Audience Network**. Off-platform inventory is a common source of accidental taps [I] | Same |
| Creative enhancements | **All Advantage+ creative enhancements off.** Generated text, music and visual variations can create claims `CLAUDE.md` §4 forbids. Same reasoning as Google auto-assets in 03 §3.1. `[UNVERIFIED: exact toggle names]` | Same |
| URL parameters | `utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.id}}&utm_term={{adset.id}}&utm_content={{ad.id}}` | Same |
| Ads at launch | 5 (one per angle) | 2 (§3.5, R-angle) |

Two ad sets only. Splitting a small budget across more ad sets lowers the event count in each.
**Cut, don't spread.**

### 3.3 Instant form specification (draft, Ruth-gated)

**Form type:** Higher Intent. It adds a review screen before submission [R].

**Intro screen:**
> **A human-checked AI visibility snapshot for B2B firms.**
> We run the questions your buyers ask in AI assistants and Google's AI results. Then we send you
> which firms were named, which pages were cited, and the date of each run. A person checks every
> snapshot before it is sent. If it's useful, book a 30-minute walkthrough.
> Not for consumer businesses.

**Questions.** The answer values match the existing schema in `lib/validation.ts`, so that Meta
leads and site leads are scored by the same rule (`lib/leadQualification.ts`, after the 03 §1.6
fix).

| # | Question | Type | Options | GHL field | Schema field |
|---|---|---|---|---|---|
| 1 | Full name | Prefill | n/a | First and last name | `contact.name` |
| 2 | Work email | Prefill, work email field | n/a | Email | `contact.email`. `[UNVERIFIED: Meta's work-email field is available]`. If not, use a short-answer question, because the prefilled Facebook email is often personal [I] |
| 3 | Phone | Prefill | n/a | Phone | `contact.phone` |
| 4 | Job title | Prefill | n/a | `role` | `qualification.role` |
| 5 | Company website | Short answer | n/a | Website | Needed to run the snapshot |
| 6 | Who buys from you? | Multiple choice | Businesses · Consumers · Both | `business_model` | `b2b` / `b2c` / `mixed` |
| 7 | How many people work at your company? | Multiple choice | 1 to 19 · 20 to 99 · 100 to 300 · 301 or more | `employee_band` | `1-19` / `20-99` / `100-300` / `301+` |
| 8 | Annual revenue (USD) | Multiple choice | Under $3M · $3M to $10M · $10M to $50M · $50M to $500M · Over $500M · Prefer not to say | `revenue_band` | `under-3m` … `over-500m` / `unknown` (M5) |
| 9 | What matters most right now? | Multiple choice | Being named in AI answers · Google rankings · Paid search · Not sure yet | `service_need` (new) | Maps to the service-need test in Rafael §11.3 |
| 10 | What would your buyers type into an AI assistant or Google to find a firm like yours? | **Short answer** | n/a | `buyer_prompt_stated` | Rafael §10.1 field. This is the open question that filters low intent, and it gives the snapshot its prompt |
| 11 | When would you want to start? | Multiple choice | Within a month · 1 to 3 months · 3 to 6 months · Just researching | `timeframe` | `now` / `1-3-months` / `3-6-months` / `researching` |
| 12 | Email updates | **Optional, unticked** consent checkbox | "Send me occasional insights by email. Unsubscribe any time." | `GHL_MARKETING_CONSENT_FIELD_ID` | `consent.email_marketing`. Imogen nurtures opted-in contacts only. Snapshot delivery is a requested message and needs no tick |

**Hidden or system fields carried to GHL:**
- Meta lead ID, form ID, campaign ID, ad set ID, ad ID and created time.
- `lead_source = meta_instant_form` and `ob_market = AU`.
- `[UNVERIFIED: whether GHL's native Facebook integration stores the lead ID and ad IDs on the contact]`.
  If it does not, route the leads through Make or Zapier, or through a Meta webhook into a GHL
  inbound webhook. **The lead ID is required** for the quality loop (MG4).

**Disqualifying answers.** Consumers only, 1 to 19 staff **and** under $3M, or "Just researching"
with no website.
- These get the GHL tag `fit-fail-form` and a polite decline (Rafael §3.4). They get no snapshot
  minutes.
- They are **not** filtered inside Meta. Conditional end-screens are `[UNVERIFIED]` for this form
  type, and a lead that never reaches GHL can't be counted.

**Privacy policy URL:** `https://www.qognitionagency.com/legal/privacy` (200 today).
- `/privacy` returns **404** and must not be used.
- The policy text must change before launch (MG7).

**Completion screen:**
> **Received. A person reviews every request.**
> We'll reply within `[NEEDS DATA: committed turnaround. The 48-hour figure is unconfirmed, 03 NEEDS DATA 20]` with your snapshot, or a plain reason it isn't a fit.
> Want to talk it through? Book a 30-minute walkthrough.
> [Book a time] → GHL embedded booking if available (M4), else `/book?utm_source=meta&utm_medium=paid_social&utm_content=form_complete`

**Lead handling in GHL (Luke for the workflow, S1 and S2 seats from Rafael §7):**
1. A GHL workflow fires on every new Meta lead. It:
   - creates the internal notification to hello@ (the same content as `lib/leadDelivery.ts`)
   - creates a fit-check task due the same IST working day
   - opens a Pipeline A opportunity at New Lead
2. **Speed-to-lead policy:** fit check and first reply inside the same Australian business day.
   Leads sent in the AU evening are answered by 17:30 IST.
3. **Daily reconciliation.** Compare the Meta Leads Center count with the GHL `meta_instant_form`
   count for the same day. Any lead in Meta and not in GHL after 24 hours triggers kill rule K1.
   - `[UNVERIFIED: how long Meta retains downloadable leads]`. Download weekly regardless.

### 3.4 Copy rules applied to every line below

- No guarantee, no superlative and no unsourced number. The only figure is the **30-minute** call
  length, sourced to commit `c95b929`.
- No client count and no case-study figure. Rafael's D1 shows the "45 named clients" claim is
  contradicted 53 times in `data/case-studies/*.ts`. Until the operator resolves it, it appears
  nowhere.
- No em dashes. None of the banned words in `CLAUDE.md` §10 or `brand-voice.md`. Never
  "invisible". Never "ads in ChatGPT" (`CLAUDE.md` §1, N7 in 03).
- **No real firm names from any AI answer** appear in an ad. Product screens are illustrative only,
  with `.example` brands, under ADR-0006.
- "We ran this on {date}" appears **only** with a stored run file less than 14 days old, under
  Rafael §2.
- Australian English spelling in ad text. `[NEEDS DATA: Theo and Ruth to confirm. context.md says en-US]`

### 3.5 Creative angles (drafts for Theo and Ruth)

Headlines are 40 characters or fewer. Each angle has a 3-second video hook and a static
equivalent.

**Angle 1. Ask it yourself**
- Hook (0 to 3 s): a chat box. The prompt types itself: *"best commercial insurance broker for a
  mid-size manufacturing company"* (taxonomy 04.05, verbatim). On-screen text: "Your buyers can ask
  this. Have you read the answer?"
- Primary text: "When a buyer asks an AI assistant for a shortlist, which firms does it name? We run
  the questions your buyers ask, record what each assistant said and when, and a person checks it
  before it reaches you. Free for B2B firms with a sales team."
- Headline: "See what AI search says about you"
- Description: "Human-checked. Dated."

**Angle 2. Two different checks** (contains "ChatGPT", see M7)
- Hook: a split screen. Left: "Google results". Right: "ChatGPT answer". Both are illustrative,
  with `.example` names. Text: "Ranking on Google is one check. Being named by ChatGPT is another."
- Primary text: "Ranking on Google and being named by an AI assistant are separate results, and we
  measure them separately. Have you checked the second one? Request a free snapshot: the prompts we
  ran, the platforms, the dates, and which firms were named."
- Headline: "Have you checked the AI answer?"
- Fallback hook, if M7 says no: "Being named by an AI assistant is another."

**Angle 3. Show the work** (the wedge, `CLAUDE.md` §1)
- Hook: a run record card. Mono uppercase labels: PROMPT · PLATFORM · DATE · FIRMS NAMED · PAGES
  CITED. Text: "Every finding comes with the prompt, the platform and the date."
- Primary text: "An AI answer is an observation on a date, not a verdict. So that is how we report
  it: the exact prompt, the platform, the date, the firms named and the pages cited. You can re-run
  every line yourself. Request a free snapshot for your firm."
- Headline: "Findings you can re-run yourself"

**Angle 4. Your buyer's question** (one variant per cohort, prompt verbatim from `icp-taxonomy.json`)
- Variants:
  - 04.05: "best commercial insurance broker for a mid-size manufacturing company"
  - 09.02: "best managed detection and response for mid-market companies with a 24/7 SOC"
  - 06.08: "best refrigerated 3PL for a frozen food brand selling into grocery chains"
  - 05.03: "best robotic palletizing integrator for a food plant"
- Hook: the prompt in large type on dark. Then: "Which firms would the answer name?"
- Primary text: "Buyers in your category can ask an AI assistant a question like this one. We run the
  questions your buyers ask, record which firms are named and which pages are cited, and send you
  the dated result. Free for B2B firms. A person checks every snapshot."
- Headline: "Is your firm in this answer?"
- Gates:
  - Use a variant only after Rafael's cohort run for **Australia** exists, if the copy says "we
    ran".
  - The four prompts are US-phrased ("3PL", "SOC"). `[NEEDS DATA: Australian phrasing check by Theo]`

**Angle 5. No promises** (contains "ChatGPT", see M7)
- Hook: founder to camera (M6), or a text card: "Nobody can promise you a place in ChatGPT's answer.
  Including us."
- Primary text: "Anyone who promises to get you named by an AI assistant is guessing. Nobody controls
  those systems. What we can do: show you what they say today, dated and sourced, and tell you what
  we'd change first. Free snapshot, then an optional 30-minute walkthrough."
- Headline: "A snapshot, not a promise"
- Fallback hook: "Nobody can promise you a place in an AI assistant's answer. Including us."

**R-angle. Retargeting (R1, to `/book`)**
- Primary text: "You've seen how we measure. Bring your site and the buyers you want to reach. Thirty
  minutes, and if there's nothing worth doing, we'll say so before we hang up."
- Headline: "Book a 30-minute walkthrough"
- Second ad, to `/free-ai-audit`: Angle 3's text, with the headline "Request your snapshot".

### 3.6 Brief outline for Elena (creative)

| Item | Spec |
|---|---|
| Deliverables, round 1 | 5 statics, one per angle, at 1:1 and 4:5. 5 Reels or Stories cuts at 9:16, 15 to 25 s. 2 retargeting statics. Round 2 (day 15): 3 new cuts from the angle with the most fit-check passes |
| System | The existing qognitionagency.com treatment: warm off-white light frames alternating with near-black dark frames, teal accent, mono uppercase labels, large display type (`CLAUDE.md` §9). Focus and indicator colour `--accent-deep`. Text contrast WCAG AA |
| Hook frame | The first 3 seconds carry the whole message with the sound off: the buyer prompt or the claim line, burned-in captions, and no logo-first opening |
| Product screens | **Illustrative only**, under ADR-0006: `.example` brands and a visible "Illustrative interface" label. **No invented metrics**, no scores, no dashboards with numbers |
| Real artefacts | A redacted page of a real snapshot (03 §5.1) once one exists and the prospect has consented. `[NEEDS DATA]`. Until then, the illustrative run card |
| People | No stock photography. Founder to camera only if M6 names someone. Otherwise screen and type |
| Text | No em dashes. Australian spelling. Every on-screen line from §3.5 or Ruth-approved |
| Safe zones | Leave the Reels and Stories UI zones clear at the top and bottom. `[UNVERIFIED: current pixel margins. Use Meta's template on the day]` |
| Motion | Restrained. Type-on and cut. Provide a static fallback for every video |
| Hand-off | Files named `meta_au_{angle}_{format}_{v}`, to Ruth before upload |

---

## 4. Budget

### 4.1 What Meta needs to exit learning, and why we will not reach it

Meta's stated guidance: an ad set "generally needs about **50 optimisation events within seven
days** of its last significant edit to exit learning". [R] It is quoted from Meta's Business Help
Centre by ppc.land on 2026-09-23. `[UNVERIFIED: Meta's own page did not render for me]`

Per ad set, over 30 days: 50 × 30 ÷ 7 ≈ **214 events**.

| Optimisation event | Events needed per 30 days | Can this account reach it? |
|---|---|---|
| Booked walkthrough (`Schedule`) | 214 | **No.** That would be about ten booked calls every working day for a team of 2 to 3 (`context.md`) |
| Qualified lead (stage event from GHL) | 214 | **No**, and it is not an optimisation option yet. Conversion Leads needs 200 leads a month (Meta developer docs) |
| **Instant-form Lead** | 214 | **Only if CPL ≤ budget ÷ 214.** At US$3,000 that is a CPL of US$14 or less. Our CPL is `[NEEDS DATA]` and no source is quoted. Treat Learning Limited as the expected state |
| Landing-page view or link click | 214 | Easily |

**Why I am not using a click or landing-page-view proxy, although it would exit learning.**
- An LPV-optimised ad set learns to find people who click. For B2B decision-makers on a consumer
  platform, those are mostly not the buyer [I].
- It would exit learning stably on the wrong population, and the leads it produced would cost
  snapshot hours.
- A Learning Limited ad set still delivers. It is less stable on cost, and on a 30-day test
  measured in human-qualified leads, that instability is tolerable. Training on the wrong event is
  not.
- The higher-funnel proxy I accept is the **raw instant-form Lead**. It sits one step above the
  qualified lead. The Higher Intent review screen and question 10 make it a better proxy.

**The capacity arithmetic, which binds before budget does.**
- 214 leads at the SOP's 20-minute snapshot ceiling (prescribed, not measured, per Rafael §7.4) is
  about **71 hours** a month for one ad set, before the 5-minute fit checks.
- That queue is shared with outbound. Exiting learning on Lead would break the snapshot promise
  before it broke the budget.

### 4.2 Recommended test budget: US$1,500 to US$3,000 for 30 days

This is a recommendation, not a forecast. It is about US$50 to US$100 a day in total.

**Ceiling: US$3,000, which is one month of the retainer floor (`CLAUDE.md` §2).**
- One signed client at the floor recovers the test from first-month revenue. That is revenue, not
  margin: g is `[NEEDS DATA]`.
- Spending more than one floor retainer in a month, before a single qualified lead has been seen,
  buys risk, not information.
- It is also roughly where snapshot capacity starts to bind if the CPL turns out low.

**Floor: US$1,500.** The floor is set by whether the test can read a qualification rate at all.
- Rafael's rule (§10.4): rates are read only once the denominator reaches 30. So the test needs
  about 30 leads in 30 days.
- 30 leads cost 30 × CPL:
  - at US$1,500, the rate is readable only if CPL ≤ US$50
  - at US$3,000, only if CPL ≤ US$100
- Below US$1,500, a zero result can't be told apart from noise at any plausible CPL [I].
- The range therefore defines the CPL at which the test can answer its question. It does not
  predict the CPL.

**Where in the range.** Start at **US$75 a day**. At the day-8 edit window, set the rest of the month
from the observed CPL:

| Observed P1 CPL after 7 days | Action |
|---|---|
| CPL × 30 ≤ remaining budget at US$50 a day | Drop to US$50 a day. Enough to reach 30 leads, and it keeps snapshot hours down |
| CPL × 30 fits only at US$100 a day | Raise to US$100 a day (in one edit, MG-compliant), provided the snapshot queue is under 1 working day |
| CPL × 30 > US$3,000 | Stay at US$75 a day. The read will be **counts only** ("n leads, k qualified"), with no rate. Say so in the day-30 memo |

**Split.**
- P1 prospecting: **80%**.
- R1 retargeting: **up to 20%**, capped by what its small pool can absorb. R1 underspend is **not**
  moved into a new ad set.

`[UNVERIFIED: Meta's minimum daily budget per ad set in USD]`. Check this in Ads Manager. R1 may
sit near the minimum.

### 4.3 Economics before scale

- No scale beyond US$3,000 a month until the 03 §0.1 inputs exist and give an allowable cost per
  qualified lead.
- If the observed cost per booked walkthrough exceeds that allowable figure, scaling makes the loss
  larger. That will be stated as a loss, with the break-even, and the operator decides.
- PPC-only clients are priced as a share of ad spend with a minimum (`CLAUDE.md` §1). Their
  break-even uses that fee. `[NEEDS DATA: percentage and minimum]`

---

## 5. Prerequisites before spend (gates)

Status verified in code and on production, 2026-10-06.

| Gate | Pass condition | Status today | Owner |
|---|---|---|---|
| **MG1 Regional consent split** | In AU and US, a visitor who never touches the banner fires the browser `Lead` with `eventID`, and `/api/lead` sends the CAPI `Lead`. In EEA, UK, CH, CN, IN and unknown regions, **nothing** loads before an opt-in | **On the working tree, uncommitted. Not on production** (see the breakdown under this table). Production still runs the old behaviour | Luke, Anton. Owen gates |
| **MG2 Pixel and CAPI dedup** | The Events Manager Test Events tab (`META_TEST_EVENT_CODE`, preview only) shows one site lead arriving from browser and server and **deduplicated**. Event match quality recorded | **Wiring exists:** `newEventId()` and `trackMeta(..., eventId)` in `lib/analytics.ts:57,81`, and `metaLeadEvent` with the same `event_id` in `app/api/lead/route.ts:27-36,88,126`, on both the GHL and email-fallback paths. `[NEEDS DATA: are NEXT_PUBLIC_META_PIXEL_ID and META_CAPI_ACCESS_TOKEN set in Vercel production?]` | Luke, Marcus |
| **MG3 Click and fbclid capture** | A test URL with `fbclid` produces `fbclid`, `_fbc` and `_fbp` on the GHL contact and in the notification email. Attribution survives tab close | **Not done** (see the breakdown under this table) | Luke |
| **MG4 Lead-quality loop from GHL** | The weekly sheet joins every Meta lead ID to its GHL stage: New Lead, Qualifying (fit check passed), Call Booked, Call Held, Won or Lost. Cost per qualified lead is computed from it. **Phase 2:** GHL stage changes are posted to Meta as CRM events through the Conversions API (lead ID for form leads, hashed email plus `fbc` for site leads) | **Not done.** `app/api/` has no GHL webhook route. `walkthrough_booked` does not exist (03 §1.4) | Marcus (sheet), Luke (phase 2) |
| **MG5 Domain verified in Business Manager** | `qognitionagency.com` shows Verified in Business Settings | `[NEEDS DATA]`. There is no `facebook-domain-verification` meta tag on the production homepage. A DNS TXT record can't be checked from here | Operator (BM access), Jonas (DNS) |
| **MG6 Instant form → GHL sync** | One lead from Meta's Lead Ads Testing Tool lands in GHL with every §3.3 field mapped, the lead ID stored, and the workflow notification and task created | Not started. `[NEEDS DATA: Meta Page connected to GHL]` | Luke, operator |
| **MG7 Privacy notice** | `/legal/privacy` describes the regional model, Meta lead forms as a source, lead-status sharing with Meta, and custom audience uploads (M8) | **Fails.** The text says Meta measurement runs "when you allow advertising measurement", which is the old opt-in wording. `/privacy` returns **404** | Anton, operator. Counsel `[NEEDS DATA]` |
| **MG8 Landing pages** | `/free-ai-audit` and `/book` return 200 with the 03 §5.6 rank 1 and rank 3 fixes live | Both return 200 today. The fixes are not live | Mira, Theo |
| **MG9 Snapshot capacity and SLA** | The operator states snapshots per week and the reply turnaround. The queue rule (K2) is agreed with Rafael | `[NEEDS DATA]` | Operator |
| **MG10 Ruth** | SHIP on §3.3 form copy and §3.5 ad copy | Not submitted | Ruth |
| **MG11 Budget** | The operator names the 30-day figure directly (M1) | Open | Operator |

**MG1, in progress. What the code does.**

When I first read the code on 2026-10-06, `effectiveConsent()` returned `advertising: false` for
everyone with no stored choice. So `trackMeta` and the CAPI call never fired for a visitor who
ignored the banner, while `ConsentScripts` still rendered the pixel everywhere. Meta saw the visit
and never the lead, and the pixel loaded before consent in opt-in regions. Production still behaves
this way.

The working tree, as of 2026-10-07, now implements the split end to end. It is uncommitted and
belongs to another developer:
- `app/layout.tsx:109,113` resolves `consentDefaultFor(x-vercel-ip-country)` and writes it to
  `<html data-consent-default>`. The `gtag` consent default (`:150`) uses the same value.
- `lib/consent.ts:25-45`: the opt-out set is `US, CA, AU, AE, SG`. Everything else, including a
  missing country, is opt-in. `effectiveConsent()` falls back to the region default.
- `ConsentScripts` gates on effective consent (`ConsentManager.tsx:30-32`).
- `LeadForm.tsx:61,75` sends `effectiveConsent()`. So an AU or US visitor with no choice sends
  `advertising: true`, and `route.ts:88,126` fires the CAPI `Lead`.

**MG1 passes when:**
- Owen and Anton have reviewed the change.
- It is deployed to a preview.
- One test lead with an `AU` country header shows a deduplicated browser and server `Lead` in Test
  Events.
- One test with a `GB` header shows no Meta request before opt-in.

**MG3, not done. What the code does today:**
- `lib/analytics.ts` reads UTMs only, into `sessionStorage`.
- `lib/validation.ts` `attribution` has no click-ID field, and zod strips unknown keys.
- `_fbc` and `_fbp` are read only for the CAPI call (`lib/metaCapi.ts:62-65`) and never persisted.
- The fix: add `fbclid`, `fbc` and `fbp` to the 03 §2.4 spec.

**Minimum to launch P1 only:** MG5, MG6, MG7, MG9, MG10 and MG11. P1's conversion never touches the
site.

**Minimum to launch R1:** P1's gates, plus MG1, MG2, MG3 and MG8.

**MG4:** the weekly sheet is required for both. The automated loop is phase 2.

---

## 6. 30-day schedule

Dates assume the P1 gates pass by Tue 13 Oct. If they slip, every date slips with them.
- Day 1 is **Wed 14 Oct**.
- Day 30 is **Thu 12 Nov**.
- Australia is already on AEDT. The UK clock change (25 Oct) and the US change (1 Nov) don't
  affect this test.
- **One edit window a week** (days 8, 15 and 22). Every significant edit resets learning [R], so
  edits are batched.

| Days | Dates | Work | Owner |
|---|---|---|---|
| −7 to 0 | 6 to 13 Oct | Gates MG5 to MG7 and MG9 to MG11. GHL workflow. Business Manager, ad account (USD, M3), Page and Instagram connected. Audiences created: engagement, website, exclusions. Elena round 1. Ruth review | Operator, Luke, Elena, Ruth |
| 1 to 3 | 14 to 16 Oct | P1 live at US$75 a day, 5 ads. Check every lead against GHL the same day (K1). Fit check plus first reply inside the AU business day. **No edits** except kill rules | S1, S2 |
| 4 to 7 | 17 to 20 Oct | Daily: lead sync, snapshot queue (K2). Day 7 read: spend, CPM, CPL, leads, fit-check passes, placement breakdown, frequency. Counts only | Marcus |
| **8** | 21 Oct | **Edit window 1.** Set the daily budget from §4.2. Exclude any placement producing only fit-check fails. Turn on R1 if MG1 to MG3 and MG8 have passed and an audience meets Meta's minimum. `[UNVERIFIED: minimum audience size]` | Marcus |
| 9 to 14 | 22 to 27 Oct | Run. Weekly sheet (MG4). Log objections from the first walkthroughs verbatim in GHL (03 §5.5). Elena round 2 in production | S1, Elena |
| **15** | 28 Oct | **Edit window 2.** Add 3 new cuts from the angle with the most fit-check passes. This is directional, not a winner. Remove only ads whose leads all failed the fit check. Never remove an ad on CTR | Marcus |
| 16 to 21 | 29 Oct to 3 Nov | Run. Five-user test of the instant form with ICP-fit people from Rafael's network (03 §5.5) | S1 |
| **22** | 4 Nov | **Edit window 3.** Check scale rules S1 and kill rules K3 and K4. No new ad sets | Marcus |
| 23 to 29 | 5 to 11 Nov | Run. Snapshots for late leads delivered before day 30 where possible | S2 |
| **30** | 12 Nov | **Day-30 memo:** continue AU, extend to the US (S2), or stop. It carries spend; leads; fit-check passes; snapshots sent; walkthroughs booked and held; cost per qualified lead and per booked walkthrough, each with its n; and the binding constraint. Counts with denominators, labelled directional | Marcus → operator |

Leads booked in the last week will hold their calls after day 30. The memo is reissued at day 45
with those outcomes.

---

## 7. Kill and scale rules

These are policies, not measured thresholds. They are fixed before launch and not changed mid-test.

**Kill rules**

| # | Trigger | Action |
|---|---|---|
| K1 | Any lead in Meta and not in GHL after 24 hours | Pause P1 until the sync is fixed and the lead is recovered. A lost lead is a revenue defect (`CLAUDE.md` §2) |
| K2 | The snapshot queue exceeds **2 working days** of S2 capacity. Shared with outbound (Rafael §7.4) | Halve the P1 daily budget. If the queue is still over 2 days after 3 days, pause P1. Replying to every lead the same day continues regardless |
| K3 | After **20 leads**, fewer than **5** pass the fit check | Stop buying leads with this form and ad set. Add friction (move question 10 earlier, sharpen the intro's "not a fit" line) and change the angle mix before more spend |
| K4 | P1 has spent **40% of the approved 30-day budget** with **zero** fit-check passes | Pause P1. Diagnose creative, audience and form. Restart only with a named change. Once the 03 §0.1 inputs exist, replace this with "2× the allowable cost per qualified lead" (as in 03 §3.7) |
| K5 | Prospecting frequency above 4 over 7 days, with leads flat | Refresh creative at the next edit window |
| K6 | Any ad disapproved, or any comment containing a claim we can't support | Fix the copy through Ruth. Hide comments that post personal data. Reply to comments inside the IST working day |
| K7 | Any lead reports the ad promised placement, rankings or results | Pull the ad the same day. A complaint of that kind means the copy failed `CLAUDE.md` §4 |

**Scale rules**

| # | Condition (all must hold) | Action |
|---|---|---|
| S0 | The operator has supplied R, g, m and c (03 §0.1), so an allowable cost per qualified lead exists | Without this, no scale. Stay inside US$3,000 |
| S1 | At least 3 fit-check-passed leads. At least 1 walkthrough held. Cost per qualified lead ≤ allowable. Snapshot queue under 1 working day | Raise P1 by **no more than 20%** at an edit window. Never more than once a week |
| S2 | Day 30 reached, S1 met, **and** a named person owns the US call block (18:30 to 02:30 IST until 1 Nov, 19:30 to 03:30 after) | Launch the US as a **separate campaign**, not as an added location in the AU ad set, so each market is read on its own. Day 1 rules apply again |
| S3 | Any budget increase request | It must state in one message: current cost per qualified lead (n), current cost per booked walkthrough (n), the allowable figure, and the binding constraint (capacity, follow-up, measurement or audience saturation). No exceptions |

---

## 8. Why this is not a significance test

The obvious questions are which angle wins, and whether the form beats the site. Neither can be
answered at this volume.

- I use the 03 §5.4 bound for comparing two lead-to-qualified rates: n per arm ≈ 16(1 − p) ÷ (p · r²).
- Even at p = 50% and a 20% relative difference, that is **400 leads per arm**, or 800 in total.
- 800 leads inside US$3,000 would need a CPL of US$3.75 or less.
- So this is a budget-capped learning trial.

**What the day-30 memo reports:** counts with their denominators ("12 leads, 4 passed the fit
check, 1 booked"), labelled directional. **No lift figures**, and no "winning" angle. An angle is
kept or dropped on whether its leads pass the fit check, read directionally and backed by what the
walkthrough calls say.

---

## 9. NEEDS DATA register

**Blocking spend**
1. Operator approval of paid and the 30-day budget, given directly (M1, MG11).
2. R (average retainer), g (gross margin), m (retained months) and c (walkthrough-to-signed rate), so that an allowable cost per qualified lead exists (03 §0.1, S0).
3. Snapshot capacity per week, and the committed reply turnaround (MG9). The 48-hour figure is unconfirmed.
4. Business Manager access. Is `qognitionagency.com` domain-verified (MG5)?
5. Meta Page and Instagram account, and their connection to GHL (MG6). `context.md` lists no handles.
6. Counsel and Anton on the privacy-notice changes, Australian Privacy Act and Spam Act handling of form leads, and custom-audience uploads (MG7, M8).
7. Who appears on camera and signs replies (M6). Who takes AU walkthrough calls in the 06:30 to 11:30 IST slot.

**Blocking measurement**
8. Are `NEXT_PUBLIC_META_PIXEL_ID` and `META_CAPI_ACCESS_TOKEN` set in Vercel production? Event match quality after MG2.
9. Regional consent split (MG1): review, deploy and preview verification of the uncommitted working-tree change. Click-ID capture including `fbclid`, `fbc` and `fbp` (MG3). These are code changes, not data, but they block R1.
10. `[UNVERIFIED]` Does GHL's native Facebook lead integration store the Meta lead ID and ad IDs?
11. `[UNVERIFIED]` Is Meta's embedded GHL booking available in our account in October? Does a booking made there report back to Meta?
12. GHL custom field IDs for `service_need`, `buyer_prompt_stated`, the Meta lead ID and the ad IDs.

**Blocking targeting and creative**
13. `[UNVERIFIED]` Meta's current learning-phase wording at the primary source. "About 50 events in 7 days" is reported secondhand.
14. `[UNVERIFIED]` Advantage+ audience controls versus suggestions, and whether "original audiences" exist in a new account.
15. `[UNVERIFIED]` Which §2.3 titles and work categories exist in the Australian picker after the 2026-01-15 consolidation.
16. `[UNVERIFIED]` Meta's work-email field, conditional end screens for Higher Intent forms, and lead retention in Leads Center.
17. `[UNVERIFIED]` Meta's minimum seed size for lookalikes, minimum website audience size, and minimum daily budget per ad set (USD).
18. `[UNVERIFIED]` Meta's treatment of "ChatGPT" in ad text (M7). The names of the Advantage+ creative-enhancement toggles.
19. Count of fit-check-passed B2B contacts in GHL (lookalike seed). The current client list (exclusion).
20. In-band firm counts for Australia and the US from Rafael's Apollo filters. An Australian competitor pass from Iris.
21. Australian CPM and CPL. From the account only, after day 7. No public figure is used.
22. An Australian cohort run (Rafael §2) before Angle 4 says "we ran". Australian phrasing of the four taxonomy prompts.
23. Resolution of the "45 named clients" contradiction (Rafael D1). Until then, no client count in any ad.
24. PPC management percentage and monthly minimum.
25. A redacted real snapshot with consent, for creative.

---

## 10. Sources (external, with dates)

- Meta learning phase, "about 50 optimisation events within seven days of its last significant edit", attributed to Meta's Business Help Centre. ppc.land, page dated 2026-09-23: https://ppc.land/learning-phase/ . Meta's page (https://www.facebook.com/business/help/112167992830700) did not render on 2026-10-06.
- 2017 removal of more than 3 million self-reported employer, job title, school and field-of-study terms, with about 5,000 restored. Meta developer blog, 2017-09-20, seen via search summary: https://developers.facebook.com/ads/blog/post/2017/09/20/self-reporting-targeting/
- Detailed-targeting consolidation effective 2026-01-15. Social Media Today, 2025-08-17: https://www.socialmediatoday.com/news/meta-removes-more-detailed-ad-targeting-options-facebook-instagram/757856/
- Advantage+ audience controls versus suggestions. Jon Loomer (undated in summary): https://www.jonloomer.com/advantage-audience-vs-original-audiences/
- Conversions API for CRM eligibility (200 leads a month, lead ID, daily upload, 28-day stage window, 1% to 40% stage rate). Meta for Developers, undated, read 2026-10-06: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration
- Embedded appointment booking in Lead Ads, with HighLevel as launch partner. Rollout 25% on 2026-06-24, 50% on 2026-08-10, full in November 2026. Press release, 2026-06-24: https://digital-release.wowktv.com/business/press-releases/cision/20260624DA90713/meta-launches-embedded-appointment-booking-for-lead-ads-and-selects-highlevel-as-an-early-scheduling-partner
- GHL Facebook form field mapping, with custom field types: https://growthable.io/gohighlevel-tutorials/integration-widget/mapping-facebook-form-fields-for-gohighlevel/ (third-party tutorial, undated)
- Higher Intent form review screen: https://www.jonloomer.com/instant-forms/ (via search summary). A volume-reduction percentage quoted in other blogs was **not** used: it has no source.
