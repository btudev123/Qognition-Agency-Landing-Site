'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/* ──────────────────────────────────────────────────────────────────────────
   HeroAurora — animated teal gradient-mesh background for the homepage hero.
   Lightweight (blurred CSS radial orbs + grid), respects reduced-motion.
   ────────────────────────────────────────────────────────────────────────── */

export function HeroAurora() {
  const reduce = useReducedMotion();
  const drift = (anim: string) => (reduce ? {} : { animation: anim, willChange: 'transform' });

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* faint blueprint grid */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(rgba(20,184,166,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, #000 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, #000 0%, transparent 78%)',
        }}
      />
      {/* teal mesh orbs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '8%', width: 'min(46vw, 620px)', height: 'min(46vw, 620px)',
        background: 'radial-gradient(circle, rgba(20,184,166,0.30) 0%, transparent 64%)',
        filter: 'blur(72px)', ...drift('rf-orb-drift 26s ease-in-out infinite'),
      }} />
      <div style={{
        position: 'absolute', top: '4%', right: '4%', width: 'min(42vw, 560px)', height: 'min(42vw, 560px)',
        background: 'radial-gradient(circle, rgba(45,212,191,0.24) 0%, transparent 66%)',
        filter: 'blur(80px)', ...drift('rf-orb-drift-b 32s ease-in-out infinite 4s'),
      }} />
      <div style={{
        position: 'absolute', bottom: '-14%', left: '50%', transform: 'translateX(-50%)', width: 'min(70vw, 980px)', height: '52vh',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(15,118,110,0.22) 0%, rgba(20,184,166,0.06) 44%, transparent 72%)',
        filter: 'blur(46px)', ...drift('rf-orb-drift-c 36s ease-in-out infinite 8s'),
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

const TILES: Tile[] = [
  { label: 'Marketing', metric: '4.2×', note: 'Avg. ROAS', accent: '#14B8A6' },
  { label: 'Tech', metric: '142', note: 'Builds shipped', accent: '#2563EB' },
  { label: 'Finance', metric: '$500M+', note: 'Revenue tracked', accent: '#059669' },
  { label: 'Automation', metric: '38k', note: 'Hrs automated/yr', accent: '#F59E0B' },
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
