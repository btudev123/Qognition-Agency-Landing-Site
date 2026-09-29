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
 * IT WAS EMPTY UNTIL WAVE 1. The capability is built for 11,561. The ceiling is
 * raised by exactly one wave in that wave's commit, and it now stands at 8. A
 * body here with no entry in `lib/b2b/icpPublication.ts` is authored work nobody
 * can reach, and the gate says so in both directions.
 * ────────────────────────────────────────────────────────────────────────────
 */

import type { HubBody, SubNicheBody } from '../types';
import { TIC_HUB } from './authored/tic-hub';
import { TIC_ENVIRONMENTAL_TESTING_LABS } from './authored/tic-environmental-testing-labs';
import { TIC_ENVIRONMENTAL_ANALYTICAL_LABS } from './authored/tic-environmental-analytical-labs';
import { TIC_PFAS_LABS } from './authored/tic-pfas-labs';
import { TIC_PFAS_DRINKING_WATER } from './authored/tic-pfas-drinking-water';
import { TIC_PFAS_WASTEWATER } from './authored/tic-pfas-wastewater';
import { TIC_TRANSACTION_DUE_DILIGENCE } from './authored/tic-transaction-due-diligence';
import { TIC_PHASE_I_AND_II_ESA } from './authored/tic-phase-i-and-ii-esa';

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

/* WAVE 1. TIC (industry 19), two cohorts, eight pages, 2026-09-29.
 *
 * ONE FILE PER AUTHORED ENTITY under `./authored/`, which is ADR-0007 §4.1's
 * shape. The directory is `authored/` rather than `bodies/` on purpose:
 * `scripts/check-b2b.cjs` item 10 requires every file under a `bodies/` path in
 * `data/b2b` to be imported by `data/b2b/index.ts`, and that barrel is the
 * SPINE's, keyed `<meta-vertical>[/<sub-niche>]`. Wiring the ICP family into it
 * would merge the two namespaces the header above explains must stay apart.
 *
 * Eight keys, in wave order rather than sorted, so the cohort structure is
 * readable in the diff: the industry, then the laboratories cohort top down,
 * then the diligence cohort. `scripts/check-icp.cjs` compares sorted sequences,
 * so the order here is for the reader.
 */
export const ICP_BODIES: ReadonlyMap<string, IcpBody> = new Map<string, IcpBody>([
  ['environmental-engineering-and-testing', TIC_HUB],

  ['environmental-engineering-and-testing/environmental-testing-labs', TIC_ENVIRONMENTAL_TESTING_LABS],
  [
    'environmental-engineering-and-testing/environmental-testing-labs/environmental-analytical-labs',
    TIC_ENVIRONMENTAL_ANALYTICAL_LABS,
  ],
  [
    'environmental-engineering-and-testing/environmental-testing-labs/pfas-and-emerging-contaminant-labs',
    TIC_PFAS_LABS,
  ],
  [
    'environmental-engineering-and-testing/environmental-testing-labs/pfas-and-emerging-contaminant-labs/drinking-water-pfas-methods',
    TIC_PFAS_DRINKING_WATER,
  ],
  [
    'environmental-engineering-and-testing/environmental-testing-labs/pfas-and-emerging-contaminant-labs/non-potable-and-wastewater-pfas',
    TIC_PFAS_WASTEWATER,
  ],

  [
    'environmental-engineering-and-testing/real-estate-and-transaction-due-diligence',
    TIC_TRANSACTION_DUE_DILIGENCE,
  ],
  [
    'environmental-engineering-and-testing/real-estate-and-transaction-due-diligence/phase-i-and-ii-esa-firms',
    TIC_PHASE_I_AND_II_ESA,
  ],
]);

export function getIcpBody(path: readonly string[]): IcpBody | undefined {
  return ICP_BODIES.get(path.join('/'));
}
