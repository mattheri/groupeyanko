import { useEffect } from "react";

const useReRender = (dep?:any) => {
	useEffect(
		() => {}
		, [dep]
	);
}

export default useReRender;