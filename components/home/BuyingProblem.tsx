import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, Shell } from './primitives';

export default function BuyingProblem() {
  return (
    <section data-theme="dark" className="py-16 sm:py-24" style={{ borderBlock: '1px solid var(--s-rule-hairline)' }}>
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <ScrollReveal className="lg:col-span-4">
            <Eyebrow>The buying problem</Eyebrow>
          </ScrollReveal>

          <div className="lg:col-span-8">
            <ScrollReveal>
              <h2 className="text-h2 font-sans m-0 max-w-[22ch] font-semibold">
                <MaskReveal>Your analytics can&apos;t show you what an assistant said about you.</MaskReveal>
              </h2>
            </ScrollReveal>

            <ScrollReveal stagger={2}>
              <p className="text-body mt-6 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
                A buyer can ask ChatGPT, Perplexity or Google&apos;s AI Mode for a shortlist before visiting a single vendor site. The answer draws on your pages and on what other sites say about you.
              </p>
              <p className="text-body mt-5 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
                Your analytics only see the buyers who click through. They cannot show you an answer that named a competitor instead, or one that described your firm wrongly. The only way to know is to ask the question yourself, on each platform, and write down the date.
              </p>
              <p className="text-body mt-5 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
                That is where we start. We test the questions your buyers ask and record what each platform returned. Then we work on what you control: your site, your company facts and the sources that describe you.
              </p>
            </ScrollReveal>

            <ScrollReveal stagger={3}>
              <blockquote
                className="mt-10 pl-6 m-0"
                style={{ borderLeft: '2px solid var(--s-accent-graphic)' }}
              >
                <p className="text-h3 font-sans m-0 font-medium" style={{ color: 'var(--s-text)' }}>
                  We work on what you can control, and we date what you can&apos;t.
                </p>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
