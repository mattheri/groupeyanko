import { FC } from 'react';
import { Container } from 'react-bootstrap';
import styles from './main.module.scss';

const Main:FC = ({ children }) => {
  
  return(
    <Container as='main' className={styles.main} fluid>
      {children}
    </Container>
  );
}

export default Main;
