import { createHash, randomUUID } from 'crypto';
import { NextRequest } from 'next/server';
import { redisCommand } from './redis';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const DEVICE_COOKIE = 'qognition_audit_device';

type AuditRateStore = Map<string, number>;

const getStore = () => {
  const globalForAudit = globalThis as typeof globalThis & { __qognitionAuditRateStore?: AuditRateStore };
  if (!globalForAudit.__qognitionAuditRateStore) {
    globalForAudit.__qognitionAuditRateStore = new Map();
  }
  return globalForAudit.__qognitionAuditRateStore;
};

const hash = (value: string) => createHash('sha256').update(value).digest('hex').slice(0, 32);

export const getAuditClientIp = (request: NextRequest) => {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || forwarded || 'unknown';
};

export const checkAuditRateLimit = async (request: NextRequest, email: string) => {
  const now = Date.now();
  const store = getStore();
  const ip = getAuditClientIp(request);
  const userAgent = request.headers.get('user-agent') || 'unknown-device';
  const deviceId = request.cookies.get(DEVICE_COOKIE)?.value || randomUUID();
  const keys = [
    `ip:${hash(ip)}`,
    `device:${hash(`${deviceId}:${userAgent}`)}`,
    `email:${hash(email.toLowerCase())}`
  ];

  for (const [key, expiresAt] of store.entries()) {
    if (expiresAt <= now) store.delete(key);
  }

  const redisResults = await Promise.all(keys.map((key) => redisCommand(['GET', key])));
  const redisLimitedUntil = redisResults
    .map((item) => Number(item?.result || 0))
    .find((expiresAt) => expiresAt > now);

  const limitedUntil = redisLimitedUntil || keys.map((key) => store.get(key) || 0).find((expiresAt) => expiresAt > now);
  if (limitedUntil) {
    return {
      allowed: false,
      deviceId,
      keys,
      retryAfterSeconds: Math.ceil((limitedUntil - now) / 1000)
    };
  }

  return {
    allowed: true,
    deviceId,
    keys,
    retryAfterSeconds: 0
  };
};

export const recordAuditRateLimit = async (keys: string[]) => {
  const expiresAt = Date.now() + ONE_DAY_MS;
  const store = getStore();
  keys.forEach((key) => store.set(key, expiresAt));
  await Promise.all(keys.map((key) => redisCommand(['SET', key, String(expiresAt), 'PX', ONE_DAY_MS])));
};

export const getAuditDeviceCookie = () => DEVICE_COOKIE;
