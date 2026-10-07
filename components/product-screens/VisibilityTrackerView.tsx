import { ENGINES } from '../../lib/b2b/observations';
import type { TrackerTab, VisibilityTrackerScreen } from '../../data/product-screens';
import SectorTabs from '../visual/SectorTabs';
import { PROMPT_SET_NOTE, RUN_LABEL, SOURCES_CITED_LABEL, SOURCE_TYPE_LABEL } from './labels';
import MentionCell from './MentionCell';
import ScreenContext from './ScreenContext';

/* One server-rendered panel per tab, handed to SectorTabs as children
 * (ADR-0006 §5). SectorTabs only toggles `hidden`; every panel is in the HTML.
 *
 * The table is real at >=640px. Below 640 each row becomes a block: the prompt,
 * then a 2x2 grid of platform cells, each showing its column name in an
 * aria-hidden span. Explicit ARIA roles keep table semantics when `display` is
 * overridden, which Safari otherwise drops. Row 3 is hidden below 640 to hold
 * the hero's mobile height (brief §3.1). */
function TrackerTable({ tab }: { tab: TrackerTab }) {
  return (
    <table
      role="table"
      aria-label={`${tab.label}: ${tab.brand}`}
      className="mt-4 w-full border-collapse text-left text-meta max-sm:block max-sm:[&_tbody_tr:nth-child(n+3)]:hidden"
    >
      <thead role="rowgroup" className="max-sm:sr-only">
        <tr role="row" style={{ borderBottom: '1px solid var(--s-rule)' }}>
          <th
            role="columnheader"
            scope="col"
            className="w-[44%] pb-2 pr-3 align-bottom font-mono font-normal uppercase tracking-[0.12em]"
            style={{ color: 'var(--s-text-faint)' }}
          >
            Prompt
          </th>
          {ENGINES.map((engine) => (
            <th
              key={engine}
              role="columnheader"
              scope="col"
              className="px-1 pb-2 text-center align-bottom font-medium"
              style={{ color: 'var(--s-text-muted)' }}
            >
              {engine}
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup" className="max-sm:block">
        {tab.rows.map((row) => (
          <tr
            key={row.prompt}
            role="row"
            className="max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-4 max-sm:gap-y-2 max-sm:py-3"
            style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
          >
            <th role="rowheader" scope="row" className="py-3 pr-3 align-top font-normal max-sm:col-span-2 max-sm:py-0">
              <span className="block" style={{ color: 'var(--s-text)' }}>
                {row.prompt}
              </span>
              <span className="mt-1.5 flex flex-wrap items-center gap-1.5" style={{ color: 'var(--s-text-muted)' }}>
                <span>{SOURCES_CITED_LABEL}</span>
                {row.sourcesCited.map((source) => (
                  <span key={source} className="px-1.5" style={{ border: '1px solid var(--s-rule)' }}>
                    {SOURCE_TYPE_LABEL[source]}
                  </span>
                ))}
              </span>
            </th>
            {ENGINES.map((engine) => (
              <td
                key={engine}
                role="cell"
                data-label={engine}
                className="px-1 py-3 text-center align-top max-sm:flex max-sm:flex-col max-sm:items-start max-sm:gap-0.5 max-sm:p-0 max-sm:text-left"
              >
                {/* The column name, shown inline below 640px where the table
                    reflows. aria-hidden because the visually hidden <thead>
                    already gives each cell its column header, so a screen reader
                    would otherwise hear the engine name twice. A real span rather
                    than CSS generated content, which some readers announce. */}
                <span aria-hidden="true" className="sm:hidden" style={{ color: 'var(--s-text-muted)' }}>
                  {engine}
                </span>
                <MentionCell state={row.states[engine]} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function VisibilityTrackerView({ screen }: { screen: VisibilityTrackerScreen }) {
  return (
    <SectorTabs labels={screen.tabs.map((t) => t.label)} label="Sector">
      {screen.tabs.map((tab) => (
        <div key={tab.sector} className="px-4 pt-4">
          <ScreenContext
            items={[
              ['Tracked brand', tab.brand],
              ['Domain', tab.domain],
              ['Prompt set', PROMPT_SET_NOTE],
              ['Run', RUN_LABEL],
            ]}
          />
          <TrackerTable tab={tab} />
        </div>
      ))}
    </SectorTabs>
  );
}
