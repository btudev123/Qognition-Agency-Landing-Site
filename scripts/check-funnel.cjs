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
const sources = [...walk('app'), ...walk('components')].filter((f) => !f.includes('siteConfig'));
const hardCoded = sources.filter((f) => fs.readFileSync(f, 'utf8').includes('leadconnectorhq.com'));
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

console.log(
  `✓ funnel: booking resolves from one constant in ${sources.length} source files, contact links ` +
  `well-formed, /free-ai-audit posts to /api/lead, calendar embedded on the homepage at #book.`
);
