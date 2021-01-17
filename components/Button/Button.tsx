import React from 'react';
import Link from "next/link";
import styles from "./button.module.scss";
import cn from "classnames";

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
    text: string,
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
    primary,
    secondary,
    tertiary,
    onClick,
    className,
    disabled
}: ButtonProps) {

    if (onClick) {
        return (
            <button disabled={disabled} onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }} className={cn({
                [styles.button]: true,
                [styles.primary]: !primary || !secondary || !tertiary ? true : primary,
                [styles.secondary]: secondary,
                [styles.tertiary]: tertiary,
                [className]: className
            })}>
                {text}
            </button>
        );
    }

    return (
        <Link href={href}>
            <a onClick={onClick} className={cn({
                [styles.button]: true,
                [styles.primary]: !primary || !secondary || !tertiary ? true : primary,
                [styles.secondary]: secondary,
                [styles.tertiary]: tertiary,
                [className]: className
            })}>
                {text}
            </a>
        </Link>
    );
}