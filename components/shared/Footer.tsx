import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_LINK } from '../../data/siteConfig';
import { GROWTH_PILLARS } from '../../data/growthPositioning';
import AIPlatforms from './AIPlatforms';
export default function Footer(){ return <footer className="growth-footer"><div className="growth-shell">
 <div className="growth-footer-cta"><div><p className="growth-eyebrow">LET’S BUILD YOUR NEXT CHAPTER</p><h2>Better visibility.<br />More meaningful conversations.</h2></div><div><Link href="/book" className="growth-button">Discuss your growth plan <ArrowUpRight size={18}/></Link><Link href="/free-ai-audit" className="growth-text-link">Request an AI visibility audit <ArrowUpRight size={18}/></Link></div></div>
 <AIPlatforms compact />
 <div className="growth-footer-grid"><div><Link href="/" className="growth-brand">qognition<span>.</span></Link><p>AI-native B2B growth.<br />From the first question to the sales conversation.</p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a href={PHONE_LINK}>{PHONE_DISPLAY}</a></div><div><h3>What we do</h3>{GROWTH_PILLARS.map(p=><Link key={p.slug} href={p.href}>{p.name}</Link>)}</div><div><h3>Explore</h3><Link href="/growth/industries">Industries</Link><Link href="/growth/markets">Markets</Link><Link href="/insights">Growth library</Link><Link href="/process">Our approach</Link><Link href="/pricing">Engagements</Link></div><div><h3>Connect</h3><Link href="/about">About Qognition</Link><Link href="/contact">Contact</Link><a href="https://www.linkedin.com/company/qognition-tech" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://x.com/qognition_tech" target="_blank" rel="noopener noreferrer">X ↗</a></div></div>
 <div className="growth-footer-bottom"><span>© {new Date().getFullYear()} Qognition Agency</span><div><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link><Link href="/sitemap">Sitemap</Link></div></div>
 </div></footer>}
