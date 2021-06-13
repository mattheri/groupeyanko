import { AxiosRequestConfig, AxiosResponse } from "axios";
import AxiosService from "./AxiosService";

type ApiRequestConfig = Omit<AxiosRequestConfig, "baseURL">;

class ApiService {
  private static instance:ApiService;
  private readonly axiosService:typeof AxiosService;
  private constructor(axiosService:typeof AxiosService) {
    this.axiosService = axiosService;
  }

  static getInstance() {
    if (!ApiService.instance) ApiService.instance = new ApiService(AxiosService);

    return ApiService.instance;
  }

  public async fetch(params:ApiRequestConfig):Promise<AxiosResponse<any>> {
    return this.axiosService.fetch({
      ...params,
      baseURL: "",
    });
  }

  public async post(params:Omit<ApiRequestConfig, "method">):Promise<AxiosResponse<any>> {
    return this.axiosService.fetch({
      ...params,
      method: 'POST',
      baseURL: '',
    })
  }
}

export default ApiService.getInstance();
