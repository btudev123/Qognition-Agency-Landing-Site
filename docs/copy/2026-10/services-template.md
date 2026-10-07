# Service page template strings · `app/services/[service]/page.tsx`

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** DRAFT. Ruth gates, then Mira wires. No `.tsx` edited.
**Why this file exists:** five strings in the template render on all eleven `/services/*` pages, including the three layer pages. They are written once here, so `services-ai-seo.md`, `services-seo.md` and `services-ppc.md` do not repeat them.
**Objection codes:** Marcus `03` §5.1 (C1 to C7) and §5.2 (M1 to M6).

---

## Brief

1. **Search intent.** Paid (ad groups 1A, 2A, 2B land here) or organic on a service query. The reader has a vendor shortlist in mind and is checking whether we are credible.
2. **AI-citation angle.** None of its own. The answer-first block per page carries it.
3. **Internal links.** Adds a "Markets we serve" block linking `/locations/new-york`, `/locations/london`, `/locations/dubai`, `/locations/perth` (Nadia §3.3: those three cities receive no in-body link from any priority page).
4. **The one claim.** None of its own. These strings answer objections M1, M4 and C7 on every service page at once.

---

## Audit of the template

| Element | Now | Issue |
|---|---|---|
| Three info cards (lines 90 to 94) | "`{title}` starts with the buyers you need to reach…", "Agree the work, responsibilities and measurement…", "Build around the expertise and evidence your team can supply…" | Generic. Same three sentences on eleven pages. Answers nothing a buyer asked |
| Aside paragraph (line 276) | "Tell us what your buyers need to understand and where your current programme falls short. We will discuss a practical scope for `{title}`." | Vague |
| First CTA position | In the aside, which stacks after the whole article on mobile (Marcus §3.4, §5.6 rank 4a) | Layout, Mira |
| Closing `FunnelCTA` | `stage="mofu"`, headline "Explore your `{service}` opportunity" | Paid traffic treats these as BOFU (Marcus §5.6 rank 4d). Layout, Mira |
| "Explore your industry" | Links legacy `data/industries.ts` entries | Not ICP-gated; the ICP hubs live under `/industries/<icp-slug>`. Mira and Nadia |
| Generated banner | `service.kpis.join(' · ')` in mono caps | Fine once the KPIs are fixed per page |

---

## Copy

### Three info cards (lines 90 to 94)

Same three on every service page. Each answers one objection.

1. **(C7)** We commit to the work and a dated record of it. We don't promise rankings, citations or placement in any AI answer.
2. **(M1)** Rankings, AI answers, visits and qualified enquiries are reported in separate columns, never blended into one score.
3. **(M4)** We work beside your marketing team, developers or current agency. The proposal names who owns each task.

### Above-the-fold CTA pair (new, Marcus §5.6 rank 4a)

Mira places it under the answer-first block. Copy:
- Primary: `Book a call` → `/book` with funnel context
- Secondary text link: `Request a free AI visibility audit` → `/free-ai-audit` (Nadia §3.3 wants this link above the fold on `/services/ai-seo`; it serves every service page)

### Aside

- **H2:** keep "What we measure".
- **Link labels:** "Research and examples" → `Examples and methodology` (`/case-studies`). "Markets" and "Guides and resources": keep.
- **Paragraph** (line 276):

> Book a 30-minute call about `{title}`. Bring your website and the buyers you want to reach.

- **Buttons:** keep `Book a call`, `Send an enquiry`.

### "Choose your service scope" (lines 162 to 165)

**H2:** keep. **Paragraph:**

> Each page below covers one part of the work: what it involves, what your team provides and how we measure it.

### Markets we serve (new block, Nadia §3.3)

Place after "Explore your industry". Copy:

**H2:**

> Markets we serve remotely

**Body:**

> We work remotely with B2B companies selling into these markets. We have no offices in these cities.

**Links:** `New York` → `/locations/new-york` · `London` → `/locations/london` · `Dubai` → `/locations/dubai` · `Perth` → `/locations/perth`

Per-page extra link: on `/services/seo` add `Perth SEO` → `/locations/perth/seo`. On `/services/ai-seo` add `Perth AI SEO and GEO` → `/locations/perth/ai-seo`.

`[CONFIRM: "no offices in these cities" is true for all four. siteConfig.ts names Gurugram as the only HQ.]`

### Closing `FunnelCTA`, BOFU copy (`lib/funnel.ts`, `bofu` case)

Shared with `/` and `/industries`, so this changes them too. Current headline: "Let's talk about your next customers."

- `eyebrow`: Next step
- `headline`: Find out where you stand in Google and AI search.
- `primary.label`: Book a call
- `secondary.label`: Send an enquiry

`lib/funnel.ts` may belong to another developer this week (plan 1D). Mira checks before editing.

---

## Out of scope, recorded

- `data/services.ts` line 60 (`strategy` → Fractional CMO) contains an em dash: "Senior marketing leadership on retainer — strategy, team direction, and board-ready reporting." Suggested: "Senior marketing leadership on retainer: strategy, team direction and board-ready reporting."
- The generated sub-service template (`data/seoExpansion.ts` `buildGeneratedServiceSubPage`) renders on every non-custom sub-page. Its "How We Measure It" section lists "revenue influence" as a usual measure, and its "What Qognition Builds" section states "The intended outcome is LLM citations…" for every AI SEO sub-page. Both read as promised outcomes. The two layer sub-pages in this pass (GEO, local SEO) get custom entries (`services-geo.md`, `services-local-seo.md`). The template itself needs a separate pass.

## NEEDS DATA

- Confirmation that no office exists in New York, London, Dubai or Perth.
