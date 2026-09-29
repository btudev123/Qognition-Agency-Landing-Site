import type { Metadata } from 'next';
import { metadataFor } from '../seo';
import { breadcrumbSchema, faqSchema } from '../schema';
import { absoluteUrl } from '../seo';
import { ICP_BASE, icpBreadcrumb, resolveIcp } from './icpRegistry';
import type { IcpRecord } from './icpRegistry';

/* METADATA AND SCHEMA FOR THE FOUR ICP ROUTES. ONE BRANCH, FOUR CALL SITES.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY THIS IS NOT INLINED IN EACH ROUTE FILE.
 *
 * ADR-0008 §3.5 item 2 is a defect report, not a style note. On
 * `app/industries/[industry]/[subIndustry]/page.tsx` the metadata branch keyed
 * on the PARENT while the render branch keyed on the CHILD, so a B2B child under
 * a legacy parent would have had its body rendered by one branch and its
 * `<title>` written by the other: `getSubIndustryMetadata` fails to find the
 * sub-industry and returns `{ title: 'Vertical Not Found', noIndex: true }` over
 * a page that renders fine. Latent only because the path never reached
 * `generateStaticParams`. Kyle's instruction is to mirror the branch onto every
 * one of the four routes, and four copies of a branch is four chances to mirror
 * it wrong. So it is one function and the routes call it.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT MAY NEVER REACH A TITLE OR A DESCRIPTION.
 *
 * No string from `ai_prompts` or `ppc_keywords`, at any level. They are the
 * CLIENT'S buyer's language: `contract manufacturing services` is typed by an
 * OEM sourcing a builder, not by a contract manufacturer's marketing director
 * hiring us. A page targeting one competes with its own prospect and bounces the
 * visitor it gets, which is the `/locations/*` failure in a new costume. Note
 * that `metadataFor` reads `body.metaDescription` and the H1 reads the entity
 * `name`, so neither field can reach either slot by construction; the gate in
 * `scripts/check-icp.cjs` asserts the containment anyway, because "by
 * construction" is a claim about today's code.
 *
 * `geo_angle` is excluded for the same reason. It describes the Family B
 * opportunity and it reads like a meta description, which is exactly why
 * somebody will try it.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** The title form the two shipped B2B templates already use. See `IcpHero`. */
const titleFor = (record: IcpRecord): string => {
  if (record.level === 'industry') return `AI Search Visibility for ${record.industry.name}`;
  if (record.level === 'sub-industry') return `AI Search Visibility for ${record.sub.name}`;
  if (record.level === 'niche') return `AI Search Visibility for ${record.niche.name}`;
  return `AI Search Visibility for ${record.subNiche.name}`;
};

export const icpEntityName = (record: IcpRecord): string => {
  if (record.level === 'industry') return record.industry.name;
  if (record.level === 'sub-industry') return record.sub.name;
  if (record.level === 'niche') return record.niche.name;
  return record.subNiche.name;
};

/**
 * Metadata for a resolved ICP path, or `undefined` when nothing resolves so the
 * caller can fall through to its own branch.
 *
 * A rule-7 duplicate carries `<link rel="canonical">` to the canonical path
 * rather than to itself. That is the whole of rule 7's routing cost: both paths
 * are legitimate URLs, the canonical id builds the page, and the duplicate
 * points at it. `metadataFor` writes `alternates.canonical: path`, so this
 * overwrites that one field and leaves everything else it produces intact.
 */
export function icpMetadata(segments: readonly string[]): Metadata | undefined {
  const record = resolveIcp(segments);
  if (!record) return undefined;

  const base = metadataFor({
    /* No "| Qognition" here: app/layout.tsx applies a `%s | Qognition` template
       and writing the short form produced "... | Qognition | Qognition" on the
       spine templates' first render. */
    title: titleFor(record),
    description: record.body.metaDescription,
    path: record.href,
    noIndex: record.state !== 'published',
  });

  if (!record.canonicalPath) return base;
  return {
    ...base,
    alternates: { ...base.alternates, canonical: `${ICP_BASE}/${record.canonicalPath.join('/')}` },
  };
}

/**
 * BreadcrumbList for the trail, plus FAQPage when the body carries FAQs.
 *
 * The breadcrumb matters more here than anywhere else on the domain: a level-4
 * path is 4 clicks from the homepage and 203 characters at its longest, and the
 * trail is the only thing telling a crawler which branch it is in. It is emitted
 * for draft pages too, because a draft is `noindex` and a `noindex` page's
 * structured data costs nothing and is one less thing to remember at promotion.
 */
export function icpSchema(record: IcpRecord): object[] {
  const trail = icpBreadcrumb(record);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Industries', path: ICP_BASE },
    ...trail.map((crumb, i) => ({
      name: crumb.name,
      path: `${ICP_BASE}/${record.path.slice(0, i + 1).join('/')}`,
    })),
    { name: icpEntityName(record), path: record.href },
  ];

  const out: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: titleFor(record),
      description: record.body.metaDescription,
      provider: {
        '@type': 'Organization',
        name: 'Qognition',
        url: 'https://www.qognitionagency.com',
      },
      serviceType: 'AI search visibility',
      url: absoluteUrl(record.href),
    },
    breadcrumbSchema(crumbs),
  ];
  if (record.body.faqs.length > 0) out.push(faqSchema([...record.body.faqs]));
  return out;
}
