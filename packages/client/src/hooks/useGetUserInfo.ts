import { useQuery } from "@tanstack/react-query";
import { useTelegram } from "./useTelegram";
import { USER_QUERY_KEYS } from "./queryKeys";
import { userApi } from "@api/api";

export const useGetUserInfo = () => {
  const { user: telegramUser } = useTelegram();
  const telegramId = telegramUser?.id
    ? telegramUser.id.toString()
    : import.meta.env.VITE_TELEGRAM_ID || "";

  const query = useQuery({
    staleTime: 1 * 60 * 1000,
    queryKey: USER_QUERY_KEYS.getUserByTelegramId(telegramId),
    queryFn: () =>
      userApi
        .userControllerGetUserByTelegramId({ telegramId })
        .then((data) => data?.data?.data),
  });

  return query;
};
