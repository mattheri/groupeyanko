import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import styles from "./navabr.module.scss";
import { Button } from '../Button/Button';
import { AppContext, AppContextTuple } from '../Context/AppContext';
import { Cart } from '../Cart/Cart';
import { Squash as Hamburger, Squash } from 'hamburger-react';
import cn from 'classnames';

export function Navbar() {
    const [appState, setAppState]: AppContextTuple = React.useContext(AppContext);
    const [show, setShow] = React.useState(false);

    const text = {
        fr: {
            home: 'Accueil',
            catalog: 'Catalogue',
            contact: 'Nous joindre',
            login: 'Connexion',
            locale: 'English'
        },
        en: {
            home: 'Home',
            catalog: 'Catalog',
            contact: 'Contact',
            login: 'Log In',
            locale: 'Français'
        }
    }

    const handleChangeLocale = () => setAppState(state => Object.assign({}, state, { locale: appState.locale === 'en' ? 'fr' : 'en' }));

    return (
        <nav className={styles.navbar}>
            <a className={styles.brand} href='https://proaxion.ca/en/home/'>
                <Image
                    src='/uploads/images/logo-PROAXION.png'
                    width={789} height={170}
                    alt='Proaxion Logo'
                    layout='intrinsic' />
            </a>
            <div className={cn(styles.links, styles.desktop)}>
                <Button href="https://proaxion.ca/en/home/" tertiary text={text[appState.locale].home} />
                <Button href="/" tertiary text={text[appState.locale].catalog} />
                <Button href="/contact" tertiary text={text[appState.locale].contact} />
                <Cart />
                <Button href='/' text={text[appState.locale].login} />
            </div>
            <div className={cn(styles.cartMobile, styles.mobile)}>
                <Cart />
            </div>
            <div className={cn(styles.mobileButton, styles.mobile)}>
                <Squash toggled={show} toggle={setShow} color='#ffffff' />
            </div>
            <div className={cn({
                [styles.linksMobile]: true,
                [styles.mobile]: true,
                [styles.show]: show
            })}>
                <a href="https://proaxion.ca/en/home/">{text[appState.locale].home}</a>
                <Link href='/contact'><a>{text[appState.locale].contact}</a></Link>
                <Link href='/'><a>{text[appState.locale].catalog}</a></Link>
                <Button href='/' text={text[appState.locale].login} />
            </div>
        </nav>
    );
}