import { dishApi } from "@api/api";
import { useQuery } from "@tanstack/react-query";
import { DISH_QUERY_KEYS } from "./queryKeys";

export const useGetUserDish = (id: number, userId: number, enabled = true) => {
  const query = useQuery({
    queryKey: DISH_QUERY_KEYS.userDish(id),
    queryFn: () =>
      dishApi
        .dishControllerGetDish({ id, userId })
        .then((data) => data?.data?.data),
    enabled: enabled,
  });

  return query;
};
