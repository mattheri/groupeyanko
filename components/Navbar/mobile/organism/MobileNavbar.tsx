import React, { FC } from 'react';
import cn from 'classnames';
import MobileNavbarContainer from '../atom/MobileNavbarContainer';
import Logo from 'components/Navbar/atom/Logo/Logo';
import MobileToggle from '../molecule/MobileToggle';
import MobileNavbarTop from '../atom/MobileNavbarTop';
import MobileNavbarBottom from '../atom/MobileNavbarBottom';
import NavbarInteractiveSection from 'components/Navbar/molecule/NavbarInteractiveSection';
import { Cart } from 'components/Cart/organism/Cart';
import MobileNavbarTopRightSection from '../atom/MobileNavbarTopRightSection';
import SearchController from 'components/Search/organism/SearchController';
import { AnimateSharedLayout } from 'framer-motion';

interface Props {
  isAuthenticated:boolean;
  show:boolean;
  onShow:() => void;
  onLogout:() => void;
}

const MobileNavbar:FC<Props> = ({ isAuthenticated, show, onShow, onLogout }) => {
  return (
    <MobileNavbarContainer>
      <MobileNavbarTop>
        <AnimateSharedLayout type='crossfade'>
          <Logo />
          <SearchController style={{ gridRow: 2 }} />
        </AnimateSharedLayout>
        <MobileNavbarTopRightSection>
          <Cart />
          <MobileToggle onShow={onShow} show={show} />
        </MobileNavbarTopRightSection>
      </MobileNavbarTop>
      <MobileNavbarBottom>
        
      </MobileNavbarBottom>
    </MobileNavbarContainer>
  );
}

export default MobileNavbar;
