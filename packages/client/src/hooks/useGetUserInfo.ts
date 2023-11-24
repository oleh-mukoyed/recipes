import { useQuery } from "@tanstack/react-query";
import { USER_QUERY_KEYS } from "./queryKeys";
import { userApi } from "@api/api";
import { queryClient } from "@api/queryClient";

const telegramId = window.Telegram.WebApp.initDataUnsafe.user?.id
  ? window.Telegram.WebApp.initDataUnsafe.user.id.toString()
  : import.meta.env.VITE_TELEGRAM_ID || "";

const getUser = () =>
  userApi
    .userControllerGetUserByTelegramId({ telegramId })
    .then((data) => data?.data?.data);

export const userLoader = async () => {
  return await queryClient.fetchQuery({
    queryKey: USER_QUERY_KEYS.getUserByTelegramId(telegramId),
    queryFn: () => getUser(),
  });
};

export const useGetUserInfo = () => {
  const query = useQuery({
    staleTime: 1 * 60 * 1000,
    queryKey: USER_QUERY_KEYS.getUserByTelegramId(telegramId),
    queryFn: () => getUser(),
  });

  return query;
};
