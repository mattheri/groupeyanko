import Carousel from "components/Carousel/organism/Carousel";
import { FC } from "react";
import { Image } from "types";
import ProductImage from "../atom/ProductImage";

interface Props {
	images:Image[];
	placeholder:string;
}

const ProductCarousel:FC<Props> = ({ images, placeholder }) => {
	return(
		<Carousel>
			{images.map((image) => (
				<ProductImage
					alt={image.alt}
					key={image.id}
					src={image.src || placeholder}
				/>
			))}
		</Carousel>
	);
};

export default ProductCarousel;