export const CONSENT_POLICY_VERSION = '2026-10-06';
export const CONSENT_STORAGE_KEY = 'qognition_consent_v1';
export const CONSENT_EVENT = 'qognition:consent';
export type ConsentPreferences = { analytics: boolean; advertising: boolean; recorded_at: string; policy_version: string };
let sessionChoice: ConsentPreferences | undefined;

export const consentWasWithdrawn = (previous: ConsentPreferences | null, next: ConsentPreferences | null) => Boolean((previous?.analytics && !next?.analytics) || (previous?.advertising && !next?.advertising));
export const refreshConsentFromStorage = () => { sessionChoice = undefined; };

export function readConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;
  if (sessionChoice) return sessionChoice;
  try {
    const value = JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) || 'null');
    return value && value.policy_version === CONSENT_POLICY_VERSION && typeof value.analytics === 'boolean' && typeof value.advertising === 'boolean' && typeof value.recorded_at === 'string' ? value : null;
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

/** A stored explicit choice always wins. Without one, the region default applies, except that
 * GPC turns the advertising default off even in opt-out regions. Analytics is unaffected. */
export const effectiveConsent = (): ConsentPreferences => {
  const stored = readConsent();
  if (stored) return stored;
  const granted = regionDefault();
  return { analytics: granted, advertising: granted && !globalPrivacyControl(), recorded_at: '', policy_version: CONSENT_POLICY_VERSION };
};

/**
 * Google Consent Mode v2, as the inline script app/layout.tsx runs before GTM and GA4 load.
 *
 * It mirrors effectiveConsent() because it runs before this module can: a stored explicit choice
 * wins; without one, the region default applies, and Global Privacy Control turns the three
 * advertising signals (ad_storage, ad_user_data, ad_personalization) to denied even in an opt-out
 * region. analytics_storage keeps the region default. On a consent update the fallback is denied:
 * a choice was just made and could not be read. scripts/test-lead-funnel.cjs runs this string
 * against effectiveConsent() for every combination, so the two cannot drift apart silently.
 */
export function consentModeScript(regionDefault: boolean): string {
  return `(function(){var w=window;w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments);}function state(fallback){var c=null;try{c=JSON.parse(w.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})||'null');}catch(e){}var ok=c&&c.policy_version===${JSON.stringify(CONSENT_POLICY_VERSION)}&&typeof c.analytics==='boolean'&&typeof c.advertising==='boolean';var gpc=false;try{gpc=w.navigator.globalPrivacyControl===true;}catch(e){}var a=ok?c.analytics:fallback,d=ok?c.advertising:(fallback&&!gpc);var g=function(v){return v?'granted':'denied';};return{analytics_storage:g(a),ad_storage:g(d),ad_user_data:g(d),ad_personalization:g(d)};}gtag('consent','default',state(${JSON.stringify(regionDefault)}));w.addEventListener(${JSON.stringify(CONSENT_EVENT)},function(){gtag('consent','update',state(false));});})();`;
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
  if (!advertising) clearCookies(ADVERTISING_COOKIES);
  // Removing a script element does not unload its running SDK, so a withdrawal reloads.
  if (consentWasWithdrawn(previous, value)) window.location.reload();
  return value;
}

export function openConsentSettings() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('qognition:consent-settings'));
}
