import styled from 'styled-components';
import theme from 'theme/theme';

const Badge = styled.article`
  background-color: ${theme.colors.accent};
  color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
`;

export default Badge;
