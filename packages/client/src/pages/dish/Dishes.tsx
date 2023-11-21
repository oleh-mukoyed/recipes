import { DishList } from "@features/dish/components/DishList";
import { useMainButtonAdd } from "@features/dish/hooks/useMainButtonAdd";
import { BaseLayout } from "pages/layout/BaseLayout";

export function DishesPage(): JSX.Element {
  useMainButtonAdd();

  return (
    <>
      <BaseLayout>
        <DishList />
      </BaseLayout>
    </>
  );
}
