import { ButtonHTMLAttributes, FC, forwardRef, ForwardedRef } from "react";
import Link from "next/link";
import styled, { css } from 'styled-components';
import theme from "theme/theme";

type Block = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Size = 'sm' | 'lg';

const WidthXs = css`
  @media only screen and (${theme.mediaQueries.xs}) {
    width: 100%;
  }
`;

const WidthSm = css`
  @media only screen and (${theme.mediaQueries.sm}) {
    width: 100%;
  }
`;

const WidthMd = css`
  @media only screen and (${theme.mediaQueries.md}) {
    width: 100%;
  }
`;

const WidthLg = css`
  @media only screen and (${theme.mediaQueries.lg}) {
    width: 100%;
  }
`;

const WidthXl = css`
  @media only screen and (${theme.mediaQueries.xl}) {
    width: 100%;
  }
`;

const WidthXsFit = css`
  @media only screen and (${theme.mediaQueries.xs}) {
    width: fit-content;
  }
`;

const WidthSmFit = css`
  @media only screen and (${theme.mediaQueries.sm}) {
    width: fit-content;
  }
`;

const WidthMdFit = css`
  @media only screen and (${theme.mediaQueries.md}) {
    width: fit-content;
  }
`;

const WidthLgFit = css`
  @media only screen and (${theme.mediaQueries.lg}) {
    width: fit-content;
  }
`;

const WidthXlFit = css`
  @media only screen and (${theme.mediaQueries.xl}) {
    width: fit-content;
  }
`;

const DefaultWidth = css`
  width: fit-content;
`;

const Width = css<{block:Block,fit:Block}>`
  ${DefaultWidth};
  ${({ block, fit }) => {
    if (block === 'xs') return WidthXs;
    if (fit === 'xs') return WidthXsFit;
    if (block === 'sm') return WidthSm;
    if (fit === 'sm') return WidthSmFit;
    if (block === 'md') return WidthMd;
    if (fit === 'md') return WidthMdFit;
    if (block === 'lg') return WidthLg;
    if (fit === 'lg') return WidthLgFit;
    if (block === 'xl') return WidthXl;
    if (fit === 'xl') return WidthXlFit;
  }};
`;

const Padding = css<{size:Size}>`
  padding: ${({ size }) => size === 'sm' ? '0.5rem 0.8rem' : '1rem 1.2rem'};
`;

const FontSize = css<{size:Size}>`
  font-size: ${({ size }) => size === 'sm' ? '1.4rem' : '1.5rem'};
`;

const Border = css<{secondary:boolean,tertiary:boolean}>`
  border: ${({ secondary, tertiary }) => {
    if (secondary) return `${theme.colors.accent} 2px solid`;
    if (tertiary) return '2px transparent solid';

    return 'none';
  }};
`;

const Color = css<{tertiary:boolean}>`
  color: ${({ tertiary }) => tertiary ? theme.colors.dark : 'white'};
`;

const BackgroundColor = css<{secondary:boolean,tertiary:boolean}>`
    background-color: ${({ secondary, tertiary }) => {
    if (secondary) return 'transparent';
    if (tertiary) return 'transparent';

    return theme.colors.accent;
  }};
`;

const HoverBackgroundColor = css<{secondary:boolean,tertiary:boolean}>`
  background-color: ${({ secondary, tertiary }) => {
    if (secondary) return theme.colors.accent;
    if (tertiary) return 'transparent';

    return theme.colors.black;
  }};
`;

const HoverColor = css<{tertiary:boolean}>`
  color: ${({ tertiary }) => {
    if (tertiary) return theme.colors.accent;

    return 'white';
  }};
`;

const HoverBorder = css<{secondary:boolean,tertiary:boolean}>`
  border: ${({ secondary, tertiary }) => {
    if (secondary || tertiary) return `${theme.colors.accent} 2px solid`;

    return 'none';
  }};
`;

const StyledButton = styled.button<{primary:boolean,secondary:boolean,tertiary:boolean,size:Size,block:Block,fit:Block}>`
  ${Padding}
  ${Width}
  ${FontSize}
  ${Border}
  ${Color}
  ${BackgroundColor}
  font-family: ${theme.typography.heading};
  transition: transform 0.3s, background-color 0.2s, color 0.2s, width 0.2s;
  max-height: 4rem;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;

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
    ${HoverBackgroundColor}
    ${HoverColor}
    ${HoverBorder}
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
  size?:Size;
  href?:string;
  block?:Block;
  fit?:Block;
  ref?:ForwardedRef<HTMLButtonElement>
}

const Button:FC<Props> = forwardRef(({
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
  block,
  fit,
  ...rest
}, ref) => {
  if (!href) {
    return (
      <StyledButton
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        primary={primary}
        secondary={secondary}
        tertiary={tertiary}
        size={size}
        block={block}
        fit={fit}
        {...rest}
      >
        {text || children}
      </StyledButton>
    );
  }

  return (
    <Link href={href}>
      <StyledButton
        ref={ref}
        primary={primary}
        secondary={secondary}
        tertiary={tertiary}
        size={size}
        onClick={onClick}
        block={block}
        fit={fit}
        {...rest}
      >
        {text || children}
      </StyledButton>
    </Link>
  );
});

export default Button;
