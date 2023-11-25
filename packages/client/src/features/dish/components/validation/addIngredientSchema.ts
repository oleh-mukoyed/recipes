import { AddIngredientDto } from "@api/generated";
import { ZodType, z } from "zod";
import i18n from "../../../../i18n";

export const addIngredientSchema: ZodType<AddIngredientDto> = z.object({
  name: z
    .string({ required_error: i18n.t("ingredient_validation_name_req") })
    .min(1, i18n.t("ingredient_validation_name_req"))
    .max(255, i18n.t("ingredient_validation_name_max")),
  number: z
    .string({ invalid_type_error: i18n.t("ingredient_validation_number_req") })
    .min(1, i18n.t("ingredient_validation_number_req"))
    .refine(
      (value) => !Number.isNaN(parseFloat(value)) && parseFloat(value) > 0,
      i18n.t("ingredient_validation_number_format")
    )
    .refine(
      (value) => /^(?!0{2,})\d+\.?(\d{1,2})?$/.test(value.toString()),
      i18n.t("ingredient_validation_number_format")
    ),
  measurementId: z.number().min(1).int(),
});
