import { FC } from "react";
import { Button } from 'components/Button/Button';
import LoginFormController from "components/LoginForm/LoginFormController";
import { ModalPopup } from "components/ModalPopup/ModalPopup";
import { Nav } from 'react-bootstrap';

interface Props {
  isAuthenticated:boolean;
  onLogout:() => void;
}

const NavbarAuthenticationSection:FC<Props> = ({ isAuthenticated, onLogout }) => {

  return (
    isAuthenticated ? (
      <>
        <Nav.Link block='xs' as={Button} onClick={onLogout}>Déconnexion</Nav.Link>
        <Nav.Link block='xs' as={Button} href='/me'>Profil</Nav.Link>
      </>
    ) : (
      <ModalPopup trigger={<Nav.Link block='xs' as={Button}>Connexion</Nav.Link>}>
        <LoginFormController />
      </ModalPopup>
    )
  );
}

export default NavbarAuthenticationSection;
