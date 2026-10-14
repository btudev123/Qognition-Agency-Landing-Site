import { AI_PLATFORMS } from './aiPlatforms';

/* The homepage H1 (priority page #1).
 *
 * Operator decision 2026-10-08, CLAUDE.md authority block, recorded as a §4
 * amendment for this H1 only: "Be the firm {platform} names when your buyer asks
 * who to hire." Title and meta are unchanged.
 *
 * The sentence lives here, not in Hero.tsx, so a wording change is one edit in
 * one place. The alternative Ruth raised drops in as:
 *
 *   lead: 'Give', tail: 'reasons to name your firm.', conjunction: 'and'
 *
 * scripts/audit-headings.mjs loads this file and runs the hero claim rules on
 * heroH1Sentence(), so moving the words out of the JSX did not move them out of
 * the gate.
 *
 * Served and accessible text is heroH1Sentence(): lead, every reel platform
 * joined in plain English, tail. The reel itself is decorative (aria-hidden). */

/** Reel platforms, by AI_PLATFORMS id. Order is spin order; the first is the served and resting word. */
export type HeroReelPlatformId = 'chatgpt' | 'claude' | 'gemini' | 'perplexity';
/** Exactly four: components/home/platformReel.module.css has four steps. */
type Four<T> = readonly [T, T, T, T];

export const HERO_H1 = {
  lead: 'Be the firm',
  platforms: ['chatgpt', 'claude', 'gemini', 'perplexity'],
  conjunction: 'or',
  tail: 'names when your buyer asks who to hire.',
} as const satisfies {
  lead: string;
  platforms: Four<HeroReelPlatformId>;
  conjunction: 'or' | 'and';
  tail: string;
};

export type HeroReelPlatform = { id: HeroReelPlatformId; name: string; icon: string };

/** The reel entries, resolved from AI_PLATFORMS. Throws at build time if an id or its logo is missing. */
export function heroReelPlatforms(): Four<HeroReelPlatform> {
  const resolved = HERO_H1.platforms.map((id) => {
    const p = AI_PLATFORMS.find((x) => x.id === id);
    if (!p || !p.icon) throw new Error(`HERO_H1: platform "${id}" is not in AI_PLATFORMS with a logo in public/brand-logos.`);
    return { id, name: p.name, icon: p.icon };
  });
  return resolved as unknown as Four<HeroReelPlatform>;
}

/** "ChatGPT, Claude, Gemini or Perplexity". No serial comma, matching the site's copy. */
export function heroSpokenPlatforms(): string {
  const names = heroReelPlatforms().map((p) => p.name);
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(', ')} ${HERO_H1.conjunction} ${names[names.length - 1]}`;
}

/** The complete, stable H1 sentence: what the server sends, what crawlers and screen readers get. */
export function heroH1Sentence(): string {
  return `${HERO_H1.lead} ${heroSpokenPlatforms()} ${HERO_H1.tail}`;
}
