import styled from "styled-components";
import theme from "theme/theme";

const InnerProfileLayoutNavbarLink = styled.li`
	width: 100%;
	margin: 1rem 0;
	display: flex;
	justify-content: center;

	&:first-of-type {
		margin-top: 0;
	}

	&:last-of-type {
		margin-bottom: 0;
	}

	@media only screen and (${theme.mediaQueries.md}) {
		margin: 0 1rem;

		&:first-of-type {
			margin-left: 0;
		}

		&:last-of-type {
			margin-right: 0;
		}
	}
`;

export default InnerProfileLayoutNavbarLink;