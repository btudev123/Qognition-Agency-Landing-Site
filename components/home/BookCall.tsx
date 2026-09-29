import CalBooking from '../shared/CalBooking';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, Shell } from './primitives';

/* Section 11 — Book a call, with the calendar ON the page.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY THIS EXISTS. The homepage had two conversion paths and both ended in a
 * link: "Get your free snapshot" went to /free-ai-audit, "Book a 20-minute
 * walkthrough" went to /contact. A reader who had decided to book still had to
 * load another page, find the widget and wait for it, and every step between
 * intent and a held slot loses people who had already said yes.
 *
 * The LeadConnector widget was already built and already wired (CalBooking,
 * used on /book and /contact). It simply was not on the page where the decision
 * gets made. Operator, 2026-09-29: "where is the band for book 30 min call, add
 * the ghl lead connector there so clients can book calls easily."
 *
 * TWO PATHS, DELIBERATELY, because they are different readers.
 *   The snapshot is for someone who is not ready to talk and wants to see
 *   something first. It stays the primary CTA everywhere else on the page.
 *   This band is for someone who has already decided. It should cost them one
 *   scroll, not one navigation.
 *
 * DURATION IS NOT STATED HERE. Elsewhere the site says "20-minute walkthrough";
 * the operator has referred to a 30-minute call. The calendar itself is the
 * source of truth and it renders the real duration a few hundred pixels below
 * this heading, so a number in the heading can only ever contradict it.
 * `[NEEDS DATA: the configured duration on the LeadConnector calendar, so the
 * "20-minute walkthrough" label elsewhere either matches it or changes.]`
 *
 * LIGHT SURFACE, deliberately. FinalCta below is dark, and CLAUDE.md §9 says the
 * alternation is the design. It also gives the iframe a white field to render
 * into, which is what the widget is styled for.
 * ────────────────────────────────────────────────────────────────────────────
 */
export default function BookCall() {
  return (
    <section
      id="book"
      className="py-24 sm:py-32"
      style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
    >
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
          <ScrollReveal>
            <Eyebrow accent>Book a call</Eyebrow>
            <h2 className="text-h2 font-sans m-0 mt-4 max-w-[18ch] font-semibold">
              <MaskReveal>Pick a time that works.</MaskReveal>
            </h2>
            <p className="text-body mt-5 m-0 max-w-[48ch]" style={{ color: 'var(--s-text-muted)' }}>
              A working session, not a pitch. Bring the questions your buyers ask and the firms you
              lose to, and we will go through what the assistants currently return for them.
            </p>

            <ul className="list-none p-0 mt-8 grid gap-3">
              {[
                'We look at your site and your sector before the call, not during it.',
                'You leave with the prompts we would run, whether or not you hire us.',
                'If AI search is not your problem right now, we will say so.',
              ].map((line) => (
                <li key={line} className="flex gap-3 text-meta" style={{ color: 'var(--s-text)' }}>
                  <span
                    className="mt-1.5 w-1.5 h-1.5 flex-shrink-0"
                    style={{ background: 'var(--s-accent-graphic)' }}
                    aria-hidden="true"
                  />
                  {line}
                </li>
              ))}
            </ul>

            <p className="text-meta mt-8 m-0 max-w-[48ch]" style={{ color: 'var(--s-text-faint)' }}>
              Would rather see something first? Get the free AI visibility snapshot and book
              afterwards.
            </p>
          </ScrollReveal>

          {/* The widget itself. Not behind a click, not behind a navigation. */}
          <ScrollReveal stagger={2}>
            <div
              className="overflow-hidden"
              style={{ background: 'var(--s-surface-1)', border: '1px solid var(--s-rule)' }}
            >
              <CalBooking minHeight={680} />
            </div>
          </ScrollReveal>
        </div>
      </Shell>
    </section>
  );
}
