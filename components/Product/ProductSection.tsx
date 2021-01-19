import React from 'react';
import { Product } from '../../next-env';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { sanitizeHTML } from '../../utils/utils';
import { AddToCart } from '../AddToCart/AddToCart';
import styles from './productsection.module.scss';

type ProductProps = {
    product: Product
}

export function ProductSection({ product }: ProductProps) {
    return (
        <section className={styles.product}>
            <Row>
                <Col xs={12} md={8}>
                    <img src={product.images[0] ? product.images[0].src : '/uploads/images/placeholder.png'} />
                </Col>
                <Col xs={12} md={4}>
                    <h3>{product.name}</h3>
                    <p>{sanitizeHTML(product.short_description)}</p>
                    <AddToCart product={product} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Description</h3>
                    <p>{sanitizeHTML(product.description)}</p>
                </Col>
            </Row>
        </section>
    );
}