import styled from "styled-components";

const Container = styled.div<{fluid?:boolean}>`
	width: 100%;
	max-width: ${({ fluid }) => (fluid ? "100%" : "992px")};
	margin: 0 auto;
	padding: 0 15px;
`;

export default Container;