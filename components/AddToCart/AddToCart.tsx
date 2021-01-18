import React from 'react';
import { Product } from '../../next-env';
import { Button } from '../Button/Button';
import { CartContext, CartContextTuple } from '../Context/CartContext';
import styles from './addtocart.module.scss';

type AddToCartProps = {
    product: Product
}

/**
 * Set of buttons to add an item to the cart. Has a add button, remove button and a add to cart button.
 * Pass only the product to be added should the user press on 'Add to cart'. State is managed internally.
 * 
 * @param product Product type from next.env.d.ts. Required. Used to add to the cart Context
 */
export function AddToCart({ product }: AddToCartProps) {
    const [cart, setCart]: CartContextTuple = React.useContext(CartContext);
    const [number, setNumber] = React.useState(1);

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setNumber(number => number+=1)
    };
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setNumber(number => number-=1)
    };

    return (
        <div className={styles.addTo}>
            <Button disabled={number === 1} className={styles.controls} onClick={handleRemove} text='-' />
            <p>{number}</p>
            <Button className={styles.controls} onClick={handleAdd} text='+' />
            <Button className={styles.addItemBtn} onClick={() => setCart(product, number)} text='Ajouter au panier' />
        </div>
    );
}