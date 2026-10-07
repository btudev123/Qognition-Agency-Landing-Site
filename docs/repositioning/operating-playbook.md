# Qognition enquiry, nurture and sales operating playbook

Internal implementation draft · 3 October 2026 · Owner: M.A.R.S, with Imogen and Rafael.

This playbook connects the website to qualified enquiries and booked calls. It specifies work to configure and verify; it does not claim that GHL workflows are live. All outbound copy below is a draft. No messages, calendar appointments or nurture enrolments were created while preparing it.

## 1. Positioning and commercial fit

Qognition provides **AI SEO and GEO for B2B companies, including SaaS**, supported by SEO, content, authority development, paid media and conversion work where relevant. The offer is a scoped program: establish the buyer questions and baseline, improve useful content and technical discovery, develop credible evidence, and report observable search and enquiry outcomes. No rankings, AI recommendations or revenue outcomes are promised.

Website actions remain **Book a call** and **Send an enquiry**. Audits support these paths. Keep the existing visual identity and LeadConnector calendar. Public pages, metadata, schema, emails and downloadable sales material contain no agency prices, ranges or tiers. A prospect-specific commercial proposal follows discovery.

Use the user's latest **$2M–$100M annual revenue, 20–300 employees, $10K+ customer deal value and considered purchase** description as a working prospecting focus. These are internal signals, not eligibility floors. Consider smaller specialist firms with valuable contracts and larger enterprises with a suitable need. Ask for ARR only where recurring revenue makes it meaningful. A sales cycle of 30 days or more and an existing marketing owner support the hypothesis; neither is required on a public form.

Prioritize founders/CEOs, CMOs, VPs or heads of marketing/growth, and commercial or sales leaders with ownership of acquisition. Seek an established B2B offer, a defined buying audience, access to subject experts, and willingness to measure enquiries and pipeline. Existing SEO, content or paid investment is a useful signal. Do not infer budget, distress or lack of expertise from headcount alone.

Poor fits include pre-revenue businesses seeking immediate survival leads, low-value transactional demand without a suitable B2B application, and buyers requiring guaranteed inclusion in AI answers. Record the reason and offer an appropriate next step; do not label an unknown company disqualified automatically.

## 2. Content journeys and qualification are separate

| Content stage | Website job | Next action |
| --- | --- | --- |
| TOFU | Explain a specific buyer-research or visibility problem | Relevant evaluation guide or requested asset |
| MOFU | Explain selection criteria, approach, evidence and measurement | Relevant commercial page or enquiry |
| BOFU | Explain the scope Qognition can discuss for that business | Book a call or send an enquiry |

| CRM state | Required evidence | Owner and next action |
| --- | --- | --- |
| Lead | An identified enquiry or explicit content subscription | Marketing checks relevance and the actual request |
| MQL | Suitable business fit **and** meaningful service-related intent | Sales owner reviews the request and records acceptance or a reason to recycle |
| SQL | Sales has confirmed the problem, fit and a credible next step | Sales records qualification evidence and the agreed action |
| Opportunity | An active potential engagement with owner, scope, value and next action | Sales maintains the opportunity and decision process |
| Customer | Confirmed commercial acceptance under the agreed contracting process | Account owner starts the agreed onboarding |
| Recycle / disqualified | A recorded reason; recycle also needs a proposed revisit condition | Owner controls any later re-entry and respects consent |

A download, page view, audit request, CTA click or booking alone never creates an SQL. The website's `qualification_result` is a **review-required eligibility signal**, not permission to change the CRM sales stage. Current code uses supplied B2B, website, size/revenue and conversation intent fields to flag review. Sales can accept a smaller firm or reject a flagged record after examining the need. Unknown values remain unknown.

Preserve an existing contact's owner, verified identity, DND settings, opportunity and advanced lifecycle state. An existing customer who requests another asset stays a customer. Do not overwrite that record with “Lead.”

## 3. One nurture system, relevant content

Use one versioned system, `qognition-b2b-search-v1`, with segment content and locale variants. Do not create 8,823 independent automations. Retain every source industry, sub-industry, niche and sub-niche ID; grouping an email topic never merges taxonomy records.

| Buying situation | Personalization that earns its place | Relevant evaluation evidence |
| --- | --- | --- |
| SaaS, software and technical platforms | Workflow, integration and implementation fit | Product documentation and permissioned product/customer examples |
| Manufacturers, distributors and engineering | Application, specification and RFQ requirements | Capability sheets, method scope and verified quality evidence |
| Professional, financial and business services | Business problem, engagement scope and jurisdiction | Named expertise, service boundaries and permissioned engagements |
| Cybersecurity and IT services | Environment, security responsibility and deployment fit | Verified capabilities, delivery boundaries and implementation evidence |
| Logistics and supply chain | Lane, handling, shipment profile and onboarding | Verified coverage, operating requirements and supported services |
| Scientific, healthcare and testing providers | Method, study, sample or application fit | Exact accreditation/capability scope and specialist review |
| Construction, energy, facilities and other business procurement | Project stage, operating conditions and procurement need | Relevant application evidence and delivery responsibilities |

For all remaining catalogue entries, use the source industry brief and the actual sub-industry buying task. If a relevant, reviewed resource does not exist, stop the asset branch and create an editorial task. Do not substitute an unrelated generic guide or send a preview-only URL.

Supported locale targets are English, German, French, Dutch, Swedish, Danish, Norwegian Bokmål, Finnish, Arabic, Italian and Simplified Chinese. English copy below is a draft source. A qualified reviewer must approve each translation, including subject, unsubscribe text and destination page. Respect Arabic direction. If a locale is unreviewed, route the requested response to a human instead of silently enrolling it in English nurture.

### Entry, timing and suppression

**Requested delivery:** an accepted, durably saved request with a published asset ID can receive that asset immediately, subject to existing email suppression. Show the asset on the confirmation surface where appropriate. If the asset is unavailable, acknowledge the actual enquiry and route it to a person; never say an asset is attached when it is not.

**Optional nurture:** enter only after explicit email marketing consent, recorded with the consent text/version, time and source. Newsletter consent, service enquiries and permission to contact by telephone are not interchangeable. A form submission must not clear existing DND. Website tracking consent is separate from email consent.

Send optional follow-ups on days **3, 7 and 12** after enrolment, in the contact's confirmed local sending window. Re-evaluate eligibility before each send, not only on entry. Use a single active nurture enrolment per contact; a new asset request may receive its requested asset without restarting the sequence.

Exit immediately on **reply, booking, qualification, active opportunity, customer status, disqualification, opt-out, email DND, complaint or hard bounce**. A negative reply exits too. Pause on an unavailable owner or missing content rather than guessing. Treat cancellation/no-show recovery as an owner-managed conversation; it does not automatically re-enrol the person. Recycle is not permission to restart. Record an explicit reason, consent check and owner decision for any later enrolment.

Configure HighLevel's Stop on Response, and separate suppression checks for bookings and lifecycle changes. A reply setting alone does not establish all these exits. HighLevel documents workflow settings and channel-specific DND independently: [workflow settings](https://help.gohighlevel.com/support/solutions/articles/48001239875-workflow-settings-overview/), [DND controls](https://help.gohighlevel.com/support/solutions/articles/48001214849).

## 4. Nurture copy drafts

Resolve every bracketed field from approved content or a human review. Do not send unresolved placeholders. Optional messages use the operator's verified sending identity, business contact details and a working unsubscribe link. Each message has one main action; do not append an unrelated audit pitch.

### Immediately: deliver the requested asset

**Subject:** Your [asset title]

**Preview:** The resource you requested, with a useful place to start.

Hi [first name],

Here is **[asset title]**: [published asset link].

Start with the section on [specific buyer decision]. It explains which information a [buyer role] needs when comparing [application or service].

If you requested this for [company], use it to check one important page: does that page answer the selection questions your sales team hears?

Qognition Agency

**CTA:** Read [short asset title]. **Condition:** confirmed requested delivery; no promotional follow-ups unless separately opted in. The optional consent choice is not repeated as a claim in this message.

### Day 3: make one buyer question easier to answer

**Subject:** A useful check for your [application] page

**Preview:** Start with the information a buyer needs to assess fit.

Hi [first name],

For [sub-industry], a useful search page should help a buyer decide [specific buying task].

Look at your main [service/application] page. Does it explain [criterion one], [criterion two] and the evidence behind those statements? These details can make the page useful during research and give your sales team a clearer starting point for an enquiry.

The [evaluation guide] includes a review framework you can use with your subject expert: [published MOFU link].

Qognition Agency

**CTA:** Read the evaluation guide. **Condition:** opted in; no exit state; relevant reviewed criteria and destination exist.

### Day 7: distinguish visibility from commercial progress

**Subject:** What to measure after a visibility change

**Preview:** Keep observed AI mentions, referrals and qualified enquiries separate.

Hi [first name],

An AI mention and a suitable sales enquiry answer different questions.

For [company/application], record the buyer question, platform, date and observed answer when you check visibility. Separately track relevant website referrals and enquiries, then ask sales whether those enquiries fit [specific qualification condition].

Our [measurement guide] explains how to build that record without treating a citation as proof of revenue: [published guide link].

Qognition Agency

**CTA:** Read the measurement guide. **Condition:** opted in and eligible; no claim that Qognition has already measured this account or monitors every named platform.

### Day 12: offer a scoped conversation

**Subject:** Discuss [company]'s search priorities

**Preview:** Bring the buying audience, current pages and the enquiries you want.

Hi [first name],

If AI SEO and GEO are part of your plans, a useful first conversation starts with the business you want to win.

We can discuss [application/customer segment], the questions buyers research, and the content or evidence your team can provide. We will use that context to decide whether a Qognition program fits and what it would need to cover.

**Book a call:** [approved /book link with non-personal taxonomy context].

Qognition Agency

**CTA:** Book a call. **Condition:** opted in and eligible. End this sequence afterward; do not continue “checking in.” Enquiry visitors who already asked for a conversation receive an owner response instead of waiting for this email.

## 5. Sales routing and account-specific outreach drafts

The current request authorizes preparing outreach, not sending it. Rafael owns the eventual account research and launch. Choose a permitted channel and check the account's prior contact and suppression history before any operational launch. A person who is suppressed on one channel must not be pursued elsewhere to evade their request.

For each account, save an observation with its source URL and date, the exact application being sold, a relevant buyer, a verified contact route, and a useful proposed next step. For AI visibility claims also save the prompt, platform, settings, date and answer evidence. One observed absence is not proof that a brand is universally absent from AI answers.

**Email 1 · Subject: [application] buyer questions**

> Hi [name], I read [specific page]. It explains [verified detail], but I could not find [specific selection information] on that page. For a [buyer role] comparing [application], that information would help assess fit before asking for [demo/RFQ/consultation]. I drafted a short outline covering those questions. Would it be useful if I sent it?

Use “could not find” only after checking the actual page and obvious linked documentation. The outline must already exist. Do not send an empty promise or imply a search audit was completed.

**Email 2 · Follow-up after an operator-approved interval**

> One additional point on [application]: your [verified capability/document] could support a clearer answer to [specific buying question]. The useful next step may be connecting that evidence to [relevant page], rather than producing another broad article. Here is the short outline: [reviewed, published resource]. Would you like to discuss how that would fit your acquisition work?

**Final email**

> I will leave this here. If [application] search visibility becomes a priority, the outline at [resource] is available to your team. You can reply if you want to discuss it. I will not send more messages in this sequence.

**Call opening**

> Hi [name], this is [verified sender] from Qognition Agency. I am calling about how buyers assess your [specific B2B service]. Is this a suitable time for a brief explanation? [If yes:] Your [page] explains [observation]. I wanted to understand whether buyers ask about [documented gap] before they request a quote. Who owns that part of your acquisition work?

Respect a refusal; record it. Do not manufacture familiarity or claim a referral.

**LinkedIn connection or message**

> Your [specific post/page] raised [actual issue]. I am working on how [buyer type] evaluates [application] through search. Your point about [detail] was relevant. Would a short outline of those evaluation questions be useful?

Send one relevant message after an appropriate connection or interaction; acceptance alone does not mean consent to an email sequence. Use Facebook, Instagram or X only where the actual business buyer participates and the context supports a conversation. Do not duplicate the same pitch across every channel.

### Handoff record

Preserve the existing account/contact owner. If none exists, route to the operator's named fallback owner; do not invent an employee or round-robin assignment. The record includes request and submission ID, originating taxonomy/page/locale, business model, buyer role, application, desired enquiry type, present approach, decision process, timing, known constraints, consent/suppression state and next action.

During discovery ask: Which buyer and application matter? What makes an enquiry suitable? What do buyers ask before contacting sales? What expertise and evidence can be published? Who will supply approvals? What would justify continued investment? Record answers, including unknowns. A booking becomes SQL only when sales confirms fit and a next step.

Agree internal response coverage and escalation with the operator before launch. No unconfirmed response-time promise appears in the form, email or website. A rejected MQL receives a reason such as unsupported need, timing, insufficient fit information or unsuitable commercial model; absence of a reply is not evidence of disqualification.

## 6. GHL configuration and verification checklist

1. **Inventory existing automations.** Record each workflow's owner, triggers, active contacts, sending channels and exits. Disable duplicate entry paths only through a reviewed change. Choose one delivery owner for requested assets so API confirmation and a GHL workflow cannot send the same message twice.
2. **Verify the right location and credentials.** Configure the server-side GHL integration and distinct website custom-field IDs listed in `.env.example`. Verify contact and note read/write access in the intended location. Configure the durable Redis receipt store and stable HMAC secret. Presence of environment values is not a successful live integration test.
3. **Test persistence before messaging.** An accepted enquiry requires a verified GHL contact, appended enquiry note and durable submission receipt. Retry the same submission and confirm one enquiry and one notification. An uncertain note write must be reconciled, not blindly repeated. Test failure and preserve the retryable error response. Logs contain diagnostic codes and opaque IDs, not names, addresses or message bodies.
4. **Separate source records.** Keep first touch, last touch and the enquiry's own context distinct. Initialize first touch only when absent. Validate the entire industry → sub-industry → niche → sub-niche hierarchy. Do not use client-supplied page context as proof of identity or qualification.
5. **Configure nurture explicitly.** The code does not create this workflow. Map the requested asset, segment, locale, consent evidence and lifecycle to verified custom fields or a reviewed adapter. Do not trigger sending merely because a contact was updated. Use the committed submission receipt as the deduplication basis and prevent repeat enrolment.
6. **Verify sender and exits.** Confirm the sending identity/domain, monitored replies, suppression list and unsubscribe behavior. Test each stop condition using controlled contacts. DND must remain effective even if a later enquiry supplies a new opt-in flag. Default unsubscribe behavior is documented by [HighLevel](https://help.gohighlevel.com/support/solutions/articles/155000006071-configuring-unsubscribe-flows-one-step-two-step-dynamic-); verify the actual account configuration rather than assuming the default is active.
7. **Verify the calendar separately.** Retain the existing LeadConnector calendar and confirm owner, availability, timezone, appointment records and notification routing. Website context in a `/book` URL does not prove it reaches the calendar's contact record. HighLevel supports mapped custom forms on calendars, but the exact configured mapping and browser-to-calendar attribution remain **unverified**. Inspect the saved appointment/contact after a controlled test. See [calendar forms](https://help.gohighlevel.com/support/solutions/articles/48001076135-adding-custom-forms-to-calendars) and [attribution documentation](https://help.gohighlevel.com/support/solutions/articles/48001219997-understanding-attribution-source).
8. **Keep preview isolated.** Preview validation says “Test validated; no enquiry sent.” No production CRM write, real booking or nurture runs from the preview. A sandbox test must use separately verified sandbox configuration. Production publishing still requires the user's preview approval.

## 7. Content approval, reporting and release

The 3 October coverage report records **8,823 mapped journeys and browsable candidate drafts; 0 content-complete journeys; 0 reviewed preview-ready journeys; 0 published complete journeys**. Two existing commercial leaf pages are already published, which does not make their full journeys complete. The source includes 21 industries, 341 sub-industries and 2,376 niche entries. These are internal operating counts and must not become homepage sales copy.

Before advancing any journey, Nadia verifies buyer intent and taxonomy; Theo supplies substantive content; Iris checks evidence; Ruth reviews claims and brand; Owen checks links, rendering and conversion; the operator approves publication. The commercial page must explain the actual application's selection questions, suitable deliverables, relevant evidence, limitations and next action. Shared TOFU/MOFU content must genuinely answer that buyer's problem. Name swaps are insufficient. Review translations and regional facts independently; do not infer a local office or local team.

Report these separately:

| Measure | Record of truth |
| --- | --- |
| Mapping, substantive completion, reviewed readiness, publication | Versioned journey and publication reports |
| Received enquiries and duplicates/failures | GHL note plus committed receipt; PII-free operational totals |
| Completed booking transaction | Authoritative GHL appointment record, deduplicated by appointment ID |
| Attendance, cancellation and no-show | Appointment status; separate from the booking count |
| MQL, SQL, opportunity and customer | Confirmed CRM stage with owner and evidence |
| Organic discovery and AI observations | Search reporting and dated prompt-check evidence |
| Optional email performance | Delivered, replied, opted out, suppressed and qualified; no invented baseline |

Review performance by niche, service, market and source only where attribution is observed. Keep unknown values visible. Do not credit a content visit with causing revenue. Review complaints and suppression failures before increasing send volume. CTA clicks and widget views are diagnostic events, never bookings or SQLs.

Release acceptance requires verified capture and retry behavior, every suppression exit, preserved owner/DND/lifecycle, accurate first/last touches, authoritative appointment measurement, reviewed copy/destinations, and approval of the preview. Outstanding account configuration must be reported as pending rather than passed. Current unverified items include the GHL location/field permissions, receipt-store connectivity, sender and reply configuration, real calendar mapping, workflow overlap, named fallback owner, response coverage, translation review and account-level qualification history.

Reference implementation: `docs/adr/0010-niche-funnel-preview-and-lead-contract.md`, `lib/leadCrm.ts`, `lib/leadLedger.ts`, `lib/leadQualification.ts`, `.env.example`, `lib/nicheJourneys.ts` and `docs/repositioning/niche-funnel-coverage.json`. The October positioning and user-approved plan take precedence over older imported context.
