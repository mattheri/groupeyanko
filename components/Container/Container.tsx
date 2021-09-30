import styled from "styled-components";

interface Props {
	fluid?:boolean;
}

const Container = styled.section<Props>`
	max-width: ${({ fluid }) => fluid ? "100%" : "min(100%, 1400px)"};
	margin: 0 auto;
	padding: 0 1.5rem;
	width: 100%;
`;

export default Container;