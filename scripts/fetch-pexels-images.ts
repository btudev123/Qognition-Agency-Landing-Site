/**
 * Fetch the case-study imagery from Pexels and self-host it.
 *
 *   PEXELS_API_KEY=xxx npx tsx scripts/fetch-pexels-images.ts
 *
 * Self-hosted rather than hotlinked on purpose: the performance budget is LCP < 2.5s on 4G, and a
 * third-party image host sits on the critical path for the largest element on every case study.
 *
 * Eleven images serve 45 records — they are shared by niche and service (see the IMG maps at the
 * top of data/case-studies/{hvac,dental,insurance}.ts). Fetching 45 near-identical HVAC stock
 * photos would be worse, not better.
 *
 * Pexels does not require attribution, but we record it anyway in credits.json.
 * Re-running overwrites existing files; delete public/case-studies to force a clean pull.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const API = 'https://api.pexels.com/v1/search';
const OUT_DIR = path.join(process.cwd(), 'public', 'case-studies');

/** `name` must match the filename referenced in the data files. */
const TARGETS: { name: string; query: string; note: string }[] = [
  { name: 'hvac-service-call', query: 'hvac technician air conditioner repair', note: 'HVAC technician servicing a condenser unit outside a home' },
  { name: 'hvac-rooftop-units', query: 'rooftop air conditioning units commercial', note: 'Rooftop commercial air handling units' },
  { name: 'hvac-service-van', query: 'service van work truck parked house', note: 'Service van outside a residential property' },
  { name: 'hvac-sheet-metal', query: 'sheet metal workshop fabrication industrial', note: 'Sheet metal ductwork fabrication' },
  { name: 'dental-operatory', query: 'dental chair clinic operatory', note: 'Dental operatory prepared for a patient' },
  { name: 'dental-clinician', query: 'dentist scrubs clinic team', note: 'Dentist reviewing a chart with a colleague' },
  { name: 'dental-imaging', query: 'dental x ray panoramic screen', note: 'Panoramic dental x-ray on a clinic monitor' },
  { name: 'dental-reception', query: 'medical clinic reception waiting room bright', note: 'Dental practice reception and waiting area' },
  { name: 'insurance-office', query: 'insurance agent client desk paperwork meeting', note: 'Agent reviewing policy documents with a client' },
  { name: 'insurance-commercial', query: 'commercial office building exterior', note: 'Commercial building exterior' },
  { name: 'insurance-paperwork', query: 'documents calculator desk contract', note: 'Policy paperwork and a calculator on a desk' },
];

interface PexelsPhoto {
  id: number;
  photographer: string;
  url: string;
  src: { landscape: string; large2x: string; original: string };
}

async function main() {
  const key = process.env.PEXELS_API_KEY;
  if (!key) {
    console.error('PEXELS_API_KEY is not set.\n  PEXELS_API_KEY=xxx npx tsx scripts/fetch-pexels-images.ts');
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const credits: Record<string, { photographer: string; url: string; pexelsId: number; note: string }> = {};
  let failures = 0;

  for (const target of TARGETS) {
    try {
      const url = `${API}?query=${encodeURIComponent(target.query)}&orientation=landscape&per_page=1`;
      const res = await fetch(url, { headers: { Authorization: key } });
      if (!res.ok) throw new Error(`search failed: ${res.status} ${res.statusText}`);

      const { photos } = (await res.json()) as { photos: PexelsPhoto[] };
      const photo = photos?.[0];
      if (!photo) throw new Error(`no result for "${target.query}"`);

      // `large2x` is ~1880px wide — enough for a 1280px slot at 2x without shipping the original.
      const imageRes = await fetch(photo.src.large2x);
      if (!imageRes.ok) throw new Error(`download failed: ${imageRes.status}`);

      const file = path.join(OUT_DIR, `${target.name}.jpg`);
      await writeFile(file, Buffer.from(await imageRes.arrayBuffer()));

      credits[`${target.name}.jpg`] = {
        photographer: photo.photographer,
        url: photo.url,
        pexelsId: photo.id,
        note: target.note,
      };
      console.log(`✓ ${target.name}.jpg — ${photo.photographer}`);
    } catch (error) {
      failures += 1;
      console.error(`✗ ${target.name}: ${(error as Error).message}`);
    }
  }

  await writeFile(path.join(OUT_DIR, 'credits.json'), `${JSON.stringify(credits, null, 2)}\n`);
  console.log(`\n${Object.keys(credits).length}/${TARGETS.length} fetched -> public/case-studies/`);

  // Non-zero exit on partial failure: a missing image is a broken card on a live page.
  if (failures > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
