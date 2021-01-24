import React from 'react';
import { useCookies } from "react-cookie";
import { AppContextState } from '../Context/AppContext';

/**
 * Hook that will set the cookie 'user'. If the cookie existed before, it will be replaced with a new one.
 */
export function useSetUserCookie() {
    const [cookies, setCookie] = useCookies(['user']);
    
    const handleSetCookie = (data: AppContextState) => {
        setCookie('user', data, { path: '/' });
    }

    return { user: cookies.user, handleSetCookie: handleSetCookie }
}