import { FC } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface Props {
	src:string;
	alt:string;
}

const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	height: 80%;
`;

const CardImage:FC<Props> = ({ src, alt }) => {
	return (
		<ImageContainer>
			<Image unoptimized src={src} alt={alt} layout='fill' objectFit='contain' />
		</ImageContainer>
	);
};

export default CardImage;
