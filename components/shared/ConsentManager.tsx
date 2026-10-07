'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { CONSENT_EVENT, CONSENT_STORAGE_KEY, consentWasWithdrawn, effectiveConsent, openConsentSettings, readConsent, refreshConsentFromStorage, saveConsent, type ConsentPreferences } from '../../lib/consent';

/** The consent in effect, or null until after mount. Server render and the first client render
 * both see null, so nothing gated on it can reach the HTML or run before hydration. */
export function useEffectiveConsent() {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);
  const previous = useRef<ConsentPreferences | null>(null);
  useEffect(() => {
    const update = () => { const next = effectiveConsent(); previous.current = next; setConsent(next); };
    const storageUpdate = (event: StorageEvent) => {
      if (event.key !== null && event.key !== CONSENT_STORAGE_KEY) return;
      refreshConsentFromStorage();
      if (consentWasWithdrawn(previous.current, effectiveConsent())) window.location.reload();
      update();
    };
    update();
    window.addEventListener(CONSENT_EVENT, update);
    window.addEventListener('storage', storageUpdate);
    return () => { window.removeEventListener(CONSENT_EVENT, update); window.removeEventListener('storage', storageUpdate); };
  }, []);
  return consent;
}

/** Wrap tracking scripts at their source. Renders nothing on the server or before mount, then
 * only when the category is granted: by a stored explicit choice, or by the region default on
 * <html data-consent-default> when there is no choice. */
export function ConsentScripts({ category, children }: { category: 'analytics' | 'advertising'; children: ReactNode }) {
  const consent = useEffectiveConsent();
  return consent?.[category] === true ? <>{children}</> : null;
}

const copy: Record<string, string[]> = {
  en: ['Your privacy choices', 'Essential features work without optional cookies. Allow analytics to help improve the site, and advertising measurement to understand campaigns.', 'Analytics', 'Advertising measurement', 'Reject optional', 'Save choices', 'Allow all', 'Privacy choices'],
  de: ['Ihre Datenschutzauswahl', 'Wesentliche Funktionen arbeiten ohne optionale Cookies. Erlauben Sie Analysen zur Website-Verbesserung und Werbemessung für Kampagnen.', 'Analyse', 'Werbemessung', 'Optionale ablehnen', 'Auswahl speichern', 'Alle erlauben', 'Datenschutzauswahl'],
  fr: ['Vos choix de confidentialité', 'Les fonctions essentielles fonctionnent sans cookies facultatifs. Autorisez les analyses pour améliorer le site et la mesure publicitaire pour comprendre les campagnes.', 'Analyse', 'Mesure publicitaire', 'Refuser les facultatifs', 'Enregistrer', 'Tout autoriser', 'Confidentialité'],
  nl: ['Uw privacykeuzes', 'Essentiële functies werken zonder optionele cookies. Sta analyses toe om de site te verbeteren en advertentiemeting om campagnes te begrijpen.', 'Analyse', 'Advertentiemeting', 'Optionele weigeren', 'Keuzes opslaan', 'Alles toestaan', 'Privacykeuzes'],
  sv: ['Dina integritetsval', 'Grundläggande funktioner fungerar utan valfria kakor. Tillåt analys för att förbättra webbplatsen och annonsmätning för att förstå kampanjer.', 'Analys', 'Annonsmätning', 'Avvisa valfria', 'Spara val', 'Tillåt alla', 'Integritetsval'],
  da: ['Dine privatlivsvalg', 'Grundlæggende funktioner virker uden valgfrie cookies. Tillad analyse for at forbedre siden og annoncemåling for at forstå kampagner.', 'Analyse', 'Annoncemåling', 'Afvis valgfrie', 'Gem valg', 'Tillad alle', 'Privatlivsvalg'],
  nb: ['Dine personvernvalg', 'Grunnleggende funksjoner virker uten valgfrie informasjonskapsler. Tillat analyse for å forbedre nettstedet og annonsemåling for å forstå kampanjer.', 'Analyse', 'Annonsemåling', 'Avvis valgfrie', 'Lagre valg', 'Tillat alle', 'Personvernvalg'],
  fi: ['Tietosuoja-asetuksesi', 'Välttämättömät toiminnot toimivat ilman valinnaisia evästeitä. Salli analytiikka sivuston parantamiseksi ja mainonnan mittaus kampanjoiden ymmärtämiseksi.', 'Analytiikka', 'Mainonnan mittaus', 'Hylkää valinnaiset', 'Tallenna valinnat', 'Salli kaikki', 'Tietosuoja-asetukset'],
  ar: ['خيارات الخصوصية', 'تعمل الميزات الأساسية دون ملفات تعريف ارتباط اختيارية. اسمح بالتحليلات لتحسين الموقع وقياس الإعلانات لفهم الحملات.', 'التحليلات', 'قياس الإعلانات', 'رفض الاختيارية', 'حفظ الخيارات', 'السماح بالكل', 'خيارات الخصوصية'],
  it: ['Le tue scelte sulla privacy', 'Le funzioni essenziali operano senza cookie facoltativi. Consenti le analisi per migliorare il sito e la misurazione pubblicitaria per comprendere le campagne.', 'Analisi', 'Misurazione pubblicitaria', 'Rifiuta facoltativi', 'Salva scelte', 'Consenti tutti', 'Scelte sulla privacy'],
  'zh-Hans': ['隐私选项', '基本功能无需可选 Cookie。允许分析以改进网站，以及广告衡量以了解营销活动。', '分析', '广告衡量', '拒绝可选项', '保存选项', '全部允许', '隐私选项'],
};

export default function ConsentManager() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState('en');
  // Unticked until mount. Then the boxes show what is in effect: the stored choice, else the
  // region default. Opt-in regions therefore open unticked; opt-out regions open ticked.
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  useEffect(() => {
    const sync = () => { const current = effectiveConsent(); setAnalytics(current.analytics); setAdvertising(current.advertising); };
    sync();
    setOpen(!readConsent());
    const show = () => { sync(); setOpen(true); };
    window.addEventListener('qognition:consent-settings', show);
    return () => window.removeEventListener('qognition:consent-settings', show);
  }, []);
  useEffect(() => { const segment = pathname?.split('/')[1] || 'en'; setLocale(copy[segment] ? segment : 'en'); }, [pathname]);
  const c = copy[locale] || copy.en;
  const choose = (a: boolean, b: boolean) => { saveConsent(a, b); setOpen(false); };
  // Below lg the StickyCTA bar (h-14) is fixed to the bottom edge, so the reopen control sits
  // spacing.3 above it plus the safe-area inset, the same lift FloatingWhatsApp uses on the right.
  if (!open) return <button type="button" onClick={openConsentSettings} className="fixed bottom-[calc(theme(spacing.14)+theme(spacing.3)+env(safe-area-inset-bottom,0px))] left-3 z-40 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs lg:bottom-3">{c[7]}</button>;
  return <section role="dialog" aria-modal="false" aria-labelledby="consent-title" dir={locale === 'ar' ? 'rtl' : undefined} className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 shadow-2xl" style={{ color: 'var(--text)', background: 'var(--bg, #f8f7f4)' }}>
    <h2 id="consent-title" className="text-h3 font-semibold">{c[0]}</h2>
    <p className="text-meta mt-2 mb-4">{c[1]}</p>
    <div className="mb-4 flex flex-wrap gap-6"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} />{c[2]}</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={advertising} onChange={e => setAdvertising(e.target.checked)} />{c[3]}</label></div>
    <div className="flex flex-wrap gap-2">{[[c[4], () => choose(false, false)], [c[5], () => choose(analytics, advertising)], [c[6], () => choose(true, true)]].map(([label, action]) => <button type="button" key={label as string} onClick={action as () => void} className="rounded-full border border-current px-4 py-2 text-sm font-medium">{label as string}</button>)}</div>
  </section>;
}
