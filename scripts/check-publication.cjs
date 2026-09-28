require('./lib/load-typescript.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {routesForSitemap,sitemapIndexes,renderUrlSet}=require('../lib/sitemap.ts');
const {AI_PLATFORMS}=require('../data/aiPlatforms.ts');
const {GROWTH_PILLARS,GROWTH_SECTOR_LINKS}=require('../data/growthPositioning.ts');
const {getGrowthPage,growthPublicationManifest}=require('../lib/growth/publication.ts');
const {getPublishedLocalePaths,localeHomeAlternates,localeServiceAlternates}=require('../lib/growth-locales.ts');
const {isLegacyIndexable,isExistingRedirect}=require('../lib/legacy-publication.ts');
assert.equal(AI_PLATFORMS.length,13);
assert.equal(new Set(AI_PLATFORMS.map(p=>p.id)).size,13);
for(const p of AI_PLATFORMS)if(p.icon)assert.ok(fs.existsSync('public'+p.icon),p.id);
for(const p of GROWTH_PILLARS)assert.ok(getGrowthPage(p.href),p.href);
for(const [,slug] of GROWTH_SECTOR_LINKS)assert.ok(getGrowthPage('/growth/industries/'+slug),slug);
assert.equal(getPublishedLocalePaths().length,50);
assert.equal(Object.keys(localeHomeAlternates()).length,12);
for(const p of GROWTH_PILLARS)assert.equal(Object.keys(localeServiceAlternates(p.slug)).length,12);
const entries=sitemapIndexes.flatMap(g=>routesForSitemap(g));
assert.ok(!entries.some(e=>isExistingRedirect(e.path)));
assert.ok(!entries.some(e=>!isLegacyIndexable(e.path)));
for(const record of growthPublicationManifest.filter(p=>p.publication.status!=='published')){
 assert.equal(getGrowthPage(record.path),undefined);assert.ok(!entries.some(e=>e.path===record.path));
}
assert.ok(!renderUrlSet([{path:'/x?a=1&b=2'}]).includes('<lastmod>'));
assert.ok(renderUrlSet([{path:'/x?a=1&b=2'}]).includes('a=1&amp;b=2'));
const baseline=JSON.parse(fs.readFileSync('docs/repositioning/legacy-sitemap-baseline.json','utf8'));
const reviewed=[]; const preserved=[];
for(const row of baseline.entries){
 if(isExistingRedirect(row.path))reviewed.push({...row,status:'existing-redirect-preserved',reason:'Pre-existing redirect; omitted from current XML sitemap.'});
 else if(!isLegacyIndexable(row.path))reviewed.push({...row,status:'retained-noindex',reason:'Reviewed duplicate offer; URL retained, excluded from sitemap.'});
 else {assert.ok(entries.some(e=>e.path===row.path),'Legacy route disappeared from discovery: '+row.path);preserved.push({...row,status:'retained-indexability',reason:'Preserve URL and current search availability; hidden from new primary navigation.'});}
}
fs.writeFileSync('docs/repositioning/legacy-page-register.json',JSON.stringify({reviewedAt:'2026-09-24',preservedUrls:baseline.entries.length,records:[...preserved,...reviewed]},null,2));
console.log(JSON.stringify({pass:true,platforms:13,legacyEntries:baseline.entries.length,preservedDiscovery:preserved.length,reviewedExceptions:reviewed.length,sitemapEntries:entries.length,localizedRoutes:50},null,2));
