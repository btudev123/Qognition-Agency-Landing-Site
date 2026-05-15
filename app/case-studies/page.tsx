import type { Metadata } from 'next';
import ViewRenderer from '../ViewRenderer';
import { getCoreMetadata } from '../../lib/seo';

export const metadata: Metadata = getCoreMetadata('/case-studies');

export default function Page() {
  return <ViewRenderer view="work" />;
}
