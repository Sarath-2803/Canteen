import type { NextFunction, Request, Response } from 'express';
/**
 * Request logging middleware
 *
 * Logs incoming HTTP requests with method, path, status code, and response time.
 * Useful for debugging, monitoring, and audit trails.
 */
export declare const requestLogger: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=requestLogger.d.ts.map