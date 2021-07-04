import styled from "styled-components";
import theme from "theme/theme";

const AddToCartContainer = styled.div<{isMouseOver:boolean}>`
	width: 100%;
	height: fit-content;
	display: flex;
	justify-content: center;
	padding: 1rem;
	transition: transform 0.2s, opacity 0.2s;
	transform: ${({ isMouseOver }) => isMouseOver ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30%, 0)'};
	opacity: ${({ isMouseOver }) => isMouseOver ? 1 : 0};
	z-index: 1;

	p {
		color: ${theme.colors.dark}
	}
`;

export default AddToCartContainer;
