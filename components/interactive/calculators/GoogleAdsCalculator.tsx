'use client';

import { useMemo, useState } from 'react';
import CalculatorShell, { CalcField } from '../CalculatorShell';

interface Props {
  toolSlug: string;
}

const num = (v: string) => Number(v || 0);
const currency = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

export default function GoogleAdsCalculator({ toolSlug }: Props) {
  const [leads, setLeads] = useState('80');
  const [cpc, setCpc] = useState('8');
  const [conversion, setConversion] = useState('3');
  const [close, setClose] = useState('20');
  const [deal, setDeal] = useState('8000');

  const results = useMemo(() => {
    const l = num(leads);
    const c = num(cpc);
    const conv = num(conversion) / 100;
    const cl = num(close) / 100;
    const d = num(deal);
    const clicks = l / Math.max(conv, 0.001);
    const budget = clicks * c;
    const expectedRevenue = l * cl * d;
    const roas = expectedRevenue / Math.max(budget, 1);
    return [
      ['Recommended Monthly Spend', currency(budget)],
      ['Projected Revenue', currency(expectedRevenue)],
      ['Projected ROAS', `${roas.toFixed(1)}x`],
      [
        'ROAS Zone',
        roas >= 3 ? 'Healthy (>3x)' : roas >= 1.5 ? 'Monitor (1.5-3x)' : 'Needs optimization (<1.5x)',
      ],
    ];
  }, [leads, cpc, conversion, close, deal]);

  return (
    <CalculatorShell title="Google Ads Budget Calculator" toolSlug={toolSlug} spoke="marketing" results={results}>
      <CalcField label="Target Leads per Month" value={leads} onChange={(e) => setLeads(e.target.value)} />
      <CalcField label="Average CPC ($)" value={cpc} onChange={(e) => setCpc(e.target.value)} />
      <CalcField label="Landing Page Conversion (%)" value={conversion} onChange={(e) => setConversion(e.target.value)} />
      <CalcField label="Sales Close Rate (%)" value={close} onChange={(e) => setClose(e.target.value)} />
      <CalcField label="Average Deal Value ($)" value={deal} onChange={(e) => setDeal(e.target.value)} />
    </CalculatorShell>
  );
}
