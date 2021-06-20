import { Button } from "components/Button/Button";
import { CartItem } from "components/CartItem/organism/CartItem";
import { Cart } from "components/Context/CartContext";
import React, { FC } from "react";
import styled from 'styled-components';

interface Props {
  items: { [x:string]:Cart }[];
}

const SubmitContainer = styled.div`
	width: 100%;
	display: flex;

	> * {
		flex: 1 0 100%;
	}
`;

const DEFAULT_PLACEHOLDER_IMAGE = "/uploads/images/placeholder.png";

const CartContent:FC<Props> = ({ items, children }) => {

	return (
		<>
			{items && items.map((product) => (
				Object.entries(product).map(([id, product]) => (
					<CartItem
						key={id}
						product={product}
						id={product.id.toString()}
						name={product.name}
						number={product.number}
						image={
							product.image ? product.image : DEFAULT_PLACEHOLDER_IMAGE
						}
					/>
				)
			)))}
			{children}
			<SubmitContainer>
				<Button href="/quote">
					Voir votre soumission
				</Button>
			</SubmitContainer>
		</>
	);
}

export default CartContent;
