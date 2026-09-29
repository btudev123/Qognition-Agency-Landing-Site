/* THE FOUR-LEVEL RESOLVER. One function over a path array.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY ONE FUNCTION AND NOT FOUR.
 *
 * `lib/b2b/registry.ts` has `resolveIndustry(slug)` and
 * `resolveSubIndustry(a, b)`, one per level, and ADR-0008 §3.2 is explicit that
 * this shape needs a fifth copy the moment a fifth level is asked for. Worse, a
 * per-level function encodes the legacy rule per level too, which is how the
 * 2026-09-29 defect happened: the parent-routable precondition and
 * `check-b2b.cjs` item 2 were mutually exclusive for `financial-services` and
 * nobody noticed until Kyle executed the function.
 *
 * `resolveIcp(segments)` takes 1 to 4 segments and applies ONE rule:
 *
 *   > Ownership is decided per path prefix, longest legacy match first. Legacy
 *   > wins at whatever depth it holds a row, and nowhere below it.
 *
 * `data/industries.ts` is exactly two levels deep, so segments 3 and 4 can have
 * no legacy claimant, by construction and not by luck.
 *
 * THE MEASURED COLLISION SURFACE (ADR-0008 §1.4): one string, `financial-services`,
 * at the industry level only. Zero collisions at sub-industry, niche and
 * sub-niche against either legacy set. `scripts/check-icp.cjs` asserts it stays
 * that way, because a v2.1 hand-edit is the only thing that can change it.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT CROSSES THE COMPONENT BOUNDARY, AND WHAT MUST NOT.
 *
 * Every record this file returns carries flat VIEW objects with no child arrays
 * on them. A JSON node is never handed to a component. ADR-0008 §5.2 item 3 is
 * the reason: whatever is reachable from a prop is serialized into the RSC
 * payload of any page that renders it through a Client Component, and the reach
 * from one industry node is the whole 2.2MB tree. All of `components/b2b/*` are
 * Server Components today and `scripts/check-b2b.cjs` greps to keep them that
 * way, but a narrow record means the blast radius of getting that wrong is one
 * entity rather than one industry.
 *
 * It also satisfies Nadia's C1 structurally: a page's link set is computable
 * from the entity, its parent and its published siblings. O(siblings), never
 * O(11,561). No component can map the taxonomy because no component can see it.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { INDUSTRIES } from '../../data/industries';
import {
  getIcpIndustry,
  getIcpSubIndustry,
  getIcpNiche,
  getIcpSubNiche,
  icpPathForId,
  icpIndustrySlugById,
  resolveDedupeTarget,
  ICP_OVERLAPS,
  ICP_DEDUPE_LOG,
} from '../../data/b2b/icp';
import type { IcpFit, IcpPriority } from '../../data/b2b/icp';
import { getIcpBody, type IcpBody } from '../../data/b2b/icp/bodies';
import { icpPublicationState, icpReviewFor, ICP_PUBLISHED } from './icpPublication';
import type { IcpReview } from './icpPublication';
import type { IcpLevel, IcpRecord as IcpRecordContract, ResolveIcp } from './icpResolution';

/* THE RECORD SHAPE IS LUKE'S, IMPORTED, NOT REDECLARED.
 *
 * `lib/b2b/icpResolution.ts` holds ADR-0008 §3.2's types verbatim so that
 * `lib/b2b/observationStore.ts` could bind an observation to an ICP path before
 * this file existed. Its header asks this module to import them rather than
 * declare a second structurally identical copy, and it is right: two
 * declarations type-check and then disagree the first time one of them changes.
 *
 * What this file adds on top is the four things a PAGE needs and a resolver
 * port does not: the href, the authored body, the review, and the level-specific
 * entity views. `resolveIcp` below is asserted assignable to his `ResolveIcp` at
 * the bottom of this file, so the wiring stays one import at each call site. */
export type { IcpLevel };

export const ICP_BASE = '/industries';

/* ── Views. Flat, no child arrays, no back-references. ────────────────────── */

export interface IcpIndustryView {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  /** The operator's commercial read. The industry page's lead argument, and the
   *  only field level 1 has of its own. Theo §1: never rendered with a figure. */
  readonly note?: string;
}

export interface IcpSubIndustryView {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  /** Frames the observation panel. NEVER an H1, title, meta description or
   *  target query: it describes the Family B opportunity in the CLIENT's market. */
  readonly geoAngle?: string;
  /** OUR buyer. Drives the conversion register. Never `body.buyers[]`, which is
   *  the client's buyer. Theo §2 is the post-mortem for confusing the two. */
  readonly buyerTitles: readonly string[];
  readonly minFirmSize?: string;
  /** What one won program is worth TO THE CLIENT. Never in the same block as our
   *  price, and never joined to it by arithmetic. CLAUDE.md §4. */
  readonly clientValue?: string;
  /** FAMILY B. The client's buyer asking. We run these and publish the
   *  observation. We are never the cited answer to one. */
  readonly aiPrompts: readonly string[];
  /** FAMILY B. The client's paid demand, not our bid list. */
  readonly ppcKeywords: readonly string[];
}

export interface IcpNicheView {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  /** Leads the page angle, per positioning rule 8. Never rendered as a label. */
  readonly fit: IcpFit;
  /** Build order only. NEVER rendered, in any form. Theo §1. */
  readonly priority: IcpPriority;
}

export interface IcpSubNicheView {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
}

/** A link the graph generates. `href` present only when the target is published. */
export interface IcpLink {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly href?: string;
}

interface RecordBase extends IcpRecordContract {
  /** `/industries/<path>`. Built once here so no component joins segments. */
  readonly href: string;
  readonly review?: IcpReview;
  readonly body: IcpBody;
}

export type IcpRecord =
  | (RecordBase & { readonly level: 'industry'; readonly industry: IcpIndustryView })
  | (RecordBase & {
      readonly level: 'sub-industry';
      readonly industry: IcpIndustryView;
      readonly sub: IcpSubIndustryView;
    })
  | (RecordBase & {
      readonly level: 'niche';
      readonly industry: IcpIndustryView;
      readonly sub: IcpSubIndustryView;
      readonly niche: IcpNicheView;
    })
  | (RecordBase & {
      readonly level: 'sub-niche';
      readonly industry: IcpIndustryView;
      readonly sub: IcpSubIndustryView;
      readonly niche: IcpNicheView;
      readonly subNiche: IcpSubNicheView;
    });

/* ── Legacy ownership. ────────────────────────────────────────────────────── */

/**
 * The depth at which `data/industries.ts` holds a row for this exact path, or 0.
 *
 * 1 means the path IS a legacy industry hub. 2 means it IS a legacy sub-industry
 * page. 0 means legacy holds no row at this path, whatever it holds above it:
 * `financial-services/outsourced-finance-and-risk-advisory` returns 0 even
 * though `financial-services` returns 1, which is the "and nowhere below it"
 * half of the rule and the reason one colliding string does not block 16
 * sub-industries.
 *
 * Never returns 3 or 4. `data/industries.ts` is exactly two levels deep, so the
 * legacy tree cannot claim segment 3 or segment 4 at all. That is structural and
 * `scripts/check-icp.cjs` asserts the file's depth so a third level added there
 * fails the build rather than silently shadowing 2,376 niche paths.
 */
export function legacyClaimDepth(path: readonly string[]): 0 | 1 | 2 {
  if (path.length === 0) return 0;
  const industry = INDUSTRIES.find((item) => item.id === path[0]);
  if (!industry) return 0;
  if (path.length === 1) return 1;
  if (path.length === 2 && industry.subIndustries.some((s) => s.slug === path[1])) return 2;
  return 0;
}

/* ── The resolver. ────────────────────────────────────────────────────────── */

const industryView = (i: { id: string; slug: string; name: string; note?: string }): IcpIndustryView => ({
  id: i.id,
  slug: i.slug,
  name: i.name,
  note: i.note,
});

const subView = (s: {
  id: string;
  slug: string;
  name: string;
  geo_angle?: string;
  buyer_titles?: readonly string[];
  min_firm_size?: string;
  client_value?: string;
  ai_prompts?: readonly string[];
  ppc_keywords?: readonly string[];
}): IcpSubIndustryView => ({
  id: s.id,
  slug: s.slug,
  name: s.name,
  geoAngle: s.geo_angle,
  buyerTitles: s.buyer_titles ?? [],
  minFirmSize: s.min_firm_size,
  clientValue: s.client_value,
  aiPrompts: s.ai_prompts ?? [],
  ppcKeywords: s.ppc_keywords ?? [],
});

const nicheView = (n: {
  id: string;
  slug: string;
  name: string;
  fit: IcpFit;
  priority: IcpPriority;
}): IcpNicheView => ({ id: n.id, slug: n.slug, name: n.name, fit: n.fit, priority: n.priority });

/** The canonical path for a duplicate, from the 5 declared overlaps. Rule 7. */
function canonicalFor(id: string): readonly string[] | undefined {
  const overlap = ICP_OVERLAPS.find((o) => o.duplicate === id);
  return overlap ? icpPathForId(overlap.canonical) : undefined;
}

/**
 * Resolve a 1-to-4 segment path below `/industries`.
 *
 * Returns `undefined` for: a path legacy holds a row at, an unknown slug, a
 * spine entity, and a routable entity with no authored body of the right kind.
 *
 * The last one is deliberate and is paired with a loud build failure in
 * `scripts/check-icp.cjs`. A 404 is the safe runtime outcome for a half-wired
 * page; a 404 nobody notices is how a page quietly stops existing, so the gate
 * names it instead.
 */
export function resolveIcp(segments: readonly string[]): IcpRecord | undefined {
  if (segments.length < 1 || segments.length > 4) return undefined;
  /* Longest legacy match first. Legacy wins at its own depth and nowhere below. */
  if (legacyClaimDepth(segments) === segments.length) return undefined;

  const state = icpPublicationState(segments);
  if (state === 'spine') return undefined;

  const body = getIcpBody(segments);
  if (!body) return undefined;

  const href = `${ICP_BASE}/${segments.join('/')}`;
  const review = icpReviewFor(segments);
  const [a, b, c, d] = segments;

  if (segments.length === 1) {
    const industry = getIcpIndustry(a);
    if (!industry) return undefined;
    /* Level 1 takes a HubBody. A hub carries no vocabulary and no comparison
       axes: those differ per sub-industry and a hub that averaged them would be
       the template-substitution failure at the top of the tree. */
    if (body.kind !== 'hub') return undefined;
    return {
      level: 'industry',
      path: segments,
      id: industry.id,
      href,
      state,
      review,
      body,
      canonicalPath: canonicalFor(industry.id),
      industry: industryView(industry),
    };
  }

  if (body.kind !== 'sub-niche') return undefined;

  if (segments.length === 2) {
    const found = getIcpSubIndustry(a, b);
    if (!found) return undefined;
    return {
      level: 'sub-industry',
      path: segments,
      id: found.sub.id,
      href,
      state,
      review,
      body,
      canonicalPath: canonicalFor(found.sub.id),
      industry: industryView(found.industry),
      sub: subView(found.sub),
    };
  }

  if (segments.length === 3) {
    const found = getIcpNiche(a, b, c);
    if (!found) return undefined;
    return {
      level: 'niche',
      path: segments,
      id: found.niche.id,
      href,
      state,
      review,
      body,
      canonicalPath: canonicalFor(found.niche.id),
      industry: industryView(found.industry),
      sub: subView(found.sub),
      niche: nicheView(found.niche),
    };
  }

  const found = getIcpSubNiche(a, b, c, d);
  if (!found) return undefined;
  return {
    level: 'sub-niche',
    path: segments,
    id: found.subNiche.id,
    href,
    state,
    review,
    body,
    canonicalPath: canonicalFor(found.subNiche.id),
    industry: industryView(found.industry),
    sub: subView(found.sub),
    niche: nicheView(found.niche),
    subNiche: { id: found.subNiche.id, slug: found.subNiche.slug, name: found.subNiche.name },
  };
}

/* ── The link graph. Four classes, all bounded, none computed by similarity. ──
 *
 * ADR-0008 §7.2. The taxonomy IS the link graph: nothing is declared and nothing
 * is similarity-joined. The mesh cannot form because the largest branching
 * factor anywhere in the tree is 21 and the only cross-tree links in the whole
 * system are the ones the operator wrote down.
 * ────────────────────────────────────────────────────────────────────────── */

const publishedHref = (path: readonly string[]): string | undefined =>
  ICP_PUBLISHED.has(path.join('/')) ? `${ICP_BASE}/${path.join('/')}` : undefined;

/** Ancestors, nearest last. Never includes the entity itself. */
export function icpBreadcrumb(record: IcpRecord): readonly IcpLink[] {
  const out: IcpLink[] = [];
  const push = (path: readonly string[], id: string, slug: string, name: string) => {
    out.push({ id, slug, name, href: publishedHref(path) });
  };
  if (record.level !== 'industry') {
    push([record.industry.slug], record.industry.id, record.industry.slug, record.industry.name);
  }
  if (record.level === 'niche' || record.level === 'sub-niche') {
    push(
      [record.industry.slug, record.sub.slug],
      record.sub.id,
      record.sub.slug,
      record.sub.name
    );
  }
  if (record.level === 'sub-niche') {
    push(
      [record.industry.slug, record.sub.slug, record.niche.slug],
      record.niche.id,
      record.niche.slug,
      record.niche.name
    );
  }
  return out;
}

/**
 * Immediate children, PUBLISHED ONLY, uncapped, in operator id order.
 *
 * TWO DECISIONS HERE AND BOTH ARE DELIBERATE.
 *
 * Published only, so Nadia's C6 — the one she left open in §5.4 and asked to be
 * decided this way. An unpublished entity is invisible: not a link, not plain
 * text, not a greyed row. A sub-industry page listing 10 niches of which 3 are
 * published and 7 are spine is a directory stub, which is the shape
 * `/locations/*` had. The existing `ChildrenBlock` in `blocks.tsx` renders a
 * "no page yet" list for the 15-entry spine and that behaviour does NOT come
 * across to this family; `components/b2b/IcpBlocks.tsx` has its own block which
 * omits itself entirely when nothing is published.
 *
 * The sub-niche names are not lost by this. They render on the parent page as
 * the coverage grid, which is vocabulary with real content and anchor targets,
 * not a list of things we do not have. Nadia §1.7.2 jobs 1 and 2.
 *
 * Uncapped, per ADR-0008 §7.2: the children block IS the orphan-prevention
 * mechanism and capping it silently orphans the overflow. The measured maximum
 * is 21, so uncapped costs nothing.
 *
 * Ordered by the operator's dotted `id`, which is stable, is not array position,
 * and preserves the sequence the operator wrote (`05.01` before `05.02`).
 * Sorting an uncapped list selects nothing, so C2's slug rule is not at stake
 * here; it is at stake on siblings, which are capped, and that is where slug
 * order is used.
 */
export function icpChildren(record: IcpRecord): readonly IcpLink[] {
  const rows = childRows(record);
  return rows
    .filter((r) => publishedHref(r.path))
    .sort((x, y) => (x.id < y.id ? -1 : x.id > y.id ? 1 : 0))
    .map((r) => ({ id: r.id, slug: r.slug, name: r.name, href: publishedHref(r.path) }));
}

/**
 * Every immediate child, published or not, as NAMES with no href.
 *
 * This is the coverage grid and the entity vocabulary, not a link list. Nothing
 * here may become an anchor: Nadia §5.1 rule 14 forbids a sub-niche name being a
 * link, and forbids a `#fragment` link to one, because a fragment inflates the
 * internal link count against the 40-link ceiling while adding no crawl path. An
 * anchor TARGET is not a link, so the rendered heading carries `id="<slug>"` and
 * nothing points at it with an `<a>`.
 */
export function icpVocabularyRows(record: IcpRecord): readonly IcpSubNicheView[] {
  return [...childRows(record)]
    .sort((x, y) => (x.id < y.id ? -1 : x.id > y.id ? 1 : 0))
    .map((r) => ({ id: r.id, slug: r.slug, name: r.name }));
}

interface ChildRow {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly path: readonly string[];
}

function childRows(record: IcpRecord): readonly ChildRow[] {
  if (record.level === 'sub-niche') return [];
  if (record.level === 'industry') {
    const industry = getIcpIndustry(record.industry.slug);
    if (!industry) return [];
    return industry.sub_industries.map((s) => ({
      id: s.id,
      slug: s.slug,
      name: s.name,
      path: [industry.slug, s.slug],
    }));
  }
  if (record.level === 'sub-industry') {
    const found = getIcpSubIndustry(record.industry.slug, record.sub.slug);
    if (!found) return [];
    return found.sub.niches.map((n) => ({
      id: n.id,
      slug: n.slug,
      name: n.name,
      path: [found.industry.slug, found.sub.slug, n.slug],
    }));
  }
  const found = getIcpNiche(record.industry.slug, record.sub.slug, record.niche.slug);
  if (!found) return [];
  return found.niche.sub_niches.map((sn) => ({
    id: sn.id,
    slug: sn.slug,
    name: sn.name,
    path: [found.industry.slug, found.sub.slug, found.niche.slug, sn.slug],
  }));
}

/** ADR-0008 §7.2 and ADR-0007 §5.3, retained. Inside the 12-link sideways cap. */
export const ICP_SIBLING_CAP = 5;

/**
 * Published siblings, self removed, ORDERED BY SLUG, capped at 5.
 *
 * SLUG ORDER, NOT ARRAY POSITION, AND THIS IS THE WHOLE POINT OF THE FUNCTION.
 * ADR-0008 §7.2 said "taxonomy order", which is array position in the JSON, and
 * Nadia's C2 objects for a reason that is a post-mortem rather than a
 * preference: `relatedTerms` computed as a modulo over a mutable array meant one
 * upstream row change silently rewired 320 glossary pages' internal links, and
 * the snapshot assertion passed because it compared slug SETS rather than
 * sequences. The file is operator-locked and versioned, so a reorder is
 * unlikely. `slice(0, 320)` was also unlikely.
 *
 * A cap applied to a sorted-by-position list is SELECTION by position. Sorting
 * by slug first costs one comparator and removes the entire class of silent
 * link-graph rewrite from the mechanism that carries the whole family.
 */
export function icpSiblings(record: IcpRecord): readonly IcpLink[] {
  const parent = parentPath(record);
  if (!parent) return [];
  const parentRecord = resolveAny(parent);
  const rows = parentRecord ? childRows(parentRecord) : childRowsOfPath(parent);
  return rows
    .filter((r) => r.slug !== ownSlug(record))
    .filter((r) => publishedHref(r.path))
    .sort((x, y) => (x.slug < y.slug ? -1 : x.slug > y.slug ? 1 : 0))
    .slice(0, ICP_SIBLING_CAP)
    .map((r) => ({ id: r.id, slug: r.slug, name: r.name, href: publishedHref(r.path) }));
}

function ownSlug(record: IcpRecord): string {
  if (record.level === 'industry') return record.industry.slug;
  if (record.level === 'sub-industry') return record.sub.slug;
  if (record.level === 'niche') return record.niche.slug;
  return record.subNiche.slug;
}

function parentPath(record: IcpRecord): readonly string[] | undefined {
  return record.path.length > 1 ? record.path.slice(0, -1) : undefined;
}

/** Sibling enumeration must not depend on the parent being published. */
function childRowsOfPath(path: readonly string[]): readonly ChildRow[] {
  const [a, b, c] = path;
  if (path.length === 1) {
    const industry = getIcpIndustry(a);
    return industry
      ? industry.sub_industries.map((s) => ({ id: s.id, slug: s.slug, name: s.name, path: [a, s.slug] }))
      : [];
  }
  if (path.length === 2) {
    const found = getIcpSubIndustry(a, b);
    return found
      ? found.sub.niches.map((n) => ({ id: n.id, slug: n.slug, name: n.name, path: [a, b, n.slug] }))
      : [];
  }
  if (path.length === 3) {
    const found = getIcpNiche(a, b, c);
    return found
      ? found.niche.sub_niches.map((sn) => ({
          id: sn.id,
          slug: sn.slug,
          name: sn.name,
          path: [a, b, c, sn.slug],
        }))
      : [];
  }
  return [];
}

function resolveAny(path: readonly string[]): IcpRecord | undefined {
  return resolveIcp(path);
}

/* ── Cross-tree pointers. The only out-of-tree links in the system. ─────────
 *
 * ADR-0008 §7.3 budgets 18: the 5 declared `overlaps` and the 13 `dedupe_log`
 * rows. MEASURED AGAINST THE LOCKED v2.0.0 FILE, 11 OF THE 18 RESOLVE.
 *
 * All 5 overlaps resolve, because they carry dotted ids. 6 of the 13 dedupe rows
 * resolve, because they carry a niche NAME and 7 of those names do not exist in
 * the industry the row says the niche was kept in. Five of the seven differ by a
 * suffix, which is exactly the kind of near-match that must not be guessed:
 * fuzzy-matching a row to an entity is what Nadia §5.1 rule 6 forbids for case
 * studies, and positioning rule 6 forbids inventing the id that would fix it.
 *
 * So this returns 11 today, `scripts/check-icp.cjs` asserts that number and
 * names the 7 that do not resolve, and the fix is dotted ids on the dedupe rows
 * in the locked file. It is a `[NEEDS DATA]`, not a matcher.
 * ────────────────────────────────────────────────────────────────────────── */

export interface IcpCrossLink {
  readonly kind: 'overlap-canonical' | 'overlap-duplicate' | 'deduped-elsewhere';
  readonly name: string;
  readonly path: readonly string[];
  readonly href?: string;
  /** Why this pointer exists, in one line. Rendered, so the reader is not guessing. */
  readonly reason: string;
}

export function icpCrossLinks(record: IcpRecord): readonly IcpCrossLink[] {
  const out: IcpCrossLink[] = [];

  for (const overlap of ICP_OVERLAPS) {
    if (overlap.duplicate === record.id) {
      const path = icpPathForId(overlap.canonical);
      if (path) {
        out.push({
          kind: 'overlap-canonical',
          name: overlap.buyer,
          path,
          href: publishedHref(path),
          reason: 'The same buyer is covered under a second branch of the taxonomy. That branch is canonical.',
        });
      }
    }
    if (overlap.canonical === record.id) {
      const path = icpPathForId(overlap.duplicate);
      if (path) {
        out.push({
          kind: 'overlap-duplicate',
          name: overlap.buyer,
          path,
          href: publishedHref(path),
          reason: 'The same buyer also appears under a second branch, which points here.',
        });
      }
    }
  }

  /* A dedupe pointer hangs on the sub-industry page of the industry the niche
     was removed from, which is the page a reader of that branch would land on. */
  if (record.level === 'sub-industry' || record.level === 'industry') {
    for (const row of ICP_DEDUPE_LOG) {
      if (icpIndustrySlugById(row.removed_from) !== record.industry.slug) continue;
      const path = resolveDedupeTarget(row);
      if (!path) continue;
      out.push({
        kind: 'deduped-elsewhere',
        name: row.niche,
        path,
        href: publishedHref(path),
        reason: 'Covered under another industry, where the buyer and the evidence sit.',
      });
    }
  }

  return out;
}

/** Every cross-tree pointer the whole system can generate. For the gate. */
export function icpAllCrossLinks(): readonly { from: string; to: readonly string[] }[] {
  const out: { from: string; to: readonly string[] }[] = [];
  for (const overlap of ICP_OVERLAPS) {
    const canonical = icpPathForId(overlap.canonical);
    const duplicate = icpPathForId(overlap.duplicate);
    if (canonical && duplicate) {
      out.push({ from: overlap.duplicate, to: canonical });
      out.push({ from: overlap.canonical, to: duplicate });
    }
  }
  for (const row of ICP_DEDUPE_LOG) {
    const to = resolveDedupeTarget(row);
    if (to) out.push({ from: row.removed_from, to });
  }
  return out;
}

/** The dedupe rows whose niche name matches nothing. Named by the gate, never guessed. */
export function icpUnresolvedDedupeRows(): readonly string[] {
  return ICP_DEDUPE_LOG.filter((row) => !resolveDedupeTarget(row)).map(
    (row) => `${row.niche} (removed from ${row.removed_from}, kept in ${row.kept_in})`
  );
}

/* ── The composed prompt set. Luke's mechanism, not a second one. ────────────
 *
 * `lib/b2b/promptPanel.ts` owns composition: supplied prompt + a reversible
 * joiner + the operator's own sub-niche name, `decomposePrompt` recovers both
 * locked halves from the string alone, and `assertCompositionJoinerIsUnambiguous`
 * re-checks on every gate run that the joiner appears in none of the 682 supplied
 * prompts and none of the 8,823 names. A template must call `panelFor` and must
 * not build a prompt string itself.
 *
 * What this file owes that module is the ONE thing it cannot know, because it
 * holds no publication state: which descendants have their own page. Nadia's
 * §8.2 assertion 4 forbids two pages sharing a prompt string, and a parent's
 * panel composes over every sub-niche beneath it, including the ones a published
 * child composes over. `panelFor(record.href, { exclude: icpPanelExclusions(record) })`
 * is the whole contract, and the exclusion is a clean subtraction because the
 * pairing is indexed within the parent sub-industry either way.
 * ────────────────────────────────────────────────────────────────────────── */

export function icpPanelExclusions(record: IcpRecord): readonly string[] {
  const prefix = `${record.path.join('/')}/`;
  return [...ICP_PUBLISHED.keys()]
    .filter((key) => key.startsWith(prefix))
    .sort()
    .map((key) => `${ICP_BASE}/${key}`);
}

/* ── Rule 8: which angle leads. ────────────────────────────────────────────── */

/**
 * `fit` exists only on the niche. Levels 1, 2 and 4 do not have one and rule 8
 * still applies to every page, so the derivation is stated rather than
 * improvised (Theo §7): modal fit of the level's own niches, ties lead with
 * `Both`; a niche uses its own; a sub-niche uses its parent niche's.
 *
 * It orders the two argument blocks. It is NEVER rendered as a label: a reader
 * does not need to know we classified them.
 */
export function icpLeadingFit(record: IcpRecord): IcpFit {
  if (record.level === 'niche') return record.niche.fit;
  if (record.level === 'sub-niche') return record.niche.fit;

  const counts: Record<IcpFit, number> = { 'AI SEO': 0, PPC: 0, Both: 0 };
  if (record.level === 'sub-industry') {
    const found = getIcpSubIndustry(record.industry.slug, record.sub.slug);
    for (const niche of found?.sub.niches ?? []) counts[niche.fit] += 1;
  } else {
    const industry = getIcpIndustry(record.industry.slug);
    for (const sub of industry?.sub_industries ?? []) {
      for (const niche of sub.niches) counts[niche.fit] += 1;
    }
  }
  const max = Math.max(counts['AI SEO'], counts.PPC, counts.Both);
  if (max === 0) return 'Both';
  if (counts.Both === max) return 'Both';
  return counts['AI SEO'] === max ? 'AI SEO' : 'PPC';
}

/* ── Static params. Published only, at every level. ────────────────────────── */

/**
 * PUBLISHED ONLY, AT ALL FOUR LEVELS, AND TODAY THAT IS NOTHING.
 *
 * `dynamicParams = false` on all four routes, so this array is the entire set of
 * URLs the family can serve. `ICP_PUBLISHED` is empty, so every one of these
 * returns `[]` and the build does not grow by a single page. The capability is
 * built for 11,561; the ceiling is 0 and waves raise it.
 *
 * A draft resolves in `resolveIcp` and in the gates but does not appear here, so
 * it 404s. See the header of `lib/b2b/icpPublication.ts` for why that is the
 * narrower reading and what it costs.
 */
function publishedPathsAtDepth(depth: number): readonly (readonly string[])[] {
  return [...ICP_PUBLISHED.keys()]
    .map((key) => key.split('/'))
    .filter((segments) => segments.length === depth)
    .filter((segments) => resolveIcp(segments) !== undefined)
    .sort((a, b) => (a.join('/') < b.join('/') ? -1 : 1));
}

export function icpIndustryParams(): { industry: string }[] {
  return publishedPathsAtDepth(1).map(([industry]) => ({ industry }));
}

export function icpSubIndustryParams(): { industry: string; subIndustry: string }[] {
  return publishedPathsAtDepth(2).map(([industry, subIndustry]) => ({ industry, subIndustry }));
}

export function icpNicheParams(): { industry: string; subIndustry: string; niche: string }[] {
  return publishedPathsAtDepth(3).map(([industry, subIndustry, niche]) => ({
    industry,
    subIndustry,
    niche,
  }));
}

export function icpSubNicheParams(): {
  industry: string;
  subIndustry: string;
  niche: string;
  subNiche: string;
}[] {
  return publishedPathsAtDepth(4).map(([industry, subIndustry, niche, subNiche]) => ({
    industry,
    subIndustry,
    niche,
    subNiche,
  }));
}

/**
 * Entities that may enter the XML sitemap. `published` only, and a duplicate
 * under rule 7 never enters: it carries a canonical to the page that does.
 */
export function icpSitemapPaths(): string[] {
  const out: string[] = [];
  for (const key of [...ICP_PUBLISHED.keys()].sort()) {
    const record = resolveIcp(key.split('/'));
    if (record && record.state === 'published' && !record.canonicalPath) out.push(record.href);
  }
  return out;
}

/** Every resolvable published record. For the reachability walk in the gate. */
export function icpPublishedRecords(): readonly IcpRecord[] {
  return [...ICP_PUBLISHED.keys()]
    .sort()
    .map((key) => resolveIcp(key.split('/')))
    .filter((record): record is IcpRecord => record !== undefined);
}

/* ── The port, satisfied. ─────────────────────────────────────────────────────
 *
 * Compile-time proof that this implementation is assignable to ADR-0008 §3.2's
 * declared resolver, so `lib/b2b/observationStore.ts` can take it with no
 * adapter. Declared rather than applied to the export, because call sites need
 * the narrow discriminated union and `ResolveIcp` would widen it back to the
 * contract shape. If this line stops compiling, the two have drifted. */
const _satisfiesResolverPort: ResolveIcp = resolveIcp;
void _satisfiesResolverPort;
