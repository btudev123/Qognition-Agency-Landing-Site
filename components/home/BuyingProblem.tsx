import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import DiagramBlindSpot from '../visual/DiagramBlindSpot';
import { Eyebrow, Shell } from './primitives';

/* Brief §2.3. The diagram replaces the paragraphs that described it. The 12-column
   split starts at xl, not lg: at 1024 a 7-column diagram cell is about 530px,
   under the 648px floor (0.9 x the 720 viewBox) that keeps its labels at 13px. */
export default function BuyingProblem() {
  return (
    <section data-theme="dark" className="py-16 sm:py-24" style={{ borderBlock: '1px solid var(--s-rule-hairline)' }}>
      <Shell>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 xl:items-center">
          <div className="xl:col-span-5">
            <ScrollReveal>
              <Eyebrow>The buying problem</Eyebrow>
              <h2 className="text-h2 font-sans m-0 mt-4 max-w-[22ch] font-semibold">
                <MaskReveal>Your analytics can&apos;t show you what an assistant said about you.</MaskReveal>
              </h2>
            </ScrollReveal>

            <ScrollReveal stagger={2}>
              <p className="text-body mt-6 m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
                A buyer can ask ChatGPT, Perplexity or Google&apos;s AI Mode for a shortlist before visiting a single vendor site. The answer draws on your pages and on what other sites say about you.
              </p>
            </ScrollReveal>

            {/* Below xl the diagram sits here, between paragraph 1 and the sentence
                it illustrates. From xl it is the right-hand column instead. */}
            <ScrollReveal stagger={2} className="mt-8 xl:hidden">
              <DiagramBlindSpot idPrefix="q-blindspot-stacked" />
            </ScrollReveal>

            <ScrollReveal stagger={3}>
              <p className="text-body mt-8 m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
                Your analytics only see the buyers who click through.
              </p>
              <blockquote className="mt-8 pl-6 m-0" style={{ borderLeft: '2px solid var(--s-accent-graphic)' }}>
                <p className="text-h3 font-sans m-0 font-medium" style={{ color: 'var(--s-text)' }}>
                  We work on what you can control, and we date what you can&apos;t.
                </p>
              </blockquote>
            </ScrollReveal>
          </div>

          <ScrollReveal stagger={2} className="hidden xl:block xl:col-span-7">
            <DiagramBlindSpot idPrefix="q-blindspot-wide" />
          </ScrollReveal>
        </div>
      </Shell>
    </section>
  );
}
