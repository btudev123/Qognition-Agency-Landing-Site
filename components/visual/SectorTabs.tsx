'use client';

import { Children, useId, useState, type KeyboardEvent, type ReactNode } from 'react';
import v from './visual.module.css';

/* The one client boundary in the hero (brief §3.1). It holds the active index
 * and the WAI-ARIA tabs keyboard pattern carried over from the deleted
 * HeroSnapshotPanel: roving tabindex, Left/Right wrap, Home/End.
 *
 * The panels are server-rendered <ProductScreen> children, toggled with the
 * `hidden` attribute, so every screen is in the HTML without JS and only the
 * first is shown. Do not import lucide or any data module here: anything this
 * file imports ships to the browser. */
export default function SectorTabs({
  labels,
  children,
  label,
  className = '',
}: {
  labels: readonly string[];
  children: ReactNode;
  /** Accessible name for the tablist. */
  label: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const base = useId();
  const panels = Children.toArray(children);
  const count = labels.length;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next: number | undefined;
    if (event.key === 'ArrowRight') next = (i + 1) % count;
    if (event.key === 'ArrowLeft') next = (i - 1 + count) % count;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = count - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className="flex flex-wrap px-2"
        style={{ borderBottom: '1px solid var(--s-rule)' }}
      >
        {labels.map((text, i) => {
          const on = i === active;
          return (
            <button
              key={text}
              type="button"
              role="tab"
              id={`${base}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${base}-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className={`${v.tab} min-h-11 px-3 font-sans text-meta`}
            >
              {text}
            </button>
          );
        })}
      </div>
      {panels.map((panel, i) => (
        <div
          key={labels[i]}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          tabIndex={0}
          hidden={i !== active}
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
