import { FC } from "react";
import { Image } from "types";
import ProductImage from "../atom/ProductImage";
import ProductCarousel from "./ProductCarousel";

interface Props {
	images:Image[];
	placeholder:string;
}

const ProductImagesController:FC<Props> = ({ images, placeholder }) => {
	return images.length > 1 ? (
		<ProductCarousel images={images} placeholder={placeholder} />
	) : (
		<ProductImage
			alt={images[0].alt}
			src={images[0].src || placeholder}
		/>
	);
};

export default ProductImagesController;