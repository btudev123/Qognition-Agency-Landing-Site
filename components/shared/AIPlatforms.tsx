import { AI_PLATFORMS } from '../../data/aiPlatforms';
const labels: Record<string, string> = {
  en: 'Where your buyers look for answers', de: 'Wo Ihre Kunden nach Antworten suchen', fr: 'Là où vos clients cherchent des réponses', nl: 'Waar uw kopers antwoorden zoeken', sv: 'Där dina köpare söker svar', da: 'Der, hvor dine kunder søger svar', nb: 'Der kundene dine søker svar', fi: 'Siellä missä ostajasi etsivät vastauksia', ar: 'حيث يبحث عملاؤك عن الإجابات', it: 'Dove i tuoi clienti cercano risposte', 'zh-Hans': '您的买家寻找答案的平台',
};
export default function AIPlatforms({ compact = false, locale = 'en' }: { compact?: boolean; locale?: string }) {
  return <div className={`ai-platforms${compact ? ' ai-platforms--compact' : ''}`}>
    <p className="ai-platforms-label">{labels[locale] || labels.en}</p>
    {(['primary', 'extended'] as const).map(group => <ul key={group} className={`ai-platform-row ai-platform-row--${group}`}>
      {AI_PLATFORMS.filter(platform => platform.group === group).map(platform => <li key={platform.id}>
        <a href={platform.url} target="_blank" rel="noopener noreferrer" className="ai-platform" title={platform.name}>
          <span className="ai-platform-icon" aria-hidden="true">{platform.icon ? <img src={platform.icon} alt="" width={20} height={20} /> : <span>{platform.monogram}</span>}</span>
          <span>{platform.name}</span>
        </a>
      </li>)}
    </ul>)}
  </div>;
}
