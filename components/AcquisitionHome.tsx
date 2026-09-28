import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Search, Target, Workflow, Radar } from 'lucide-react';
import AIPlatforms from './shared/AIPlatforms';
import { GROWTH_PILLARS, GROWTH_SECTOR_LINKS } from '../data/growthPositioning';

const icons = [Search, Radar, Target, Workflow];
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
    <section className="growth-shell growth-section" id="services"><div className="growth-section-head"><div><p className="growth-eyebrow">FOUR CONNECTED DISCIPLINES</p><h2>A growth program.<br />Built around your buyers.</h2></div><Link href="/services" className="growth-text-link">Explore our services <ArrowUpRight size={18} /></Link></div>
      <div className="growth-pillar-grid">{GROWTH_PILLARS.map((pillar, i) => { const Icon = icons[i]; return <article key={pillar.slug} className="growth-pillar"><div className="growth-card-top"><span>{pillar.number}</span><Icon size={25} strokeWidth={1.4} /></div><h3><Link href={pillar.href}>{pillar.name} <ArrowUpRight size={24} /></Link></h3><p className="growth-pillar-outcome">{pillar.outcome}</p><p>{pillar.description}</p><ul>{pillar.services.map(service => <li key={service}>{service}</li>)}</ul></article>; })}</div>
    </section>
    <section className="growth-dark"><div className="growth-shell growth-section"><div className="growth-section-head"><div><p className="growth-eyebrow">BUILT FOR COMPLEX B2B</p><h2>Your expertise is specific.<br />Your growth strategy should be too.</h2></div><p>For businesses where a better-fit customer matters more than another unqualified click.</p></div><div className="growth-sector-grid">{GROWTH_SECTOR_LINKS.map(([name, slug, detail], index) => <Link href={`/growth/industries/${slug}`} key={slug} className="growth-sector"><span className="growth-sector-index">0{index + 1}</span><div><h3>{name}</h3><p>{detail}</p></div><ArrowUpRight size={22} /></Link>)}</div></div></section>
    <section className="growth-shell growth-section"><div className="growth-section-head"><div><p className="growth-eyebrow">HOW WE WORK</p><h2>Understand the opportunity.<br />Then do the work.</h2></div><Link href="/process" className="growth-text-link">Our approach <ArrowUpRight size={18} /></Link></div><ol className="growth-process-grid">{[
      ['01', 'Find the commercial gap', 'Agree your priority buyers, markets and offers. Review your website, search data, competitor coverage, conversion paths and sales feedback.'],
      ['02', 'Build the connected program', 'Prioritize the pages, campaigns and systems that help those buyers move forward. Give every deliverable an owner and a clear purpose.'],
      ['03', 'Measure and improve', 'Review visibility, qualified enquiries and pipeline together. Use what sales learns to decide what to improve next.'],
    ].map(([num, title, body]) => <li key={num}><span>{num}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></section>
    <section className="growth-shell growth-section growth-measure"><div><p className="growth-eyebrow">MEASURE WHAT MOVES THE BUSINESS</p><h2>Visibility is the start.<br />Pipeline is the conversation.</h2><p>We distinguish what a platform shows, what a visitor does and what sales confirms. Your reporting connects those signals without treating every mention or meeting as a customer.</p><Link href="/insights" className="growth-text-link">Explore the growth library <ArrowRight size={18} /></Link></div><div className="growth-metrics-list">{[['Search visibility', 'Relevant rankings, observed answers and citations'], ['Qualified interest', 'Enquiries, account fit and stated intent'], ['Sales readiness', 'Accepted leads and confirmed buying needs'], ['Commercial progress', 'Opportunities, proposals and won business']].map(([name, description]) => <div key={name}><h3>{name}</h3><p>{description}</p></div>)}</div></section>
    <section className="growth-shell growth-section growth-home-faq"><p className="growth-eyebrow">BEFORE WE TALK</p><h2>A few useful answers.</h2>{[
      ['Do we need all four services?', 'Start with the constraint that matters most. We scope the work around your buyers, existing team and commercial priorities, then connect other disciplines where they help.'],
      ['Can you work alongside our team or agency?', 'Yes. We agree ownership, access and review responsibilities before work begins. Your specialists remain an essential source of product and customer knowledge.'],
      ['Which AI platforms will you measure?', 'We agree the platforms, countries, languages and commercial questions relevant to your buyers. A repeatable sample documents what appeared and when; it does not guarantee future recommendations.'],
      ['How are engagements priced?', 'Scope depends on your markets, website, content needs and implementation capacity. The proposal defines deliverables, responsibilities, measurement and review dates.'],
    ].map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</section>
  </main>;
}
