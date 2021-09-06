import Popup from "reactjs-popup";
import React, { FC } from "react";
import Badge from "components/Badge/organism/Badge";
import CartContainer from "../atom/CartContainer";
import CartSvg from "../atom/CartSvg";

interface Props {
	numberOfItems:number;
}

const CartPopupTrigger:FC<Props> = ({ numberOfItems, children }) => {

	return (
		<Popup
			trigger={
				<CartContainer>
					<CartSvg />
					<Badge>{numberOfItems}</Badge>
				</CartContainer>
			}
			position="bottom right"
			on={["hover", "focus"]}
			mouseLeaveDelay={500}
		>
			{children}
		</Popup>
	);
}

export default CartPopupTrigger;
