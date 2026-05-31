import type { ReactNode } from 'react';
import type { SpokeId } from '../../lib/spokes';
import { SPOKES } from '../../lib/spokes';

interface SpokeLayoutProps {
  spoke: SpokeId;
  children: ReactNode;
}

export default function SpokeLayout({ spoke, children }: SpokeLayoutProps) {
  const config = SPOKES[spoke];

  return (
    <div
      style={{
        '--spoke-accent': config.accent,
        '--spoke-accent-light': config.accentLight,
        '--spoke-accent-rgb': config.accentRgb,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
