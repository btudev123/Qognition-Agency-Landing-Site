// Server-only taxonomy validation: do not import this from client form modules.
import taxonomy from '../data/b2b/icp/icp-taxonomy.json';
import { INDUSTRIES } from '../data/industries';
import { growthNiches, growthSectors } from '../data/growth/taxonomy';
import type { LeadPayload } from './validation';

type Context = NonNullable<LeadPayload['context']>;
type Ancestry = Pick<Context, 'industry_id' | 'subindustry_id' | 'niche_id' | 'subniche_id'>;
const fields = ['industry_id', 'subindustry_id', 'niche_id', 'subniche_id'] as const;
const index = new Map<string, Ancestry>();
for (const industry of taxonomy.industries) {
  const i = { industry_id: industry.id }; index.set(industry.id, i);
  for (const sub of industry.sub_industries) {
    const s = { ...i, subindustry_id: sub.id }; index.set(sub.id, s);
    for (const niche of sub.niches) {
      const n = { ...s, niche_id: niche.id }; index.set(niche.id, n);
      for (const leaf of niche.sub_niches) index.set(leaf.id, { ...n, subniche_id: leaf.id });
    }
  }
}
const overlaps = new Map(taxonomy.overlaps.map(row => [row.duplicate, row.canonical]));
const legacyIndustries = new Set([...INDUSTRIES.map(row => row.id), ...growthSectors.flatMap(row => [row.id, row.slug])]);
const legacyNiches = new Map(growthNiches.map(row => [row.id, row]));
export class LeadTaxonomyError extends Error { constructor() { super('invalid_taxonomy'); } }

/** Reporting context cannot prove qualification. Original overlap children stay intact. */
export function normalizeLeadContext(context: LeadPayload['context']): (Context & { canonical_niche_id?: string }) | undefined {
  if (!context) return undefined;
  const supplied = fields.filter(field => context[field]);
  if (!supplied.length) return context;
  const numeric = supplied.some(field => /^\d/.test(context[field]!));
  if (numeric) {
    const deepest = supplied[supplied.length - 1];
    const resolved = index.get(context[deepest]!);
    if (!resolved || resolved[deepest] !== context[deepest]) throw new LeadTaxonomyError();
    for (const field of supplied) if (resolved[field] !== context[field]) throw new LeadTaxonomyError();
    return { ...context, ...resolved, ...(resolved.niche_id && overlaps.has(resolved.niche_id) ? { canonical_niche_id: overlaps.get(resolved.niche_id) } : {}) };
  }
  // Explicit compatibility with the existing legacy industry/growth catalogues.
  if (context.industry_id && !legacyIndustries.has(context.industry_id)) throw new LeadTaxonomyError();
  if (context.niche_id || context.subniche_id) {
    const niche = legacyNiches.get(context.subniche_id || context.niche_id || '');
    if (!niche) throw new LeadTaxonomyError();
    const sector = growthSectors.find(row => row.id === niche.sectorId);
    if (context.industry_id && context.industry_id !== sector?.id && context.industry_id !== sector?.slug) throw new LeadTaxonomyError();
    if (context.subniche_id && context.niche_id && context.niche_id !== niche.parentId) throw new LeadTaxonomyError();
  }
  if (context.subindustry_id) throw new LeadTaxonomyError();
  return context;
}
