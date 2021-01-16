import React from 'react';
import { Image } from '../../next-env';
import { Button } from '../Button/Button';
import { CartContext, CartContextTuple } from '../Context/CartContext';
import styles from './cartitem.module.scss';

type CartItemProps = {
    id: string,
    image: Image,
    name: string,
    number: number
}

/**
 * CartItem component. Shows a minified version of a product. The product can be removed from the cart
 * with this component. It directly removes it from the Cart Context.
 * 
 * @param id number the product id
 * @param image Image type defined in next-env.d.ts. Receives the Image object
 * @param name string. The name of the product
 * @param number number. The number of times this product is shown
 */
export function CartItem({ id, image, name, number }: CartItemProps) {

    const [cartContext, setCartContext]: CartContextTuple = React.useContext(CartContext);

    const handleRemoveItemFromCart = (id: string) => {

    }

    return (
        <article>
            <img src={image.src} alt={image.alt} width={50} height={50} />
            <p>{`${number}x ${name}`}</p>
            <Button onClick={() => handleRemoveItemFromCart(id)} text='Delete' />
        </article>
    );
}