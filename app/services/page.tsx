import type { Metadata } from 'next';
import Link from 'next/link';
import AIPlatforms from '../../components/shared/AIPlatforms';
import { GROWTH_PILLARS } from '../../data/growthPositioning';
import { metadataFor } from '../../lib/seo';
// Title and description come from SEO_OVERRIDES['/services'] in lib/seo.ts.
export const metadata: Metadata = metadataFor({ title: 'Digital Marketing Services', description: 'Digital marketing services for B2B companies.', path: '/services' });

/* The seven priority service pages (docs/copy/2026-10/services.md). Card titles
   are Nadia's keyword anchors (docs/strategy/2026-10/02-search-sprint.md §3.1):
   keep them as written. No "B2B" before "marketing" on this page; "b2b marketing
   agency" is a white-label string no page targets (CLAUDE.md, 2026-09-29).

   Rendered on growth-plain-grid rather than growth-pillar-grid: the pillar grid's
   seams in app/growth.css assume exactly four cells, and that file is frozen by
   check-niche-journeys. */
const SERVICE_GRID = [
  {
    number: '01', title: 'AI SEO and GEO', href: '/services/ai-seo',
    description: 'How Google AI Overviews, AI Mode and assistants such as ChatGPT, Perplexity, Gemini, Claude and Copilot describe your firm. Entity work, answer-ready pages and dated prompt tracking.',
    links: [
      { label: 'GEO for assistants', href: '/services/ai-seo/generative-engine-optimization' },
      { label: 'AEO for AI Overviews', href: '/services/ai-seo/answer-engine-optimization' },
    ],
  },
  {
    number: '02', title: 'B2B SEO services', href: '/services/seo',
    description: 'Technical SEO, commercial pages and authority work for Google search results. Measured against qualified enquiries, not traffic.',
    links: [
      { label: 'Local SEO', href: '/services/seo/local-seo' },
      { label: 'Technical SEO', href: '/services/seo/technical-seo' },
    ],
  },
  {
    number: '03', title: 'B2B PPC management', href: '/services/ppc',
    description: 'Google Ads and LinkedIn campaigns, judged on qualified enquiries and booked meetings. Scoped and priced separately.',
    links: [],
  },
  {
    number: '04', title: 'B2B content marketing services', href: '/services/content',
    description: 'Service pages, comparisons and expert guides written to rank in Google and to be quotable in AI answers.',
    links: [],
  },
  {
    number: '05', title: 'B2B web design and development', href: '/services/web-development',
    description: 'Fast, accessible sites with clear buyer journeys and conversion tracking, so search work has somewhere to land.',
    links: [],
  },
  {
    number: '06', title: 'B2B branding and creative', href: '/services/branding-creative',
    description: 'Messaging and sales assets that describe your firm the same way everywhere, on your site and off it.',
    links: [],
  },
  {
    number: '07', title: 'Conversion rate optimization and analytics', href: '/services/cro-analytics',
    description: 'Find where enquiries drop off, and track every step from the first visit to a booked call.',
    links: [],
  },
] as const;

export default function Page() {
  return (
    <main className="growth-shell growth-page">
      <p className="growth-eyebrow">AI SEO & GEO FOR B2B</p>
      <h1>Digital marketing services, led by AI SEO and GEO</h1>
      <p className="growth-page-intro">
        We run AI SEO and GEO for B2B companies, including SaaS. SEO and local SEO are the supporting layers, and B2B PPC runs alongside. Content, web development, branding and CRO support that work, and we scope them only where they move qualified enquiries.
      </p>
      <div className="growth-actions">
        <Link href="/book" className="growth-button">Book a call</Link>
        <Link href="/contact#enquiry" className="growth-text-link">Send an enquiry →</Link>
      </div>
      <AIPlatforms />

      <section className="growth-page-section" aria-label="Services">
        <div className="growth-plain-grid">
          {SERVICE_GRID.map((s) => (
            <article className="growth-plain-card" key={s.href}>
              <p className="growth-eyebrow">{s.number}</p>
              <h2><Link href={s.href}>{s.title}</Link></h2>
              <p>{s.description}</p>
              {s.links.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-x-6">
                  {s.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="growth-text-link">{l.label} →</Link>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Demoted below the service grid (Nadia §3.3). All four pillars stay:
          dropping ABM and Revenue Systems is operator decision D7, not taken. */}
      <section className="growth-page-section">
        <h2>Longer guides</h2>
        <div className="growth-pillar-grid">
          {GROWTH_PILLARS.map((p) => (
            <article className="growth-pillar" key={p.slug}>
              <p className="growth-eyebrow">{p.number}</p>
              <h3><Link href={p.href}>{p.name}</Link></h3>
              <p className="growth-pillar-outcome">{p.outcome}</p>
              <p>{p.description}</p>
              <ul>{p.services.map((s) => <li key={s}>{s}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="growth-page-section">
        <h2>Choose the right starting point.</h2>
        <div className="growth-plain-grid">
          <article className="growth-plain-card">
            <h3>Add to an existing team</h3>
            <p>Add specialist AI SEO, GEO and technical SEO capacity beside your marketing team or current agency. The proposal names who owns each task and who approves content.</p>
          </article>
          <article className="growth-plain-card">
            <h3>Start with one layer</h3>
            <p>Start with the layer you need: AI search, SEO or PPC. On the call, we will tell you if another layer is holding it back.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
