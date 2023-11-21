import { useQuery } from "@tanstack/react-query";
import { MEASUREMENT_QUERY_KEYS } from "../queryKeys";
import { measurementApi } from "@api/api";

export const useGetMeasurements = () => {
  const query = useQuery({
    queryKey: MEASUREMENT_QUERY_KEYS.measurementsList(),
    queryFn: () =>
      measurementApi
        .measurementControllerGetMeasurements()
        .then((data) => data?.data?.data),
  });

  return query;
};
