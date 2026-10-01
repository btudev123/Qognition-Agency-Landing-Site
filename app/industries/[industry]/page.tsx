import { BOOKING_LINK } from '../../../data/siteConfig';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Target } from 'lucide-react';
import { isPublishedIndustry } from '../../../lib/industryPublication';
import { resolveIndustry, b2bHubParams } from '../../../lib/b2b/registry';
import { resolveIcp, icpIndustryParams } from '../../../lib/b2b/icpRegistry';
import { icpMetadata, icpSchema, icpEntityName } from '../../../lib/b2b/icpMetadata';
import IcpIndustryPage from '../../../components/b2b/IcpIndustryPage';
import { observationStore } from '../../../lib/b2b/observationStore';
import VerticalHubPage from '../../../components/b2b/VerticalHubPage';
import { metadataFor } from '../../../lib/seo';
import type { Industry } from '../../../types';
import { INDUSTRIES } from '../../../data/industries';
import { SERVICES } from '../../../data/services';
import { studiesForTopic, nicheLabel } from '../../../data/case-studies';
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
import Section from '../../../components/ui/Section';
import Heading from '../../../components/ui/Heading';
import CrossLinks from '../../../components/shared/CrossLinks';
import FunnelCTA from '../../../components/shared/FunnelCTA';

export const dynamicParams = false;

/* Gated by lib/industryPublication.ts: an industry row that is not on the
   frozen allowlist generates no params, so its URL 404s rather than rendering a
   page nobody reviewed. dynamicParams is false on this route, so this is the
   whole gate. */
/* Today's expression, character for character, CONCATENATED with the B2B
   routable set. Legacy params come first and in their original order, so the
   prerender manifest's existing entries do not move. ADR-0007 §2.4. */
/* Three sources, appended in registration order and never interleaved: legacy
   first and in its original order so the prerender manifest's existing entries
   do not move, then the 15-entry spine, then the ICP industries. The third
   returns [] until an operator promotion, so this expression is byte-identical
   to what shipped. ADR-0008 §5.2 item 4. */
export const generateStaticParams = () => [
  ...INDUSTRIES.filter((industry) => isPublishedIndustry(industry.id)).map((industry) => ({
    industry: industry.id,
  })),
  ...b2bHubParams(),
  ...icpIndustryParams(),
];

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> => {
  const { industry } = await params;
  const page = INDUSTRIES.find((item) => item.id === industry);
  /* LEGACY FIRST AND UNCHANGED. The operator's hard constraint is that existing
     meta titles, descriptions and canonicals do not change, so this block is
     byte-identical to what shipped and the B2B branch sits after it, reachable
     only when no legacy row matched. */
  if (page) {
    return {
      title: `${page.name} Digital Marketing | Qognition`,
      description: page.description,
      alternates: { canonical: `/industries/${page.id}` },
    };
  }

  const record = resolveIndustry(industry);
  if (record?.source === 'b2b') {
    /* New URLs do NOT carry "${name} Digital Marketing | Qognition". That string
       is the retired generalist positioning (CLAUDE.md preamble) and ADR-0007
       §2.4 declines to mint new URLs with it. Existing pages keep it. */
    return metadataFor({
      /* No "| Qognition" here. app/layout.tsx applies `template: '%s | Qognition'`
         and metadataFor only strips a "| Qognition Agency" suffix, so writing the
         short form produced "... | Qognition | Qognition" on the first render.
         The 11 legacy hubs have the same doubling and keep it: fixing theirs
         would change an existing meta title. */
      title: `AI Search Visibility for ${record.vertical.label}`,
      description: record.body.metaDescription,
      path: `/industries/${record.vertical.id}`,
      noIndex: record.state !== 'published',
    });
  }

  /* Level 1 of the ICP tree. Reached only when no legacy row and no spine
     vertical claimed the slug, which is the longest-legacy-match-first rule in
     lib/b2b/icpRegistry.ts expressed as branch order. `financial-services` is
     the one industry-level collision and legacy keeps it, here and in the
     render below, so the two cannot disagree on the same URL. */
  const icp = icpMetadata([industry]);
  if (icp) return icp;

  return { title: 'Industry Not Found' };
};

export default async function Page({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: industrySlug } = await params;
  const record = resolveIndustry(industrySlug);

  if (!record) {
    const icp = resolveIcp([industrySlug]);
    if (!icp || icp.level !== 'industry') notFound();
    const canonical = icp.canonicalPath ? resolveIcp(icp.canonicalPath) : undefined;
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(icpSchema(icp)) }}
        />
        <IcpIndustryPage
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
      <VerticalHubPage
        record={record}
        observation={observationStore.lookup(`/industries/${record.vertical.id}`)}
      />
    );
  }

  return <LegacyIndustryPage industry={record.data} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
   THE LEGACY RENDER. Lifted into its own function without a single character of
   its JSX changed, so the 11 existing hubs emit exactly what they emitted
   before. Same input, same code, same output.

   It contains things that would not be written today: three literal constant
   "quick summary" cards, and a sidebar linking to /locations, /resources,
   /directory and /free-tools, all four of which are families under kill review.
   ADR-0007 §9 records those as accepted costs. They are not fixed here because
   fixing them changes an existing page, which the hard constraint forbids. The
   branch above is how new pages avoid inheriting them.
   ───────────────────────────────────────────────────────────────────────────── */
function LegacyIndustryPage({ industry }: { industry: Industry }) {
  const path = `/industries/${industry.id}`;
  const relatedServices = SERVICES.filter((service) =>
    industry.relatedServices?.includes(service.id)
  ).slice(0, 6);
  /* RESTORED 2026-10-01 at the operator's request, with the heading changed rather
   than the data.

   On 2026-09-29 this returned nothing, because 8 of 11 industry hubs were
   rendering fox-service-company, a residential HVAC contractor, under a heading
   reading "Case Study Reference" on pages about law firms, accountants,
   consultants and manufacturers. That implied experience in those sectors
   through the render, which §11 forbids and which no page copy could correct.

   The fix was to hide the block. The operator wants the work visible, and they
   are right that hiding 45 real client programmes is the wrong trade. So the
   studies come back and the HEADING carries the honest part: it now says these
   are from our wider client library rather than from this sector. A reader sees
   the work, and nobody is told we have done it in their field. */
const relatedCaseStudies = studiesForTopic(`${industry.name} ${industry.id}`, 3, {
  fallback: 'spread',
});
const [relatedCaseStudy] = relatedCaseStudies;

  const allFaqs = industry.faqs || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${industry.name} Digital Marketing`,
              description: industry.description,
              provider: {
                '@type': 'Organization',
                name: 'Qognition',
                url: 'https://www.qognitionagency.com',
              },
              serviceType: 'Industry Digital Marketing',
              url: `https://www.qognitionagency.com${path}`,
            },
            ...(allFaqs.length ? [faqSchema(allFaqs)] : []),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Industries', path: '/industries' },
              { name: industry.name, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] mb-10 text-sm transition-colors"
          >
            <ArrowLeft size={16} /> Back to Industries
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            <article className="lg:col-span-8">
              <Heading level="h1" className="mb-6">{industry.name}</Heading>
              <p className="text-body text-[var(--text-muted)] mb-12 border-l-2 border-[var(--accent)] pl-6">
                {industry.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
                {[
                  `${industry.name} growth depends on matching channel strategy to buyer trust, compliance, sales cycle, and proof requirements.`,
                  'Qognition connects industry pages to service pages, location pages, sub-verticals, case studies, resources, and FAQs.',
                  'The page is statically rendered with JSON-LD, semantic headings, and natural-language explanations for Google, Bing, and AI systems.',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 text-sm leading-relaxed text-[var(--text-muted)]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mb-14">
                <Heading level="h2" className="mb-5">Specialized Verticals</Heading>
                <p className="text-body text-[var(--text-muted)] mb-5">
                  Select a specific niche to see tailored strategies:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {industry.subIndustries.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/industries/${industry.id}/${sub.slug}`}
                      className="group p-4 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl hover:border-[var(--accent)]/40 transition-all flex justify-between items-center"
                    >
                      <span className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        {sub.name}
                      </span>
                      <ArrowRight size={16} className="text-[var(--accent)]" />
                    </Link>
                  ))}
                </div>
              </div>

              {industry.painPoints && industry.painPoints.length > 0 && (
                <div className="mb-14">
                  <Heading level="h2" className="mb-5">Sector Pain Points</Heading>
                  <div className="space-y-4">
                    {industry.painPoints.map((pain) => (
                      <div
                        key={pain}
                        className="flex items-start gap-4 p-5 border border-red-500/20 bg-red-500/5 rounded-xl"
                      >
                        <Target className="text-red-400 mt-0.5 shrink-0" size={20} />
                        <div>
                          <p className="text-meta font-semibold uppercase text-red-400 mb-1">
                            The Problem
                          </p>
                          <p className="text-body text-[var(--text-muted)]">{pain}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {industry.solutions && industry.solutions.length > 0 && (
                <div className="mb-14">
                  <Heading level="h2" className="mb-5">Our Solutions</Heading>
                  <div className="space-y-3">
                    {industry.solutions.map((solution) => (
                      <div
                        key={solution}
                        className="flex items-center gap-3 p-4 border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] rounded-xl"
                      >
                        <CheckCircle className="text-[var(--accent)] shrink-0" size={20} />
                        <span className="text-[var(--text)]">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-14">
                <Heading level="h2" className="mb-5">Recommended Services</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(relatedServices.length ? relatedServices : SERVICES.slice(0, 4)).map(
                    (service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 hover:border-[var(--accent)]/40 transition-all"
                      >
                        <h3 className="text-h3 text-[var(--text)] mb-2 font-semibold">
                          {service.title.replace('Web Development', 'Web Design')}
                        </h3>
                        <p className="text-body text-[var(--text-muted)]">
                          {service.shortDescription}
                        </p>
                      </Link>
                    )
                  )}
                </div>
              </div>

              {allFaqs.length > 0 && (
                <div className="mb-14">
                  <Heading level="h2" className="mb-5">Expert Insights</Heading>
                  <div className="space-y-3">
                    {allFaqs.map((faq) => (
                      <div
                        key={faq.question}
                        className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5"
                      >
                        <h3 className="text-h3 text-[var(--text)] mb-2 font-semibold">{faq.question}</h3>
                        <p className="text-body text-[var(--text-muted)]">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 p-7 border border-[var(--border)] bg-[var(--card-bg)] rounded-2xl space-y-6">
                {/* The heading was outside the guard, so 10 of 11 hubs rendered
                    "Case Study Reference" over nothing once the proof block
                    stopped borrowing a study from another vertical. */}
                <div>
                  {relatedCaseStudies.length > 0 && (
                  <Heading level="h3" className="mb-3">From our client library</Heading>
                  )}
                  {/* All three, not one. `studiesForTopic` with the spread returns
                      one study per niche in turn, so taking index 0 put the SAME
                      HVAC contractor on 10 of 11 hubs. Three cards show the
                      breadth of the library and make the heading true on its
                      face: a reader sees home services, dental and insurance and
                      understands at a glance that this is our work rather than a
                      claim about their sector. */}
                  <div className="space-y-3">
                    {relatedCaseStudies.map((study) => (
                      <Link
                        key={study.id}
                        href={`/case-studies/${study.id}`}
                        className="block p-4 border border-[var(--border)] rounded-xl hover:border-[var(--accent)]/40 transition-all"
                      >
                        <p className="text-meta font-semibold uppercase text-[var(--accent)] mb-2">
                          {nicheLabel(study.niche)} · {study.market}
                        </p>
                        <h4 className="text-h4 text-[var(--text)] mb-1 font-semibold">
                          {study.client}
                        </h4>
                        <p className="text-meta text-[var(--text-muted)]">{study.headline}</p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/case-studies"
                    className="mt-4 inline-block text-meta text-[var(--accent)] hover:underline"
                  >
                    See all 45 client programmes
                  </Link>
                </div>

                <div>
                  <Heading level="h3" className="mb-3">Internal Links</Heading>
                  <div className="space-y-2">
                    {[
                      { label: 'Location pages', href: '/locations' },
                      { label: 'Lead magnets', href: '/resources' },
                      { label: 'Tools directory', href: '/directory' },
                      { label: 'Free calculators', href: '/free-tools' },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full px-5 py-3 text-sm font-medium bg-[var(--accent)] text-[var(--accent-deep)] rounded-lg hover:brightness-110 transition-all"
                >
                  Book a Strategy Call
                </a>
              </div>
            </aside>
          </div>
        </Section>
        <FunnelCTA stage="mofu" className="mt-16 mb-8" />
        <CrossLinks exclude={{ type: 'industry', id: industry.id }} />
      </main>
    </>
  );
}
