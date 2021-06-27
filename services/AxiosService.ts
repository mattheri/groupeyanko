import axios, { AxiosRequestConfig } from 'axios';
import { Agent } from 'http';
import { Agent as SecureAgent } from 'https';
import { AxiosRequestConfiguration } from './domain/Api';

class AxiosService {
  private static instance:AxiosService;
  private constructor() {
    this.init();
  }

  public async get(params:AxiosRequestConfiguration) {
    try {
      return axios({ ...params, method: 'GET' });
    } catch(e) {
      throw new Error(e);
    }
  }

  public async post(params:AxiosRequestConfiguration) {
    try {
      return axios({ ...params, method: 'POST' });
    } catch(e) {
      throw new Error(e);
    }
  }

  static getInstance():AxiosService {
    if (!AxiosService.instance) AxiosService.instance = new AxiosService();

    return AxiosService.instance;
  }

  private init() {
    const httpsAgent = new SecureAgent({ keepAlive: true });
    const httpAgent = new Agent({ keepAlive: true });

    axios.defaults.baseURL = `${process.env.API_ENDPOINT}`;
    axios.defaults.auth = {
      username: process.env.API_KEY,
      password: process.env.API_SECRET,
    }
    axios.defaults.httpAgent = httpAgent;
    axios.defaults.httpsAgent = httpsAgent;
  }
}

export default AxiosService.getInstance();