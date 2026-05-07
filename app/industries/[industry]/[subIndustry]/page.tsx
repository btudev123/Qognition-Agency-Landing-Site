import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaScript from '../../../SchemaScript';
import ViewRenderer from '../../../ViewRenderer';
import { INDUSTRIES } from '../../../../data/industries';
import { breadcrumbSchema, faqSchema, getSubIndustryMetadata, SITE_NAME, SITE_URL } from '../../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () =>
  INDUSTRIES.flatMap((industry) =>
    industry.subIndustries.map((subIndustry) => ({
      industry: industry.id,
      subIndustry: subIndustry.slug
    }))
  );

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ industry: string; subIndustry: string }>;
}): Promise<Metadata> => {
  const { industry, subIndustry } = await params;
  return getSubIndustryMetadata(industry, subIndustry);
};

export default async function Page({ params }: { params: Promise<{ industry: string; subIndustry: string }> }) {
  const { industry: industrySlug, subIndustry: subIndustrySlug } = await params;
  const industry = INDUSTRIES.find((item) => item.id === industrySlug);
  const subIndustry = industry?.subIndustries.find((item) => item.slug === subIndustrySlug);
  if (!industry || !subIndustry) notFound();

  const path = `/industries/${industry.id}/${subIndustry.slug}`;
  const displayFaqs = subIndustry.faqs ? [...subIndustry.faqs, ...industry.faqs.slice(0, 3)] : industry.faqs;

  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${subIndustry.name} Digital Marketing`,
          description: subIndustry.description,
          provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          serviceType: `${subIndustry.name} Marketing`,
          url: `${SITE_URL}${path}`
        }}
      />
      <SchemaScript data={faqSchema(displayFaqs)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: industry.name, path: `/industries/${industry.id}` },
          { name: subIndustry.name, path }
        ])}
      />
      <ViewRenderer
        view="subIndustry"
        params={{ id: industry.id, industry: industry.id, subId: subIndustry.slug, subIndustry: subIndustry.slug }}
      />
    </>
  );
}
