import styled from "styled-components";
import { FC } from "react";
import { Container } from "react-bootstrap";

const StyledContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 1rem 0;
`;

const PaginationContainer:FC = ({ children }) => {
	
	return(
		<StyledContainer as={Container}>
			{children}
		</StyledContainer>
	);
}

export default PaginationContainer;
