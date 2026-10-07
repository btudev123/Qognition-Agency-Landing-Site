import { ENGINES } from '../../lib/b2b/observations';
import { PRODUCT_SCREENS, type PromptPanelScreen } from '../../data/product-screens';
import { PROMPT_STATUS } from './labels';
import ScreenContext from './ScreenContext';

/* Resolves its tracker tab, so the panel can only ever show the hero's fixed set. */
export default function PromptPanelView({ screen }: { screen: PromptPanelScreen }) {
  const tab = PRODUCT_SCREENS['scriblr-visibility-tracker'].tabs.find((t) => t.sector === screen.sector);
  if (!tab) return null;
  return (
    <div className="px-4 pt-4">
      <ScreenContext
        items={[
          ['Tracked brand', tab.brand],
          ['Domain', tab.domain],
        ]}
      />
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
          {tab.rows.map((row) => (
            <tr key={row.prompt} style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
              <th scope="row" className="w-[46%] py-3 pr-3 align-top font-normal" style={{ color: 'var(--s-text)' }}>
                {row.prompt}
              </th>
              <td className="py-3 pr-3 align-top">
                <span className="flex flex-wrap gap-1.5">
                  {ENGINES.map((engine) => (
                    <span key={engine} className="px-1.5" style={{ border: '1px solid var(--s-rule)', color: 'var(--s-text-muted)' }}>
                      {engine}
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
