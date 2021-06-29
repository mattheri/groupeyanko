import styled from "styled-components";
import theme from "theme/theme";

const CartContainer = styled.div`
	width: fit-content;
  cursor: pointer;
  position: relative;
  margin: 0;
  padding: 0;
  grid-row: 1;
  justify-self: end;
  
  @media only screen and (${theme.mediaQueries.lg}) {
    grid-column: 3;
  }
`;

export default CartContainer;
