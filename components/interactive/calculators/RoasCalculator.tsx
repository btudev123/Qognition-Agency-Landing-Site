'use client';

import { useMemo, useState } from 'react';
import CalculatorShell, { CalcField } from '../CalculatorShell';

interface Props {
  toolSlug: string;
}

const num = (v: string) => Number(v || 0);
const currency = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

export default function RoasCalculator({ toolSlug }: Props) {
  const [spend, setSpend] = useState('10000');
  const [revenue, setRevenue] = useState('42000');
  const [margin, setMargin] = useState('55');

  const results = useMemo(() => {
    const s = num(spend);
    const r = num(revenue);
    const m = num(margin) / 100;
    const roas = r / Math.max(s, 1);
    const profit = r * m - s;
    const breakeven = s / Math.max(m, 0.001);
    return [
      ['ROAS', `${roas.toFixed(2)}x`],
      ['Gross Profit After Ad Spend', currency(profit)],
      ['Break-even Revenue', currency(breakeven)],
      ['Profit Margin on Ad Spend', `${((profit / Math.max(s, 1)) * 100).toFixed(0)}%`],
    ];
  }, [spend, revenue, margin]);

  return (
    <CalculatorShell title="ROAS Calculator" toolSlug={toolSlug} spoke="marketing" results={results}>
      <CalcField label="Monthly Ad Spend ($)" value={spend} onChange={(e) => setSpend(e.target.value)} />
      <CalcField label="Revenue From Ads ($)" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
      <CalcField label="Gross Margin (%)" value={margin} onChange={(e) => setMargin(e.target.value)} />
    </CalculatorShell>
  );
}
