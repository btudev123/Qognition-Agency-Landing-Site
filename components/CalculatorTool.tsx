import dynamic from 'next/dynamic';

const SeoRoiCalculator = dynamic(() => import('./interactive/calculators/SeoRoiCalculator'));
const GoogleAdsCalculator = dynamic(() => import('./interactive/calculators/GoogleAdsCalculator'));
const TrafficEstimator = dynamic(() => import('./interactive/calculators/TrafficEstimator'));
const RoasCalculator = dynamic(() => import('./interactive/calculators/RoasCalculator'));
const ContentIdeaGenerator = dynamic(() => import('./interactive/calculators/ContentIdeaGenerator'));
const AutomationRoiCalculator = dynamic(() => import('./interactive/calculators/AutomationRoiCalculator'));
const FinanceHealthScore = dynamic(() => import('./interactive/calculators/FinanceHealthScore'));

interface Props {
  tool: string;
}

export default function CalculatorTool({ tool }: Props) {
  switch (tool) {
    case 'seo-roi-calculator':
      return <SeoRoiCalculator toolSlug={tool} />;
    case 'google-ads-budget-calculator':
      return <GoogleAdsCalculator toolSlug={tool} />;
    case 'website-traffic-estimator':
      return <TrafficEstimator toolSlug={tool} />;
    case 'roas-calculator':
      return <RoasCalculator toolSlug={tool} />;
    case 'content-idea-generator':
      return <ContentIdeaGenerator toolSlug={tool} />;
    case 'automation-roi-calculator':
      return <AutomationRoiCalculator toolSlug={tool} />;
    case 'finance-health-score':
      return <FinanceHealthScore toolSlug={tool} />;
    default:
      return <SeoRoiCalculator toolSlug={tool} />;
  }
}
