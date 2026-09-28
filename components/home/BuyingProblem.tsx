import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, Shell } from './primitives';

/* Section 3 — Your buyer shortlists before they ever contact you.
 * docs/copy/home.md §3.
 *
 * Replaces the `growth-tension` band. Same job on the page — one argument,
 * stated once, between the hero and the mechanism — and the same visual shape:
 * an eyebrow in a narrow left column against a wide right column.
 *
 * NO STATISTIC HERE, DELIBERATELY. Theo's copy carries a
 * [NEEDS DATA] for the share of B2B buying research completed before a vendor
 * is contacted. Every "62% of B2B buyers now start with AI" line in circulation
 * traces back to a vendor blog citing another vendor blog. CLAUDE.md §4: no
 * number appears anywhere that was not measured. The argument does not need one
 * — it is a description of a mechanism, and a reader either recognises it or
 * does not.
 */
export default function BuyingProblem() {
  return (
    <section data-theme="dark" className="py-16 sm:py-24" style={{ background: 'var(--d-surface-1)', borderBlock: '1px solid var(--d-rule-hairline)' }}>
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <ScrollReveal className="lg:col-span-4">
            <Eyebrow>The buying problem</Eyebrow>
          </ScrollReveal>

          <div className="lg:col-span-8">
            <ScrollReveal>
              <h2 className="text-h2 font-sans m-0 max-w-[22ch] font-semibold">
                <MaskReveal>Your buyer shortlists before they ever contact you.</MaskReveal>
              </h2>
            </ScrollReveal>

            <ScrollReveal stagger={2}>
              <p className="text-body mt-6 m-0 max-w-[72ch]" style={{ color: 'var(--d-text-muted)' }}>
                A commercial buyer researching a vendor now asks an assistant first. They describe
                their situation in a sentence, get three or four named firms back, and start their
                shortlist there. By the time anyone contacts you, the comparison has already
                happened somewhere you cannot see.
              </p>
              <p className="text-body mt-5 m-0 max-w-[72ch]" style={{ color: 'var(--d-text-muted)' }}>
                That is a different problem from ranking. A search result gives the buyer ten
                options and lets them choose. An assistant gives them three and explains why. If you
                are not one of the three, there is no page two to be on.
              </p>
              <p className="text-body mt-5 m-0 max-w-[72ch]" style={{ color: 'var(--d-text-muted)' }}>
                The mechanics are not mysterious. An assistant assembles an answer from sources it
                retrieves, and most of those sources are not your website. They are directories,
                association listings, review platforms, trade press, forums and comparison pages.
                Your site tells the model who you are. Everyone else’s content decides whether you
                get named.
              </p>
            </ScrollReveal>

            <ScrollReveal stagger={3}>
              <blockquote
                className="mt-10 pl-6 m-0"
                style={{ borderLeft: '2px solid var(--d-accent-graphic)' }}
              >
                <p className="text-h3 font-sans m-0 font-medium" style={{ color: 'var(--d-text)' }}>
                  You cannot sell to a buyer who never reached your website.
                </p>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
