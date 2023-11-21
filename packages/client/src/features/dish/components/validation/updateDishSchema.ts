import { UpdateDishDto } from "@api/generated";
import { ZodType, z } from "zod";
import { updateIngredientSchema } from "./updateIngredientSchema";

export const updateDishSchema: ZodType<UpdateDishDto> = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, "Name is required").max(255, "Max length is 255"),
  notes: z.string().max(3000, "Max length is 3000"),
  ingredients: z
    .array(updateIngredientSchema)
    .min(1, "The dish must contain at least one ingredient"),
});
