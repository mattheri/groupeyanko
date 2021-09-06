import { FC } from "react";
import styled from "styled-components";
import Image from 'next/image';

interface Props {
	src:string;
	alt:string;
}

const Container = styled.div`
	width: 100%;
`;

const CategoryImage:FC<Props> = ({ src, alt }) => {
	
	return(
		<Container>
			<Image src={src} alt={alt} layout='fill' objectFit='cover' />
		</Container>
	);
}

export default CategoryImage;
