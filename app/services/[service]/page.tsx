import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaScript from '../../SchemaScript';
import ViewRenderer from '../../ViewRenderer';
import { SERVICES } from '../../../data/services';
import { breadcrumbSchema, faqSchema, getServiceMetadata, serviceSchema } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => SERVICES.map((service) => ({ service: service.id }));

export const generateMetadata = async ({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> => {
  const { service } = await params;
  return getServiceMetadata(service);
};

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service: serviceSlug } = await params;
  const service = SERVICES.find((item) => item.id === serviceSlug);
  if (!service) notFound();

  const path = `/services/${service.id}`;

  return (
    <>
      <SchemaScript data={serviceSchema(service, path)} />
      <SchemaScript data={faqSchema(service.faqs)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path }
        ])}
      />
      <ViewRenderer view="service" params={{ id: service.id, service: service.id }} />
    </>
  );
}
