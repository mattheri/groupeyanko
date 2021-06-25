import React from "react";

/**
 * Hook used to act on a click outside the boundaries of an element.
 * 
 * @param ref Pass the ref of the component that should close. Do not pass the ref.current.
 * @param toggle Pass the callback. The callback should accept a boolean and the hook will pass 'false'.
 */
export function useClickOutside(ref: React.MutableRefObject<any>, toggle: (arg: boolean) => void) {
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target)) {
                toggle(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}