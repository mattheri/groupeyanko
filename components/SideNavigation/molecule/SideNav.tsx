import { FC } from 'react';
import NavItem from 'components/SideNavigation/atom/NavItem';
import { Col, Nav } from 'react-bootstrap';
import { SidenavTab } from '../organism/SideNavigation';

interface Props {
  tabs:SidenavTab[];
}

const SideNav:FC<Props> = ({ tabs }) => {

  return (
    <Col md={3}>
      <Nav variant='pills' className='flex-column'>
        {tabs.map(({ tab, key }) => (
          <NavItem key={key} eventKey={`${key}`}>
            {tab}
          </NavItem>
        ))}
      </Nav>
    </Col>
  );
};

export default SideNav;
