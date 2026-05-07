import type { Metadata } from 'next';
import { LOCATIONS } from '../../data/locations';
import { getCoreMetadata, metadataFor } from '../../lib/seo';
import { LocationsIndexView } from './ProgrammaticLocationView';

export const metadata: Metadata = metadataFor({
  title: 'Locations | Digital Marketing Service Areas',
  description: 'Browse Qognition service-area pages for major cities, states, countries, and revenue markets.',
  path: '/locations'
});

export default function Page() {
  return <LocationsIndexView locations={LOCATIONS} />;
}
