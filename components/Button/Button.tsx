import { ButtonHTMLAttributes, FC } from "react";
import Link from "next/link";
import styled from 'styled-components';
import theme from "theme/theme";

const StyledButton = styled.button<{primary:boolean,secondary:boolean,tertiary:boolean,size:'sm'|'lg'}>`
  padding: ${({ size }) => size === 'sm' ? '0.3rem 0.5rem' : '1rem 1.2rem'};
  font-family: ${theme.typography.heading};
  font-size: ${({ size }) => size === 'sm' ? '1.4rem' : '1.5rem'};
  transition: transform 0.3s, background-color 0.2s, color 0.2s;
  width: fit-content;
  max-height: 4rem;
  text-decoration: none;
  border: ${({ secondary, tertiary }) => {
    if (secondary) return `${theme.colors.accent} 2px solid`;
    if (tertiary) return '2px transparent solid';

    return 'none';
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  color: ${({ tertiary }) => tertiary ? theme.colors.dark : 'white'};
  background-color: ${({ secondary, tertiary }) => {
    if (secondary) return 'transparent';
    if (tertiary) return 'transparent';

    return theme.colors.accent;
  }};

  &:hover {
    text-decoration: none;
  }

  &:disabled {
    color: gray;

    &:hover {
      background-color: ${theme.colors.accent};
      color: gray;
    }
  }

  &:hover {
    background-color: ${({ primary, secondary, tertiary }) => {
      if (secondary) return theme.colors.accent;
      if (tertiary) return 'transparent';

      return theme.colors.black;
    }};
    color: ${({ tertiary }) => {
      if (tertiary) return theme.colors.accent;

      return 'white';
    }};
    border: ${({ secondary, tertiary }) => {
      if (secondary || tertiary) return `${theme.colors.accent} 2px solid`;

      return 'none';
    }}
  }

  &:focus {
    border: none;
    outline: none;
  }

  &:active {
    transform: scale(0.9);
  }
`;
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?:string;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  size?: "sm" | "lg";
  href?:string;
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
export const Button:FC<Props> = function ({
  href,
  text,
  primary = true,
  secondary,
  tertiary,
  size = "lg",
  onClick,
  disabled,
  children,
  type = "submit",
}) {
  if (!href) {
    return (
      <StyledButton
        type={type}
        disabled={disabled}
        onClick={onClick}
        primary={primary}
        secondary={secondary}
        tertiary={tertiary}
        size={size}
      >
        {text || children}
      </StyledButton>
    );
  }

  return (
    <Link href={href}>
      <StyledButton
        as='a'
        primary={primary}
        secondary={secondary}
        tertiary={tertiary}
        size={size}
      >
        {text || children}
      </StyledButton>
    </Link>
  );
};
