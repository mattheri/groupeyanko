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
	min-width: 30rem;
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
			<BigCardImage src={category.image.src} alt={category.name} />
		</Container>
	);
}

export default BigCard;
