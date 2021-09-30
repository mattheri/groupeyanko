import styled from "styled-components";

interface Props {
	isDeployed:boolean;
}

const QuoteDrawer = styled.dd<Props>`
	margin: 0;
	height: ${({ isDeployed }) => (isDeployed ? "20rem" : "0")};
	overflow-y: ${({ isDeployed }) => (isDeployed ? "scroll" : "hidden")};
	transition: height 0.35s;
	padding: 0.5rem;

	& > * {
		transition: opacity 0.35s;
		opacity: ${({ isDeployed }) => isDeployed ? 1 : 0};
		visibility: ${({ isDeployed }) => isDeployed ? "visible" : "hidden"};
	}
`;

export default QuoteDrawer;