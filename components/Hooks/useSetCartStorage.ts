import { Cart } from "../Context/CartContext";
import useLocalStorage from "./useLocalStorage";

export function useSetCartStorage() {
  const { setItem, getItem } = useLocalStorage();
  const handleSetStorage = (data: { [key: string]: Cart }) => {
    setItem("cart", data);
  };

  return { cart: getItem("cart"), setCartInLocalStorage: handleSetStorage };
}
