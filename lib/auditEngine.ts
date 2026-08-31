import { AUDIT_OFFERS, getAuditOfferBySlug } from '../data/auditOffers';
import { AuditCheck, AuditOffer, AuditReport, AuditType } from '../types';

/**
 * The audit scoring engine. Extracted from app/api/audit/route.ts so that both
 * the public /api/audit endpoint and the consolidated /api/lead endpoint run
 * exactly the same checks against exactly the same scoring.
 */

const MAX_HTML_BYTES = 750_000;
const USER_AGENT = 'QognitionAuditBot/1.0 (+https://www.qognitionagency.com/free-seo-audit)';

/** Thrown for expected, user-facing failures. `status` becomes the HTTP status. */
export class AuditError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = 'AuditError';
    this.status = status;
  }
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Parse and harden a user-supplied URL. This is the SSRF guard for the whole
 * audit surface: the engine fetches whatever comes back from here, so localhost
 * and RFC1918 ranges must stay blocked.
 */
export const normalizeTargetUrl = (value: string) => {
  const raw = value.trim();
  if (!raw) {
    throw new AuditError('A website URL is required.', 400);
  }

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    throw new AuditError('That does not look like a valid URL.', 400);
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new AuditError('Only HTTP and HTTPS URLs can be audited.', 400);
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
    throw new AuditError('Private or local URLs cannot be audited.', 400);
  }

  url.hash = '';
  return url;
};

const fetchText = async (url: string, timeoutMs = 8000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();
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
      text: text.slice(0, MAX_HTML_BYTES),
      durationMs: Date.now() - startedAt
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

const stripHtml = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const countMatches = (value: string, regex: RegExp) => (value.match(regex) || []).length;

const averageChecks = (checks: AuditCheck[], ids: string[]) => {
  const selected = checks.filter((check) => ids.includes(check.id));
  if (!selected.length) return 0;
  return Math.round((selected.reduce((total, check) => total + check.score, 0) / (selected.length * 10)) * 100);
};

const getReportSummary = (auditType: AuditType, score: number, host: string, offerTitle: string) => {
  const baseline =
    score >= 82
      ? `The ${host} audit shows a strong foundation.`
      : score >= 62
        ? `The ${host} audit shows a workable foundation with clear growth gaps.`
        : `The ${host} audit found blockers that should be fixed before scaling spend or content.`;

  const focus: Record<AuditType, string> = {
    seo: 'SEO priority: improve crawlability, intent-matched content depth, structured data, internal links, and conversion paths that turn organic traffic into qualified leads.',
    ai: 'AI visibility priority: make the page easier for answer engines to parse, cite, and trust with clear summaries, proof, FAQs, schema, and entity signals.',
    branding: 'Branding priority: sharpen the first-screen message, proof, visual trust signals, social credibility, and CTA clarity so buyers understand why they should choose you.',
    social: 'Social media priority: strengthen share metadata, social proof, founder or team authority, content handoff, and lead capture from attention into CRM follow-up.',
    llm: 'LLM priority: expose machine-readable discovery signals, AI crawler access, llm.txt, Content Signals, schema, concise summaries, and source-of-truth pages.'
  };

  return `${offerTitle} for ${host}. ${baseline} ${focus[auditType]}`;
};

const buildCategoryScores = (auditType: AuditType, checks: AuditCheck[]) => {
  const common = {
    seo: [
      { label: 'Technical SEO', ids: ['https', 'title', 'description', 'h1', 'canonical', 'robots', 'sitemap'], detail: 'Indexability, metadata, headings, canonicals, robots, and sitemap access.' },
      { label: 'Content Depth', ids: ['headings', 'content-depth', 'schema', 'links'], detail: 'Depth, structure, schema, and internal discovery paths.' },
      { label: 'Lead Readiness', ids: ['cta', 'proof', 'tracking'], detail: 'Conversion prompts, proof, and measurement signals.' }
    ],
    ai: [
      { label: 'Answer Readiness', ids: ['summary', 'faq', 'headings', 'content-depth'], detail: 'Clear summaries, questions, headings, and substantial context.' },
      { label: 'Entity Trust', ids: ['schema', 'proof', 'about', 'canonical'], detail: 'Structured data, proof, source-of-truth pages, and canonical clarity.' },
      { label: 'AI Access', ids: ['ai-bots', 'llm', 'links'], detail: 'Crawler access, llm.txt, and internal links for machine discovery.' }
    ],
    branding: [
      { label: 'Positioning', ids: ['title', 'h1', 'description', 'cta'], detail: 'First-screen clarity, offer language, and next-step clarity.' },
      { label: 'Trust', ids: ['proof', 'case-study', 'social-links', 'contact'], detail: 'Proof, social presence, case-study access, and contact confidence.' },
      { label: 'Creative System', ids: ['logo', 'image-alt', 'og', 'tracking'], detail: 'Brand assets, visual accessibility, social previews, and measurement.' }
    ],
    social: [
      { label: 'Share Readiness', ids: ['og', 'twitter-card', 'share-image', 'title', 'description'], detail: 'Metadata that controls previews on LinkedIn, X, Slack, and social feeds.' },
      { label: 'Social Trust', ids: ['social-links', 'proof', 'video', 'case-study'], detail: 'Profiles, proof content, video signals, and market credibility.' },
      { label: 'Conversion Handoff', ids: ['cta', 'tracking', 'links'], detail: 'Routing social attention into useful next steps and attribution.' }
    ],
    llm: [
      { label: 'Crawler Access', ids: ['ai-bots', 'robots', 'content-signal', 'llm'], detail: 'AI bot access, robots rules, Content Signals, and llm.txt discovery.' },
      { label: 'Machine Context', ids: ['schema', 'summary', 'faq', 'headings'], detail: 'Structured answers, schema, headings, and parseable page structure.' },
      { label: 'Authority Signals', ids: ['about', 'proof', 'canonical', 'links'], detail: 'Entity proof, canonical source-of-truth, and internal relationship signals.' }
    ]
  }[auditType];

  return common.map((category) => ({
    label: category.label,
    score: averageChecks(checks, category.ids),
    detail: category.detail
  }));
};

export const reportEmailHtml = (report: AuditReport) => `
  <div style="font-family:Inter,Arial,sans-serif;background:#F3F0EA;color:#0A0A0A;padding:32px;border-radius:0">
    <div style="display:flex;align-items:center;gap:12px">
      <div style="width:42px;height:42px;background:#0A0A0A;color:#F3F0EA;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:24px">Q</div>
      <p style="color:#00C2A8;text-transform:uppercase;letter-spacing:2px;font-size:12px;margin:0">Qognition Audit Report</p>
    </div>
    <h1 style="font-size:32px;margin:8px 0 12px">Your audit score is ${report.score}/100</h1>
    <p style="color:#6E6A60;line-height:1.6">${escapeHtml(report.summary)}</p>
    <p><strong>URL:</strong> ${escapeHtml(report.normalizedUrl)}</p>
    ${
      report.categoryScores?.length
        ? `<h2 style="margin-top:28px">Category scores</h2><ul>${report.categoryScores
            .map((category) => `<li style="margin:8px 0"><strong>${escapeHtml(category.label)}:</strong> ${category.score}/100 - ${escapeHtml(category.detail)}</li>`)
            .join('')}</ul>`
        : ''
    }
    <h2 style="margin-top:28px">Top recommendations</h2>
    <ul>${report.recommendations.map((item) => `<li style="margin:8px 0">${escapeHtml(item)}</li>`).join('')}</ul>
    <h2 style="margin-top:28px">Checks</h2>
    <ul>${report.checks
      .map((check) => `<li style="margin:8px 0"><strong>${escapeHtml(check.label)}:</strong> ${escapeHtml(check.status)} - ${escapeHtml(check.detail)}</li>`)
      .join('')}</ul>
    <p style="color:#6E6A60;line-height:1.6">A branded PDF copy is attached for your team.</p>
    <p style="margin-top:28px"><a href="https://cal.com/qognition-agency/15min" style="background:#00C2A8;color:#003F38;padding:12px 18px;text-decoration:none;font-weight:700">Book a strategy call</a></p>
  </div>
`;

/** Resolve an audit type to its offer, falling back to the SEO audit. */
export const resolveAuditOffer = (auditType?: string): AuditOffer =>
  AUDIT_OFFERS.find((item) => item.type === auditType) || AUDIT_OFFERS[0];

/**
 * Infer which audit a lead wants from the page they submitted on, so
 * /api/lead can run the right report without the client having to say.
 * e.g. "/free-llm-audit" -> llm, "/automation/audit" -> ai.
 */
export const auditTypeForSourcePage = (sourcePage: string): AuditType => {
  const slug = sourcePage.split('?')[0].split('/').filter(Boolean)[0] || '';
  const offer = getAuditOfferBySlug(slug);
  if (offer) return offer.type;

  const spokeDefaults: Record<string, AuditType> = {
    marketing: 'seo',
    tech: 'seo',
    finance: 'branding',
    automation: 'ai'
  };
  return spokeDefaults[slug] || 'seo';
};

/**
 * Fetch the target page plus its robots/sitemap/llm.txt and score it.
 * Throws AuditError for anything the caller should surface to the user.
 */
export async function runAudit({
  url,
  email,
  auditType
}: {
  url: string;
  email: string;
  auditType?: AuditType;
  // pdfFilename is optional on AuditReport but this function always sets it —
  // encode that so callers can attach the PDF without a redundant fallback.
}): Promise<{ report: AuditReport & { pdfFilename: string }; offer: AuditOffer }> {
  const offer = resolveAuditOffer(auditType);
  const targetUrl = normalizeTargetUrl(url);
  const origin = targetUrl.origin;

  const htmlResponse = await fetchText(targetUrl.toString()).catch(() => null);
  if (!htmlResponse) {
    throw new AuditError('Could not fetch that public URL. Check the domain and try again.', 422);
  }
  if (!htmlResponse.ok || !htmlResponse.contentType.includes('text/html')) {
    throw new AuditError(`Could not audit an HTML page at that URL. Status: ${htmlResponse.status}`, 422);
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
  const bodyText = stripHtml(html);
  const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;
  const h2Count = countMatches(html, /<h2[\s>]/gi);
  const h3Count = countMatches(html, /<h3[\s>]/gi);
  const hasOg = lowerHtml.includes('property="og:') || lowerHtml.includes("property='og:");
  const hasTwitterCard = lowerHtml.includes('name="twitter:card"') || lowerHtml.includes("name='twitter:card'");
  const hasShareImage = /property=["']og:image["']|name=["']twitter:image["']/i.test(html);
  const imageCount = countMatches(html, /<img[\s>]/gi);
  const imageAltCount = countMatches(html, /<img[^>]+alt=["'][^"']+["']/gi);
  const hasCta = /\b(book|schedule|contact|get started|get audit|demo|quote|call|consultation|strategy)\b/i.test(bodyText);
  const hasProof = /\b(case stud|testimonial|client|review|result|roi|revenue|award|certified|partner|portfolio)\b/i.test(bodyText);
  const hasCaseStudy = /case-stud|\/case-studies|\/work\b/i.test(lowerHtml);
  const hasSocialLinks = /(linkedin\.com|instagram\.com|facebook\.com|youtube\.com|x\.com|twitter\.com|tiktok\.com|pinterest\.com)/i.test(html);
  const hasTracking = /(googletagmanager|gtag\(|google-analytics|hubspot|hs-scripts|clarity|hotjar|fbq\()/i.test(html);
  const hasLogoSignal = /logo|brand|favicon|apple-touch-icon/i.test(html);
  const hasContactSignal = /(mailto:|tel:|\/contact|contact us|book a call|strategy call)/i.test(html);
  const hasVideoSignal = /(youtube\.com|youtu\.be|vimeo\.com|tiktok\.com|video|reels|shorts)/i.test(html);
  const hasFaqSignal = /\?|faq|frequently asked|question/i.test(bodyText) && countMatches(bodyText, /\?/g) >= 2;
  const hasSummarySignal = /tl;dr|summary|key takeaways|quick answer|in short|what you need to know/i.test(bodyText);
  const hasAboutSignal = /(\/about|\/team|leadership|founder|author|expert|experience|credentials)/i.test(html);
  const responseIsFast = htmlResponse.durationMs <= 2500;

  const commonChecks: Record<string, AuditCheck> = {
    https: makeCheck('https', 'HTTPS', targetUrl.protocol === 'https:', 'The audited URL should use HTTPS for trust and browser security.'),
    title: makeCheck('title', 'Title tag', title.length >= 20 && title.length <= 70, title ? `Found "${title.slice(0, 80)}"` : 'No title tag found.', Boolean(title)),
    description: makeCheck('description', 'Meta description', description.length >= 70 && description.length <= 170, description ? `Found ${description.length} characters.` : 'No meta description found.', Boolean(description)),
    h1: makeCheck('h1', 'Single H1', h1s.length === 1, `Found ${h1s.length} H1 tag${h1s.length === 1 ? '' : 's'}.`, h1s.length > 0),
    canonical: makeCheck('canonical', 'Canonical URL', canonical.length > 0, canonical ? `Canonical points to ${canonical}.` : 'No canonical link found.'),
    robots: makeCheck('robots', 'Robots.txt', robotsResponse.ok, robotsResponse.ok ? 'robots.txt is reachable.' : 'robots.txt could not be reached.'),
    sitemap: makeCheck('sitemap', 'XML sitemap', sitemapResponse.ok && /<urlset|<sitemapindex/i.test(sitemapResponse.text), sitemapResponse.ok ? 'sitemap.xml is reachable.' : 'sitemap.xml could not be reached.', sitemapResponse.ok),
    'ai-bots': makeCheck('ai-bots', 'AI bot access', aiBotsAllowed, aiBotsAllowed ? 'Major AI/search bots are not blocked at the root.' : 'One or more AI/search bots may be blocked in robots.txt.', Boolean(robots)),
    llm: makeCheck('llm', 'LLM discovery file', hasLlmTxt, hasLlmTxt ? 'llm.txt is available.' : 'llm.txt was not found.', false),
    'content-signal': makeCheck('content-signal', 'Content Signals', hasContentSignal, hasContentSignal ? 'Content-Signal preferences are declared.' : 'No Content-Signal directive found.', false),
    schema: makeCheck('schema', 'JSON-LD schema', jsonLdCount > 0, jsonLdCount ? `Found ${jsonLdCount} JSON-LD block${jsonLdCount === 1 ? '' : 's'}.` : 'No JSON-LD schema found.'),
    links: makeCheck('links', 'Internal links', sameHostLinks >= 10, `Found ${sameHostLinks} same-host link${sameHostLinks === 1 ? '' : 's'} in the page HTML.`, sameHostLinks > 0),
    og: makeCheck('og', 'Open Graph tags', hasOg, 'Open Graph tags help social and AI previews understand the page.', false),
    'twitter-card': makeCheck('twitter-card', 'Twitter/X card', hasTwitterCard, hasTwitterCard ? 'Twitter card metadata is present.' : 'No Twitter/X card metadata found.', false),
    'share-image': makeCheck('share-image', 'Share image', hasShareImage, hasShareImage ? 'A share preview image is defined.' : 'No social share image found.', false),
    headings: makeCheck('headings', 'Heading structure', h2Count >= 2 && h3Count >= 1, `Found ${h2Count} H2 and ${h3Count} H3 headings.`, h2Count >= 1),
    'content-depth': makeCheck('content-depth', 'Content depth', wordCount >= 650, `Found roughly ${wordCount} visible words in the HTML response.`, wordCount >= 300),
    cta: makeCheck('cta', 'Conversion CTA', hasCta, hasCta ? 'The page includes direct conversion language.' : 'No clear book/contact/demo/audit CTA language found.'),
    proof: makeCheck('proof', 'Proof signals', hasProof, hasProof ? 'Proof language such as case studies, clients, results, testimonials, or awards appears on the page.' : 'No strong proof language found.'),
    tracking: makeCheck('tracking', 'Tracking signals', hasTracking, hasTracking ? 'Analytics, CRM, or tracking scripts were detected.' : 'No analytics or CRM tracking signal found.', false),
    logo: makeCheck('logo', 'Logo and brand assets', hasLogoSignal, hasLogoSignal ? 'Logo/favicon/brand asset signals were found.' : 'Logo or favicon signals were not obvious in the HTML.', false),
    'image-alt': makeCheck('image-alt', 'Image alt text', imageCount === 0 || imageAltCount / imageCount >= 0.7, imageCount ? `${imageAltCount} of ${imageCount} image tags include alt text.` : 'No image tags found.', imageAltCount > 0),
    'case-study': makeCheck('case-study', 'Case-study access', hasCaseStudy, hasCaseStudy ? 'Case-study or work links are visible.' : 'No obvious case-study or work link found.', false),
    'social-links': makeCheck('social-links', 'Social profile links', hasSocialLinks, hasSocialLinks ? 'Social profile links were found.' : 'No major social profile links found.', false),
    contact: makeCheck('contact', 'Contact path', hasContactSignal, hasContactSignal ? 'Contact, booking, email, or phone signal found.' : 'No obvious contact path found.'),
    video: makeCheck('video', 'Video/social content signals', hasVideoSignal, hasVideoSignal ? 'Video or social content signals were found.' : 'No obvious video or social content signal found.', false),
    faq: makeCheck('faq', 'FAQ or Q&A structure', hasFaqSignal, hasFaqSignal ? 'Question-and-answer style content appears on the page.' : 'No clear FAQ or Q&A structure found.', false),
    summary: makeCheck('summary', 'Concise summary', hasSummarySignal, hasSummarySignal ? 'A summary, TL;DR, quick answer, or key takeaways signal was found.' : 'No concise summary signal found.', false),
    about: makeCheck('about', 'Entity and author proof', hasAboutSignal, hasAboutSignal ? 'About, team, leadership, founder, author, or expertise signals appear in the HTML.' : 'No strong entity or author proof signal found.', false),
    speed: makeCheck('speed', 'HTML response speed', responseIsFast, `HTML fetched in ${htmlResponse.durationMs}ms from the audit server.`, htmlResponse.durationMs <= 5000)
  };

  const auditCheckIds: Record<AuditType, string[]> = {
    seo: ['https', 'title', 'description', 'h1', 'canonical', 'robots', 'sitemap', 'headings', 'content-depth', 'schema', 'links', 'cta', 'proof', 'tracking', 'speed'],
    ai: ['title', 'h1', 'description', 'summary', 'faq', 'headings', 'content-depth', 'schema', 'proof', 'about', 'canonical', 'links', 'ai-bots', 'llm'],
    branding: ['title', 'h1', 'description', 'logo', 'cta', 'proof', 'case-study', 'social-links', 'contact', 'image-alt', 'og', 'tracking'],
    social: ['og', 'twitter-card', 'share-image', 'title', 'description', 'social-links', 'proof', 'video', 'case-study', 'cta', 'tracking', 'links'],
    llm: ['ai-bots', 'robots', 'llm', 'content-signal', 'schema', 'summary', 'faq', 'headings', 'content-depth', 'about', 'proof', 'canonical', 'links']
  };

  const checks = auditCheckIds[offer.type].map((id) => commonChecks[id]);
  const score = Math.round(checks.reduce((total, check) => total + check.score, 0) / (checks.length * 10) * 100);
  const failedChecks = checks.filter((check) => check.status !== 'pass');
  const recommendations = failedChecks.slice(0, 5).map((check) => `${check.label}: ${check.detail}`);
  if (recommendations.length === 0) {
    recommendations.push('The first-pass audit looks strong. Next, compare page intent, competitors, conversion tracking, and CRM lead quality.');
  }

  const report: AuditReport & { pdfFilename: string } = {
    auditType: offer.type,
    url,
    normalizedUrl: targetUrl.toString(),
    email,
    score,
    summary: getReportSummary(offer.type, score, targetUrl.hostname, offer.shortTitle),
    checks,
    categoryScores: buildCategoryScores(offer.type, checks),
    recommendations,
    pdfFilename: `qognition-${offer.slug}-${targetUrl.hostname.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-audit.pdf`,
    generatedAt: new Date().toISOString()
  };

  return { report, offer };
}
