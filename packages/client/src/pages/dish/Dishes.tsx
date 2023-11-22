import { DishList } from "@features/dish/components/DishList";
import { BaseLayout } from "pages/layout/BaseLayout";

export function DishesPage(): JSX.Element {
  return (
    <>
      <BaseLayout>
        <DishList />
      </BaseLayout>
    </>
  );
}
