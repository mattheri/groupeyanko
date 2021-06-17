import { FC } from "react";
import { Container } from "react-bootstrap";
import styles from './container.module.scss';

const MobileNavbarContainer:FC = ({ children }) => {
  
  return (
    <Container fluid className={styles.mobileNavbarContainer}>
      {children}
    </Container>
  );
}

export default MobileNavbarContainer;
