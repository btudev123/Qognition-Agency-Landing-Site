import type { Metadata } from 'next';
import Link from 'next/link';
import AIPlatforms from '../../components/shared/AIPlatforms';
export const metadata: Metadata={title:'Our AI SEO & GEO Approach',description:'See how Qognition plans and delivers AI SEO and GEO: buyer research, technical foundations, expert content, authority and commercial measurement.',alternates:{canonical:'/process'}};

/* docs/copy/2026-10/process.md. No review cadence is named ("the agreed
   schedule") until the operator confirms a default one. */
const phases = [
  ['01 · Call and scope', 'Agree what to fix first.', 'A 30-minute call about your buyers and your site. Then a written scope and fee. If you want a full diagnosis before committing, we can offer a paid audit.', 'Written scope · Fee · Agreed measures'],
  ['02 · Baseline', 'Fix what to measure, then measure it.', 'We agree the buyer questions, platforms, markets and review dates. We run the first set and date every answer. The set changes later only with a recorded reason.', 'Prompt set · Dated baseline · Report columns'],
  ['03 · Deliver', 'Fix what you control. Work on what you don’t.', 'Technical fixes, clear service pages and consistent company facts on your site. Then the third-party sources your buyers’ answers cite. PPC and conversion work where the scope includes them.', 'Reviewed pages · Source plan · Campaign assets'],
  ['04 · Review', 'Compare with the baseline.', 'We re-run the same prompt set and report AI answers, rankings, visits and qualified enquiries in separate columns. We keep what moves enquiries and change what doesn’t.', 'Dated comparison · Sales feedback · Next priorities'],
] as const;

export default function Page() {
  return (
    <main className="growth-shell growth-page">
      <p className="growth-eyebrow">OUR APPROACH</p>
      <h1>How an engagement runs, from the first call to the first report</h1>
      <p className="growth-page-intro">
        It starts with a 30-minute call and a written scope. Then we fix a prompt set and run a dated baseline. We fix what you control, work on the sources answers draw from, and re-run the same set on the agreed schedule.
      </p>
      <AIPlatforms compact />
      <section className="growth-page-section">
        <div className="growth-plain-grid">
          {phases.map(([step, title, body, output]) => (
            <article key={step} className="growth-plain-card">
              <p className="growth-eyebrow">{step}</p>
              <h2>{title}</h2>
              <p>{body}</p>
              <p className="mt-6">{output}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="growth-page-section">
        <h2>AI-search measurement, made explicit.</h2>
        <p className="growth-page-intro">
          We agree the platforms, languages, locations and buyer questions before tracking starts. Each answer is recorded with the date, the answer itself, the sources it cited and the sampling method. A single citation does not show market share, and it does not show revenue. So we review repeat observations next to search data and your CRM.
        </p>
        <p className="mt-4">
          <Link className="growth-text-link" href="/case-studies/methodology">How we handle evidence →</Link>
        </p>
        <div className="growth-actions">
          <Link className="growth-button" href="/book">Book a call</Link>
          <Link className="growth-text-link" href="/contact#enquiry">Send an enquiry</Link>
        </div>
      </section>
    </main>
  );
}
