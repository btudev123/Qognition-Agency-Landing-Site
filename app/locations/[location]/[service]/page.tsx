import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocationBySlug, LOCATIONS } from '../../../../data/locations';
import { SERVICES } from '../../../../data/services';
import { getLocationMetadata } from '../../../../lib/seo';
import { breadcrumbSchema, faqSchema } from '../../../../lib/schema';
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
        'Yes. The page is statically rendered with useful content, a canonical URL, metadata, schema, and sitemap inclusion for search discovery.'
    },
    {
      question: `Do you claim a physical ${location.name} office here?`,
      answer: `No. This page explains how Qognition supports companies targeting ${location.name}; we only claim a physical office where one exists.`
    },
    {
      question: `What makes ${service.title} different in ${location.name}?`,
      answer: `Buyer language, local competitors, CPC, trust signals, reviews, content expectations, and conversion paths all change by market, so the ${location.name} plan is built around local demand rather than copied from another city.`
    },
    {
      question: `Which pages should link to this ${service.title} in ${location.name} page?`,
      answer:
        'The strongest internal links come from the service hub, location hub, relevant industry pages, case studies, free tools, resources, blog posts, and helpful directory pages.'
    },
    {
      question: `Can this create leads quickly?`,
      answer:
        'Yes, especially when paid search, landing pages, and tracking launch first. SEO and AI-search visibility usually compound as supporting content, proof, and internal links improve.'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${service.title} in ${location.name}`,
              description: service.shortDescription,
              provider: {
                '@type': 'Organization',
                name: 'Qognition',
                url: 'https://qognition.com',
              },
              areaServed: {
                '@type': location.schemaType,
                name: location.name,
              },
              url: `https://qognition.com${path}`,
            },
            ...(faqs.length ? [faqSchema(faqs)] : []),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Locations', path: '/locations' },
              { name: location.name, path: `/locations/${location.slug}` },
              { name: service.title, path },
            ]),
          ]),
        }}
      />
      <LocationServiceView location={location} service={service} />
    </>
  );
}
