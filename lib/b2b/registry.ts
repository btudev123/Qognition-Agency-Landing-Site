/* THE RESOLVER. One function decides which of two renders a URL gets.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ADR-0007 §2.4. `/industries/[industry]` and `/industries/[industry]/[subIndustry]`
 * are the templates for both the legacy 11/66 and the new B2B universe. Same
 * route, same file, same shell. Different branch on a discriminated union.
 *
 * LEGACY WINS, ALWAYS, AND THE ORDER BELOW IS THE WHOLE MECHANISM.
 *
 * The operator's hard constraint is that existing meta titles, descriptions,
 * URLs and internal linking do not change. `resolveIndustry` therefore checks
 * `data/industries.ts` FIRST and returns the moment it matches. A B2B entity can
 * never shadow a live URL, whatever anyone later writes in the taxonomy.
 *
 * THIS IS NOT HYPOTHETICAL. `financial-services` is an id in BOTH
 * `data/industries.ts` (live, published, 6 sub-pages) and in `META_VERTICALS`
 * in `data/b2b/verticals.ts`. Today the B2B row is `state: 'spine'` so nothing
 * renders and nothing collides. The day somebody promotes it, the legacy page
 * keeps the URL and the B2B hub silently gets no page — which is the safe
 * failure, but a silent one. scripts/check-b2b.cjs makes it loud: a routable
 * B2B slug that collides with a legacy id fails the build and names both.
 *
 * Consequence worth stating for whoever plans a wave: commercial insurance is
 * the flagship vertical (CLAUDE.md §1) and sits under the `financial-services`
 * meta-vertical, so its natural URL is
 * `/industries/financial-services/commercial-insurance` — under a parent that
 * legacy owns. That sub-niche cannot be published at that path without either
 * an operator decision to re-point the legacy hub, or a different meta-vertical
 * id. It is a routing decision, not a content one, and it is not Mira's to make.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { INDUSTRIES } from '../../data/industries';
import { META_VERTICALS, getMetaVertical, getSubNiche } from '../../data/b2b/verticals';
import type { MetaVertical, SubNiche, PublicationState } from '../../data/b2b/verticals';
import { getBody } from '../../data/b2b';
import type { HubBody, SubNicheBody } from '../../data/b2b/types';
import type { Industry, SubIndustry } from '../../types';

/** Draft and published render. Spine does not exist as a URL. */
export type RoutableState = 'draft' | 'published';

export function routableState(publication: PublicationState | undefined): RoutableState | undefined {
  if (publication?.state === 'draft') return 'draft';
  if (publication?.state === 'published') return 'published';
  return undefined;
}

export type IndustryRecord =
  | { readonly source: 'legacy'; readonly data: Industry }
  | {
      readonly source: 'b2b';
      readonly vertical: MetaVertical;
      readonly body: HubBody;
      readonly state: RoutableState;
    };

export type SubIndustryRecord =
  | { readonly source: 'legacy'; readonly industry: Industry; readonly data: SubIndustry }
  | {
      readonly source: 'b2b';
      readonly vertical: MetaVertical;
      readonly subNiche: SubNiche;
      readonly body: SubNicheBody;
      readonly state: RoutableState;
    };

/**
 * Legacy first. Then B2B, and only when the entity is routable AND its authored
 * body exists.
 *
 * A routable entity with no body returns `undefined` here, which means a 404
 * rather than a crash on a half-wired page. That is the safe runtime default and
 * it is deliberately paired with a loud build failure in scripts/check-b2b.cjs,
 * because a 404 nobody notices is how a page quietly stops existing.
 */
export function resolveIndustry(slug: string): IndustryRecord | undefined {
  const legacy = INDUSTRIES.find((item) => item.id === slug);
  if (legacy) return { source: 'legacy', data: legacy };

  const vertical = getMetaVertical(slug);
  if (!vertical) return undefined;
  const state = routableState(vertical.publication);
  if (!state) return undefined;

  const body = getBody(vertical.id);
  if (!body || body.kind !== 'hub') return undefined;
  return { source: 'b2b', vertical, body, state };
}

export function resolveSubIndustry(industrySlug: string, subSlug: string): SubIndustryRecord | undefined {
  const legacyIndustry = INDUSTRIES.find((item) => item.id === industrySlug);
  if (legacyIndustry) {
    const sub = legacyIndustry.subIndustries.find((item) => item.slug === subSlug);
    return sub ? { source: 'legacy', industry: legacyIndustry, data: sub } : undefined;
  }

  const vertical = getMetaVertical(industrySlug);
  if (!vertical) return undefined;
  /* A sub-niche is only reachable when its parent renders. An orphan under an
     unpublished parent is unreachable by navigation, which ADR-0007 §5.1 makes
     structurally impossible rather than merely discouraged. */
  if (!routableState(vertical.publication)) return undefined;

  const subNiche = getSubNiche(vertical.id, subSlug);
  if (!subNiche) return undefined;
  const state = routableState(subNiche.publication);
  if (!state) return undefined;

  const body = getBody(vertical.id, subNiche.id);
  if (!body || body.kind !== 'sub-niche') return undefined;
  return { source: 'b2b', vertical, subNiche, body, state };
}

/* ── Static params. Computed once at module scope, never in a component. ───── */

/** Every B2B hub that renders. Appended AFTER the legacy params, never interleaved. */
export function b2bHubParams(): { industry: string }[] {
  return META_VERTICALS.filter((v) => resolveIndustry(v.id)?.source === 'b2b').map((v) => ({
    industry: v.id,
  }));
}

export function b2bSubNicheParams(): { industry: string; subIndustry: string }[] {
  return META_VERTICALS.flatMap((v) =>
    v.subNiches
      .filter((s) => resolveSubIndustry(v.id, s.id)?.source === 'b2b')
      .map((s) => ({ industry: v.id, subIndustry: s.id }))
  );
}

/**
 * Entities that may enter the XML sitemap.
 *
 * `published` only. A draft renders at its URL, is `noindex`, and is absent
 * here — ADR-0007 §3.1. `publishedEntities()` in the taxonomy returns zero
 * today, so this returns zero, so `lib/sitemap.ts` is untouched and the 4,422
 * entry assertion in scripts/check-industry-gate.cjs holds.
 */
export function b2bSitemapPaths(): string[] {
  const out: string[] = [];
  for (const v of META_VERTICALS) {
    const hub = resolveIndustry(v.id);
    if (hub?.source === 'b2b' && hub.state === 'published') out.push(`/industries/${v.id}`);
    for (const s of v.subNiches) {
      const sub = resolveSubIndustry(v.id, s.id);
      if (sub?.source === 'b2b' && sub.state === 'published') {
        out.push(`/industries/${v.id}/${s.id}`);
      }
    }
  }
  return out;
}
