import { AxiosRequestConfig, AxiosResponse } from "axios";

export type ApiResponse<T> = AxiosResponse<T>;

export type ApiRequestConfig = Omit<AxiosRequestConfig, 'baseUrl'>;

export type ApiQueryParams = Omit<ApiRequestConfig, 'method'>;

export type AxiosRequestConfiguration = Omit<AxiosRequestConfig, 'method'>;