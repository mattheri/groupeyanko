import { FC } from 'react';
import { Button } from 'components/Button/Button';
import DoubleArrowBack from '../atom/DoubleArrowBack';
import styled from 'styled-components';
import { LeftRadius } from '../atom/Radiuses';

interface Props {
  toggle:(n:number) => void;
  active:number;
}

const StyledButton = styled(Button)`
  ${LeftRadius}
`;

const FirstPageButton:FC<Props> = ({ toggle, active }) => {
  const goToFirstPage = () => toggle(0);

  return (
    <StyledButton
      disabled={active === 0}
      onClick={goToFirstPage}
    >
      <DoubleArrowBack />
    </StyledButton>
  )
};

export default FirstPageButton;
