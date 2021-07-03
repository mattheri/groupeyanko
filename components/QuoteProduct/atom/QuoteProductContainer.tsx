import styled from "styled-components";
import theme from "theme/theme";

const QuoteProductContainer = styled.article`
	width: calc(100% / 2);
	display: flex;
	flex-wrap: wrap;
	flex: 0 0 calc(100% / 2);

	@media only screen and (${theme.mediaQueries.md}) {
		width: calc(100% / 3);
		flex: 0 0 calc(100% / 3);
	}

	@media only screen and (${theme.mediaQueries.lg}) {
		width: calc(100% / 6);
		flex: 0 0 calc(100% / 6);
	}
`;

export default QuoteProductContainer;
