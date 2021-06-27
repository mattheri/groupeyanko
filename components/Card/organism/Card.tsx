import React from "react";
import Link from 'components/Link/Link';
import { Product } from "types";
import AddToCartController from "components/AddToCart/organism/AddToCartController";
import CardContainer from "../atom/CardContainer";
import InnerCard from "../atom/InnerCard";
import CardImage from "../atom/CardImage";
import CardDescription from "../molecule/CardDescription";

export interface CardProps {
  src: string;
  description: string;
  url: string;
  addToCart?: boolean;
  product?: Product;
  index?: number;
}

/**
 * A card component that uses next Link component for page prefetching. See https://nextjs.org/docs/api-reference/next/link
 *
 * @param url string. required
 * @param src string. The image source. It is used in a background image.
 * @param description string. Description of the product/category
 * @param addToCart boolean. Enables a "add to cart UI on the card itself"
 */
export function Card({
  url,
  src,
  description,
  addToCart,
  product,
}: CardProps) {
  return (
    <CardContainer>
      <Link href={url}>
        <InnerCard>
          <CardImage backgroundImageSource={src} />
          <CardDescription>{description}</CardDescription>
        </InnerCard>
      </Link>
      {addToCart && (
        <>
          <AddToCartController product={product} />
        </>
      )}
    </CardContainer>
  );
}
