export declare const validate: <T>(schema: {
    safeParse: (value: unknown) => {
        success: boolean;
        data?: T;
        error?: {
            issues: Array<{
                message: string;
            }>;
        };
    };
}, value: unknown) => T;
//# sourceMappingURL=validate.d.ts.map