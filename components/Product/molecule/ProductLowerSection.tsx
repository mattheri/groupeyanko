import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { Product } from "types";
import ProductDescription from "../atom/ProductDescription";
import ProductTitle from "../atom/ProductTitle";
import ProductRelatedSection from "./ProductRelatedSection";
import SectionRow from "./SectionRow";

interface Props {
	product:Product;
}

const ProductLowerSection:FC<Props> = ({ product }) => {
	return(
		<>
		<SectionRow>
			<Col>
				<ProductTitle title="Description" />
				<ProductDescription description={product.description} />
			</Col>
		</SectionRow>
		<ProductRelatedSection relatedProducts={product["jetpack-related-posts"]} />
		</>
	);
};

export default ProductLowerSection;