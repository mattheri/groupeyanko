import { Product } from "types";
import { FC } from "react";
import ProductSectionContainer from "../molecule/ProductSectionContainer";
import ProductUpperSection from "../molecule/ProductUpperSection";
import ProductLowerSection from "../molecule/ProductLowerSection";

interface Props {
  product:Product;
};

const DEFAULT_IMAGE_PLACEHOLDER = "/uploads/images/placeholder.png";

const ProductSection:FC<Props> = ({ product }) => {
  return (
    <ProductSectionContainer>
      <ProductUpperSection product={product} placeholder={DEFAULT_IMAGE_PLACEHOLDER} />
      <ProductLowerSection product={product} />
    </ProductSectionContainer>
  );
}

export default ProductSection;
