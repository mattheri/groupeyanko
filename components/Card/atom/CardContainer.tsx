import styled from 'styled-components';
import theme from 'theme/theme';

const CardContainer = styled.article`
	background-color: white;
  width: 100%;
  height: 36rem;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 1rem 0;
  border-radius: 5px;
	cursor: pointer;
  transition: transform 0.2s linear;

  > *:hover {
    text-decoration: none;
  }
`;

export default CardContainer;
