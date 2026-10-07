import type { LucideIcon } from 'lucide-react';
import v from './visual.module.css';

/* Square icon tile (brief §1.1). 24px icon in a 40px tile, 32px in a 48px tile.
 * Decorative: the adjacent text carries the meaning. Server component only. */
export default function IconTile({ icon: Icon, size = 24 }: { icon: LucideIcon; size?: 24 | 32 }) {
  return (
    <span className={`${v.iconTile} ${size === 32 ? 'h-12 w-12' : 'h-10 w-10'}`} aria-hidden="true">
      <Icon size={size} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
    </span>
  );
}

/** A bare 20px inline icon, for list bullets and links. */
export function InlineIcon({ icon: Icon, muted = false }: { icon: LucideIcon; muted?: boolean }) {
  return (
    <span
      className="mt-0.5 flex-shrink-0"
      style={{ color: muted ? 'var(--s-text-muted)' : 'var(--s-accent)' }}
      aria-hidden="true"
    >
      <Icon size={20} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
    </span>
  );
}
