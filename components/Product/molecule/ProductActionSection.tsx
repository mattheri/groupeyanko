import AddToCart from "components/AddToCart/organism/AddToCartController";
import { FC } from "react";
import { Col } from "react-bootstrap";
import { Product } from "types";
import ProductDescription from "../atom/ProductDescription";
import ProductTitle from "../atom/ProductTitle";

interface Props {
	product:Product;
}

const ProductActionSection:FC<Props> = ({ product }) => {
	const { name, short_description } = product;
	return(
		<Col className="py-5 d-flex align-items-center justify-content-center flex-column" xs={12} md={6}>
			<ProductTitle title={name} />
			<ProductDescription description={short_description} />
			<AddToCart
				product={product}
				useInput
				replaceAmount
			/>
		</Col>
	);
};

export default ProductActionSection;