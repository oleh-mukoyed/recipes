import axios, { AxiosRequestConfig } from "axios";

export const axiosBaseUrl = `${import.meta.env.VITE_SERVER_URL}`;

export const axiosConfig: AxiosRequestConfig = {
  baseURL: axiosBaseUrl,
};

const axiosBackendClient = axios.create(axiosConfig);

export default axiosBackendClient;
