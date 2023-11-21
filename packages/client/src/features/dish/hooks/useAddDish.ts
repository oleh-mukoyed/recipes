import { dishApi } from "@api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddDishDto } from "@api/generated";
import { DISH_QUERY_KEYS } from "./queryKeys";

export const useAddDish = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (addDishDto: AddDishDto) => {
      return dishApi
        .dishControllerAddDish({ addDishDto })
        .then((data) => data?.data?.data);
    },

    onSuccess: (dish) => {
      if (dish?.userId) {
        queryClient.invalidateQueries({
          queryKey: DISH_QUERY_KEYS.userDishesList(dish.userId),
        });
      }
    },
  });

  return mutation;
};
