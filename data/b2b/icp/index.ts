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
 * Published ICP entities. At 11,561 entities this is the single most important
 * function in the file: it is what stands between the taxonomy and the
 * scaled-content pattern that produced 2,161 location pages at 0.13 clicks each.
 *
 * WAVE 1, 2026-09-29. Eight paths, two cohorts, industry 19 (TIC). Reviewed and
 * signed off by Prabal (CEO, Qognition Agency) in the commit that authored them.
 *
 * THIS LITERAL AND `ICP_PUBLISHED` IN lib/b2b/icpPublication.ts ARE TWO SOURCES
 * OF TRUTH ON PURPOSE. This one is what an operator reads; that one is what the
 * routes read. `scripts/check-icp.cjs` R1 asserts the two sorted sequences are
 * identical, which is the only thing that makes the duplication safe. Both move
 * in the same commit or the build fails, by design.
 *
 * Sorted, because the gate compares a sequence rather than a set.
 */
export function publishedIcpPaths(): readonly string[] {
  return [
    'environmental-engineering-and-testing',
    'environmental-engineering-and-testing/environmental-testing-labs',
    'environmental-engineering-and-testing/environmental-testing-labs/environmental-analytical-labs',
    'environmental-engineering-and-testing/environmental-testing-labs/pfas-and-emerging-contaminant-labs',
    'environmental-engineering-and-testing/environmental-testing-labs/pfas-and-emerging-contaminant-labs/drinking-water-pfas-methods',
    'environmental-engineering-and-testing/environmental-testing-labs/pfas-and-emerging-contaminant-labs/non-potable-and-wastewater-pfas',
    'environmental-engineering-and-testing/real-estate-and-transaction-due-diligence',
    'environmental-engineering-and-testing/real-estate-and-transaction-due-diligence/phase-i-and-ii-esa-firms',
  ];
}

/* ── LEVEL 4, AND THE CROSS-TREE ROWS. Added for the four-level route surface.
 *
 * Everything below stays INSIDE this directory on purpose. Kyle's ADR-0008
 * §5.2 item 3: `ICP_INDUSTRIES` and `icp-taxonomy.json` must never be imported
 * outside `data/b2b/icp/`, because whatever is reachable from a prop is
 * serialized into the RSC payload of every page that renders it, and the reach
 * from one industry node is the whole 2.2MB tree. `scripts/check-b2b.cjs`
 * greps for both names. So the route and component layers get narrow VIEW
 * records from `lib/b2b/icpRegistry.ts`, never a JSON node, and the accessors
 * they are built from live here.
 * ────────────────────────────────────────────────────────────────────────── */

export interface IcpOverlap {
  /** The buyer both rows describe. Operator prose. */
  readonly buyer: string;
  /** Dotted id. Rule 7: this one builds the page. */
  readonly canonical: string;
  /** Dotted id. Renders a pointer and a canonical tag, never a second body. */
  readonly duplicate: string;
}

export interface IcpDedupeRow {
  /** Industry id the niche was removed from. */
  readonly removed_from: string;
  /** The niche NAME, not a slug and not an id. See `resolveDedupeTarget`. */
  readonly niche: string;
  /** Industry id the niche was kept in. */
  readonly kept_in: string;
}

interface IcpTaxonomyExtras {
  readonly overlaps: readonly IcpOverlap[];
  readonly dedupe_log: readonly IcpDedupeRow[];
}

const extras = raw as unknown as IcpTaxonomyExtras;

export const ICP_OVERLAPS: readonly IcpOverlap[] = extras.overlaps;
export const ICP_DEDUPE_LOG: readonly IcpDedupeRow[] = extras.dedupe_log;

/* Level 4. 8,823 rows, keyed by full path, built once at module scope like the
   three maps above. A sub-niche record is `{id, slug, name}` and there is no
   fourth field to find, which is the fact every level-4 design decision rests
   on (ADR-0008 §1.2). */
const subNicheByPath = new Map<
  string,
  { industry: IcpIndustry; sub: IcpSubIndustry; niche: IcpNiche; subNiche: IcpSubNiche }
>();

/* Dotted id to path, for the 5 overlaps, which reference `02.06.01` and not a
   slug. Built for every level so a v2.1 overlap at any depth still resolves. */
const pathById = new Map<string, readonly string[]>();

for (const industry of ICP_INDUSTRIES) {
  pathById.set(industry.id, [industry.slug]);
  for (const sub of industry.sub_industries) {
    pathById.set(sub.id, [industry.slug, sub.slug]);
    for (const niche of sub.niches) {
      /* First writer wins, same rule as `nicheBySlug` above: 5 niche slugs sit
         under two parents by design and the canonical id must not move. */
      if (!pathById.has(niche.id)) pathById.set(niche.id, [industry.slug, sub.slug, niche.slug]);
      for (const subNiche of niche.sub_niches) {
        const key = `${industry.slug}/${sub.slug}/${niche.slug}/${subNiche.slug}`;
        if (!subNicheByPath.has(key)) {
          subNicheByPath.set(key, { industry, sub, niche, subNiche });
        }
        if (!pathById.has(subNiche.id)) {
          pathById.set(subNiche.id, [industry.slug, sub.slug, niche.slug, subNiche.slug]);
        }
      }
    }
  }
}

export const getIcpSubNiche = (
  industrySlug: string,
  subSlug: string,
  nicheSlug: string,
  subNicheSlug: string
) => subNicheByPath.get(`${industrySlug}/${subSlug}/${nicheSlug}/${subNicheSlug}`);

/** The path for a dotted id, at any of the four levels. Undefined for an unknown id. */
export const icpPathForId = (id: string): readonly string[] | undefined => pathById.get(id);

/**
 * The path a `dedupe_log` row points at, or `undefined`.
 *
 * THE ROW GIVES A NAME, NOT AN ID, and 7 of the 13 names do not exist in the
 * industry the row says they were kept in. Measured on the locked v2.0.0 file,
 * 2026-09-29: 6 resolve by exact name match, 7 do not, and 5 of those 7 have an
 * obvious near-match that differs by a suffix ("Outplacement and career
 * transition" against the niche "Outplacement and career transition firms").
 *
 * This function does EXACT matching only and returns `undefined` for the other
 * seven. Fuzzy-matching a row to a niche is the same move as fuzzy-matching a
 * case study to an entity, which Nadia's §5.1 rule 6 forbids by name, and rule 6
 * of the positioning file forbids inventing the identifier that would fix it.
 * The unresolved rows are reported by `scripts/check-icp.cjs` and are a
 * `[NEEDS DATA]` for the operator: the fix is ids on the dedupe rows, in the
 * locked file, not a matcher in here.
 */
export function resolveDedupeTarget(row: IcpDedupeRow): readonly string[] | undefined {
  const industry = ICP_INDUSTRIES.find((i) => i.id === row.kept_in);
  if (!industry) return undefined;
  for (const sub of industry.sub_industries) {
    for (const niche of sub.niches) {
      if (niche.name === row.niche) return [industry.slug, sub.slug, niche.slug];
    }
  }
  return undefined;
}

/** The slug of an industry by its dotted id. Used to label a dedupe pointer's origin. */
export const icpIndustrySlugById = (id: string): string | undefined =>
  ICP_INDUSTRIES.find((i) => i.id === id)?.slug;

/**
 * A sub-industry's name by its dotted id ('05.07'), or undefined. A narrow
 * accessor in the sense of ADR-0008 §5.2 item 3: it returns one string and
 * nothing that can walk the tree. The homepage tracker run (ADR-0006 §11)
 * renders its breadcrumb from it, so the name has no second copy.
 */
export const icpSubIndustryName = (id: string): string | undefined => {
  const industry = ICP_INDUSTRIES.find((i) => id.startsWith(`${i.id}.`));
  return industry?.sub_industries.find((s) => s.id === id)?.name;
};

/**
 * The 21 industries, flattened for the `/industries` entry-point section.
 *
 * WHY THIS EXISTS RATHER THAN `ICP_INDUSTRIES.map(...)` AT THE CALL SITE.
 *
 * ADR-0008 §5.2 item 3: route and component code may import the narrow
 * accessors from this module and may never import `ICP_INDUSTRIES` or the JSON
 * directly, because whatever is reachable from a value a route hands onward is
 * reachable from the RSC payload, and the reach from one industry node is the
 * whole 2.2MB tree. `scripts/check-b2b.cjs` greps for both names under `app/`
 * and `components/`.
 *
 * `app/industries/page.tsx` was the one violation, and it was a real one rather
 * than a technicality: it is the single page the entire family hangs off, so it
 * is the page most likely to grow a client-side filter later. Each row here
 * carries four strings and two numbers and nothing that can walk anywhere.
 *
 * `subNames` is capped at four because that is what the section renders. Capping
 * it here rather than at the call site is the point: the call site cannot widen
 * it without editing this file.
 */
export interface IcpIndustryCard {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly subCount: number;
  readonly subNames: readonly string[];
}

const INDUSTRY_CARDS: readonly IcpIndustryCard[] = ICP_INDUSTRIES.map((industry) => ({
  id: industry.id,
  slug: industry.slug,
  name: industry.name,
  subCount: industry.sub_industries.length,
  subNames: industry.sub_industries.slice(0, 4).map((sub) => sub.name),
}));

export const icpIndustryCards = (): readonly IcpIndustryCard[] => INDUSTRY_CARDS;

/** Total sub-industries across all 21. Navigation, never a market statistic. */
export const icpSubIndustryTotal = (): number =>
  INDUSTRY_CARDS.reduce((total, card) => total + card.subCount, 0);
