import styled from 'styled-components';
import theme from 'theme/theme';

const CardContainer = styled.article`
	background-color: ${theme.colors.primary};
  min-width: 26rem;
  max-width: 26rem;
  height: 36rem;
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  margin: 1rem 0;
  border-radius: 5px;
  box-shadow: 0 0px 1.3px rgba(0, 0, 0, 0.035), 0 0px 10px rgba(0, 0, 0, 0.07);
	cursor: pointer;
  transition: box-shadow 0.2s linear, transform 0.2s linear;
  transform: translate3d(0, -5px, 0);

  &:hover {
    box-shadow: none;
    transform: translate3d(0, 0, 0);
  }

  > *:hover {
    text-decoration: none;
  }
`;

export default CardContainer;
