import React, { useState, createContext } from "react";
import { Product } from "types";
import { useSetCartStorage } from "components/Hooks/useSetCartStorage";
export interface CartContextState {
    [key: string]: Cart
}

const cart:CartContextState = {};
const setCart:React.Dispatch<React.SetStateAction<CartContextState>> = () => {}

export const CartContext = createContext({ cart, setCart });

interface NumberOfItems {
    number: number
}

export interface Cart extends Product, NumberOfItems { };

export function CartContextProvider<T>(props: React.PropsWithChildren<T>) {

    const { cart, setCartInLocalStorage } = useSetCartStorage();

    const initializeCart = () => {
        if (cart === null) {
            setCartInLocalStorage({});
        }

        return cart;
    }

    const cartDefault = initializeCart();

    const [cartState, setCartState] = useState<CartContextState>(cartDefault);

    const updateCartInLocalStorage = (cart:CartContextState) => {
        setCartInLocalStorage(cart);
        return cart;
    }

    const setCart = (fn:(cart:CartContextState) => CartContextState) => {
        setCartState((cart) => updateCartInLocalStorage(fn(cart)));
    }

    return (
        <CartContext.Provider value={{ cart: cartState, setCart: setCart }}>
            {props.children}
        </CartContext.Provider>
    );
}