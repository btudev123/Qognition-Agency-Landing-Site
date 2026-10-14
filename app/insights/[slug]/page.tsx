import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GROWTH_INSIGHTS, getGrowthInsight } from '../../../data/growth-insights';
import EnquiryLinks from '../../../components/shared/EnquiryLinks';

type Props = { params: Promise<{ slug: string }> };
const ORIGIN = 'https://www.qognitionagency.com';
export const dynamicParams = false;
export function generateStaticParams() { return GROWTH_INSIGHTS.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const insight = getGrowthInsight(slug); if (!insight) return {};
  return { title: `${insight.title} | Qognition`, description: insight.description, alternates: { canonical: `${ORIGIN}/insights/${slug}` }, openGraph: { type: 'article', title: insight.title, description: insight.description, url: `${ORIGIN}/insights/${slug}`, publishedTime: insight.publishedAt, modifiedTime: insight.updatedAt, authors: ['Qognition'] } };
}
export default async function GrowthInsightPage({ params }: Props) {
  const { slug } = await params; const insight = getGrowthInsight(slug); if (!insight) notFound();
  const related = insight.related.map(getGrowthInsight).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: insight.title, description: insight.description, inLanguage: 'en', datePublished: insight.publishedAt, dateModified: insight.updatedAt, author: { '@type': 'Organization', name: 'Qognition Agency', url: `${ORIGIN}/about` }, publisher: { '@type': 'Organization', '@id': `${ORIGIN}/#organization`, name: 'Qognition Agency', url: ORIGIN }, mainEntityOfPage: `${ORIGIN}/insights/${slug}` },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN }, { '@type': 'ListItem', position: 2, name: 'Insights', item: `${ORIGIN}/insights` }, { '@type': 'ListItem', position: 3, name: insight.title, item: `${ORIGIN}/insights/${slug}` }] },
  ] };
  return <main className="px-6 pb-24 pt-32 md:px-10">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <article className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-meta text-[var(--text-muted)]"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/insights">Insights</Link><span aria-hidden="true">/</span><span>{insight.kind}</span></nav>
      <header className="pb-14 pt-10"><p className="text-meta font-semibold uppercase tracking-widest text-teal-800">{insight.kind} / {insight.stage}</p><h1 className="mt-6 max-w-5xl text-h1 font-semibold tracking-tight">{insight.title}</h1><p className="mt-7 max-w-4xl text-body leading-relaxed text-[var(--ink-soft)]">{insight.intro}</p><p className="mt-7 text-meta text-[var(--text-muted)]">By {insight.author} · Published <time dateTime={insight.publishedAt}>24 September 2026</time></p></header>
      <div className="grid items-start gap-12 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-28"><nav aria-label="On this page" className="border-t-2 border-teal-800 pt-5"><p className="text-meta font-semibold">On this page</p><ol className="mt-5 space-y-4">{insight.sections.map((section, index) => <li key={section.heading} className="text-meta leading-relaxed"><a href={`#section-${index + 1}`} className="hover:text-teal-800">{section.heading}</a></li>)}</ol></nav><div className="mt-8 border border-black/10 bg-white p-5"><p className="text-meta font-semibold">Put it into practice</p><Link href={`/growth/services/${insight.pillar}`} className="mt-4 block text-meta text-teal-800 underline underline-offset-4">Explore the service ↗</Link></div></aside>
        <div className="min-w-0"><div className="mb-12 border-s-2 border-teal-800 bg-teal-50/60 p-7"><h2 className="text-h3 font-semibold">The useful starting points</h2><ul className="mt-5 space-y-3">{insight.takeaways.map((item) => <li key={item} className="flex gap-3 text-body"><span aria-hidden="true" className="text-teal-800">↗</span><span>{item}</span></li>)}</ul></div>
          {insight.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading} className="mb-14 scroll-mt-28"><h2 className="text-h2 font-semibold">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-body leading-relaxed text-[var(--ink-soft)]">{paragraph}</p>)}{section.bullets && <ul className="mt-6 list-disc space-y-3 ps-6 text-body leading-relaxed">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{section.example && <div className="mt-7 border border-black/10 bg-white p-6"><p className="text-body leading-relaxed">{section.example}</p></div>}</section>)}
          {insight.sources.length > 0 && <section className="border-t border-black/15 pt-8"><h2 className="text-h3 font-semibold">Primary sources</h2><p className="mt-4 text-meta text-[var(--text-muted)]">Sources consulted for the platform guidance in this article. Operational recommendations are Qognition’s own framework.</p><ul className="mt-5 space-y-3">{insight.sources.map((source) => <li key={source.url}><a href={source.url} className="text-body text-teal-800 underline underline-offset-4" rel="noreferrer">{source.label}</a></li>)}</ul></section>}
        </div>
      </div>
    </article>
    <section className="mx-auto mt-20 max-w-6xl border-t border-black/15 pt-14"><h2 className="text-h2 font-semibold">Read next.</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{related.map((item) => <Link key={item.slug} href={`/insights/${item.slug}`} className="border border-black/10 bg-white p-6 hover:border-teal-700"><p className="text-meta text-teal-800">{item.kind}</p><h3 className="mt-4 text-h3 font-semibold">{item.title}</h3></Link>)}</div></section>
    <section id="discuss" className="mx-auto mt-20 grid max-w-6xl gap-12 border-t border-black/15 pt-14 lg:grid-cols-2"><div><p className="text-meta uppercase tracking-widest text-teal-800">Your next step</p><h2 className="mt-5 text-h2 font-semibold">Want this checked for your firm?</h2><p className="mt-6 text-body leading-relaxed text-[var(--ink-soft)]">Tell us what you sell and who buys it. We will tell you which buyer questions we would test first, and why.</p></div><EnquiryLinks className="self-end" context={{ stage: insight.stage === 'Learn' ? 'tofu' : 'mofu', page_id: `/insights/${slug}` }} /></section>
  </main>;
}
