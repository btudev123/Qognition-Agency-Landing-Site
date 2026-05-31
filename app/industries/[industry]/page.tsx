import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Target } from 'lucide-react';
import { INDUSTRIES } from '../../../data/industries';
import { SERVICES } from '../../../data/services';
import { CASE_STUDIES } from '../../../data/work';
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
import Section from '../../../components/ui/Section';
import Heading from '../../../components/ui/Heading';

export const dynamicParams = false;

export const generateStaticParams = () =>
  INDUSTRIES.map((industry) => ({ industry: industry.id }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> => {
  const { industry } = await params;
  const page = INDUSTRIES.find((item) => item.id === industry);
  if (!page) return { title: 'Industry Not Found' };
  return {
    title: `${page.name} Digital Marketing | Qognition`,
    description: page.description,
    alternates: { canonical: `/industries/${page.id}` },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: industrySlug } = await params;
  const industry = INDUSTRIES.find((item) => item.id === industrySlug);
  if (!industry) notFound();

  const path = `/industries/${industry.id}`;
  const relatedServices = SERVICES.filter((service) =>
    industry.relatedServices?.includes(service.id)
  ).slice(0, 6);
  const relatedCaseStudy =
    CASE_STUDIES.find((study) => study.id === industry.caseStudyRef) || CASE_STUDIES[0];

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
                url: 'https://qognition.com',
              },
              serviceType: 'Industry Digital Marketing',
              url: `https://qognition.com${path}`,
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
              <p className="text-xl text-[var(--text-muted)] leading-relaxed mb-12 border-l-2 border-[var(--accent)] pl-6">
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
                <p className="text-[var(--text-muted)] mb-5">
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
                          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-1">
                            The Problem
                          </p>
                          <p className="text-[var(--text-muted)] text-sm leading-relaxed">{pain}</p>
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
                        <h3 className="font-semibold text-[var(--text)] mb-2">
                          {service.title.replace('Web Development', 'Web Design')}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
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
                        <h3 className="font-semibold text-[var(--text)] mb-2">{faq.question}</h3>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
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
                <div>
                  <Heading level="h3" className="text-base mb-3">Case Study Reference</Heading>
                  {relatedCaseStudy && (
                    <Link
                      href={`/case-studies/${relatedCaseStudy.id}`}
                      className="block p-4 border border-[var(--border)] rounded-xl hover:border-[var(--accent)]/40 transition-all"
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
                        {relatedCaseStudy.industry}
                      </p>
                      <h4 className="font-semibold text-[var(--text)] mb-1">
                        {relatedCaseStudy.client}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)]">
                        {relatedCaseStudy.summary || relatedCaseStudy.title}
                      </p>
                    </Link>
                  )}
                </div>

                <div>
                  <Heading level="h3" className="text-base mb-3">Internal Links</Heading>
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
                  href="https://cal.com/hello-qognitionagency/30min"
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
      </main>
    </>
  );
}
