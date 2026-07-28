import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Qognition Studio',
  description: 'Content studio for qognitionagency.com',
  // The studio is an editor surface, not a search result.
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
