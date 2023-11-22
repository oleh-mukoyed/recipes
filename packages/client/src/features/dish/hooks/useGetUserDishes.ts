import { dishApi } from "@api/api";
import { useQuery } from "@tanstack/react-query";
import { DISH_QUERY_KEYS } from "./queryKeys";

export const useGetUserDishes = (userId: number, enabled = true) => {
  const query = useQuery({
    queryKey: DISH_QUERY_KEYS.userDishesList(userId),
    queryFn: () =>
      dishApi
        .dishControllerGetDishes({ userId })
        .then((data) => data?.data?.data),
    enabled: enabled,
  });

  return query;
};
