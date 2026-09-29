/* THE ICP TAXONOMY. Operator-locked v2.0.0, 2026-09-29.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * SOURCE OF TRUTH: `icp-taxonomy.json`, imported verbatim from the operator's
 * locked package at ~/Documents/qognition-claude-code-icp-lock. Slugs, ids,
 * priority and fit come from that file and are NEVER invented or renamed
 * (POSITIONING rule 6). To change the ICP, the operator edits the source package
 * by hand and bumps `version`.
 *
 * 21 industries · 341 sub-industries · 2,376 niches · 8,823 sub-niches.
 * 11,561 entities. 2,371 unique niches; 5 are deliberate overlaps that build
 * under a canonical id and link from the duplicate (rule 7).
 *
 * NOTHING HERE GENERATES A ROUTE. Same contract as data/b2b/verticals.ts: an
 * entity is spine until deliberately promoted, and promotion needs a named
 * reviewer and the ceiling raised in the same commit. That matters more at this
 * scale than at 120, because the failure mode is 11,561 pages rather than one.
 *
 * WHY JSON RATHER THAN GENERATED TYPESCRIPT: 2.2MB of TS literal would be a
 * multi-second parse on every build and unreviewable in a diff. JSON parses once
 * at module scope, diffs line by line, and keeps the operator's file byte-
 * identical to the package they locked, which is checkable.
 *
 * THE FIELDS THE OPERATOR SUPPLIED, which are the reason pages built from this
 * need not be thin:
 *   geo_angle      the Family B opportunity in the client's market
 *   buyer_titles   real job titles, per sub-industry
 *   client_value   what their client contract is worth, which sets the tier
 *   ai_prompts     682 supplied prompts. These are Family B: the CLIENT'S buyer
 *                  asking. We run them, record them, publish the observation.
 *                  We are never the cited answer to one.
 *   ppc_keywords   1,023 supplied terms for the paid layer
 *   priority       A 888 / B 1173 / C 315. Build order, per rule 8.
 *   fit            AI SEO 1059 / PPC 190 / Both 1127. Leads the page angle.
 * ────────────────────────────────────────────────────────────────────────────
 */
import raw from './icp-taxonomy.json';

export type IcpPriority = 'A' | 'B' | 'C';
export type IcpFit = 'AI SEO' | 'PPC' | 'Both';

export interface IcpSubNiche {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
}

export interface IcpNiche {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly is_new: boolean;
  readonly fit: IcpFit;
  readonly priority: IcpPriority;
  readonly sub_niches: readonly IcpSubNiche[];
}

export interface IcpSubIndustry {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly is_new: boolean;
  readonly geo_angle?: string;
  readonly buyer_titles?: readonly string[];
  readonly min_firm_size?: string;
  readonly client_value?: string;
  readonly ai_prompts?: readonly string[];
  /**
   * FAMILY B. The CLIENT'S buyer's search language, not ours.
   *
   * Exactly three per sub-industry across all 341, which is a seed set rather
   * than a keyword list, and the uniformity is the proof. The terms settle it:
   * `boom lift rental`, `aog aircraft parts`, `dog daycare franchise`. Nobody
   * types those looking for an AI search agency.
   *
   * `ai_prompts` is labelled Family B in this file's header; this field was not,
   * and it is the same trap one field over. The failure mode is someone building
   * QOGNITION'S OWN paid account from a field called `ppc_keywords`, which is the
   * Family B/Q collapse arriving through the ad platform instead of the router.
   *
   * These are what we diagnose and what a client's campaign buys. No string here
   * may appear as a target query, an H1, a title, a meta description or a page's
   * own buyer question.
   */
  readonly ppc_keywords?: readonly string[];
  readonly niches: readonly IcpNiche[];
}

export interface IcpIndustry {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly note?: string;
  readonly is_new_industry: boolean;
  readonly sub_industries: readonly IcpSubIndustry[];
}

interface IcpTaxonomy {
  readonly version: string;
  readonly locked: boolean;
  readonly counts: {
    readonly industries: number;
    readonly sub_industries: number;
    readonly niches: number;
    readonly sub_niches: number;
    readonly unique_niches: number;
  };
  readonly retainer_band_usd_per_month: readonly [number, number];
  readonly industries: readonly IcpIndustry[];
}

const taxonomy = raw as unknown as IcpTaxonomy;

export const ICP_VERSION = taxonomy.version;
export const ICP_COUNTS = taxonomy.counts;
export const ICP_RETAINER_BAND = taxonomy.retainer_band_usd_per_month;
export const ICP_INDUSTRIES: readonly IcpIndustry[] = taxonomy.industries;

/* ── Lookups. Built once at module scope, never per request. ──────────────── */

const industryBySlug = new Map(ICP_INDUSTRIES.map((i) => [i.slug, i]));
const subBySlug = new Map<string, { industry: IcpIndustry; sub: IcpSubIndustry }>();
const nicheBySlug = new Map<string, { industry: IcpIndustry; sub: IcpSubIndustry; niche: IcpNiche }>();

for (const industry of ICP_INDUSTRIES) {
  for (const sub of industry.sub_industries) {
    subBySlug.set(`${industry.slug}/${sub.slug}`, { industry, sub });
    for (const niche of sub.niches) {
      /* First writer wins. 5 niche slugs appear under two parents by design
         (POSITIONING rule 7); the canonical id builds the page and the duplicate
         links to it, so a second write here would silently move the canonical. */
      const key = `${industry.slug}/${sub.slug}/${niche.slug}`;
      if (!nicheBySlug.has(key)) nicheBySlug.set(key, { industry, sub, niche });
    }
  }
}

export const getIcpIndustry = (slug: string) => industryBySlug.get(slug);
export const getIcpSubIndustry = (industrySlug: string, subSlug: string) =>
  subBySlug.get(`${industrySlug}/${subSlug}`);
export const getIcpNiche = (industrySlug: string, subSlug: string, nicheSlug: string) =>
  nicheBySlug.get(`${industrySlug}/${subSlug}/${nicheSlug}`);

/** Every niche, flattened, with its parents. The build order lever is `priority`. */
export function allIcpNiches(): readonly { industry: IcpIndustry; sub: IcpSubIndustry; niche: IcpNiche }[] {
  return [...nicheBySlug.values()];
}

export function nichesByPriority(priority: IcpPriority) {
  return allIcpNiches().filter((row) => row.niche.priority === priority);
}

/**
 * Published ICP entities. Empty, and it must stay empty until an operator
 * promotion. At 11,561 entities this is the single most important function in
 * the file: it is what stands between the taxonomy and the scaled-content
 * pattern that produced 2,161 location pages at 0.13 clicks each.
 */
export function publishedIcpPaths(): readonly string[] {
  return [];
}
