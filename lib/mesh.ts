// Relevance engine for the programmatic mesh. Gates service × industry ×
// location combinations so we only generate/index sensible pages — never the
// full ~3.7M Cartesian product (HCU/crawl-budget risk).

import { SERVICES, LOCATION_MATRIX_SERVICES } from '../data/services';
import { INDUSTRIES } from '../data/industries';
import { LOCATIONS } from '../data/locations';

// Highest-commercial-intent markets for the curated, indexable static set.
export const TIER1_LOCATION_SLUGS = [
  'new-york', 'london', 'dubai', 'singapore', 'sydney',
  'toronto', 'mumbai', 'los-angeles', 'san-francisco', 'berlin',
  'paris', 'bangalore', 'chicago', 'manchester', 'melbourne',
];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** Is a service ↔ industry pair commercially sensible? */
export function isRelevantServiceIndustry(serviceId: string, industryId: string): boolean {
  const service = SERVICES.find((s) => s.id === serviceId);
  const industry = INDUSTRIES.find((i) => i.id === industryId);
  if (!service || !industry) return false;
  const ind = norm(industry.name);
  // Relevant if the service's relatedIndustries name-matches the industry.
  return service.relatedIndustries.some((ri) => {
    const r = norm(ri);
    return r === ind || r.includes(ind) || ind.includes(r);
  });
}

export interface MeshCombo {
  service: string;
  industry: string;
  location: string;
}

/** Curated, relevance-gated 3-way combos for static generation + indexing. */
export function getCuratedMeshCombos(): MeshCombo[] {
  const tier1 = LOCATIONS.filter((l) => TIER1_LOCATION_SLUGS.includes(l.slug));
  const combos: MeshCombo[] = [];
  for (const service of LOCATION_MATRIX_SERVICES) {
    for (const industry of INDUSTRIES) {
      if (!isRelevantServiceIndustry(service.id, industry.id)) continue;
      for (const loc of tier1) {
        combos.push({ service: service.id, industry: industry.id, location: loc.slug });
      }
    }
  }
  return combos;
}

const curatedKeys = new Set(
  getCuratedMeshCombos().map((c) => `${c.location}/${c.service}/${c.industry}`),
);

/** Is this exact combo in the curated (indexable) set? */
export function isCuratedCombo(location: string, service: string, industry: string): boolean {
  return curatedKeys.has(`${location}/${service}/${industry}`);
}
