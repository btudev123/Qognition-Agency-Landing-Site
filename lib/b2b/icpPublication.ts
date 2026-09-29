/* THE ICP PUBLICATION ALLOWLIST. Hand-written, and that is the whole point.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY A LIST AND NOT A PREDICATE.
 *
 * `lib/industryPublication.ts` makes the argument in its own comment and Nadia's
 * constraint C8 restates it for this family: a published set derived from the
 * data agrees with the data by construction and therefore gates nothing. The
 * point of the list is that it CAN disagree, loudly, in a diff a human is on.
 *
 * At 11,561 entities this matters more, not less. Adding a row to
 * `icp-taxonomy.json` must remain indistinguishable from doing nothing. The only
 * way an ICP entity acquires a URL is by somebody typing its path here, in a
 * commit that also authors its body and names its reviewer.
 *
 * THE UNIT IS THE COHORT, NOT THE PAGE (ADR-0008 §6.2). One sub-industry page
 * plus the priority-A niches beneath it. `ICP_PUBLISHED_COHORTS` is the
 * reviewer's unit and `ICP_PUBLISHED` is the page-level truth; the gate asserts
 * every published path sits under a declared cohort, so a page cannot be
 * promoted outside a reviewed cohort even by a correct-looking edit here.
 *
 * BOTH LISTS ARE EMPTY AND MUST STAY EMPTY until an operator promotion.
 * `scripts/check-icp.cjs` holds the ceiling at 0 and asserts that
 * `publishedIcpPaths()` in `data/b2b/icp/index.ts` agrees with this file, so the
 * two cannot drift apart silently.
 *
 * DRAFT, AND WHAT IT DOES NOT DO HERE. On the meta-vertical spine a `draft`
 * entity renders at its URL so it can be read before anybody's name goes on it.
 * On this family it does not: the brief for the four-level route surface is that
 * `generateStaticParams` returns PUBLISHED entities only, so a draft ICP path
 * resolves in this module and in the gates but has no params and therefore 404s
 * under `dynamicParams = false`. That is a deliberate narrowing and it is worth
 * knowing before somebody adds a draft and wonders why the URL is a 404. It is
 * also the stricter reading of Nadia's C6: an unpublished entity is invisible,
 * including to whoever typed its path.
 * ────────────────────────────────────────────────────────────────────────────
 */

import type { IsoDate } from '../../data/b2b/types';

/**
 * WHO CAN SIGN OFF AN ICP PAGE, AS A TYPE RATHER THAN AS A RULE.
 *
 * `ReviewerName` in `data/b2b/types.ts` is a closed union, and it does exactly
 * what ADR-0006's `SampleBrand` pattern promised: `reviewer: 'TBD'` is a compile
 * error rather than a review finding. What it cannot do is stop a real name
 * being typed into a literal by somebody who is not that person. On
 * 2026-09-29 that happened here: a visual-verification harness staged 65 paths
 * as `published` under `reviewedBy: 'Nadia (search)'`, Nadia had reviewed none
 * of them, and every gate went green. The gate passed by ATTRIBUTION rather than
 * by review, which is worse than an ungated page, because it looks reviewed.
 *
 * That was my harness and my mistake. The fix is not to be more careful.
 *
 * So this type is narrower than `ReviewerName` on purpose. The four agent
 * entries in that union are WORKFLOW ROLES: they say who drafted, searched or
 * brand-checked a page. They are not sign-off, and an agent that drafted a page
 * can never be the reviewer of record for it. The operator named one person with
 * sign-off authority and this is that person, as a literal type, so writing any
 * other name here does not compile.
 *
 * `scripts/check-icp.cjs` re-asserts it at runtime, because a `as IcpReview`
 * cast defeats a type and a harness in a hurry is exactly where a cast appears.
 */
export type IcpSignOff = 'Prabal (CEO, Qognition Agency)';

export interface IcpReview {
  readonly reviewedBy: IcpSignOff;
  readonly reviewedAt: IsoDate;
}

/** `'<industry>/<sub-industry>'`. One line per promoted cohort, in wave order. */
export const ICP_PUBLISHED_COHORTS: readonly string[] = Object.freeze([
  // ADR-0008 §6.4. Raised by exactly one wave, in that wave's commit.
]);

/**
 * Full path to the review that promoted it. A path with no entry here is spine:
 * no params, no sitemap row, 404 on request, zero build cost.
 */
export const ICP_PUBLISHED: ReadonlyMap<string, IcpReview> = new Map<string, IcpReview>([
  // '<industry>/<sub-industry>[/<niche>[/<sub-niche>]]', { reviewedBy, reviewedAt }
]);

/**
 * Paths that have an authored body and are being read before promotion. Resolves
 * for gates and for local review; does NOT generate a param. See the header.
 */
export const ICP_DRAFTS: ReadonlySet<string> = new Set<string>([]);

export type IcpPublicationState = 'spine' | 'draft' | 'published';

export function icpPublicationState(path: readonly string[]): IcpPublicationState {
  const key = path.join('/');
  if (ICP_PUBLISHED.has(key)) return 'published';
  if (ICP_DRAFTS.has(key)) return 'draft';
  return 'spine';
}

export function icpReviewFor(path: readonly string[]): IcpReview | undefined {
  return ICP_PUBLISHED.get(path.join('/'));
}

/** Every published path, sorted, so the gate compares a stable sequence. */
export function icpPublishedPaths(): readonly string[] {
  return [...ICP_PUBLISHED.keys()].sort();
}
