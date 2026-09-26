import type { Metadata } from 'next';
import HomePage from '../components/AcquisitionHome';
import { localeHomeAlternates } from '../lib/growth-locales';
import { metadataFor } from '../lib/seo';

// Title and description come from SEO_OVERRIDES['/'] in lib/seo.ts.
export const metadata: Metadata = { ...metadataFor({
  title: 'Qognition | AI-native B2B Growth Agency',
  description:
    'Qognition helps founders grow with AI-native marketing, SEO, web design, paid media, and conversion strategy built to generate qualified pipeline.',
  path: '/',
}), alternates: { canonical: '/', languages: localeHomeAlternates() } };

export default function Page() {
  return <HomePage />;
}
