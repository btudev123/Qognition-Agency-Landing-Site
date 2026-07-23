import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { INDUSTRIES } from '../../../../data/industries';
import { SERVICES } from '../../../../data/services';
import { CASE_STUDIES } from '../../../../data/work';
import { getSubIndustryMetadata } from '../../../../lib/seo';
import { breadcrumbSchema, faqSchema } from '../../../../lib/schema';
import Heading from '../../../../components/ui/Heading';

export const dynamicParams = false;

export const generateStaticParams = () =>
  INDUSTRIES.flatMap((industry) =>
    industry.subIndustries.map((subIndustry) => ({
      industry: industry.id,
      subIndustry: subIndustry.slug,
    }))
  );

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ industry: string; subIndustry: string }>;
}): Promise<Metadata> => {
  const { industry, subIndustry } = await params;
  return getSubIndustryMetadata(industry, subIndustry);
};

export default async function Page({ params }: { params: Promise<{ industry: string; subIndustry: string }> }) {
  const { industry: industrySlug, subIndustry: subIndustrySlug } = await params;
  const industry = INDUSTRIES.find((item) => item.id === industrySlug);
  const subIndustry = industry?.subIndustries.find((item) => item.slug === subIndustrySlug);
  if (!industry || !subIndustry) notFound();

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
              provider: { '@type': 'Organization', name: 'Qognition', url: 'https://qognition.com' },
              serviceType: `${subIndustry.name} Marketing`,
              url: `https://qognition.com${path}`,
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
              <Heading level="h2" className="mb-5">Related Proof</Heading>
              {CASE_STUDIES.slice(0, 3).map((study) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.id}`}
                  className="mb-3 block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--accent)]/40 transition-all"
                >
                  <p className="text-meta uppercase text-[var(--accent)] mb-2">{study.industry}</p>
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
                href="https://cal.com/qognition-agency/15min"
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
