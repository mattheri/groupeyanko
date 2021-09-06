import { useEffect, MutableRefObject } from "react";

const useClickOutside = (ref:MutableRefObject<any>, toggle:() => void) => {
    useEffect(() => {
        const onClickOutside = (event:MouseEvent) => (ref.current && !ref.current.contains(event.target)) && toggle();
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, [ref]);
}

export default useClickOutside;
