import type { Metadata } from 'next';
import { breadcrumbSchema } from '../../../lib/schema';
import Heading from '../../../components/ui/Heading';

export const metadata: Metadata = {
  title: 'Privacy Policy | Qognition',
  description: 'Qognition privacy policy — how we collect, use, and protect your data.',
  alternates: { canonical: '/legal/privacy' },
  robots: { index: false },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/legal/privacy' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Heading level="h1" className="mb-8">Privacy Policy</Heading>
          <p className="text-body text-[var(--text-muted)] mb-12">Last updated: May 2026</p>

          <div className="space-y-8 text-body text-[var(--text-muted)]">
            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">1. Information We Collect</h2>
              <p>When you use our website or services, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong className="text-[var(--text)]">Contact information</strong> — name, email address, company name, and website URL when you submit a form or request an audit.</li>
                <li><strong className="text-[var(--text)]">Usage data</strong> — pages visited, time on site, referral source, and interactions with our site via standard analytics tools.</li>
                <li><strong className="text-[var(--text)]">Communication data</strong> — messages, emails, and calendar bookings when you contact us.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">2. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Respond to your inquiries and deliver requested audits or services.</li>
                <li>Improve our website, content, and service offerings based on usage patterns.</li>
                <li>Send relevant follow-up communications about our services (you can opt out at any time).</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">3. Data Sharing</h2>
              <p>We do not sell, rent, or trade your personal information. We may share data with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong className="text-[var(--text)]">Service providers</strong> — trusted third parties that help us operate our business (email delivery, analytics, CRM) under strict data processing agreements.</li>
                <li><strong className="text-[var(--text)]">Legal requirements</strong> — when required by law or to protect our rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">4. Cookies</h2>
              <p>We use cookies for essential functionality, analytics (Google Analytics, Google Tag Manager, Microsoft Clarity), and advertising measurement (Meta Pixel). The Meta Pixel sets first-party cookies that let us measure which campaigns lead to enquiries. When you submit a form, we also send a hashed, irreversible version of your email address to Meta&apos;s Conversions API to attribute that conversion — we never share your email in readable form. You can control cookie preferences through your browser settings, and opt out of Meta advertising through your Meta ad preferences.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">5. Data Retention</h2>
              <p>We retain your personal information only as long as necessary to fulfill the purposes described in this policy, or as required by law. Lead form submissions are retained for the duration of the business relationship plus 24 months.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">6. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction or deletion of your data.</li>
                <li>Object to or restrict processing of your data.</li>
                <li>Data portability.</li>
                <li>Withdraw consent at any time.</li>
              </ul>
              <p className="text-body mt-4">To exercise these rights, contact us at <a href="mailto:hello@qognitionagency.com" className="text-[var(--accent)] hover:underline">hello@qognitionagency.com</a>.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">7. Security</h2>
              <p>We implement reasonable technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">8. Contact</h2>
              <p>For questions about this privacy policy or to exercise your data rights:</p>
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
