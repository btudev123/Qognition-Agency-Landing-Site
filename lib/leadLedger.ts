import { createHmac, randomUUID } from 'node:crypto';

export type LeadEnv = Record<string, string | undefined>;
export type DeliveryKind = 'notification' | 'confirmation' | 'advertising';
export type DeliveryState = 'started' | 'sent' | 'failed' | 'unknown' | 'skipped';
export type LeadReceipt = {
  version: 1; submissionId: string; digest: string; eventId: string;
  state: 'pending' | 'contact_write_started' | 'contact_saved' | 'note_write_started' | 'reconciliation_required' | 'captured';
  createdAt: string; updatedAt: string; contactId?: string; noteId?: string; noteBodyHash?: string;
  deliveries: Partial<Record<DeliveryKind, DeliveryState>>;
};
export type LeadLease = { contactKey: string; receiptKey: string; owner: string; receipt: LeadReceipt };
export interface LeadLedger {
  begin(email: string, receipt: LeadReceipt): Promise<LeadLease>;
  renew(lease: LeadLease): Promise<void>;
  save(lease: LeadLease, receipt: LeadReceipt): Promise<void>;
  release(lease: LeadLease): Promise<void>;
  claimDelivery(submissionId: string, digest: string, kind: DeliveryKind): Promise<boolean>;
  finishDelivery(submissionId: string, digest: string, kind: DeliveryKind, state: DeliveryState): Promise<void>;
}
export class LeadLedgerError extends Error {
  constructor(public code: 'not_configured' | 'unavailable' | 'busy' | 'lease_lost' | 'submission_conflict') { super(code); }
}

const REQUIRED = ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'LEAD_LEDGER_HMAC_SECRET', 'GHL_LOCATION_ID'] as const;
/**
 * Receipt retention, matching the privacy notice (about 24 months plus margin). Refreshed on
 * every receipt write. Set but invalid makes the ledger misconfigured, never silently default.
 */
const DEFAULT_TTL_DAYS = 760;
export function ledgerTtlDays(env: LeadEnv = process.env): number {
  const raw = env.LEAD_LEDGER_TTL_DAYS?.trim();
  if (!raw) return DEFAULT_TTL_DAYS;
  const days = /^\d{1,4}$/.test(raw) ? Number(raw) : NaN;
  return days >= 1 && days <= 3650 ? days : NaN;
}
export function ledgerConfiguration(env: LeadEnv = process.env) {
  const missing = REQUIRED.filter(key => !env[key]?.trim());
  let secureEndpoint = false;
  try { const url = new URL(env.UPSTASH_REDIS_REST_URL || ''); secureEndpoint = url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash; } catch { /* reported as not configured */ }
  const ttlDays = ledgerTtlDays(env);
  return { configured: !missing.length && secureEndpoint && (env.LEAD_LEDGER_HMAC_SECRET?.length || 0) >= 32 && Number.isFinite(ttlDays), missing, secureEndpoint, ttlDays: Number.isFinite(ttlDays) ? ttlDays : null };
}

/**
 * The ledger is optional (operator decision 2026-10-06). It adds exactly-once email and
 * CAPI on retries. Absent means none of its own keys are set; a partial setup stays a
 * configuration error so a typo never silently downgrades capture.
 */
const LEDGER_KEYS = ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'LEAD_LEDGER_HMAC_SECRET'] as const;
export const ledgerAbsent = (env: LeadEnv = process.env) => LEDGER_KEYS.every(key => !env[key]?.trim());

/**
 * Stand-in when no ledger is configured. Nothing persists between requests, so every
 * delivery claim succeeds and a client retry can send a second notification. Retry
 * detection falls back to the GHL contact's notes (see captureLeadInCrm).
 */
export function createDisabledLeadLedger(): LeadLedger {
  return {
    async begin(_email, receipt) { return { contactKey: '', receiptKey: '', owner: '', receipt }; },
    async renew() {},
    async save(lease, receipt) { lease.receipt = receipt; },
    async release() {},
    async claimDelivery() { return true; },
    async finishDelivery() {},
  };
}

// All keys share a server-owned location/environment hash tag for atomic Lua on
// Redis Cluster. Contact keys are HMACs, never email addresses. Receipts expire after
// LEAD_LEDGER_TTL_DAYS from their last write (EX, the final ARGV of each receipt write).
const BEGIN = `-- lead:begin
local raw = redis.call('GET', KEYS[2])
if raw then
  local old = cjson.decode(raw)
  if old.digest ~= ARGV[2] then return {'conflict'} end
  if old.state == 'captured' then return {'captured', raw} end
end
if redis.call('EXISTS', KEYS[1]) == 1 or redis.call('EXISTS', KEYS[3]) == 1 then return {'busy'} end
redis.call('SET', KEYS[1], ARGV[1], 'PX', ARGV[3])
redis.call('SET', KEYS[3], ARGV[1], 'PX', ARGV[3])
if not raw then raw = ARGV[4]; redis.call('SET', KEYS[2], raw, 'EX', ARGV[5]) end
return {'acquired', raw}`;
const RENEW = `-- lead:renew
if redis.call('GET', KEYS[1]) ~= ARGV[1] or redis.call('GET', KEYS[2]) ~= ARGV[1] then return 0 end
redis.call('PEXPIRE', KEYS[1], ARGV[2]); redis.call('PEXPIRE', KEYS[2], ARGV[2]); return 1`;
const SAVE = `-- lead:save
if redis.call('GET', KEYS[1]) ~= ARGV[1] or redis.call('GET', KEYS[3]) ~= ARGV[1] then return 0 end
local raw = redis.call('GET', KEYS[2])
if not raw or cjson.decode(raw).digest ~= ARGV[2] then return 0 end
redis.call('SET', KEYS[2], ARGV[3], 'EX', ARGV[4]); return 1`;
const RELEASE = `-- lead:release
for _, key in ipairs(KEYS) do if redis.call('GET', key) == ARGV[1] then redis.call('DEL', key) end end
return 1`;
const CLAIM = `-- lead:delivery-claim
local raw = redis.call('GET', KEYS[1]); if not raw then return 0 end
local record = cjson.decode(raw)
if record.digest ~= ARGV[1] or record.state ~= 'captured' or record.deliveries[ARGV[2]] then return 0 end
record.deliveries[ARGV[2]] = 'started'; redis.call('SET', KEYS[1], cjson.encode(record), 'EX', ARGV[3]); return 1`;
const FINISH = `-- lead:delivery-finish
local raw = redis.call('GET', KEYS[1]); if not raw then return 0 end
local record = cjson.decode(raw)
if record.digest ~= ARGV[1] or record.state ~= 'captured' or record.deliveries[ARGV[2]] ~= 'started' then return 0 end
record.deliveries[ARGV[2]] = ARGV[3]; redis.call('SET', KEYS[1], cjson.encode(record), 'EX', ARGV[4]); return 1`;

export function createLeadLedger(env: LeadEnv = process.env, request: typeof fetch = fetch): LeadLedger {
  if (!ledgerConfiguration(env).configured) throw new LeadLedgerError('not_configured');
  const hmac = (value: string) => createHmac('sha256', env.LEAD_LEDGER_HMAC_SECRET!).update(value).digest('hex');
  const scope = hmac(`${env.VERCEL_ENV || 'local'}:${env.GHL_LOCATION_ID}`);
  const prefix = `qognition:lead:{${scope}}`;
  const receiptKey = (id: string) => `${prefix}:receipt:${hmac(id)}`;
  const ttl = 45_000;
  const receiptTtl = String(ledgerTtlDays(env) * 86_400);
  async function evalScript(script: string, keys: string[], args: string[]): Promise<unknown> {
    try {
      const response = await request(env.UPSTASH_REDIS_REST_URL!.replace(/\/$/, ''), {
        method: 'POST', headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(['EVAL', script, String(keys.length), ...keys, ...args]),
        cache: 'no-store', signal: AbortSignal.timeout(5_000), redirect: 'error',
      });
      if (!response.ok) throw new LeadLedgerError('unavailable');
      const body = await response.json();
      if (body.error || !Object.hasOwn(body, 'result')) throw new LeadLedgerError('unavailable');
      return body.result;
    } catch { throw new LeadLedgerError('unavailable'); }
  }
  return {
    async begin(email, receipt) {
      const contactKey = `${prefix}:contact:${hmac(email.trim().toLowerCase())}`;
      const key = receiptKey(receipt.submissionId); const owner = randomUUID();
      const result = await evalScript(BEGIN, [contactKey, key, `${key}:lock`], [owner, receipt.digest, String(ttl), JSON.stringify(receipt), receiptTtl]);
      if (!Array.isArray(result)) throw new LeadLedgerError('unavailable');
      if (result[0] === 'conflict') throw new LeadLedgerError('submission_conflict');
      if (result[0] === 'busy') throw new LeadLedgerError('busy');
      if (!['acquired', 'captured'].includes(result[0])) throw new LeadLedgerError('unavailable');
      let saved: LeadReceipt;
      try { saved = JSON.parse(result[1]); } catch { throw new LeadLedgerError('unavailable'); }
      if (saved.digest !== receipt.digest || saved.submissionId !== receipt.submissionId) throw new LeadLedgerError('unavailable');
      return { contactKey, receiptKey: key, owner, receipt: saved };
    },
    async renew(lease) {
      if (await evalScript(RENEW, [lease.contactKey, `${lease.receiptKey}:lock`], [lease.owner, String(ttl)]) !== 1) throw new LeadLedgerError('lease_lost');
    },
    async save(lease, receipt) {
      if (await evalScript(SAVE, [lease.contactKey, lease.receiptKey, `${lease.receiptKey}:lock`], [lease.owner, lease.receipt.digest, JSON.stringify(receipt), receiptTtl]) !== 1) throw new LeadLedgerError('lease_lost');
      lease.receipt = receipt;
    },
    async release(lease) { await evalScript(RELEASE, [lease.contactKey, `${lease.receiptKey}:lock`], [lease.owner]); },
    async claimDelivery(id, digest, kind) { return await evalScript(CLAIM, [receiptKey(id)], [digest, kind, receiptTtl]) === 1; },
    async finishDelivery(id, digest, kind, state) { await evalScript(FINISH, [receiptKey(id)], [digest, kind, state, receiptTtl]); },
  };
}
