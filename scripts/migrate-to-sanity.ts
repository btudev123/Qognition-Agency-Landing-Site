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
