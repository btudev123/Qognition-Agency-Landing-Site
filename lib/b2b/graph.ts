/* THE LINK GRAPH. Computed once, at module scope, in build-time Node.
 *
 * ADR-0007 §5: no page hand-writes a link list and no component maps over the
 * whole registry. `components/shared/CrossLinks.tsx` does exactly that — an
 * unfiltered `INDUSTRIES.map(...)` on every service, industry and region page —
 * and it is the bug this file exists not to repeat. One place to audit, one
 * place a gate can read, zero client JS.
 *
 * WHAT IS LINKED AND WHAT IS ONLY LISTED. A hub shows every sub-niche it covers,
 * because the taxonomy is the honest answer to "do you cover my kind of firm"
 * and truncating it would make a 13-row vertical look like a 1-row one. Only the
 * ROUTABLE ones become anchors. The rest render as plain text under a label that
 * says no page exists yet. Linking a spine entity would 404 — dynamicParams is
 * false on both routes — and Industries.tsx already establishes the house rule:
 * "a card that lights up and goes nowhere is worse than a card that does not
 * light up."
 */

import { META_VERTICALS } from '../../data/b2b/verticals';
import type { MetaVertical, SubNiche } from '../../data/b2b/verticals';
import { resolveIndustry, resolveSubIndustry } from './registry';

/** The four layer pages, one fixed block, same order everywhere. Nadia §5.1 rule 5. */
export const SERVICE_LINKS: readonly { readonly href: string; readonly label: string; readonly surface: string }[] = [
  { href: '/services/seo', label: 'SEO', surface: 'Google search results' },
  { href: '/services/seo/local-seo', label: 'Local SEO', surface: 'Google Maps, local pack, Bing Places, Business Profile, reviews, listings' },
  { href: '/services/ai-seo', label: 'AI SEO', surface: 'Google AI Overviews and AI Mode' },
  { href: '/services/ai-seo/generative-engine-optimization', label: 'GEO', surface: 'ChatGPT, Perplexity, Gemini, Claude, Copilot' },
];

export interface ChildEntry {
  readonly id: string;
  readonly label: string;
  readonly geoAngle?: string;
  readonly examples?: readonly string[];
  /** Present only when the entity renders. `undefined` means "listed, not linked". */
  readonly href?: string;
}

/** Every sub-niche of a vertical, in taxonomy order, with hrefs on the routable ones. */
export function childrenOf(vertical: MetaVertical): readonly ChildEntry[] {
  return vertical.subNiches.map((s: SubNiche) => {
    const routable = resolveSubIndustry(vertical.id, s.id)?.source === 'b2b';
    return {
      id: s.id,
      label: s.label,
      geoAngle: s.geoAngle,
      examples: s.examples,
      href: routable ? `/industries/${vertical.id}/${s.id}` : undefined,
    };
  });
}

/**
 * Siblings that actually resolve, capped.
 *
 * Deterministic: taxonomy order, self removed, routable only, then capped. Same
 * input, same output, every build. Nadia §5.1 rule 3 wants 3 to 5 chosen by
 * shared buyer title and then shared standard; that selection needs authored
 * bodies on the siblings to compare, and siblings without bodies are not
 * routable, so the richer rule has nothing to operate on until a vertical has
 * several published pages. Taxonomy order is the honest stand-in and it is
 * stable, which is the property that matters. Revisit when a vertical first has
 * more than five routable sub-niches.
 *
 * Cap is 5, inside ADR-0007 §5.3's ceiling of 12 generated links for the whole
 * sibling-plus-related block.
 */
export const SIBLING_CAP = 5;

export function siblingsOf(vertical: MetaVertical, selfId: string): readonly ChildEntry[] {
  return childrenOf(vertical)
    .filter((c) => c.id !== selfId && c.href !== undefined)
    .slice(0, SIBLING_CAP);
}

/**
 * Inbound in-content links to an entity, from entities that render.
 *
 * A sub-niche's parent hub lists every child, so any routable sub-niche under a
 * routable hub has at least one. A hub's inbound link is `/industries`, which is
 * legacy and which this work does not edit — so a routable hub scores 0 here by
 * construction and the gate treats hubs separately. Stated rather than papered
 * over: ADR-0007 §12 records that adding master links to `app/industries/page.tsx`
 * is blocked on the operator, and until that lands a B2B hub is orphaned from
 * the indexable graph. That is tolerable only while every B2B entity is `draft`
 * and therefore noindex and absent from the sitemap. It is a blocker for the
 * first `published` promotion, not for a draft.
 */
export function inboundCount(verticalId: string, subNicheId?: string): number {
  if (!subNicheId) return 0;
  const parentRenders = resolveIndustry(verticalId)?.source === 'b2b';
  if (!parentRenders) return 0;
  const listed = childrenOf(resolveIndustryVertical(verticalId)!).some(
    (c) => c.id === subNicheId && c.href !== undefined
  );
  return listed ? 1 : 0;
}

function resolveIndustryVertical(verticalId: string): MetaVertical | undefined {
  const record = resolveIndustry(verticalId);
  return record?.source === 'b2b' ? record.vertical : undefined;
}

/** `/` → `/industries` → hub → sub-niche. ADR-0007 §5.2 ceiling is 3. */
export function depthFromRoot(subNicheId?: string): number {
  return subNicheId ? 3 : 2;
}

/** Every routable entity, for the gate to walk. */
export function routableEntities(): readonly { verticalId: string; subNicheId?: string }[] {
  const out: { verticalId: string; subNicheId?: string }[] = [];
  for (const v of META_VERTICALS) {
    if (resolveIndustry(v.id)?.source === 'b2b') out.push({ verticalId: v.id });
    for (const s of v.subNiches) {
      if (resolveSubIndustry(v.id, s.id)?.source === 'b2b') {
        out.push({ verticalId: v.id, subNicheId: s.id });
      }
    }
  }
  return out;
}
