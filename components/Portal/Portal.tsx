import { FC, useEffect } from "react";
import { createPortal } from "react-dom";

const Portal:FC = ({ children }) => {
	const root = window && document.createElement("div");

	useEffect(
		() =>{
			if(!root) return;
			document.body.appendChild(root);
			return () => {
				document.body.removeChild(root);
			}
		},
		[root]
	)

	return createPortal(children, window && root);
};

export default Portal;