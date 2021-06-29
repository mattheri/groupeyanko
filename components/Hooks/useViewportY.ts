import { useState, useEffect, useCallback } from "react";

const useViewportY = () => {
  const [y, setY] = useState(0);

  const registerWindowScroll = useCallback(
    (event:string, callback:(this:Window) => void) => window.addEventListener(event, callback), 
  []);

  useEffect(() => {
    function updateValue(this:Window) {
      setY(this.scrollY);
    }

    registerWindowScroll('scroll', updateValue);

    return () => registerWindowScroll('scroll', updateValue);
  }, []);

  return y;
};

export default useViewportY;