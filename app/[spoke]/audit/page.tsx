import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SpokeId } from '../../../lib/spokes';
import { SPOKES } from '../../../lib/spokes';
import { breadcrumbSchema } from '../../../lib/schema';
import SpokeAuditPage from '../../../components/spokes/SpokeAuditPage';
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

  const labels: Record<string, string> = {
    marketing: 'Free Marketing & AI Search Audit',
    tech: 'Free Tech & Performance Audit',
    finance: 'Free Finance Health Check',
    automation: 'Free Automation Opportunity Map',
  };

  return {
    title: `${labels[spoke] || 'Free Audit'} | Qognition`,
    description: `Get a free, personalized ${config.label.toLowerCase()} audit delivered within 48 hours. No commitment. No pitch. Just actionable insights.`,
    alternates: { canonical: `/${spoke}/audit` },
    robots: { index: true, follow: true },
  };
}

export default async function SpokeAuditPageRoute({
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
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `Free ${config.label} Audit`,
              provider: { '@type': 'Organization', name: 'Qognition' },
              description: `Free ${config.label.toLowerCase()} audit delivered within 48 hours.`,
              url: `https://qognition.com/${spoke}/audit`,
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: config.label, path: `/${spoke}` },
              { name: 'Free Audit', path: `/${spoke}/audit` },
            ]),
          ]),
        }}
      />
      <SpokeLayout spoke={spoke as SpokeId}>
        <SpokeAuditPage spoke={spoke as SpokeId} />
      </SpokeLayout>
    </>
  );
}
