import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { breadcrumbSchema } from '../../lib/schema';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';
import CalBooking from '../../components/shared/CalBooking';
import { BOOKING_LINK } from '../../data/siteConfig';

export const metadata: Metadata = {
  title: 'Book a Strategy Call | Qognition',
  description: 'Book a free 15-minute strategy call with Qognition. Discuss your growth challenges and get an honest assessment of what would move the needle.',
  alternates: { canonical: '/book' },
};

const bookingOptions = [
  {
    title: 'Free Growth Audit',
    description: 'Get a 12-page audit of your website within 48 hours. Covers SEO, conversion, and competitive gaps.',
    href: '/free-seo-audit',
    cta: 'Get Audit',
  },
  {
    title: 'Marketing Strategy Call',
    description: '15-minute call to discuss SEO, paid media, content, CRO, or AI search visibility. We will tell you what is worth fixing first.',
    href: BOOKING_LINK,
    cta: 'Book Call',
    external: true,
  },
  {
    title: 'Project Scoping Call',
    description: '15-minute call to scope a website, brand, video, or automation project. We will outline timeline and a ballpark range.',
    href: BOOKING_LINK,
    cta: 'Book Call',
    external: true,
  },
  {
    title: 'General Inquiry',
    description: 'Not sure where to start? Send us a message and we will point you in the right direction.',
    href: '/contact',
    cta: 'Contact Us',
  },
];

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
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Start Here</Badge>
            <Heading level="h1" className="mb-6">Book a Strategy Call</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-2xl mx-auto">
              Every engagement starts with a conversation. Pick the path that matches your needs and we will take it from there.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {bookingOptions.map((option) => (
              <div key={option.title} className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8 flex flex-col">
                <h3 className="text-h3 text-[var(--text)] mb-3 font-semibold">{option.title}</h3>
                <p className="text-body text-[var(--text-muted)] mb-8 flex-1">{option.description}</p>
                {option.external ? (
                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-6 py-3 text-sm hover:brightness-110 transition-all"
                  >
                    {option.cta} <ArrowRight size={16} />
                  </a>
                ) : (
                  <Link
                    href={option.href}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-6 py-3 text-sm hover:brightness-110 transition-all"
                  >
                    {option.cta} <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Inline Calendly */}
          <div className="rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-8">
            <Heading level="h2" className="text-center mb-8">Or Jump Right Into Our Calendar</Heading>
            <CalBooking />
          </div>
        </div>
      </main>
    </>
  );
}
