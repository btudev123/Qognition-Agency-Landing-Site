'use client';

import { useMemo, useState } from 'react';
import CalculatorShell, { CalcField } from '../CalculatorShell';

interface Props {
  toolSlug: string;
}

const num = (v: string) => Number(v || 0);
const currency = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

export default function TrafficEstimator({ toolSlug }: Props) {
  const [keywordVolume, setKeywordVolume] = useState('12000');
  const [ctr, setCtr] = useState('8');
  const [pages, setPages] = useState('5');
  const [conversion, setConversion] = useState('3');
  const [close, setClose] = useState('20');
  const [deal, setDeal] = useState('8000');

  const results = useMemo(() => {
    const kv = num(keywordVolume);
    const c = num(ctr) / 100;
    const p = num(pages);
    const conv = num(conversion) / 100;
    const cl = num(close) / 100;
    const d = num(deal);
    const visits = kv * c * Math.max(p, 1);
    const leads = visits * conv;
    const revenue = leads * cl * d;
    return [
      ['Estimated Monthly Visits', Math.round(visits).toLocaleString()],
      ['Estimated Leads', Math.round(leads).toLocaleString()],
      ['Opportunity Revenue', currency(revenue)],
      ['Per-Page Avg. Visits', Math.round(visits / Math.max(p, 1)).toLocaleString()],
    ];
  }, [keywordVolume, ctr, pages, conversion, close, deal]);

  return (
    <CalculatorShell title="Website Traffic Estimator" toolSlug={toolSlug} spoke="tech" results={results}>
      <CalcField label="Monthly Keyword Search Volume" value={keywordVolume} onChange={(e) => setKeywordVolume(e.target.value)} />
      <CalcField label="Expected CTR (%)" value={ctr} onChange={(e) => setCtr(e.target.value)} />
      <CalcField label="Number of Target Pages" value={pages} onChange={(e) => setPages(e.target.value)} />
      <CalcField label="Avg. Conversion Rate (%)" value={conversion} onChange={(e) => setConversion(e.target.value)} />
      <CalcField label="Sales Close Rate (%)" value={close} onChange={(e) => setClose(e.target.value)} />
      <CalcField label="Average Deal Value ($)" value={deal} onChange={(e) => setDeal(e.target.value)} />
    </CalculatorShell>
  );
}
