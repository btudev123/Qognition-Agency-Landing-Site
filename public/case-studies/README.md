# Case study imagery — PLACEHOLDERS

The 11 `.jpg` files here are **generated gradient placeholders**, not photographs. They exist so
the 45 case-study pages ship with something intentional-looking rather than broken image icons.

They are abstract on purpose. They do not depict a technician, a clinic or an office, and they are
not stock photos of anyone.

## Replace them

```bash
PEXELS_API_KEY=xxx npx tsx scripts/fetch-pexels-images.ts
```

That overwrites all 11 with real Pexels photography at the same filenames and writes
`credits.json` alongside. No data or component changes are needed — the paths are already correct.

## Until then

The `alt` text on each record in `data/case-studies/{hvac,dental,insurance}.ts` describes the
*intended* photograph, not the current gradient. That is a known, deliberate mismatch with a
one-command fix. If the Pexels swap is going to be delayed more than a few days, change those
`alt` strings to `''` — the surrounding card and hero already carry the client, market and
headline as real text, so the image is decorative until it is real.
