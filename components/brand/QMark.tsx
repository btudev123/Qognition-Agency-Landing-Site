/* The open Q. Canonical geometry: docs/design/logo.md §2.3. Do not re-derive
 * the numbers — the arc endpoints, the 34° notch and the tail overhang are a
 * set and adjusting one of them breaks the optical centring.
 *
 * Why the notch, recorded here because it is the part most likely to be
 * "tidied" by someone who reads it as a rendering bug:
 *
 *   1. A plain ring with a 45° tail is owned by roughly a dozen companies. The
 *      notch is what makes this one identifiable at 16px in a browser tab.
 *   2. It removes the two-tone crossing. Where the tail passes through the
 *      ring, a continuous ring would put teal over ink and force a decision
 *      about which is on top — so the duo version would need different path
 *      data from the mono one. With the notch, both versions are the same two
 *      paths and only the stroke colour changes.
 *   3. It says what the company says: the mark does not close around its own
 *      answer.
 *
 * Butt terminals, not round. Round caps go soft at 16px; butt holds the edge.
 *
 * Renders at 1em so it scales with font-size and never takes a width prop.
 * aria-hidden with focusable="false" (IE/Edge legacy, harmless and cheap): the
 * accessible name belongs on the anchor that wraps the lockup, not here, or a
 * screen reader announces the company twice.
 */
export function QMark({ tone = 'mono' }: { tone?: 'mono' | 'duo' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      strokeWidth={3.5}
      strokeLinecap="butt"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.929 25.271A10.5 10.5 0 1 1 25.271 20.929" stroke="currentColor" />
      <path
        d="M20.5 20.5 26.2 26.2"
        stroke={tone === 'duo' ? 'var(--logo-accent)' : 'currentColor'}
      />
    </svg>
  );
}

export default QMark;
