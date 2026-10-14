import type { ProductScreen as Screen } from '../../data/product-screens';
import PromptPanelView from './PromptPanelView';
import TrackerRunView from './TrackerRunView';
import v from '../visual/visual.module.css';

/* ADR-0006. One server component for every illustrative product screen.
 *
 * Renders a screen object from PRODUCT_SCREENS and nothing else: no rows are
 * declared here (R5) and nothing here holds state or time (R4).
 *
 * No visible provenance badge. Operator decision 2026-10-08 (CLAUDE.md authority
 * block): the "Illustrative" badge and its banner are removed from every screen,
 * overriding ADR-0006 R3's visible-badge rule. `data-provenance` stays on the
 * figure as an internal marker only: the served-HTML gate finds screens by it
 * and asserts it reads "illustrative" and that no badge is rendered
 * (scripts/lib/served-screens.mjs). The data rules (sample brands, "Your firm",
 * no figures, verbatim prompts) are unchanged and still gated.
 *
 *   frame="none"    no field of its own; the caller supplies the container
 *   frame="laptop"  bordered field with the existing panel shadow
 *   frame="phone"   the same, capped at a phone width */

const TITLE: Record<Screen['kind'], string> = {
  'tracker-run': 'What we check',
  'prompt-panel': 'Prompt set',
};

export default function ProductScreen({
  screen,
  frame = 'laptop',
}: {
  screen: Screen;
  frame?: 'laptop' | 'phone' | 'none';
}) {
  const field = frame === 'none' ? '' : `${v.screenField}${frame === 'phone' ? ' max-w-[390px]' : ''}`;

  return (
    <figure className={`m-0 w-full min-w-0 ${field}`.trim()} data-provenance={screen.provenance}>
      <div
        className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3"
        style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}
      >
        <span className="font-mono text-meta uppercase tracking-[0.14em]" style={{ color: 'var(--s-text-faint)' }}>
          {screen.product}
        </span>
        <span className="text-h4 font-sans font-semibold" style={{ color: 'var(--s-text)' }}>
          {TITLE[screen.kind]}
        </span>
      </div>
      {/* Each view carries its own top padding under the title-bar rule. */}
      {screen.kind === 'tracker-run' ? (
        <TrackerRunView screen={screen} />
      ) : (
        <PromptPanelView screen={screen} />
      )}
      <figcaption className="px-4 pb-4 pt-3 text-meta" style={{ color: 'var(--s-text-muted)' }}>
        {screen.caption}
      </figcaption>
    </figure>
  );
}
