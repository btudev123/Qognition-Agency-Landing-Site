// Sanity connection config. Project + dataset are public values (they appear in
// the browser bundle by design); only the write token is secret and it never
// leaves the server.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ngv93z0z';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

/** Pinned. Bumping this can change query semantics, so it is an explicit choice. */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';
