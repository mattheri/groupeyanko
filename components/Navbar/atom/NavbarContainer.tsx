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
		padding-right: 10rem;
		padding-left: 10rem;
		grid-template-rows: repeat(2, auto);
		grid-template-columns: 25% 1fr auto auto;
		align-items: center;
		gap: 1rem;
	}
`;

export default NavbarContainer;
