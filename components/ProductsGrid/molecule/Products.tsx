import Card from "components/Card/organism/Card";
import { FC } from "react";
import { Product } from "types";
import ProductCol from "./ProductCol";

interface Props {
	products:Product[][];
	pageIndex:number;
}

const DEFAULT_PLACEHOLDER_IMAGE = "/uploads/images/placeholder.png";

const Products:FC<Props> = ({ products, pageIndex }) => {
	return(
		<>
			{products[pageIndex].map((product, i) => (
				<ProductCol key={product.id}>
					<Card
						index={i}
						url={`/product/${product.id}`}
						description={product.name}
						src={
							product.images.length > 0
								? product.images[0].src
								: DEFAULT_PLACEHOLDER_IMAGE
						}
						product={product}
						addToCart
					/>
				</ProductCol>
			))}
		</>
	);
};

export default Products;