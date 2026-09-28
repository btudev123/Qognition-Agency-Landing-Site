/* Invariant checks for taxonomy, publication and full country source coverage.
 * Uses the project's TypeScript compiler; no new test dependency is required. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(file) {
  file = path.resolve(root, file);
  if (cache.has(file)) return cache.get(file).exports;
  if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(file, 'utf8'));
  const module = { exports: {} }; cache.set(file, module);
  const result = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } });
  const localRequire = (name) => {
    // React cache is a request deduplication wrapper; the data tests exercise
    // the wrapped function directly without starting a React render.
    if (name === 'react') return { cache: (fn) => fn };
    if (!name.startsWith('.')) return require(name);
    const base = path.resolve(path.dirname(file), name);
    const resolved = [base, base + '.ts', base + '.json', path.join(base, 'index.ts')].find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
    if (!resolved) throw new Error('Cannot resolve ' + name + ' from ' + file);
    return load(resolved);
  };
  new Function('require','module','exports', result.outputText)(localRequire,module,module.exports);
  return module.exports;
}
async function main() {
  const data = load('data/growth/index.ts');
  const pub = load('lib/growth/publication.ts');
  const geo = load('lib/growth/geo.ts');
  const unique = (items, field) => assert.equal(new Set(items.map((item) => item[field])).size, items.length, `Duplicate ${field}`);
  unique(data.growthNiches, 'id'); unique(data.growthPillars, 'id'); unique(data.growthServices, 'id'); unique(pub.growthPublicationManifest, 'path');
  assert.equal(data.growthSectors.length, 8);
  assert.equal(data.growthPillars.length, 4);
  assert.equal(data.growthMarkets.length, 17);
  const oldServices = load('data/services.ts').SERVICES.flatMap((item) => item.subServices || []);
  assert.equal(data.legacyGrowthServiceMappings.length, oldServices.length, 'Every existing subservice must be accounted for');
  for (const capability of data.legacyGrowthServiceMappings) assert.ok(data.growthPillars.some((pillar) => pillar.id === capability.pillarId), 'Unmapped legacy capability ' + capability.id);
  assert.ok(data.growthNiches.length > 150, 'Full niche/subniche coverage');
  for (const niche of data.growthNiches) {
    assert.ok(data.growthSectors.some((sector) => sector.id === niche.sectorId), 'Missing sector for ' + niche.id);
    if (niche.parentId) assert.ok(data.growthNiches.some((parent) => parent.id === niche.parentId && parent.sectorId === niche.sectorId && !parent.parentId), 'Invalid parent ' + niche.id);
    assert.ok(pub.getGrowthPage(data.getNichePath(niche)), 'Missing canonical page ' + niche.id);
  }
  for (const id of ['microsoft-partners','oracle-partners','netsuite-partners','actuators','clinical-trial-technology','white-label-electronics','pharmaceutical-logistics','soc-2-compliance-software','core-banking','security-awareness','defense-suppliers']) assert.ok(data.growthNiches.some((niche) => niche.id === id), 'Missing supplied niche: ' + id);
  for (const program of data.growthPrograms) {
    assert.ok(data.growthNiches.some((niche) => niche.id === program.nicheId));
    assert.ok(data.growthMarkets.some((market) => market.id === program.marketId));
    assert.ok(program.contentBrief.trim() && program.measurement.trim() && program.buyerTask.trim(), 'Program missing required editorial fields: ' + program.id);
  }
  assert.ok(data.growthPrograms.length >= 30 && data.growthPrograms.length <= 50);
  unique(data.growthPrograms, 'contentBrief');
  const sitemap = pub.getGrowthSitemapEntries();
  for (const entry of sitemap) {
    const page = pub.getGrowthPage(entry.path);
    assert.ok(page.publication.indexable && page.publication.status === 'published');
    assert.equal(entry.lastModified, page.publication.updatedAt);
    assert.ok(page.publication.reviewedAt && page.publication.reviewer);
  }
  for (const page of pub.growthPublicationManifest.filter((item) => item.publication.status !== 'published')) {
    assert.equal(pub.getGrowthPage(page.path), undefined, 'Draft/review must not resolve');
    assert.ok(!sitemap.some((entry) => entry.path === page.path));
  }
  assert.equal(pub.getGrowthPage('/growth/programs/ai-search-pumps-every-city'), undefined);
  assert.ok(!sitemap.some((entry) => entry.path.endsWith('/places')));
  assert.equal(geo.geographyCoverage.countries, 17);
  for (const country of geo.geographyManifest.countries) {
    assert.ok(country.sourceRecords >= country.catalogRecords);
    assert.equal(country.populatedPlaces + country.administrativeAreas, country.catalogRecords);
    assert.match(country.sourceSha256, /^[a-f0-9]{64}$/);
    assert.ok(fs.statSync(path.join(root,'data/growth/geography',country.countryCode.toLowerCase()+'.jsonl.gz')).size > 0);
  }
  const singapore = await geo.searchGrowthPlaces('SG', {query:'Singapore', limit: 5});
  assert.ok(singapore.items.length > 0);
  assert.ok(singapore.items.every((place) => place.countryCode === 'SG' && !['PPLH','PPLQ','PPLW'].includes(place.featureCode)));
  await assert.rejects(() => geo.searchGrowthPlaces('../../etc/passwd'));
  const page1 = await geo.searchGrowthPlaces('US', {limit: 2});
  const page2 = await geo.searchGrowthPlaces('US', {limit: 2, after: page1.nextOffset});
  assert.ok(page1.hasMore && page2.items.every((place) => !page1.items.some((other) => other.id === place.id)));
  console.log(JSON.stringify({ passed: true, sectors: data.growthSectors.length, niches: data.growthNiches.filter((niche) => !niche.parentId).length, subniches: data.growthNiches.filter((niche) => niche.parentId).length, services: data.growthServices.length, legacySubservices: data.legacyGrowthServiceMappings.length, programs: data.growthPrograms.length, publishedPages: pub.getPublishedGrowthPages().length, indexablePages: sitemap.length, geography: geo.geographyCoverage }, null, 2));
}
module.exports = { load };
if (require.main === module) main().catch((error) => { console.error(error); process.exitCode = 1; });
