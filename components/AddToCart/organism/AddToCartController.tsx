import { Product } from "types";
import AddToCart from "../molecule/AddToCart";
import useCartFunctions from "../hook/useCartFunctions";
import { FC } from "react";

type Props = {
  product: Product;
  className?: string;
  useInput?: boolean;
  replaceAmount?: boolean;
  layout?: boolean;
};

/**
 * Set of buttons to add an item to the cart. Has a add button, remove button and a add to cart button.
 * Pass only the product to be added should the user press on 'Add to cart'. State is managed internally.
 *
 * @param product Product type from next.env.d.ts. Required. Used to add to the cart Context
 * @param className String add an optional string to style the component
 * @param useInput Boolean add an input to manage the number of items. The input only accepts numbers and if set to 0, removes the item.
 */
const AddToCartController:FC<Props> = ({
  product,
  useInput,
  replaceAmount,
}) => {

  const {
    handleAdd,
    handleChange,
    handleRemove,
    manageUseInput,
    addProductToCart,
    number,
  } = useCartFunctions(product, replaceAmount);

  return (
    <AddToCart
      cartNumber={number}
      onAdd={handleAdd}
      onCartChange={addProductToCart}
      onChange={handleChange}
      onManageInput={manageUseInput}
      onRemove={handleRemove}
      product={product}
      useInput={useInput}
    />
  );
}

export default AddToCartController;
