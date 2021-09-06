import useClickOutside from "components/Hooks/useClickOutside";
import useViewportLock from "components/Hooks/useViewportLock";
import Portal from "components/Portal/Portal";
import { FC, useRef } from "react";
import styled from "styled-components";
import Close from "./Close";

interface Props {
	isOpen:boolean;
	onClose:()=>void;
	withBackdrop?:boolean;
}

const Container = styled.div`
	background-color: white;
	z-index: 1000;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 5px;
	width: 100%;
	max-width: 992px;
	padding: 1rem;
`;

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
`;

const Modal:FC<Props> = ({ isOpen, onClose, withBackdrop, children }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useViewportLock(isOpen);
	useClickOutside(modalRef, onClose);

	return isOpen ? (
		<Portal>
			<Container ref={modalRef}>
				<Close onClick={onClose} />
				{children}
			</Container>
			{withBackdrop && <Backdrop />}
		</Portal>
	) : null;
};

export default Modal;