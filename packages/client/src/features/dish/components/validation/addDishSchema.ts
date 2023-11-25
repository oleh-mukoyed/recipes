import { AddDishDto } from "@api/generated";
import { ZodType, z } from "zod";
import { addIngredientSchema } from "./addIngredientSchema";
import i18n from "../../../../i18n";

export const addDishSchema: ZodType<AddDishDto> = z.object({
  userId: z.number().int().positive(),
  name: z
    .string()
    .min(1, i18n.t("dish_validation_name_req"))
    .max(255, i18n.t("dish_validation_name_max")),
  notes: z.string().max(3000, i18n.t("dish_validation_notes_max")),
  ingredients: z
    .array(addIngredientSchema)
    .min(1, i18n.t("dish_ingredients_validation_req")),
});
