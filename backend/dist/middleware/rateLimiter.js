import { TooManyRequestsError } from '../utils/errors.js';
/**
 * Simple in-memory rate limiter middleware
 *
 * Limits requests per IP address within a time window.
 * For production, use external services (Redis) instead.
 */
export const createRateLimiter = (config) => {
    const store = new Map();
    setInterval(() => {
        const now = Date.now();
        for (const [key, record] of store.entries()) {
            if (record.resetTime < now) {
                store.delete(key);
            }
        }
    }, config.windowMs);
    return (_req, res, next) => {
        const clientIp = _req.ip || _req.socket.remoteAddress || 'unknown';
        const now = Date.now();
        let record = store.get(clientIp);
        if (!record || record.resetTime < now) {
            record = {
                count: 1,
                resetTime: now + config.windowMs,
            };
            store.set(clientIp, record);
            next();
        }
        else if (record.count < config.maxRequests) {
            record.count += 1;
            next();
        }
        else {
            const retryAfter = Math.ceil((record.resetTime - now) / 1000);
            res.set('Retry-After', retryAfter.toString());
            next(new TooManyRequestsError(`Rate limit exceeded. Try again in ${retryAfter} seconds.`));
        }
    };
};
/**
 * Default global rate limiter: 100 requests per 15 minutes
 */
export const globalRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 1000,
});
/**
 * Strict rate limiter for auth endpoints: 5 requests per 15 minutes
 */
export const authRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 500,
});
//# sourceMappingURL=rateLimiter.js.map