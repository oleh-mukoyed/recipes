import { DishPresenter } from "@api/generated";
import { useGetUserDishes } from "../../hooks/useGetUserDishes";
import noPhoto from "@assets/images/no_photo.png";
import { Paths } from "pages/Paths";
import { NotFound } from "components/NotFound";
import { useGetUserInfo } from "hooks/useGetUserInfo";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "components/Loader";
import { useMainButtonAdd } from "@features/dish/hooks/useMainButtonAdd";
import { useEffect } from "react";
import {
  MainButton,
  useThemeParams,
  useWebApp,
} from "@vkruglikov/react-telegram-web-app";
import { SUCCESS_BUTTON_COLOR } from "data/constants";

export function DishList(): JSX.Element {
  const { data: userData } = useGetUserInfo();
  const userId = userData?.id || 0;

  const theme = useThemeParams();
  const webApp = useWebApp();
  console.log("theme :", theme);
  const pp = {
    accent_text_color: "#79e8d9",
    bg_color: "#282e33",
    button_color: "#3fc1b0",
    button_text_color: "#ffffff",
    destructive_text_color: "#f57474",
    header_bg_color: "#282e33",
    hint_color: "#82868a",
    link_color: "#4be1c3",
    secondary_bg_color: "#313b43",
    section_bg_color: "#282e33",
    section_header_text_color: "#4be1c3",
    subtitle_text_color: "#82868a",
    text_color: "#f5f5f5",
  };

  const { data, isLoading, error } = useGetUserDishes(userId, !!userId);

  const navigate = useNavigate();

  // const mainButton = useMainButtonAdd();

  // useEffect(() => {
  //   isLoading ? mainButton.hide() : mainButton.show();
  // }, [isLoading]);
  webApp.MainButton.hide();
  useEffect(() => {
    isLoading ? webApp.MainButton.hide() : webApp.MainButton.show();
  }, [isLoading]);

  if (isLoading) return <Loader />;

  if (error) {
    return <NotFound message={error.message} />;
  }

  const dishes = data || [];
  const hasDishes = Array.isArray(dishes) && dishes.length;

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight mb-3">Dishes</h1>
      {!hasDishes ? (
        <p>You have no dishes. Add your first dish.</p>
      ) : (
        <div className="">
          {dishes.length &&
            dishes.map((dish: DishPresenter) => {
              const link = Paths.compileDishUrl(dish.id);
              return (
                <div key={dish.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={noPhoto}
                      alt={dish.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mb-4 mt-1 flex justify-center">
                    <div>
                      <h3 className="text-sm">
                        <Link to={link}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {dish.name}
                        </Link>
                      </h3>
                      {/* <p className="mt-1 text-sm text-gray-500">{dish.name}</p> */}
                    </div>
                    {/* <p className="text-sm font-medium text-gray-900">{dish.name}</p> */}
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <MainButton
        text="Add dish"
        onClick={() => navigate(Paths.ADD_DISH_PAGE)}
      />
    </>
  );
}
