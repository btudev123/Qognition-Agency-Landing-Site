'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// WebGL is heavy — load only on capable, motion-OK, desktop-class viewports.
// Everything else gets a CSS gradient fallback so the hero never blocks LCP.
const HeroScene = dynamic(() => import('./three/HeroScene'), { ssr: false });

export default function HeroCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = window.matchMedia('(min-width: 768px)').matches;
    const hasWebGL = (() => {
      try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
      } catch {
        return false;
      }
    })();
    if (!reduce && wide && hasWebGL) setEnabled(true);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {/* Fallback / base atmosphere — always rendered */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 70% 35%, rgba(20,184,166,0.18) 0%, transparent 55%), radial-gradient(ellipse at 25% 70%, rgba(15,118,110,0.12) 0%, transparent 55%)',
        }}
      />
      {enabled && <HeroScene />}
    </div>
  );
}
