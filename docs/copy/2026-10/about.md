# About `/about` · copy v1

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** DRAFT. Ruth gates, then Mira wires. No `.tsx` edited.
**File:** `app/about/page.tsx` (one-line component).
**Objection codes:** Marcus `03` §5.1 (C1 to C7) and §5.2 (M1 to M6).

---

## Brief

1. **Search intent.** A prospect checking us out after a referral, or an assistant resolving "What is Qognition Agency?" (Nadia §4.7 Q01, Q02). Nadia §2.2 found one engine confusing us with Cognition Agency (UK). This page is where the entity gets stated plainly.
2. **AI-citation angle.** The first sentence should match Nadia's one-sentence entity description (§4.2), which is pending operator approval (O2): "Qognition Agency is a B2B AI search visibility agency that runs AI SEO, GEO, SEO, local SEO and B2B PPC for established B2B companies, including SaaS." The intro below uses it verbatim so the page, schema and profiles agree.
3. **Internal links.** Out: `/team`, `/process`, `/services`, `/book`, `/contact#enquiry`. Optional, gated: `https://qognitionlabs.com`. In: nav, footer.
4. **The one claim this page owns.** We use AI in the work and say so, and we date every AI observation we report.

---

## Audit of the current page

| | |
|---|---|
| What it says now | Eyebrow "ABOUT QOGNITION". H1 "Specialist expertise deserves to be discovered." Intro: "an AI SEO and GEO agency for B2B companies, including SaaS". Four principle cards. Closing CTA |
| Positioning | Intro is right. The H1 is a slogan any agency could use. Does not say where the company is or who runs it |
| Objections not answered | C5 (who does the work), C1 partly, entity questions (where, who) |
| §1 / §4 issues | None found. No offices claimed, no founding year, no numbers |
| Banned words, em dashes | None. "↗" on internal CTAs |

**Verdict: rewrite.** Short page; it should state the entity plainly and answer "who".

---

## Copy

**Eyebrow:** ABOUT QOGNITION AGENCY

**H1:**

> We run AI search, SEO and PPC for B2B companies.

**Intro** (`growth-page-intro`). Sentence 1 is Nadia's entity string (O2):

> Qognition Agency is a B2B AI search visibility agency that runs AI SEO, GEO, SEO, local SEO and B2B PPC for established B2B companies, including SaaS. We are headquartered in Gurugram, India, and work remotely with clients in the markets we serve. Pages about other cities describe markets we serve, not offices.

`[Ruth 2026-10-07: "We have no offices outside India" replaced with the narrower statement already published in llms.txt. The public number is Canadian, so the broad claim is unverified. Restore it only if the operator confirms there is no presence of any kind outside India.]`

**`AIPlatforms`:** keep.

### How we approach the work

**H2:** keep "How we approach the work".

| `h3` | Body |
|---|---|
| Start with the buying decision | We learn what you sell, who approves the purchase and what they check, before we choose a channel. |
| Use AI, and say so | We use AI for research, grouping and first drafts. A person reviews every source, recommendation and published claim. |
| Date every observation | An AI answer is an observation on a date, not a permanent position. We record the prompt, platform, date and sources every time. |
| Keep the measures apart | Rankings, AI answers, visits, enquiries and revenue are different things. We report them separately, and targets stay labelled as targets. |

Card 2 is the guardrail line: `guardrails.md` prohibits implying human-only production where AI was materially used. This says exactly what AI does and what a person does. `[CONFIRM: this matches how the team works today]`

### The people (new short section, C5)

**H2:**

> Who you work with

**Ship only once `/team` is confirmed accurate.** `context.md` (2026-09-14) records `/team` naming seven leaders while the profile gives a team of 2 to 3. This line would vouch for that page.

**Body:**

> The people who run client work are listed on our team page.

**Link:** `Meet the team` → `/team`

Add when known: "Walkthrough calls are taken by [NEEDS DATA: name, role]." Do not add LinkedIn links or names here until each person consents (Nadia §4.2).

### The software we run on (new, gated, D9)

**Ship only if the operator confirms each capability in production today** (`docs/icp-positioning.md` v2.1: "only through verified capabilities").

**H2:**

> Software we built

**Body:**

> Our sister company, Qognition Labs, builds the tools we use on client work.

- **Scriblr:** AI citation and GEO tracking. Stores each answer with its prompt, platform, model version, cited sources and date.
- **LinkersPro:** authority and link acquisition.

**Link:** `Qognition Labs` → `https://qognitionlabs.com`

M.A.R.S. is left out on purpose. `docs/icp-positioning.md` v2.1 warns that "installed agent roles do not prove production CRM automation", and the same name is used for the internal agent system. Add it only with a verified, client-facing capability.

Never name Salt Accounting Group on this page or link it (`context.md` standing decision on schema and claim latitude).

### Work with Qognition

**H2:** keep "Work with Qognition".

**Body:**

> Bring the search problem you want solved and the buyers you want to reach. On a 30-minute call, we'll tell you where we would start and whether we're the right fit.

**Actions:** `Book a call` → `/book` · `Send an enquiry` → `/contact#enquiry`. No "↗".

---

## Decisions

- **O2** Nadia's entity sentence (pending operator approval). If the operator edits it, update the intro to match, word for word.
- **D9** naming Scriblr and LinkersPro.

## NEEDS DATA

- Confirmation of "no offices outside India".
- Who takes walkthrough calls.
- Scriblr and LinkersPro capabilities in production today.
- Confirmation that the AI-use description matches practice.
