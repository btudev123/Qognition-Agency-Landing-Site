import Link from 'next/link';
import AuditWidget from './AuditWidget';
import { AuditOffer } from '../types';
import { CALENDLY_LINK } from '../data/siteConfig';

type Props = {
  offer: AuditOffer;
};

const AuditLandingPage = ({ offer }: Props) => (
  <main className="min-h-screen px-6 pb-28 pt-32 md:px-12">
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-7">
        <span className="font-mono text-sm uppercase tracking-widest text-teal-400">{offer.eyebrow}</span>
        <h1 className="mt-6 font-display text-5xl leading-none text-white md:text-8xl">{offer.h1}</h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-gray-300">{offer.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#audit-widget" className="rounded-full bg-teal-400 px-8 py-4 text-center font-display text-sm uppercase tracking-wider text-black hover:bg-white">
            {offer.cta}
          </a>
          <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-8 py-4 text-center font-display text-sm uppercase tracking-wider text-white hover:border-teal-400 hover:text-teal-300">
            Book Strategy Call
          </a>
        </div>
      </div>
      <div id="audit-widget" className="lg:col-span-5">
        <AuditWidget defaultType={offer.type} source={`${offer.title} Landing Page`} />
      </div>
    </section>

    <section className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-3">
      {offer.outcomes.map((outcome) => (
        <div key={outcome} className="rounded-2xl border border-teal-400/20 bg-teal-400/5 p-6">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-300">Outcome</p>
          <h2 className="mt-4 font-display text-2xl text-white">{outcome}</h2>
        </div>
      ))}
    </section>

    <section className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="space-y-10">
          {offer.sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-display text-3xl text-white md:text-4xl">{section.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-300">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
      <aside className="lg:col-span-4">
        <div className="sticky top-32 rounded-2xl border border-white/10 bg-black/60 p-6">
          <h2 className="font-display text-3xl text-white">What we check</h2>
          <div className="mt-6 space-y-3">
            {offer.checks.map((check) => (
              <p key={check} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300">
                {check}
              </p>
            ))}
          </div>
        </div>
      </aside>
    </section>

    <section className="mx-auto mt-20 max-w-7xl">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="font-display text-4xl text-white">Common Questions</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {offer.faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-display text-xl text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto mt-16 flex max-w-7xl flex-col gap-4 rounded-2xl border border-teal-400/20 bg-teal-400/5 p-8 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="font-display text-3xl text-white">Want the full growth plan?</h2>
        <p className="mt-2 text-gray-300">Run the audit first, then use the report to choose the highest-impact next step.</p>
      </div>
      <Link href="/case-studies" className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-white hover:border-teal-400 hover:text-teal-300">
        View Case Studies
      </Link>
    </section>
  </main>
);

export default AuditLandingPage;
