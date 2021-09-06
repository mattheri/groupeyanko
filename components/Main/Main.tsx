import { FC } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledMain = styled(Container)`
  overflow: visible;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
`;

const Main:FC = ({ children }) => {
  
  return(
    <StyledMain as='main' fluid>
      {children}
    </StyledMain>
  );
}

export default Main;
