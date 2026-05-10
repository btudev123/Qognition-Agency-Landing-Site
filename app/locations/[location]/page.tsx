import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaScript from '../../SchemaScript';
import { getLocationBySlug, LOCATIONS } from '../../../data/locations';
import { breadcrumbSchema, faqSchema, getLocationMetadata, locationSchema } from '../../../lib/seo';
import { LocationOverviewView } from '../ProgrammaticLocationView';

export const dynamicParams = false;

export const generateStaticParams = () => LOCATIONS.map((location) => ({ location: location.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> => {
  const { location } = await params;
  return getLocationMetadata(location);
};

export default async function Page({ params }: { params: Promise<{ location: string }> }) {
  const { location: locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  if (!location) notFound();

  const path = `/locations/${location.slug}`;
  const faqs = [
    {
      question: `Does Qognition have an office in ${location.name}?`,
      answer:
        'This is a service-area page. We only claim physical offices on hub pages where that is true, while this page focuses on marketing coverage and local demand.'
    },
    {
      question: `Can you run SEO and PPC campaigns for ${location.name}?`,
      answer: `Yes. We build local search, paid media, landing page, analytics, and AI search visibility programs for companies targeting ${location.name}.`
    },
    {
      question: `What industries do you prioritize in ${location.name}?`,
      answer: `We prioritize ${location.marketFocus.join(', ')} in ${location.name}, plus B2B, professional services, ecommerce, healthcare, and local services when there is clear search demand.`
    },
    {
      question: `Is this ${location.name} page useful for AI search engines?`,
      answer:
        'Yes. The page includes a concise summary, semantic sections, internal links, FAQ schema, location schema, and natural-language answers that AI systems can parse.'
    },
    {
      question: `How fast can campaigns launch in ${location.name}?`,
      answer:
        'Paid media and landing page tests can move first, while SEO, resources, directory links, and AI search visibility compound as the page cluster is indexed.'
    }
  ];

  return (
    <>
      <SchemaScript data={locationSchema(location, path)} />
      <SchemaScript data={faqSchema(faqs)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/locations' },
          { name: location.name, path }
        ])}
      />
      <LocationOverviewView location={location} />
    </>
  );
}
