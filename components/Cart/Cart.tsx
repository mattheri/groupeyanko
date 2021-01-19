import Link from 'next/link';
import React from 'react';
import Popup from 'reactjs-popup';
import { CartContext, CartContextTuple } from '../Context/CartContext';
import styles from './cart.module.scss';
import 'reactjs-popup/dist/index.css';
import { CartItem } from '../CartItem/CartItem';
import { usePagination } from '../Hooks/usePagination';
import { Button } from '../Button/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { motion } from 'framer-motion';

/**
 * Cart component. Receives the cart object from the Cart Context.
 * Uses reactjs-popup to show the cart contents on hover (https://react-popup.elazizi.com/)
 */
export function Cart() {

    const [cart]: CartContextTuple = React.useContext(CartContext);
    const [numberOfItems, setNumberOfItems] = React.useState(0);
    const [itemsToPaginate, setItemsToPaginate] = React.useState(Object.entries(cart.cart).map(([id, product]) => ( { [`${id}`]: product } )));

    const getNumberOfItems = () => {
        let numberOfItem = Object.keys(cart.cart).length;
        Object.entries(cart.cart).map(([key, value]) => {
            if (value.number > 1) {
                numberOfItem += value.number - 1
            }
        });
        return numberOfItem;
    }

    React.useEffect(() => {
        setNumberOfItems(getNumberOfItems());
        setItemsToPaginate(Object.entries(cart.cart).map(([id, product]) => ({ [`${id}`]: product })));
    }, [cart.cart])

    const { paginatedItems, pagination, paginationProps, Pagination } = usePagination(itemsToPaginate, 3);

    return (
        <Popup className={styles.popup} trigger={
            <div className={styles.cart}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                </div>
                {numberOfItems > 0 &&            
                    <motion.article
                        layout
                        animate={{ scale: [1, 0.8, 1.1, 1] }}
                        transition={{ duration: 0.3 }}>
                        {numberOfItems}
                    </motion.article>
                }
            </div>
        }
            position="bottom right"
            on={['click']}
            mouseLeaveDelay={500}>
            {numberOfItems > 0 ? 
                <Container fluid className='px-0'>
                    {paginatedItems[pagination] ? paginatedItems[pagination].map(product => Object.entries(product).map(([productId, cart]) => (
                        <Row>
                            <CartItem
                                product={cart}
                                id={productId}
                                name={cart.name}
                                number={cart.number}
                                image={cart.images[0] ? cart.images[0].src : '/uploads/images/placeholder.png'} />
                        </Row>))
                    ) : paginatedItems[0].map(product => Object.entries(product).map(([productId, cart]) => (
                        <Row>
                            <CartItem
                                product={cart}
                                id={productId}
                                name={cart.name}
                                number={cart.number}
                                image={cart.images[0] ? cart.images[0].src : '/uploads/images/placeholder.png'} />
                        </Row>))
                    )}
                    <Pagination className={styles.pagination} {...paginationProps} />
                    <Row>
                        <Col>
                            <Button className={styles.submit} onClick={() => console.log('soumettre')} text='Voir votre soumission' />
                        </Col>
                    </Row>
                </Container>
                :
                <div>Il n'y a aucun item dans votre panier pour le moment.</div>
            }
        </Popup>
    );
}