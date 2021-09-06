import { useAuth } from 'components/Hooks/useAuth';
import { FC } from 'react';
import useQuotes from '../hook/useQuotes';
import { Accordion, Card, AccordionCollapse } from 'react-bootstrap';
import ErrorAlert from 'components/ErrorAlert/atom/ErrorAlert';
import AccordionTriggerController from '../molecule/AccordionTriggerController';
import { Product } from 'services/domain/Quote';
import AccordionProduct from '../atom/AccordionProduct';
import EmptyQuotes from '../atom/EmptyQuotes';
import styles from './accordion.module.scss';
import useCart from 'components/Hooks/useCart';

const DEFAULT_PLACEHOLDER_IMAGE = "/uploads/images/placeholder.png";

const MyQuotes:FC = () => {
  const { userId } = useAuth();
  const { quotes, error } = useQuotes(userId);
  const { mergeToCart } = useCart();

  const addQuoteToCart = (quote:{[x:string]:Product}) => mergeToCart(quote);

  return (
    <>
      <ErrorAlert error={error} />
      <Accordion defaultActiveKey='0'>
        {quotes.length ? quotes.map((quote, index) => (
          <Card key={index}>
            <AccordionTriggerController
              eventKey={`${index}`}
              submittedOn={quote.submittedOn}
              onAddToCart={() => addQuoteToCart(quote.products)}
            />
            <AccordionCollapse eventKey={`${index}`} className={styles.collapse}>
              <>
              {Object.entries(quote.products).map(([key, product]) => (
                <AccordionProduct
                  key={key}
                  description={product.description}
                  image={product.images.length ? product.images[0].src : DEFAULT_PLACEHOLDER_IMAGE}
                  productName={product.name}
                  numberOfItems={product.number}
                  id={product.id}
                />
              ))}
              </>
            </AccordionCollapse>
          </Card>
        )) : <EmptyQuotes />}
      </Accordion>
    </>
  );
};

export default MyQuotes;
