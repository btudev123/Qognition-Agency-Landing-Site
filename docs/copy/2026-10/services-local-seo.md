# Local SEO sub-page `/services/seo/local-seo` · copy v1

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** DRAFT. Ruth gates, then Mira wires. No `.tsx` edited.
**Data:** generated today by `buildGeneratedServiceSubPage()` in `data/seoExpansion.ts`. This draft is a **custom entry for `CUSTOM_SERVICE_SUB_PAGES`**. Rendered by `app/services/[service]/[subService]/page.tsx`. URL unchanged.
**Objection codes:** Marcus `03` §5.1 (C1 to C7) and §5.2 (M1 to M6).

---

## Brief

1. **Search intent.** "local seo for b2b", "local seo for manufacturers", or a click from `/services/seo`. The reader runs a firm whose buyers do care about distance: a lab within courier range, an MSP that sends engineers on site, a broker licensed in their state. Most B2B local SEO advice online is written for restaurants and plumbers.
2. **AI-citation angle.** "For a B2B firm, local SEO matters only when the buyer chooses by location." A conditional definition models rarely get from consumer-focused pages.
3. **Internal links.** Out: `/services/seo`, `/services/ai-seo`, `/locations/perth/seo`, `/book`. In: `/services` grid card 02 sub-link, `/services/seo` capabilities grid.
4. **The one claim this page owns.** We tell you when local SEO is not worth doing, and we never build a profile or page for a place where you have no presence.

---

## Audit of the current page

| | |
|---|---|
| What it says now | Generic template. Intro: "Business-profile, location-content and review practices for businesses with genuine local relevance." Then the shared "Key Takeaways", "What Qognition Builds" (outcome: "qualified organic demand, better indexation, and stronger authority"), "How It Gets Discovered", "How We Measure It" (lists "revenue influence"). Deliverables include "Internal links to services, industries, locations, case studies, and tools" |
| Positioning | No B2B reason to care. Does not name the surfaces `CLAUDE.md` §1 defines |
| Objections not answered | M5, C7 |
| §1 / §4 issues | `CLAUDE.md` §4: countries served are never offices, and Nadia §4.2: no Business Profile for any market city. The page says nothing about it, and a buyer could reasonably ask us to set up profiles in cities where they have no address. "Revenue influence" as above |
| Banned words, em dashes | None |

**Verdict: rewrite** as a custom entry.

---

## The entry

**`serviceId`:** `seo` · **`slug`:** `local-seo`

**`title` and `description` (meta).** Nadia owns. Proposed:
- `title`: Local SEO for B2B Companies | Qognition
- `description`: Local SEO for B2B firms whose buyers choose by location: Google Maps, the local pack, Bing Places, Business Profile, reviews and listings.

**`h1`:**

> Local SEO for B2B Companies

**`intro`.** Answer-first, 57 words, no number:

> Local SEO is the work on Google Maps, the local pack, Bing Places, your Business Profile, reviews and listings. For a B2B firm it matters when buyers choose by location: a lab within courier range, an MSP that can send an engineer on site, a broker licensed in their state. If location doesn't shape the decision, we'll say so.

**`deliverables`:**

1. A check of whether location shapes your buyers' decision at all
2. Business Profile and Bing Places fixes, for real addresses only
3. Categories and services that match what you sell to businesses
4. Consistent name, address and phone across the listings your buyers use
5. A review request process for real clients, with no incentives
6. Location pages only where you have a presence or documented demand

**`sections`:**

1. **When local matters in B2B.** It matters when the buyer needs you nearby: on-site service, sample delivery, a license that applies in one state, a site visit before a contract. It matters less when you sell software or advice that works anywhere. We check this first, because local work on the wrong firm is wasted effort.
2. **Real locations only.** We set up and fix profiles for addresses where you operate. We don't create profiles or city pages for places where you have no presence. Listing an office that doesn't exist misleads buyers. `[Ruth 2026-10-07: "and Google's own guidelines prohibit it" cut. Ruth has no web access and will not invent a source. Re-add the clause only with the Google Business Profile guideline URL and an access date.]`
3. **Reviews from real clients.** A B2B buyer reads reviews for evidence of the work, not star counts. We help you ask real clients at the right moment and reply to every review. We never buy, gate or incentivize reviews.
4. **How we measure it.** Business Profile actions (calls, direction requests and website clicks), rankings in the local pack for the queries that matter, and the enquiries that follow. Each is reported in its own column.

**`faqs`:**

| `question` | `answer` | Code |
|---|---|---|
| Do B2B companies need local SEO? | Only when the buyer chooses by location. If your buyers would hire you from anywhere, we'll put the effort into SEO, AI SEO or GEO instead. | M5 |
| Can you create listings in cities where we don't have an office? | No. A profile needs a real address where you serve clients. We can build market pages that explain how you serve a region remotely, labelled as such. | C7 |
| Does local SEO affect AI answers? | Assistants and Google's AI features can draw on listings, profiles and reviews when a question involves a place. We test those questions separately and report them with dates. | M3 |
| Can we do local SEO without the rest? | Yes, if location is what limits your enquiries. On the call, we'll tell you if something else is holding it back. | D6 |

**`relatedLinks`:**

| `label` | `href` |
|---|---|
| B2B SEO services | `/services/seo` |
| AI SEO and GEO for B2B | `/services/ai-seo` |
| Perth SEO for B2B companies | `/locations/perth/seo` |
| Book a call | `/book` |

---

## Decisions

- **D6** decided 2026-10-07: a client can start with any one layer. FAQ 4 released; the page ships with all four FAQs.

## NEEDS DATA

- The Google Business Profile guideline reference, with an access date, for section 2.
