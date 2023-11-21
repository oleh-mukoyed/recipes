import {
  DishPresenter,
  IngredientPresenter,
  UpdateDishDto,
  UpdateIngredientDto,
} from "@api/generated";

export function mapDishPresenterToUpdateDishDto(
  dishPresenter: DishPresenter
): UpdateDishDto {
  const updateDishDto: UpdateDishDto = {
    id: dishPresenter.id,
    name: dishPresenter.name,
    notes: dishPresenter.notes,
    ingredients: mapIngredientsArrayToUpdateIngredientDtoArray(
      dishPresenter.ingredients
    ),
  };

  return updateDishDto;
}

export function mapIngredientsArrayToUpdateIngredientDtoArray(
  ingredientsArray: IngredientPresenter[]
): UpdateIngredientDto[] {
  // Map each ingredient in the array
  const updateIngredientDtoArray: UpdateIngredientDto[] = ingredientsArray.map(
    (ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      number: ingredient.number,
      measurementId: ingredient.measurement.id,
    })
  );

  return updateIngredientDtoArray;
}
