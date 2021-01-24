import React from 'react';
import { useCookies } from "react-cookie";

/**
 * Hook that will retrieve the cookie 'cart' and return the parsed content.
 * If the cookie is not present, it will return false.
 */
export function useGetCartCookie() {
    const [cookies] = useCookies(["cart"]);

    if (cookies.cart) {
        return cookies.cart;
    }

    return false;
}