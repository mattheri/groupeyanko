import React from 'react';
import Link from "next/link";
import styles from "./button.module.scss";
import cn from "classnames";
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export type ButtonProps = {
    href: string,
    text: string,
    primary?: boolean,
    secondary?: boolean,
    tertiary?: boolean,
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
} | {
    href?: string,
    text: string,
    primary?: boolean,
    secondary?: boolean,
    tertiary?: boolean,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Button component. It is made of of a Link component. See Next.js Link component: https://nextjs.org/docs/api-reference/next/link
 * If the button needs to call a function on click, provide a preventDefault as it isn't provided for you.
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
    onClick
}: ButtonProps) {
    const router = useRouter();

    // Fix for storybook. Cannot load router so I need to provide default path instead.
    const path: string = router ? router.pathname : '/';

    return (
        <Link href={onClick ? path : href} shallow={onClick ? true : false}>
            <a onClick={onClick} className={cn({
                [styles.button]: true,
                [styles.primary]: !primary || !secondary || !tertiary ? true : primary,
                [styles.secondary]: secondary,
                [styles.tertiary]: tertiary
            })}>
                {text}
            </a>
        </Link>
    );
}