import React from 'react';
import styles from './card.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export type CardProps = {
    src: string,
    description: string,
    url: string
}

/**
 * A card component that uses next Link component for page prefetching. See https://nextjs.org/docs/api-reference/next/link
 * 
 * @param url string. required
 * @param src string. The image source. It is used in a background image.
 * @param description string. Description of the product/category
 */
export function Card({ url, src, description }: CardProps) {
    return (
        <Link href={url}>
            <a className={styles.card}>
                <article className={styles.image} style={{ backgroundImage: `url(${src})` }}></article>
                <div className={styles.description}>
                    <p>{description}</p>
                </div>
            </a>
        </Link>
    );
}