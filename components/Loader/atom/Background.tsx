import styled from 'styled-components';

const Background = styled.div`
  position: fixed;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10000;
  top: 0;
  left: 0;
`;

export default Background;
