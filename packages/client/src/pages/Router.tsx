import { Route, Routes } from "react-router-dom";
import { DishesPage } from "./dish/Dishes";
import { Paths } from "./Paths";
import { NotFound } from "components/NotFound";
import { AddDishPage } from "./dish/AddDish";
import { DishPage } from "./dish";
import { EditDishPage } from "./dish/EditDish";
import { useBackButton } from "hooks/useBackButton";

export function Router(): JSX.Element {
  useBackButton();

  return (
    <Routes>
      <Route path={Paths.DISHES_PAGE} element={<DishesPage />} />
      <Route path={Paths.DISH_PAGE} element={<DishPage />} />
      <Route path={Paths.ADD_DISH_PAGE} element={<AddDishPage />} />
      <Route path={Paths.DISH_EDIT_PAGE} element={<EditDishPage />} />
      <Route path="*" element={<NotFound message="" />} />
    </Routes>
  );
}
