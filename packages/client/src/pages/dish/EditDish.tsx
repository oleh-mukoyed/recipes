import { DishEditForm } from "@features/dish/components/DishEditForm";
import { BaseLayout } from "pages/layout/BaseLayout";

export function EditDishPage(): JSX.Element {
  return (
    <BaseLayout>
      <DishEditForm />
    </BaseLayout>
  );
}
