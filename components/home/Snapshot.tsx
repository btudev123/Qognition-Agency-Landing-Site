import Link from 'next/link';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, Shell } from './primitives';

/* Section 7 — Start with the snapshot. docs/copy/home.md §7.
 *
 * The primary conversion surface on the page. Everything else on `/` exists to
 * get a reader here or to the walkthrough (CLAUDE.md §3).
 *
 * "What it is not" renders at the same weight as "what you get" and is not
 * collapsed, greyed or moved below the CTA. It is the section's credibility and
 * it is the reason the snapshot converts at all: a reader who has been told
 * what a thing cannot do believes what they are told it can.
 *
 * No delivery SLA appears here. The orphaned design promised "delivered within
 * 48 hours" and no such commitment is confirmed. A turnaround time goes back on
 * the page when someone will stand behind it, with who owns it.
 */

/* The hero panel already lists what comes back. This section carries the part
   the hero cannot: how it is produced, and where it stops. Repeating the
   deliverable list here would be the third time a reader sees it and the second
   time it says nothing new. */
const STEPS = [
  'You tell us the site and the buyers you sell to.',
  'We build a prompt set from the questions those buyers actually ask.',
  'We run a sample of it across the assistants and crawl your site for the entity and technical signals that feed those answers.',
  'You get the prompts, what each platform returned, the date we ran it, and the two or three things we would do first.',
];

export default function Snapshot() {
  return (
    /* Light band, raised: --s-surface-1 is white on the warm off-white ground, so
       the conversion block lifts off the page without needing a second dark
       section next to the one above it. CLAUDE.md §9 — the alternation is the
       design, and three dark bands in a row is not an alternation. */
    <section className="py-20 sm:py-28" style={{ background: 'var(--s-surface-1)', borderBlock: '1px solid var(--s-rule)' }}>
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <Eyebrow accent>The free snapshot</Eyebrow>
              <h2 className="text-h2 font-sans m-0 mt-4 max-w-[16ch] font-semibold">
                <MaskReveal>Start with the snapshot.</MaskReveal>
              </h2>
              <p className="text-body mt-5 m-0 max-w-[56ch]" style={{ color: 'var(--s-text-muted)' }}>
                It is a small version of the first two weeks of the engagement. We build a prompt
                set from your buyers’ questions, run a sample of it across the assistants, crawl
                your site for the technical and entity signals that feed those answers, and send you
                the result.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <Link href="/free-ai-audit" className="rf-btn rf-btn--primary">
                  Get your free snapshot
                </Link>
                <Link href="/free-ai-audit#scope" className="rf-btn rf-btn--secondary">
                  What it covers, and what it does not
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ScrollReveal stagger={2}>
              <h3
                className="text-h4 font-sans m-0 pb-4 font-semibold"
                style={{ borderBottom: '1px solid var(--s-rule)' }}
              >
                How it is produced
              </h3>
              <ol className="list-none p-0 m-0 mt-5 grid gap-4">
                {STEPS.map((item, i) => (
                  <li key={item} className="flex gap-3 text-body" style={{ color: 'var(--s-text-muted)' }}>
                    <span
                      className="font-mono text-meta tracking-[0.1em] flex-shrink-0 mt-1"
                      style={{ color: 'var(--s-accent)' }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </ScrollReveal>

            <ScrollReveal stagger={3}>
              <h3
                className="text-h4 font-sans m-0 pb-4 font-semibold"
                style={{ borderBottom: '1px solid var(--s-rule)' }}
              >
                What it is not
              </h3>
              <p className="text-body mt-5 m-0" style={{ color: 'var(--s-text-muted)' }}>
                A sample of prompts is a sample. Different prompts, a different day, or a different
                account can produce a different answer.
              </p>
              <p className="text-body mt-4 m-0" style={{ color: 'var(--s-text-muted)' }}>
                The snapshot tells you what we observed on one date. It does not tell you your
                permanent position, and any agency that says otherwise is guessing.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
