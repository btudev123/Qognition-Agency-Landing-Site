/**
 * One photograph per published case study, from Pexels, self-hosted.
 *
 *   node --env-file=.env.local scripts/fetch-case-study-images.mjs
 *   node --env-file=.env.local scripts/fetch-case-study-images.mjs --only fox-service-company,kings-aire
 *   node --env-file=.env.local scripts/fetch-case-study-images.mjs --relabel   (alt and credit only)
 *   node --env-file=.env.local scripts/fetch-case-study-images.mjs --set industries [--group featured|hubs|all] [--only <key>,...]
 *
 * --set industries (docs/design/2026-10-visual-upgrade.md §4) writes industry photographs instead:
 *   featured  portrait 1200x1500 -> public/images/industries/featured/<slug>.jpg   (the homepage cards)
 *   hubs      landscape 1600x1000 -> public/images/industries/<slug>.jpg           (hub pages, plan step 3)
 * Credits go to data/b2b/icp/industryImages.json keyed `featured/<slug>` and `<slug>`, in the same shape
 * as data/case-studies/images.json. The default group is `featured`: fetch only what a page renders.
 * Alt text is a starting point. A human rewrites it after looking at the frame, because the teal tint
 * makes Pexels colour words false and descriptions can name a person or a brand.
 *
 * Writes public/images/case-studies/<id>.jpg (1600x1000, mozjpeg) and data/case-studies/images.json,
 * which data/case-studies/index.ts merges over each record's placeholder image.
 *
 * The key is read from process.env.PEXELS_API_KEY and only ever sent in the Authorization header.
 * It is never printed, written to disk or bundled: this script is not imported by any route.
 *
 * Subject matter (CLAUDE.md §9, operator decision 2026-10-07): equipment, facilities, places and
 * abstract scenes. Never people in offices. The queries below ask for objects and places, the
 * PEOPLE filter rejects any result whose Pexels description mentions a person, and every pick was
 * then reviewed by eye. A photo rejected on review goes in BLOCKED so a re-run cannot pick it again;
 * a hand-chosen replacement goes in PINNED.
 */

import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'case-studies');
const MAP_FILE = path.join(ROOT, 'data', 'case-studies', 'images.json');
const API = 'https://api.pexels.com/v1';
const WIDTH = 1600;
const HEIGHT = 1000;

/** Equipment, facilities, places and abstract scenes, rotated within each sector. */
const QUERIES = {
  hvac: [
    'air conditioner condenser unit',
    'rooftop hvac units',
    'ventilation duct',
    'heat pump outdoor unit',
    'industrial ventilation fan',
    'hvac rooftop unit',
    'commercial hvac equipment',
    'air conditioning units on building facade',
    'hvac ductwork',
    'thermostat',
  ],
  dental: [
    'dental chair',
    'dental clinic interior',
    'dental instruments',
    'dental equipment',
    'dental x-ray',
    'toothbrush',
    'tooth model',
    'dental tools tray',
    'empty dental chair',
    'dental mirror',
  ],
  insurance: [
    'commercial building exterior',
    'city skyline at dusk',
    'glass office building facade',
    'warehouse interior',
    'storm clouds over city',
    'highway at night',
    'construction site crane',
    'industrial building',
    'umbrella in rain',
    'documents and pen',
  ],
};

/** Words in a Pexels description that mean a person is in frame. */
const PEOPLE =
  /\b(man|men|woman|women|person|people|persons|girl|boy|child|children|kid|kids|team|businessman|businesswoman|colleague|colleagues|worker|workers|doctor|dentist|dentists|patient|smiling|smile|portrait|meeting|hand|hands|face|couple|family|staff|employee|technician|engineer|guy|lady|someone|he|she|his|her)\b/i;

/** Pexels photo ids rejected on visual review. Never picked again. */
const BLOCKED = new Set([
  18374992, // power-station cooling tower, not building services
  2918, // outdoor showers on a wall, not HVAC
  34887522, // damaged, graffitied condenser; reads as neglect
  36403580, // antique steam engine
  5657165, // power-station cooling towers at night
  3952134, // a person in frame
  8191884, // novelty heart-shaped toothpaste
  10711075, // clinic staff in frame; the Pexels description did not say so
  7005479, // lit interior corridor, not building services
  16848596, // condenser on a cracked wall; reads as neglect
  19976588, // clinicians and a patient in frame
  30962631, // dark alley; off-brand mood
]);

/** Case-study id -> Pexels photo id, chosen by hand after review. */
const PINNED = {};

/* ── --set industries ──────────────────────────────────────────────────────
   Primary query first, fallback second (brief §4). No people at all in these frames, which is stricter
   than the case-study rule, so the same PEOPLE filter applies and every pick is still reviewed by eye. */
const INDUSTRY_FEATURED = {
  'saas-and-software': ['data center corridor', 'server rack blue light'],
  'manufacturing-and-industrial': ['cnc machine metal sparks', 'precision machined metal parts'],
  /* The library brief queries returned shelves with legible spines (one read as a football club).
     Coordinator, 2026-10-07: a clean architectural or meeting-room interior, no text, no people. */
  'professional-and-business-services': ['empty modern boardroom', 'architectural office interior minimal', 'glass building atrium'],
};
const INDUSTRY_HUBS = {
  'saas-and-software': ['server room blue light', 'fiber optic cables close up'],
  'professional-and-business-services': ['library bookshelves interior', 'classical columns building facade'],
  'healthcare-and-life-sciences': ['laboratory glassware', 'pipettes test tubes rack'],
  'financial-services': ['bank vault door', 'bank building facade architecture'],
  'manufacturing-and-industrial': ['cnc machine milling metal', 'machined metal parts close up'],
  'logistics-supply-chain-and-transportation': ['shipping containers port aerial', 'empty warehouse racking'],
  'construction-real-estate-and-built-environment': ['steel beams building frame', 'construction crane skyline'],
  'energy-and-utilities': ['solar panel field aerial', 'electricity pylons sunset'],
  'technology-and-it-services': ['network switch cables rack', 'circuit board macro'],
  'education-and-training': ['empty lecture hall', 'stack of books library'],
  'hospitality-travel-and-events': ['empty conference hall chairs', 'empty hotel lobby'],
  'agriculture-and-food': ['wheat field aerial', 'crop rows aerial'],
  'media-marketing-and-creative': ['printing press machine', 'camera lens studio'],
  'government-nonprofit-and-institutional': ['government building columns', 'capitol dome architecture'],
  'emerging-and-micro-niches': ['abstract light trails long exposure', 'fiber optic light abstract'],
  'aerospace-and-aviation': ['aircraft engine close up', 'empty airplane hangar'],
  'automotive-heavy-equipment-and-mobility': ['excavator construction site', 'car assembly line robots'],
  'commercial-and-facility-services': ['polished floor empty building lobby', 'maintenance tools wall'],
  'environmental-engineering-and-testing': ['water sample vials laboratory', 'laboratory glassware chemistry'],
  'retail-cpg-and-brand-enablement': ['cardboard boxes pallets warehouse', 'empty store aisle shelves'],
  'franchising-and-multi-location': ['aerial city grid buildings', 'row of shopfronts street night'],
};
/** Industry key (`featured/<slug>` or `<slug>`) -> Pexels photo id, chosen by hand after review. */
const INDUSTRY_PINNED = {};
/** Pexels ids rejected on visual review for the industry set. Never picked again. */
const INDUSTRY_BLOCKED = new Set([
  6077355, // a person at a desk in front of the bookshelves; the description said "judge", not a PEOPLE word
  29988985, // laser cutting head carries a legible manufacturer name
  38323235, // library shelves with legible book spines, one reading as a football club
]);
/** Stricter than PEOPLE: the industry set allows no people at all (brief §1.4). */
const INDUSTRY_PEOPLE = /\b(female|male|judge|lawyer|attorney|student|students|operator|scientist|chef|farmer|pilot|driver|crowd|audience|silhouette|figure|sitting|standing|walking|working|reading)\b/i;

const args = process.argv.slice(2);
const onlyArg = args.find((a) => a.startsWith('--only'));
const only = onlyArg
  ? new Set((onlyArg.includes('=') ? onlyArg.split('=')[1] : args[args.indexOf(onlyArg) + 1] ?? '').split(',').filter(Boolean))
  : null;

const key = process.env.PEXELS_API_KEY;
if (!key) {
  console.error('PEXELS_API_KEY is not set. Run: node --env-file=.env.local scripts/fetch-case-study-images.mjs');
  process.exit(1);
}

let sharp = null;
try {
  sharp = require('sharp');
} catch {
  console.warn('sharp is not installed; saving the Pexels-compressed file as delivered.');
}

async function pexels(pathname) {
  const res = await fetch(`${API}${pathname}`, { headers: { Authorization: key } });
  if (res.status === 401 || res.status === 403) throw new Error(`Pexels rejected the key (${res.status}).`);
  if (res.status === 429) throw new Error('Pexels rate limit reached (429). Wait an hour and re-run with --only.');
  if (!res.ok) throw new Error(`Pexels ${pathname.split('?')[0]} failed: ${res.status}`);
  return res.json();
}

const searchCache = new Map();
async function search(query, orientation = 'landscape') {
  const cacheKey = `${orientation}:${query}`;
  if (!searchCache.has(cacheKey)) {
    const q = new URLSearchParams({ query, orientation, per_page: '40' });
    const { photos = [] } = await pexels(`/search?${q}`);
    searchCache.set(cacheKey, photos);
  }
  return searchCache.get(cacheKey);
}

/**
 * Pexels descriptions are written for stock search: "..., showcasing modern HVAC technology",
 * "with copy space", "ideal for health and education visuals". Alt text describes what is in the
 * frame, so keep the description and drop the sales clause.
 */
function cleanAlt(raw, query) {
  const text = String(raw || '')
    .replace(/^free stock photo of\s*/i, '')
    .replace(/^capture (the beauty of\s*)?/i, '')
    .replace(/,\s+(showcasing|emphasizing|emphasising|highlighting)\b.*$/i, '')
    .replace(/,?\s+(ideal|perfect|great) for\b.*$/i, '')
    .replace(/\s+for (dental|health|medical) (education|hygiene focus|care)\b.*$/i, '')
    .replace(/\s+with copy space\b/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.,]$/, '');
  if (text.length < 8) return `Photograph: ${query}`;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Some Pexels accounts use a website as their display name; credit the site, not the URL. */
function creditName(name) {
  const value = String(name || '').trim();
  if (!/^https?:\/\//i.test(value)) return value || 'Pexels contributor';
  try {
    return new URL(value).hostname.replace(/^www\./, '');
  } catch {
    return value;
  }
}

function acceptable(photo, used) {
  if (BLOCKED.has(photo.id) || used.has(photo.id)) return false;
  if (photo.width < WIDTH) return false;
  return !PEOPLE.test(photo.alt || '');
}

async function download(photo, file, width = WIDTH, height = HEIGHT) {
  const url = `${photo.src.original}?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download of Pexels photo ${photo.id} failed: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());
  if (!sharp) {
    await writeFile(file, input);
    return { width, height };
  }
  const { data, info } = await sharp(input)
    .resize(width, height, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 70, mozjpeg: true, progressive: true })
    .toBuffer({ resolveWithObject: true });
  await writeFile(file, data);
  return { width: info.width, height: info.height };
}

async function industries() {
  const MAP = path.join(ROOT, 'data', 'b2b', 'icp', 'industryImages.json');
  const groupArg = args.find((a) => a.startsWith('--group'));
  const group = groupArg
    ? (groupArg.includes('=') ? groupArg.split('=')[1] : args[args.indexOf(groupArg) + 1]) || 'featured'
    : 'featured';
  if (!['featured', 'hubs', 'all'].includes(group)) throw new Error(`--group must be featured, hubs or all, not ${group}`);

  const jobs = [];
  if (group !== 'hubs') {
    for (const [slug, queries] of Object.entries(INDUSTRY_FEATURED)) {
      jobs.push({ key: `featured/${slug}`, queries, orientation: 'portrait', width: 1200, height: 1500 });
    }
  }
  if (group !== 'featured') {
    for (const [slug, queries] of Object.entries(INDUSTRY_HUBS)) {
      jobs.push({ key: slug, queries, orientation: 'landscape', width: WIDTH, height: HEIGHT });
    }
  }

  const existing = existsSync(MAP) ? JSON.parse(await readFile(MAP, 'utf8')) : {};
  const used = new Set(
    Object.entries(existing)
      .filter(([k]) => !only || !only.has(k))
      .map(([, v]) => Number(String(v.pexels_url).match(/(\d+)\/?$/)?.[1]))
  );
  const out = { ...existing };
  let failures = 0;

  for (const job of jobs) {
    if (only && !only.has(job.key)) continue;
    try {
      let photo;
      let query = 'pinned';
      if (INDUSTRY_PINNED[job.key]) {
        photo = await pexels(`/photos/${INDUSTRY_PINNED[job.key]}`);
      } else {
        for (const q of job.queries) {
          query = q;
          photo = (await search(q, job.orientation)).find(
            (p) =>
              !INDUSTRY_BLOCKED.has(p.id) &&
              !BLOCKED.has(p.id) &&
              !used.has(p.id) &&
              p.width >= job.width &&
              p.height >= job.height &&
              !PEOPLE.test(p.alt || '') &&
              !INDUSTRY_PEOPLE.test(p.alt || '')
          );
          if (photo) break;
        }
      }
      if (!photo) throw new Error('no acceptable photo for the primary or fallback query');
      used.add(photo.id);

      const rel = path.join('images', 'industries', `${job.key}.jpg`);
      const file = path.join(ROOT, 'public', rel);
      await mkdir(path.dirname(file), { recursive: true });
      const { width, height } = await download(photo, file, job.width, job.height);
      out[job.key] = {
        src: `/${rel.split(path.sep).join('/')}`,
        width,
        height,
        alt: cleanAlt(photo.alt, query),
        photographer: creditName(photo.photographer),
        photographer_url: photo.photographer_url,
        pexels_url: photo.url,
      };
      const kb = Math.round((await stat(file)).size / 1024);
      console.log(`ok   ${job.key.padEnd(52)} ${String(photo.id).padStart(9)}  ${kb} KB  [${query}]`);
    } catch (error) {
      failures += 1;
      console.error(`fail ${job.key}: ${error.message}`);
    }
  }

  await mkdir(path.dirname(MAP), { recursive: true });
  await writeFile(MAP, `${JSON.stringify(out, null, 2)}\n`);
  console.log(`\n${Object.keys(out).length} industry image(s) mapped in data/b2b/icp/industryImages.json`);
  if (failures > 0) process.exit(1);
}

async function main() {
  const setArg = args.find((a) => a.startsWith('--set'));
  const set = setArg ? (setArg.includes('=') ? setArg.split('=')[1] : args[args.indexOf(setArg) + 1]) : 'case-studies';
  if (set === 'industries') return industries();
  if (set !== 'case-studies') throw new Error(`--set must be case-studies or industries, not ${set}`);

  // index.ts imports images.json, so it must exist before the record list can load.
  if (!existsSync(MAP_FILE)) await writeFile(MAP_FILE, '{}\n');
  require('./lib/load-typescript.cjs');
  const { CASE_STUDIES } = require('../data/case-studies/index.ts');

  const existing = JSON.parse(await readFile(MAP_FILE, 'utf8'));
  await mkdir(OUT_DIR, { recursive: true });

  const used = new Set(
    Object.entries(existing)
      .filter(([id]) => !only || !only.has(id))
      .map(([, v]) => Number(String(v.pexels_url).match(/(\d+)\/?$/)?.[1]))
  );
  if (args.includes('--relabel')) {
    // Re-derive alt and credit from Pexels for the photos already chosen. No downloads.
    for (const [id, entry] of Object.entries(existing)) {
      const photoId = String(entry.pexels_url).match(/(\d+)\/?$/)?.[1];
      const photo = await pexels(`/photos/${photoId}`);
      entry.alt = cleanAlt(photo.alt, id);
      entry.photographer = creditName(photo.photographer);
      entry.photographer_url = photo.photographer_url;
    }
    await writeFile(MAP_FILE, `${JSON.stringify(existing, null, 2)}\n`);
    console.log(`relabelled ${Object.keys(existing).length} entries`);
    return;
  }

  const position = { hvac: 0, dental: 0, insurance: 0 };
  const out = {};
  let failures = 0;

  for (const study of CASE_STUDIES) {
    const pool = QUERIES[study.niche];
    const turn = position[study.niche]++;
    if (only && !only.has(study.id)) {
      if (existing[study.id]) out[study.id] = existing[study.id];
      continue;
    }
    try {
      let photo;
      let query = 'pinned';
      if (PINNED[study.id]) {
        photo = await pexels(`/photos/${PINNED[study.id]}`);
      } else {
        // Start at this study's query and walk the pool until one yields an acceptable photo.
        for (let step = 0; step < pool.length && !photo; step += 1) {
          query = pool[(turn + step) % pool.length];
          photo = (await search(query)).find((p) => acceptable(p, used));
        }
      }
      if (!photo) throw new Error('no acceptable photo in any query for this sector');
      used.add(photo.id);

      const file = path.join(OUT_DIR, `${study.id}.jpg`);
      const { width, height } = await download(photo, file);
      out[study.id] = {
        src: `/images/case-studies/${study.id}.jpg`,
        width,
        height,
        alt: cleanAlt(photo.alt, query),
        photographer: creditName(photo.photographer),
        photographer_url: photo.photographer_url,
        pexels_url: photo.url,
      };
      const kb = Math.round((await stat(file)).size / 1024);
      console.log(`ok   ${study.id.padEnd(40)} ${String(photo.id).padStart(9)}  ${kb} KB  [${query}]`);
    } catch (error) {
      failures += 1;
      if (existing[study.id]) out[study.id] = existing[study.id];
      console.error(`fail ${study.id}: ${error.message}`);
    }
  }

  await writeFile(MAP_FILE, `${JSON.stringify(out, null, 2)}\n`);

  let bytes = 0;
  for (const id of Object.keys(out)) bytes += (await stat(path.join(OUT_DIR, `${id}.jpg`))).size;
  console.log(`\n${Object.keys(out).length}/${CASE_STUDIES.length} mapped, ${(bytes / 1024 / 1024).toFixed(2)} MB total in public/images/case-studies`);

  // A missing image falls back to the record's placeholder, but a partial run should not look clean.
  if (failures > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
