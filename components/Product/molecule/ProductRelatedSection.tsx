import { FC } from "react";
import { Col, Spinner } from "react-bootstrap";
import { RelatedProducts, Product } from "types";
import ProductTitle from "../atom/ProductTitle";
import { chunk } from "utils/utils";
import Carousel from "components/Carousel/organism/Carousel";
import ProductCrossSell from "./ProductCrossSell";
import useMediaQuery from "components/Hooks/useMediaQuery";
import SectionRow from "./SectionRow";
import Loader from "components/Loader/organism/Loader";
import ProductCrossSellSection from "./ProductCrossSellSection";

interface Props {
	relatedProducts:Product[];
}

const ProductRelatedSection:FC<Props> = ({ relatedProducts }) => {
	const context = "Articles similaires";
	const isSm = useMediaQuery("(max-width: 767px)");
	const relatedProductsList = chunk(relatedProducts, isSm ? 1 : 3);

	return relatedProducts.length ? (
		<>
			<SectionRow>
				<Col>
					<ProductTitle title={context} />
				</Col>
			</SectionRow>
			<SectionRow>
				<ProductCrossSellSection relatedProductsList={relatedProductsList} />
			</SectionRow>
		</>
	) : <Spinner animation="border" variant="primary" />;
};

export default ProductRelatedSection;