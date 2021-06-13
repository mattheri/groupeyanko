import { PropsWithChildren } from "react";
import Link from "next/link";
import styles from "./button.module.scss";
import cn from "classnames";
import { motion } from "framer-motion";

export type ButtonProps =
  | {
      href: string;
      text: string;
      primary?: boolean;
      secondary?: boolean;
      tertiary?: boolean;
      size?: "sm" | "lg";
      onClick?: (
        e?:
          | React.MouseEvent<HTMLAnchorElement>
          | React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => void;
      className?: string;
      disabled?: boolean;
      layout?: boolean;
      type?: "reset" | "submit";
    }
  | {
      href?: string;
      text?: string;
      primary?: boolean;
      secondary?: boolean;
      tertiary?: boolean;
      size?: "sm" | "lg";
      onClick?: (
        e?:
          | React.MouseEvent<HTMLAnchorElement>
          | React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => void;
      className?: string;
      disabled?: boolean;
      layout?: boolean;
      type?: "reset" | "submit";
    };

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
export const Button = function ({
  href,
  text,
  primary = true,
  secondary,
  tertiary,
  size = "lg",
  onClick,
  className,
  disabled,
  children,
  layout,
  type = "submit",
}: PropsWithChildren<ButtonProps>) {
  if (!href) {
    return (
      <motion.button
        type={type}
        layout={layout}
        whileTap={{ scale: 0.6 }}
        transition={{
          duration: 0.1,
          layoutX: { duration: 0.3, damping: 1000 },
          layoutY: { duration: 0.3, damping: 1000 },
        }}
        disabled={disabled}
        onClick={(e) => {
          onClick && onClick(e);
        }}
        className={cn({
          [styles.button]: true,
          [styles.primary]:
            !primary || !secondary || !tertiary ? true : primary,
          [styles.secondary]: secondary,
          [styles.tertiary]: tertiary,
          [styles.small]: size === "sm",
          [className]: className,
        })}
      >
        {text || children}
      </motion.button>
    );
  }

  return (
    <Link href={href}>
      <motion.a
        layout={layout}
        whileTap={{ scale: 0.6 }}
        transition={{ duration: 0.1 }}
        onClick={onClick}
        className={cn({
          [styles.button]: true,
          [styles.primary]:
            !primary || !secondary || !tertiary ? true : primary,
          [styles.secondary]: secondary,
          [styles.tertiary]: tertiary,
          [styles.small]: size === "sm",
          [className]: className,
        })}
      >
        {text || children}
      </motion.a>
    </Link>
  );
};
