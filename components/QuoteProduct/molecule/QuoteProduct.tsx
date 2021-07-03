import { FC } from "react";
import QuoteProductContainer from "../atom/QuoteProductContainer";
import { Cart } from "components/Context/CartContext";
import QuoteProductImage from "./QuoteProductImage";
import useSanitizedHTML from "components/Hooks/useSanitizedHTML";

interface Props {
	product:Cart;
}

const DEFAULT_PLACEHOLDER_IMAGE = "/uploads/images/placeholder.png";

const QuoteProduct:FC<Props> = ({ product }) => {
	const name = useSanitizedHTML(product.name);
	const image = product.images[0] ? product.images[0].src : DEFAULT_PLACEHOLDER_IMAGE;

	return(
		<QuoteProductContainer>
			<QuoteProductImage src={image} alt={name} />
		</QuoteProductContainer>
	);
};

export default QuoteProduct;
