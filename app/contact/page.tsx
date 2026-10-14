import type { Metadata } from 'next';
import { organizationSchema, breadcrumbSchema } from '../../lib/schema';
import Heading from '../../components/ui/Heading';
import LeadForm from '../../components/shared/LeadForm';
import OfficeList from '../../components/shared/OfficeList';
import { contactFormProps } from '../../lib/contactForm';

export const metadata: Metadata = {
  title: 'Contact | AI SEO & GEO for B2B',
  description: 'Discuss AI SEO and GEO for your B2B business. Send an enquiry about your buyers, markets and search priorities, or book a call.',
  alternates: { canonical: '/contact' },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  // Query string to form props in one place (lib/contactForm.ts), shared with the gate.
  const { audit, intent, locale, context } = contactFormProps(await searchParams);
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
        {/* The form, then the office list. Operator, 2026-10-14: "Just one single page
            with a form that submits leads, and one book call, that's it." No /book link
            and no email, phone or WhatsApp block here. The offices stay as information,
            not a second conversion (operator exception, 2026-10-08). */}
        <div className="max-w-3xl">
          <Heading level="h1" className="mb-6">
            Send us an enquiry
          </Heading>
          <p className="text-body text-[var(--text-muted)] mb-0">
            {audit
              ? 'Tell us your website and the buyers you want to reach. There is no charge, and we confirm timing when we reply.'
              : 'Tell us what you sell and who buys it. A person on our team reads every enquiry and replies by email.'}
          </p>

          <section id="enquiry" aria-labelledby="contact-enquiry-heading" className="scroll-mt-28 mt-10 border border-[var(--border-strong)] bg-[var(--card-bg)] p-6 md:p-10">
            <Heading level="h2" id="contact-enquiry-heading" className="mb-8">{audit ? 'Your audit request' : 'Your enquiry'}</Heading>
            <LeadForm
              spoke="marketing"
              intent={intent}
              sourcePage="/contact"
              locale={locale}
              context={context}
            />
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
