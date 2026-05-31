'use client';

import type { ReactNode } from 'react';
import LeadForm from '../shared/LeadForm';
import type { SpokeId } from '../../lib/validation';

interface CalculatorShellProps {
  title: string;
  toolSlug: string;
  spoke?: SpokeId;
  children: ReactNode;
  results: string[][];
  resultType?: 'numeric' | 'text';
}

export default function CalculatorShell({
  title,
  toolSlug,
  spoke = 'marketing',
  children,
  results,
  resultType = 'numeric',
}: CalculatorShellProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-2">
          Inputs
        </h2>
        {children}
      </div>

      {/* Results */}
      <div className="rounded-xl border-2 border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.03)] p-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-6">
          Your Estimate
        </h2>
        <div className="space-y-4">
          {results.map(([label, value]) => (
            <div
              key={label}
              className={`${resultType === 'text' ? 'space-y-2' : 'flex items-center justify-between'} border-b border-[var(--border)] pb-4 last:border-0`}
            >
              <span className="text-sm text-[var(--text-muted)]">{label}</span>
              <span
                className={
                  resultType === 'text'
                    ? 'block text-sm text-[var(--text)] leading-relaxed'
                    : 'text-xl font-semibold text-[var(--text)]'
                }
              >
                {value}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-[var(--text-muted)] leading-relaxed">
          This is a directional estimate. Use your real CRM, analytics, and close-rate data for board-level forecasting.
        </p>
      </div>

      {/* Lead capture below results */}
      <div className="lg:col-span-2 max-w-md mx-auto w-full">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
          <h3 className="text-sm font-semibold text-[var(--text)] mb-1 text-center">
            Want the full model?
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-5 text-center">
            Send this estimate and we&apos;ll review the assumptions with you — free.
          </p>
          <LeadForm
            spoke={spoke}
            intent="audit"
            sourcePage={`/free-tools/${toolSlug}`}
            ctaLabel="Review My Estimate"
            qualifyingQuestion="What's your biggest growth challenge?"
          />
        </div>
      </div>
    </div>
  );
}

interface CalcFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'number' | 'text';
}

export function CalcField({ label, value, onChange, type = 'number' }: CalcFieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--text-muted)]">{label}</span>
      <input
        value={value}
        onChange={onChange}
        inputMode={type === 'number' ? 'decimal' : undefined}
        className="mt-1.5 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-colors"
      />
    </label>
  );
}
