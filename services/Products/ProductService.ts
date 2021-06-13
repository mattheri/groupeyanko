import { AxiosResponse } from "axios";
import { Product, WooHeaders } from "next-env";
import AxiosService from "services/AxiosService";

class ProductService {
  private static instance:ProductService;
  private readonly axios:typeof AxiosService;
  private constructor(axios:typeof AxiosService) {
    this.axios = axios;
  }

  static getInstance():ProductService {
    if (!ProductService.instance) ProductService.instance = new ProductService(AxiosService);

    return ProductService.instance;
  }

  public async searchProduct(query:string):Promise<Product[]> {
    const response:AxiosResponse<Product[]> = await this.axios.fetch({
      url: `products?search=${query}`,
      method: 'GET',
    });

    return response.data;
  }

  public async fetchProductsByCategory(categoryId:number):Promise<Product[]> {
    const response:AxiosResponse<Product[]> = await this.axios.fetch({
      url: `products?category=${categoryId}&per_page=100`,
      method: 'GET',
    });

    return response.data;
  }

  public async fetchProduct(productId:number):Promise<Product> {
    const response:AxiosResponse<Product> = await this.axios.fetch({
      url: `products/${productId}`,
      method: 'GET',
    });

    return response.data;
  }

  public async fetchAllProducts():Promise<Product[]> {
    let page = 1;
    const pages:Product[] = [];

    while(page) {
      const { data, headers } = await this.fetchProductsPerPage(page);
      pages.push(...data);

      if (this.isAtEnd(headers, page)) {
        page = 0;
        break;
      }

      if (this.shouldIncrementPage(headers)) {
        page++;
      }
    }
    return pages;
  }

  private isAtEnd(headers:WooHeaders, page:number):boolean {
    const totalpages = parseInt(headers["x-wp-totalpages"]);

    return totalpages === page;
  }

  private shouldIncrementPage(headers:WooHeaders) {
    const totalpages = parseInt(headers["x-wp-totalpages"]);

    return totalpages > 1;
  }

  private async fetchProductsPerPage(page:number):Promise<AxiosResponse<Product[]>> {
    const response:AxiosResponse<Product[]> = await this.axios.fetch({
      url: `products?per_page=100&page=${page}`,
      method: 'GET',
    });

    return response;
  }
}

export default ProductService.getInstance();