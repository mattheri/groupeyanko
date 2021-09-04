import { Product } from "types";
import AddToCart from "../molecule/AddToCart";
import useCartFunctions from "../hook/useCartFunctions";
import { FC } from "react";
import useCart from "components/Hooks/useCart";

interface Props {
  product:Product;
  useInput?:boolean;
  replaceAmount?:boolean;
  label?:string;
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

  const { productInCart } = useCart();

  const label = productInCart(product.id.toString()) ? "Mettre à jour" : "Ajouter au panier";

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
      label={label}
    />
  );
}

export default AddToCartController;
