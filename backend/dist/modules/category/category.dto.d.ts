import { z } from "zod";
export declare const createCategorySchema: z.ZodObject<{
    categoryName: z.ZodString;
    categoryDescription: z.ZodString;
}, z.core.$strip>;
export declare const updateCategorySchema: z.ZodObject<{
    categoryName: z.ZodOptional<z.ZodString>;
    categoryDescription: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const categorySchema: z.ZodObject<{
    categoryId: z.ZodUUID;
    categoryName: z.ZodString;
    categoryDescription: z.ZodString;
}, z.core.$strip>;
export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;
export type CategoryDTO = z.infer<typeof categorySchema>;
//# sourceMappingURL=category.dto.d.ts.map