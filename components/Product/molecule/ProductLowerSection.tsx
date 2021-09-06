import { FC } from "react";
import { Col, TabContainer, Nav, TabPane, TabContent } from "react-bootstrap";
import { Product } from "types";
import ProductDescription from "../atom/ProductDescription";
import ProductRelatedSection from "./ProductRelatedSection";
import SectionRow from "./SectionRow";
import styled from "styled-components";
import theme from "theme/theme";

interface Props {
	product:Product;
	relatedProducts:Product[];
}

const Tab = styled.div`
	padding-top: 2rem;
	font-size: 1.6rem;

	a {
		color: ${theme.colors.accent} !important;
	}
`;

const ProductLowerSection:FC<Props> = ({ product, relatedProducts }) => {
	
	return(
		<>
			<SectionRow>
				<Col>
					<TabContainer>
						<Nav variant="tabs">
							<Nav.Item>
								<Nav.Link eventKey="description">Description</Nav.Link>
							</Nav.Item>
						</Nav>
							<Tab as={TabContent} eventKey="description">
								<ProductDescription description={product.description} />
							</Tab>
					</TabContainer>
				</Col>
			</SectionRow>
			<ProductRelatedSection relatedProducts={relatedProducts} />
		</>
	);
};

export default ProductLowerSection;