import Link from 'next/link';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { GradientMesh, Shell } from './primitives';

/* Section 10 — Final CTA. docs/copy/home.md §10.
 *
 * Harvested from `FinalCTA` in app/HomePage.tsx. The device survives: three
 * drifting orbs behind very large display type. Three changes.
 *
 * 1. The orbs are teal only. The violet rgba(99,58,237,0.09) and blue
 *    rgba(37,99,235,0.06) were leftovers from the retired 4-spoke palette and
 *    put two off-brand hues on the last thing a reader sees.
 *    docs/design/motion.md §3.3.
 *
 * 2. `rf-gradient-text-dark` on "Ready" is gone. A gradient headline has no
 *    single foreground colour, so it cannot be verified against AA. The same
 *    visual idea, checkable: a solid --s-accent-display word inside a --s-text
 *    heading. tokens-dark.md §8.
 *
 * 3. The size is text-display, not clamp(56px, 9vw, 180px). 180px is outside
 *    the scale. At 80px, 500 weight, on a black field, it already reads far
 *    larger than 80px does on white; if it still wants to be bigger after
 *    someone has seen it built, that is one clamp ceiling in
 *    tailwind.config.js, not an inline size here. tokens-dark.md §9.
 *
 * "Delivered within 48 hours" is removed. No turnaround SLA is confirmed by
 * anyone who would stand behind it, and CLAUDE.md §4 does not make an exception
 * for a promise that is merely operational.
 */
export default function FinalCta() {
  return (
    <section data-theme="dark" className="relative overflow-hidden py-24 sm:py-32" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <GradientMesh />
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <ScrollReveal className="lg:col-span-7">
            <h2 className="text-display font-sans m-0 max-w-[16ch]">
              <MaskReveal>See what the assistants</MaskReveal>{' '}
              <MaskReveal delay={0.08}>
                <span style={{ color: 'var(--s-accent-display)' }}>say about you.</span>
              </MaskReveal>
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger={2} className="lg:col-span-5">
            <p className="text-body m-0 max-w-[56ch]" style={{ color: 'var(--s-text-muted)' }}>
              We will run a sample of your buyers’ prompts, crawl your site, and send you what we
              found with the date on it. If the answer is that you are already well positioned, we
              will tell you that too.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/free-ai-audit" className="rf-btn rf-btn--primary">
                Get your free AI visibility snapshot
              </Link>
              <Link href="/contact" className="rf-btn rf-btn--secondary">
                Rather talk first
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Shell>
    </section>
  );
}
