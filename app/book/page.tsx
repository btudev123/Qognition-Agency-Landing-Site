import type { Metadata } from 'next';
import { breadcrumbSchema } from '../../lib/schema';
import Heading from '../../components/ui/Heading';
import CalBooking from '../../components/shared/CalBooking';

export const metadata: Metadata = {
  title: 'Book a call',
  description: 'Discuss your buyers, priorities and growth opportunities with Qognition. Agree the right next step for your B2B growth program.',
  alternates: { canonical: '/book' },
};

/* One heading, one line, the calendar. Operator, 2026-10-07: "make just one
   form or a booking call widget, that's it". The option cards that used to sit
   here are gone on purpose; do not add a second path back to this page. The
   enquiry form lives on /contact. */
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Book a Call', path: '/book' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* 15 minutes is the Cal.com event the operator chose on 2026-10-14
              (CAL_LINK, qognition-agency/15min). If the event changes, change this. */}
          <Heading level="h1" className="mb-3">Book a 15-minute call</Heading>
          <p className="text-body text-[var(--text-muted)] mb-8">We&apos;ll cover who you sell to, what we&apos;d check first in Google and AI search, and whether we&apos;re a fit. Bring your website.</p>
          <div
            className="overflow-hidden"
            style={{ background: 'var(--s-surface-1)', border: '1px solid var(--s-rule)' }}
          >
            <CalBooking />
          </div>
        </div>
      </main>
    </>
  );
}
