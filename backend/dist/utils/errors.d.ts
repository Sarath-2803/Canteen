/**
 * Base class for custom errors
 */
export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
/**
 * 404 Not Found Error
 */
export declare class NotFoundError extends AppError {
    constructor(message?: string);
}
/**
 * 400 Bad Request / Validation Error
 */
export declare class ValidationError extends AppError {
    constructor(message?: string);
}
/**
 * 401 Unauthorized Error
 */
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
/**
 * 403 Forbidden Error
 */
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
/**
 * 409 Conflict Error (e.g., duplicate email)
 */
export declare class ConflictError extends AppError {
    constructor(message?: string);
}
/**
 * 429 Too Many Requests Error
 */
export declare class TooManyRequestsError extends AppError {
    constructor(message?: string);
}
//# sourceMappingURL=errors.d.ts.map