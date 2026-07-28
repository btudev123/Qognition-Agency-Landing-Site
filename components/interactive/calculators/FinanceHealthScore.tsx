'use client';

import { useMemo, useState } from 'react';
import CalculatorShell from '../CalculatorShell';

interface Props {
  toolSlug: string;
}

const questions = [
  { id: 'books', label: 'Are your books closed and reconciled monthly?', weight: 25 },
  { id: 'tax', label: 'Do you have a tax strategy in place (not just annual filing)?', weight: 20 },
  { id: 'cashflow', label: 'Do you maintain a 13-week cash flow forecast?', weight: 20 },
  { id: 'reporting', label: 'Do you receive monthly financial reports with P&L, balance sheet, and variance analysis?', weight: 15 },
  { id: 'payroll', label: 'Is payroll fully automated and compliant?', weight: 10 },
  { id: 'cfo', label: 'Do you have access to strategic finance advice (fractional CFO or equivalent)?', weight: 10 },
];

export default function FinanceHealthScore({ toolSlug }: Props) {
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'partial' | 'no'>>({
    books: 'partial',
    tax: 'partial',
    cashflow: 'no',
    reporting: 'partial',
    payroll: 'yes',
    cfo: 'no',
  });

  const setAnswer = (id: string, value: 'yes' | 'partial' | 'no') => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const { score, breakdown, recommendations } = useMemo(() => {
    let total = 0;
    const b: { label: string; score: number; max: number }[] = [];
    const recs: string[] = [];

    for (const q of questions) {
      const raw = answers[q.id] === 'yes' ? q.weight : answers[q.id] === 'partial' ? q.weight * 0.5 : 0;
      total += raw;
      b.push({ label: q.label, score: raw, max: q.weight });
      if (raw < q.weight * 0.6) {
        recs.push(q.label);
      }
    }

    return { score: Math.round(total), breakdown: b, recommendations: recs };
  }, [answers]);

  const results = [
    ['Finance Health Score', `${score}/100`],
    ['Category', score >= 70 ? 'Healthy — proactive' : score >= 40 ? 'Reactive — needs attention' : 'At risk — urgent gaps'],
    ['Top Gap', recommendations[0] || 'No critical gaps'],
    ['Second Gap', recommendations[1] || '—'],
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Assessment */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 space-y-5">
        <h2 className="text-h2 text-[var(--text-muted)] mb-2 font-semibold">
          Quick Assessment
        </h2>
        {questions.map((q) => (
          <div key={q.id} className="space-y-2">
            <p className="text-body text-[var(--text)]">{q.label}</p>
            <div className="flex gap-2">
              {(['yes', 'partial', 'no'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAnswer(q.id, v)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                    answers[q.id] === v
                      ? 'border-[var(--accent)] bg-[rgba(var(--accent-rgb),0.1)] text-[var(--accent)] font-medium'
                      : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  {v === 'yes' ? 'Yes' : v === 'partial' ? 'Partial' : 'No'}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div>
        <div className="rounded-xl border-2 border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.03)] p-6 mb-6">
          <h2 className="text-h2 text-[var(--accent)] mb-6 font-semibold">
            Your Finance Health Score
          </h2>
          <div className="mb-6">
            <div className="text-4xl font-semibold text-[var(--text)] mb-1">{score}/100</div>
            <div className="w-full h-3 rounded-full bg-[var(--ink)]/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${score}%`,
                  backgroundColor: score >= 70 ? '#059669' : score >= 40 ? '#F59E0B' : '#EF4444',
                }}
              />
            </div>
          </div>
          <div className="space-y-3">
            {breakdown.map((b) => (
              <div key={b.label} className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)] truncate mr-4">{b.label}</span>
                <span className="font-medium text-[var(--text)] shrink-0">
                  {b.score}/{b.max}
                </span>
              </div>
            ))}
          </div>
          <p className="text-meta mt-6 text-[var(--text-muted)]">
            This is a quick self-assessment. For a full finance health check with benchmarks and recommendations, request the free audit below.
          </p>
        </div>

        {/* Capture */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
          <h3 className="text-h3 text-[var(--text)] mb-1 text-center font-semibold">
            Get Your Full Finance Health Check
          </h3>
          <p className="text-meta text-[var(--text-muted)] mb-5 text-center">
            A real CFO-level analysis delivered in 48 hours. Free, no commitment.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = '/finance/audit';
            }}
          >
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-[var(--accent)] text-[var(--accent-deep)] rounded-lg hover:brightness-110 transition-all"
            >
              Request Full Health Check
            </button>
          </form>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Finance Health Score',
            description: 'Quick 6-question self-assessment for founder finance operations health.',
            url: `https://www.qognitionagency.com/free-tools/${toolSlug}`,
            applicationCategory: 'FinanceApplication',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
    </div>
  );
}
