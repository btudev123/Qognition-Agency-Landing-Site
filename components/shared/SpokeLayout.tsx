import type { ReactNode } from 'react';
import type { SpokeId } from '../../lib/spokes';
import { getSpoke } from '../../lib/spokes';

interface SpokeLayoutProps {
  spoke: SpokeId;
  children: ReactNode;
}

export default function SpokeLayout({ spoke, children }: SpokeLayoutProps) {
  const config = getSpoke(spoke);
  if (!config) return children;

  return (
    <div
      style={
        {
          '--accent': config.accent,
          '--accent-light': config.accentLight,
          '--accent-rgb': config.accentRgb,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
