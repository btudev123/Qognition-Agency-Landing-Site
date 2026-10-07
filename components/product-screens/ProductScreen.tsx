import type { ProductScreen as Screen } from '../../data/product-screens';
import ProvenanceBadge from './ProvenanceBadge';
import PromptPanelView from './PromptPanelView';
import TrackerRunView from './TrackerRunView';
import v from '../visual/visual.module.css';

/* ADR-0006. One server component for every illustrative product screen.
 *
 * Renders a screen object from PRODUCT_SCREENS and nothing else: no rows are
 * declared here (R5), nothing here holds state or time (R4), and the
 * provenance badge is the first row under the title bar whatever the frame
 * (R3). The title bar and badge sit outside the run's player and its live
 * region, so a row change can never hide or re-announce the disclosure (§11.4.5).
 *
 *   frame="none"    no field of its own; the caller supplies the container
 *   frame="laptop"  bordered field with the existing panel shadow
 *   frame="phone"   the same, capped at a phone width */

const TITLE: Record<Screen['kind'], string> = {
  'tracker-run': 'Prompt run',
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
      <div className="px-4 pt-3">
        <ProvenanceBadge />
      </div>
      <div className="pt-1">
        {screen.kind === 'tracker-run' ? (
          <TrackerRunView screen={screen} />
        ) : (
          <PromptPanelView screen={screen} />
        )}
      </div>
      <figcaption className="px-4 pb-4 pt-3 text-meta" style={{ color: 'var(--s-text-muted)' }}>
        {screen.caption}
      </figcaption>
    </figure>
  );
}
