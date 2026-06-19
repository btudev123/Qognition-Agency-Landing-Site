'use client';

import { useEffect, useRef, useState } from 'react';

export interface Stat {
  /** numeric target for the count-up */
  value: number;
  prefix?: string;
  suffix?: string;
  /** decimal places */
  decimals?: number;
  label: string;
}

// Dependency-free animated counters. Count-up triggers on scroll-in via
// IntersectionObserver, honors prefers-reduced-motion, and formats locale-aware.
function useCountUp(target: number, decimals: number, run: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return val.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
  const formatted = useCountUp(stat.value, stat.decimals ?? 0, run);
  return (
    <div className="text-center px-4">
      <div
        style={{
          fontFamily: 'var(--font-geist), system-ui, sans-serif',
          fontSize: 'clamp(40px, 6vw, 72px)',
          lineHeight: 1,
          fontWeight: 600,
          letterSpacing: '-0.04em',
          color: 'var(--accent)',
        }}
      >
        {stat.prefix}
        {formatted}
        {stat.suffix}
      </div>
      <div
        className="mt-3 text-sm"
        style={{ color: 'var(--text-muted, rgba(243,240,234,0.6))', letterSpacing: '0.01em' }}
      >
        {stat.label}
      </div>
    </div>
  );
}

const DEFAULT_STATS: Stat[] = [
  { value: 312, suffix: '%', label: 'Avg. organic growth' },
  { value: 3.5, suffix: 'x', decimals: 1, label: 'Average ROAS' },
  { value: 87, suffix: '%', label: 'Client retention' },
  { value: 2500, suffix: '+', label: 'Pages ranked' },
];

export default function StatBand({ stats = DEFAULT_STATS }: { stats?: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 max-w-[1100px] mx-auto px-5 sm:px-10 py-16 sm:py-24"
    >
      {stats.map((s, i) => (
        <StatItem key={i} stat={s} run={run} />
      ))}
    </section>
  );
}
