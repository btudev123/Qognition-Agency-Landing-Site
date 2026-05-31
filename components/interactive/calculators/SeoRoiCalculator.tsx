'use client';

import { useMemo, useState } from 'react';
import CalculatorShell, { CalcField } from '../CalculatorShell';

interface Props {
  toolSlug: string;
}

const num = (v: string) => Number(v || 0);
const currency = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

export default function SeoRoiCalculator({ toolSlug }: Props) {
  const [traffic, setTraffic] = useState('5000');
  const [lift, setLift] = useState('40');
  const [conversion, setConversion] = useState('3');
  const [close, setClose] = useState('20');
  const [deal, setDeal] = useState('8000');

  const results = useMemo(() => {
    const t = num(traffic);
    const l = num(lift) / 100;
    const c = num(conversion) / 100;
    const cl = num(close) / 100;
    const d = num(deal);
    const newTraffic = t * l;
    const leads = newTraffic * c;
    const revenue = leads * cl * d;
    return [
      ['New Monthly Visits', Math.round(newTraffic).toLocaleString()],
      ['Estimated Monthly Leads', Math.round(leads).toLocaleString()],
      ['Estimated Monthly Revenue', currency(revenue)],
      ['Annualized Revenue Impact', currency(revenue * 12)],
    ];
  }, [traffic, lift, conversion, close, deal]);

  return (
    <CalculatorShell title="SEO ROI Calculator" toolSlug={toolSlug} spoke="marketing" results={results}>
      <CalcField label="Monthly Organic Visits" value={traffic} onChange={(e) => setTraffic(e.target.value)} />
      <CalcField label="Expected Traffic Lift (%)" value={lift} onChange={(e) => setLift(e.target.value)} />
      <CalcField label="Avg. Conversion Rate (%)" value={conversion} onChange={(e) => setConversion(e.target.value)} />
      <CalcField label="Sales Close Rate (%)" value={close} onChange={(e) => setClose(e.target.value)} />
      <CalcField label="Average Deal Value ($)" value={deal} onChange={(e) => setDeal(e.target.value)} />
    </CalculatorShell>
  );
}
