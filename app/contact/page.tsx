import type { Metadata } from 'next';
import Link from 'next/link';
import { organizationSchema, breadcrumbSchema } from '../../lib/schema';
import Heading from '../../components/ui/Heading';
import LeadForm from '../../components/shared/LeadForm';
import CalendlyEmbed from '../../components/shared/CalendlyEmbed';
import { WHATSAPP_LINK, WHATSAPP_DISPLAY } from '../../data/siteConfig';

export const metadata: Metadata = {
  title: 'Contact Qognition | Book a Strategy Call',
  description: 'Ready to scale your business? Book a free strategy call with our growth team or send us a message.',
  alternates: { canonical: '/contact' },
};

export default function Page() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div>
            <Heading level="h1" className="!text-5xl md:!text-7xl mb-8">
              Let&apos;s build something <span className="text-[var(--accent)]">extraordinary</span>.
            </Heading>
            <p className="text-xl text-[var(--text-muted)] mb-12 leading-relaxed">
              We&apos;re excited to learn about your project and explore how we can help you achieve your digital marketing goals.
            </p>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-[var(--text)] font-bold mb-2">New Business Inquiries</h3>
                <p className="text-[var(--text-muted)] mb-2">Ready to start your project? Send us a message.</p>
                <a href="mailto:hello@qognitionagency.com" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-lg">
                  hello@qognitionagency.com
                </a>
              </div>
              <div>
                <h3 className="text-[var(--text)] font-bold mb-2">WhatsApp</h3>
                <p className="text-[var(--text-muted)] mb-2">Chat with us instantly</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-lg">
                  {WHATSAPP_DISPLAY}
                </a>
              </div>
              <div>
                <h3 className="text-[var(--text)] font-bold mb-2">General Inquiries</h3>
                <p className="text-[var(--text-muted)] mb-2">Questions about our services? We&apos;re happy to help.</p>
                <a href="mailto:hello@qognitionagency.com" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-lg">
                  hello@qognitionagency.com
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Link href="/regions" className="p-6 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all">
                <h4 className="font-bold text-[var(--text)] mb-2">Global Presence</h4>
                <p className="text-[var(--text-muted)] text-sm">Offices in London, New York, Dubai, and Mumbai</p>
                <span className="text-[var(--accent)] text-sm mt-2 inline-block">View all locations &rarr;</span>
              </Link>
              <Link href="/industries" className="p-6 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all">
                <h4 className="font-bold text-[var(--text)] mb-2">Industries We Serve</h4>
                <p className="text-[var(--text-muted)] text-sm">Technology, Healthcare, Finance, E-commerce & more</p>
                <span className="text-[var(--accent)] text-sm mt-2 inline-block">View industries &rarr;</span>
              </Link>
            </div>

            <div className="p-8 rounded-xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)]">
              <Heading level="h3" className="mb-4">Skip the email?</Heading>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                Book a 30-minute strategy call directly. Pick a time that works for you — no back-and-forth.
              </p>
              <CalendlyEmbed url="https://cal.com/qognition-agency/15min" />
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8 md:p-12">
            <Heading level="h2" className="mb-8">Send a Message</Heading>
            <LeadForm
              spoke="marketing"
              intent="contact"
              sourcePage="/contact"
              ctaLabel="Send Inquiry"
            />
          </div>
        </div>
      </main>
    </>
  );
}
