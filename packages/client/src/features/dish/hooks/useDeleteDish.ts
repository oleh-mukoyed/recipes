import { dishApi } from "@api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DISH_QUERY_KEYS } from "./queryKeys";

export const useDeleteDish = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => {
      return dishApi
        .dishControllerDeleteDish({ id })
        .then((data) => data?.data?.data);
    },

    onSuccess: (data) => {
      if (data?.userId) {
        queryClient.invalidateQueries({
          queryKey: DISH_QUERY_KEYS.userDish(data.id),
        });
        queryClient.invalidateQueries({
          queryKey: DISH_QUERY_KEYS.userDishesList(data.userId),
        });
      }
    },
  });

  return mutation;
};
