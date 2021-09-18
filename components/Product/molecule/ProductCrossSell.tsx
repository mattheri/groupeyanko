import Card from "components/Card/organism/Card";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { Product } from "types";

interface Props {
	relatedProducts:Product[];
}

const DEFAULT_IMAGE_PLACEHOLDER = "/uploads/images/placeholder.png";

const ProductCrossSell:FC<Props> = ({ relatedProducts }) => {

	return(
		<Row className="justify-content-center">
			{relatedProducts.map((product) => (
				<Col xs={12} md={3} key={product.id}>
					<Card
						description={product.name}
						url={`/product/${product.id}`}
						src={product.images[0]?.src || DEFAULT_IMAGE_PLACEHOLDER}
						addToCart
						product={product}
					/>
				</Col>
			))}
		</Row>
	);
};

export default ProductCrossSell;