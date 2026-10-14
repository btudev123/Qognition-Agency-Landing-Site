import type { Metadata } from 'next';
import { breadcrumbSchema } from '../../../lib/schema';
import Heading from '../../../components/ui/Heading';

export const metadata: Metadata = {
  title: 'Privacy Policy | Qognition',
  description: 'Qognition privacy policy: how we collect, use, and protect your data.',
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
          {/* Date moved 2026-10-14 because the processor list changed (the CRM out,
              Cal.com in). [NEEDS DATA: counsel. Confirm the date convention, and whether
              changing processors needs notice to existing contacts.] */}
          <p className="text-body text-[var(--text-muted)] mb-12">Last updated: October 14, 2026</p>

          <div className="space-y-8 text-body text-[var(--text-muted)]">
            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">1. Information We Collect</h2>
              <p>When you use our website or services, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong className="text-[var(--text)]">Contact information</strong>: name, work email address, company website, your message and company size when you submit a form or request an audit.</li>
                <li><strong className="text-[var(--text)]">Usage data</strong>: pages visited, referral and campaign context, and interactions with our site, subject to your optional analytics and advertising choices.</li>
                <li><strong className="text-[var(--text)]">Communication data</strong>: messages, emails, and calendar bookings when you contact us.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">2. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Respond to your inquiries and deliver requested audits or services.</li>
                <li>Improve our website, content, and service offerings based on usage patterns.</li>
                <li>Measure our advertising, when advertising measurement is on (see section 4).</li>
                <li>Send optional educational or promotional follow-ups when you choose to receive them; you can opt out at any time.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">3. Data Sharing</h2>
              <p>We do not sell, rent, or trade your personal information. We may share data with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong className="text-[var(--text)]">Service providers</strong>: providers used to operate the website and respond to enquiries, including Vercel for hosting, Cal.com for call scheduling, and Resend for email delivery. Optional analytics and advertising providers receive data according to your preferences.</li>
                <li><strong className="text-[var(--text)]">Legal requirements</strong>: when required by law or to protect our rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">4. Cookies</h2>
              <p>Use “Privacy choices” on this website to accept, reject or change optional analytics and advertising measurement. In the United States, Canada, Australia, the United Arab Emirates and Singapore, both are on by default and you can turn them off. In every other region, or where we cannot tell your region, both stay off until you accept them. If your browser sends a Global Privacy Control signal, advertising measurement stays off unless you turn it on. Essential form and security features remain available without optional tracking. Analytics may use Google Analytics and Microsoft Clarity. Advertising measurement may use Google Tag Manager, Meta Pixel and configured business-visitor measurement tools. When advertising measurement is on and you submit an enquiry, our server sends Meta the event, hashed copies of your email address, name and phone number (if you gave one), your IP address and browser user agent, and Meta’s own browser cookie identifiers. Hashing does not make these identifiers anonymous: Meta may match them to an account. Our browser and server measurement both respect the advertising choice. Browser settings and the provider’s own controls offer additional options.</p>
              {/* Lead and booking stack, operator 2026-10-14: no CRM. /api/lead sends each
                  enquiry to our team by email through Resend; Cal.com handles bookings.
                  [NEEDS DATA: counsel. Name the mailbox provider that hosts hello@ if it
                  must be listed, confirm Cal.com and Resend transfer terms (DPA, SCCs) for
                  EEA, UK and Swiss visitors, and confirm retention once leads live in email
                  rather than a CRM. Section 5's 24 months is unchanged.] */}
              <p className="text-body mt-4">Contact requests and their context are sent to our team by email, through Resend, to support follow-up and qualification. Calls booked through our Cal.com calendar are processed by Cal.com. The calendar loads on this website only when advertising measurement is on; otherwise the booking link opens it on cal.com. These service providers may process data outside your country. Contact us for information about the providers and arrangements relevant to your enquiry.</p>
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
