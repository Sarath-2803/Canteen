import type { NextFunction, Request, RequestHandler, Response } from 'express';
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
export declare const asyncHandler: (handler: AsyncHandler) => RequestHandler;
export declare const notFoundHandler: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Global error handler middleware
 *
 * Catches all errors passed via next(error) and sends consistent JSON responses.
 */
declare const errorHandler: (error: unknown, req: Request, res: Response, next: NextFunction) => void;
export default errorHandler;
//# sourceMappingURL=errorHandler.d.ts.map