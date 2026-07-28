import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocationBySlug } from '../../../../../data/locations';
import { SERVICES } from '../../../../../data/services';
import { INDUSTRIES } from '../../../../../data/industries';
import { breadcrumbSchema, faqSchema } from '../../../../../lib/schema';
import { getCuratedMeshCombos, isCuratedCombo, isRelevantServiceIndustry } from '../../../../../lib/mesh';
import { SITE_URL } from '../../../../../lib/seo';
import FunnelCTA from '../../../../../components/shared/FunnelCTA';

// On-demand ISR: curated combos are pre-built + indexed; long-tail renders on
// first request and stays noindex until promoted. dynamicParams allows any
// relevant combo URL to resolve without pre-building millions of pages.
export const dynamicParams = true;
export const revalidate = 86400;

export const generateStaticParams = () =>
  getCuratedMeshCombos().map((c) => ({ location: c.location, service: c.service, industry: c.industry }));

function resolve(locationSlug: string, serviceId: string, industryId: string) {
  const location = getLocationBySlug(locationSlug);
  const service = SERVICES.find((s) => s.id === serviceId);
  const industry = INDUSTRIES.find((i) => i.id === industryId);
  return { location, service, industry };
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ location: string; service: string; industry: string }>;
}): Promise<Metadata> => {
  const { location: l, service: s, industry: i } = await params;
  const { location, service, industry } = resolve(l, s, i);
  if (!location || !service || !industry) return { title: 'Not found', robots: { index: false } };
  const indexable = isCuratedCombo(l, s, i);
  const title = `${service.title} for ${industry.name} in ${location.name} | Qognition`;
  return {
    title,
    description: `${service.shortDescription} Tailored for ${industry.name} companies targeting ${location.name}.`,
    alternates: { canonical: `/locations/${l}/${s}/${i}` },
    robots: { index: indexable, follow: true },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ location: string; service: string; industry: string }>;
}) {
  const { location: l, service: s, industry: i } = await params;
  const { location, service, industry } = resolve(l, s, i);
  if (!location || !service || !industry) notFound();
  // Block nonsensical pairings outright.
  if (!isRelevantServiceIndustry(s, i)) notFound();

  const path = `/locations/${l}/${s}/${i}`;
  const faqs = [
    {
      question: `Why does ${service.title} for ${industry.name} differ in ${location.name}?`,
      answer: `Buyer language, competitor density, CPC, compliance norms, and trust signals for ${industry.name} all shift by market. The ${location.name} plan is built around local demand and ${industry.name} buying behavior, not a copied template.`,
    },
    {
      question: `What outcomes do ${industry.name} companies target with ${service.title} in ${location.name}?`,
      answer: `Typically: qualified local enquiries, lower cost per lead, stronger visibility against ${location.name} competitors, and measurable pipeline — with reporting tied to revenue, not vanity metrics.`,
    },
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
              name: `${service.title} for ${industry.name} in ${location.name}`,
              description: `${service.shortDescription} Tailored for ${industry.name} companies targeting ${location.name}.`,
              provider: { '@type': 'Organization', name: 'Qognition', url: SITE_URL },
              areaServed: { '@type': location.schemaType, name: location.name },
              serviceType: service.title,
              url: `${SITE_URL}${path}`,
            },
            faqSchema(faqs),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Locations', path: '/locations' },
              { name: location.name, path: `/locations/${l}` },
              { name: service.title, path: `/locations/${l}/${s}` },
              { name: industry.name, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-5 sm:px-10 max-w-5xl mx-auto">
        <p className="text-meta font-mono uppercase mb-4" style={{ color: 'var(--accent)' }}>
          {location.name} · {industry.name}
        </p>
        <h1 className="text-h1 font-sans mb-6 font-semibold" style={{ fontSize: 'clamp(34px,5vw,60px)' }}>
          {service.title} for {industry.name} in {location.name}
        </h1>
        <p className="text-body mb-10" style={{ color: 'var(--text-muted)' }}>
          {service.shortDescription} Qognition adapts {service.title.toLowerCase()} for {industry.name.toLowerCase()} companies
          competing in {location.name} ({location.region}) — built around local search demand, {industry.name.toLowerCase()} buyer
          intent, and the trust signals that convert in this market.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { h: 'Local demand', p: `Search behavior, competitor density, and CPC pressure specific to ${location.name}.` },
            { h: `${industry.name} fit`, p: `Messaging, compliance, and proof aligned to ${industry.name} buyers.` },
            { h: 'Measured pipeline', p: 'Tracking, attribution, and reporting tied to qualified enquiries.' },
          ].map((c) => (
            <div key={c.h} className="rounded-xl border p-5" style={{ borderColor: 'var(--border)' }}>
              <div className="font-semibold mb-2" style={{ color: 'var(--text)' }}>{c.h}</div>
              <p className="text-body" style={{ color: 'var(--text-muted)' }}>{c.p}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-12 text-sm">
          <Link href={`/locations/${l}/${s}`} className="underline" style={{ color: 'var(--accent)' }}>
            {service.title} in {location.name}
          </Link>
          <Link href={`/industries/${i}`} className="underline" style={{ color: 'var(--accent)' }}>
            {industry.name} marketing
          </Link>
          <Link href={`/services/${s}`} className="underline" style={{ color: 'var(--accent)' }}>
            {service.title}
          </Link>
        </div>

        <FunnelCTA stage="mofu" service={service.title} className="mb-8" />
      </main>
    </>
  );
}
