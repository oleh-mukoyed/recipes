import { AddDishDto } from "@api/generated";
import { ZodType, z } from "zod";
import { addIngredientSchema } from "./addIngredientSchema";

export const addDishSchema: ZodType<AddDishDto> = z.object({
  userId: z.number().int().positive(),
  name: z.string().min(1, "Name is required").max(255, "Max length is 255"),
  notes: z.string().max(3000, "Max length is 3000"),
  ingredients: z
    .array(addIngredientSchema)
    .min(1, "The dish must contain at least one ingredient"),
});
