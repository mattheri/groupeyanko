import { Button } from 'components/Button/atom/Button';
import { Cart } from 'components/Cart/organism/Cart';
import { LoginFormController } from 'components/LoginForm/LoginFormController';
import { ModalPopup } from 'components/ModalPopup/ModalPopup';
import { Squash } from 'hamburger-react';
import Link from 'next/link';
import React, { FC } from 'react';
import styles from './navbar.module.scss';
import cn from 'classnames';
import { useAuth } from 'components/Hooks/useAuth';

interface Props {
  show:boolean;
  onShow:() => void;
  onLogout:() => void;
}

const MobileNavbar:FC<Props> = ({ show, onShow, onLogout }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
    <div className={cn(styles.cartMobile, styles.mobile)}>
            <Cart />
          </div>
          <div className={cn(styles.mobileButton, styles.mobile)}>
            <Squash toggled={show} toggle={onShow} color="#111111" />
          </div>
          <div
            className={cn({
              [styles.linksMobile]: true,
              [styles.mobile]: true,
              [styles.show]: show,
            })}
          >
            <Link href="/">
              <a onClick={onShow}>Catalogue</a>
            </Link>
            {isAuthenticated ? (
              <>
                <Button
                  className={styles.mobileLoginBtn}
                  onClick={onLogout}
                  text="Déconnexion"
                />
                <Button
                  className={cn([styles.mobileLoginBtn, 'mt-2'])}
                  href='/me'
                  text='Profil'
                />
              </>
            ) : (
              <ModalPopup
                trigger={
                  <Button
                    className={styles.mobileLoginBtn}
                    onClick={onShow}
                    text="Connexion"
                  />
                }
              >
                <LoginFormController />
              </ModalPopup>
            )}
          </div>
    </>
  );
}

export default MobileNavbar;
