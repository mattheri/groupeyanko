import React, { useState, useEffect, createContext } from "react";

export interface AnimationContextState {
  isPresent:boolean;
}

const presence:AnimationContextState = {
  isPresent: false,
};
const setPresence:React.Dispatch<React.SetStateAction<AnimationContextState>> = () => {}

export const AnimationContext = createContext({ presence, setPresence });

export function AnimationContextProvider<T>(props: React.PropsWithChildren<T>) {

    const [presence, setPresence] = useState<AnimationContextState>({ isPresent: false });

    return (
        <AnimationContext.Provider value={{ presence, setPresence }}>
            {props.children}
        </AnimationContext.Provider>
    );
}