// Isolated contract tests. Every HTTP call is mocked; never sends a live lead.
const assert = require('node:assert/strict');
const fs = require('node:fs');
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
const { leadSchema } = require('../lib/validation.ts');
const { qualifyLead } = require('../lib/leadQualification.ts');
const { captureLeadInCrm, crmConfiguration } = require('../lib/leadCrm.ts');
const { mergeAttribution } = require('../lib/analytics.ts');
const { leadCopy, LEAD_LOCALES } = require('../lib/leadCopy.ts');
const { readConsent, saveConsent, refreshConsentFromStorage, consentWasWithdrawn } = require('../lib/consent.ts');
const { POST } = require('../app/api/lead/route.ts');
const env = { GHL_PRIVATE_INTEGRATION_TOKEN: 'test-only', GHL_LOCATION_ID: 'test-location', GHL_INQUIRY_FIELD_ID: 'inquiry', GHL_SUBMISSION_FIELD_ID: 'receipts', GHL_QUALIFICATION_FIELD_ID: 'eligibility', GHL_MARKETING_CONSENT_FIELD_ID: 'consent', GHL_LOCALE_FIELD_ID: 'locale', VERCEL_ENV: 'production', UPSTASH_REDIS_REST_URL: 'https://redis.example.com', UPSTASH_REDIS_REST_TOKEN: 'redis-test-only', LEAD_LEDGER_HMAC_SECRET: 'test-only-secret-at-least-32-characters' };
const lead = () => leadSchema.parse({ service: 'marketing', intent: 'consultation', source_page: '/services/ai-seo', submission_id: 'request-001', event_id: 'request-001', contact: { name: 'Test Buyer', email: 'Buyer@Example.com', company_url: 'example.com', message: 'Technical search support' }, context: { locale: 'de' }, qualification: { business_model: 'b2b', employee_band: '20-99' }, consent: { email_marketing: false, analytics: false, advertising: false, recorded_at: '2026-09-24T00:00:00.000Z', policy_version: '2026-09-24' } });

const { provider } = require('./test-support/lead-providers.cjs');
const { normalizeLeadContext } = require('../lib/leadTaxonomy.ts');
const { createLeadLedger, ledgerConfiguration } = require('../lib/leadLedger.ts');
const { leadSubmissionIdentity } = require('../lib/leadCrm.ts');
const tests = [];
const test = (name, fn) => tests.push([name, fn]);
test('preview cannot capture a lead even when email delivery is configured', async () => {
  process.env.VERCEL_ENV = 'preview'; delete process.env.QOGNITION_LEAD_MODE;
  process.env.RESEND_API_KEY = 'test-only'; process.env.RESEND_FROM = 'hello@example.com';
  let calls = 0; global.fetch = async () => { calls++; return Response.json({id:'email-1'}); };
  const response = await POST(request(lead()));
  assert.equal(response.status, 503); assert.equal(calls, 0);
  assert.equal((await response.json()).status, 'preview_disabled');
  delete process.env.RESEND_API_KEY; delete process.env.RESEND_FROM;
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
test('no configuration fails without network access', async () => {
  assert.equal(crmConfiguration({}).configured, false);
  await assert.rejects(captureLeadInCrm(lead(), { env: {} }), e => e.code === 'not_configured');
});
test('capture confirms note history and preserves verified identity, ownership and stages', async () => {
  const p = provider(); const result = await captureLeadInCrm(lead(), { env, fetch: p.request });
  assert.equal(result.duplicate, false); assert.equal(result.contactId, 'contact-1'); assert.equal(result.noteId, 'note-1');
  const write = p.writes.find(w => w.kind === 'contact').body;
  for (const forbidden of ['tags', 'assignedTo', 'dnd', 'source', 'pipelineId', 'pipelineStageId', 'name', 'companyName', 'website', 'phone', 'email']) assert.equal(Object.hasOwn(write, forbidden), false);
  assert.equal(p.contact.name, 'Verified name'); assert.equal(p.contact.assignedTo, 'owner');
  assert.equal(p.contact.customFields.find(f => f.id === 'sales_stage').value, 'Customer');
  assert.equal(p.notes.length, 1); assert.match(p.notes[0].body, /Technical search support/);
  const receipt = [...p.values.values()].map(v => { try { return JSON.parse(v); } catch {} }).find(v => v?.state === 'captured');
  assert.equal(receipt.noteId, 'note-1');
  assert.equal(JSON.stringify([...p.values]).includes('buyer@example.com'), false);
  assert.equal(JSON.stringify([...p.values]).includes('Technical search support'), false);
});
test('equal retries share durable receipts across adapter instances; changed content returns conflict', async () => {
  const p = provider({ existing: false });
  await captureLeadInCrm(lead(), { env, fetch: p.request });
  const result = await captureLeadInCrm(lead(), { env, fetch: p.request });
  assert.equal(result.duplicate, true); assert.equal(result.eventId, 'request-001'); assert.equal(p.notes.length, 1);
  await assert.rejects(captureLeadInCrm({ ...lead(), contact: { ...lead().contact, email: 'other@example.com' } }, { env, fetch: p.request }), e => e.code === 'submission_conflict');
});
test('concurrent independent adapters cannot append duplicate notes', async () => {
  const p = provider({ existing: false });
  const settled = await Promise.allSettled([captureLeadInCrm(lead(), { env, fetch: p.request }), captureLeadInCrm(lead(), { env, fetch: p.request })]);
  assert.equal(settled.filter(r => r.status === 'fulfilled').length, 1);
  assert.equal(settled.find(r => r.status === 'rejected').reason.code, 'busy');
  assert.equal((await captureLeadInCrm(lead(), { env, fetch: p.request })).duplicate, true); assert.equal(p.notes.length, 1);
});
test('provider errors, lost fields and cross-location records cannot be acknowledged', async () => {
  for (const options of [{ ghlUnavailable: true }, { loseInquiry: true }, { wrongLocation: true }, { corruptNote: true }]) {
    const p = provider(options);
    await assert.rejects(captureLeadInCrm(lead(), { env, fetch: p.request }));
  }
});
test('lost note response reconciles exactly one verified append', async () => {
  const p = provider({ loseNoteResponse: true });
  await assert.rejects(captureLeadInCrm(lead(), { env, fetch: p.request }));
  assert.equal(p.notes.length, 1); p.options.loseNoteResponse = false;
  const result = await captureLeadInCrm(lead(), { env, fetch: p.request });
  assert.equal(result.noteId, 'note-1'); assert.equal(p.notes.length, 1);
});
test('an uncertain append with no observable note is never sent again', async () => {
  const p = provider({ loseNoteResponse: true, dropNote: true });
  await assert.rejects(captureLeadInCrm(lead(), { env, fetch: p.request }));
  p.options.loseNoteResponse = false; p.options.dropNote = false;
  await assert.rejects(captureLeadInCrm(lead(), { env, fetch: p.request }), e => e.code === 'reconciliation_required');
  assert.equal(p.writes.filter(w => w.kind === 'note').length, 1);
});
test('receipt commit failure is retryable and reconciliation does not repeat append', async () => {
  const p = provider({ failCommit: true });
  await assert.rejects(captureLeadInCrm(lead(), { env, fetch: p.request })); p.options.failCommit = false;
  await captureLeadInCrm(lead(), { env, fetch: p.request }); assert.equal(p.notes.length, 1);
});
test('lease loss stops before provider writes', async () => {
  const p = provider({ loseLease: true });
  await assert.rejects(captureLeadInCrm(lead(), { env, fetch: p.request }), e => e.code === 'lease_lost'); assert.equal(p.writes.length, 0);
});
test('new enquiries append history while contact first touch stays fixed', async () => {
  const p = provider();
  await captureLeadInCrm({ ...lead(), attribution: { first_touch: { source: 'google' }, last_touch: { source: 'google' }, landing_page: '/first' } }, { env, fetch: p.request });
  await captureLeadInCrm({ ...lead(), submission_id: 'request-002', attribution: { first_touch: { source: 'linkedin' }, last_touch: { source: 'linkedin' }, landing_page: '/later' } }, { env, fetch: p.request });
  assert.equal(p.notes.length, 2);
  const saved = JSON.parse(p.contact.customFields.find(f => f.id === 'inquiry').value);
  assert.equal(saved.attribution.first_touch.source, 'google'); assert.equal(saved.attribution.last_touch.source, 'linkedin'); assert.equal(saved.attribution.landing_page, '/first');
});
test('canonical digest ignores object-key order and transport IDs', () => {
  const one = lead(); const two = { ...one, contact: Object.fromEntries(Object.entries(one.contact).reverse()), event_id: 'a-new-event', honeypot: '' };
  assert.equal(leadSubmissionIdentity(one).digest, leadSubmissionIdentity(two).digest);
  assert.equal(leadSubmissionIdentity({ ...one, submission_id: undefined, event_id: undefined }, new Date('2026-10-03')).submissionId, leadSubmissionIdentity({ ...two, submission_id: undefined, event_id: undefined }, new Date('2026-10-03')).submissionId);
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
const request = payload => { const r = new Request('https://www.qognitionagency.com/api/lead', { method: 'POST', body: JSON.stringify(payload), headers: { 'x-forwarded-for': '192.0.2.1' } }); r.cookies = { get: () => undefined }; return r; };
test('API rejects newsletter without opt-in', async () => {
  const response = await POST(request({ ...lead(), intent: 'newsletter' })); assert.equal(response.status, 400);
});
test('preview validation performs no external request and cannot report capture', async () => {
  process.env.VERCEL_ENV = 'preview'; process.env.QOGNITION_LEAD_MODE = 'validate';
  let calls = 0; global.fetch = async () => { calls++; throw Error('No network'); };
  const response = await POST(request(lead())); const body = await response.json();
  assert.equal(response.status, 200); assert.equal(body.success, false); assert.equal(body.status, 'validated'); assert.equal(calls, 0);
  delete process.env.QOGNITION_LEAD_MODE;
});
// Owen L4, 2026-10-14: /contact is the only form, so bad page context must never cost the lead.
test('unresolvable taxonomy context is stripped and logged, and the lead is still accepted', async () => {
  Object.assign(process.env, env, { RESEND_API_KEY: 'test-only', RESEND_FROM: 'hello@example.com' }); delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const sent = resendOnly(); pending.length = 0; const logged = [];
  const bad = { ...lead(), submission_id: 'request-bad-taxonomy', event_id: 'request-bad-taxonomy', context: { industry_id: '02', subniche_id: '01.01.01.01', asset_id: 'free-ai-visibility-audit', page_id: '/contact', locale: 'de' } };
  const response = await quietly(() => POST(request(bad)), logged); const body = await response.json();
  assert.equal(response.status, 200); assert.equal(body.status, 'emailed');
  assert.deepEqual(logged.filter(l => l[1] === '[Lead] context_taxonomy_dropped'), [['warn', '[Lead] context_taxonomy_dropped', { code: 'invalid_taxonomy' }]]);
  assert.equal(JSON.stringify(logged).includes('01.01.01.01'), false, 'no supplied IDs in logs');
  assert.equal(JSON.stringify(logged).includes('xample.com'), false);
  // Only the taxonomy keys go; the audit tag, page and locale survive.
  assert.match(sent[0].subject, /^\[Free AI visibility audit\]/);
  const p = provider(); Object.assign(process.env, env); global.fetch = p.request; pending.length = 0;
  assert.equal((await (await quietly(() => POST(request({ ...bad, submission_id: 'request-bad-taxonomy-2', event_id: 'request-bad-taxonomy-2' })))).json()).status, 'captured');
  const snapshot = JSON.parse(p.contact.customFields.find(f => f.id === 'inquiry').value);
  assert.deepEqual(snapshot.context, { asset_id: 'free-ai-visibility-audit', page_id: '/contact', locale: 'de' });
});
// Operator decision 2026-10-06: email fallback until GHL credentials exist. LEAD_EMAIL_FALLBACK=off restores strict GHL-first.
const quietly = async (fn, logged = []) => {
  const old = { info: console.info, warn: console.warn, error: console.error };
  for (const level of Object.keys(old)) console[level] = (...args) => logged.push([level, ...args]);
  try { return await fn(); } finally { Object.assign(console, old); }
};
const resendOnly = (options = {}) => {
  const sent = [];
  global.fetch = async (url, init = {}) => {
    if (!String(url).startsWith('https://api.resend.com/')) throw Error('Unexpected external destination');
    sent.push(JSON.parse(init.body));
    return options.fails ? Response.json({ name: 'validation_error', message: 'to buyer@example.com rejected' }, { status: 422 }) : Response.json({ id: 'email-1' });
  };
  return sent;
};
test('LEAD_EMAIL_FALLBACK=off refuses email-only capture when durable GHL configuration is missing', async () => {
  Object.assign(process.env, env); process.env.VERCEL_ENV = 'production'; delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  process.env.RESEND_API_KEY = 'test-only'; process.env.RESEND_FROM = 'hello@example.com'; process.env.LEAD_EMAIL_FALLBACK = 'off';
  let calls = 0; global.fetch = async () => { calls++; return Response.json({ id: 'email-1' }); };
  const response = await quietly(() => POST(request(lead()))); assert.equal(response.status, 503); assert.equal((await response.json()).success, false); assert.equal(calls, 0);
  delete process.env.LEAD_EMAIL_FALLBACK;
});
test('CRM not configured falls back to a confirmed internal email and reports emailed', async () => {
  Object.assign(process.env, env); delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const sent = resendOnly(); pending.length = 0; const logged = [];
  const response = await quietly(() => POST(request(lead())), logged); const body = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual({ success: body.success, status: body.status, fallback: body.fallback, submission_id: body.submission_id, event_id: body.event_id }, { success: true, status: 'emailed', fallback: true, submission_id: 'request-001', event_id: 'request-001' });
  assert.equal(sent.length, 1, 'internal notification is sent before responding'); assert.equal(sent[0].to, 'hello@qognitionagency.com');
  assert.deepEqual(logged.filter(l => l[1] === '[Lead] crm_fallback_email'), [['info', '[Lead] crm_fallback_email', { code: 'not_configured' }]]);
  assert.equal(JSON.stringify(logged).includes('xample.com'), false); assert.equal(JSON.stringify(logged).includes('Technical search support'), false);
  assert.equal(pending.length, 1); await quietly(() => pending[0]());
  assert.equal(sent.length, 2, 'prospect confirmation fires after the response'); assert.equal(sent[1].to, 'Buyer@Example.com');
});
test('fallback without client references generates them', async () => {
  resendOnly(); pending.length = 0;
  const response = await quietly(() => POST(request({ ...lead(), submission_id: undefined, event_id: undefined }))); const body = await response.json();
  assert.equal(body.status, 'emailed'); assert.match(body.submission_id, /^[a-zA-Z0-9_-]{8,80}$/); assert.equal(typeof body.event_id, 'string'); assert.ok(body.event_id.length > 0);
});
test('fallback with advertising consent swallows an unconfigured Meta CAPI without failing confirmation', async () => {
  const sent = resendOnly(); pending.length = 0;
  const response = await quietly(() => POST(request({ ...lead(), consent: { ...lead().consent, advertising: true } })));
  assert.equal((await response.json()).status, 'emailed');
  await quietly(() => pending[0]()); assert.equal(sent.length, 2);
});
test('GHL outage falls back to email', async () => {
  Object.assign(process.env, env); const p = provider({ ghlUnavailable: true }); global.fetch = p.request; pending.length = 0; const logged = [];
  const response = await quietly(() => POST(request({ ...lead(), submission_id: 'request-outage' })), logged);
  assert.equal(response.status, 200); assert.equal((await response.json()).status, 'emailed'); assert.equal(p.emailWrites.length, 1);
  assert.ok(logged.some(l => l[1] === '[Lead] crm_fallback_email' && l[2].code === 'unavailable'));
});
test('CRM not configured and email skipped keeps the retryable 503', async () => {
  Object.assign(process.env, env); delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN; delete process.env.RESEND_API_KEY;
  const sent = resendOnly(); pending.length = 0; const logged = [];
  const response = await quietly(() => POST(request(lead())), logged); const body = await response.json();
  assert.equal(response.status, 503); assert.equal(body.success, false); assert.equal(body.code, 'not_configured'); assert.equal(sent.length, 0); assert.equal(pending.length, 0);
  assert.ok(logged.some(l => l[1] === '[Lead] email_skipped' && l[2].reason === 'missing_api_key'));
  assert.ok(logged.some(l => l[1] === '[Lead] capture_failed'));
  process.env.RESEND_API_KEY = 'test-only';
});
test('missing sender is logged as its own skip reason', async () => {
  delete process.env.RESEND_FROM; resendOnly(); const logged = [];
  assert.equal((await quietly(() => POST(request(lead())), logged)).status, 503);
  assert.ok(logged.some(l => l[1] === '[Lead] email_skipped' && l[2].reason === 'missing_from'));
  process.env.RESEND_FROM = 'hello@example.com';
});
test('CRM not configured and Resend rejection keeps the 503 and logs only status and error name', async () => {
  const sent = resendOnly({ fails: true }); pending.length = 0; const logged = [];
  const response = await quietly(() => POST(request(lead())), logged);
  assert.equal(response.status, 503); assert.equal(sent.length, 1); assert.equal(pending.length, 0);
  assert.ok(logged.some(l => l[1] === '[Lead] email_rejected' && l[2].status === 422 && l[2].name === 'validation_error'));
  assert.equal(JSON.stringify(logged).includes('xample.com'), false); assert.equal(JSON.stringify(logged).includes('to buyer'), false);
  Object.assign(process.env, env);
});
// Operator decision 2026-10-06: the Upstash ledger is optional. It adds exactly-once email and CAPI on retries.
const LEDGER_KEYS = ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'LEAD_LEDGER_HMAC_SECRET'];
const withoutLedger = () => Object.fromEntries(Object.entries(env).filter(([k]) => !LEDGER_KEYS.includes(k)));
test('GHL configured with no ledger captures without contacting Redis and logs ledger_disabled once', async () => {
  Object.assign(process.env, env); for (const k of LEDGER_KEYS) delete process.env[k];
  const p = provider(); global.fetch = p.request; pending.length = 0; const logged = [];
  const response = await quietly(() => POST(request({ ...lead(), submission_id: 'request-noledger' })), logged); const body = await response.json();
  assert.equal(response.status, 200); assert.equal(body.status, 'captured'); assert.equal(body.duplicate, false); assert.equal(body.submission_id, 'request-noledger');
  assert.equal(p.commands.length, 0); assert.equal(p.notes.length, 1);
  await quietly(() => pending[0]()); assert.equal(p.emailWrites.length, 2);
  await quietly(() => captureLeadInCrm({ ...lead(), submission_id: 'request-noledger-2' }, { env: withoutLedger(), fetch: p.request }), logged);
  assert.equal(logged.filter(l => l[1] === '[Lead] ledger_disabled').length, 1, 'logged once per cold start');
  Object.assign(process.env, env);
});
test('without a ledger a retried submission is recognised from its GHL note and conflicting content is refused', async () => {
  const p = provider(); const options = { env: withoutLedger(), fetch: p.request };
  await quietly(() => captureLeadInCrm(lead(), options));
  const retry = await quietly(() => captureLeadInCrm(lead(), options));
  assert.equal(retry.duplicate, true); assert.equal(retry.noteId, 'note-1'); assert.equal(p.notes.length, 1);
  await assert.rejects(quietly(() => captureLeadInCrm({ ...lead(), contact: { ...lead().contact, message: 'Another enquiry' } }, options)), e => e.code === 'submission_conflict');
  assert.equal(p.notes.length, 1); assert.equal(p.commands.length, 0);
});
test('a partially configured ledger is a configuration error, not a silent downgrade', async () => {
  const p = provider();
  await assert.rejects(captureLeadInCrm(lead(), { env: { ...withoutLedger(), UPSTASH_REDIS_REST_URL: 'https://redis.example.com' }, fetch: p.request }), e => e.code === 'misconfigured');
  assert.equal(p.writes.length, 0);
});
// Consent review 2026-10-07 (Anton).
const requestWith = (payload, headers = {}) => { const r = new Request('https://www.qognitionagency.com/api/lead', { method: 'POST', body: JSON.stringify(payload), headers: { 'x-forwarded-for': '192.0.2.1', ...headers } }); r.cookies = { get: () => undefined }; return r; };
const withConsent = (consent, id) => ({ ...lead(), submission_id: id, consent: { ...lead().consent, analytics: true, advertising: true, ...consent } });
const capiHarness = (ghl) => {
  const capi = [], emails = [];
  Object.assign(process.env, { NEXT_PUBLIC_META_PIXEL_ID: 'pixel-test', META_CAPI_ACCESS_TOKEN: 'test-only' });
  global.fetch = async (url, init) => {
    if (String(url).startsWith('https://graph.facebook.com/')) { capi.push(JSON.parse(init.body)); return Response.json({ events_received: 1 }); }
    if (ghl) return ghl(url, init);
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
  assert.equal(leadSchema.safeParse(withConsent({ recorded_at: 'yesterday' })).success, false);
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
  configured(); delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  for (const [name, consent, headers, expected] of cases) {
    const h = capiHarness(); pending.length = 0;
    try {
      const body = await (await quietly(() => POST(requestWith(withConsent(consent, `request-capi-${expected}-${cases.findIndex(c => c[0] === name)}`), headers)))).json();
      assert.equal(body.status, 'emailed', name); for (const run of pending) await quietly(() => run());
      assert.equal(h.capi.length, expected, name);
    } finally { h.done(); }
  }
  configured();
});
test('GHL path also withholds Meta CAPI for a region default in an opt-in region', async () => {
  configured(); const p = provider(); const h = capiHarness(p.request); pending.length = 0;
  try {
    assert.equal((await (await quietly(() => POST(requestWith(withConsent({ basis: 'region_default', recorded_at: '' }, 'request-capi-ghl'), { 'x-vercel-ip-country': 'FR' })))).json()).status, 'captured');
    await quietly(() => pending[0]()); assert.equal(h.capi.length, 0); assert.equal(p.emailWrites.length, 2);
  } finally { h.done(); }
});
test('notification labels the consent basis, country and GPC', async () => {
  configured(); delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN; const sent = resendOnly();
  await quietly(() => POST(requestWith(withConsent({ basis: 'region_default', recorded_at: '' }, 'request-label-1'), { 'x-vercel-ip-country': 'US', 'sec-gpc': '1' })));
  await quietly(() => POST(requestWith(withConsent({ basis: 'explicit', advertising: false }, 'request-label-2'), { 'x-vercel-ip-country': 'de' })));
  const [defaulted, explicit] = sent.filter(m => m.to === 'hello@qognitionagency.com').map(m => m.html);
  for (const text of ['region default', 'Consent basis', 'Visitor country', '>US<', 'Global Privacy Control', 'no explicit choice']) assert.ok(defaulted.includes(text), `default notification lacks ${text}`);
  for (const text of ['explicit yes', '>no<', '>DE<', '>explicit<']) assert.ok(explicit.includes(text), `explicit notification lacks ${text}`);
  const cell = (html, label) => html.match(new RegExp(`>${label}</td><td[^>]*>([^<]*)<`))?.[1];
  assert.deepEqual([cell(defaulted, 'Analytics'), cell(defaulted, 'Advertising')], ['region default', 'region default']);
  assert.deepEqual([cell(explicit, 'Analytics'), cell(explicit, 'Advertising')], ['explicit yes', 'no']);
  configured();
});
test('GHL records the consent basis and country in the optional field and on the note', async () => {
  const p = provider(); const evidence = { basis: 'explicit', country: 'CA', gpc: false };
  await quietly(() => captureLeadInCrm(withConsent({ basis: 'explicit' }, 'request-ghl-basis'), { env: { ...env, GHL_CONSENT_BASIS_FIELD_ID: 'consent_basis' }, fetch: p.request, consentEvidence: evidence }));
  assert.deepEqual(JSON.parse(p.contact.customFields.find(f => f.id === 'consent_basis').value), evidence);
  assert.deepEqual(JSON.parse(p.notes[0].body.split('\n').slice(1).join('\n')).consent_evidence, evidence);
  const q = provider(); await quietly(() => captureLeadInCrm(lead(), { env, fetch: q.request, consentEvidence: evidence }));
  assert.equal(q.writes.find(w => w.kind === 'contact').body.customFields.some(f => f.id === 'consent_basis'), false, 'no field written when the env var is unset');
  await assert.rejects(captureLeadInCrm(lead(), { env: { ...env, GHL_CONSENT_BASIS_FIELD_ID: 'inquiry' }, fetch: p.request }), e => e.code === 'misconfigured');
});
test('ledger receipts expire after LEAD_LEDGER_TTL_DAYS, default 760 days', async () => {
  const receiptTtls = p => p.commands.filter(c => /^-- lead:(begin|save|delivery-claim|delivery-finish)/.test(c[1])).map(c => { assert.match(c[1], /'EX'/); return c.at(-1); });
  const p = provider(); await quietly(() => captureLeadInCrm(lead(), { env, fetch: p.request }));
  assert.ok(receiptTtls(p).length > 0); assert.deepEqual([...new Set(receiptTtls(p))], [String(760 * 86400)]);
  const q = provider(); await quietly(() => captureLeadInCrm(lead(), { env: { ...env, LEAD_LEDGER_TTL_DAYS: '30' }, fetch: q.request }));
  assert.deepEqual([...new Set(receiptTtls(q))], [String(30 * 86400)]);
  for (const bad of ['0', '-5', 'abc', '99999']) await assert.rejects(captureLeadInCrm(lead(), { env: { ...env, LEAD_LEDGER_TTL_DAYS: bad }, fetch: provider().request }), e => e.code === 'misconfigured', bad);
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
    setup({ region: 'granted', gpc: true }); saveConsent(true, true); assert.equal(effectiveConsent().advertising, true, 'an explicit choice beats GPC');
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
    for (const region of [true, false]) for (const gpc of [true, false]) for (const choice of stored) {
      const store = new Map();
      if (choice) store.set(CONSENT_STORAGE_KEY, JSON.stringify({ ...choice, recorded_at: '2026-10-07T00:00:00.000Z', policy_version: CONSENT_POLICY_VERSION }));
      const listeners = {};
      const win = { localStorage: { getItem: k => store.get(k) ?? null }, navigator: { globalPrivacyControl: gpc }, addEventListener: (name, fn) => { listeners[name] = fn; } };
      vm.runInNewContext(consentModeScript(region), { window: win });
      const label = `region=${g(region)} gpc=${gpc} stored=${JSON.stringify(choice)}`;
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
      listeners[CONSENT_EVENT]();
      assert.equal(Array.from(win.dataLayer[1])[1], 'update', label);
    }
  } finally {
    delete global.window; delete global.document; refreshConsentFromStorage();
    if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor); else delete globalThis.navigator;
  }
});
// Code review 2026-10-07 (Owen).
const configured = () => { Object.assign(process.env, env, { RESEND_API_KEY: 'test-only', RESEND_FROM: 'hello@example.com' }); delete process.env.LEAD_EMAIL_FALLBACK; };
test('concurrent POSTs for one submission: one is captured, the other is a busy 503 that sends no email', async () => {
  configured(); const p = provider({ existing: false }); global.fetch = p.request; pending.length = 0;
  const responses = await quietly(() => Promise.all([POST(request({ ...lead(), submission_id: 'request-race' })), POST(request({ ...lead(), submission_id: 'request-race' }))]));
  const bodies = await Promise.all(responses.map(r => r.json()));
  assert.deepEqual(responses.map(r => r.status).sort(), [200, 503]);
  assert.equal(bodies.find(b => !b.success).code, 'busy'); assert.equal(p.emailWrites.length, 0); assert.equal(p.notes.length, 1);
});
test('reconciliation_required via POST is a 503 that sends no email', async () => {
  configured(); const p = provider({ loseNoteResponse: true, dropNote: true });
  await assert.rejects(quietly(() => captureLeadInCrm({ ...lead(), submission_id: 'request-reconcile' }, { env, fetch: p.request })));
  p.options.loseNoteResponse = false; p.options.dropNote = false; global.fetch = p.request; pending.length = 0;
  const response = await quietly(() => POST(request({ ...lead(), submission_id: 'request-reconcile' })));
  assert.equal(response.status, 503); assert.equal((await response.json()).code, 'reconciliation_required'); assert.equal(p.emailWrites.length, 0); assert.equal(pending.length, 0);
});
test('fallback whose Resend call aborts is a 503 and logs only allowlisted codes', async () => {
  configured(); delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN; pending.length = 0; const logged = [];
  global.fetch = async () => { throw new DOMException('The operation was aborted due to timeout', 'AbortError'); };
  const response = await quietly(() => POST(request(lead())), logged);
  assert.equal(response.status, 503); assert.equal(pending.length, 0);
  assert.deepEqual(logged, [['error', '[Lead] capture_failed', { codes: ['not_configured'] }]]);
  configured();
});
test('an unreachable ledger degrades: GHL still captures, and the outage is logged', async () => {
  configured(); const p = provider({ redisUnavailable: true }); global.fetch = p.request; pending.length = 0; const logged = [];
  const response = await quietly(() => POST(request({ ...lead(), submission_id: 'request-degraded' })), logged);
  assert.equal(response.status, 200); assert.equal((await response.json()).status, 'captured'); assert.equal(p.notes.length, 1);
  assert.ok(logged.some(l => l[0] === 'error' && l[1] === '[Lead] ledger_unavailable_degraded'));
  await quietly(() => pending[0]()); assert.equal(p.emailWrites.length, 2);
});
test('ledger and GHL both unreachable falls back to email under its own code', async () => {
  configured(); const p = provider({ redisUnavailable: true, ghlUnavailable: true }); global.fetch = p.request; pending.length = 0; const logged = [];
  const response = await quietly(() => POST(request({ ...lead(), submission_id: 'request-both-down' })), logged);
  assert.equal((await response.json()).status, 'emailed'); assert.equal(p.emailWrites.length, 1);
  assert.ok(logged.some(l => l[1] === '[Lead] crm_fallback_email' && l[2].code === 'ledger_unavailable'));
});
test('deliberate: a retry after a lost fallback 200 re-sends the internal notification and reuses the event_id', async () => {
  configured(); delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN; Object.assign(process.env, { NEXT_PUBLIC_META_PIXEL_ID: 'pixel-test', META_CAPI_ACCESS_TOKEN: 'test-only' });
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
    assert.equal(emails.filter(m => m.to === 'hello@qognitionagency.com').length, 2, 'no ledger, so the internal notification is sent again');
    assert.deepEqual(capi.map(b => b.data[0].event_id), ['request-001', 'request-001'], 'Meta dedups the repeat on the shared event_id');
  } finally { delete process.env.NEXT_PUBLIC_META_PIXEL_ID; delete process.env.META_CAPI_ACCESS_TOKEN; configured(); }
});
// Security review 2026-10-06 (Anton).
test('client IP ignores a spoofed cf-connecting-ip', () => {
  const { getAuditClientIp } = require('../lib/auditRateLimit.ts');
  const ip = headers => getAuditClientIp(new Request('https://www.qognitionagency.com/api/lead', { headers }));
  assert.equal(ip({ 'cf-connecting-ip': '203.0.113.9', 'x-real-ip': '198.51.100.7', 'x-forwarded-for': '192.0.2.1, 10.0.0.1' }), '198.51.100.7');
  assert.equal(ip({ 'cf-connecting-ip': '203.0.113.9', 'x-forwarded-for': '192.0.2.1, 10.0.0.1' }), '192.0.2.1');
  assert.equal(ip({ 'cf-connecting-ip': '203.0.113.9' }), 'unknown');
});
test('fallback sends one prospect confirmation per address per day; the repeat lead is still accepted', async () => {
  Object.assign(process.env, env); delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const sent = resendOnly(); pending.length = 0;
  for (const id of ['request-repeat-1', 'request-repeat-2']) assert.equal((await (await quietly(() => POST(request({ ...lead(), submission_id: id })))).json()).status, 'emailed');
  for (const run of pending) await quietly(() => run());
  assert.equal(sent.filter(m => m.to === 'hello@qognitionagency.com').length, 2); assert.equal(sent.filter(m => m.to === 'Buyer@Example.com').length, 1);
  Object.assign(process.env, env);
});
test('GHL capture sends one prospect confirmation per address per day; both enquiries are captured', async () => {
  Object.assign(process.env, env); const p = provider(); global.fetch = p.request; pending.length = 0;
  for (const id of ['request-repeat-3', 'request-repeat-4']) assert.equal((await (await quietly(() => POST(request({ ...lead(), submission_id: id })))).json()).status, 'captured');
  for (const run of pending) await quietly(() => run());
  assert.equal(p.notes.length, 2); assert.equal(p.emailWrites.filter(m => m.to === 'Buyer@Example.com').length, 1); assert.equal(p.emailWrites.length, 3);
});
test('honeypot receives the same success shape as a real capture and nothing is sent', async () => {
  Object.assign(process.env, env); const p = provider(); global.fetch = p.request; pending.length = 0;
  const real = await (await quietly(() => POST(request({ ...lead(), submission_id: 'request-shape' })))).json();
  let calls = 0; global.fetch = async () => { calls++; throw Error('No network'); }; pending.length = 0;
  const response = await POST(request({ ...lead(), submission_id: 'request-bot', honeypot: 'filled' })); const bot = await response.json();
  assert.equal(response.status, 200); assert.deepEqual(Object.keys(bot).sort(), Object.keys(real).sort());
  assert.equal(bot.success, true); assert.equal(bot.status, 'captured'); assert.equal(bot.duplicate, false); assert.equal(bot.submission_id, 'request-bot');
  assert.equal(calls, 0); assert.equal(pending.length, 0);
});
test('notification subject strips control characters, carries no em dash and is capped at 120', async () => {
  Object.assign(process.env, env); delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN; const sent = resendOnly();
  await quietly(() => POST(request({ ...lead(), source_page: '/x\r\nBcc: a@b.example\u2028' + 'y'.repeat(300), contact: { ...lead().contact, name: 'Test\u0000\u007f\u2029 Buyer' } })));
  const subject = sent[0].subject;
  assert.equal(/[\u0000-\u001f\u007f\u2028\u2029]/.test(subject), false); assert.equal(subject.includes('\u2014'), false); assert.ok(subject.length <= 120, `subject is ${subject.length} chars`);
  assert.match(subject, /Test Buyer/);
  Object.assign(process.env, env);
});
test('notification carries escaped consent evidence; confirmation carries the sender footer', async () => {
  Object.assign(process.env, env); delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN; const sent = resendOnly(); pending.length = 0;
  await quietly(() => POST(request({ ...lead(), submission_id: 'request-consent', consent: { ...lead().consent, email_marketing: true, policy_version: '<b>v1</b>' } })));
  await quietly(() => pending[0]());
  const [notification, confirmation] = sent;
  for (const text of ['request-consent', '&lt;b&gt;v1&lt;/b&gt;', '2026-09-24T00:00:00.000Z', 'Marketing email', 'Advertising']) assert.ok(notification.html.includes(text), `notification lacks ${text}`);
  assert.equal(notification.html.includes('<b>v1</b>'), false);
  assert.ok(confirmation.html.includes('hello@qognitionagency.com')); assert.ok(confirmation.html.includes('Qognition Agency'));
  assert.ok(confirmation.html.includes('You received this because this address was used to submit an enquiry on qognitionagency.com.'));
  assert.equal(/TODO|postal|placeholder/i.test(confirmation.html), false);
  Object.assign(process.env, env);
});
test('marketing consent is written to GHL as opt-in requested, never opted in', async () => {
  const p = provider(); await quietly(() => captureLeadInCrm({ ...lead(), consent: { ...lead().consent, email_marketing: true } }, { env, fetch: p.request }));
  assert.equal(p.contact.customFields.find(f => f.id === 'consent').value, 'opt-in-requested');
});
test('misconfiguration is a distinct code that still falls back and logs an error', async () => {
  await assert.rejects(quietly(() => captureLeadInCrm(lead(), { env: withoutLedger(), fetch: async () => new Response('', { status: 401 }) })), e => e.code === 'misconfigured');
  await assert.rejects(captureLeadInCrm(lead(), { env: { ...env, GHL_LOCALE_FIELD_ID: 'inquiry' } }), e => e.code === 'misconfigured');
  Object.assign(process.env, env, { GHL_LOCALE_FIELD_ID: 'inquiry' }); const sent = resendOnly(); const logged = [];
  const response = await quietly(() => POST(request({ ...lead(), submission_id: 'request-misconfig' })), logged);
  assert.equal((await response.json()).status, 'emailed'); assert.equal(sent.length, 1);
  assert.ok(logged.some(l => l[0] === 'error' && l[1] === '[Lead] crm_misconfigured_fallback' && l[2].code === 'misconfigured'));
  Object.assign(process.env, env);
});
test('Meta CAPI requests are bounded and refuse redirects', async () => {
  const { sendMetaCapiEvent } = require('../lib/metaCapi.ts'); let seen;
  process.env.NEXT_PUBLIC_META_PIXEL_ID = 'pixel-test'; process.env.META_CAPI_ACCESS_TOKEN = 'test-only';
  global.fetch = async (url, init) => { seen = init; return Response.json({ events_received: 1 }); };
  try { await sendMetaCapiEvent({ eventName: 'Lead', eventId: 'request-capi', userData: { email: 'a@example.com' } }); }
  finally { delete process.env.NEXT_PUBLIC_META_PIXEL_ID; delete process.env.META_CAPI_ACCESS_TOKEN; }
  assert.equal(seen.redirect, 'error'); assert.ok(seen.signal instanceof AbortSignal);
});
test('status endpoint reveals nothing without the shared secret', async () => {
  const { GET } = require('../app/api/integrations/status/route.ts');
  const get = (headers = {}) => GET({ headers: new Headers(headers), nextUrl: new URL('https://www.qognitionagency.com/api/integrations/status') });
  process.env.INTEGRATIONS_STATUS_SECRET = 'status-test-secret';
  try {
    assert.deepEqual(await (await get()).json(), { ok: true });
    assert.deepEqual(await (await get({ 'x-status-secret': 'wrong' })).json(), { ok: true });
    const detail = await (await get({ 'x-status-secret': 'status-test-secret' })).json();
    assert.equal(typeof detail.capture, 'object'); assert.notEqual(detail.notificationDelivery, 'after-confirmed-crm-capture');
    delete process.env.INTEGRATIONS_STATUS_SECRET;
    assert.deepEqual(await (await get({ 'x-status-secret': '' })).json(), { ok: true });
  } finally { delete process.env.INTEGRATIONS_STATUS_SECRET; }
});
test('API accepts committed GHL capture; notifications happen afterward exactly once', async () => {
  Object.assign(process.env, env); const p = provider(); global.fetch = p.request; pending.length = 0;
  const response = await POST(request(lead())); const body = await response.json();
  assert.equal(response.status, 200); assert.equal(body.status, 'captured'); assert.equal(p.emailWrites.length, 0);
  assert.equal(pending.length, 1); await pending[0](); assert.equal(p.emailWrites.length, 2);
  await pending[0](); assert.equal(p.emailWrites.length, 2);
  const retry = await POST(request(lead())); assert.equal((await retry.json()).duplicate, true); assert.equal(pending.length, 1);
  const conflict = await POST(request({ ...lead(), contact: { ...lead().contact, message: 'Another enquiry' } })); assert.equal(conflict.status, 409);
});
test('notification outage cannot undo capture or cause retry duplicates', async () => {
  const p = provider({ emailUnknown: true }); global.fetch = p.request; pending.length = 0;
  const response = await POST(request({ ...lead(), submission_id: 'request-003' })); assert.equal(response.status, 200);
  await pending[0](); await pending[0](); assert.equal(p.emailWrites.length, 2);
  assert.equal(p.notes.length, 1);
});
test('DND survives capture and suppresses prospect confirmation', async () => {
  const p = provider({ dnd: true }); global.fetch = p.request; pending.length = 0;
  assert.equal((await POST(request({ ...lead(), submission_id: 'request-004' }))).status, 200);
  await pending[0](); assert.equal(p.contact.dnd, true); assert.equal(p.emailWrites.length, 1); assert.notEqual(p.emailWrites[0].to, 'Buyer@Example.com');
});
test('channel-specific email DND suppresses confirmation without changing channel settings', async () => {
  const p = provider(); p.contact.dndSettings = { email: { status: 'active' } }; global.fetch = p.request; pending.length = 0;
  assert.equal((await POST(request({ ...lead(), submission_id: 'request-005' }))).status, 200);
  await pending[0](); assert.equal(p.contact.dndSettings.email.status, 'active'); assert.equal(p.emailWrites.length, 1);
});
test('failure diagnostics never print contact or provider content', async () => {
  const { recordFailedLead } = require('../lib/leadDelivery.ts'); const old = console.error; const logged = [];
  console.error = (...args) => logged.push(args);
  try { recordFailedLead(lead(), { capture: 'provider body buyer@example.com Technical search support' }); } finally { console.error = old; }
  assert.equal(JSON.stringify(logged).includes('buyer@example.com'), false); assert.equal(JSON.stringify(logged).includes('Technical search support'), false);
});
test('ledger and GHL both down, with email failing too, logs its own allowlisted code', () => {
  const { recordFailedLead } = require('../lib/leadDelivery.ts'); const logged = [];
  const old = console.error; console.error = (...args) => logged.push(args);
  try { recordFailedLead(lead(), { capture: 'ledger_unavailable' }); } finally { console.error = old; }
  assert.deepEqual(logged, [['[Lead] capture_failed', { codes: ['ledger_unavailable'] }]]);
});
test('ledger rejects insecure endpoint and missing shared secret', () => {
  assert.equal(ledgerConfiguration({ ...env, UPSTASH_REDIS_REST_URL: 'http://redis.example.com' }).configured, false);
  assert.throws(() => createLeadLedger({ ...env, LEAD_LEDGER_HMAC_SECRET: '' }));
});
// Operator 2026-10-14: every lead ends up in /contact and emails hello@ through Resend.
// The five-field form sends name, work email, website, message and company size only.
const shortLead = (id, extra = {}) => ({
  service: 'marketing', intent: 'contact', source_page: '/contact', submission_id: id, event_id: id,
  contact: { name: 'Test Buyer', email: 'buyer@example.com', company_url: 'example.com', message: 'Help us get named in AI answers' },
  qualification: { employee_band: '100-300' },
  consent: { analytics: false, advertising: false, basis: 'region_default', recorded_at: '', policy_version: '2026-10-07' },
  ...extra,
});
const toNotify = emails => emails.filter(m => m.to === 'hello@qognitionagency.com');
test('schema accepts the five-field payload with company, business model, revenue and marketing consent absent or unknown', () => {
  assert.equal(leadSchema.safeParse(shortLead('request-short-schema')).success, true);
  const unknowns = shortLead('request-short-unknown', { qualification: { employee_band: '20-99', business_model: 'unknown', revenue_band: 'unknown' }, contact: { ...shortLead('x').contact, company: '' } });
  assert.equal(leadSchema.safeParse(unknowns).success, true);
  assert.equal(leadSchema.safeParse(shortLead('request-short-noconsent', { consent: undefined })).success, true);
  // Older cached clients still submit the full payload.
  assert.equal(leadSchema.safeParse(lead()).success, true);
});
test('short payload: GHL ok without Upstash captures and emails hello@ through Resend', async () => {
  configured(); for (const k of LEDGER_KEYS) delete process.env[k];
  const p = provider(); global.fetch = p.request; pending.length = 0;
  const response = await quietly(() => POST(request(shortLead('request-short-ghl'))));
  const body = await response.json();
  assert.equal(response.status, 200); assert.equal(body.status, 'captured'); assert.equal(p.commands.length, 0, 'no Redis call');
  assert.equal(p.contact.customFields.find(f => f.id === 'eligibility').value, 'MQL');
  assert.equal(p.contact.customFields.find(f => f.id === 'consent').value, 'not-opted-in');
  assert.equal(pending.length, 1); await quietly(() => pending[0]());
  assert.equal(toNotify(p.emailWrites).length, 1, 'notification sent with no ledger');
  configured();
});
test('short payload: GHL down falls back to a synchronous Resend email before the response', async () => {
  configured(); const p = provider({ ghlUnavailable: true }); global.fetch = p.request; pending.length = 0;
  const response = await quietly(() => POST(request(shortLead('request-short-down'))));
  assert.equal(response.status, 200); assert.equal((await response.json()).status, 'emailed');
  assert.equal(toNotify(p.emailWrites).length, 1, 'notification sent before the response, not in after()');
});
test('short payload: GHL down and Resend rejecting is a retryable 503, never a false success', async () => {
  configured(); const p = provider({ ghlUnavailable: true, emailFails: true }); global.fetch = p.request; pending.length = 0;
  const response = await quietly(() => POST(request(shortLead('request-short-reject')))); const body = await response.json();
  assert.equal(response.status, 503); assert.equal(body.success, false); assert.equal(body.retryable, true); assert.equal(pending.length, 0);
});
test('short payload: GHL ok and Resend rejecting keeps the GHL capture and logs the failed notification', async () => {
  configured(); const p = provider({ emailFails: true }); global.fetch = p.request; pending.length = 0; const logged = [];
  const response = await quietly(() => POST(request(shortLead('request-short-ghl-reject'))), logged);
  assert.equal(response.status, 200); assert.equal((await response.json()).status, 'captured');
  await quietly(() => pending[0](), logged);
  assert.ok(logged.some(l => l[1] === '[Lead] downstream_delivery_failed' && l[2].kind === 'notification'));
});
test('LEAD_EMAIL_FALLBACK=off with GHL down is a 503 and sends nothing', async () => {
  configured(); process.env.LEAD_EMAIL_FALLBACK = 'off'; const p = provider({ ghlUnavailable: true }); global.fetch = p.request; pending.length = 0;
  try {
    const response = await quietly(() => POST(request(shortLead('request-short-strict'))));
    assert.equal(response.status, 503); assert.equal(p.emailWrites.length, 0); assert.equal(pending.length, 0);
  } finally { configured(); }
});
test('a ledger that fails after capture still sends the hello@ notification, but never an unclaimed prospect email', async () => {
  configured(); const p = provider(); global.fetch = p.request; pending.length = 0; const logged = [];
  const response = await quietly(() => POST(request(shortLead('request-short-claim'))), logged);
  assert.equal((await response.json()).status, 'captured');
  p.options.redisUnavailable = true;
  await quietly(() => pending[0](), logged);
  assert.equal(toNotify(p.emailWrites).length, 1, 'internal notification is not lost to a ledger outage');
  assert.equal(p.emailWrites.filter(m => m.to === 'buyer@example.com').length, 0, 'prospect confirmation stays exactly-once');
  assert.ok(logged.some(l => l[1] === '[Lead] delivery_claim_unavailable' && l[2].kind === 'notification'));
});
test('with a working ledger the notification is still sent exactly once across retries', async () => {
  configured(); const p = provider(); global.fetch = p.request; pending.length = 0;
  await quietly(() => POST(request(shortLead('request-short-once'))));
  await quietly(() => pending[0]()); await quietly(() => pending[0]());
  assert.equal(toNotify(p.emailWrites).length, 1);
});
test('an audit request tagged by funnel context reaches GHL and the notification subject and rows', async () => {
  // Same constant Mira's /contact and /free-ai-audit use, so client and server cannot drift.
  const { AUDIT_ASSET_ID, readFunnelContext } = require('../lib/funnelContext.ts');
  const fromUrl = readFunnelContext(new URLSearchParams(`asset_id=${AUDIT_ASSET_ID}&page_id=/free-ai-audit&stage=bofu`));
  // Tagged by context alone (intent 'contact'), to prove the context tag is enough by itself.
  const tagged = shortLead('request-short-audit', { context: fromUrl });
  assert.equal(leadSchema.parse(tagged).context.asset_id, AUDIT_ASSET_ID);
  configured(); const p = provider(); global.fetch = p.request; pending.length = 0;
  assert.equal((await (await quietly(() => POST(request(tagged)))).json()).status, 'captured');
  const snapshot = JSON.parse(p.contact.customFields.find(f => f.id === 'inquiry').value);
  assert.equal(snapshot.request_type, 'free-ai-visibility-audit'); assert.equal(snapshot.context.asset_id, AUDIT_ASSET_ID);
  assert.equal(p.writes.find(w => w.kind === 'note').body.title, 'Website enquiry: Free AI visibility audit');
  assert.equal(JSON.parse(p.notes[0].body.split('\n').slice(1).join('\n')).request_type, 'free-ai-visibility-audit');
  await quietly(() => pending[0]());
  const [mail] = toNotify(p.emailWrites);
  assert.match(mail.subject, /^\[Free AI visibility audit\] Test Buyer/);
  const cell = (html, label) => html.match(new RegExp(`>${label}</td><td[^>]*>([^<]*)<`))?.[1];
  assert.equal(cell(mail.html, 'Request'), 'Free AI visibility audit');
  assert.equal(cell(mail.html, 'Company size'), '100-300 staff');
  // The same tag survives the GHL-down fallback.
  const q = provider({ ghlUnavailable: true }); global.fetch = q.request; pending.length = 0;
  await quietly(() => POST(request({ ...tagged, submission_id: 'request-short-audit-2', event_id: 'request-short-audit-2' })));
  assert.match(toNotify(q.emailWrites)[0].subject, /^\[Free AI visibility audit\]/);
});
test('intent audit from an older client is also an audit request; a plain enquiry is labelled as one', async () => {
  configured(); delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN; const sent = resendOnly(); pending.length = 0;
  await quietly(() => POST(request(shortLead('request-short-legacy-audit', { intent: 'audit' }))));
  await quietly(() => POST(request(shortLead('request-short-plain'))));
  const [audit, plain] = toNotify(sent);
  assert.match(audit.subject, /^\[Free AI visibility audit\]/);
  assert.equal(plain.html.match(/>Request<\/td><td[^>]*>([^<]*)</)?.[1], 'Enquiry');
  assert.equal(/Free AI visibility audit/.test(plain.subject), false);
  configured();
});
// Ruth, 2026-10-14: "marketing" is the retired spoke and never leads a notification subject.
test('non-audit notifications lead with [Enquiry], newsletter signups with [Newsletter signup]', async () => {
  configured(); delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN; const sent = resendOnly(); pending.length = 0;
  await quietly(() => POST(request(shortLead('request-label-enquiry'))));
  await quietly(() => POST(request(shortLead('request-label-news', { intent: 'newsletter', consent: { ...shortLead('x').consent, email_marketing: true }, context: { asset_id: 'free-ai-visibility-audit' } }))));
  const [enquiry, newsletter] = toNotify(sent);
  const cell = (html, label) => html.match(new RegExp(`>${label}</td><td[^>]*>([^<]*)<`))?.[1];
  assert.match(enquiry.subject, /^\[Enquiry\] Test Buyer/); assert.equal(/marketing/i.test(enquiry.subject), false);
  assert.equal(cell(enquiry.html, 'Request'), 'Enquiry');
  assert.match(newsletter.subject, /^\[Newsletter signup\] Test Buyer/, 'newsletter wins over an inherited audit tag');
  assert.equal(cell(newsletter.html, 'Request'), 'Newsletter signup');
  configured();
});

(async () => {
  // The in-memory rate state is process-wide; each test starts with none.
  for (const [name, fn] of tests) { delete globalThis.__qognitionRateState; await fn(); console.log(`PASS ${name}`); }
  console.log(`${tests.length} funnel contract tests passed; all network requests mocked.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
