/** Client-safe attribution only. The API verifies taxonomy ancestry. */
export type FunnelContext = {
  stage?: 'tofu' | 'mofu' | 'bofu'; locale?: string; page_id?: string;
  service_id?: string; industry_id?: string; subindustry_id?: string;
  niche_id?: string; subniche_id?: string; asset_id?: string;
};
const keys = ['stage', 'locale', 'page_id', 'service_id', 'industry_id', 'subindustry_id', 'niche_id', 'subniche_id', 'asset_id'] as const;
const locales = new Set(['en', 'de', 'fr', 'nl', 'sv', 'da', 'nb', 'fi', 'ar', 'it', 'zh-Hans']);
export function readFunnelContext(search: URLSearchParams): FunnelContext | undefined {
  const out: Record<string, string> = {};
  for (const key of keys) {
    const value = search.get(key);
    if (!value || value.length > (key === 'page_id' ? 240 : 100)) continue;
    if (key === 'stage' && !['tofu', 'mofu', 'bofu'].includes(value)) continue;
    if (key === 'locale' && !locales.has(value)) continue;
    if (key !== 'page_id' && !/^[a-zA-Z0-9_.-]+$/.test(value)) continue;
    if (key === 'page_id' && !/^[a-zA-Z0-9_./-]+$/.test(value)) continue;
    out[key] = value;
  }
  return Object.keys(out).length ? out as FunnelContext : undefined;
}
export function appendFunnelContext(href: string, context?: FunnelContext): string {
  if (!context || !href.startsWith('/') || href.startsWith('//')) return href;
  const url = new URL(href, 'https://www.qognitionagency.com');
  const incoming = new URLSearchParams();
  for (const key of keys) if (context[key]) incoming.set(key, context[key]!);
  const safe = readFunnelContext(incoming);
  for (const key of keys) if (safe?.[key]) url.searchParams.set(key, safe[key]!);
  return `${url.pathname}${url.search}${url.hash}`;
}

/* The Free AI visibility audit is requested through the /contact form (operator,
 * 2026-10-14: "all leads should end up in /contact"). The tag rides in the existing
 * asset_id key, so it survives appendFunnelContext and readFunnelContext like any
 * other context. /contact turns it into intent "audit", and the lead carries both
 * intent: 'audit' and context.asset_id: AUDIT_ASSET_ID. */
export const AUDIT_ASSET_ID = 'free-ai-visibility-audit';
export const AUDIT_REQUEST_HREF = `/contact?asset_id=${AUDIT_ASSET_ID}`;
export const isAuditRequest = (context?: FunnelContext) => context?.asset_id === AUDIT_ASSET_ID;
export function auditRequestHref(context?: FunnelContext): string {
  return appendFunnelContext('/contact', { ...context, asset_id: AUDIT_ASSET_ID });
}
