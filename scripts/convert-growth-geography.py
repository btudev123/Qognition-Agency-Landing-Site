"""One-time migration of previously imported JSON arrays to streamable JSONL."""
import gzip, hashlib, json, pathlib
root = pathlib.Path(__file__).resolve().parents[1] / 'data/growth/geography'
manifest = json.loads((root / 'manifest.json').read_text())
for source in sorted(root.glob('*.json.gz')):
    records = json.loads(gzip.decompress(source.read_bytes()))
    payload = ('\n'.join(json.dumps(row, ensure_ascii=False, separators=(',', ':')) for row in records) + '\n').encode()
    target = source.with_name(source.name.replace('.json.gz', '.jsonl.gz'))
    target.write_bytes(gzip.compress(payload, mtime=0))
    code = source.name.split('.')[0].upper()
    for item in manifest['countries']:
        if item['countryCode'] == code: item['catalogSha256'] = hashlib.sha256(payload).hexdigest()
    source.unlink()
    print(code, len(records), flush=True)
(root / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, separators=(',', ':')))
