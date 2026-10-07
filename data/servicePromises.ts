/* The three cards under the answer-first block on every /services/* page and
 * every /services/<service>/<sub> page. Each answers one buyer objection
 * (docs/copy/2026-10/services-template.md; Marcus 03 §5.1 and §5.2):
 *   C7  "Can you guarantee it?"
 *   M1  "How do I report this upward?"
 *   M4  "Will this clash with our team or agency?"
 * One list, so the two templates cannot drift apart.
 */
export const SERVICE_PROMISES = [
  'We commit to the work and a dated record of it. We don’t promise rankings, citations or placement in any AI answer.',
  'Rankings, AI answers, visits and qualified enquiries are reported in separate columns, never blended into one score.',
  'We work beside your marketing team, developers or current agency. The proposal names who owns each task.',
] as const;
