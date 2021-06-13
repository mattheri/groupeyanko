import { Product } from "next-env";
import { AddToCartUI } from "../molecule/AddToCartUI";
import useCartFunctions from "../hook/useCartFunctions";

type AddToCartProps = {
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
export function AddToCart({
  product,
  className,
  useInput,
  replaceAmount,
  layout,
}: AddToCartProps) {
  const {
    handleAdd,
    handleChange,
    handleRemove,
    manageUseInput,
    addProductToCart,
    number,
  } = useCartFunctions(product, replaceAmount);

  return (
    <AddToCartUI
      cartNumber={number}
      className={className}
      onAdd={handleAdd}
      onCartChange={addProductToCart}
      onChange={handleChange}
      onManageInput={manageUseInput}
      onRemove={handleRemove}
      product={product}
      replaceAmount={replaceAmount}
      useInput={useInput}
      useLayout={layout}
    />
  );
}
