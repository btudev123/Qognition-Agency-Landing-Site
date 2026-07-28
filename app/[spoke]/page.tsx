import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SpokeId } from '../../lib/spokes';
import { SPOKES } from '../../lib/spokes';
import { getSpokePageData } from '../../data/spoke-services';
import { breadcrumbSchema } from '../../lib/schema';
import SpokeHomepage from '../../components/spokes/SpokeHomepage';
import SpokeLayout from '../../components/shared/SpokeLayout';

const VALID_SPOKES: SpokeId[] = ['marketing', 'tech', 'finance', 'automation'];

export function generateStaticParams() {
  return VALID_SPOKES.map((spoke) => ({ spoke }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ spoke: string }>;
}): Promise<Metadata> {
  const { spoke } = await params;
  const config = SPOKES[spoke as SpokeId];
  if (!config) return {};

  return {
    title: `${config.label} Services | Qognition`,
    description: config.subhead,
    alternates: { canonical: `/${spoke}` },
  };
}

export default async function SpokePage({
  params,
}: {
  params: Promise<{ spoke: string }>;
}) {
  const { spoke } = await params;

  if (!VALID_SPOKES.includes(spoke as SpokeId)) {
    notFound();
  }

  const config = SPOKES[spoke as SpokeId];
  const data = getSpokePageData(spoke as SpokeId);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${config.label} Services`,
              provider: { '@type': 'Organization', name: 'Qognition', url: 'https://www.qognitionagency.com' },
              description: config.description,
              areaServed: { '@type': 'Country', name: 'United States' },
              url: `https://www.qognitionagency.com/${spoke}`,
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: config.label, path: `/${spoke}` },
            ]),
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: data.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            },
          ]),
        }}
      />
      <SpokeLayout spoke={spoke as SpokeId}>
        <SpokeHomepage data={data} />
      </SpokeLayout>
    </>
  );
}
