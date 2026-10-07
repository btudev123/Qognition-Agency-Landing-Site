'use client';

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { RUN_CONTROL_LABEL } from '../product-screens/labels';
import { RUN_SHOW_ID, runIndustryId } from '../product-screens/runIds';
import s from './trackerRun.module.css';

/* ADR-0006 §11.4. The only client code in the hero, and the only file under
 * components/ allowed a timer (gate 11.6.k).
 *
 * It receives the 21 server-rendered rows as children and no data props, and
 * imports nothing from data/ or lib/. Every row is already resolved in the HTML;
 * this file only picks the visible row and plays presentation over it:
 *
 *   type  the prompt's untyped tail is painted transparent (CSS Highlight API)
 *         while a caret walks the text. The string itself is never sliced.
 *   play  CSS sweeps each platform cell in turn (trackerRun.module.css).
 *   done  the resolved row; its summary is copied into the live region.
 *
 * Auto-advance stops for: the Pause button, pointer anywhere over the player,
 * keyboard focus anywhere in the player, a hidden tab, the panel offscreen, and
 * prefers-reduced-motion. Any of those finishes the current row at once rather
 * than freezing it mid-reveal. The server-rendered first row is never animated,
 * including when the run wraps back to it.
 *
 * WAI-ARIA APG carousel pattern (Owen, review FIX, 2026-10-08):
 *   - Keyboard focus on any control, Pause included, stops rotation and it stays
 *     stopped after focus leaves. Only the rotation button starts it again, and its
 *     label always says what pressing it will do. `:focus-visible` is the test, so a
 *     mouse press on Pause is one action (pause), not focus-pause then toggle-play.
 *   - The live region is aria-live="off" while the run rotates by itself, so a
 *     screen reader is not interrupted every few seconds. It is "polite" whenever the
 *     user is in control: paused, or after Previous, Next or a segment. */

type Phase = 'type' | 'play' | 'done';

const TYPE_MS = 24; // per character
const PLAY_MS = 5 * 260 + 320 + 200 + 80; // last cell settled and sources shown, from the CSS delays
const HOLD_MS = 4200; // a resolved row stays this long before the next

const pad = (n: number) => String(n).padStart(2, '0');

export default function TrackerRunPlayer({ children }: { children: ReactNode }) {
  const rows = Children.toArray(children);
  const count = rows.length;

  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>('done');
  const [userPaused, setUserPaused] = useState(false);
  const [pointerOver, setPointerOver] = useState(false);
  /** Set by Previous, Next or a segment; cleared when the user starts rotation again. */
  const [userControl, setUserControl] = useState(false);
  const [suspended, setSuspended] = useState({ tabHidden: false, offscreen: true });
  const [reducedMotion, setReducedMotion] = useState(true); // until the client knows

  const rootRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const running = !reducedMotion && !userPaused && !pointerOver && !suspended.tabHidden && !suspended.offscreen;
  const liveMode: 'off' | 'polite' = running && !userControl ? 'off' : 'polite';

  const rowElement = useCallback(
    (i: number) => regionRef.current?.querySelectorAll<HTMLElement>(':scope > [data-run-row]')[i] ?? null,
    [],
  );

  /** Copies the row's server-rendered summary into the one live region. */
  const announce = useCallback(
    (i: number) => {
      const summary = rowElement(i)?.querySelector('[data-run-summary]')?.textContent?.trim();
      if (liveRef.current && summary) liveRef.current.textContent = summary;
    },
    [rowElement],
  );

  /** Previous, Next and the segments: show that row resolved, at once. */
  const go = useCallback(
    (to: number) => {
      const i = ((to % count) + count) % count;
      setActive(i);
      setPhase('done');
      setUserControl(true);
      // User-initiated, so announced even while the run is paused; otherwise a
      // screen reader user pressing Next would hear nothing. The region is made
      // polite before the text lands, not on the next render.
      if (liveRef.current) liveRef.current.ariaLive = 'polite';
      announce(i);
    },
    [announce, count],
  );

  // Reduced motion, tab visibility and viewport presence.
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => setReducedMotion(motion.matches);
    onMotion();
    motion.addEventListener('change', onMotion);

    const onVisibility = () => setSuspended((v) => ({ ...v, tabHidden: document.hidden }));
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);

    let observer: IntersectionObserver | undefined;
    if (rootRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) =>
        setSuspended((v) => ({ ...v, offscreen: !entry.isIntersecting })),
      );
      observer.observe(rootRef.current);
    } else {
      setSuspended((v) => ({ ...v, offscreen: false }));
    }

    return () => {
      motion.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVisibility);
      observer?.disconnect();
    };
  }, []);

  // Anything that stops the run finishes the current row. No announcement.
  useEffect(() => {
    if (!running && phase !== 'done') setPhase('done');
  }, [running, phase]);

  // The schedule: play -> done -> hold -> next row.
  useEffect(() => {
    if (!running) return;
    if (phase === 'play') {
      const t = window.setTimeout(() => {
        setPhase('done');
        announce(active);
      }, PLAY_MS);
      return () => window.clearTimeout(t);
    }
    if (phase === 'done') {
      const t = window.setTimeout(() => {
        const next = (active + 1) % count;
        setActive(next);
        if (next === 0) {
          announce(0); // the server-rendered row is never animated
        } else {
          setPhase('type');
        }
      }, HOLD_MS);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [running, phase, active, count, announce]);

  // The typing reveal. A visual layer over the whole string: nothing is sliced.
  useEffect(() => {
    if (phase !== 'type' || !running) return;
    const row = rowElement(active);
    const text = row?.querySelector('[data-run-prompt]')?.firstChild;
    const region = regionRef.current;
    const caret = caretRef.current;
    const supported = typeof Highlight === 'function' && typeof CSS !== 'undefined' && 'highlights' in CSS;
    if (!(text instanceof Text) || !region || !caret || !supported) {
      setPhase('play');
      return;
    }

    const length = text.length;
    const untyped = new Range();
    untyped.setStart(text, 0);
    untyped.setEnd(text, length);
    CSS.highlights.set('scriblr-run-untyped', new Highlight(untyped));

    let typed = 0;
    const placeCaret = () => {
      const probe = new Range();
      probe.setStart(text, Math.max(typed - 1, 0));
      probe.setEnd(text, Math.max(typed, 1));
      const rects = probe.getClientRects();
      const rect = rects[rects.length - 1];
      if (!rect) return;
      const origin = region.getBoundingClientRect();
      const x = (typed === 0 ? rect.left : rect.right) - origin.left;
      caret.style.height = `${rect.height}px`;
      caret.style.transform = `translate(${x}px, ${rect.top - origin.top}px)`;
    };
    caret.hidden = false;
    placeCaret();

    const timer = window.setInterval(() => {
      typed += 1;
      untyped.setStart(text, typed);
      placeCaret();
      if (typed >= length) {
        window.clearInterval(timer);
        setPhase('play');
      }
    }, TYPE_MS);

    return () => {
      window.clearInterval(timer);
      CSS.highlights.delete('scriblr-run-untyped');
      caret.hidden = true;
    };
  }, [phase, running, active, rowElement]);

  const onPlayerPointer = (over: boolean) => (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setPointerOver(over);
  };

  /** Keyboard focus anywhere in the player stops rotation, and it stays stopped. */
  const onPlayerFocus = (event: FocusEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    let keyboard = true;
    try {
      keyboard = target.matches(':focus-visible');
    } catch {
      // No :focus-visible support: treat every focus as keyboard focus, the safe side.
    }
    if (keyboard) setUserPaused(true);
  };

  /** The rotation button is the only control that starts the run again. */
  const onToggle = () => {
    if (userPaused) setUserControl(false);
    setUserPaused(!userPaused);
  };

  const onSegmentKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    let to: number | undefined;
    if (event.key === 'ArrowRight') to = active + 1;
    if (event.key === 'ArrowLeft') to = active - 1;
    if (event.key === 'Home') to = 0;
    if (event.key === 'End') to = count - 1;
    if (to === undefined) return;
    event.preventDefault();
    const i = ((to % count) + count) % count;
    go(i);
    segmentRefs.current[i]?.focus();
  };

  if (count === 0) return null;

  return (
    <div
      ref={rootRef}
      className={`${s.player} pt-3`}
      style={{ '--segments': count } as CSSProperties}
      onFocus={onPlayerFocus}
      onPointerEnter={onPlayerPointer(true)}
      onPointerLeave={onPlayerPointer(false)}
    >
      {/* Controls come before the rows in DOM and focus order (§11.4.4). */}
      <div className="flex items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={`${s.control} ${s.toggle} font-sans text-meta`}
            onClick={onToggle}
          >
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              {userPaused ? <path d="M3 1.5v9l7.5-4.5z" /> : <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />}
            </svg>
            {userPaused ? RUN_CONTROL_LABEL.play : RUN_CONTROL_LABEL.pause}
          </button>
          <button
            type="button"
            className={s.control}
            aria-label={RUN_CONTROL_LABEL.previous}
            onClick={() => go(active - 1)}
          >
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7.5 2.5L4 6l3.5 3.5" />
            </svg>
          </button>
          <button
            type="button"
            className={s.control}
            aria-label={RUN_CONTROL_LABEL.next}
            onClick={() => go(active + 1)}
          >
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4.5 2.5L8 6l-3.5 3.5" />
            </svg>
          </button>
        </div>
        {/* Position in the run. Navigation, not a result (gate: data-screen-nav). */}
        <span data-screen-nav="" className="font-mono text-meta tabular-nums" style={{ color: 'var(--s-text-faint)' }}>
          {`${pad(active + 1)} / ${pad(count)}`}
        </span>
      </div>

      <div
        ref={regionRef}
        data-run-region=""
        className={`${s.region} mt-3 px-4`}
      >
        {rows.map((row, i) => (
          <div
            key={i}
            data-run-row=""
            hidden={i !== active}
            data-run-phase={i === active && phase !== 'done' ? phase : undefined}
          >
            {row}
          </div>
        ))}
        <span ref={caretRef} aria-hidden="true" className={s.caret} hidden />
      </div>

      <div
        role="group"
        aria-label={RUN_CONTROL_LABEL.segments}
        className={`${s.rail} mt-3 px-4`}
      >
        {rows.map((_, i) => (
          <button
            key={i}
            ref={(el) => {
              segmentRefs.current[i] = el;
            }}
            type="button"
            className={s.segment}
            aria-labelledby={`${RUN_SHOW_ID} ${runIndustryId(i)}`}
            aria-current={i === active ? 'true' : undefined}
            tabIndex={i === active ? 0 : -1}
            onClick={() => go(i)}
            onKeyDown={onSegmentKey}
          />
        ))}
      </div>
      <span id={RUN_SHOW_ID} hidden>
        {RUN_CONTROL_LABEL.show}
      </span>

      {/* The one live region (§11.4.6). Empty in the served HTML; React never
          renders children into it, so writing textContent here is safe. */}
      <p ref={liveRef} aria-live={liveMode} aria-atomic="true" className="sr-only m-0" />
    </div>
  );
}
