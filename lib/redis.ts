import { Redis } from "@upstash/redis"

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Cache keys
export const CACHE_KEYS = {
  userApps: (userId: string) => `user:${userId}:apps`,
  appDetails: (appId: string) => `app:${appId}`,
  appInsights: (appId: string) => `app:${appId}:insights`,
  userStats: (userId: string) => `user:${userId}:stats`,
  rateLimit: (userId: string, action: string) => `ratelimit:${userId}:${action}`,
}

// Cache TTLs in seconds
export const CACHE_TTL = {
  apps: 60 * 5, // 5 minutes
  insights: 60 * 10, // 10 minutes
  stats: 60 * 2, // 2 minutes
}

// Rate limiting helper
export async function checkRateLimit(
  userId: string,
  action: string,
  maxRequests: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const key = CACHE_KEYS.rateLimit(userId, action)
  const now = Date.now()
  const windowStart = now - windowSeconds * 1000

  // Get current count
  const count = await redis.incr(key)
  
  if (count === 1) {
    // First request, set expiry
    await redis.expire(key, windowSeconds)
  }

  const ttl = await redis.ttl(key)
  const resetAt = now + ttl * 1000

  return {
    allowed: count <= maxRequests,
    remaining: Math.max(0, maxRequests - count),
    resetAt,
  }
}

// Cache helpers
export async function getCached<T>(key: string): Promise<T | null> {
  return redis.get(key)
}

export async function setCache<T>(
  key: string,
  value: T,
  ttlSeconds: number
): Promise<void> {
  await redis.set(key, value, { ex: ttlSeconds })
}

export async function invalidateCache(key: string): Promise<void> {
  await redis.del(key)
}
