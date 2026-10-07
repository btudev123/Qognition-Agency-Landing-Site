import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIcpSubIndustry } from '../../../../../../data/b2b/icp';
import { SECTOR_BRIEFS } from '../../../../../../data/funnels/sectorBriefs';
import { isPreviewDeployment } from '../../../../../../lib/deploymentMode';
import { appendFunnelContext } from '../../../../../../lib/funnelContext';
import { getSubNicheJourney } from '../../../../../../lib/nicheJourneys';

type Params={industry:string;subIndustry:string;stage:string};
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
 const p=await params;const found=getIcpSubIndustry(p.industry,p.subIndustry);
 return {title:found?`${found.sub.name}: ${p.stage==='learn'?'buyer research':'evaluating AI SEO and GEO'}`:'Resource not found',robots:{index:false,follow:false}};
}
export default async function Page({params,searchParams}:{params:Promise<Params>;searchParams:Promise<Record<string,string|string[]|undefined>>}){
 if(!isPreviewDeployment())notFound();
 const p=await params;const found=getIcpSubIndustry(p.industry,p.subIndustry);
 if(!found||!['learn','evaluate'].includes(p.stage))notFound();
 const {industry,sub}=found;const brief=SECTOR_BRIEFS[industry.id];const learn=p.stage==='learn';
 const query=await searchParams;const selected=typeof query.subniche_id==='string'?getSubNicheJourney(query.subniche_id):undefined;
 const journey=selected?.subindustryId===sub.id?selected:undefined;
 const context={industry_id:industry.id,subindustry_id:sub.id,...(journey?{niche_id:journey.nicheId,subniche_id:journey.id}:{}),stage:learn?'tofu' as const:'mofu' as const,page_id:`/resources/b2b-search/${industry.slug}/${sub.slug}/${p.stage}`};
 const commercial=journey?.path||`/industries/${industry.slug}/${sub.slug}`;
 const next=learn?appendFunnelContext(`/resources/b2b-search/${industry.slug}/${sub.slug}/evaluate`,{...context,stage:'mofu'}):commercial;
 return <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6"><article className="max-w-4xl mx-auto">
  <aside className="rounded-xl border border-[var(--border)] p-5 text-meta mb-10">Preview draft: this shared sector guide and its application coverage need editorial review before publication.</aside>
  <p className="text-meta uppercase text-[var(--accent)]">{learn?'Buyer research':'Choosing your approach'} · {sub.name}</p>
  <h1 className="text-display font-semibold mt-5 mb-8">{learn?`How ${sub.name.toLowerCase()} buyers assess expertise online.`:`Evaluate an AI SEO and GEO program for ${sub.name.toLowerCase()}.`}</h1>
  <p className="text-body leading-relaxed mb-10">{brief.problem} This guide helps your marketing and commercial teams decide what buyers need to understand, what evidence can support the answer and which next action is useful.</p>
  {journey?<p className="text-body border-l-2 border-[var(--accent)] pl-5 mb-10">Your selected application: <strong>{journey.name}</strong>, within {journey.niche}. Use the questions below to test relevance with the people who deliver this work.</p>:null}
  <section className="py-10 border-t border-[var(--border)]"><h2 className="text-h2 font-semibold mb-6">{learn?'Start with the decision, not the keyword.':'Agree the work before choosing a channel.'}</h2><p className="text-body mb-6">{brief.buyingTask} Interview the people handling enquiries and delivery. Compare the questions they hear with the information currently available on your service, application and evidence pages.</p><ol className="space-y-4 text-body">{brief.actions.map(action=><li key={action}>{action}.</li>)}</ol></section>
  <section className="py-10 border-t border-[var(--border)]"><h2 className="text-h2 font-semibold mb-6">Make the evidence usable.</h2><p className="text-body mb-6">A claim is easier to evaluate when a reader can see its source, scope and limitations. Decide which details can be made public and which belong in a qualified sales conversation.</p><ul className="space-y-4 text-body">{brief.proof.map(item=><li key={item}>{item}: identify an accountable owner and confirm it is current before publication.</li>)}</ul></section>
  <section className="py-10 border-t border-[var(--border)]"><h2 className="text-h2 font-semibold mb-6">{learn?'Investigate how buyers describe the requirement.':'Assess a useful measurement plan.'}</h2>{learn?<><p className="text-body mb-6">The following supplied planning questions describe the broader {sub.name.toLowerCase()} market. Adapt them to your supported application, region and buyer. They are research prompts, not measured demand or captured AI answers.</p><ul className="space-y-4 text-body">{sub.ai_prompts?.map(prompt=><li key={prompt}>{prompt}</li>)}</ul></>:<><p className="text-body mb-6">Keep four records separate: pages discovered in search, observed AI mentions and citations, relevant enquiries, and opportunities accepted by sales. For AI observations, retain the exact question, platform, date, market and cited sources so the next check is comparable.</p><p className="text-body">For this sector, discuss {brief.outcome}. Agree how the team will distinguish those outcomes from irrelevant requests. {brief.qualification}</p></>}</section>
  <section className="py-10 border-t border-[var(--border)]"><h2 className="text-h2 font-semibold mb-6">Choose the next useful step.</h2><p className="text-body mb-7">{learn?'Use the evaluation guide to connect these questions to a clear program of work.':'Explore the relevant service scope, or tell us which buyer and application you want to reach.'}</p><div className="flex flex-wrap gap-4"><Link className="btn-primary" href={next}>{learn?'Evaluate the approach':'Explore your service approach'}</Link><Link className="btn-outline" href={appendFunnelContext('/book',context)}>Book a call</Link><Link className="underline py-3" href={appendFunnelContext('/contact#enquiry',context)}>Send an enquiry</Link></div></section>
  <p className="text-meta text-[var(--text-muted)]">Method references: <a className="underline" href="https://developers.google.com/search/docs/appearance/ai-features">Google Search guidance for AI features</a> and <a className="underline" href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content">helpful content guidance</a>. The recommendations here are a proposed approach, not a claim of client results.</p>
 </article></main>;
}
