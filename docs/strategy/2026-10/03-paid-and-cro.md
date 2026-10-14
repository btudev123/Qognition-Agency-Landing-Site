# 03 · Paid launch, conversion setup and CRO for Qognition's own lead generation

> **Superseded in part, operator 2026-10-14.** GoHighLevel and Upstash are removed. Leads are emailed to hello@ through Resend, and calls are booked through Cal.com on /book. Sections below that describe GHL or Upstash are kept for history.

Owner: Marcus (performance). Date: 2026-10-06. Branch: `codex/sitewide-b2b-funnels`.
Plan step: 1E (measurement decisions) and 2.3 in `~/.claude/plans/there-should-be-either-fuzzy-cookie.md`.
Status: internal. The RSA copy in §3.6 is draft and goes to Ruth before anything is uploaded.

Reads: `CLAUDE.md` (§1 assistant-ads note, §2 ICP, §3 funnel, §4 claims, §8 measurement, the
2026-10-03 authority note), `~/qognition-ops/clients/qognition-agency/{context,guardrails,brand-voice}.md`,
`app/layout.tsx`, `lib/analytics.ts`, `lib/consent.ts`, `components/shared/{ConsentManager,LeadForm,CalBooking,ContactChannelLink,HeroRoiCalculator}.tsx`,
`app/api/lead/route.ts`, `lib/validation.ts`, `lib/leadQualification.ts`, `lib/leadCrm.ts`,
the six target pages, `docs/performance/*.md` (my 2026-09-28/29 work, which this supersedes for
Qognition's own account only), and Iris's `01-competitor-teardown-and-icp.md`.

Production URL checks in this file were run with `curl` against www.qognitionagency.com on
2026-10-06. Production is not this branch, so H1s quoted from production can change when the branch
ships.

---

## 0. The target, then the decisions only the operator can make

### 0.1 The target

North Star, `CLAUDE.md` §3: **booked qualified walkthroughs per month.** Primary conversion event in
`context.md`: "qualified leads and booked sales calls as fast as possible".

There is **no CPA target** on file. The break-even replaces it until the operator supplies one:

```
allowable cost per booked walkthrough  =  R × g × m × c
allowable cost per enquiry             =  allowable cost per booked walkthrough × (enquiry → booked walkthrough rate)

R  monthly retainer          floor is $3,000 (CLAUDE.md §2: never a plan below $3,000). Average: [NEEDS DATA]
g  gross margin on R         [NEEDS DATA]
m  expected retained months  [NEEDS DATA]
c  walkthrough → signed rate [NEEDS DATA]
```

Two costs belong on the same line and are usually forgotten:

- **Snapshot delivery cost.** The snapshot is human-delivered (operator decision 2026-09-29). Every
  paid snapshot request costs analyst hours whether or not it books. `[NEEDS DATA: analyst hours per snapshot]`
- **Delivery capacity is probably the binding constraint, not budget.** If paid produces more
  snapshot requests than the team can turn around, extra spend buys a queue and a broken promise.
  `[NEEDS DATA: snapshots per week the team can deliver]`

PPC-only buyers are in the ICP and are priced as a share of ad spend with a monthly minimum.
`[NEEDS DATA: the percentage and the minimum]`. Their break-even uses that fee, not the retainer.

### 0.2 Decisions for the operator. I have not resolved these quietly.

| # | Conflict | What I did | You decide |
|---|---|---|---|
| D0 | `context.md` says own paid spend is **$0/month, paid "not active"**, and `CLAUDE.md` §3 puts paid **last**. The 2026-10-06 brief says leads ASAP and paid is the fastest controllable lever. | Built the plan. Nothing is spent until you name a test budget. A message relayed through MARS is not budget approval. | Confirm paid is on, and the monthly test budget. `[NEEDS DATA: monthly test budget]` |
| D1 | The brief asks for a **"B2B SEO agency"** campaign. `CLAUDE.md` (2026-09-29) lists `b2b seo agency` among the five strings we **do not compete for**, because agencies are a white-label client segment. The brief also says to negative those five strings. Both cannot hold. | Campaign 2 targets the non-agency phrasings (`b2b seo services`, `seo for b2b companies`). `b2b seo agency` stays a phrase negative. | Keep the standing rule (my recommendation) or lift it for paid only. |
| D2 | **Consent model.** `CLAUDE.md` §5 says "opt-out, defaults to allow". The code is opt-in for events and opt-out for scripts (§1.1). | Changed nothing in `lib/consent.ts`. | Pick one model. My recommendation: region-aware, see §2.5. Anton reviews. |
| D3 | **No landing page exists** for SaaS or cybersecurity. `/industries/saas-and-software`, `/industries/technology-and-it-services` and `/industries/cybersecurity` all return 404 on production. | Keywords and copy are prepared. The ad groups are **held**. | Hold until pages exist (recommended), or send to `/services/ai-seo` and accept the message-match leak. |
| D4 | **Agency principals have no page.** `/white-label`, `/partners`, `/agencies` and the 02.13 ICP path all 404. | LinkedIn cell D is specified and held. | Approve a LinkedIn lead-form-only test once Ruth passes the copy, or wait for a page. |
| D5 | **Third-party trademarks in ad text** (ChatGPT, Perplexity, Gemini). | Two headlines in 1B and one in 1C use them. `[UNVERIFIED: whether these terms are restricted in Google Ads ad text]` | Accept a possible disapproval, or I swap them for "AI assistants". |
| D6 | **LinkedIn size floor.** The brief says 50 to 10,000. The ICP floor is 20. LinkedIn's bands are 11-50, 51-200 and so on. | Used 51-200 through 5,001-10,000, per the brief. Firms with 20 to 50 staff are excluded. | Accept, or add 11-50 and filter the under-20s at qualification. |

---

## 1. The signal, before any structure

This section outranks the rest. Every finding was verified in code on 2026-10-06. Spending against
the current measurement would train Google on a fraction of the conversions, with no way to tie a
booked call back to the click that produced it.

### 1.1 Conversions are dropped for every visitor who ignores the cookie banner (critical)

- `components/shared/ConsentManager.tsx:30`: `ConsentScripts` renders tags **unless** a category was
  explicitly rejected. So GTM, GA4, Clarity and the Meta pixel load before any choice is made, and
  GA4 records the page view.
- `lib/consent.ts:20-26`: `effectiveConsent()` returns `analytics: false, advertising: false` when no
  choice is stored. So:
  - `pushDataLayer` (`lib/analytics.ts:66`) is a no-op, and so is every `track()` call, including
    the lead event at `LeadForm.tsx:93`.
  - `trackMeta` (`lib/analytics.ts:82`) is a no-op.
  - `getAttribution` (`lib/analytics.ts:142`) returns `undefined`, so the lead record has **no UTMs
    and no landing page**.
- The banner is a non-modal bar (`ConsentManager.tsx:64`, `aria-modal="false"`). A visitor can
  ignore it and submit the form.

**Effect.** Sessions are counted and conversions are not, for an unknown share of visitors. Every
conversion rate in GA4 today is understated by an unknown factor. Google Ads would see the click and
miss the lead. This is the most important defect in this file, and it is a consent-model decision
(D2), not a bug to patch around.

### 1.2 No click ID is captured anywhere

- `grep` for `gclid|wbraid|gbraid|li_fat_id|msclkid` across `app components lib` finds nothing. The
  only match is Meta's `_fbc` cookie, read server-side at `lib/metaCapi.ts:64`.
- `lib/analytics.ts:144-151` reads the five UTM parameters only.
- `lib/validation.ts:95-100`: the `attribution` object has no click-ID field. **Zod strips unknown
  keys**, so even a client that sent them would see them silently dropped at `/api/lead`.

**Effect.** Offline conversion import is impossible. A booked walkthrough cannot be matched to its
click, so Smart Bidding can only ever optimise toward the form.

### 1.3 Bookings made in the calendar carry no attribution at all

`components/shared/CalBooking.tsx:33` renders the GoHighLevel widget with
`src={BOOKING_LINK}`, with no parameters. A visitor who books directly, which is the primary CTA,
never touches `/api/lead`. Nothing about the source of that booking reaches GHL.
`[UNVERIFIED: whether the LeadConnector booking widget records URL parameters passed on the iframe
src into contact attribution. Test with one booking on a preview before relying on it.]`

### 1.4 `walkthrough_booked` does not exist

There is no GHL webhook route. `app/api/` holds `audit`, `health`, `integrations`, `lead`, `ph` and
`revalidate`. The North Star is unmeasured. Plan step 1B puts the route after GHL credentials.

### 1.5 Attribution dies with the tab

`lib/analytics.ts:159,163` stores attribution in `sessionStorage`. `CLAUDE.md` §8 forbids it, because
a multi-week B2B consideration loses first touch on tab close.

### 1.6 Two of the three main forms can never produce an MQL

`lib/leadQualification.ts:11`: `highIntent` is true only for intents `consultation` and `pricing`,
and MQL requires it.

- `/contact` sends `intent="contact"` (`app/contact/page.tsx:100`).
- `/free-ai-audit` sends `intent="audit"` (`components/LocalAuditExperience.tsx:4`).

So a 500-person B2B firm that fills in every qualification field on either page is graded `Lead`.
The only `consultation` form is the ROI calculator (`HeroRoiCalculator.tsx:213`). Paid will be judged
on qualified leads. Until this changes, there will be none to count.

### 1.7 Smaller items, recorded

- `HeroRoiCalculator.tsx:207-227` sends `utm: getUtmParams()` and no `attribution` object, so its
  leads lose last touch and landing page.
- **GA4 may be counted twice.** It is hard-coded in `app/layout.tsx` (`ga4-config`), and GTM
  `GTM-M83XBQG2` may carry its own GA4 configuration tag.
  `[NEEDS DATA: GTM container export]`
- **The event names in code do not match `CLAUDE.md` §8.**
  - `lead_submit_success` is the live lead event.
  - `contact_submitted` does not exist yet. Plan 1E renames it with a one-release alias.
  - `whatsapp_click` and `phone_click` are being added now in `ContactChannelLink.tsx:19`, uncommitted
    and owned by another developer. That matches the spec in §2.2.

### 1.8 Launch gates. No spend until G1 to G5 pass.

| Gate | Pass condition | Owner |
|---|---|---|
| G1 | One real production submission lands in hello@ (plan 1A/1C) | Luke, Jonas |
| G2 | Consent model decided (D2). `contact_submitted` reaches GA4 DebugView for a visitor **who never clicks the banner** in a launch geo | Operator, Anton, Luke |
| G3 | `gclid`/`wbraid`/`gbraid` from a test URL appear on the lead record and in the notification email (§2.4) | Luke |
| G4 | The Google Ads conversion actions in §2.3 exist. `walkthrough_booked` can be uploaded, by CSV if the webhook is not live | Marcus, operator (account access) |
| G5 | Every live ad group's landing page returns 200 on production, with an H1 that makes the ad's promise (§3.4) | Mira, Theo |

**The quickest honest path this week:**

1. G1 to G3 are small code changes.
2. G4 can run on a **weekly manual CSV upload** of booked walkthroughs that carry a click ID, until
   the GHL webhook exists.
3. Launch Campaigns 1 and 2 and the two vertical ad groups that have pages, **US only**.

---

## 2. Conversion setup

### 2.1 GTM consent category: moved to `analytics`. Done in `app/layout.tsx`.

**Decision.** GTM loads under `analytics`, and a Google Consent Mode v2 signal is set before it.

**Why.**

- **GTM is a container, not an ad tag.** It is the thing that turns `dataLayer` events into GA4
  events. A plain `dataLayer.push({event})` is not sent to GA4 by the hard-coded gtag config. Under
  `advertising`, a visitor who allowed analytics and refused advertising had their
  `contact_submitted` pushed into a `dataLayer` that nothing read.
- **Moving it alone would have been unsafe.** Any ad tag inside the container would then fire for a
  visitor who refused advertising. So the same edit sets `gtag('consent','default', …)` before GTM
  and GA4 load:
  - `ad_storage`, `ad_user_data` and `ad_personalization` follow the stored `advertising` choice.
  - `analytics_storage` follows `analytics`.
  - A `consent update` fires on the existing `qognition:consent` event.
  - The constants are imported from `lib/consent.ts`, so the key and policy version cannot drift.
- **Behaviour change, stated exactly.** Visitors with no choice are unchanged: the default is
  `granted`, which mirrors what `ConsentScripts` already does. Visitors who chose both, or rejected
  both, are unchanged. The only change is for visitors who allowed analytics and refused
  advertising: GA4 events now flow, and Google ad tags inside GTM run cookieless.
- **A privacy improvement as a side effect.** A first-visit "Reject optional" did not reload the page
  (`consent.ts:41`, because `previous` is null), so running Google tags kept going for that page
  view. They now receive `denied` immediately.
- **Not done here, and still required:**
  - Every **non-Google** tag in the container (LinkedIn Insight, any other pixel) needs the GTM
    setting "Require additional consent: ad_storage". `[NEEDS DATA: GTM container export, to confirm]`
  - A **region-aware denied default** for EEA, UK and CH is part of D2. That is why §3.5 keeps paid
    out of the UK and EU until it ships.

Verification done: the inline script was executed in Node against four stored states (no choice,
split choice then update, stored split, stale policy version) and produced the expected consent
states, and `app/layout.tsx` transpiles with zero diagnostics. Build verification is on Vercel
(`CLAUDE.md` §6). Owen and Anton review the diff.

### 2.2 The event map

No event carries `email`, `phone`, `name` or the free-text `message` (`CLAUDE.md` §8).

| Event | Fires where | Today, file:line | Params | GA4 | Google Ads | Meta / LinkedIn |
|---|---|---|---|---|---|---|
| `contact_submitted` | Client, on `/api/lead` `success === true` and not `duplicate` | Live as `lead_submit_success` at `LeadForm.tsx:93`. Rename with a one-release alias (plan 1E). The ROI calculator fires `roi_calculator_submit` at `HeroRoiCalculator.tsx:233`, so it should fire `contact_submitted` with `lead_intent: consultation` and keep its own event as a diagnostic | `lead_intent`, `source_page`, `locale`, `stage`, `service_id`, `industry_id`, `subindustry_id`, `niche_id`, `subniche_id` (taxonomy IDs only), `lead_ref` = `submission_id` (a join key, not PII) | Key event | **Secondary** action, imported from the GA4 key event. Observed, not bid on | Meta `Lead` with the shared `eventID` (already wired). LinkedIn conversion via the Insight Tag in GTM, under advertising consent |
| `walkthrough_booked` | **Server only**, from the GHL appointment webhook. Never the client | Missing. New route in plan 1B | `booking_source` (`calendar_direct` / `after_enquiry`), `lead_ref` if matched, `stage`, taxonomy IDs if known | Key event via the Measurement Protocol. Needs the GA4 `client_id`, so capture `_ga` on the lead record. A direct booker with no lead record is logged without session stitching | **Primary** action, via offline import keyed on `gclid`/`gbraid`/`wbraid` (§2.3) | Meta `Schedule` via CAPI, consent-gated. LinkedIn offline conversion later |
| `booking_widget_view` | Client, when the calendar mounts | `CalBooking.tsx:18`. Correct. The comment at `:19` is load-bearing | `page_path` | Event, **never** a key event | Not imported. Ever | None |
| `whatsapp_click` | Client, on click of any WhatsApp link | In progress at `ContactChannelLink.tsx:19`. Replaces the old `trackGtag('enquiry_cta_click')` | `location` (`floating` / `sticky_bar` / `footer` / `contact_page`), `page_path` | Event, not key | Not imported. A click is intent, not a conversation | None |
| `phone_click` | Client, on `tel:` click | Same component | Same | Event, not key | Not imported. If a Google call asset is added later, Google's own call reporting applies | None |
| `lead_submit_attempt` | Client, on submit | `LeadForm.tsx:78` | `lead_intent`, `source_page`, `locale` | Diagnostic: attempt minus submitted = failed or abandoned | No | No |
| `cta_click` / `sticky_cta_click` | Client | `FunnelCTA.tsx:33`, `StickyCTA.tsx:13` | `cta_stage`, `cta_action` | Diagnostic | No | No |

**On the snapshot events.** `snapshot_started` and `snapshot_completed` from `CLAUDE.md` §8 described
an automated snapshot. The snapshot is now form-first and human-delivered. A snapshot request is
`contact_submitted` with `lead_intent: audit`, and does not need its own event. Delivery belongs to
the CRM, as a GHL stage `snapshot_delivered` with a timestamp, so the 48-hour promise in
`app/free-ai-audit/page.tsx:3` (metadata) becomes measurable.

### 2.3 Google Ads conversion actions

| Action | Source | Goal role | Count | Window | Notes |
|---|---|---|---|---|---|
| `walkthrough_booked` | Offline import: "conversions from clicks", by Google Ads API upload or weekly CSV | **Primary** (the only one) | One | 90-day click-through. Multi-week B2B cycle | Upload only for leads whose `consent.advertising` is true, or who made no choice in a non-opt-in region (Anton signs off this rule). Hashed email goes in the upload server-side only, never through GTM (`CLAUDE.md` §8). `[UNVERIFIED: whether Google currently accepts API uploads with user identifiers when no on-page tag collected the email. Confirm in Google's docs before building.]` |
| `contact_submitted` | GA4 key-event import | Secondary | One | 90-day | Observed only. Promote to primary only on an explicit decision, and only if `walkthrough_booked` volume cannot support any automated bidding |
| Everything else | n/a | **Remove** | n/a | n/a | Remove any auto-created goals, GA4 `page_view` imports and GHL-created actions from account-default goals. `[NEEDS DATA: current conversion actions in the account, if one exists]` |

### 2.4 Click ID capture spec (Luke, after the other developers' edits land)

| File | Change |
|---|---|
| `lib/analytics.ts:144-151` | Also read `gclid`, `wbraid`, `gbraid`, `li_fat_id` and `msclkid` from the URL. Store each with a captured-at timestamp. The newest click wins per ID type |
| `lib/analytics.ts:159,163` | Move from `sessionStorage` to `localStorage` with a 90-day expiry. This fixes §1.5 too |
| `lib/analytics.ts:142` | Capture depends on D2. For non-opt-in regions, capture when no choice has been made, and attach the consent state to the lead so the upload rule in §2.3 decides |
| `lib/validation.ts:95-100` | Add `click_ids: { gclid, wbraid, gbraid, li_fat_id, msclkid }`, each `z.string().max(200).optional()`, plus `ga_client_id`. Without the schema field, zod drops them |
| `lib/leadCrm.ts:110` | Persist them onto the GHL contact. `[NEEDS DATA: GHL custom field IDs for the five click IDs and ga_client_id]` |
| `lib/leadDelivery.ts:88` | Add the click IDs to the notification email. In email-fallback mode, that email is the only record |
| `components/shared/CalBooking.tsx:33` | Append `utm_*` and the click IDs to the iframe `src`, so a direct booking carries its source (§1.3, unverified) |
| `HeroRoiCalculator.tsx:207-227` | Send the same `attribution` object as `LeadForm` |
| `lib/leadQualification.ts:11` | Treat `contact` and `audit` as service intent. Both are a request to talk or to be reviewed. `newsletter` stays out |

### 2.5 The consent recommendation (D2)

| Visitors | Analytics and advertising default | Basis |
|---|---|---|
| US, CA, AU, SG, AE | **Granted until refused** (opt-out). Matches `CLAUDE.md` §5 and what `ConsentScripts` already does | Launch geos |
| EEA, UK, CH | **Denied until granted** (opt-in). Consent Mode `default` with `region: [...]` | Opt-in jurisdictions |

`lib/consent.ts` `effectiveConsent()` then follows the same table, so scripts and events stop
disagreeing. The region comes from Vercel's `x-vercel-ip-country` request header, passed to the
client. Anton reviews. Paid stays out of the UK, IE and the EU until this ships, which suits the
geo order in §3.5 anyway.

---

## 3. Google Search launch plan

### 3.1 Account settings that protect the claims discipline

- **Network.** Search only. Search Partners off, Display off.
- **Locations.** "Presence: people in or regularly in". Not "interest".
- **Keep automation from writing or widening the account:**
  - Automatically created assets off. Google-generated headlines could carry claims `CLAUDE.md` §4
    forbids.
  - AI Max for Search off. `[UNVERIFIED: feature name and default in this account's UI]`
  - Auto-apply recommendations off, especially "add broad match" and "upgrade to broad".
- **Bidding.**
  - Start on **Manual CPC**, with bids set from Keyword Planner's top-of-page ranges.
    `[NEEDS DATA: Keyword Planner volume and bid ranges for every keyword below, US]`
  - There is no conversion history, and §1 shows the signal is broken, so Smart Bidding has nothing
    to learn from.
  - Move to Maximize Conversions only once `walkthrough_booked` imports are flowing at a volume
    Google's own guidance supports. `[NEEDS DATA: Google's current documented guidance. Do not quote
    a threshold from memory.]`
  - Expect `walkthrough_booked` volume to stay low. The likely later step is conversion **value**
    bidding, with a relative value on each action derived from §0.1. That needs the §0.1 inputs.
- **Tracking.**
  - Auto-tagging on.
  - Final URL suffix:
    `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}`
- **Rotation and schedule.**
  - Ad rotation: optimise.
  - Ad schedule: all hours at launch. Read hour-of-day only after there is data.

### 3.2 Structure: campaigns by intent

Match types at launch are **exact and phrase only**. Broad match needs a conversion signal to steer
it, and §1 says there is none. `[k]` means exact and `"k"` means phrase.

| Campaign | Ad group | Keywords | Landing page | State |
|---|---|---|---|---|
| **C1 AI search** | 1A AI SEO agency | `[ai seo agency]` `"ai seo agency"` `[ai seo services]` `[ai seo company]` `"ai search optimization agency"` `"seo for ai overviews"` `"llm seo agency"` | `/services/ai-seo` | Launch |
| | 1B GEO agency | `[generative engine optimization agency]` `"generative engine optimization services"` `[generative engine optimization]` `[geo agency]` `[geo seo agency]` | `/services/ai-seo/generative-engine-optimization` | Launch |
| | 1C AI visibility check | `"get mentioned in chatgpt"` `"get recommended by chatgpt"` `"show up in chatgpt"` `"rank in chatgpt"` `"chatgpt visibility"` `"ai visibility audit"` `[ai search visibility]` `"appear in ai overviews"` | `/free-ai-audit` | Launch. Watch for local and SMB searchers |
| | 1D AEO agency | `[aeo agency]` `"answer engine optimization agency"` `[answer engine optimization services]` | `/services/ai-seo/answer-engine-optimization` | Launch, with the 1A RSA and two headline swaps (§3.6) |
| **C2 B2B search and paid** | 2A B2B SEO services (D1) | `[b2b seo services]` `"b2b seo services"` `[seo for b2b companies]` `"seo for b2b"` `[b2b seo company]` `[b2b seo consultant]` | `/services/seo` | Launch |
| | 2B B2B PPC | `[b2b ppc agency]` `"b2b ppc agency"` `[b2b ppc management]` `"b2b google ads agency"` `[b2b paid search agency]` | `/services/ppc` | Launch |
| **C3 Verticals** | 3A SaaS | `[saas seo agency]` `"saas seo agency"` `[saas seo services]` `"seo for saas companies"` `"b2b saas seo agency"` `"saas geo agency"` | **None.** 404 | **Hold (D3).** Iris §0.4: generic SaaS is the most crowded position on the board, so it is the most expensive auction to enter without a page |
| | 3B Cybersecurity | `"cybersecurity marketing agency"` `[cybersecurity seo agency]` `"seo for cybersecurity companies"` `"marketing for cybersecurity companies"` | **None.** 404 | **Hold (D3).** When a page exists, split it into MSSP and GRC SaaS (Iris C.2, rows 3 and 4) |
| | 3C Manufacturing | `"manufacturing seo agency"` `[manufacturing seo]` `[seo for manufacturers]` `"industrial seo agency"` `"industrial marketing agency"` | `/industries/manufacturing` (200) | Launch. H1 match is weak (§3.4) |
| | 3D Corporate law | `"corporate law firm seo"` `"seo for corporate law firms"` `"business law firm marketing"` `[law firm seo]` (probe: low bid cap) | `/industries/law-legal/corporate-law` (200) | Launch. Iris left corporate law out of her first eight, so treat this as a probe |
| **C4 Brand** | qognition | `[qognition]` `"qognition agency"` | `/` | **Skip at launch.** Brand clicks are near zero in GSC. Revisit if Auction Insights shows a competitor bidding on the name |

**Phase 2, when the pages ship (not this week):**

- **Commercial insurance.** It is the uncontested flagship, but `/industries/insurance` returns 404
  on production. Expect a heavy negative load against consumer-lines agents.
- **TIC.** The wave 1 pages are on the branch. The industry hub returns 404 on production.

### 3.3 Negative keyword lists

Negatives do **not** match close variants, so plurals and variants are listed explicitly. All are
phrase match unless marked.

| List | Applied to | Terms |
|---|---|---|
| **N1 White-label strings** (`CLAUDE.md` 2026-09-29) | All | `b2b marketing agency`, `b2b marketing agencies`, `b2b seo agency`, `b2b seo agencies`, `abm agency`, `abm agencies`, `account based marketing agency`, `franchise marketing agency`, `franchise marketing agencies`, `franchise development marketing`, `white label`, `white-label`, `whitelabel`, `reseller` |
| **N2 Jobs** | All | `job`, `jobs`, `career`, `careers`, `hiring`, `salary`, `salaries`, `intern`, `internship`, `resume`, `vacancy`, `specialist`, `manager`, `analyst`, `executive`, `job description`, `freelance`, `freelancer`, `fiverr`, `upwork` |
| **N3 Learning** | All **except 1C** (1C's searchers phrase the problem as a question) | `course`, `courses`, `certification`, `certificate`, `training`, `tutorial`, `learn`, `how to`, `what is`, `definition`, `meaning`, `example`, `examples`, `pdf`, `book`, `udemy`, `coursera`, `for beginners`, `reddit`, `quora`, `youtube`, `wikipedia` |
| **N4 Cheap, free and tools** | All | `free`, `cheap`, `cheapest`, `low cost`, `budget`, `diy`, `template`, `templates`, `seo tool`, `seo tools`, `ai seo tool`, `geo tool`, `seo software`, `rank tracker`, `checker`, `generator`, `plugin`, `chrome extension`, `app store` |
| **N5 Consumer and local** | All | `near me`, `local`, `small business`, `restaurant`, `dentist`, `dental`, `plumber`, `hvac`, `roofing`, `salon`, `realtor`, `real estate agent`, `shopify`, `etsy`, `amazon`, `ecommerce`, `e-commerce`, `personal brand` |
| **N6 GEO ambiguity** | C1 | `geo group`, `geography`, `geotechnical`, `geothermal`, `geospatial`, `gis`, `geofencing`, `geotargeting`, `geo tagging`, `geomarketing`, `geo metro`, `geocaching`, `geopolitical` |
| **N7 Assistant ads** (`CLAUDE.md` §1: may not be sold) | All | `chatgpt ads`, `chatgpt advertising`, `advertise on chatgpt`, `openai ads`, `perplexity ads`, `ads in chatgpt` |
| **N8 Competitor and prospect names** | All | `ipullrank`, `directive consulting`, `omniscient digital`, `powered by search`, `first page sage`, `webfx`, `the abm agency`, `thrive agency`, `gorilla 76`, `np digital`, `neil patel`. Three of these are white-label prospects too (Iris A.7). We do not bid against them |
| **N9 Consumer law** | 3D only | `personal injury`, `accident`, `car accident`, `truck accident`, `family law`, `divorce`, `custody`, `criminal`, `dui`, `dwi`, `immigration`, `estate planning`, `probate`, `bankruptcy`, `workers comp`, `workers compensation`, `disability`, `social security`, `medical malpractice`, `mesothelioma`, `lemon law` |

**Read cadence.**

- Search terms daily for the first 3 days, then every 2 to 3 days until week 4.
- **The negative list is the deliverable of weeks 1 and 2.**
- No bid strategy change in the first 14 days, other than CPC caps and negatives.

### 3.4 Landing page match

The ad's promise and the page's headline must be the same promise. Status codes and H1s below are
from production on 2026-10-06.

| Ad group | Landing page | Production H1 | Match | Fix (owner) |
|---|---|---|---|---|
| 1A | `/services/ai-seo` | "GEO & AI Search". The branch reads "AI SEO & GEO for B2B" | Good on the branch | Ship the branch H1. The first booking CTA sits in the aside (`app/services/[service]/page.tsx:242,282`), which stacks **after** the whole article on mobile. Add an above-the-fold CTA pair (Mira, see §5) |
| 1B | `/services/ai-seo/generative-engine-optimization` | "Generative Engine Optimization (GEO) Services for AI Growth Marketing" | Good | "AI Growth Marketing" is not our register. Theo |
| 1C | `/free-ai-audit` | "Get your AI Search Visibility Report." | Good on the promise. The body contradicts it | See §5, row 3 |
| 1D | `/services/ai-seo/answer-engine-optimization` | n/o | `[NEEDS DATA: check the H1 on the deployed build]` | n/a |
| 2A | `/services/seo` | "SEO & Organic Growth" | Weak: no "B2B" | Theo |
| 2B | `/services/ppc` | "Paid Media (PPC)" | Weak: no "B2B" | Theo. Also `docs/performance/b2b-paid-structure.md` §1.2: the page must not claim click-ID capture until §2.4 ships |
| 3C | `/industries/manufacturing` | "Manufacturing & Industrial" | Weak: a label, not a promise | Theo: "SEO and AI search for manufacturers" |
| 3D | `/industries/law-legal/corporate-law` | "Corporate Law Firms Marketing" | Fair | Theo |

### 3.5 Geography, in `CLAUDE.md` order

| Wave | Markets | Gate |
|---|---|---|
| A, this week | **US** first. Add CA and AU as a duplicate campaign set only when the budget meets the floor rule in §3.7 | G1 to G5 |
| B | UK, IE, SG, AE | Region-aware consent shipped (D2). English landing pages |
| C | NL, DE, SE, DK, NO, FI, CH | Localized landing pages and keywords. `[NEEDS DATA: which locale pages are production-ready]` |

USD only. Language targeting: English for waves A and B.

### 3.6 RSA copy (draft. Ruth before upload.)

**Validation.** Every line was checked by script:

- headlines are 30 characters or fewer, descriptions 90 or fewer
- no em or en dashes
- none of the `CLAUDE.md` §10 or `brand-voice.md` banned words
- no guarantee and no superlative
- the only number is the 30-minute call length, sourced to commit `c95b929`

There is no unsourced figure anywhere. "45 client programmes" is deliberately absent: 39 of the 45
are HVAC and dental, and an ad for a B2B vertical must not imply experience in that vertical
(`CLAUDE.md` §11).

Pin one keyword-matching headline to position 1 per ad group. Leave the rest unpinned.

**1A AI SEO agency**
- H: AI SEO Agency for B2B Firms · AI SEO and GEO for B2B · AI Overviews and AI Mode · See What AI Search Says · Free AI Visibility Snapshot · Human-Reviewed, Dated Report · Book a 30-Minute Call · Every Answer Dated and Sourced · Method You Can Re-Run · Built for B2B Sales Cycles · No Placement Guarantees · SEO and AI Search, One Team
- D: We check how AI search answers your buyers' questions, and record the date and source. · A human reviews your site and a sample of buyer prompts, then reports what was seen. · We commit to the work and a dated record. We never promise rankings or AI placement. · Book a 30-minute call. Bring your site and the buyers you want to reach.

**1B GEO agency** (contains D5 trademarks)
- H: GEO Agency for B2B Firms · Generative Engine Optimization · ChatGPT, Perplexity, Gemini · Is ChatGPT Naming Your Rival? · Free AI Visibility Snapshot · Every Answer Dated and Sourced · Prompts Tracked by Platform · Book a 30-Minute Call · Method You Can Re-Run · Citations Tracked by Source · No Placement Guarantees · B2B Firms With a Sales Team
- D: We record which firms ChatGPT, Perplexity and Gemini name for your buyers' questions. · Each answer comes with its prompt, platform and date, so you can re-check it yourself. · We commit to the work and a dated record. We never promise citations or placement. · Book a 30-minute call. Bring your site and the buyers you want to reach.

**1C AI visibility check**
- H: Does ChatGPT Mention You? · Free AI Visibility Snapshot · See What AI Says About You · Reviewed by a Person · Your Prompts, Named Rivals · Dated, Sourced Observations · For B2B Firms Only · Book a 30-Minute Call · Request Your Snapshot · No Placement Guarantees
- D: Tell us your buyers. We test their questions in AI search and report what was named. · A sampled AI answer is an observation on a date. We show the prompt, model and date. · A person reviews every request and replies to confirm scope and timing. · For B2B firms that sell a considered purchase. Book a call or request a snapshot.

**1D AEO agency.** Use the 1A RSA, replacing headlines 1 and 2 with "AEO Agency for B2B Firms" and
"Answer Engine Optimization".

**2A B2B SEO services**
- H: SEO for B2B Companies · B2B SEO Services · Technical SEO and Content · SEO and AI Search Together · Pages Built for Buyers · Qualified Enquiries Tracked · Book a 30-Minute Call · Free AI Visibility Snapshot · No Ranking Guarantees · Reports With Dates and Sources
- D: Technical SEO, buyer-led content and authority work for B2B firms with a sales team. · We report rankings, AI answers and qualified enquiries separately, never blended. · We commit to the work and a dated record. We never promise rankings. · Book a 30-minute call. Bring your site and the buyers you want to reach.

**2B B2B PPC**
- H: B2B PPC Management · Google Ads for B2B Firms · Paid Search for B2B · Bid on Meetings, Not Forms · Negatives Built Week One · Exact and Phrase Match First · Book a 30-Minute Call · Priced on Ad Spend · No Lead Volume Guarantees · PPC Without an SEO Contract
- D: Paid search built around your buyers' queries, with negatives treated as the work. · We set the account to learn from booked meetings, not from form fills. · Management priced as a share of ad spend, with a monthly minimum. · Book a 30-minute call. Bring your account access and your target cost per lead.
- Ruth: "Bid on Meetings" describes the method we run in **client** accounts. It must not read as a capability of this site until §2.4 ships.

**3C Manufacturing**
- H: SEO for Manufacturers · Manufacturing SEO and GEO · Pages Built for Engineers · Spec-Led Pages for Buyers · Certifications Stated Clearly · AI Search for Industrial Firms · Book a 30-Minute Call · Free AI Visibility Snapshot · No Ranking Guarantees · Dated, Sourced Reports
- D: SEO and AI search for manufacturers, built on process, material and certification. · We test the questions engineers and buyers ask AI tools, and record what was named. · We commit to the work and a dated record. We never promise rankings or placement. · Book a 30-minute call. Bring your site and the parts or processes you want to win.

**3D Corporate law**
- H: SEO for Corporate Law Firms · Corporate Law Firm Marketing · Pages for the Matters You Want · AI Search for Law Firms · Practice Pages for Clients · Book a 30-Minute Call · Free AI Visibility Snapshot · No Ranking Guarantees · Dated, Sourced Reports · For Firms Serving Businesses
- D: SEO and AI search for firms whose clients are companies, not consumers. · We test the questions in-house counsel ask AI tools, and record which firms are named. · We commit to the work and a dated record. We never promise rankings or placement. · Book a 30-minute call. Bring your site and the practice areas you want to grow.

**Assets, all campaigns**

- **Sitelinks:** Book a call (`/book`) · AI visibility snapshot (`/free-ai-audit`) · How we measure (`/case-studies/methodology`) · How the programme works (`/process`)
- **Callouts:** Human-reviewed · Dated, sourced answers · B2B firms only · 30-minute call
- **Structured snippet**, Services: AI SEO, GEO, SEO, Local SEO, B2B PPC
- **No lead form asset and no call asset at launch.** Both bypass the site and the click-ID chain.

### 3.7 Budget structure: a split rule, not a dollar figure

Total monthly test budget **B**: `[NEEDS DATA: monthly test budget]` (D0).

1. **Weeks 1 and 2: Google Search gets 100% of B.** LinkedIn waits for G1 to G4, so it is measured
   from its first impression.
2. **Inside Google:**
   - C1 AI search: **50%**. It is the wedge and lands on our strongest pages.
   - C3 verticals: **30%**, split between 3C and 3D while 3A and 3B are held.
   - C2: **20%**. Its head terms sit closest to the agency-collision line and are the most contested.
3. **Floor rule.**
   - Each live campaign's daily budget must buy at least **10 clicks a day** at its observed average
     CPC from day 3. That is enough search-term data to build negatives inside two weeks.
   - If B cannot meet the floor everywhere, **cut campaigns, do not spread thinner.** Cut in this
     order: C2, then 3D, then 3C. C1 runs last.
   - CA and AU are added only when the US campaigns meet the floor.
4. **Weeks 3 to 6: LinkedIn may take up to 30% of B,** for a fixed four weeks. Only after the Google
   gates are verified, and only if 70% of B still meets the Google floor.
5. **Reallocation.**
   - Weekly from week 3.
   - Only on **cost per human-qualified lead** and then cost per booked walkthrough. Never on CTR,
     never on raw `contact_submitted` volume.
6. **Kill rule.** An ad group that has spent **2×** the allowable cost per qualified lead (§0.1)
   with zero qualified leads is paused, and its search terms and landing page are diagnosed before
   any restart.
7. **Standing rule.** No budget increase is proposed without the current cost per booked
   walkthrough and the binding constraint in the same message. The binding constraint is the first
   of these that applies:
   - snapshot delivery capacity
   - sales follow-up capacity
   - impression share lost to budget
   - impression share lost to rank
   - conversion volume too low for the bid strategy

---

## 4. LinkedIn Ads test

### 4.1 This cannot be a significance test. Said now, not in week 6.

The question is "Lead Gen form vs site". At B2B lead volumes, the per-cell count of booked
walkthroughs over four weeks will be single digits or zero. No split can separate two cells on
that. So this is a **budget-capped learning trial with a decision rule fixed before launch**, and
its result is reported as directional.

### 4.2 Cells

| Cell | Format | Destination | Offer | State |
|---|---|---|---|---|
| A | Document Ad, gated by a LinkedIn Lead Gen form (pre-filled) | In platform | A document: "How we check what ChatGPT says about a B2B firm: the method, a sample prompt set, a dated example" | Needs the asset (Theo writes, Elena designs, Ruth gates). `[NEEDS DATA: does a gated document exist?]` |
| B | Single image or Document Ad, click-through | `/free-ai-audit`, with UTMs. The Insight Tag in GTM under advertising consent captures `li_fat_id` once §2.4 ships | Free AI visibility snapshot | Needs the Insight Tag. `[NEEDS DATA: is it in the GTM container?]` |
| C, later | Same as the better of A and B | Same | Same | Uses a **company list** from Rafael's account list (plan 2.5) as a matched audience. This is the most targeted cell and should replace broad targeting once the list exists |
| D, held (D4) | Lead Gen form | In platform | White-label capacity for agencies | Agency-principal copy, Ruth-gated (`CLAUDE.md` 2026-09-29). Never shown to the main cells' audience |

### 4.3 Targeting (cells A and B)

- **Job titles:** CEO, Founder, Co-Founder, Owner, President, Managing Director, Chief Marketing
  Officer, VP Marketing, Head of Marketing, Director of Marketing, VP Growth, Head of Growth, Head
  of Demand Generation.
  - Use **titles**, not seniority × function. They are tighter and match "our buyer" in `CLAUDE.md` §2.
- **Company size:** 51-200, 201-500, 501-1,000, 1,001-5,000, 5,001-10,000 (D6).
- **Industries** (LinkedIn taxonomy, mapped to the operator's priority list and Iris C.2):
  - Software Development
  - IT Services and IT Consulting
  - Computer and Network Security
  - Industrial Machinery Manufacturing, and other manufacturing sub-industries
  - Business Consulting and Services
  - Accounting
  - Law Practice, Legal Services
  - Financial Services, Insurance
  - Transportation, Logistics, Supply Chain and Storage
  - Environmental Services
- **Exclusions:**
  - Advertising Services, Marketing Services, Public Relations and Communications Services. That
    audience belongs to cell D, and the two audiences must not see each other's copy.
  - Employees of the seven competitors and of current clients. `[NEEDS DATA: current client list]`
- **Geography:** US first. Then CA and AU.
- **Settings:** Audience Expansion off. LinkedIn Audience Network off.

### 4.4 Measurement and decision rule

- **Cell A leads** arrive in LinkedIn, not on the site. They need a sync to GHL, carrying the
  campaign and creative IDs, or they sit unworked. `[NEEDS DATA: LinkedIn → GHL integration]`
- **Primary metric for both cells:** cost per **human-qualified** lead, scored by the same
  `qualifyLead` rule after the §1.6 fix. Secondary: booked walkthroughs.
  - A pre-filled in-platform form lowers friction. The hypothesis is that it raises lead count and
    lowers qualification rate. That is exactly why raw lead count is **not** the metric.
- **Fixed spend per cell:** S. `[NEEDS DATA: S, from B. LinkedIn's minimum daily campaign budget
  must be confirmed in the platform, not quoted from memory.]`
- **Decision at S.**
  - A cell whose cost per qualified lead is above the allowable figure in §0.1 stops.
  - If both are below it, continue the cheaper one into cell C.
  - If neither produced a qualified lead, LinkedIn stops and the money returns to Google.
- **Never declared a "winner"** on these counts.

---

## 5. Objection tables, then the CRO changes

**Status of this evidence.** Iris (01, B.1) found **no verbatim buyer language** anywhere: no call
notes, no enquiry free-text, no won/lost notes. Every objection below is therefore an **[I]
hypothesis**, drawn from the ICP, the competitor pattern and what the pages fail to say. Validate
them against the first 20 walkthrough calls (§5.5).

The "answered today" column cites what is on the page now, on this branch.

### 5.1 CEO, founder or owner

| What stops them booking | What answers it today | The work |
|---|---|---|
| "Is this AI hype, or a real discipline?" | Homepage FAQ "Can you guarantee AI recommendations? No." (`components/home/Faqs.tsx`). Sample prompts in the hero panel | **Partly.** Show one redacted page of a real snapshot: prompt, platform, date, answer, sources. That is the deliverable, and no competitor shows one (Iris A.4) |
| "Have you done this for firms like mine?" | **Nothing on the homepage.** No section names the 45 programmes or the B2B engagements. `grep` for `45`, `programmes` and `NDA` in `components/home/` returns nothing | **Empty.** Add a proof band near the BookCall section. Wording per `CLAUDE.md` §2, Ruth-gated: 45 named client programmes, KPIs labelled as targets, plus four B2B engagements under NDA in managed IT and cloud, cybersecurity and B2B SaaS, described as reported |
| "What will this cost?" | `/pricing`: "Fees, third-party costs and engagement terms" are in the proposal | **Partly.** No price is allowed (2026-10-03 note). Say **when** the fee arrives: "a written scope and fee within N days of the call". `[NEEDS DATA: N]`. Iris §0.3: four of the seven publish a price signal, so the call has to qualify instead |
| "Is the call a sales pitch? What happens on it?" | `/book`: "Bring your website, target buyers and current priorities" | **Empty.** Agenda, 30 minutes, who you speak to, what you leave with |
| "Who does the work?" | `/team` exists. Nothing on `/book` or `/contact` | **Empty** at the decision point. Name the person who takes the call. `[NEEDS DATA: who takes walkthrough calls]` |
| "Am I locked in?" | Nothing | **Empty.** `[NEEDS DATA: minimum term and exit terms]` |
| "Will you guarantee results?" | FAQ, answered honestly | **Answered.** Keep it |

### 5.2 CMO, VP or head of marketing

| What stops them booking | What answers it today | The work |
|---|---|---|
| "How will I report this upward?" | Homepage Evidence section: measures kept separate, with dates and limitations | **Partly.** Show a sample report layout. AI visibility, referral sessions and qualified enquiries in separate columns, never blended |
| "AI answers are random. How do you measure them?" | Snapshot section: "A sample of prompts is a sample" | **Partly.** The method exists in `CLAUDE.md` §1 (Scriblr stores raw answers, cited URLs and model versions) and is not on these pages. **This is the wedge.** Name it |
| "Is GEO just SEO rebranded?" | FourLayers section on the homepage | **Answered** |
| "Will this clash with my team or current agency?" | FAQ "What will you need from our team?" | **Partly.** Add a "working alongside your team or agency" answer |
| "Do you know my category?" | Industry pages exist for manufacturing, law, consulting and accounting. **No SaaS or cybersecurity page** (D3) | **Empty for SaaS and cyber.** Phase 3 waves |
| "Do you do paid as well?" | FAQ "Can you support PPC too?" | **Answered** |

### 5.3 Agency principal (white-label buyer)

| What stops them | What answers it today | The work |
|---|---|---|
| "Will you go around me to my client?" | **No page exists.** All candidate URLs return 404 | **Empty.** Non-solicit and NDA terms. `[NEEDS DATA: white-label terms]` |
| "Will my client see your name?" | Nothing | **Empty.** Unbranded deliverables and reports |
| "What's my margin?" | Nothing. No public prices | **Empty.** Partner pricing on the call |
| "Do you also sell direct to brands like my clients?" | Nothing, and the honest answer is yes | **Empty, and it is a policy decision before it is copy.** Operator: a channel-conflict rule |
| "Capacity and turnaround?" | Nothing | **Empty.** `[NEEDS DATA: SLAs]` |

**Finding.** The agency segment has no funnel at all. Every right-hand cell is empty. That is why
D4 holds paid to agencies.

### 5.4 Why none of the changes below is an A/B test

Two-proportion test, 80% power, 5% two-sided significance:

```
n per arm  ≈  16 · (1 − p) / (p · r²)
```

Here `p` is the baseline booking rate on the tested page and `r` is the relative lift worth
detecting. `p` is unmeasured (§1.1 makes the current figure unusable), so here is a bound that
needs no invented rate:

- **To detect a 20% relative lift:** `n = 400 · (1 − p) / p` per arm. Even at p = 50%, a booking
  rate no page achieves, that is **400 per arm, 800 visitors to one page**.
- **Organic search sent 198 clicks to the whole site** in the three months to 2026-10-03 (GSC,
  observed by MARS). Any realistic `p` multiplies the requirement several times over.
- **To detect a 50% relative lift:** `n = 64 · (1 − p) / p`. That still needs more traffic to a
  single page than the site gets, at any realistic rate.

So every change below ships as a **single-variable release**:

1. Fix the primary metric before release.
2. Read it before and after, and label it **directional**.
3. Pressure-test it qualitatively (§5.5).

Once paid traffic exists, re-run this arithmetic with the measured `p` and the actual sessions per
page. If, and only if, it clears, one page may run a real A/B.
`[NEEDS DATA: GA4 sessions per page, last 28 days, after §1.1 is fixed]`

### 5.5 What replaces the test

- **Microsoft Clarity is already installed** (`app/layout.tsx`, `CLARITY_ID`). Each week, watch
  every recording on `/book`, `/contact` and `/free-ai-audit` where the calendar loaded or the form
  was focused and no submission followed.
- **Five-user tests** with ICP-fit people (Rafael's network): "Book a call with this agency", think
  aloud, recorded.
- **Sales-call listening.** On every walkthrough, ask "What nearly stopped you booking?" and log the
  answer verbatim in GHL. This also fills Iris's buyer-language gap.

### 5.6 CRO changes, ranked by expected impact on booked walkthroughs

The ranking is reasoned, not measured. Item 0 is not CRO, but nothing after it can be read until it
is done.

| Rank | Page | Change | Hypothesis | Primary metric | Owner |
|---|---|---|---|---|---|
| 0 | Sitewide | §1 fixes: consent model, click IDs, `walkthrough_booked`, MQL intent gate | Without these, no change below can be measured or attributed | G2 and G3 pass | Luke, Anton |
| 1 | `/book` | (a) Add an agenda block above the calendar: 30 minutes, who you speak to, what you leave with, what to bring. (b) Demote the two primary-styled "Send an enquiry" buttons under the calendar (`app/book/page.tsx`, `bookingOptions`) to the single text link that already exists. (c) Pass UTMs and click IDs into the iframe (§2.4) | A visitor on `/book` has already decided. An unanswered "what is this call?" and a competing lower-intent button both lose bookings | `walkthrough_booked` ÷ `/book` sessions | Theo (copy), Mira |
| 2 | `/contact` | (a) Calendar inline beside the form (plan 1D, in progress). (b) Replace the H1 "Let's discuss your next opportunity" with the two choices in plain words. (c) Remove the duplicate `mailto` block (the email appears twice). (d) §1.6 MQL fix | The page ends the funnel. Offer both actions with no second page load, and don't make people hunt for the decision | (`walkthrough_booked` + `contact_submitted`) ÷ `/contact` sessions | Mira, Theo, Luke |
| 3 | `/free-ai-audit` (`/free-seo-audit` 308-redirects here, `next.config.mjs:151`) | (a) Resolve the contradictions. The H1 promises a report, the intro says "Discuss…", and only the metadata says 48 hours. (b) The form is primary here and "Book a call" secondary: this is the snapshot page, form-first by operator decision. (c) A redacted sample snapshot. (d) What happens after you submit, and when, **only if** the operator confirms the 48-hour commitment. (e) A short "not a fit" list from `CLAUDE.md` §2 | The paid 1C traffic arrives for the snapshot. A page that hedges on what you get, and when, loses the request | `contact_submitted` (`audit`) ÷ sessions, then booked walkthroughs ÷ snapshot requests | Theo, Mira. Operator on 48h |
| 4 | `/services/ai-seo` | (a) An above-the-fold CTA pair. Today the first booking CTA is in the aside (`page.tsx:242,282`), which stacks after the article on mobile. (b) A method block naming Scriblr and the stored-answer record. (c) The proof band from 5.1. (d) The closing `FunnelCTA` is `stage="mofu"` (`:288`) on a page paid traffic treats as BOFU. Set it to `bofu` | Paid C1 traffic lands here. It should not have to scroll past the full article to act, and the wedge should be visible | Conversions (either event) ÷ paid sessions | Mira, Theo |
| 5 | `/` | (a) The H1 "Get found. Get shortlisted. Build pipeline." is generic. The locked positioning H1 in `CLAUDE.md` §1 states the problem and leads to the snapshot. (b) The proof band (5.1). (c) The method line | Paid does not land here, so this ranks below the paid landing pages for this week. It matters most for referral traffic, which `CLAUDE.md` §3 says is about 100% of acquisition | Clicks to `#book` → `walkthrough_booked` ÷ homepage sessions | Theo, Ruth |
| 6 | `/pricing` | (a) An inline calendar. (b) "How you get a fee, and when" (5.1). (c) The "↗" on internal CTAs implies an external link. Remove it | A pricing visitor is evaluating. Answer "what next and when" without a price | `walkthrough_booked` ÷ `/pricing` sessions | Mira, Theo |

**Copy alternatives** for the two headlines that matter most this week. Drafts for Theo, not final;
Ruth gates.

- **`/book` H1** (now "Book a call"):
  - "A 30-minute walkthrough of what AI search says about you". Names the length and the content.
  - "Book your walkthrough". Short. It needs the agenda block to carry the meaning.
- **`/free-ai-audit` H1** (now "Get your AI Search Visibility Report."):
  - "See what AI search tells your buyers about you". Observation framing, honest about sampling.
  - "Request a human-reviewed AI visibility snapshot". Names the differentiator Iris found (A.2): none of the seven competitors' free diagnostics promises a dated output with the prompt set and models stated.

---

## 6. NEEDS DATA register

**Blocking spend**

1. Monthly test budget, and confirmation that paid is on (D0).
2. Average retainer, gross margin, expected retained months, walkthrough → signed close rate (§0.1).
3. Analyst hours per snapshot, and snapshots per week the team can deliver.
4. PPC management percentage and monthly minimum.
5. Google Ads account access and current conversion actions, if an account exists.
6. Keyword Planner volume and bid ranges, US, for every keyword in §3.2.
7. Google's current documented conversion-volume guidance for automated bidding.

**Blocking measurement**

8. GTM container export. Is there a duplicate GA4 config? Is the LinkedIn Insight Tag present? Do non-Google tags carry consent checks?
9. GHL custom field IDs for the five click IDs and `ga_client_id`.
10. `[UNVERIFIED]` Whether the LeadConnector booking widget records iframe URL parameters.
11. `[UNVERIFIED]` Whether Google accepts hashed-email offline uploads without on-page tag collection.
12. GA4 sessions per page, last 28 days, after §1.1 is fixed.

**Blocking LinkedIn**

13. A gated document asset for cell A.
14. LinkedIn → GHL lead sync.
15. LinkedIn minimum daily budget, from the platform.
16. Current client list, for exclusions.

**Blocking copy and CRO**

17. Days from walkthrough to written scope and fee (N).
18. Who takes walkthrough calls.
19. Minimum term and exit terms.
20. Operator confirmation of the 48-hour snapshot commitment.
21. White-label terms, SLAs and a channel-conflict rule (agency segment).
22. `[UNVERIFIED]` Third-party trademark restrictions in Google ad text (D5), and the AI Max setting name.
23. The H1 on `/services/ai-seo/answer-engine-optimization` on the deployed build.
24. Which locale landing pages are production-ready (wave C).
25. Verbatim buyer language. GHL message export and call notes (shared with Iris).
