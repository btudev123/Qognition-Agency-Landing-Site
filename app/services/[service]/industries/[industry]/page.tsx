import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDUSTRIES } from '../../../../../data/industries';
import { isPublishedIndustry } from '../../../../../lib/industryPublication';
import { SERVICES } from '../../../../../data/services';
import { breadcrumbSchema, faqSchema } from '../../../../../lib/schema';
import { SITE_URL } from '../../../../../lib/seo';
import ServiceIndustryView from '../ServiceIndustryView';

export const dynamicParams = false;

/* Gated by lib/industryPublication.ts. This is the multiplying route: every
   unreviewed industry row here becomes one URL PER SERVICE. The filter is the
   difference between adding an industry and adding eleven indexable pages with
   interpolated meta titles, which CLAUDE.md §11 forbids by name. */
export const generateStaticParams = () =>
  SERVICES.flatMap((service) =>
    INDUSTRIES.filter((industry) => isPublishedIndustry(industry.id)).map((industry) => ({
      service: service.id,
      industry: industry.id,
    }))
  );

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ service: string; industry: string }>;
}): Promise<Metadata> => {
  const { service, industry } = await params;
  const svc = SERVICES.find((item) => item.id === service);
  const ind = INDUSTRIES.find((item) => item.id === industry);
  if (!svc || !ind) return { title: 'Not Found', description: 'Service or industry not found.', robots: { index: false } };
  return {
    title: `${svc.title} for ${ind.name} | Qognition`,
    description: `${svc.shortDescription} Tailored ${svc.title} strategy for ${ind.name} — trust, compliance, search, and conversion.`,
    alternates: { canonical: `/services/${svc.id}/industries/${ind.id}` },
  };
};

export default async function Page({ params }: { params: Promise<{ service: string; industry: string }> }) {
  const { service: serviceSlug, industry: industrySlug } = await params;
  const service = SERVICES.find((item) => item.id === serviceSlug);
  const industry = INDUSTRIES.find((item) => item.id === industrySlug);
  if (!service || !industry) notFound();

  const path = `/services/${service.id}/industries/${industry.id}`;
  const combinedFaqs = [...(service.faqs?.slice(0, 3) ?? []), ...(industry.faqs?.slice(0, 3) ?? [])];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${service.title} for ${industry.name}`,
              description: service.shortDescription,
              provider: { '@type': 'Organization', name: 'Qognition', url: SITE_URL },
              url: `${SITE_URL}${path}`,
              serviceType: service.title,
              audience: { '@type': 'Audience', audienceType: industry.name },
            },
            ...(combinedFaqs.length ? [faqSchema(combinedFaqs)] : []),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: service.title, path: `/services/${service.id}` },
              { name: industry.name, path },
            ]),
          ]),
        }}
      />
      <ServiceIndustryView service={service} industry={industry} />
    </>
  );
}
