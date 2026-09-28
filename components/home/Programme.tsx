import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, GhostWord, Shell } from './primitives';

/* Section 5 — What the first 90 days look like. docs/copy/home.md §5.
 *
 * Replaces `Methodology` in the orphaned app/HomePage.tsx. Every visual device
 * survives: the second ghost wordmark, the rail that draws left to right, the
 * four staggered steps each with its ghost numeral behind the phase label.
 *
 * Two things from the old content do not survive.
 *
 * METHOD_DATA's fourth step promised "every quarter your CAC drops". That is an
 * unmeasured outcome claim about someone else's business and CLAUDE.md §4 makes
 * no exception for it being in a design file. The honest note at the end of
 * this section is the replacement, and it is the strongest thing on the page:
 * we say what we do not control.
 *
 * The rail was `rf-page-in` at 1500ms behind a 500ms delay, so the timeline
 * finished drawing two seconds after a reader had already read all four steps.
 * It is now .rf-rail at 320ms with no delay (docs/design/motion.md §4 row 6).
 */

const PHASES = [
  {
    n: '01',
    window: 'Weeks 1 to 2',
    title: 'Baseline',
    body: 'A crawl of your site, your Search Console and Business Profile data, your listing and review footprint, and a prompt set built from the questions your buyers actually ask. We run that set across ChatGPT, Perplexity, Gemini, Copilot and Google AI Mode and record what came back, with dates.',
    deliverable:
      'You get the prompt set as a document. You can add to it, remove from it, and argue with it. It is the measurement instrument for the whole engagement, so it is worth arguing about.',
  },
  {
    n: '02',
    window: 'Weeks 3 to 6',
    title: 'Entity and foundations',
    body: 'Assistants need to be certain who you are before they will recommend you. One consistent description of your firm across your site, your schema, your Business Profile, your listings, your association entries and your team profiles. Where those disagree, we fix the disagreement.',
    deliverable:
      'In parallel: technical SEO, site structure, and the pages that answer the specific questions your buyers ask. This is the unglamorous half, and skipping it is why most GEO work produces nothing.',
  },
  {
    n: '03',
    window: 'Weeks 7 to 12',
    title: 'The evidence layer',
    body: 'Getting named in an AI answer usually depends on sources you do not own, so the work moves off your site: association profiles, industry directories, review platforms, trade publications, expert commentary under the names of your actual people, and comparison content a model can retrieve and attribute.',
    deliverable:
      'Named people matter more here than the firm does. A model retrieving commentary on contractor liability will find a person who wrote it, not a logo.',
  },
  {
    n: '04',
    window: 'Ongoing',
    title: 'Rerun, compare, report',
    body: 'The prompt set runs again on a fixed schedule. You see the same prompts, the same platforms, a new date, and what changed.',
    deliverable:
      'Alongside it: Search Console AI impressions, classic rankings, Maps performance, and the conversions your CRM recorded.',
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
              <MaskReveal>What the first 90 days look like.</MaskReveal>
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={2} className="lg:col-span-6">
            <p className="text-body m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
              One retainer, one team, a fixed rhythm.
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
            appear in them. What we commit to is the work, the measurement, and the dated record of
            both.
          </p>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
