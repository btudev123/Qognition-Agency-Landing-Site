import { QMark } from './QMark';

/* The lockup: mark plus live wordmark. docs/design/logo.md §3 and §5.
 *
 * One variable drives the whole thing. `--logo-size` is the mark height in px
 * and every other measurement is a ratio of it, so a caller changes one number
 * and the proportions hold. Setting the mark and the wordmark at independently
 * chosen sizes is the specific misuse this shape prevents.
 *
 * Weight is 600, not 650. next/font loads Geist at 400/500/600, so the 650 that
 * `.growth-brand` asked for did not exist and the browser synthesised or
 * rounded it — the wordmark has been rendering at a weight nobody chose.
 *
 * The trailing period is gone. Its only job was putting teal in the lockup and
 * the tail does that once, better. It also claimed finality from a company
 * whose whole positioning is stating what it measured and nothing more, and it
 * was held in place by a negative margin tuned to one font size.
 *
 * translateY(0.055em) aligns the mark's optical centre to the wordmark's
 * x-height centre rather than its bounding box. `qognition` is all lowercase
 * with one ascender and one descender, so box-centring puts the mark visibly
 * high. The em here is the wordmark's font-size, which is why the nudge lives
 * on the mark's own span.
 *
 * The wordmark is live text, not outlines. Outlining is blocked on a Geist
 * OFL-1.1 licence check (logo.md §9, L1) and scripts/build-logo.mjs holds the
 * recipe for when that clears.
 */
export function Logo({
  size = 30,
  tone = 'duo',
  wordmark = true,
}: {
  size?: number;
  tone?: 'mono' | 'duo';
  wordmark?: boolean;
}) {
  return (
    <span
      className="logo inline-flex items-center"
      style={
        {
          '--logo-size': `${size}px`,
          gap: 'calc(var(--logo-size) * 0.32)',
        } as React.CSSProperties
      }
    >
      <span
        style={{
          fontSize: 'var(--logo-size)',
          transform: 'translateY(0.055em)',
          lineHeight: 0,
        }}
      >
        <QMark tone={tone} />
      </span>
      {wordmark && (
        <span
          className="logo-word font-sans"
          style={{
            fontSize: 'calc(var(--logo-size) * 0.78)',
            fontWeight: 600,
            letterSpacing: '-0.045em',
            lineHeight: 1,
          }}
        >
          qognition
        </span>
      )}
    </span>
  );
}

export default Logo;
