import { DishView } from "@features/dish/components/DishView";
import { BaseLayout } from "pages/layout/BaseLayout";

export function DishPage(): JSX.Element {
  return (
    <BaseLayout>
      <DishView />
    </BaseLayout>
  );
}
