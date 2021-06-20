import { Category } from "next-env";
import { FC } from "react";
import usePrimaryCategories from "../hook/usePrimaryCategories";
import styled from 'styled-components';
import BigCard from "../molecule/BigCard";

interface Props {
	categories:Category[];
}

const Container = styled.section`
	display: flex;
	flex-wrap: wrap;

	> * {
		flex: 1 0 33%;
	}
`;

const BigCardsController:FC<Props> = ({ categories }) => {
	const primaryCategories = usePrimaryCategories(categories);

	return (
		<Container>
			{primaryCategories.map((category) => (
				<BigCard category={category} key={category.id} />
			))}
		</Container>
	);
}

export default BigCardsController;