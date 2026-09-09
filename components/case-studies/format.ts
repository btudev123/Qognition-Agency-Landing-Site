import type { Kpi } from '../../data/case-studies';

/**
 * Truncates to a meta-description-safe length on a word boundary.
 * Never cuts mid-word — a clipped word in a SERP snippet reads as broken, not concise.
 */
export const truncate = (input: string, max = 155): string => {
  if (input.length <= max) return input;
  const clipped = input.slice(0, max - 1);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : max - 1).trimEnd()}…`;
};

export const formatAuditedDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

/**
 * Picks the KPI with the largest absolute magnitude in `change` for card-level display.
 * Deterministic — sorts on a parsed number, falls back to the first row if nothing parses,
 * so the same study always surfaces the same headline metric between builds.
 */
export const pickHeadlineKpi = (kpis: readonly Kpi[]): Kpi | undefined => {
  if (kpis.length === 0) return undefined;
  const magnitude = (k: Kpi) => {
    const match = k.change.match(/-?\d+(\.\d+)?/);
    return match ? Math.abs(parseFloat(match[0])) : 0;
  };
  return [...kpis].sort((a, b) => magnitude(b) - magnitude(a))[0];
};
