import { Category } from "types";
import { FC } from "react";
import styled from 'styled-components';
import BigCardImage from "../atom/BigCardImage";
import BigCardOverlay from "../atom/BigCardOverlay";
import theme from "theme/theme";

interface Props {
	category:Category;
	isFeatured:boolean;
}

const Container = styled.div<{isFeatured:boolean}>`
	width: 33%;
	min-height: 33rem;
	overflow: hidden;
	position: relative;
	cursor: pointer;
	order: ${({ isFeatured }) => isFeatured ? 0 : 1};
	flex: 1 0 100%;

	@media only screen and (${theme.mediaQueries.sm}) {
		flex: 1 0 ${({ isFeatured }) => isFeatured ? '66%' : 'calc(33% - 1rem)'};
	}

	&:hover {
		article {
			transform: scale3d(1.1, 1.1, 1.1);
		}
	}
`;

const BigCard:FC<Props> = ({ category, isFeatured }) => {

	return (
		<Container isFeatured={isFeatured}>
			<BigCardOverlay id={category.id}>
				{category.description ? category.description : category.name}
			</BigCardOverlay>
			<BigCardImage src={category.image.src} alt={category.name} />
		</Container>
	);
}

export default BigCard;
