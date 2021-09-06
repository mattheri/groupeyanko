import styled from "styled-components";
import { CloseSquare } from "@styled-icons/evaicons-solid/CloseSquare";
import theme from "theme/theme";

const Close = styled(CloseSquare)`
	width: 4rem;
	height: 4rem;
	color: ${theme.colors.primary};
	margin-left: auto;
	display: block;
	cursor: pointer;
	transition: color 0.2s ease-in-out;
	&:hover {
		color: ${theme.colors.black};
	}
`;

export default Close;