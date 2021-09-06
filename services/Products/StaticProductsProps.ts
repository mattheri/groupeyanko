import { GetStaticPropsContext } from "next";
import ProductService from "./ProductService";

class StaticProductsProps {
  private static instance:StaticProductsProps;
  private readonly productService:typeof ProductService;
  private constructor(productService:typeof ProductService) {
    this.productService = productService;
  }

  static getInstance():StaticProductsProps {
    if (!StaticProductsProps.instance) StaticProductsProps.instance = new StaticProductsProps(ProductService);

    return StaticProductsProps.instance;
  }

  public async paths() {
    const products = await this.productService.fetchAllProducts();

    const paths = products.map((product) => ({
      params: { id: `${product.id}` },
    }));

    return paths;
  }

  public async props({ params }:GetStaticPropsContext) {
    const id = this.parseParams(params.id);
    const product = await this.productService.fetchProduct(id);
    const relatedProductsList = product["jetpack-related-posts"];
    const relatedProducts = await Promise.all(relatedProductsList.map(async (relatedProduct) => await this.productService.fetchProduct(relatedProduct.id)));

    return {
      product,
      relatedProducts,
    }
  }

  private parseParams(paramsId:string | string[]):number {
    if (Array.isArray(paramsId)) return 0;

    return parseInt(paramsId);
  }
}

export default StaticProductsProps.getInstance();