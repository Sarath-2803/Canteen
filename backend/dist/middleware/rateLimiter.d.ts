import type { Request, Response, NextFunction } from 'express';
interface RateLimitConfig {
    windowMs: number;
    maxRequests: number;
}
/**
 * Simple in-memory rate limiter middleware
 *
 * Limits requests per IP address within a time window.
 * For production, use external services (Redis) instead.
 */
export declare const createRateLimiter: (config: RateLimitConfig) => (_req: Request, res: Response, next: NextFunction) => void;
/**
 * Default global rate limiter: 100 requests per 15 minutes
 */
export declare const globalRateLimiter: (_req: Request, res: Response, next: NextFunction) => void;
/**
 * Strict rate limiter for auth endpoints: 5 requests per 15 minutes
 */
export declare const authRateLimiter: (_req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=rateLimiter.d.ts.map