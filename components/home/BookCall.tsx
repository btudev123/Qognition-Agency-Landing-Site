import Link from 'next/link';
import CalBooking from '../shared/CalBooking';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, Shell } from './primitives';

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
              <MaskReveal>30 minutes. Here is what we cover.</MaskReveal>
            </h2>
            <p className="text-body mt-5 m-0 max-w-[48ch]" style={{ color: 'var(--s-text-muted)' }}>
              Bring your website and the buyers you want to reach. It is a working conversation about your situation, not a slide deck.
            </p>

            <ul className="list-none p-0 mt-8 grid gap-3">
              {[
                'Who you sell to, and the questions your buyers ask before they shortlist.',
                'What we would check first in Google and AI search, and why.',
                'Whether we are the right fit. If we are not, we will say so.',
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

            {/* No turnaround here until the operator supplies one. Never a guessed N. */}
            <p className="text-meta mt-6 m-0 max-w-[48ch]" style={{ color: 'var(--s-text)' }}>
              After the call you get a written scope and fee.
            </p>

            <p className="text-meta mt-8 m-0 max-w-[48ch]" style={{ color: 'var(--s-text-faint)' }}>
              Prefer to write? <Link href="/contact#enquiry" className="underline">Send an enquiry</Link> with the challenge you want to solve.
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
