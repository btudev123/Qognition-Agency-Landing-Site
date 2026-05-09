'use client';

import React, { useMemo, useState } from 'react';

type Props = {
  tool: string;
};

const number = (value: string) => Number(value || 0);
const currency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

const CalculatorTool: React.FC<Props> = ({ tool }) => {
  const [values, setValues] = useState({
    traffic: '5000',
    lift: '40',
    conversion: '3',
    close: '20',
    deal: '8000',
    cpc: '8',
    leads: '80',
    spend: '10000',
    revenue: '42000',
    margin: '55',
    keywordVolume: '12000',
    ctr: '8',
    pages: '5',
    keyword: 'technical seo'
  });

  const update = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  const result = useMemo(() => {
    const traffic = number(values.traffic);
    const lift = number(values.lift) / 100;
    const conversion = number(values.conversion) / 100;
    const close = number(values.close) / 100;
    const deal = number(values.deal);
    const cpc = number(values.cpc);
    const leads = number(values.leads);
    const spend = number(values.spend);
    const revenue = number(values.revenue);
    const margin = number(values.margin) / 100;
    const keywordVolume = number(values.keywordVolume);
    const ctr = number(values.ctr) / 100;
    const pages = number(values.pages);

    if (tool === 'google-ads-budget-calculator') {
      const clicks = leads / Math.max(conversion, 0.001);
      const budget = clicks * cpc;
      const expectedRevenue = leads * close * deal;
      return [
        ['Recommended Spend', currency(budget)],
        ['Expected Pipeline Revenue', currency(expectedRevenue)],
        ['Projected ROAS', `${(expectedRevenue / Math.max(budget, 1)).toFixed(1)}x`]
      ];
    }

    if (tool === 'website-traffic-estimator') {
      const visits = keywordVolume * ctr * Math.max(pages, 1);
      return [
        ['Estimated Monthly Visits', Math.round(visits).toLocaleString()],
        ['Estimated Leads', Math.round(visits * conversion).toLocaleString()],
        ['Opportunity Revenue', currency(visits * conversion * close * deal)]
      ];
    }

    if (tool === 'roas-calculator') {
      const roas = revenue / Math.max(spend, 1);
      const profit = revenue * margin - spend;
      return [
        ['ROAS', `${roas.toFixed(2)}x`],
        ['Gross Profit After Media', currency(profit)],
        ['Break-even Revenue', currency(spend / Math.max(margin, 0.001))]
      ];
    }

    if (tool === 'content-idea-generator') {
      const seed = values.keyword || 'growth';
      return [
        ['Blog Idea', `How to improve ${seed} without wasting budget`],
        ['Comparison Idea', `${seed} agency vs in-house team`],
        ['Lead Magnet Idea', `${seed} audit checklist for 2026`]
      ];
    }

    const newTraffic = traffic * lift;
    const leadsCreated = newTraffic * conversion;
    const revenueCreated = leadsCreated * close * deal;
    return [
      ['New Monthly Visits', Math.round(newTraffic).toLocaleString()],
      ['Estimated Monthly Leads', Math.round(leadsCreated).toLocaleString()],
      ['Estimated Revenue', currency(revenueCreated)]
    ];
  }, [tool, values]);

  const sharedFields = (
    <>
      <Field label="Conversion Rate (%)" value={values.conversion} onChange={update('conversion')} />
      <Field label="Close Rate (%)" value={values.close} onChange={update('close')} />
      <Field label="Average Deal Value" value={values.deal} onChange={update('deal')} />
    </>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 space-y-4">
        {tool === 'google-ads-budget-calculator' ? (
          <>
            <Field label="Target Leads" value={values.leads} onChange={update('leads')} />
            <Field label="Average CPC" value={values.cpc} onChange={update('cpc')} />
            {sharedFields}
          </>
        ) : tool === 'website-traffic-estimator' ? (
          <>
            <Field label="Keyword Monthly Searches" value={values.keywordVolume} onChange={update('keywordVolume')} />
            <Field label="Expected CTR (%)" value={values.ctr} onChange={update('ctr')} />
            <Field label="Number of Target Pages" value={values.pages} onChange={update('pages')} />
            {sharedFields}
          </>
        ) : tool === 'roas-calculator' ? (
          <>
            <Field label="Ad Spend" value={values.spend} onChange={update('spend')} />
            <Field label="Revenue From Ads" value={values.revenue} onChange={update('revenue')} />
            <Field label="Gross Margin (%)" value={values.margin} onChange={update('margin')} />
          </>
        ) : tool === 'content-idea-generator' ? (
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-gray-500">Seed Keyword</span>
            <textarea
              value={values.keyword}
              onChange={update('keyword')}
              rows={5}
              className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-teal-400"
            />
          </label>
        ) : (
          <>
            <Field label="Monthly Organic Visits" value={values.traffic} onChange={update('traffic')} />
            <Field label="Expected Traffic Lift (%)" value={values.lift} onChange={update('lift')} />
            {sharedFields}
          </>
        )}
      </div>

      <div className="rounded-2xl border border-teal-400/20 bg-teal-400/5 p-6">
        <h2 className="font-display text-3xl mb-6">Estimate</h2>
        <div className="space-y-4">
          {result.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0">
              <span className="text-gray-400">{label}</span>
              <span className="font-display text-2xl text-white">{value}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-400">
          This is a directional planning estimate. Use real CRM, analytics, margin, and close-rate data for board-level forecasting.
        </p>
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label className="block">
    <span className="text-xs uppercase tracking-widest text-gray-500">{label}</span>
    <input
      value={value}
      onChange={onChange}
      inputMode="decimal"
      className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-teal-400"
    />
  </label>
);

export default CalculatorTool;
