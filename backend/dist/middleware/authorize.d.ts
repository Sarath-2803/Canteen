export interface UserPayloadDTO {
    userId: string;
    email: string;
    role: 'admin' | 'customer';
}
declare global {
    namespace Express {
        interface Request {
            user?: UserPayloadDTO;
        }
    }
}
declare const auth: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const generateToken: (userPayload: UserPayloadDTO) => string;
export default auth;
//# sourceMappingURL=authorize.d.ts.map