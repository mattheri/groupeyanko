import { FC } from "react";
import { Col } from "react-bootstrap";
import { Image } from "types";
import ProductImagesController from "./ProductImagesController";

interface Props {
	images:Image[];
	placeholder:string;
}

const ProductImageSection:FC<Props> = ({ images, placeholder }) => {
	return(
		<Col className="py-5" xs={12} md={6}>
			<ProductImagesController images={images} placeholder={placeholder} />		
		</Col>
	);
};

export default ProductImageSection;