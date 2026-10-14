import Link from 'next/link';
import { FileText, MessageSquareText, Scale, ScanSearch } from 'lucide-react';
import CalBooking from '../shared/CalBooking';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { InlineIcon } from '../visual/IconTile';
import { Eyebrow, Shell } from './primitives';

/* Brief §2.8: the copy column only. The section id, CalBooking, minHeight and
   the widget wrapper are unchanged; scripts/check-funnel.cjs asserts them. */
const COVER = [
  { icon: MessageSquareText, line: 'The questions your buyers ask before they shortlist, and which ones we would test first.' },
  { icon: ScanSearch, line: 'Where you can win soonest: AI answers, Google or paid search, and why.' },
  { icon: Scale, line: 'Whether we are the right fit. If we are not, we will say so.' },
];

export default function BookCall() {
  return (
    <section
      id="book"
      data-theme="light"
      className="py-24 sm:py-32"
      style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
    >
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
          <ScrollReveal>
            <Eyebrow accent>Book a call</Eyebrow>
            <h2 className="text-h2 font-sans m-0 mt-4 max-w-[18ch] font-semibold">
              <MaskReveal>30 minutes. You leave knowing what we would fix first.</MaskReveal>
            </h2>
            <ul className="list-none p-0 mt-8 grid gap-4">
              {COVER.map(({ icon, line }) => (
                <li key={line} className="flex gap-3 text-body" style={{ color: 'var(--s-text)' }}>
                  <InlineIcon icon={icon} />
                  {line}
                </li>
              ))}
            </ul>

            {/* No turnaround here until the operator supplies one. Never a guessed N. */}
            <p className="flex gap-3 text-body mt-6 m-0 pt-6 max-w-[48ch]" style={{ color: 'var(--s-text)', borderTop: '1px solid var(--s-rule-hairline)' }}>
              <InlineIcon icon={FileText} />
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
