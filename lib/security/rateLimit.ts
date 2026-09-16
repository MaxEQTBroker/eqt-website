/**
 * Best-effort, in-memory rate limiter for API routes.
 *
 * SCOPE / HONESTY: serverless functions are ephemeral and there can be several
 * warm instances, so this limits per-instance, not globally. It reliably stops a
 * single client hammering one warm instance (the common spam/abuse case) but is
 * NOT a hard guarantee. For a hard global limit, put a rule in the Vercel Firewall
 * (dashboard) or back this with Vercel KV / Upstash. Kept dependency-free on purpose.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/** Returns true if this key is allowed, false if it has exceeded `limit` within `windowMs`. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    // Opportunistic cleanup so the map can't grow unbounded on a long-lived instance.
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
    }
    return true;
  }
  if (b.count >= limit) return false;
  b.count++;
  return true;
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
