import { Category } from "types";
import { FC } from "react";
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

	return (
		<Container>
			{categories.map((category) => (
				<BigCard category={category} key={category.id} />
			))}
		</Container>
	);
}

export default BigCardsController;
