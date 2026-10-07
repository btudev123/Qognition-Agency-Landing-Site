import type { Metadata } from 'next';
import Link from 'next/link';
import AIPlatforms from '../../components/shared/AIPlatforms';
export const metadata: Metadata = { title:'AI SEO & GEO Engagements', description:'Explore a tailored AI SEO and GEO engagement for your B2B business. Agree deliverables, responsibilities and measurement. Book a call or send an enquiry.', alternates:{canonical:'/pricing'} };

/* docs/copy/2026-10/pricing.md. No prices, ranges or tiers (2026-10-03). The PPC
   pricing basis is allowed (Ruth, 2026-10-07, D5); never the percentage or the
   minimum figure. The paid audit is a line offered on the call (CLAUDE.md §3),
   not a card (D10). */
const engagements = [
  ['Ongoing work', 'AI SEO and GEO, with SEO underneath.', 'A monthly scope across the layers your buyers use. Priorities, owners and review dates are agreed in writing. Reports keep AI answers, rankings and enquiries in separate columns.'],
  ['PPC management', 'Paid search, scoped on its own.', 'Google Ads and LinkedIn, priced as a share of ad spend with a monthly minimum. Run it alone or beside search work.'],
  ['A new market', 'A new country, region or language.', 'We check the questions buyers ask in that market before we publish anything there. We work remotely and do not claim offices in the markets we serve.'],
] as const;

function Actions() {
  return (
    <div className="growth-actions">
      <Link className="growth-button" href="/book">Book a call</Link>
      <Link className="growth-text-link" href="/contact#enquiry">Send an enquiry</Link>
    </div>
  );
}

export default function Page() {
  return (
    <main className="growth-shell growth-page">
      <p className="growth-eyebrow">PRICING</p>
      <h1>How we price AI SEO, GEO, SEO and PPC</h1>
      <p className="growth-page-intro">
        We don&apos;t publish prices. The fee depends on scope, and scope depends on your buyers, your markets and where your site starts. Below is what sets the fee, and when you&apos;ll see it in writing.
      </p>
      <Actions />
      <AIPlatforms compact />
      <section className="growth-page-section">
        <div className="growth-plain-grid">
          {engagements.map(([label, title, body]) => (
            <article className="growth-plain-card" key={label}>
              <p className="growth-eyebrow">{label}</p>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="growth-page-section">
        <h2>What sets the fee</h2>
        <ul className="grid gap-4">
          <li>How many buyer questions we track, and on which platforms</li>
          <li>Which markets and languages the work covers</li>
          <li>How many pages and other assets we produce each month</li>
          <li>The technical state of your site when we start</li>
          <li>How much your team implements, and how much we do</li>
        </ul>
        <p className="growth-page-intro mt-6">
          PPC management is a share of ad spend with a monthly minimum. Ad spend is always separate from our fee.
        </p>
      </section>
      <section className="growth-page-section">
        <h2>When you get a number</h2>
        {/* No turnaround until the operator supplies one. Never a guessed N. */}
        <p className="growth-page-intro">
          After a 30-minute call. We send a written scope and fee. If you want a full diagnosis before committing to ongoing work, we can offer a paid audit on the call.
        </p>
      </section>
      <section className="growth-page-section">
        <h2>What every proposal includes</h2>
        {/* The minimum-term line waits for operator confirmation (NEEDS DATA). */}
        <ul className="grid gap-4">
          <li>The buyers, commercial goals and baseline measures we agreed</li>
          <li>Deliverables, owners and review dates</li>
          <li>The access and approvals we need from your team</li>
          <li>The fee, third-party costs and engagement terms</li>
        </ul>
      </section>
      {/* The draft's "Book a call to get your scope" heading belongs to the inline
          calendar option (Marcus 6a), which is not built. Without it, the top
          action pair repeats here. */}
      <section className="growth-page-section">
        <Actions />
      </section>
    </main>
  );
}
