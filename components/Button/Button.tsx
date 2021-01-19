import React from 'react';
import Link from "next/link";
import styles from "./button.module.scss";
import cn from "classnames";
import { motion } from 'framer-motion';

export type ButtonProps = {
    href: string,
    text: string,
    primary?: boolean,
    secondary?: boolean,
    tertiary?: boolean,
    onClick?: (e?: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    className?: string,
    disabled?: boolean
} | {
    href?: string,
    text?: string,
    primary?: boolean,
    secondary?: boolean,
    tertiary?: boolean,
    onClick: (e?: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    className?: string,
    disabled?: boolean
}

/**
 * Button component. It is made of of a Link component. See Next.js Link component: https://nextjs.org/docs/api-reference/next/link
 * If there is an onClick function 
 * 
 * @param href string represents the path. Optional only if an onClick props is 
 * provided otherwise it is required see Next.js Routing: https://nextjs.org/docs/api-routes/introduction
 * @param text string the text to show on the button
 * @param primary boolean enables primary styling. This is enabled by default
 * @param secondary boolean enables secondary styling
 * @param tertiary boolean enables tertiary styling
 * @param onClick void function. Optional only if an href is provided otherwise it is required.
 */
export function Button({
    href,
    text,
    primary = true,
    secondary,
    tertiary,
    onClick,
    className,
    disabled,
    children
}: React.PropsWithChildren<ButtonProps>) {

    function onTap() {
        return { scale: [0.6, 1.2, 1]}
    }

    if (onClick) {
        return (
            <motion.button whileTap={{ scale: 0.6 }} transition={{ duration: 0.1 }} disabled={disabled} onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }} className={cn({
                [styles.button]: true,
                [styles.primary]: !primary || !secondary || !tertiary ? true : primary,
                [styles.secondary]: secondary,
                [styles.tertiary]: tertiary,
                [className]: className
            })}>
                {text || children}
            </motion.button>
        );
    }

    return (
        <Link href={href}>
            <motion.a layout whileTap={{ scale: 0.6 }} transition={{ duration: 0.1 }} onClick={onClick} className={cn({
                [styles.button]: true,
                [styles.primary]: !primary || !secondary || !tertiary ? true : primary,
                [styles.secondary]: secondary,
                [styles.tertiary]: tertiary,
                [className]: className
            })}>
                {text}
            </motion.a>
        </Link>
    );
}