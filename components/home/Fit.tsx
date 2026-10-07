import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, Shell } from './primitives';


const FITS = [
  'You sell to other businesses, and a purchase takes weeks of evaluation, not minutes',
  'You want AI search, SEO or PPC. Any one of them is enough to start',
  'Referrals have carried your growth and you want a second channel',
  'Someone at your firm can approve and publish website changes',
  'You want enquiry quality measured, not just traffic',
];

/* CLAUDE.md §2 disqualifiers. No revenue floor (docs/icp-positioning.md v2.1). */
const NOT_A_FIT = [
  'You are pre-revenue',
  'You sell mainly to consumers, or sell low-ticket products online',
  'You need leads this week',
  'You want a one-off project rather than ongoing work',
  'You cannot edit your own website',
  'No one at your firm follows up on enquiries',
];

function List({ title, items, accent }: { title: string; items: string[]; accent: boolean }) {
  return (
    <div>
      <h3
        className="text-h4 font-sans m-0 pb-4 font-semibold"
        style={{ borderBottom: `1px solid ${accent ? 'var(--s-accent-graphic)' : 'var(--s-rule-strong)'}` }}
      >
        {title}
      </h3>
      <ul className="list-none p-0 m-0 mt-5 grid gap-4">
        {items.map((item) => (
          <li key={item} className="text-body flex gap-3" style={{ color: 'var(--s-text-muted)' }}>
            <span
              className="mt-2 w-1.5 h-1.5 flex-shrink-0"
              style={{
                background: accent ? 'var(--s-accent-graphic)' : 'transparent',
                border: accent ? 'none' : '1px solid var(--s-rule-strong)',
              }}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Fit() {
  return (
    <section className="py-20 sm:py-28" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <Shell>
        <ScrollReveal>
          <Eyebrow>Fit</Eyebrow>
          <h2 className="text-h2 font-sans m-0 mt-4 max-w-[22ch] font-semibold">
            <MaskReveal>Start with the business you want to win.</MaskReveal>
          </h2>
          <p className="text-body mt-5 m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
            A short check before you book. It saves us both a call.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger={2} className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <List title="Worth a conversation if" items={FITS} accent />
            <List title="Probably not a fit if" items={NOT_A_FIT} accent={false} />
          </div>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
