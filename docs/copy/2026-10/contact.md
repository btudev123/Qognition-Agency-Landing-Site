# Contact `/contact` · copy suggestions only

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** SUGGESTIONS. Mira is restructuring `app/contact/page.tsx`. Nothing here is an edit. Ruth gates the strings; Mira decides placement.
**File:** `app/contact/page.tsx`. Operator rule (2026-10-07): "/contact is the form only", plus one "Prefer to talk? Book a call" link.
**Objection codes:** Marcus `03` §5.1 (C1 to C7) and §5.2 (M1 to M6).

---

## Brief

1. **Search intent.** Every "Send an enquiry" link on the site, plus people who prefer writing to calls. They have something specific to ask. They want to know it reaches a person.
2. **AI-citation angle.** None. Organization schema on this page carries the entity (Nadia §4.3).
3. **Internal links.** Out: `/book` (one text link). In: every secondary CTA.
4. **The one claim.** A person reads every enquiry and replies.

---

## Audit of the current page (working tree)

| | |
|---|---|
| What it says now | H1 "Let's discuss your next opportunity." Intro: "Tell us what you sell, who buys it and where you want better visibility…" Link "Prefer to talk? Book a call". Form section H2 "Send an enquiry", button "Send enquiry". "Other ways to reach us": email, phone, WhatsApp. Then two cards linking to `/growth/markets` and `/industries`, and `AIPlatforms` |
| Positioning | Intro is good. H1 says nothing (Marcus §5.6 rank 2b) |
| Objections not answered | C4 equivalent for an enquiry: who reads it, when do I hear back |
| §1 / §4 issues | None. No offices claimed. The "Target markets" card says "Programs scoped around your target countries", fine |
| CRO | Two navigation cards and the `AIPlatforms` chips (external links) below the form give a form page three ways out. One conversion element per page |
| Banned words, em dashes | None |

**Verdict: edit.**

---

## Suggestions

**H1:**

> Send us an enquiry

Alternative, if Mira keeps the accent span: "Tell us what you **want fixed**."

**Intro:**

> Tell us what you sell, who buys it, and what you want from AI search, SEO or PPC. A person on our team reads every enquiry and replies by email.

Add when known: "We reply within [NEEDS DATA: a reply time the team can hold]."

**Book link:** keep "Prefer to talk? Book a call". Optional: "Prefer to talk? Book a 30-minute call".

**Form section H2** (line 53). The H1 now says "enquiry", so avoid repeating it:

> Your enquiry

**`ctaLabel`:** keep "Send enquiry".

**Qualifying question label** (optional `qualifyingQuestion` prop):

> What do you want to change, and who are the buyers you want to reach?

**"Other ways to reach us"**: keep as is. Email, phone and WhatsApp each appear once.

**The two cards and `AIPlatforms` below the form:** recommend removing from this page. If they stay, the card titles are fine; "Industries We Serve" could read "Sectors we sell into", which matches the `/industries` disclosure.

**Meta title and description** (not Nadia's page; proposed for her):
- `title`: Contact Qognition Agency | AI SEO, GEO, SEO & PPC for B2B
- `description`: Send an enquiry about AI SEO, GEO, SEO or PPC for your B2B company. A person reads every message and replies by email. Prefer to talk? Book a call.

## NEEDS DATA

- A reply time the team can hold.
