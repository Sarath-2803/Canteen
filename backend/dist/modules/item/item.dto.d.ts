import { z } from "zod";
export declare const createItemSchema: z.ZodObject<{
    categoryId: z.ZodUUID;
    itemName: z.ZodString;
    itemDescription: z.ZodString;
    price: z.ZodCoercedNumber<unknown>;
    imageUrl: z.ZodURL;
    stockQuantity: z.ZodCoercedNumber<unknown>;
    isAvailable: z.ZodOptional<z.ZodPreprocess<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const updateItemSchema: z.ZodObject<{
    categoryId: z.ZodOptional<z.ZodUUID>;
    itemName: z.ZodOptional<z.ZodString>;
    itemDescription: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    imageUrl: z.ZodOptional<z.ZodURL>;
    stockQuantity: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    isAvailable: z.ZodOptional<z.ZodPreprocess<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const itemSchema: z.ZodObject<{
    itemId: z.ZodUUID;
    categoryId: z.ZodUUID;
    itemName: z.ZodString;
    itemDescription: z.ZodString;
    price: z.ZodCoercedNumber<unknown>;
    imageUrl: z.ZodURL;
    stockQuantity: z.ZodCoercedNumber<unknown>;
    isAvailable: z.ZodPreprocess<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
export type ItemDto = z.infer<typeof itemSchema>;
//# sourceMappingURL=item.dto.d.ts.map