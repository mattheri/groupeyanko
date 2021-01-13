import React from 'react';
import { useCookies } from "react-cookie";

/**
 * Hook that will retrieve the cookie 'user' and return the parsed content.
 * If the cookie is not present, it will return false.
 */
export function useGetAuthCookie() {
    const [cookie] = useCookies(["user"]);

    if (cookie.user) {
        return cookie.user;
    }

    return false;
}