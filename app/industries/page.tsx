import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES } from '../../data/industries';
import { SERVICES } from '../../data/services';
import { icpIndustryCards, icpSubIndustryTotal, publishedIcpPaths } from '../../data/b2b/icp';
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
  /* Bound once per render, not once per row. Empty today and it stays empty
     until an operator promotion, which is why all 21 sectors below render as
     text. See the note above the list. */
  const publishedSectors = new Set(publishedIcpPaths());

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
              Digital marketing by industry, built for B2B. AI SEO, GEO, SEO and PPC, written to the way your buyer decides: a software evaluation, an RFQ, a regulated purchase or a specialist consultation.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {[
              'We write to your buyer’s decision: the spec an engineer checks, the integration an IT lead needs, the expertise a CFO looks for.',
              'The pages speak to the people your sales team wants to meet, and we judge them on qualified enquiries, not traffic.',
              'Industry pages show questions their buyers might ask an AI tool, so you can run them yourself.',
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
            <Heading level="h2" className="mb-3">Built for specialist B2B businesses</Heading>
            {/* The not-a-claim-of-experience disclosure is part of this paragraph
                (CLAUDE.md §11). It replaces the separate meta line that said it. */}
            <p className="text-body text-[var(--text-muted)] max-w-3xl">
              We sell AI SEO, GEO, SEO and PPC into every sector below. A name becomes a link once its page has been written and reviewed. Listing a sector is not a claim that we have worked with a firm in it, and a sector that isn&apos;t listed is no reason to stay away.
            </p>
          </div>
          {/* A NAME IS NOT A LINK UNTIL THERE IS A PAGE.
            *
            * Shipped first as 21 unconditional anchors. Nadia fetched all 21 on a
            * running server: 20 returned a hard 404, because `dynamicParams` is
            * false on the industry route and no ICP entity is published, and
            * `/industries/financial-services` returned 200 and rendered the
            * LEGACY industry page underneath this section's ICP name and
            * sub-sector list. Twenty dead links and one mislabelled one, in the
            * global crawl path, on a domain that already has 683 URLs sitting at
            * "crawled, currently not indexed". That is the opposite of the
            * reason this section was added.
            *
            * So the sector is always NAMED and is linked only when its path is
            * published. The list is a statement of where we sell, and that is
            * true before a page exists; the anchor appears the moment the entity
            * is promoted, with no edit here.
            *
            * FINANCIAL SERVICES IS DECIDED RATHER THAN EXCEPTED. ICP industry 04
            * has slug `financial-services` and so does a live, indexed row in
            * data/industries.ts. Legacy owns that URL and keeps it, so
            * `resolveIcp(['financial-services'])` returns undefined permanently
            * and the slug can never enter `publishedIcpPaths()`. It therefore
            * renders as text like the other 20, and it must: the legacy page is
            * about wealth management and mutual funds, and pointing this card at
            * it would put two different contents under one entity name, which is
            * the entity-resolution defect that costs a citation. The uniform rule
            * produces the right outcome here; `scripts/check-icp.cjs` asserts
            * that outcome rather than excepting the collision, so if the operator
            * ever re-points the legacy hub the gate says so.
            *
            * The set is bound once, not per row: 21 lookups against one Set, not
            * 21 array scans. */}
          <ul className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7">
            {icpIndustryCards().map((industry) => (
              <li key={industry.id} className="min-w-0">
                <Heading level="h3" className="mb-2">
                  {publishedSectors.has(industry.slug) ? (
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      {industry.name}
                    </Link>
                  ) : (
                    industry.name
                  )}
                </Heading>
                <p className="text-meta text-[var(--text-muted)] m-0">
                  {industry.subNames.join(' · ')}
                  {industry.subCount > 4 ? ` and ${industry.subCount - 4} more` : ''}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section spacing="lg">
          <div className="max-w-xl mx-auto text-center">
            <Heading level="h2" className="mb-3">Ask AI who to hire in your industry. Then talk to us.</Heading>
            <p className="text-body text-[var(--text-muted)] mb-8">
              Bring your industry, your markets, your sales cycle and the buyers you want to reach. We&apos;ll tell you what we would check first.
            </p>
            <a
              href="/book"
              className="inline-flex px-6 py-3 text-sm font-medium bg-[var(--accent)] text-[var(--accent-deep)] rounded-lg hover:brightness-110 transition-all"
            >
              Book a call
            </a>
          </div>
        </Section>
      </main>
    </>
  );
}
