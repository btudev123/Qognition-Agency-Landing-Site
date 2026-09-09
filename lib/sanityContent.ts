import 'server-only';

import { sanityClient } from './sanity';
import { BLOG_POSTS } from '../data/blog';
import { B2B_MOFU_PAGES } from '../data/b2bPages';
import { GLOSSARY_TERMS } from '../data/seoExpansion';
import { CASE_STUDIES, getCaseStudy as getLocalCaseStudy } from '../data/case-studies';
import type { ResolvedCaseStudy } from '../data/case-studies';
import type { B2BMoFuPage, GlossaryTerm } from '../types';

/** The blog data is a literal array, so its element type is the contract. */
export type BlogPost = (typeof BLOG_POSTS)[number];

/**
 * Live content layer.
 *
 * Every read is tagged so the Sanity webhook (/api/revalidate) can invalidate
 * exactly what changed, and every read falls back to the committed data in
 * data/*.ts. That fallback is deliberate: a Sanity outage, a network blip, or a
 * document that has not been migrated yet must never blank a page that used to
 * render. Sanity is the source of truth when it answers, and the repo is the
 * floor when it does not.
 */

export const tagFor = (type: string, slug?: string) =>
  slug ? `sanity:${type}:${slug}` : `sanity:${type}`;

/** Content changes should appear within a minute even if a webhook is missed. */
const REVALIDATE_SECONDS = 60;

async function query<T>(groq: string, params: Record<string, unknown>, tags: string[]): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(groq, params, {
      next: { tags, revalidate: REVALIDATE_SECONDS },
    });
  } catch (error) {
    console.error('[sanity] query failed, falling back to local data:', error);
    return null;
  }
}

const isEmpty = (value: unknown) =>
  value === null || value === undefined || (Array.isArray(value) && value.length === 0);

// ── Blog ────────────────────────────────────────────────────────────────────

const POST_FIELDS = `
  "id": slug.current,
  title,
  excerpt,
  category,
  tags,
  readTime,
  "date": coalesce(publishedAt, _createdAt),
  "image": coalesce(coverImagePath, "/default-og.svg"),
  "content": body,
  "author": {
    "name": coalesce(authorName, "Qognition"),
    "title": coalesce(authorTitle, "Growth Team"),
    "avatar": coalesce(authorAvatar, "/qognition-mark.png")
  }
`;

/** Sanity stores ISO datetimes; the templates render the original display form. */
const formatDate = (value?: string) => {
  if (!value) return '';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const result = await query<BlogPost[]>(
    `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) { ${POST_FIELDS} }`,
    {},
    [tagFor('post')],
  );
  if (isEmpty(result)) return BLOG_POSTS;
  return result!.map((p) => ({ ...p, date: formatDate(p.date) }));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const result = await query<BlogPost>(
    `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS} }`,
    { slug },
    [tagFor('post'), tagFor('post', slug)],
  );
  if (!result) return BLOG_POSTS.find((p) => p.id === slug) ?? null;
  return { ...result, date: formatDate(result.date) };
}

// ── Case studies ────────────────────────────────────────────────────────────

/**
 * Case studies are code, not CMS content.
 *
 * The Sanity `caseStudy` type holds zero documents and its schema predates the current record
 * shape, so querying it could only ever return something that does not type-check. The library in
 * `data/case-studies` is the single source of truth; these wrappers stay async so callers do not
 * have to change.
 */
export async function getCaseStudies(): Promise<ResolvedCaseStudy[]> {
  return CASE_STUDIES;
}

export async function getCaseStudy(slug: string): Promise<ResolvedCaseStudy | null> {
  return getLocalCaseStudy(slug) ?? null;
}

// ── Pillar / guide pages ────────────────────────────────────────────────────

const PILLAR_FIELDS = `
  "slug": slug.current,
  title,
  description,
  h1,
  eyebrow,
  summary,
  "sections": coalesce(sections[]{ title, content }, []),
  "checklist": coalesce(checklist, []),
  "faqs": coalesce(faqs[]{ question, answer }, []),
  "relatedLinks": coalesce(relatedLinks[]{ label, href }, [])
`;

/**
 * Non-null by contract: the caller renders a fixed route, so a missing document
 * falls back to the committed page rather than 404-ing a URL that is in the
 * sitemap. `!` is safe because every pillar route has a data/b2bPages entry.
 */
export async function getPillarPage(slug: string): Promise<B2BMoFuPage> {
  const result = await query<B2BMoFuPage>(
    `*[_type == "pillarPage" && slug.current == $slug][0] { ${PILLAR_FIELDS} }`,
    { slug },
    [tagFor('pillarPage'), tagFor('pillarPage', slug)],
  );
  return result ?? B2B_MOFU_PAGES.find((p) => p.slug === slug)!;
}

export async function getPillarPageSlugs() {
  const result = await query<{ slug: string }[]>(
    `*[_type == "pillarPage" && defined(slug.current)]{ "slug": slug.current }`,
    {},
    [tagFor('pillarPage')],
  );
  return isEmpty(result)
    ? B2B_MOFU_PAGES.map((p) => p.slug)
    : result!.map((r) => r.slug);
}

// ── Glossary ────────────────────────────────────────────────────────────────

export async function getGlossaryTerm(slug: string): Promise<GlossaryTerm | null> {
  const result = await query<GlossaryTerm>(
    `*[_type == "glossaryTerm" && slug.current == $slug][0]{
      "slug": slug.current, term, definition, category,
      "relatedTerms": coalesce(relatedTerms, [])
    }`,
    { slug },
    [tagFor('glossaryTerm'), tagFor('glossaryTerm', slug)],
  );
  return result ?? GLOSSARY_TERMS.find((t) => t.slug === slug) ?? null;
}
