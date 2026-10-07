import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import Badge from '../ui/Badge';
import Heading from '../ui/Heading';
import Text from '../ui/Text';
import Breadcrumbs from './Breadcrumbs';
import CaseStudyCard from './CaseStudyCard';
import {
  B2B_CASE_STUDIES,
  B2B_SERVICE_LABEL,
  FUNNEL_STAGES,
  FUNNEL_STAGE_LABEL,
  b2bMarket,
  formatCount,
  formatWindow,
  type ResolvedB2BCaseStudy,
} from '../../data/case-studies';
import { breadcrumbSchema } from '../../lib/schema';
import { SITE_URL } from '../../lib/seo';

/**
 * The detail page for a named B2B programme (operator, 2026-10-07).
 *
 * Accent text, icons and the CTA fill use --accent-deep (#0F766E, 5.47:1 on white), never
 * --accent: app/tokens.css is not imported, so --accent is still #14B8A6 at 2.49:1 (CLAUDE.md §9).
 *
 * Reading order is the one a CEO needs on first read: who the client sells to, the problem,
 * what we did, the results with their dates and source, and the services used. Every section
 * renders from the record; nothing here is authored per page.
 *
 * Deliberately absent: a photograph (none is approved for these four), client quotes (none are
 * on file), Review or AggregateRating structured data (same reason), pipeline or deal values,
 * session growth and conversion rates (operator decision: see data/case-studies/b2b.ts).
 */

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mb-14 md:mb-20">
      <Heading level="h2" id={id} className="mb-5">
        {title}
      </Heading>
      {children}
    </section>
  );
}

/* Column spans per funnel stage, in FUNNEL_STAGES order. Phone (2 cols): the first stage
   spans the row, then 2 + 2. sm (6 cols): 2 + 2 + 2, then 3 + 3. lg (5 cols): one each. */
const STAGE_SPAN = [
  'col-span-2 sm:col-span-2 lg:col-span-1',
  'sm:col-span-2 lg:col-span-1',
  'sm:col-span-2 lg:col-span-1',
  'sm:col-span-3 lg:col-span-1',
  'sm:col-span-3 lg:col-span-1',
];

function FunnelResults({ study }: { study: ResolvedB2BCaseStudy }) {
  const window = formatWindow(study);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-meta font-semibold uppercase tracking-wide text-[var(--accent-deep)]">{window}</p>
        <Text className="mt-2 max-w-2xl">
          {study.source} Each stage follows from the one before it.
        </Text>
      </div>

      {/* A grid of figures, never a wide table (operator, 2026-10-07: "make it responsive").
          Two columns on a phone, 3 + 2 from sm, all five in one row from lg; STAGE_SPAN keeps
          every row full at every width, so the hairline fill never shows as an empty cell.
          gap-px over a --border fill draws the hairlines, so no cell needs its own border and
          nothing can push the row wider than its container. */}
      <dl
        aria-label={`${study.client} results, ${window}`}
        className="m-0 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-6 lg:grid-cols-5"
      >
        {FUNNEL_STAGES.map((stage, i) => (
          <div
            key={stage}
            className={`min-w-0 bg-[var(--surface)] p-4 ${STAGE_SPAN[i]}`}
          >
            {/* Sentence case, not uppercase: tracked capitals do not fit "Sales opportunities"
                in a 2-column cell at 320px and the word splits mid-way. */}
            <dt className="text-meta font-semibold text-[var(--ink)]">
              {FUNNEL_STAGE_LABEL[stage].label}
            </dt>
            <dd className="m-0 mt-1 text-h2 font-semibold tabular-nums text-[var(--accent-deep)]">
              {formatCount(study.results[stage])}
            </dd>
            <dd className="m-0 mt-1 text-meta text-[var(--text-muted)] break-words">
              {FUNNEL_STAGE_LABEL[stage].meaning}
            </dd>
          </div>
        ))}
      </dl>

      {study.paidMedia && (
        <div>
          <Heading level="h3" className="mb-2">
            {study.paidMedia.channel}, same dates
          </Heading>
          <Text className="mb-4 max-w-2xl">{study.source}</Text>
          <dl className="m-0 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] lg:grid-cols-3">
            {study.paidMedia.figures.map((f) => (
              <div key={f.label} className="min-w-0 bg-[var(--surface)] p-4">
                <dt className="text-meta font-semibold text-[var(--ink)]">{f.label}</dt>
                <dd className="m-0 mt-1 text-h3 font-semibold tabular-nums text-[var(--ink)]">{f.value}</dd>
                {f.note && <dd className="m-0 mt-1 text-meta text-[var(--text-muted)] break-words">{f.note}</dd>}
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}

export default function B2BCaseStudyView({ study }: { study: ResolvedB2BCaseStudy }) {
  const path = `/case-studies/${study.id}`;
  const others = B2B_CASE_STUDIES.filter((s) => s.id !== study.id);

  /**
   * Article + BreadcrumbList, matching the 45 detail pages. No FAQPage: these pages carry no FAQ.
   * No image node: there is no image. No Review or AggregateRating: no quote is on file.
   */
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: study.headline,
      description: study.summary,
      author: { '@type': 'Organization', name: 'Qognition', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'Qognition', url: SITE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
      about: [
        { '@type': 'Organization', name: study.client },
        { '@type': 'Thing', name: `${study.sector} demand generation` },
      ],
      url: `${SITE_URL}${path}`,
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Case Studies', path: '/case-studies' },
      { name: study.client, path },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="min-h-screen px-6 pb-32 pt-24 md:px-12 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { name: 'Case Studies', href: '/case-studies' },
              { name: study.client, href: path },
            ]}
          />

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{study.sector}</Badge>
              <Badge variant="muted">{study.country}</Badge>
            </div>
            <Heading level="h1" className="mb-5 mt-5 break-words">
              {study.headline}
            </Heading>
            <p className="text-body text-[var(--text-muted)]">
              <span className="font-medium text-[var(--text)]">{study.client}</span> · {b2bMarket(study)} · B2B
              client programme
            </p>
            <Text className="mt-4">{study.engagement}</Text>
          </header>

          <Section title="Who they sell to" id="sells-to">
            <Text className="max-w-3xl">{study.sellsTo}</Text>
          </Section>

          <Section title="The problem" id="problem">
            <Text className="max-w-3xl">{study.problem}</Text>
          </Section>

          <Section title="What we did" id="what-we-did">
            <ul className="space-y-3">
              {study.whatWeDid.map((item) => (
                <li key={item} className="flex gap-3 text-body text-[var(--text-muted)]">
                  <CheckCircle2 size={18} aria-hidden="true" className="mt-1 shrink-0 text-[var(--accent-deep)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Results" id="results">
            <FunnelResults study={study} />
          </Section>

          <Section title="Services used" id="services">
            <ul className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)]">
              {study.services.map((s) => (
                <li key={s} className="px-5 py-4">
                  <p className="text-body font-medium text-[var(--ink)]">{B2B_SERVICE_LABEL[s].label}</p>
                  <p className="mt-1 text-meta text-[var(--text-muted)]">{B2B_SERVICE_LABEL[s].meaning}</p>
                </li>
              ))}
            </ul>
          </Section>

          {others.length > 0 && (
            <section aria-labelledby="other-b2b" className="mb-16 md:mb-24">
              <Heading level="h2" id="other-b2b" className="mb-6">
                Other B2B case studies
              </Heading>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {others.map((s) => (
                  <CaseStudyCard key={s.id} study={s} />
                ))}
              </div>
              <nav aria-label="Explore the library" className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <Link href="/case-studies" className="text-body text-[var(--accent-deep)] underline underline-offset-2">
                  All case studies
                </Link>
                <Link href="/case-studies/methodology" className="text-body text-[var(--accent-deep)] underline underline-offset-2">
                  How we handle evidence
                </Link>
              </nav>
            </section>
          )}

          <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-warm)] p-8 text-center md:p-12">
            <Heading level="h2" className="mb-3">
              Want a programme like this for your sales team?
            </Heading>
            <Text className="mx-auto mb-6 max-w-xl">
              Tell us who you sell to and where your pipeline falls short. We will discuss a scope based on your market and goals.
            </Text>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-deep)] px-6 py-3 text-body font-medium text-[var(--on-accent,#fff)] transition-opacity hover:opacity-90"
            >
              Book a call <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/contact#enquiry" className="mt-4 block text-[var(--accent-deep)]">
              Send an enquiry
            </Link>
          </section>
        </div>
      </article>
    </>
  );
}
