import { FC } from 'react';
import { Button } from 'components/Button/Button';
import DoubleArrowBack from '../atom/DoubleArrowBack';
import styled from 'styled-components';
import { LeftRadius } from '../atom/Radiuses';

interface Props {
  toggle:() => void;
  active:number;
}

const StyledButton = styled(Button)`
  ${LeftRadius}
`;

const FirstPageButton:FC<Props> = ({ toggle, active }) => {

  return (
    <StyledButton
      disabled={active === 0}
      onClick={toggle}
    >
      <DoubleArrowBack />
    </StyledButton>
  )
};

export default FirstPageButton;
