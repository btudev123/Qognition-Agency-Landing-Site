import Link from 'next/link';
import { GROWTH_DICTIONARIES, GROWTH_LOCALES, LOCALIZED_PILLARS, type GrowthLocale, type LocalizedPillar } from '../data/growth-locales';
import { canPublishLocale, localizedHomePath, localizedServicePath } from '../lib/growth-locales';
import LeadForm from './shared/LeadForm';
import GrowthLocaleDocument from './GrowthLocaleDocument';
import AIPlatforms from './shared/AIPlatforms';

export default function GrowthLocalizedPage({ locale, pillar }: { locale: GrowthLocale; pillar?: LocalizedPillar }) {
  const copy = GROWTH_DICTIONARIES[locale];
  const service = pillar ? copy.pillars[pillar] : undefined;
  const path = pillar ? localizedServicePath(locale, pillar) : localizedHomePath(locale);
  const home = localizedHomePath(locale);
  const section = 'mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24';
  const schema = { '@context': 'https://schema.org', '@type': service ? 'Service' : 'WebPage', name: service?.name || copy.eyebrow, description: service?.description || copy.meta, url: `https://www.qognitionagency.com${path}`, inLanguage: locale, ...(service ? { provider: { '@type': 'Organization', '@id': 'https://www.qognitionagency.com/#organization', name: 'Qognition Agency', url: 'https://www.qognitionagency.com' } } : {}) };
  return <div lang={locale} dir={copy.dir} className="bg-[var(--bg)] text-[var(--ink)]">
    <GrowthLocaleDocument locale={locale} dir={copy.dir} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <header className="border-b border-black/10 bg-[var(--bg)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-6 md:px-10">
        <Link href={home} className="text-h3 font-semibold tracking-tight" dir="ltr" aria-label="Qognition">qognition<span className="text-teal-700">.</span></Link>
        <nav aria-label={copy.nav.services} className="flex flex-wrap gap-x-5 gap-y-3 text-meta">
          <Link href={`${home}#services`} className="hover:text-teal-800">{copy.nav.services}</Link><Link href={`${home}#industries`} className="hover:text-teal-800">{copy.nav.industries}</Link><Link href={`${home}#process`} className="hover:text-teal-800">{copy.nav.process}</Link><a href="#contact" className="font-semibold text-teal-800">{copy.nav.contact}</a>
        </nav>
        <details className="relative text-meta"><summary className="cursor-pointer">{copy.language || copy.nav.language}</summary><nav aria-label={copy.nav.language} className="absolute end-0 top-8 z-50 grid min-w-48 border border-black/15 bg-white p-4 shadow-lg">{GROWTH_LOCALES.filter((item) => canPublishLocale(item, pillar)).map((item) => <a key={item} lang={item} hrefLang={item} href={pillar ? localizedServicePath(item, pillar) : localizedHomePath(item)} aria-current={item === locale ? 'page' : undefined} className="px-2 py-2 hover:bg-teal-50">{GROWTH_DICTIONARIES[item].language}</a>)}</nav></details>
      </div>
    </header>
    <main>
      <section className={`${section} relative overflow-hidden`}>
        <p className="mb-6 text-meta font-semibold uppercase tracking-widest text-teal-800">{service?.name || copy.eyebrow}</p>
        <h1 className="max-w-5xl text-display font-semibold tracking-tight">{service?.headline || copy.headline}</h1>
        <p className="mt-8 max-w-3xl text-body leading-relaxed text-[var(--ink-soft)]">{service?.description || copy.intro}</p>
        <div className="mt-9 flex flex-wrap gap-4"><a href="#contact" className="bg-teal-800 px-6 py-4 text-body font-semibold text-white hover:bg-teal-950">{copy.cta}</a><a href="#services" className="border border-black/20 px-6 py-4 text-body hover:border-teal-800">{copy.secondaryCta}</a></div>
        {(!pillar || pillar === 'ai-search') && <div className="mt-12"><AIPlatforms compact locale={locale} /></div>}
      </section>
      {service && <section className="border-y border-black/10 bg-white"><div className={`${section} grid gap-12 md:grid-cols-2`}><div><h2 className="text-h2 font-semibold">{copy.deliverablesTitle}</h2><ul className="mt-7 space-y-4">{service.deliverables.map((item) => <li key={item} className="flex gap-3 text-body"><span aria-hidden="true" className="text-teal-700">↗</span><span>{item}</span></li>)}</ul></div><div className="border-s-2 border-teal-700 ps-7"><h2 className="text-h2 font-semibold">{copy.outcomeTitle}</h2><p className="mt-7 text-body leading-relaxed">{service.outcome}</p></div></div></section>}
      <section id="services" className={section}><h2 className="max-w-3xl text-h2 font-semibold">{copy.servicesTitle}</h2><p className="mt-5 max-w-3xl text-body text-[var(--ink-soft)]">{copy.servicesIntro}</p><div className="mt-10 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2">{LOCALIZED_PILLARS.map((id, index) => <article key={id} className="flex flex-col bg-white p-7 md:p-9"><span className="text-meta text-teal-800">0{index + 1}</span><h3 className="mt-5 text-h3 font-semibold"><Link href={localizedServicePath(locale, id)}>{copy.pillars[id].name}</Link></h3><p className="my-5 text-body leading-relaxed text-[var(--ink-soft)]">{copy.pillars[id].description}</p><Link className="mt-auto text-meta font-semibold text-teal-800 underline underline-offset-4" href={localizedServicePath(locale, id)}>{copy.pillars[id].name} <span aria-hidden="true">↗</span></Link></article>)}</div></section>
      <section id="industries" className="bg-[#122d2b] text-white"><div className={section}><h2 className="text-h2 font-semibold">{copy.industriesTitle}</h2><p className="mt-6 max-w-3xl text-body leading-relaxed text-white/80">{copy.industriesIntro}</p><ul className="mt-10 grid gap-x-10 sm:grid-cols-2">{copy.industries.map((name) => <li key={name} className="border-b border-white/20 py-5 text-body">{name}</li>)}</ul></div></section>
      <section id="process" className={section}><h2 className="max-w-3xl text-h2 font-semibold">{copy.processTitle}</h2><div className="mt-12 grid gap-9 md:grid-cols-3">{copy.steps.map((step, index) => <div key={step.title} className="border-t-2 border-teal-700 pt-6"><span className="text-meta text-teal-800">0{index + 1}</span><h3 className="mt-4 text-h3 font-semibold">{step.title}</h3><p className="mt-5 text-body leading-relaxed text-[var(--ink-soft)]">{step.text}</p></div>)}</div><div className="mt-12 border border-black/10 bg-white p-7"><h3 className="text-h3 font-semibold">{copy.scopeTitle}</h3><p className="mt-4 max-w-4xl text-body leading-relaxed">{copy.scopeText}</p></div></section>
      <section className="border-y border-black/10 bg-white"><div className={section}><h2 className="text-h2 font-semibold">{copy.faqTitle}</h2><div className="mt-8">{copy.faqs.map((faq) => <details key={faq.question} className="border-b border-black/10 py-5"><summary className="cursor-pointer text-body font-semibold">{faq.question}</summary><p className="mt-4 max-w-4xl text-body leading-relaxed text-[var(--ink-soft)]">{faq.answer}</p></details>)}</div></div></section>
      <section id="contact" className={`${section} grid gap-12 lg:grid-cols-2`}><div><h2 className="text-h2 font-semibold">{copy.contactTitle}</h2><p className="mt-6 text-body leading-relaxed text-[var(--ink-soft)]">{copy.contactIntro}</p><a href="mailto:hello@qognitionagency.com" dir="ltr" className="mt-8 inline-block text-body text-teal-800 underline underline-offset-4">hello@qognitionagency.com</a></div><LeadForm spoke="marketing" intent="contact" sourcePage={path} locale={locale} ctaLabel={copy.cta} qualifyingQuestion={copy.form.message} /></section>
    </main>
    <footer className="border-t border-black/15 px-6 py-10"><div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-5 text-meta"><p>{copy.footer}</p><Link href="/insights" hrefLang="en" className="underline underline-offset-4">{copy.nav.insights} ({copy.english})</Link><p dir="ltr">© {new Date().getFullYear()} Qognition Agency</p></div></footer>
  </div>;
}
