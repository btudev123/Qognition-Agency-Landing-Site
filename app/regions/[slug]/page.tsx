import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaScript from '../../SchemaScript';
import ViewRenderer from '../../ViewRenderer';
import { REGIONS } from '../../../data/regions';
import { breadcrumbSchema, faqSchema, getRegionMetadata, SITE_NAME, SITE_URL } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => REGIONS.map((region) => ({ slug: region.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  return getRegionMetadata(slug);
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = REGIONS.find((item) => item.slug === slug);
  if (!region) notFound();

  const path = `/regions/${region.slug}`;

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `Digital Marketing in ${region.name}`,
          description: region.description,
          provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          areaServed: region.name,
          url: `${SITE_URL}${path}`
        }}
      />
      <SchemaScript data={faqSchema(region.faqs)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Regions', path: '/regions' },
          { name: region.name, path }
        ])}
      />
      <ViewRenderer view="region" params={{ slug: region.slug }} />
    </>
  );
}
