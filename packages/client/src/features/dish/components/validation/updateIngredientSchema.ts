import { UpdateIngredientDto } from "@api/generated";
import { ZodType, z } from "zod";

export const updateIngredientSchema: ZodType<UpdateIngredientDto> = z.object({
  id: z.number().int(),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(255, "Max length is 255"),
  number: z
    .string({ invalid_type_error: "Number is required" })
    .min(1)
    .refine(
      (value) => !Number.isNaN(parseFloat(value)) && parseFloat(value) > 0,
      "Enter number, formats: 5, 5.1, 5.01"
    )
    .refine(
      (value) => /^(?!0{2,})\d+\.?(\d{1,2})?$/.test(value.toString()),
      "Enter number, formats: 5, 5.1, 5.01"
    ),
  // .transform((n) => {
  //   return n === "" ? n : parseFloat(n).toString();
  // }),
  // .min(0.01, "Min value is 0.01")
  // .refine(
  //   (n) => {
  //     return (
  //       !n.toString().includes(".") || n.toString().split(".")[1].length <= 2
  //     );
  //   },
  //   { message: "Max precision is 2 decimal places" }
  // ),
  measurementId: z.number().min(1).int(),
});
