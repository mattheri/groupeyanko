import { FC } from 'react';
import Button from 'components/Button/Button'
import DoubleArrowForward from '../atom/DoubleArrowForward';
import styled from 'styled-components';
import { RightRadius } from '../atom/Radiuses';

interface Props {
  toggle:() => void;
  active:number;
  length:number
}

const StyledButton = styled(Button)`
  ${RightRadius}
`;

const LastPageButton:FC<Props> = ({ toggle, active, length }) => {
  return (
    <StyledButton
      disabled={active === length - 1}
      onClick={toggle}
      type='button'
    >
      <DoubleArrowForward />
    </StyledButton>
  )
};

export default LastPageButton;
