'use client';

import { useCallback, useRef, type CSSProperties } from 'react';
import type { HeroReelPlatform } from '../../data/homeHero';
import s from './platformReel.module.css';

/* The slot-machine word in the homepage H1 (operator, 2026-10-08).
 *
 * Decorative. The H1's text is heroH1Sentence() from an sr-only span beside this
 * component; this is aria-hidden and renders no text node (the words are CSS
 * generated content, platformReel.module.css). So screen readers, crawlers and
 * the served-page R7 scan all read one stable sentence.
 *
 * The automatic pass is pure CSS (data-reel="intro"): it runs without
 * JavaScript, holds the server-rendered first word for 600ms, spins once
 * through the platforms in 3.2s and lands back on the first. It never loops,
 * which is how it meets WCAG 2.2.2 without a pause control.
 *
 * The only client work is the replay: pointing at the word plays the pass once
 * more. No timer, no state, no re-render. The attribute flips to "spin" and
 * back to "rest" on animationend. Ignored under reduced motion and while a pass
 * is already running.
 *
 * Keyboard: no replay. The reel is aria-hidden, and a focusable element inside
 * aria-hidden content is an accessibility failure (axe aria-hidden-focus). A
 * separate replay button would add a tab stop ahead of "Book a call" for an
 * effect that carries no information. Keyboard users get the same single pass
 * on load as everyone else. */

type Props = {
  /** Spin order. The first entry is the served and resting word. Exactly four: the keyframes have four steps. */
  platforms: readonly [HeroReelPlatform, HeroReelPlatform, HeroReelPlatform, HeroReelPlatform];
};

export default function PlatformReel({ platforms }: Props) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const strip = [...platforms, platforms[0]];

  const replay = useCallback(() => {
    const root = rootRef.current;
    if (!root || root.dataset.reel === 'spin') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const moving = root.querySelector<HTMLElement>('[data-reel-strip]');
    if (moving?.getAnimations?.().some((a) => a.playState === 'running' || a.pending)) return;
    root.dataset.reel = 'spin';
  }, []);

  const settle = useCallback(() => {
    if (rootRef.current) rootRef.current.dataset.reel = 'rest';
  }, []);

  return (
    <span ref={rootRef} className={s.reel} data-reel="intro" aria-hidden="true" onPointerEnter={replay}>
      <span className={s.sizer}>
        {platforms.map((p) => (
          <span key={p.id} className={s.item} data-word={p.name}>
            <span className={s.logo} />
          </span>
        ))}
      </span>
      <span className={s.window}>
        <span className={s.strip} data-reel-strip="" onAnimationEnd={settle}>
          {strip.map((p, i) => (
            <span
              key={`${p.id}-${i}`}
              className={s.item}
              data-word={p.name}
              style={{ color: `var(--brand-ink-${p.id})` } as CSSProperties}
            >
              {/* Same files and treatment as the hero platform chips: alt="" because
                  the word beside it is the label. The chips' "A name here is not a
                  partnership" note sits in the same section. */}
              <img className={s.logo} src={p.icon} alt="" width={16} height={16} decoding="async" />
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
