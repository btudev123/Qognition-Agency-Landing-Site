import type { IcpRecord } from '../../lib/b2b/icpRegistry';
import {
  icpBreadcrumb,
  icpChildren,
  icpLeadingFit,
  icpPanelExclusions,
  icpSiblings,
  icpVocabularyRows,
} from '../../lib/b2b/icpRegistry';
import { panelFor, MIN_DISTINCT_PROMPTS } from '../../lib/b2b/promptPanel';
import type { ObservationView } from '../../lib/b2b/observations';
import ObservationBlock from './ObservationBlock';
import DraftNotice from './DraftNotice';
import {
  BuyersBlock,
  FactsBlock,
  VocabularyBlock,
  AxesBlock,
  WhyLostBlock,
  ServiceLinksBlock,
  SiblingsBlock,
  ProofBlock,
  FaqsBlock,
  SnapshotCta,
} from './blocks';
import {
  CanonicalPointerPage,
  CoverageGridBlock,
  HeroPanel,
  IcpChildrenBlock,
  IcpHero,
  InheritedContextBlock,
  PaidDemandBlock,
  PromptPanelBlock,
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
  const children = icpChildren(record);
  const siblings = icpSiblings(record);
  const panel = panelFor(record.href, { exclude: icpPanelExclusions(record) });
  const fit = icpLeadingFit(record);
  /* The coverage grid renders only the scope rows the body authored. No authored
     sentence, no row: a bare name list is the directory stub C6 forbids. */
  const scope = scopeRowsFor(record, icpVocabularyRows(record));

  const citation = (
    <>
      <ObservationBlock view={observation} nicheLabel={niche.name} idPrefix={key} />
      {panel && <PromptPanelBlock panel={panel} minimum={MIN_DISTINCT_PROMPTS} id={`${key}-panel`} />}
    </>
  );
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
        draft={state === 'draft'}
        aside={
          body.kind === 'sub-niche' ? (
            <HeroPanel label="What a buyer filters on here">
              <ul className="list-none p-0 m-0 mt-4">
                {body.comparisonAxes.map((axis) => (
                  <li
                    key={axis.axis}
                    className="py-2.5"
                    style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}
                  >
                    <span className="text-body" style={{ color: 'var(--s-text)' }}>
                      {axis.axis}
                    </span>
                  </li>
                ))}
              </ul>
            </HeroPanel>
          ) : undefined
        }
      />

      {fit === 'PPC' ? (
        <>
          {paid}
          {citation}
        </>
      ) : (
        <>
          {citation}
          {paid}
        </>
      )}

      <WhyLostBlock text={body.whyTheAnswerIsLost} id={`${key}-why`} />
      <BuyersBlock buyers={body.buyers} id={`${key}-buyers`} />

      {/* What comes from the category above, said out loud and linked. */}
      <InheritedContextBlock
        parentName={sub.name}
        parentHref={parent?.href}
        sub={sub}
        id={`${key}-inherited`}
      />

      {body.kind === 'sub-niche' && (
        <>
          <AxesBlock axes={body.comparisonAxes} id={`${key}-axes`} />
          <VocabularyBlock terms={body.vocabulary} id={`${key}-vocab`} />
        </>
      )}
      <FactsBlock facts={body.facts} id={`${key}-facts`} />

      {/* Anchored scope terms. Targets, never links. Nadia §5.1 rule 14. */}
      <CoverageGridBlock rows={scope} id={`${key}-scope`} />

      <IcpChildrenBlock
        children={children}
        heading={`${children.length} narrower scopes with a page of their own.`}
        id={`${key}-children`}
      />

      <ServiceLinksBlock id={`${key}-services`} />
      <SiblingsBlock
        siblings={siblings.map((s) => ({ id: s.id, label: s.name, href: s.href }))}
        id={`${key}-siblings`}
      />
      <ProofBlock proof={body.proof} id={`${key}-proof`} />
      <FaqsBlock faqs={body.faqs} id={`${key}-faqs`} />
      <SnapshotCta question={body.snapshotQuestion} id={`${key}-cta`} />
    </main>
  );
}
