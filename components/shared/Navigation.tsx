'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '../brand/Logo';
const links = [['Services', '/services'], ['Industries', '/growth/industries'], ['Markets', '/growth/markets'], ['Insights', '/insights'], ['Our approach', '/process'], ['Engagements', '/pricing']];
const languages = [['English','/'],['Deutsch','/de'],['Français','/fr'],['Nederlands','/nl'],['Svenska','/sv'],['Dansk','/da'],['Norsk','/nb'],['Suomi','/fi'],['العربية','/ar'],['Italiano','/it'],['简体中文','/zh-Hans']];
export default function Navigation() {
 const [open,setOpen]=useState(false); const pathname=usePathname();
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close)},[]);
 return <header className="growth-nav"><a href="#page-content" className="growth-skip">Skip to content</a><div className="growth-shell growth-nav-inner">
 <Link href="/" className="growth-brand" aria-label="Qognition home"><Logo /></Link>
 <nav aria-label="Main navigation" className="growth-desktop-nav">{links.map(([label,href])=><Link key={href} href={href} aria-current={pathname===href?'page':undefined}>{label}</Link>)}</nav>
 <div className="growth-nav-actions"><details className="growth-language-menu"><summary aria-label="Choose language">EN</summary><nav aria-label="Languages">{languages.map(([name,href])=><Link key={href} href={href}>{name}</Link>)}</nav></details><Link href="/book" className="growth-nav-cta">Let’s talk <ArrowUpRight size={16} /></Link><button className="growth-mobile-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>
 </div>{open&&<nav id="mobile-navigation" className="growth-mobile-nav" aria-label="Mobile navigation">{links.map(([label,href])=><Link key={href} href={href}>{label}<ArrowUpRight size={17}/></Link>)}<Link href="/free-ai-audit">Request an AI visibility audit<ArrowUpRight size={17}/></Link></nav>}</header>;
}
