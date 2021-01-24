import React from "react";
import { Product } from "../../next-env";
import { useSetCartStorage } from "../Hooks/useSetCartStorage";
import { AppContext, AppContextTuple } from './AppContext';

export const CartContext = React.createContext(null);

interface NumberOfItems {
    number: number
}

export interface Cart extends Product, NumberOfItems { };

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

export type CartContextTuple = [CartContextState, (product: any, number: number) => void, (id: string, number?: number) => void];

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

    const { cart, handleSetStorage } = useSetCartStorage();
    const [appState, setAppState]: AppContextTuple = React.useContext(AppContext);

    function getCart() {
        const { connected, user: { id } } = appState;
        // if (connected && id === cart.id) {
        //     return (cart as CartContextState);
        // }

        return {
            id: appState.user.id,
            cart: (cart as Cart) || {}
        }
    }

    const cartDefault = getCart();

    const [cartState, setCartState] = React.useState<CartContextState>(cartDefault);

    const handleAddProductToCart = (product: any, number: number) => {
        if (cartState.cart.hasOwnProperty(`${product.id}`)) {
            product.number = cartState.cart[`${product.id}`].number + number;
        } else {
            product.number = number;
        }
        setCartState(cart => Object.assign(
            {},
            cart,
            {
                cart: {
                    ...cart.cart,
                    [`${product.id}`]: product
                }
            }
        ))
    }

    const handleRemoveProductFromCart = (id: string, number?: number) => {
        if (!cartState.cart.hasOwnProperty(`${id}`)) return;

        if (!number) {
            setCartState(cart => {
                delete cart.cart[`${id}`];
                return Object.assign(
                    {},
                    cart,
                    {
                        cart: {
                            ...cart.cart
                        }
                    }
                )
            });
        }

        if (number) {
            setCartState(cart => Object.assign(
                {},
                cart,
                {
                    cart: {
                        [`${id}`]: {
                            ...cart.cart[`${id}`],
                            number: cart.cart[`${id}`].number - 1
                        }
                    }
                }
            ));
        }
    }

    React.useEffect(() => {
        handleSetStorage(cartState.cart);
    }, [cartState.cart]);

    return (
        <CartContext.Provider value={[cartState, handleAddProductToCart, handleRemoveProductFromCart]}>
            {props.children}
        </CartContext.Provider>
    );
}