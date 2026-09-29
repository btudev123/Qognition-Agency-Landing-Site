'use client';
import { useEffect } from 'react';
import type { GrowthLocale } from '../data/growth-locales';
export default function GrowthLocaleDocument({ locale, dir }: { locale: GrowthLocale; dir: 'ltr' | 'rtl' }) {
  useEffect(() => {
    const html = document.documentElement;
    const previousLanguage = html.lang; const previousDirection = html.dir;
    html.lang = locale; html.dir = dir;
    return () => { html.lang = previousLanguage; html.dir = previousDirection; };
  }, [locale, dir]);
  return null;
}
