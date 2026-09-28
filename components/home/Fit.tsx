import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, Shell } from './primitives';

/* Section 8 — Who this suits. docs/copy/home.md §8.
 *
 * Both columns carry equal visual weight. No red, no green, no crosses, no
 * struck-through text on the right-hand list. A disqualifier rendered as a
 * failure state reads as a judgement on the reader; rendered as a statement of
 * fit it reads as candour, and candour is what makes someone in the left column
 * trust the left column.
 *
 * The two lists are siblings under one H2 with their own H3s, so a screen
 * reader gets the contrast from the headings rather than from the layout.
 */

const FITS = [
  'You sell a considered purchase with a sales cycle measured in weeks, not minutes',
  'Referrals have carried your growth and you want a second channel',
  'Someone at your firm can approve and publish website changes',
  'You have people who are willing to be named and quoted publicly',
  'You can commit to three months before judging the work',
];

const DOES_NOT_FIT = [
  'You are pre-revenue, or selling something low-ticket and transactional',
  'You need leads this week',
  'You want a one-off project rather than a programme',
  'Nobody at your firm can edit the website',
  'Leads arrive and nobody follows up',
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
            <MaskReveal>We would rather say no at the snapshot stage.</MaskReveal>
          </h2>
          <p className="text-body mt-5 m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
            Than bill you for six months of the wrong thing.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger={2} className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <List title="Worth a conversation if" items={FITS} accent />
            <List title="Not worth either of our time if" items={DOES_NOT_FIT} accent={false} />
          </div>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
