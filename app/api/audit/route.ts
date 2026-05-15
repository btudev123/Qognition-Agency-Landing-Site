import { NextRequest, NextResponse } from 'next/server';
import { AUDIT_OFFERS } from '../../../data/auditOffers';
import { submitHubSpotLead, sendResendEmail } from '../../../lib/leadDelivery';
import { AuditCheck, AuditReport, AuditType } from '../../../types';

export const dynamic = 'force-dynamic';

const MAX_HTML_BYTES = 750_000;
const USER_AGENT = 'QognitionAuditBot/1.0 (+https://www.qognitionagency.com/free-seo-audit)';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const normalizeTargetUrl = (value: string) => {
  const raw = value.trim();
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const url = new URL(withProtocol);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Only HTTP and HTTPS URLs can be audited.');
  }
  const hostname = url.hostname.toLowerCase();
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.local') ||
    hostname === '0.0.0.0' ||
    hostname.startsWith('127.') ||
    hostname.startsWith('10.') ||
    hostname.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  ) {
    throw new Error('Private or local URLs cannot be audited.');
  }
  url.hash = '';
  return url;
};

const fetchText = async (url: string, timeoutMs = 8000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,text/plain,application/xml;q=0.8,*/*;q=0.5' },
      redirect: 'follow',
      signal: controller.signal,
      cache: 'no-store'
    });
    const contentType = response.headers.get('content-type') || '';
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      contentType,
      text: text.slice(0, MAX_HTML_BYTES)
    };
  } finally {
    clearTimeout(timer);
  }
};

const matchContent = (html: string, regex: RegExp) => {
  const match = html.match(regex);
  return match?.[1]?.replace(/\s+/g, ' ').trim() || '';
};

const getRobotsAccess = (robots: string, bot: string) => {
  const lines = robots.split(/\r?\n/).map((line) => line.split('#')[0].trim()).filter(Boolean);
  let applies = false;
  let disallowRoot = false;
  for (const line of lines) {
    const [rawKey, ...rawValue] = line.split(':');
    const key = rawKey?.trim().toLowerCase();
    const value = rawValue.join(':').trim();
    if (key === 'user-agent') {
      const agent = value.toLowerCase();
      applies = agent === '*' || agent === bot.toLowerCase();
    }
    if (applies && key === 'disallow' && value === '/') {
      disallowRoot = true;
    }
  }
  return !disallowRoot;
};

const makeCheck = (id: string, label: string, passed: boolean, detail: string, warning = false): AuditCheck => ({
  id,
  label,
  status: passed ? 'pass' : warning ? 'warning' : 'fail',
  score: passed ? 10 : warning ? 5 : 0,
  detail
});

const reportEmailHtml = (report: AuditReport) => `
  <div style="font-family:Inter,Arial,sans-serif;background:#050505;color:#f7f7f7;padding:32px;border-radius:18px">
    <p style="color:#19d3bd;text-transform:uppercase;letter-spacing:2px;font-size:12px">Qognition Audit Report</p>
    <h1 style="font-size:32px;margin:8px 0 12px">Your audit score is ${report.score}/100</h1>
    <p style="color:#c8c8c8;line-height:1.6">${escapeHtml(report.summary)}</p>
    <p><strong>URL:</strong> ${escapeHtml(report.normalizedUrl)}</p>
    <h2 style="margin-top:28px">Top recommendations</h2>
    <ul>${report.recommendations.map((item) => `<li style="margin:8px 0">${escapeHtml(item)}</li>`).join('')}</ul>
    <h2 style="margin-top:28px">Checks</h2>
    <ul>${report.checks
      .map((check) => `<li style="margin:8px 0"><strong>${escapeHtml(check.label)}:</strong> ${escapeHtml(check.status)} - ${escapeHtml(check.detail)}</li>`)
      .join('')}</ul>
    <p style="margin-top:28px"><a href="https://calendly.com/hello-qognitionagency/30min" style="background:#19d3bd;color:#000;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:700">Book a strategy call</a></p>
  </div>
`;

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const auditType = (payload.auditType || 'seo') as AuditType;
    const offer = AUDIT_OFFERS.find((item) => item.type === auditType) || AUDIT_OFFERS[0];
    const email = String(payload.email || '').trim().toLowerCase();
    const urlValue = String(payload.url || '').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid work email is required.' }, { status: 400 });
    }

    const targetUrl = normalizeTargetUrl(urlValue);
    const origin = targetUrl.origin;
    const htmlResponse = await fetchText(targetUrl.toString()).catch(() => null);
    if (!htmlResponse) {
      return NextResponse.json({ error: 'Could not fetch that public URL. Check the domain and try again.' }, { status: 422 });
    }
    if (!htmlResponse.ok || !htmlResponse.contentType.includes('text/html')) {
      return NextResponse.json({ error: `Could not audit an HTML page at that URL. Status: ${htmlResponse.status}` }, { status: 422 });
    }

    const html = htmlResponse.text;
    const lowerHtml = html.toLowerCase();
    const title = matchContent(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const description = matchContent(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    const h1s = html.match(/<h1[\s>]/gi) || [];
    const canonical = matchContent(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i);
    const jsonLdCount = (html.match(/type=["']application\/ld\+json["']/gi) || []).length;
    const sameHostLinks = (html.match(/<a\s+[^>]*href=["']([^"']+)["']/gi) || []).filter((anchor) => {
      const href = matchContent(anchor, /href=["']([^"']+)["']/i);
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
      try {
        const link = new URL(href, origin);
        return link.hostname === targetUrl.hostname;
      } catch {
        return href.startsWith('/');
      }
    }).length;

    const robotsUrl = new URL('/robots.txt', origin).toString();
    const sitemapUrl = new URL('/sitemap.xml', origin).toString();
    const robotsResponse = await fetchText(robotsUrl, 5000).catch(() => ({ ok: false, status: 0, contentType: '', text: '' }));
    const sitemapResponse = await fetchText(sitemapUrl, 5000).catch(() => ({ ok: false, status: 0, contentType: '', text: '' }));
    const robots = robotsResponse.text || '';
    const aiBots = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'CCBot', 'Google-Extended'];
    const aiBotsAllowed = aiBots.every((bot) => getRobotsAccess(robots, bot));
    const hasLlmTxt = await fetchText(new URL('/llm.txt', origin).toString(), 5000)
      .then((response) => response.ok)
      .catch(() => false);
    const hasContentSignal = /content-signal:\s*ai-train=/i.test(robots);

    const checks: AuditCheck[] = [
      makeCheck('https', 'HTTPS', targetUrl.protocol === 'https:', 'The audited URL should use HTTPS for trust and browser security.'),
      makeCheck('title', 'Title tag', title.length >= 20 && title.length <= 70, title ? `Found "${title.slice(0, 80)}"` : 'No title tag found.', Boolean(title)),
      makeCheck('description', 'Meta description', description.length >= 70 && description.length <= 170, description ? `Found ${description.length} characters.` : 'No meta description found.', Boolean(description)),
      makeCheck('h1', 'Single H1', h1s.length === 1, `Found ${h1s.length} H1 tag${h1s.length === 1 ? '' : 's'}.`, h1s.length > 0),
      makeCheck('canonical', 'Canonical URL', canonical.length > 0, canonical ? `Canonical points to ${canonical}.` : 'No canonical link found.'),
      makeCheck('robots', 'Robots.txt', robotsResponse.ok, robotsResponse.ok ? 'robots.txt is reachable.' : 'robots.txt could not be reached.'),
      makeCheck('sitemap', 'XML sitemap', sitemapResponse.ok && /<urlset|<sitemapindex/i.test(sitemapResponse.text), sitemapResponse.ok ? 'sitemap.xml is reachable.' : 'sitemap.xml could not be reached.', sitemapResponse.ok),
      makeCheck('ai-bots', 'AI bot access', aiBotsAllowed, aiBotsAllowed ? 'Major AI/search bots are not blocked at the root.' : 'One or more AI/search bots may be blocked in robots.txt.', Boolean(robots)),
      makeCheck('llm', 'LLM discovery file', hasLlmTxt, hasLlmTxt ? 'llm.txt is available.' : 'llm.txt was not found.', false),
      makeCheck('content-signal', 'Content Signals', hasContentSignal, hasContentSignal ? 'Content-Signal preferences are declared.' : 'No Content-Signal directive found.', false),
      makeCheck('schema', 'JSON-LD schema', jsonLdCount > 0, jsonLdCount ? `Found ${jsonLdCount} JSON-LD block${jsonLdCount === 1 ? '' : 's'}.` : 'No JSON-LD schema found.'),
      makeCheck('links', 'Internal links', sameHostLinks >= 10, `Found ${sameHostLinks} same-host link${sameHostLinks === 1 ? '' : 's'} in the page HTML.`, sameHostLinks > 0),
      makeCheck('og', 'Open Graph tags', lowerHtml.includes('property="og:') || lowerHtml.includes("property='og:"), 'Open Graph tags help social and AI previews understand the page.', false)
    ];

    const score = Math.round(checks.reduce((total, check) => total + check.score, 0) / (checks.length * 10) * 100);
    const failedChecks = checks.filter((check) => check.status !== 'pass');
    const recommendations = failedChecks.slice(0, 5).map((check) => `${check.label}: ${check.detail}`);
    if (recommendations.length === 0) {
      recommendations.push('The first-pass audit looks strong. Next, compare page intent, competitors, conversion tracking, and CRM lead quality.');
    }

    const report: AuditReport = {
      auditType: offer.type,
      url: urlValue,
      normalizedUrl: targetUrl.toString(),
      email,
      score,
      summary:
        score >= 80
          ? `${offer.shortTitle} found a strong baseline. The next wins are likely content depth, proof, conversion testing, and authority.`
          : score >= 55
            ? `${offer.shortTitle} found a workable foundation with clear gaps to prioritize before scaling traffic.`
            : `${offer.shortTitle} found meaningful blockers. Fix the technical, content, and trust issues before pushing more traffic to this page.`,
      checks,
      recommendations,
      generatedAt: new Date().toISOString()
    };

    const hubSpot = await submitHubSpotLead(
      {
        source: payload.source || 'Instant Audit',
        resource: offer.slug,
        pageUri: request.headers.get('referer') || `https://www.qognitionagency.com/${offer.slug}`,
        pageName: offer.title,
        fields: {
          email,
          website: targetUrl.toString(),
          auditType: offer.type,
          score,
          reportSummary: report.summary,
          sourceUrl: targetUrl.toString(),
          message: `Instant ${offer.title} report generated. Score: ${score}/100.\n\nTop recommendations:\n${recommendations.join('\n')}`
        }
      },
      request
    );

    const notifyEmail = process.env.AUDIT_NOTIFY_EMAIL;
    const to = notifyEmail && notifyEmail !== email ? [email, notifyEmail] : email;
    const resend = await sendResendEmail({
      to,
      subject: `Your Qognition ${offer.shortTitle} report: ${score}/100`,
      html: reportEmailHtml(report)
    });

    return NextResponse.json({ ok: true, report, delivery: { hubSpot, resend } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to run audit.';
    const isValidation = /URL|email|Private|local|HTTP/i.test(message);
    return NextResponse.json({ error: message }, { status: isValidation ? 400 : 500 });
  }
}
