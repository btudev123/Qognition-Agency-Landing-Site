/* THE COMMITTED OBSERVATION RECORDS. The contract is lib/b2b/observations.ts.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * TWO ARRAYS, AND THE SECOND ONE IS THE PRODUCT.
 *
 * `OBSERVATION_RUNS` is what a page renders: rows of prompt, engine, date, who
 * was named, what was cited. Each row carries an `answerId`.
 *
 * `STORED_ANSWERS` is what those ids point at: the unmodified provider response,
 * with the exact prompt that produced it, the exact model version that answered
 * and the instant it was retrieved.
 *
 * The second array is the reason the first one is credible. CLAUDE.md §1 puts
 * it on the site as a product claim — "every number traces to a stored answer
 * with a date" — so it has to be structurally true here, not asserted in copy.
 * A run without its answers does not validate and does not build.
 *
 * ADR-0002's hybrid, applied: the shape is committed TypeScript, the records are
 * data, this file is the floor. Sanity may one day improve the prose around an
 * observation. It can never write `rawAnswer` and it can never publish a run,
 * for the same reason ADR-0002 §1 keeps a case study's `actual` out of the CMS:
 * the field that decides whether a claim reaches the public does not belong in
 * a text box.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * BOTH ARRAYS ARE EMPTY, AND THAT IS THE CORRECT STATE TODAY.
 *
 * No prompt run has been executed against any B2B entity. Every vertical page
 * therefore renders the `unobserved` state, which is fully designed and is
 * load-bearing copy, not an apology.
 *
 * Do not seed this with an example. The contract file says it, and it is worth
 * repeating where the records live: a placeholder that looks like a result is
 * worse than an empty block, because the reader cannot tell the difference and
 * the page then asserts something about NAMED THIRD-PARTY FIRMS that nobody
 * measured. CLAUDE.md §4: where evidence does not exist, omit the section.
 *
 * TO ADD A RUN, in one reviewed commit:
 *   1. Run the prompt set. Keep every raw answer, verbatim, unedited.
 *   2. Add the answers to STORED_ANSWERS and the rows to OBSERVATION_RUNS.
 *   3. `node scripts/test-b2b-observations.cjs`. It checks every vendor name
 *      and every cited URL against the stored answer it claims to come from, so
 *      a name that was typed rather than found fails the build.
 *   4. Say in the commit message who ran it and on what date.
 *
 * There is no fixture file, no MOCK_ constant and no NODE_ENV branch in this
 * directory, following ADR-0003 §3. Test doubles are constructed in the test
 * script and injected; they never ship here.
 * ────────────────────────────────────────────────────────────────────────────
 */
import type { ObservationRun } from '../../../lib/b2b/observations';
import type { StoredAnswer } from './evidence';

export type { StoredAnswer } from './evidence';

export const OBSERVATION_RUNS: readonly ObservationRun[] = [];

export const STORED_ANSWERS: readonly StoredAnswer[] = [];
