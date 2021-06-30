import { ButtonHTMLAttributes, FC } from "react";
import Link from "next/link";
import styled, { css } from 'styled-components';
import theme from "theme/theme";

type Block = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Size = 'sm' | 'lg';

const Width = css<{block:Block}>`
  width: ${({ block }) => block === 'xs' ? '100%' : 'fit-content'};

  @media only screen and (${theme.mediaQueries.sm}) {
    width: ${({ block }) => block === 'sm' ? '100%' : 'fit-content'};
  }
  @media only screen and (${theme.mediaQueries.md}) {
    width: ${({ block }) => block === 'md' ? '100%' : 'fit-content'};
  }
  @media only screen and (${theme.mediaQueries.lg}) {
    width: ${({ block }) => block === 'lg' ? '100%' : 'fit-content'};
  }
  @media only screen and (${theme.mediaQueries.xl}) {
    width: ${({ block }) => block === 'xl' ? '100%' : 'fit-content'};
  }
`;

const Padding = css<{size:Size}>`
  padding: ${({ size }) => size === 'sm' ? '0.3rem 0.5rem' : '1rem 1.2rem'};
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

const StyledButton = styled.button<{primary:boolean,secondary:boolean,tertiary:boolean,size:Size,block:Block}>`
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
}

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
  block,
  ...rest
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
        block={block}
        {...rest}
      >
        {text || children}
      </StyledButton>
    );
  }

  return (
    <Link href={href}>
      <StyledButton
        primary={primary}
        secondary={secondary}
        tertiary={tertiary}
        size={size}
        onClick={onClick}
        block={block}
        {...rest}
      >
        {text || children}
      </StyledButton>
    </Link>
  );
};
