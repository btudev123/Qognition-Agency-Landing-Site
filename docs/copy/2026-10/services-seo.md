# B2B SEO `/services/seo` · copy v1

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** DRAFT. Ruth gates, then Mira wires. No `.tsx` edited.
**Data:** `data/services.ts`, entry `"id": "seo"` (line 383). Shared template strings: `services-template.md`.
**Objection codes:** Marcus `03` §5.1 (C1 to C7) and §5.2 (M1 to M6).

---

## Brief

1. **Search intent.** Paid ad group 2A (`b2b seo services`, `seo for b2b companies`, `b2b seo consultant`) and organic "enterprise SEO agency" (Nadia §3.1 row 3). The reader runs marketing at a B2B firm, may already have an SEO agency, and wants to know if this one measures anything beyond traffic. Never `b2b seo agency`: that string is a white-label term (D1 in Marcus `03`).
2. **AI-citation angle.** Nadia §4.1: "What does enterprise SEO include for a B2B company?" Answered in 40 to 60 words, no number.
3. **Internal links.** Out: `/services/ai-seo`, `/services/seo/local-seo`, `/services/seo/technical-seo`, `/locations/perth/seo`, market pages (template block). In: `/services` grid card 02, `/` FourLayers, `/services/ai-seo`, `/services/seo/local-seo`.
4. **The one claim this page owns.** SEO for a B2B firm is judged against qualified enquiries, with search, analytics and CRM reported in separate columns.

---

## Audit of the current page

| | |
|---|---|
| What it says now | H1 (Nadia, final) "Enterprise and B2B SEO Services". Lead about technical accessibility, purchasing questions, "rankings alone do not show commercial fit". Three good deep-dives. Fifteen sub-services. Four FAQs |
| Positioning | The best of the three layer pages. Does not say how SEO feeds AI SEO and GEO, which is the reason a B2B buyer would pick us for SEO |
| Objections not answered | C2, C3, C7 (template only), M4 partly |
| §1 / §4 issues | "Keyword Research: tied to revenue, not vanity volume" claims a revenue tie we do not measure at keyword level. "E-commerce SEO" and "for global brands" are consumer register. Tech stack unverified |
| Banned words, em dashes | None |

**Verdict: edit.**

---

## Copy, field by field

**`title`:** keep "B2B SEO". **H1:** Nadia's, final.

**`kpis`:**

```
"Rankings for buyer queries",
"Indexable priority pages",
"Qualified organic enquiries"
```

**`fullDescription`.** Answer-first block. 50 words, no number. "Three" is the count of items that follow, not a statistic:

> Enterprise SEO for a B2B company covers three things. Technical work, so Google can crawl and index every page that matters. Commercial pages that answer what a buying team checks before it shortlists. Authority work, so other sites back up what you claim. We measure it against qualified enquiries, not traffic.

**`deepDive`** (three kept and tightened, one added):

1. **Start with pages Google can reach.** We check status codes, canonicals, rendering, sitemaps and internal links. Then we fix whatever stops your commercial pages being found, starting with the pages closest to a sale.
2. **Publish what buyers need to compare.** Applications, specifications, integrations, implementation effort and limits. We write with your subject experts and add evidence they can stand behind, instead of repeating what already ranks.
3. **Report search and sales separately.** Search Console shows discovery. Analytics shows visits. Your CRM shows enquiries and opportunities. We keep them in separate columns and say where a journey cannot be attributed.
4. **SEO is the base for AI search (new).** Google's AI Overviews and AI Mode draw on pages Google can crawl and index. The same technical and content work that ranks you in Google is the foundation for AI SEO and GEO. See [AI SEO and GEO](/services/ai-seo).

**`subServices[].description`.** Names and slugs unchanged. Only the changed rows:

| `name` | New `description` |
|---|---|
| Local SEO | Google Maps, the local pack, Business Profile, reviews and listings, for B2B firms whose buyers choose by location. |
| E-commerce SEO | Category and product pages for B2B catalogs: parts, materials, lab supplies and equipment. |
| International SEO | hreflang, multi-region structure and localized pages for B2B firms selling into several countries. |
| Programmatic SEO | Page systems for services, industries and locations, each with original facts and a reason to exist. We don't publish a page because a URL combination exists. |
| Keyword Research | Buyer-intent keyword and topic mapping, focused on the queries that come before an enquiry. |

All other descriptions: keep.

**`process`** (four steps):

| `title` | `description` |
|---|---|
| Crawl and baseline | Crawl the site, pull Search Console data and record a dated baseline. |
| Fix and publish | Ship technical fixes and commercial pages in priority order, each with an owner. |
| Earn references | Build mentions and links from sources your buyers already trust. |
| Review against enquiries | Compare rankings, visits and qualified enquiries with the baseline on the agreed schedule. |

**`techStack`.** `[NEEDS DATA: which of Ahrefs, Semrush, Screaming Frog, Clearscope, the Search Console API and Python scripts are in active use]`. Also correct "SEMRush" to "Semrush" if kept.

**`faqs`:**

| `question` | `answer` | Code |
|---|---|---|
| How does SEO relate to AI search? | Google's AI features draw on pages it can crawl and index, so technical SEO and clear commercial pages are the foundation. We still measure AI answers separately from rankings, because a page can rank and not be cited. | M3 |
| Do you guarantee rankings? | No. Google controls its results. We commit to the agreed work, a dated baseline and a report you can check against it. | C7 |
| Do you work on large or multi-market sites? | Yes. Large sites need crawl budget, international setup and page templates handled carefully. We scope that on the call, once we have seen the site. | M5 |
| How does AI support the work? | keep the current answer | n/a |
| How is an engagement scoped? | We agree the buyer groups, services, markets, responsibilities and measurement before work starts. SEO can run on its own or beside AI SEO and GEO. PPC is scoped separately. | C3, M6 |
| What happens on the first call? | It takes 30 minutes. We cover who you sell to, what we would check first, and whether we are a fit. You can send an enquiry instead if you prefer. | C4 |

**Market links:** per `services-template.md`, plus `Perth SEO` → `/locations/perth/seo`.

---

## NEEDS DATA

- Tools in active use (tech stack).
