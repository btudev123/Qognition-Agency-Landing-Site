import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Search, Target, Workflow } from 'lucide-react';
import AIPlatforms from './shared/AIPlatforms';
import Industries from './home/Industries';
import Programme from './home/Programme';
import Evidence from './home/Evidence';
import FourLayers from './home/FourLayers';

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
    <section className="growth-tension"><div className="growth-shell growth-split"><p className="growth-eyebrow">THE OPPORTUNITY</p><div><h2>Your buyers are building a shortlist.<br /><span>Give them a reason to include you.</span></h2><p>Complex B2B purchases start long before a form submission. We connect the answers buyers need, the evidence they trust and the next step that brings them to your team.</p></div></div></section>
    <FourLayers />
    <Industries />
    <Programme />
    <Evidence />
    <section className="growth-shell growth-section growth-home-faq"><p className="growth-eyebrow">BEFORE WE TALK</p><h2>A few useful answers.</h2>{[
      ['Do we need all four services?', 'Start with the constraint that matters most. We scope the work around your buyers, existing team and commercial priorities, then connect other disciplines where they help.'],
      ['Can you work alongside our team or agency?', 'Yes. We agree ownership, access and review responsibilities before work begins. Your specialists remain an essential source of product and customer knowledge.'],
      ['Which AI platforms will you measure?', 'We agree the platforms, countries, languages and commercial questions relevant to your buyers. A repeatable sample documents what appeared and when; it does not guarantee future recommendations.'],
      ['How are engagements priced?', 'Scope depends on your markets, website, content needs and implementation capacity. The proposal defines deliverables, responsibilities, measurement and review dates.'],
    ].map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</section>
  </main>;
}
