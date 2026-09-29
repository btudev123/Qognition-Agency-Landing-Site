import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GrowthPage } from '../../../components/growth/GrowthPage';
import { getGrowthPage } from '../../../lib/growth/publication';
import { growthMetadata } from '../../../lib/growth/metadata';
import { getGrowthPlaceById } from '../../../lib/growth/geo';

type Props = { params: Promise<{ segments?: string[] }>; searchParams: Promise<Record<string,string|string[]|undefined>> };
export const runtime = 'nodejs';

async function resolvePage(segments: string[]) {
  const page = getGrowthPage(`/growth${segments.length ? '/' + segments.join('/') : ''}`);
  if (page?.kind === 'place') {
    const [country, id] = page.entityId!.split(':');
    const place = await getGrowthPlaceById(country, Number(id));
    if (!place) return undefined;
    return { ...page, title: `${place.name}: place profile`, description: `${place.featureClass === 'A' ? 'Administrative area' : 'Populated place'} in ${country}. Explore the attributed geographic record and plan your target-market context.` };
  }
  return page;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments = [] } = await params;
  const page = await resolvePage(segments);
  return page ? growthMetadata(page) : { title: 'Page not found | Qognition', robots: { index: false, follow: false } };
}
export default async function GrowthRoute({ params, searchParams }: Props) {
  const { segments = [] } = await params;
  const page = await resolvePage(segments);
  if (!page) notFound();
  return <GrowthPage page={page} searchParams={await searchParams}/>;
}
