import type { MentionState } from '../../data/product-screens';
import { MENTION_LABEL } from './labels';

/* Word plus dot, never the dot alone (WCAG 1.4.1). */
export default function MentionCell({ state }: { state: MentionState }) {
  const label = MENTION_LABEL[state];
  const named = label === 'Named';
  return (
    <span className="inline-flex items-center gap-1.5 sm:flex-col sm:gap-1">
      <span
        aria-hidden="true"
        className="block h-2 w-2 flex-shrink-0 rounded-full"
        style={named ? { background: 'var(--s-accent-graphic)' } : { boxShadow: 'inset 0 0 0 1px var(--s-rule-strong)' }}
      />
      <span className="whitespace-nowrap" style={{ color: named ? 'var(--s-text)' : 'var(--s-text-muted)' }}>
        {label}
      </span>
    </span>
  );
}
