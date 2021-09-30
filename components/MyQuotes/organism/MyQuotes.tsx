import { useAuth } from 'components/Hooks/useAuth';
import { FC, useEffect, useState } from 'react';
import useQuotes from '../hook/useQuotes';
import ErrorAlert from 'components/ErrorAlert/atom/ErrorAlert';
import { ClientQuote, Quote } from 'services/domain/Quote';
import EmptyQuotes from '../atom/EmptyQuotes';
import useCart from 'components/Hooks/useCart';
import QuoteAccordion from '../molecule/QuoteAccordion';
import QuotesAccordionsContainer from '../atom/QuotesAccordiontsContainer';

const MyQuotes:FC = () => {
  const [userQuotes, setUserQuotes] = useState<Quote[]>([]);
  const [quotesAccordionsStatus, setQuotesAccordionsStatus] = useState<boolean[]>([]);

  const { userId } = useAuth();
  const { quotes, error } = useQuotes(userId);
  const { mergeToCart } = useCart();

  const addQuoteToCart = (quote:ClientQuote) => mergeToCart(quote);

  const onDeployQuoteAccordion = (index:number) => {
    const newStatus = userQuotes.map((_, i) => i === index ? !quotesAccordionsStatus[i] : false);

    setQuotesAccordionsStatus(newStatus);
  }

  useEffect(
    () => {
      if (!quotes.length) return;

      setUserQuotes(quotes);
      setQuotesAccordionsStatus(quotes.map(() => false));
    },
    [quotes]
  )

  if (!userQuotes.length) return <EmptyQuotes />;

  return(
    <QuotesAccordionsContainer>
      <ErrorAlert error={error} />
      {userQuotes.map((quote:Quote, index) => {
        const products = Object.entries(quote.products).map(([_, product]) => (product));

        return (
          <QuoteAccordion
            isDeployed={quotesAccordionsStatus[index]}
            onAddQuoteToCartRequest={() => addQuoteToCart(quote.products)}
            onDeployRequest={() => onDeployQuoteAccordion(index)}
            quoteDate={quote.submittedOn}
            productsInQuote={products}
          />
        )
      })}
    </QuotesAccordionsContainer>
  );
};

export default MyQuotes;
