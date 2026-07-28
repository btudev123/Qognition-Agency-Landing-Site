import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

import { tagFor } from '../../../lib/sanityContent';

export const dynamic = 'force-dynamic';

/**
 * Sanity publish webhook -> targeted cache invalidation.
 *
 * Sanity POSTs the changed document here on publish/unpublish/delete. We
 * revalidate both the document's own tag and its type tag, so a single edit
 * refreshes its detail page and any listing that includes it, without dumping
 * the entire cache.
 *
 * Configure in Sanity: API -> Webhooks
 *   URL:     https://www.qognitionagency.com/api/revalidate
 *   Trigger: create, update, delete
 *   Filter:  _type in ["post","caseStudy","pillarPage","glossaryTerm"]
 *   Projection: {_type, "slug": slug.current}
 *   Secret:  must match SANITY_REVALIDATE_SECRET
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error('[revalidate] SANITY_REVALIDATE_SECRET is not set');
    return NextResponse.json({ error: 'Revalidation is not configured.' }, { status: 503 });
  }

  // The raw body is required — re-serializing JSON would break the signature.
  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) || '';

  if (!(await isValidSignature(body, signature, secret))) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
  }

  let payload: { _type?: string; slug?: string };
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { _type, slug } = payload;
  if (!_type) {
    return NextResponse.json({ error: 'Missing _type in payload.' }, { status: 400 });
  }

  const tags = [tagFor(_type)];
  if (slug) tags.push(tagFor(_type, slug));

  // Next 16 requires an explicit cache-life profile; 'max' invalidates fully.
  for (const tag of tags) revalidateTag(tag, 'max');

  console.log(`[revalidate] ${_type}${slug ? `/${slug}` : ''} -> ${tags.join(', ')}`);

  return NextResponse.json({ revalidated: true, tags, now: Date.now() });
}
