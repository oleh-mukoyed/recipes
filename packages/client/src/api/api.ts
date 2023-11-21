import axiosBackendClient, { axiosBaseUrl } from "../axios/axios-client";
import { DishApi, MeasurementApi, UserApi } from "./generated";

export const userApi = new UserApi(
  {
    basePath: axiosBaseUrl,
    isJsonMime: () => false,
  },
  undefined,
  axiosBackendClient
);

export const dishApi = new DishApi(
  {
    basePath: axiosBaseUrl,
    isJsonMime: () => false,
  },
  undefined,
  axiosBackendClient
);

export const measurementApi = new MeasurementApi(
  {
    basePath: axiosBaseUrl,
    isJsonMime: () => false,
  },
  undefined,
  axiosBackendClient
);
