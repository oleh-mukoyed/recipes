import { dishApi } from "@api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateDishDto } from "@api/generated";
import { DISH_QUERY_KEYS } from "./queryKeys";

export const useUpdateDish = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (updateDishDto: UpdateDishDto) => {
      return dishApi
        .dishControllerUpdateDish({ updateDishDto })
        .then((data) => data?.data?.data);
    },

    onSuccess: (dish) => {
      if (dish?.id) {
        queryClient.invalidateQueries({
          queryKey: DISH_QUERY_KEYS.userDish(dish?.id),
        });
      }
    },
  });

  return mutation;
};
