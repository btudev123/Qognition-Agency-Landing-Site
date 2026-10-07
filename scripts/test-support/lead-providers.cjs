// HTTP-only doubles for documented Redis REST and GHL contacts/notes APIs.
// No real credentials, network, contacts, email or calendar writes.
const assert = require('node:assert/strict');
function provider(options = {}) {
  const values = new Map(); const expires = new Map();
  const notes = []; const writes = []; const commands = []; const emailWrites = [];
  let contact = options.existing === false ? null : {
    id: 'contact-1', email: 'buyer@example.com', locationId: 'test-location', name: 'Verified name',
    assignedTo: 'owner', tags: ['customer'], dnd: Boolean(options.dnd), source: 'referral',
    customFields: [{ id: 'sales_stage', value: 'Customer' }, { id: 'unrelated', value: 'keep' }],
  };
  const value = key => { if ((expires.get(key) || Infinity) <= Date.now()) { values.delete(key); expires.delete(key); } return values.get(key); };
  function redis(args) {
    commands.push(args);
    assert.equal(args[0], 'EVAL');
    const n = Number(args[2]); const keys = args.slice(3, 3+n); const a = args.slice(3+n);
    const op = args[1].split('\n')[0];
    if (options.redisUnavailable) return new Response('unavailable', { status: 503 });
    let result;
    if (op === '-- lead:begin') {
      const raw = value(keys[1]); const old = raw && JSON.parse(raw);
      if (old && old.digest !== a[1]) result = ['conflict'];
      else if (old?.state === 'captured') result = ['captured', raw];
      else if (value(keys[0]) || value(keys[2])) result = ['busy'];
      else {
        for (const k of [keys[0], keys[2]]) { values.set(k, a[0]); expires.set(k, Date.now() + Number(a[2])); }
        if (!raw) values.set(keys[1], a[3]);
        result = ['acquired', raw || a[3]];
      }
    } else if (op === '-- lead:renew') {
      result = keys.every(k => value(k) === a[0]) && !options.loseLease ? 1 : 0;
      if (result) for (const k of keys) expires.set(k, Date.now() + Number(a[1]));
    } else if (op === '-- lead:save') {
      result = value(keys[0]) === a[0] && value(keys[2]) === a[0] && JSON.parse(value(keys[1]) || '{}').digest === a[1] ? 1 : 0;
      if (result) {
        const next = JSON.parse(a[2]);
        if (next.state === 'captured' && options.failCommit) throw Error('Synthetic lost Redis response');
        values.set(keys[1], a[2]);
      }
    } else if (op === '-- lead:release') {
      for (const k of keys) if (value(k) === a[0]) { values.delete(k); expires.delete(k); }
      result = 1;
    } else if (op === '-- lead:delivery-claim') {
      const raw = value(keys[0]); const old = raw && JSON.parse(raw);
      result = old?.digest === a[0] && old.state === 'captured' && !old.deliveries[a[1]] ? 1 : 0;
      if (result) { old.deliveries[a[1]] = 'started'; values.set(keys[0], JSON.stringify(old)); }
    } else if (op === '-- lead:delivery-finish') {
      const raw = value(keys[0]); const old = raw && JSON.parse(raw);
      result = old?.digest === a[0] && old.state === 'captured' && old.deliveries[a[1]] === 'started' ? 1 : 0;
      if (result) { old.deliveries[a[1]] = a[2]; values.set(keys[0], JSON.stringify(old)); }
    } else throw Error('Unknown Redis command');
    return Response.json({ result });
  }
  const request = async (url, init = {}) => {
    url = String(url);
    if (url.startsWith('https://redis.example.com')) return redis(JSON.parse(init.body));
    if (url.startsWith('https://api.resend.com/')) {
      emailWrites.push(JSON.parse(init.body));
      if (options.emailUnknown) throw Error('Uncertain mail delivery');
      return options.emailFails ? new Response('rejected', { status: 503 }) : Response.json({ id: 'email-1' });
    }
    if (!url.startsWith('https://services.leadconnectorhq.com/')) throw Error('Unexpected external destination');
    const path = new URL(url).pathname;
    if (options.ghlUnavailable) return new Response('unavailable', { status: 503 });
    if (path.includes('/notes')) {
      assert.equal(init.headers.Version, 'v3');
      if (path.endsWith('/notes') && init.method === 'POST') {
        const body = JSON.parse(init.body); writes.push({ kind: 'note', body });
        const note = { id: `note-${notes.length + 1}`, body: body.body, contactId: 'contact-1', dateAdded: '2026-10-03T00:00:00.000Z' };
        if (!options.dropNote) notes.push(note);
        if (options.loseNoteResponse) throw Error('Synthetic lost note response');
        return Response.json({ note }, { status: 201 });
      }
      if (path.endsWith('/notes')) return Response.json({ notes });
      const note = notes.find(n => n.id === path.split('/').at(-1));
      return Response.json({ note: options.corruptNote && note ? { ...note, body: 'unverified' } : note });
    }
    assert.equal(init.headers.Version, '2021-07-28');
    if (path === '/contacts/search/duplicate') return Response.json({ contact: contact ? { id: contact.id } : null });
    if (path === '/contacts/upsert' || (path === '/contacts/contact-1' && init.method === 'PUT')) {
      const body = JSON.parse(init.body); writes.push({ kind: 'contact', body });
      const fields = new Map((contact?.customFields || []).map(f => [f.id, f.value]));
      for (const field of body.customFields) if (!options.loseInquiry || field.id !== 'inquiry') fields.set(field.id, field.fieldValue);
      contact = { ...contact, id: 'contact-1', locationId: body.locationId || contact?.locationId, email: body.email || contact?.email, customFields: [...fields].map(([id, value]) => ({ id, value })) };
      return Response.json({ contact });
    }
    if (path === '/contacts/contact-1') return Response.json({ contact: options.wrongLocation ? { ...contact, locationId: 'another-location' } : contact });
    throw Error('Unexpected provider path');
  };
  return { request, writes, commands, emailWrites, notes, values, expires, options, get contact() { return contact; } };
}
module.exports = { provider };
