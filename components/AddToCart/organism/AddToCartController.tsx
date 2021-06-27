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
