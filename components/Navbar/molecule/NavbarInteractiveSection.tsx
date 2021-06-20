import { Cart } from "components/Cart/organism/Cart";
import { FC } from "react";
import { Button } from 'components/Button/atom/Button';
import NavbarAuthenticationSection from "./NavbarAuthenticationSection";
import InteractiveSectionContainer from "../atom/InteractiveSectionContainer/InteractiveSectionContainer";

interface Props {
  isAuthenticated:boolean;
  onLogout:() => void;
}

const NavbarInteractiveSection:FC<Props> = ({ isAuthenticated, onLogout }) => {

  return (
    <InteractiveSectionContainer>
      <Button href="/" tertiary text="Catalogue" />
      <Cart />
      <NavbarAuthenticationSection isAuthenticated={isAuthenticated} onLogout={onLogout} />
    </InteractiveSectionContainer>
  );
}

export default NavbarInteractiveSection;