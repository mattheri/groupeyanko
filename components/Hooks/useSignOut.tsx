import React from "react";
import { useCookies } from "react-cookie";
import Firebase from "../../utils/Firebase";
import { AppContext, AppContextTuple } from "../Context/AppContext";

export function useSignOut() {
  const [appState, setAppState]: AppContextTuple = React.useContext(AppContext);
  const [, , removeCookie] = useCookies();

  const logout = async () => {
    try {
      await Firebase.auth().signout();
      setAppState((state) =>
        Object.assign({}, state, {
          connected: false,
          user: {},
        })
      );
      return removeCookie("user");
    } catch (e) {
      console.log({
        code: e.code,
        message: e.message,
      });
    }
  };

  return logout;
}
