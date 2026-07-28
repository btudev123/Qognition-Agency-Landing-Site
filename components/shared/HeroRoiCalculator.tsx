'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, RotateCcw } from 'lucide-react';

// Hero ROI calculator. Interactive by design: drag-to-explore sliders, preset
// scenarios, a live-tweening savings figure, and a visual cost split. The result
// is never gated — the email only buys the detailed written breakdown.

const WORKING_WEEKS = 48;

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const fmtCompact = (n: number) =>
  n >= 1000
    ? `$${(n / 1000).toLocaleString('en-US', { maximumFractionDigits: n >= 10000 ? 0 : 1 })}k`
    : fmt(n);

type Scenario = {
  id: string;
  label: string;
  teamSize: number;
  hoursPerWeek: number;
  hourlyCost: number;
  coverage: number;
};

const SCENARIOS: Scenario[] = [
  { id: 'saas', label: 'SaaS team', teamSize: 8, hoursPerWeek: 9, hourlyCost: 60, coverage: 70 },
  { id: 'agency', label: 'Agency', teamSize: 12, hoursPerWeek: 12, hourlyCost: 45, coverage: 75 },
  { id: 'ecom', label: 'E-commerce', teamSize: 5, hoursPerWeek: 14, hourlyCost: 35, coverage: 80 },
  { id: 'ops', label: 'Ops / finance', teamSize: 4, hoursPerWeek: 16, hourlyCost: 50, coverage: 65 },
];

const DEFAULTS = SCENARIOS[0];

/** Tweens toward `target` on every change (unlike CountUp, which fires once). */
function useAnimatedNumber(target: number, duration = 550) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      fromRef.current = target;
      setValue(target);
      return;
    }

    const from = fromRef.current;
    const delta = target - from;
    if (delta === 0) return;

    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = from + delta * eased;
      setValue(next);
      fromRef.current = next;
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const id = `roi-${label.replace(/[^a-z]/gi, '-').toLowerCase()}`;

  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <label
          htmlFor={id}
          className="font-mono uppercase tracking-[0.1em]"
          style={{ fontSize: 10, color: 'var(--text-muted)' }}
        >
          {label}
        </label>
        <span
          className="font-sans font-semibold"
          style={{ fontSize: 15, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}
        >
          {format(value)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-slider w-full"
        style={
          {
            '--roi-pct': `${pct}%`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

export default function HeroRoiCalculator() {
  const [teamSize, setTeamSize] = useState(DEFAULTS.teamSize);
  const [hoursPerWeek, setHoursPerWeek] = useState(DEFAULTS.hoursPerWeek);
  const [hourlyCost, setHourlyCost] = useState(DEFAULTS.hourlyCost);
  const [coverage, setCoverage] = useState(DEFAULTS.coverage);
  const [activeScenario, setActiveScenario] = useState<string | null>(DEFAULTS.id);
  const [horizon, setHorizon] = useState<1 | 3>(1);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const applyScenario = (s: Scenario) => {
    setTeamSize(s.teamSize);
    setHoursPerWeek(s.hoursPerWeek);
    setHourlyCost(s.hourlyCost);
    setCoverage(s.coverage);
    setActiveScenario(s.id);
  };

  // Any manual edit detaches from the preset.
  const manual = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setActiveScenario(null);
  };

  const { annualCost, annualSavings, reclaimedHours, residualCost } = useMemo(() => {
    const annualHours = teamSize * hoursPerWeek * WORKING_WEEKS;
    const cost = annualHours * hourlyCost;
    const rate = coverage / 100;
    return {
      annualCost: cost,
      annualSavings: cost * rate,
      residualCost: cost * (1 - rate),
      reclaimedHours: Math.round(annualHours * rate),
    };
  }, [teamSize, hoursPerWeek, hourlyCost, coverage]);

  const horizonSavings = annualSavings * horizon;
  const animatedSavings = useAnimatedNumber(horizonSavings);
  const savedPct = annualCost > 0 ? (annualSavings / annualCost) * 100 : 0;

  // Weeks of reclaimed capacity, expressed as full-time equivalents.
  const fte = useMemo(() => reclaimedHours / (WORKING_WEEKS * 40), [reclaimedHours]);

  const isDefault =
    activeScenario === DEFAULTS.id &&
    teamSize === DEFAULTS.teamSize &&
    hoursPerWeek === DEFAULTS.hoursPerWeek &&
    hourlyCost === DEFAULTS.hourlyCost &&
    coverage === DEFAULTS.coverage;

  const summary = `ROI calculator — team ${teamSize}, ${hoursPerWeek} hrs/wk @ ${fmt(
    hourlyCost,
  )}/hr, ${coverage}% automatable. Manual cost ${fmt(annualCost)}/yr, projected savings ${fmt(
    annualSavings,
  )}/yr (${reclaimedHours.toLocaleString()} hrs ≈ ${fte.toFixed(1)} FTE reclaimed).`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'automation',
          intent: 'consultation',
          source_page: typeof window !== 'undefined' ? window.location.pathname : '/',
          tag: 'roi-calculator',
          contact: {
            name: email.split('@')[0],
            email,
            message: summary,
          },
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer?.push({ event: 'roi_calculator_submit', savings: Math.round(annualSavings) });
      setStatus('done');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  return (
    <div
      id="roi-calculator"
      className="w-full text-left scroll-mt-28 rounded-2xl"
      style={{
        border: '1px solid var(--border-strong)',
        background: 'var(--surface)',
        boxShadow: '0 24px 60px -24px rgba(15,118,110,0.22), 0 2px 8px rgba(0,0,0,0.04)',
        padding: 'clamp(22px, 3vw, 34px)',
      }}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 8px var(--accent-glow)',
            }}
          />
          <span
            className="font-mono uppercase tracking-[0.14em]"
            style={{ fontSize: 10, color: 'var(--accent-deep)' }}
          >
            Free ROI Calculator
          </span>
        </div>
        {!isDefault && (
          <button
            type="button"
            onClick={() => applyScenario(DEFAULTS)}
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
            style={{ fontSize: 11, color: 'var(--text-muted)' }}
          >
            <RotateCcw size={12} /> Reset
          </button>
        )}
      </div>

      <h2
        className="text-h2 font-sans m-0 mb-1 font-semibold"
        style={{ fontSize: 'clamp(19px, 2.2vw, 25px)', color: 'var(--ink)' }}
      >
        See what manual work is costing you
      </h2>
      <p className="text-body m-0 mb-5" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        Drag to model your team. The numbers update live — no email required.
      </p>

      {/* Preset scenarios */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SCENARIOS.map((s) => {
          const active = activeScenario === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => applyScenario(s)}
              aria-pressed={active}
              className="px-3 py-1.5 rounded-full transition-all"
              style={{
                fontSize: 12,
                fontWeight: active ? 600 : 500,
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border-strong)'}`,
                background: active ? 'var(--accent-pale)' : 'transparent',
                color: active ? 'var(--accent-deep)' : 'var(--text-muted)',
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Sliders */}
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-6">
        <Slider
          label="Team size"
          value={teamSize}
          onChange={manual(setTeamSize)}
          min={1}
          max={100}
          format={(v) => `${v} ${v === 1 ? 'person' : 'people'}`}
        />
        <Slider
          label="Manual hrs / person / week"
          value={hoursPerWeek}
          onChange={manual(setHoursPerWeek)}
          min={1}
          max={40}
          format={(v) => `${v} hrs`}
        />
        <Slider
          label="Fully-loaded cost / hour"
          value={hourlyCost}
          onChange={manual(setHourlyCost)}
          min={15}
          max={200}
          step={5}
          format={(v) => `$${v}`}
        />
        <Slider
          label="Automatable share"
          value={coverage}
          onChange={manual(setCoverage)}
          min={20}
          max={95}
          step={5}
          format={(v) => `${v}%`}
        />
      </div>

      {/* Result */}
      <div className="mb-5 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="font-mono uppercase tracking-[0.12em]"
                style={{ fontSize: 10, color: 'var(--text-muted)' }}
              >
                Potential savings
              </span>
              <div
                className="inline-flex rounded-full p-0.5"
                style={{ border: '1px solid var(--border)' }}
              >
                {([1, 3] as const).map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHorizon(h)}
                    aria-pressed={horizon === h}
                    className="px-2 py-0.5 rounded-full transition-all"
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      background: horizon === h ? 'var(--accent)' : 'transparent',
                      color: horizon === h ? '#04221E' : 'var(--text-muted)',
                    }}
                  >
                    {h} yr
                  </button>
                ))}
              </div>
            </div>
            <div
              className="rf-gradient-text font-sans font-medium leading-none tracking-[-0.03em]"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontVariantNumeric: 'tabular-nums' }}
            >
              {fmt(Math.round(animatedSavings))}
            </div>
          </div>
          <div className="text-right" style={{ color: 'var(--ink-soft)', fontSize: 13 }}>
            <div>
              <strong style={{ color: 'var(--ink)' }}>{reclaimedHours.toLocaleString()}</strong>{' '}
              hours reclaimed/yr
            </div>
            <div className="mt-1">
              ≈ <strong style={{ color: 'var(--ink)' }}>{fte.toFixed(1)}</strong> full-time roles
            </div>
          </div>
        </div>

        {/* Visual cost split */}
        <div
          className="w-full h-2.5 rounded-full overflow-hidden flex mb-2"
          style={{ background: 'var(--bg-warm)' }}
          role="img"
          aria-label={`${Math.round(savedPct)}% of manual cost is automatable`}
        >
          <div
            style={{
              width: `${savedPct}%`,
              background: 'var(--accent)',
              transition: 'width 400ms cubic-bezier(0.22,1,0.36,1)',
            }}
          />
          <div
            style={{
              width: `${100 - savedPct}%`,
              background: 'var(--border-strong)',
              transition: 'width 400ms cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        </div>
        <div className="flex justify-between" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          <span>
            <strong style={{ color: 'var(--accent-deep)' }}>{fmtCompact(annualSavings)}/yr</strong>{' '}
            automatable
          </span>
          <span>
            {fmtCompact(residualCost)}/yr stays manual · {fmtCompact(annualCost)}/yr spent today
          </span>
        </div>
      </div>

      {status === 'done' ? (
        <div className="flex items-start gap-3" style={{ color: 'var(--ink)' }}>
          <CheckCircle2 size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-body m-0 font-medium">Your full breakdown is on the way.</p>
            <p className="text-body m-0 mt-1" style={{ color: 'var(--ink-soft)', fontSize: 14 }}>
              Check your inbox — and grab a 15-min strategy call to action it.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your business email"
            aria-label="Business email"
            className="flex-1 min-w-0 px-4 py-3 outline-none rounded-lg"
            style={{
              border: '1px solid var(--border-strong)',
              background: 'var(--bg)',
              color: 'var(--ink)',
              fontSize: 15,
            }}
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium whitespace-nowrap transition-all disabled:opacity-60 rounded-lg"
            style={{ background: 'var(--accent)', color: '#04221E', fontSize: 14 }}
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                Email me the breakdown <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-body m-0 mt-3" style={{ color: '#f87171', fontSize: 13 }}>
          {errorMsg}
        </p>
      )}
      {status !== 'done' && (
        <p className="text-body m-0 mt-3" style={{ color: 'var(--text-muted)', fontSize: 12 }}>
          Assumes {WORKING_WEEKS} working weeks/yr. Free · No credit card · Unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
