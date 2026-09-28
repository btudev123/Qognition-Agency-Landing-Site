import { notFound, permanentRedirect } from 'next/navigation';
import { LOCALIZED_PILLARS } from '../../../../data/growth-locales';
import { NON_ENGLISH_GROWTH_LOCALES, canPublishLocale, isGrowthLocale, isLocalizedPillar, localizedGrowthMetadata, localizedHomePath } from '../../../../lib/growth-locales';
import GrowthLocalizedPage from '../../../../components/GrowthLocalizedPage';

type Props = { params: Promise<{ spoke: string; segments?: string[] }> };
function resolve(spoke: string, segments: string[] = []) {
  if (!isGrowthLocale(spoke) || spoke === 'en') return null;
  if (segments.length !== 2 || segments[0] !== 'services' || !isLocalizedPillar(segments[1]) || !canPublishLocale(spoke, segments[1])) return null;
  return { locale: spoke, pillar: segments[1] };
}
export function generateStaticParams() { return NON_ENGLISH_GROWTH_LOCALES.flatMap((spoke) => LOCALIZED_PILLARS.filter((pillar) => canPublishLocale(spoke, pillar)).map((pillar) => ({ spoke, segments: ['services', pillar] }))); }
export async function generateMetadata({ params }: Props) {
  const { spoke, segments } = await params; const resolved = resolve(spoke, segments);
  return resolved ? localizedGrowthMetadata(resolved.locale, resolved.pillar) : { robots: { index: false, follow: false } };
}
export default async function LocalizedGrowthRoute({ params }: Props) {
  const { spoke, segments } = await params;
  if (!segments?.length && isGrowthLocale(spoke) && spoke !== 'en') permanentRedirect(localizedHomePath(spoke));
  const resolved = resolve(spoke, segments); if (!resolved) notFound();
  return <GrowthLocalizedPage locale={resolved.locale} pillar={resolved.pillar} />;
}
