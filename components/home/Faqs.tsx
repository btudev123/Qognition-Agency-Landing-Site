import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { faqSchema } from '../../lib/schema';
import { Eyebrow, Shell } from './primitives';

/* Section 9 — FAQs. docs/copy/home.md §9.
 *
 * Native <details>/<summary>. No JS, no state, no accordion library. It is
 * keyboard-operable, screen-reader-announced and findable by browser in-page
 * search when closed in every current engine, none of which is true of a
 * div-and-onClick accordion.
 *
 * The answers are exported so lib/schema.ts can emit FAQPage JSON-LD from the
 * same strings the page renders. Two copies of an answer is how a page ends up
 * telling a crawler something different from a reader.
 *
 * The first answer is the most important sentence on the site. "No, and no one
 * can" is the position (CLAUDE.md §4) and it is also the sales argument.
 */

export const HOME_FAQS = [
  {
    q: 'Can you guarantee we appear in ChatGPT?',
    a: 'No, and no one can. We do not own or control these systems, their retrieval changes without notice, and the same prompt can return different answers on different days. What we commit to is the work, a measurement instrument you can inspect, and a dated record of what changed.',
  },
  {
    q: 'How is this different from the SEO we already pay for?',
    a: 'Classic SEO targets Google’s blue links. That work still matters, and it is inside our retainer, because assistants retrieve from sources that rank. What is new is the entity work and the off-site evidence layer that decides whether a model names you when it assembles an answer. Most SEO retainers do none of that, and most do not measure any AI surface at all.',
  },
  {
    q: 'Can you show me results from a firm like mine?',
    a: 'Usually yes, with one limit we state up front. In the B2B areas closest to most of our buyers, managed IT and cloud, cybersecurity, and B2B SaaS in part, every engagement was delivered white-label under signed NDAs. We can walk you through the scope, the method and what we changed, but we cannot name the client or arrange a reference call on that work. Where we have not worked in your exact vertical we say so, rather than stretching an adjacent case to fit, because the standards vocabulary and the buying committee change between verticals and a case that does not transfer is worse than no case. Either way you get a snapshot of your own situation, with your prompts and your competitors, before you pay anything.',
  },
  {
    q: 'How long before anything moves?',
    a: 'The technical and entity work shows up in weeks. The off-site evidence layer, which is the part that drives assistant citations, is slower, and we ask for three months before you judge it. Anyone quoting you a date for an AI citation is making it up.',
  },
  {
    q: 'Do we have to write the content?',
    a: 'No, we write it. We do need access to your people for roughly an hour a month, because the material that gets retrieved and cited is specific, and specific means it came from someone who does the work. Generic content written without you will not be retrieved.',
  },
  {
    q: 'What do you need from us to start?',
    a: 'Access to Google Search Console, Google Analytics, your Google Business Profile, and the ability to publish changes to your website. Plus one person who can make decisions and one hour a month from your subject-matter people.',
  },
];

export default function Faqs() {
  return (
    <section className="py-20 sm:py-28" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(HOME_FAQS.map((f) => ({ question: f.q, answer: f.a })))),
        }}
      />
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <ScrollReveal className="lg:col-span-4">
            <Eyebrow>Before we talk</Eyebrow>
            <h2 className="text-h2 font-sans m-0 mt-4 max-w-[14ch] font-semibold">
              <MaskReveal>Six honest answers.</MaskReveal>
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger={2} className="lg:col-span-8">
            {HOME_FAQS.map((f) => (
              <details key={f.q} className="group" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
                {/* min-h 44px on the summary is the pointer target floor, and
                    list-none plus the webkit marker reset removes the native
                    triangle without removing the disclosure semantics. */}
                <summary
                  className="flex items-start justify-between gap-6 cursor-pointer list-none py-5 min-h-11 text-h4 font-sans font-medium marker:hidden [&::-webkit-details-marker]:hidden"
                >
                  {f.q}
                  <span
                    className="font-mono flex-shrink-0 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                    style={{ color: 'var(--s-accent)' }}
                  >
                    +
                  </span>
                </summary>
                <p className="text-body mt-0 mb-6 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
                  {f.a}
                </p>
              </details>
            ))}
          </ScrollReveal>
        </div>
      </Shell>
    </section>
  );
}
