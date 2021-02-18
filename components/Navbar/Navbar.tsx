import Link from "next/link";
import React from "react";
import Image from "next/image";
import styles from "./navabr.module.scss";
import { Button } from "../Button/Button";
import { AppContext, AppContextTuple } from "../Context/AppContext";
import { Cart } from "../Cart/Cart";
import { Squash as Hamburger, Squash } from "hamburger-react";
import cn from "classnames";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ModalPopup } from "../ModalPopup/ModalPopup";
import { LoginForm } from "../LoginForm/LoginForm";
import { useSignOut } from "../Hooks/useSignOut";

export function Navbar() {
  const [appState, setAppState]: AppContextTuple = React.useContext(AppContext);
  const [show, setShow] = React.useState(false);

  const text = {
    fr: {
      home: "Accueil",
      catalog: "Catalogue",
      contact: "Nous joindre",
      login: "Connexion",
      locale: "English",
    },
    en: {
      home: "Home",
      catalog: "Catalog",
      contact: "Contact",
      login: "Log In",
      locale: "Français",
    },
  };

  // const handleChangeLocale = () => setAppState(state => Object.assign({}, state, { locale: appState.locale === 'en' ? 'fr' : 'en' }));
  const logout = useSignOut();

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
            <Button href="/" tertiary text={text[appState.locale].catalog} />
            <Cart />
            {appState.connected ? (
              <Button onClick={async () => await logout()} text="Déconnexion" />
            ) : (
              <ModalPopup
                trigger={
                  <Button
                    onClick={() => console.log("")}
                    text={text[appState.locale].login}
                  />
                }
              >
                <LoginForm />
              </ModalPopup>
            )}
          </div>
          <div className={cn(styles.cartMobile, styles.mobile)}>
            <Cart />
          </div>
          <div className={cn(styles.mobileButton, styles.mobile)}>
            <Squash toggled={show} toggle={setShow} color="#111111" />
          </div>
          <div
            className={cn({
              [styles.linksMobile]: true,
              [styles.mobile]: true,
              [styles.show]: show,
            })}
          >
            <Link href="/">
              <a onClick={() => setShow(false)}>
                {text[appState.locale].catalog}
              </a>
            </Link>
            {appState.connected ? (
              <Button
                className={styles.mobileLoginBtn}
                onClick={async () => {
                  await logout();
                  setShow(false);
                }}
                text="Déconnexion"
              />
            ) : (
              <ModalPopup
                trigger={
                  <Button
                    className={styles.mobileLoginBtn}
                    onClick={() => setShow(false)}
                    text={text[appState.locale].login}
                  />
                }
              >
                <LoginForm />
              </ModalPopup>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
