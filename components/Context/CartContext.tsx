import React, { useState, useEffect, createContext } from "react";
import { Product } from "next-env";
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


/**
 * Context that contains the state of the user. It will automatically try to detect
 * the 'cart' in local storage. If a cart is found, sets it as the user's cart automatically.
 * Otherwise, inits the cart with an empty object.
 * 
 * Provides 2 functions to manage the items in the cart.
 * 
 * See documentation on React Context here: https://reactjs.org/docs/context.html
 */
export function CartContextProvider<T>(props: React.PropsWithChildren<T>) {

    const { cart, setCartInLocalStorage } = useSetCartStorage();

    function getCart() {
        return cart;
    }

    const cartDefault = getCart();

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