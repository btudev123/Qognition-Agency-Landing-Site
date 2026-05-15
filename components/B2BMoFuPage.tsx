import Link from 'next/link';
import AuditWidget from './AuditWidget';
import { B2BMoFuPage as B2BMoFuPageType } from '../types';

type Props = {
  page: B2BMoFuPageType;
};

const B2BMoFuPage = ({ page }: Props) => (
  <main className="min-h-screen px-6 pb-28 pt-32 md:px-12">
    <article className="mx-auto max-w-7xl">
      <header className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <span className="font-mono text-sm uppercase tracking-widest text-teal-400">{page.eyebrow}</span>
          <h1 className="mt-6 font-display text-5xl leading-none text-white md:text-8xl">{page.h1}</h1>
          <p className="mt-8 text-xl leading-relaxed text-gray-300">{page.summary}</p>
        </div>
        <div className="lg:col-span-5">
          <AuditWidget defaultType="seo" compact source={`${page.title} MoFu Page`} />
        </div>
      </header>

      <section className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
        {page.checklist.map((item) => (
          <div key={item} className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5">
            <p className="text-sm leading-relaxed text-gray-200">{item}</p>
          </div>
        ))}
      </section>

      <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-8">
          {page.sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-display text-3xl text-white md:text-4xl">{section.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-300">{section.content}</p>
            </section>
          ))}
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-32 rounded-2xl border border-white/10 bg-black/60 p-6">
            <h2 className="font-display text-3xl text-white">Next Pages</h2>
            <div className="mt-6 space-y-3">
              {page.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300 hover:border-teal-400/50 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="font-display text-4xl text-white">Frequently Asked Questions</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {page.faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-display text-xl text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  </main>
);

export default B2BMoFuPage;
