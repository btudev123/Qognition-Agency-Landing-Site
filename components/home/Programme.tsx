import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, GhostWord, Shell } from './primitives';


const PHASES = [
  {
    n: '01', window: 'Discovery', title: 'Understand the buying decision',
    body: 'We learn what you sell, who approves it and which questions put a firm on their shortlist. Then we fix a prompt set and run the first baseline.',
    deliverable: 'A buyer brief, the prompt set and a dated baseline on the agreed platforms.',
  },
  {
    n: '02', window: 'Foundations', title: 'Make your firm easy to read',
    body: 'We fix what stops search engines and assistants reading you correctly: crawl and indexing problems, unclear service pages and inconsistent company facts.',
    deliverable: 'A prioritized list of fixes, each with an owner and a date.',
  },
  {
    n: '03', window: 'Authority', title: 'Support the claims buyers check',
    body: 'AI answers cite sources beyond your own site. We find the publications, directories and associations your buyers trust, and work on getting them to describe you accurately.',
    deliverable: 'An authority plan built on real expertise, with every external claim checked.',
  },
  {
    n: '04', window: 'Review', title: 'Compare against the baseline',
    body: 'We re-run the same prompt set on the agreed schedule. AI answers, rankings and qualified enquiries are reported in separate columns.',
    deliverable: 'A dated comparison and the next priorities.',
  },
];

export default function Programme() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <GhostWord>PROCESS</GhostWord>

      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <ScrollReveal className="lg:col-span-6">
            <Eyebrow>How the programme works</Eyebrow>
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

        <div className="relative mt-16">
          {/* The rail. Decorative, so it is hidden from assistive tech and only
              drawn where there is a horizontal axis to draw along. */}
          <div className="absolute left-0 right-0 top-0 hidden lg:block overflow-hidden" style={{ height: 1 }} aria-hidden="true">
            <div className="rf-rail h-full" />
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 list-none p-0 m-0">
            {PHASES.map((p, i) => (
              <ScrollReveal key={p.n} as="li" stagger={i + 1}>
                <div className="relative pt-10 lg:pt-14">
                  {/* Node on the rail. First one is live, the rest are not yet. */}
                  <span
                    className="absolute left-0 hidden lg:block w-3 h-3 rounded-full"
                    style={{
                      top: -6,
                      background: 'var(--s-bg)',
                      border: `2px solid ${i === 0 ? 'var(--s-accent-graphic)' : 'var(--s-rule-strong)'}`,
                    }}
                    aria-hidden="true"
                  />
                  {/* Ghost numeral. aria-hidden because the same number is in
                      the visible label directly below it. */}
                  <span
                    className="absolute left-0 select-none pointer-events-none font-mono"
                    style={{
                      top: i === 0 ? 4 : 4,
                      fontSize: 80,
                      fontWeight: 700,
                      letterSpacing: '-0.05em',
                      lineHeight: 1,
                      color: 'rgba(255,255,255,0.028)',
                    }}
                    aria-hidden="true"
                  >
                    {p.n}
                  </span>

                  <div
                    className="relative font-mono text-meta tracking-[0.14em] uppercase"
                    style={{ color: 'var(--s-text-faint)' }}
                  >
                    {p.n} · {p.window}
                  </div>
                  <h3 className="text-h3 font-sans relative mt-4 m-0 font-semibold">{p.title}</h3>
                  <p className="text-body mt-4 m-0" style={{ color: 'var(--s-text-muted)' }}>
                    {p.body}
                  </p>
                  <p
                    className="text-meta mt-4 m-0 pl-4"
                    style={{ color: 'var(--s-text-faint)', borderLeft: '1px solid var(--s-rule)' }}
                  >
                    {p.deliverable}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>

        {/* This paragraph is the point of the section. It replaces
            "every quarter your CAC drops", and it is not a hedge — it is the
            differentiator. CLAUDE.md §4. */}
        <ScrollReveal stagger={5} className="mt-16 pt-8" style={{ borderTop: '1px solid var(--s-rule)' }}>
          <p className="text-body m-0 max-w-[72ch]" style={{ color: 'var(--s-text)' }}>
            We do not control ChatGPT, Google or Perplexity, and we will not tell you when you will
            appear in them. What we commit to is the work, the measurement and the dated record of
            both.
          </p>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
