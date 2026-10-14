import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { faqSchema } from '../../lib/schema';
import { Eyebrow, Shell } from './primitives';


/* Feeds the page and faqSchema() alike: every edit here changes the JSON-LD.
   The minimum-term question ships only when the operator supplies the term
   (docs/copy/2026-10/home.md §11, entry 8). */
export const HOME_FAQS = [
  {
    q: 'What does an AI-native growth agency do?',
    a: 'We sell AI SEO, GEO and SEO to B2B firms, with B2B PPC alongside, and we track and report the work on software we built. Scriblr tracks what AI tools say about you, question by question, platform by platform, with a date on every answer. LinkersPro is our tool for authority and link work.',
  },
  {
    q: 'What is the difference between an AI SEO agency and an SEO agency?',
    a: "An SEO agency works on Google's search results. An AI SEO agency also works on the answers: Google's AI Overviews and AI Mode, and assistants such as ChatGPT, Perplexity, Gemini and Claude. The foundations overlap. The difference is measurement. We test the questions your buyers ask AI and report who each answer names, separately from rankings.",
  },
  {
    q: 'What is the difference between AI SEO and GEO?',
    a: 'AI SEO is the work on Google AI Overviews and AI Mode. GEO is the work on assistants: ChatGPT, Perplexity, Gemini, Claude and Copilot. SEO covers Google search results, and local SEO covers Maps, the local pack, Business Profile, reviews and listings. They share foundations, but we measure each one separately.',
  },
  {
    q: 'Can you guarantee AI recommendations or rankings?',
    a: 'No. Google and the AI platforms control their own answers. We commit to the agreed work and a dated record of what we observed: the prompt, the platform, the date and the sources cited. A single citation is not a permanent position, and it is not revenue.',
  },
  {
    q: 'How do you measure something that changes every time you ask?',
    a: 'We agree the list of buyer questions and the platforms before the first test, then re-run the same list on the agreed schedule. We save each answer with its date and the sources it cited, so you can compare and check every change. We report AI answers, Google rankings, visits that come from AI tools and qualified enquiries in separate columns.',
  },
  {
    q: 'Have you worked with firms like mine?',
    a: 'Ask us on the call and we will answer for your sector specifically. Where we have not worked in your category, we say so. Either way, your free AI visibility audit tests your own buyers\' questions against your own competitors before you commit to anything.',
  },
  {
    q: 'What does it cost?',
    a: 'We don\'t publish prices, because the fee depends on scope: how many buyer questions we track, which platforms and markets, and how many pages and assets we produce. You get a written scope and fee after the call. PPC management is priced separately, as a share of ad spend with a monthly minimum.',
  },
  {
    q: 'Will this clash with our team or current agency?',
    a: 'It shouldn\'t. We can work as the specialist layer beside your marketing team, your developers or another agency. The proposal names who owns each task, who approves content and who follows up on enquiries.',
  },
  {
    q: 'Can you run PPC too?',
    a: 'Yes. We run Google Ads and LinkedIn campaigns for B2B firms, built around the same buyers and pages as the search work. A firm that wants only PPC is a full client. Ad spend is agreed with you and kept separate from our fee.',
  },
];

export default function Faqs() {
  return (
    /* Shares one light band with Fit (brief §2.0): no top border, reduced top
       padding, and one hairline divider inside the Shell. */
    <section data-theme="light" className="pt-4 sm:pt-8 pb-20 sm:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          /* Every visible FAQ, uncapped: the JSON-LD must equal what the page shows. */
          __html: JSON.stringify(faqSchema(HOME_FAQS.map((f) => ({ question: f.q, answer: f.a })), { max: HOME_FAQS.length })),
        }}
      />
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-12 sm:pt-16" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
          <ScrollReveal className="lg:col-span-4">
            <Eyebrow>Before we talk</Eyebrow>
            <h2 className="text-h2 font-sans m-0 mt-4 max-w-[14ch] font-semibold">
              <MaskReveal>Before you book a call.</MaskReveal>
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
