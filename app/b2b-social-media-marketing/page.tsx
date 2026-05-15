import type { Metadata } from 'next';
import SchemaScript from '../SchemaScript';
import B2BMoFuPage from '../../components/B2BMoFuPage';
import { getB2BMoFuPage } from '../../data/b2bPages';
import { breadcrumbSchema, faqSchema, metadataFor, SITE_NAME, SITE_URL } from '../../lib/seo';

const page = getB2BMoFuPage('b2b-social-media-marketing')!;

export const metadata: Metadata = metadataFor({ title: page.title, description: page.description, path: `/${page.slug}` });

export default function Page() {
  return (
    <>
      <SchemaScript data={{ '@context': 'https://schema.org', '@type': 'Article', headline: page.title, description: page.description, author: { '@type': 'Organization', name: SITE_NAME }, publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL }, url: `${SITE_URL}/${page.slug}` }} />
      <SchemaScript data={faqSchema(page.faqs)} />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: page.title, path: `/${page.slug}` }])} />
      <B2BMoFuPage page={page} />
    </>
  );
}
