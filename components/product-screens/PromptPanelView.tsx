import { PRODUCT_SCREENS, RUN_PLATFORMS, type PromptPanelScreen } from '../../data/product-screens';
import { PROMPT_STATUS } from './labels';
import ScreenContext from './ScreenContext';

/* Resolves its rows from the tracker run by industry id, so the panel can only
 * ever show prompts the hero also shows (ADR-0006 §11.2). No Domain term: the
 * run tracks "Your firm", which has none. */
export default function PromptPanelView({ screen }: { screen: PromptPanelScreen }) {
  const run = PRODUCT_SCREENS['scriblr-tracker-run'];
  const rows = screen.industryIds
    .map((id) => run.rows.find((row) => row.industryId === id))
    .filter((row) => row !== undefined);
  if (rows.length === 0) return null;
  return (
    <div className="px-4 pt-4">
      <ScreenContext items={[['Tracked brand', run.trackedBrand]]} />
      <table className="mt-4 w-full border-collapse text-left text-meta">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--s-rule)' }}>
            {['Prompt', 'Platforms', 'Status'].map((h) => (
              <th
                key={h}
                scope="col"
                className="pb-2 pr-3 align-bottom font-mono font-normal uppercase tracking-[0.12em] last:pr-0"
                style={{ color: 'var(--s-text-faint)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.industryId} style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
              <th scope="row" className="w-[46%] py-3 pr-3 align-top font-normal" style={{ color: 'var(--s-text)' }}>
                {row.prompt}
              </th>
              <td className="py-3 pr-3 align-top">
                <span className="flex flex-wrap gap-1.5">
                  {RUN_PLATFORMS.map((platform) => (
                    <span key={platform} className="px-1.5" style={{ border: '1px solid var(--s-rule)', color: 'var(--s-text-muted)' }}>
                      {platform}
                    </span>
                  ))}
                </span>
              </td>
              <td className="py-3 align-top" style={{ color: 'var(--s-accent)' }}>
                {PROMPT_STATUS}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
