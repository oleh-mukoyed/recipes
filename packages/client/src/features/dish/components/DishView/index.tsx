import noPhoto from "@assets/images/no_photo.png";
import { useGetUserDish } from "@features/dish/hooks/useGetUserDish";
import { NotFound } from "components/NotFound";
import { DishRemove } from "../RemoveDish";
import { Paths } from "pages/Paths";
import { CustomLink } from "components/Link";
import { useParams } from "react-router-dom";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { BOT_URL } from "data/constants";
import { Loader } from "components/Loader";
import { IngredientsList } from "../IngredientsList";
import { useEffect, useState } from "react";
import { CookDish } from "../CookDish";
import { useMainButton } from "hooks/useMainButton";
import { useTranslation } from "react-i18next";

export function DishView(): JSX.Element {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data: dish, isLoading, error } = useGetUserDish(Number(id));

  const [showCalc, setShowCalc] = useState(false);

  const mainButton = useMainButton({
    text: t("main_button_cook"),
    clickHandler: () => setShowCalc(!showCalc),
  });

  useEffect(() => {
    mainButton.show();
    showCalc
      ? mainButton.setText(t("main_button_cancel"))
      : mainButton.setText(t("main_button_cook"));
  }, [showCalc]);

  if (isLoading) return <Loader />;

  if (error) {
    return <NotFound message={error.message} />;
  }

  if (!dish) {
    return <NotFound message={t("dish_not_found")} />;
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
        {showCalc ? (
          <CookDish dish={dish} mainButton={mainButton} />
        ) : (
          <>
            <IngredientsList ingredients={dish.ingredients} />
            <div className="text-center">
              {/* <CookDishModal dish={dish} /> */}
              <CustomLink
                text={t("dish_button_edit")}
                to={Paths.compileDishEditUrl(dish.id)}
              />
              <CustomLink
                text={t("dish_button_share")}
                icon={
                  <PaperAirplaneIcon className="h-4 w-auto text-left inline-block mr-1 pb-1" />
                }
                addClass="ml-2 mr-2 mb-2"
                to={compileShareUrl()}
              />
              <DishRemove dish={dish} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
