import useCart from "components/Hooks/useCart";
import { useState, ChangeEvent } from "react";
import { Product } from "next-env";

function useCartFunctions(product: Product, replaceAmount: boolean) {
  const [number, setNumber] = useState(1);
  const { changeProductQuantity, addProductToCart } = useCart();

  const handleAdd = () => {
    setNumber((number) => (number += 1));
  };
  const handleRemove = () => {
    setNumber((number) => (number -= 1));
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || e.target.value === "NaN") {
      setNumber(0);
    }
    if (regex.test(e.target.value)) {
      setNumber(parseInt(e.target.value));
    }
  };
  const manageUseInput = () => {
    if (replaceAmount) return changeProductQuantity(product.id.toString(), number, true);
    return changeProductQuantity(product.id.toString(), product.number - number);
  };

  return {
    handleAdd,
    handleRemove,
    handleChange,
    manageUseInput,
    addProductToCart,
    number,
  };
}

export default useCartFunctions;
