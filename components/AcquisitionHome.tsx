import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Search, Target, Workflow } from 'lucide-react';
import AIPlatforms from './shared/AIPlatforms';
import Industries from './home/Industries';
import Programme from './home/Programme';
import Evidence from './home/Evidence';
import FourLayers from './home/FourLayers';
import BuyingProblem from './home/BuyingProblem';
import Snapshot from './home/Snapshot';
import Fit from './home/Fit';
import Faqs from './home/Faqs';

export default function AcquisitionHome() {
  return <main id="main-content" className="growth-home">
    <section className="growth-hero growth-shell">
      <div className="growth-eyebrow"><span className="growth-dot" /> AI-native B2B growth agency</div>
      <div className="growth-hero-grid">
        <div>
          <h1 className="text-display growth-display">Get found.<br />Get shortlisted.<br /><span>Build pipeline.</span></h1>
          <p className="growth-hero-copy">Help buyers discover your business across Google and AI search. Turn that visibility into qualified demand with content, paid media, ABM and connected revenue systems.</p>
          <div className="growth-actions"><Link href="/book" className="growth-button">Discuss your growth plan <ArrowUpRight size={18} /></Link><Link href="/free-ai-audit" className="growth-text-link">Request an AI visibility audit <ArrowRight size={17} /></Link></div>
        </div>
        <aside className="growth-system" aria-label="How discovery connects to revenue">
          <div className="growth-system-top"><span>THE CONNECTED BUYER JOURNEY</span><span className="growth-dot" /></div>
          <div className="growth-query"><span>YOUR NEXT BUYER IS ASKING</span><p>“Who can solve<br /><strong>this problem?</strong>”</p></div>
          <div className="growth-system-line" aria-hidden="true" />
          <div className="growth-system-node"><Search size={19} /><div><strong>Discovery</strong><span>Google · AI search · expert content</span></div><span className="growth-node-number">01</span></div>
          <div className="growth-system-line" aria-hidden="true" />
          <div className="growth-system-node"><Target size={19} /><div><strong>Consideration</strong><span>Relevant proof · clear next steps</span></div><span className="growth-node-number">02</span></div>
          <div className="growth-system-line" aria-hidden="true" />
          <div className="growth-system-node growth-system-node--active"><Workflow size={19} /><div><strong>Qualified pipeline</strong><span>Sales conversations · opportunities</span></div><ArrowUpRight size={20} /></div>
          <p className="growth-system-caption">One strategy. Connected from the first question to the sales conversation.</p>
        </aside>
      </div>
      <AIPlatforms />
    </section>
    <BuyingProblem />
    <FourLayers />
    <Industries />
    <Programme />
    <Evidence />
    <Snapshot />
    <Fit />
    <Faqs />
  </main>;
}
