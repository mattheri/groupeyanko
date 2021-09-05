import { FC } from "react";
import { Col } from "react-bootstrap";
import { RelatedProducts } from "types";
import ProductTitle from "../atom/ProductTitle";
import { chunk } from "utils/utils";
import Carousel from "components/Carousel/organism/Carousel";
import ProductCrossSell from "./ProductCrossSell";
import useMediaQuery from "components/Hooks/useMediaQuery";
import SectionRow from "./SectionRow";

interface Props {
	relatedProducts:RelatedProducts[];
}

const ProductRelatedSection:FC<Props> = ({ relatedProducts }) => {
	const context = relatedProducts.find(relatedProduct => relatedProduct.context).context || "Articles similaires";
	const isSm = useMediaQuery("(max-width: 767px)");
	const relatedProductsList = chunk(relatedProducts, isSm ? 1 : 3);

	return(
		<>
			<SectionRow>
				<Col>
					<ProductTitle title={context} />
				</Col>
			</SectionRow>
			<SectionRow>
				<Col>
					<Carousel>
						{relatedProductsList.map((relatedProducts, index) => (
							<ProductCrossSell key={index} relatedProducts={relatedProducts} />
						))}
					</Carousel>
				</Col>
			</SectionRow>
		</>
	);
};

export default ProductRelatedSection;