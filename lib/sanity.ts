import { createClient } from 'next-sanity';
// v2 exposes only "." and "./signed" in its exports map, and the default export
// is deprecated — both the builder and its types come from the root.
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

import { apiVersion, dataset, projectId } from '../sanity/env';

/**
 * Read-only client for the public site. `useCdn` keeps reads on the edge cache;
 * ISR revalidation handles freshness, so there is no need to bypass it.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

/**
 * Write client. Only usable server-side — SANITY_API_WRITE_TOKEN is not exposed
 * to the browser, so calling this from a client component yields an unauthed
 * client and writes will fail.
 */
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: SanityImageSource) => builder.image(source);

/** True when a real project is configured, so callers can fall back to local data. */
export const isSanityConfigured = () => Boolean(projectId && dataset);
