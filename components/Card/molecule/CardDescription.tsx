import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
	text-align: center;
	color: white;
	font-weight: 600;
	margin-top: 1rem;
	text-transform: uppercase;
`;

const CardDescription:FC = ({ children }) => {
	
	return (
		<Container>
			<p>{children}</p>
		</Container>
	);
}

export default CardDescription;
