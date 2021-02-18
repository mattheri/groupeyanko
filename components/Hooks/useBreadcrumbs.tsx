import React from "react";
import {
  NavigationContext,
  NavigationContextTuple,
} from "../Context/NavigationContext";

export function useBreadcrumbs() {
  const [
    navigationState,
    setNavigationState,
  ]: NavigationContextTuple = React.useContext(NavigationContext);

  return {
    setNavigationState,
    navigationState,
  };
}
