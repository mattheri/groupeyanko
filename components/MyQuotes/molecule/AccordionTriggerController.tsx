import { FC, useContext } from 'react';
import { AccordionContext, useAccordionToggle } from 'react-bootstrap';
import useFormattedDate from '../hook/useFormattedDate';
import AccordionTrigger from '../atom/AccordionTrigger';

interface Props {
  eventKey:string;
  onAddToCart:() => void;
  submittedOn:number;
  callback?:(eventKey:string) => void;
}

const AccordionTriggerController:FC<Props> = ({ eventKey, onAddToCart, submittedOn, callback }) => {
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
            submittedOn={formattedDate} 
            onTrigger={onTrigger} />;
};

export default AccordionTriggerController;
