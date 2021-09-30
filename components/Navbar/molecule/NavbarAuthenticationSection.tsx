import { FC, useState } from "react";
import Button from 'components/Button/Button'
import LoginFormController from "components/LoginForm/LoginFormController";
import Modal from "components/Modal/Modal";

interface Props {
  isAuthenticated:boolean;
  onLogout:() => void;
}

const NavbarAuthenticationSection:FC<Props> = ({ isAuthenticated, onLogout }) => {
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  return (
    isAuthenticated ? (
      <>
        <Button block='xs' fit='lg' tertiary href='/me/informations'>Profil</Button>
        <Button block='xs' fit='lg' onClick={onLogout}>Déconnexion</Button>
      </>
    ) : (
      <>
        <Button onClick={onOpenModal} block='xs' fit='lg'>Connexion</Button>
        <Modal isOpen={openModal} onClose={onCloseModal} withBackdrop>
          <LoginFormController close={onCloseModal} />
        </Modal>
      </>
    )
  );
}

export default NavbarAuthenticationSection;
