import type { IcpRecord } from '../../lib/b2b/icpRegistry';
import { icpBreadcrumb, icpChildren, icpCrossLinks, icpSiblings } from '../../lib/b2b/icpRegistry';
import type { ObservationView } from '../../lib/b2b/observations';
import DraftNotice from './DraftNotice';
import { BuyersBlock, FactsBlock, WhyLostBlock, ServiceLinksBlock, FaqsBlock, SnapshotCta } from './blocks';
import { CanonicalPointerPage, IcpHero, IcpProofBlock, RelatedPagesBlock } from './IcpBlocks';

/* LEVEL 1 — the industry hub. 21 of them.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT THIS LEVEL ACTUALLY HAS, AND WHAT IT THEREFORE RENDERS.
 *
 * An industry record is `{id, slug, name, note, is_new_industry, sub_industries}`.
 * One prose field: `note`. Every other operator field in the taxonomy hangs off
 * the sub-industry a level down (ADR-0008 §1.2), so this page has the note, its
 * authored `HubBody`, and its published children. That is the whole inventory
 * and this template renders exactly it.
 *
 * NO VOCABULARY AND NO COMPARISON AXES, deliberately. Manufacturing & Industrial
 * spans a machine shop, a packaging OEM, a chemical distributor and a mining
 * contractor; a standards list written to hold all four is written to none of
 * them, and an axes block averaged across 21 sub-industries is the
 * template-substitution failure at the top of the tree. Those live one level
 * down where they are true. Theo §3.1.
 *
 * NO COUNTS RENDERED AS A STATISTIC. "21 sub-industries, 162 niches" is a fact
 * about our taxonomy, not about the world. It may be navigation. It may never be
 * a market figure, which is why the children block counts what is published
 * rather than what exists.
 *
 * WHY IT IS SHORT. A hub earns its place as a crawl anchor, an entity anchor and
 * the carrier of the head term. It does not earn its place by being a longer
 * sub-industry page. If this renders thin, that is the level reporting what it
 * has, and a short honest page beats a long templated one that
 * `scripts/check-b2b.cjs` item 7 fails anyway.
 * ────────────────────────────────────────────────────────────────────────────
 */

/* PLAIN-ENGLISH TEMPLATE, 2026-10 (docs/copy/2026-10/plain-english-templates.md §9).
 * Section order, all four levels: hero; the questions your buyers ask AI (dark); why firms
 * like yours get left out; who your buyers are; [axes and vocabulary where the body has
 * them]; pick the layer you need (dark); facts; what your buyers type into Google; client
 * programmes (dark); questions buyers ask us; closing CTA (dark); related pages. A level
 * omits the slots it has no data for (§9.4). Cut: the operator note, the qualification,
 * client-value and inherited-context blocks, and the hero's repeat of the comparison axes
 * (§9.3). `buyer_titles` moved into the hero as one "Written for" line. */

interface Props {
  readonly record: Extract<IcpRecord, { level: 'industry' }>;
  /** Accepted and not rendered: level 1 has no prompts of its own, so no section 2 (copy §9.4). */
  readonly observation: ObservationView;
  readonly canonicalName?: string;
  readonly canonicalHref?: string;
}

export default function IcpIndustryPage({ record, canonicalName, canonicalHref }: Props) {
  /* Rule 7: a declared duplicate renders a pointer, not a second body. */
  if (record.canonicalPath) {
    return (
      <CanonicalPointerPage
        name={record.industry.name}
        canonicalHref={canonicalHref}
        canonicalName={canonicalName ?? record.canonicalPath.join(' / ')}
      />
    );
  }

  const { industry, body, state } = record;
  const key = industry.slug;

  return (
    <main className="min-h-screen">
      {state === 'draft' && <DraftNotice path={record.href} />}

      <IcpHero
        eyebrow="Industry"
        name={industry.name}
        buyerQuestion={body.buyerQuestion}
        opener={body.opener}
        trail={icpBreadcrumb(record)}
        industrySlug={industry.slug}
        industryName={industry.name}
        draft={state === 'draft'}
      />

      <WhyLostBlock text={body.whyTheAnswerIsLost} id={`${key}-why`} />
      <BuyersBlock buyers={body.buyers} id={`${key}-buyers`} />
      <ServiceLinksBlock id={`${key}-services`} />
      <FactsBlock facts={body.facts} id={`${key}-facts`} />
      <IcpProofBlock proof={body.proof} id={`${key}-proof`} />
      <FaqsBlock faqs={body.faqs} id={`${key}-faqs`} />
      <SnapshotCta question={body.snapshotQuestion} id={`${key}-cta`} />
      {/* Published children first: on a hub this list is what stops a child being an orphan. */}
      <RelatedPagesBlock
        children={icpChildren(record)}
        siblings={icpSiblings(record)}
        cross={icpCrossLinks(record)}
        industrySlug={industry.slug}
        id={`${key}-related`}
      />
    </main>
  );
}
