import styled from "styled-components";

const CartContainer = styled.div`
	width: fit-content;
  cursor: pointer;
  position: relative;
  display: grid;
  grid-template-rows: repeat(2, 1rem);
  margin: 0;
  padding: 0;
  grid-column: 2;
  grid-row: 1;
`;

export default CartContainer;
