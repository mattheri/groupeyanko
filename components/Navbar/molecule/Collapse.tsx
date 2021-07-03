import { FC, useRef, useState, useEffect } from "react";
import styled from 'styled-components';
import theme from "theme/theme";
import NavbarInteractiveSection from "./NavbarInteractiveSection";

interface Props {
	isAuthenticated:boolean;
	onLogout:() => Promise<void>;
	isOpen:boolean;
}

const NavbarCollapse = styled.div<{isOpen:boolean,height:number}>`
	width: 100%;
	justify-content: flex-end;
	height: ${({ isOpen, height }) => isOpen ? `${height}px` : `1px`};
	overflow: hidden;
	transition: height 0.35s;
	transform-origin: top;
	gap: 1rem;

	@media only screen and (${theme.mediaQueries.lg}) {
		grid-row: 1;
		grid-column: 4;
		height: 100%;
		transition: none;
		width: 100%;
		display: flex;
	}
`;

const Collapse:FC<Props> = ({ isAuthenticated, onLogout, isOpen }) => {
	const [height, setHeight] = useState(0);
	const interactiveSectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!interactiveSectionRef.current) return;

		setHeight(interactiveSectionRef.current.getBoundingClientRect().height);
	}, [interactiveSectionRef, isAuthenticated]);

	return (
		<NavbarCollapse isOpen={isOpen} height={height} id='navbar'>
			<NavbarInteractiveSection ref={interactiveSectionRef} isAuthenticated={isAuthenticated} onLogout={onLogout} />
		</NavbarCollapse>
	);
};

export default Collapse;
