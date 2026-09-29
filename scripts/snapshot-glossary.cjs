#!/usr/bin/env node
/* Re-captures docs/repositioning/glossary-published-slugs.json.
   Run this ONLY when a change to the published /glossary/* set is deliberate,
   and say in the commit message which URLs moved and why. */
require('./lib/load-typescript.cjs');
const fs = require('node:fs');
const { GLOSSARY_TERMS } = require('../data/seoExpansion.ts');
const slugs = GLOSSARY_TERMS.map((t) => t.slug);
/* The related-links graph, fingerprinted. relatedTerms is computed POSITIONALLY
   (all[(index + 7) % all.length] and friends) over the truncated array, so one
   upstream row change renumbers every index and rewires the internal link block
   on all 320 pages while the slug SET stays identical. A set comparison cannot
   see that. This can. */
const graph = require('node:crypto').createHash('sha256')
  .update(GLOSSARY_TERMS.map((t) => `${t.slug}>${(t.relatedTerms || []).join(',')}`).join('\n'))
  .digest('hex');
const prev = JSON.parse(fs.readFileSync('docs/repositioning/glossary-published-slugs.json', 'utf8'));
const dropped = prev.slugs.filter((s) => !slugs.includes(s));
const added = slugs.filter((s) => !prev.slugs.includes(s));
fs.writeFileSync('docs/repositioning/glossary-published-slugs.json',
  JSON.stringify({ ...prev, capturedAt: new Date().toISOString().slice(0, 10), count: slugs.length, relatedGraphSha256: graph, slugs }, null, 1) + '\n');
console.log(`re-snapshotted ${slugs.length} slugs. dropped ${dropped.length}, added ${added.length}`);
if (dropped.length) console.log('DROPPED (these stop being published):\n  ' + dropped.join('\n  '));
if (added.length) console.log('ADDED:\n  ' + added.join('\n  '));
