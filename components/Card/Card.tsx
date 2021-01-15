import React from 'react';
import styles from './card.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export type CardProps = {
    src: string,
    description: string,
    alt: string,
    id: number
}

export function Card({ id, src, description, alt }: CardProps) {
    return (
        <Link href={`/category/${id}`}>
            <a className={styles.card}>
                <Image alt={alt} className={styles.image} src={src} width={100} height={100} layout='responsive' />
                <div className={styles.description}>
                    <p>{description}</p>
                </div>
            </a>
        </Link>
    );
}