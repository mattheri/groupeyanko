import styled from "styled-components";
import { FC } from "react";
import Image from 'next/image';

interface Props {
	src:string;
	alt:string;
}

const Container = styled.div`
	flex: 1 0 50%;
	width: 50%;
`;

const QuoteProductImage:FC<Props> = ({ src, alt }) => {

	return(
		<Container>
			<Image src={src} alt={alt} layout='responsive' width={10} height={10} />
		</Container>
	);
};

export default QuoteProductImage;
