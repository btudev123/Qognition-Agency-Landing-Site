# Privacy notice: DRAFT for counsel review

> **Superseded in part, operator 2026-10-14.** GoHighLevel and Upstash are removed. Leads are emailed to hello@ through Resend, and calls are booked through Cal.com on /book. Sections below that describe GHL or Upstash are kept for history.

| | |
|---|---|
| Status | DRAFT. Not legal advice. Not approved. Not published. |
| Prepared by | Jonas (platform), 2026-10-07 |
| Reader | External privacy counsel, and Anton (secops), who refused production sign-off on 2026-10-07 until the notice matches the consent model |
| Replaces | `app/legal/privacy/page.tsx`, "Last updated: September 24, 2026" |
| Live page status | `app/legal/privacy/page.tsx` was updated on 2026-10-14, **ahead of counsel review**. The operator asked MARS to do everything, and the live page went ahead of this draft. **Pending operator confirmation** that this was intended. Counsel should review the live text (sections 1 and 4 of the page carry the new consent, GPC and click code wording) as well as this draft, and this draft is the fuller version for counsel to approve or correct. |
| Consent policy version in code | `CONSENT_POLICY_VERSION = '2026-10-14'` (`lib/consent.ts`) |
| Code state | First written 2026-10-07 while the working tree was changing. Sections on consent, GPC, click codes and attribution were updated on 2026-10-14 from a fresh read of `app/legal/privacy/page.tsx`, `lib/consent.ts`, `lib/clickIds.ts`, `lib/analytics.ts` and `app/api/lead/route.ts`. Nothing was run: no tests, no browser trace. Statements below are from reading the source. Finding 1 below now states the current GPC behaviour. Findings 2 and 6, and the GoHighLevel and Upstash rows elsewhere, describe systems removed on 2026-10-14 and are kept for history. |

## How to read this document

Everything stated as fact was read in the working tree on 2026-10-07 (branch `codex/sitewide-b2b-funnels`, uncommitted). File paths are given so counsel or Anton can check any line. Where a fact cannot be confirmed from code, it is marked `[UNVERIFIED: ...]`. Where the business has to supply it, it is marked `[NEEDS DATA: ...]`. Nothing has been invented to fill a gap.

The proposed notice (section A) may only describe what the site actually does on the day it is published. The code changed while this draft was written, so the findings below record both what was found at the start and what the tree says now. Items 1 and 2 of the brief (GPC, ledger TTL) have landed uncommitted; items 3 to 6 are new findings that shape what the notice may say.

## 0. Findings that shape the notice

| # | Finding | Evidence | Effect on the notice |
|---|---|---|---|
| 1 | **Global Privacy Control now beats a stored choice for advertising, in all three places.** (Updated 2026-10-14. The first version of this draft said a stored explicit choice won over GPC in the browser. The code now does the opposite.) What the code does: (a) in the browser, GPC forces advertising **off**, whether the visitor has no stored choice or has stored "Allow all" (`lib/consent.ts`, `effectiveConsent`); (b) in the inline Google Consent Mode script that runs before GTM and GA4 load, GPC sets `ad_storage`, `ad_user_data` and `ad_personalization` to denied whatever was stored or defaulted (`consentModeScript`, `consentStateFunction`); (c) on the server, `Sec-GPC: 1` on the form POST always withholds the Meta Conversions API event and, because click codes follow the same rule, drops the click codes from the enquiry (`app/api/lead/route.ts`, `advertisingAllowed`). Analytics is not affected by GPC in any of the three. The Consent Mode script and `effectiveConsent()` are tested against each other for every combination in `scripts/test-lead-funnel.cjs` `[UNVERIFIED: the test was not run for this draft]`. Still uncommitted, and not exercised in a browser. | `lib/consent.ts`; `app/api/lead/route.ts`; `scripts/test-lead-funnel.cjs` | The GPC paragraph in section A.3 describes this behaviour. The browser and server no longer disagree, so the old Q2(b) is settled by the code. Counsel to confirm it is the right rule (Q2). |
| 2 | **The ledger TTL is now in the working tree, uncommitted.** `LEAD_LEDGER_TTL_DAYS`, default 760 days, is applied to every receipt write, so each write refreshes the clock (retention is 760 days from the last update, not from creation). A set but invalid value makes the ledger misconfigured. `.env.example` is updated. 760 days is about 25 months, while the current page promises "business relationship plus 24 months". GoHighLevel retention is separate and not set in code. | `lib/leadLedger.ts` lines 26 to 40, 75 to 100; `.env.example` line 31 | Section A.9 states 760 days, with a `[NEEDS DATA]` for the production value of the variable. See Q10. |
| 3 | **A consent policy version bump discards every stored choice.** `readConsent()` accepts a stored choice only if its `policy_version` equals `CONSENT_POLICY_VERSION`. The version moved from `2026-09-24` to `2026-10-06`. A visitor in the US, Canada, Australia, UAE or Singapore who previously **rejected** tracking now has no valid stored choice and falls back to the region default, which is **on**. They see the banner again, but trackers run until they choose. | `lib/consent.ts` lines 10 to 17, 40 to 45; `git diff lib/consent.ts` | Counsel needs to decide whether this is acceptable. Engineering option: carry prior rejections forward. See Q11. (2026-10-14: the version moved again, to `2026-10-14`, with the same effect, so every earlier choice is asked again. The code comment gives the reason: ad click codes began to be kept for 90 days.) |
| 4 | **Consent evidence now distinguishes a choice from a default, and the server records country and GPC.** `consentEvidence()` sends `basis` of `explicit` or `region_default` and leaves `recorded_at` empty for a default. The server adds `country` (from `x-vercel-ip-country`) and `gpc` (from `Sec-GPC`) and writes all three into the GoHighLevel enquiry snapshot and note, into the internal email, and into an optional custom field (`GHL_CONSENT_BASIS_FIELD_ID`). Meta CAPI now fires only if advertising is true, GPC is absent, **and** the basis is explicit or the server itself resolves the country as opt-out. **So the visitor's country is now stored with each enquiry.** | `components/shared/LeadForm.tsx` line 75; `lib/consent.ts` `consentEvidence`; `app/api/lead/route.ts` lines 26 to 38; `lib/leadCrm.ts` lines 146, 153, 181; `lib/leadDelivery.ts` | Section A.3 and A.4 must say the country is recorded with the enquiry. My first version of this draft said it was not stored; that was wrong against the current code. The ROI calculator still sends no consent object, so its basis is `unknown` and CAPI is not sent for it. |
| 5 | **Documentation drift.** `CLAUDE.md` line 412 still describes `lib/consent.ts` as "Opt-in model, defaults to false until the visitor chooses". The code is the region-split model from the 2026-10-06 decision. | `CLAUDE.md` line 412; `lib/consent.ts` | Not corrected here. Flagged for the operator. The code matches the 2026-10-06 authority block, so the table row is the stale part. |
| 6 | **The Upstash email-derived key is a 45 second lock, not a record.** The key containing the HMAC of the email address is a lease that expires after 45 seconds and is deleted on release. The durable record is the receipt, keyed by an HMAC of the **submission reference**, and it holds no email, name or message. An earlier version of this draft described a long-lived hashed-email key. That was wrong. | `lib/leadLedger.ts` (`const ttl = 45_000`, `begin`, `release`) | Section 8, 9 and table D corrected. |

## A. Proposed notice text

> Everything between the horizontal rules below is the proposed public text. Text in `[square brackets]` is an instruction or a placeholder and must be resolved before publication. Plain English, no em dashes.

---

# Privacy Notice

Effective date: [NEEDS DATA: effective date, set when counsel approves]

## 1. Who we are

This notice explains how [NEEDS DATA: legal entity name] ("Qognition", "we", "us") handles personal information when you visit qognitionagency.com, send us an enquiry, or book a call.

Our registered address is [NEEDS DATA: registered address].

Our privacy contact is [NEEDS DATA: privacy contact]. You can also write to hello@qognitionagency.com.

[NEEDS DATA, counsel to decide: whether a data protection officer, a UK or EU representative (Article 27), or a Quebec person in charge of personal information must be named here, and their contact details.]

We sell AI search visibility services to businesses. This site is meant for business visitors. We do not knowingly collect information from children.

## 2. The short version

- If you send an enquiry or book a call, we keep what you give us so we can reply and assess whether we can help.
- Optional analytics and advertising tools collect information about how you use the site. Whether they start **on** or **off** depends on where you are. You can change this at any time with the "Privacy choices" button.
- If you allow advertising measurement and then send an enquiry, we send some details about you to Meta. This includes a scrambled (hashed) version of your email address and your phone number and name if you gave them. Section 6 explains.
- We use service providers to run the site. They are listed in section 8.

## 3. Your choices, and how we decide your starting point

The site has two optional categories:

- **Analytics:** Google Analytics, Google Tag Manager and Microsoft Clarity. They tell us which pages are used and, with Clarity, record how visitors move around pages (clicks, scrolling, and screen activity) so we can fix confusing pages. [CONFIRM with Anton before publishing: whether Clarity masks what you type into forms. This notice must not say so unless it is true.]
- **Advertising measurement:** Meta Pixel, and Meta's server-to-server Conversions API for enquiries. Keeping the ad click codes from Google, Microsoft and LinkedIn ad links, and sending them with an enquiry, is also covered by this choice (section 5.3). If we have turned on business visitor identification (section 5.4), that is covered by this choice too. The booking calendar is also covered by this choice (section 7).

Our hosting provider (Vercel) works out your approximate country from your IP address when a page is requested. We use that country to pick your starting point. We do not save it in your browser alongside your choice. When you send an enquiry, our server records the country our host detected, whether your setting was a choice you made or a starting point, and whether a Global Privacy Control signal was present, so we can show what applied when you contacted us. See section 4.

| Where you appear to be | Starting point before you choose |
|---|---|
| United States, Canada, Australia, United Arab Emirates, Singapore | Analytics and advertising measurement are **on**. You can turn them off at any time. |
| Everywhere else, including the European Economic Area, the United Kingdom, Switzerland, China and India | Analytics and advertising measurement are **off**. They start only if you turn them on. |
| We cannot tell where you are | **Off**, as for the second row. |

[COUNSEL: this table is the operator's decision of 2026-10-06 stated plainly. It is not a statement that the "on" starting point is lawful in each place. See section E.]

Your choice is saved in your browser (see section 10). If you reject something you had allowed, we delete the related cookies we can reach and reload the page so the tools stop. You can open "Privacy choices" from the button at the bottom left of any page and from the footer.

If your browser sends a Global Privacy Control signal, advertising measurement is **off** for as long as the signal is on, even if you chose "Allow all" or turned advertising on, and even in regions where it would otherwise start on. Your analytics setting is not changed by the signal. The same rule applies in your browser, in the Google Consent Mode setting we pass to Google, and on our server when you send an enquiry: with the signal present, we do not send the Meta Conversions API event and we do not keep your ad click codes with the enquiry. [This is the wording already on the live page (section 4), reworded. The code does this now. PUBLISH-CHECK: Anton to verify in a browser, and the change must be committed. COUNSEL: this settles the old Q2(b) in the code. Confirm the rule is the one you want. See Q2.]

The essential parts of the site (showing pages, saving your privacy choice, accepting an enquiry, protecting the forms from abuse) work without the optional categories.

We also pass the setting in effect to Google as "Consent Mode". If you have not allowed advertising, or your browser sends a Global Privacy Control signal, the Google tags in our container are told that advertising storage, advertising user data and ad personalization are denied.

## 4. Information you give us

When you use a form, we collect:

- your name, email address and company name;
- your company website, phone number and message, if you give them;
- business details we ask for so we can tell whether we are a fit: your role, company size band, revenue band, whether the company sells to businesses, your goal and your timeframe, where the form asks;
- which page and topic you came from;
- campaign details your browser kept, if your settings allow it (section 5.2 and 5.3): the campaigns and website that brought you, the first page you visited, and the ad click codes from Google, Microsoft and LinkedIn ad links. These appear in the email we receive. The click codes are included only if advertising measurement was allowed when you sent the form. Our server checks that again, and removes them if it was not;
- whether you asked for marketing email; the analytics and advertising settings in effect when you sent the form; whether you chose them or they were a starting point (and when, if you chose); the country our host detected; and whether a Global Privacy Control signal was present.

If you use the ROI calculator on the site, we collect your email address and the calculator summary you submit.

If you book a call, the booking is made on a page run by LeadConnector (GoHighLevel), which collects the details you enter there.

We reply to enquiries by email. When you send an enquiry we may send you one confirmation email. We do not send you marketing email unless you ask for it. [COUNSEL: confirm the confirmation email is transactional under CASL and the equivalents, and what sender identification and postal address it must carry. The code has an open TODO for the postal address: `lib/leadDelivery.ts` line 104.]

Please give us only your own details. If you give us someone else's email address, you should have their permission.

## 5. Information collected automatically

### 5.1 Information needed to run the site
Our hosting provider and our infrastructure process technical data such as your IP address, browser type and the pages requested, in order to deliver pages and protect the site. [NEEDS DATA: Vercel log retention for this project.]

When you send a form we keep a short-lived count in the memory of our server, keyed to a scrambled version of your email address and of your IP address, so that one person cannot send the same form repeatedly or flood us. It is not saved to a database. [CONFIRM with Anton: the in-memory store is per server instance and is cleared when the instance restarts. See `lib/auditRateLimit.ts`.]

### 5.2 Analytics (if on)
Google Analytics 4 and Google Tag Manager receive your page views, device and browser information, approximate location, referrer and the actions you take on the site. Microsoft Clarity records page interactions as described in section 3. We use them to understand which pages work and to improve the site.

We also keep the campaign that brought you to the site: the UTM tags in the link (first campaign and latest campaign), the path of the first page you visited (not the full address, so no query string) and the name of the referring website. Where it is kept depends on your advertising setting:

- **Analytics on, advertising off:** in your browser's session storage (`qognition_attribution_v2`). It ends when you close the tab.
- **Analytics on, advertising on:** in your browser's local storage (`qognition_attribution_durable_v1`), for 90 days after your latest ad click or campaign visit. See section 5.3.
- **Analytics off:** campaign details are not read or kept. [Code: with analytics off and advertising on, the durable record holds click codes only.]

If you send an enquiry, the campaign details still held are sent with it and appear in the email we receive. Nothing in this paragraph is sent to Google Analytics, Google Tag Manager or Meta (`lib/analytics.ts`, `getAttribution`). [UNVERIFIED: whether tags inside the GTM container read the page address, or this storage, on their own. That is container configuration, not code. Needs the container export.]

GA4 reads the page address from your address bar. When advertising is off (including when a Global Privacy Control signal is present), our GA4 set-up sends the landing page view with the ad click codes removed. Other GA4 hits sent while the visitor is still on that landing address (events, scroll, engagement) still carry the full address with the click codes (observed 2026-10-14 in a headless browser test, with the hits blocked from reaching Google). Later page views after in-site navigation do not reuse the cleaned address. [UNVERIFIED: whether Microsoft Clarity records the full landing address, query string included (`lib/clickIds.ts` header), and whether tags inside the GTM container read the raw address.] Counsel should not rely on the click codes being kept out of Google Analytics, Tag Manager or Clarity.

### 5.3 Advertising measurement (if on)
The Meta Pixel sends Meta your page views and the actions you take on the site, with an identifier from a Meta cookie. Meta can use this to measure our advertising and to match activity to Meta accounts.

**Ad click codes.** When advertising measurement is on, and no Global Privacy Control signal is present, our code reads the click codes that Google (`gclid`, `wbraid`, `gbraid`), LinkedIn (`li_fat_id`) and Microsoft (`msclkid`) add to their ad links, and keeps them in your browser's local storage (`qognition_attribution_durable_v1`). Each code lasts 90 days from the moment we first saw it. Coming back to the site, or seeing the same code again, does not extend it. A code past its 90 days is no longer used or sent, and is removed from your browser on your next visit. We keep the first code we saw and the newest code for each platform. If you turn advertising measurement off, the codes are deleted from your browser straight away. If a Global Privacy Control signal is on, they are not read or kept, and any already stored are deleted on your next page view.

If you then send an enquiry, the codes still inside their 90 days are sent with it, each with the date it was first seen, and are shown in the email that reaches our mailbox. They are therefore also held by our email provider (Resend, section 8) and in our mailbox, under the retention in section 9. Our server removes them from the enquiry if advertising measurement was not allowed (the same test that decides whether the Meta event is sent). We use them so that an enquiry can be matched back to the ad that led to it. Our code never adds the click codes to a Google Analytics, Google Tag Manager or Meta event, and does not send them to Meta (they are not part of the section 6 event). [COUNSEL: no code in `app`, `lib` or `components` uploads the codes to any ad platform (grep on 2026-10-14). See Q15 on whether an upload is planned, which would change section 3 and section 8.]

### 5.4 Business visitor identification (only if enabled)
`[PUBLISH THIS SUBSECTION ONLY IF NEXT_PUBLIC_ENABLE_MARKETING_SCRIPTS is "true" in production. NEEDS DATA: production value of that variable. .env.example says false. If it is false in production, delete 5.4 and the Leadfeeder and Warmly rows everywhere.]`

When this is enabled and advertising measurement is on, we load two tools that try to work out which company, and in some cases which person, a visit comes from:

- Leadfeeder (Dealfront), which matches visits to companies. [UNVERIFIED: what Leadfeeder collects and whether it identifies individuals. Vendor behaviour is not in our code.]
- Warmly, which says it can identify companies and individual people from visits. [UNVERIFIED: vendor claims are not in our code. Counsel must read the vendor terms.]

They use your IP address and information from your browser, and may combine this with other data they hold. We use the result to decide which companies to contact. [COUNSEL: this is the highest-risk paragraph in the notice. See Q5 and Q6.]

## 6. What we send to Meta when you send an enquiry

Only if advertising measurement is on when you send a form, our server sends Meta an event called "Lead" through the Conversions API. The event includes:

- your email address, hashed (SHA-256);
- your phone number, digits only, hashed, if you gave one;
- your first name and last name, hashed;
- your IP address and browser user agent, **not** hashed;
- the values of Meta's `_fbp` and `_fbc` cookies, if present;
- the page you submitted from, the topic of the enquiry and the type of request;
- an event ID so Meta can match it to the browser Pixel event.

We do not send your message text or company name. Hashing is not anonymisation: Meta can match a hash to an account that uses the same email address, phone number or name. Meta processes this under its own terms. [COUNSEL: whether Meta is a processor, an independent controller or a joint controller for this data, and what notice and consent each role needs.]

This call is made only if advertising measurement is on, no Global Privacy Control signal is present, and either you chose the setting yourself or you are in a region where it starts on. Otherwise it is not made. (The ROI calculator does not send consent details, so it does not trigger the Conversions API call at all. See `app/api/lead/route.ts` line 89.)

## 7. Booking a call

The calendar is provided by LeadConnector, the platform behind GoHighLevel. If advertising measurement is on, the calendar loads inside our page. If it is off, we show a link instead, which opens the LeadConnector booking page in a new tab.

Either way, the booking page is run by LeadConnector, not by us, and our privacy choices do not control it once you are there. We have been told that page can load the Meta Pixel. [UNVERIFIED: this was recorded in a code comment on 2026-10-07 and is not confirmed by us. Anton to verify in a browser with network tools open.] If you do not want that, contact us by email or WhatsApp instead.

The WhatsApp button opens WhatsApp (a Meta service) with a pre-written message. WhatsApp's own terms apply from that point.

## 8. Who we share information with

We use these providers to run the site and handle enquiries. [PUBLICATION NOTE: the per-provider detail is in section D of this working document. Decide whether the public page carries the full table or this summary.]

| Provider | What for |
|---|---|
| Vercel | Hosting the site, delivering pages, working out your approximate country |
| Google (Analytics 4 and Tag Manager) | Analytics, if on |
| Microsoft (Clarity) | Page interaction recording, if on |
| Meta (Pixel and Conversions API) | Advertising measurement, if on |
| Leadfeeder (Dealfront) and Warmly | Business visitor identification, only if enabled and advertising measurement is on |
| GoHighLevel / LeadConnector | Our contact records, enquiry notes, and the booking calendar |
| Resend | Sending the internal enquiry email to us, and your confirmation email |
| Upstash | A technical record that lets us avoid processing the same enquiry twice. It holds a reference number, a fingerprint of the enquiry, CRM record IDs and delivery status, not your name, email address or message. While an enquiry is being processed, a short lock (about 45 seconds) uses a keyed hash of your email address. |

[COUNSEL: choose one of the two options below for the statement about selling. The existing page says "We do not sell, rent, or trade your personal information."]

**Option 1 (keep).** We do not sell, rent or trade your personal information for money.

**Option 2 (replace).** We do not sell your personal information for money. Some advertising tools on this site, such as the Meta Pixel and Conversions API, may count as "selling" or "sharing" personal information for targeted advertising under some laws, such as California's. In regions where they start on, you can turn them off at any time using "Privacy choices". [COUNSEL: add the "Do Not Sell or Share My Personal Information" link wording if required, and whether the Global Privacy Control signal is honoured.]

We may also disclose information where the law requires, or to protect our rights, or if our business is sold or reorganised.

## 9. Where information goes, and how long we keep it

Our providers process information in places that may be outside your country, including the United States. [NEEDS DATA: for each provider, processing location and transfer mechanism (for example standard contractual clauses or an adequacy decision). The code does not show any of these, and this notice must not claim a mechanism that is not in place.]

| What | Where | How long |
|---|---|---|
| Enquiry details and enquiry notes | GoHighLevel | [NEEDS DATA: retention period and who deletes. The current page says "the duration of the business relationship plus 24 months".] |
| Consent evidence (basis, country, Global Privacy Control flag), stored with the enquiry | GoHighLevel enquiry snapshot and note, and the internal email | Same as the enquiry above |
| Internal enquiry email, including any campaign details and ad click codes sent with the enquiry | Our mailbox, and Resend's delivery logs | [NEEDS DATA: mailbox retention; Resend log retention. The 90 day limit on click codes applies in the visitor's browser only. Once a code is in the email it is held as long as the email is.] |
| Ad click codes (`gclid`, `wbraid`, `gbraid`, `li_fat_id`, `msclkid`) | Your browser, local storage key `qognition_attribution_durable_v1`, only with advertising on and no Global Privacy Control | 90 days from each code's own first capture. Not extended by a later visit or by seeing the same code again. |
| Campaign details (first and latest campaign tags, first page path, referring site name) | Your browser: local storage (same key) if analytics and advertising are both on; session storage (`qognition_attribution_v2`) if analytics is on and advertising is off | Local storage: 90 days after your latest ad click or campaign visit. Session storage: until the tab closes. |
| Technical receipt (reference number, fingerprint of the enquiry, CRM record IDs, delivery status) | Upstash | 760 days from the last update to the receipt (the code default; `LEAD_LEDGER_TTL_DAYS` can change it). [NEEDS DATA: production value of `LEAD_LEDGER_TTL_DAYS`. Publish only the period actually set.] |
| Analytics data | Google Analytics 4 | [NEEDS DATA: GA4 data retention setting in the property admin] |
| Page interaction recordings | Microsoft Clarity | [NEEDS DATA: Clarity retention and masking settings] |
| Advertising events | Meta | Set by Meta. [UNVERIFIED] |
| Your privacy choice | Your own browser | Until you clear it, or until we change our consent policy version |

We keep information only as long as we need it for the purposes in this notice, or as the law requires.

## 10. Cookies and similar storage

[PUBLICATION NOTE: publish the table from section C of this working document here once its `[UNVERIFIED]` rows are resolved.] In summary, we store your privacy choice in your browser's local storage. Campaign details go in session storage (analytics on, advertising off) or in local storage for 90 days (advertising on). Ad click codes go in local storage for 90 days each (advertising on, no Global Privacy Control). The optional tools set their own cookies.

## 11. Why we use your information

[COUNSEL: this table is a proposal for the UK and EU lawful bases. Other regions need their own treatment. See Q7.]

| Purpose | Information | Lawful basis (proposed) |
|---|---|---|
| Reply to your enquiry and assess whether we can help | Contact details, message, business details | Taking steps at your request before a contract; our legitimate interest in running our business |
| Book and run a call | Booking details | Same as above |
| Keep the site secure and stop form abuse | IP address, hashed email, request data | Legitimate interest |
| Remember your privacy choice | Your choice, stored in your browser | Strictly necessary for the service you asked for |
| Analytics and page recordings | Usage data | Consent in opt-in regions. [COUNSEL: basis in opt-out regions] |
| Advertising measurement, including the Meta Conversions API | Usage data; hashed contact details; IP address, user agent | Consent in opt-in regions. [COUNSEL: basis in opt-out regions] |
| Business visitor identification | IP address, browser data | [COUNSEL: not decided. See Q5 and Q6.] |
| Marketing email you ask for | Email address | Consent. Not sent unless you ask for it. |
| Meet legal duties | As required | Legal obligation |

## 12. Your rights

Depending on where you live, you may have the right to access your information, correct it, delete it, restrict or object to its use, receive a copy in a portable format, and withdraw consent at any time (which does not affect what we did before). In some places you can also opt out of certain advertising uses and of "sale" or "sharing".

To use any of these, contact [NEEDS DATA: privacy contact]. [NEEDS DATA: how we verify identity, and how long we take to reply. Counsel to set the statutory periods.]

You can complain to your local data protection authority. [COUNSEL: list the authorities that must be named, for example the ICO in the UK, the supervisory authority in your EU country, the OPC in Canada, the OAIC in Australia.] We would like the chance to help first, so please contact us.

[COUNSEL: add any region specific wording required for California, other US states, Quebec, India, China, UAE and Singapore, and any required appeal route.]

## 13. Security

We use encrypted connections (HTTPS) to our providers. We use keyed hashes instead of raw email addresses in our duplicate-prevention records. We limit who can open our CRM and mailbox. [NEEDS DATA: access control and encryption at rest for GoHighLevel, the mailbox and Upstash. Do not add any claim here that is not evidenced. No certification is claimed.]

No online service is perfectly secure. [NEEDS DATA: breach notification contact and process.]

## 14. Changes to this notice

We will post changes here and change the effective date. If a change affects the optional categories, we will ask for your choice again.

## 15. Contact

[NEEDS DATA: privacy contact]
[NEEDS DATA: registered address]
hello@qognitionagency.com

---

*End of proposed notice text.*

## B. Change table against the current page

Current page: `app/legal/privacy/page.tsx`, "Last updated: September 24, 2026", eight sections.

| Current section | What it says now | Problem found against the code | Proposed change |
|---|---|---|---|
| Header and metadata | Title "Privacy Policy". `robots: { index: false }`. Date September 24, 2026. | The page is excluded from search indexing. Counsel should decide whether a privacy notice should be noindex. The date predates the 2026-10-06 consent model. | New effective date on approval. [Decision for counsel: noindex or not.] |
| (none) | No controller name, address or contact other than hello@. | Missing for GDPR Art. 13(1)(a) and for CASL, PIPEDA and Quebec Law 25 identification. | New section 1, with `[NEEDS DATA: legal entity name]`, `[NEEDS DATA: registered address]`, `[NEEDS DATA: privacy contact]`. |
| 1. Information We Collect | Contact information, usage data "subject to your optional analytics and advertising choices", communication data. | Does not list qualification fields, consent flags, campaign attribution or what is sent to Meta. Says nothing about location detection. | Sections 4, 5 and 6. |
| 2. How We Use Your Information | Four generic purposes. | No lawful basis per purpose. | Section 11. |
| 3. Data Sharing | "We do not sell, rent, or trade your personal information." Names Vercel, GoHighLevel/LeadConnector, Resend "when configured". | Omits Upstash, Google, Microsoft, Meta by name in this section, Leadfeeder and Warmly. The "do not sell" line is in question for default-on Meta and Warmly (Q1). | Section 8 with two options for counsel. |
| 4. Cookies | "Use Privacy choices ... to accept, reject or change". Says advertising measurement "may use Google Tag Manager, Meta Pixel and configured business-visitor measurement tools". | (a) Reads as if everything is opt-in. In the US, Canada, Australia, UAE and Singapore the optional trackers run before any choice (`app/layout.tsx` lines 109 and 147 to 153). (b) GTM is loaded under **analytics**, not advertising (`app/layout.tsx` lines 157 to 165), so the current page assigns it to the wrong category. (c) "Our browser and server measurement both respect the advertising choice": the server now also requires an explicit basis or a server-resolved opt-out country, and withholds CAPI on `Sec-GPC: 1` (`app/api/lead/route.ts`). Neither GPC nor region logic is described on the current page. (d) No cookie or storage list. | Sections 3, 5, 6, 10 and table C. |
| 4 (second paragraph) | "Contact requests and their context are stored in GoHighLevel." Providers "may process data outside your country. Contact us for information". | Transfers and safeguards are not described. Upstash is not mentioned. | Sections 8 and 9, with `[NEEDS DATA]` for locations and mechanisms. |
| 5. Data Retention | "Lead form submissions are retained for the duration of the business relationship plus 24 months." | The Upstash receipts now expire after 760 days from last update (about 25 months, not 24). GoHighLevel retention is not set in code. | Section 9 table. Ledger now 760 days in code. |
| 6. Your Rights | Generic list, contact by email. | No complaint right, no regional wording, no appeal, no timing. | Section 12 and Q7 to Q9. |
| 7. Security | "Reasonable technical and organizational measures". | Fine as a general statement. No claim should be strengthened without evidence. | Section 13: two evidenced statements only, with `[NEEDS DATA]`. |
| 8. Contact | hello@qognitionagency.com | Same as above. | Section 15. |
| (none) | Nothing on region-based defaults. | New operator decision, 2026-10-06. | Section 3 table. |
| (none) | Nothing on the booking calendar or WhatsApp. | The calendar is gated on advertising consent, but its new-tab fallback is not controlled by us. | Section 7. |
| (none) | Nothing on the ROI calculator, the confirmation email, or the in-memory abuse counters. | These are real data flows (`components/shared/HeroRoiCalculator.tsx`, `lib/leadDelivery.ts`, `lib/auditRateLimit.ts`). | Sections 4 and 5.1. |

## C. Cookie and storage inventory

Names and lifetimes are taken from code where the code sets them. For third-party cookies the code does not set the cookie, the vendor script does, so any name or lifetime from vendor documentation is marked `[UNVERIFIED]`. The authoritative way to verify is a browser session in each region with developer tools open, with each category on and off. That has not been done for this draft.

The code clears cookies on the site domain and its parent domains: analytics cookies `^(_ga|_gid|_gat|_clck|_clsk)` when analytics is rejected, and advertising cookies `^(_fbp|_fbc|_gcl_|_lfa)` when advertising is rejected, on **every** explicit reject, not only a withdrawal (`lib/consent.ts`). That list is the closest thing the code has to an inventory. It has no entry for Warmly or LeadConnector.

| Name | Set by | Category | Purpose | Lifetime |
|---|---|---|---|---|
| `qognition_consent_v1` (localStorage) | Us, `lib/consent.ts` | Strictly necessary | Stores your analytics and advertising choice, the time and the policy version | No expiry in code. Kept until you clear it, or until `CONSENT_POLICY_VERSION` (now `2026-10-14`, bumped when ad click codes began to be kept for 90 days) changes, after which it is ignored but not deleted. A stored "advertising: yes" is overridden by Global Privacy Control, but the stored value itself is not changed. |
| `qognition_attribution_v2` (sessionStorage) | Us, `lib/analytics.ts` | Analytics | Stores first and last campaign tags (UTM), landing page path (path only), referrer host so an enquiry carries its source | Browser tab session. Written only when analytics is in effect and advertising is not (or when the durable write fails). Removed when you turn analytics off, and moved into the durable record when advertising is turned on. |
| `qognition_attribution_durable_v1` (localStorage) | Us, `lib/analytics.ts`, key named in `lib/consent.ts` | Advertising (click codes); analytics as well for the campaign fields | Stores ad click codes (`gclid`, `wbraid`, `gbraid`, `li_fat_id`, `msclkid`: the first seen and the newest per platform, each with its capture time), and, only if analytics is also on, first and last campaign tags, landing page path and referrer host, so a multi-week purchase keeps its first source | Click codes: 90 days from each code's own capture, never extended (`lib/clickIds.ts`). Whole record: expires 90 days after the latest ad click or campaign visit, and is treated as corrupt and deleted if it has no expiry. Written only with advertising on and no Global Privacy Control. Deleted when advertising is turned off or GPC is on. If analytics is turned off while advertising stays on, the campaign fields are removed at once and the click codes stay. Expired codes are dropped on the next page view. |
| `qognition_utm_first_touch` (sessionStorage) | Nothing found | Analytics (legacy) | Deleted when analytics is withdrawn. No code in `app`, `components` or `lib` sets it. | n/a. `[UNVERIFIED: whether an older build set it]` |
| `qognition_audit_device` (cookie) | Nobody | n/a | Named in `lib/auditRateLimit.ts` and read from requests, but no code sets it. | Not set by current code. `[UNVERIFIED: whether it exists in visitors' browsers from an earlier build]` |
| `_ga`, `_ga_<container id>` | Google Analytics 4 (`gtag.js`) | Analytics | Distinguishes visitors and sessions | Google documents 2 years. `[UNVERIFIED: not in our code]` |
| `_gid`, `_gat` | Google Analytics (legacy) | Analytics | The code clears them if present. GA4 does not normally set them. | `[UNVERIFIED]` |
| `_gcl_*` | Google tags in GTM, if the container uses ad conversion linking | Advertising | Stores ad click identifiers | `[UNVERIFIED: GTM container contents are not in the repo. NEEDS DATA: container export.]` |
| Other GTM-container tags (the layout comment refers to a LinkedIn Insight tag "etc." inside the container) | GTM container | Unknown | Unknown | `[NEEDS DATA: container export. If a LinkedIn tag exists, LinkedIn must be added to the processor list.]` |
| `_clck`, `_clsk` | Microsoft Clarity | Analytics | Clarity user and session identifiers | Microsoft documents 1 year and 1 day. `[UNVERIFIED: not in our code]` |
| `MUID` (and similar Microsoft identifiers) | Microsoft, possibly via Clarity | Analytics or advertising | `[UNVERIFIED: whether Clarity sets it for this site]` | `[UNVERIFIED]` |
| `_fbp` | Meta Pixel | Advertising | Browser identifier used for ad measurement. Also sent unhashed to Meta in the CAPI event. | Meta documents 90 days. `[UNVERIFIED]` |
| `_fbc` | Meta Pixel | Advertising | Stores the ad click ID (`fbclid`) when present. Also sent in the CAPI event. | Meta documents 90 days. `[UNVERIFIED]` |
| `_lfa` and other Leadfeeder identifiers | Leadfeeder script | Advertising (as gated in code) | Company identification. `_lfa` is named in a code comment in `lib/consent.ts`. | `[UNVERIFIED: lifetime, and whether other names exist]`. Only if `NEXT_PUBLIC_ENABLE_MARKETING_SCRIPTS=true`. |
| Warmly identifiers | Warmly script | Advertising (as gated in code) | Company and person identification | `[UNVERIFIED: names and lifetimes]`. Only if the flag is true. |
| LeadConnector booking page identifiers, possibly Meta Pixel cookies inside the frame | LeadConnector (GoHighLevel) on its own domain | Outside our control. The iframe is gated on advertising consent in `components/shared/CalBooking.tsx`; the new-tab link is not. | Booking and, per a code comment, possible ad measurement | `[UNVERIFIED: names, lifetimes; the Meta Pixel inside the frame is stated in a code comment, not confirmed]` |
| Locale | Us | n/a | No cookie. The locale comes from the URL path and is passed as a request header by `proxy.ts`. | n/a |
| Fonts | Us | Strictly necessary | `next/font/google` is used in `app/layout.tsx`. This normally downloads fonts at build time and serves them from our own domain. `[UNVERIFIED: confirm in a network trace that no request goes to Google at runtime]` | n/a |
| Vercel platform cookies | Vercel | n/a | None set by our code. `[UNVERIFIED: platform behaviour]` | n/a |

Note on the withdrawal behaviour: when something that was on is switched off, the page reloads so already-loaded scripts stop (`lib/consent.ts` line 74). Cookies set on a vendor's own domain, if any, are outside our reach.

## D. Processors and recipients

Role labels are proposals. `[UNVERIFIED]` here means no data processing agreement or vendor terms were reviewed in this task. Locations and transfer mechanisms are not visible in code and are `[NEEDS DATA]` for every row.

| Provider | What it receives | When | Code reference | Role (proposed, for counsel) | Open |
|---|---|---|---|---|---|
| **Vercel** | All requests to the site (IP, user agent, URL), form POST bodies in transit, the visitor country header it adds | Always | `app/layout.tsx` line 109; whole site | Processor (hosting) | Location, DPA, log retention |
| **Google Analytics 4 / Tag Manager** | Page views, events, device and location data, cookie IDs; consent state via Consent Mode | Analytics on. Starts on by default in US, CA, AU, AE, SG. | `app/layout.tsx` lines 157 to 181; `lib/analytics.ts` | Processor for analytics; Google may act as independent controller for some uses depending on account settings `[UNVERIFIED]` | Retention setting, data sharing settings, Google signals, DPA, location. With advertising off or GPC on, only the landing page view is sent with the ad click codes removed (`ga4ConfigScript`); other hits on the landing address carry them (observed 2026-10-14). Whether GTM container tags read the raw address is `[UNVERIFIED]`. Our code adds no click code to any GA4 or GTM event. |
| **Microsoft Clarity** | Page interactions and screen recordings (clicks, scrolling, page content as rendered), cookie IDs | Analytics on. Same regional defaults. | `app/layout.tsx` lines 175 to 180 | Processor `[UNVERIFIED]` | Masking mode, whether form inputs are masked, retention. `[UNVERIFIED: whether Clarity records the full landing address, query string and ad click codes included.]` |
| **Meta: Pixel (browser)** | Page views, events (including "Lead" with intent), cookie IDs, IP, user agent, page URL | Advertising on | `components/shared/MetaPixel.tsx`; `lib/analytics.ts` `trackMeta` | Independent or joint controller `[COUNSEL]` | Whether Meta "automatic advanced matching" is on in Events Manager (it can read form fields, and is not visible in code) |
| **Meta: Conversions API (server)** | SHA-256 hashed email, phone digits, first name, last name. Unhashed IP address, user agent, `_fbp`, `_fbc`. Event name, event ID, source page URL, enquiry topic, request type. | All of: the browser sent `consent.advertising: true`; no `Sec-GPC: 1` header; and either `basis` is `explicit` or the server resolves the country as opt-out (US, CA, AU, AE, SG) | `app/api/lead/route.ts` lines 28 to 36, 89, 124; `lib/metaCapi.ts` | As above `[COUNSEL]` | Still sends in an opt-out region with no click. The server now checks GPC and region itself (findings 1 and 4). The ad click codes are never part of this event (`metaLeadEvent` in `app/api/lead/route.ts` builds it without them). |
| **Leadfeeder / Dealfront** | `[UNVERIFIED]`. Typically IP and browser data. Not confirmed from code. | **Only if enabled:** `NEXT_PUBLIC_ENABLE_MARKETING_SCRIPTS=true`, not a preview, and advertising on | `app/layout.tsx` lines 189 to 200 | `[COUNSEL]` | Production flag value; vendor terms; whether it identifies people |
| **Warmly** | `[UNVERIFIED]`. Vendor markets company and person identification. Not confirmed from code. | **Only if enabled**, as above | `app/layout.tsx` lines 195 to 199 | `[COUNSEL]` | As above, plus whether Warmly appends identity data from other sources |
| **GoHighLevel / LeadConnector** | Your email address (contact record). The full enquiry snapshot as JSON in a custom field and in a note: name, email, company, website, phone, message, qualification answers, page context, campaign attribution, consent flags, consent basis, country and GPC flag, qualification result. Booking details entered on its page. | Every captured enquiry. Booking page when used. | `lib/leadCrm.ts` lines 140 to 160, 177 to 181; `components/shared/CalBooking.tsx` | Processor for the CRM. Controller or joint for its booking page `[COUNSEL]` | Retention, location, DPA, whether its calendar loads Meta Pixel |
| **Resend** | Internal notification email: name, email, company, website, phone, message, UTM, consent flags, basis, country, GPC flag, and, when advertising was allowed, the ad click codes (first and latest per platform, each with its first-seen date, `lib/leadDelivery.ts` rows "First ad click" and "Latest ad click"). The email is also held in our mailbox. The server drops the click codes first if advertising was not allowed (`app/api/lead/route.ts`). Confirmation email to the visitor (one per address per day). | Every captured enquiry; also the synchronous fallback record when GoHighLevel is unconfigured or erroring (decision 2026-10-06, `LEAD_EMAIL_FALLBACK` unset) | `lib/leadDelivery.ts`; `app/api/lead/route.ts` lines 87, 105 to 125 | Processor | Retention of delivery logs, location, DPA |
| **Upstash (Redis)** | Durable receipt, keyed by an HMAC-SHA256 of the submission reference: submission ID, SHA-256 digest of the whole normalised enquiry, event ID, GoHighLevel contact and note IDs, note body hash, timestamps, delivery states (notification, confirmation, advertising). No name, no raw email, no message. Separately, a lock keyed by an HMAC of the email address lives about 45 seconds and is deleted on release. | Only if the ledger is configured (optional, decision 2026-10-06) | `lib/leadLedger.ts`; `lib/leadCrm.ts` | Processor | Region. TTL 760 days from last receipt write by default; production value `[NEEDS DATA]`. The digest is a hash of content that includes the email, so it is pseudonymous at best. |
| **WhatsApp (Meta)** | Nothing from our code. An outbound link opens `wa.me` with a pre-filled message. | When the visitor clicks | `data/siteConfig.ts`; `components/shared/FloatingWhatsApp.tsx` | Independent controller once the visitor leaves | Only needed in the notice as a third-party link |

Also in the code, not requested in the brief:

| Provider | Status |
|---|---|
| **Perplexity API** | Used by `lib/audit/aiVisibility.ts` only if `PERPLEXITY_API_KEY` is set. The prompt is built from the audited site's hostname and page title, not the visitor's email. `[UNVERIFIED: whether the key is set in production; the file header says this is a deliberate product decision to leave it unconfigured.]` If it is ever set, the notice needs a line for it. |
| **Tally** | `components/shared/TallyForm.tsx` embeds `tally.so` but nothing imports it. Not live. If revived, add Tally as a processor. |
| **Product Hunt API** | `app/api/ph/route.ts` is server-to-server and handles no visitor data. |
| **LinkedIn** | Possibly present inside the GTM container (layout comment). `[NEEDS DATA: container export]` |

## E. Questions for counsel

Each question gives the facts the code establishes, so you do not have to look. "Today" means the working tree on 2026-10-07.

### Q1. CCPA / CPRA: is default-on Meta and Warmly a "sale" or "sharing"?
- Today, a visitor in the US with no stored choice gets the Meta Pixel and the Google tags before any interaction. If they submit a form, the Meta Conversions API call goes out with hashed email, phone and names plus unhashed IP and user agent (`app/api/lead/route.ts` line 89), authorised by a flag the browser set from the region default, not a click. The server now requires either an explicit choice or a server-resolved opt-out country, and no `Sec-GPC` header, so a US visitor with no click still qualifies (finding 4).
- If enabled, Warmly and Leadfeeder also start on in the US by default.
- Questions: (a) Does this count as "sharing" for cross-context behavioural advertising? (b) Does it count as a "sale"? (c) If yes, what notice at collection, "Do Not Sell or Share" link and opt-out mechanism are required, and is "Privacy choices" enough? (d) Do we meet the thresholds for the CCPA to apply to us `[NEEDS DATA: revenue and consumer count]`? (e) B2B contact data is covered by the CCPA, so are enquirers in California "consumers" for this purpose? (f) Other US states with universal opt-out signals and opt-in for targeted advertising: is a US-wide opt-out default defensible?

### Q2. Global Privacy Control
- Code today (uncommitted, updated 2026-10-14): GPC beats both the region default and a stored explicit choice, for advertising only. In the browser (`effectiveConsent`), in the inline Google Consent Mode script (the three advertising signals are denied) and on the server (`Sec-GPC: 1` withholds the Meta Conversions API event and drops the click codes from the enquiry), GPC forces advertising off even after the visitor chose "Allow all". Analytics is unaffected by GPC everywhere.
- (a) Is it enough to treat GPC as an advertising opt-out, or must it also switch off analytics and the Clarity recording? (b) **Settled by the code, for counsel to confirm.** An earlier version of this draft asked whether GPC should beat a stored "Allow all" in the browser, because the browser and server then disagreed. They no longer do: GPC wins everywhere. Counsel to confirm that this is the rule wanted, and whether a visitor who has GPC and deliberately clicks "Allow all" should be told that the signal overrides the click (the banner does not say so today `[UNVERIFIED: banner text not re-read for this update]`). (c) Do the Leadfeeder and Warmly tools, which sit under advertising, need the same treatment? They do inherit it today. (d) A legacy payload with no `basis` is treated as a region default, never explicit. Acceptable? (e) Do other jurisdictions in our opt-out set require GPC? (f) How should the notice describe it? Section A.3 has a draft.

### Q3. Quebec Law 25
- Canada is an opt-out region as a whole. The code works at country level (`consentDefaultFor` takes an ISO country code). Vercel also supplies a region header, which is not read today.
- 2026-10-14 addition: the opt-out default now also covers keeping ad click codes in the browser for 90 days and sending them with an enquiry (section 5.3). Those codes identify a click on a person's ad. For a visitor in Quebec, counsel should say whether the Canada-wide opt-out default can stand for that storage, for the Meta Conversions API event and for the Pixel, or whether Quebec needs opt-in. The code cannot make that distinction today: it works at country level, and the Vercel region header is not read.
- (a) Does Law 25 require tracking technologies that can identify, locate or profile a person to be off by default for visitors in Quebec, which would make a Canada-wide opt-out default non-compliant for them? (b) Is a Quebec carve-out (default off in Quebec) required before launch? (c) Notice content: privacy officer title and contact, purposes, third parties, cross-border transfers, rights. (d) Is a privacy impact assessment required for the transfers to US vendors? (e) Does the Charter of the French language require a French version of this notice, given the site has an `fr` locale? (f) CASL for the confirmation email and any marketing email: identification, postal address (open TODO in `lib/leadDelivery.ts` line 104), unsubscribe.

### Q4. UAE and Singapore opt-out defaults (not in the brief, but in the opt-out set)
- (a) UAE PDPL generally rests on consent. Is a default-on starting point acceptable for the UAE, including any free-zone regimes (DIFC, ADGM) our visitors may fall under? (b) Singapore PDPA deemed consent by notification needs a reasonable opportunity to opt out. Is the banner plus Privacy choices sufficient? (c) If either answer is no, the operator needs to move that country to opt-in, which is a one-line change in `OPT_OUT_COUNTRIES`.

### Q5. PIPEDA and the Australian Privacy Principles: Warmly and Leadfeeder (person-level identification)
- If enabled and in an opt-out region, these tools run with advertising defaults on. The vendors describe company identification, and for Warmly person identification `[UNVERIFIED]`.
- (a) Is meaningful consent needed in Canada before identifying an individual visitor, and is an opt-out default enough? (b) Under the APPs: is this collection of personal information by fair and lawful means (APP 3), does it need notification at or before collection (APP 5), and what does indirect collection from the vendor's data require? (c) Cross-border disclosure rules (APP 8; PIPEDA accountability). (d) Do we turn it off in those regions and keep it only where we have opt-in? That is engineering work, not a notice change.

### Q6. Business visitor identification, generally
- Is it lawful to identify companies by IP without consent in the opt-out regions, and in opt-in regions are these tools within the consent the visitor gives to "advertising"? Does the notice need a separate toggle? The code has two categories only.
- Do we publish section 5.4 at all? That depends on whether `NEXT_PUBLIC_ENABLE_MARKETING_SCRIPTS` is true in production `[NEEDS DATA]`.

### Q7. GDPR Article 13 and UK GDPR completeness
Checklist against the proposed notice. "Gap" means we cannot fill it from code.

| Article 13 element | In the draft? | Gap |
|---|---|---|
| 13(1)(a) identity and contact of controller | Placeholders | `[NEEDS DATA: legal entity name]`, `[NEEDS DATA: registered address]`, `[NEEDS DATA: privacy contact]` |
| Art. 27 representative in the EU and UK | Placeholder | We market to the Netherlands, Germany, Sweden, Denmark, Norway, Finland, Switzerland, Ireland and the UK per `CLAUDE.md`. Counsel to decide if we need a representative and, for Switzerland, a Swiss one. `CLAUDE.md` says countries served are never presented as offices, so no establishment is assumed. |
| 13(1)(b) DPO contact | Placeholder | Is a DPO required? |
| 13(1)(c) purposes and legal basis per purpose | Table in section 11 | Counsel to confirm each basis, in particular legitimate interests for the B2B enquiry flow and for hashing and sharing with Meta |
| 13(1)(d) legitimate interests named | Partly | Name each interest and offer the balancing test on request |
| 13(1)(e) recipients | Section 8 and table D | Controller or processor role per recipient |
| 13(1)(f) transfers and safeguards | Placeholder | Mechanism per vendor is not in code |
| 13(2)(a) retention | Section 9 | Several `[NEEDS DATA]`; ledger TTL is 760 days in code, production value to confirm |
| 13(2)(b) rights | Section 12 | Add objection to direct marketing, objection to legitimate interests |
| 13(2)(c) withdraw consent | Section 3 | None |
| 13(2)(d) complaint to a supervisory authority | Section 12 | Name the authorities |
| 13(2)(e) whether providing data is required | Not stated | Add: the enquiry form needs name and email; the rest is optional (verify against `lib/validation.ts` `contactSchema`) |
| 13(2)(f) automated decision making | Not stated | The code runs `qualifyLead` (`lib/leadQualification.ts`) which scores the lead and an eligibility value is written to GoHighLevel. Counsel to say whether this is automated decision making with legal or similarly significant effect, and whether to describe it. |
| ePrivacy Art. 5(3) | Section 3, 5 | Non-essential storage and access needs consent. `localStorage` counts. "Reject optional" is on the banner next to "Allow all" (`ConsentManager.tsx` line 76), and boxes open unticked in opt-in regions. Counsel to confirm the banner meets the "as easy to reject as accept" standard. |

### Q8. India DPDP Act and China PIPL (opt-in regions)
- Both countries are opt-in and in the market list (added 2026-10-06). The code treats them as opt-in, so no tracker starts there without a click.
- DPDP: (a) Does the Act apply to us for visitors in India? (b) What does the consent notice itself need (itemised purposes, language options, grievance contact, withdrawal as easy as giving)? (c) Is a separate in-banner notice required, or does this page suffice? (d) Is a Data Protection Board registered consent manager needed?
- PIPL: (a) Does it apply to a foreign business offering services to individuals in China? (b) Separate consent for transfers outside China and for provision to third parties. The banner offers two toggles only. (c) A designated representative or entity in China. (d) Practical: Google, Meta and Clarity may be unreachable in China, so the opt-in may have no effect there. Is a China-specific statement needed?

### Q9. "We do not sell, rent or trade"
- Is the sentence still accurate given Q1? If not, use Option 2 in section 8. If you prefer Option 1, which qualifier do you want ("for money")?
- Also: do the unhashed IP address and user agent that go to Meta change the answer compared with the hashed fields alone?

### Q10. Retention
- The current page says "the duration of the business relationship plus 24 months". The ledger TTL is now 760 days (about 25 months) from the last receipt write, so a retried or updated receipt extends it. GoHighLevel retention is not set in code at all.
- Do we align the ledger to 730 days, or keep 760 and say so, and is refresh-on-write acceptable? What does "the duration of the business relationship" mean for an enquiry that never became a client? A shorter maximum for non-clients may be easier to defend.

### Q11. The consent version bump
- Finding 3: stored choices under `2026-09-24` are ignored. In opt-out regions, past rejecters are re-defaulted to on until they choose again. Is that acceptable, or must prior rejections be honoured? (Engineering can migrate them. Counsel to say whether to.)
- Does a change of the notice text require a new consent policy version in future, and if so, who owns that decision?

### Q12. Consent records
- The lead payload carries `analytics`, `advertising`, `policy_version`, `basis` and `recorded_at`. `recorded_at` is empty when a default applied. The server adds `country` and `gpc`. All of it is written to GoHighLevel (snapshot and note) and into the internal email, and to an optional custom field if `GHL_CONSENT_BASIS_FIELD_ID` is set.
- (a) Is storing the visitor's country and GPC flag with each enquiry proportionate, and does it need its own retention rule? (b) Is `basis: 'explicit'` with a timestamp adequate evidence of consent in the opt-in regions? (c) For opt-out regions, is `region_default` plus country adequate evidence of the notice-and-opt-out basis? (d) Should the notice version shown at the time also be recorded? `policy_version` is the consent version, not the notice text version.

### Q13. Hosted booking page and the new-tab fallback
- The calendar iframe loads only with advertising on. The "Open the calendar" link opens the same LeadConnector page in a new tab regardless of choice. A code comment says that page loads the Meta Pixel. `[UNVERIFIED]`.
- Does sending the visitor there without advertising consent need a warning at the link, or is leaving our site enough?

### Q14. Other items counsel may want to rule on
- The ROI calculator posts to `/api/lead` with no consent record and no attribution (`components/shared/HeroRoiCalculator.tsx` line 208). Its Lead event reaches Meta from the browser only if advertising is in effect. It derives the name from the email prefix. Is that acceptable as described in section 4?
- The confirmation email goes to whatever address was typed into the form, possibly a third party. We limit it to one per address per day. Is this acceptable?
- Meta "automatic advanced matching" and any Google "enhanced conversions" settings are configured in vendor dashboards and are not visible in code. They change what is collected.
- Does `Clarity` session recording need its own disclosure and a mask-by-default guarantee for the enquiry form?
- Data subject requests: ledger keys are HMACs of the email, so deleting a person's ledger entries needs the HMAC secret and the submission IDs held in GoHighLevel. The deletion procedure and response times are not yet written. Platform (Jonas) will write a runbook once counsel sets the commitments.

### Q15. Will the ad click codes be uploaded to an ad platform?
- Facts from the code (2026-10-14): the site keeps `gclid`, `wbraid`, `gbraid` (Google), `li_fat_id` (LinkedIn) and `msclkid` (Microsoft) in the browser for 90 days each, and sends them in the hello@ email when advertising was allowed (`lib/clickIds.ts`, `lib/analytics.ts`, `lib/leadDelivery.ts`). They exist so that an enquiry can later be matched to an ad click for an offline conversion import (`CLAUDE.md` section 8). No code in `app`, `lib` or `components` uploads them anywhere, and no upload is described on the live page. `[NEEDS DATA: operator, whether an import to Google Ads, Microsoft Advertising or LinkedIn is planned, and when.]`
- (a) If the codes will be uploaded to Google Ads, Microsoft Advertising or LinkedIn, those companies receive the click code together with the enquiry's conversion time, and usually a hashed email or phone number for matching. **Section 3 and section 8 must then name them as recipients, and say what is sent.** Counsel to confirm the wording. (b) Does that upload count as "sharing" for targeted advertising (see Q1), and does it need the notice, opt-out link or consent that Q1 asks about? (c) Does the 90 day limit in the browser need a matching limit once a code sits in an email and a mailbox? Today there is none (Q10). (d) Until the answer is known, the notice must not say the codes are used for anything beyond matching an enquiry to the ad that led to it.

## F. Engineering dependencies before the page can change

These are not for counsel. They determine which bracketed sentences in section A may be published.

| # | Item | Owner | Blocks |
|---|---|---|---|
| E1 | Commit the GPC, click code and attribution changes and show them to Anton and Owen. They are in the working tree, uncommitted. Verify in a browser: GPC on with no stored choice, GPC on with a stored "Allow all" (advertising must be off, in the browser, in Consent Mode and on the server), a lead POST with `Sec-GPC: 1` (no click codes in the email, no Meta event), and click codes surviving then expiring at 90 days from their own capture. | Luke, Anton review, Owen gate | Section 3 GPC paragraph; section 5.3; Q2 |
| E2 | Commit the ledger TTL. Set or confirm `LEAD_LEDGER_TTL_DAYS` in production. | Luke, Owen gate | Section 9 Upstash row |
| E3 | Confirm the production value of `NEXT_PUBLIC_ENABLE_MARKETING_SCRIPTS`. | Operator | Section 5.4, Leadfeeder and Warmly rows |
| E4 | Export the GTM container and list every tag it fires. | Marcus | Table C and D, LinkedIn |
| E5 | Browser trace in each region (US, CA, AU, AE, SG, UK, DE, IN, CN, a VPN-hidden location), with each category on and off. Fill the `[UNVERIFIED]` cookie rows. | Jonas with Anton | Table C |
| E6 | Check Clarity masking, GA4 retention, Meta automatic advanced matching, and Warmly and Leadfeeder vendor settings in their dashboards. | Marcus | Sections 3, 9; Table D |
| E7 | Decide on a Quebec carve-out and the prior-rejection carry-over (Q3, Q11). Both are code changes. | Operator, after counsel | Section 3 |
| E8 | Correct `CLAUDE.md` line 412 to describe the region-split model. | Operator (not corrected here) | Documentation |
| E9 | Verify that the calendar page loads Meta Pixel. | Anton | Section 7 |
| E10 | Create the GoHighLevel custom field for `GHL_CONSENT_BASIS_FIELD_ID` if the evidence should be filterable. Without it the evidence is still in the snapshot JSON and the note. | Operator | Q12 |

## G. Open data points (deduplicated)

- `[NEEDS DATA: legal entity name]`
- `[NEEDS DATA: registered address]`
- `[NEEDS DATA: privacy contact]`
- `[NEEDS DATA: effective date]`
- `[NEEDS DATA: processing location and transfer mechanism for Vercel, Google, Microsoft, Meta, Leadfeeder, Warmly, GoHighLevel, Resend, Upstash]`
- `[NEEDS DATA: retention for GoHighLevel, mailbox, Resend logs, GA4, Clarity, Vercel logs]`
- `[NEEDS DATA: production value of NEXT_PUBLIC_ENABLE_MARKETING_SCRIPTS]`
- `[NEEDS DATA: production value of LEAD_LEDGER_TTL_DAYS]`
- `[NEEDS DATA: GTM container export, including whether any tag reads the raw page address or the click codes]`
- `[UNVERIFIED: whether Microsoft Clarity records the full landing address with ad click codes; whether GTM container tags read it.]` Observed 2026-10-14: GA4 hits other than the landing page view still carry the click codes when advertising is off.
- `[NEEDS DATA: operator, whether ad click codes will be uploaded to Google Ads, Microsoft Advertising or LinkedIn (Q15)]`
- `[NEEDS DATA: operator, confirmation that the live privacy page update of 2026-10-14 was intended ahead of counsel review]`
- `[NEEDS DATA: revenue and consumer volume for CCPA thresholds]`
- `[NEEDS DATA: DPO, Article 27 representative, Quebec person in charge]`
- `[NEEDS DATA: how identity is verified and response periods for rights requests]`
- `[NEEDS DATA: breach notification contact and process]`
- `[NEEDS DATA: mail provider and access controls for hello@qognitionagency.com]`
- `[NEEDS DATA: access control and encryption at rest for GoHighLevel, mailbox, Upstash]`
