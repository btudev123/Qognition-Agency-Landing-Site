import type { Metadata } from 'next';
import HomePage from '../components/AcquisitionHome';
import { localeHomeAlternates } from '../lib/growth-locales';
import { metadataFor } from '../lib/seo';

// Title and description come from SEO_OVERRIDES['/'] in lib/seo.ts, which wins
// over the values passed here. Both are kept in step anyway, because a fallback
// that disagrees with the override is a fallback nobody will notice is wrong.
export const metadata: Metadata = { ...metadataFor({
  title: 'AI Search Visibility for B2B Firms | Qognition Agency',
  description:
    'We get B2B firms named when buyers ask ChatGPT, Perplexity and Google AI who to hire. GEO, AI SEO, SEO and Local SEO in one retainer. Start with a free snapshot.',
  path: '/',
}), alternates: { canonical: '/', languages: localeHomeAlternates() } };

export default function Page() {
  return <HomePage />;
}
