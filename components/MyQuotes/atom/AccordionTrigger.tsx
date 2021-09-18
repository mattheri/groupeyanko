import { EventHandler, FC } from 'react';
import { Button as BootstrapButton, Card } from 'react-bootstrap';
import Button from 'components/Button/Button'
import AddToCartIcon from './AddToCartIcon';
import { ClientQuote } from 'services/domain/Quote';

interface Props {
  submittedOn:string;
  onAddToCart:(quote:ClientQuote) => void;
  quote:ClientQuote;
  canAddToCart:boolean;
  onTrigger:EventHandler<any>;
}

const AccordionTrigger:FC<Props> = ({ submittedOn, onAddToCart, quote, onTrigger }) => {
  const onRequestAddToCart = () => onAddToCart(quote);

  return (
    <Card.Header className='d-flex justify-content-between'>
      <BootstrapButton className='w-100' variant='link' onClick={onTrigger}>
        {`Soumission envoyée le ${submittedOn}`}
      </BootstrapButton>
      <Button className='w-25' onClick={onRequestAddToCart}>
        <AddToCartIcon />
      </Button>
    </Card.Header>
  )
};

export default AccordionTrigger;
