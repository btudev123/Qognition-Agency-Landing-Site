import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import DiagramBlindSpot from '../visual/DiagramBlindSpot';
import Link from 'next/link';
import SourceLink from '../shared/SourceLink';
import { G2_ANSWER_ECONOMY, G2_SOFTWARE_RESEARCH, brixioProof } from '../../data/sourcedClaims';
import { Eyebrow, Shell } from './primitives';

/* Brief §2.3. The diagram replaces the paragraphs that described it. The 12-column
   split starts at xl, not lg: at 1024 a 7-column diagram cell is about 530px,
   under the 648px floor (0.9 x the 720 viewBox) that keeps its labels at 13px. */
export default function BuyingProblem() {
  const proof = brixioProof();
  return (
    <section data-theme="dark" className="py-16 sm:py-24" style={{ borderBlock: '1px solid var(--s-rule-hairline)' }}>
      <Shell>
        {/* D-PROOF (docs/copy/2026-10/ai-search-is-winning.md §2.1). The first line of
            this section, never inside the hero <section>: a named client's figures a
            few centimetres from the unlabelled tracker panel read as that client's data
            (Ruth, 2026-10-08; ADR-0006 §12.3, §12.6). Omitted if the record cannot
            produce the cleared sentence. */}
        {proof && (
          <ScrollReveal>
            <p
              className="text-meta m-0 mb-10 pb-6 max-w-[96ch]"
              style={{ color: 'var(--s-text)', borderBottom: '1px solid var(--s-rule-hairline)' }}
            >
              {proof.text}{' '}
              <Link href={proof.href} className="underline underline-offset-4">
                Read the case study
              </Link>
            </p>
          </ScrollReveal>
        )}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 xl:items-center">
          <div className="xl:col-span-5">
            <ScrollReveal>
              <Eyebrow>Why now</Eyebrow>
              <h2 className="text-h2 font-sans m-0 mt-4 max-w-[22ch] font-semibold">
                <MaskReveal>The shortlist can form before anyone visits your website.</MaskReveal>
              </h2>
            </ScrollReveal>

            <ScrollReveal stagger={2}>
              <p className="text-body mt-6 m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
                A buyer asks ChatGPT, Perplexity, Gemini, Claude or Google&apos;s AI Mode which firms to consider. The answer names a few. That can be the whole shortlist, and the buyer has not opened a single vendor site.
              </p>
              {/* F2. Scoped to software buying and attributed to G2 in the sentence (Ruth, 2026-10-08). */}
              <p className="text-body mt-4 m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
                Software buying already works this way. {G2_SOFTWARE_RESEARCH}{' '}
                <SourceLink source={G2_ANSWER_ECONOMY} />
              </p>
            </ScrollReveal>

            {/* Below xl the diagram sits here, between paragraph 1 and the sentence
                it illustrates. From xl it is the right-hand column instead. */}
            <ScrollReveal stagger={2} className="mt-8 xl:hidden">
              <DiagramBlindSpot idPrefix="q-blindspot-stacked" />
            </ScrollReveal>

            <ScrollReveal stagger={3}>
              <p className="text-body mt-8 m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
                Your analytics only count the buyers who click. An answer that named a competitor leaves no trace in your reports.
              </p>
              <blockquote className="mt-8 pl-6 m-0" style={{ borderLeft: '2px solid var(--s-accent-graphic)' }}>
                <p className="text-h3 font-sans m-0 font-medium" style={{ color: 'var(--s-text)' }}>
                  Try it now. Ask ChatGPT who to hire for what you sell. Is your name in the answer?
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
