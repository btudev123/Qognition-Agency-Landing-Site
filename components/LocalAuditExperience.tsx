import Link from 'next/link';
import { auditRequestHref } from '../lib/funnelContext';

/* /free-ai-audit. docs/copy/2026-10/free-ai-audit.md.
 *
 * No form here. Operator, 2026-10-14: "all leads should end up in /contact". The
 * one button sends the visitor to /contact tagged asset_id=free-ai-visibility-audit
 * (lib/funnelContext.ts AUDIT_ASSET_ID), and /contact submits that lead with
 * intent "audit". "Book a call" stays a text link, and AIPlatforms is not
 * rendered here because every chip is an external link on a page with one job.
 *
 * H1 is Nadia's (docs/strategy/2026-10/02-search-sprint.md §3.3), not the
 * draft's "Request a free AI visibility audit". The offer name everywhere else
 * on the page is the operator's "Free AI visibility audit" (N1).
 *
 * Anchor: #scope is linked from the homepage Snapshot section. #request is gone;
 * scripts/check-funnel.cjs fails if anything still links to it.
 * No turnaround promise anywhere (O5): "We confirm timing when we reply."
 * Held: the redacted sample section (NEEDS DATA) and "the model version" in
 * scope item 2 (CONFIRM). */
const REQUEST_HREF = auditRequestHref({ page_id: '/free-ai-audit', stage: 'bofu' });

export default function LocalAuditExperience() {
  return (
    <main className="growth-shell growth-page">
      <p className="growth-eyebrow">FREE AI VISIBILITY AUDIT</p>
      <h1>Request a free AI search and SEO visibility audit</h1>
      <p className="growth-page-intro">
        Tell us your website and the buyers you want to reach. A person on our team tests a sample of their questions on the agreed AI platforms and Google, checks your site&apos;s technical readiness, and sends you what they found. Every answer comes with its date and the sources it cited. It is free.
      </p>
      <div className="growth-actions">
        <Link className="growth-button" href={REQUEST_HREF}>Request your free audit</Link>
        <Link className="growth-text-link" href="/book">Prefer to talk first? Book a call</Link>
      </div>

      <section className="growth-page-section growth-plain-grid">
        <div id="scope" className="scroll-mt-28">
          <h2>What your audit covers</h2>
          <ul className="space-y-5 leading-relaxed">
            <li><strong>Your buyers&apos; questions.</strong> The questions your buyers ask when they compare suppliers, based on what you tell us, not a generic template.</li>
            <li><strong>What the platforms said.</strong> Each question tested on the agreed AI platforms, with the answer, the firms it named, the sources it cited and the date.</li>
            <li><strong>Your site&apos;s readiness.</strong> Whether Google can find your pages, how your commercial pages read, and how clearly your site describes your company.</li>
            <li><strong>Where we would start.</strong> The first fixes we would make, and why.</li>
          </ul>
        </div>
        <div className="growth-plain-card">
          <h2>Probably not for you if</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You sell mainly to consumers</li>
            <li>You are pre-revenue</li>
            <li>You need leads this week</li>
          </ul>
        </div>
      </section>

      <section className="growth-page-section">
        <h2>What happens next</h2>
        <p className="growth-page-intro">
          A person on our team reads every request and replies by email to confirm the scope. We confirm timing when we reply. There is no obligation to book a call.
        </p>
      </section>

      <section className="growth-page-section">
        <h2>What the audit is not</h2>
        <p className="growth-page-intro">
          It is not a score, and it is not your permanent position. Ask the same question twice and you can get two answers. The audit tells you what we observed, on which platform, on which date. That is why every answer in it carries a date.
        </p>
      </section>
    </main>
  );
}
