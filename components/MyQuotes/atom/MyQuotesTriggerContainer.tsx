import styled from 'styled-components';
import theme from "theme/theme";

const MyQuotesTriggerContainer = styled.dt`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	width: 100%;
	min-height: 5rem;
	background-color: white;
	border-radius: 0.5rem;
	cursor: pointer;
	border: 0.2rem solid ${theme.colors.primary};

	&:hover {
		background-color: ${theme.colors.primary};
		color: white;
	}
`;

export default MyQuotesTriggerContainer;