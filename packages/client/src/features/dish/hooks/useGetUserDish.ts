import { dishApi } from "@api/api";
import { useQuery } from "@tanstack/react-query";
import { DISH_QUERY_KEYS } from "./queryKeys";
import { useGetUserInfo, userLoader } from "hooks/useGetUserInfo";
import { queryClient } from "@api/queryClient";
import { Params } from "react-router-dom";
import { DEFAULT_LANGUAGE } from "data/constants";

const getUserDish = async (id: number) => {
  const userId = (await userLoader())?.id ?? 0;
  const locale =
    window?.Telegram?.WebApp?.initDataUnsafe?.user?.language_code ??
    DEFAULT_LANGUAGE;
  return dishApi
    .dishControllerGetDish({ id, userId, locale })
    .then((data) => data?.data?.data);
};

export const dishLoader = async ({ params }: { params: Params<"id"> }) => {
  const id = parseInt(params.id ?? "");
  return await queryClient.fetchQuery({
    queryKey: DISH_QUERY_KEYS.userDish(id),
    queryFn: () => getUserDish(id),
  });
};

export const useGetUserDish = (id: number) => {
  const { data: userData } = useGetUserInfo();
  const userId = userData?.id || 0;
  const query = useQuery({
    queryKey: DISH_QUERY_KEYS.userDish(id),
    queryFn: () => getUserDish(id),
    enabled: !!userId,
  });

  return query;
};
