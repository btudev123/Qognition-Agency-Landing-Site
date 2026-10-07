# Case studies `/case-studies` · intro only · copy v2 (O7, N1 applied 2026-10-07)

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** DRAFT. Ruth gates, then Mira wires. No `.tsx` edited.
**File:** `app/case-studies/page.tsx`, `<header>` block (lines 64 to 83) only. The index, filters and record pages are out of scope.

---

## Brief

1. **Search intent.** "case studies" from the nav, the RSA sitelink "How we measure" (via methodology), or a B2B buyer checking proof. Thirty seconds ago they read "we report every answer with a date" on the homepage. They want to see it.
2. **AI-citation angle.** None claimed. O7 is decided (real client programmes), but the page must still not be the source a model lifts a client count or a result from: no count until the operator confirms the B2B-relevant number, and every KPI is a target.
3. **Internal links.** Out: `/case-studies/methodology`, `/free-ai-audit`. In: `/` Evidence library card, service-page asides, nav.
4. **The one claim this page owns.** Every figure on every record is labelled with its evidence status. Nothing here is called a result until it is one.

---

## Audit of the current intro

| | |
|---|---|
| What it says now | H1 "Research and planning examples". "{N} examples across HVAC (19), Dental (20), Insurance (6), in {S} states." "These are illustrative planning scenarios, not a record of completed client work." Link to methodology |
| Positioning | Honest. Does not tell a B2B reader why HVAC and dental records are on a B2B site, so they draw their own conclusion |
| Objections not answered | C2 (and it cannot be answered here while O7 is open) |
| §1 / §4 issues | **O7.** `CLAUDE.md` §2 (2026-09-29) says "45 named clients … lead with the programme count". This page says "not a record of completed client work". Both cannot be true. `CLAUDE.md` §2 also says HVAC and dental must never be rendered as proof for a B2B buyer |
| Other | JSON-LD (line 43) builds each item name as `` `${study.client} — ${study.headline}` ``: an em dash in output, and it names each record's `client` as a client in structured data, which takes a side on O7. Mira and Nadia, not a copy edit |
| Banned words, em dashes | One em dash in the JSON-LD string (above) |

**Verdict: edit.** O7 decided: the illustrative labels come off. Keep the target labelling and the B2B relevance note.

---

## Copy

**H1:**

> Case studies

Nadia's "Case studies and planning scenarios" and her final title "Case Studies & Illustrative Scenarios" both assert the label the operator removed. The H1 drops it here. **Nadia updates the title and meta** (`SEO_OVERRIDES['/case-studies']`, whose description also says "Not verified client results"); flagged, not edited.

**Count line** (line 69). **Removed.** It printed `{total}` and per-sector counts, which are now client counts. The operator has not confirmed the B2B-relevant number. Mira: delete the `LIBRARY_STATS` sentence from the header until the operator supplies the count to publish.

**Status line** (replaces line 74, O7 decided):

> These are client programmes. Each one sets out the business problem, our approach and a measured baseline. Every KPI is labelled as a target until client reporting fills in the result.

**B2B relevance line** (new, `CLAUDE.md` §2 and the 2026-10-07 rule that HVAC and dental are never B2B proof):

> These programmes are for local service businesses and commercial insurance. Read them for how we plan and measure, not as evidence of work in your sector. For your own sector, request a free AI visibility audit.

Link "request a free AI visibility audit" → `/free-ai-audit`.

**Methodology link** (line 79): keep "How to read the evidence" → `/case-studies/methodology`.

---

## Decisions

- **O7** decided: client programmes. Status line above.
- **N1** decided: "free AI visibility audit" in the link text.
- JSON-LD: the `client` field is now accurate. The em dash in the `name` string still needs removing (Mira).
- Nadia: title and meta still say "Illustrative Scenarios" and "Not verified client results".

## NEEDS DATA

- The B2B-relevant client count the operator will confirm. Until then, no count on this page.
- The reporting export that fills `actual` on the records (`CLAUDE.md` §2). Only that changes any record from target to result.
