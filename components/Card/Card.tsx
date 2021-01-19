import React from 'react';
import styles from './card.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../next-env';
import { AddToCart } from '../AddToCart/AddToCart';
import { motion } from 'framer-motion';

export type CardProps = {
    src: string,
    description: string,
    url: string,
    addToCart?: boolean,
    product?: Product 
} | {
    src: string,
    description: string,
    url: string,
    addToCart: boolean,
    product: Product 
}

/**
 * A card component that uses next Link component for page prefetching. See https://nextjs.org/docs/api-reference/next/link
 * 
 * @param url string. required
 * @param src string. The image source. It is used in a background image.
 * @param description string. Description of the product/category
 * @param addToCart boolean. Enables a "add to cart UI on the card itself"
 */
export function Card({ url, src, description, addToCart, product }: CardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.card}>
            <Link href={url}>
                <a className={styles.innerCard}>
                    <article className={styles.image} style={{ backgroundImage: `url(${src})` }}></article>
                    <div className={styles.description}>
                        <p>{description}</p>
                    </div>
                </a>
            </Link>
            {
            addToCart &&
            <>
                <AddToCart product={product} />
            </>
            }
        </motion.article>
    );
}