'use client';

import { useMemo, useState } from 'react';
import CalculatorShell, { CalcField } from '../CalculatorShell';

interface Props {
  toolSlug: string;
}

export default function ContentIdeaGenerator({ toolSlug }: Props) {
  const [keyword, setKeyword] = useState('technical seo');
  const [audience, setAudience] = useState('B2B founders');
  const [funnelStage, setFunnelStage] = useState('middle of funnel');
  const [market, setMarket] = useState('Dubai');
  const [offer, setOffer] = useState('free SEO audit');

  const results = useMemo(() => {
    const seed = keyword.trim() || 'growth';
    const aud = audience.trim() || 'buyers';
    const funnel = funnelStage.trim() || 'middle of funnel';
    const mkt = market.trim() || 'your target market';
    const off = offer.trim() || 'strategy call';
    const year = new Date().getFullYear();
    return [
      ['Pillar Page', `The ${year} ${seed} playbook for ${aud}: strategy, channels, costs, and common mistakes.`],
      ['MoFu Blog', `How to know if your ${seed} strategy is ready to scale in ${mkt}: 9 signals, benchmarks, and fixes.`],
      ['Comparison Page', `${seed} agency vs in-house: which model works best for ${aud} at the ${funnel} stage?`],
      ['Case Study Angle', `How a ${mkt} team used ${seed} to turn search demand into qualified pipeline in 90 days.`],
      ['LinkedIn Post', `The unpopular truth about ${seed}: more content is not the goal — clearer buyer proof is.`],
      ['Lead Magnet', `${seed} audit checklist for ${aud}, gated behind ${off}.`],
      ['FAQ Cluster', `What does ${seed} cost, how long does it take, which KPIs matter, and when should a team hire help?`],
      ['Internal Link Map', `Link to /services, /industries, /locations/${mkt.toLowerCase().replace(/[^a-z0-9]+/g, '-')}, /resources, and /case-studies.`],
    ];
  }, [keyword, audience, funnelStage, market, offer]);

  return (
    <CalculatorShell title="Content Idea Generator" toolSlug={toolSlug} spoke="marketing" results={results} resultType="text">
      <CalcField label="Seed Keyword or Topic" value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" />
      <CalcField label="Target Audience" value={audience} onChange={(e) => setAudience(e.target.value)} type="text" />
      <CalcField label="Funnel Stage" value={funnelStage} onChange={(e) => setFunnelStage(e.target.value)} type="text" />
      <CalcField label="Target Market" value={market} onChange={(e) => setMarket(e.target.value)} type="text" />
      <CalcField label="Lead Magnet or Offer" value={offer} onChange={(e) => setOffer(e.target.value)} type="text" />
    </CalculatorShell>
  );
}
