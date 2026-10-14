// Isolated contract tests. Every HTTP call is mocked; never sends a live lead or a live email.
// Operator 2026-10-14: Resend is the only lead acceptance boundary. GHL and Upstash are gone.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHmac } = require('node:crypto');
const ts = require('typescript');
const Module = require('node:module');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename);
const originalLoad = Module._load;
const pending = [];
Module._load = function(name, ...args) {
  if (name === 'next/server') return { NextResponse: { json: (body, init) => new Response(JSON.stringify(body), { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } }) }, after: fn => pending.push(fn) };
  return originalLoad.call(this, name, ...args);
};
global.fetch = async () => { throw new Error('Live network is forbidden in funnel tests'); };
const ROOT = path.join(__dirname, '..');
const { leadSchema } = require('../lib/validation.ts');
const { qualifyLead } = require('../lib/leadQualification.ts');
const { mergeAttribution } = require('../lib/analytics.ts');
const { leadCopy, LEAD_LOCALES } = require('../lib/leadCopy.ts');
const { readConsent, saveConsent, refreshConsentFromStorage, consentWasWithdrawn } = require('../lib/consent.ts');
const { normalizeLeadContext } = require('../lib/leadTaxonomy.ts');
const { POST } = require('../app/api/lead/route.ts');

/** The only lead configuration that exists now. */
const env = { VERCEL_ENV: 'production', RESEND_API_KEY: 'test-only', RESEND_FROM: 'hello@example.com' };
/** Retired settings. Set in some tests to prove nothing reads them any more. */
const RETIRED_ENV = {
  GHL_PRIVATE_INTEGRATION_TOKEN: 'test-only', GHL_LOCATION_ID: 'test-location', GHL_INQUIRY_FIELD_ID: 'inquiry', GHL_SUBMISSION_FIELD_ID: 'receipts',
  GHL_QUALIFICATION_FIELD_ID: 'eligibility', GHL_MARKETING_CONSENT_FIELD_ID: 'consent', GHL_LOCALE_FIELD_ID: 'locale',
  UPSTASH_REDIS_REST_URL: 'https://redis.example.com', UPSTASH_REDIS_REST_TOKEN: 'redis-test-only', LEAD_LEDGER_HMAC_SECRET: 'test-only-secret-at-least-32-characters',
  LEAD_EMAIL_FALLBACK: 'off',
};
const configured = () => { for (const key of Object.keys(RETIRED_ENV)) delete process.env[key]; Object.assign(process.env, env); delete process.env.QOGNITION_LEAD_MODE; };
const lead = () => leadSchema.parse({ service: 'marketing', intent: 'consultation', source_page: '/services/ai-seo', submission_id: 'request-001', event_id: 'request-001', contact: { name: 'Test Buyer', email: 'Buyer@Example.com', company_url: 'example.com', message: 'Technical search support' }, context: { locale: 'de' }, qualification: { business_model: 'b2b', employee_band: '20-99' }, consent: { email_marketing: false, analytics: false, advertising: false, recorded_at: '2026-09-24T00:00:00.000Z', policy_version: '2026-09-24' } });
const requestWith = (payload, headers = {}) => { const r = new Request('https://www.qognitionagency.com/api/lead', { method: 'POST', body: typeof payload === 'string' ? payload : JSON.stringify(payload), headers: { 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.1', ...headers } }); r.cookies = { get: () => undefined }; return r; };
const request = payload => requestWith(payload);
const quietly = async (fn, logged = []) => {
  const old = { info: console.info, warn: console.warn, error: console.error, log: console.log };
  for (const level of Object.keys(old)) console[level] = (...args) => logged.push([level, ...args]);
  try { return await fn(); } finally { Object.assign(console, old); }
};
/** Resend double. Records every request URL so a test can prove where the route went. */
const resendOnly = (options = {}) => {
  const sent = []; const urls = [];
  global.fetch = async (url, init = {}) => {
    urls.push(String(url));
    if (!String(url).startsWith('https://api.resend.com/')) throw Error('Unexpected external destination');
    sent.push(JSON.parse(init.body));
    return options.fails ? Response.json({ name: 'validation_error', message: 'to buyer@example.com rejected' }, { status: 422 }) : Response.json({ id: 'email-1' });
  };
  sent.urls = urls;
  return sent;
};
const toNotify = emails => emails.filter(m => m.to === 'hello@qognitionagency.com');
const cell = (html, label) => html.match(new RegExp(`>${label}</td>\\s*<td[^>]*>([^<]*)<`))?.[1];
const tests = [];
const test = (name, fn) => tests.push([name, fn]);

/* ── Schema, scoring, attribution, copy and consent (unchanged contracts) ─────────── */
test('preview cannot send a lead even when email delivery is configured', async () => {
  configured(); process.env.VERCEL_ENV = 'preview';
  let calls = 0; global.fetch = async () => { calls++; return Response.json({ id: 'email-1' }); };
  const response = await POST(request(lead()));
  assert.equal(response.status, 503); assert.equal(calls, 0);
  assert.equal((await response.json()).status, 'preview_disabled');
  configured();
});
test('legacy schema accepted and client lifecycle fields are stripped', () => {
  const result = leadSchema.parse({ service: 'tech', intent: 'contact', source_page: '/contact', contact: { name: 'Test', email: 'a@example.com' }, lifecycle: 'SQL' });
  assert.equal(result.lifecycle, undefined); assert.equal(result.service, 'tech');
});
// Operator 2026-10-14: every lead arrives through /contact (intent 'contact', or 'audit'), and the
// form no longer asks business model, revenue or company name. Fit is scored on what is still asked.
test('only fit plus a service request yields MQL; SQL is never inferred', () => {
  assert.equal(qualifyLead(lead()).eligibility, 'MQL');
  assert.equal(qualifyLead({ ...lead(), qualification: undefined }).eligibility, 'Lead');
  assert.equal(qualifyLead({ ...lead(), intent: 'newsletter' }).eligibility, 'Lead');
  assert.equal(qualifyLead({ ...lead(), intent: 'audit' }).eligibility, 'MQL');
  assert.equal(qualifyLead({ ...lead(), intent: 'contact' }).eligibility, 'MQL');
  assert.equal(qualifyLead({ ...lead(), qualification: { business_model: 'b2c', employee_band: '20-99' } }).eligibility, 'Lead');
});
test('unasked fields never cost a lead its MQL: no business model, revenue, company name or marketing consent', () => {
  const short = { ...lead(), intent: 'contact', contact: { name: 'Test Buyer', email: 'buyer@example.com', company_url: 'https://example.com', message: 'AI search help' }, qualification: { employee_band: '100-300' }, consent: undefined };
  const result = qualifyLead(short);
  assert.equal(result.eligibility, 'MQL');
  for (const unasked of ['B2B fit', 'Company size or revenue', 'Service-related buying intent']) assert.equal(result.missing.includes(unasked), false, unasked);
  assert.equal(qualifyLead({ ...short, qualification: { employee_band: '100-300', business_model: 'unknown', revenue_band: 'unknown' } }).eligibility, 'MQL');
  assert.equal(qualifyLead({ ...short, qualification: { employee_band: '301+', business_model: 'mixed' } }).eligibility, 'MQL');
});
test('MQL needs a website, an in-band company size and a message', () => {
  const short = { ...lead(), intent: 'contact', contact: { name: 'Test Buyer', email: 'buyer@example.com', company_url: 'https://example.com', message: 'AI search help' }, qualification: { employee_band: '20-99' } };
  assert.equal(qualifyLead({ ...short, contact: { ...short.contact, company_url: '' } }).eligibility, 'Lead');
  assert.equal(qualifyLead({ ...short, contact: { ...short.contact, message: '   ' } }).eligibility, 'Lead');
  assert.ok(qualifyLead({ ...short, contact: { ...short.contact, message: undefined } }).missing.includes('What they want help with'));
  for (const band of ['1-19', 'unknown', undefined]) assert.equal(qualifyLead({ ...short, qualification: { employee_band: band } }).eligibility, 'Lead', String(band));
  // An older cached client that still sends revenue keeps its fit when staff was not answered.
  assert.equal(qualifyLead({ ...short, qualification: { revenue_band: '10m-50m' } }).eligibility, 'MQL');
  assert.equal(qualifyLead({ ...short, qualification: { employee_band: '20-99', business_model: 'b2c' } }).missing.includes('B2B fit'), true);
});
test('every leaf retains its ancestors, including children of declared overlaps', () => {
  const tax = require('../data/b2b/icp/icp-taxonomy.json'); let count = 0;
  for (const i of tax.industries) for (const s of i.sub_industries) for (const n of s.niches) for (const l of n.sub_niches) {
    const got = normalizeLeadContext({ subniche_id: l.id });
    assert.equal(got.industry_id, i.id); assert.equal(got.subindustry_id, s.id); assert.equal(got.niche_id, n.id); assert.equal(got.subniche_id, l.id); count++;
  }
  assert.equal(count, 8823);
  assert.throws(() => normalizeLeadContext({ industry_id: '02', subniche_id: '01.01.01.01' }));
  assert.throws(() => normalizeLeadContext({ subniche_id: '99.99.99.99' }));
  assert.throws(() => normalizeLeadContext({ industry_id: 'unknown' }));
  assert.equal(normalizeLeadContext({ industry_id: 'law-legal' }).industry_id, 'law-legal');
});
test('first touch and landing page stay fixed while last touch changes', () => {
  const first = mergeAttribution({}, { source: 'google' }, '/de/guide', 'google.com');
  const second = mergeAttribution(first, { source: 'linkedin' }, '/book', 'linkedin.com');
  assert.equal(second.first_touch.source, 'google'); assert.equal(second.last_touch.source, 'linkedin');
  assert.equal(second.landing_page, '/de/guide');
});
test('all launch languages have complete form copy', () => {
  for (const locale of LEAD_LOCALES) for (const value of Object.values(leadCopy(locale))) assert.equal(typeof value === 'string' && value.length > 0, true);
});
test('storage-denied consent choices do not throw and withdrawal unloads trackers', () => {
  let reloads = 0;
  global.window = { localStorage: { getItem() { throw Error('denied'); }, setItem() { throw Error('denied'); }, removeItem() { throw Error('denied'); } }, sessionStorage: { removeItem() { throw Error('denied'); } }, dispatchEvent() {}, location: { hostname: 'example.com', reload() { reloads++; } } };
  global.document = { get cookie() { throw Error('denied'); } };
  refreshConsentFromStorage();
  assert.equal(readConsent(), null);
  saveConsent(true, true); assert.equal(readConsent().advertising, true);
  saveConsent(false, false); assert.equal(readConsent().analytics, false); assert.equal(reloads, 1);
  assert.equal(consentWasWithdrawn({ analytics: true, advertising: false }, null), true);
  delete global.window; delete global.document; refreshConsentFromStorage();
});
test('API rejects newsletter without opt-in', async () => {
  configured(); let calls = 0; global.fetch = async () => { calls++; throw Error('No network'); };
  const response = await POST(request({ ...lead(), intent: 'newsletter' })); assert.equal(response.status, 400); assert.equal(calls, 0);
});
test('preview validation performs no external request and cannot report success', async () => {
  configured(); process.env.VERCEL_ENV = 'preview'; process.env.QOGNITION_LEAD_MODE = 'validate';
  let calls = 0; global.fetch = async () => { calls++; throw Error('No network'); };
  const response = await POST(request(lead())); const body = await response.json();
  assert.equal(response.status, 200); assert.equal(body.success, false); assert.equal(body.status, 'validated'); assert.equal(calls, 0);
  configured();
});

/* ── The Resend acceptance boundary ──────────────────────────────────────────────── */
test('Resend accepts: 200 emailed, hello@ notified before the response, confirmation after it', async () => {
  configured(); const sent = resendOnly(); pending.length = 0; const logged = [];
  const response = await quietly(() => POST(request(lead())), logged); const body = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual(body, { success: true, status: 'emailed', message: 'Your enquiry has been received.', submission_id: 'request-001', event_id: 'request-001' });
  assert.equal(sent.length, 1, 'internal notification is sent before responding'); assert.equal(sent[0].to, 'hello@qognitionagency.com');
  assert.equal(JSON.stringify(logged).includes('xample.com'), false); assert.equal(JSON.stringify(logged).includes('Technical search support'), false);
  assert.equal(pending.length, 1); await quietly(() => pending[0]());
  assert.equal(sent.length, 2, 'prospect confirmation fires after the response'); assert.equal(sent[1].to, 'Buyer@Example.com');
});
test('a success response carries no duplicate or fallback flag: neither can be known without storage', async () => {
  configured(); resendOnly(); pending.length = 0;
  const body = await (await quietly(() => POST(request(lead())))).json();
  assert.equal(Object.hasOwn(body, 'duplicate'), false); assert.equal(Object.hasOwn(body, 'fallback'), false);
});
test('without client references the route generates them', async () => {
  configured(); resendOnly(); pending.length = 0;
  const body = await (await quietly(() => POST(request({ ...lead(), submission_id: undefined, event_id: undefined })))).json();
  assert.equal(body.status, 'emailed'); assert.match(body.submission_id, /^[a-zA-Z0-9_-]{8,80}$/); assert.equal(body.event_id, body.submission_id);
});
test('Resend rejects: retryable 503 with the book-a-call message, no follow-ups, only status and error name logged', async () => {
  configured(); const sent = resendOnly({ fails: true }); pending.length = 0; const logged = [];
  const response = await quietly(() => POST(request(lead())), logged); const body = await response.json();
  assert.equal(response.status, 503); assert.equal(response.headers.get('Retry-After'), '30');
  assert.deepEqual({ success: body.success, retryable: body.retryable, code: body.code }, { success: false, retryable: true, code: 'unavailable' });
  assert.match(body.error, /book a call directly/);
  assert.equal(sent.length, 1); assert.equal(pending.length, 0);
  assert.ok(logged.some(l => l[1] === '[Lead] email_rejected' && l[2].status === 422 && l[2].name === 'validation_error'));
  assert.ok(logged.some(l => l[1] === '[Lead] capture_failed' && l[2].codes[0] === 'unavailable'));
  assert.equal(JSON.stringify(logged).includes('xample.com'), false); assert.equal(JSON.stringify(logged).includes('to buyer'), false);
});
test('Resend unconfigured (no API key): retryable 503, nothing sent, skip reason logged', async () => {
  configured(); delete process.env.RESEND_API_KEY; const sent = resendOnly(); pending.length = 0; const logged = [];
  const response = await quietly(() => POST(request(lead())), logged); const body = await response.json();
  assert.equal(response.status, 503); assert.equal(body.success, false); assert.equal(body.retryable, true); assert.equal(body.code, 'not_configured');
  assert.equal(sent.urls.length, 0); assert.equal(pending.length, 0);
  assert.ok(logged.some(l => l[1] === '[Lead] email_skipped' && l[2].reason === 'missing_api_key'));
  assert.deepEqual(logged.filter(l => l[1] === '[Lead] capture_failed'), [['error', '[Lead] capture_failed', { codes: ['not_configured'] }]]);
  configured();
});
test('Resend unconfigured (no sender): 503, logged as its own skip reason', async () => {
  configured(); delete process.env.RESEND_FROM; const sent = resendOnly(); const logged = [];
  assert.equal((await quietly(() => POST(request(lead())), logged)).status, 503);
  assert.equal(sent.urls.length, 0);
  assert.ok(logged.some(l => l[1] === '[Lead] email_skipped' && l[2].reason === 'missing_from'));
  configured();
});
test('a Resend call that aborts is a 503 and logs only allowlisted codes', async () => {
  configured(); pending.length = 0; const logged = [];
  global.fetch = async () => { throw new DOMException('The operation was aborted due to timeout', 'AbortError'); };
  const response = await quietly(() => POST(request(lead())), logged);
  assert.equal(response.status, 503); assert.equal(pending.length, 0);
  assert.deepEqual(logged, [['error', '[Lead] capture_failed', { codes: ['unavailable'] }]]);
});
test('no GHL or Upstash request is ever made, even with every retired variable still set', async () => {
  configured(); Object.assign(process.env, RETIRED_ENV, { NEXT_PUBLIC_META_PIXEL_ID: 'pixel-test', META_CAPI_ACCESS_TOKEN: 'test-only' });
  const urls = []; let failResend = false; pending.length = 0;
  global.fetch = async (url) => {
    urls.push(String(url));
    if (String(url).startsWith('https://graph.facebook.com/')) return Response.json({ events_received: 1 });
    if (String(url).startsWith('https://api.resend.com/')) return failResend ? new Response('no', { status: 503 }) : Response.json({ id: 'email-1' });
    throw Error('Unexpected external destination');
  };
  try {
    const consented = { ...lead(), consent: { ...lead().consent, advertising: true, basis: 'explicit' } };
    const ok = await (await quietly(() => POST(request(consented)))).json();
    assert.equal(ok.status, 'emailed', 'LEAD_EMAIL_FALLBACK=off no longer exists, so it cannot refuse the lead');
    for (const run of pending) await quietly(() => run());
    failResend = true; pending.length = 0;
    assert.equal((await quietly(() => POST(request({ ...consented, submission_id: 'request-retired-2', event_id: 'request-retired-2' })))).status, 503);
    assert.ok(urls.length >= 3);
    for (const url of urls) assert.ok(/^https:\/\/(api\.resend\.com|graph\.facebook\.com)\//.test(url), `unexpected request to ${url}`);
  } finally { delete process.env.NEXT_PUBLIC_META_PIXEL_ID; delete process.env.META_CAPI_ACCESS_TOKEN; configured(); }
});
test('the GHL and Upstash modules are gone and no server source names them', () => {
  for (const gone of ['lib/leadCrm.ts', 'lib/leadLedger.ts', 'scripts/test-support/lead-providers.cjs']) assert.equal(fs.existsSync(path.join(ROOT, gone)), false, `${gone} still exists`);
  const sources = ['app/api/lead/route.ts', 'lib/leadDelivery.ts', 'lib/validation.ts', 'lib/leadQualification.ts', 'app/api/integrations/status/route.ts', 'app/api/audit/route.ts', 'app/api/cal/webhook/route.ts', 'lib/audit/aiVisibility.ts', 'lib/contactForm.ts'];
  for (const file of sources) {
    const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
    assert.equal(/\bghl\b|gohighlevel|leadconnector|msgsndr|upstash|\bredis\b|LEAD_EMAIL_FALLBACK|LEAD_LEDGER/i.test(text), false, `${file} still references the retired stack`);
  }
});
// Owen L4, 2026-10-14: /contact is the only form, so bad page context must never cost the lead.
test('unresolvable taxonomy context is stripped and logged, and the lead is still accepted', async () => {
  configured(); const sent = resendOnly(); pending.length = 0; const logged = [];
  const bad = { ...lead(), submission_id: 'request-bad-taxonomy', event_id: 'request-bad-taxonomy', context: { industry_id: '02', subniche_id: '01.01.01.01', asset_id: 'free-ai-visibility-audit', page_id: '/contact', locale: 'de' } };
  const response = await quietly(() => POST(request(bad)), logged); const body = await response.json();
  assert.equal(response.status, 200); assert.equal(body.status, 'emailed');
  assert.deepEqual(logged.filter(l => l[1] === '[Lead] context_taxonomy_dropped'), [['warn', '[Lead] context_taxonomy_dropped', { code: 'invalid_taxonomy' }]]);
  assert.equal(JSON.stringify(logged).includes('01.01.01.01'), false, 'no supplied IDs in logs');
  assert.equal(JSON.stringify(logged).includes('xample.com'), false);
  // Only the taxonomy keys go; the audit tag, page and locale survive.
  assert.match(sent[0].subject, /^\[Free AI visibility audit\]/);
  await quietly(() => pending[0]());
  assert.equal(sent[1].html.includes('lang="de"'), true, 'locale survives into the confirmation');
});
test('honeypot receives the same success shape as a real send, logs a bare hit and sends nothing', async () => {
  configured(); resendOnly(); pending.length = 0;
  const real = await (await quietly(() => POST(request({ ...lead(), submission_id: 'request-shape' })))).json();
  let calls = 0; global.fetch = async () => { calls++; throw Error('No network'); }; pending.length = 0;
  // hp_field_q is the current trap; honeypot is what cached clients still send.
  for (const [field, id] of [['hp_field_q', 'request-bot'], ['honeypot', 'request-bot-legacy']]) {
    const logged = [];
    const response = await quietly(() => POST(request({ ...lead(), submission_id: id, contact: { ...lead().contact, email: `${id}@example.com` }, [field]: 'filled' })), logged); const bot = await response.json();
    assert.equal(response.status, 200, field); assert.deepEqual(Object.keys(bot).sort(), Object.keys(real).sort(), field);
    assert.equal(bot.success, true); assert.equal(bot.status, 'emailed'); assert.equal(bot.submission_id, id);
    assert.deepEqual(logged, [['info', '[Lead] honeypot_hit']], `${field}: one bare log line, no fields`);
  }
  assert.equal(calls, 0); assert.equal(pending.length, 0);
});
test('the rate limit runs before the honeypot, so a flooding bot is refused like anyone else', async () => {
  configured(); let calls = 0; global.fetch = async () => { calls++; throw Error('No network'); };
  const statuses = [];
  for (let i = 0; i < 31; i++) statuses.push((await quietly(() => POST(request({ ...lead(), submission_id: `request-flood-${i}`, contact: { ...lead().contact, email: `bot${i}@example.com` }, hp_field_q: 'filled' })))).status);
  assert.deepEqual([statuses.slice(0, 30).every(s => s === 200), statuses[30]], [true, 429]);
  assert.equal(calls, 0);
});
test('LeadForm names its trap hp_field_q, which no autofill rule matches, and sends it under that key', () => {
  const form = fs.readFileSync(path.join(ROOT, 'components/shared/LeadForm.tsx'), 'utf8');
  assert.match(form, /name="hp_field_q"/); assert.equal(form.includes('website_trap'), false);
  assert.match(form, /hp_field_q: honeypot/);
});
/* ── Anton F1.1, 2026-10-14: no cross-site or non-JSON posts ─────────────────────── */
test('a non-JSON content type is a 415 before anything is parsed or sent', async () => {
  configured(); const sent = resendOnly();
  for (const type of ['text/plain;charset=UTF-8', 'application/x-www-form-urlencoded', 'multipart/form-data; boundary=x', '']) {
    const response = await quietly(() => POST(requestWith(lead(), { 'content-type': type })));
    assert.equal(response.status, 415, type || 'empty');
  }
  assert.equal(sent.urls.length, 0);
  assert.equal((await quietly(() => POST(requestWith(lead(), { 'content-type': 'application/json; charset=utf-8' })))).status, 200, 'a charset parameter is fine');
});
test('a cross-site Origin or Sec-Fetch-Site is a 403 and sends nothing', async () => {
  configured(); const sent = resendOnly();
  for (const headers of [
    { origin: 'https://attacker.example' },
    { origin: 'https://www.qognitionagency.com.attacker.example' },
    { origin: 'http://www.qognitionagency.com' },
    { origin: 'null' },
    { 'sec-fetch-site': 'cross-site' },
    { origin: 'https://www.qognitionagency.com', 'sec-fetch-site': 'cross-site' },
  ]) assert.equal((await quietly(() => POST(requestWith(lead(), headers)))).status, 403, JSON.stringify(headers));
  assert.equal(sent.urls.length, 0);
});
test('same-origin, apex, same-site with no Origin, and no browser headers at all are accepted', async () => {
  configured(); const sent = resendOnly();
  for (const [i, headers] of [
    { origin: 'https://www.qognitionagency.com', 'sec-fetch-site': 'same-origin' },
    { origin: 'https://qognitionagency.com', 'sec-fetch-site': 'same-site' },
    { 'sec-fetch-site': 'same-site' },
    {},
  ].entries()) assert.equal((await quietly(() => POST(requestWith({ ...lead(), submission_id: `request-origin-${i}` }, headers)))).status, 200, JSON.stringify(headers));
  assert.equal(toNotify(sent).length, 4);
});
test('the current Vercel deployment host is allowed from VERCEL_URL or VERCEL_BRANCH_URL, never another preview', async () => {
  configured(); const sent = resendOnly();
  Object.assign(process.env, { VERCEL_URL: 'qognition-abc123.vercel.app', VERCEL_BRANCH_URL: 'qognition-git-main-team.vercel.app' });
  try {
    for (const [i, host] of ['qognition-abc123.vercel.app', 'qognition-git-main-team.vercel.app'].entries()) assert.equal((await quietly(() => POST(requestWith({ ...lead(), submission_id: `request-vercel-${i}` }, { origin: `https://${host}` })))).status, 200, host);
    assert.equal((await quietly(() => POST(requestWith(lead(), { origin: 'https://someone-else.vercel.app' })))).status, 403);
  } finally { delete process.env.VERCEL_URL; delete process.env.VERCEL_BRANCH_URL; }
  assert.equal((await quietly(() => POST(requestWith(lead(), { origin: 'https://qognition-abc123.vercel.app' })))).status, 403, 'unset means not allowed');
  assert.equal(toNotify(sent).length, 2);
});
test('the project production .vercel.app alias is allowed from VERCEL_PROJECT_PRODUCTION_URL (Owen, low)', async () => {
  configured(); const sent = resendOnly();
  process.env.VERCEL_PROJECT_PRODUCTION_URL = 'qognition-agency.vercel.app';
  try { assert.equal((await quietly(() => POST(requestWith({ ...lead(), submission_id: 'request-alias' }, { origin: 'https://qognition-agency.vercel.app' })))).status, 200); }
  finally { delete process.env.VERCEL_PROJECT_PRODUCTION_URL; }
  assert.equal((await quietly(() => POST(requestWith(lead(), { origin: 'https://qognition-agency.vercel.app' })))).status, 403, 'unset means not allowed');
  assert.equal(toNotify(sent).length, 1);
});
test('local next dev: a localhost or 127.0.0.1 Origin with a port passes the origin check only outside production', async () => {
  configured(); let calls = 0; global.fetch = async () => { calls++; throw Error('No network'); };
  const local = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:4123'];
  try {
    delete process.env.VERCEL_ENV; process.env.QOGNITION_LEAD_MODE = 'validate';
    for (const origin of local) {
      const response = await quietly(() => POST(requestWith(lead(), { origin, 'sec-fetch-site': 'same-origin' })));
      assert.equal(response.status, 200, origin); assert.equal((await response.json()).status, 'validated', origin);
    }
    for (const origin of ['https://localhost:3000', 'http://localhost', 'http://localhost:3000.attacker.example', 'http://192.168.1.5:3000', 'http://localhost:3000/']) assert.equal((await quietly(() => POST(requestWith(lead(), { origin })))).status, 403, `not local dev: ${origin}`);
    configured(); assert.equal(process.env.VERCEL_ENV, 'production');
    for (const origin of local) assert.equal((await quietly(() => POST(requestWith(lead(), { origin })))).status, 403, `production refuses ${origin}`);
  } finally { configured(); }
  assert.equal(calls, 0);
});
/* ── Anton F2 (partial): one confirmation per mailbox, not per spelling ──────────── */
test('the confirmation limit ignores +tags, and dots on gmail.com and googlemail.com', async () => {
  configured(); const sent = resendOnly(); pending.length = 0;
  const as = (email, id) => ({ ...lead(), submission_id: id, contact: { ...lead().contact, email } });
  for (const [i, email] of ['buyer@gmail.com', 'Buyer+one@gmail.com', 'b.u.y.e.r@googlemail.com', 'buyer+x@GMAIL.com'].entries()) assert.equal((await quietly(() => POST(request(as(email, `request-gm-${i}`))))).status, 200);
  for (const [i, email] of ['first.last@example.com', 'firstlast@example.com', 'first.last+tag@example.com'].entries()) assert.equal((await quietly(() => POST(request(as(email, `request-ex-${i}`))))).status, 200);
  for (const run of pending) await quietly(() => run());
  assert.equal(toNotify(sent).length, 7, 'every lead is still accepted and notified');
  assert.deepEqual(sent.filter(m => m.to !== 'hello@qognitionagency.com').map(m => m.to), ['buyer@gmail.com', 'first.last@example.com', 'firstlast@example.com'], 'dots only collapse on Gmail; +tags collapse everywhere');
});
test('deliberate: a retry after a lost 200 re-sends the internal notification and reuses the event_id', async () => {
  configured(); Object.assign(process.env, { NEXT_PUBLIC_META_PIXEL_ID: 'pixel-test', META_CAPI_ACCESS_TOKEN: 'test-only' });
  const emails = []; const capi = []; pending.length = 0;
  global.fetch = async (url, init) => {
    if (String(url).startsWith('https://api.resend.com/')) { emails.push(JSON.parse(init.body)); return Response.json({ id: 'email-1' }); }
    if (String(url).startsWith('https://graph.facebook.com/')) { capi.push(JSON.parse(init.body)); return Response.json({ events_received: 1 }); }
    throw Error('Unexpected external destination');
  };
  try {
    const retried = { ...lead(), consent: { ...lead().consent, advertising: true, basis: 'explicit' } };
    const bodies = [];
    for (let i = 0; i < 2; i++) bodies.push(await (await quietly(() => POST(request(retried)))).json());
    for (const run of pending) await quietly(() => run());
    assert.deepEqual(bodies.map(b => [b.status, b.event_id]), [['emailed', 'request-001'], ['emailed', 'request-001']]);
    assert.equal(toNotify(emails).length, 2, 'no ledger, so the internal notification is sent again');
    assert.deepEqual(capi.map(b => b.data[0].event_id), ['request-001', 'request-001'], 'Meta dedups the repeat on the shared event_id');
    assert.equal(emails.filter(m => m.to === 'Buyer@Example.com').length, 1, 'the prospect is still mailed once per day');
  } finally { delete process.env.NEXT_PUBLIC_META_PIXEL_ID; delete process.env.META_CAPI_ACCESS_TOKEN; configured(); }
});
test('one prospect confirmation per address per day; the repeat lead is still accepted', async () => {
  configured(); const sent = resendOnly(); pending.length = 0;
  for (const id of ['request-repeat-1', 'request-repeat-2']) assert.equal((await (await quietly(() => POST(request({ ...lead(), submission_id: id })))).json()).status, 'emailed');
  for (const run of pending) await quietly(() => run());
  assert.equal(toNotify(sent).length, 2); assert.equal(sent.filter(m => m.to === 'Buyer@Example.com').length, 1);
});
test('a failed prospect confirmation after success is logged by kind only and never undoes the lead', async () => {
  configured(); let call = 0; const logged = []; pending.length = 0;
  global.fetch = async (url) => { if (!String(url).startsWith('https://api.resend.com/')) throw Error('Unexpected'); return ++call === 1 ? Response.json({ id: 'email-1' }) : new Response('no', { status: 500 }); };
  assert.equal((await (await quietly(() => POST(request(lead())), logged)).json()).status, 'emailed');
  await quietly(() => pending[0](), logged);
  assert.ok(logged.some(l => l[1] === '[Lead] downstream_delivery_failed' && l[2].kind === 'confirmation'));
  assert.equal(JSON.stringify(logged).includes('xample.com'), false);
});

/* ── Consent and Meta CAPI (Anton, 2026-10-07) ───────────────────────────────────── */
const withConsent = (consent, id) => ({ ...lead(), submission_id: id, consent: { ...lead().consent, analytics: true, advertising: true, ...consent } });
const capiHarness = () => {
  const capi = [], emails = [];
  Object.assign(process.env, { NEXT_PUBLIC_META_PIXEL_ID: 'pixel-test', META_CAPI_ACCESS_TOKEN: 'test-only' });
  global.fetch = async (url, init) => {
    if (String(url).startsWith('https://graph.facebook.com/')) { capi.push(JSON.parse(init.body)); return Response.json({ events_received: 1 }); }
    if (String(url).startsWith('https://api.resend.com/')) { emails.push(JSON.parse(init.body)); return Response.json({ id: 'email-1' }); }
    throw Error('Unexpected external destination');
  };
  return { capi, emails, done() { delete process.env.NEXT_PUBLIC_META_PIXEL_ID; delete process.env.META_CAPI_ACCESS_TOKEN; } };
};
test('schema accepts the consent basis and an empty recorded_at for a default, and legacy payloads without them', () => {
  assert.equal(leadSchema.parse(withConsent({ basis: 'region_default', recorded_at: '' })).consent.basis, 'region_default');
  assert.equal(leadSchema.parse(withConsent({ basis: 'explicit' })).consent.basis, 'explicit');
  assert.equal(leadSchema.parse(lead()).consent.basis, undefined);
  assert.equal(leadSchema.safeParse(withConsent({ basis: 'implied' })).success, false);
});
/* Owen re-review C: a tampered stored recorded_at used to make /api/lead return 400. */
test('schema: a consent recorded_at that is not a datetime is dropped, never a 400, and the rest of consent is kept', () => {
  for (const bad of ['yesterday', 'tampered', 42, null, '<b>2026-10-14T00:00:00.000Z</b>']) {
    const parsed = leadSchema.safeParse(withConsent({ basis: 'explicit', advertising: false, recorded_at: bad }));
    assert.equal(parsed.success, true, JSON.stringify(bad));
    assert.equal(Object.hasOwn(parsed.data.consent, 'recorded_at') && parsed.data.consent.recorded_at !== undefined, false, `${JSON.stringify(bad)} is dropped`);
    assert.deepEqual([parsed.data.consent.analytics, parsed.data.consent.advertising, parsed.data.consent.basis], [true, false, 'explicit'], JSON.stringify(bad));
  }
  assert.equal(leadSchema.parse(withConsent({ recorded_at: '2026-10-14T00:00:00.000Z' })).consent.recorded_at, '2026-10-14T00:00:00.000Z');
  assert.equal(leadSchema.parse(withConsent({ recorded_at: '' })).consent.recorded_at, '');
  const { recorded_at: _omitted, ...withoutTime } = lead().consent;
  assert.equal(leadSchema.safeParse({ ...lead(), consent: withoutTime }).success, true, 'absent is accepted too');
});
test('API: consent.recorded_at "tampered" returns 200 emailed, and the notification does not print it', async () => {
  configured(); const sent = resendOnly(); pending.length = 0;
  const body = { ...lead(), submission_id: 'request-badtime-1', consent: { ...lead().consent, recorded_at: 'tampered' } };
  const response = await quietly(() => POST(request(body)));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).status, 'emailed');
  const [note] = toNotify(sent);
  assert.equal(note.html.includes('tampered'), false);
  assert.equal(cell(note.html, 'Consent recorded'), 'not recorded');
});
test('Meta CAPI follows the consent basis, the server region and Sec-GPC', async () => {
  const cases = [
    ['region default in an opt-in region', { basis: 'region_default', recorded_at: '' }, { 'x-vercel-ip-country': 'DE' }, 0],
    ['region default with no country', { basis: 'region_default', recorded_at: '' }, {}, 0],
    ['legacy payload without a basis in an opt-in region', {}, { 'x-vercel-ip-country': 'GB' }, 0],
    ['region default in an opt-out region', { basis: 'region_default', recorded_at: '' }, { 'x-vercel-ip-country': 'US' }, 1],
    ['explicit yes in an opt-in region', { basis: 'explicit' }, { 'x-vercel-ip-country': 'DE' }, 1],
    ['explicit yes with Sec-GPC', { basis: 'explicit' }, { 'x-vercel-ip-country': 'US', 'sec-gpc': '1' }, 0],
    ['region default with Sec-GPC', { basis: 'region_default', recorded_at: '' }, { 'x-vercel-ip-country': 'US', 'sec-gpc': '1' }, 0],
  ];
  configured();
  for (const [name, consent, headers, expected] of cases) {
    const h = capiHarness(); pending.length = 0;
    try {
      const body = await (await quietly(() => POST(requestWith(withConsent(consent, `request-capi-${expected}-${cases.findIndex(c => c[0] === name)}`), headers)))).json();
      assert.equal(body.status, 'emailed', name); for (const run of pending) await quietly(() => run());
      assert.equal(h.capi.length, expected, name);
    } finally { h.done(); }
  }
});
test('an unconfigured Meta CAPI is swallowed without failing the confirmation', async () => {
  configured(); const sent = resendOnly(); pending.length = 0;
  const response = await quietly(() => POST(request({ ...lead(), consent: { ...lead().consent, advertising: true, basis: 'explicit' } })));
  assert.equal((await response.json()).status, 'emailed');
  await quietly(() => pending[0]()); assert.equal(sent.length, 2);
});
test('notification labels the consent basis, country and GPC', async () => {
  configured(); const sent = resendOnly();
  await quietly(() => POST(requestWith(withConsent({ basis: 'region_default', recorded_at: '' }, 'request-label-1'), { 'x-vercel-ip-country': 'US', 'sec-gpc': '1' })));
  await quietly(() => POST(requestWith(withConsent({ basis: 'explicit', advertising: false }, 'request-label-2'), { 'x-vercel-ip-country': 'de' })));
  const [defaulted, explicit] = toNotify(sent).map(m => m.html);
  for (const text of ['region default', 'Consent basis', 'Visitor country', '>US<', 'Global Privacy Control', 'no explicit choice']) assert.ok(defaulted.includes(text), `default notification lacks ${text}`);
  for (const text of ['explicit yes', '>no<', '>DE<', '>explicit<']) assert.ok(explicit.includes(text), `explicit notification lacks ${text}`);
  assert.deepEqual([cell(defaulted, 'Analytics'), cell(defaulted, 'Advertising')], ['region default', 'region default']);
  assert.deepEqual([cell(explicit, 'Analytics'), cell(explicit, 'Advertising')], ['explicit yes', 'no']);
});
test('/privacy and /privacy-policy redirect permanently to /legal/privacy', async () => {
  const config = (await import('../next.config.mjs')).default; const redirects = await config.redirects();
  for (const source of ['/privacy', '/privacy-policy']) assert.deepEqual(redirects.filter(r => r.source === source).map(r => [r.destination, r.permanent]), [['/legal/privacy', true]], source);
});
test('consent: rejects clear their own cookies every time, reload only on withdrawal; GPC denies default advertising', () => {
  const { effectiveConsent, consentEvidence } = require('../lib/consent.ts');
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const setup = ({ region = 'denied', gpc = false } = {}) => {
    const store = new Map(); const writes = []; let reloads = 0;
    global.window = { localStorage: { getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, v), removeItem: k => store.delete(k) }, sessionStorage: { removeItem() {} }, dispatchEvent() {}, location: { hostname: 'www.qognitionagency.com', reload() { reloads++; } } };
    global.document = { get cookie() { return '_ga=1; _gid=2; _fbp=3; _gcl_au=4; _lfa=5; session=6'; }, set cookie(v) { writes.push(v.split('=')[0]); }, documentElement: { getAttribute: () => region } };
    Object.defineProperty(globalThis, 'navigator', { value: { globalPrivacyControl: gpc }, configurable: true, writable: true });
    refreshConsentFromStorage();
    return { cleared: () => [...new Set(writes)].sort(), reloads: () => reloads };
  };
  try {
    let env = setup(); assert.equal(consentEvidence().basis, 'region_default'); assert.equal(consentEvidence().recorded_at, '');
    saveConsent(true, false); assert.deepEqual(env.cleared(), ['_fbp', '_gcl_au', '_lfa']); assert.equal(env.reloads(), 0, 'first reject in an opt-in region withdraws nothing');
    const evidence = consentEvidence(); assert.equal(evidence.basis, 'explicit'); assert.match(evidence.recorded_at, /^\d{4}-\d{2}-\d{2}T/);
    env = setup(); saveConsent(false, true); assert.deepEqual(env.cleared(), ['_ga', '_gid']); assert.equal(env.reloads(), 0);
    env = setup({ region: 'granted' }); saveConsent(false, false); assert.deepEqual(env.cleared(), ['_fbp', '_ga', '_gcl_au', '_gid', '_lfa']); assert.equal(env.reloads(), 1, 'rejecting a running default is a withdrawal');
    setup({ region: 'granted', gpc: true }); assert.deepEqual([effectiveConsent().analytics, effectiveConsent().advertising], [true, false]);
    // Anton F3: GPC wins over a stored advertising yes. Analytics keeps the stored choice.
    setup({ region: 'granted', gpc: true }); saveConsent(true, true);
    assert.deepEqual([effectiveConsent().analytics, effectiveConsent().advertising], [true, false], 'GPC beats an explicit advertising yes');
    assert.deepEqual([consentEvidence().basis, consentEvidence().advertising], ['explicit', false], 'the lead payload says no to advertising');
    setup({ region: 'denied', gpc: true }); saveConsent(false, true);
    assert.deepEqual([effectiveConsent().analytics, effectiveConsent().advertising], [false, false]);
    setup({ region: 'granted', gpc: false }); saveConsent(true, true); assert.equal(effectiveConsent().advertising, true, 'without GPC the stored yes stands');
  } finally {
    delete global.window; delete global.document; refreshConsentFromStorage();
    if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor); else delete globalThis.navigator;
  }
});
test('consent mode default script matches effectiveConsent(), including GPC in opt-out regions', () => {
  const vm = require('node:vm');
  const { effectiveConsent, consentModeScript, CONSENT_STORAGE_KEY, CONSENT_POLICY_VERSION, CONSENT_EVENT } = require('../lib/consent.ts');
  const g = v => (v ? 'granted' : 'denied');
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const stored = [null, { analytics: true, advertising: true }, { analytics: false, advertising: false }, { analytics: true, advertising: false }];
  try {
    // Owen re-review C: a stored choice whose recorded_at is not one saveConsent() could have
    // written counts as no choice, in the module and the inline script alike.
    for (const when of ['2026-10-07T00:00:00.000Z', 'tampered', '2026-02-30T00:00:00.000Z', 42, undefined]) for (const region of [true, false]) for (const gpc of [true, false]) for (const choice of stored) {
      const store = new Map();
      if (choice) store.set(CONSENT_STORAGE_KEY, JSON.stringify({ ...choice, recorded_at: when, policy_version: CONSENT_POLICY_VERSION }));
      const listeners = {};
      const win = { localStorage: { getItem: k => store.get(k) ?? null }, navigator: { globalPrivacyControl: gpc }, addEventListener: (name, fn) => { listeners[name] = fn; } };
      vm.runInNewContext(consentModeScript(region), { window: win });
      const label = `region=${g(region)} gpc=${gpc} stored=${JSON.stringify(choice)} recorded_at=${JSON.stringify(when)}`;
      // JSON round-trip: the signal object comes from the vm realm, whose Object prototype differs.
      const [command, mode, signal] = JSON.parse(JSON.stringify(Array.from(win.dataLayer[0])));
      assert.deepEqual([command, mode], ['consent', 'default'], label);
      // The same visitor, through the module the script gate reads.
      global.window = { localStorage: { getItem: k => store.get(k) ?? null } };
      global.document = { documentElement: { getAttribute: () => g(region) } };
      Object.defineProperty(globalThis, 'navigator', { value: { globalPrivacyControl: gpc }, configurable: true, writable: true });
      refreshConsentFromStorage();
      const expected = effectiveConsent();
      assert.deepEqual(signal, { analytics_storage: g(expected.analytics), ad_storage: g(expected.advertising), ad_user_data: g(expected.advertising), ad_personalization: g(expected.advertising) }, label);
      if (region && gpc && !choice) assert.deepEqual([signal.analytics_storage, signal.ad_storage], ['granted', 'denied'], `${label}: GPC denies advertising only`);
      // Anton F3: GPC denies all three advertising signals whatever was stored.
      if (gpc) assert.deepEqual([signal.ad_storage, signal.ad_user_data, signal.ad_personalization], ['denied', 'denied', 'denied'], `${label}: GPC wins`);
      if (choice && typeof when === 'string' && when.startsWith('2026-10')) assert.equal(signal.analytics_storage, g(choice.analytics), `${label}: stored analytics stands`);
      if (choice && when === 'tampered') assert.equal(signal.analytics_storage, g(region), `${label}: a tampered choice falls back to the region default`);
      listeners[CONSENT_EVENT]();
      const [, updateMode, updated] = JSON.parse(JSON.stringify(Array.from(win.dataLayer[1])));
      assert.equal(updateMode, 'update', label);
      if (gpc) assert.equal(updated.ad_storage, 'denied', `${label}: GPC wins on update too`);
    }
  } finally {
    delete global.window; delete global.document; refreshConsentFromStorage();
    if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor); else delete globalThis.navigator;
  }
});

/* ── Security review 2026-10-06 (Anton) ──────────────────────────────────────────── */
test('client IP ignores a spoofed cf-connecting-ip', () => {
  const { getAuditClientIp } = require('../lib/auditRateLimit.ts');
  const ip = headers => getAuditClientIp(new Request('https://www.qognitionagency.com/api/lead', { headers }));
  assert.equal(ip({ 'cf-connecting-ip': '203.0.113.9', 'x-real-ip': '198.51.100.7', 'x-forwarded-for': '192.0.2.1, 10.0.0.1' }), '198.51.100.7');
  assert.equal(ip({ 'cf-connecting-ip': '203.0.113.9', 'x-forwarded-for': '192.0.2.1, 10.0.0.1' }), '192.0.2.1');
  assert.equal(ip({ 'cf-connecting-ip': '203.0.113.9' }), 'unknown');
});
test('notification subject strips control characters, carries no em dash and is capped at 120', async () => {
  configured(); const sent = resendOnly();
  await quietly(() => POST(request({ ...lead(), source_page: '/x\r\nBcc: a@b.example\u2028' + 'y'.repeat(300), contact: { ...lead().contact, name: 'Test\u0000\u007f\u2029 Buyer' } })));
  const subject = sent[0].subject;
  assert.equal(/[\u0000-\u001f\u007f\u2028\u2029]/.test(subject), false); assert.equal(subject.includes('\u2014'), false); assert.ok(subject.length <= 120, `subject is ${subject.length} chars`);
  assert.match(subject, /Test Buyer/);
});
test('subject strips every Unicode control, format and separator character (Anton F5)', async () => {
  configured(); const sent = resendOnly();
  // U+0085 NEL (Cc), U+200B zero width space and U+202E right-to-left override (Cf), U+FEFF BOM (Cf).
  await quietly(() => POST(request({ ...lead(), contact: { ...lead().contact, name: 'Te\u0085st\u200b \u202eBuyer\ufeff' } })));
  assert.equal(/[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/u.test(sent[0].subject), false, JSON.stringify(sent[0].subject));
  assert.match(sent[0].subject, /Test Buyer/);
});
test('notification HTML escapes single quotes (Anton F5)', async () => {
  configured(); const sent = resendOnly();
  await quietly(() => POST(request({ ...lead(), contact: { ...lead().contact, name: "O'Brien' onmouseover='x" } })));
  assert.equal(sent[0].html.includes("O'Brien"), false); assert.ok(sent[0].html.includes('O&#39;Brien&#39; onmouseover=&#39;x'));
});
test('notification carries escaped consent evidence; confirmation carries the sender footer', async () => {
  configured(); const sent = resendOnly(); pending.length = 0;
  await quietly(() => POST(request({ ...lead(), submission_id: 'request-consent', consent: { ...lead().consent, email_marketing: true, policy_version: '<b>v1</b>' } })));
  await quietly(() => pending[0]());
  const [notification, confirmation] = sent;
  for (const text of ['request-consent', '&lt;b&gt;v1&lt;/b&gt;', '2026-09-24T00:00:00.000Z', 'Marketing email', 'Advertising']) assert.ok(notification.html.includes(text), `notification lacks ${text}`);
  assert.equal(notification.html.includes('<b>v1</b>'), false);
  assert.ok(confirmation.html.includes('hello@qognitionagency.com')); assert.ok(confirmation.html.includes('Qognition Agency'));
  assert.ok(confirmation.html.includes('You received this because this address was used to submit an enquiry on qognitionagency.com.'));
  assert.equal(/TODO|postal|placeholder/i.test(confirmation.html), false);
});
test('Meta CAPI requests are bounded and refuse redirects', async () => {
  const { sendMetaCapiEvent } = require('../lib/metaCapi.ts'); let seen;
  process.env.NEXT_PUBLIC_META_PIXEL_ID = 'pixel-test'; process.env.META_CAPI_ACCESS_TOKEN = 'test-only';
  global.fetch = async (url, init) => { seen = init; return Response.json({ events_received: 1 }); };
  try { await sendMetaCapiEvent({ eventName: 'Lead', eventId: 'request-capi', userData: { email: 'a@example.com' } }); }
  finally { delete process.env.NEXT_PUBLIC_META_PIXEL_ID; delete process.env.META_CAPI_ACCESS_TOKEN; }
  assert.equal(seen.redirect, 'error'); assert.ok(seen.signal instanceof AbortSignal);
});
test('failure diagnostics never print contact or provider content', () => {
  const { recordFailedLead } = require('../lib/leadDelivery.ts'); const old = console.error; const logged = [];
  console.error = (...args) => logged.push(args);
  try { recordFailedLead(lead(), { capture: 'provider body buyer@example.com Technical search support' }); } finally { console.error = old; }
  assert.deepEqual(logged, [['[Lead] capture_failed', { codes: ['unavailable'] }]]);
});

/* ── Integrations status ─────────────────────────────────────────────────────────── */
const statusGet = (headers = {}) => {
  const { GET } = require('../app/api/integrations/status/route.ts');
  return GET({ headers: new Headers(headers), nextUrl: new URL('https://www.qognitionagency.com/api/integrations/status') });
};
test('status endpoint reveals nothing without the shared secret', async () => {
  process.env.INTEGRATIONS_STATUS_SECRET = 'status-test-secret';
  try {
    assert.deepEqual(await (await statusGet()).json(), { ok: true });
    assert.deepEqual(await (await statusGet({ 'x-status-secret': 'wrong' })).json(), { ok: true });
    delete process.env.INTEGRATIONS_STATUS_SECRET;
    assert.deepEqual(await (await statusGet({ 'x-status-secret': '' })).json(), { ok: true });
  } finally { delete process.env.INTEGRATIONS_STATUS_SECRET; }
});
test('status reports Resend and Cal.com presence, and nothing about GHL, Upstash or a CRM', async () => {
  configured(); Object.assign(process.env, RETIRED_ENV, { INTEGRATIONS_STATUS_SECRET: 'status-test-secret', CALCOM_API_KEY: 'cal-test-only-key' });
  delete process.env.CALCOM_WEBHOOK_SECRET;
  try {
    let detail = await (await statusGet({ 'x-status-secret': 'status-test-secret' })).json();
    assert.equal(/ghl|upstash|redis|ledger|crm|fallback/i.test(JSON.stringify(detail)), false, JSON.stringify(detail));
    assert.equal(detail.resend.configured, true);
    assert.deepEqual([detail.calcom.apiKeyConfigured, detail.calcom.webhookSecretConfigured], [true, false]);
    assert.deepEqual([detail.capture.boundary, detail.capture.configured], ['resend', true]);
    assert.equal(JSON.stringify(detail).includes('cal-test-only-key'), false, 'a secret value is never echoed');
    process.env.CALCOM_WEBHOOK_SECRET = 'cal-webhook-test-secret'; delete process.env.RESEND_API_KEY;
    detail = await (await statusGet({ 'x-status-secret': 'status-test-secret' })).json();
    assert.equal(detail.calcom.webhookSecretConfigured, true); assert.equal(detail.resend.configured, false); assert.equal(detail.capture.configured, false);
    assert.equal(JSON.stringify(detail).includes('cal-webhook-test-secret'), false);
  } finally { delete process.env.INTEGRATIONS_STATUS_SECRET; delete process.env.CALCOM_API_KEY; delete process.env.CALCOM_WEBHOOK_SECRET; configured(); }
});

/* ── Operator 2026-10-14: the five-field /contact payload ────────────────────────── */
const shortLead = (id, extra = {}) => ({
  service: 'marketing', intent: 'contact', source_page: '/contact', submission_id: id, event_id: id,
  contact: { name: 'Test Buyer', email: 'buyer@example.com', company_url: 'example.com', message: 'Help us get named in AI answers' },
  qualification: { employee_band: '100-300' },
  consent: { analytics: false, advertising: false, basis: 'region_default', recorded_at: '', policy_version: '2026-10-07' },
  ...extra,
});
test('schema accepts the five-field payload with company, business model, revenue and marketing consent absent or unknown', () => {
  assert.equal(leadSchema.safeParse(shortLead('request-short-schema')).success, true);
  const unknowns = shortLead('request-short-unknown', { qualification: { employee_band: '20-99', business_model: 'unknown', revenue_band: 'unknown' }, contact: { ...shortLead('x').contact, company: '' } });
  assert.equal(leadSchema.safeParse(unknowns).success, true);
  assert.equal(leadSchema.safeParse(shortLead('request-short-noconsent', { consent: undefined })).success, true);
  // Older cached clients still submit the full payload, including the retired CRM tag.
  assert.equal(leadSchema.safeParse({ ...lead(), tag: 'lead magnet for ai readiness' }).success, true);
});
test('the notification shows the v4 MQL result, what is missing, and the scoring version', async () => {
  configured(); const sent = resendOnly();
  await quietly(() => POST(request(shortLead('request-mql'))));
  await quietly(() => POST(request(shortLead('request-thin', { contact: { name: 'Test Buyer', email: 'buyer@example.com', message: '' }, qualification: { employee_band: 'unknown' } }))));
  const [mql, thin] = toNotify(sent).map(m => m.html);
  assert.equal(cell(mql, 'Qualification'), 'MQL'); assert.equal(cell(mql, 'Missing for MQL'), 'nothing');
  assert.equal(cell(mql, 'Scoring version'), '2026-10-b2b-v4');
  assert.equal(cell(thin, 'Qualification'), 'Lead');
  assert.equal(cell(thin, 'Missing for MQL'), 'Company website, Company size, What they want help with');
});
// Owen F1, 2026-10-14: the hello@ email is the only lead record, so it must say where the lead came from.
const firstLeaf = () => { const t = require('../data/b2b/icp/icp-taxonomy.json'); const i = t.industries[0], si = i.sub_industries[0], n = si.niches[0], l = n.sub_niches[0]; return { industry: i.id, sub: si.id, niche: n.id, leaf: l.id }; };
const attributed = (id, extra = {}) => shortLead(id, {
  context: { page_id: '/industries/insurance', stage: 'bofu', asset_id: 'free-ai-visibility-audit', subniche_id: firstLeaf().leaf },
  attribution: { first_touch: { source: 'linkedin', medium: 'paid', campaign: 'insurance-q4' }, last_touch: { source: 'google', medium: 'organic' }, landing_page: '/industries/insurance?utm_source=linkedin', referrer_host: 'www.linkedin.com' },
  ...extra,
});
const SOURCE_ROWS = ['Started on', 'Funnel stage', 'Offer', 'Industry ID', 'Sub-industry ID', 'Niche ID', 'Sub-niche ID', 'First campaign', 'Last campaign', 'Landing page', 'Referred by'];
test('the notification says where the lead came from: page, stage, offer, taxonomy and both campaign touches', async () => {
  configured(); const sent = resendOnly();
  assert.equal((await quietly(() => POST(request(attributed('request-source'))))).status, 200);
  const [{ html }] = toNotify(sent); const leaf = firstLeaf();
  assert.deepEqual(Object.fromEntries(SOURCE_ROWS.map(label => [label, cell(html, label)])), {
    'Started on': '/industries/insurance', 'Funnel stage': 'Ready to buy (bofu)', 'Offer': 'free-ai-visibility-audit',
    'Industry ID': leaf.industry, 'Sub-industry ID': leaf.sub, 'Niche ID': leaf.niche, 'Sub-niche ID': leaf.leaf,
    'First campaign': 'linkedin / paid / insurance-q4', 'Last campaign': 'google / organic',
    'Landing page': '/industries/insurance?utm_source=linkedin', 'Referred by': 'www.linkedin.com',
  });
  assert.equal(cell(html, 'Source'), '/contact', 'the posting page is still shown');
  assert.equal(html.includes('UTM:'), false, 'the first campaign is a row now, not a second footer line');
});
test('Owen repro: sendLeadNotification alone carries page_id, stage, both touches, landing page and referrer', async () => {
  configured(); const sent = resendOnly();
  const { sendLeadNotification } = require('../lib/leadDelivery.ts');
  await sendLeadNotification(leadSchema.parse({ service: 'marketing', intent: 'contact', source_page: '/contact', contact: { name: 'Test Buyer', email: 'buyer@example.com', company_url: 'example.com', message: 'help' }, context: { page_id: '/industries/insurance', stage: 'bofu', industry_id: '01' }, attribution: { first_touch: { source: 'linkedin', medium: 'paid', campaign: 'insurance-q4' }, last_touch: { source: 'google', medium: 'organic' }, landing_page: '/industries/insurance?utm_source=linkedin', referrer_host: 'www.linkedin.com' } }));
  for (const needle of ['/industries/insurance', 'insurance-q4', 'organic', 'utm_source=linkedin', 'linkedin.com', 'bofu']) assert.ok(sent[0].html.includes(needle), needle);
});
test('source rows are omitted when empty, and an older client that sends only utm still shows its first campaign', async () => {
  configured(); const sent = resendOnly();
  await quietly(() => POST(request(shortLead('request-bare'))));
  await quietly(() => POST(request(shortLead('request-utm-only', { utm: { source: 'newsletter', campaign: 'oct' } }))));
  const [bare, utmOnly] = toNotify(sent).map(m => m.html);
  for (const label of SOURCE_ROWS) assert.equal(cell(bare, label), undefined, `empty ${label} rendered`);
  assert.equal(cell(utmOnly, 'First campaign'), 'newsletter / oct');
});
test('hostile page context and attribution are escaped in the notification', async () => {
  configured(); const sent = resendOnly();
  const hostile = `/x"><img src=x onerror=alert(1)>'`;
  await quietly(() => POST(request(attributed('request-hostile', {
    context: { page_id: hostile, stage: 'bofu' },
    attribution: { first_touch: { source: '<b>src</b>' }, last_touch: { campaign: "<script>x</script>" }, landing_page: hostile, referrer_host: '"><svg onload=x>' },
  }))));
  const [{ html }] = toNotify(sent);
  for (const raw of ['<img', '<b>src', '<script>', '<svg']) assert.equal(html.includes(raw), false, `unescaped ${raw}`);
  assert.equal(cell(html, 'Started on'), '/x&quot;&gt;&lt;img src=x onerror=alert(1)&gt;&#39;');
  assert.ok(html.includes('&lt;script&gt;x&lt;/script&gt;')); assert.ok(html.includes('&quot;&gt;&lt;svg onload=x&gt;'));
});
test('LeadForm marks its root for Clarity masking, so form contents never enter a session recording', () => {
  const form = fs.readFileSync(path.join(ROOT, 'components/shared/LeadForm.tsx'), 'utf8');
  assert.match(form, /<form ref=\{formRef\}[^>]*data-clarity-mask="true"/);
});
test('an audit request tagged by funnel context reaches the notification subject and rows', async () => {
  // Same constant Mira's /contact and /free-ai-audit use, so client and server cannot drift.
  const { AUDIT_ASSET_ID, readFunnelContext } = require('../lib/funnelContext.ts');
  const fromUrl = readFunnelContext(new URLSearchParams(`asset_id=${AUDIT_ASSET_ID}&page_id=/free-ai-audit&stage=bofu`));
  // Tagged by context alone (intent 'contact'), to prove the context tag is enough by itself.
  const tagged = shortLead('request-short-audit', { context: fromUrl });
  assert.equal(leadSchema.parse(tagged).context.asset_id, AUDIT_ASSET_ID);
  configured(); const sent = resendOnly(); pending.length = 0;
  assert.equal((await (await quietly(() => POST(request(tagged)))).json()).status, 'emailed');
  const [mail] = toNotify(sent);
  assert.match(mail.subject, /^\[Free AI visibility audit\] Test Buyer/);
  assert.equal(cell(mail.html, 'Request'), 'Free AI visibility audit');
  assert.equal(cell(mail.html, 'Company size'), '100-300 staff');
});
test('intent audit from an older client is also an audit request; a plain enquiry is labelled as one', async () => {
  configured(); const sent = resendOnly(); pending.length = 0;
  await quietly(() => POST(request(shortLead('request-short-legacy-audit', { intent: 'audit' }))));
  await quietly(() => POST(request(shortLead('request-short-plain'))));
  const [audit, plain] = toNotify(sent);
  assert.match(audit.subject, /^\[Free AI visibility audit\]/);
  assert.equal(cell(plain.html, 'Request'), 'Enquiry');
  assert.equal(/Free AI visibility audit/.test(plain.subject), false);
});
// Ruth, 2026-10-14: "marketing" is the retired spoke and never leads a notification subject.
test('non-audit notifications lead with [Enquiry], newsletter signups with [Newsletter signup]', async () => {
  configured(); const sent = resendOnly(); pending.length = 0;
  await quietly(() => POST(request(shortLead('request-label-enquiry'))));
  await quietly(() => POST(request(shortLead('request-label-news', { intent: 'newsletter', consent: { ...shortLead('x').consent, email_marketing: true }, context: { asset_id: 'free-ai-visibility-audit' } }))));
  const [enquiry, newsletter] = toNotify(sent);
  assert.match(enquiry.subject, /^\[Enquiry\] Test Buyer/); assert.equal(/marketing/i.test(enquiry.subject), false);
  assert.equal(cell(enquiry.html, 'Request'), 'Enquiry');
  for (const { html } of [enquiry, newsletter]) assert.equal(/>Spoke</.test(html), false, 'the retired spoke has no row in the notification');
  assert.match(newsletter.subject, /^\[Newsletter signup\] Test Buyer/, 'newsletter wins over an inherited audit tag');
  assert.equal(cell(newsletter.html, 'Request'), 'Newsletter signup');
});

/* ── Cal.com BOOKING_CREATED webhook: walkthrough_booked, the North Star (§8) ─────── */
// Synthetic fixture. Every name and address is fake; nothing here is a real booking.
const CAL_SECRET = 'cal-webhook-test-secret-not-real';
const booking = (triggerEvent = 'BOOKING_CREATED', extra = {}, createdAt = new Date().toISOString()) => JSON.stringify({
  triggerEvent, createdAt,
  payload: {
    type: '15min', title: '15 Min Meeting between Qognition Agency and Test Attendee', uid: 'bk_test_0001', bookingId: 101,
    startTime: '2026-10-20T15:00:00.000Z', endTime: '2026-10-20T15:15:00.000Z',
    attendees: [{ name: 'Test Attendee', email: 'attendee@example.com', timeZone: 'America/Toronto' }],
    organizer: { name: 'Qognition Agency', email: 'organizer@example.com' },
    responses: { name: 'Test Attendee', email: 'attendee@example.com', notes: 'Private attendee note' },
    ...extra,
  },
});
const sign = (body, secret = CAL_SECRET) => createHmac('sha256', secret).update(body).digest('hex');
const calRequest = (body, signature) => new Request('https://www.qognitionagency.com/api/cal/webhook', { method: 'POST', body, headers: signature === undefined ? {} : { 'x-cal-signature-256': signature } });
const calPost = (...args) => require('../app/api/cal/webhook/route.ts').POST(calRequest(...args));
const ATTENDEE_PII = ['attendee@example.com', 'Test Attendee', 'Private attendee note', 'organizer@example.com', 'America/Toronto'];
const withCal = async (fn) => {
  configured(); process.env.CALCOM_WEBHOOK_SECRET = CAL_SECRET;
  let calls = 0; global.fetch = async () => { calls++; throw Error('No network from the webhook'); };
  try { return await fn(() => calls); } finally { delete process.env.CALCOM_WEBHOOK_SECRET; configured(); }
};
test('a signed BOOKING_CREATED records walkthrough_booked server-side with no attendee PII', () => withCal(async (calls) => {
  const body = booking(); const logged = [];
  const response = await quietly(() => calPost(body, sign(body)), logged);
  assert.equal(response.status, 200); assert.deepEqual(await response.json(), { received: true, event: 'walkthrough_booked' });
  const records = logged.filter(l => l[1] === '[Booking] walkthrough_booked');
  assert.equal(records.length, 1);
  assert.deepEqual(records[0][2], { booking_uid: 'bk_test_0001', event_type: '15min', start_time: '2026-10-20T15:00:00.000Z', analytics: 'recorded_only' });
  for (const pii of ATTENDEE_PII) assert.equal(JSON.stringify(logged).includes(pii), false, `log carries ${pii}`);
  assert.equal(calls(), 0, 'no analytics or provider request is made');
}));
test('a bad, missing or wrong-length signature is a 401 and records nothing', () => withCal(async (calls) => {
  const body = booking();
  for (const signature of [sign(body, 'a-different-secret'), sign(booking('BOOKING_CREATED', { uid: 'bk_other' })), undefined, '', 'not-hex', sign(body).slice(0, 32), `sha256=${sign(body)}`]) {
    const logged = [];
    const response = await quietly(() => calPost(body, signature), logged);
    assert.equal(response.status, 401, String(signature));
    assert.equal(logged.some(l => l[1] === '[Booking] walkthrough_booked'), false);
    assert.ok(logged.some(l => l[1] === '[Booking] webhook_signature_invalid'));
  }
  assert.equal(calls(), 0);
}));
test('with CALCOM_WEBHOOK_SECRET unset the webhook is a 503, logged as config missing, and records nothing', async () => {
  configured(); delete process.env.CALCOM_WEBHOOK_SECRET; const body = booking(); const logged = [];
  const response = await quietly(() => calPost(body, sign(body)), logged);
  assert.equal(response.status, 503);
  assert.deepEqual(logged.filter(l => l[1] === '[Booking] webhook_config_missing'), [['error', '[Booking] webhook_config_missing', { env: 'CALCOM_WEBHOOK_SECRET' }]]);
  assert.equal(logged.some(l => l[1] === '[Booking] walkthrough_booked'), false);
});
test('other signed triggers are acknowledged and never counted as a booking', () => withCal(async () => {
  for (const trigger of ['BOOKING_CANCELLED', 'BOOKING_RESCHEDULED', 'PING']) {
    const body = booking(trigger); const logged = [];
    const response = await quietly(() => calPost(body, sign(body)), logged);
    assert.equal(response.status, 200, trigger); assert.deepEqual(await response.json(), { received: true, ignored: true });
    assert.equal(logged.some(l => l[1] === '[Booking] walkthrough_booked'), false, trigger);
  }
}));
test('a signed body that is not JSON is a 400', () => withCal(async () => {
  const body = 'not json'; const response = await quietly(() => calPost(body, sign(body)));
  assert.equal(response.status, 400);
}));
test('unexpected field shapes are dropped from the record, never echoed', () => withCal(async () => {
  const body = booking('BOOKING_CREATED', { uid: 'attendee@example.com', type: 'Meeting with Test Attendee', startTime: 'tomorrow' }); const logged = [];
  assert.equal((await quietly(() => calPost(body, sign(body)), logged)).status, 200);
  const [record] = logged.filter(l => l[1] === '[Booking] walkthrough_booked');
  assert.deepEqual(record[2], { booking_uid: null, event_type: null, start_time: null, analytics: 'recorded_only' });
  for (const pii of ATTENDEE_PII) assert.equal(JSON.stringify(logged).includes(pii), false, `log carries ${pii}`);
}));
test('a preview deployment verifies the signature but never records the North Star', () => withCal(async () => {
  process.env.VERCEL_ENV = 'preview'; const body = booking(); const logged = [];
  const response = await quietly(() => calPost(body, sign(body)), logged);
  assert.equal(response.status, 200); assert.deepEqual(await response.json(), { received: true, preview: true });
  assert.equal(logged.some(l => l[1] === '[Booking] walkthrough_booked'), false);
  assert.equal((await quietly(() => calPost(body, sign(body, 'wrong')))).status, 401, 'the signature is still checked first');
}));
test('a declared Content-Length over 200 KB is refused before the body is read', () => withCal(async () => {
  let read = false;
  const fake = { headers: new Headers({ 'content-length': '200001', 'x-cal-signature-256': 'a'.repeat(64) }), text: async () => { read = true; return ''; } };
  const response = await quietly(() => require('../app/api/cal/webhook/route.ts').POST(fake));
  assert.equal(response.status, 413); assert.equal(read, false, 'the body was read');
}));
test('the body limit counts bytes, not UTF-16 units', () => withCal(async () => {
  const body = '\u00e9'.repeat(100_001); // 100,001 units, 200,002 bytes
  assert.equal((await quietly(() => calPost(body, sign(body)))).status, 413);
  const small = 'x'.repeat(200_001);
  assert.equal((await quietly(() => calPost(small, sign(small)))).status, 413);
}));
test('a BOOKING_CREATED older than 24 hours, or with no createdAt, is a replay and is not counted', () => withCal(async () => {
  const withoutCreatedAt = () => { const event = JSON.parse(booking()); delete event.createdAt; return JSON.stringify(event); };
  for (const createdAt of [new Date(Date.now() - 25 * 3600_000).toISOString(), 'omitted', null, 'yesterday']) {
    const body = createdAt === 'omitted' ? withoutCreatedAt() : booking('BOOKING_CREATED', {}, createdAt); const logged = [];
    const response = await quietly(() => calPost(body, sign(body)), logged);
    assert.equal(response.status, 200, String(createdAt)); assert.deepEqual(await response.json(), { received: true, ignored: true });
    assert.equal(logged.some(l => l[1] === '[Booking] walkthrough_booked'), false, String(createdAt));
    assert.ok(logged.some(l => l[1] === '[Booking] webhook_stale'), String(createdAt));
  }
  const fresh = booking('BOOKING_CREATED', {}, new Date(Date.now() - 23 * 3600_000).toISOString()); const logged = [];
  await quietly(() => calPost(fresh, sign(fresh)), logged);
  assert.ok(logged.some(l => l[1] === '[Booking] walkthrough_booked'), 'inside 24 hours still counts');
}));
test('the webhook note records the signature format as confirmed from source', () => {
  const text = fs.readFileSync(path.join(ROOT, 'app/api/cal/webhook/route.ts'), 'utf8');
  assert.equal(text.includes('[UNVERIFIED'), false); assert.match(text, /sendPayload\.ts/); assert.match(text, /Ping test/);
});

/* ── Ad click IDs and durable attribution (CLAUDE.md §8) ─────────────────────────── */
const { sanitizeClickIds, clickIdsFrom, CLICK_ID_KEYS } = require('../lib/clickIds.ts');
const { getAttribution } = require('../lib/analytics.ts');
const { CONSENT_STORAGE_KEY, CONSENT_POLICY_VERSION, ATTRIBUTION_DURABLE_KEY } = require('../lib/consent.ts');
const SESSION_KEY = 'qognition_attribution_v2';
const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.parse('2026-10-14T12:00:00.000Z');
const VALID_IDS = { gclid: 'test-gclid_001.a~b', wbraid: 'test-wbraid-001', gbraid: 'test-gbraid-001', li_fat_id: 'test-li-fat-001', msclkid: 'testmsclkid001' };
/** Each click ID carries its own capture time (Anton F5 / Owen F5). */
const iso = ms => new Date(ms).toISOString();
const AT = iso(NOW);
const stamp = (ids, at = AT) => Object.fromEntries(Object.entries(ids).map(([key, id]) => [key, { id, captured_at: at }]));
const STAMPED = stamp(VALID_IDS);
/** An explicit advertising yes, so the server keeps the click IDs (Anton F2). */
const AD_CONSENT = { analytics: true, advertising: true, basis: 'explicit', recorded_at: '2026-10-14T00:00:00.000Z', policy_version: '2026-10-14' };
const memoryStorage = () => { const m = new Map(); return { getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); }, removeItem: k => { m.delete(k); }, map: m }; };
const blockedStorage = () => ({ blocked: true, getItem() { throw Error('denied'); }, setItem() { throw Error('denied'); }, removeItem() { throw Error('denied'); } });
/** A browser double. `consent` is an explicit stored choice; omit it for no choice in an opt-in region.
 *  Blocked storage cannot hold a choice, so none is written to it (Owen F6: this guard used to
 *  compare two fresh function objects and so never skipped anything). */
const browser = ({ search = '', path = '/', consent, local = memoryStorage(), session = memoryStorage(), referrer = '', gpc = false } = {}) => {
  global.window = { location: { search, pathname: path, hostname: 'www.qognitionagency.com' }, localStorage: local, sessionStorage: session };
  global.document = { referrer, documentElement: { getAttribute: () => null } };
  Object.defineProperty(globalThis, 'navigator', { value: { globalPrivacyControl: gpc }, configurable: true, writable: true });
  if (consent && !local.blocked) local.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ ...consent, recorded_at: '2026-10-14T00:00:00.000Z', policy_version: CONSENT_POLICY_VERSION }));
  refreshConsentFromStorage();
  return { local, session };
};
const visit = (state, { search = '', path = '/', consent, referrer = '', gpc = false } = {}) => browser({ search, path, consent, referrer, gpc, local: state.local, session: state.session });
const stored = (storage, key) => JSON.parse(storage.getItem(key) || 'null');
const NAVIGATOR = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
const leaveBrowser = () => {
  delete global.window; delete global.document; refreshConsentFromStorage();
  if (NAVIGATOR) Object.defineProperty(globalThis, 'navigator', NAVIGATOR); else delete globalThis.navigator;
};
const inBrowser = fn => async () => { try { return await fn(); } finally { leaveBrowser(); } };
const BOTH = { analytics: true, advertising: true };
const ANALYTICS_ONLY = { analytics: true, advertising: false };

test('click IDs: each valid ID is kept, anything outside the charset, too long, empty, non-string or unknown is dropped', () => {
  assert.deepEqual(CLICK_ID_KEYS, ['gclid', 'wbraid', 'gbraid', 'li_fat_id', 'msclkid']);
  assert.deepEqual(sanitizeClickIds(STAMPED), STAMPED);
  assert.deepEqual(sanitizeClickIds(stamp({ gclid: 'x'.repeat(512) })), stamp({ gclid: 'x'.repeat(512) }));
  for (const bad of ['x'.repeat(513), '', ' test', 'a b', '<script>', 'a"b', "a'b", 'a/b', 'a=b', 'a&b', 'a%20b', 'a\nb', 'café', 'a;b']) assert.equal(sanitizeClickIds(stamp({ gclid: bad })), undefined, JSON.stringify(bad));
  for (const notIds of [undefined, null, 'gclid', 42, ['test-gclid'], { fbclid: { id: 'test-fbclid', captured_at: AT } }, { gclid: 123 }, { gclid: { nested: 'x' } }]) assert.equal(sanitizeClickIds(notIds), undefined, JSON.stringify(notIds));
  // An ID without a valid capture time cannot be expired on time, so it is dropped.
  for (const when of [undefined, '', 'yesterday', '2026-10-14', '2026-10-14T12:00:00Z', '2026-13-45T99:99:99.000Z', 1760443200000, '<b>2026-10-14T12:00:00.000Z</b>']) assert.equal(sanitizeClickIds({ gclid: { id: 'test-gclid-001', captured_at: when } }), undefined, JSON.stringify(when));
  assert.equal(sanitizeClickIds({ gclid: 'test-gclid-001' }), undefined, 'a bare string has no capture time');
  assert.deepEqual(sanitizeClickIds({ gclid: { id: 'test-gclid-001', captured_at: AT, extra: '<b>' } }), { gclid: { id: 'test-gclid-001', captured_at: AT } }, 'only id and captured_at are kept');
  assert.deepEqual(sanitizeClickIds({ ...stamp({ gclid: '<b>', msclkid: 'testmsclkid001' }), other: 'x' }), stamp({ msclkid: 'testmsclkid001' }));
  assert.deepEqual(clickIdsFrom(new URLSearchParams('gclid=test-gclid-001&msclkid=%3Cb%3E&utm_source=google'), NOW), stamp({ gclid: 'test-gclid-001' }));
  assert.equal(clickIdsFrom(new URLSearchParams('utm_source=google'), NOW), undefined);
});
test('schema keeps valid click IDs and silently drops invalid ones, never failing the lead', () => {
  const parsed = leadSchema.parse(shortLead('request-click-schema', { attribution: { first_click_ids: stamp({ gclid: 'test-gclid-001', msclkid: '"><svg onload=x>' }), last_click_ids: stamp({ gbraid: 'x'.repeat(600) }) } }));
  assert.deepEqual(parsed.attribution.first_click_ids, stamp({ gclid: 'test-gclid-001' }));
  assert.equal(parsed.attribution.last_click_ids, undefined);
  for (const junk of ['not-an-object', 7, null, [], { gclid: ['a'] }, { gclid: 'test-gclid-001' }, { gclid: { id: 'test-gclid-001', captured_at: 'yesterday' } }]) {
    const result = leadSchema.safeParse(shortLead('request-click-junk', { attribution: { first_click_ids: junk, last_click_ids: junk } }));
    assert.equal(result.success, true, JSON.stringify(junk));
    assert.equal(result.data.attribution, undefined, 'nothing valid is left, so the whole object is dropped (Owen F1)');
  }
  assert.equal(leadSchema.parse(shortLead('request-click-none')).attribution, undefined, 'a lead without attribution is unchanged');
});
test('API: hostile click IDs never 400 the lead; the notification shows only the valid ones, escaped', async () => {
  configured(); const sent = resendOnly();
  const response = await quietly(() => POST(request(shortLead('request-click-hostile', { consent: AD_CONSENT, attribution: {
    first_click_ids: stamp({ gclid: 'test-gclid-001', wbraid: '<img src=x onerror=alert(1)>' }),
    last_click_ids: { ...stamp({ msclkid: '"><script>x</script>', li_fat_id: 'test-li-fat-001' }), gbraid: { id: 'test-gbraid-001', captured_at: '"><svg onload=x>' } },
  } }))));
  assert.equal(response.status, 200); assert.equal((await response.json()).status, 'emailed');
  const [{ html }] = toNotify(sent);
  assert.equal(cell(html, 'First ad click'), 'gclid: test-gclid-001 (2026-10-14)');
  assert.equal(cell(html, 'Latest ad click'), 'li_fat_id: test-li-fat-001 (2026-10-14)');
  assert.equal(html.includes('<svg'), false);
  for (const raw of ['<img', '<script>', 'onerror', 'alert(1)']) assert.equal(html.includes(raw), false, `hostile ${raw} reached the email`);
});
test('notification shows first and latest ad click rows in a fixed order, and omits them when there are none', async () => {
  configured(); const sent = resendOnly();
  await quietly(() => POST(request(attributed('request-click-rows', { consent: AD_CONSENT, attribution: { ...attributed('x').attribution, first_click_ids: { ...stamp({ msclkid: 'testmsclkid001' }, '2026-09-30T08:00:00.000Z'), ...stamp({ gclid: 'test-gclid-001' }) }, last_click_ids: STAMPED } }))));
  await quietly(() => POST(request(attributed('request-click-absent', { consent: AD_CONSENT }))));
  const [withIds, without] = toNotify(sent).map(m => m.html);
  assert.equal(cell(withIds, 'First ad click'), 'gclid: test-gclid-001 (2026-10-14) / msclkid: testmsclkid001 (2026-09-30)', 'each ID shows its own capture date');
  assert.equal(cell(withIds, 'Latest ad click'), 'gclid: test-gclid_001.a~b (2026-10-14) / wbraid: test-wbraid-001 (2026-10-14) / gbraid: test-gbraid-001 (2026-10-14) / li_fat_id: test-li-fat-001 (2026-10-14) / msclkid: testmsclkid001 (2026-10-14)');
  assert.equal(cell(withIds, 'First campaign'), 'linkedin / paid / insurance-q4', 'campaign rows are unchanged');
  assert.equal(cell(without, 'First ad click'), undefined); assert.equal(cell(without, 'Latest ad click'), undefined);
});
test('click IDs never reach Meta CAPI, even with an explicit advertising yes', async () => {
  configured(); const h = capiHarness(); pending.length = 0;
  try {
    const payload = { ...withConsent({ basis: 'explicit' }, 'request-click-capi'), attribution: { first_click_ids: STAMPED, last_click_ids: STAMPED } };
    assert.equal((await (await quietly(() => POST(request(payload)))).json()).status, 'emailed');
    for (const run of pending) await quietly(() => run());
    assert.equal(h.capi.length, 1, 'the CAPI Lead still fires');
    const body = JSON.stringify(h.capi);
    for (const id of Object.values(VALID_IDS)) assert.equal(body.includes(id), false, `${id} was sent to Meta`);
    for (const key of CLICK_ID_KEYS) assert.equal(body.includes(key), false, `${key} was sent to Meta`);
  } finally { h.done(); }
});
test('advertising consent: click IDs and first touch go to localStorage for 90 days; landing page stays path-only', inBrowser(() => {
  const state = browser({ consent: BOTH, path: '/industries/insurance', referrer: 'https://www.google.com/search?q=x', search: '?utm_source=google&utm_medium=cpc&gclid=test-gclid-001&msclkid=%3Cb%3E' });
  const result = getAttribution(NOW);
  assert.deepEqual(result, { first_touch: { source: 'google', medium: 'cpc' }, last_touch: { source: 'google', medium: 'cpc' }, landing_page: '/industries/insurance', referrer_host: 'www.google.com', first_click_ids: stamp({ gclid: 'test-gclid-001' }), last_click_ids: stamp({ gclid: 'test-gclid-001' }) });
  const record = stored(state.local, ATTRIBUTION_DURABLE_KEY);
  assert.equal(record.expires_at, NOW + 90 * DAY);
  assert.equal(state.session.getItem(SESSION_KEY), null, 'no second copy in the session');
  assert.equal(window.dataLayer, undefined, 'reading attribution pushes nothing to GTM');
}));
test('a return visit weeks later keeps first touch and the first click; the latest click is kept per platform', inBrowser(() => {
  const state = browser({ consent: BOTH, path: '/ai-seo', search: '?utm_source=google&gclid=test-gclid-001' });
  getAttribution(NOW);
  state.session = memoryStorage(); // A new session: the browser was closed in between.
  visit(state, { consent: BOTH, path: '/pricing', search: '?utm_source=bing&msclkid=testmsclkid001' });
  getAttribution(NOW + 30 * DAY);
  visit(state, { consent: BOTH, path: '/contact', search: '?gclid=test-gclid-002' });
  const result = getAttribution(NOW + 40 * DAY);
  assert.equal(result.first_touch.source, 'google'); assert.equal(result.last_touch.source, 'bing');
  assert.equal(result.landing_page, '/ai-seo');
  assert.deepEqual(result.first_click_ids, stamp({ gclid: 'test-gclid-001' }));
  assert.deepEqual(result.last_click_ids, { ...stamp({ gclid: 'test-gclid-002' }, iso(NOW + 40 * DAY)), ...stamp({ msclkid: 'testmsclkid001' }, iso(NOW + 30 * DAY)) });
  assert.equal(stored(state.local, ATTRIBUTION_DURABLE_KEY).expires_at, NOW + 130 * DAY, 'a new ad click restarts the 90 days for campaign context');
  visit(state, { consent: BOTH, path: '/about' });
  getAttribution(NOW + 50 * DAY);
  assert.equal(stored(state.local, ATTRIBUTION_DURABLE_KEY).expires_at, NOW + 130 * DAY, 'a plain page view does not extend it');
}));
test('the durable record expires 90 days after the last campaign or click, and a corrupt one is discarded', inBrowser(() => {
  const state = browser({ consent: BOTH, path: '/geo', search: '?utm_source=google&gclid=test-gclid-001' });
  getAttribution(NOW);
  visit(state, { consent: BOTH, path: '/seo', search: '?utm_source=linkedin' });
  const later = getAttribution(NOW + 91 * DAY);
  assert.equal(later.first_touch.source, 'linkedin'); assert.equal(later.landing_page, '/seo'); assert.equal(later.first_click_ids, undefined);
  for (const corrupt of ['{not json', JSON.stringify({ first_touch: { source: 'old' } }), JSON.stringify([1]), JSON.stringify({ expires_at: 'never', first_touch: { source: 'old' } })]) {
    state.local.setItem(ATTRIBUTION_DURABLE_KEY, corrupt);
    visit(state, { consent: BOTH, path: '/ppc' });
    assert.equal(getAttribution(NOW).first_touch, undefined, corrupt);
  }
  state.local.setItem(ATTRIBUTION_DURABLE_KEY, JSON.stringify({ expires_at: NOW + DAY, first_click_ids: stamp({ gclid: '<tampered>' }), last_click_ids: stamp({ gclid: 'test-gclid-001' }) }));
  visit(state, { consent: BOTH, path: '/ppc' });
  const reread = getAttribution(NOW);
  assert.equal(reread.first_click_ids, undefined, 'a tampered stored ID is dropped'); assert.deepEqual(reread.last_click_ids, stamp({ gclid: 'test-gclid-001' }));
}));
test('analytics only: today\'s session-only behaviour, and click IDs are never read', inBrowser(() => {
  const state = browser({ consent: ANALYTICS_ONLY, path: '/ai-seo', search: '?utm_source=google&gclid=test-gclid-001' });
  const result = getAttribution(NOW);
  assert.deepEqual(result, { first_touch: { source: 'google' }, last_touch: { source: 'google' }, landing_page: '/ai-seo' });
  assert.equal(state.local.getItem(ATTRIBUTION_DURABLE_KEY), null);
  assert.equal(state.session.getItem(SESSION_KEY).includes('test-gclid'), false);
  assert.equal(stored(state.session, SESSION_KEY).first_touch.source, 'google');
}));
test('no consent (opt-in region, no choice): nothing is read or stored, and an old durable record is deleted', inBrowser(() => {
  const state = browser({ path: '/ai-seo', search: '?utm_source=google&gclid=test-gclid-001' });
  state.local.setItem(ATTRIBUTION_DURABLE_KEY, JSON.stringify({ expires_at: NOW + DAY, first_click_ids: { gclid: 'test-gclid-000' } }));
  assert.equal(getAttribution(NOW), undefined);
  assert.equal(state.local.getItem(ATTRIBUTION_DURABLE_KEY), null); assert.equal(state.session.getItem(SESSION_KEY), null);
}));
test('advertising without analytics keeps click IDs durably but no campaign context', inBrowser(() => {
  const state = browser({ consent: { analytics: false, advertising: true }, path: '/ai-seo', search: '?utm_source=google&gclid=test-gclid-001' });
  assert.deepEqual(getAttribution(NOW), { first_click_ids: stamp({ gclid: 'test-gclid-001' }), last_click_ids: stamp({ gclid: 'test-gclid-001' }) });
  const record = stored(state.local, ATTRIBUTION_DURABLE_KEY);
  assert.equal(record.first_touch, undefined); assert.equal(record.landing_page, undefined);
}));
test('a later advertising yes promotes the session record; a click ID still on the URL is captured then', inBrowser(() => {
  const state = browser({ consent: ANALYTICS_ONLY, path: '/ai-seo', search: '?utm_source=google&gclid=test-gclid-001' });
  getAttribution(NOW);
  visit(state, { consent: BOTH, path: '/ai-seo', search: '?utm_source=google&gclid=test-gclid-001' }); // Accepted on the landing page.
  const result = getAttribution(NOW + 1000);
  assert.equal(result.first_touch.source, 'google'); assert.equal(result.landing_page, '/ai-seo');
  assert.deepEqual(result.first_click_ids, stamp({ gclid: 'test-gclid-001' }, iso(NOW + 1000)), 'captured when advertising was granted');
  assert.equal(state.session.getItem(SESSION_KEY), null, 'promoted, not copied');
  assert.equal(stored(state.local, ATTRIBUTION_DURABLE_KEY).first_touch.source, 'google');
}));
test('withdrawing advertising deletes the durable record and keeps campaign context for the session only', inBrowser(() => {
  const state = browser({ consent: BOTH, path: '/ai-seo', search: '?utm_source=google&gclid=test-gclid-001' });
  getAttribution(NOW);
  visit(state, { consent: ANALYTICS_ONLY, path: '/pricing' });
  const result = getAttribution(NOW + 1000);
  assert.equal(result.first_touch.source, 'google'); assert.equal(result.first_click_ids, undefined); assert.equal(result.last_click_ids, undefined);
  assert.equal(state.local.getItem(ATTRIBUTION_DURABLE_KEY), null);
  assert.equal(state.session.getItem(SESSION_KEY).includes('test-gclid'), false);
}));
test('saveConsent: an advertising reject deletes the durable record even with no tracker mounted', inBrowser(() => {
  const state = browser({ consent: BOTH });
  state.local.setItem(ATTRIBUTION_DURABLE_KEY, JSON.stringify({ expires_at: NOW + DAY, first_click_ids: { gclid: 'test-gclid-001' } }));
  window.dispatchEvent = () => {}; window.location.reload = () => {}; global.document.cookie = '';
  saveConsent(true, true);
  assert.notEqual(state.local.getItem(ATTRIBUTION_DURABLE_KEY), null, 'a yes keeps it');
  saveConsent(true, false);
  assert.equal(state.local.getItem(ATTRIBUTION_DURABLE_KEY), null);
}));
test('blocked storage never throws: the current page still carries its click IDs', inBrowser(() => {
  browser({ consent: BOTH, local: blockedStorage(), session: blockedStorage(), path: '/ai-seo', search: '?gclid=test-gclid-001' });
  // Blocked storage cannot hold a choice, so this is the region default; make it an opt-out region.
  global.document.documentElement.getAttribute = () => 'granted';
  const result = getAttribution(NOW);
  assert.deepEqual(result.first_click_ids, stamp({ gclid: 'test-gclid-001' }));
  Object.defineProperty(global.window, 'localStorage', { get() { throw Error('SecurityError'); } });
  Object.defineProperty(global.window, 'sessionStorage', { get() { throw Error('SecurityError'); } });
  assert.doesNotThrow(() => getAttribution(NOW));
}));
test('LeadForm sends attribution only on the lead body, never in a track() event', () => {
  const form = fs.readFileSync(path.join(ROOT, 'components/shared/LeadForm.tsx'), 'utf8');
  for (const call of form.match(/track\([^;]*\);/g) || []) for (const banned of ['attribution', 'click', 'gclid', 'email', 'name:', 'phone', 'message']) assert.equal(call.includes(banned), false, `${banned} in ${call}`);
});

/* ── Owen F1, 2026-10-14: attribution never fails a lead ─────────────────────────── */
const LONG_HOST = ['a', 'b', 'c', 'd'].map(c => c.repeat(63)).join('.') + '.com';
test('API: a 259-char referrer hostname still returns 200 emailed, and the rest of the attribution survives', async () => {
  assert.equal(LONG_HOST.length, 259);
  configured(); const sent = resendOnly();
  const response = await quietly(() => POST(request(shortLead('request-long-referrer', { attribution: { first_touch: { source: 'google', campaign: 'q4' }, referrer_host: LONG_HOST } }))));
  assert.equal(response.status, 200); assert.equal((await response.json()).status, 'emailed');
  const [{ html }] = toNotify(sent);
  assert.equal(cell(html, 'Referred by'), undefined, 'the field that does not parse is dropped');
  assert.equal(cell(html, 'First campaign'), 'google / q4');
});
test('schema: attribution and utm fields that do not parse are dropped, never a 400', () => {
  const parse = extra => { const result = leadSchema.safeParse(shortLead('request-soft', extra)); assert.equal(result.success, true, JSON.stringify(extra)); return result.data; };
  for (const junk of ['string', 7, null, [], true]) { assert.equal(parse({ attribution: junk }).attribution, undefined, JSON.stringify(junk)); assert.equal(parse({ utm: junk }).utm, undefined, JSON.stringify(junk)); }
  assert.deepEqual(parse({ utm: { source: 5, medium: 'cpc', campaign: 'x'.repeat(201) } }).utm, { medium: 'cpc' });
  assert.equal(parse({ utm: { source: 5 } }).utm, undefined, 'an object with nothing valid left is dropped');
  assert.deepEqual(parse({ attribution: { landing_page: 'x'.repeat(501), referrer_host: { host: 'x' }, first_touch: { source: 'x'.repeat(300), campaign: 'q4' }, last_touch: 'organic', first_click_ids: stamp({ gclid: 'test-gclid-001' }) } }).attribution, { first_touch: { campaign: 'q4' }, first_click_ids: stamp({ gclid: 'test-gclid-001' }) });
  assert.deepEqual(parse({ attribution: { referrer_host: 'x'.repeat(250), landing_page: '/ai-seo' } }).attribution, { referrer_host: 'x'.repeat(250), landing_page: '/ai-seo' }, 'valid fields at the limit are kept');
  assert.equal(leadSchema.safeParse(shortLead('request-strict', { contact: { name: '', email: 'not-an-email' } })).success, false, 'the contact fields stay strict');
});
test('browser: a long referrer hostname is cut to 250 characters', inBrowser(() => {
  browser({ consent: BOTH, path: '/ai-seo', referrer: `https://${LONG_HOST}/path` });
  const result = getAttribution(NOW);
  assert.equal(result.referrer_host.length, 250); assert.equal(result.referrer_host, LONG_HOST.slice(0, 250));
}));
test('browser: a malformed durable record is discarded on read, and the lead built from it returns 200', inBrowser(async () => {
  const malformed = [
    { expires_at: NOW + DAY, first_touch: { source: 123 }, first_click_ids: stamp({ gclid: 'test-gclid-000' }) },
    { expires_at: NOW + DAY, landing_page: 'x'.repeat(600) },
    { expires_at: NOW + DAY, referrer_host: LONG_HOST },
    { expires_at: NOW + DAY, last_touch: 'organic' },
    { expires_at: NOW + DAY, first_touch: ['google'] },
    { expires_at: NOW + DAY, first_click_ids: 'test-gclid-000' },
    { expires_at: NOW + DAY, last_click_ids: [stamp({ gclid: 'test-gclid-000' })] },
  ];
  configured(); const sent = resendOnly();
  for (const [i, record] of malformed.entries()) {
    const state = browser({ consent: BOTH, path: '/contact' });
    state.local.setItem(ATTRIBUTION_DURABLE_KEY, JSON.stringify(record));
    const attribution = getAttribution(NOW);
    assert.deepEqual(attribution, { landing_page: '/contact' }, `record ${i} is discarded, not partly kept`);
    assert.equal(JSON.stringify(stored(state.local, ATTRIBUTION_DURABLE_KEY)).includes('test-gclid-000'), false, `record ${i} is gone from storage`);
    // The raw malformed record, sent as it was, also never fails the lead on the server.
    for (const [kind, payload] of [['rebuilt', attribution], ['raw', record]]) {
      const response = await quietly(() => POST(request(shortLead(`request-malformed-${i}-${kind}`, { consent: AD_CONSENT, attribution: payload, utm: payload.first_touch }))));
      assert.equal(response.status, 200, `record ${i} ${kind}`); assert.equal((await response.json()).status, 'emailed');
    }
  }
  assert.equal(toNotify(sent).length, malformed.length * 2);
}));

/* ── Anton F2, 2026-10-14: the server drops click IDs without an advertising yes ──── */
test('click IDs reach the email only when the server allows advertising', async () => {
  const cases = [
    ['advertising false', { ...AD_CONSENT, advertising: false }, { 'x-vercel-ip-country': 'US' }, false],
    ['consent missing', undefined, { 'x-vercel-ip-country': 'US' }, false],
    ['opt-in country on a region default', { ...AD_CONSENT, basis: 'region_default', recorded_at: '' }, { 'x-vercel-ip-country': 'DE' }, false],
    ['region default with no country', { ...AD_CONSENT, basis: 'region_default', recorded_at: '' }, {}, false],
    ['GPC with an explicit yes', AD_CONSENT, { 'x-vercel-ip-country': 'US', 'sec-gpc': '1' }, false],
    ['explicit yes in an opt-in country', AD_CONSENT, { 'x-vercel-ip-country': 'DE' }, true],
    ['region default in an opt-out country', { ...AD_CONSENT, basis: 'region_default', recorded_at: '' }, { 'x-vercel-ip-country': 'US' }, true],
  ];
  configured();
  for (const [i, [name, consent, headers, kept]] of cases.entries()) {
    const sent = resendOnly();
    const response = await quietly(() => POST(requestWith(shortLead(`request-click-gate-${i}`, { consent, attribution: { first_touch: { source: 'google' }, first_click_ids: STAMPED, last_click_ids: STAMPED } }), headers)));
    assert.equal(response.status, 200, name); assert.equal((await response.json()).status, 'emailed', name);
    const [{ html }] = toNotify(sent);
    assert.equal(cell(html, 'First ad click') !== undefined, kept, `${name}: first ad click row`);
    assert.equal(cell(html, 'Latest ad click') !== undefined, kept, `${name}: latest ad click row`);
    if (!kept) for (const id of Object.values(VALID_IDS)) assert.equal(html.includes(id), false, `${name}: ${id} in the email`);
    assert.equal(cell(html, 'First campaign'), 'google', `${name}: campaign context is not touched`);
  }
});
test('the route drops click IDs before the notification is sent', () => {
  const route = fs.readFileSync(path.join(ROOT, 'app/api/lead/route.ts'), 'utf8');
  const gate = route.indexOf('delete lead.attribution.first_click_ids'), send = route.indexOf('await sendLeadNotification(');
  assert.ok(gate > 0 && send > gate, 'the click ID gate runs before sendLeadNotification');
});

/* ── Anton F1, 2026-10-14: the consent policy version re-asks earlier choices ─────── */
test('the policy version is 2026-10-14, and a choice saved under an older version is not honoured', inBrowser(() => {
  const vm = require('node:vm');
  const { consentModeScript } = require('../lib/consent.ts');
  assert.equal(CONSENT_POLICY_VERSION, '2026-10-14');
  for (const old of ['2026-10-06', '2026-09-24', undefined]) {
    const state = browser({ path: '/' });
    state.local.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ analytics: true, advertising: true, recorded_at: '2026-10-07T00:00:00.000Z', policy_version: old }));
    refreshConsentFromStorage();
    assert.equal(readConsent(), null, `${old}: readConsent ignores it`);
    const win = { localStorage: state.local, navigator: { globalPrivacyControl: false }, addEventListener() {} };
    vm.runInNewContext(consentModeScript(false), { window: win });
    const [, , signal] = JSON.parse(JSON.stringify(Array.from(win.dataLayer[0])));
    assert.deepEqual([signal.analytics_storage, signal.ad_storage], ['denied', 'denied'], `${old}: the inline script falls back to the opt-in region default`);
  }
}));

/* ── Anton F4 / Owen F2: GA4 page_location loses the click IDs when advertising is off ── */
test('GA4 config strips click IDs from page_location when advertising is off, and only then', () => {
  const vm = require('node:vm');
  const { ga4ConfigScript } = require('../lib/consent.ts');
  const HREF = 'https://www.qognitionagency.com/ai-seo?utm_source=google&gclid=test-gclid-001&x=1&wbraid=w&gbraid=g&li_fat_id=l&msclkid=m#top';
  /** Every gtag call after 'js', in order. */
  const run = ({ href = HREF, choice, region = false, gpc = false, id = 'G-TEST123', urlThrows = false }) => {
    const store = new Map();
    if (choice) store.set(CONSENT_STORAGE_KEY, JSON.stringify({ ...choice, recorded_at: '2026-10-14T00:00:00.000Z', policy_version: CONSENT_POLICY_VERSION }));
    const url = new URL(href);
    const win = { localStorage: { getItem: k => store.get(k) ?? null }, navigator: { globalPrivacyControl: gpc }, location: { href, origin: url.origin, pathname: url.pathname }, dataLayer: [] };
    const BrokenURL = function () { throw new TypeError('Invalid URL'); };
    vm.runInNewContext(ga4ConfigScript(id, region), { window: win, URL: urlThrows ? BrokenURL : URL });
    const calls = win.dataLayer.map(args => JSON.parse(JSON.stringify(Array.from(args))));
    assert.equal(calls[0][0], 'js');
    return calls.slice(1);
  };
  const STRIPPED = 'https://www.qognitionagency.com/ai-seo?utm_source=google&x=1#top';
  // Owen re-review A: a config-level page_location persists for the destination, so later
  // client-side page views would report the landing URL. The stripped URL rides on one
  // page_view event instead, and the config turns its own automatic page view off.
  const stripped = (page, id = 'G-TEST123') => [['config', id, { send_page_view: false }], ['event', 'page_view', { page_location: page, send_to: id }]];
  assert.deepEqual(run({ choice: ANALYTICS_ONLY }), stripped(STRIPPED), 'explicit advertising no');
  assert.deepEqual(run({ choice: BOTH, gpc: true }), stripped(STRIPPED), 'GPC beats a stored yes');
  assert.deepEqual(run({ region: true, gpc: true }), stripped(STRIPPED), 'GPC in an opt-out region');
  assert.deepEqual(run({ choice: ANALYTICS_ONLY, urlThrows: true }), stripped('https://www.qognitionagency.com/ai-seo'), 'a URL that cannot be parsed fails closed to origin and path');
  for (const [label, options] of [['advertising on: GA4 reads the page as before', { choice: BOTH }], ['opt-out region default', { region: true }], ['no click ID on the URL: nothing is overridden', { choice: ANALYTICS_ONLY, href: 'https://www.qognitionagency.com/ai-seo?utm_source=google' }]]) {
    assert.deepEqual(run(options), [['config', 'G-TEST123']], label);
  }
  for (const call of [run({ choice: ANALYTICS_ONLY }), run({ choice: BOTH })].flat()) if (call[0] === 'config') assert.equal(JSON.stringify(call).includes('page_location'), false, 'page_location never sits on the config');
  const odd = 'G-a\'b"c</script>';
  assert.deepEqual(run({ choice: ANALYTICS_ONLY, id: odd }), stripped(STRIPPED, odd), 'the measurement ID is data, not code');
  const layout = fs.readFileSync(path.join(ROOT, 'app/layout.tsx'), 'utf8');
  assert.match(layout, /ga4ConfigScript\(GA4_ID, regionDefault\)/);
  for (const file of ['app/layout.tsx', 'lib/consent.ts', 'lib/analytics.ts', 'lib/clickIds.ts', 'components/shared/AcquisitionTracker.tsx']) assert.equal(fs.readFileSync(path.join(ROOT, file), 'utf8').includes('replaceState'), false, `${file} rewrites history`);
});

/* ── Owen final review, 2026-10-14: the inline GA4 config used to declare a global gtag. The
 *    IIFE in ga4ConfigScript() hid it, so trackGtag() (lib/analytics.ts) silently sent nothing. ── */
test('GA4 config exposes window.gtag, so trackGtag() still reaches GA4', () => {
  const vm = require('node:vm');
  const { ga4ConfigScript } = require('../lib/consent.ts');
  for (const href of ['https://www.qognitionagency.com/contact', 'https://www.qognitionagency.com/contact?gclid=test-gclid-001']) {
    const url = new URL(href);
    const win = { localStorage: { getItem: () => null }, navigator: { globalPrivacyControl: false }, location: { href, origin: url.origin, pathname: url.pathname }, dataLayer: [] };
    vm.runInNewContext(ga4ConfigScript('G-TEST123', false), { window: win, URL });
    assert.equal(typeof win.gtag, 'function', `${href}: window.gtag is defined`);
    const before = win.dataLayer.length;
    win.gtag('event', 'contact_submitted', { form: 'test' });
    assert.equal(win.dataLayer.length, before + 1, `${href}: window.gtag pushes to the same dataLayer`);
    assert.deepEqual(Array.from(win.dataLayer.at(-1)), ['event', 'contact_submitted', { form: 'test' }]);
  }
});

/* ── Owen F4: analytics no with advertising yes removes campaign context from storage ── */
test('saveConsent: analytics no with advertising yes keeps click IDs and removes campaign fields from the durable record', inBrowser(() => {
  const state = browser({ consent: BOTH });
  state.local.setItem(ATTRIBUTION_DURABLE_KEY, JSON.stringify({ expires_at: NOW + DAY, first_touch: { source: 'google' }, last_touch: { source: 'bing' }, landing_page: '/ai-seo', referrer_host: 'www.google.com', utm: { source: 'google' }, first_click_ids: stamp({ gclid: 'test-gclid-001' }), last_click_ids: stamp({ gclid: 'test-gclid-001' }) }));
  window.dispatchEvent = () => {}; window.location.reload = () => {}; global.document.cookie = '';
  saveConsent(false, true);
  assert.deepEqual(stored(state.local, ATTRIBUTION_DURABLE_KEY), { expires_at: NOW + DAY, first_click_ids: stamp({ gclid: 'test-gclid-001' }), last_click_ids: stamp({ gclid: 'test-gclid-001' }) });
  state.local.setItem(ATTRIBUTION_DURABLE_KEY, '{not json');
  saveConsent(false, true);
  assert.equal(state.local.getItem(ATTRIBUTION_DURABLE_KEY), null, 'an unreadable record is deleted');
}));

/* ── Anton F5 / Owen F5: each click ID expires 90 days after its own capture ──────── */
test('a click ID drops 90 days after its own capture, even while later visits keep the record alive', inBrowser(() => {
  const state = browser({ consent: BOTH, path: '/ai-seo', search: '?utm_source=google&gclid=test-gclid-001' });
  getAttribution(NOW);
  visit(state, { consent: BOTH, path: '/pricing', search: '?msclkid=testmsclkid001' });
  getAttribution(NOW + 60 * DAY);
  visit(state, { consent: BOTH, path: '/contact' });
  const before = getAttribution(NOW + 90 * DAY - 1);
  assert.deepEqual(before.first_click_ids, stamp({ gclid: 'test-gclid-001' }));
  visit(state, { consent: BOTH, path: '/contact' });
  const after = getAttribution(NOW + 90 * DAY);
  assert.equal(after.first_touch.source, 'google', 'campaign context still lives');
  assert.equal(after.first_click_ids, undefined, 'the first click is 90 days old');
  assert.deepEqual(after.last_click_ids, stamp({ msclkid: 'testmsclkid001' }, iso(NOW + 60 * DAY)), 'the newer click keeps its own clock');
  assert.equal(JSON.stringify(stored(state.local, ATTRIBUTION_DURABLE_KEY)).includes('test-gclid-001'), false, 'the expired ID is gone from storage');
}));
test('seeing the same click ID again does not restart its 90 days', inBrowser(() => {
  const state = browser({ consent: BOTH, path: '/ai-seo', search: '?gclid=test-gclid-001' });
  getAttribution(NOW);
  visit(state, { consent: BOTH, path: '/ai-seo', search: '?gclid=test-gclid-001' });
  const again = getAttribution(NOW + 60 * DAY);
  assert.deepEqual(again.last_click_ids, stamp({ gclid: 'test-gclid-001' }), 'original capture time kept');
  visit(state, { consent: BOTH, path: '/contact' });
  assert.equal(getAttribution(NOW + 91 * DAY).last_click_ids, undefined);
}));
test('a stored click ID with a capture time in the future is dropped', inBrowser(() => {
  const state = browser({ consent: BOTH, path: '/contact' });
  state.local.setItem(ATTRIBUTION_DURABLE_KEY, JSON.stringify({ expires_at: NOW + DAY, last_click_ids: { ...stamp({ gclid: 'test-gclid-009' }, iso(NOW + 30 * DAY)), ...stamp({ msclkid: 'testmsclkid001' }) } }));
  assert.deepEqual(getAttribution(NOW).last_click_ids, stamp({ msclkid: 'testmsclkid001' }));
}));

/* ── Privacy page, 2026-10-14 ─────────────────────────────────────────────────────── */
test('the privacy page describes click codes and their 90 days', () => {
  const page = fs.readFileSync(path.join(ROOT, 'app/legal/privacy/page.tsx'), 'utf8').replace(/\s+/g, ' ');
  assert.ok(page.includes('When advertising measurement is on, your browser keeps the click codes that Google, Microsoft and LinkedIn add to their ad links. Each code lasts 90 days from the ad click it came with, and coming back to the site does not extend it.'));
  assert.ok(page.includes('for 90 days after your latest ad click or campaign visit'), 'campaign details follow the rolling rule');
  assert.ok(page.includes('Turning advertising measurement off deletes the click codes from your browser straight away.'));
  assert.ok(page.includes('advertising measurement is off for as long as the signal is on, even if you accepted it before'), 'GPC beats an earlier yes');
  assert.ok(page.indexOf('Meta may match them to an account.') < page.indexOf('your browser keeps the click codes'), 'after the Meta sentence');
  assert.match(page, /Usage data<\/strong>: [^<]*ad click codes/);
  assert.equal(page.includes('—'), false, 'no em dashes');
});

/* ── Owen re-review C: readConsent() ignores a stored choice with an invalid recorded_at ── */
test('readConsent: a stored choice is honoured only with a recorded_at saveConsent() could have written', inBrowser(() => {
  const state = browser({ path: '/' });
  for (const [when, honoured] of [['2026-10-14T00:00:00.000Z', true], ['tampered', false], ['', false], [42, false], [undefined, false], ['2026-02-30T00:00:00.000Z', false], ['2026-10-14T00:00:00Z', false]]) {
    state.local.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ analytics: true, advertising: true, recorded_at: when, policy_version: CONSENT_POLICY_VERSION }));
    refreshConsentFromStorage();
    assert.equal(readConsent() !== null, honoured, JSON.stringify(when));
  }
}));

/* ── Owen re-review nit: a capture time must be a real calendar instant ─────────────── */
test('click IDs: a capture time that matches the pattern but names an impossible date is dropped', () => {
  for (const when of ['2026-02-30T12:00:00.000Z', '2026-02-29T12:00:00.000Z', '2026-04-31T00:00:00.000Z', '2026-10-14T24:00:00.000Z', '2026-10-14T12:60:00.000Z']) {
    assert.equal(sanitizeClickIds({ gclid: { id: 'test-gclid-001', captured_at: when } }), undefined, when);
  }
  assert.deepEqual(sanitizeClickIds({ gclid: { id: 'test-gclid-001', captured_at: '2028-02-29T12:00:00.000Z' } }), { gclid: { id: 'test-gclid-001', captured_at: '2028-02-29T12:00:00.000Z' } }, 'a leap day is real');
});

(async () => {
  // The in-memory rate state is process-wide; each test starts with none.
  let failed = 0;
  for (const [name, fn] of tests) {
    delete globalThis.__qognitionRateState;
    try { await fn(); console.log(`PASS ${name}`); }
    catch (error) { failed++; console.error(`FAIL ${name}\n  ${String(error?.message || error).split('\n').slice(0, 4).join('\n  ')}`); }
  }
  if (failed) { console.error(`${failed} of ${tests.length} funnel contract tests failed.`); process.exitCode = 1; return; }
  console.log(`${tests.length} funnel contract tests passed; all network requests mocked.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
