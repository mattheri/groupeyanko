import { FC } from "react";
import Button from 'components/Button/Button'
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
        <Button block='xs' fit='lg' tertiary href='/me'>Profil</Button>
        <Button block='xs' fit='lg' onClick={onLogout}>Déconnexion</Button>
      </>
    ) : (
      <ModalPopup trigger={<Button block='xs' fit='lg'>Connexion</Button>}>
        <LoginFormController />
      </ModalPopup>
    )
  );
}

export default NavbarAuthenticationSection;
