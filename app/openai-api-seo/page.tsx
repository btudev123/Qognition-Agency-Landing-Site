import type { Metadata } from 'next';
import B2BMoFuPage from '../../components/B2BMoFuPage';
import { getPillarPage } from '../../lib/sanityContent';
import { breadcrumbSchema, faqSchema } from '../../lib/schema';
import { metadataFor, SITE_URL } from '../../lib/seo';

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await getPillarPage('openai-api-seo');
  return metadataFor({ title: page.title, description: page.description, path: `/${page.slug}` });
};

export default async function Page() {
  const page = await getPillarPage('openai-api-seo');
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
