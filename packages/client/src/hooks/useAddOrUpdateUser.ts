import { useQuery } from "@tanstack/react-query";
import { USER_QUERY_KEYS } from "./queryKeys";
import { userApi } from "@api/api";
import { AddUserDto } from "@api/generated";

const telegramId = window.Telegram.WebApp.initDataUnsafe.user?.id
  ? window.Telegram.WebApp.initDataUnsafe.user.id.toString()
  : import.meta.env.VITE_TELEGRAM_ID || "";
const info = window.Telegram.WebApp.initDataUnsafe.user?.id
  ? JSON.stringify(window.Telegram.WebApp.initDataUnsafe.user)
  : null;

const fields: AddUserDto = {
  telegramId: telegramId,
};

if (info) fields.info = info;

const addOrUpdateUser = () =>
  userApi
    .userControllerAddOrUpdateUser({ addUserDto: fields })
    .then((data) => data?.data?.data);

export const useAddOrUpdateUser = () => {
  const query = useQuery({
    staleTime: 1 * 60 * 1000,
    queryKey: USER_QUERY_KEYS.getUserByTelegramId(telegramId),
    queryFn: () => addOrUpdateUser(),
  });

  return query;
};
