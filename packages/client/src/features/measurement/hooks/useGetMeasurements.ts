import { useQuery } from "@tanstack/react-query";
import { MEASUREMENT_QUERY_KEYS } from "../queryKeys";
import { measurementApi } from "@api/api";
import { useTelegram } from "hooks/useTelegram";
import { DEFAULT_LANGUAGE } from "data/constants";

export const useGetMeasurements = (enabled = true) => {
  const { tg } = useTelegram();
  const locale = tg.initDataUnsafe.user?.language_code ?? DEFAULT_LANGUAGE;
  const query = useQuery({
    queryKey: MEASUREMENT_QUERY_KEYS.measurementsList(locale),
    queryFn: () =>
      measurementApi
        .measurementControllerGetMeasurements({ locale })
        .then((data) => data?.data?.data),
    enabled: enabled,
  });

  return query;
};
