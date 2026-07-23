import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICE_SUB_PAGES, getServiceSubPage } from '../../../../data/seoExpansion';
import { SERVICES } from '../../../../data/services';
import { breadcrumbSchema, faqSchema } from '../../../../lib/schema';
import Heading from '../../../../components/ui/Heading';
import Badge from '../../../../components/ui/Badge';

export const dynamicParams = false;

export const generateStaticParams = () =>
  SERVICE_SUB_PAGES.map((page) => ({
    service: page.serviceId,
    subService: page.slug,
  }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ service: string; subService: string }>;
}): Promise<Metadata> => {
  const { service, subService } = await params;
  const page = getServiceSubPage(service, subService);
  if (!page) return { title: 'Service Page Not Found', description: 'Service page not found.', robots: { index: false } };
  return { title: page.title, description: page.description, alternates: { canonical: `/services/${page.serviceId}/${page.slug}` } };
};

export default async function Page({ params }: { params: Promise<{ service: string; subService: string }> }) {
  const { service, subService } = await params;
  const page = getServiceSubPage(service, subService);
  const parent = SERVICES.find((item) => item.id === service);
  if (!page || !parent) notFound();

  const path = `/services/${page.serviceId}/${page.slug}`;
  const siblingPages = SERVICE_SUB_PAGES.filter(
    (item) => item.serviceId === page.serviceId && item.slug !== page.slug
  ).slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: page.title,
              description: page.description,
              provider: { '@type': 'Organization', name: 'Qognition', url: 'https://qognition.com' },
              serviceType: page.title,
              url: `https://qognition.com${path}`,
            },
            ...(page.faqs?.length ? [faqSchema(page.faqs)] : []),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: parent.title, path: `/services/${parent.id}` },
              { name: page.title, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href={`/services/${parent.id}`}
            className="text-xs uppercase tracking-widest text-[var(--accent)] hover:text-[var(--text)] transition-colors"
          >
            {parent.title}
          </Link>
          <Heading level="h1" className="mt-6 mb-6">{page.h1}</Heading>
          <p className="text-body text-[var(--text-muted)] max-w-4xl">{page.intro}</p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              `Quick summary: ${page.title} should connect strategy, execution, tracking, and proof to a measurable lead or revenue outcome.`,
              `Qognition builds this as part of a wider ${parent.title} system, not as an isolated tactic or thin SEO page.`,
              'The page includes service schema, FAQ schema, breadcrumbs, related links, and useful content in the HTML before JavaScript runs.',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-5 text-sm leading-relaxed text-[var(--text-muted)]"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="sticky top-28 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
                <Heading level="h2" className="mb-6">Deliverables</Heading>
                <div className="space-y-4">
                  {page.deliverables.map((item) => (
                    <div key={item} className="flex gap-3 text-[var(--text-muted)]">
                      <CheckCircle2 className="text-[var(--accent)] shrink-0 mt-0.5" size={18} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-12">
              {page.sections.map((section) => (
                <section key={section.title} className="border-b border-[var(--border)] pb-10 last:border-0">
                  <Heading level="h2" className="mb-5">{section.title}</Heading>
                  <p className="text-body text-[var(--text-muted)]">{section.content}</p>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Heading level="h2" className="mb-8">Common Questions</Heading>
              <div className="space-y-4">
                {page.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5"
                  >
                    <h3 className="text-h3 text-[var(--text)] mb-3 font-semibold">{faq.question}</h3>
                    <p className="text-body text-[var(--text-muted)]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-8">
              <Heading level="h2" className="mb-6">Related Growth Paths</Heading>
              <div className="space-y-3">
                {page.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--accent)]/40 transition-all"
                  >
                    <span className="text-[var(--text-muted)]">{link.label}</span>
                    <ArrowRight size={18} className="text-[var(--accent)]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {siblingPages.length > 0 && (
            <div className="mt-20 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
              <Heading level="h2" className="mb-6">More {parent.title} Sub-Services</Heading>
              <p className="text-body text-[var(--text-muted)] mb-6">
                Internal links help buyers understand how this service fits inside the wider AI growth marketing system.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {siblingPages.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={`/services/${sibling.serviceId}/${sibling.slug}`}
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--text)] transition-all"
                  >
                    {sibling.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
