import type { Metadata } from 'next';
import SchemaScript from './SchemaScript';
import ViewRenderer from './ViewRenderer';
import { faqSchema, getCoreMetadata } from '../lib/seo';

export const metadata: Metadata = getCoreMetadata('/');

const homeFaqs = [
  {
    question: 'How long does it take to see results from digital marketing?',
    answer:
      'PPC campaigns can show early data within days, while SEO and AI search visibility usually compound over 3 to 6 months depending on competition, site quality, and content velocity.'
  },
  {
    question: 'What makes Qognition different from other agencies?',
    answer:
      'Qognition combines technical SEO, performance marketing, conversion websites, AI search visibility, and growth engineering in one implementation-focused team.'
  },
  {
    question: 'Do you work with businesses of all sizes?',
    answer:
      'Yes. Qognition works with startups, SMBs, professional services firms, SaaS companies, ecommerce brands, and enterprise teams.'
  },
  {
    question: 'How do you measure success?',
    answer:
      'Success is measured against business outcomes such as qualified leads, booked calls, revenue, ROAS, organic visibility, conversion rate, and CRM-qualified pipeline.'
  }
];

export default function Page() {
  return (
    <>
      <SchemaScript data={faqSchema(homeFaqs)} />
      <ViewRenderer view="home" />
    </>
  );
}
