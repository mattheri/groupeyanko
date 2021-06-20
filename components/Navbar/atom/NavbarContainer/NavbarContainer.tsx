import { FC } from 'react';
import { Container } from 'react-bootstrap';
import styles from './container.module.scss';

const NavbarContainer:FC = ({children}) => {
  return (
    <Container fluid as='nav' className={styles.navbarContainer}>
      {children}
    </Container>
  );
}

export default NavbarContainer;
