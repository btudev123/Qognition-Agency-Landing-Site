import Link from 'next/link';
import { appendFunnelContext } from '../../lib/funnelContext';
import type { SubIndustryRecord } from '../../lib/b2b/registry';
import { siblingsOf } from '../../lib/b2b/graph';
import type { ObservationView } from '../../lib/b2b/observations';
import ObservationBlock from './ObservationBlock';
import DraftNotice from './DraftNotice';
import {
  SHELL,
  Label,
  BuyersBlock,
  FactsBlock,
  VocabularyBlock,
  AxesBlock,
  WhyLostBlock,
  SiblingsBlock,
  ServiceLinksBlock,
  ProofBlock,
  FaqsBlock,
  SnapshotCta,
} from './blocks';

/* TYPE B — the sub-niche page, at /industries/<meta-vertical>/<sub-niche>.
 *
 * This is where the value is. The hub carries the head term and the crawl; this
 * carries the citation surface, and it is the page type Nadia's content bar
 * (docs/seo/b2b-niche-architecture.md §4.1) is written for.
 *
 * Two blocks exist here and nowhere else, and they are the two that make the
 * page untemplatable:
 *
 *   VOCABULARY — six or more standards with their issuing body and what they
 *   gate. Swap the niche name and every one of them becomes wrong, which is the
 *   property the template-substitution detector in scripts/check-b2b.cjs tests
 *   for mechanically.
 *
 *   COMPARISON AXES — what buyers rank suppliers on, as axes rather than
 *   benefits. Machining compares on tolerance, certification scope, capacity,
 *   lead time and NPI support. An MDR provider is compared on MTTD, coverage
 *   hours, telemetry sources and escalation model. These do not interchange.
 *
 * LINKING UP, TWICE. Nadia §5.1 rule 1: once in the breadcrumb, once in the
 * body's first 200 words, anchor text is the hub's name both times. Both are
 * below and neither is decorative.
 */

interface Props {
  readonly record: Extract<SubIndustryRecord, { source: 'b2b' }>;
  readonly observation: ObservationView;
}

export default function SubNichePage({ record, observation }: Props) {
  const { vertical, subNiche, body, state } = record;
  const hubPath = `/industries/${vertical.id}`;
  const path = `${hubPath}/${subNiche.id}`;
  const siblings = siblingsOf(vertical, subNiche.id);
  const key = `${vertical.id}-${subNiche.id}`;

  return (
    <main className="min-h-screen">
      {state === 'draft' && <DraftNotice path={path} />}

      <section className={`${state === 'draft' ? 'pt-10' : 'pt-32 sm:pt-40'} pb-14 sm:pb-18`}>
        <div className={SHELL}>
          {/* Up-link 1 of 2. Anchor is the hub's name, not "back". */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href={hubPath}
              className="text-meta inline-flex items-center gap-2"
              style={{ color: 'var(--s-text-muted)' }}
            >
              <span aria-hidden="true">&larr;</span> {vertical.label}
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
            <div className="lg:col-span-7">
              <Label accent>{vertical.label}</Label>
              <h1 className="text-h1 font-sans m-0 mt-4 max-w-[18ch] font-semibold">
              {/* NEVER lowercase a taxonomy label. `.toLowerCase()` shipped here
                  first and rendered "cnc machining", destroying the acronym; it
                  would also produce "saas and software", "it services" and
                  "medtech and devices". Sentence flow is not worth mangling an
                  entity name that a model is meant to match. */}
                AI search visibility for {subNiche.label}.
              </h1>

              <h2 className="text-h3 font-sans mt-10 mb-3 max-w-[40ch] font-semibold">
                {body.buyerQuestion}
              </h2>
              <p className="text-body m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
                {body.opener}
              </p>

              {/* Up-link 2 of 2, inside the first 200 words, same anchor text. */}
              <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
                Explore more in{' '}
                <Link href={hubPath} className="rf-link" style={{ color: 'var(--s-accent)' }}>
                  {vertical.label}
                </Link>
                , including related buyer questions and service approaches.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-3">
                <Link href={appendFunnelContext("/book", { page_id: path, stage: "bofu" })} className="rf-btn rf-btn--primary">
                  Book a call
                </Link>
                <Link href={appendFunnelContext("/contact#enquiry", { page_id: path, stage: "bofu" })} className="rf-btn rf-btn--secondary">
                  Send an enquiry
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div
                className="p-6"
                style={{ background: 'var(--s-surface-2)', border: '1px solid var(--s-rule-hairline)' }}
              >
                <Label>What a buyer filters on here</Label>
                <ul className="list-none p-0 m-0 mt-4">
                  {body.comparisonAxes.map((a) => (
                    <li
                      key={a.axis}
                      className="py-2.5"
                      style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}
                    >
                      <span className="text-body" style={{ color: 'var(--s-text)' }}>
                        {a.axis}
                      </span>
                    </li>
                  ))}
                </ul>
                {subNiche.examples && subNiche.examples.length > 0 && (
                  <>
                    <p className="text-meta mt-5 mb-1 m-0" style={{ color: 'var(--s-text-faint)' }}>
                      Firm types in this niche
                    </p>
                    <p className="text-meta m-0" style={{ color: 'var(--s-text-muted)' }}>
                      {subNiche.examples.join(' · ')}
                    </p>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ObservationBlock view={observation} nicheLabel={subNiche.label} idPrefix={key} />

      <WhyLostBlock text={body.whyTheAnswerIsLost} id={`${key}-why`} />
      <BuyersBlock buyers={body.buyers} id={`${key}-buyers`} />
      <AxesBlock axes={body.comparisonAxes} id={`${key}-axes`} />
      <VocabularyBlock terms={body.vocabulary} id={`${key}-vocab`} />
      <FactsBlock facts={body.facts} id={`${key}-facts`} />
      <ServiceLinksBlock id={`${key}-services`} />
      <SiblingsBlock siblings={siblings} id={`${key}-siblings`} />
      <ProofBlock proof={body.proof} id={`${key}-proof`} />
      <FaqsBlock faqs={body.faqs} id={`${key}-faqs`} />
      <SnapshotCta question={body.snapshotQuestion} id={`${key}-cta`} />
    </main>
  );
}
