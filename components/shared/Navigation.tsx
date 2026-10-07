'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { appendFunnelContext } from '../../lib/funnelContext';
const links = [['Services', '/services'], ['Industries', '/industries'], ['Markets', '/growth/markets'], ['Insights', '/insights'], ['Our approach', '/process'], ['Engagements', '/pricing']];
const languages = [['English','/'],['Deutsch','/de'],['Français','/fr'],['Nederlands','/nl'],['Svenska','/sv'],['Dansk','/da'],['Norsk','/nb'],['Suomi','/fi'],['العربية','/ar'],['Italiano','/it'],['简体中文','/zh-Hans']];
export default function Navigation() {
 const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false); const pathname=usePathname();
 useEffect(()=>setOpen(false),[pathname]);
 // Fixed header (growth.css). At scroll 0 it is the same translucent bar it always was; once the page moves it turns solid and lifts, so text never shows through it.
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>8);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
 const bookHref=pathname==='/'?'#book':appendFunnelContext('/book', {page_id:pathname || '/'});
 // Hash links (#book on the homepage, #enquiry on /contact) do not change the pathname, so the menu has to close itself.
 // Book a call is first in the mobile menu: the menu scrolls inside the fixed header, and on a short phone its last rows sit under the consent banner until it is answered.
 const closeMenu=()=>setOpen(false);
 useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close)},[]);
 return <header className="growth-nav" data-scrolled={scrolled?'':undefined}><a href="#page-content" className="growth-skip">Skip to content</a><div className="growth-shell growth-nav-inner">
 <Link href="/" className="growth-brand" aria-label="Qognition home"><Logo /></Link>
 <nav aria-label="Main navigation" className="growth-desktop-nav">{links.map(([label,href])=><Link key={href} href={href} aria-current={pathname===href?'page':undefined}>{label}</Link>)}</nav>
 <div className="growth-nav-actions"><details className="growth-language-menu"><summary aria-label="Choose language">EN</summary><nav aria-label="Languages">{languages.map(([name,href])=><Link key={href} href={href}>{name}</Link>)}</nav></details><Link href={bookHref} className="growth-nav-cta">Book a call <ArrowUpRight size={16} aria-hidden="true" /></Link><button className="growth-mobile-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>
 </div>{open&&<nav id="mobile-navigation" className="growth-mobile-nav" aria-label="Mobile navigation"><Link href={bookHref} onClick={closeMenu} className="growth-mobile-nav-cta">Book a call<ArrowUpRight size={17} aria-hidden="true"/></Link>{links.map(([label,href])=><Link key={href} href={href} onClick={closeMenu} aria-current={pathname===href?'page':undefined}>{label}<ArrowUpRight size={17} aria-hidden="true"/></Link>)}<Link href="/contact#enquiry" onClick={closeMenu}>Send an enquiry<ArrowUpRight size={17} aria-hidden="true"/></Link></nav>}</header>;
}
