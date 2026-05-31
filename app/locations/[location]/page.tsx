import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocationBySlug, LOCATIONS } from '../../../data/locations';
import { getLocationMetadata } from '../../../lib/seo';
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
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
        `Qognition supports companies targeting ${location.name} without pretending to have a local office where one does not exist. The focus is market coverage, demand generation, and measurable leads.`
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
        'Yes. The page includes concise summaries, useful sections, internal links, FAQ schema, location schema, and natural-language answers that search and AI systems can understand.'
    },
    {
      question: `How fast can campaigns launch in ${location.name}?`,
      answer:
        'Paid media and landing page tests can move first, while SEO, resources, proof assets, and AI search visibility compound as the wider site earns visibility.'
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
              name: `Digital Marketing Services in ${location.name}`,
              description: location.intro,
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
              { name: location.name, path },
            ]),
          ]),
        }}
      />
      <LocationOverviewView location={location} />
    </>
  );
}
