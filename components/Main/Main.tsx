import { FC } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledMain = styled(Container)`
  overflow: visible;
  overflow-x: hidden;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Main:FC = ({ children }) => {
  
  return(
    <StyledMain as='main' fluid>
      {children}
    </StyledMain>
  );
}

export default Main;
