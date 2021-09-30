import Button from 'components/Button/Button';
import { FC } from 'react';
import AddToCartIcon from '../atom/AddToCartIcon';
import MyQuotesTriggerContainer from '../atom/MyQuotesTriggerContainer';
import QuoteAccordionDate from '../atom/QuoteAccordionDate';

interface Props {
	onDeployRequest:() => void;
	onAddQuoteToCartRequest:() => void;
	quoteDate:string;
}

const QuoteAccordionTrigger:FC<Props> = ({ onDeployRequest, onAddQuoteToCartRequest, quoteDate }) => {
	return(
		<MyQuotesTriggerContainer onClick={onDeployRequest}>
			<QuoteAccordionDate>
				{quoteDate}
			</QuoteAccordionDate>
			<Button secondary onClick={onAddQuoteToCartRequest}>
				<AddToCartIcon />
			</Button>
		</MyQuotesTriggerContainer>
	);
}

export default QuoteAccordionTrigger;