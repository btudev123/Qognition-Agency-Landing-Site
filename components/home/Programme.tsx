import { BadgeCheck, Blocks, CalendarCheck, Compass } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, GhostWord, Shell } from './primitives';
import v from '../visual/visual.module.css';

const PHASES = [
  {
    n: '01', window: 'Discovery', title: 'Understand the buying decision', icon: Compass,
    deliverable: 'A buyer brief, the prompt set and a dated baseline on the agreed platforms.',
  },
  {
    n: '02', window: 'Foundations', title: 'Make your firm easy to read', icon: Blocks,
    deliverable: 'A prioritized list of fixes, each with an owner and a date.',
  },
  {
    n: '03', window: 'Authority', title: 'Support the claims buyers check', icon: BadgeCheck,
    deliverable: 'An authority plan built on real expertise, with every external claim checked.',
  },
  {
    n: '04', window: 'Review', title: 'Compare against the baseline', icon: CalendarCheck,
    deliverable: 'A dated comparison and the next priorities.',
  },
];

/* Brief §2.6. The ghost numeral that sat behind each step was white at 0.028
   alpha on the off-white ground, so it was invisible; it was aria-hidden and
   duplicated the visible label, and it is gone. The step marker is a 48px icon
   tile on the rail, and the "01 · Discovery" label is the accent colour.

   Below lg: a vertical timeline, a 1px rail through the tile centres at x = 24px.
   lg+: four columns, the .rf-rail drawn through the tile centres at y = 24px. */
export default function Programme() {
  return (
    <section data-theme="light" className="relative overflow-hidden py-20 sm:py-28" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <GhostWord>PROCESS</GhostWord>

      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 lg:items-end">
          <ScrollReveal className="lg:col-span-6">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-h2 font-sans m-0 mt-4 font-semibold">
              <MaskReveal>From buyer questions to sales conversations.</MaskReveal>
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={2} className="lg:col-span-6">
            <p className="text-body m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
              One scope and one review rhythm, agreed in writing before work starts.
            </p>
          </ScrollReveal>
        </div>

        <div className="relative mt-14">
          {/* Rails. Decorative. Vertical below lg, horizontal from lg. */}
          <div
            className="absolute left-6 top-6 bottom-6 w-px lg:hidden"
            style={{ background: 'var(--s-rule)' }}
            aria-hidden="true"
          />
          <div className="absolute left-0 right-0 top-6 hidden lg:block overflow-hidden" style={{ height: 1 }} aria-hidden="true">
            <div className="rf-rail h-full" />
          </div>

          <ol className="relative grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8 list-none p-0 m-0">
            {PHASES.map((p, i) => {
              const Icon = p.icon;
              return (
                <ScrollReveal key={p.n} as="li" stagger={i + 1} className="relative pl-16 lg:pl-0">
                  <span
                    className={`${v.iconTile} absolute left-0 top-0 h-12 w-12 lg:static`}
                    style={{ borderColor: i === 0 ? 'var(--s-accent-graphic)' : 'var(--s-rule-strong)' }}
                    aria-hidden="true"
                  >
                    <Icon size={32} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                  </span>
                  <div
                    className="font-mono text-meta tracking-[0.14em] uppercase pt-3 lg:pt-6"
                    style={{ color: 'var(--s-accent)' }}
                  >
                    {p.n} · {p.window}
                  </div>
                  <h3 className="text-h3 font-sans mt-3 m-0 font-semibold">{p.title}</h3>
                  <p
                    className="text-meta mt-4 m-0 pl-4"
                    style={{ color: 'var(--s-text-muted)', borderLeft: '1px solid var(--s-rule)' }}
                  >
                    {p.deliverable}
                  </p>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>

        {/* This paragraph is the point of the section. It replaces
            "every quarter your CAC drops", and it is not a hedge. It is the
            differentiator. CLAUDE.md §4. */}
        <ScrollReveal stagger={5} className="mt-16 pt-8" style={{ borderTop: '1px solid var(--s-rule)' }}>
          <p className="text-body m-0 max-w-[72ch]" style={{ color: 'var(--s-text)' }}>
            No one controls what ChatGPT or Google says, and anyone who promises you a placement is
            guessing. We commit to the work, the measurement and a dated record of both, so you can
            see what moved.
          </p>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
