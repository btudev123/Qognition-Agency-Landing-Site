/* THE PUBLICATION GATE FOR /industries/*.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY THIS FILE EXISTS.
 *
 * Before it, `data/industries.ts` was not a data file. It was a page generator
 * with seven consumers, none of them opt-in:
 *
 *   1. app/industries/[industry]/page.tsx                  generateStaticParams
 *   2. app/industries/[industry]/[subIndustry]/page.tsx    generateStaticParams
 *   3. app/services/[service]/industries/[industry]/page.tsx   SERVICES x INDUSTRIES
 *   4. lib/sitemap.ts#industryRoutes                       priority 0.90
 *   5. lib/sitemap.ts#programmaticRoutes                   SERVICES x INDUSTRIES again
 *   6. components/shared/CrossLinks.tsx                    unfiltered
 *   7. data/navigation.ts#INDUSTRY_MENU                    global header
 *
 * `Industry` carried no publication field of any kind, so adding one row to an
 * array published an indexable page, and adding it to a route that multiplies
 * against SERVICES published eleven. That is the precise mechanism that put
 * 2,161 location pages into the sitemap, and the ICP taxonomy locked on
 * 2026-09-28 has 15 meta-verticals and 120 sub-niches waiting behind it.
 *
 * THE DESIGN, AND THE ONE DECISION IN IT.
 *
 * The gate is an explicit frozen allowlist, not "indexable unless marked
 * otherwise". Absence-means-published would have left the hole exactly where it
 * was: a new row with no publication field would still index, which is the
 * failure mode being closed. So the current 11 industries and 66 sub-industries
 * are enumerated below by hand, and anything not in that enumeration is not
 * published until someone adds it here deliberately.
 *
 * WHAT THIS CHANGES TODAY: nothing. Every currently-live URL is in the list, so
 * the sitemap is byte-identical and no existing page's meta, canonical or robots
 * directive is touched. The operator's hard constraint is that existing meta
 * titles, descriptions, URLs and internal linking do not change, and this file
 * is written to be provably compatible with it. The assertion that proves it is
 * the sitemap entry count, which must stay at 4422.
 *
 * ROLLBACK is one predicate. Delete the two filters in lib/sitemap.ts and this
 * module is inert. Nothing external is modified, so there is nothing to undo at
 * Google's end.
 *
 * HOW TO PUBLISH A NEW INDUSTRY PAGE. Add its id here, in the same commit as the
 * page's authored content and its named reviewer. If you find yourself adding
 * ten ids in one commit, that is the signal the wave gate exists to catch: stop
 * and check the previous cohort actually earned impressions (CLAUDE.md §7).
 * ────────────────────────────────────────────────────────────────────────────
 */

/** The 11 industry hubs live in the sitemap as of 2026-09-28. Enumerated, not derived. */
const PUBLISHED_INDUSTRIES: ReadonlySet<string> = new Set([
  'law-legal',
  'accounting-cpa',
  'financial-services',
  'consulting',
  'real-estate',
  'manufacturing',
  'coaching',
  'industrial-trade',
  'care-homes',
  'elder-care',
  'waste-management',
]);

/**
 * The 66 sub-industry pages live as of 2026-09-28, keyed `${industryId}/${slug}`.
 *
 * Written out in full rather than generated from the data, because generating it
 * from the data would make it agree with the data by construction and therefore
 * gate nothing. The point of the list is that it can disagree.
 */
const PUBLISHED_SUB_INDUSTRIES: ReadonlySet<string> = new Set([
  'law-legal/corporate-law', 'law-legal/criminal-defense', 'law-legal/family-divorce',
  'law-legal/ip-law', 'law-legal/real-estate-law', 'law-legal/litigation',
  'accounting-cpa/chartered-accounting', 'accounting-cpa/tax-consultancy',
  'accounting-cpa/audit-assurance', 'accounting-cpa/payroll-services',
  'accounting-cpa/bookkeeping', 'accounting-cpa/tax-advisory',
  'financial-services/wealth-management', 'financial-services/investment-advisory',
  'financial-services/fintech', 'financial-services/mutual-funds',
  'financial-services/insurance', 'financial-services/financial-planning',
  'consulting/strategy-consulting', 'consulting/operations-consulting',
  'consulting/hr-consulting', 'consulting/startup-advisory',
  'consulting/risk-compliance', 'consulting/digital-transformation',
  'real-estate/commercial-real-estate', 'real-estate/residential-agencies',
  'real-estate/property-management', 'real-estate/facility-management',
  'real-estate/leasing-consultants', 'real-estate/real-estate-investment',
  'manufacturing/b2b-manufacturing', 'manufacturing/industrial-equipment',
  'manufacturing/oem', 'manufacturing/raw-materials',
  'manufacturing/factory-automation', 'manufacturing/engineering-fabrication',
  'coaching/exam-coaching', 'coaching/career-coaching', 'coaching/business-coaching',
  'coaching/corporate-training', 'coaching/skill-development',
  'coaching/certification-coaching',
  'industrial-trade/manufacturing-units', 'industrial-trade/heavy-equipment',
  'industrial-trade/b2b-factories', 'industrial-trade/industrial-supplies',
  'industrial-trade/export-import', 'industrial-trade/logistics',
  'care-homes/assisted-living', 'care-homes/home-nursing',
  'care-homes/medical-care-homes', 'care-homes/rehab-centers',
  'care-homes/disability-care', 'care-homes/post-hospital',
  'elder-care/senior-living', 'elder-care/retirement-homes', 'elder-care/memory-care',
  'elder-care/independent-living', 'elder-care/palliative-care',
  'elder-care/long-term-care',
  'waste-management/waste-collection', 'waste-management/recycling-scrap',
  'waste-management/e-waste', 'waste-management/biomedical-waste',
  'waste-management/hazardous-waste', 'waste-management/scrap-processing',
]);

/** True only for an industry hub explicitly enumerated above. */
export function isPublishedIndustry(industryId: string): boolean {
  return PUBLISHED_INDUSTRIES.has(industryId);
}

/**
 * True only for a sub-industry explicitly enumerated above AND whose parent is
 * published. A sub-industry under an unpublished parent is unreachable by
 * navigation and would be an orphan, so the parent check is not redundant.
 */
export function isPublishedSubIndustry(industryId: string, slug: string): boolean {
  return isPublishedIndustry(industryId) && PUBLISHED_SUB_INDUSTRIES.has(`${industryId}/${slug}`);
}

/* Exported so scripts/check-industry-gate.cjs can iterate the ALLOWLIST rather
   than the data. Iterating the data and asking "is it in the data" is a
   tautology, which is what that assertion was until Owen caught it: the ghost it
   is meant to find is an allowlist entry with no matching row, and only the
   allowlist can reveal that. */
export const publishedIndustryIds = (): readonly string[] => [...PUBLISHED_INDUSTRIES];
export const publishedSubIndustryKeys = (): readonly string[] => [...PUBLISHED_SUB_INDUSTRIES];

/** Counts, exported so a gate script can assert the frozen set has not drifted. */
export const PUBLISHED_INDUSTRY_COUNT = PUBLISHED_INDUSTRIES.size;
export const PUBLISHED_SUB_INDUSTRY_COUNT = PUBLISHED_SUB_INDUSTRIES.size;
