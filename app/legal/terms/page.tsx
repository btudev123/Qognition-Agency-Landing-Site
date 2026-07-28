import type { Metadata } from 'next';
import { breadcrumbSchema } from '../../../lib/schema';
import Heading from '../../../components/ui/Heading';

export const metadata: Metadata = {
  title: 'Terms of Service | Qognition',
  description: 'Qognition terms of service — conditions governing the use of our website and services.',
  alternates: { canonical: '/legal/terms' },
  robots: { index: false },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Terms of Service', path: '/legal/terms' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Heading level="h1" className="mb-8">Terms of Service</Heading>
          <p className="text-body text-[var(--text-muted)] mb-12">Last updated: May 2026</p>

          <div className="space-y-8 text-body text-[var(--text-muted)]">
            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">1. Acceptance of Terms</h2>
              <p>By accessing or using the Qognition website (qognition.com) and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">2. Services</h2>
              <p>Qognition provides AI-native growth marketing, technology, finance, and automation services. The scope, deliverables, timeline, and pricing for each engagement are defined in a separate Statement of Work (SOW) or service agreement signed by both parties.</p>
              <p className="text-body mt-4">Free audits and tools provided on our website are for informational purposes and do not constitute a professional engagement or guarantee specific results.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">3. Intellectual Property</h2>
              <p>All content on this website — including text, graphics, logos, icons, images, and software — is the property of Qognition or its content suppliers and is protected by international copyright laws.</p>
              <p className="text-body mt-4">Upon full payment for services, clients own the deliverables specified in their SOW. Qognition retains ownership of pre-existing tools, frameworks, methodologies, and reusable components used in delivery.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">4. Payment Terms</h2>
              <p>Payment terms are defined in each SOW. Standard terms are net-15 for invoiced amounts. Late payments may incur interest at 1.5% per month or the maximum rate permitted by law.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">5. Limitation of Liability</h2>
              <p>Qognition shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability for any claim arising from an engagement is limited to the fees paid by you for the specific service giving rise to the claim.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">6. Confidentiality</h2>
              <p>Both parties agree to maintain the confidentiality of proprietary information shared during the course of an engagement. This obligation survives termination of the agreement for a period of two years.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">7. Termination</h2>
              <p>Either party may terminate a retainer engagement with 30 days written notice. Project engagements may be terminated according to the terms specified in the SOW. Upon termination, the client shall pay for all work completed through the termination date.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">8. Governing Law</h2>
              <p>These terms are governed by the laws of the United Kingdom. Any disputes shall be resolved through binding arbitration in London, UK, before resorting to litigation.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">9. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. Continued use of our website or services after changes constitutes acceptance of the modified terms.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">10. Contact</h2>
              <p>For questions about these terms, contact us at:</p>
              <p className="text-body mt-2">
                Email: <a href="mailto:hello@qognitionagency.com" className="text-[var(--accent)] hover:underline">hello@qognitionagency.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
