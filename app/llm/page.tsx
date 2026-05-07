import type { Metadata } from 'next';
import ViewRenderer from '../ViewRenderer';
import { getCoreMetadata } from '../../lib/seo';

export const metadata: Metadata = getCoreMetadata('/llm');

export default function Page() {
  return <ViewRenderer view="llm" />;
}
