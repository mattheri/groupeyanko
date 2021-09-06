import { AxiosRequestConfig, AxiosResponse } from "axios";
import AxiosService from "./AxiosService";
import { ApiQueryParams } from "./domain/Api";

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

  public async get(params:ApiQueryParams):Promise<AxiosResponse<any>> {
    return this.axiosService.get({
      ...params,
      baseURL: '',
    });
  }

  public async post(params:ApiQueryParams):Promise<AxiosResponse<any>> {
    return this.axiosService.post({
      ...params,
      baseURL: '',
    })
  }
}

export default ApiService.getInstance();
