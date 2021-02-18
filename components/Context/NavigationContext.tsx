import { useRouter } from "next/router";
import React from "react";
import { useWindow } from "../Hooks/useWindow";

export const NavigationContext = React.createContext(null);

type NavigationContextState = [string, string][];

export type NavigationContextTuple = [
  NavigationContextState,
  (crumb: [string, string] | NavigationContextState) => void
];

/*
 * See documentation on React Context here: https://reactjs.org/docs/context.html
 */
export function NavigationContextProvider<T>(
  props: React.PropsWithChildren<T>
) {
  const [appState, setAppState] = React.useState<NavigationContextState>([
    ["Accueil", "/"],
  ]);

  const window = useWindow();
  const router = useRouter();

  const compareArray = (array1: any[], array2: any[]) => {
    if (array1.filter((values, i) => array2[i] === values).length) {
      return true;
    }

    return false;
  };

  const handleAddCrumb = (crumb: [string, string]) => {
    setAppState((state) => [...state, crumb]);
  };

  const handlesCrumbs = (crumb: [string, string] | NavigationContextState) => {
    const isNavigationState = (
      crumb: [string, string] | NavigationContextState
    ): crumb is NavigationContextState => {
      if (Array.isArray(crumb[0])) {
        return true;
      }

      return false;
    };

    if (isNavigationState(crumb)) {
      if (!router.asPath.includes("/product/")) {
        setAppState((state) => (state = [["Accueil", "/"], ...crumb]));
      }
    } else {
      if (router.asPath === "/") {
        return setAppState((state) => (state = [["Accueil", "/"]]));
      }
      if (router.asPath === "/quote") {
        return setAppState(
          (state) =>
            (state = [
              ["Accueil", "/"],
              ["Envoyer votre soumission", "/quote"],
            ])
        );
      }
      if (router.asPath === "/signup") {
        return setAppState(
          (state) =>
            (state = [
              ["Accueil", "/"],
              ["Créer un compte", "/signup"],
            ])
        );
      }
      if (router.asPath === "/forgotpassword") {
        return setAppState(
          (state) =>
            (state = [
              ["Accueil", "/"],
              ["Réinitialisation de mot de passe", "/forgotpassword"],
            ])
        );
      }
      if (crumb[1].includes("category")) {
        return setAppState((state) => (state = [["Accueil", "/"], [...crumb]]));
      }
      return handleAddCrumb(crumb);
    }
  };

  React.useEffect(() => console.log(appState, router.asPath), [appState]);

  return (
    <NavigationContext.Provider value={[appState, handlesCrumbs]}>
      {props.children}
    </NavigationContext.Provider>
  );
}
