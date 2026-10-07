'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { appendFunnelContext } from '../../lib/funnelContext';
import { Logo } from '../brand/Logo';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT_EMAIL, PHONE_DISPLAY } from '../../data/siteConfig';
import ContactChannelLink from './ContactChannelLink';
import { openConsentSettings } from '../../lib/consent';
const searchServices = [['AI SEO & GEO', '/services/ai-seo'], ['Technical SEO', '/services/seo'], ['Expert content', '/services/content'], ['B2B PPC', '/services/ppc']];
import AIPlatforms from './AIPlatforms';
export default function Footer(){ const pathname = usePathname(); const bookingHref = pathname === '/' ? '#book' : appendFunnelContext('/book', { page_id: pathname || '/' }); return <footer className="growth-footer"><div className="growth-shell">
 <div className="growth-footer-cta"><div><p className="growth-eyebrow">AI SEO & GEO FOR B2B</p><h2>Better visibility.<br />More meaningful conversations.</h2></div><div><Link href={bookingHref} className="growth-button">Book a call <ArrowUpRight size={18}/></Link><Link href="/contact#enquiry" className="growth-text-link">Send an enquiry <ArrowUpRight size={18}/></Link></div></div>
 <AIPlatforms compact />
 <div className="growth-footer-grid"><div><Link href="/" className="growth-brand" aria-label="Qognition home"><Logo size={36} /></Link><p>AI SEO and GEO for B2B.<br />From buyer questions to sales conversations.</p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><ContactChannelLink channel="phone" location="footer" aria-label={`Call ${PHONE_DISPLAY}`}>{PHONE_DISPLAY}</ContactChannelLink><ContactChannelLink channel="whatsapp" location="footer">WhatsApp <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></ContactChannelLink></div><div><h3>What we do</h3>{searchServices.map(([name,href])=><Link key={href} href={href}>{name}</Link>)}</div><div><h3>Explore</h3><Link href="/industries">Industries</Link><Link href="/growth/markets">Markets</Link><Link href="/insights">Growth library</Link><Link href="/process">Our approach</Link><Link href="/pricing">Engagements</Link></div><div><h3>Connect</h3><Link href="/about">About Qognition</Link><Link href="/contact#enquiry">Send an enquiry</Link><a href="https://www.linkedin.com/company/qognition-tech" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://x.com/qognition_tech" target="_blank" rel="noopener noreferrer">X ↗</a></div></div>
 <div className="growth-footer-bottom"><span>© {new Date().getFullYear()} Qognition Agency</span><div><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link><button type="button" onClick={openConsentSettings}>Privacy choices</button><Link href="/sitemap">Sitemap</Link></div></div>
 </div></footer>}
