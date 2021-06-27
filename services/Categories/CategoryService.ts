import { AxiosResponse } from "axios";
import { Category, WooHeaders } from "../../next-env";
import AxiosService from '../AxiosService';

class CategoryService {
  private readonly axios:typeof AxiosService;
  private static instance:CategoryService;
  private constructor(axios:typeof AxiosService) {
    this.axios = axios;
  }

  static getInstance():CategoryService {
    if (!CategoryService.instance) CategoryService.instance = new CategoryService(AxiosService);

    return CategoryService.instance;
  }

  public async fetchCategoriesByParentId(categoryId:number):Promise<Category[]> {
    const response:AxiosResponse<Category[]> = await this.axios.get({
      url: `products/categories?parent=${categoryId}&per_page=100&hide_empty=true`,
    });

    return response.data;
  }

  public async fetchCategory(categoryId:number | string):Promise<Category> {
    const response:AxiosResponse<Category> = await this.axios.get({
      url: `products/categories/${categoryId}`,
    });

    return response.data;
  }

  public async fetchAllCategories():Promise<Category[]> {
    let page = 1;
    const pages:Category[] = [];

    while(page) {
      const { data, headers } = await this.fetchCategoriesPerPage(page);
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

  private async fetchCategoriesPerPage(page:number):Promise<AxiosResponse<Category[]>> {
    const response:AxiosResponse<Category[]> = await this.axios.get({
      url: `products/categories?per_page=100&hide_empty=true&page=${page}`,
    });

    return response;
  }

  public async fetchParentCategories():Promise<Category[]> {
    const response:AxiosResponse<Category[]> = await this.axios.get({
      url: 'products/categories?per_page=100&hide_empty=true',
    });

    return this.filterParentCategories(response.data);
  }

  private filterParentCategories(categories:Category[]):Category[] {
    return categories.filter((category) => !category._links.up);
  }
}

export default CategoryService.getInstance();