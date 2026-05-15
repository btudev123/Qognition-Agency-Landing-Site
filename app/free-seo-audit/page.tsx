import type { Metadata } from 'next';
import SchemaScript from '../SchemaScript';
import AuditLandingPage from '../../components/AuditLandingPage';
import { getAuditOfferBySlug } from '../../data/auditOffers';
import { breadcrumbSchema, faqSchema, metadataFor } from '../../lib/seo';

const offer = getAuditOfferBySlug('free-seo-audit')!;

export const metadata: Metadata = metadataFor({ title: offer.title, description: offer.description, path: `/${offer.slug}` });

export default function Page() {
  return (
    <>
      <SchemaScript data={faqSchema(offer.faqs)} />
      <SchemaScript data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: offer.title, path: `/${offer.slug}` }])} />
      <AuditLandingPage offer={offer} />
    </>
  );
}
