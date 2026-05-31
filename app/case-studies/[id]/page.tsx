import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CASE_STUDIES } from '../../../data/work';
import { breadcrumbSchema } from '../../../lib/schema';
import { SITE_URL } from '../../../lib/seo';
import Heading from '../../../components/ui/Heading';
import Badge from '../../../components/ui/Badge';

export const dynamicParams = false;

export const generateStaticParams = () => CASE_STUDIES.map((study) => ({ id: study.id }));

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
  const { id } = await params;
  const study = CASE_STUDIES.find((item) => item.id === id);
  if (!study) return { title: 'Case Study Not Found', description: 'Case study not found.', robots: { index: false } };
  return {
    title: `${study.title} | Case Study | Qognition`,
    description: `${study.title} — ${study.client} case study. See how Qognition delivered measurable results with ${study.stats.map((s) => `${s.value} ${s.label}`).join(', ')}.`,
    alternates: { canonical: `/case-studies/${study.id}` },
    openGraph: { images: [study.image] },
  };
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const study = CASE_STUDIES.find((item) => item.id === id);
  if (!study) notFound();

  const path = `/case-studies/${study.id}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: study.title,
              image: study.image,
              author: { '@type': 'Organization', name: 'Qognition', url: SITE_URL },
              publisher: { '@type': 'Organization', name: 'Qognition', url: SITE_URL },
              url: `${SITE_URL}${path}`,
              ...(study.testimonial
                ? {
                    review: {
                      '@type': 'Review',
                      reviewBody: study.testimonial.quote,
                      author: { '@type': 'Person', name: study.testimonial.author, jobTitle: study.testimonial.role },
                    },
                  }
                : {}),
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Case Studies', path: '/case-studies' },
              { name: study.title, path },
            ]),
          ]),
        }}
      />
      <article className="min-h-screen pt-24 md:pt-32 pb-20">
        {/* Header */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16 md:mb-24">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span className="uppercase tracking-widest text-xs font-bold text-[var(--accent)]">{study.industry}</span>
              </div>
              <Heading level="h1" className="mb-8 !text-4xl md:!text-7xl lg:!text-8xl !leading-none">
                {study.title}
              </Heading>
            </div>
            <div className="lg:col-span-4 lg:mb-4">
              <p className="text-xl text-[var(--text-muted)] border-l border-[var(--accent)]/30 pl-6">
                {study.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {study.image && (
          <div className="px-4 md:px-12 max-w-[1920px] mx-auto mb-24 md:mb-32">
            <div className="rounded-2xl overflow-hidden">
              <img src={study.image} alt={study.title} className="w-full aspect-[21/9] object-cover" />
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-32">
          {/* Sidebar */}
          <aside className="md:col-span-4 space-y-12">
            <div className="p-8 border border-[var(--border)] bg-[var(--card-bg)] rounded-2xl sticky top-32">
              <Heading level="h3" className="mb-8">Key Metrics</Heading>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4 md:gap-6">
                {study.stats.map((stat, i) => (
                  <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <div className="text-3xl lg:text-4xl font-bold text-[var(--accent)] mb-2 break-words">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] leading-relaxed break-words">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {study.tags.length > 0 && (
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">Services Provided</h4>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[var(--ink)]/5 border border-[var(--border)] rounded-full text-sm text-[var(--text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 border border-[var(--border)] rounded-xl bg-[var(--card-bg)]">
              <h4 className="font-bold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-3">Timeline</h4>
              <p className="text-2xl font-semibold text-[var(--text)] mb-6">{study.timeline || '120 days'}</p>
              <h4 className="font-bold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-3">ROI Signal</h4>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{study.roi}</p>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-8 space-y-16">
            {/* Challenge */}
            <section>
              <Heading level="h2" className="mb-6">The Challenge</Heading>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed">{study.challenge}</p>
            </section>

            {/* Solution */}
            <section>
              <Heading level="h2" className="mb-6">Our Solution</Heading>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">{study.solution}</p>
              <ul className="space-y-4">
                {(study.implementation || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[var(--accent)] mt-1 shrink-0" size={20} />
                    <span className="text-[var(--text-muted)]">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Before vs After */}
            {study.beforeAfter && study.beforeAfter.length > 0 && (
              <section>
                <Heading level="h2" className="mb-8">Before vs After</Heading>
                <div className="space-y-5">
                  {study.beforeAfter.map((row) => (
                    <div key={row.before} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 border border-[var(--border)] rounded-xl bg-[var(--card-bg)]">
                        <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">Before</div>
                        <p className="text-[var(--text-muted)] leading-relaxed">{row.before}</p>
                      </div>
                      <div className="p-5 border border-[var(--accent)]/20 rounded-xl bg-[rgba(var(--accent-rgb),0.05)]">
                        <div className="text-xs uppercase tracking-widest text-[var(--accent)] mb-3">After</div>
                        <p className="text-[var(--text)] leading-relaxed">{row.after}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Funnel Stages */}
            {study.funnelStages && study.funnelStages.length > 0 && (
              <section>
                <Heading level="h2" className="mb-8">Funnel Journey</Heading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {study.funnelStages.map((stage) => (
                    <div key={stage.stage} className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                      <Heading level="h3" className="mb-4 !text-[var(--accent)]">{stage.stage}</Heading>
                      <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">Before</p>
                      <p className="text-sm text-[var(--text-muted)] mb-5">{stage.before}</p>
                      <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">After</p>
                      <p className="text-sm text-[var(--text)]">{stage.after}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Analytics */}
            {study.analytics && study.analytics.length > 0 && (
              <section>
                <Heading level="h2" className="mb-8">Analytics Visuals</Heading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {study.analytics.map((metric) => (
                    <div key={metric.label} className="p-6 border border-[var(--border)] rounded-xl bg-[var(--card-bg)]">
                      <div className="text-4xl font-semibold text-[var(--text)] mb-2">{metric.value}</div>
                      <div className="text-sm uppercase tracking-widest text-[var(--accent)] mb-4">{metric.label}</div>
                      <div className="h-2 w-full rounded-full bg-[var(--ink)]/10 mb-4 overflow-hidden">
                        <div className="h-full w-3/4 rounded-full bg-[var(--accent)]" />
                      </div>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{metric.note}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Client Journey */}
            {study.clientJourney && study.clientJourney.length > 0 && (
              <section>
                <Heading level="h2" className="mb-8">Client Journey</Heading>
                <div className="space-y-4">
                  {study.clientJourney.map((step, index) => (
                    <div key={step} className="flex gap-5 border-l border-[var(--border)] pl-6 py-2">
                      <span className="font-mono text-[var(--accent)] text-sm">0{index + 1}</span>
                      <p className="text-[var(--text-muted)] leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Content Sections */}
            {study.contentSections?.map((section) => (
              <section key={section.title}>
                <Heading level="h2" className="mb-6">{section.title}</Heading>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed">{section.content}</p>
              </section>
            ))}

            {/* Testimonial */}
            <section className="bg-[rgba(var(--accent-rgb),0.04)] p-8 md:p-12 rounded-2xl border border-[var(--accent)]/10 my-8">
              <Heading level="h3" className="mb-4 !text-[var(--accent)]">The Impact</Heading>
              <p className="text-xl md:text-2xl text-[var(--text)] leading-relaxed">
                &ldquo;{study.testimonial?.quote || "Qognition didn't just build a website; they built a growth engine."}&rdquo;
              </p>
              <div className="mt-6 text-sm text-[var(--text-muted)] font-bold uppercase tracking-wider">
                &mdash; {study.testimonial?.author || 'VP of Marketing'}, {study.testimonial?.role || study.client}
              </div>
            </section>

            {/* Results */}
            {study.results && study.results.length > 0 && (
              <section>
                <Heading level="h2" className="mb-6">Results</Heading>
                <ul className="space-y-4">
                  {study.results.map((result) => (
                    <li key={result} className="flex items-start gap-3">
                      <CheckCircle2 className="text-[var(--accent)] mt-1 shrink-0" size={20} />
                      <span className="text-[var(--text-muted)]">{result}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Bottom CTA */}
            <div className="pt-12 border-t border-[var(--border)]">
              <Heading level="h3" className="mb-6">Ready for similar results?</Heading>
              <a
                href="https://cal.com/hello-qognitionagency/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-6 py-3 hover:brightness-110 transition-all text-sm"
              >
                Schedule Strategy Call <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Next Project */}
        <div className="border-t border-[var(--border)]">
          <Link
            href="/case-studies"
            className="block py-24 px-6 md:px-12 hover:bg-[var(--ink)]/5 transition-colors group"
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <span className="text-sm text-[var(--text-muted)] uppercase tracking-widest mb-2 block">View More</span>
                <span className="text-4xl md:text-6xl font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  View All Case Studies
                </span>
              </div>
              <div className="w-16 h-16 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--ink)] group-hover:text-[var(--bg)] transition-all">
                <ArrowRight size={24} />
              </div>
            </div>
          </Link>
        </div>
      </article>
    </>
  );
}
