import type { Metadata } from 'next';
import { GROWTH_DICTIONARIES, GROWTH_LOCALES, LOCALIZED_PILLARS, type GrowthLocale, type LocalizedPillar } from '../data/growth-locales';

const ORIGIN = 'https://www.qognitionagency.com';
export const NON_ENGLISH_GROWTH_LOCALES = GROWTH_LOCALES.filter((locale) => locale !== 'en');
export const isGrowthLocale = (value: string): value is GrowthLocale => GROWTH_LOCALES.includes(value as GrowthLocale);
export const isLocalizedPillar = (value: string): value is LocalizedPillar => LOCALIZED_PILLARS.includes(value as LocalizedPillar);
export const localizedHomePath = (locale: GrowthLocale) => locale === 'en' ? '/' : `/${locale}`;
export const localizedServicePath = (locale: GrowthLocale, pillar: LocalizedPillar) => `${locale === 'en' ? '' : `/${locale}`}/growth/services/${pillar}`;

/** A translation must be complete and editorially accepted before it enters discovery. */
export const LOCALE_PUBLICATIONS = Object.fromEntries(GROWTH_LOCALES.map((locale) => [locale, {
  status: 'reviewed' as const, reviewedAt: '2026-09-24',
  reviewMethod: 'AI-assisted editorial review', pages: ['home', ...LOCALIZED_PILLARS],
}])) as Record<GrowthLocale, { status: 'reviewed' | 'draft'; reviewedAt: string; reviewMethod: string; pages: string[] }>;

export function canPublishLocale(locale: GrowthLocale, page: 'home' | LocalizedPillar = 'home') {
  const record = LOCALE_PUBLICATIONS[locale];
  const dictionary = GROWTH_DICTIONARIES[locale];
  if (record.status !== 'reviewed' || !record.pages.includes(page)) return false;
  if (!dictionary.headline || !dictionary.intro || dictionary.faqs.length < 3 || dictionary.steps.length < 3) return false;
  return page === 'home' || Boolean(dictionary.pillars[page]?.description && dictionary.pillars[page]?.deliverables.length >= 4 && dictionary.pillars[page]?.outcome);
}

export function localeHomeAlternates(): Record<string, string> {
  return { ...Object.fromEntries(GROWTH_LOCALES.filter((locale) => canPublishLocale(locale)).map((locale) => [locale, `${ORIGIN}${localizedHomePath(locale)}`])), 'x-default': `${ORIGIN}/` };
}

export function localeServiceAlternates(pillar: LocalizedPillar): Record<string, string> {
  return { ...Object.fromEntries(GROWTH_LOCALES.filter((locale) => canPublishLocale(locale, pillar)).map((locale) => [locale, `${ORIGIN}${localizedServicePath(locale, pillar)}`])), 'x-default': `${ORIGIN}${localizedServicePath('en', pillar)}` };
}

export function getPublishedLocalePaths(): string[] {
  return NON_ENGLISH_GROWTH_LOCALES.flatMap((locale) => [
    ...(canPublishLocale(locale) ? [localizedHomePath(locale)] : []),
    ...LOCALIZED_PILLARS.filter((pillar) => canPublishLocale(locale, pillar)).map((pillar) => localizedServicePath(locale, pillar)),
  ]);
}

export function localizedGrowthMetadata(locale: GrowthLocale, pillar?: LocalizedPillar): Metadata {
  const copy = GROWTH_DICTIONARIES[locale];
  const service = pillar ? copy.pillars[pillar] : undefined;
  const path = pillar ? localizedServicePath(locale, pillar) : localizedHomePath(locale);
  const title = `${service?.name || copy.eyebrow} | Qognition`;
  const description = service?.description || copy.meta;
  return {
    title: { absolute: title }, description,
    alternates: { canonical: `${ORIGIN}${path}`, languages: pillar ? localeServiceAlternates(pillar) : localeHomeAlternates() },
    robots: { index: canPublishLocale(locale, pillar), follow: true },
    openGraph: { title, description, url: `${ORIGIN}${path}`, siteName: 'Qognition Agency', type: 'website' },
  };
}
