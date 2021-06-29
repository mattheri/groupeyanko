import { Tab } from 'react-bootstrap';
import { FC } from 'react';

interface Props {
  eventKey:string;
}

const Pane:FC<Props> = ({ eventKey, children }) => {

  return (
    <Tab.Pane eventKey={eventKey}>
      {children}
    </Tab.Pane>
  )
};

export default Pane;
