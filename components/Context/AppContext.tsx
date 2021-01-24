import React from "react";
import { Category } from "../../next-env";
import { useSetUserCookie } from "../Hooks/useSetUserCookie";

export const AppContext = React.createContext(null);

export type User = {
    id: string,
    email: string,
    name?: string,
    picture?: string,
    isVerified: boolean
}

export type AppContextState = {
    connected: boolean,
    user: User,
    locale: 'fr' | 'en'
}

export type AppContextTuple = [AppContextState, React.Dispatch<React.SetStateAction<AppContextState>>];

/**
 * Context that contains the state of the user. It will automatically try to detect
 * the 'user' cookie. If this cookie is present, it will be updated with the information
 * from this cookie. Otherwise, it will render the application with a user in the state.
 * 
 * See documentation on React Context here: https://reactjs.org/docs/context.html
 */
export function AppContextProvider<T>(props: React.PropsWithChildren<T>) {

    const { user, handleSetCookie } = useSetUserCookie();

    const [appState, setAppState] = React.useState<AppContextState>({
        connected: user ? user.connected : false,
        user: user ? user.user : {},
        locale: 'fr'
    });

    React.useEffect(() => handleSetCookie(appState), [appState]);

    return (
        <AppContext.Provider value={[appState, setAppState]}>
            {props.children}
        </AppContext.Provider>
    );
}