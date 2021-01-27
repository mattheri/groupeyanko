import { useRouter } from "next/router";
import React from "react";
import { useWindow } from "../Hooks/useWindow";

export const NavigationContext = React.createContext(null);

type NavigationContextState = { [key: string]: string };

export type NavigationContextTuple = [NavigationContextState, React.Dispatch<React.SetStateAction<NavigationContextState>>];

/* 
 * See documentation on React Context here: https://reactjs.org/docs/context.html
 */
export function NavigationContextProvider<T>(props: React.PropsWithChildren<T>) {

    const [appState, setAppState] = React.useState({
        [`Accueil`]: '/'
    });

    const window = useWindow();
    const router = useRouter();

    React.useEffect(() => {
        console.log(router);
        setAppState(state => {
            if (router.asPath === '/') {
                return {
                    [`Accueil`]: '/'
                }
            }

            if (router.asPath.includes("category")) {
                return {
                    [`Accueil`]: '/',
                    [`Catégorie`]: router.asPath || '/'
                }
            }

            if (router.asPath.includes("product")) {
                return Object.assign(
                    {},
                    state,
                    {
                        ["Produit"]: router.asPath || '/'
                    }
                )
            }
        })

        console.log(router);
    }, [router])

    return (
        <NavigationContext.Provider value={[appState, setAppState]}>
            {props.children}
        </NavigationContext.Provider>
    );
}