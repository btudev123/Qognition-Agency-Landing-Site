import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight, Check, Minus } from 'lucide-react';
import FunnelCTA from '../shared/FunnelCTA';
import SourceLink from '../shared/SourceLink';
import ProductScreen from '../product-screens/ProductScreen';
import { PRODUCT_SCREENS } from '../../data/product-screens';
import { AI_PLATFORMS } from '../../data/aiPlatforms';
import { B2B_CASE_STUDIES, byNiche } from '../../data/case-studies';
import {
  LAYER_DEFINITIONS,
  MARKETS,
  PROMISE_CHIPS,
  PROOF_LINE_B2B,
  PROOF_LINE_INSURANCE,
  type ServiceFaq,
  SERVICE_PAGES,
  type ServicePageContent,
} from '../../data/servicePages';
import { NOT_OFFERED_SUB_SERVICES, SERVICES } from '../../data/services';
import { INDUSTRIES } from '../../data/industries';
import { REGIONS } from '../../data/regions';
import { SERVICE_SUB_PAGES } from '../../data/seoExpansion';
import { appendFunnelContext } from '../../lib/funnelContext';
import IconTile, { InlineIcon } from '../visual/IconTile';
import ProgrammeCard from '../visual/ProgrammeCard';
import {
  DiagramAnswerSources,
  DiagramBudgetLoop,
  DiagramListings,
  DiagramSearchToSale,
} from '../visual/ServiceDiagrams';
import v from '../visual/visual.module.css';

/* THE SERVICE PAGE, plain-English version (docs/copy/2026-10/plain-english-templates.md §2).
 *
 * One layout for five pages: /services/seo, /services/ai-seo, /services/ppc and the two
 * layer sub-pages. Content comes from data/servicePages.ts and nothing here writes copy
 * of its own except the section headings the copy file names.
 *
 * SERVER COMPONENT. The client JS on these pages is what was there before: FunnelCTA
 * (which fires cta_click and stays for that reason) and, on /services/ai-seo only, the
 * tracker run's player. No reveal animation: motion here would communicate nothing.
 *
 * RHYTHM, copy §2 table: light hero and chips, light fit, DARK what-you-get, light steps,
 * DARK monthly report, light proof and questions, DARK closing CTA, light link lists. Each
 * band is a <section data-theme>, so every --s-* role underneath remaps and no child
 * branches on ground.
 *
 * DENSITY. Tight lattices, py-14 to py-20 bands, measure capped at 68ch. */

const SHELL = 'relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10';
const HAIRLINE: CSSProperties = { borderTop: '1px solid var(--s-rule-hairline)' };
const MUTED: CSSProperties = { color: 'var(--s-text-muted)' };

/* The closed lattice (components/b2b/blocks.tsx): cells draw top and left, the container
   draws right and bottom, so the frame closes on any item count at any column count. */
const LATTICE: CSSProperties = {
  borderRight: '1px solid var(--s-rule-hairline)',
  borderBottom: '1px solid var(--s-rule-hairline)',
};
const LATTICE_CELLS = '[&>*]:border-t [&>*]:border-l [&>*]:border-[var(--s-rule-hairline)]';

/** Column classes that leave no partial row, for 3 to 6 tiles. */
function tileGrid(count: number): { grid: string; cell: (i: number) => string } {
  if (count === 4) return { grid: 'sm:grid-cols-2 lg:grid-cols-4', cell: () => '' };
  if (count === 5)
    return {
      grid: 'sm:grid-cols-2 lg:grid-cols-6',
      cell: (i) => (i < 2 ? 'lg:col-span-3' : i === 4 ? 'sm:col-span-2 lg:col-span-2' : 'lg:col-span-2'),
    };
  return { grid: 'sm:grid-cols-2 lg:grid-cols-3', cell: () => '' };
}

/** Proof card rows sized to the card count, so the lattice frame never runs past the last
 *  card into an empty column. Three or more: thirds. Fewer: the row narrows to fit. */
function cardGrid(count: number): string {
  if (count >= 3) return 'md:grid-cols-3';
  if (count === 2) return 'md:grid-cols-2 lg:w-2/3';
  return 'md:w-1/2 lg:w-1/3';
}

/* ── The site links the earlier template carried (Owen, review FIX, 2026-10-08). ──
   The old page reached these through CrossLinks, its aside, "Explore your industry", the
   hero audit link and the sub-page sibling block. Dropping them orphaned the 33
   /services/<svc>/industries/* pages, so they come back here, names only, in plain
   labels. Same sources and the same selection rules as before; nothing new is linked,
   and the not-offered PPC rows stay out (data/services.ts). */

const SHORT_NAME: Record<string, string> = { seo: 'SEO', 'ai-seo': 'AI SEO and GEO', ppc: 'PPC' };

/** Plain labels already cleared on the parent pages, so a sibling reads the same everywhere. */
const PLAIN_LABEL = new Map(
  Object.values(SERVICE_PAGES).flatMap((page) => [...(page.specialists?.links ?? []), ...(page.nextSteps ?? [])].map((l) => [l.href, l.label] as const))
);

type LinkGroup = { readonly heading: string; readonly links: readonly { label: string; href: string }[] };

function siteLinkGroups(path: string, serviceId: string): LinkGroup[] {
  const service = SERVICES.find((item) => item.id === serviceId);
  if (!service) return [];

  if (path !== `/services/${serviceId}`) {
    /* A sub-page: the six siblings the old "More ... sub-services" block linked. */
    const slug = path.split('/').pop();
    const siblings = SERVICE_SUB_PAGES.filter((page) => page.serviceId === serviceId && page.slug !== slug)
      .slice(0, 6)
      .filter((page) => !NOT_OFFERED_SUB_SERVICES.has(`${page.serviceId}/${page.slug}`));
    return siblings.length
      ? [
          {
            heading: 'Related services',
            links: siblings.map((page) => {
              const href = `/services/${page.serviceId}/${page.slug}`;
              return { label: PLAIN_LABEL.get(href) ?? page.title, href };
            }),
          },
        ]
      : [];
  }

  /* The old "Explore your industry" selection, unchanged. */
  const related = INDUSTRIES.filter((industry) =>
    service.relatedIndustries.some((name) => industry.name.toLowerCase().includes(name.toLowerCase().split(' ')[0]))
  ).slice(0, 6);

  return [
    {
      heading: `Industries we cover for ${SHORT_NAME[serviceId] ?? service.title}`,
      links: INDUSTRIES.map((industry) => ({ label: industry.name, href: `/services/${serviceId}/industries/${industry.id}` })),
    },
    {
      heading: 'Other services',
      links: SERVICES.filter((item) => item.id !== serviceId).map((item) => ({ label: item.title, href: `/services/${item.id}` })),
    },
    { heading: 'Regions', links: REGIONS.map((region) => ({ label: region.name, href: `/regions/${region.slug}` })) },
    {
      heading: 'Also useful',
      links: [
        { label: 'Free AI visibility audit', href: '/free-ai-audit' },
        { label: 'All markets', href: '/locations' },
        { label: 'Guides and resources', href: '/resources' },
        ...(related.length ? related : INDUSTRIES.slice(0, 6)).map((industry) => ({
          /* Same name as a row in the industries group, different page: say which. */
          label: `${industry.name}: all services`,
          href: `/industries/${industry.id}`,
        })),
      ],
    },
  ];
}

function Band({
  theme,
  id,
  children,
  className = 'py-14 sm:py-20',
}: {
  theme: 'light' | 'dark';
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section data-theme={theme} aria-labelledby={id} className={className} style={HAIRLINE}>
      <div className={SHELL}>{children}</div>
    </section>
  );
}

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-h2 font-sans m-0 max-w-[26ch] font-semibold">
      {children}
    </h2>
  );
}

/** Renders `faq.link.text` inside the answer as a link. The answer string is unchanged, so
 *  the visible text and the JSON-LD text are the same characters. */
function FaqAnswer({ faq }: { faq: ServiceFaq }) {
  const at = faq.link ? faq.answer.indexOf(faq.link.text) : -1;
  if (!faq.link || at < 0) return <>{faq.answer}</>;
  return (
    <>
      {faq.answer.slice(0, at)}
      <Link href={faq.link.href} className="rf-link" style={{ color: 'var(--s-accent)' }}>
        {faq.link.text}
      </Link>
      {faq.answer.slice(at + faq.link.text.length)}
    </>
  );
}

function Visual({ content }: { content: ServicePageContent }) {
  switch (content.visual) {
    case 'tracker-run':
      /* ADR-0006 §11: the run, unchanged and unfiltered. Filtering it to fewer rows would be
         a new screen and an ADR amendment, not a call-site choice. The field and shadow come
         from screenField because ProductScreen renders frame="none", as on `/`. */
      return (
        <div className={`min-w-0 w-full ${v.screenField}`}>
          <ProductScreen screen={PRODUCT_SCREENS['scriblr-tracker-run']} frame="none" />
        </div>
      );
    case 'search-to-sale':
      return <DiagramSearchToSale />;
    case 'answer-sources':
      return <DiagramAnswerSources />;
    case 'listings':
      return <DiagramListings />;
    case 'budget-loop':
      return <DiagramBudgetLoop />;
  }
}

/** The homepage hero's platform row and its line (components/home/Hero.tsx). Names, not
 *  links: a name here is not a partnership. */
function PlatformRow() {
  return (
    <div className="mt-8 w-full min-w-0">
      <ul className="list-none p-0 m-0 flex flex-wrap items-center gap-2">
        {AI_PLATFORMS.filter((p) => p.group === 'primary').map((p) => (
          <li
            key={p.id}
            className="inline-flex items-center gap-2 py-1.5 pl-2 pr-3"
            style={{ border: '1px solid var(--s-rule-strong)' }}
          >
            {p.icon ? (
              <img src={p.icon} alt="" aria-hidden="true" width={16} height={16} className="h-4 w-4 object-contain" />
            ) : (
              <span aria-hidden="true" className="text-meta">
                {p.monogram}
              </span>
            )}
            <span className="text-meta" style={MUTED}>
              {p.name}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-meta mt-4 m-0 max-w-[58ch]" style={{ color: 'var(--s-text-faint)' }}>
        A name here is not a partnership, and no one can promise you a place in any platform&apos;s answers.
      </p>
    </div>
  );
}

function CheckList({ items, muted = false }: { items: readonly string[]; muted?: boolean }) {
  return (
    <ul className="list-none p-0 m-0 grid gap-3">
      {items.map((item) => (
        <li key={item} className="text-body flex gap-3" style={MUTED}>
          <InlineIcon icon={muted ? Minus : Check} muted={muted} />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LinkList({ links }: { links: readonly { label: string; href: string }[] }) {
  return (
    <ul className={`list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${LATTICE_CELLS}`} style={LATTICE}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="rf-card rf-hoverable flex h-full min-h-11 items-center justify-between gap-4 px-5 py-4"
          >
            <span className="text-body min-w-0" style={{ color: 'var(--s-text)', overflowWrap: 'anywhere' }}>
              {link.label}
            </span>
            <span className="flex-shrink-0" style={{ color: 'var(--s-accent)' }} aria-hidden="true">
              <ArrowUpRight className="rf-arrow" size={20} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export interface ServiceLandingProps {
  readonly path: string;
  readonly h1: string;
  readonly content: ServicePageContent;
  /** The service's display title, for FunnelCTA's `service` prop. */
  readonly serviceTitle: string;
  /** Breadcrumb trail above the H1. The last crumb is the current page and is not a link. */
  readonly trail: readonly { readonly name: string; readonly href: string }[];
}

export default function ServiceLanding({ path, h1, content, serviceTitle, trail }: ServiceLandingProps) {
  const key = path.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
  const ctx = { page_id: path, service_id: content.serviceId, stage: 'bofu' as const };
  const bookHref = appendFunnelContext('/book', ctx);
  const enquiryHref = appendFunnelContext('/contact#enquiry', ctx);

  const b2b = content.proof.b2b ? B2B_CASE_STUDIES.filter((s) => s.services.includes(content.proof.b2b!)) : [];
  const insurance = content.proof.insurance
    ? byNiche('insurance')
        .filter((s) => s.services.includes(content.proof.insurance!))
        .slice(0, 3)
    : [];
  const tiles = tileGrid(content.whatYouGet.length);
  const groups = siteLinkGroups(path, content.serviceId);

  return (
    <main className="min-h-screen">
      {/* ── 1 and 2. Hero and promise chips. Light. ───────────────────────── */}
      <section data-theme="light" aria-labelledby={`${key}-h1`} className="pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className={SHELL}>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="list-none p-0 m-0 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              {trail.map((crumb, i) => (
                <li key={crumb.href} className="flex items-baseline gap-2">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-meta" style={{ color: 'var(--s-text-faint)' }}>
                      /
                    </span>
                  )}
                  <Link href={crumb.href} className="text-meta rf-link" style={MUTED}>
                    {crumb.name}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 xl:gap-x-16 gap-y-12 lg:items-center">
            <div className="lg:col-span-6 xl:col-span-7 min-w-0">
              <span className="rf-eyebrow rf-eyebrow--accent max-w-full">{content.eyebrow}</span>
              <h1 id={`${key}-h1`} className="text-h1 font-sans m-0 mt-5 max-w-[20ch] font-semibold">
                {h1}
              </h1>
              <p className="text-body mt-6 m-0 max-w-[60ch]" style={{ color: 'var(--s-text)' }}>
                {content.promise}
              </p>
              {content.promiseNote && (
                <p className="text-meta mt-4 m-0 max-w-[60ch]" style={MUTED}>
                  {content.promiseNote}
                </p>
              )}
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <a href={bookHref} className="rf-btn rf-btn--primary w-full sm:w-auto">
                  Book a call
                </a>
                <Link href={enquiryHref} className="rf-btn rf-btn--secondary w-full sm:w-auto">
                  Send an enquiry
                </Link>
              </div>
              {content.platforms && <PlatformRow />}
            </div>

            <div className="lg:col-span-6 xl:col-span-5 min-w-0">
              <Visual content={content} />
            </div>
          </div>

          <ul
            className={`list-none p-0 m-0 mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 ${LATTICE_CELLS}`}
            style={LATTICE}
          >
            {(content.chips ?? PROMISE_CHIPS).map((chip) => (
              <li key={chip.label} className="flex items-center gap-4 p-4 sm:p-5">
                <IconTile icon={chip.icon} size={24} />
                <span className="text-h4 font-sans font-medium min-w-0">{chip.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Right for you if (and, on AI SEO, where each layer shows up). Light. ── */}
      <Band theme="light" id={`${key}-fit`}>
        {/* Why now (docs/copy/2026-10/ai-search-is-winning.md §3). A label, not a heading:
            the band is labelled by its H2 below, and a second heading here would sit
            above it in the outline. A third-party figure carries its source link. */}
        {content.whyNow && (
          <div className="mb-12 pb-12 max-w-[68ch]" style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}>
            <span className="rf-eyebrow">Why now</span>
            <p className="text-body mt-4 m-0" style={{ color: 'var(--s-text)' }}>
              {content.whyNow.text}
              {content.whyNow.source && (
                <>
                  {' '}
                  <SourceLink source={content.whyNow.source} />
                </>
              )}
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
          <div className={content.layers ? 'lg:col-span-6' : 'lg:col-span-8'}>
            <H2 id={`${key}-fit`}>Right for you if</H2>
            <div className="mt-8">
              <CheckList items={content.rightFor} />
            </div>
            {content.rightForNote && (
              <p className="text-body mt-6 m-0 max-w-[68ch]" style={{ color: 'var(--s-text)' }}>
                {content.rightForNote}
              </p>
            )}
          </div>

          {content.layers && (
            <div className="lg:col-span-6 min-w-0">
              <h2 id={`${key}-layers`} className="text-h3 font-sans m-0 font-semibold">
                Where it shows up
              </h2>
              <table className="mt-6 w-full border-collapse text-left">
                <caption className="sr-only">The four search layers and where each one shows up</caption>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--s-rule-strong)' }}>
                    <th scope="col" className="font-mono text-meta tracking-[0.14em] uppercase font-normal py-3 pr-6" style={MUTED}>
                      Layer
                    </th>
                    <th scope="col" className="font-mono text-meta tracking-[0.14em] uppercase font-normal py-3" style={MUTED}>
                      Where it shows up
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {LAYER_DEFINITIONS.map((row) => (
                    <tr key={row.layer} style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}>
                      <th scope="row" className="text-body font-semibold py-3 pr-6 align-top whitespace-nowrap" style={{ color: 'var(--s-accent)' }}>
                        {row.layer}
                      </th>
                      <td className="text-body py-3 align-top" style={{ color: 'var(--s-text)' }}>
                        {row.surface}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-meta mt-4 m-0 max-w-[68ch]" style={MUTED}>
                AI Overviews are the AI summaries at the top of some Google results. AI Mode is Google&apos;s chat-style
                search.{' '}
                <Link
                  href="/services/ai-seo/generative-engine-optimization"
                  className="rf-link"
                  style={{ color: 'var(--s-accent)' }}
                >
                  More on GEO
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </Band>

      {/* ── 4. What you get. Dark. ─────────────────────────────────────────── */}
      <Band theme="dark" id={`${key}-get`}>
        <H2 id={`${key}-get`}>What you get</H2>
        <ul className={`list-none p-0 m-0 mt-10 grid grid-cols-1 ${tiles.grid} ${LATTICE_CELLS}`} style={LATTICE}>
          {content.whatYouGet.map((item, i) => (
            <li key={item.title} className={`flex gap-5 p-5 sm:p-6 ${tiles.cell(i)}`}>
              <IconTile icon={item.icon} size={24} />
              <div className="min-w-0">
                <h3 className="text-h4 font-sans m-0 font-semibold">{item.title}</h3>
                <p className="text-body m-0 mt-2" style={MUTED}>
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {content.canAndCannot && (
          <div className="mt-14">
            <h2 id={`${key}-control`} className="text-h3 font-sans m-0 font-semibold">
              What we can change, and what we can&apos;t
            </h2>
            <div className={`mt-6 grid grid-cols-1 md:grid-cols-2 ${LATTICE_CELLS}`} style={LATTICE}>
              <div className="p-5 sm:p-6" style={{ boxShadow: 'inset 0 2px 0 var(--s-accent-graphic)' }}>
                <h3 className="text-h4 font-sans m-0 font-semibold">We can change</h3>
                <div className="mt-4">
                  <CheckList items={content.canAndCannot.can} />
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-h4 font-sans m-0 font-semibold">We can&apos;t change</h3>
                <div className="mt-4">
                  <CheckList items={content.canAndCannot.cannot} muted />
                </div>
              </div>
            </div>
            <p className="text-body mt-6 m-0 max-w-[68ch]" style={{ color: 'var(--s-text)' }}>
              {content.canAndCannot.note}
            </p>
          </div>
        )}
      </Band>

      {/* ── 5. How it works. Light. Numbered rail, homepage Programme pattern: vertical
             below lg (rail through the tile centres at x = 24px), a row from lg. ── */}
      <Band theme="light" id={`${key}-how`}>
        <H2 id={`${key}-how`}>How it works</H2>
        <div className="relative mt-10">
          <div className="absolute left-6 top-6 bottom-6 w-px lg:hidden" style={{ background: 'var(--s-rule)' }} aria-hidden="true" />
          <div className="absolute left-0 right-0 top-6 hidden lg:block h-px" style={{ background: 'var(--s-rule)' }} aria-hidden="true" />
          <ol
            className={`relative grid grid-cols-1 gap-8 lg:gap-8 list-none p-0 m-0 ${
              content.steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            }`}
          >
            {content.steps.map((step, i) => (
              <li key={step.title} className="relative pl-16 lg:pl-0 min-w-0">
                <span
                  className={`${v.iconTile} absolute left-0 top-0 h-12 w-12 lg:static font-mono text-meta tabular-nums`}
                  style={{ borderColor: i === 0 ? 'var(--s-accent-graphic)' : 'var(--s-rule-strong)' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-h4 font-sans m-0 pt-3 lg:pt-5 font-semibold">{step.title}</h3>
                <p className="text-body m-0 mt-2 max-w-[44ch]" style={MUTED}>
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Band>

      {/* ── 6. What you see each month. Dark. ──────────────────────────────── */}
      <Band theme="dark" id={`${key}-month`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-8">
          <div className="lg:col-span-5">
            <H2 id={`${key}-month`}>What you see each month</H2>
            {content.monthly.intro && (
              <p className="text-body mt-5 m-0 max-w-[48ch]" style={MUTED}>
                {content.monthly.intro}
              </p>
            )}
          </div>
          <div className="lg:col-span-7 min-w-0">
            <ul className="list-none p-0 m-0" style={HAIRLINE}>
              {content.monthly.items.map((item) => (
                <li
                  key={item}
                  className="text-body flex gap-3 py-4"
                  style={{ color: 'var(--s-text)', borderBottom: '1px solid var(--s-rule-hairline)' }}
                >
                  <InlineIcon icon={Check} />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
            {content.monthly.note && (
              <p className="text-body mt-6 m-0 max-w-[68ch]" style={MUTED}>
                {content.monthly.note}
              </p>
            )}
            {content.monthly.auditLink && (
              <p className="text-body mt-6 m-0 max-w-[68ch]" style={{ color: 'var(--s-text)' }}>
                Want to see who gets named first?{' '}
                <Link href="/free-ai-audit" className="rf-link" style={{ color: 'var(--s-accent)' }}>
                  Request a free AI visibility audit
                </Link>
                .
              </p>
            )}
          </div>
        </div>
      </Band>

      {/* ── 7. Proof. Light. Copy §2.2: B2B records tagged with this service, then the
             first three insurance records tagged with it. HVAC and dental never. Each
             caveat line renders only under a group that rendered. ── */}
      <Band theme="light" id={`${key}-proof`}>
        <H2 id={`${key}-proof`}>Client programmes</H2>

        {b2b.length > 0 && (
          <div className="mt-10">
            <span className="rf-eyebrow">B2B client results</span>
            <ul className={`${v.lattice} list-none p-0 m-0 mt-5 grid grid-cols-1 ${cardGrid(b2b.length)}`}>
              {b2b.map((study) => (
                <ProgrammeCard key={study.id} study={study} />
              ))}
            </ul>
          </div>
        )}

        {insurance.length > 0 && (
          <div className="mt-10">
            <span className="rf-eyebrow">Insurance programmes</span>
            <ul className={`${v.lattice} list-none p-0 m-0 mt-5 grid grid-cols-1 ${cardGrid(insurance.length)}`}>
              {insurance.map((study) => (
                <ProgrammeCard key={study.id} study={study} />
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 lg:items-start">
          <div className="lg:col-span-7">
            {b2b.length > 0 && (
              <p className="text-meta m-0 max-w-[72ch]" style={MUTED}>
                {PROOF_LINE_B2B}
              </p>
            )}
            {insurance.length > 0 && (
              <p className="text-meta m-0 mt-2 max-w-[72ch]" style={MUTED}>
                {PROOF_LINE_INSURANCE}
              </p>
            )}
            {!content.proof.evidenceButtons && (
              <p className="text-body m-0 mt-6">
                <Link href="/case-studies" className="rf-link" style={{ color: 'var(--s-accent)' }}>
                  See our client programmes
                </Link>
              </p>
            )}
          </div>
          {content.proof.evidenceButtons && (
            <div className="lg:col-span-5 flex flex-col sm:flex-row flex-wrap gap-3 lg:justify-end">
              <Link href="/case-studies/methodology" className="rf-btn rf-btn--secondary">
                How we handle evidence
              </Link>
              <Link href="/case-studies" className="rf-btn rf-btn--secondary">
                Client programmes
              </Link>
            </div>
          )}
        </div>
      </Band>

      {/* ── 8. Questions buyers ask us. Light. The same strings feed faqSchema() in the
             route, so the JSON-LD and the page cannot disagree. ── */}
      <Band theme="light" id={`${key}-faqs`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <H2 id={`${key}-faqs`}>Questions buyers ask us</H2>
          </div>
          <div className="lg:col-span-8" style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}>
            {content.faqs.map((faq) => (
              <details key={faq.question} className="group" style={HAIRLINE}>
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none py-5 min-h-11 marker:hidden [&::-webkit-details-marker]:hidden">
                  <h3 className="text-h4 font-sans m-0 font-medium">{faq.question}</h3>
                  <span
                    className="font-mono flex-shrink-0 motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-45"
                    aria-hidden="true"
                    style={{ color: 'var(--s-accent)' }}
                  >
                    +
                  </span>
                </summary>
                <p className="text-body mt-0 mb-6 max-w-[68ch]" style={MUTED}>
                  <FaqAnswer faq={faq} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </Band>

      {/* ── 9. Closing CTA. Dark. FunnelCTA stays: it carries the cta_click event. ── */}
      <section data-theme="dark" className="py-12 sm:py-16" style={HAIRLINE}>
        <div className={SHELL}>
          <FunnelCTA stage="bofu" service={serviceTitle} headline={content.ctaHeadline} />
        </div>
      </section>

      {/* ── 10. Link lists. Light. ─────────────────────────────────────────── */}
      {(content.specialists || content.nextSteps || content.markets || groups.length > 0) && (
        <section data-theme="light" className="py-14 sm:py-20" style={HAIRLINE}>
          <div className={`${SHELL} grid gap-14`}>
            {content.specialists && (
              <div>
                <h2 className="text-h3 font-sans m-0 font-semibold">{content.specialists.heading}</h2>
                <div className="mt-6">
                  <LinkList links={content.specialists.links} />
                </div>
                <p className="text-body mt-6 m-0">
                  <Link href="/industries" className="rf-link" style={{ color: 'var(--s-accent)' }}>
                    See the industries we write for
                  </Link>
                </p>
              </div>
            )}

            {content.nextSteps && (
              <div>
                <h2 className="text-h3 font-sans m-0 font-semibold">Useful next steps</h2>
                <div className="mt-6">
                  <LinkList links={content.nextSteps} />
                </div>
              </div>
            )}

            {content.markets && (
              <div>
                <h2 className="text-h3 font-sans m-0 font-semibold">Markets we serve</h2>
                <p className="text-body mt-3 m-0 max-w-[68ch]" style={MUTED}>
                  We have offices in Toronto, New York, Dubai, Sydney and Gurugram. We serve other markets remotely.
                </p>
                <ul className="list-none p-0 m-0 mt-5 flex flex-wrap gap-x-6 gap-y-3">
                  {[...MARKETS, ...(content.markets.extra ? [content.markets.extra] : [])].map((m) => (
                    <li key={m.href}>
                      <Link href={m.href} className="text-body rf-link" style={{ color: 'var(--s-accent)' }}>
                        {m.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {groups.length > 0 && (
              <nav aria-label="More from Qognition" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 pt-10" style={HAIRLINE}>
                {groups.map((group) => (
                  <div key={group.heading} className="min-w-0">
                    <h2 className="text-h4 font-sans m-0 font-semibold">{group.heading}</h2>
                    <ul className="list-none p-0 m-0 mt-4 grid gap-2">
                      {group.links.map((link) => (
                        <li key={link.href} className="min-w-0">
                          <Link
                            href={link.href}
                            className="text-meta rf-link inline-block py-0.5"
                            style={{ color: 'var(--s-text-muted)', overflowWrap: 'anywhere' }}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
