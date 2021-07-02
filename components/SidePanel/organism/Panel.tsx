import { FC, useEffect, useRef } from "react";
import Close from "components/SidePanel/atom/Close";
import Container from "components/SidePanel/atom/Container";
import useRouterEvents from "components/Hooks/useRouterEvents";
import useClickOutside from "components/Hooks/useClickOutside";

interface Props {
	onClick:() => void;
	isOpen:boolean;
	onClose:() => void;
}

const SidePanel:FC<Props> = ({ isOpen, onClick, onClose, children }) => {
	const panelRef = useRef<HTMLDivElement>(null);

	useRouterEvents('routeChangeStart', onClose);
	useClickOutside(panelRef, onClose)
	
	useEffect(() => {
		document.querySelector('html').style.overflow = isOpen ? 'hidden' : 'auto';
	}, [isOpen]);
	
	return(
		<Container ref={panelRef} isOpen={isOpen}>
			<Close onClick={onClick} />
			{children}
		</Container>
	);
}

export default SidePanel;
