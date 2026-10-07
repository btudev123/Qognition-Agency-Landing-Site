import { Fragment, type CSSProperties } from 'react';
import { RUN_PLATFORMS, type TrackerRunScreen } from '../../data/product-screens';
import { icpIndustryCards, icpSubIndustryName } from '../../data/b2b/icp';
import { industryDisplayName } from '../../data/b2b/icp/industryVisuals';
import TrackerRunPlayer from '../visual/TrackerRunPlayer';
import s from '../visual/trackerRun.module.css';
import {
  BREADCRUMB_SEPARATOR,
  MENTION_LABEL,
  RUN_LABEL,
  SOURCES_CITED_LABEL,
  SOURCE_TYPE_LABEL,
  TRACKED_LABEL,
} from './labels';
import { runIndustryId } from './runIds';

/* ADR-0006 §11. Server component: every one of the 21 rows is rendered here,
 * fully resolved, and handed to TrackerRunPlayer as children. The player only
 * chooses which row is visible and plays presentation over it, so with no JS the
 * first row is a complete screen and the HTML holds every row.
 *
 * Each row is a real table: the prompt is the row header (th[scope=row], which is
 * also the gate's R6 carve-out for digits in a prompt) and each platform is a
 * column header, so every state cell's text is exactly a MENTION_LABEL. The
 * table is laid out as a grid with `display: contents` on its sections; explicit
 * ARIA roles keep the table semantics that some engines drop under `contents`.
 *
 * Names come from the taxonomy by id (icpIndustryCards, icpSubIndustryName), so
 * the screen data holds ids and prompts only (§11.2). */

const industryName = new Map(icpIndustryCards().map((card) => [card.id, industryDisplayName(card.name)]));

export default function TrackerRunView({ screen }: { screen: TrackerRunScreen }) {
  return (
    <div className="pt-3">
      <p
        className="m-0 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 text-meta"
        style={{ color: 'var(--s-text-muted)' }}
      >
        <span>
          <span className="font-mono uppercase tracking-[0.12em]" style={{ color: 'var(--s-text-faint)' }}>
            {TRACKED_LABEL}
          </span>{' '}
          <span className="font-medium" style={{ color: 'var(--s-text)' }}>
            {screen.trackedBrand}
          </span>
        </span>
        <span className="font-mono uppercase tracking-[0.12em]" style={{ color: 'var(--s-text-faint)' }}>
          {RUN_LABEL}
        </span>
      </p>

      <TrackerRunPlayer>
        {screen.rows.map((row, index) => {
          const industry = industryName.get(row.industryId) ?? '';
          const subIndustry = icpSubIndustryName(row.subIndustryId) ?? '';
          return (
            <Fragment key={row.industryId}>
              <p className={`m-0 font-mono text-meta ${s.crumb}`} style={{ color: 'var(--s-text-muted)' }}>
                <span id={runIndustryId(index)} style={{ color: 'var(--s-text)' }}>
                  {industry}
                </span>{' '}
                <span aria-hidden="true" style={{ color: 'var(--s-accent)' }}>
                  {BREADCRUMB_SEPARATOR}
                </span>{' '}
                <span>{subIndustry}</span>
              </p>

              <table role="table" aria-label={industry} className={`mt-2 w-full text-left text-meta ${s.table}`}>
                <thead role="rowgroup" className={s.contents}>
                  <tr role="row" className={s.contents}>
                    <th role="columnheader" scope="col" className="sr-only">
                      Prompt
                    </th>
                    {RUN_PLATFORMS.map((platform, i) => (
                      <th
                        key={platform}
                        role="columnheader"
                        scope="col"
                        className={`py-1.5 pr-3 font-normal ${s.platform}`}
                        style={{ gridRow: i + 2, color: 'var(--s-text-muted)' }}
                      >
                        {platform}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody role="rowgroup" className={s.contents}>
                  <tr role="row" className={s.contents}>
                    <th role="rowheader" scope="row" className={`text-body font-normal ${s.prompt}`}>
                      <span data-run-prompt="">{row.prompt}</span>
                    </th>
                    {RUN_PLATFORMS.map((platform, i) => {
                      const label = MENTION_LABEL[row.states[platform]];
                      const named = row.states[platform] !== 'absent';
                      return (
                        <td
                          key={platform}
                          role="cell"
                          data-run-cell=""
                          className={`py-1.5 ${s.cell}`}
                          style={{ gridRow: i + 2, '--i': i, color: named ? 'var(--s-text)' : 'var(--s-text-muted)' } as CSSProperties}
                        >
                          <span aria-hidden="true" className={named ? s.dotNamed : s.dotAbsent} />
                          {label}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>

              <p
                data-run-sources=""
                className={`m-0 mt-2 flex flex-wrap items-center gap-1.5 text-meta ${s.sources}`}
                style={{ color: 'var(--s-text-muted)' }}
              >
                <span>{SOURCES_CITED_LABEL}</span>
                {row.sourcesCited.map((source) => (
                  <span key={source} className="px-1.5" style={{ border: '1px solid var(--s-rule)' }}>
                    {SOURCE_TYPE_LABEL[source]}
                  </span>
                ))}
              </p>

              {/* What the live region announces once this row resolves (§11.4.6): the
                  industry, then each platform with its label. Names only, no counts. */}
              <p data-run-summary="" hidden>
                <span>{industry}</span>
                {'. '}
                {RUN_PLATFORMS.map((platform) => (
                  <Fragment key={platform}>
                    <span>{platform}</span>
                    {': '}
                    <span>{MENTION_LABEL[row.states[platform]]}</span>
                    {'. '}
                  </Fragment>
                ))}
              </p>
            </Fragment>
          );
        })}
      </TrackerRunPlayer>
    </div>
  );
}
