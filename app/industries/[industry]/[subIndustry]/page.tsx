import { previewCandidate, previewCandidateMetadata } from '../../../../lib/nicheCandidates';
import NicheCandidatePage from '../../../../components/b2b/NicheCandidatePage';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { isPublishedSubIndustry } from '../../../../lib/industryPublication';
import { resolveSubIndustry, b2bSubNicheParams } from '../../../../lib/b2b/registry';
import { resolveIcp, icpSubIndustryParams } from '../../../../lib/b2b/icpRegistry';
import { icpMetadata, icpSchema, icpEntityName } from '../../../../lib/b2b/icpMetadata';
import IcpSubIndustryPage from '../../../../components/b2b/IcpSubIndustryPage';
import { observationStore } from '../../../../lib/b2b/observationStore';
import SubNichePage from '../../../../components/b2b/SubNichePage';
import type { Industry, SubIndustry } from '../../../../types';
import { INDUSTRIES } from '../../../../data/industries';
import { SERVICES } from '../../../../data/services';
import { studiesForTopic, nicheLabel } from '../../../../data/case-studies';
import { getSubIndustryMetadata, metadataFor } from '../../../../lib/seo';
import { breadcrumbSchema, faqSchema } from '../../../../lib/schema';
import Heading from '../../../../components/ui/Heading';

// Unknown routes still fail the resolver. Draft fallback is strictly preview-only.
export const dynamicParams = true;

/* Gated by lib/industryPublication.ts: an industry row that is not on the
   frozen allowlist generates no params, so its URL 404s rather than rendering a
   page nobody reviewed. dynamicParams is false on this route, so this is the
   whole gate. */
/* Today's expression unchanged, concatenated with the B2B routable set. Legacy
   params first, original order preserved. ADR-0007 §2.4. */
export const generateStaticParams = () => [
  ...INDUSTRIES.flatMap((industry) =>
    industry.subIndustries
      .filter((subIndustry) => isPublishedSubIndustry(industry.id, subIndustry.slug))
      .map((subIndustry) => ({
        industry: industry.id,
        subIndustry: subIndustry.slug,
      }))
  ),
  ...b2bSubNicheParams(),
  ...icpSubIndustryParams(),
];

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ industry: string; subIndustry: string }>;
}): Promise<Metadata> => {
  const { industry, subIndustry } = await params;

  /* LEGACY FIRST AND UNCHANGED. getSubIndustryMetadata resolves against
     data/industries.ts and returns a noindex "not found" object for anything it
     does not know, so the B2B check has to come BEFORE the fallthrough or every
     new page would ship as "Sub-Industry Not Found". Checking legacy membership
     explicitly keeps the existing call byte-identical for the 66 live pages.

     THE TEST IS NOW PER SUB-SLUG, NOT PER PARENT, AND THAT FIXES A LATENT BUG.
     ADR-0008 §3.5 item 2: this branch keyed on the PARENT while the render
     branch below keys on the CHILD, so a non-legacy child under a legacy parent
     rendered a real page and got `{ title: 'Vertical Not Found', noIndex: true }`
     written over it. Metadata and body disagreeing on one URL. It was latent
     because no such path reached generateStaticParams, and it goes live the
     moment one does, which is why it is fixed in the wave that creates the
     possibility rather than after somebody reads the served HTML.

     All 66 live pages take the same early return with the same argument and
     therefore emit the same bytes: for them `legacySub` is always found. */
  const legacyIndustry = INDUSTRIES.find((item) => item.id === industry);
  const legacySub = legacyIndustry?.subIndustries.find((item) => item.slug === subIndustry);
  if (legacySub) return getSubIndustryMetadata(industry, subIndustry);

  const record = resolveSubIndustry(industry, subIndustry);
  if (record?.source === 'b2b') {
    return metadataFor({
      /* See the note on the parent route: the layout template appends
         "| Qognition", so this string must not. */
      title: `AI Search Visibility for ${record.subNiche.label}`,
      description: record.body.metaDescription,
      path: `/industries/${record.vertical.id}/${record.subNiche.id}`,
      noIndex: record.state !== 'published',
    });
  }

  /* Level 2 of the ICP tree, the workhorse level. */
  const candidateMetadata = previewCandidateMetadata([industry, subIndustry]);
  if (candidateMetadata) return candidateMetadata;
  const icp = icpMetadata([industry, subIndustry]);
  if (icp) return icp;

  return getSubIndustryMetadata(industry, subIndustry);
};

export default async function Page({ params }: { params: Promise<{ industry: string; subIndustry: string }> }) {
  const { industry: industrySlug, subIndustry: subIndustrySlug } = await params;
  const record = resolveSubIndustry(industrySlug, subIndustrySlug);

  if (!record) {
    const candidate = previewCandidate([industrySlug, subIndustrySlug]);
    if (candidate) return <NicheCandidatePage candidate={candidate} />;
    const icp = resolveIcp([industrySlug, subIndustrySlug]);
    if (!icp || icp.level !== 'sub-industry') notFound();
    const canonical = icp.canonicalPath ? resolveIcp(icp.canonicalPath) : undefined;
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(icpSchema(icp)) }}
        />
        <IcpSubIndustryPage
          record={icp}
          observation={observationStore.lookup(icp.href)}
          canonicalHref={canonical?.href}
          canonicalName={canonical ? icpEntityName(canonical) : undefined}
        />
      </>
    );
  }

  if (record.source === 'b2b') {
    return (
      <SubNichePage
        record={record}
        observation={observationStore.lookup(
          `/industries/${record.vertical.id}/${record.subNiche.id}`
        )}
      />
    );
  }

  return <LegacySubIndustryPage industry={record.industry} subIndustry={record.data} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
   THE LEGACY RENDER, lifted without a character of its JSX changed.

   It contains the two sentences Nadia's architecture doc names as live examples
   of a template speaking about itself — "Quick summary: {name} marketing needs
   industry proof…" and "This page links upward to {industry}, sideways to
   services and proof" — plus a constant paragraph repeated under every feature,
   and a sidebar linking to /locations, /resources and /directory. Those stay on
   the 66 existing pages because changing them changes existing pages. New rows
   never reach this function.
   ───────────────────────────────────────────────────────────────────────────── */
function LegacySubIndustryPage({
  industry,
  subIndustry,
}: {
  industry: Industry;
  subIndustry: SubIndustry;
}) {
  const path = `/industries/${industry.id}/${subIndustry.slug}`;
  const displayFaqs = subIndustry.faqs ? [...subIndustry.faqs, ...industry.faqs.slice(0, 3)] : industry.faqs;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${subIndustry.name} Digital Marketing`,
              description: subIndustry.description,
              provider: { '@type': 'Organization', name: 'Qognition', url: 'https://www.qognitionagency.com' },
              serviceType: `${subIndustry.name} Marketing`,
              url: `https://www.qognitionagency.com${path}`,
            },
            ...(displayFaqs?.length ? [faqSchema(displayFaqs)] : []),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Industries', path: '/industries' },
              { name: industry.name, path: `/industries/${industry.id}` },
              { name: subIndustry.name, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <Link
          href={`/industries/${industry.id}`}
          className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] mb-12 text-sm transition-colors"
        >
          <ArrowLeft size={16} /> Back to {industry.name}
        </Link>

        <article className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <span className="text-[var(--accent)] font-semibold uppercase tracking-widest mb-4 block text-xs">
              {industry.name}
            </span>
            <Heading level="h1" className="mb-8">{subIndustry.name} Marketing</Heading>
            <p className="text-body text-[var(--text-muted)] mb-12 border-l-2 border-[var(--accent)] pl-6">
              {subIndustry.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {[
                `Quick summary: ${subIndustry.name} marketing needs industry proof, precise intent mapping, and conversion paths built for real buyer questions.`,
                `This page links upward to ${industry.name}, sideways to services and proof, and downward to FAQs for AI and search clarity.`,
                'Qognition builds these pages as useful vertical growth assets with real buyer questions, proof, services, and next steps.',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-5 text-sm leading-relaxed text-[var(--text-muted)]"
                >
                  {item}
                </div>
              ))}
            </div>

            <section className="mb-16">
              <Heading level="h2" className="mb-8">What Buyers Need to See</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subIndustry.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5"
                  >
                    <CheckCircle2 className="text-[var(--accent)] mb-4" size={20} />
                    <h3 className="text-h3 text-[var(--text)] mb-3 font-semibold">{feature}</h3>
                    <p className="text-body text-[var(--text-muted)]">
                      We translate this requirement into search pages, ad messaging, creative proof, analytics events, and lead-routing logic.
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {subIndustry.benefits && (
              <section className="mb-16">
                <Heading level="h2" className="mb-8">Business Outcomes</Heading>
                <div className="space-y-4">
                  {subIndustry.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="rounded-xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-5 text-[var(--text-muted)]"
                    >
                      {benefit}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-16">
              <Heading level="h2" className="mb-8">Recommended Services</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.slice(0, 6).map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 hover:border-[var(--accent)]/40 transition-all"
                  >
                    <h3 className="text-h3 text-[var(--text)] mb-3 font-semibold">
                      {service.title.replace('Web Development', 'Web Design')}
                    </h3>
                    <p className="text-body text-[var(--text-muted)]">{service.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <Heading level="h2" className="mb-8">Common Questions</Heading>
              <div className="space-y-4">
                {displayFaqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5"
                  >
                    <h3 className="text-h3 text-[var(--text)] mb-3 font-semibold">{faq.question}</h3>
                    <p className="text-body text-[var(--text-muted)]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
              {/* Guarded. The heading sat outside the map, so the 59 of 66
                  sub-pages with no matching study rendered a bare "Related
                  Proof" over nothing. §4 says omit the section. Insurance studies
                  only since 2026-10-07 (B2B_PAGE_NICHES in data/case-studies). */}
              {studiesForTopic(`${industry.name} ${subIndustry.name}`, 3, { fallback: 'spread' }).length > 0 && (
                <Heading level="h2" className="mb-5">From our client library</Heading>
              )}
              {studiesForTopic(`${industry.name} ${subIndustry.name}`, 3, { fallback: 'spread' }).map((study) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.id}`}
                  className="mb-3 block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--accent)]/40 transition-all"
                >
                  <p className="text-meta uppercase text-[var(--accent)] mb-2">{nicheLabel(study.niche)} · {study.market}</p>
                  <h3 className="text-h3 text-[var(--text)] font-semibold">{study.client}</h3>
                </Link>
              ))}
              <div className="mt-8 space-y-3">
                <Link href="/locations" className="block text-sm text-[var(--accent)] hover:text-[var(--text)] transition-colors">
                  Location pages
                </Link>
                <Link href="/resources" className="block text-sm text-[var(--accent)] hover:text-[var(--text)] transition-colors">
                  Resources
                </Link>
                <Link href="/directory" className="block text-sm text-[var(--accent)] hover:text-[var(--text)] transition-colors">
                  Tools directory
                </Link>
              </div>
              <a
                href="/book"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block text-center rounded-lg bg-[var(--accent)] px-6 py-4 text-sm font-medium text-[var(--accent-deep)] hover:brightness-110 transition-all"
              >
                Book Strategy Call
              </a>
            </div>
          </aside>
        </article>
      </main>
    </>
  );
}
