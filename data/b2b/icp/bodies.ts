/* AUTHORED BODIES FOR THE ICP TAXONOMY. Path-keyed. Empty.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT THIS HOLDS AND WHY IT IS SEPARATE FROM `data/b2b/index.ts`.
 *
 * The existing barrel is keyed `<meta-vertical>[/<sub-niche>]`, which is the
 * URL shape of the 15-entry spine. This one is keyed by the ICP path,
 * `<industry>/<sub-industry>[/<niche>[/<sub-niche>]]`, which is the URL shape of
 * the four-level tree. Two key shapes, so two maps; merging them would need
 * string surgery to tell a two-segment ICP path from a two-segment spine path,
 * and the two namespaces overlap on 22 strings (ADR-0008 §4.2).
 *
 * The TYPES are shared deliberately. `HubBody` and `SubNicheBody` already
 * encode Nadia's mechanical minimums as tuple arities: three sourced facts,
 * three FAQs, six vocabulary terms, an https source URL, a date-shaped date. A
 * level-4 page gets the same `SubNicheBody` as a level-2 page and therefore the
 * same bar. ADR-0008 §6.4 assertion 6: there is no reduced bar for level 4.
 *
 * WHICH TYPE AT WHICH LEVEL (Theo, docs/copy/icp-page-system.md §4.2):
 *
 *   level 1  industry      HubBody       no vocabulary, no axes. Those differ
 *                                        per sub-industry and a hub that
 *                                        averaged them would be the template
 *                                        failure at the top of the tree.
 *   level 2  sub-industry  SubNicheBody  the workhorse. Six operator fields
 *                                        beneath it and the authored delta.
 *   level 3  niche         SubNicheBody  only the DELTA is authorable. Reusing
 *                                        the parent's facts fails the
 *                                        uniqueness gate, which is intended.
 *   level 4  sub-niche     SubNicheBody  same arity, same bar, no exception.
 *
 * `lib/b2b/icpRegistry.ts` checks the kind against the level and returns
 * `undefined` on a mismatch, which is a 404 rather than a half-rendered page,
 * paired with a loud failure in `scripts/check-icp.cjs`.
 *
 * IT IS EMPTY, AND THAT IS THE CORRECT RESTING STATE. The capability is built
 * for 11,561. The publication ceiling is 0 and waves raise it. A body here with
 * no entry in `lib/b2b/icpPublication.ts` is authored work nobody can reach, and
 * the gate says so in both directions.
 * ────────────────────────────────────────────────────────────────────────────
 */

import type { HubBody, SubNicheBody } from '../types';

/**
 * One folded-in child, rendered as a section on its parent's page.
 *
 * THIS FIELD IS WHAT STOPS THE COVERAGE GRID BEING A DIRECTORY STUB.
 *
 * Nadia's C6 forbids an unpublished entity appearing at all: not as a link, not
 * as plain text, not as a greyed row, because a page that enumerates 18 things
 * it does not have is `/locations/*` again. Her own §1.7.2 nevertheless wants
 * the sub-niche names on the parent page, as the coverage grid and the entity
 * vocabulary. Those two only reconcile one way, and C6 states it: a folded-in
 * child "appears as an `<h2>` with real content, never as a dead list item".
 *
 * So a name may render only with the sentence that distinguishes it, and that
 * sentence is AUTHORED, one per row (Theo §4.2, level 4: "authored payload is
 * one sentence"). No sentence, no row. A parent with no `scope` renders no
 * coverage block at all, which is the correct empty state: a short honest page
 * rather than a list of things that do not exist yet.
 *
 * `slug` must name an actual child of the entity in `icp-taxonomy.json`.
 * Positioning rule 6, asserted by `scripts/check-icp.cjs`.
 */
export interface IcpScopeRow {
  readonly slug: string;
  /** What distinguishes this scope from its siblings. One sentence. Authored. */
  readonly distinguishes: string;
}

export type IcpBody = (HubBody | SubNicheBody) & {
  readonly scope?: readonly IcpScopeRow[];
};

/** Keyed by full ICP path. Hand-written, never derived from the filesystem. */
export const ICP_BODIES: ReadonlyMap<string, IcpBody> = new Map<string, IcpBody>([]);

export function getIcpBody(path: readonly string[]): IcpBody | undefined {
  return ICP_BODIES.get(path.join('/'));
}
