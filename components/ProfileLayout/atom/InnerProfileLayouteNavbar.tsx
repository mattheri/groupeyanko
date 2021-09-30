import styled from "styled-components";
import theme from "theme/theme";

const InnerProfileLayouteNavbar = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	margin-bottom: 5rem;
	justify-content: space-evenly;

	@media only screen and (${theme.mediaQueries.md}) {
		flex-direction: row;
	}
`;

export default InnerProfileLayouteNavbar;