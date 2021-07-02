import styled, { css } from "styled-components";
import { FC } from "react";
import { Container } from "react-bootstrap";

interface Props {
	fullWidth:boolean;
}

const FullWidthCSS = css<{fluid:boolean}>`
	justify-content: ${({ fluid }) => fluid ? 'space-between' : 'center'};
`;

const StyledContainer = styled.div<{fluid:boolean}>`
	display: flex;
	padding: 1rem 0;
	margin-top: auto;
	${FullWidthCSS}
`;

const PaginationContainer:FC<Props> = ({ fullWidth, children }) => {
	
	return(
		<StyledContainer as={Container} fluid={fullWidth}>
			{children}
		</StyledContainer>
	);
}

export default PaginationContainer;
