import { Squash } from "hamburger-react";
import React, { FC } from "react";
import styled from "styled-components";
import theme from "theme/theme";

interface Props {
	isOpen:boolean;
	onToggle:() => void;
}

const ToggleContainer = styled.div`
	display: block;
	position: absolute;
	top: 0;
	right: 0;

	@media only screen and (${theme.mediaQueries.lg}) {
		display: none;
	}
`;

const Toggle:FC<Props> = ({ isOpen, onToggle }) => {
	
	return (
		<ToggleContainer aria-controls='navbar'>
			<Squash toggled={isOpen} onToggle={onToggle} />
		</ToggleContainer>
	);
}

export default Toggle;
