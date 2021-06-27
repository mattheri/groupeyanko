import styled from "styled-components";
import { FC } from "react";
import Image from 'next/image';

// const BigCardImage = styled.article<{backgroundImage:string}>`
// 	background-image: url(${({ backgroundImage }) => backgroundImage});
// 	background-position: center;
// 	background-size: cover;
// 	width: 100%;
// 	height: 100%;
// 	transition: all 1s;
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	background-repeat: no-repeat;
// 	z-index: -1;
// `;
interface Props {
	src:string;
	alt:string;
}

const Container = styled.article`
	width: 100%;
	height: 100%;
	transition: transform 1s;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
`;

const BigCardImage:FC<Props> = ({ src, alt }) => {
	
	return(
		<Container>
			<Image src={src} alt={alt} layout='fill' objectFit='cover' />
		</Container>
	);
}


export default BigCardImage;
