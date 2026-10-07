import type { Metadata } from 'next';
import Link from 'next/link';
import { organizationSchema, breadcrumbSchema } from '../../lib/schema';
import Heading from '../../components/ui/Heading';
import LeadForm from '../../components/shared/LeadForm';
import ContactChannelLink from '../../components/shared/ContactChannelLink';
import OfficeList from '../../components/shared/OfficeList';
import { CONTACT_EMAIL, PHONE_DISPLAY } from '../../data/siteConfig';
import { appendFunnelContext, readFunnelContext } from '../../lib/funnelContext';
import { resolveLeadLocale } from '../../lib/leadCopy';

export const metadata: Metadata = {
  title: 'Contact | AI SEO & GEO for B2B',
  description: 'Discuss AI SEO and GEO for your B2B business. Send an enquiry about your buyers, markets and search priorities, or book a call.',
  alternates: { canonical: '/contact' },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const values = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) if (typeof value === 'string') values.set(key, value);
  const incoming = readFunnelContext(values);
  const context = incoming ? { ...incoming, locale: resolveLeadLocale(incoming.locale) } : undefined;
  // Same shape as Navigation and Footer: carry the visitor's context, or at least where they came from.
  const bookHref = appendFunnelContext('/book', context ?? { page_id: '/contact' });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema(),
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-20">
        {/* One form, one link to the calendar. Operator, 2026-10-07: "make just
            one form or a booking call widget, that's it". The calendar lives on
            /book only; this page no longer has a #book anchor. */}
        <div className="max-w-3xl">
          <Heading level="h1" className="mb-6">
            Send us an enquiry
          </Heading>
          <p className="text-body text-[var(--text-muted)] mb-4">
            Tell us what you sell, who buys it, and what you want from AI search, SEO or PPC. A person on our team reads every enquiry and replies by email.
          </p>
          <p className="text-body">
            <Link href={bookHref} className="underline underline-offset-4 hover:text-[var(--accent-deep)]">Prefer to talk? Book a call</Link>
          </p>

          <section id="enquiry" aria-labelledby="contact-enquiry-heading" className="scroll-mt-28 mt-10 border border-[var(--border-strong)] bg-[var(--card-bg)] p-6 md:p-10">
            <Heading level="h2" id="contact-enquiry-heading" className="mb-8">Your enquiry</Heading>
            <LeadForm
              spoke="marketing"
              intent="contact"
              sourcePage="/contact"
              ctaLabel="Send enquiry"
              qualifyingQuestion="What do you want to change, and who are the buyers you want to reach?"
              context={context}
            />
          </section>

          <section aria-labelledby="contact-direct-heading" className="mt-10">
            <h2 id="contact-direct-heading" className="text-h4 font-semibold text-[var(--text)] mb-4">Other ways to reach us</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4">
              <div className="min-w-0">
                <dt className="text-meta font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">Email</dt>
                <dd className="text-body m-0">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="break-words underline underline-offset-4 hover:text-[var(--accent-deep)]">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-meta font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">Phone</dt>
                <dd className="text-body m-0">
                  <ContactChannelLink channel="phone" location="contact_page" aria-label={`Call ${PHONE_DISPLAY}`} className="underline underline-offset-4 hover:text-[var(--accent-deep)]">
                    {PHONE_DISPLAY}
                  </ContactChannelLink>
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-meta font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">WhatsApp</dt>
                <dd className="text-body m-0">
                  <ContactChannelLink channel="whatsapp" location="contact_page" className="underline underline-offset-4 hover:text-[var(--accent-deep)]">
                    Open WhatsApp <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
                  </ContactChannelLink>
                </dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="contact-offices-heading" className="mt-10">
            <h2 id="contact-offices-heading" className="text-h4 font-semibold text-[var(--text)] mb-4">Our offices</h2>
            <OfficeList labelledBy="contact-offices-heading" className="grid-cols-1 sm:grid-cols-3" />
            <p className="text-body text-[var(--text-muted)] mt-4 mb-0">We serve every other market remotely.</p>
          </section>
        </div>
      </main>
    </>
  );
}
