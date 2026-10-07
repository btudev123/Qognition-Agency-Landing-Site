# Services hub `/services` · copy v1

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** DRAFT. Ruth gates, then Mira wires. No `.tsx` edited.
**File:** `app/services/page.tsx` (one-line component) and `data/growthPositioning.ts` (`GROWTH_PILLARS`).
**Objection codes:** Marcus `03` §5.1 (C1 to C7) and §5.2 (M1 to M6).

---

## Brief

1. **Search intent.** "digital marketing services" plus a qualifier (Nadia's target, §3.1 row 2), or a click from the nav. The reader is choosing which service page to open. They want a map, fast.
2. **AI-citation angle.** "Qognition Agency leads with AI SEO and GEO for B2B companies; SEO, local SEO and B2B PPC are the supporting layers, with content, web, branding and CRO scoped only where they move qualified enquiries."
3. **Internal links.** Out, with Nadia's anchors (§3.1): `/services/ai-seo` "AI SEO and GEO", `/services/seo` "B2B SEO services", `/services/ppc` "B2B PPC management", `/services/content` "B2B content marketing services", `/services/web-development` "B2B web design and development", `/services/branding-creative` "B2B branding and creative", `/services/cro-analytics` "Conversion rate optimization and analytics". Plus the two layer sub-pages: `/services/ai-seo/generative-engine-optimization`, `/services/seo/local-seo`. In: nav, footer, every service page's "Back to Services".
4. **The one claim this page owns.** We lead with AI SEO and GEO and say exactly which surface each layer covers. Iris `01` §A.6: none of the seven competitors separates AI SEO from GEO.

---

## Audit of the current page

| | |
|---|---|
| What it says now | Eyebrow "AI SEO & GEO FOR B2B". H1 "Be easier to find. Give buyers a reason to enquire." Intro about technical SEO, content, authority, then paid and conversion. Four `GROWTH_PILLARS` cards: AI Search, Demand, **ABM**, **Revenue Systems**, each linking to `/growth/services/*`. Two "starting point" cards |
| Positioning | Half right. The intro leads correctly. The pillar grid sells the retired "AI Search, Demand, ABM and Revenue Systems" model (Nadia §2.6) |
| Objections not answered | M4 (partly, in card 1), M6 (PPC is not named), C3 |
| §1 / §4 issues | Links to **0 of its 7 priority children** (Nadia §2.6). The ABM pillar puts "ABM" next to agency services on a page `abm agency` searchers could land on (`CLAUDE.md` 2026-09-29 white-label rule). No numbers, no guarantees |
| Banned words, em dashes | None. "↗" on internal links (`Book a call ↗`, every pillar title) implies external |

**Verdict: rewrite.** The page exists to route, and it routes to the wrong tree.

---

## Copy

**Eyebrow:** keep "AI SEO & GEO FOR B2B".

**H1.** Nadia's §3.3 string:

> Digital marketing services, led by AI SEO and GEO

**Intro** (`growth-page-intro`). Answer-first:

> We run AI SEO and GEO for B2B companies, including SaaS. SEO and local SEO are the supporting layers, and B2B PPC runs alongside. Content, web development, branding and CRO support that work, and we scope them only where they move qualified enquiries.

**Actions:**
- `Book a call` → `/book` (drop the "↗")
- `Send an enquiry →` → `/contact#enquiry`

**`AIPlatforms`:** keep.

### Service grid (replaces the `GROWTH_PILLARS` grid in this position)

Mira: render these seven as the grid. Same `growth-pillar` card markup, no new design. Anchor text is the card title and must stay as written: those are Nadia's keyword anchors.

| `number` | Title (anchor) | `href` | Description | Sub-links |
|---|---|---|---|---|
| 01 | AI SEO and GEO | `/services/ai-seo` | How Google AI Overviews, AI Mode and assistants such as ChatGPT, Perplexity, Gemini, Claude and Copilot describe your firm. Entity work, answer-ready pages and dated prompt tracking. | "GEO for assistants" → `/services/ai-seo/generative-engine-optimization` · "AEO for AI Overviews" → `/services/ai-seo/answer-engine-optimization` |
| 02 | B2B SEO services | `/services/seo` | Technical SEO, commercial pages and authority work for Google search results. Measured against qualified enquiries, not traffic. | "Local SEO" → `/services/seo/local-seo` · "Technical SEO" → `/services/seo/technical-seo` |
| 03 | B2B PPC management | `/services/ppc` | Google Ads and LinkedIn campaigns, judged on qualified enquiries and booked meetings. Scoped and priced separately. | none |
| 04 | B2B content marketing services | `/services/content` | Service pages, comparisons and expert guides written to rank in Google and to be quotable in AI answers. | none |
| 05 | B2B web design and development | `/services/web-development` | Fast, accessible sites with clear buyer journeys and conversion tracking, so search work has somewhere to land. | none |
| 06 | B2B branding and creative | `/services/branding-creative` | Messaging and sales assets that describe your firm the same way everywhere, on your site and off it. | none |
| 07 | Conversion rate optimization and analytics | `/services/cro-analytics` | Find where enquiries drop off, and track every step from the first visit to a booked call. | none |

Card 03: Microsoft Advertising cut by Ruth (2026-10-07) as unconfirmed. Add it back only when `[CONFIRM: the team runs Microsoft Advertising accounts today]` is answered yes.

### The old pillars, demoted (decision D7)

Nadia §3.3 asks to demote `GROWTH_PILLARS` below the grid. Two of the four (ABM, Revenue Systems) describe the retired positioning. Recommendation: show only AI Search and Demand, under a quieter heading. The `/growth/services/*` URLs stay live either way; this changes links, not pages.

**H2:**

> Longer guides

**Intro line:**

> Background reading on the search and demand work behind these services.

Cards: `GROWTH_PILLARS` entries 01 (AI Search) and 02 (Demand) as they are, with the "↗" removed from titles. Entries 03 (ABM) and 04 (Revenue Systems): **operator decision D7** to drop from this hub.

### Choose the right starting point

**H2:** keep "Choose the right starting point."

| Card | `h3` | Body | Answers |
|---|---|---|---|
| 1 | Add to an existing team | Add specialist AI SEO, GEO and technical SEO capacity beside your marketing team or current agency. The proposal names who owns each task and who approves content. | M4 |
| 2 | Start with one layer | Start with the layer you need: AI search, SEO or PPC. On the call, we will tell you if another layer is holding it back. | M6, ICP §2 |

---

## Not changed

- Title and meta description: Nadia's, final (`SEO_OVERRIDES['/services']`).
- No "B2B" before "marketing" anywhere on this page. "b2b marketing agency" is one of the five white-label strings (`CLAUDE.md` 2026-09-29). Checked: the copy above does not contain it.

## Decisions

- **D6** decided 2026-10-07: a client can start with any one layer. Original card 2 restored.
- **D7** Drop the ABM and Revenue Systems pillars from this hub.

## NEEDS DATA

- Whether the team runs Microsoft Advertising accounts.
