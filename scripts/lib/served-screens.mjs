/* The served-HTML half of the ADR-0006 product-screen gate.
 *
 * scripts/check-b2b.cjs checks the screen DATA and greps the component SOURCE.
 * Neither can see what a component actually renders, so three things passed
 * tsc and every grep before this existed (Owen, 2026-10-07, by mutation):
 *
 *   R3  `{false && <ProvenanceBadge />}`: imported, never rendered.
 *
 * Operator decision 2026-10-08 (CLAUDE.md authority block) removed the
 * "Illustrative" badge and its banner from every screen, overriding ADR-0006
 * R3's visible-badge rule. The R3 checks below are inverted, not dropped: a
 * served page must render NO badge, hidden or visible, inside or outside a
 * screen, and no "Illustrative" text inside a screen. `data-provenance` stays
 * as the internal marker that finds each screen and must read "illustrative".
 *   R6  `String(tab.rows.filter(...).length)`, or a literal '41%', in a component.
 *   R5  a prompt typed into a component instead of read from the registry.
 *
 * This module answers those against the HTML the server sends. It is pure (no
 * server, no network), so scripts/test-served-screens.mjs tests it on fixtures
 * and scripts/check-served-page.mjs runs it on the real `/`.
 *
 * The parser is deliberately small. React's server output is well formed: every
 * non-void element is closed, attributes are quoted, adjacent text nodes are
 * split by `<!-- -->`. Script and style bodies are skipped, so the RSC payload,
 * which repeats every string on the page, is never mistaken for rendered text. */
import { createRequire } from 'node:module';

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'textarea', 'title']);

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

/** HTML to a minimal tree: { tag, attrs, children, parent } and { text, parent }. */
export function parseHtml(html) {
  const root = { tag: '#root', attrs: {}, children: [], parent: null };
  let node = root;
  let i = 0;
  while (i < html.length) {
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i + 4);
      i = end < 0 ? html.length : end + 3;
      continue;
    }
    if (html.startsWith('<!', i)) {
      i = html.indexOf('>', i) + 1 || html.length;
      continue;
    }
    if (html[i] === '<' && html[i + 1] === '/') {
      const end = html.indexOf('>', i);
      if (end < 0) break; // truncated close tag: stop, never loop
      const tag = html.slice(i + 2, end).trim().toLowerCase();
      // Pop to the matching open element; tolerate a stray close tag.
      let n = node;
      while (n && n.tag !== tag) n = n.parent;
      if (n && n.parent) node = n.parent;
      i = end + 1;
      continue;
    }
    if (html[i] === '<' && /[a-zA-Z]/.test(html[i + 1] || '')) {
      const m = /^<([a-zA-Z][\w:-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*(\/?)>/.exec(html.slice(i));
      if (!m) {
        i += 1;
        continue;
      }
      const tag = m[1].toLowerCase();
      const attrs = {};
      for (const a of m[2].matchAll(/([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
        attrs[a[1].toLowerCase()] = decode(a[2] ?? a[3] ?? a[4] ?? '');
      }
      const el = { tag, attrs, children: [], parent: node };
      node.children.push(el);
      i += m[0].length;
      if (RAW.has(tag)) {
        const end = html.toLowerCase().indexOf(`</${tag}`, i);
        const body = html.slice(i, end < 0 ? html.length : end);
        if (tag === 'title' || tag === 'textarea') el.children.push({ text: decode(body), parent: el });
        const gt = end < 0 ? -1 : html.indexOf('>', end);
        i = gt < 0 ? html.length : gt + 1; // truncated raw close tag: stop, never loop
        continue;
      }
      if (!VOID.has(tag) && !m[3]) node = el;
      continue;
    }
    const next = html.indexOf('<', i + 1);
    const raw = html.slice(i, next < 0 ? html.length : next);
    node.children.push({ text: decode(raw), parent: node });
    i = next < 0 ? html.length : next;
  }
  return root;
}

const elements = (n, out = []) => {
  for (const c of n.children || []) {
    if (c.tag) {
      out.push(c);
      elements(c, out);
    }
  }
  return out;
};
const textOf = (n) => (n.text !== undefined ? n.text : (n.children || []).map(textOf).join(''));
const textNodes = (n, out = []) => {
  for (const c of n.children || []) {
    if (c.text !== undefined) out.push(c);
    else if (c.tag && !RAW.has(c.tag)) textNodes(c, out);
  }
  return out;
};
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const classes = (el) => (el.attrs.class || '').split(/\s+/).filter(Boolean);
const ancestors = function* (el) {
  for (let n = el.parent; n && n.tag !== '#root'; n = n.parent) yield n;
};
const describe = (el) => `<${el.tag}${el.attrs.class ? ` class="${el.attrs.class.slice(0, 60)}"` : ''}${'hidden' in el.attrs ? ' hidden' : ''}>`;

/** The retired badge sentence. Kept only so the gate can assert it is never rendered (operator, 2026-10-08). */
export const BADGE_SENTENCE = 'Illustrative product interface. Sample data, not client results.';
/** Either half of the retired badge, so a partial or reworded badge is caught too. */
const BADGE_PART = /Illustrative product interface|Sample data, not client results/;
/** Any visitor-facing provenance label inside a screen. */
const ILLUSTRATIVE = /\billustrative\b/i;

/** ADR-0006 §12.3 R7: banned in and beside a screen, any case, whole word. "Live data" is covered by "live". */
export const R7_BANNED = /\b(live|scanning|checking|loading|real[- ]?time|screenshots?|your results|your report|your score)\b/i;
/** R7 / §11.3: a statement that the reader's firm is, or is not, named. Questions ("Does ChatGPT name you?") are allowed. */
const READER = String.raw`(?:you|your (?:firm|company|business|brand))`;
export const READER_NAMED = [
  // "Your firm is not named", "you aren't named", "your company was never named", "you're named"
  new RegExp(String.raw`\b${READER}(?:\s+(?:is|are|was|were|isn't|aren't|wasn't|weren't|gets?|got)|'re|’re)\s+(?:(?:not|never|still|being|already)\s+)*named\b`, 'i'),
  // "ChatGPT names you", "no assistant named your firm", "doesn't name you"
  new RegExp(String.raw`\b(?:name|names|named|naming)\s+${READER}\b`, 'i'),
  // "Your firm: Not named", the screen's state rendered as copy
  new RegExp(String.raw`\b${READER}\s*:\s*(?:not\s+)?named\b`, 'i'),
];

/** Visible text of `el`, skipping RAW bodies, elements removed from rendering, and every product screen. */
function visibleTextOutside(el, figures) {
  let out = '';
  for (const c of el.children || []) {
    if (c.text !== undefined) out += c.text;
    else if (c.tag && !RAW.has(c.tag) && !figures.includes(c)) {
      const style = (c.attrs.style || '').replace(/\s+/g, '').toLowerCase();
      if ('hidden' in c.attrs || /display:none/.test(style)) continue;
      out += ` ${visibleTextOutside(c, figures)} `;
    }
  }
  return out;
}
const sentences = (text) => norm(text).split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean);
/** `content-[...]` utilities, with any variant prefix. Group 1 is the bracket body. */
const CONTENT = /(?:^|:)content-\[(.*)\]$/;

/** A digit not preceded by a letter, or a percent sign. "B2B" passes; "41%", "2", "3x", "1st" do not. */
export const FIGURE_RE = /%|(?<![A-Za-z])\d/;

/** The cells holding the buyer's prompt, whose digits ("ISO 9001", "SOC 2") are part of the question (R6). */
function promptTextNodes(figure) {
  const out = new Set();
  for (const th of elements(figure).filter((e) => e.tag === 'th' && e.attrs.scope === 'row')) {
    const firstEl = th.children.find((c) => c.tag);
    for (const t of textNodes(firstEl || th)) out.add(t);
  }
  return out;
}

/** The run's position counter, "07 / 21". Navigation, not a figure (ADR-0006 §11; checked exactly). */
const NAV_RE = /^(\d{2}) \/ (\d{2})$/;
const inNav = (t) => {
  for (let n = t.parent; n && n.tag !== '#root'; n = n.parent) if (n.attrs && 'data-screen-nav' in n.attrs) return n;
  return null;
};

/**
 * @param {string} html  the served document
 * @param {{ allowed: Set<string>, expected?: number, required?: string[], run?: { rows: number, platforms: number } }} opts
 *   allowed: every string a screen may render (productScreenStrings()).
 *   run: when given, the tracker run must be on the page with this many rows and platform columns (ADR-0006 §11.6).
 * @returns {{ figures: number, badges: number, errors: string[] }}
 */
export function checkProductScreens(html, { allowed, expected, required = [], run }) {
  const root = parseHtml(html);
  const all = elements(root);
  const errors = [];

  const figures = all.filter((e) => 'data-provenance' in e.attrs);
  // Vacuous pass: zero screens rendered would satisfy every per-screen rule.
  if (expected !== undefined && figures.length !== expected) {
    errors.push(`R3: ${figures.length} product screen(s) rendered, the registry holds ${expected}. Every registered screen renders on /.`);
  }
  for (const f of figures) {
    if (f.attrs['data-provenance'] !== 'illustrative') {
      errors.push(`a product screen has data-provenance="${f.attrs['data-provenance']}". ADR-0006 R3 allows only "illustrative".`);
    }
  }

  /* R3, inverted by the operator decision of 2026-10-08: no badge anywhere on the
     page, whatever hides it. A badge is the deepest element whose text holds either
     half of the retired sentence. Script and style bodies are skipped by the parser,
     so the RSC payload is never counted. */
  const holders = all.filter((e) => BADGE_PART.test(norm(textOf(e))));
  const badges = holders.filter((e) => !e.children.some((c) => c.tag && BADGE_PART.test(norm(textOf(c)))));
  if (badges.length) {
    errors.push(
      `R3: ${badges.length} provenance badge(s) rendered. The operator removed the badge from every screen on 2026-10-08; ` +
        'none may render, visible or hidden, inside or outside a screen.'
    );
  }
  for (const f of figures) {
    for (const t of textNodes(f)) {
      const s = norm(t.text);
      if (ILLUSTRATIVE.test(s)) errors.push(`R3: "${s}" is rendered in a product screen. No provenance label is shown (operator, 2026-10-08).`);
    }
    for (const el of [f, ...elements(f)]) {
      for (const key of ['aria-label', 'title', 'alt', 'aria-description']) {
        const v = el.attrs[key];
        if (v && ILLUSTRATIVE.test(v)) errors.push(`R3: ${key}="${v}" labels a product screen as illustrative. No provenance label is shown (operator, 2026-10-08).`);
      }
    }
  }

  /* R7 section scan (ADR-0006 §12.3, §12.4; operator 2026-10-08). With no badge, the
     copy beside a screen is the disclosure. For each screen, its nearest <section>:
     visible text outside every screen fails on the R7 words, and any statement that
     the reader's firm is or is not named fails. Alt, aria-label and title count. */
  const sectionsSeen = new Set();
  for (const f of figures) {
    const section = [...ancestors(f)].find((a) => a.tag === 'section');
    if (!section || sectionsSeen.has(section)) continue;
    sectionsSeen.add(section);
    const where = section.attrs.id ? `section#${section.attrs.id}` : describe(section);
    for (const sentence of sentences(visibleTextOutside(section, figures))) {
      const banned = sentence.match(R7_BANNED);
      if (banned) errors.push(`R7: "${banned[0]}" in the ${where} around a product screen ("${sentence.slice(0, 120)}"). ADR-0006 §12.3.`);
      if (!sentence.endsWith('?') && READER_NAMED.some((re) => re.test(sentence))) {
        errors.push(`R7: the ${where} around a product screen says whether the reader's firm is named ("${sentence.slice(0, 120)}"). ADR-0006 §12.3, §11.3.`);
      }
    }
    for (const el of elements(section)) {
      if ([el, ...ancestors(el)].some((a) => figures.includes(a))) continue;
      for (const key of ['alt', 'aria-label', 'title']) {
        const v = el.attrs[key];
        if (v && R7_BANNED.test(v)) errors.push(`R7: ${key}="${v}" in the ${where} around a product screen. ADR-0006 §12.3.`);
      }
    }
  }

  // The tracker run (ADR-0006 §11.4 and §11.6, served half).
  const runFigures = figures.filter((f) => elements(f).some((e) => 'data-run-region' in e.attrs));
  if (run && runFigures.length !== 1) {
    errors.push(`§11: ${runFigures.length} figure(s) hold a [data-run-region]; the tracker run renders exactly once.`);
  }
  for (const f of runFigures) {
    const inside = elements(f);
    const regions = inside.filter((e) => 'data-run-region' in e.attrs);
    if (regions.length !== 1) errors.push(`§11: a run figure holds ${regions.length} [data-run-region], not 1.`);
    const rows = inside.filter((e) => 'data-run-row' in e.attrs);
    if (run && rows.length !== run.rows) errors.push(`§11: ${rows.length} [data-run-row] rendered, the run holds ${run.rows}.`);
    const visible = rows.filter((r) => !('hidden' in r.attrs));
    if (rows.length && visible.length !== 1) errors.push(`§11: ${visible.length} run rows are visible in the served HTML; exactly the first is.`);
    else if (rows.length && visible[0] !== rows[0]) errors.push('§11: the visible run row is not the first. The server renders row one.');
    const labels = new Set(['Named', 'Not named']);
    rows.forEach((r, i) => {
      if ('data-run-phase' in r.attrs) errors.push(`§11: run row ${i + 1} is served mid-animation (data-run-phase). The served state is resolved.`);
      const rowEls = elements(r);
      const heads = rowEls.filter((e) => e.tag === 'th' && e.attrs.scope === 'row');
      if (heads.length !== 1 || !norm(textOf(heads[0]))) errors.push(`§11: run row ${i + 1} has no prompt in th[scope="row"].`);
      const cells = rowEls.filter((e) => 'data-run-cell' in e.attrs);
      if (run && cells.length !== run.platforms) errors.push(`§11: run row ${i + 1} has ${cells.length} state cells, not ${run.platforms}.`);
      for (const c of cells) {
        const v = norm(textOf(c));
        if (!labels.has(v)) errors.push(`§11: run row ${i + 1} has a state cell reading "${v}". A cell reads Named or Not named, resolved.`);
      }
      if (rowEls.filter((e) => 'data-run-summary' in e.attrs).length !== 1) errors.push(`§11: run row ${i + 1} has no [data-run-summary].`);
    });
    const live = inside.filter((e) => 'aria-live' in e.attrs);
    if (live.length !== 1) errors.push(`§11: a run figure holds ${live.length} aria-live regions, not 1.`);
    for (const l of live) {
      if (l.attrs['aria-live'] !== 'polite' || l.attrs['aria-atomic'] !== 'true') errors.push('§11: the run live region must be aria-live="polite" aria-atomic="true".');
      if (norm(textOf(l))) errors.push(`§11: the run live region has text in the served HTML ("${norm(textOf(l))}"). It starts empty.`);
    }
    // Pause precedes the run region in document order (inside is document order).
    const regionAt = inside.indexOf(regions[0]);
    const pauseAt = inside.findIndex((e) => e.tag === 'button' && /^(Pause|Play)$/.test(norm(textOf(e))));
    if (pauseAt < 0) errors.push('§11: the run has no button reading Pause or Play (WCAG 2.2.2).');
    else if (regions[0] && pauseAt > regionAt) errors.push('§11: the Pause button comes after the run region. It precedes it in DOM and focus order.');
  }

  // R5 and R6, per screen.
  for (const f of figures) {
    const prompts = promptTextNodes(f);
    const isRun = runFigures.includes(f);
    for (const t of textNodes(f)) {
      const s = norm(t.text);
      if (!s) continue;
      const nav = inNav(t);
      if (nav) {
        const m = NAV_RE.exec(s);
        const at = m && Number(m[1]);
        const of = m && Number(m[2]);
        if (!isRun || !m || at < 1 || at > of || (run && of !== run.rows)) {
          errors.push(`R6: "${s}" in a [data-screen-nav] is not a run position ("01 / ${run ? run.rows : 'NN'}").`);
        }
        continue;
      }
      if (!prompts.has(t) && FIGURE_RE.test(s)) {
        errors.push(`R6: "${s}" is a figure in a product screen. Screens render no score, count or percentage.`);
      }
      if (!allowed.has(s)) {
        errors.push(
          `R5: "${s}" is rendered in a product screen but is not in data/product-screens, ` +
            'components/product-screens/labels.ts, RUN_PLATFORMS, the run taxonomy names or the chrome list in scripts/lib/served-screens.mjs.'
        );
      }
    }
    for (const el of elements(f)) {
      // CSS-generated text is rendered text: `before:content-[attr(data-label)]` prints the attribute.
      for (const c of classes(el)) {
        const m = CONTENT.exec(c);
        if (!m) continue;
        const attr = /^attr\(([\w-]+)\)$/.exec(m[1]);
        if (attr) {
          const v = norm(el.attrs[attr[1]] || '');
          if (v && FIGURE_RE.test(v)) errors.push(`R6: "${v}" (rendered by ${c}) is a figure in a product screen.`);
          if (v && !allowed.has(v)) errors.push(`R5: "${v}" (rendered by ${c}) is not from the screen data or the chrome list.`);
        } else if (m[1] !== "''" && m[1] !== '""') {
          errors.push(`R5: the class ${c} renders literal text in a product screen. Only content-[attr(...)] and content-[''] are allowed.`);
        }
      }
      for (const key of ['aria-label', 'title', 'alt']) {
        const v = el.attrs[key];
        if (v && FIGURE_RE.test(v.replace(/B2B/g, ''))) errors.push(`R6: ${key}="${v}" is a figure in a product screen.`);
      }
    }
  }

  // A screen's chrome rendered outside <ProductScreen> would escape every R5 and R6 check above.
  for (const e of all) {
    if (e.tag === 'dt' && norm(textOf(e)) === 'Tracked brand' && ![...ancestors(e)].some((a) => figures.includes(a))) {
      errors.push('R3: product-screen chrome ("Tracked brand") is rendered outside any figure[data-provenance], so the screen gate cannot see it.');
    }
  }

  // Every registry prompt, and the run's tracked brand and names, is rendered inside some screen.
  if (required.length) {
    const rendered = new Set(figures.flatMap((f) => textNodes(f).map((t) => norm(t.text))));
    for (const r of required) {
      if (!rendered.has(norm(r))) errors.push(`R5: "${r}" is in the registry but rendered in no product screen.`);
    }
  }

  return { figures: figures.length, badges: badges.length, errors: [...new Set(errors)] };
}

/** Fixed interface text in the screen components. Adding a string here is a reviewed change (ADR-0006 R5). */
const CHROME = [
  /* ProductScreen TITLE for the run. Was "Prompt run"; changed to the Ruth-cleared
     title on 2026-10-08 (docs/copy/2026-10/ai-search-is-winning.md §6). It describes
     the capability, present tense, which R7 allows (ADR-0006 §11: never "Live"). */
  'What we check',
  'Prompt set', // ProductScreen TITLE
  'Prompt', 'Platforms', 'Status', // table headers
  'Tracked brand', // ScreenContext term
  ':', '.', // separators in each run row's [data-run-summary]
  /* No badge text. The ProvenanceBadge strings left this list with the badge
     (operator, 2026-10-08), so a returning badge also fails R5. */
  /* Run chrome (Pause, Play, Previous, Next, Show, Tracking, Sample run, the
     separator) lives in components/product-screens/labels.ts, which is walked
     below. "Live", "Scanning", "Checking", "Loading" and "Real-time" may never
     be added (§11.6). */
];

/** The run's industry and sub-industry names, from the taxonomy by id, as TrackerRunView renders them. */
const runNames = (require, PRODUCT_SCREENS) => {
  const { icpIndustryCards, icpSubIndustryName } = require('../../data/b2b/icp/index.ts');
  const { industryDisplayName } = require('../../data/b2b/icp/industryVisuals.ts');
  const cards = new Map(icpIndustryCards().map((c) => [c.id, industryDisplayName(c.name)]));
  return PRODUCT_SCREENS['scriblr-tracker-run'].rows.flatMap((r) => [cards.get(r.industryId), icpSubIndustryName(r.subIndustryId)]);
};

const loadRegistry = () => {
  const require = createRequire(import.meta.url);
  require('./load-typescript.cjs');
  return require('../../data/product-screens/index.ts').PRODUCT_SCREENS;
};

/** What `/` must render: the screen count, the allowed strings, the strings that must appear, and the run's shape. */
export function productScreenContract() {
  const require = createRequire(import.meta.url);
  const PRODUCT_SCREENS = loadRegistry();
  const { RUN_PLATFORMS } = require('../../data/product-screens/types.ts');
  const runScreen = PRODUCT_SCREENS['scriblr-tracker-run'];
  const required = [runScreen.trackedBrand, ...runScreen.rows.map((r) => r.prompt), ...runNames(require, PRODUCT_SCREENS)];
  return {
    expected: Object.keys(PRODUCT_SCREENS).length,
    allowed: productScreenStrings(),
    required,
    run: { rows: runScreen.rows.length, platforms: RUN_PLATFORMS.length },
  };
}

/** Every string a product screen may render: the registry, the display labels, the engines and the chrome. */
export function productScreenStrings() {
  const require = createRequire(import.meta.url);
  require('./load-typescript.cjs');
  const PRODUCT_SCREENS = loadRegistry();
  const labels = require('../../components/product-screens/labels.ts');
  const { RUN_PLATFORMS } = require('../../data/product-screens/types.ts');
  const out = new Set(CHROME);
  const walk = (v) => {
    if (typeof v === 'string') out.add(norm(v));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(PRODUCT_SCREENS);
  walk(labels);
  walk(RUN_PLATFORMS);
  walk(runNames(require, PRODUCT_SCREENS));
  return out;
}
