# Search Console baseline by URL group

Source: Google Search Console, domain property `qognitionagency.com`, Performance →
Pages, top 1,000 rows, 26 Jun – 25 Sep 2026. Pulled 2026-09-28.

Site totals over the period: **187 clicks, 73.7K impressions, 0.3% CTR, average
position 32.3.** 3.89K pages indexed, 683 not indexed (111 returning 404).

## Group totals

| Group | Pages in top 1,000 | Clicks | Impressions | Clicks per page |
|---|---:|---:|---:|---:|
| `/` (homepage) | 1 | 62 | 323 | 62.0 |
| `/locations/*` | 632 | 80 | 50,978 | 0.13 |
| `/directory/*` | 202 | 17 | 8,266 | 0.08 |
| `/glossary/*` | 60 | 15 | 5,185 | 0.25 |
| `/services/*` | 34 | 3 | ~1,100 | 0.09 |
| `/case-studies/*` | 27 | 3 | 580 | 0.11 |
| `/comparisons/*` | 5 | 1 | 132 | 0.20 |
| `/blog/*` | 5 | 0 | 207 | 0.00 |
| `/team` | 1 | 2 | 150 | 2.0 |

## What this settles

**The homepage is the site.** 62 of 187 clicks from one URL. The other 985 URLs in
the top 1,000 produce 125 clicks between them across three months.

**`/locations/*` is 632 pages earning 0.13 clicks each per quarter** against 50,978
impressions. High impressions, no clicks, deep average position. This is the
clearest "indexed but worthless" signature on the domain.

**`/services/*` is not a ranking asset.** 34 pages in the top 1,000, 3 clicks total.
The best performer is `/services/ai-seo/entity-optimization` with 349 impressions
and **zero** clicks. `/services` itself: 130 impressions, zero clicks.

This removes the main objection to ADR-0001 moving the layer pages to top level.
There is no meaningful ranking equity at `/services/seo`, `/services/ai-seo` or
`/services/ppc` to protect. Redirects still required, but the risk is low.

**`/glossary/*` is the highest clicks-per-page of any programmatic group** (0.25),
and separately held the domain's best-ranking URL
(`/glossary/ai-seo-and-sge-strategy-audit`, position 7.9, 1,497 impressions) which
was returning 404 until 2026-09-27. Do not treat this group as uniformly thin.

## Limits

- Top 1,000 rows only; GSC caps the table. Groups with many URLs
  (`/locations/*` at 632 of ~2,381 live) are under-counted in pages, though the
  long tail by definition carries fewer clicks than what is shown here.
- Impressions per group are summed from the visible rows, so treat them as a floor.
- No backlink data. **A URL with external links is never 410'd regardless of
  clicks**, and that check has not been run. `[NEEDS DATA: backlink export]`
