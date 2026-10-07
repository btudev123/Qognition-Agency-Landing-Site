# Book a call `/book` · copy suggestions only

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** SUGGESTIONS. Mira is restructuring `app/book/page.tsx` and others are editing `components/shared/CalBooking.tsx`. Nothing here is an edit. Ruth gates the strings; Mira decides placement.
**File:** `app/book/page.tsx`. Operator rule (2026-10-07): "/book is the calendar only". The comment in the file says "One heading, one line, the calendar."
**Objection codes:** Marcus `03` §5.1 (C1 to C7).

---

## Brief

1. **Search intent.** Every "Book a call" button on the site. The visitor has decided. What loses them now: a slow or invisible calendar (Marcus `05`), and not knowing what the call is.
2. **AI-citation angle.** None. This page should not rank.
3. **Internal links.** Out: none besides the calendar and its fallback link. In: every primary CTA.
4. **The one claim.** It is a 30-minute working call.

---

## Audit of the current page (working tree)

| | |
|---|---|
| What it says now | H1 "Book a 30-minute call". Line: "Pick a time that suits you." The calendar |
| Positioning | Fine. Already stripped to one element |
| Objections not answered | C4 (what happens on it), C5 (who), C3 (what happens after) |
| §1 / §4 issues | None. "30-minute" is verified against the calendar (commit `c95b929`) |
| Metadata | `description`: "…for your B2B growth program." Generic. Not in Nadia's 18 |
| Banned words, em dashes | None |

**Verdict: keep.** The H1 stays. One line can carry the agenda without adding a second element.

---

## Suggestions

**H1:** keep "Book a 30-minute call".

**The one line under the H1** (replaces "Pick a time that suits you."). Marcus §5.6 rank 1a, compressed to fit the one-line rule:

> We'll cover who you sell to, what we'd check first in Google and AI search, and whether we're a fit. Bring your website.

**If the operator allows a short agenda block above the calendar** (Marcus's full version). It adds words, not a second path:

- **What we cover:** your buyers, what we would check first in Google and AI search, and whether we are a fit.
- **Bring:** your website and the buyers you want to reach.
- **You'll speak with:** [NEEDS DATA: name and role]. Cut this row if unknown.
- **Afterwards:** a written scope and fee [NEEDS DATA: within N business days]. Cut the time clause if unknown.

**Calendar fallback link.** Marcus `05` §2 edit 4 moves it above the iframe, always visible. His line, for Ruth:

> Calendar not showing? Open it in a new tab.

**Meta description** (not Nadia's page; proposed for her):

> Book a 30-minute call with Qognition Agency about AI SEO, GEO, SEO or PPC for your B2B company. Bring your website and the buyers you want to reach.

## NEEDS DATA

- Who takes the call.
- N: business days to written scope and fee.
