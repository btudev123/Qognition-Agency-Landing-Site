import type { ExternalSource } from '../../data/sourcedClaims';

/* The citation after a third-party figure. Server-only, no state.
   An external report opens in a new tab, so the screen-reader text says so
   (same pattern as the WhatsApp link in Footer.tsx). The underline stays on at
   rest: a link set in body copy must not rely on colour alone (WCAG 1.4.1). */
export default function SourceLink({ source }: { source: ExternalSource }) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-4"
      style={{ color: 'inherit' }}
    >
      {source.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
