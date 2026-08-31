import { ValidationError } from "./errors.js";
export const validate = (schema, value) => {
    const result = schema.safeParse(value);
    if (!result.success) {
        const message = result.error?.issues.map((issue) => issue.message).join(', ') || 'Validation failed';
        throw new ValidationError(message);
    }
    return result.data;
};
//# sourceMappingURL=validate.js.map