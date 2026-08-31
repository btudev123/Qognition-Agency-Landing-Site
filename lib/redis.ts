/**
 * Minimal Upstash Redis REST client.
 *
 * Shared by the audit rate limiter and the lead dead-letter queue so there is
 * exactly one place that knows how to talk to Redis. Returns `null` whenever
 * Redis is not configured or the call fails — callers must treat Redis as
 * best-effort and never depend on it for correctness of the response.
 */
export const redisCommand = async (command: (string | number)[]) => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command),
      cache: 'no-store'
    });

    if (!response.ok) return null;
    return (await response.json().catch(() => null)) as { result?: string | number | null } | null;
  } catch {
    return null;
  }
};

export const isRedisConfigured = () =>
  Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
