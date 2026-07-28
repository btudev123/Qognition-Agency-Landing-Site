/**
 * One-way migration: the hardcoded content in data/*.ts -> the Sanity dataset.
 *
 *   SANITY_API_WRITE_TOKEN=<token> npx tsx scripts/migrate-to-sanity.ts [--dry]
 *
 * Idempotent. Every document gets a deterministic _id derived from its source
 * id, and writes go through createOrReplace, so re-running reconciles rather
 * than duplicating. Publishing this does NOT change what the site renders — the
 * pages still read data/*.ts until each one is switched over.
 */

// next-sanity re-exports the client; @sanity/client is not a direct dependency
// and pnpm's strict node_modules keeps it unresolvable from here.
import { createClient } from 'next-sanity';

import { BLOG_POSTS } from '../data/blog';
import { CASE_STUDIES } from '../data/work';
import { TOOLS } from '../data/tools';
import { TESTIMONIALS } from '../data/trust';
import { TOOL_CATEGORIES } from '../data/toolCategories';
import { SERVICES } from '../data/services';
import { B2B_MOFU_PAGES } from '../data/b2bPages';
import { LOCATIONS } from '../data/locations';
import { INDUSTRIES } from '../data/industries';
import {
  SERVICE_SUB_PAGES,
  FREE_TOOLS,
  RESOURCES,
  COMPARISONS,
  GLOSSARY_TERMS,
  TEAM_MEMBERS,
} from '../data/seoExpansion';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ngv93z0z';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes('--dry');

if (!token && !dryRun) {
  console.error('Missing SANITY_API_WRITE_TOKEN. Pass --dry to preview without writing.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-10-01', token, useCdn: false });

/**
 * Sanity treats "." as a path separator inside _ids, and each segment must start
 * with an alphanumeric. So the raw part is stripped of dots entirely — otherwise
 * "Dr. Maya Kapoor" yields the invalid segment "-maya-kapoor".
 */
const safeId = (prefix: string, raw: string) =>
  `${prefix}.${raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

const slugify = (raw: string) =>
  raw
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** "April 15, 2026" -> ISO. Returns undefined rather than an Invalid Date. */
const toIso = (value?: string) => {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
};

const categorySlugFor = (category: string) =>
  TOOL_CATEGORIES.find((c) => c.name === category)?.slug || slugify(category);

type Doc = Record<string, unknown> & { _id: string; _type: string };

const docs: Doc[] = [];

for (const post of BLOG_POSTS as any[]) {
  docs.push({
    _id: safeId('post', post.id),
    _type: 'post',
    title: post.title,
    slug: { _type: 'slug', current: post.id },
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags || [],
    publishedAt: toIso(post.date),
    readTime: post.readTime,
    authorName: post.author?.name,
    authorTitle: post.author?.title,
    authorAvatar: post.author?.avatar,
    coverImagePath: post.image,
    body: post.content,
  });
}

for (const study of CASE_STUDIES as any[]) {
  docs.push({
    _id: safeId('caseStudy', study.id),
    _type: 'caseStudy',
    title: study.title,
    slug: { _type: 'slug', current: study.id },
    client: study.client,
    industry: study.industry,
    summary: study.summary,
    imagePath: study.image,
    tags: study.tags || [],
    stats: (study.stats || []).map((s: any, i: number) => ({
      _key: `stat-${i}`,
      _type: 'object',
      label: s.label,
      value: s.value,
    })),
    timeline: study.timeline,
    roi: study.roi,
    challenge: study.challenge,
    solution: study.solution,
    implementation: study.implementation || [],
    results: study.results || [],
    clientJourney: study.clientJourney || [],
    beforeAfter: (study.beforeAfter || []).map((r: any, i: number) => ({
      ...r,
      _key: `ba-${i}`,
    })),
    funnelStages: (study.funnelStages || []).map((r: any, i: number) => ({
      ...r,
      _key: `fs-${i}`,
    })),
    analytics: (study.analytics || []).map((r: any, i: number) => ({
      ...r,
      _key: `an-${i}`,
    })),
  });
}

for (const t of TOOLS as any[]) {
  docs.push({
    _id: safeId('tool', t.id),
    _type: 'tool',
    name: t.name,
    slug: { _type: 'slug', current: t.id },
    category: t.category,
    categorySlug: categorySlugFor(t.category),
    shortDescription: t.shortDescription,
    fullDescription: t.fullDescription,
    agencyVerdict: t.agencyVerdict,
    pricing: t.pricing,
    websiteUrl: t.websiteUrl,
    rating: t.rating,
    tags: t.tags || [],
    relatedServiceId: t.relatedServiceId,
  });
}

for (const [i, item] of (TESTIMONIALS as any[]).entries()) {
  docs.push({
    _id: safeId('testimonial', item.author || `entry-${i}`),
    _type: 'testimonial',
    quote: item.quote,
    author: item.author,
    role: item.role,
    company: item.company,
    avatarPath: item.avatar,
  });
}

/** Arrays of objects need a stable _key per item or the studio flags them. */
const keyed = <T extends Record<string, unknown>>(items: T[] | undefined, type: string) =>
  (items || []).map((item, i) => ({ ...item, _key: `${type}-${i}`, _type: type }));

const slugOf = (current: string) => ({ _type: 'slug', current });

for (const s of SERVICES as any[]) {
  docs.push({
    _id: safeId('service', s.id),
    _type: 'service',
    title: s.title,
    slug: slugOf(s.id),
    shortDescription: s.shortDescription,
    fullDescription: s.fullDescription,
    icon: s.icon,
    kpis: s.kpis || [],
    subServices: keyed(s.subServices, 'subService'),
    process: keyed(s.process, 'processStep'),
    deepDive: keyed(s.deepDive, 'contentSection'),
    expertQuote: s.expertQuote
      ? { ...s.expertQuote, _type: 'expertQuote' }
      : undefined,
    techStack: s.techStack || [],
    relatedIndustries: s.relatedIndustries || [],
    faqs: keyed(s.faqs, 'faq'),
  });
}

for (const p of B2B_MOFU_PAGES as any[]) {
  docs.push({
    _id: safeId('pillarPage', p.slug),
    _type: 'pillarPage',
    title: p.title,
    slug: slugOf(p.slug),
    description: p.description,
    h1: p.h1,
    eyebrow: p.eyebrow,
    summary: p.summary,
    sections: keyed(p.sections, 'contentSection'),
    checklist: p.checklist || [],
    faqs: keyed(p.faqs, 'faq'),
    relatedLinks: keyed(p.relatedLinks, 'relatedLink'),
  });
}

for (const p of SERVICE_SUB_PAGES as any[]) {
  docs.push({
    // serviceId + slug, because the same slug repeats across services.
    _id: safeId('servicePage', `${p.serviceId}-${p.slug}`),
    _type: 'servicePage',
    title: p.title,
    slug: slugOf(p.slug),
    description: p.description,
    h1: p.h1,
    serviceId: p.serviceId,
    intro: p.intro,
    deliverables: p.deliverables || [],
    sections: keyed(p.sections, 'contentSection'),
    faqs: keyed(p.faqs, 'faq'),
    relatedLinks: keyed(p.relatedLinks, 'relatedLink'),
  });
}

for (const t of FREE_TOOLS as any[]) {
  docs.push({
    _id: safeId('freeToolPage', t.slug),
    _type: 'freeToolPage',
    title: t.title,
    slug: slugOf(t.slug),
    description: t.description,
    h1: t.h1,
    intro: t.intro,
    inputs: t.inputs || [],
    outputs: t.outputs || [],
    useCases: t.useCases || [],
    faqs: keyed(t.faqs, 'faq'),
  });
}

for (const c of COMPARISONS as any[]) {
  docs.push({
    _id: safeId('comparisonPage', c.slug),
    _type: 'comparisonPage',
    title: c.title,
    slug: slugOf(c.slug),
    description: c.description,
    h1: c.h1,
    category: c.category,
    summary: c.summary,
    decisionFactors: c.decisionFactors || [],
    qognitionFit: c.qognitionFit || [],
    alternatives: c.alternatives || [],
    faqs: keyed(c.faqs, 'faq'),
  });
}

for (const r of RESOURCES as any[]) {
  docs.push({
    _id: safeId('resourcePage', r.slug),
    _type: 'resourcePage',
    title: r.title,
    slug: slugOf(r.slug),
    description: r.description,
    format: r.format,
    readingTime: r.readingTime,
    gated: r.gated,
    audience: r.audience,
    highlights: r.highlights || [],
    sections: keyed(r.sections, 'contentSection'),
  });
}

for (const i of INDUSTRIES as any[]) {
  docs.push({
    _id: safeId('industry', i.id),
    _type: 'industry',
    name: i.name,
    slug: slugOf(i.id),
    description: i.description,
    painPoints: i.painPoints || [],
    solutions: i.solutions || [],
    relatedServices: i.relatedServices || [],
    expertQuote: i.expertQuote ? { ...i.expertQuote, _type: 'expertQuote' } : undefined,
    faqs: keyed(i.faqs, 'faq'),
  });
}

for (const l of LOCATIONS as any[]) {
  docs.push({
    _id: safeId('location', l.slug),
    _type: 'location',
    name: l.name,
    slug: slugOf(l.slug),
    country: l.country,
    region: l.region,
    type: l.type,
    intro: l.intro,
    marketFocus: l.marketFocus || [],
    localModifiers: l.localModifiers || [],
    canonicalParent: l.canonicalParent,
    schemaType: l.schemaType,
  });
}

for (const g of GLOSSARY_TERMS as any[]) {
  docs.push({
    _id: safeId('glossaryTerm', g.slug),
    _type: 'glossaryTerm',
    term: g.term,
    slug: slugOf(g.slug),
    definition: g.definition,
    category: g.category,
    relatedTerms: g.relatedTerms || [],
  });
}

for (const m of TEAM_MEMBERS as any[]) {
  docs.push({
    _id: safeId('teamMember', m.slug),
    _type: 'teamMember',
    name: m.name,
    slug: slugOf(m.slug),
    role: m.role,
    focus: m.focus,
    bio: m.bio,
    imagePath: m.image,
    linkedin: m.linkedin,
  });
}

const counts = docs.reduce<Record<string, number>>((acc, d) => {
  acc[d._type] = (acc[d._type] || 0) + 1;
  return acc;
}, {});

console.log(`Project ${projectId} / dataset ${dataset}`);
console.log('Documents to migrate:', counts, `(total ${docs.length})`);

if (dryRun) {
  console.log('\n--dry: nothing written. Sample document:');
  console.log(JSON.stringify(docs[0], null, 2).slice(0, 900));
  process.exit(0);
}

const CHUNK = 25;
let written = 0;

for (let i = 0; i < docs.length; i += CHUNK) {
  const batch = docs.slice(i, i + CHUNK);
  const tx = batch.reduce((t, doc) => t.createOrReplace(doc as any), client.transaction());
  await tx.commit({ visibility: 'async' });
  written += batch.length;
  console.log(`  committed ${written}/${docs.length}`);
}

console.log(`\nDone. ${written} documents written to ${projectId}/${dataset}.`);
