import { Check, Minus } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { InlineIcon } from '../visual/IconTile';
import { Eyebrow, Shell } from './primitives';
import v from '../visual/visual.module.css';


const FITS = [
  'You sell to other businesses, and a purchase takes weeks of evaluation, not minutes',
  'You asked an AI tool who to hire in your category, and did not like the answer',
  'You want AI search, SEO or PPC. Any one of them is enough to start',
  'Referrals have carried your growth, and you know referred buyers still check you online',
  'Someone at your firm can approve and publish website changes',
  'You judge marketing on qualified enquiries, not traffic',
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
  /* A lattice cell. The fits cell carries a 2px accent top edge (brief §2.10). */
  return (
    <div
      className={`${v.latticeCell} p-6 sm:p-8`}
      style={accent ? { boxShadow: 'inset 0 2px 0 var(--s-accent-graphic)' } : undefined}
    >
      <h3 className="text-h4 font-sans m-0 font-semibold">{title}</h3>
      <ul className="list-none p-0 m-0 mt-5 grid gap-4">
        {items.map((item) => (
          <li key={item} className="text-body flex gap-3" style={{ color: 'var(--s-text-muted)' }}>
            <InlineIcon icon={accent ? Check : Minus} muted={!accent} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Fit() {
  return (
    /* Fit and Faqs are one light band (brief §2.0): Faqs carries no top border
       and a reduced top padding, so the two read as one section. */
    <section data-theme="light" className="pt-20 sm:pt-28 pb-12 sm:pb-16" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <Shell>
        <ScrollReveal>
          <Eyebrow>Fit</Eyebrow>
          <h2 className="text-h2 font-sans m-0 mt-4 max-w-[22ch] font-semibold">
            <MaskReveal>Start with the business you want to win.</MaskReveal>
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger={2} className="mt-12">
          <div className={`${v.lattice} grid grid-cols-1 lg:grid-cols-2`}>
            <List title="Worth a conversation if" items={FITS} accent />
            <List title="Probably not a fit if" items={NOT_A_FIT} accent={false} />
          </div>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
