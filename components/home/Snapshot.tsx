import Link from 'next/link';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, Shell } from './primitives';


const STEPS = [
  'You send your website and the buyers you want to reach.',
  'A person on our team reviews it and chooses the buyer questions to test.',
  'We test those questions on the agreed platforms and record each answer with its date and cited sources.',
  'You get the findings and the first fixes we would make. We confirm timing when we reply.',
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
              <Eyebrow accent>Free AI visibility audit</Eyebrow>
              <h2 className="text-h2 font-sans m-0 mt-4 max-w-[16ch] font-semibold">
                <MaskReveal>Want to see the answers first?</MaskReveal>
              </h2>
              <p className="text-body mt-5 m-0 max-w-[56ch]" style={{ color: 'var(--s-text-muted)' }}>
                Send us your website and the buyers you want to reach. A person on our team tests a sample of their questions on the agreed AI platforms and Google, checks your site&apos;s technical readiness, and sends you what they found, with dates. It is free, and there is no obligation to book.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <Link href="/free-ai-audit#request" className="rf-btn rf-btn--primary">
                  Request your free audit
                </Link>
                <Link href="/free-ai-audit#scope" className="rf-btn rf-btn--secondary">
                  What the audit covers
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
                How it works
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
                Read findings in context
              </h3>
              <p className="text-body mt-5 m-0" style={{ color: 'var(--s-text-muted)' }}>
                A sample of prompts is a sample. Different prompts, a different day, or a different
                account can produce a different answer.
              </p>
              <p className="text-body mt-4 m-0" style={{ color: 'var(--s-text-muted)' }}>
                Each finding carries its date, method and scope. A clean technical check does not mean AI platforms will name you, and a citation does not mean revenue.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
