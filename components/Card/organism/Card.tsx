import React, { FC, useState } from "react";
import Link from 'components/Link/Link';
import { Product } from "types";
import AddToCartController from "components/AddToCart/organism/AddToCartController";
import CardContainer from "../atom/CardContainer";
import CardDescription from "../molecule/CardDescription";
import AddToCartContainer from "../atom/AddToCartContainer";

export interface CardProps {
  src: string;
  description: string;
  url: string;
  addToCart?: boolean;
  product?: Product;
  index?: number;
}

const Card:FC<CardProps> = ({
  url,
  src,
  description,
  addToCart,
  product,
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const onMouseEnter = () => setIsMouseOver(true);
  const onMouseLeave = () => setIsMouseOver(false);

  return (
    <CardContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Link href={url}>
        <CardDescription src={src} alt={src} isMouseOver={isMouseOver}>{description}</CardDescription>
      </Link>
      <AddToCartContainer isMouseOver={isMouseOver}>
        <AddToCartController product={product} />
      </AddToCartContainer>
    </CardContainer>
  );
}

export default Card;
