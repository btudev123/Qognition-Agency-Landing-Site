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
