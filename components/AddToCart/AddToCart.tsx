import React from 'react';
import { Product } from '../../next-env';
import { Button } from '../Button/Button';
import { CartContext, CartContextTuple } from '../Context/CartContext';
import styles from './addtocart.module.scss';
import cn from 'classnames';
import Form from 'react-bootstrap/Form';

type AddToCartProps = {
    product: Product,
    className?: string,
    useInput?: boolean,
    replaceAmount?: boolean
}

/**
 * Set of buttons to add an item to the cart. Has a add button, remove button and a add to cart button.
 * Pass only the product to be added should the user press on 'Add to cart'. State is managed internally.
 * 
 * @param product Product type from next.env.d.ts. Required. Used to add to the cart Context
 * @param className String add an optional string to style the component
 * @param useInput Boolean add an input to manage the number of items. The input only accepts numbers and if set to 0, removes the item.
 */
export function AddToCart({ product, className, useInput, replaceAmount }: AddToCartProps) {
    const [cart, setCart, removeFromCart]: CartContextTuple = React.useContext(CartContext);
    const [number, setNumber] = React.useState(1);

    const handleAdd = () => {
        setNumber(number => number+=1)
    };
    const handleRemove = () => {
        setNumber(number => number-=1)
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || e.target.value === 'NaN') {
            setNumber(0);
        }
        if (regex.test(e.target.value)) {
            setNumber(parseInt(e.target.value));
        }
    }
    const manageUseInput = () => {
        if (number <= 0) {
            return removeFromCart((product.id).toString());
        }

        if (replaceAmount) {
            return setCart(product, number);
        }
        setCart(product, number - product.number);
    }

    return (
        <div className={cn({
            [styles.addTo]: styles.addTo,
            [className]: className
        })}>
            <Button disabled={number === 1} className={styles.controls} onClick={handleRemove} text='-' />
            {
                useInput ?
                    <Form.Control onChange={handleChange} className={styles.input} type='text' value={number} /> :
                    <p>{number}</p>
            }
            <Button className={styles.controls} onClick={handleAdd} text='+' />
            <Button className={styles.addItemBtn} onClick={() => useInput ? manageUseInput() : setCart(product, number)}
                text={useInput ? replaceAmount ? 'Ajouter au panier' : 'Mettre à jour' : 'Ajouter au panier'} />
        </div>
    );
}