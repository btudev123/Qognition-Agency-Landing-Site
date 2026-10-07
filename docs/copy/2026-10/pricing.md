# Pricing `/pricing` · copy v2

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** DRAFT. Ruth gates, then Mira wires. No `.tsx` edited.
**Supersedes:** `docs/copy/pricing.md` (kept). It predates the 2026-10-03 no-prices rule.
**File:** `app/pricing/page.tsx` (one-line component, `engagements` array).
**Objection codes:** Marcus `03` §5.1 (C1 to C7) and §5.2 (M1 to M6).

---

## Brief

1. **Search intent.** "AI SEO pricing", "how much does GEO cost", or the nav. The reader is evaluating and wants a number. Iris `01` §0.3: four of the seven competitors publish a price signal. We publish none (2026-10-03), so this page has to answer the next-best questions: what sets the fee, and when you see it.
2. **AI-citation angle.** "Qognition Agency does not publish prices. Fees are set by scope: buyer questions tracked, platforms and markets covered, and pages and assets produced. PPC management is priced as a share of ad spend with a monthly minimum." Nadia's Q12 tests what assistants cite for pricing intent; this is the sentence we want there.
3. **Internal links.** Out: `/book`, `/contact#enquiry`, `/process`, `/services/ppc`, `/free-ai-audit`. In: nav, footer, `/` FAQ 5. Nadia §5 #7 proposes an `/insights/what-drives-the-cost-of-a-geo-retainer` guide that should link here once it exists.
4. **The one claim this page owns.** We tell you what sets the fee and when you get it in writing, without a price list.

---

## Audit of the current page

| | |
|---|---|
| What it says now | Eyebrow "ENGAGEMENTS". H1 "A search programme built around your buyers." Three engagement cards: focused starting point, ongoing programme, market expansion. "What shapes your scope?" and "What every proposal includes" |
| Positioning | Reads as a services page, not a pricing page. Never says it doesn't publish prices, so a visitor scrolls looking for them |
| Objections not answered | C3 (when does a number arrive), C6 (lock-in), M6 (PPC pricing basis) |
| §1 / §4 issues | No prices, compliant. Card 1 "A bounded diagnostic or implementation project" sits uneasily with "wants a one-off project" as a disqualifier (`CLAUDE.md` §2). `CLAUDE.md` §3 says the paid audit is offered on the call, not as a headline product |
| Banned words, em dashes | None. "↗" on both internal CTAs (Marcus §5.6 rank 6c) |
| CRO | Marcus §5.6 rank 6a: inline calendar. Layout, Mira. Fits the one-conversion-element rule if the calendar replaces, not joins, the top CTA pair |

**Verdict: rewrite.**

---

## Copy

**Eyebrow:** PRICING

**H1:**

> How we price AI SEO, GEO, SEO and PPC

**Intro** (`growth-page-intro`). Answer-first:

> We don't publish prices. The fee depends on scope, and scope depends on your buyers, your markets and where your site starts. Below is what sets the fee, and when you'll see it in writing.

**Actions:** `Book a call` → `/book` · `Send an enquiry` → `/contact#enquiry`. No "↗" on either.

**`AIPlatforms`:** keep, or drop. On a pricing page the platform links send the reader off-site. Mira's call.

### Engagement cards (`engagements`)

| `label` | `title` | `body` |
|---|---|---|
| Ongoing work | AI SEO and GEO, with SEO underneath. | A monthly scope across the layers your buyers use. Priorities, owners and review dates are agreed in writing. Reports keep AI answers, rankings and enquiries in separate columns. |
| PPC management | Paid search, scoped on its own. | Google Ads and LinkedIn, priced as a share of ad spend with a monthly minimum. Run it alone or beside search work. |
| A new market | A new country, region or language. | We check the questions buyers ask in that market before we publish anything there. We work remotely and do not claim offices in the markets we serve. |

Card 2 replaces "A focused starting point". The paid audit moves to a single line in "When you get a number", where `CLAUDE.md` §3 puts it: offered on the call. **Decision D10** if the operator wants the paid audit as a headline card again.

Card 2 carries the D5 pricing-model clause (Ruth 2026-10-07: allowed; never publish the percentage or the minimum figure). Microsoft Advertising cut as unconfirmed; add it back only when confirmed in active use.

### What sets the fee (replaces "What shapes your scope?")

**H2:** What sets the fee

**List:**

- How many buyer questions we track, and on which platforms
- Which markets and languages the work covers
- How many pages and other assets we produce each month
- The technical state of your site when we start
- How much your team implements, and how much we do

**Paragraph:**

> PPC management is a share of ad spend with a monthly minimum. Ad spend is always separate from our fee.

### When you get a number (new section)

**H2:** When you get a number

**Body:**

> After a 30-minute call. We send a written scope and fee [NEEDS DATA: within N business days]. If you want a full diagnosis before committing to ongoing work, we can offer a paid audit on the call.

Ship with N filled, or without the time clause. Never with a guessed N.

### What every proposal includes

**H2:** keep. **List:**

- The buyers, commercial goals and baseline measures we agreed
- Deliverables, owners and review dates
- The access and approvals we need from your team
- The fee, third-party costs and engagement terms
- The minimum term and how either side ends the engagement `[NEEDS DATA: confirm proposals state this. If the operator supplies the term, add a line here: "Minimum term: X. Notice: Y."]`

### Closing CTA

If Mira adds the inline calendar (Marcus 6a), it takes this position with this heading:

> Book a call to get your scope

If not, repeat the top action pair here.

---

## Decisions

- **D5** publishing the PPC pricing model.
- **D10** paid audit as a card, or as a line offered on the call (this draft).

## NEEDS DATA

- N: business days from call to written scope and fee.
- Minimum term and exit terms.
- Whether Microsoft Advertising is run today.
