import { useQuery } from "@tanstack/react-query";
import { USER_QUERY_KEYS } from "./queryKeys";
import { userApi } from "@api/api";
import { useInitData } from "@vkruglikov/react-telegram-web-app";

export const useGetUserInfo = () => {
  const [WebAppUser] = useInitData();
  const telegramId = WebAppUser?.user?.id
    ? WebAppUser?.user?.id.toString()
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
