import styled from "styled-components";
import theme from "theme/theme";

const NavbarContainer = styled.nav`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	position: relative;
	gap: 1rem;
	transition: height 0.35s;
	
	@media only screen and (${theme.mediaQueries.lg}) {
		display: grid;
		grid-template-columns: auto 1fr auto auto;
		align-items: center;
	}
`;

export default NavbarContainer;
