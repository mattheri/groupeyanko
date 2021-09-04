import { FC } from "react";
import { Row } from "react-bootstrap";
import { Product } from "types";
import ProductActionSection from "./ProductActionSection";
import ProductImageSection from "./ProductImageSection";
import SectionRow from "./SectionRow";

interface Props {
	product:Product;
	placeholder:string;
}

const ProductUpperSection:FC<Props> = ({ product, placeholder }) => {
	return(
		<SectionRow>
			<ProductImageSection images={product.images} placeholder={placeholder} />
			<ProductActionSection product={product} />
		</SectionRow>
	);
};

export default ProductUpperSection;