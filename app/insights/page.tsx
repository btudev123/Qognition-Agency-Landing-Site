import type { Metadata } from 'next';
import Link from 'next/link';
import { GROWTH_INSIGHTS } from '../../data/growth-insights';

export const metadata: Metadata = {
  title: 'B2B AI SEO & GEO Guides | Qognition',
  description: 'Guides to B2B AI SEO and GEO, with sector playbooks, measurement guidance and supporting acquisition methods.',
  alternates: { canonical: 'https://www.qognitionagency.com/insights' },
};
export default function GrowthInsightsIndex() {
  return <main className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-10">
    <p className="text-meta font-semibold uppercase tracking-widest text-teal-800">The growth library</p>
    <h1 className="mt-6 max-w-4xl text-display font-semibold tracking-tight">Understand the decision.<br />Build the right next step.</h1>
    <p className="mt-8 max-w-3xl text-body leading-relaxed text-[var(--ink-soft)]">Practical guidance for making B2B expertise easier to discover, evaluate and buy. Explore the foundations, then use a sector playbook to connect them to your market.</p>
    <nav aria-label="Insight categories" className="mt-10 flex flex-wrap gap-3">{['Foundations', 'Sector playbooks', 'Choosing your approach'].map((label, index) => <a key={label} href={`#group-${index}`} className="border border-black/20 px-5 py-3 text-meta hover:border-teal-700">{label}</a>)}</nav>
    {[
      { label: 'Foundations', description: 'Review search foundations, buyer questions and the work needed to support discovery.', items: GROWTH_INSIGHTS.filter((item) => item.stage === 'Learn') },
      { label: 'Sector playbooks', description: 'Different buyers need different evidence. Start with your sector’s evaluation questions.', items: GROWTH_INSIGHTS.filter((item) => item.kind === 'Sector playbook') },
      { label: 'Choosing your approach', description: 'Evaluate the method, measurement and delivery model before committing to a program.', items: GROWTH_INSIGHTS.filter((item) => item.stage === 'Evaluate' && item.kind !== 'Sector playbook') },
    ].map((group, index) => <section id={`group-${index}`} key={group.label} className="pt-20"><h2 className="text-h2 font-semibold">{group.label}</h2><p className="mt-5 max-w-3xl text-body text-[var(--ink-soft)]">{group.description}</p><div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{group.items.map((item) => <article key={item.slug} className="flex flex-col border border-black/10 bg-white p-7"><p className="text-meta text-teal-800">{item.kind} / {item.stage}</p><h3 className="mt-5 text-h3 font-semibold"><Link href={`/insights/${item.slug}`}>{item.title}</Link></h3><p className="my-5 text-body leading-relaxed text-[var(--ink-soft)]">{item.description}</p><Link className="mt-auto text-meta font-semibold text-teal-800 underline underline-offset-4" href={`/insights/${item.slug}`}>Read the {item.kind.toLowerCase()} <span aria-hidden="true">↗</span></Link></article>)}</div></section>)}
    <section className="mt-20 border-t border-black/15 pt-12"><h2 className="text-h2 font-semibold">Connect the reading to your business.</h2><p className="mt-5 max-w-3xl text-body">Explore the services or share the commercial problem you want to solve.</p><div className="mt-7 flex flex-wrap gap-4"><Link href="/book" className="bg-teal-800 px-6 py-4 text-body text-white">Book a call</Link><Link href="/contact#enquiry" className="border border-black/20 px-6 py-4 text-body">Send an enquiry</Link></div></section>
  </main>;
}
