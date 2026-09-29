import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resolveIcp, icpNicheParams, ICP_BASE } from '../../../../../lib/b2b/icpRegistry';
import { icpMetadata, icpSchema, icpEntityName } from '../../../../../lib/b2b/icpMetadata';
import { observationStore } from '../../../../../lib/b2b/observationStore';
import IcpNichePage from '../../../../../components/b2b/IcpNichePage';

/* LEVEL 3. `/industries/<industry>/<sub-industry>/<niche>`. 2,376 addressable.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THIS ROUTE SERVES NOTHING TODAY AND THAT IS THE DESIGN.
 *
 * `generateStaticParams` returns PUBLISHED entities only and
 * `lib/b2b/icpPublication.ts` is empty, so it returns `[]`. With
 * `dynamicParams = false` that means every one of the 2,376 paths 404s until an
 * operator promotion adds one. The build does not grow by a page.
 *
 * ADR-0008 §11 item 2 is why the route exists empty rather than not existing: if
 * the measurement comes back saying this level earns its URLs, the answer is a
 * ceiling change and not an architecture change. Building the route empty is
 * what makes that true.
 *
 * `dynamicParams = false`, for ADR-0007 §6.4's reasons, and the second one is
 * stronger at this depth: an unknown slug must 404 rather than render, and the
 * set of unknown three-segment paths is far larger than the set of known ones.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const dynamicParams = false;

export const generateStaticParams = () => icpNicheParams();

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ industry: string; subIndustry: string; niche: string }>;
}): Promise<Metadata> => {
  const { industry, subIndustry, niche } = await params;
  return (
    icpMetadata([industry, subIndustry, niche]) ?? {
      title: 'Industry Not Found',
      alternates: { canonical: `${ICP_BASE}/${industry}/${subIndustry}/${niche}` },
      robots: { index: false, follow: true },
    }
  );
};

export default async function Page({
  params,
}: {
  params: Promise<{ industry: string; subIndustry: string; niche: string }>;
}) {
  const { industry, subIndustry, niche } = await params;
  const record = resolveIcp([industry, subIndustry, niche]);
  if (!record || record.level !== 'niche') notFound();

  const canonical = record.canonicalPath ? resolveIcp(record.canonicalPath) : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(icpSchema(record)) }}
      />
      <IcpNichePage
        record={record}
        observation={observationStore.lookup(record.href)}
        canonicalHref={canonical?.href}
        canonicalName={canonical ? icpEntityName(canonical) : undefined}
      />
    </>
  );
}
