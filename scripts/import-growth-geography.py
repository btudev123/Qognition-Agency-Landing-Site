#!/usr/bin/env python3
"""Import full GeoNames country exports, not a population-threshold city sample.

Run: python3 scripts/import-growth-geography.py [--countries US CA ...]
Derived data: GeoNames CC BY 4.0. Source coverage is not a claim of completeness
of real-world places. Populated-place and administrative records retain IDs.
"""
import argparse
import concurrent.futures
import datetime
import gzip
import hashlib
import io
import json
import pathlib
import tempfile
import urllib.request
import zipfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / 'data/growth/geography'
COUNTRIES = 'US CA AU GB NL DE SE DK NO FI CH AE SG IE AT CN IN'.split()
BASE = 'https://download.geonames.org/export/dump/'
LICENSE = 'https://creativecommons.org/licenses/by/4.0/'

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'QognitionGeographyImporter/1.0 (attributed country catalog)'})
    with urllib.request.urlopen(req, timeout=180) as response:
        return response.read(), response.headers.get('Last-Modified')

def write_json(path, obj):
    temp = path.with_suffix(path.suffix + '.tmp')
    temp.write_text(json.dumps(obj, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    temp.replace(path)

def import_country(code):
    url = BASE + code + '.zip'
    raw, modified = fetch(url)
    records = []
    total = 0
    with zipfile.ZipFile(io.BytesIO(raw)) as archive:
        with archive.open(code + '.txt') as stream:
            for binary in stream:
                total += 1
                row = binary.decode('utf-8').rstrip('\n').split('\t')
                if len(row) != 19 or row[8] != code or row[6] not in ('P', 'A'):
                    continue
                records.append({
                    'id': 'geonames:' + row[0], 'geonameId': int(row[0]),
                    'name': row[1], 'asciiName': row[2],
                    'aliases': list(dict.fromkeys(filter(None, row[3].split(',')))),
                    'countryCode': row[8], 'featureClass': row[6], 'featureCode': row[7],
                    'adminCodes': row[10:14], 'latitude': float(row[4]), 'longitude': float(row[5]),
                    'population': int(row[14] or 0), 'timezone': row[17], 'modifiedAt': row[18],
                })
    records.sort(key=lambda p: (-p['population'], p['name'], p['geonameId']))
    payload = ('\n'.join(json.dumps(record, ensure_ascii=False, separators=(',', ':')) for record in records) + '\n').encode('utf-8')
    target = OUT / (code.lower() + '.jsonl.gz')
    # mtime=0 makes repeat imports byte-stable when the source is unchanged.
    target.write_bytes(gzip.compress(payload, mtime=0))
    summary = {
        'countryCode': code, 'sourceUrl': url, 'sourceLastModified': modified,
        'sourceSha256': hashlib.sha256(raw).hexdigest(),
        'catalogSha256': hashlib.sha256(payload).hexdigest(),
        'sourceRecords': total, 'catalogRecords': len(records),
        'populatedPlaces': sum(p['featureClass'] == 'P' for p in records),
        'administrativeAreas': sum(p['featureClass'] == 'A' for p in records),
        'topPlaces': [{k: p[k] for k in ('id', 'geonameId', 'name', 'featureCode', 'population')} for p in records if p['featureClass'] == 'P'][:12],
        'importedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
    }
    print(f"{code}: {summary['catalogRecords']:,} catalog records", flush=True)
    return summary

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--countries', nargs='+', default=COUNTRIES, choices=COUNTRIES)
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    countries_raw, modified = fetch(BASE + 'countryInfo.txt')
    registry = []
    for line in countries_raw.decode('utf-8').splitlines():
        if not line or line.startswith('#'): continue
        row = line.split('\t')
        if len(row) < 17: continue
        registry.append({'id': 'geonames:' + row[16], 'countryCode': row[0], 'name': row[4], 'capital': row[5], 'continent': row[8], 'languages': row[15].split(','), 'status': 'selected' if row[0] in COUNTRIES else 'candidate', 'marketEvidence': None})
    write_json(OUT / 'global-candidates.json', {'sourceUrl': BASE + 'countryInfo.txt', 'license': LICENSE, 'sourceLastModified': modified, 'countries': registry})
    existing = OUT / 'manifest.json'
    summaries = {row['countryCode']: row for row in json.loads(existing.read_text())['countries']} if existing.exists() else {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        for summary in pool.map(import_country, args.countries):
            summaries[summary['countryCode']] = summary
    write_json(existing, {
        'provider': 'GeoNames', 'license': LICENSE, 'attribution': 'Geographical data: GeoNames, CC BY 4.0; filtered and reformatted by Qognition.',
        'selection': 'Every feature-class P (populated place) and A (administrative area) record in each selected country export, without population cutoff. Includes historical/abandoned records when classified by GeoNames; inspect featureCode before campaign use.',
        'coverageLimit': 'A full import of source records does not establish that every real-world city, town or boundary is represented or current.',
        'countries': [summaries[c] for c in COUNTRIES if c in summaries],
    })

if __name__ == '__main__': main()
