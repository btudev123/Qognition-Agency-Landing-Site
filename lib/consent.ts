export const CONSENT_POLICY_VERSION = '2026-09-24';
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
 * The effective consent value, defaulting to allow until the visitor records
 * an explicit choice. Opt-out model: analytics and advertising measurement are
 * enabled for a visitor who has neither accepted nor rejected, so paid-funnel
 * tracking (Meta pixel/CAPI, GA4/GTM) fires by default while the banner still
 * offers an equal opt-out.
 */
export const effectiveConsent = (): ConsentPreferences => {
  const stored = readConsent();
  if (stored) return stored;
  return { analytics: true, advertising: true, recorded_at: '', policy_version: CONSENT_POLICY_VERSION };
};

export const hasConsent = (category: 'analytics' | 'advertising') => effectiveConsent()[category] === true;

export function saveConsent(analytics: boolean, advertising: boolean) {
  const previous = readConsent();
  const value: ConsentPreferences = { analytics, advertising, recorded_at: new Date().toISOString(), policy_version: CONSENT_POLICY_VERSION };
  sessionChoice = value;
  try { window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value)); }
  catch { try { window.localStorage.removeItem(CONSENT_STORAGE_KEY); } catch { /* The current page still respects the explicit choice. */ } }
  window.dispatchEvent(new Event(CONSENT_EVENT));
  if (!analytics) {
    try {
      window.sessionStorage.removeItem('qognition_attribution_v2');
      window.sessionStorage.removeItem('qognition_utm_first_touch');
    } catch { /* Storage can be blocked. */ }
  }
  if (consentWasWithdrawn(previous, value)) {
    try { for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (/^(_ga|_gid|_gat|_fbp|_fbc|_clck|_clsk|_gcl_)/.test(name)) {
        document.cookie = `${name}=; Max-Age=0; Path=/`;
        const parts = window.location.hostname.split('.');
        for (let index = 0; index < parts.length - 1; index++) document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${parts.slice(index).join('.')}`;
      }
    } } catch { /* Cookie access can be denied; reloading still unloads SDKs. */ }
    // Removing a script element does not unload its running SDK.
    window.location.reload();
  }
  return value;
}

export function openConsentSettings() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('qognition:consent-settings'));
}
