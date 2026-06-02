import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LeadForm from './shared/LeadForm';
import Heading from './ui/Heading';
import { AuditOffer } from '../types';

type Props = {
  offer: AuditOffer;
};

const AuditLandingPage = ({ offer }: Props) => {
  const path = `/${offer.slug}`;

  return (
    <main className="min-h-screen px-6 pb-28 pt-32 md:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-mono text-sm uppercase tracking-widest text-[var(--accent)]">{offer.eyebrow}</span>
          <Heading level="h1" className="mt-6 !text-5xl md:!text-8xl !leading-none">
            {offer.h1}
          </Heading>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-[var(--text-muted)]">{offer.description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#audit-form"
              className="rounded-lg bg-[var(--accent)] px-8 py-4 text-center text-sm font-medium uppercase tracking-wider text-[var(--accent-deep)] hover:brightness-110 transition-all"
            >
              {offer.cta}
            </a>
            <a
              href="https://calendly.com/hello-qognitionagency/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[var(--border)] px-8 py-4 text-center text-sm uppercase tracking-wider text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              Book Strategy Call
            </a>
          </div>
        </div>
        <div id="audit-form" className="mx-auto mt-12 w-full max-w-4xl scroll-mt-28">
          <LeadForm
            spoke="marketing"
            intent="audit"
            sourcePage={path}
            ctaLabel={offer.cta}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8"
          />
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-3">
        {offer.outcomes.map((outcome) => (
          <div key={outcome} className="rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--accent)]">Outcome</p>
            <Heading level="h2" className="mt-4">
              {outcome}
            </Heading>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="space-y-10">
            {offer.sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
                <Heading level="h2">{section.title}</Heading>
                <p className="mt-5 text-lg leading-relaxed text-[var(--text-muted)]">{section.content}</p>
              </section>
            ))}
          </div>
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-32 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <Heading level="h2">What we check</Heading>
            <div className="mt-6 space-y-3">
              {offer.checks.map((check) => (
                <p
                  key={check}
                  className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-sm text-[var(--text-muted)]"
                >
                  {check}
                </p>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto mt-20 max-w-7xl">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
          <Heading level="h2" className="mb-8">
            Common Questions
          </Heading>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {offer.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-xl font-semibold text-[var(--text)]">{faq.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 flex max-w-7xl flex-col gap-4 rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Heading level="h2">Want the full growth plan?</Heading>
          <p className="mt-2 text-[var(--text-muted)]">
            Run the audit first, then use the report to choose the highest-impact next step.
          </p>
        </div>
        <Link
          href="/case-studies"
          className="rounded-lg border border-[var(--border)] px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
        >
          View Case Studies <ArrowRight size={16} className="inline ml-1" />
        </Link>
      </section>
    </main>
  );
};

export default AuditLandingPage;
