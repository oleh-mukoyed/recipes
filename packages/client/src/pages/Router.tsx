import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DishesPage } from "./dish/Dishes";
import { Paths } from "./Paths";
import { NotFound } from "components/NotFound";
import { AddDishPage } from "./dish/AddDish";
import { DishPage } from "./dish";
import { dishLoader } from "@features/dish/hooks/useGetUserDish";
import { DishPresenter } from "@api/generated";
import { EditDishPage } from "./dish/EditDish";

export interface Crumb {
  link: string;
  name: string;
}

export interface DishDetailUrlParams {
  id: number;
}

export function Router(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: Paths.DISHES_PAGE,
      handle: {
        crumb: (): Crumb => ({
          link: Paths.DISHES_PAGE,
          name: Paths.DISHES_PAGE_TITLE,
        }),
      },
      children: [
        {
          index: true,
          Component: DishesPage,
        },
        {
          path: Paths.ADD_DISH_PAGE,
          Component: AddDishPage,
          handle: {
            crumb: (): Crumb => ({
              link: Paths.ADD_DISH_PAGE,
              name: Paths.ADD_DISH_PAGE_TITLE,
            }),
          },
        },
        {
          path: Paths.DISH_PAGE,
          loader: dishLoader,
          handle: {
            crumb: (data: DishPresenter): Crumb => {
              return {
                link: Paths.compileDishUrl(data.id),
                name: data.name,
              };
            },
          },
          children: [
            {
              index: true,
              Component: DishPage,
            },
            {
              path: "edit",
              Component: EditDishPage,
              loader: dishLoader,
              handle: {
                crumb: (data: DishPresenter): Crumb => {
                  return {
                    link: Paths.compileDishEditUrl(data.id),
                    name: Paths.compileDishEditTitle(data.name),
                  };
                },
              },
            },
          ],
        },
      ],
    },
    {
      path: "*",
      Component: NotFound,
    },
  ]);

  return <RouterProvider router={router} />;
}
