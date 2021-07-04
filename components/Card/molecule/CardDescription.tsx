import { FC } from "react";
import styled, { css } from "styled-components";
import CardImage from "../atom/CardImage";

interface Props {
	isMouseOver:boolean;
	src:string;
	alt:string;
}

const Transform = css`
	transform: scale3d(0.8, 0.8, 0.8) translate3d(0, -10%, 0);
`;

const Description = styled.p`
	text-align: center;
	font-weight: 600;
	margin-top: 1rem;
	text-transform: uppercase;
	z-index: 1;
`;

const Container = styled.div<{isMouseOver:boolean}>`
	width: 100%;
	height: 100%;
	transition: box-shadow 0.2s, transform 0.2s linear;
	${({ isMouseOver }) => isMouseOver && Transform }
`;

const CardDescription:FC<Props> = ({ isMouseOver, src, alt, children }) => {
	
	return (
		<Container isMouseOver={isMouseOver}>
			<CardImage src={src} alt={alt} />
			<Description>{children}</Description>
		</Container>
	);
}

export default CardDescription;
