import React from "react";
import { Product } from "types";
import useCart from "components/Hooks/useCart";
import ArticleContainer from "../atom/ArticleContainer";
import Item from "../molecule/Item";
import Controls from "../molecule/Controls";

type CartItemProps = {
  id: string;
  image: string;
  name: string;
  number: number;
  product: Product;
};

/**
 * CartItem component. Shows a minified version of a product. The product can be removed from the cart
 * with this component. It directly removes it from the Cart Context.
 *
 * @param id number the product id
 * @param image Image type defined in @types/types.d.ts. Receives the Image object
 * @param name string. The name of the product
 * @param number number. The number of times this product is shown
 */
export function CartItem({ id, image, name, number, product }: CartItemProps) {
  const { changeProductQuantity } = useCart();

  const onDelete = () => changeProductQuantity(id, 0);

  return (
    <ArticleContainer>
      <Item
        id={id}
        imageSrc={image}
        alt={name}
        productName={name}
        quantity={number}     
      />
      <Controls 
        product={product}
        onClick={onDelete}
      />
    </ArticleContainer>
  );
}
