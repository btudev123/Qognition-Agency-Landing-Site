import { CAPTURED_AT_PATTERN, CLICK_ID_KEYS, isIsoTimestamp } from './clickIds';

/** Bumped 2026-10-14 (Anton F1) when ad click codes started being kept for 90 days, so every
 * earlier choice is asked again. readConsent() and consentModeScript() both ignore a stored
 * choice saved under any other version. */
export const CONSENT_POLICY_VERSION = '2026-10-14';
export const CONSENT_STORAGE_KEY = 'qognition_consent_v1';
export const CONSENT_EVENT = 'qognition:consent';
/** Durable first touch and ad click IDs (lib/analytics.ts). Written only with advertising consent. */
export const ATTRIBUTION_DURABLE_KEY = 'qognition_attribution_durable_v1';
export type ConsentPreferences = { analytics: boolean; advertising: boolean; recorded_at: string; policy_version: string };
let sessionChoice: ConsentPreferences | undefined;

export const consentWasWithdrawn = (previous: ConsentPreferences | null, next: ConsentPreferences | null) => Boolean((previous?.analytics && !next?.analytics) || (previous?.advertising && !next?.advertising));
export const refreshConsentFromStorage = () => { sessionChoice = undefined; };

/** A stored choice counts only if saveConsent() could have written it: the current policy
 * version, two booleans, and a recorded_at that is a real Date#toISOString() time. Anything else,
 * a tampered recorded_at included (Owen re-review C), is no stored choice, so the region default
 * applies and the banner asks again. consentStateFunction() below applies the same test. */
export function readConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;
  if (sessionChoice) return sessionChoice;
  try {
    const value = JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) || 'null');
    return value && value.policy_version === CONSENT_POLICY_VERSION && typeof value.analytics === 'boolean' && typeof value.advertising === 'boolean' && isIsoTimestamp(value.recorded_at) ? value : null;
  } catch { return null; }
}

/**
 * Operator decision 2026-10-06: consent is split by region.
 * Opt-out (tracking on until the visitor rejects) for the US, Canada, Australia, UAE and Singapore.
 * Opt-in for everything else, including the EEA, UK, Switzerland, China, India and an unknown or
 * missing country. `country` is the ISO 3166-1 alpha-2 code from `x-vercel-ip-country`.
 */
const OPT_OUT_COUNTRIES = new Set(['US', 'CA', 'AU', 'AE', 'SG']);
export function consentDefaultFor(country: string | null): boolean {
  return country !== null && OPT_OUT_COUNTRIES.has(country.trim().toUpperCase());
}

/** The region default the server resolved, carried on <html data-consent-default>. Anything but
 * an explicit "granted" (attribute missing, server-only code, a static page rendered without
 * request headers) is treated as opt-in. */
export const DEFAULT_CONSENT_ATTRIBUTE = 'data-consent-default';
function regionDefault(): boolean {
  try { return typeof document !== 'undefined' && document.documentElement?.getAttribute(DEFAULT_CONSENT_ATTRIBUTE) === 'granted'; }
  catch { return false; }
}

/** Global Privacy Control: a browser-level "do not sell or share" signal. */
function globalPrivacyControl(): boolean {
  try { return typeof navigator !== 'undefined' && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true; }
  catch { return false; }
}

/** A stored explicit choice wins over the region default. Global Privacy Control wins over
 * both for advertising (Anton F3, 2026-10-14): with GPC on, advertising is off even after an
 * explicit yes. Analytics is unaffected by GPC. */
export const effectiveConsent = (): ConsentPreferences => {
  const gpc = globalPrivacyControl();
  const stored = readConsent();
  if (stored) return gpc && stored.advertising ? { ...stored, advertising: false } : stored;
  const granted = regionDefault();
  return { analytics: granted, advertising: granted && !gpc, recorded_at: '', policy_version: CONSENT_POLICY_VERSION };
};

/**
 * Google Consent Mode v2, as the inline script app/layout.tsx runs before GTM and GA4 load.
 *
 * It mirrors effectiveConsent() because it runs before this module can: a stored explicit choice
 * (under the current policy version, with a valid recorded_at) wins over the region default, and Global Privacy Control
 * turns the three advertising signals (ad_storage, ad_user_data, ad_personalization) to denied
 * whatever was stored or defaulted. analytics_storage follows the stored choice, else the region
 * default. On a consent update the fallback is denied: a choice was just made and could not be
 * read. scripts/test-lead-funnel.cjs runs this string against effectiveConsent() for every
 * combination, so the two cannot drift apart silently.
 */
const consentStateFunction = () =>
  `function state(fallback){var w=window,c=null;try{c=JSON.parse(w.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})||'null');}catch(e){}function iso(t){if(typeof t!=='string'||!/${CAPTURED_AT_PATTERN.source}/.test(t))return false;var n=Date.parse(t);return n===n&&new Date(n).toISOString()===t;}var ok=c&&c.policy_version===${JSON.stringify(CONSENT_POLICY_VERSION)}&&typeof c.analytics==='boolean'&&typeof c.advertising==='boolean'&&iso(c.recorded_at);var gpc=false;try{gpc=w.navigator.globalPrivacyControl===true;}catch(e){}var a=ok?c.analytics:fallback,d=(ok?c.advertising:fallback)&&!gpc;var g=function(v){return v?'granted':'denied';};return{analytics_storage:g(a),ad_storage:g(d),ad_user_data:g(d),ad_personalization:g(d)};}`;

export function consentModeScript(regionDefault: boolean): string {
  return `(function(){var w=window;w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments);}${consentStateFunction()}gtag('consent','default',state(${JSON.stringify(regionDefault)}));w.addEventListener(${JSON.stringify(CONSENT_EVENT)},function(){gtag('consent','update',state(false));});})();`;
}

/**
 * The GA4 config, as the inline script app/layout.tsx runs (Anton F4 / Owen F2, 2026-10-14).
 *
 * GA4 reads page_location from the address bar, and an ad landing URL carries the click IDs in
 * lib/clickIds.ts. When advertising is off (same state() as consentModeScript, GPC included)
 * and the URL has one, the first page view goes with those IDs removed and every other parameter
 * kept. Otherwise it is the plain config, so GA4 behaves exactly as before. The address bar
 * itself is never rewritten.
 *
 * The stripped URL rides on that one page_view event, never on the config (Owen re-review A): a
 * config-level page_location persists for the destination, so later client-side page views would
 * report the landing URL. The config therefore turns off its own automatic page view and the
 * event sends the one it replaces, scoped to this measurement ID with send_to.
 * [UNVERIFIED: that later client-side page views come from the GA4 property's enhanced
 * measurement (browser history events), which send_page_view:false does not switch off. No code
 * in this repo sends them. If that setting is off, only the landing view is recorded, as before.]
 *
 * window.gtag is set here because the inline config it replaced declared a global gtag, and
 * trackGtag() in lib/analytics.ts calls window.gtag (Owen final review, 2026-10-14).
 */
export function ga4ConfigScript(measurementId: string, regionDefault: boolean): string {
  return `(function(){var w=window;w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments);}w.gtag=w.gtag||gtag;${consentStateFunction()}gtag('js',new Date());var id=${JSON.stringify(measurementId)},keys=${JSON.stringify(CLICK_ID_KEYS)},page=null;if(state(${JSON.stringify(regionDefault)}).ad_storage!=='granted'){try{var u=new URL(w.location.href),hit=false;for(var i=0;i<keys.length;i++){if(u.searchParams.has(keys[i])){u.searchParams.delete(keys[i]);hit=true;}}if(hit)page=u.toString();}catch(e){page=w.location.origin+w.location.pathname;}}if(page){gtag('config',id,{send_page_view:false});gtag('event','page_view',{page_location:page,send_to:id});}else gtag('config',id);})();`;
}

export type ConsentBasis = 'explicit' | 'region_default';
/** What a lead submission records: the choice in effect, whether the visitor made it, and when
 * they made it. recorded_at is empty for a region default, never the submit time. */
export function consentEvidence(): { analytics: boolean; advertising: boolean; basis: ConsentBasis; recorded_at: string } {
  const stored = readConsent();
  const effective = effectiveConsent();
  return { analytics: effective.analytics, advertising: effective.advertising, basis: stored ? 'explicit' : 'region_default', recorded_at: stored?.recorded_at || '' };
}

const ANALYTICS_COOKIES = /^(_ga|_gid|_gat|_clck|_clsk)/;
// Leadfeeder (_lfa) loads under advertising in app/layout.tsx.
const ADVERTISING_COOKIES = /^(_fbp|_fbc|_gcl_|_lfa)/;
function clearCookies(pattern: RegExp) {
  try { for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0];
    if (pattern.test(name)) {
      document.cookie = `${name}=; Max-Age=0; Path=/`;
      const parts = window.location.hostname.split('.');
      for (let index = 0; index < parts.length - 1; index++) document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${parts.slice(index).join('.')}`;
    }
  } } catch { /* Cookie access can be denied; a withdrawal still reloads to unload SDKs. */ }
}

export const hasConsent = (category: 'analytics' | 'advertising') => effectiveConsent()[category] === true;

/** Campaign context in the durable record needs analytics consent (lib/analytics.ts). */
const CAMPAIGN_FIELDS = ['first_touch', 'last_touch', 'landing_page', 'referrer_host', 'utm'];
/** Owen F4: an analytics no with an advertising yes keeps the click IDs and removes campaign
 * context from the durable record straight away, tracker mounted or not. A record that cannot
 * be read is deleted. */
function removeCampaignContext() {
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_DURABLE_KEY);
    if (!raw) return;
    const record: unknown = JSON.parse(raw);
    if (!record || typeof record !== 'object' || Array.isArray(record)) throw new Error('unreadable');
    for (const field of CAMPAIGN_FIELDS) delete (record as Record<string, unknown>)[field];
    window.localStorage.setItem(ATTRIBUTION_DURABLE_KEY, JSON.stringify(record));
  } catch {
    try { window.localStorage.removeItem(ATTRIBUTION_DURABLE_KEY); } catch { /* Storage can be blocked. */ }
  }
}

export function saveConsent(analytics: boolean, advertising: boolean) {
  // Compare against what was in effect, not only what was stored: in an opt-out region the
  // trackers are already running before any choice, so a first-time reject is a withdrawal.
  const previous = effectiveConsent();
  const value: ConsentPreferences = { analytics, advertising, recorded_at: new Date().toISOString(), policy_version: CONSENT_POLICY_VERSION };
  sessionChoice = value;
  try { window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value)); }
  catch { try { window.localStorage.removeItem(CONSENT_STORAGE_KEY); } catch { /* The current page still respects the explicit choice. */ } }
  window.dispatchEvent(new Event(CONSENT_EVENT));
  // Every explicit reject clears that category's cookies, withdrawal or not: a tag can have
  // set one before the banner was answered.
  if (!analytics) {
    try {
      window.sessionStorage.removeItem('qognition_attribution_v2');
      window.sessionStorage.removeItem('qognition_utm_first_touch');
    } catch { /* Storage can be blocked. */ }
    clearCookies(ANALYTICS_COOKIES);
  }
  if (!analytics && advertising) removeCampaignContext();
  if (!advertising) {
    // The tracker has already moved campaign context back to the session on the consent
    // event above. This delete also covers a page where it is not mounted.
    try { window.localStorage.removeItem(ATTRIBUTION_DURABLE_KEY); } catch { /* Storage can be blocked. */ }
    clearCookies(ADVERTISING_COOKIES);
  }
  // Removing a script element does not unload its running SDK, so a withdrawal reloads.
  if (consentWasWithdrawn(previous, value)) window.location.reload();
  return value;
}

export function openConsentSettings() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('qognition:consent-settings'));
}
