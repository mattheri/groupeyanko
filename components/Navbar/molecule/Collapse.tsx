import { FC } from "react";
import styled from 'styled-components';
import theme from "theme/theme";
import NavbarInteractiveSection from "./NavbarInteractiveSection";

interface Props {
	isAuthenticated:boolean;
	onLogout:() => Promise<void>;
	isOpen:boolean;
}

const NavbarCollapse = styled.div<{isOpen:boolean}>`
	width: 100%;
	justify-content: flex-end;
	grid-row: 2;
	grid-column: 1 / 4;
	height: ${({ isOpen }) => isOpen ? '100%' : '1px'};
	overflow: hidden;
	transition: height 0.35s;
	transform-origin: top;

	@media only screen and (${theme.mediaQueries.lg}) {
		grid-row: 1;
		grid-column: 4;
		height: 100%;
	}
`;

const Collapse:FC<Props> = ({ isAuthenticated, onLogout, isOpen }) => {

	return (
		<NavbarCollapse isOpen={isOpen} id='navbar'>
			<NavbarInteractiveSection isAuthenticated={isAuthenticated} onLogout={onLogout} />
		</NavbarCollapse>
	);
};

export default Collapse;
