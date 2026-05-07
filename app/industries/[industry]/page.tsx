import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaScript from '../../SchemaScript';
import ViewRenderer from '../../ViewRenderer';
import { INDUSTRIES } from '../../../data/industries';
import { breadcrumbSchema, faqSchema, getIndustryMetadata, SITE_NAME, SITE_URL } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => INDUSTRIES.map((industry) => ({ industry: industry.id }));

export const generateMetadata = async ({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> => {
  const { industry } = await params;
  return getIndustryMetadata(industry);
};

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: industrySlug } = await params;
  const industry = INDUSTRIES.find((item) => item.id === industrySlug);
  if (!industry) notFound();

  const path = `/industries/${industry.id}`;

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${industry.name} Digital Marketing`,
          description: industry.description,
          provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          serviceType: 'Industry Digital Marketing',
          url: `${SITE_URL}${path}`
        }}
      />
      <SchemaScript data={faqSchema(industry.faqs)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: industry.name, path }
        ])}
      />
      <ViewRenderer view="industry" params={{ id: industry.id, industry: industry.id }} />
    </>
  );
}
