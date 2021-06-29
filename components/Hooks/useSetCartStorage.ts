import { Cart } from "../Context/CartContext";
import useLocalStorage from "./useLocalStorage";
import { useEffect } from "react";

type LocalStorageCart = { [key:string]:Cart } | null;

export function useSetCartStorage() {
  const { setItem, getItem } = useLocalStorage();
  const localStorageCart:LocalStorageCart = getItem('cart');

  useEffect(() => {
    if (!localStorageCart) setItem('cart', {});
  }, [localStorageCart])

  return { cart: localStorageCart || {}, setCartInLocalStorage: (data: { [key: string]: Cart }) => setItem('cart', data) };
}
