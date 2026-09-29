#!/usr/bin/env node
/* Raster icon set, generated from the vector mark. docs/design/logo.md §6.2.
 *
 * Never hand-export these. The whole reason the header logo looked muddy was a
 * 192px raster favicon squeezed to 30px by the browser, and hand-exported
 * rasters drift from the vector the first time the mark is touched.
 *
 * The tile field is ink #0A0A09, not teal. A saturated teal square is the
 * loudest thing on a home screen and it is the opposite of the restraint this
 * brand is built on. Ink field, teal tail: same brand, quieter, and it matches
 * the dark site.
 *
 * Maskable is drawn at 40% rather than the 80% safe circle because some Android
 * launchers crop harder than the spec allows. Conservative on purpose.
 *
 * Usage: node scripts/build-icons.mjs
 * Not in the build chain — icons change when the mark changes, which is rare,
 * and the outputs are committed.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const sharp = (await import('sharp')).default;

const OUT = path.join(process.cwd(), 'public');
const INK_FIELD = '#0A0A09';

/** The mark as a standalone SVG at a given pixel size, with explicit strokes. */
const markSvg = (px, ring, tail) => `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 32 32" fill="none" stroke-width="3.5" stroke-linecap="butt">
  <path d="M20.929 25.271A10.5 10.5 0 1 1 25.271 20.929" stroke="${ring}"/>
  <path d="M20.5 20.5 26.2 26.2" stroke="${tail}"/>
</svg>`;

/** Mark centred on an opaque field. */
async function tile({ canvas, mark, file }) {
  const svg = Buffer.from(markSvg(mark, '#F5F4F1', '#2DD4BF'));
  const layer = await sharp(svg).png().toBuffer();
  const offset = Math.round((canvas - mark) / 2);
  const out = await sharp({
    create: {
      width: canvas,
      height: canvas,
      channels: 4,
      background: INK_FIELD,
    },
  })
    .composite([{ input: layer, top: offset, left: offset }])
    .png()
    .toBuffer();
  await writeFile(path.join(OUT, file), out);
  return `${file}  ${canvas}px field, ${mark}px mark, ${(out.length / 1024).toFixed(1)}KB`;
}

/** Transparent, ink mark, full bleed — the tab favicon sizes. */
async function transparent({ size, file }) {
  const out = await sharp(Buffer.from(markSvg(size, '#0D0C0A', '#0D0C0A')))
    .png()
    .toBuffer();
  await writeFile(path.join(OUT, file), out);
  return `${file}  ${size}px transparent, ${(out.length / 1024).toFixed(1)}KB`;
}

await mkdir(OUT, { recursive: true });

const log = [];
log.push(await transparent({ size: 16, file: 'favicon-16x16.png' }));
log.push(await transparent({ size: 32, file: 'favicon-32x32.png' }));
log.push(await transparent({ size: 48, file: 'favicon-48x48.png' }));
log.push(await tile({ canvas: 180, mark: 108, file: 'apple-touch-icon.png' }));
log.push(await tile({ canvas: 192, mark: 115, file: 'icon-192.png' }));
log.push(await tile({ canvas: 512, mark: 307, file: 'icon-512.png' }));
log.push(await tile({ canvas: 512, mark: 205, file: 'maskable-512.png' }));

console.log('✓ icons rebuilt from public/brand/mark.svg\n');
for (const line of log) console.log(`  ${line}`);
console.log(
  '\n  favicon.ico is not generated here — sharp does not write ICO. Browsers\n' +
    '  have read /favicon.svg and the PNG <link rel="icon"> set since 2023, and\n' +
    '  app/layout.tsx declares both. Add a real multi-size ICO only if an\n' +
    '  analytics-confirmed client needs it.'
);
