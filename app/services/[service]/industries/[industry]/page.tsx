import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaScript from '../../../../SchemaScript';
import { INDUSTRIES } from '../../../../../data/industries';
import { SERVICES } from '../../../../../data/services';
import { breadcrumbSchema, faqSchema, getServiceIndustryMetadata, serviceSchema } from '../../../../../lib/seo';
import ServiceIndustryView from '../ServiceIndustryView';

export const dynamicParams = false;

export const generateStaticParams = () =>
  SERVICES.flatMap((service) => INDUSTRIES.map((industry) => ({ service: service.id, industry: industry.id })));

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ service: string; industry: string }>;
}): Promise<Metadata> => {
  const { service, industry } = await params;
  return getServiceIndustryMetadata(service, industry);
};

export default async function Page({ params }: { params: Promise<{ service: string; industry: string }> }) {
  const { service: serviceSlug, industry: industrySlug } = await params;
  const service = SERVICES.find((item) => item.id === serviceSlug);
  const industry = INDUSTRIES.find((item) => item.id === industrySlug);
  if (!service || !industry) notFound();

  const path = `/services/${service.id}/industries/${industry.id}`;

  return (
    <>
      <SchemaScript
        data={serviceSchema(service, path, {
          audience: {
            '@type': 'Audience',
            audienceType: industry.name
          }
        })}
      />
      <SchemaScript data={faqSchema([...service.faqs.slice(0, 3), ...industry.faqs.slice(0, 3)])} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.id}` },
          { name: industry.name, path }
        ])}
      />
      <ServiceIndustryView service={service} industry={industry} />
    </>
  );
}
