import { FC } from "react";
import Image from "next/image";
import styled from "styled-components";

interface Props {
	src:string;
	alt:string;
}

const ImageContainer = styled.div`
	width: 100%;
	height: 30vh;
`;

const ProductImage:FC<Props> = ({ src, alt }) => {

	return (
		<ImageContainer>
			<Image unoptimized src={src} alt={alt} layout="fill" objectFit="contain" objectPosition="center" />
		</ImageContainer>
	);
}

export default ProductImage;