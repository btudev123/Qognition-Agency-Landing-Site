# Free AI visibility audit `/free-ai-audit` · copy v3 (N1, O5 applied 2026-10-07)

> **Superseded in part, operator 2026-10-14.** /free-ai-audit no longer hosts a form. Its button links to `/contact?asset_id=free-ai-visibility-audit`, and /contact holds the only lead form (5 fields). The call is 15 minutes, booked on /book through Cal.com. Sections below that describe a form on this page are kept for history.

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** DRAFT. Ruth gates, then Mira wires. No `.tsx` edited.
**Supersedes:** `docs/copy/audit.md` (kept).
**File:** `components/LocalAuditExperience.tsx` (one-line component). `/free-seo-audit` 308s here (`next.config.mjs`), so this page also receives "free SEO audit" intent.
**Objection codes:** Marcus `03` §5.1 (C1 to C7) and §5.2 (M1 to M6).

---

## Brief

1. **Search intent.** Paid ad group 1C ("get mentioned in chatgpt", "ai visibility audit", "show up in chatgpt", "does chatgpt mention you"), LinkedIn cell B, the homepage Snapshot section, and organic "free SEO audit". Thirty seconds ago the reader asked themselves whether ChatGPT names them. They want to find out without a sales call.
2. **AI-citation angle.** "Qognition Agency's free AI visibility audit is reviewed by a person: it tests a sample of a firm's buyer questions on the agreed AI platforms and Google, and records each answer with its date and cited sources."
3. **Internal links.** Out: `/book` (secondary only), `/case-studies/methodology`, `/process`. In: `/` Hero panel, Snapshot section, service-page CTA pairs, `/case-studies`, RSA sitelink, 5 existing in-body links (Nadia §3.3).
4. **The one claim this page owns.** The free diagnostic states what it tested, where and when. Iris `01` §A.2: none of the seven competitors' free diagnostics promises a dated output with the prompt set stated.

**This page's one conversion element is the form** (Marcus §5.6 rank 3b, operator rule of one conversion element per page). "Book a call" becomes a text link.

---

## Audit of the current page

| | |
|---|---|
| What it says now | Eyebrow "AI SEARCH VISIBILITY REPORT". H1 "Get your AI Search Visibility Report." Intro "Discuss the questions your buyers ask…". Then **Book a call and Send an enquiry buttons above the form**, both leading away from it. `AIPlatforms` (external links). "What we will look at" list. Form titled "Request a review", button "Request a review" |
| Positioning | Right offer. Three names for one thing on one page: report (H1), review (form), audit (title, URL) |
| Objections not answered | C1 (what do I actually get), C4 (what happens next, and when), "is it free" (never said in the body, while the title says "Free"), "is it for me" (no not-a-fit list) |
| §1 / §4 issues | The H1 promises a report. The intro offers a discussion. Only the old metadata said "48 hours", now removed (Nadia §2.1). No numbers, no guarantees |
| Banned words, em dashes | None |
| CRO | Form is the third element on the page. Two buttons above it send the visitor elsewhere. No `id` on the form for in-page links |

**Verdict: rewrite.**

---

## Copy

**Eyebrow:** FREE AI VISIBILITY AUDIT

**H1** (N1 decided 2026-10-07: "Free AI visibility audit" everywhere):

> Request a free AI visibility audit

Nadia's §3.3 alternative ("Request a free AI search and SEO visibility audit") is dropped, so the H1 carries the operator's name exactly. Her final title "Free AI Search & SEO Visibility Audit" still fits; she decides whether to align it.

**Intro** (`growth-page-intro`). Answer-first:

> Tell us your website and the buyers you want to reach. A person on our team tests a sample of their questions on the agreed AI platforms and Google, checks your site's technical readiness, and sends you what they found. Every answer comes with its date and the sources it cited. It is free.

O5 decided 2026-10-07: it is free. "It is free." ships.

**Actions** (replace both buttons):
- Primary button: `Request your free audit` → `#request` (scrolls to the form)
- Text link under it: `Prefer to talk first? Book a call` → `/book`

**`AIPlatforms`:** remove from this page, or keep with links disabled. Every chip is an external link, and this page has one job. Mira's call.

### What your audit covers (`id="scope"`, replaces "What we will look at")

**H2:** What your audit covers

1. **Your buyers' questions.** The questions your buyers ask when they compare suppliers, based on what you tell us, not a generic template.
2. **What the platforms said.** Each question tested on the agreed AI platforms, with the answer, the firms it named, the sources it cited and the date. `[CONFIRM: add "and the model version" only if the team records it]`
3. **Your site's readiness.** Crawlability, your commercial pages and how clearly your company is described.
4. **Where we would start.** The first fixes we would make, and why.

### What happens after you send it (new, C4)

**H2:** What happens next

> A person on our team reads every request and replies by email to confirm the scope. We confirm timing when we reply. There is no obligation to book a call.

No turnaround promise, by operator decision (2026-10-07). "We confirm timing when we reply." is the operator's wording; keep it verbatim.

### What the audit is not (new, C1)

**H2:** What the audit is not

> It is not a score, and it is not your permanent position. Ask the same question twice and you can get two answers. The audit tells you what we observed, on which platform, on which date. That is why every answer in it carries a date.

### Sample (new, gated)

**Ship only when a redacted sample exists.** Marcus §5.1 C1 and §5.6 rank 3c.

**H2:** See a sample

> One page from a real audit, with the company details removed.

`[NEEDS DATA: a redacted sample audit page, operator-approved for publication]`

### Not a fit (new, Marcus §5.6 rank 3e)

**H3:**

> Probably not for you if

- You sell mainly to consumers
- You are pre-revenue
- You need leads this week

Three, not six: this list sits beside a form and should cost no more than a glance. The full list is on the homepage.

### The form (`id="request"`)

**Card H2** (replaces "Request a review"):

> Request your free audit

**`ctaLabel`:**

> Send my audit request

**Qualifying question label** (`qualifyingQuestion` prop, replaces the default message label):

> Who are the buyers you want to reach, and which competitors do they compare you with?

**Microcopy under the button** (new):

> Name and work email are required. Everything else helps us choose the right questions.

`[VERIFY at wiring: LeadForm marks only name and email as required today (LeadForm.tsx line 115). If Mira changes that, change this line.]`

**Measurement dependency (not copy):** Marcus §1.6. `intent="audit"` can never produce an MQL until `lib/leadQualification.ts` treats it as service intent.

---

## Decisions

- **N1** decided: "Free AI visibility audit".
- **O5** decided: free, no turnaround promise.
- **Open, flagged:** `/pricing` and `/process` also mention a *paid* audit offered on the call (`CLAUDE.md` §3). Two "audits" a scroll apart may read as one. Operator or Ruth: keep "paid audit", or rename it (for example "paid diagnostic").

## NEEDS DATA

- A redacted sample audit.
- Whether the audit records the model version per answer.
