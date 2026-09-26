import type { Metadata } from 'next';
import LocalAuditExperience from '../../components/LocalAuditExperience';
export const metadata: Metadata = {title: 'AI Search Visibility Report | Qognition', description: 'A human-reviewed report on how visible and citable your brand is across AI search, delivered within 48 hours. See what was tested, when it was checked and what remains unknown.', alternates: {canonical: '/free-ai-audit'}};
export default function Page(){return <LocalAuditExperience />;}
