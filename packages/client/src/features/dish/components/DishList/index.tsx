import { DishPresenter } from "@api/generated";
import { useGetUserDishes } from "../../hooks/useGetUserDishes";
import noPhoto from "@assets/images/no_photo.png";
import { Paths } from "pages/Paths";
import { NotFound } from "components/NotFound";
import { useGetUserInfo } from "hooks/useGetUserInfo";
import { Link } from "react-router-dom";
import { Loader } from "components/Loader";
import { useMainButtonAdd } from "@features/dish/hooks/useMainButtonAdd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function DishList(): JSX.Element {
  const { t } = useTranslation();
  const { data: userData } = useGetUserInfo();
  const userId = userData?.id || 0;

  const { data, isLoading, error } = useGetUserDishes(userId, !!userId);

  const mainButton = useMainButtonAdd();

  useEffect(() => {
    isLoading ? mainButton.hide() : mainButton.show();
  }, [isLoading]);

  if (isLoading) return <Loader />;

  if (error) {
    return <NotFound message={error.message} />;
  }

  const dishes = data || [];
  const hasDishes = Array.isArray(dishes) && dishes.length;

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight mb-3">
        {t("dishes_page_title")}
      </h1>
      {!hasDishes ? (
        <p>{t("dishes_page_empty_msg")}</p>
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
    </>
  );
}
