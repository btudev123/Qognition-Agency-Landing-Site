#!/usr/bin/env node
/* Guards the lead funnel. Every path a prospect can take to reach us.
 *
 * WHY: data/siteConfig.ts says "Swap it in one place and the whole site
 * follows." That was false. On 2026-09-29 twelve files hard-coded the
 * LeadConnector booking URL, bypassing BOOKING_LINK entirely, so changing the
 * calendar would have silently broken the booking path on the industries tree,
 * the blog, every location page, every service page and the free tools. The
 * comment described an intent nobody was enforcing.
 *
 * The operator has made the form and the calendar the entire lead channel, so a
 * broken path here is not a layout bug, it is a lost client.
 */
require('./lib/load-typescript.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { BOOKING_LINK, WHATSAPP_LINK, PHONE_LINK, CONTACT_EMAIL } = require('../data/siteConfig.ts');

/* 1. One source of truth for the calendar. */
const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
};
// lib/ included: on 2026-10-06 spokes, the audit email and the audit PDF still hard-coded it.
const sources = [...walk('app'), ...walk('components'), ...walk('lib')].filter((f) => !f.includes('siteConfig'));
// services.leadconnectorhq.com is the GHL REST API used by lib/leadCrm.ts, not the calendar.
const hardCoded = sources.filter((f) => /(?<!services\.)leadconnectorhq\.com/.test(fs.readFileSync(f, 'utf8')));
assert.deepEqual(
  hardCoded, [],
  `${hardCoded.length} file(s) hard-code the booking URL instead of importing BOOKING_LINK:\n  ` +
  hardCoded.join('\n  ') +
  `\nsiteConfig.ts promises one swap changes the whole site. A hard-coded copy breaks that promise ` +
  `silently, on the path the operator has made the entire lead channel.`
);

/* 2. The contact constants must produce working links. A leading "+" in
      WHATSAPP_NUMBER produced wa.me/+91... which WhatsApp rejects, and
      tel:++91... which does not dial. Both shipped. */
assert.ok(/^https:\/\/wa\.me\/\d{8,15}$/.test(WHATSAPP_LINK), `WHATSAPP_LINK is malformed: ${WHATSAPP_LINK}. wa.me takes digits only, no leading plus.`);
assert.ok(/^tel:\+\d{8,15}$/.test(PHONE_LINK), `PHONE_LINK is malformed: ${PHONE_LINK}. Expected exactly one leading plus.`);
assert.ok(/^https:\/\//.test(BOOKING_LINK), `BOOKING_LINK is not an absolute URL: ${BOOKING_LINK}`);
assert.ok(/@/.test(CONTACT_EMAIL), `CONTACT_EMAIL is malformed: ${CONTACT_EMAIL}`);

/* 3. The audit page must carry a real form. It is the primary CTA on the
      homepage in three places, and the operator's model is form-first with a
      human delivering the report. */
const auditView = fs.readFileSync('components/LocalAuditExperience.tsx', 'utf8');
assert.ok(auditView.includes('LeadForm'), '/free-ai-audit no longer renders LeadForm. That page is the destination of the primary CTA.');
const leadForm = fs.readFileSync('components/shared/LeadForm.tsx', 'utf8');
assert.ok(leadForm.includes("'/api/lead'"), 'LeadForm no longer posts to /api/lead.');

/* 4. The homepage must expose the calendar on the page, not only as a link.
      Every navigation between intent and a held slot loses people who had
      already decided. */
const home = fs.readFileSync('components/AcquisitionHome.tsx', 'utf8');
assert.ok(home.includes('BookCall'), 'The homepage no longer renders the BookCall section, so the calendar is behind a navigation again.');
const bookCall = fs.readFileSync('components/home/BookCall.tsx', 'utf8');
/* Checks the JSX, not the word. `includes('CalBooking')` passed on a commented-out
   import, which is the substring-matches-a-comment defect this project keeps
   producing. Strip comments first, then look for the element. */
const bookCallCode = bookCall.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
assert.ok(
  /<CalBooking[\s/>]/.test(bookCallCode),
  'BookCall no longer renders a <CalBooking> element, so the band is a heading with no calendar under it.'
);
assert.ok(bookCall.includes('id="book"'), 'BookCall lost its id="book" anchor, which the hero CTA targets.');
const hero = fs.readFileSync('components/home/Hero.tsx', 'utf8');
assert.ok(hero.includes('href="#book"'), 'The hero secondary CTA no longer points at the on-page calendar.');

/* 5. One machine-readable self-description, and it names the priority pages.
      On 2026-10-06 production served three different ones: /llms.txt from the
      route (retired "Demand, ABM, Revenue Systems" positioning), /llm.txt from a
      static public file (invented offices, published prices, the retired spokes)
      that every page's Link header advertised, and a public/llms.txt that the
      route shadowed in production and that made `next dev` 500 with "conflicting
      public file and page file". The route is now the only source. */
for (const stale of ['public/llms.txt', 'public/llm.txt']) {
  assert.ok(
    !fs.existsSync(stale),
    `${stale} exists. app/llms.txt/route.ts (lib/llms.ts) is the single source; a static copy drifts ` +
    `silently and public/llms.txt conflicts with the route.`
  );
}
const nextConfig = fs.readFileSync('next.config.mjs', 'utf8');
assert.ok(
  /source:\s*'\/llm\.txt',\s*destination:\s*'\/llms\.txt',\s*permanent:\s*true/.test(nextConfig),
  'next.config.mjs no longer 308s /llm.txt to /llms.txt. Crawlers cached the old address from the Link header.'
);
assert.ok(
  fs.readFileSync('proxy.ts', 'utf8').includes('</llms.txt>; rel="alternate"'),
  'proxy.ts Link header no longer advertises /llms.txt.'
);

const { buildLlmsTxt } = require('../lib/llms.ts');
const { SITE_URL } = require('../lib/seo.ts');
const llms = buildLlmsTxt();
/* The operator's 18 priority pages (2026-10-06). /free-seo-audit is a 308 to
   /free-ai-audit (next.config.mjs), so it is satisfied by its destination plus
   that redirect: listing a redirecting URL in llms.txt would send readers
   through a hop. Matched as `(<absolute url>)` so /services cannot pass on the
   strength of /services/seo, nor /locations/perth on /locations/perth/seo. */
const PRIORITY = [
  '/', '/services', '/services/seo', '/services/ai-seo', '/services/ppc',
  '/services/web-development', '/services/content', '/services/branding-creative',
  '/services/cro-analytics', '/industries', '/case-studies', '/free-seo-audit',
  '/locations/new-york', '/locations/london', '/locations/dubai',
  '/locations/perth/ai-seo', '/locations/perth', '/locations/perth/seo',
];
const REDIRECTED = { '/free-seo-audit': '/free-ai-audit' };
for (const [from, to] of Object.entries(REDIRECTED)) {
  const rule = new RegExp(`source:\\s*'${from}',\\s*destination:\\s*'${to}',\\s*permanent:\\s*true`);
  assert.ok(rule.test(nextConfig), `${from} is no longer a 308 to ${to}, so llms.txt must list ${from} itself.`);
}
const missing = PRIORITY
  .map((p) => REDIRECTED[p] || p)
  .filter((p) => !llms.includes(`(${p === '/' ? SITE_URL : SITE_URL + p})`));
assert.deepEqual(missing, [], `llms.txt is missing priority page(s): ${missing.join(', ')}`);
assert.ok(!llms.includes('$'), 'llms.txt contains "$". No public prices (2026-10-03 authority note).');
assert.ok(!llms.includes('\u2014'), 'llms.txt contains an em dash (CLAUDE.md §10).');

/* 6. Offices, operator 2026-10-08: Toronto, New York, Dubai, Sydney and Gurugram,
      no headquarters, city and country only. Until that date the site named one HQ
      (Gurugram) in schema and copy, and before that production claimed London,
      Mumbai and Bangalore offices that do not exist. One list, data/siteConfig.ts,
      and every surface below is derived from it. */
const { OFFICES, hasOffice, officeAnswerFor } = require('../data/siteConfig.ts');
const { organizationSchema } = require('../lib/schema.ts');
const { LOCATIONS } = require('../data/locations.ts');
assert.deepEqual(
  OFFICES.map((o) => `${o.city}/${o.countryCode}`),
  ['Toronto/CA', 'New York/US', 'Dubai/AE', 'Sydney/AU', 'Gurugram/IN'],
  'OFFICES no longer matches the operator list (2026-10-08) or its display order.'
);
for (const slug of ['toronto', 'new-york', 'dubai', 'sydney', 'gurugram', 'gurgaon', 'New York City']) {
  assert.ok(hasOffice(slug), `hasOffice("${slug}") is false; it names an office city.`);
}
for (const slug of ['london', 'mumbai', 'bangalore', 'bengaluru', 'perth', 'delhi', 'noida', 'haryana']) {
  assert.ok(!hasOffice(slug), `hasOffice("${slug}") is true; only the five office cities may read as offices.`);
}
assert.ok(!hasOffice('sydney', 'CA') && !hasOffice('toronto', 'US'), 'hasOffice ignores the country, so a same-named town elsewhere reads as an office.');
const officeSlugs = LOCATIONS.filter((l) => l.type === 'city' && officeAnswerFor(l.name, l.slug, l.country).startsWith('Yes.')).map((l) => l.slug).sort();
assert.deepEqual(officeSlugs, ['dubai', 'gurugram', 'new-york', 'sydney', 'toronto'], `Location pages answering "Yes" to the office FAQ: ${officeSlugs.join(', ')}.`);
const org = organizationSchema();
assert.ok(!('address' in org), 'Organization JSON-LD carries `address`, which marks one office as the main address. There is no HQ.');
assert.equal(org.location.length, OFFICES.length, 'Organization JSON-LD does not list every office as a location.');
for (const place of org.location) {
  assert.equal(place['@type'], 'Place');
  assert.deepEqual(Object.keys(place.address).sort(), ['@type', 'addressCountry', 'addressLocality'], 'An office address carries more than city and country.');
}
assert.ok(!JSON.stringify(org).includes('streetAddress'), 'Organization JSON-LD has a streetAddress. City and country only.');
assert.ok(llms.includes('Offices: Toronto, New York, Dubai, Sydney and Gurugram.'), 'llms.txt does not list the five offices.');
/* Narrow on purpose: market descriptions legitimately tell a CLIENT to separate its
   own headquarters from its buyers' markets. What may not appear is ours. */
assert.ok(!/Headquarters:|headquartered in/i.test(llms), 'llms.txt names a Qognition headquarters. There is none.');
for (const file of ['app/about/page.tsx', 'app/contact/page.tsx', 'app/team/page.tsx']) {
  const src = fs.readFileSync(file, 'utf8');
  assert.ok(src.includes('<OfficeList'), `${file} no longer renders the office list.`);
  assert.ok(!/headquartered|HQ_DISPLAY|London office|Mumbai|Bangalore/i.test(src), `${file} names a headquarters or an office that does not exist.`);
}

console.log(
  `✓ funnel: booking resolves from one constant in ${sources.length} source files, contact links ` +
  `well-formed, /free-ai-audit posts to /api/lead, calendar embedded on the homepage at #book.`
);
console.log(
  `✓ llms: one source (route), /llm.txt 308s to /llms.txt, ${PRIORITY.length} priority pages listed ` +
  `(/free-seo-audit via its 308 destination), no "$", no em dash.`
);
console.log(`✓ offices: ${OFFICES.length} from one list, no HQ, schema city and country only, location FAQs derived.`);
