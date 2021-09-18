import { FC, useContext } from 'react';
import { AccordionContext, useAccordionToggle } from 'react-bootstrap';
import useFormattedDate from '../hook/useFormattedDate';
import AccordionTrigger from '../atom/AccordionTrigger';
import { ClientQuote } from 'services/domain/Quote';

interface Props {
  eventKey:string;
  onAddToCart:(quote:ClientQuote) => void;
  submittedOn:number;
  quote:ClientQuote;
  callback?:(eventKey:string) => void;
}

const AccordionTriggerController:FC<Props> = ({ eventKey, onAddToCart, quote, submittedOn, callback }) => {
  const currentEventKey = useContext(AccordionContext);
  const formattedDate = useFormattedDate(submittedOn);
  const onTrigger = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  )

  const isDeployed = currentEventKey === eventKey;

  return <AccordionTrigger 
            canAddToCart={isDeployed}
            onAddToCart={onAddToCart}
            quote={quote}
            submittedOn={formattedDate} 
            onTrigger={onTrigger} />;
};

export default AccordionTriggerController;
