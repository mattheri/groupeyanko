import { Squash } from 'hamburger-react';
import React, { FC } from 'react';
import MobileTogglerContainer from '../atom/MobileTogglerContainer';

interface Props {
  show:boolean;
  onShow:() => void;
}

const MobileToggle:FC<Props> = ({ show, onShow }) => {

  return (
    <MobileTogglerContainer>
      <Squash toggled={show} toggle={onShow} color="#111111" />
    </MobileTogglerContainer>
  );
}

export default MobileToggle;
