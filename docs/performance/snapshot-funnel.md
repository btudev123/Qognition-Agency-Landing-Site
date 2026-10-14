# The snapshot funnel: hero panel to booked walkthrough

> **Superseded in part, operator 2026-10-14.** GoHighLevel and Upstash are removed. Leads are emailed to hello@ through Resend, and calls are booked through Cal.com on /book. Sections below that describe GHL or Upstash are kept for history.

Owner: Marcus (performance). Date: 2026-09-28. Branch: `b2b-ai-search`.
Status: funnel and measurement design. Form copy is draft and Ruth runs before it ships.

Reads: `CLAUDE.md` §2 (the locked ICP and the exhaustive disqualifier list), §3 (the funnel and the
North Star), §4 (claims), §8 (measurement), `components/home/HeroSnapshotPanel.tsx`,
`components/shared/LeadForm.tsx`, `components/LocalAuditExperience.tsx`,
`components/shared/CalBooking.tsx`, `lib/analytics.ts`, `lib/validation.ts`,
`lib/leadQualification.ts`, `app/api/lead/route.ts`.

---

## 0. The target

North Star, `CLAUDE.md` §3: **booked qualified walkthroughs per month.** Not snapshot requests.

- `[NEEDS DATA: monthly booked-walkthrough target]`
- `[NEEDS DATA: current snapshot requests per month]`
- `[NEEDS DATA: current snapshot request to booked walkthrough rate]`
- `[NEEDS DATA: sessions on `/` and `/free-ai-audit`, last 28 days]`

All four are unknown to me. There is no analytics export in this repository and, per §2 below, the
North Star event is not implemented, so the third one does not currently exist anywhere to be
exported. Every figure below that would otherwise be a rate is therefore a `[NEEDS DATA]` and not an
estimate.

---

## 1. The objection table

This comes before any layout change. Two columns: what stops this visitor converting, and what on
the page answers it. **Empty right-hand cells are the work.** A redesign proposal without this table
is a guess with a mockup attached.

### 1.1 At the hero panel (`components/home/HeroSnapshotPanel.tsx`)

| What stops them | What answers it today | Verdict |
|---|---|---|
| "This is another AI marketing pitch" | The panel shows verbatim buyer prompts and invites the reader to paste one into ChatGPT themselves. Reproducibility is the proof | **Answered, and it is the strongest thing on the page** |
| "You have no idea what my business is" | Four sector chips: Manufacturing, Legal, IT and MSP, Logistics | **Partly.** The taxonomy has 15 meta-verticals. A CFO at a 3PL sees themselves; a specialty chemicals manufacturer sees "Manufacturing" and three CNC prompts that are not theirs |
| "What will this cost me" | "no email required to look" on the panel, "Free AI visibility snapshot" in the header rule | **Answered** |
| "What do I actually get" | "Your prompt set, your competitors, named and dated", plus the four-step bar | **Answered** |
| "When do I get it" | The 48 figure | **Answered, and it is a commitment. See §2.4: it is currently uninstrumented** |
| "What is the catch, what happens to my email" | Nothing on the panel | **Empty. This is work.** The link goes straight to a form. One line on what happens after submission belongs either here or immediately above the form |
| "Is this a real company" | Nothing in the panel | **Empty**, and possibly correct to leave empty if the rest of the page carries it. `[NEEDS DATA: does the homepage below the fold carry proof? Out of my scope this pass]` |
| "I only want paid media, this is all about AI search" | Nothing | **Empty, and it is the expensive one.** `CLAUDE.md` §2 says a firm that wants only PPC is fully in the ICP. The panel makes AI search the entry condition. See §3 |

### 1.2 At `/free-ai-audit` (`components/LocalAuditExperience.tsx`)

| What stops them | What answers it today | Verdict |
|---|---|---|
| "Show me what the deliverable looks like" | Nothing. A four-bullet list of what will be looked at | **Empty, and it is the highest-value gap in the funnel.** A redacted page of a real snapshot answers it in one screen |
| "How long is this form" | The form is five visible fields plus a collapsed `<details>` containing three selects | **Partly, and the shape is wrong.** See §4 |
| "Will you spam me" | A privacy link in the footnote and an unchecked marketing opt-in | **Answered** |
| "Who is going to read it" | "human-reviewed" in the intro | **Partly.** Named is better than "human" |
| "What if we are not a fit" | Nothing | **Empty.** Stating who this is not for raises conversion among those who are, and it is the honest half of §2's disqualifier list |
| "Is 48 hours real" | The page says "within 48 hours". The hero panel says 48 hours | **Consistent, which is the important part.** The panel comment in `HeroSnapshotPanel.tsx` correctly flags that changing one changes a service commitment |
| "What happens after I submit" | The success state offers a booking link | **Answered on submit, not before.** Moving it before submit costs nothing and removes an unknown |

### 1.3 At the booking step (`components/shared/CalBooking.tsx`)

| What stops them | What answers it today | Verdict |
|---|---|---|
| "I do not want a sales call" | Nothing names what the call is | **Empty.** "Walkthrough" is our word. The visitor needs the agenda, the length and who is on it |
| "I want to see the snapshot first" | Nothing sequences the two | **Empty, and it is a sequencing decision, not a copy fix.** See §6 |
| "20 minutes of what" | Nothing | **Empty** |

Six empty cells. None of them needs a redesign. All six are copy or sequencing, and that is the
finding: the funnel's problem is not its layout.

---

## 2. Check the measurement before trusting any number from this funnel

Five defects, all verified in the code. Until they are fixed, any conversion rate quoted from this
funnel is worse than no number, because it will get acted on.

### 2.1 The North Star event does not exist

`CLAUDE.md` §8 says `walkthrough_booked` is "server-side only, from the GoHighLevel webhook". There
is no inbound GoHighLevel webhook. `app/api/` contains `audit`, `health`, `integrations/status`,
`lead`, `ph` and `revalidate`. `grep` for `walkthrough_booked` across the repository returns nothing.

**The metric the whole site is optimised for is not recorded anywhere.** Everything downstream of
the form is currently invisible.

### 2.2 None of the five declared events is implemented

§8 lists `snapshot_started`, `snapshot_completed`, `walkthrough_booked`, `audit_purchased` and
`contact_submitted`, "defined once in `lib/analytics.ts`". `lib/analytics.ts` defines transport
functions and no event names at all. The events actually fired anywhere in the codebase are
`lead_submit_attempt`, `lead_submit_success`, `cta_click`, `sticky_cta_click`, `booking_widget_view`
and `whatsapp_click`.

So §8 describes an intended schema and the code implements a different one. Neither is wrong; they
have simply never been reconciled. §5 proposes the reconciliation and flags the one naming collision
as an operator decision rather than picking silently.

### 2.3 No click ID is captured

`gclid`, `wbraid`, `gbraid`, `msclkid` and `li_fat_id` appear nowhere in the repository. `CLAUDE.md`
§8 requires them. Consequence for this funnel specifically: if paid ever runs, a booked walkthrough
cannot be attributed to the click that produced it. Full detail in `b2b-paid-structure.md` §1.1.

### 2.4 The 48-hour commitment is uninstrumented

The hero panel renders 48 as a service commitment and its own comment says so. Nothing measures
whether the snapshot was actually delivered inside 48 hours, because nothing records delivery at all.
The commitment on which the whole offer rests has no record. See `snapshot_delivered` in §5.

### 2.5 The qualification rule contradicts the locked ICP

`lib/leadQualification.ts` grades MQL on `employee_band` in `['20-99','100-300']` or `revenue_band`
in `['3m-10m','10m-50m','50m-500m']`. The ICP locked on 2026-09-28 is **20 to 10,000+ staff and $3M
to $1B+**. A firm answering `301+` and `over-500m` fails **both** tests and is graded below a
mid-market firm. `CLAUDE.md` §2 explicitly says firms above the band stay eligible.

Worse, both fields live inside a `<details>` element in `LeadForm.tsx` that is closed by default, so
most leads never supply them at all and are graded `Lead` regardless of who they are.

And `service` in `lib/validation.ts` is still the retired spoke enum
(`marketing | tech | finance | automation | unsure`). There is no way to record whether the lead
wants AI SEO, SEO or PPC, which is the ICP's actual qualifying axis.

---

## 3. The path, end to end

```
Hero panel  →  /free-ai-audit  →  4-field form  →  post-submit qualifier  →  confirmation
            →  snapshot delivered inside 48h  →  walkthrough booked  →  scoped proposal
```

Three changes to the path, in priority order.

**3.1 Carry the sector from the panel to the form.** The visitor already told us their sector by
clicking a chip. Today that click is untracked and discarded, and the form then asks them nothing
about it. The chip click should set a query parameter that pre-fills the form's need and sector
context, and should fire an event (§5). This is the cheapest qualification signal on the site and it
is currently thrown away.

**3.2 Add "paid media" as a visible first-class entry.** `CLAUDE.md` §2: "Do not write copy that
requires a prospect to want AI search before we will talk to them." The hero panel currently does
exactly that, because AI search is its entire subject. The fix is not to dilute the panel, which is
the best asset on the page. The fix is a second, quieter entry point that a PPC-only prospect can
take without feeling they are in the wrong building, plus the need selector in §4. Where that entry
point lives is a homepage layout decision and belongs to Elena and Mira, not to me. What I am
specifying is that the need must be **captured**, whatever the layout.

**3.3 Sequence the booking against the deliverable, deliberately.** Today the success state offers a
booking link immediately and the snapshot arrives up to 48 hours later. Those two compete. The
walkthrough is more valuable after the prospect has read the snapshot, and the snapshot is the reason
to attend. See §6.

---

## 4. The form

**Four visible fields. The rest is asked after capture, not before.** Email first, qualify later. A
lead that already exists costs nothing to ask a second question of; a lead lost to a long form costs
everything.

### 4.1 The four

| # | Field | Type | Why it earns a slot |
|---|---|---|---|
| 1 | Name | text, required | The snapshot is delivered by a human with a name, to a human with a name. Also required by `contactSchema` today |
| 2 | Work email | email, required | The deliverable channel and the durable record |
| 3 | Company website | url, **required** | **The snapshot cannot be produced without it.** It is also the qualification engine: B2C, pre-revenue, low-ticket and consumer business models are all readable from the site by the human who reviews it. Asking "are you B2B?" is asking the prospect to do work we can do better ourselves |
| 4 | What should we look at first? | single select | **AI search visibility · Google SEO · Paid media (PPC) · Not sure.** This is the ICP gate from `CLAUDE.md` §2, and it is the field the schema cannot currently express. It also routes the lead and tags the reporting |

Field 3 is the one that does the unusual amount of work. Because a human produces the snapshot inside
48 hours, we can disqualify on business model by reading the site, which frees the slot that a
"business model" select would otherwise take. That is the whole reason four fields is achievable.

### 4.2 Asked after capture, on the success screen

Two single-selects rendered above the booking embed, patching the existing lead record. Skippable.
Because the lead is already captured, these carry **zero conversion risk**, which is precisely why
they belong here rather than behind a collapsed `<details>` on the form.

| Question | Options | What it decides |
|---|---|---|
| Roughly how big is the firm? | Under $3M · $3M to $10M · $10M to $50M · $50M to $250M · $250M to $1B · Over $1B · Prefer not to say | Feeds `revenue_band`. Bands must be rewritten to match the locked ICP; the current enum tops out at `over-500m` |
| What is prompting this now? | We are choosing a partner now · Planning next quarter · Researching · **We need leads this week** | Timeframe, plus the single most useful disqualifier on the site. See §7 |

### 4.3 Required code changes

- `lib/validation.ts`: replace `spokeSchema` with a need enum (`ai-search | seo | ppc | unsure`).
  The spoke names are retired per `CLAUDE.md`, and keeping them means paid leads arrive tagged
  `marketing`.
- `lib/validation.ts`: widen `employee_band` and `revenue_band` to the locked ICP bands.
- `lib/leadQualification.ts`: `301+`, `over-500m` and everything between must **pass**, not fail.
  Firms above the band route to a qualification call per `CLAUDE.md` §2; they do not get downgraded.
- `LeadForm.tsx`: move the qualification selects out of `<details>` and into the post-submit step.
- A `PATCH` path on `/api/lead`, or a second small endpoint, for the post-submit answers. It must
  respect the same rate limit and the same `duplicate` semantics.

---

## 5. Events

Designed **against** `lib/analytics.ts`, not around it. The transport layer there is correct and
stays: `track()` pushing to dataLayer with an optional Meta mirror sharing a dedup `eventID`,
`hasConsent()` gating, and the `newEventId()` generated before the network call. None of that
changes.

What is missing is that **no event name is defined anywhere**. `CLAUDE.md` §8 says they are "defined
once in `lib/analytics.ts`" and they are not. Add the union, and make `track` accept only it:

```ts
// lib/analytics.ts

/** The complete site event vocabulary. snake_case. CLAUDE.md §8. */
export type SiteEvent =
  // Snapshot funnel
  | 'snapshot_sector_selected'   // hero panel chip. New.
  | 'snapshot_started'           // first interaction with the audit form. New.
  | 'lead_submit_attempt'        // implemented
  | 'lead_submit_success'        // implemented
  | 'snapshot_qualified'         // post-submit selects answered. New.
  | 'snapshot_delivered'         // SERVER-SIDE. The 48h commitment. New.
  | 'walkthrough_booked'         // SERVER-SIDE, GHL webhook. CLAUDE.md §8. Not implemented.
  | 'walkthrough_routed_away'    // SERVER-SIDE. A disqualifier fired. New.
  | 'audit_purchased'            // CLAUDE.md §8. Not implemented.
  // Navigation and intent
  | 'cta_click'                  // implemented
  | 'sticky_cta_click'           // implemented
  | 'booking_widget_view'        // implemented. NEVER a booking. See CalBooking.tsx.
  | 'whatsapp_click';            // implemented

export function track(event: SiteEvent, params?: Record<string, unknown>, meta?: /* … */): void;
```

### 5.1 The events, with parameters

No `email`, `phone`, `name` or free-text `message` in any parameter. `CLAUDE.md` §8.

| Event | Fires | Params | Notes |
|---|---|---|---|
| `snapshot_sector_selected` | Hero panel chip click | `sector` | Currently untracked. It is the visitor self-declaring their vertical before any form |
| `snapshot_started` | First focus on a field in the audit form | `source_page`, `need`, `sector` | `lead_submit_attempt` is not this event. Started and attempted are different populations and the gap between them is the form's abandonment |
| `lead_submit_attempt` | Unchanged | `intent`, `source_page`, `locale`, plus `need` | Keep the name. Renaming breaks existing GA4 history and GTM tags |
| `lead_submit_success` | Unchanged | as above | Mirrors Meta `Lead` with the shared `eventID`. Already correct |
| `snapshot_qualified` | Post-submit selects submitted | `need`, `revenue_band`, `timeframe`, `eligibility` | `eligibility` is `qualifyLead`'s output, not a sales stage |
| `snapshot_delivered` | **Server-side**, when the report is sent | `need`, `hours_elapsed` | Makes the 48-hour commitment measurable for the first time. `hours_elapsed` is measured, not claimed |
| `walkthrough_booked` | **Server-side**, GoHighLevel webhook | `need`, `eligibility` | The North Star. Requires the webhook route in §5.2 |
| `walkthrough_routed_away` | **Server-side**, on a disqualifier | `reason` | See §7. Counting these is how we learn which disqualifier actually costs us time |
| `booking_widget_view` | Unchanged | none | **Do not promote this to a booking.** The comment in `CalBooking.tsx` is load-bearing |

### 5.2 Server-side delivery

`walkthrough_booked`, `snapshot_delivered` and `walkthrough_routed_away` cannot fire in the browser.
The booking lives in an iframe the parent cannot read, and delivery happens hours later.

- New route: `app/api/webhooks/ghl/route.ts`, signature-verified in the same shape as
  `app/api/revalidate/route.ts` already verifies Sanity.
- Forward to GA4 via the Measurement Protocol.
  `[NEEDS DATA: GA4 API secret and measurement ID confirmed present and non-empty in Vercel. The
  project memory records env vars registered with empty values that silently broke integrations, so
  verify rather than assume.]`
- `/api/lead` already returns `duplicate`. The webhook handler must be idempotent on the booking id
  for the same reason.

### 5.3 The one naming collision, flagged not decided

`CLAUDE.md` §8 declares `contact_submitted`. The code implements `lead_submit_success`. They are the
same moment. **Operator decision:** either amend §8 to name `lead_submit_success`, or add
`contact_submitted` as a GTM-side alias and accept two names for one event. I am not renaming a live
event to match a document, because that silently breaks GA4 continuity and every existing tag.

---

## 6. The booking sequence

The snapshot arrives up to 48 hours after submission. The booking link is offered at second zero.
Those two compete for the same intent and today nothing decides between them.

Two defensible designs. This is an operator decision because it trades volume against quality, and
the right answer depends on a number nobody has.

**Option A, book immediately.** Maximum booking volume. Some of those calls happen before the
prospect has seen anything, which makes the walkthrough a cold sales call wearing a different name,
and the snapshot becomes a leave-behind.

**Option B, book from the delivery email.** The snapshot is the reason to attend and the call has
something to walk through. Fewer bookings, better ones, and the North Star is *qualified*
walkthroughs.

`[NEEDS DATA: booking rate at the success screen versus from the delivery email. Neither is measured
today, because §2.1 means no booking is measured at all.]`

Until that is measured, my recommendation is **both, sequenced**: keep the success-screen booking for
the prospect who is ready now, and make the delivery email's primary action a booking for everyone
who was not. That is not a hedge. It is the only option that generates the data to choose between A
and B, and it costs one email template.

---

## 7. Disqualifiers and where they route

`CLAUDE.md` §2 now states the list as **exhaustive**: "Not a fit, and these are the only
disqualifiers". Two consequences that are easy to get wrong.

**Industry is never a disqualifier.** The 15 verticals are a route to market. A well-fitting lead
from an unlisted industry is a lead.

**Being too big is never a disqualifier.** Firms above the band route to a qualification call. The
current `qualifyLead` does the opposite (§2.5).

| Disqualifier | Detected where | How | Routes to |
|---|---|---|---|
| Pre-revenue | Human review of the company website, plus the revenue band if answered | Field 3 does the work. A pre-revenue firm is usually obvious from its own site | Polite decline. No walkthrough slot. `walkthrough_routed_away` with `reason: 'pre-revenue'` |
| B2C | Human review of the company website | Read the site. Do not ask the prospect | Polite decline |
| Low-ticket transactional | Human review of the website, confirmed on the call | Pricing page or product set shows it | Polite decline |
| **Needs leads this week** | **The form.** Post-submit question 2, option 4 | Self-declared | **Route away before a slot is booked.** This is the one that most deserves to be caught at the form, because it consumes a walkthrough and cannot be satisfied: `CLAUDE.md` §1 sells a compounding programme with a three-month horizon |
| Wants a one-off project | The walkthrough | Cannot be read from a website and is badly served by a form option, which invites the prospect to lie to themselves | Discussed on the call. Offer the paid audit, which `CLAUDE.md` §3 positions as exactly this entry point |
| Cannot edit their own website | The walkthrough | Requires a real answer about their stack and their agency relationship | Discussed on the call. Frequently solvable, so not an automatic no |
| No sales process that follows up | The walkthrough | Only a conversation reveals it | Discussed on the call. **This is the most expensive one to discover late**, and it is the one no form can catch |

**The form catches one disqualifier. The website review catches three. The call catches three.** That
is the correct split, and it is why the form stays at four fields: three of the seven disqualifiers
are simply not form-answerable, and adding fields to chase them would cost conversions without
catching anything.

One thing worth saying on the page rather than only in the CRM: a short "this is not for you if"
block at `/free-ai-audit` answers the empty objection-table cell in §1.2 and pre-qualifies at zero
cost. Honest disqualification raises conversion among the people who remain.

---

## 8. Test design, and the test I am refusing

The obvious proposal is an A/B test on the hero panel or the audit page. **At this site's traffic it
almost certainly cannot reach significance, and I would rather say so now than after six weeks.**

The arithmetic, for a two-proportion test at 80% power and 5% two-sided significance:

```
n per arm  ≈  16 · (1 − p) / (p · r²)
```

`p` is the baseline conversion rate, `r` the relative lift worth detecting. Worked, so the operator
can substitute real numbers the moment they exist:

| Baseline `p` | Relative lift `r` | Sessions per arm | Total sessions |
|---|---|---|---|
| 2% | +20% | ~19,600 | ~39,200 |
| 2% | +50% | ~3,140 | ~6,300 |
| 5% | +20% | ~7,600 | ~15,200 |
| 5% | +50% | ~1,220 | ~2,440 |

`[NEEDS DATA: baseline conversion rate and monthly sessions on `/` and `/free-ai-audit`. Without
both, the only honest statement is the conditional one.]`

`CLAUDE.md` §3 says plainly that "at current volumes the site cannot produce clients this quarter"
and puts acquisition through referral, partnerships and outbound. A site in that position does not
have 39,200 sessions to spend on detecting a 20% lift. Detecting only a 50% lift is possible at lower
volume, but a 50% relative lift on a hero panel is not a realistic prior, so a test powered only for
that is a test designed to return "no significant difference" whatever happens.

**Therefore: no A/B test on this funnel until the volume exists.** And when a test is run, the
primary metric is fixed before launch, the sample size is calculated before launch, and it is not
stopped early because it is winning.

### 8.1 What to do instead

Five users watched properly beats an underpowered test read as a result.

1. **Five moderated tests** with real ICP operators, ideally from the referral base since that is
   where acquisition actually comes from. Task: "you have heard AI assistants recommend vendors.
   Find out whether yours does." Watch where they stop. `[NEEDS DATA: recruit five]`
2. **Session recordings on `/free-ai-audit`**, specifically field-level abandonment. The five-field
   plus collapsed-accordion form in §4 is the hypothesis; recordings confirm or kill it in a week.
3. **Listen to the walkthrough calls.** The six empty cells in §1 are objections, and objections are
   spoken on calls before they are ever inferred from a funnel chart. This is the cheapest and most
   neglected input available.
4. **An exit question on `/free-ai-audit`**, one line, for people who leave without submitting.
5. **Instrument first.** `snapshot_started` versus `lead_submit_attempt` (§5) gives the form
   abandonment rate directly. That is a measurement, not a test, it needs no sample size, and it
   answers the main open question about the form.

---

## 9. NEEDS DATA register

Blocking any funnel number at all:

1. The GoHighLevel webhook and `walkthrough_booked` (§2.1). Nothing downstream of the form is
   measured until this exists.
2. GA4 Measurement Protocol credentials confirmed non-empty in Vercel (§5.2).
3. Monthly sessions on `/` and `/free-ai-audit`, and the current form conversion rate.

Blocking the funnel design:

4. Monthly booked-walkthrough target and current volume.
5. Booking rate at the success screen versus from the delivery email (§6).
6. Five ICP participants for moderated testing (§8.1).

Operator decisions surfaced:

7. `contact_submitted` versus `lead_submit_success`. Amend `CLAUDE.md` §8, or alias (§5.3).
8. Booking sequence, option A or B or both (§6).
9. Where the paid-media entry point lives on the homepage (§3.2). Layout, so Elena and Mira.
