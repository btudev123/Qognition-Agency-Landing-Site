import SeoRoiCalculator from './interactive/calculators/SeoRoiCalculator';
import GoogleAdsCalculator from './interactive/calculators/GoogleAdsCalculator';
import TrafficEstimator from './interactive/calculators/TrafficEstimator';
import RoasCalculator from './interactive/calculators/RoasCalculator';
import ContentIdeaGenerator from './interactive/calculators/ContentIdeaGenerator';
import AutomationRoiCalculator from './interactive/calculators/AutomationRoiCalculator';
import FinanceHealthScore from './interactive/calculators/FinanceHealthScore';

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
