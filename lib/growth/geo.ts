import { createReadStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { createInterface } from 'node:readline';
import path from 'node:path';
import { cache } from 'react';
import manifest from '../../data/growth/geography/manifest.json';
import globalCandidates from '../../data/growth/geography/global-candidates.json';
import { growthMarkets } from '../../data/growth/markets';

export type GeoPlace = {
  id: string; geonameId: number; name: string; asciiName: string; aliases: string[];
  countryCode: string; featureClass: 'P' | 'A'; featureCode: string;
  adminCodes: string[]; latitude: number; longitude: number; population: number;
  timezone: string; modifiedAt: string;
};
export const geographyManifest = manifest;
export const globalMarketCandidates = globalCandidates;
export const geographyCoverage = {
  countries: manifest.countries.length,
  records: manifest.countries.reduce((sum, country) => sum + country.catalogRecords, 0),
  populatedPlaces: manifest.countries.reduce((sum, country) => sum + country.populatedPlaces, 0),
  administrativeAreas: manifest.countries.reduce((sum, country) => sum + country.administrativeAreas, 0),
};
export function getCountryCoverage(code: string) {
  return manifest.countries.find((country) => country.countryCode === code);
}
const normalize = (value: string) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/** Server-only streaming search. Never imports 2M records into the client or
 * parses a complete large country into a serverless process's memory. */
export async function searchGrowthPlaces(countryCode: string, options: { query?: string; type?: 'P' | 'A'; after?: number; limit?: number; includeHistorical?: boolean } = {}) {
  const code = countryCode.toUpperCase();
  if (!growthMarkets.some((market) => market.code === code)) throw new Error('Unsupported catalog country');
  const query = normalize((options.query || '').slice(0, 100).trim());
  const offset = Math.max(0, Math.min(Math.floor(options.after || 0), getCountryCoverage(code)?.catalogRecords || 0));
  const limit = Math.max(1, Math.min(options.limit || 30, 50));
  const source = createReadStream(path.join(process.cwd(), 'data', 'growth', 'geography', `${code.toLowerCase()}.jsonl.gz`));
  const unzip = createGunzip();
  source.on('error', (error) => unzip.destroy(error));
  const lines = createInterface({ input: source.pipe(unzip), crlfDelay: Infinity });
  const items: GeoPlace[] = [];
  let matched = 0;
  let hasMore = false;
  try {
    for await (const line of lines) {
      if (!line) continue;
      const place = JSON.parse(line) as GeoPlace;
      if (!options.includeHistorical && (/H$/.test(place.featureCode) || ['PPLQ','PPLW'].includes(place.featureCode))) continue;
      if (options.type && place.featureClass !== options.type) continue;
      if (query && !normalize(`${place.name} ${place.asciiName} ${place.aliases.join(' ')} ${place.geonameId}`).includes(query)) continue;
      if (matched++ < offset) continue;
      if (items.length >= limit) { hasMore = true; break; }
      items.push(place);
    }
  } finally { lines.close(); source.destroy(); unzip.destroy(); }
  return { items, hasMore, nextOffset: hasMore ? offset + limit : null };
}

export const getGrowthPlaceById = cache(async (countryCode: string, id: number): Promise<GeoPlace | undefined> => {
  const code = countryCode.toUpperCase();
  if (!growthMarkets.some((market) => market.code === code) || !Number.isSafeInteger(id) || id <= 0) return undefined;
  const source = createReadStream(path.join(process.cwd(), 'data', 'growth', 'geography', `${code.toLowerCase()}.jsonl.gz`));
  const unzip = createGunzip();
  source.on('error', (error) => unzip.destroy(error));
  const lines = createInterface({ input: source.pipe(unzip), crlfDelay: Infinity });
  try {
    for await (const line of lines) {
      if (line.includes(`"geonameId":${id},`)) return JSON.parse(line) as GeoPlace;
    }
  } finally { lines.close(); source.destroy(); unzip.destroy(); }
  return undefined;
});
