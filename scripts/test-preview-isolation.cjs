require('./lib/load-typescript.cjs');
const assert = require('node:assert/strict');
const { POST } = require('../app/api/audit/route.ts');
async function main() {
  let calls = 0;
  global.fetch = async () => { calls++; throw new Error('Preview must not use network'); };
  for (const env of [{VERCEL_ENV:'preview'}, {QOGNITION_PREVIEW_MODE:'1'}]) {
    delete process.env.VERCEL_ENV; delete process.env.QOGNITION_PREVIEW_MODE;
    Object.assign(process.env, env);
    const response = await POST(new Request('http://localhost/api/audit', {method:'POST',body:'not parsed in preview'}));
    assert.equal(response.status,503);
    assert.equal((await response.json()).status,'preview_disabled');
    assert.equal(calls,0);
  }
  console.log('PASS: preview audit guard makes zero network calls, before parsing input.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
