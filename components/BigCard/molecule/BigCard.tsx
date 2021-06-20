import { Category } from "next-env";
import { FC } from "react";
import styled from 'styled-components';
import BigCardImage from "../atom/BigCardImage";
import BigCardOverlay from "../atom/BigCardOverlay";

interface Props {
	category:Category;
}

const Container = styled.div`
	width: 100%;
	min-height: 33rem;
	overflow: hidden;
	position: relative;
	cursor: pointer;

	&:hover {
		article {
			transform: scale3d(1.1, 1.1, 1.1);
		}
	}
`;

const BigCard:FC<Props> = ({ category }) => {

	return (
		<Container>
			<BigCardOverlay id={category.id}>
				{category.description ? category.description : category.name}
			</BigCardOverlay>
			<BigCardImage backgroundImage={category.image.src} />
		</Container>
	);
}

export default BigCard;