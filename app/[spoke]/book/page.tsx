import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SpokeId } from '../../../lib/spokes';
import { SPOKES } from '../../../lib/spokes';
import { breadcrumbSchema } from '../../../lib/schema';
import SpokeBookPage from '../../../components/spokes/SpokeBookPage';
import SpokeLayout from '../../../components/shared/SpokeLayout';

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
    title: `Book a ${config.label} Strategy Call | Qognition`,
    description: `Schedule a free ${config.label.toLowerCase()} strategy call with Qognition. Pick a time that works for you — no commitment, no pitch.`,
    alternates: { canonical: `/${spoke}/book` },
    robots: { index: true, follow: true },
  };
}

export default async function SpokeBookPageRoute({
  params,
}: {
  params: Promise<{ spoke: string }>;
}) {
  const { spoke } = await params;

  if (!VALID_SPOKES.includes(spoke as SpokeId)) {
    notFound();
  }

  const config = SPOKES[spoke as SpokeId];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: config.label, path: `/${spoke}` },
              { name: 'Book a Call', path: `/${spoke}/book` },
            ]),
          ]),
        }}
      />
      <SpokeLayout spoke={spoke as SpokeId}>
        <SpokeBookPage spoke={spoke as SpokeId} />
      </SpokeLayout>
    </>
  );
}
