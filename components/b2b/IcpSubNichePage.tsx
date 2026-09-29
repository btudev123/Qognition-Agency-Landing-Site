import type { IcpRecord } from '../../lib/b2b/icpRegistry';
import { icpBreadcrumb, icpPanelExclusions, icpSiblings } from '../../lib/b2b/icpRegistry';
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
  IcpHero,
  InheritedContextBlock,
  PromptPanelBlock,
} from './IcpBlocks';

/* LEVEL 4 — the sub-niche. 8,823 of them, and this is the honest one.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * A SUB-NICHE RECORD IS `{id, slug, name}`. THERE IS NO FOURTH FIELD.
 *
 * ADR-0008 §1.2 measured it and Nadia §1.7.2 and Theo §3.4 both reach the same
 * place from the content side: level 4 supplies a name. So this page is built
 * from three things and says which is which:
 *
 *   1. its own authored body, which carries the same `SubNicheBody` arity as
 *      every other level. ADR-0008 §6.4 assertion 6: there is no reduced bar
 *      here. Three sourced facts, three FAQs, six vocabulary terms, a named
 *      reviewer. If that cannot be written, the entity is not published;
 *   2. its composed prompt set, from `lib/b2b/promptPanel.ts`, which is the
 *      operator's supplied prompt narrowed by the operator's own name for this
 *      scope. Nothing is invented and the composition is reversible;
 *   3. its parents' payload, rendered as inherited and linked upward.
 *
 * THE PANEL WILL REPORT `meetsMinimum: false` AND THE PAGE SAYS SO. A level-4
 * panel composes with its own name only, which yields three prompts against a
 * minimum of eight. That is not a bug in the panel, it is the level reporting
 * what derivation can reach, and the remaining five are authored by hand before
 * publication. A page that hid the shortfall would be claiming a panel it does
 * not have.
 *
 * WHERE IT HAS NOTHING OF ITS OWN IT RENDERS LESS. There is no coverage grid
 * because a sub-niche has no children. There is no children block for the same
 * reason. The `geo_angle`, the buyer titles and the firm-size floor are the
 * sub-industry's and render under a heading that says so. What is left is short,
 * and short is the correct output.
 *
 * THE OPERATOR OVERRODE THE RECOMMENDATION TO BUILD THIS LEVEL, AND THAT IS
 * SETTLED. What it did not change is the bar. This template exists for 8,823
 * entities; the publication ceiling is 0.
 * ────────────────────────────────────────────────────────────────────────────
 */

interface Props {
  readonly record: Extract<IcpRecord, { level: 'sub-niche' }>;
  readonly observation: ObservationView;
  readonly canonicalName?: string;
  readonly canonicalHref?: string;
}

export default function IcpSubNichePage({
  record,
  observation,
  canonicalName,
  canonicalHref,
}: Props) {
  if (record.canonicalPath) {
    return (
      <CanonicalPointerPage
        name={record.subNiche.name}
        canonicalHref={canonicalHref}
        canonicalName={canonicalName ?? record.canonicalPath.join(' / ')}
      />
    );
  }

  const { industry, sub, niche, subNiche, body, state } = record;
  const key = `${industry.slug}-${sub.slug}-${niche.slug}-${subNiche.slug}`;
  const trail = icpBreadcrumb(record);
  const parent = trail[trail.length - 1];
  const siblings = icpSiblings(record);
  const panel = panelFor(record.href, { exclude: icpPanelExclusions(record) });

  return (
    <main className="min-h-screen">
      {state === 'draft' && <DraftNotice path={record.href} />}

      <IcpHero
        eyebrow={niche.name}
        name={subNiche.name}
        buyerQuestion={body.buyerQuestion}
        opener={body.opener}
        trail={trail}
        upLink={{ name: niche.name, href: parent?.href }}
        draft={state === 'draft'}
      />

      <ObservationBlock view={observation} nicheLabel={subNiche.name} idPrefix={key} />
      {panel && <PromptPanelBlock panel={panel} minimum={MIN_DISTINCT_PROMPTS} id={`${key}-panel`} />}

      <WhyLostBlock text={body.whyTheAnswerIsLost} id={`${key}-why`} />
      <BuyersBlock buyers={body.buyers} id={`${key}-buyers`} />

      <InheritedContextBlock
        parentName={sub.name}
        parentHref={trail[1]?.href}
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
