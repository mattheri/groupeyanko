import { Cart } from "../Context/CartContext";
import useLocalStorage from "./useLocalStorage";

/**
 * Hook that will add stringified items to the local storage.
 * Provides the object from the local storage.
 */
export function useSetCartStorage() {
  const { setItem, getItem } = useLocalStorage();
  const handleSetStorage = (data: { [key: string]: Cart }) => {
    setItem("cart", data);
  };

  return { cart: getItem("cart"), setCartInLocalStorage: handleSetStorage };
}
