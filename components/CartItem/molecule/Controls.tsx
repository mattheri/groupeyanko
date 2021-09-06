import AddToCartController from "components/AddToCart/organism/AddToCartController";
import Button from 'components/Button/Button'
import { Product } from "types";
import { FC } from "react";
import styled from 'styled-components';

interface Props {
	product:Product;
	onClick:() => void;
}

const Container = styled.div`
	display: grid;
	grid-auto-flow: column;
	align-items: flex-end;
	gap: 1rem;
`;

const Controls:FC<Props> = ({ product, onClick }) => {
	
	return(
		<Container>
			<AddToCartController useInput product={product} replaceAmount />
			<Button onClick={onClick} tertiary>Supprimer</Button>
		</Container>
	);
}

export default Controls;
