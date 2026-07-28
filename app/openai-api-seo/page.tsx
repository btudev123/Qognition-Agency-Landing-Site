import type { Metadata } from 'next';
import B2BMoFuPage from '../../components/B2BMoFuPage';
import { getB2BMoFuPage } from '../../data/b2bPages';
import { breadcrumbSchema, faqSchema } from '../../lib/schema';
import { metadataFor, SITE_URL } from '../../lib/seo';

const page = getB2BMoFuPage('openai-api-seo')!;

export const metadata: Metadata = metadataFor({ title: page.title, description: page.description, path: `/${page.slug}` });

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: page.title,
              description: page.description,
              author: { '@type': 'Organization', name: 'Qognition' },
              publisher: { '@type': 'Organization', name: 'Qognition', url: SITE_URL },
              url: `${SITE_URL}/${page.slug}`,
            },
            faqSchema(page.faqs),
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: page.title, path: `/${page.slug}` }]),
          ]),
        }}
      />
      <B2BMoFuPage page={page} />
    </>
  );
}
