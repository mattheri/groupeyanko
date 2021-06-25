import { GetStaticPropsContext } from "next";
import { Category, Product } from "next-env";
import ProductService from "../Products/ProductService";
import CategoryService from "./CategoryService";

class StaticCategoryProps {
  private static instance:StaticCategoryProps;
  private readonly categoryService!:typeof CategoryService;
  private readonly productService!:typeof ProductService;

  private constructor(
    categoryService:typeof CategoryService,
    productService:typeof ProductService
  ) {
    this.categoryService = categoryService;
    this.productService = productService;
  }

  static getInstance():StaticCategoryProps {
    if (!StaticCategoryProps.instance) StaticCategoryProps.instance = new StaticCategoryProps(CategoryService, ProductService);

    return StaticCategoryProps.instance;
  }

  public async paths() {
    const categories = await this.categoryService.fetchAllCategories();

    const paths = categories.map((category) => ({
      params: { id: `${category.id}` },
    }));
  
    return paths;
  }

  public async props({ params }:GetStaticPropsContext) {
    let response:Category[] | Product[];
    const id = this.parseParams(params.id);
    const category = await this.categoryService.fetchCategory(id);
    const parentCategory = !!category.parent ? await this.categoryService.fetchCategory(category.parent) : null;
    response = await this.categoryService.fetchCategoriesByParentId(id);

    if (!response || !response.length) response = await this.productService.fetchProductsByCategory(id);
    return { response, parentCategory, categoryName: category.name }
  }

  public async initialProps() {
    return this.categoryService.fetchParentCategories();
  }

  private parseParams(paramsId:string | string[]):number {
    if (Array.isArray(paramsId)) return 0;

    return parseInt(paramsId);
  }
}

export default StaticCategoryProps.getInstance();
