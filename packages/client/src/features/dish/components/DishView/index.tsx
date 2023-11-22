import noPhoto from "@assets/images/no_photo.png";
import { useGetUserDish } from "@features/dish/hooks/useGetUserDish";
import { NotFound } from "components/NotFound";
import { useGetUserInfo } from "hooks/useGetUserInfo";
import { CookDishModal } from "../CookDishModal";
import { DishRemove } from "../RemoveDish";
import { Paths } from "pages/Paths";
import { CustomLink } from "components/Link";
import { useParams } from "react-router-dom";
import { ButtonTypes } from "components/Button";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { BOT_URL } from "data/constants";

export function DishView(): JSX.Element {
  const { id } = useParams();

  const { data: userData } = useGetUserInfo();
  const userId = userData?.id || 0;

  const {
    data: dish,
    isLoading,
    error,
  } = useGetUserDish(Number(id), userId, !!userId);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <NotFound message={error.message} />;
  }

  if (!dish) {
    return <NotFound message="Dish not found" />;
  }

  const compileShareUrl = (): string => {
    let text = `${dish.name}:\n`;
    dish.ingredients.forEach((ingredient) => {
      text += `- ${ingredient.name}: ...... ${ingredient.number}${ingredient.measurement.shortName}.\n`;
    });

    return `https://t.me/share/url?url=${encodeURIComponent(
      BOT_URL
    )}&text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight mb-3">{dish.name}</h1>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
        <img
          src={noPhoto}
          alt={dish.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-center">
        {dish.notes ? <p className="text-sm font-light">{dish.notes}</p> : ""}
      </div>
      <div>
        <div className="mt-2 px-0">
          <h3 className="text-base font-semibold leading-7">Ingredients:</h3>
        </div>
        <div className="mt-2 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {dish.ingredients.map((ingredient) => {
              return (
                <div
                  className="px-0 py-2 sm:grid sm:grid-cols-3 sm:gap-4"
                  key={ingredient.id}
                >
                  <dt className="text-sm font-medium leading-6">
                    {ingredient.name}
                  </dt>
                  <dd className="mt-1 text-sm font-light leading-6 sm:col-span-2 sm:mt-0">
                    {ingredient.number}
                    {ingredient.measurement.shortName}
                    {"."}
                  </dd>
                </div>
              );
            })}
          </dl>
          <div className="text-center">
            <CookDishModal dish={dish} />
            <CustomLink
              text="Edit"
              to={Paths.compileDishEditUrl(dish.id)}
              addClass="mr-2"
            />
            <DishRemove dish={dish} />
            <CustomLink
              text="Share"
              btnType={ButtonTypes.other}
              icon={
                <PaperAirplaneIcon className="h-4 w-auto text-left inline-block mr-1 pb-1" />
              }
              addClass="ml-2"
              to={compileShareUrl()}
            />
          </div>
        </div>
      </div>
    </>
  );
}
