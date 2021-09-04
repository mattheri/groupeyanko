import Card from "components/Card/organism/Card";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { RelatedProducts } from "types";

interface Props {
	relatedProducts:RelatedProducts[];
}

const ProductCrossSell:FC<Props> = ({ relatedProducts }) => {
	return(
		<Row>
			{relatedProducts.map((product, index) => (
				<Col key={product.id}>
					<Card
						description={product.title}
						url={`/product/${product.id}`}
						src={product.img.src}
					/>
				</Col>
			))}
		</Row>
	);
};

export default ProductCrossSell;