import Link from 'next/link';
import { appendFunnelContext } from '../../lib/funnelContext';
import type { IndustryRecord } from '../../lib/b2b/registry';
import { childrenOf } from '../../lib/b2b/graph';
import type { ObservationView } from '../../lib/b2b/observations';
import ObservationBlock from './ObservationBlock';
import DraftNotice from './DraftNotice';
import {
  SHELL,
  Label,
  BuyersBlock,
  FactsBlock,
  WhyLostBlock,
  ChildrenBlock,
  ServiceLinksBlock,
  ProofBlock,
  FaqsBlock,
  SnapshotCta,
} from './blocks';

/* TYPE A — the meta-vertical hub, at /industries/<meta-vertical>.
 *
 * Reached only from the `b2b` branch of app/industries/[industry]/page.tsx. The
 * legacy branch in that file returns before this component is ever imported into
 * a render, so nothing here can affect what the 11 existing hubs emit.
 *
 * WHAT THIS PAGE IS FOR, in one line: the head term for the vertical, the crawl
 * hub for its sub-niches, and the entity anchor. It is not a longer version of a
 * sub-niche page — it deliberately carries no standards vocabulary and no
 * comparison axes, because those differ per sub-niche and a hub that averaged
 * them would be the template-substitution failure at the top of the tree.
 */

interface Props {
  readonly record: Extract<IndustryRecord, { source: 'b2b' }>;
  readonly observation: ObservationView;
}

export default function VerticalHubPage({ record, observation }: Props) {
  const { vertical, body, state } = record;
  const children = childrenOf(vertical);
  const path = `/industries/${vertical.id}`;

  return (
    <main className="min-h-screen">
      {state === 'draft' && <DraftNotice path={path} />}

      {/* ── Hero. Light ground, the house opening.
             Top padding clears the fixed header, unless the draft notice above
             has already cleared it. Two values, not a magic negative margin. ─ */}
      <section className={`${state === 'draft' ? 'pt-10' : 'pt-32 sm:pt-40'} pb-14 sm:pb-18`}>
        <div className={SHELL}>
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/industries"
              className="text-meta inline-flex items-center gap-2"
              style={{ color: 'var(--s-text-muted)' }}
            >
              <span aria-hidden="true">&larr;</span> All industries
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
            <div className="lg:col-span-7">
              <Label accent>AI SEO & GEO for B2B</Label>
              <h1 className="text-h1 font-sans m-0 mt-4 max-w-[18ch] font-semibold">
              {/* NEVER lowercase a taxonomy label. `.toLowerCase()` shipped here
                  first and rendered "cnc machining", destroying the acronym; it
                  would also produce "saas and software", "it services" and
                  "medtech and devices". Sentence flow is not worth mangling an
                  entity name that a model is meant to match. */}
                AI search visibility for {vertical.label}.
              </h1>

              {/* The question, then the answer, in that order and within 60
                  words. Extraction depends on the answer being self-contained
                  and not referring back to the H1 with a pronoun. */}
              <h2 className="text-h3 font-sans mt-10 mb-3 max-w-[40ch] font-semibold">
                {body.buyerQuestion}
              </h2>
              <p className="text-body m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
                {body.opener}
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

            {/* Why this vertical buys, straight from the locked taxonomy. One
                sentence, operator-supplied, and the only place on the page where
                the spine speaks directly. */}
            <aside className="lg:col-span-5">
              <div
                className="p-6"
                style={{ background: 'var(--s-surface-2)', border: '1px solid var(--s-rule-hairline)' }}
              >
                <Label>Why this vertical buys</Label>
                <p className="text-body mt-3 m-0" style={{ color: 'var(--s-text)' }}>
                  {vertical.why}
                </p>
                {/* One column below sm. At 360 the two-column form wrapped
                    "PAGES WRITTEN" onto a second line while "SUB-NICHES" stayed
                    on one, which pushed the two figures onto different baselines
                    and read as a rendering fault. Found at 360px, not in review. */}
                <dl
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-6 pt-5 m-0"
                  style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
                >
                  {[
                    { k: 'Sub-niches', v: children.length },
                    { k: 'Pages written', v: children.filter((c) => c.href).length },
                  ].map((s) => (
                    <div key={s.k} className="flex flex-col justify-between gap-1">
                      <dt className="font-mono text-meta tracking-[0.14em] uppercase" style={{ color: 'var(--s-text-faint)' }}>
                        {s.k}
                      </dt>
                      <dd className="m-0 text-body tabular-nums font-semibold" style={{ color: 'var(--s-text)' }}>
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ObservationBlock view={observation} nicheLabel={vertical.label} idPrefix={vertical.id} />

      <WhyLostBlock text={body.whyTheAnswerIsLost} id={`${vertical.id}-why`} />
      <BuyersBlock buyers={body.buyers} id={`${vertical.id}-buyers`} />
      <FactsBlock facts={body.facts} id={`${vertical.id}-facts`} />
      <ChildrenBlock children={children} verticalLabel={vertical.label} id={`${vertical.id}-children`} />
      <ServiceLinksBlock id={`${vertical.id}-services`} />
      <ProofBlock proof={body.proof} id={`${vertical.id}-proof`} />
      <FaqsBlock faqs={body.faqs} id={`${vertical.id}-faqs`} />
      <SnapshotCta question={body.snapshotQuestion} id={`${vertical.id}-cta`} />
    </main>
  );
}
