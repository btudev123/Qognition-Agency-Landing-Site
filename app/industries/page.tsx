import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES } from '../../data/industries';
import { SERVICES } from '../../data/services';
import { ICP_INDUSTRIES } from '../../data/b2b/icp';
import { breadcrumbSchema } from '../../lib/schema';
import { metadataFor } from '../../lib/seo';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

// Title and description come from SEO_OVERRIDES['/industries'] in lib/seo.ts.
export const metadata: Metadata = metadataFor({
  title: 'Industries | Qognition',
  description:
    'Industry-specific AI growth marketing pages for SEO, PPC, web design, AI visibility, social, branding, and creative.',
  path: '/industries',
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Industries Qognition Serves',
              description:
                'Industry-specific AI growth marketing pages for SEO, PPC, web design, AI visibility, social, branding, and creative.',
              url: 'https://www.qognitionagency.com/industries',
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Industries', path: '/industries' },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Industries</Badge>
            <Heading level="h1" className="mb-4">Industries We Serve</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-2xl mx-auto">
              AI growth marketing by buyer journey, compliance pressure, local demand, sales cycle, and proof requirements.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {[
              'Each industry page maps pain points, verticals, services, case studies, FAQs, and internal links into one useful decision cluster.',
              'We focus on qualified demand, not vanity traffic, so the content speaks to founders, CMOs, operators, and revenue teams.',
              'Industry pages connect to services, locations, tools, resources, and case studies for Google, Bing, and AI discovery.',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 text-sm leading-relaxed text-[var(--text-muted)]"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8 mb-14">
            <Heading level="h2" className="mb-4">Core Services Across Industries</Heading>
            <div className="flex flex-wrap gap-3">
              {SERVICES.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-all"
                >
                  {service.title.replace('Web Development', 'Web Design')}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INDUSTRIES.map((industry) => (
              <article
                key={industry.id}
                className="p-8 border border-[var(--border)] rounded-2xl bg-[var(--card-bg)] hover:border-[var(--accent)]/40 transition-colors"
              >
                <Heading level="h2" className="mb-4">
                  <Link href={`/industries/${industry.id}`} className="hover:text-[var(--accent)] transition-colors">
                    {industry.name}
                  </Link>
                </Heading>
                <p className="text-body text-[var(--text-muted)] mb-6">{industry.description}</p>

                <div className="mb-6">
                  <p className="text-meta font-semibold uppercase text-[var(--accent)] mb-3">
                    Specialist Verticals
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {industry.subIndustries.slice(0, 6).map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/industries/${industry.id}/${sub.slug}`}
                        className="px-3 py-1 bg-[var(--surface)] border border-[var(--border)] rounded-full text-sm text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {industry.painPoints && industry.painPoints.length > 0 && (
                  <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {industry.painPoints.slice(0, 2).map((pain) => (
                      <div
                        key={pain}
                        className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-[var(--text-muted)]"
                      >
                        {pain}
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href={`/industries/${industry.id}`}
                  className="inline-flex items-center gap-2 text-[var(--text)] text-sm font-medium hover:text-[var(--accent)] transition-colors"
                >
                  View sector strategy <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </Section>

        {/* THE ENTRY POINT FOR THE ICP TAXONOMY.
          *
          * Appended, never woven into the grid above. Every existing card, link,
          * heading and meta tag on this page is untouched, which is the
          * operator's standing constraint.
          *
          * This one section is what the whole 21/341/2,376/8,823 tree hangs on.
          * Both ADR-0007 §12 and ADR-0008 §7.4 recorded it as blocked on an
          * operator decision, because without it every page in the family is an
          * orphan: check-b2b.cjs deliberately forbids navigation.ts and
          * CrossLinks.tsx from importing the spine, so nothing else can link them.
          *
          * A link here is not a publication. Each target renders only when its
          * own entity is promoted and its body authored; until then it 404s, and
          * scripts/check-icp.cjs holds the published count at zero. So this
          * section can ship before a single page exists, and the links light up
          * as the waves land.
          */}
        <Section spacing="lg">
          <div className="mb-10">
            <Heading level="h2" className="mb-3">The B2B sectors we sell to</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-3xl">
              Twenty-one sectors, {ICP_INDUSTRIES.reduce((n, i) => n + i.sub_industries.length, 0)}{' '}
              sub-sectors. Listing a sector says we sell AI search, SEO and paid media into it. It is
              not a claim that we have worked with a firm in it, and a sector that is not listed is
              not a disqualifier.
            </p>
          </div>
          <ul className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7">
            {ICP_INDUSTRIES.map((industry) => (
              <li key={industry.id} className="min-w-0">
                <Heading level="h3" className="mb-2">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    {industry.name}
                  </Link>
                </Heading>
                <p className="text-meta text-[var(--text-muted)] m-0">
                  {industry.sub_industries.slice(0, 4).map((sub) => sub.name).join(' · ')}
                  {industry.sub_industries.length > 4
                    ? ` and ${industry.sub_industries.length - 4} more`
                    : ''}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section spacing="lg">
          <div className="max-w-xl mx-auto text-center">
            <Heading level="h2" className="mb-3">Need a market-specific plan?</Heading>
            <p className="text-body text-[var(--text-muted)] mb-8">
              Bring your industry, location, offer, sales cycle, and current traffic. We will map the fastest route to qualified demand.
            </p>
            <a
              href="https://api.leadconnectorhq.com/widget/bookings/discovery-call-qognition-agency"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-6 py-3 text-sm font-medium bg-[var(--accent)] text-[var(--accent-deep)] rounded-lg hover:brightness-110 transition-all"
            >
              Book a Strategy Call
            </a>
          </div>
        </Section>
      </main>
    </>
  );
}
