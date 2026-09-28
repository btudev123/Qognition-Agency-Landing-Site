import Link from 'next/link';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { getCaseStudy, nicheLabel } from '../../data/case-studies';
import { caseStudyEvidence } from '../../data/case-studies/types';
import { Eyebrow, Shell } from './primitives';

/* Section 2 — What we can prove today, and what we cannot. docs/copy/home.md §2.
 *
 * This is what replaces `SelectedWorks` from the orphaned app/HomePage.tsx, and
 * the replacement is the whole argument of the page rather than a downgrade.
 *
 * The old section was headed "Receipts, not promises" over a grid of case
 * studies. Every KPI in data/case-studies is baseline/target/change with no
 * `actual` populated, so caseStudyEvidence() returns 'projected' for all of
 * them. A section headed "receipts" over projected numbers is the exact thing
 * CLAUDE.md §4 exists to stop, and the old FEATURED_CASE_STUDY_ID comment
 * asserted "verified KPIs" about a record the function grades projected.
 *
 * It also featured Fox Service Company, a residential HVAC, plumbing and
 * electrical contractor, on a page addressed to B2B firms. The proof argued
 * against the page.
 *
 * The featured record is now alliance-insurance-group: an independent agency
 * selling employee benefits, group health, business insurance, payroll, HR and
 * PEO to employers. The client's buyer is a business, it is publishGate
 * 'publish', and it is in the flagship vertical.
 *
 * Its numbers are still targets and the card says so in the label, in the
 * heading above it, and in the sentence under it. That is three statements of
 * the same fact, which is correct: one of them will be the one a reader
 * happens to look at.
 *
 * The competitor-gap block from Theo's copy is NOT rendered. It carries
 * [NEEDS DATA: dated competitor case-study audit]. Theo's build note says to
 * cut the block rather than soften it, and CLAUDE.md §4 says omit a section
 * rather than fill it with a placeholder.
 */

const FEATURED_CASE_STUDY_ID = 'alliance-insurance-group';

const SOURCES = [
  {
    kicker: 'The problem is documented',
    title: 'The independent firm is missing from the answer',
    body: 'Wellows analysed 1,960 insurance prompts that produced 34,238 citations across 3,831 domains. Insurer-owned domains captured 4.6% of those citations. The single most-cited domain was Reddit, at 3.5%.',
    caveat:
      'Wellows is an agency working in this category, so treat it as vendor research. The method is published, which is why we cite it.',
    source: 'Wellows, AI Visibility for Insurance Marketing Agencies',
    date: '12 August 2026',
    href: 'https://wellows.com/blog/ai-visibility-for-insurance-marketing-agencies/',
  },
  {
    kicker: 'Part of this is now measurable',
    title: "Google's own data now reports AI impressions",
    body: 'Search Console added generative AI performance reporting, rolled out to all sites worldwide on 31 August 2026. It reports impressions from AI Overviews, AI Mode and generative AI features in Discover, broken out by page, country and date.',
    caveat:
      'It does not report clicks. So we can show you movement on Google’s AI surfaces from Google’s own numbers, and we cannot show you traffic from them.',
    /* Cites Google's Search Console Help documentation, not the June 2026 Search
       Central announcement that was here before.

       The announcement is dated 2026/06 in its own URL and introduces a phased
       rollout. It cannot support the sentence above it, which asserts a 31 August
       2026 worldwide completion. A card arguing that we date our claims must not
       link to a source that disagrees with its own date, so the link now points
       at the page that carries the statement verbatim: "As of August 31, 2026,
       we've rolled out these insights to all websites worldwide."

       Verified against the live Help page on 2026-09-28. It also confirms the
       caveat directly: the report defines impressions and never mentions clicks. */
    source: 'Google Search Console Help, Generative AI performance report (Search)',
    date: 'Verified 28 September 2026',
    href: 'https://support.google.com/webmasters/answer/16984139',
  },
];

export default function Evidence() {
  const featured = getCaseStudy(FEATURED_CASE_STUDY_ID);
  const evidence = featured ? caseStudyEvidence(featured.kpis) : 'projected';
  const kpis = featured?.kpis.slice(0, 3) ?? [];

  return (
    <section data-theme="dark" className="py-20 sm:py-28" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <Shell>
        <ScrollReveal>
          <Eyebrow accent>Evidence</Eyebrow>
          <h2 className="text-h2 font-sans m-0 mt-4 max-w-[24ch] font-semibold">
            <MaskReveal>What we can prove today, and what we cannot.</MaskReveal>
          </h2>
          <p className="text-body mt-5 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
            Nobody in this category has a long results record in insurance or professional services,
            including us. The category is roughly two years old. Rather than fill that gap with
            numbers, here is the evidence that does exist.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px mt-12" style={{ background: 'var(--s-rule-hairline)' }}>
          {SOURCES.map((s, i) => (
            <ScrollReveal key={s.title} stagger={i + 1}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rf-hoverable rf-card flex h-full flex-col p-7 sm:p-9"
                style={{ background: 'var(--s-bg)' }}
              >
                <span className="flex items-center gap-3">
                  <span className="rf-dot w-2 h-2 rounded-full" aria-hidden="true" />
                  <span className="rf-card-label font-mono text-meta tracking-[0.14em] uppercase">
                    {s.kicker}
                  </span>
                </span>
                <h3 className="text-h3 font-sans mt-7 m-0 font-semibold">{s.title}</h3>
                <p className="text-body mt-4 m-0 flex-1" style={{ color: 'var(--s-text-muted)' }}>
                  {s.body}
                </p>
                <p className="text-meta mt-5 m-0" style={{ color: 'var(--s-text-faint)' }}>
                  {s.caveat}
                </p>
                <span
                  className="mt-6 pt-5 font-mono text-meta tracking-[0.1em] flex items-start justify-between gap-4"
                  style={{ borderTop: '1px solid var(--s-rule-hairline)', color: 'var(--s-accent)' }}
                >
                  <span>
                    {s.source}
                    <span className="block mt-1" style={{ color: 'var(--s-text-faint)' }}>
                      {s.date}
                    </span>
                  </span>
                  <span className="rf-arrow" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Dated observations, not a state. */}
        <ScrollReveal stagger={3} className="mt-12 pt-8" style={{ borderTop: '1px solid var(--s-rule)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <h3 className="text-h3 font-sans m-0 lg:col-span-5 font-semibold">
              Dated observations, not a state
            </h3>
            <div className="lg:col-span-7">
              <p className="text-body m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
                An AI answer is not a ranking. Ask the same question twice and you can get two
                answers. So we never tell a client they are invisible in AI search. We tell them
                what we saw, on which platform, from which prompts, on which date, and we run the
                same set again on a schedule so the comparison means something.
              </p>
              <p className="text-body mt-4 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
                Every number we put in front of a client carries the platform, the prompt set and
                the date it was observed.
              </p>
              <Link href="/case-studies/methodology" className="rf-btn rf-btn--secondary mt-6">
                How we handle evidence
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* The one engagement record on the page. Targets, said three times. */}
        {featured && (
          <ScrollReveal stagger={4} className="mt-12">
            <Link
              href={`/case-studies/${featured.id}`}
              className="rf-hoverable rf-card block p-7 sm:p-9"
              style={{ border: '1px solid var(--s-rule)' }}
            >
              <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="rf-card-label font-mono text-meta tracking-[0.14em] uppercase">
                  {featured.client} · {nicheLabel(featured.niche)} · {featured.market}
                </span>
                {/* The evidence grade is read from caseStudyEvidence(), never
                    written by hand, so this label cannot drift from the data.
                    It reads "targets" rather than "projected" because that is
                    the word a buyer understands. */}
                <span
                  className="font-mono text-meta tracking-[0.14em] uppercase px-2 py-1"
                  style={{
                    border: '1px solid var(--s-rule-strong)',
                    color: 'var(--s-text-faint)',
                  }}
                >
                  {evidence === 'verified' ? 'Reconciled results' : 'Targets, not results'}
                </span>
              </span>

              <h3 className="text-h3 font-sans mt-6 m-0 font-semibold">{featured.headline}</h3>
              <p className="text-body mt-3 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
                {featured.coreProblem}
              </p>

              <span
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-7 pt-6"
                style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
              >
                {kpis.map((k) => (
                  <span key={k.label} className="block">
                    <span
                      className="block text-h3 font-sans font-medium"
                      style={{ color: 'var(--s-accent)', fontFeatureSettings: '"tnum"' }}
                    >
                      {k.actual ?? k.target}
                    </span>
                    <span
                      className="block font-mono text-meta tracking-[0.1em] uppercase mt-2"
                      style={{ color: 'var(--s-text-faint)' }}
                    >
                      {k.label}
                      {!k.actual && ' (target)'}
                    </span>
                  </span>
                ))}
              </span>
            </Link>
            <p className="text-meta mt-4 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-faint)' }}>
              These figures are the targets the engagement is scoped against, derived from category
              benchmarks. They are not reported results. They are relabelled the moment client
              reporting is reconciled against them, and not before.
            </p>
          </ScrollReveal>
        )}
      </Shell>
    </section>
  );
}
