import { FC } from 'react';
import Button from 'components/Button/Button'
import ForwardArrow from '../atom/ForwardArrow';
import styled from 'styled-components';
import { LeftRadius } from '../atom/Radiuses';

interface Props {
  toggle:() => void;
  active:number;
  length:number;
}

const StyledButton = styled(Button)`
  ${LeftRadius}
`;

const ForwardButton:FC<Props> = ({ toggle, active, length }) => {

  return (
    <StyledButton
      disabled={active === length - 1}
      onClick={toggle}
    >
      <ForwardArrow />
    </StyledButton>
  )
};

export default ForwardButton;
