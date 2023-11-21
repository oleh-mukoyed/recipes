import { AddDish } from "@features/dish/components/AddDish";
import { BaseLayout } from "pages/layout/BaseLayout";

export function AddDishPage(): JSX.Element {
  return (
    <>
      <BaseLayout>
        <AddDish />
      </BaseLayout>
    </>
  );
}
