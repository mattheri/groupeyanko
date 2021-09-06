import { FC } from 'react';
import Button from 'components/Button/Button'
import BackArrow from '../atom/BackArrow';
import styled from 'styled-components';
import { RightRadius } from '../atom/Radiuses';

interface Props {
  toggle:() => void;
  active:number;
}

const StyledButton = styled(Button)`
  ${RightRadius}
`;

const BackButton:FC<Props> = ({ toggle, active }) => {

  return (
    <StyledButton
      type='button'
      disabled={active === 0}
      onClick={toggle}
    >
      <BackArrow />
    </StyledButton>
  )
};

export default BackButton;
