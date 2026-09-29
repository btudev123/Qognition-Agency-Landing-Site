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
const env = { GHL_PRIVATE_INTEGRATION_TOKEN: 'test-only', GHL_LOCATION_ID: 'test-location', GHL_INQUIRY_FIELD_ID: 'inquiry', GHL_SUBMISSION_FIELD_ID: 'receipts', GHL_QUALIFICATION_FIELD_ID: 'eligibility', GHL_MARKETING_CONSENT_FIELD_ID: 'consent', GHL_LOCALE_FIELD_ID: 'locale' };
const lead = () => leadSchema.parse({ service: 'marketing', intent: 'consultation', source_page: '/services/ai-seo', submission_id: 'request-001', event_id: 'request-001', contact: { name: 'Test Buyer', email: 'Buyer@Example.com', company_url: 'example.com', message: 'Technical search support' }, context: { locale: 'de' }, qualification: { business_model: 'b2b', employee_band: '20-99' }, consent: { email_marketing: false, analytics: false, advertising: false, recorded_at: '2026-09-24T00:00:00.000Z', policy_version: '2026-09-24' } });

function provider({ existing = true, loseFields = false, loseInquiry = false } = {}) {
  let contact = existing ? { id: 'contact-1', assignedTo: 'owner', tags: ['customer'], dnd: true, source: 'referral', customFields: [{ id: 'sales_stage', value: 'Customer' }, { id: 'unrelated', value: 'keep' }] } : null;
  const writes = [];
  const request = async (url, init = {}) => {
    if (url.includes('/contacts/search/duplicate?')) return Response.json({ contact: contact ? { id: contact.id } : null });
    if (url.endsWith('/contacts/contact-1')) return Response.json({ contact });
    if (url.endsWith('/contacts/upsert')) {
      const body = JSON.parse(init.body); writes.push(body);
      const fields = new Map((contact?.customFields || []).map(f => [f.id, f.value]));
      for (const field of body.customFields) if (!loseInquiry || field.id !== 'inquiry') fields.set(field.id, field.fieldValue);
      contact = { ...contact, id: 'contact-1', customFields: loseFields ? [] : [...fields].map(([id, value]) => ({ id, value })) };
      return Response.json({ contact: { id: 'contact-1' } });
    }
    throw Error(`Unexpected mocked request ${url}`);
  };
  return { request, writes, get contact() { return contact; } };
}

const tests = [];
const test = (name, fn) => tests.push([name, fn]);
test('legacy schema accepted and client lifecycle fields are stripped', () => {
  const result = leadSchema.parse({ service: 'tech', intent: 'contact', source_page: '/contact', contact: { name: 'Test', email: 'a@example.com' }, lifecycle: 'SQL' });
  assert.equal(result.lifecycle, undefined); assert.equal(result.service, 'tech');
});
test('only fit plus service intent yields MQL; SQL is never inferred', () => {
  assert.equal(qualifyLead(lead()).eligibility, 'MQL');
  assert.equal(qualifyLead({ ...lead(), qualification: undefined }).eligibility, 'Lead');
  assert.equal(qualifyLead({ ...lead(), intent: 'newsletter' }).eligibility, 'Lead');
  assert.equal(qualifyLead({ ...lead(), qualification: { business_model: 'b2c', employee_band: '20-99' } }).eligibility, 'Lead');
});
test('no configuration fails without network access', async () => {
  assert.equal(crmConfiguration({}).configured, false);
  await assert.rejects(captureLeadInCrm(lead(), { env: {} }), e => e.code === 'not_configured');
});
test('capture verifies persisted inquiry and preserves existing CRM ownership', async () => {
  const p = provider(); const result = await captureLeadInCrm(lead(), { env, fetch: p.request });
  assert.equal(result.duplicate, false); assert.equal(result.contactId, 'contact-1');
  const write = p.writes[0];
  for (const forbidden of ['tags', 'assignedTo', 'dnd', 'dndSettings', 'source', 'pipelineId', 'pipelineStageId', 'name', 'companyName', 'website', 'phone']) assert.equal(Object.hasOwn(write, forbidden), false);
  assert.equal(write.email, 'buyer@example.com');
  assert.equal(write.customFields.some(f => f.id === 'sales_stage' || f.id === 'unrelated'), false);
  assert.equal(p.contact.customFields.find(f => f.id === 'sales_stage').value, 'Customer');
  assert.equal(p.contact.customFields.find(f => f.id === 'unrelated').value, 'keep');
  assert.equal(write.customFields.find(f => f.id === 'eligibility').fieldValue, 'MQL');
  assert.equal(write.customFields.find(f => f.id === 'consent').fieldValue, 'not-opted-in');
});
test('retry of a persisted receipt does not repeat writes or restart workflow', async () => {
  const p = provider({ existing: false });
  await captureLeadInCrm(lead(), { env, fetch: p.request });
  assert.equal((await captureLeadInCrm(lead(), { env, fetch: p.request })).duplicate, true);
  assert.equal(p.writes.length, 1);
  await assert.rejects(captureLeadInCrm({ ...lead(), contact: { ...lead().contact, message: 'changed' } }, { env, fetch: p.request }), e => e.code === 'submission_conflict');
});
test('simultaneous same-process retries serialize and persist once', async () => {
  const p = provider({ existing: false });
  const result = await Promise.all([captureLeadInCrm(lead(), { env, fetch: p.request }), captureLeadInCrm(lead(), { env, fetch: p.request })]);
  assert.equal(p.writes.length, 1); assert.deepEqual(result.map(r => r.duplicate), [false, true]);
});
test('provider error and incomplete persistence are not accepted', async () => {
  await assert.rejects(captureLeadInCrm(lead(), { env, fetch: async () => new Response('failure', { status: 503 }) }), e => e.code === 'unavailable');
  const p = provider({ loseFields: true });
  await assert.rejects(captureLeadInCrm(lead(), { env, fetch: p.request }), e => e.code === 'invalid_response');
});
test('a receipt without the inquiry never turns a failed save into retry success', async () => {
  const p = provider({ loseInquiry: true });
  await assert.rejects(captureLeadInCrm(lead(), { env, fetch: p.request }), e => e.code === 'invalid_response');
  await assert.rejects(captureLeadInCrm(lead(), { env, fetch: p.request }), e => e.code === 'invalid_response');
  assert.equal(p.writes.length, 2);
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
test('API returns retryable failure when email and CRM both fail; never fake success', async () => {
  Object.assign(process.env, env);
  global.fetch = async () => new Response('outage', { status: 503 });
  const response = await POST(request(lead()));
  assert.equal(response.status, 503); assert.equal((await response.json()).success, false);
});
test('API accepts via CRM when email is not configured; duplicate retry has no downstream tasks', async () => {
  const p = provider({ existing: false }); global.fetch = p.request;
  delete process.env.RESEND_API_KEY; delete process.env.RESEND_FROM; pending.length = 0;
  let response = await POST(request(lead())); assert.equal(response.status, 200); assert.equal((await response.json()).status, 'captured');
  assert.equal(pending.length, 1); await pending[0](); // No consent = no advertising calls.
  response = await POST(request(lead())); assert.equal((await response.json()).duplicate, true); assert.equal(pending.length, 1);
});
test('API accepts via email when CRM is not configured', async () => {
  delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  process.env.RESEND_API_KEY = 'resend-test'; process.env.RESEND_FROM = 'Qognition <hello@qognitionagency.com>';
  global.fetch = async (url) => {
    if (String(url).includes('api.resend.com')) return Response.json({ id: 'email-1' });
    throw Error('Unexpected network in email-first test');
  };
  pending.length = 0;
  const response = await POST(request(lead()));
  assert.equal(response.status, 200); assert.equal((await response.json()).status, 'captured');
  assert.equal(pending.length, 1); await pending[0]();
  Object.assign(process.env, env); delete process.env.RESEND_API_KEY; delete process.env.RESEND_FROM;
});

(async () => {
  for (const [name, fn] of tests) { await fn(); console.log(`PASS ${name}`); }
  console.log(`${tests.length} funnel contract tests passed; all network requests mocked.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
