/* THE PROMPT PANEL. What we run against the engines for one ICP entity.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * FAMILY B. READ THIS BEFORE USING ANY STRING THIS MODULE RETURNS.
 *
 * `data/b2b/icp/index.ts` labels `ai_prompts` Family B: the CLIENT'S buyer
 * asking for a supplier. A prompt composed from one is still Family B. Every
 * string produced here is a thing we RUN and RECORD. None of it is a thing a
 * page targets.
 *
 * So: no string from this module may become a title, an H1, a meta description,
 * a `primaryQuery` or an FAQ question. That is `docs/seo/b2b-niche-architecture.md`
 * §8.2 assertions 18 and 21 one field over, and §1.1's rule that a ranking
 * target built on the client's buyer's query is the location-page failure again.
 * This module produces the panel to run. It does not produce page copy.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY A DERIVATION AND NOT AN AUTHORING TASK.
 *
 * §8.2 assertion 3 requires >=8 distinct prompts on a published page and
 * assertion 4 forbids sharing a prompt string with any other page. The operator
 * supplied two per sub-industry: 682 in total, at level 2 and at no other level.
 * Two is a quarter of one page's minimum, and writing the other six is the
 * fabrication POSITIONING rule 10 forbids.
 *
 * §3.2 finding 4 is the way out, and this module is that rule as a function:
 *
 *   "compose the supplied prompt with the sub-niche names under the relevant
 *    niche ... every resulting prompt is the operator's own vocabulary, distinct
 *    by construction because sub-niche slugs are 99.3% unique, and auditable
 *    back to two locked fields."
 *
 * Restated as assertion 23: every prompt on a page is either verbatim from that
 * sub-industry's `ai_prompts`, or composes a supplied prompt with a
 * `sub_niches[].name` from an entity beneath the page.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * DETERMINISM IS THE PROPERTY THAT MATTERS.
 *
 * Same entity in, same panel out, on every machine and every build. Two things
 * depend on it:
 *
 *   1. An observation is matched to the prompt that produced it by the VERBATIM
 *      prompt string (lib/b2b/observationStore.ts asserts row.prompt is
 *      byte-identical to the stored answer's prompt). A panel that reordered or
 *      re-worded between builds would orphan every record taken under the old one.
 *   2. §9.2's comparability rule: a panel only changes when the change is
 *      recorded with a date and a reason. A panel that changes because a Set
 *      iterated differently is a silent set change, which is the thing that rule
 *      exists to stop.
 *
 * Everything here therefore reads the locked JSON in document order and never
 * sorts, hashes, shuffles or samples.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT THIS MODULE WILL NOT DO.
 *
 * It will not pad a short panel. A niche with three sub-niches produces five
 * prompts and says five, with `meetsMinimum: false`. Borrowing a sibling's
 * sub-niche would file an observation about a scope the page does not cover;
 * inventing a prompt is rule 10. The shortfall is a publication decision, and it
 * belongs to whoever raises the cohort, not to this function.
 *
 * TENANCY: not applicable, re-derived rather than inherited, same as
 * lib/b2b/observationStore.ts. No auth dependency exists in package.json and
 * there is no session, user or tenant identifier anywhere in lib, app or
 * components. This module reads a module-scope JSON import and does no I/O.
 * Single-tenant public marketing site. If that changes, this comment changes first.
 */
import {
  getIcpIndustry,
  getIcpNiche,
  getIcpSubIndustry,
} from '../../data/b2b/icp';
import type { IcpNiche, IcpSubIndustry, IcpSubNiche } from '../../data/b2b/icp';

/** §8.2 assertion 3. Stated once, here, so a caller never hard-codes an 8. */
export const MIN_DISTINCT_PROMPTS = 8;

/**
 * What separates a supplied prompt from the name that narrows it.
 *
 * Chosen for three reasons, none of them aesthetic:
 *   - it adds no content word, so the composed string is still entirely the
 *     operator's vocabulary plus one function word;
 *   - it is REVERSIBLE, so `decomposePrompt` can recover both locked parts from
 *     the string alone and a gate can check assertion 23 mechanically rather
 *     than trusting a provenance field somebody could have typed;
 *   - it contains no em dash. Prompts render on the page, and
 *     scripts/check-b2b.cjs bans em dashes in rendered copy (CLAUDE.md §10).
 *
 * Verified against the locked v2.0.0 file: this substring appears in none of the
 * 682 supplied prompts and none of the 8,823 sub-niche names, so the split is
 * unambiguous. `assertCompositionJoinerIsUnambiguous` re-checks that on every
 * gate run, because the operator hand-edits the JSON and bumps the version.
 */
export const COMPOSITION_JOINER = ', specifically ';

/** Which of the four levels an entity path names. */
export type IcpLevel = 1 | 2 | 3 | 4;

/**
 * §3.2 finding 2. A shortlist request versus a how/should question.
 *
 * It matters commercially, not decoratively: a B-vendor prompt is the diagnosis
 * ("here are the competitors the assistant named instead of you") and a B-problem
 * prompt is the prescription ("this one you can win with one asset"). The page
 * renders them as separate rows. Assertion 23 requires the tag on every prompt.
 */
export type PromptShape = 'vendor' | 'problem';

export type PromptOrigin = 'supplied' | 'composed';

export interface PanelPrompt {
  /** Verbatim, as it will be sent and as it will be printed on the page. */
  readonly prompt: string;
  /** Always 'B'. Family Q is not in this panel and never will be: §3.3. */
  readonly family: 'B';
  readonly shape: PromptShape;
  readonly origin: PromptOrigin;
  /** The supplied string this entry is built from. Equals `prompt` when origin is 'supplied'. */
  readonly suppliedPrompt: string;
  /** Dotted id of the sub-industry whose `ai_prompts` supplied it, e.g. '18.02'. */
  readonly suppliedFromId: string;
  /** Index within that sub-industry's `ai_prompts`. 0 or 1 in v2.0.0. */
  readonly suppliedIndex: number;
  /** The sub-niche name that narrowed it. Absent when origin is 'supplied'. */
  readonly qualifierName?: string;
  /** Dotted id of that sub-niche, e.g. '18.02.01.02'. */
  readonly qualifierId?: string;
}

export interface PromptPanel {
  readonly entityPath: string;
  readonly level: IcpLevel;
  readonly prompts: readonly PanelPrompt[];
  /** Whether the panel clears §8.2 assertion 3 on its own. Reported, never enforced here. */
  readonly meetsMinimum: boolean;
}

export interface PanelOptions {
  /**
   * Entity paths beneath this one whose sub-niches are left out.
   *
   * Assertion 4 forbids two pages sharing a prompt string. A level-2 panel
   * composes over every sub-niche beneath it, which includes the ones a
   * published level-3 child would compose over, so the two panels would collide
   * on exactly those strings. The fix is a publication decision and this module
   * has no publication state, so the exclusion is passed in by whoever does:
   * the parent's panel excludes the children that have their own page.
   *
   * Paths are matched as prefixes, so passing a niche path drops every
   * sub-niche under it.
   */
  readonly exclude?: readonly string[];
}

/* ── Composition ──────────────────────────────────────────────────────────── */

export function composePrompt(supplied: string, qualifierName: string): string {
  return `${supplied}${COMPOSITION_JOINER}${qualifierName}`;
}

/**
 * Recover the two locked parts of a composed prompt from the string alone.
 *
 * Returns undefined for a verbatim supplied prompt, which is not a composition.
 * This is what lets a gate verify assertion 23 against the JSON instead of
 * against a provenance field that a hand-edited record could simply assert.
 */
export function decomposePrompt(prompt: string): { supplied: string; qualifier: string } | undefined {
  const at = prompt.indexOf(COMPOSITION_JOINER);
  if (at < 0) return undefined;
  const supplied = prompt.slice(0, at);
  const qualifier = prompt.slice(at + COMPOSITION_JOINER.length);
  if (!supplied || !qualifier) return undefined;
  return { supplied, qualifier };
}

/* ── Shape ────────────────────────────────────────────────────────────────── */

/**
 * B-problem when the prompt opens with a how/should/why-shaped word, B-vendor
 * otherwise.
 *
 * Derived from the leading token because that is the only signal present in the
 * string, and a classifier with more judgement in it would not be reproducible.
 * Measured over the 682: 285 open `best`, 67 `how`, 35 `who`, 32 `which`,
 * 11 `should`, 9 `top`. The rule tags roughly one in seven as B-problem, which
 * matches §3.2 finding 2's "a visible minority".
 *
 * Wrong in one direction on purpose: an unrecognised opener is `vendor`, the
 * shape that claims less. A B-problem prompt mislabelled `vendor` renders in the
 * wrong half of the table; a B-vendor prompt mislabelled `problem` would put
 * "you can win this one" against a prompt the client cannot win.
 */
const PROBLEM_LEAD = /^(how|should|why|can|what|where|when|is|are|do|does|would|will)\b/i;

const shapeOf = (prompt: string): PromptShape => (PROBLEM_LEAD.test(prompt.trim()) ? 'problem' : 'vendor');

/* ── Path parsing ─────────────────────────────────────────────────────────── */

export interface IcpEntityPathParts {
  readonly level: IcpLevel;
  readonly segments: readonly string[];
}

/**
 * Split an entity path into ICP segments, or undefined when it is not shaped
 * like one. Shape only: it says nothing about whether the taxonomy holds it.
 */
export function parseIcpEntityPath(entityPath: string): IcpEntityPathParts | undefined {
  const [empty, root, ...segments] = entityPath.split('/');
  if (empty !== '' || root !== 'industries') return undefined;
  if (segments.length < 1 || segments.length > 4) return undefined;
  if (segments.some((segment) => !segment)) return undefined;
  return { level: segments.length as IcpLevel, segments };
}

/* ── The panel ────────────────────────────────────────────────────────────── */

/** One sub-industry's contribution: its two supplied prompts and the sub-niches in scope. */
interface Scope {
  readonly industrySlug: string;
  readonly sub: IcpSubIndustry;
  /** Niches under `sub` that are beneath the page, each with the sub-niches in scope. */
  readonly niches: readonly { readonly niche: IcpNiche; readonly subNiches: readonly IcpSubNiche[] }[];
}

/**
 * The panel for one ICP entity, or undefined when the taxonomy does not hold
 * the path.
 *
 * Composition pairing, stated because it is arbitrary and therefore has to be
 * written down somewhere a reader can find it: within a sub-industry, the niche
 * at document index `j` pairs with supplied prompt `j % ai_prompts.length`.
 * Index within the PARENT sub-industry, not within the page's scope, so a niche
 * composes with the same base whether it is read from its own page or from its
 * parent's. That keeps a level-3 panel a subset of its level-2 parent's rather
 * than a different set of strings for the same entities, which is what makes
 * the `exclude` option above a clean subtraction.
 */
export function panelFor(entityPath: string, options: PanelOptions = {}): PromptPanel | undefined {
  const parsed = parseIcpEntityPath(entityPath);
  if (!parsed) return undefined;

  const scopes = scopesFor(parsed.segments);
  if (!scopes) return undefined;

  const excluded = options.exclude ?? [];
  const isExcluded = (path: string) => excluded.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));

  const prompts: PanelPrompt[] = [];
  const seen = new Set<string>();

  const push = (entry: PanelPrompt) => {
    /* Deduplicated by the prompt STRING, first occurrence wins. One sub-industry
       in v2.0.0 carries the same sub-niche name under two niches; if those two
       niches also share a base prompt the composed strings are identical, and
       two identical rows in a panel would be run twice and rendered twice. */
    if (seen.has(entry.prompt)) return;
    seen.add(entry.prompt);
    prompts.push(entry);
  };

  // Supplied first, in the operator's order. A derived prompt is never presented
  // ahead of the operator's own.
  for (const scope of scopes) {
    (scope.sub.ai_prompts ?? []).forEach((supplied, suppliedIndex) => {
      push({
        prompt: supplied,
        family: 'B',
        shape: shapeOf(supplied),
        origin: 'supplied',
        suppliedPrompt: supplied,
        suppliedFromId: scope.sub.id,
        suppliedIndex,
      });
    });
  }

  for (const scope of scopes) {
    const bases = scope.sub.ai_prompts ?? [];
    if (bases.length === 0) continue;

    for (const { niche, subNiches } of scope.niches) {
      const suppliedIndex = scope.sub.niches.indexOf(niche) % bases.length;
      const supplied = bases[suppliedIndex];

      for (const subNiche of subNiches) {
        if (isExcluded(`/industries/${pathOf(scope, niche, subNiche)}`)) continue;
        push({
          prompt: composePrompt(supplied, subNiche.name),
          family: 'B',
          // Composition narrows a question. It does not change its shape.
          shape: shapeOf(supplied),
          origin: 'composed',
          suppliedPrompt: supplied,
          suppliedFromId: scope.sub.id,
          suppliedIndex,
          qualifierName: subNiche.name,
          qualifierId: subNiche.id,
        });
      }
    }
  }

  return {
    entityPath,
    level: parsed.level,
    prompts,
    meetsMinimum: prompts.length >= MIN_DISTINCT_PROMPTS,
  };
}

const pathOf = (scope: Scope, niche: IcpNiche, subNiche: IcpSubNiche) =>
  `${scope.industrySlug}/${scope.sub.slug}/${niche.slug}/${subNiche.slug}`;

/**
 * Which sub-industries contribute prompts, and which sub-niches are in scope.
 *
 * Level 1 draws on every sub-industry beneath it, each composing only with its
 * OWN sub-niches, so a prompt never crosses from one sub-industry's vocabulary
 * into another's.
 *
 * Level 4 composes with its own name. A promoted sub-niche has nothing beneath
 * it, so the strict reading of assertion 23 would leave it the two supplied
 * prompts and nothing else. Reading "beneath" as "at or beneath" at the leaf is
 * the only reading under which a level-4 page has a panel at all, and it still
 * invents nothing. It yields three prompts, which is well under
 * MIN_DISTINCT_PROMPTS, so the panel reports `meetsMinimum: false` and a level-4
 * page cannot pass assertion 3 on a derived panel. That is consistent with
 * §1.7.2 ("level 4 is data, never a route") rather than a workaround for it.
 */
function scopesFor(segments: readonly string[]): Scope[] | undefined {
  const [industrySlug, subSlug, nicheSlug, subNicheSlug] = segments;

  const industry = getIcpIndustry(industrySlug);
  if (!industry) return undefined;

  if (!subSlug) {
    return industry.sub_industries.map((sub) => ({
      industrySlug,
      sub,
      niches: sub.niches.map((niche) => ({ niche, subNiches: niche.sub_niches })),
    }));
  }

  const found = getIcpSubIndustry(industrySlug, subSlug);
  if (!found) return undefined;
  const { sub } = found;

  if (!nicheSlug) {
    return [{
      industrySlug,
      sub,
      niches: sub.niches.map((niche) => ({ niche, subNiches: niche.sub_niches })),
    }];
  }

  const nicheRecord = getIcpNiche(industrySlug, subSlug, nicheSlug);
  if (!nicheRecord) return undefined;
  const { niche } = nicheRecord;

  if (!subNicheSlug) {
    return [{ industrySlug, sub, niches: [{ niche, subNiches: niche.sub_niches }] }];
  }

  const subNiche = niche.sub_niches.find((candidate) => candidate.slug === subNicheSlug);
  if (!subNiche) return undefined;
  return [{ industrySlug, sub, niches: [{ niche, subNiches: [subNiche] }] }];
}

/* ── The gate this module owes its own callers ────────────────────────────── */

/**
 * The joiner must not occur inside any locked string, or `decomposePrompt`
 * splits at the wrong place and assertion 23 becomes uncheckable.
 *
 * True of v2.0.0, measured. It is asserted rather than assumed because the
 * operator edits `icp-taxonomy.json` by hand and bumps the version, and a v2.1
 * prompt reading "the cheapest option, specifically for small runs" would break
 * the reverse direction silently.
 *
 * Throws with the offending string. Called by scripts/test-prompt-panel.cjs.
 */
export function assertCompositionJoinerIsUnambiguous(industries: Iterable<{
  readonly sub_industries: readonly IcpSubIndustry[];
}>): void {
  for (const industry of industries) {
    for (const sub of industry.sub_industries) {
      for (const prompt of sub.ai_prompts ?? []) {
        if (prompt.includes(COMPOSITION_JOINER)) {
          throw new Error(
            `Supplied prompt on ${sub.id} contains the composition joiner "${COMPOSITION_JOINER}": ` +
            `"${prompt}". decomposePrompt would split it at the wrong place, and §8.2 assertion 23 ` +
            'would stop being mechanically checkable. Change the joiner in lib/b2b/promptPanel.ts.',
          );
        }
      }
      for (const niche of sub.niches) {
        for (const subNiche of niche.sub_niches) {
          if (subNiche.name.includes(COMPOSITION_JOINER)) {
            throw new Error(
              `Sub-niche ${subNiche.id} name contains the composition joiner: "${subNiche.name}".`,
            );
          }
        }
      }
    }
  }
}
