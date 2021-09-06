import { Tab, Col } from 'react-bootstrap';
import { FC, Children } from 'react';
import Pane from '../atom/Pane';

const Content:FC = ({ children }) => {

  return (
    <Col md={9}>
      {Children.map(children, (child, index) => (
        <Tab.Content>
          <Pane eventKey={`${index + 1}`}>
            {child}
          </Pane>
        </Tab.Content>
      ))}
    </Col>
  );
}

export default Content;
