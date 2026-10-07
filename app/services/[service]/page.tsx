import { appendFunnelContext } from '../../../lib/funnelContext';
import AIPlatforms from '../../../components/shared/AIPlatforms';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BarChart, CheckCircle, CheckCircle2, Layers, Quote } from 'lucide-react';
import { SERVICE_SUB_PAGES } from '../../../data/seoExpansion';
import { INDUSTRIES } from '../../../data/industries';
import { SERVICES } from '../../../data/services';
import { PROMISE_CHIPS } from '../../../data/servicePromises';
import { servicePageFor } from '../../../data/servicePages';
import ServiceLanding from '../../../components/services/ServiceLanding';
import { getServiceMetadata, h1For } from '../../../lib/seo';
import { breadcrumbSchema, faqSchema, serviceCategorySchema } from '../../../lib/schema';
import Heading from '../../../components/ui/Heading';
import IconTile from '../../../components/visual/IconTile';
import CrossLinks from '../../../components/shared/CrossLinks';
import FunnelCTA from '../../../components/shared/FunnelCTA';

export const dynamicParams = false;

export const generateStaticParams = () => SERVICES.map((service) => ({ service: service.id }));

export const generateMetadata = async ({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> => {
  const { service } = await params;
  return getServiceMetadata(service);
};

const subServiceSlug = (sub: { name: string; slug?: string }) =>
  sub.slug || sub.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service: serviceSlug } = await params;
  const service = SERVICES.find((item) => item.id === serviceSlug);
  if (!service) notFound();

  const path = `/services/${service.id}`;
  const h1 = h1For(path, service.title.replace('Web Development', 'Web Design'));

  /* The five plain-English pages (data/servicePages.ts). Same metadata, H1, URL and
     canonical as before; the body is the new layout and the FAQ JSON-LD is built from
     the same strings the page renders. */
  const landing = servicePageFor(path);
  if (landing) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              serviceCategorySchema(service),
              faqSchema(landing.faqs.map((f) => ({ question: f.question, answer: f.answer }))),
              breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: service.title, path },
              ]),
            ]),
          }}
        />
        <ServiceLanding
          path={path}
          h1={h1}
          content={landing}
          serviceTitle={service.title}
          trail={[{ name: 'Services', href: '/services' }]}
        />
      </>
    );
  }

  const serviceSubPages = SERVICE_SUB_PAGES.filter((page) => page.serviceId === service.id);
  const relatedIndustries = INDUSTRIES.filter((industry) =>
    service.relatedIndustries.some((name) => industry.name.toLowerCase().includes(name.toLowerCase().split(' ')[0]))
  ).slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceCategorySchema(service),
            ...(service.faqs?.length ? [faqSchema(service.faqs)] : []),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: service.title, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] mb-12 text-sm transition-colors"
        >
          <ArrowLeft size={16} /> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <article className="lg:col-span-8">
            {/* Visual banner — swap the background for a stock/brand image when chosen */}
            <div
              className="mb-12 rounded-2xl h-44 sm:h-56 relative overflow-hidden border border-[var(--border)]"
              style={{
                background:
                  'radial-gradient(ellipse at 20% 20%, rgba(20,184,166,0.35), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(15,118,110,0.3), transparent 55%), linear-gradient(135deg, #0a0a0a, #111)',
              }}
            >
              <div className="absolute inset-0 flex items-end p-6 sm:p-8">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
                  {service.kpis.join(' · ')}
                </span>
              </div>
            </div>
            <header className="mb-12">
              <Heading level="h1" className="mb-8">
                {h1}
              </Heading>
              <p className="text-body text-[var(--text-muted)] mb-8 border-l-2 border-[var(--accent)] pl-6">
                {service.fullDescription}
              </p>
              {/* First CTA above the fold. The aside stacks after the article on
                  mobile (docs/copy/2026-10/services-template.md). */}
              <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={appendFunnelContext('/book', { page_id: path, service_id: service.id, stage: 'bofu' })}
                  className="rf-btn rf-btn--primary"
                >
                  Book a call
                </a>
                <Link href="/free-ai-audit" className="text-body text-[var(--accent-deep)] underline underline-offset-2">
                  Request a free AI visibility audit
                </Link>
              </div>
              <AIPlatforms compact />
            </header>

            <ul
              className="list-none p-0 m-0 mb-16 grid grid-cols-1 md:grid-cols-3 [&>*]:border-t [&>*]:border-l [&>*]:border-[var(--s-rule-hairline)]"
              style={{ borderRight: '1px solid var(--s-rule-hairline)', borderBottom: '1px solid var(--s-rule-hairline)' }}
            >
              {PROMISE_CHIPS.map((chip) => (
                <li key={chip.label} className="flex items-center gap-4 p-4">
                  <IconTile icon={chip.icon} size={24} />
                  <span className="text-h4 font-sans font-medium min-w-0">{chip.label}</span>
                </li>
              ))}
            </ul>

            {service.expertQuote && (
              <section className="my-16 p-8 md:p-10 border border-[var(--border)] bg-[var(--card-bg)] rounded-2xl relative overflow-hidden">
                <Quote size={80} className="absolute top-4 right-4 text-[var(--accent)]/10 rotate-180" />
                <blockquote className="relative z-10">
                  <p className="text-body italic mb-8 text-[var(--text)]">
                    &ldquo;{service.expertQuote.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                      style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-fg)' }}
                    >
                      {service.expertQuote.author.charAt(0)}
                    </div>
                    <div>
                      <cite className="not-italic font-semibold block text-[var(--text)]">
                        {service.expertQuote.author}
                      </cite>
                      <span className="text-sm text-[var(--accent)]">{service.expertQuote.role}</span>
                    </div>
                  </footer>
                </blockquote>
              </section>
            )}

            {service.deepDive && (
              <div className="space-y-12 mb-16">
                {service.deepDive.map((section) => (
                  <section key={section.title}>
                    <Heading level="h2" className="mb-4">{section.title}</Heading>
                    <p className="text-body text-[var(--text-muted)] whitespace-pre-wrap">
                      {section.content}
                      {section.link && (
                        <>
                          {' '}See{' '}
                          <Link href={section.link.href} className="text-[var(--accent-deep)] underline underline-offset-2">
                            {section.link.label}
                          </Link>
                          .
                        </>
                      )}
                    </p>
                  </section>
                ))}
              </div>
            )}

            <section className="mb-16">
              <Heading level="h2" className="mb-8 flex items-center gap-2">
                <Layers className="text-[var(--accent)]" /> Capabilities
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.subServices.map((sub) => (
                  <Link
                    key={sub.name}
                    href={`/services/${service.id}/${subServiceSlug(sub)}`}
                    className="group block p-6 border border-[var(--border)] bg-[var(--card-bg)] rounded-lg hover:border-[var(--accent)]/40 transition-colors"
                  >
                    <h3 className="text-h3 text-[var(--text)] mb-3 font-semibold">{sub.name}</h3>
                    <p className="text-body text-[var(--text-muted)]">{sub.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent)] group-hover:text-[var(--text)] transition-colors">
                      Explore sub-service <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {serviceSubPages.length > 0 && (
              <section className="mb-16 p-8 rounded-xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)]">
                <Heading level="h2" className="mb-5">Choose your service scope</Heading>
                <p className="text-body text-[var(--text-muted)] mb-6">
                  Each page below covers one part of the work: what it involves, what your team provides and how we measure it.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceSubPages.slice(0, 6).map((page) => (
                    <Link
                      key={page.slug}
                      href={`/services/${page.serviceId}/${page.slug}`}
                      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--text)] transition-all"
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-16">
              <Heading level="h2" className="mb-8">Our Process</Heading>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <div key={step.title} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-full border border-[var(--accent)]/30 flex items-center justify-center bg-[rgba(var(--accent-rgb),0.08)] shrink-0 text-[var(--accent)] font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-h3 text-[var(--text)] mb-2 font-semibold">{step.title}</h3>
                      <p className="text-body text-[var(--text-muted)]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <Heading level="h2" className="mb-8">Tech Stack</Heading>
              <div className="flex flex-wrap gap-3">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 border border-[var(--border)] bg-[var(--card-bg)] rounded-full text-sm text-[var(--text-muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-16 p-8 border border-[var(--border)] bg-[var(--surface)] rounded-xl">
              <Heading level="h2" className="mb-6">Explore your industry</Heading>
              <div className="flex flex-wrap gap-4">
                {(relatedIndustries.length ? relatedIndustries : INDUSTRIES.slice(0, 6)).map((industry) => (
                  <Link
                    key={industry.id}
                    href={`/industries/${industry.id}`}
                    className="text-[var(--accent)] border-b border-[var(--accent)]/30 hover:text-[var(--text)] transition-colors"
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <Heading level="h2" className="mb-8">Common Questions</Heading>
              <div className="space-y-4">
                {service.faqs.map((faq) => (
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
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 p-8 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl">
              <h2 className="text-h2 text-[var(--text)] mb-6 flex items-center gap-2 font-semibold">
                <BarChart className="text-[var(--accent)]" size={20} /> What we measure
              </h2>
              <div className="space-y-6 mb-8">
                {service.kpis.map((kpi) => (
                  <div key={kpi} className="flex items-center gap-3 text-[var(--text)]">
                    <CheckCircle size={20} className="text-[var(--accent)] shrink-0" />
                    <span>{kpi}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--border)] pt-5 mb-8 space-y-3">
                <Link
                  href="/case-studies"
                  className="flex items-center justify-between text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  Examples and methodology <CheckCircle2 size={16} className="text-[var(--accent)]" />
                </Link>
                <Link
                  href="/locations"
                  className="flex items-center justify-between text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  Markets <CheckCircle2 size={16} className="text-[var(--accent)]" />
                </Link>
                <Link
                  href="/resources"
                  className="flex items-center justify-between text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  Guides and resources <CheckCircle2 size={16} className="text-[var(--accent)]" />
                </Link>
              </div>
              <p className="text-body text-[var(--text-muted)] mb-8 border-t border-[var(--border)] pt-4">
                Book a 30-minute call about {service.title}. Bring your website and the buyers you want to reach.
              </p>
              <a
                href={appendFunnelContext("/book", { page_id: path, service_id: service.id, stage: "bofu" })}
                className="rf-btn rf-btn--primary w-full"
              >
                Book a call
              </a>
              <Link href={appendFunnelContext("/contact#enquiry", { page_id: path, service_id: service.id, stage: "bofu" })} className="rf-btn rf-btn--secondary w-full mt-3">Send an enquiry</Link>
            </div>
          </aside>
        </div>
        <FunnelCTA stage="bofu" service={service.title} className="mt-16 mb-8" />
        <CrossLinks serviceId={service.id} exclude={{ type: 'service', id: service.id }} />
      </main>
    </>
  );
}
