import Link from 'next/link';
import type { findNicheCandidate } from '../../lib/nicheCandidates';
import { SECTOR_BRIEFS } from '../../data/funnels/sectorBriefs';
import { appendFunnelContext, type FunnelContext } from '../../lib/funnelContext';
import AIPlatforms from '../shared/AIPlatforms';

type Candidate = NonNullable<ReturnType<typeof findNicheCandidate>>;
export default function NicheCandidatePage({candidate:c}:{candidate:Candidate}) {
  const brief=SECTOR_BRIEFS[c.industry.id];
  const context:FunnelContext={industry_id:c.industry.id,subindustry_id:c.sub?.id,niche_id:c.niche?.id,subniche_id:c.leaf?.id,stage:'bofu',page_id:c.href};
  const book=appendFunnelContext('/book',context),contact=appendFunnelContext('/contact#enquiry',context);
  const guides=c.sub ? `/resources/b2b-search/${c.industry.slug}/${c.sub.slug}` : undefined;
  return <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6"><div className="max-w-6xl mx-auto">
    <aside className="mb-10 rounded-xl border border-[var(--border)] p-5 text-meta" role="note">Preview draft. This application needs editorial and subject-matter review before publication. <Link href="/preview/funnels" className="underline">Review the funnel catalogue</Link></aside>
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-3 text-meta"><Link href="/industries">Industries</Link>{c.path.slice(0,-1).map((slug,i)=><Link className="underline" key={slug} href={`/industries/${c.path.slice(0,i+1).join('/')}`}>{[c.industry.name,c.sub?.name,c.niche?.name][i]}</Link>)}</nav>
    <p className="text-meta uppercase tracking-widest text-[var(--accent)]">AI SEO & GEO for B2B</p>
    <h1 className="text-display font-semibold max-w-4xl mt-5 mb-7">Make your {c.entity.name.toLowerCase()} expertise easier to find and evaluate.</h1>
    <p className="text-body max-w-3xl text-[var(--text-muted)]">{brief.problem} Qognition connects technical SEO, expert content and measured AI-search observations to {brief.outcome}.</p>
    <div className="flex flex-wrap gap-4 my-8"><Link className="btn-primary" href={book}>Book a call</Link><Link className="btn-outline" href={contact}>Send an enquiry</Link></div>
    <AIPlatforms />
    <section className="py-14 border-t border-[var(--border)] mt-14"><h2 className="text-h2 font-semibold mb-6">Help buyers assess the right fit.</h2><p className="text-body max-w-3xl">{brief.buyingTask} For {c.entity.name.toLowerCase()}, start with the application, supporting evidence and next question a prospective customer needs answered.</p><div className="grid md:grid-cols-3 gap-5 mt-8">{brief.proof.map(item=><article className="rounded-xl border border-[var(--border)] p-6" key={item}><h3 className="text-h3 font-semibold mb-4">{item}</h3><p className="text-body text-[var(--text-muted)]">Use material your business can substantiate. We agree what can be published and who needs to review it before a claim appears on the page.</p></article>)}</div></section>
    <section className="py-14 border-t border-[var(--border)]"><h2 className="text-h2 font-semibold mb-6">A search plan built around the commercial question.</h2><ol className="space-y-5 text-body">{brief.actions.map((action,i)=><li key={action}><strong>{i+1}. {action}.</strong></li>)}</ol><p className="text-body max-w-3xl mt-7">Review discovery, citations and enquiries separately. Record the prompts, platforms, markets and dates behind each AI-search observation; connect qualified enquiries to sales feedback without treating a citation as revenue.</p></section>
    {c.sub?.ai_prompts?.length ? <section className="py-14 border-t border-[var(--border)]"><h2 className="text-h2 font-semibold mb-6">Questions to investigate with your team.</h2><p className="text-body mb-6">These example buyer questions come from the broader {c.sub.name.toLowerCase()} planning brief. They are starting points for research, not observed AI answers or evidence of search demand.</p><ul className="space-y-4 text-body">{c.sub.ai_prompts.map(prompt=><li key={prompt} className="border-l-2 border-[var(--accent)] pl-5">{prompt}</li>)}</ul></section>:null}
    {guides ? <section className="py-14 border-t border-[var(--border)]"><h2 className="text-h2 font-semibold mb-6">Start with the buying decision.</h2><div className="grid md:grid-cols-2 gap-6"><Link className="rounded-xl border border-[var(--border)] p-7" href={appendFunnelContext(`${guides}/learn`,{...context,stage:'tofu'})}>Understand the search opportunity →</Link><Link className="rounded-xl border border-[var(--border)] p-7" href={appendFunnelContext(`${guides}/evaluate`,{...context,stage:'mofu'})}>Evaluate the work and measurement →</Link></div></section>:null}
    {c.children.length ? <section className="py-14 border-t border-[var(--border)]"><h2 className="text-h2 font-semibold mb-6">Explore your area of work.</h2><ul className="grid md:grid-cols-2 gap-4">{c.children.map(child=><li key={child.id}><Link className="underline underline-offset-4" href={`${c.href}/${child.slug}`}>{child.name}</Link></li>)}</ul></section>:null}
    <section className="py-14 border-t border-[var(--border)]"><h2 className="text-h2 font-semibold mb-6">Let’s talk about your next customers.</h2><p className="text-body max-w-3xl">{brief.qualification} Tell us who you sell to, where you want to grow and what needs to improve. We will discuss a scope suited to your business.</p><div className="flex flex-wrap gap-4 mt-8"><Link className="btn-primary" href={book}>Book a call</Link><Link className="btn-outline" href={contact}>Send an enquiry</Link></div></section>
  </div></main>;
}
