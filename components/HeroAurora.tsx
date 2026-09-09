'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/* ──────────────────────────────────────────────────────────────────────────
   HeroAurora — animated teal gradient-mesh background for the homepage hero.
   Lightweight (blurred CSS radial orbs + grid), respects reduced-motion.
   ────────────────────────────────────────────────────────────────────────── */

export function HeroAurora() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* faint blueprint grid — fades out toward the edges */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(rgba(13,12,10,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(13,12,10,0.045) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at 50% 38%, #000 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 38%, #000 0%, transparent 75%)',
        }}
      />
      {/* single, restrained accent halo — sits behind the headline, no heavy blobs */}
      <div style={{
        position: 'absolute', top: '34%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 'min(78vw, 1100px)', height: 'min(54vw, 720px)',
        background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.10) 0%, rgba(20,184,166,0.04) 38%, transparent 70%)',
        filter: 'blur(36px)',
        ...(reduce ? {} : { animation: 'rf-pulse 9s ease-in-out infinite', willChange: 'opacity' }),
      }} />
      {/* soft bottom fade into the page */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '32%',
        background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)',
      }} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   HeroDashboard — floating frosted-glass "operating system" panel showing the
   four functions, with a subtle cursor-parallax tilt.
   ────────────────────────────────────────────────────────────────────────── */

interface Tile {
  label: string;
  metric: string;
  note: string;
  accent: string;
}

// Metrics removed: 4.2x ROAS, 142 builds, $500M+ revenue tracked and 38k hrs automated were
// all unsourced, and the $500M+/142 figures contradicted the numbers quoted elsewhere on the
// site. The tiles now name what each division does; put a number back only with a source on file.
const TILES: Tile[] = [
  { label: 'Marketing', metric: 'SEO · AI search', note: 'Paid, content, CRO', accent: '#14B8A6' },
  { label: 'Tech', metric: 'Next.js', note: 'Sites, apps, integrations', accent: '#2563EB' },
  { label: 'Finance', metric: 'Fractional CFO', note: 'Books, tax, reporting', accent: '#059669' },
  { label: 'Automation', metric: 'AI agents', note: 'Workflows, data pipelines', accent: '#F59E0B' },
];

export function HeroDashboard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [8, -8]);
  const rotateX = useTransform(sy, [0, 1], [-6, 6]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1200 }}
      className="w-full max-w-[560px] mx-auto"
    >
      <motion.div
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          background: 'rgba(255,255,255,0.62)',
          backdropFilter: 'blur(22px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(22px) saturate(1.3)',
          border: '1px solid rgba(255,255,255,0.7)',
          boxShadow: '0 30px 80px rgba(15,118,110,0.18), 0 2px 0 rgba(255,255,255,0.6) inset',
        }}
        className="p-5 sm:p-6"
      >
        {/* header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent-glow)', animation: reduce ? 'none' : 'rf-pulse 2s ease-in-out infinite' }} />
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: 'var(--ink-soft)' }}>
              Qognition OS · Live
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: 'var(--text-muted)' }}>
            v1.0
          </span>
        </div>

        {/* 2×2 function tiles */}
        <div className="grid grid-cols-2 gap-3">
          {TILES.map((t) => (
            <div
              key={t.label}
              className="p-4"
              style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.accent }} />
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: 'var(--text-muted)' }}>
                  {t.label}
                </span>
              </div>
              <div className="font-sans font-medium leading-none tracking-[-0.03em]" style={{ fontSize: 'clamp(24px, 3vw, 34px)', color: 'var(--ink)' }}>
                {t.metric}
              </div>
              <div className="text-[12px] mt-1.5" style={{ color: 'var(--ink-soft)' }}>{t.note}</div>
            </div>
          ))}
        </div>

        {/* footer bar */}
        <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <span className="text-[12px]" style={{ color: 'var(--ink-soft)' }}>One partner · One standard · One invoice</span>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: 'var(--accent)' }}>
            ● Operating
          </span>
        </div>
      </motion.div>
    </div>
  );
}
