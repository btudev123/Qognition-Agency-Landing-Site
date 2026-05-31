import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SpokeId } from '../../../lib/spokes';
import { SPOKES } from '../../../lib/spokes';
import { getSubService } from '../../../data/spoke-services';
import { breadcrumbSchema } from '../../../lib/schema';
import { SubServicePage } from '../../../components/spokes/SpokeHomepage';
import SpokeLayout from '../../../components/shared/SpokeLayout';

const VALID_SPOKES: SpokeId[] = ['marketing', 'tech', 'finance', 'automation'];

export function generateStaticParams() {
  const params: { spoke: string; service: string }[] = [];
  for (const spoke of VALID_SPOKES) {
    // Import dynamically to avoid circular deps — we hardcode the known slugs
    const slugsBySpoke: Record<string, string[]> = {
      marketing: ['seo', 'ai-seo', 'paid-media', 'content', 'email-lifecycle', 'brand-strategy', 'visual-identity', 'cro', 'social', 'audit'],
      tech: ['websites', 'web-apps', 'ecommerce', 'nextjs-seo', 'integrations', 'performance', 'mvp', 'audit'],
      finance: ['bookkeeping', 'tax', 'fractional-cfo', 'payroll', 'financial-reporting', 'cash-flow', 'audit'],
      automation: ['ai-agents', 'workflow-automation', 'integrations', 'data-pipelines', 'crm-automation', 'no-code-stack', 'audit'],
    };
    const slugs = slugsBySpoke[spoke] || [];
    for (const slug of slugs) {
      params.push({ spoke, service: slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ spoke: string; service: string }>;
}): Promise<Metadata> {
  const { spoke, service } = await params;

  if (service === 'audit') return {}; // handled by audit route

  const serviceData = getSubService(spoke as SpokeId, service);
  if (!serviceData) return {};

  return {
    title: `${serviceData.title} | Qognition ${SPOKES[spoke as SpokeId]?.label || ''}`,
    description: serviceData.summary,
    alternates: { canonical: `/${spoke}/${service}` },
  };
}

export default async function SpokeServicePage({
  params,
}: {
  params: Promise<{ spoke: string; service: string }>;
}) {
  const { spoke, service } = await params;

  if (!VALID_SPOKES.includes(spoke as SpokeId)) {
    notFound();
  }

  // The audit route has its own dedicated page
  if (service === 'audit') {
    notFound(); // will be caught by the explicit audit route
  }

  const config = SPOKES[spoke as SpokeId];
  const serviceData = getSubService(spoke as SpokeId, service);

  if (!serviceData) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: serviceData.title,
              provider: { '@type': 'Organization', name: 'Qognition' },
              description: serviceData.summary,
              url: `https://qognition.com/${spoke}/${service}`,
              areaServed: { '@type': 'Country', name: 'United States' },
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: config.label, path: `/${spoke}` },
              { name: serviceData.title, path: `/${spoke}/${service}` },
            ]),
          ]),
        }}
      />
      <SpokeLayout spoke={spoke as SpokeId}>
        <SubServicePage spoke={spoke as SpokeId} service={serviceData} />
      </SpokeLayout>
    </>
  );
}
