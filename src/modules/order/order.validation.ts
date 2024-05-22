import { z } from "zod";

export const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().int().positive(),
  quantity: z.number().int().positive(),
});
