#!/usr/bin/env node
/* Guards the lead funnel. Every path a prospect can take to reach us.
 *
 * WHY: data/siteConfig.ts says "Swap it in one place and the whole site
 * follows." That was false. On 2026-09-29 twelve files hard-coded the
 * previous calendar's booking URL, bypassing BOOKING_LINK entirely, so changing the
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
const { BOOKING_LINK, CAL_LINK, CAL_EMBED_SCRIPT, WHATSAPP_LINK, PHONE_LINK, CONTACT_EMAIL } = require('../data/siteConfig.ts');

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
const readNextConfig = () => fs.readFileSync('next.config.mjs', 'utf8');
const hardCoded = sources.filter((f) => /cal\.com\/qognition-agency/i.test(fs.readFileSync(f, 'utf8')));
assert.deepEqual(
  hardCoded, [],
  `${hardCoded.length} file(s) hard-code the booking URL instead of importing BOOKING_LINK or CAL_LINK:\n  ` +
  hardCoded.join('\n  ') +
  `\nsiteConfig.ts promises one swap changes the whole site. A hard-coded copy breaks that promise ` +
  `silently, on the path the operator has made the entire lead channel.`
);

/* 1b. Cal.com is the calendar, operator 2026-10-14: cal.com/qognition-agency/15min.
       GoHighLevel's booking widget (leadconnectorhq.com) and its resize script
       (msgsndr.com) are gone, and no served code may name either domain again: a
       stale reference is either a dead calendar or a request to a vendor we left.
       "Served code" is every file the build can ship: app/, components/, lib/, data/,
       proxy.ts and next.config.mjs. Comments count, so the vendor cannot creep back in
       as a "temporary" note. */
assert.equal(CAL_LINK, 'qognition-agency/15min', `CAL_LINK is ${CAL_LINK}. The operator chose qognition-agency/15min on 2026-10-14.`);
assert.equal(BOOKING_LINK, 'https://cal.com/qognition-agency/15min', `BOOKING_LINK is ${BOOKING_LINK}.`);
assert.equal(CAL_EMBED_SCRIPT, 'https://app.cal.com/embed/embed.js', `CAL_EMBED_SCRIPT is ${CAL_EMBED_SCRIPT}. Use Cal.com's official loader.`);
const served = [...sources, ...walk('data'), 'data/siteConfig.ts', 'proxy.ts', 'next.config.mjs'];
const oldCalendar = [...new Set(served)].filter((f) => /leadconnector|msgsndr/i.test(fs.readFileSync(f, 'utf8'))).sort();
assert.deepEqual(oldCalendar, [], `Served code still references leadconnector or msgsndr:\n  ${oldCalendar.join('\n  ')}`);

/* 2. The contact constants must produce working links. A leading "+" in
      WHATSAPP_NUMBER produced wa.me/+91... which WhatsApp rejects, and
      tel:++91... which does not dial. Both shipped. */
assert.ok(/^https:\/\/wa\.me\/\d{8,15}$/.test(WHATSAPP_LINK), `WHATSAPP_LINK is malformed: ${WHATSAPP_LINK}. wa.me takes digits only, no leading plus.`);
assert.ok(/^tel:\+\d{8,15}$/.test(PHONE_LINK), `PHONE_LINK is malformed: ${PHONE_LINK}. Expected exactly one leading plus.`);
assert.ok(/^https:\/\//.test(BOOKING_LINK), `BOOKING_LINK is not an absolute URL: ${BOOKING_LINK}`);
assert.ok(/@/.test(CONTACT_EMAIL), `CONTACT_EMAIL is malformed: ${CONTACT_EMAIL}`);

/* 3. One form, on /contact. Operator, 2026-10-14: "Just one single page with a form
      that submits leads, and one book call, that's it", and "all leads should end up
      in /contact". Until that day seven surfaces embedded LeadForm, /free-ai-audit
      included, and the form carried nine controls.

      Every check here reads code with comments stripped, so a commented-out
      <LeadForm> or a stale comment cannot pass or fail it. */
const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
const code = (file) => stripComments(fs.readFileSync(file, 'utf8'));
const LEAD_FORM_FILE = path.join('components', 'shared', 'LeadForm.tsx');

/* 3a. Exactly one route renders LeadForm. SpokeHomepage.tsx still imports it, and is
       allowed only because every path that could render it is 308'd before routing:
       the four retired spoke hubs and their :path* wildcards, in next.config.mjs. */
const formHosts = sources.filter((f) => f !== LEAD_FORM_FILE && /<LeadForm[\s/>]|from\s+['"][./]*(?:components\/)?shared\/LeadForm['"]|from\s+['"]\.\/LeadForm['"]/.test(code(f))).sort();
const RETIRED_HOST = path.join('components', 'spokes', 'SpokeHomepage.tsx');
assert.deepEqual(
  formHosts, [path.join('app', 'contact', 'page.tsx'), RETIRED_HOST].sort(),
  `LeadForm is rendered outside /contact:\n  ${formHosts.join('\n  ')}\n` +
  `Operator, 2026-10-14: every lead goes through the one form on /contact. Link to it with ` +
  `components/shared/EnquiryLinks.tsx, or auditRequestHref() for the Free AI visibility audit.`
);
for (const spoke of ['marketing', 'tech', 'automation', 'finance']) {
  for (const source of [`/${spoke}`, `/${spoke}/:path*`]) {
    assert.ok(
      new RegExp(`source:\\s*'${source.replace(/[/*]/g, (c) => '\\' + c)}',\\s*destination:\\s*'[^']+',\\s*permanent:\\s*true`).test(readNextConfig()),
      `${source} is no longer a permanent redirect, so app/[spoke] can render SpokeHomepage and its LeadForm again. ` +
      `Either restore the redirect or take LeadForm out of ${RETIRED_HOST}.`
    );
  }
}
const spokeImporters = sources.filter((f) => /SpokeHomepage['"]/.test(code(f))).sort();
assert.deepEqual(
  spokeImporters, [path.join('app', '[spoke]', '[service]', 'page.tsx'), path.join('app', '[spoke]', 'page.tsx')].sort(),
  `SpokeHomepage is imported outside the redirected app/[spoke] routes: ${spokeImporters.join(', ')}`
);

/* 3b. Only LeadForm posts to /api/lead. A second fetch is a second form. */
const posters = sources.filter((f) => !f.startsWith(path.join('app', 'api')) && /fetch\(\s*[`'"][^`'"]*\/api\/lead/.test(code(f)));
assert.deepEqual(posters, [LEAD_FORM_FILE], `Files that post to /api/lead: ${posters.join(', ')}. Only LeadForm may.`);

/* 3c. /book is the calendar and nothing else. */
for (const file of ['app/book/page.tsx', 'components/shared/CalBooking.tsx']) {
  const src = code(file);
  assert.ok(!/<form[\s>]|<LeadForm|<input[\s/>]|<textarea|<select[\s>]|\/api\/lead/.test(src), `${file} renders a form or posts a lead. /book is the calendar only.`);
}
assert.ok(/<CalBooking[\s/>]/.test(code('app/book/page.tsx')), '/book no longer renders the calendar.');

/* 3c-ii. CalBooking is the Cal.com embed for CAL_LINK, rendered rather than grepped.
          useEffectiveConsent is stubbed to each consent state; everything else is the
          real module. Without advertising consent the server and first client render
          must be one new-tab link to BOOKING_LINK and no frame host; with it, the host
          Cal.com mounts into, addressed to qognition-agency/15min. The embed itself is
          attached in an effect, so the source is also held to the official calls. */
{
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const consentPath = require.resolve('../components/shared/ConsentManager.tsx');
  const calPath = require.resolve('../components/shared/CalBooking.tsx');
  const renderWith = (consent) => {
    require.cache[consentPath] = { id: consentPath, filename: consentPath, loaded: true, exports: { useEffectiveConsent: () => consent } };
    delete require.cache[calPath];
    const html = renderToStaticMarkup(React.createElement(require(calPath).default));
    delete require.cache[consentPath];
    delete require.cache[calPath];
    return html;
  };
  const href = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));
  for (const consent of [null, { analytics: true, advertising: false }]) {
    const html = renderWith(consent);
    assert.ok(!/data-cal-link|<iframe/.test(html), `CalBooking mounts the calendar host with consent ${JSON.stringify(consent)}. The frame is gated on advertising.`);
    assert.deepEqual(href(html), [BOOKING_LINK], `Without advertising consent CalBooking must render exactly one link, to ${BOOKING_LINK}. Got ${href(html).join(', ')}.`);
    assert.ok(/target="_blank"/.test(html) && /rel="noopener noreferrer"/.test(html), 'The consent-free calendar link must open in a new tab with noopener.');
  }
  const embedded = renderWith({ analytics: true, advertising: true });
  assert.ok(embedded.includes(`data-cal-link="${CAL_LINK}"`), `With advertising consent CalBooking does not render the Cal.com host for ${CAL_LINK}.`);
  assert.ok(href(embedded).includes(BOOKING_LINK), 'The embedded calendar lost its "open it in a new tab" fallback link.');
  const cal = code('components/shared/CalBooking.tsx');
  for (const [pattern, why] of [
    [/cal\('init', namespace, \{ origin: CAL_EMBED_ORIGIN \}\)/, 'init with the Cal.com origin'],
    [/api\('inline', \{ elementOrSelector: host, calLink: CAL_LINK/, 'an inline embed of CAL_LINK'],
    [/<Script\s+src=\{CAL_EMBED_SCRIPT\}/, 'embed.js loaded with next/script'],
    [/pushDataLayer\('booking_widget_view'\)/, 'booking_widget_view on mount'],
    [/pushDataLayer\('booking_link_click'/, 'booking_link_click on click'],
  ]) assert.ok(pattern.test(cal), `CalBooking no longer does ${why}.`);
  // §8: no booking event client-side. walkthrough_booked comes only from the Cal.com webhook.
  assert.ok(!/walkthrough_booked|audit_purchased|['"]Schedule['"]|trackMeta|track\(/.test(cal), 'CalBooking fires a booking or conversion event client-side. walkthrough_booked is server-side only (CLAUDE.md §8).');
  assert.ok(/A view is not a meeting/.test(fs.readFileSync('components/shared/CalBooking.tsx', 'utf8')) && /never a booking/.test(fs.readFileSync('components/shared/CalBooking.tsx', 'utf8')), 'CalBooking lost its load-bearing comment that a view or a click is not a booking (CLAUDE.md §8).');
  assert.ok(/<Heading level="h1"[^>]*>Book a 15-minute call<\/Heading>/.test(code('app/book/page.tsx')), '/book H1 no longer matches the 15-minute Cal.com event.');
}

/* 3c-iii. The Cal.com embed is a mutable third-party script, so it never shares a page
           with the lead form (Anton, 2026-10-14). Walks the relative import graph from
           /contact and the root layout; nothing reachable may be CalBooking or load
           CAL_EMBED_SCRIPT. SpokeHomepage renders both, and is allowed only while every
           path to it is 308'd (asserted in 3a). */
{
  const resolveImport = (from, spec) => {
    const base = path.join(path.dirname(from), spec);
    return [base, `${base}.tsx`, `${base}.ts`, path.join(base, 'index.tsx'), path.join(base, 'index.ts')].find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
  };
  const reachable = (entry) => {
    const seen = new Set();
    const stack = [path.normalize(entry)];
    while (stack.length) {
      const file = stack.pop();
      if (seen.has(file) || !/\.tsx?$/.test(file)) continue;
      seen.add(file);
      for (const [, spec] of code(file).matchAll(/(?:from|import)\s*\(?\s*['"](\.{1,2}\/[^'"]+)['"]/g)) {
        const next = resolveImport(file, spec);
        if (next) stack.push(path.normalize(next));
      }
    }
    return seen;
  };
  const CAL_FILE = path.join('components', 'shared', 'CalBooking.tsx');
  for (const entry of ['app/contact/page.tsx', 'app/layout.tsx']) {
    const graph = reachable(entry);
    assert.ok(graph.size > 1, `Import walk from ${entry} found nothing; the gate is not reading the graph.`);
    assert.ok(!graph.has(CAL_FILE), `${entry} reaches CalBooking through its imports, so the Cal.com script can load on the lead form page.`);
    const loaders = [...graph].filter((f) => f !== path.join('data', 'siteConfig.ts') && /CAL_EMBED_SCRIPT|app\.cal\.com\/embed/.test(code(f)));
    assert.deepEqual(loaders, [], `${entry} reaches a file that loads the Cal.com embed: ${loaders.join(', ')}`);
  }
  assert.ok(reachable('app/book/page.tsx').has(CAL_FILE), 'The import walk no longer finds CalBooking from /book, so the check above proves nothing.');
}

/* 3d. LeadForm renders exactly five fields, rendered rather than grepped, through the
       props /contact itself builds from its query string (lib/contactForm.ts). Until
       2026-10-14 this block passed `locale` straight to LeadForm, which /contact never
       did, so it proved German labels while every /contact?locale=de visitor got an
       English form (Owen F1). The honeypot is excluded by name; the newsletter opt-in
       renders only for intent="newsletter", which the server rejects without it. */
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const LeadFormModule = require('../components/shared/LeadForm.tsx');
const { contactFormProps } = require('../lib/contactForm.ts');
const { leadCopy, LEAD_LOCALES } = require('../lib/leadCopy.ts');
const { leadSchema } = require('../lib/validation.ts');
const funnelContext = require('../lib/funnelContext.ts');
const FIVE = ['name', 'email', 'company_url', 'message', 'employee_band'];
const contactPage = code('app/contact/page.tsx');
// The page must hand LeadForm exactly what contactFormProps returns, or rendering it here proves nothing.
assert.ok(/contactFormProps\(await searchParams\)/.test(contactPage), '/contact no longer builds its form props with contactFormProps(), so this gate is not rendering what the page renders.');
const leadFormJsx = contactPage.match(/<LeadForm\b[\s\S]*?\/>/)?.[0] || '';
for (const prop of ['spoke="marketing"', 'intent={intent}', 'sourcePage="/contact"', 'locale={locale}', 'context={context}']) {
  assert.ok(leadFormJsx.includes(prop), `/contact renders <LeadForm> without ${prop}.`);
}
const asContactRenders = (query) => {
  const { intent, locale, context } = contactFormProps(query);
  return { html: renderToStaticMarkup(React.createElement(LeadFormModule.default, { spoke: 'marketing', intent, sourcePage: '/contact', locale, context })), intent, locale, context };
};
const controls = (html) => [...html.matchAll(/<(?:input|select|textarea)\b[^>]*\bname="([^"]+)"/g)].map((m) => m[1]).filter((n) => n !== 'hp_field_q');
const escapeHtml = (t) => t.replace(/&/g, '&amp;').replace(/'/g, '&#x27;').replace(/"/g, '&quot;');
const english = leadCopy('en');
for (const audit of [false, true]) {
  for (const locale of [undefined, ...LEAD_LOCALES]) {
    const query = { page_id: '/de', stage: 'bofu', ...(locale ? { locale } : {}), ...(audit ? { asset_id: funnelContext.AUDIT_ASSET_ID } : {}) };
    const r = asContactRenders(query);
    const where = `/contact?${new URLSearchParams(query)}`;
    const expected = locale || 'en';
    assert.equal(r.locale, expected, `${where} resolves locale ${r.locale}.`);
    assert.equal(r.intent, audit ? 'audit' : 'contact', `${where} submits intent ${r.intent}.`);
    assert.deepEqual(controls(r.html), FIVE, `${where} renders ${controls(r.html).join(', ')}. Operator, 2026-10-14: exactly ${FIVE.join(', ')}.`);
    assert.ok(r.html.includes('name="hp_field_q"'), 'LeadForm lost its honeypot.');
    for (const [, id] of r.html.matchAll(/<(?:input|select|textarea)\b[^>]*\bid="([^"]+)"/g)) {
      assert.ok(r.html.includes(`for="${id}"`), `LeadForm control ${id} has no <label for>, so a screen reader announces it unnamed.`);
    }
    const c = leadCopy(expected);
    for (const label of [c.name, c.email, c.website, c.message, c.employees, `* ${c.required}`, audit ? c.audit : c.send]) {
      assert.ok(r.html.includes(escapeHtml(label)), `${where} does not render "${label}" in its own language.`);
    }
    if (expected !== 'en') assert.ok(!r.html.includes(escapeHtml(english.email)) || c.email === english.email, `${where} renders the English "${english.email}" label.`);
    assert.equal(/<form[^>]*\bdir="rtl"/.test(r.html), expected === 'ar', `${where}: the form is ${expected === 'ar' ? 'not ' : ''}right-to-left.`);
  }
}
assert.equal(leadCopy('en').message, 'What do you want help with?', 'The message label is the operator\'s, 2026-10-14.');
assert.deepEqual(controls(renderToStaticMarkup(React.createElement(LeadFormModule.default, { spoke: 'marketing', sourcePage: '/contact', intent: 'newsletter' }))), [...FIVE, 'email_marketing'], 'A newsletter LeadForm must still render its opt-in, or the server rejects every newsletter lead.');

/* 3d-ii. The locale survives to the submission. Rendering proves the labels; the lead's
          context.locale drives the confirmation email and the lead record, so it
          is asserted on the exact functions submit() calls. Also covers a caller that
          passes only context, no locale prop (Owen's repro). */
const { resolveFormLocale, submissionContextFor } = LeadFormModule;
const leadFormCode = code(LEAD_FORM_FILE);
assert.ok(/useState<LeadLocale>\(resolveFormLocale\(localeProp, context\?\.locale, sourcePage\)\)/.test(leadFormCode), 'LeadForm no longer seeds its locale from resolveFormLocale(prop, context, path).');
assert.ok(/setLocale\(resolveFormLocale\(localeProp, context\?\.locale, pathname\)\)/.test(leadFormCode), 'LeadForm re-resolves its locale without the context locale, so the first client render undoes the fix.');
assert.ok(/const submissionContext = submissionContextFor\(\{ inherited, context, locale, sourcePage, intent \}\)/.test(leadFormCode), 'submit() no longer builds its context with submissionContextFor().');
for (const locale of LEAD_LOCALES) {
  const { locale: propLocale, context } = contactFormProps({ locale, page_id: '/de' });
  for (const [prop, label] of [[propLocale, 'as /contact passes it'], [undefined, 'context only']]) {
    const formLocale = resolveFormLocale(prop, context.locale, '/contact');
    assert.equal(formLocale, locale, `LeadForm (${label}) resolves ${formLocale} for /contact?locale=${locale}.`);
    const submitted = submissionContextFor({ inherited: funnelContext.readFunnelContext(new URLSearchParams({ locale, page_id: '/de' })), context, locale: formLocale, sourcePage: '/contact', intent: 'contact' });
    assert.equal(submitted.locale, locale, `A /contact?locale=${locale} lead is submitted with context.locale ${submitted.locale}.`);
    assert.equal(leadSchema.parse({ service: 'marketing', intent: 'contact', source_page: '/contact', contact: { name: 'A', email: 'a@example.com' }, context: submitted }).context.locale, locale, `context.locale ${locale} does not survive the lead schema.`);
  }
  const contextOnly = renderToStaticMarkup(React.createElement(LeadFormModule.default, { spoke: 'marketing', intent: 'contact', sourcePage: '/contact', context: { locale } }));
  assert.ok(contextOnly.includes(escapeHtml(leadCopy(locale).email)), `LeadForm given only context.locale=${locale} renders another language.`);
}
assert.equal(resolveFormLocale(undefined, 'xx', '/de/growth'), 'de', 'An invalid context locale must fall back to the path, not win.');
assert.equal(resolveFormLocale(undefined, undefined, '/contact'), 'en');

// The removed fields still send their defaults, so the server sees the same payload shape.
for (const band of ['unknown', '1-19', '20-99', '100-300', '301+']) {
  const q = LeadFormModule.enquiryQualification(band);
  assert.deepEqual(q, { business_model: 'unknown', employee_band: band, revenue_band: 'unknown', revenue_basis: 'annual-revenue' });
  leadSchema.parse({ service: 'marketing', intent: 'contact', source_page: '/contact', contact: { name: 'A', email: 'a@example.com', company: '' }, qualification: q });
}
assert.ok(leadFormCode.includes("'/api/lead'"), 'LeadForm no longer posts to /api/lead.');
assert.ok(/company:\s*''/.test(leadFormCode), 'LeadForm no longer sends contact.company as an empty string.');

/* 3e. The Free AI visibility audit is requested on /contact, tagged. The tag is the
       existing asset_id funnel key; /contact turns it into intent "audit". Links build
       it with auditRequestHref() or AUDIT_REQUEST_HREF, never a typed-in URL (Owen L1). */
assert.equal(funnelContext.AUDIT_ASSET_ID, 'free-ai-visibility-audit');
for (const href of [funnelContext.AUDIT_REQUEST_HREF, funnelContext.auditRequestHref({ page_id: '/' }), funnelContext.auditRequestHref()]) {
  const query = Object.fromEntries(new URL(href, 'https://x.test').searchParams);
  assert.equal(new URL(href, 'https://x.test').pathname, '/contact');
  assert.equal(contactFormProps(query).intent, 'audit', `${href} does not arrive on /contact as an audit request.`);
}
const auditView = code('components/LocalAuditExperience.tsx');
assert.ok(!/LeadForm|<form[\s>]/.test(auditView), '/free-ai-audit renders a form again. It links to /contact (operator, 2026-10-14).');
assert.ok(auditView.includes('auditRequestHref('), '/free-ai-audit no longer links to the tagged /contact request.');
assert.ok(/href=\{auditRequestHref\(/.test(code('components/home/Snapshot.tsx')), 'The homepage audit button no longer builds its link with auditRequestHref().');
const sticky = code('components/shared/StickyCTA.tsx');
assert.ok(/path === '\/free-ai-audit' \? \{ asset_id: AUDIT_ASSET_ID \}/.test(sticky) && /href=\{enquiryHref\}/.test(sticky), 'The sticky bar enquiry link on /free-ai-audit no longer carries the audit tag (Owen L2).');
const typedTags = sources.filter((f) => f !== path.join('lib', 'funnelContext.ts') && /asset_id=/.test(code(f)));
assert.deepEqual(typedTags, [], `Typed-in audit tags: ${typedTags.join(', ')}. Use auditRequestHref() so the tag cannot drift.`);
const deadAnchor = sources.filter((f) => /free-ai-audit\/?#request/.test(code(f)));
assert.deepEqual(deadAnchor, [], `These link to /free-ai-audit#request, which no longer exists: ${deadAnchor.join(', ')}`);

/* 3e-ii. No other form takes a lead. A <form> outside LeadForm passes only as a GET
          search or filter: no onSubmit, no POST, no /api action. On 2026-10-14
          FinanceHealthScore still had an onSubmit "capture" form promising a CFO-level
          analysis in 48 hours (Ruth F); this is the rule that would have caught it. */
const formTags = (src) => {
  const tags = [];
  for (let i = src.indexOf('<form'); i !== -1; i = src.indexOf('<form', i + 5)) {
    if (!/[\s>]/.test(src[i + 5] || '')) continue;
    let depth = 0, j = i;
    for (; j < src.length; j++) {
      if (src[j] === '{') depth++;
      else if (src[j] === '}') depth--;
      else if (src[j] === '>' && depth === 0) break;
    }
    tags.push(src.slice(i, j + 1));
  }
  return tags;
};
const leadishForms = sources.filter((f) => f !== LEAD_FORM_FILE).flatMap((f) => formTags(code(f))
  .filter((tag) => /\bonSubmit=|method=\{|method=["']post|action=[{"'`][^>]*\/api\//i.test(tag))
  .map((tag) => `${f}: ${tag.replace(/\s+/g, ' ').slice(0, 100)}`));
assert.deepEqual(leadishForms, [], `Forms outside LeadForm that submit somewhere other than a GET search:\n  ${leadishForms.join('\n  ')}\nEvery lead goes through /contact. A calculator needs inputs, not a <form>.`);

/* 3f. Copy on the conversion path: plain English, no em dash, no banned words (§10). */
const BANNED = /\b(unlock|supercharge|leverage|seamless|game-changer)\b|in today's digital landscape/i;
const copyStrings = [...LEAD_LOCALES.flatMap((l) => Object.values(leadCopy(l))), ...[contactPage, auditView, code('components/shared/EnquiryLinks.tsx')]];
for (const text of copyStrings) {
  assert.ok(!text.includes('—'), `Em dash on the conversion path (CLAUDE.md §10): ${text.slice(0, 80)}`);
  assert.ok(!BANNED.test(text), `Banned word on the conversion path (CLAUDE.md §10): ${text.match(BANNED)?.[0]}`);
}
assert.ok(!/<ContactChannelLink|mailto:|Prefer to talk/.test(contactPage), '/contact carries a second path again (book link, email, phone or WhatsApp). Operator, 2026-10-14.');

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
const nextConfig = readNextConfig();
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
  `well-formed, calendar embedded on the homepage at #book.`
);
console.log(
  `✓ one form: LeadForm renders only on /contact with ${FIVE.length} fields in ${LEAD_LOCALES.length} locales, /book is the calendar only, ` +
  `/free-ai-audit links to /contact tagged asset_id=${funnelContext.AUDIT_ASSET_ID}.`
);
console.log(
  `✓ llms: one source (route), /llm.txt 308s to /llms.txt, ${PRIORITY.length} priority pages listed ` +
  `(/free-seo-audit via its 308 destination), no "$", no em dash.`
);
console.log(`✓ offices: ${OFFICES.length} from one list, no HQ, schema city and country only, location FAQs derived.`);
