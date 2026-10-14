import type { IcpRecord } from '../../lib/b2b/icpRegistry';
import {
  icpBreadcrumb,
  icpCheckPrompt,
  icpChildren,
  icpLeadingFit,
  icpPanelExclusions,
  icpSiblings,
  icpVocabularyRows,
} from '../../lib/b2b/icpRegistry';
import { panelFor } from '../../lib/b2b/promptPanel';
import type { ObservationView } from '../../lib/b2b/observations';
import DraftNotice from './DraftNotice';
import {
  BuyersBlock,
  FactsBlock,
  VocabularyBlock,
  AxesBlock,
  WhyLostBlock,
  ServiceLinksBlock,
  FaqsBlock,
  SnapshotCta,
} from './blocks';
import {
  CanonicalPointerPage,
  CoverageGridBlock,
  IcpHero,
  IcpProofBlock,
  PaidDemandBlock,
  QuestionsBlock,
  RelatedPagesBlock,
  scopeRowsFor,
} from './IcpBlocks';

/* LEVEL 3 — the niche. 2,376 of them.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT A NICHE ACTUALLY HAS: `fit` and `priority`. No prose field at all.
 *
 * So this page is its own authored DELTA plus what it inherits from the
 * sub-industry above, and the template is built to make that visible rather than
 * to disguise it. The inherited buyer titles and firm-size floor render under a
 * heading that names the parent and links to it; the paid demand renders as the
 * category's, because it is the category's. A page that cannot say what is its
 * own has nothing of its own, and the response to that is a shorter page.
 *
 * `priority` IS NEVER RENDERED, in any form. It is build order, it is ours, and
 * a reader learning they were sorted into band B learns nothing they can use.
 * Theo §1. It is not in the props this component reads, so it cannot leak.
 *
 * `fit` LEADS THE ANGLE AND IS NEVER SHOWN. Rule 8: `AI SEO` opens on the
 * citation and comparison angle, `PPC` on the paid-search angle, `Both` runs
 * citation first and paid second. It orders two blocks. It is not a badge.
 *
 * REUSING THE PARENT'S FACTS FAILS THE UNIQUENESS GATE, WHICH IS INTENDED.
 * `scripts/check-b2b.cjs` item 5 substitutes the entity name out and then
 * measures 5-gram overlap against every sibling, so a niche body assembled from
 * its parent's fails the build. If the delta cannot be written, the entity stays
 * spine and becomes a section on the parent. That is the system working.
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
  readonly record: Extract<IcpRecord, { level: 'niche' }>;
  readonly observation: ObservationView;
  readonly canonicalName?: string;
  readonly canonicalHref?: string;
}

export default function IcpNichePage({ record, observation, canonicalName, canonicalHref }: Props) {
  if (record.canonicalPath) {
    return (
      <CanonicalPointerPage
        name={record.niche.name}
        canonicalHref={canonicalHref}
        canonicalName={canonicalName ?? record.canonicalPath.join(' / ')}
      />
    );
  }

  const { industry, sub, niche, body, state } = record;
  const key = `${industry.slug}-${sub.slug}-${niche.slug}`;
  const trail = icpBreadcrumb(record);
  const parent = trail[trail.length - 1];
  const panel = panelFor(record.href, { exclude: icpPanelExclusions(record) });
  const fit = icpLeadingFit(record);
  const checkPrompt = icpCheckPrompt(record);
  /* The coverage grid renders only the scope rows the body authored. No authored
     sentence, no row: a bare name list is the directory stub C6 forbids. */
  const scope = scopeRowsFor(record, icpVocabularyRows(record));

  const questions = (
    <QuestionsBlock
      prompts={panel?.prompts.map((p) => p.prompt) ?? []}
      whatWeCheckFor={body.whatWeCheckFor}
      observation={observation}
      nicheLabel={niche.name}
      id={`${key}-questions`}
    />
  );
  /* Inherited from the sub-industry, which is where the operator attached it. It renders
     in the same slot as on the parent, with no separate inherited-context block (§9.4). */
  const paid = <PaidDemandBlock keywords={sub.ppcKeywords} id={`${key}-paid`} />;

  return (
    <main className="min-h-screen">
      {state === 'draft' && <DraftNotice path={record.href} />}

      <IcpHero
        eyebrow={sub.name}
        name={niche.name}
        buyerQuestion={body.buyerQuestion}
        opener={body.opener}
        trail={trail}
        upLink={{ name: sub.name, href: parent?.href }}
        writtenFor={sub.buyerTitles}
        industrySlug={industry.slug}
        industryName={industry.name}
        draft={state === 'draft'}
        checkPrompt={checkPrompt}
      />

      {fit === 'PPC' && paid}
      {questions}

      <WhyLostBlock text={body.whyTheAnswerIsLost} id={`${key}-why`} name={niche.name} hasQuestion={Boolean(checkPrompt)} />
      <BuyersBlock buyers={body.buyers} id={`${key}-buyers`} />
      {body.kind === 'sub-niche' && (
        <>
          <AxesBlock axes={body.comparisonAxes} id={`${key}-axes`} />
          <VocabularyBlock terms={body.vocabulary} id={`${key}-vocab`} />
        </>
      )}
      {/* Anchored scope terms. Targets, never links. Nadia §5.1 rule 14. */}
      <CoverageGridBlock rows={scope} id={`${key}-scope`} />

      <ServiceLinksBlock id={`${key}-services`} />
      <FactsBlock facts={body.facts} id={`${key}-facts`} />
      {fit !== 'PPC' && paid}
      <IcpProofBlock proof={body.proof} id={`${key}-proof`} />
      <FaqsBlock faqs={body.faqs} id={`${key}-faqs`} />
      <SnapshotCta question={body.snapshotQuestion} id={`${key}-cta`} />
      <RelatedPagesBlock
        children={icpChildren(record)}
        siblings={icpSiblings(record)}
        /* Levels 3 and 4 never rendered cross-tree pointers; the link set is unchanged. */
        cross={[]}
        industrySlug={industry.slug}
        id={`${key}-related`}
      />
    </main>
  );
}
