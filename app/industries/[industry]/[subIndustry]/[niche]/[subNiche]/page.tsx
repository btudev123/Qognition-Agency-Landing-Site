import { previewCandidate, previewCandidateMetadata } from '../../../../../../lib/nicheCandidates';
import NicheCandidatePage from '../../../../../../components/b2b/NicheCandidatePage';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resolveIcp, icpSubNicheParams, ICP_BASE } from '../../../../../../lib/b2b/icpRegistry';
import { icpMetadata, icpSchema, icpEntityName } from '../../../../../../lib/b2b/icpMetadata';
import { observationStore } from '../../../../../../lib/b2b/observationStore';
import IcpSubNichePage from '../../../../../../components/b2b/IcpSubNichePage';

/* LEVEL 4. `/industries/<industry>/<sub-industry>/<niche>/<sub-niche>`.
 * 8,823 addressable, 0 served.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE SHAPE IS KYLE'S, AND NADIA DISAGREES WITH THE PREMISE RATHER THAN THE SHAPE.
 *
 * ADR-0008 §2.5 records a disagreement over where a promoted sub-niche's URL
 * hangs, and attributes to Nadia a flat-leaf position at
 * `/industries/<industry>/<sub-industry>/<leaf>`, depth 4. Her §5.4 corrects the
 * attribution: she holds neither position, because §1.7.2 says level 4 is data
 * and never a route. Where she is forced to choose she prefers Kyle's nesting,
 * and her reason is the stronger one: under the flat leaf shape
 * `technology-and-it-services/cloud-consultancies/migration-and-modernization-partners`
 * is TWO different sub-niches, `09.05.01.01` and `09.05.02.01`, sharing a slug,
 * so one of them cannot have a URL and positioning rule 6 forbids renaming
 * either.
 *
 * The operator decided pages at all four levels, so the premise is settled and
 * is not relitigated here. This implements KYLE'S nesting: 1:1 with the dotted
 * ids, breadcrumb and URL in agreement, 11,561 of 11,561 entities addressable,
 * zero within-parent slug clashes. Crawl depth for a promoted sub-niche is 5,
 * which is the cost, and it is named in ADR-0008 §2.4 rather than hidden.
 *
 * WHAT DOES NOT CHANGE: a level-4 page needs an authored body with the same
 * `SubNicheBody` arity as every other level and a named reviewer before it can
 * be `published`. ADR-0008 §6.4 assertion 6. There is no reduced bar here.
 * ────────────────────────────────────────────────────────────────────────────
 */

// Unknown routes still fail the resolver. Draft fallback is strictly preview-only.
export const dynamicParams = true;

export const generateStaticParams = () => icpSubNicheParams();

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ industry: string; subIndustry: string; niche: string; subNiche: string }>;
}): Promise<Metadata> => {
  const { industry, subIndustry, niche, subNiche } = await params;
  return (
    icpMetadata([industry, subIndustry, niche, subNiche]) ?? previewCandidateMetadata([industry, subIndustry, niche, subNiche]) ?? {
      title: 'Industry Not Found',
      alternates: { canonical: `${ICP_BASE}/${industry}/${subIndustry}/${niche}/${subNiche}` },
      robots: { index: false, follow: true },
    }
  );
};

export default async function Page({
  params,
}: {
  params: Promise<{ industry: string; subIndustry: string; niche: string; subNiche: string }>;
}) {
  const { industry, subIndustry, niche, subNiche } = await params;
  const candidate = previewCandidate([industry, subIndustry, niche, subNiche]);
  if (candidate) return <NicheCandidatePage candidate={candidate} />;
  const record = resolveIcp([industry, subIndustry, niche, subNiche]);
  if (!record || record.level !== 'sub-niche') notFound();

  const canonical = record.canonicalPath ? resolveIcp(record.canonicalPath) : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(icpSchema(record)) }}
      />
      <IcpSubNichePage
        record={record}
        observation={observationStore.lookup(record.href)}
        canonicalHref={canonical?.href}
        canonicalName={canonical ? icpEntityName(canonical) : undefined}
      />
    </>
  );
}
