import { EventHandler, FC } from 'react';
import { Button as BootstrapButton, Card } from 'react-bootstrap';
import { Button } from 'components/Button/Button';
import AddToCartIcon from './AddToCartIcon';

interface Props {
  submittedOn:string;
  onAddToCart:() => void;
  canAddToCart:boolean;
  onTrigger:EventHandler<any>;
}

const AccordionTrigger:FC<Props> = ({ submittedOn, onAddToCart, canAddToCart, onTrigger }) => {

  return (
    <Card.Header className='d-flex justify-content-between'>
      <BootstrapButton className='w-100' variant='link' onClick={onTrigger}>
        {`Soumission envoyée le ${submittedOn}`}
      </BootstrapButton>
      <Button className='w-25' onClick={onAddToCart}>
        <AddToCartIcon />
      </Button>
    </Card.Header>
  )
};

export default AccordionTrigger;
