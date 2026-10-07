# Case study draft · California Machinery Movers · v1

**PENDING OPERATOR: client naming permission.** Nothing in this file ships, and the client is not named anywhere on the site, until the operator holds written permission (`guardrails.md`: "Named client results or logos without written permission" is prohibited). Until then the record carries `publishGate: 'hold'`.

**Author:** Theo (content) · 2026-10-07
**Status:** DRAFT. Ruth gates. Mira or Luke adds the record to `data/case-studies/` only after permission.
**Source:** operator-supplied PDF "Case Studies - SEO (1)", pages 2 to 5: a GA4 home-card screenshot, a GA4 user-attributes screenshot dated "Last 30 days, Aug 2 - Aug 31, 2025", and a Semrush keyword-positions table. Read 2026-10-07.

---

## Brief

1. **Search intent.** An owner or operations lead at an industrial service firm asks, "Have you done this for a business like mine?" They want something they can check, not a percentage with no date.
2. **AI-citation angle.** "In GA4, California Machinery Movers recorded 14K active users across all channels for 2 to 31 August 2025, up 89.9% on the preceding 30 days." Liftable only with the date window, the source and "all channels" attached.
3. **Internal links.** Out: `/services/seo`, `/services/seo/local-seo`, `/case-studies/methodology`, `/book`. In: `/case-studies`, `/services/seo/local-seo` (as its first real local SEO example, once published).
4. **The one claim this page owns.** One dated GA4 observation and one rankings snapshot, each stated with exactly what it does and does not show.

---

## The only claims this evidence supports

| Claim | Evidence | Limits, stated on the page |
|---|---|---|
| GA4 recorded 14K active users from 2 to 31 August 2025, up 89.9% on the preceding 30 days | GA4 home card: "Active users 14K ↑89.9%", "Last 30 days", chart axis 03 Aug to 31; the user-attributes screenshot names the window "Aug 2 - Aug 31, 2025" | All channels, not organic search only. GA4 rounds to "14K". The preceding-period value is not shown, so no baseline figure is printed. A rise in users is not attributed to our work |
| Terms like "machinery movers", "equipment movers near me", "machinery relocation" and "california machinery movers" showed in the local pack or the top 10 | Semrush positions table for californiamachinerymovers.com | The table has no visible date `[NEEDS DATA: Semrush export date]`. Rankings are a snapshot, not a permanent position. US location assumed, `[CONFIRM: Semrush database and location]` |

**Not supported, and kept out:**

- The PDF's own line "Organic traffic increased by 89%". The GA4 figure is all channels, not organic.
- "Within just 1 month of execution". No engagement start date appears anywhere in the evidence.
- "Consistent inbound calls and qualified leads". The same GA4 card shows **Key events: 0**, so no conversion was being recorded in that window. The page cannot claim leads, and it says so.
- "Over 85% of visitors were from the USA". It is not part of the operator's approved claim. Nothing is gained by computing it from a screenshot.
- The Search Console panel on page 4. Its previous-period figures read zero, which suggests a new property. No comparison is possible.

---

## Record fields (`CaseStudy`, `data/case-studies/types.ts`)

Written to the existing type. Three fields do not fit the type today, flagged for Kyle and Mira.

| Field | Value |
|---|---|
| `id` | `california-machinery-movers-local-seo` `[CONFIRM slug with Nadia]` |
| `client` | California Machinery Movers **(PENDING permission)** |
| `domain` | californiamachinerymovers.com |
| `market` | California `[NEEDS DATA: city for the Business Profile address]` |
| `state` / `stateName` | CA / California |
| `niche` | **Does not fit.** `Niche` is `'hvac' \| 'dental' \| 'insurance'`. This needs a new value, for example `'industrial-services'`, mapped to the right ID in `data/b2b/icp/icp-taxonomy.json` `[NEEDS DATA: taxonomy ID, Nadia or Iris]`. Kyle decides whether `Niche` widens |
| `services` | `['ai-seo']` is the closest existing key, but the work was SEO and local SEO, not AI SEO or GEO. **Does not fit.** `ServiceKey` needs `'seo'` or `'local-seo'`. Do not file it under AI SEO |
| `tier`, `retainerBand` | `[NEEDS DATA]`. Leave blank. Never print a retainer band (2026-10-03 no-prices rule) |
| `headline` | Industrial equipment relocation in California: local-pack and top-10 rankings for core service terms |
| `snapshot` | A California company that moves and relocates industrial machinery and equipment for businesses. |
| `startingPosition` | `[NEEDS DATA: dated description of the site before the work. The PDF says "no inbound leads or phone calls" and "minimal visibility", with no date or evidence. Not usable as written]` |
| `coreProblem` | The goal: appear in Google's local results and on page one when California businesses search for machinery movers. `[Ruth: written as a goal. No evidence shows the before-state; see startingPosition]` |
| `diagnosis` | Reported by our team: crawl and indexing issues, slow pages on mobile, weak internal linking, service pages not matched to the terms buyers search, and an incomplete Business Profile. `[Reported, not separately evidenced]` |
| `differentiator` | Local SEO for a B2B service whose buyers choose by location: a manufacturer moving a production line needs a mover that operates in its region. |
| `engines` | `[]`. No engine use is evidenced for this engagement |
| `kpis` | See below |
| `benchmarkKeys` | `[]` |
| `auditedAt` | `[NEEDS DATA: date of the site audit]` |
| `image` | Pexels: industrial machinery on a flatbed or in a warehouse. No people in offices (`CLAUDE.md` §9, authority block 2026-10-07) |
| `publishGate` | `'hold'` |
| `dataFlag` | PENDING OPERATOR: client naming permission. Also missing: Semrush export date, engagement start date |

**`kpis`: does not fit the target model.** The type expects a baseline and a target, with `actual` filled from reporting. This engagement has an observation and no recorded target. Proposed single row, for Kyle's decision on whether `target` can be empty for an observed record:

| `label` | `baseline` | `target` | `change` | `unit` | `actual` |
|---|---|---|---|---|---|
| Active users, all channels (GA4) | `[NEEDS DATA: preceding-30-day value from a GA4 export]` | none recorded | +89.9% vs preceding 30 days | GA4 active users, all channels, 2 to 31 Aug 2025 | 14K (GA4 display, rounded) |

A screenshot is weaker than an export. `[NEEDS DATA: GA4 export for 3 Jul to 31 Aug 2025]` would supply the exact baseline and the channel split, and would show whether organic search drove the rise.

---

## Page copy

**H1** (`headline`):

> Industrial equipment relocation in California: local-pack and top-10 rankings for core service terms

**Who the client is:**

> California Machinery Movers moves and relocates industrial machinery and equipment for businesses in California.

**The goal:**

> Appear in Google's local results and on page one when California businesses search for machinery movers.

**What we did** (reported by our team):

`[Ruth 2026-10-07: these bullets come from neither GA4 nor Semrush. Before release the operator confirms each one, and the link-building bullet needs a backlink export or it is cut.]`

- Audited the site for crawl and indexing issues, and fixed broken links and internal linking.
- Improved page speed and mobile usability.
- Matched service pages to the terms buyers search, such as "machinery movers" and "equipment relocation".
- Added pages for the California areas the company serves.
- Completed the Google Business Profile with accurate categories, services and photos.
- Built listings in California directories, and earned links from industry associations, logistics sites and local business partners.

**What we observed:**

> In Google Analytics 4, the site recorded 14K active users from 2 to 31 August 2025. That was up 89.9% on the preceding 30 days. This figure covers every channel, not organic search alone, and GA4 rounds it.

> A Semrush positions report showed terms like "machinery movers", "equipment movers near me", "machinery relocation" and "california machinery movers" in Google's local pack or in the top 10 results. [NEEDS DATA: report date.] Rankings are a snapshot on that date, not a permanent position.

**What this does not show:**

> These figures don't show leads. GA4 recorded no key events in that window, so we can't tell you how many visitors called or enquired. A rise in users across all channels also has more than one possible cause, so we don't attribute all of it to our work.

> This was an SEO and local SEO programme. It is not evidence of AI SEO or GEO work.

**Evidence status line:**

> Observed in GA4, 2 to 31 August 2025. Rankings from a Semrush report [date]. Work reported by our team.

**Actions:** `Book a call` → `/book` · `Local SEO for B2B companies` → `/services/seo/local-seo`

---

## Not used, per operator instruction

The same PDF contains three other cases. None is used:
- Opal Consulting: its "+220%" contradicts its own Search Console screenshot.
- Real Indian Followers.
- Smith & Associates.

## NEEDS DATA

- Written client naming permission (operator). Blocks everything.
- Semrush export date, database and location.
- Engagement start date, and the date of the site audit.
- GA4 export covering 3 July to 31 August 2025, for the baseline value and the channel split.
- Business Profile city.
- Taxonomy ID for industrial equipment relocation.
- Kyle's decision on widening `Niche` and `ServiceKey`, and on observed records with no target.
