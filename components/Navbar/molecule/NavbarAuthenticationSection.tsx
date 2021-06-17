import { FC } from "react";
import { Button } from 'components/Button/atom/Button';
import { LoginFormController } from "components/LoginForm/LoginFormController";
import { ModalPopup } from "components/ModalPopup/ModalPopup";

interface Props {
  isAuthenticated:boolean;
  onLogout:() => void;
}

const NavbarAuthenticationSection:FC<Props> = ({ isAuthenticated, onLogout }) => {

  return (
    isAuthenticated ? (
      <>
        <Button onClick={onLogout} text="Déconnexion" />
        <Button href='/me' text='Profil' />
      </>
    ) : (
      <ModalPopup trigger={<Button text={"Connexion"} />}>
        <LoginFormController />
      </ModalPopup>
    )
  );
}

export default NavbarAuthenticationSection;
