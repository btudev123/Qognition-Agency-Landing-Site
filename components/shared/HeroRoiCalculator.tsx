'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { openTallyPopup } from './TallyForm';

// Hero ROI calculator. "See how much manual data processing is costing you."
// Inputs (team size, hours/week, hourly cost) drive a live savings figure; the
// detailed report is gated behind a business email → Tally popup + /api/lead.

const WORKING_WEEKS = 48;
const AUTOMATABLE = 0.7; // ~70% of manual reporting work is automatable

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  prefix?: string;
}) {
  return (
    <label className="block text-left min-w-0">
      <span
        className="block font-mono uppercase tracking-[0.1em] whitespace-nowrap"
        style={{ fontSize: 9.5, color: 'var(--text-muted)' }}
      >
        {label}
      </span>
      <div
        className="flex items-center mt-1.5 rounded-lg overflow-hidden"
        style={{ border: '1px solid var(--border-strong)', background: 'var(--bg)' }}
      >
        {prefix && (
          <span className="pl-3" style={{ color: 'var(--text-muted)', fontSize: 15 }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            const v = Number(e.target.value);
            onChange(Number.isFinite(v) ? Math.max(min, Math.min(max, v)) : min);
          }}
          className="w-full min-w-0 bg-transparent px-3 py-2.5 outline-none"
          style={{ color: 'var(--ink)', fontSize: 16, fontVariantNumeric: 'tabular-nums' }}
        />
      </div>
    </label>
  );
}

export default function HeroRoiCalculator() {
  const [teamSize, setTeamSize] = useState(5);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [hourlyCost, setHourlyCost] = useState(45);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const { annualCost, annualSavings, reclaimedHours } = useMemo(() => {
    const annualHours = teamSize * hoursPerWeek * WORKING_WEEKS;
    const cost = annualHours * hourlyCost;
    return {
      annualCost: cost,
      annualSavings: cost * AUTOMATABLE,
      reclaimedHours: Math.round(annualHours * AUTOMATABLE),
    };
  }, [teamSize, hoursPerWeek, hourlyCost]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMsg('');

    const note = `ROI calculator — team ${teamSize}, ${hoursPerWeek} hrs/wk @ ${fmt(
      hourlyCost,
    )}/hr. Est. annual manual cost ${fmt(annualCost)}, projected savings ${fmt(
      annualSavings,
    )}/yr (${reclaimedHours} hrs reclaimed).`;

    // Route the lead to Tally (with the savings note) on the user's click gesture.
    openTallyPopup({ email, source: 'ROI calculator', note });

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
            message: `ROI calculator — team ${teamSize}, ${hoursPerWeek} hrs/wk @ ${fmt(
              hourlyCost,
            )}/hr. Est. annual manual cost ${fmt(annualCost)}, projected savings ${fmt(
              annualSavings,
            )}/yr (${reclaimedHours} hrs reclaimed).`,
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
      <div className="flex items-center gap-2 mb-2">
        <span
          style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)' }}
        />
        <span
          className="font-mono uppercase tracking-[0.14em]"
          style={{ fontSize: 10, color: 'var(--accent-deep)' }}
        >
          Free ROI Calculator
        </span>
      </div>
      <h2
        className="text-h2 font-sans m-0 mb-1 font-semibold"
        style={{ fontSize: 'clamp(19px, 2.2vw, 25px)', color: 'var(--ink)' }}
      >
        See what manual work is costing you
      </h2>
      <p className="text-body m-0 mb-6" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        Estimate the cost of hours your team spends on manual reporting.
      </p>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-6">
        <NumberField label="Team size" value={teamSize} onChange={setTeamSize} min={1} max={1000} />
        <NumberField
          label="Hrs / week"
          value={hoursPerWeek}
          onChange={setHoursPerWeek}
          min={1}
          max={80}
        />
        <NumberField
          label="Cost / hour"
          value={hourlyCost}
          onChange={setHourlyCost}
          min={5}
          max={500}
          prefix="$"
        />
      </div>

      <div
        className="flex flex-wrap items-end justify-between gap-4 mb-6 pb-6"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div>
          <div
            className="font-mono uppercase tracking-[0.12em] mb-1"
            style={{ fontSize: 10, color: 'var(--text-muted)' }}
          >
            Potential savings / year
          </div>
          <div
            className="rf-gradient-text font-sans font-medium leading-none tracking-[-0.03em]"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontVariantNumeric: 'tabular-nums' }}
          >
            {fmt(annualSavings)}
          </div>
        </div>
        <div className="text-right" style={{ color: 'var(--ink-soft)', fontSize: 13 }}>
          <div>
            <strong style={{ color: 'var(--ink)' }}>{reclaimedHours.toLocaleString()}</strong> hours
            reclaimed/yr
          </div>
          <div className="mt-1">
            of <strong style={{ color: 'var(--ink)' }}>{fmt(annualCost)}</strong> spent today
          </div>
        </div>
      </div>

      {status === 'done' ? (
        <div className="flex items-start gap-3" style={{ color: 'var(--ink)' }}>
          <CheckCircle2 size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-body m-0 font-medium">Your full report is on the way.</p>
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
                Email me the full report <ArrowRight size={16} />
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
          Free · No credit card · Custom savings report in your inbox
        </p>
      )}
    </div>
  );
}
