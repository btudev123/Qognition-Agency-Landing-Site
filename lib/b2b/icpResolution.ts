/* THE ICP RESOLVER CONTRACT, plus the one question the resolver does not answer.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ONE DECLARATION, TWO CONSUMERS.
 *
 * ADR-0008 §3.2 specifies the ICP resolver, interface-only, as one function over
 * a path array. This file is those types verbatim. Two modules need them and
 * neither may redeclare them:
 *
 *   lib/b2b/icpRegistry.ts      implements `ResolveIcp`. Its `IcpRecord` union
 *                               extends the record below rather than restating
 *                               it, so the router's idea of a resolved entity
 *                               and the gate's cannot drift apart.
 *   lib/b2b/observationStore.ts consumes it, INJECTED rather than imported.
 *
 * The injection is not ceremony. It is ADR-0003 §3's rule applied to this seam:
 * the gate has to be exercisable in full with a fake, including the branches
 * that cannot be reached while nothing is published, and the store is imported
 * by page components, so a value import of the registry here would pull the
 * registry and the 2.2MB taxonomy into every bundle that renders an observation
 * block. Types are erased; functions are not.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT THIS FILE ADDS THAT THE RESOLVER DOES NOT.
 *
 * `resolveIcp` returns `undefined` for four different situations: an unknown
 * slug, a path legacy claims at that depth, a spine entity, and a routable
 * entity with no authored body. For a router that is right, because all four are
 * a 404. For a gate it is not: whoever reads the failing build needs to know
 * whether they invented a slug or measured a page that is not promoted yet.
 *
 * `icpTaxonomyHolds` is the half of that distinction answerable from the locked
 * JSON alone. It says nothing about publication and must never be used to decide
 * whether a page exists.
 *
 * TENANCY: not applicable, re-derived rather than inherited. No auth dependency
 * in package.json, no session, user or tenant identifier anywhere in lib, app or
 * components. Module-scope reads of a committed JSON import; no I/O, no request
 * context, no cache key. Single-tenant public marketing site.
 */
import { getIcpIndustry, getIcpNiche, getIcpSubIndustry } from '../../data/b2b/icp';

/** ADR-0008 §3.2, verbatim. */
export type IcpLevel = 'industry' | 'sub-industry' | 'niche' | 'sub-niche';

/** ADR-0008 §3.2, verbatim. Extended, never restated: see the header. */
export interface IcpRecord {
  readonly level: IcpLevel;
  /** Exactly `level` segments, from the JSON. */
  readonly path: readonly string[];
  /** The dotted id, e.g. '05.01.01'. */
  readonly id: string;
  /** Set only on the 5 rule-7 duplicates. */
  readonly canonicalPath?: readonly string[];
  readonly state: 'draft' | 'published';
}

/**
 * ADR-0008 §3.2, verbatim: "Undefined for spine, for an unknown slug, and for a
 * path legacy claims at this depth."
 */
export type ResolveIcp = (path: readonly string[]) => IcpRecord | undefined;

/**
 * Does the locked taxonomy hold this path, ignoring publication entirely?
 *
 * POSITIONING rule 6 as a lookup: slugs come from `icp-taxonomy.json` and are
 * never invented or renamed. True for a spine entity, which is the point: a real
 * entity with no page and an invented slug are different mistakes and the error
 * message has to say which.
 *
 * On the 5 declared overlaps (rule 7): `getIcpNiche` is keyed by the full
 * parent-scoped path and first writer wins, so a duplicate niche slug resolves
 * under both parents here. Which of the two is canonical is decided by
 * `IcpRecord.canonicalPath` in the registry, not by this function.
 */
export function icpTaxonomyHolds(segments: readonly string[]): boolean {
  const [industry, sub, niche, subNiche] = segments;
  if (!industry || segments.length > 4) return false;

  if (!sub) return Boolean(getIcpIndustry(industry));
  if (!niche) return Boolean(getIcpSubIndustry(industry, sub));

  const found = getIcpNiche(industry, sub, niche);
  if (!found) return false;
  if (!subNiche) return true;

  return found.niche.sub_niches.some((candidate) => candidate.slug === subNiche);
}
