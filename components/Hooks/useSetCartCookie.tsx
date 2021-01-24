import React from 'react';
import { useCookies } from "react-cookie";
import { Cart } from '../Context/CartContext';

/**
 * Hook that will set the cookie 'cart'. If the cookie existed before, it will be replaced with a new one.
 */
export function useSetCartCookie() {
    const [cookies, setCookie, removeCookie] = useCookies(['cart']);
    
    const handleSetCookie = (data: { [key: string]: Cart }) => {
        setCookie('cart', data, { path: '/' });
    }

    return { cart: cookies.cart, handleSetCookie: handleSetCookie }
}