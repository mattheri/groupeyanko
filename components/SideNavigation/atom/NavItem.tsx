import { Nav } from 'react-bootstrap';
import { FC } from 'react';

interface Props {
  eventKey:string;
}

const NavItem:FC<Props> = ({ eventKey, children }) => {

  return (
    <Nav.Item>
      <Nav.Link eventKey={eventKey}>
        {children}
      </Nav.Link>
    </Nav.Item>
  );
}

export default NavItem;
