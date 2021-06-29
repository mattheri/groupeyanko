import SearchController from "components/Search/organism/SearchController";
import { FC } from "react";
import styled from "styled-components";
import theme from "theme/theme";

const Container = styled.div`
	grid-row: 3;
	grid-column: 1 / 4;
	justify-self: end;
	width: 100%;

	@media only screen and (${theme.mediaQueries.lg}) {
		grid-column: 2;
		grid-row: 1;
	}
`;

const Search:FC = () => {
	return(
		<Container>
			<SearchController />
		</Container>
	);
}

export default Search;
