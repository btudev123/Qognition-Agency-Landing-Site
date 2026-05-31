'use client';

import { useMemo, useState } from 'react';
import CalculatorShell, { CalcField } from '../CalculatorShell';

interface Props {
  toolSlug: string;
}

const num = (v: string) => Number(v || 0);
const currency = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

export default function AutomationRoiCalculator({ toolSlug }: Props) {
  const [hoursPerWeek, setHoursPerWeek] = useState('20');
  const [hourlyCost, setHourlyCost] = useState('35');
  const [setupCost, setSetupCost] = useState('15000');

  const results = useMemo(() => {
    const hours = num(hoursPerWeek) * 52;
    const cost = num(hourlyCost);
    const setup = num(setupCost);
    const annualSaving = hours * cost;
    const yearOneNet = annualSaving - setup;
    const threeYearRoi = (annualSaving * 3 - setup) / Math.max(setup, 1);
    const paybackMonths = Math.ceil((setup / Math.max(annualSaving / 12, 1)) * 10) / 10;
    return [
      ['Hours Saved / Year', `${Math.round(hours).toLocaleString()} hours`],
      ['Annual Cost Savings', currency(annualSaving)],
      ['Year 1 Net Savings', currency(yearOneNet)],
      ['3-Year ROI', `${threeYearRoi.toFixed(1)}x`],
      ['Payback Period', `${paybackMonths} months`],
    ];
  }, [hoursPerWeek, hourlyCost, setupCost]);

  return (
    <CalculatorShell title="Automation ROI Calculator" toolSlug={toolSlug} spoke="automation" results={results}>
      <CalcField label="Hours Spent on Manual Tasks / Week" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} />
      <CalcField label="Hourly Cost of Person Doing It ($)" value={hourlyCost} onChange={(e) => setHourlyCost(e.target.value)} />
      <CalcField label="Automation Setup Cost ($)" value={setupCost} onChange={(e) => setSetupCost(e.target.value)} />
    </CalculatorShell>
  );
}
