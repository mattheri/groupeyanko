import { Category } from "types";
import { FC } from "react";
import styled from 'styled-components';
import BigCard from "../molecule/BigCard";
import theme from "theme/theme";

interface Props {
	categories:Category[];
}

const Container = styled.section`
	display: flex;
	flex-wrap: wrap;
	grid-template-columns: repeat(5, 1fr);
	grid-auto-flow: row;
	padding: 2rem 1rem;
	gap: 2rem;

	@media only screen and (${theme.mediaQueries.lg}) {
		padding-left: 10rem;
		padding-right: 10rem;
	}
`;

const BigCardsController:FC<Props> = ({ categories }) => {

	return (
		<Container>
			{categories.map((category) => (
				<BigCard isFeatured={category.name === 'Vedette'} category={category} key={category.id} />
			))}
		</Container>
	);
}

export default BigCardsController;
