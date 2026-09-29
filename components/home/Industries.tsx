import Link from 'next/link';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
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

const VERTICALS: Vertical[] = [
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
            <MaskReveal>We sell to three kinds of firm.</MaskReveal>
          </h2>
          <p className="text-body mt-5 m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
            Firms doing $3M to $50M in revenue, with 20 to 200 staff, selling a considered purchase
            to another business. We are US-first, with Australian clients served in USD.
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
            {VERTICALS.map((v, i) => (
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
                    {String(i + 1).padStart(2, '0')} / 03
                    {v.flagship && <span className="ml-4">Flagship vertical</span>}
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

        <ScrollReveal stagger={3} className="mt-8">
          <Link href="/case-studies/industry/insurance" className="rf-btn rf-btn--secondary">
            See the insurance records
          </Link>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
