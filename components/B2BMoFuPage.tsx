import Link from 'next/link';
import LeadForm from './shared/LeadForm';
import Heading from './ui/Heading';
import { B2BMoFuPage as B2BMoFuPageType } from '../types';

type Props = {
  page: B2BMoFuPageType;
};

const B2BMoFuPage = ({ page }: Props) => {
  const path = `/${page.slug}`;

  return (
    <main className="min-h-screen px-6 pb-28 pt-32 md:px-12">
      <article className="mx-auto max-w-7xl">
        <header className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="font-mono text-sm uppercase tracking-widest text-[var(--accent)]">{page.eyebrow}</span>
            <Heading level="h1" className="mt-6 !text-5xl md:!text-8xl !leading-none">
              {page.h1}
            </Heading>
            <p className="text-body mt-8 text-[var(--text-muted)]">{page.summary}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
              <Heading level="h3" className="mb-4">
                Get Your Free SEO Audit
              </Heading>
              <LeadForm
                spoke="marketing"
                intent="audit"
                sourcePage={path}
                ctaLabel="Run Free Audit"
              />
            </div>
          </div>
        </header>

        <section className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {page.checklist.map((item) => (
            <div key={item} className="rounded-xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-5">
              <p className="text-body text-[var(--text)]">{item}</p>
            </div>
          ))}
        </section>

        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            {page.sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
                <Heading level="h2">{section.title}</Heading>
                <p className="text-body mt-5 text-[var(--text-muted)]">{section.content}</p>
              </section>
            ))}
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-32 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <Heading level="h2">Next Pages</Heading>
              <div className="mt-6 space-y-3">
                {page.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-sm text-[var(--text-muted)] hover:border-[var(--accent)]/50 hover:text-[var(--text)] transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-20 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
          <Heading level="h2" className="mb-8">
            Frequently Asked Questions
          </Heading>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {page.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-h3 text-[var(--text)] font-semibold">{faq.question}</h3>
                <p className="text-body mt-3 text-[var(--text-muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
};

export default B2BMoFuPage;
