import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Brain, Code, Globe, Palette, Search, Zap, Compass, FileText, Video, Mail, BarChart3, type LucideIcon } from 'lucide-react';
import { SERVICE_SUB_PAGES } from '../../data/seoExpansion';
import { SERVICES } from '../../data/services';
import { breadcrumbSchema } from '../../lib/schema';
import { metadataFor } from '../../lib/seo';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

// Title and description come from SEO_OVERRIDES['/services'] in lib/seo.ts.
export const metadata: Metadata = metadataFor({
  title: 'AI Growth Marketing Services | SEO, PPC, Web Design & AI Search',
  description: 'Qognition delivers SEO, AI search visibility, paid media, web design, content, and conversion strategy that turns attention into qualified leads.',
  path: '/services',
});

const IconMap: Record<string, LucideIcon> = {
  Search,
  Globe,
  Brain,
  Code,
  Zap,
  Palette,
  Compass,
  FileText,
  Video,
  Mail,
  BarChart3,
};

const subServiceSlug = (sub: { name: string; slug?: string }) =>
  sub.slug || sub.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Qognition',
              url: 'https://www.qognitionagency.com',
              knowsAbout: SERVICES.flatMap((service) => [service.title, ...service.subServices.map((sub) => sub.name)]),
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <Section spacing="lg">
          <div className="text-center">
            <Badge className="mb-6">AI Growth Marketing Partner</Badge>
            <Heading level="h1" className="mb-8">AI Growth Marketing Services</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-3xl mx-auto">
              Qognition helps companies get qualified leads through SEO, SMM, AI SEO, web design, PPC, branding, and creative systems that connect to measurable pipeline.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {[
              'Quick summary: we combine search, paid media, creative, web performance, and AI visibility into one growth operating system.',
              'Each service hub below links to focused sub-services with useful copy, FAQs, schema, and internal links.',
              'Book a strategy call when you want the shortest path from visibility to qualified opportunities.',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-5 text-sm leading-relaxed text-[var(--text-muted)]"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-body text-[var(--text-muted)] mb-8">
              Your buyers do not move through one channel. They search Google, compare agencies, read case studies, ask AI tools for options, check LinkedIn, and judge your website before they speak to sales. Qognition builds the connected system around that journey.
            </p>
            <p className="text-body text-[var(--text-muted)]">
              Use this page as the map: each service connects to sub-service pages, location pages, industry pages, case studies, resources, tools, and directory content so buyers can compare options and choose the right next step.{' '}
              <a href="mailto:hello@qognitionagency.com" className="text-[var(--accent)] hover:underline">Email hello@qognitionagency.com</a> or{' '}
              <a href="https://cal.com/qognition-agency/15min" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">book a strategy call</a>.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => {
              const IconComponent = IconMap[service.icon] || Search;
              const relatedSubPages = SERVICE_SUB_PAGES.filter((page) => page.serviceId === service.id).slice(0, 6);

              return (
                <article
                  key={service.id}
                  className="group h-full p-8 border border-[var(--border)] rounded-xl bg-[var(--card-bg)] relative overflow-hidden transition-colors hover:border-[var(--accent)]/40"
                >
                  <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--accent)]/0 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:bg-[var(--accent)]/15" />
                  <div className="mb-8 flex justify-between items-start relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-deep)] group-hover:border-[var(--accent)] transition-colors">
                      <IconComponent size={32} />
                    </div>
                    <ArrowRight size={18} className="text-[var(--accent)]" />
                  </div>
                  <h2 className="text-h2 text-[var(--text)] mb-4 group-hover:text-[var(--accent)] transition-colors font-semibold">
                    <Link href={`/services/${service.id}`}>{service.title.replace('Web Development', 'Web Design')}</Link>
                  </h2>
                  <p className="text-body text-[var(--text-muted)] mb-8">
                    {service.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.subServices.slice(0, 6).map((sub) => (
                      <Link
                        key={sub.name}
                        href={`/services/${service.id}/${subServiceSlug(sub)}`}
                        className="text-xs px-2 py-1 bg-[var(--surface)] border border-[var(--border)] rounded text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                  {relatedSubPages.length > 0 && (
                    <div className="sr-only">
                      {relatedSubPages.map((page) => (
                        <Link key={page.slug} href={`/services/${page.serviceId}/${page.slug}`}>
                          {page.title}
                        </Link>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`/services/${service.id}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent)] hover:text-[var(--text)] transition-colors"
                  >
                    View service <ArrowRight size={14} />
                  </Link>
                </article>
              );
            })}
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-[var(--border)] rounded-xl bg-[var(--card-bg)]">
              <Heading level="h2" className="mb-4 text-[var(--accent)]">AI Growth Partner</Heading>
              <p className="text-body text-[var(--text-muted)] mb-4">
                Strategy, engineering, SEO, content, creative, and paid media leadership work from one growth model, so every page and campaign has a clear job.
              </p>
              <Link href="/team" className="text-[var(--accent)] hover:underline">Meet the team</Link>
            </div>
            <div className="p-8 border border-[var(--border)] rounded-xl bg-[var(--card-bg)]">
              <Heading level="h2" className="mb-4 text-[var(--accent)]">Proof and Planning</Heading>
              <p className="text-body text-[var(--text-muted)] mb-4">
                Use our case studies, lead magnets, free tools, and location pages to see how the system fits your market before a call.
              </p>
              <Link href="/case-studies" className="text-[var(--accent)] hover:underline">View case studies</Link>
            </div>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="text-center">
            <p className="text-body text-[var(--text)] mb-8">Ready to turn visibility into pipeline?</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="https://cal.com/qognition-agency/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[var(--accent)] text-[var(--accent-deep)] rounded-lg hover:brightness-110 transition-all text-sm font-medium"
              >
                Book Strategy Call
              </a>
              <Link
                href="/lead-generation-roadmap"
                className="px-8 py-4 border border-[var(--border)] text-[var(--text)] rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all text-sm font-medium"
              >
                Lead Generation Roadmap
              </Link>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
