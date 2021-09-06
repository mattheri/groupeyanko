import { Tab, Row } from 'react-bootstrap';
import { FC } from 'react';
import SideNav from '../molecule/SideNav';
import Content from '../molecule/Content';

export interface SidenavTab {
  tab:string;
  key:number;
}

interface Props {
  tabs:SidenavTab[];
}

const SideNavigation:FC<Props> = ({ tabs, children }) => {

  return (
    <Tab.Container defaultActiveKey='1'>
      <Row>
        <SideNav tabs={tabs} />
        <Content>
          {children}
        </Content>
      </Row>
    </Tab.Container>
  );
}

export default SideNavigation;
