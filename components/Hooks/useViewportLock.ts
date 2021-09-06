import { useEffect } from "react";

const useViewportLock = (dep:boolean) => {
	useEffect(() => {
		document.querySelector('html').style.overflow = dep ? 'hidden' : 'auto';
	}, [dep]);
};

export default useViewportLock
