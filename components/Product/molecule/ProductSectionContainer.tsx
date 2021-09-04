import { FC } from "react";
import styled from "styled-components";
import SectionRow from "./SectionRow";

const Section = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const ProductSectionContainer:FC = ({ children }) => {
	return(
		<Section>
			<SectionRow>
				{children}
			</SectionRow>
		</Section>
	);
};

export default ProductSectionContainer;