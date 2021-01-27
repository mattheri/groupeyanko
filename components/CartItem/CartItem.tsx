import React from 'react';
import { Image, Product } from '../../next-env';
import { Button } from '../Button/Button';
import { CartContext, CartContextTuple } from '../Context/CartContext';
import Link from 'next/link';
import styles from './cartitem.module.scss';
import { AddToCart } from '../AddToCart/AddToCart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { motion } from 'framer-motion';
import cn from 'classnames';

type CartItemProps = {
    id: string,
    image: string,
    name: string,
    number: number,
    product: Product
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
export function CartItem({ id, image, name, number, product }: CartItemProps) {

    const [cartContext, addToCart, removeFromCart]: CartContextTuple = React.useContext(CartContext);

    return (
        <motion.article layout className={cn({
            [styles.cartItem]: true,
            ['container-fluid']: true
        })}>
            <Row>
                <Col>
                    <Link href={`/product/${id}`}>
                        <a>
                            <img src={image} alt={name} width={50} height={50} />
                            <p>{`${number}x ${name}`}</p>
                        </a>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AddToCart className={styles.addTo} useInput product={product} />
                </Col>
                <Col className='align-items-end d-flex'>
                    <Button tertiary className={styles.delete} onClick={() => removeFromCart(id)} text='Supprimer' />
                </Col>
            </Row>
            
        </motion.article>
    );
}