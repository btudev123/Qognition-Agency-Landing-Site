import type { Metadata } from 'next';
import LocalAuditExperience from '../../components/LocalAuditExperience';
import { metadataFor } from '../../lib/seo';
// Title and description come from SEO_OVERRIDES['/free-ai-audit'] in lib/seo.ts.
export const metadata: Metadata = metadataFor({ title: 'AI Search Visibility Report', description: 'A human-reviewed audit of how your firm appears in Google and AI answers.', path: '/free-ai-audit' });
export default function Page(){return <LocalAuditExperience />;}
