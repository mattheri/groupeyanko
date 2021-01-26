import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { sanitizeHTML } from '../../utils/utils';
import { Cart } from '../Context/CartContext';
import styles from './quoteproduct.module.scss';

type QuoteProductProps = {
    product: Cart
}

export function QuoteProduct({ product }: QuoteProductProps) {

    return (
        <Col className={styles.quoteProduct} xs={12} md={6} lg={4}>
            <Row className='w-100'>
                <Col xs={6} className={styles.quoteImage} style={{ backgroundImage: `url(${product.image})` }} />
                <Col xs={6}>
                    <p>{product.number}x</p>
                    <p>{sanitizeHTML(product.name)}</p>
                </Col>
            </Row>
        </Col>
    );
}