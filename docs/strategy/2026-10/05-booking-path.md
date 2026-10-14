# 05 · Booking path: make the GHL calendar appear fast and reliably

> **Superseded in part, operator 2026-10-14.** GoHighLevel and Upstash are removed. Leads are emailed to hello@ through Resend, and calls are booked through Cal.com on /book. Sections below that describe GHL or Upstash are kept for history.

Owner: Marcus (performance). Date: 2026-10-07. Branch: `codex/sitewide-b2b-funnels`.
Implements: Mira (`frontend-dev`). Gate: Owen on the code, Ruth on the one line of visible copy.
Status: read-only audit. No code edited.

**Target.** North Star, `CLAUDE.md` §3: booked qualified walkthroughs per month. No numeric target
on file `[NEEDS DATA: monthly booked-walkthrough target]`. The calendar is the primary conversion,
so a calendar that is invisible for 4 to 8 seconds is a conversion defect, not a polish item.

**Scope, narrowed by the operator on 2026-10-07:** "make just one form or a booking call widget,
that's it." `/book` becomes the calendar only. `/contact` becomes the enquiry form only, plus one
"Prefer to talk? Book a call" link. The options comparison (hosted page, popup, survey, chat) was
stopped and is not in this file. This file covers one component: `components/shared/CalBooking.tsx`.

---

## 1. What is happening

### Observed

By MARS in real Chrome, desktop, production `https://www.qognitionagency.com/book`, 2026-10-07,
stored consent analytics and advertising true. Production is still the old code (header reads
"Let's talk"), so the page layout below is production's, not this branch's.

| Observation | Value |
|---|---|
| Iframe initial state | `id="ghl_embed___1"`, `opacity:0`, `visibility:hidden`, `left:-9999px` |
| Time to visible, warm reload | 3,651 ms after navigation |
| Time to visible, another reload | 7,646 ms |
| Time to visible, first load | still hidden at 5 s |
| Booking iframe document fetch | about 391 to 2,719 ms |
| Calendar position on production `/book` | about 1,160 px down, below four option cards |
| Headless Chromium, earlier run | hidden in 3 of 3 runs |
| Mobile timing | `[NEEDS DATA: real mobile timing, iOS Safari and Android Chrome at 390 px]` |

### Read from GHL's own script

`form_embed.js` (fetched 2026-10-07 from `https://link.msgsndr.com/js/form_embed.js`,
`last-modified: Thu, 03 Sep 2026`, minified, so names below are behaviour, not documented API):

1. On start it finds every iframe whose `src` contains `/booking`, sets
   `data-initial-iframe-hidden="true"` on it and **hides it**: `opacity:0`, `visibility:hidden`,
   `left:-9999px`, `position:absolute`. That is exactly the state MARS observed.
2. It un-hides the iframe only when **both** of these have happened:
   - the booking app inside the iframe has posted a `fetch-query-params` message to the parent and
     the script's `message` listener received it, and
   - iframe-resizer has reported a first height.
3. If the iframe already carries `data-initial-iframe-hidden="true"` when the script starts, the
   hide step is skipped. Resizing and the query-params handshake still run.
4. In the handshake it forwards to the booking app the parent page's full query string, the parent
   URL and `document.referrer`, and keeps `utm_*` in `sessionStorage` key `UPS`. This is the only
   path by which a UTM on our page can reach GHL from the inline embed.

### So the lazyOnload race is real, and it is two problems

`CalBooking.tsx:38` loads the script with `strategy="lazyOnload"`, which waits for the window
`load` event and then for browser idle. The window `load` event waits for subframes, so it waits
for the GHL iframe's own document.

- **Slow.** Nothing can reveal the calendar until the whole page, including the iframe, has
  loaded, the browser is idle, and the script has been fetched. Only then does the script hide the
  iframe and start waiting for the handshake. The 3.7 to 7.6 s MARS measured fits that order.
  `[UNVERIFIED: the per-step breakdown. This is inferred from the script, not traced.]`
- **Sometimes never.** If the booking app posts `fetch-query-params` before the listener exists,
  the message is lost and the iframe stays hidden. That fits the 3-of-3 headless result, where
  everything is fast. `[UNVERIFIED: whether the booking app ever re-sends the message. The script
  has an "iframeLoaded" handler that re-initialises, but I could not confirm the app sends it.]`

Loading the script earlier narrows the race but does not remove it, because the iframe starts
fetching as soon as the HTML is parsed. `beforeInteractive` is not usable here: in the App Router
it only works from the root layout, which would load a third-party script on every page in every
consent region. The reliable fix is to stop the script hiding the iframe at all.

---

## 2. The change to `components/shared/CalBooking.tsx`

Four edits. The `booking_widget_view` effect and its comment at lines 15-20 stay exactly as they
are: a widget view is not a booking (`CLAUDE.md` §8).

| # | Line(s) now | Change | Why |
|---|---|---|---|
| 1 | 32-37, the `<iframe>` | Add `data-initial-iframe-hidden="true"` | The script skips its hide step, so the calendar paints as soon as GHL's own page renders. Resizing still runs |
| 2 | 35-36, `scrolling="no"` and `overflow: 'hidden'` | Remove both. Keep `width: '100%'`, `minHeight`, `border: 'none'`. Drop `height: '100%'` (the parent has no height, so it does nothing) | If the resizer never attaches (script blocked, client-side navigation after it already ran), the calendar scrolls inside its frame instead of clipping the confirm button. iframe-resizer already turns scrolling on when it attaches (`scrolling: true` in GHL's config) |
| 3 | 38, `strategy="lazyOnload"` | `strategy="afterInteractive"` | The listener is registered seconds earlier, so the handshake that carries UTMs and the auto-height is far less likely to be missed. `next/script` still loads it once per session |
| 4 | 39, the "Open the calendar in a new tab" link | Move it **above** the iframe and keep it always visible. Copy for Ruth: "Calendar not showing? Open it in a new tab." | Today it sits below a 620 to 680 px block, off-screen on a phone, which is where it is needed. Always-visible is simpler than a timer and cannot fail |

Optional fifth edit, same file: call `preconnect('https://api.leadconnectorhq.com')` from
`react-dom` at the top of the component, so the connection to GHL opens before the iframe asks
for it. Cheap. Its effect on the 391 to 2,719 ms fetch is `[UNVERIFIED]` until measured.

**The risk in edit 1, stated plainly.** `data-initial-iframe-hidden` is an internal attribute of a
minified third-party script, not a documented GHL option. GHL can rename it in any release. If it
does, behaviour falls back to today's (hidden until handshake), not to something worse, and the
always-visible link in edit 4 still gets a visitor to a slot. Test plan step 6 catches it.

**What this does not change.** Bookings still never reach `/api/lead`, and `walkthrough_booked`
still does not exist: there is no GHL webhook route in `app/api/`. Attribution on a booking
depends on GHL storing the forwarded UTMs, which is `[UNVERIFIED]`. The new-tab link carries no
parent UTMs at all. Click IDs (`gclid`, `wbraid`, `gbraid`, `fbclid`, `li_fat_id`, `msclkid`) are
captured nowhere in this codebase, and `appendFunnelContext` drops UTMs on the way to `/book`.
Those are separate work and do not block this fix.

---

## 3. The one GHL setting

**Clear the Facebook Pixel ID in the discovery-call calendar's settings** (Calendars, edit the
calendar, pixel field, delete, save). Third-party GHL tutorials place the field there and say it
fires a Meta `Schedule` event on booking; I could not open GHL's own help page to confirm the
current menu path `[UNVERIFIED: exact menu path in the current GHL UI]`.

Why: the iframe loads `connect.facebook.net/fbevents.js` regardless of our consent banner, because
our consent gate cannot reach inside it. That is a consent defect in every opt-in region (EEA, UK,
Switzerland and the rest, per the 2026-10-06 decision). Consequence the operator should accept
knowingly: Meta loses GHL's browser-side `Schedule` event. The replacement is server-side, from the
GHL appointment webhook, consent-checked, which is the `walkthrough_booked` route not yet built.
If a pixel still loads after the field is cleared, it is coming from a sub-account or location-level
tracking setting `[NEEDS DATA: whether one exists]`.

---

## 4. Test plan

The preview build replaces the calendar with a placeholder (`NEXT_PUBLIC_QOGNITION_PREVIEW=1`), so
this needs a non-production deployment with that flag unset. The live calendar can create real
appointments: **testers load and look, they do not book.** The operator approves that deployment
before it exists.

| # | Test | Pass |
|---|---|---|
| 1 | Hard load `/book`, desktop Chrome, 5 runs. Log, every 100 ms, the iframe's computed `visibility` and `getBoundingClientRect().left` | Never `hidden`, never `left < 0`. Time to visible GHL content recorded per run against the 3,651 / 7,646 ms baseline |
| 2 | Same on iOS Safari, Android Chrome, LinkedIn in-app and Instagram in-app browsers, 390 px | Same pass. Fills `[NEEDS DATA: real mobile timing]` |
| 3 | Client-side navigation: homepage, then header "Book a call" to `/book` | Calendar visible. Either auto-sized, or scrolls inside its frame with the time slots and confirm step reachable |
| 4 | Block `link.msgsndr.com` in DevTools, reload | Calendar visible and usable by scrolling inside the frame |
| 5 | Fallback link at 390 px | Visible without scrolling on `/book`. Opens the hosted calendar in a new tab |
| 6 | Load `/book?utm_source=test&utm_medium=test` and check the `query-params` postMessage in DevTools | Message sent with the UTMs. If the iframe is hidden at any point in test 1, GHL has changed the attribute: revert to fallback-link-first and tell Marcus |
| 7 | After the pixel field is cleared, Network tab filtered to `facebook` on `/book`, opt-in region | No request to `connect.facebook.net` from the iframe |
| 8 | Homepage `#book` and `/contact` (until the form-only change lands) | Same pass as test 1, since both render `CalBooking` |

No A/B test. This is a defect fix: the control state is a calendar that is invisible for seconds,
and nobody should be randomised into that.
