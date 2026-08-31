import type { Metadata } from 'next';
import HomePage from './HomePage';
import { metadataFor } from '../lib/seo';

// Title and description come from SEO_OVERRIDES['/'] in lib/seo.ts.
export const metadata: Metadata = metadataFor({
  title: 'Qognition | AI Growth Marketing Partner for Founders',
  description:
    'Qognition helps founders grow with AI-native marketing, SEO, web design, paid media, and conversion strategy built to generate qualified pipeline.',
  path: '/',
});

export default function Page() {
  return <HomePage />;
}
