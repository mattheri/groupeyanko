import Button from 'components/Button/Button';
import { FC } from 'react';
import { Product } from 'types';
import AddToCartIcon from '../atom/AddToCartIcon';
import MyQuotesTriggerContainer from '../atom/MyQuotesTriggerContainer';
import QuoteAccordionContainer from '../atom/QuoteAccordionContainer';
import QuoteAccordionDate from '../atom/QuoteAccordionDate';
import QuoteDrawer from '../atom/QuoteDrawer';
import QuoteAccordionTrigger from './QuoteAccordionTrigger';
import useFormattedDate from "../hook/useFormattedDate";
import QuoteProduct from 'components/MyQuotes/molecule/QuoteProduct';
import { Cart } from 'components/Context/CartContext';

interface Props {
	isDeployed:boolean;
	onDeployRequest:() => void;
	onAddQuoteToCartRequest:() => void;
	quoteDate:number;
	productsInQuote:Cart[];
}

const QuoteAccordion:FC<Props> = ({ 
	isDeployed,
	onDeployRequest,
	onAddQuoteToCartRequest,
	quoteDate,
	productsInQuote 
}) => {
	const formattedDate = useFormattedDate(quoteDate);

	return(
		<QuoteAccordionContainer>
			<QuoteAccordionTrigger
				onDeployRequest={onDeployRequest}
				onAddQuoteToCartRequest={onAddQuoteToCartRequest}
				quoteDate={formattedDate}
			/>
			<QuoteDrawer isDeployed={isDeployed}>
				{productsInQuote.map((product, index) => <QuoteProduct key={product.id + index} product={product} />)}
			</QuoteDrawer>
		</QuoteAccordionContainer>
	);
}

export default QuoteAccordion;
