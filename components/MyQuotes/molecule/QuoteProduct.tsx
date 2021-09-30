import Link from 'components/Link/Link';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'theme/theme';
import Image from "next/image";
import { Cart } from 'components/Context/CartContext';

interface Props {
	product:Cart;
}

const QuoteProductQuantityContainer = styled.div`
	flex: 0 0 auto;
	margin-right: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const QuoteProductImageContainer = styled.div`
	flex: 0 0 auto;
	max-width: 30%;
	height: fit-content;
	border-radius: 0.5rem;
	overflow: hidden;
	margin-right: 1rem;
	margin-top: auto;
	margin-bottom: auto;
`;

const QuoteProductDescriptionContainer = styled.div`
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 70%;
	margin: auto 0;
`;

const QuoteProductContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	padding: 0.5rem;
	border-radius: 0.5rem;

	&:hover {
		background-color: ${theme.colors.primary};

		${QuoteProductImageContainer} {
			background-color: white;
		}

		${QuoteProductDescriptionContainer},
		${QuoteProductQuantityContainer} {
			color: white;
		}
	}

	@media only screen and (${theme.mediaQueries.md}) {
		flex-direction: row;
	}
`;

const DEFAULT_PLACEHOLDER_IMAGE = "/uploads/images/placeholder.png";

const QuoteProduct:FC<Props> = ({ product: { id, name, description, images, number } }) => {
	const href = `/product/${id}`;
	const image = images.length > 0 ? images[0].src : DEFAULT_PLACEHOLDER_IMAGE;

	return(
		<Link href={href}>
			<QuoteProductContainer>
				<QuoteProductImageContainer>
					<Image src={image} width={100} height={100} />
				</QuoteProductImageContainer>
				<QuoteProductDescriptionContainer>
					<h3>{name}</h3><br />
					<p dangerouslySetInnerHTML={{ __html: description }} />
				</QuoteProductDescriptionContainer>
				<QuoteProductQuantityContainer>
					<h3>Quantité: {number}</h3>
				</QuoteProductQuantityContainer>
			</QuoteProductContainer>
		</Link>
	);
}

export default QuoteProduct;