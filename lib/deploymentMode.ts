/** Production cannot opt into draft publication. */
export function isPreviewDeployment(env: Record<string, string | undefined> = process.env): boolean {
  if (env.VERCEL_ENV === 'production') return false;
  return env.VERCEL_ENV === 'preview' || env.QOGNITION_PREVIEW_MODE === '1';
}
export function liveLeadWritesAllowed(env: Record<string, string | undefined> = process.env): boolean {
  return env.VERCEL_ENV === 'production' && env.QOGNITION_LEAD_MODE !== 'validate';
}
