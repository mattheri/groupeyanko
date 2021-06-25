import React, { FC } from "react";
import styled from "styled-components";
import theme from "theme/theme";

interface Props {
	isOpen:boolean;
}

const StyledNavbar = styled.nav`
	padding: 1rem;
	display: grid;
	grid-template-rows: auto auto 5rem auto;
	grid-template-columns: 75% 10% 15%;
	align-items: center;
	
	@media only screen and (${theme.mediaQueries.lg}) {
		padding-right: 10rem;
		padding-left: 10rem;
		grid-template-rows: repeat(2, auto);
		grid-template-columns: 25% 1fr auto auto;
		align-items: center;
		gap: 1rem;
	}
`;

const NavbarContainer:FC<Props> = ({ isOpen, children }) => {
	
	return(
		<StyledNavbar>
			{children}
		</StyledNavbar>
	);
}

export default NavbarContainer;
