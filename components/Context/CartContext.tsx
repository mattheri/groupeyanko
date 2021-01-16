import React from "react";
import { Product } from "../../next-env";
import { useGetAuthCookie } from "../Hooks/useGetAuthCookie";
import { useGetCartCookie } from "../Hooks/useGetCartCookie";
import { AppContext, AppContextTuple } from './AppContext';

export const CartContext = React.createContext(null);

interface NumberOfItems {
    number: number
}

interface Cart extends Product, NumberOfItems { };

export interface CartContextState {
    id: string,
    /**
     * Key is the product id,
     * number is the number of times it is requested
     */
    cart: {
        [key: string]: Cart
    }
}

export type CartContextTuple = [CartContextState, React.Dispatch<React.SetStateAction<CartContextState>>];

/**
 * Context that contains the state of the user. It will automatically try to detect
 * the 'user' cookie. If this cookie is present, it will be updated with the information
 * from this cookie. Otherwise, it will render the application with a user in the state.
 * 
 * See documentation on React Context here: https://reactjs.org/docs/context.html
 */
export function CartContextProvider<T>(props: React.PropsWithChildren<T>) {

    const cart = useGetCartCookie();
    const [appState, setAppState]: AppContextTuple = React.useContext(AppContext);

    function getCart() {
        const { connected, user: { id } } = appState;
        if (connected && id === cart.id) {
            return (cart as CartContextState);
        }

        return {
            id: appState.user.id,
            cart: {}
        }
    }

    const cartDefault = getCart();

    const [cartState, setCartState] = React.useState<CartContextState>(cartDefault);

    return (
        <CartContext.Provider value={[cartState, setCartState]}>
            {props.children}
        </CartContext.Provider>
    );
}