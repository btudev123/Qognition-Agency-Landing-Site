import type { Metadata } from 'next';
import Link from 'next/link';
import AIPlatforms from '../../components/shared/AIPlatforms';
import OfficeList from '../../components/shared/OfficeList';
import { OFFICES_SENTENCE } from '../../data/siteConfig';
export const metadata: Metadata={title:'About | AI SEO & GEO for B2B',description:'Qognition helps B2B companies make their expertise easier to discover through AI SEO, GEO, technical search work and useful content.',alternates:{canonical:'/about'}};

/* docs/copy/2026-10/about.md. Sentence 1 of the intro is Nadia's entity string
   (O2, pending operator approval): if the operator edits it, match it word for
   word here, in schema and in profiles. Held until confirmed: "Who you work with"
   (/team accuracy), "Software we built" (D9), and the rewritten AI-use card,
   which carries a CONFIRM, so the current card 2 stays. */
const principles = [
  ['Start with the buying decision', 'We learn what you sell, who approves the purchase and what they check, before we choose a channel.'],
  ['Use AI with judgment', 'Use automation for research and repeatable workflows, with people responsible for accuracy, relevance and decisions.'],
  ['Date every observation', 'An AI answer is an observation on a date, not a permanent position. We record the prompt, platform, date and sources every time.'],
  ['Keep the measures apart', 'Rankings, AI answers, visits, enquiries and revenue are different things. We report them separately, and targets stay labelled as targets.'],
] as const;

export default function Page() {
  return (
    <main className="growth-shell growth-page">
      <p className="growth-eyebrow">ABOUT QOGNITION AGENCY</p>
      <h1>We run AI search, SEO and PPC for B2B companies.</h1>
      <p className="growth-page-intro">
        Qognition Agency is a B2B AI search visibility agency that runs AI SEO, GEO, SEO, local SEO and B2B PPC for established B2B companies, including SaaS. {OFFICES_SENTENCE} Pages about other cities describe markets we serve, not offices.
      </p>
      <AIPlatforms />
      <section className="growth-page-section" aria-labelledby="about-offices-heading">
        <h2 id="about-offices-heading">Our offices</h2>
        <OfficeList labelledBy="about-offices-heading" className="grid-cols-1 sm:grid-cols-3 lg:grid-cols-5" />
      </section>
      <section className="growth-page-section">
        <h2>How we approach the work</h2>
        <div className="growth-plain-grid">
          {principles.map(([title, body]) => (
            <article key={title} className="growth-plain-card">
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="growth-page-section">
        <h2>Work with Qognition</h2>
        <p className="growth-page-intro">
          Bring the search problem you want solved and the buyers you want to reach. On a 30-minute call, we&apos;ll tell you where we would start and whether we&apos;re the right fit.
        </p>
        <div className="growth-actions">
          <Link className="growth-button" href="/book">Book a call</Link>
          <Link className="growth-text-link" href="/contact#enquiry">Send an enquiry</Link>
        </div>
      </section>
    </main>
  );
}
