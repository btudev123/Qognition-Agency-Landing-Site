import { Info } from 'lucide-react';

/* ADR-0006 R3. The ONLY file that contains the badge sentence, and it takes no
 * props, so no call site can soften or drop it. scripts/check-b2b.cjs asserts
 * both. It renders as the first row under the title bar (brief §1.6): the
 * bottom-right of a phone viewport is covered by FloatingWhatsApp and the
 * StickyCTA bar, so a bottom badge could be hidden exactly where it matters. */
export default function ProvenanceBadge() {
  return (
    <p
      className="m-0 flex items-start gap-2 px-3 py-2 text-meta"
      style={{
        background: 'var(--s-surface-2)',
        border: '1px solid var(--s-rule-strong)',
        color: 'var(--s-text)',
      }}
    >
      <span className="mt-px flex-shrink-0" style={{ color: 'var(--s-accent)' }}>
        <Info size={20} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
      </span>
      <span>
        <span className="font-medium" style={{ color: 'var(--s-accent)' }}>Illustrative</span>{' '}
        product interface. Sample data, not client results.
      </span>
    </p>
  );
}
