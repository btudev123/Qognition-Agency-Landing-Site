import Link from 'next/link';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { icpIndustryCards, icpSubIndustryTotal } from '../../data/b2b/icp';
import { Eyebrow, Shell } from './primitives';

/* Section 6 — Who we build this for. docs/copy/home.md §6.
 *
 * Replaces the `Coverage` block in the orphaned app/HomePage.tsx. The visual
 * device is kept: a single hairline lattice, mono index per cell, the flagship
 * given the full-width row so the wedge looks like a wedge.
 *
 * The content model is replaced. INDUSTRIES_DATA listed eight sectors under
 * "Industries we dominate. Globally." — "dominate" is an unevidenced
 * superlative, "globally" implied a footprint that does not exist (CLAUDE.md §4
 * forbids presenting countries served as offices), and listing eight sectors
 * implied experience in eight, which is CLAUDE.md §11's "implying experience in
 * an industry because a page exists for it". Three verticals, because three is
 * what we sell.
 *
 * WHY THESE CELLS ARE NOT LINKS. /industries/insurance,
 * /industries/professional-services and /industries/it-services are in the
 * CLAUDE.md §5 route plan and do not exist yet — data/industries.ts carries
 * law-legal, accounting-cpa, financial-services and eight others, none of them
 * these. Linking would 404. The one real destination available today is
 * /case-studies/industry/insurance, which does resolve, and it carries the
 * whole section's CTA.
 *
 * When those three pages ship, each cell becomes a <Link className="rf-hoverable
 * rf-cell"> and gets the invert-on-hover-and-focus device that is already
 * written and waiting in globals.css. Do not add the interaction styling before
 * the destination exists; a card that lights up and goes nowhere is worse than
 * a card that does not light up.
 */

type Vertical = {
  name: string;
  buyer: string;
  detail: string;
  flagship?: boolean;
};

/* The three sectors where a client library exists. Everything else on this page
   comes from the locked ICP taxonomy, so this array is the ONLY hand-written
   list here and it is a statement about evidence, not about scope.

   It was previously the whole section, headed "We sell to three kinds of firm",
   which told a reader in 18 of 21 sectors that we do not sell to them. The ICP
   locked on 2026-09-28 is 21 industries and 341 sub-industries, and says in
   terms that the taxonomy is a route to market rather than a qualifier. */
const CARDS = icpIndustryCards();
const SUB_TOTAL = icpSubIndustryTotal();
/* The three above map to ICP industries 04, 02 and 09. Matched by slug so a
   rename in the locked taxonomy surfaces here rather than silently duplicating a
   sector in both lists. */
const EVIDENCED_SLUGS = new Set([
  'financial-services',
  'professional-and-business-services',
  'technology-and-it-services',
]);

const EVIDENCED: Vertical[] = [
  {
    name: 'Commercial and specialty insurance',
    buyer: 'A risk manager, CFO or operations lead comparing agencies before a renewal.',
    detail:
      'Independent agencies, MGAs and wholesale brokers with 5 to 50 producers. Right now the AI answer for most commercial coverage questions points at aggregators and carriers.',
    flagship: true,
  },
  {
    name: 'B2B professional services',
    buyer: 'A founder, CFO or general counsel looking for a specialist, usually under a deadline.',
    detail: 'CPA and tax advisory firms, corporate law boutiques, management advisory practices.',
  },
  {
    name: 'IT services and security',
    buyer:
      'An IT director, CISO or operations lead who has already read a vendor comparison an assistant generated for them.',
    detail: 'MSPs, MSSPs, cybersecurity consultancies and cloud partners.',
  },
];

export default function Industries() {
  return (
    /* Dark feature band. data-theme="dark" remaps the --s-* surface roles under
       this element; nothing here branches on ground. CLAUDE.md §9. */
    <section
      data-theme="dark"
      className="py-20 sm:py-28"
      style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
    >
      <Shell>
        <ScrollReveal>
          <Eyebrow>Who we build this for</Eyebrow>
          <h2 className="text-h2 font-sans m-0 mt-4 max-w-[20ch] font-semibold">
            <MaskReveal>{`We sell to ${CARDS.length} B2B sectors.`}</MaskReveal>
          </h2>
          <p className="text-body mt-5 m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
            B2B firms doing $3M to $1B+ in revenue, with 20 to 10,000+ staff, selling a considered
            purchase to another business. {SUB_TOTAL} sub-sectors underneath. You need AI search, SEO
            or paid media, and any one of the three is enough. US-first, in USD.
          </p>
        </ScrollReveal>

        {/* One shared 1px lattice — border-top and border-left on the container,
            border-right and border-bottom on each cell — so seams never double
            up. The `gap-px` over a background colour used in the orphaned file
            paints a 2px seam wherever a cell is missing at a breakpoint. */}
        <ScrollReveal stagger={2} className="mt-12">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 [&>article]:border-r [&>article]:border-b [&>article]:border-[var(--s-rule-hairline)]"
            style={{
              borderTop: '1px solid var(--s-rule-hairline)',
              borderLeft: '1px solid var(--s-rule-hairline)',
            }}
          >
            {EVIDENCED.map((v, i) => (
              <article
                key={v.name}
                /* Two columns, not three. At three the flagship spans the full
                   row and the two remaining cells leave one slot empty, which
                   breaks the lattice's right edge and reads as a rendering bug
                   rather than as an open grid. At two, every row fills exactly
                   at every width. */
                className={`flex flex-col justify-between p-6 sm:p-8 min-h-[220px] ${
                  v.flagship ? 'sm:col-span-2' : ''
                }`}
              >
                <div>
                  <div
                    className="font-mono text-meta tracking-[0.14em] uppercase"
                    style={{ color: v.flagship ? 'var(--s-accent)' : 'var(--s-text-faint)' }}
                  >
                    {String(i + 1).padStart(2, '0')} / {String(EVIDENCED.length).padStart(2, '0')}
                    <span className="ml-4">
                      {v.flagship ? 'Flagship vertical' : 'Client work in this sector'}
                    </span>
                  </div>
                  <h3 className="text-h3 font-sans mt-4 mb-2 font-semibold">{v.name}</h3>
                  <p className="text-body m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
                    {v.detail}
                  </p>
                </div>
                <p className="text-meta mt-6 mb-0 max-w-[62ch]" style={{ color: 'var(--s-text-faint)' }}>
                  <span className="font-mono tracking-[0.12em] uppercase">Their buyer</span> {v.buyer}
                </p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        {/* The other 18. Named, not linked.
          *
          * A reader in energy, aerospace or logistics previously saw three
          * sectors and concluded we do not sell to them. These are rendered as
          * text because the sector pages publish wave by wave, and an anchor to
          * an unpublished entity is a hard 404 under dynamicParams = false. The
          * /industries section gates the same way and for the same reason. */}
        <ScrollReveal stagger={3} className="mt-10">
          <p
            className="font-mono text-meta tracking-[0.14em] uppercase m-0 mb-5"
            style={{ color: 'var(--s-text-faint)' }}
          >
            And {CARDS.length - EVIDENCED.length} more sectors
          </p>
          <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {CARDS.filter((c) => !EVIDENCED_SLUGS.has(c.slug)).map((card) => (
              <li key={card.id} className="min-w-0">
                <p className="text-body m-0 font-medium">{card.name}</p>
                <p className="text-meta m-0 mt-1" style={{ color: 'var(--s-text-faint)' }}>
                  {card.subCount} sub-sectors
                </p>
              </li>
            ))}
          </ul>
          <p className="text-meta mt-8 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-faint)' }}>
            Listing a sector means we sell into it. It is not a claim that we have worked with a firm
            in it, and a sector that is not listed is not a disqualifier.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger={4} className="mt-8">
          <Link href="/industries" className="rf-btn rf-btn--secondary">
            See every sector
          </Link>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
