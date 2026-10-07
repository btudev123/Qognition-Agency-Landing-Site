import type { Metadata } from 'next';
import HomePage from '../components/AcquisitionHome';
import { localeHomeAlternates } from '../lib/growth-locales';
import { metadataFor } from '../lib/seo';

// Title and description come from SEO_OVERRIDES['/'] in lib/seo.ts.
export const metadata: Metadata = { ...metadataFor({
  title: 'AI SEO & GEO for B2B Companies | Qognition Agency',
  description:
    'AI SEO and GEO for B2B companies, including SaaS. Connect technical SEO, expert content and authority work to qualified enquiries. Book a call with Qognition.',
  path: '/',
}), alternates: { canonical: '/', languages: localeHomeAlternates() } };

export default function Page() {
  return <HomePage />;
}
