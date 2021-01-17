import React from 'react';
import { Product } from '../../next-env';
import { Button } from '../Button/Button';
import { CartContext, CartContextTuple } from '../Context/CartContext';
import styles from './addtocart.module.scss';

type AddToCartProps = {
    product: Product
}

export function AddToCart({ product }: AddToCartProps) {
    const [cart, setCart]: CartContextTuple = React.useContext(CartContext);
    const [number, setNumber] = React.useState(1);

    const handleAdd = (e) => {
        e.preventDefault();
        setNumber(number => number+=1)
    };
    const handleRemove = (e) => {
        e.preventDefault();
        setNumber(number => number-=1)
    };

    return (
        <div className={styles.addTo}>
            <Button className={styles.controls} onClick={handleAdd} text='+' />
            <p>{number}</p>
            <Button disabled={number === 1} className={styles.controls} onClick={handleRemove} text='-' />
            <Button className={styles.addItemBtn} onClick={() => setCart(product, number)} text='Add To Cart' />
        </div>
    );
}