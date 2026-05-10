import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaScript from '../../../SchemaScript';
import { getLocationBySlug, LOCATIONS } from '../../../../data/locations';
import { SERVICES } from '../../../../data/services';
import { breadcrumbSchema, faqSchema, getLocationMetadata, serviceSchema } from '../../../../lib/seo';
import { LocationServiceView } from '../../ProgrammaticLocationView';

export const dynamicParams = false;

export const generateStaticParams = () =>
  LOCATIONS.flatMap((location) => SERVICES.map((service) => ({ location: location.slug, service: service.id })));

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ location: string; service: string }>;
}): Promise<Metadata> => {
  const { location, service } = await params;
  return getLocationMetadata(location, service);
};

export default async function Page({ params }: { params: Promise<{ location: string; service: string }> }) {
  const { location: locationSlug, service: serviceSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  const service = SERVICES.find((item) => item.id === serviceSlug);
  if (!location || !service) notFound();

  const path = `/locations/${location.slug}/${service.id}`;
  const faqs = [
    {
      question: `Is this ${service.title} page locally indexed for ${location.name}?`,
      answer:
        'Yes. The page is statically rendered with a canonical URL, metadata, schema, and sitemap inclusion for Search Console discovery.'
    },
    {
      question: `Do you claim a physical ${location.name} office here?`,
      answer: 'No. This page describes service-area coverage and avoids false office or address claims.'
    },
    {
      question: `What makes ${service.title} different in ${location.name}?`,
      answer: `Buyer language, local competitors, CPC, trust signals, reviews, content expectations, and conversion paths all change by market, so the ${location.name} plan is built around local demand rather than copied from another city.`
    },
    {
      question: `Which pages should link to this ${service.title} in ${location.name} page?`,
      answer:
        'The strongest internal links come from the service hub, location hub, relevant industry pages, case studies, free tools, resources, blog posts, and directory pages.'
    },
    {
      question: `Can this create leads quickly?`,
      answer:
        'Yes, especially when paid search, landing pages, and tracking launch first. SEO and AI-search visibility usually compound as the supporting content cluster grows.'
    }
  ];

  return (
    <>
      <SchemaScript
        data={serviceSchema(service, path, {
          areaServed: {
            '@type': location.schemaType,
            name: location.name
          }
        })}
      />
      <SchemaScript data={faqSchema(faqs)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/locations' },
          { name: location.name, path: `/locations/${location.slug}` },
          { name: service.title, path }
        ])}
      />
      <LocationServiceView location={location} service={service} />
    </>
  );
}
