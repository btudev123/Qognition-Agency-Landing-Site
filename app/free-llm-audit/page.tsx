import type { Metadata } from 'next';
import AuditLandingPage from '../../components/AuditLandingPage';
import { getAuditOfferBySlug } from '../../data/auditOffers';
import { breadcrumbSchema, faqSchema } from '../../lib/schema';
import { metadataFor } from '../../lib/seo';

const offer = getAuditOfferBySlug('free-llm-audit')!;

export const metadata: Metadata = metadataFor({ title: offer.title, description: offer.description, path: `/${offer.slug}` });

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqSchema(offer.faqs),
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: offer.title, path: `/${offer.slug}` }]),
          ]),
        }}
      />
      <AuditLandingPage offer={offer} />
    </>
  );
}
