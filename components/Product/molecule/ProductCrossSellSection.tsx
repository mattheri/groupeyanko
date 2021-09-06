import Carousel from "components/Carousel/organism/Carousel";
import { FC } from "react";
import { Col } from "react-bootstrap";
import { Product } from "types";
import ProductCrossSell from "./ProductCrossSell";

interface Props {
	relatedProductsList:Product[][];
}

const ProductCrossSellSection:FC<Props> = ({ relatedProductsList }) => {
	return(
		<Col>
			<Carousel>
				{relatedProductsList.map((relatedProducts, index) => (
					<ProductCrossSell key={index} relatedProducts={relatedProducts} />
				))}
			</Carousel>
		</Col>
	);
};

export default ProductCrossSellSection;