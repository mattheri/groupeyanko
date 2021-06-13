import React, { useState } from "react";
import styles from "./navbar.module.scss";
import { Button } from "../Button/atom/Button";
import { Cart } from "../Cart/organism/Cart";
import cn from "classnames";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ModalPopup } from "../ModalPopup/ModalPopup";
import { LoginFormController } from "../LoginForm/LoginFormController";
import MobileNavbar from "./MobileNavbar";
import { useAuth } from "components/Hooks/useAuth";

export function Navbar() {
  const [show, setShow] = useState(false);

  const { isAuthenticated, signOut } = useAuth();

  const handleShow = () => setShow(!show);
  const handleLogout = async () => await signOut();
  const handleLogoutThenClose = async () => {
    await handleLogout();
    handleShow();
  };

  return (
    <Container
      className={styles.navbar}
      as="nav"
      fluid
      style={{ overflow: "visible" }}
    >
      <Row>
        <Col xs={12} className="d-flex align-items-center px-0 z-10">
          <a className={styles.brand} href="https://proaxion.ca/en/home/">
            <img
              src="/uploads/images/logo-PROAXION.png"
              width={789}
              height={170}
              alt="Proaxion Logo"
            />
          </a>
          <div className={cn(styles.links, styles.desktop)}>
            <Button href="/" tertiary text="Catalogue" />
            <Cart />
            {isAuthenticated ? (
              <>
                <Button onClick={handleLogout} text="Déconnexion" />
                <Button href='/me' text='Profil' />
              </>
            ) : (
              <ModalPopup trigger={<Button text={"Connexion"} />}>
                <LoginFormController />
              </ModalPopup>
            )}
          </div>
          <MobileNavbar show={show} onShow={handleShow} onLogout={handleLogoutThenClose} />
        </Col>
      </Row>
    </Container>
  );
}
