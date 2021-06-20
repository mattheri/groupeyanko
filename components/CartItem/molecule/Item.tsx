import Link from "components/Link/Link";
import React, { FC } from "react";
import styled from "styled-components";

interface Props {
	id:string;
	imageSrc:string;
	alt:string;
	quantity:number;
	productName:string;
}

const ItemContainer = styled.a`
	display: flex;
	flex-flow: row wrap;
	cursor: pointer;
`;

const ItemImage = styled.img`
	max-width: 30%;
	height: auto;
`;

const ItemDescription = styled.p`
	width: 100%;
`;

const DEFAULT_LINK_HREF = '/product';

const Item:FC<Props> = ({ id, imageSrc, alt, quantity, productName }) => {

	return(
		<Link href={`${DEFAULT_LINK_HREF}/${id}`}>
			<ItemContainer>
				<ItemImage src={imageSrc} alt={alt} width={50} height={50} />
				<ItemDescription>{`${quantity}x ${productName}`}</ItemDescription>
			</ItemContainer>
		</Link>
	);
}

export default Item;
