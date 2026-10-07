import type { IcpRecord } from '../../lib/b2b/icpRegistry';
import {
  icpBreadcrumb,
  icpChildren,
  icpCrossLinks,
  icpLeadingFit,
  icpPanelExclusions,
  icpSiblings,
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
  IcpHero,
  IcpProofBlock,
  PaidDemandBlock,
  QuestionsBlock,
  RelatedPagesBlock,
} from './IcpBlocks';

/* LEVEL 2 — the sub-industry. 341 of them, and the workhorse.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY THIS IS THE RICHEST TEMPLATE.
 *
 * All six operator fields are populated on 341 of 341 sub-industries (ADR-0008
 * §1.2 measured them): `geo_angle`, `buyer_titles`, `min_firm_size`,
 * `client_value`, `ai_prompts`, `ppc_keywords`. It is the only level where that
 * is true. A sub-industry page is differentiated before a word is written, which
 * is why Nadia calls it unconditional and Kyle makes it the promotion unit.
 *
 * THE THREE FIELDS THAT ARE KEPT APART ON PURPOSE, each in its own block:
 *
 *   `buyer_titles`  OUR buyer. The conversion register. It is NOT `body.buyers[]`,
 *                   which is the CLIENT's buyer and renders in a different block
 *                   with a different heading. Theo §2.
 *   `client_value`  THEIR contract value. Never in the same block as our price
 *                   and never joined to it by arithmetic, because the two
 *                   numbers side by side read as a promised return.
 *   `ppc_keywords`  THEIR paid demand. Never our bid list, never a target query.
 *
 * RULE 8 ORDERS THE TWO ARGUMENT BLOCKS AND NOTHING ELSE. `fit` is a niche
 * field, so this level derives it as the modal fit of its own niches, ties
 * leading with Both (Theo §7). `AI SEO` leads with the observed panel; `PPC`
 * leads with the client's existing paid demand; `Both` runs citation first and
 * paid second. The classification is never rendered as a label: a reader does
 * not need to know we sorted them.
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
  readonly record: Extract<IcpRecord, { level: 'sub-industry' }>;
  readonly observation: ObservationView;
  readonly canonicalName?: string;
  readonly canonicalHref?: string;
}

export default function IcpSubIndustryPage({
  record,
  observation,
  canonicalName,
  canonicalHref,
}: Props) {
  if (record.canonicalPath) {
    return (
      <CanonicalPointerPage
        name={record.sub.name}
        canonicalHref={canonicalHref}
        canonicalName={canonicalName ?? record.canonicalPath.join(' / ')}
      />
    );
  }

  const { industry, sub, body, state } = record;
  const key = `${industry.slug}-${sub.slug}`;
  const trail = icpBreadcrumb(record);
  const panel = panelFor(record.href, { exclude: icpPanelExclusions(record) });
  const fit = icpLeadingFit(record);

  /* Rule 8 orders these two and nothing else. The classification is never rendered. */
  const questions = (
    <QuestionsBlock
      prompts={panel?.prompts.map((p) => p.prompt) ?? []}
      whatWeCheckFor={body.whatWeCheckFor}
      observation={observation}
      nicheLabel={sub.name}
      id={`${key}-questions`}
    />
  );
  const paid = <PaidDemandBlock keywords={sub.ppcKeywords} id={`${key}-paid`} />;

  return (
    <main className="min-h-screen">
      {state === 'draft' && <DraftNotice path={record.href} />}

      <IcpHero
        eyebrow={industry.name}
        name={sub.name}
        buyerQuestion={body.buyerQuestion}
        opener={body.opener}
        trail={trail}
        upLink={{ name: industry.name, href: trail[0]?.href }}
        writtenFor={sub.buyerTitles}
        industrySlug={industry.slug}
        industryName={industry.name}
        draft={state === 'draft'}
      />

      {fit === 'PPC' && paid}
      {questions}

      <WhyLostBlock text={body.whyTheAnswerIsLost} id={`${key}-why`} />
      <BuyersBlock buyers={body.buyers} id={`${key}-buyers`} />
      {/* Kept at this level although copy §9.4 lists them for levels 3 and 4: the body
          kind here is `sub-niche`, §9.3 keeps them "at sub-niche level", and they are
          the client's own vocabulary, the most specific copy on the page. Carried up. */}
      {body.kind === 'sub-niche' && (
        <>
          <AxesBlock axes={body.comparisonAxes} id={`${key}-axes`} />
          <VocabularyBlock terms={body.vocabulary} id={`${key}-vocab`} />
        </>
      )}

      <ServiceLinksBlock id={`${key}-services`} />
      <FactsBlock facts={body.facts} id={`${key}-facts`} />
      {fit !== 'PPC' && paid}
      <IcpProofBlock proof={body.proof} id={`${key}-proof`} />
      <FaqsBlock faqs={body.faqs} id={`${key}-faqs`} />
      <SnapshotCta question={body.snapshotQuestion} id={`${key}-cta`} />
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
