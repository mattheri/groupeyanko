import Link from 'next/link';
import React from 'react';
import Popup from 'reactjs-popup';
import { CartContext, CartContextTuple } from '../Context/CartContext';
import styles from './cart.module.scss';
import 'reactjs-popup/dist/index.css';
import { CartItem } from '../CartItem/CartItem';

/**
 * Cart component. Receives the cart object from the Cart Context.
 * Uses reactjs-popup to show the cart contents on hover (https://react-popup.elazizi.com/)
 */
export function Cart() {

    const [cart, setCart]: CartContextTuple = React.useContext(CartContext);

    const getNumberOfItems = () => {
        let numberOfItem = Object.keys(cart.cart).length;
        Object.entries(cart.cart).map(([key, value]) => {
            if (value.number > 1) {
                numberOfItem += value.number - 1
            }
        });
        return numberOfItem;
    }

    return (
        <Popup trigger={
            <div className={styles.cart}>
                <Link href='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                </Link>
                {getNumberOfItems() > 0 &&            
                    <article>
                        {getNumberOfItems()}
                    </article>
                }
            </div>
        } position="bottom center" on={['hover', 'focus']}>
            {getNumberOfItems() > 0 ? 
                Object.entries(cart.cart).map(([productId, cart]) =>
                    <CartItem
                        id={productId}
                        name={cart.name}
                        number={cart.number}
                        image={cart.images[0]} />) :
                <div>Il n'y a aucun item dans votre panier pour le moment.</div>
            }
        </Popup>
    );
}