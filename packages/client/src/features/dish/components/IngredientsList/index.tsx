import { IngredientPresenter } from "@api/generated";

export const IngredientsList = ({
  ingredients,
}: {
  ingredients: Array<IngredientPresenter>;
}): JSX.Element => {
  return (
    <>
      <div className="mt-2 px-0">
        <h3 className="text-base font-semibold leading-7">Ingredients:</h3>
      </div>
      <div className="mt-2 border-t">
        <div className="divide-y mb-2">
          {ingredients.map((ingredient) => {
            return (
              <div
                className="px-0 py-2 justify-between items-center grid grid-cols-12"
                key={ingredient.id}
              >
                <div className="text-sm font-medium leading-6 text-left col-span-10 items-center flex">
                  {ingredient.name}
                </div>
                <div className="text-sm leading-6 text-right col-span-2 font-bold">
                  {ingredient.number}
                  {ingredient.measurement.shortName}
                  {"."}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
