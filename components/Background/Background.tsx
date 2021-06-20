import { FC } from "react";
import DeepBlue from "./atom/DeepBlue/DeepBlue";
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  top: 0;
  z-index: -1;
`;

const Background:FC = () => {
  
  return (
    <Container>
      <DeepBlue />
    </Container>
  );
}

export default Background;
