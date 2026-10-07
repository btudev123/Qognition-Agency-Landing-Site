/* The served-HTML half of the ADR-0006 product-screen gate.
 *
 * scripts/check-b2b.cjs checks the screen DATA and greps the component SOURCE.
 * Neither can see what a component actually renders, so three things passed
 * tsc and every grep before this existed (Owen, 2026-10-07, by mutation):
 *
 *   R3  `{false && <ProvenanceBadge />}`: imported, never rendered.
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

export const BADGE_SENTENCE = 'Illustrative product interface. Sample data, not client results.';

/** Hidden at every width, whatever the viewport. */
function hiddenEverywhere(el) {
  const style = (el.attrs.style || '').replace(/\s+/g, '').toLowerCase();
  return (
    'hidden' in el.attrs ||
    el.attrs['aria-hidden'] === 'true' ||
    /display:none|visibility:hidden|opacity:0(?![.\d])/.test(style) ||
    classes(el).some((c) => c === 'sr-only' || c === 'invisible' || c === 'opacity-0')
  );
}
/** Hidden at some width by a utility class (`hidden`, `max-sm:hidden`, `lg:hidden`). */
const hiddenAtSomeWidth = (el) => classes(el).some((c) => c === 'hidden' || /(^|:)hidden$/.test(c) || /(^|:)(sr-only|invisible)$/.test(c));

/** A Tailwind arbitrary variant that can hide a descendant: `[&_p]:hidden`, `max-sm:[&>p]:sr-only`. */
const ARBITRARY_HIDE = /\[&[^\]]*\]:(hidden|invisible|sr-only|opacity-0)$/;
const arbitraryHide = (el) => classes(el).find((c) => ARBITRARY_HIDE.test(c));
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

  // R3. A badge is the deepest element whose text is the whole sentence.
  const holders = all.filter((e) => norm(textOf(e)).includes(BADGE_SENTENCE));
  const badges = holders.filter((e) => !e.children.some((c) => c.tag && norm(textOf(c)).includes(BADGE_SENTENCE)));
  if (badges.length !== figures.length) {
    errors.push(
      `R3: ${badges.length} badge(s) rendered for ${figures.length} illustrative screen(s). ` +
        'Every <ProductScreen> renders exactly one ProvenanceBadge, unconditionally.'
    );
  }
  for (const f of figures) {
    const own = badges.filter((b) => [...ancestors(b)].includes(f));
    if (own.length !== 1) errors.push(`R3: a product screen contains ${own.length} badges, not 1.`);
  }
  for (const b of badges) {
    const figure = [...ancestors(b)].find((a) => figures.includes(a));
    if (!figure) errors.push('R3: a badge is rendered outside any product screen.');
    let insideFigure = true;
    for (const a of [b, ...ancestors(b)]) {
      if (hiddenEverywhere(a)) {
        errors.push(`R3: a provenance badge is hidden by ${describe(a)}. The disclosure is never hidden, collapsed or tab-gated.`);
        break;
      }
      // An arbitrary variant reaches down into descendants, so it is checked up to the root.
      const variant = arbitraryHide(a);
      if (variant) {
        errors.push(`R3: a provenance badge can be hidden by the class ${variant} on ${describe(a)}.`);
        break;
      }
      // Inside the figure, the badge may not be hidden at any width (brief §1.6: every viewport).
      // A whole figure hidden by a responsive class (`hidden lg:block`) stays allowed.
      if (insideFigure && a !== figure && hiddenAtSomeWidth(a)) {
        errors.push(`R3: a provenance badge is hidden at some width by ${describe(a)}, inside its screen.`);
        break;
      }
      if (a === figure) insideFigure = false;
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
    for (const b of badges.filter((x) => [...ancestors(x)].includes(f))) {
      for (const a of [b, ...ancestors(b)]) {
        if ('aria-live' in a.attrs || 'data-run-region' in a.attrs) errors.push('§11: the badge sits inside a live region or the run region. The disclosure never swaps or re-announces.');
      }
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

  // A screen's chrome rendered outside <ProductScreen> would carry no badge at all.
  for (const e of all) {
    if (e.tag === 'dt' && norm(textOf(e)) === 'Tracked brand' && ![...ancestors(e)].some((a) => figures.includes(a))) {
      errors.push('R3: product-screen chrome ("Tracked brand") is rendered outside any figure[data-provenance], so it has no badge.');
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
  'Prompt run', // ProductScreen TITLE (ADR-0006 §11: never "Live")
  'Prompt set', // ProductScreen TITLE
  'Prompt', 'Platforms', 'Status', // table headers
  'Tracked brand', // ScreenContext term
  ':', '.', // separators in each run row's [data-run-summary]
  'Illustrative', 'product interface. Sample data, not client results.', // ProvenanceBadge, in its two text nodes
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
