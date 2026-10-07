/* POST /api/audit — the free snapshot. Two halves, and the second one is optional.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE CRAWL HALF ALWAYS DELIVERS.
 *
 * lib/auditEngine.ts fetches the page plus robots.txt, sitemap.xml and llm.txt
 * and runs 28 real checks against them. It is free, it is fast, it needs no API
 * key and it works today. That alone is the lead magnet, and the endpoint is
 * built so that nothing in the AI half can take it away from a visitor.
 *
 * THE AI HALF IS BEST-EFFORT AND SAYS SO WHEN IT IS ABSENT.
 *
 * lib/audit/aiVisibility.ts asks one buyer prompt on one platform. If no
 * provider is configured, if the provider is over quota, if it times out, or if
 * no category can be read from the page, the response carries
 * `aiVisibility.status === 'not_checked'` with a reason and a sentence to show
 * the visitor. It NEVER carries a guess. Today, in production, no provider is
 * configured, so `not_checked` is the expected response and the correct one.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT STOPS THIS SPENDING MONEY. STATED IN FULL, INCLUDING THE GAP.
 *
 *   1. A hard cap in the provider's own dashboard. OUTSIDE THIS CODE, and the
 *      only real ceiling. The operator sets it before the key is added.
 *   2. lib/auditRateLimit.ts, policy 'audit': one per email per 24h, and 12 per
 *      IP per hour. It is IN-MEMORY AND PER-INSTANCE by its own documentation,
 *      so N concurrent serverless instances enforce N separate ceilings.
 *      Project memory records Redis env vars UNSET in production, so that is
 *      the live state and not something to assume is handled. It throttles. It
 *      does not cap.
 *   3. No key means no call. Removing PERPLEXITY_API_KEY is the kill switch.
 *
 * There is deliberately no ledger, no queue and no Redis here: the operator
 * scoped this to one call per audit, and ADR-0003 §6's durable-ledger
 * requirement is written for the 45-call /api/snapshot product, which this is
 * not and must not grow into without going back to that ADR.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * PUBLIC CONTRACT, UNCHANGED.
 *
 * The request body stays `{ url, email, auditType?, source? }`, as published in
 * app/.well-known/openapi.json and called by components/WebMCPProvider.tsx.
 * The response gains an `aiVisibility` section; `report` and `offer` keep their
 * shape. Additive only.
 *
 * TENANCY: not applicable, derived not assumed. No auth dependency in
 * package.json; no getServerSession / userId / tenantId anywhere in lib, app or
 * components. Public, unauthenticated, single-tenant marketing endpoint. The
 * only untrusted input that reaches a fetch is the target URL, and it goes
 * through `normalizeTargetUrl` inside runAudit, which is the SSRF guard
 * (ADR-0003 §2). Anton owns the note there that it blocks by hostname string
 * and so does not stop DNS rebinding or IPv6 private ranges; this endpoint does
 * not widen that surface, it restores it.
 * ────────────────────────────────────────────────────────────────────────────
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AuditError, runAudit } from '../../../lib/auditEngine';
import { observeAiVisibility } from '../../../lib/audit/aiVisibility';
import { checkAuditRateLimit, releaseAuditRateLimit } from '../../../lib/auditRateLimit';
import { isPreviewDeployment } from '../../../lib/deploymentMode';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const auditRequestSchema = z.object({
  url: z.string().min(1).max(2048),
  email: z.string().email().max(254),
  auditType: z.enum(['seo', 'ai', 'branding', 'social', 'llm']).optional(),
  /** Free-text caller label, e.g. "WebMCP". Accepted and not persisted. */
  source: z.string().max(120).optional(),
});

export async function POST(request: NextRequest) {
  // A preview must not crawl targets or spend production provider credits.
  if (isPreviewDeployment()) {
    return NextResponse.json(
      { success: false, status: 'preview_disabled', error: 'Audits are disabled in this preview. No website crawl or AI check was performed.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
  const raw = await request.text();
  if (raw.length > 10_000) {
    return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = auditRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the URL and email address.', fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const input = parsed.data;

  // Claimed before any fetch, because check-and-claim are one step in that
  // module on purpose: separated, two clicks a few hundred milliseconds apart
  // both pass before either has recorded anything.
  const rate = checkAuditRateLimit(request, input.email, 'audit');
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error:
          rate.reason === 'duplicate'
            ? 'We have already run an audit for this address today. Reply to that email and we will look again.'
            : 'Too many audits from this connection right now. Please try again shortly.',
        retryAfterSeconds: rate.retryAfterSeconds,
      },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } },
    );
  }

  let audit: Awaited<ReturnType<typeof runAudit>>;
  try {
    audit = await runAudit({ url: input.url, email: input.email, auditType: input.auditType });
  } catch (error) {
    // The crawl is the deliverable. If it failed the visitor got nothing, so
    // they must not lose their one attempt for the next 24 hours.
    releaseAuditRateLimit(rate);

    if (error instanceof AuditError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    // Never log the error object: a failed fetch can carry the target URL and
    // the visitor's email address through its cause chain.
    console.error('[Audit] crawl_failed');
    return NextResponse.json(
      { error: 'We could not complete that audit. Please try again shortly.' },
      { status: 503, headers: { 'Retry-After': '30' } },
    );
  }

  // Runs after the crawl so a slow or missing provider cannot cost the visitor
  // their 28 checks. It never throws; every failure is a `not_checked` variant.
  const aiVisibility = await observeAiVisibility({
    target: { hostname: audit.page.hostname, title: audit.page.title },
    env: process.env as Record<string, string | undefined>,
    now: new Date(),
  });

  return NextResponse.json({
    success: true,
    report: audit.report,
    offer: audit.offer,
    /**
     * Either an observation with the stored answer it derives from, or
     * `not_checked` with a reason and a sentence to render. There is no third
     * state, and no state in which a number appears that was not measured.
     */
    aiVisibility,
  });
}
