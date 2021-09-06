import { MotionProps } from "framer-motion";
import { InputHTMLAttributes, FC } from "react";
import styled, { css } from 'styled-components';
import theme from "theme/theme";
import InputFeedback from "../atom/Feedback";
import Label from '../atom/Label';

type Props = InputHTMLAttributes<HTMLInputElement> & Pick<MotionProps, 'animate' | 'initial' | 'exit' | 'transition'> & {
    hasError: boolean;
    error: string;
    touched: boolean;
    label:string;
    value:string;
    as?:any;
  };

const LabelTransform = css`
  & + label {
    transform: translate3d(-1.8rem, -2.5rem, 0) scale3d(0.8, 0.8, 0.8);
  }
`;

const LineTransform = css`
  & ~ span {
    background-color: ${theme.colors.primary};
    transform: scale3d(1,1,1);
  }
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 2rem 0;
`;

const StyledInput = styled.input<{isInvalid:boolean, value:string}>`
  width: 100%;
  background-color: white;
  border: none;
  position: relative;
  border-bottom: 2px solid ${theme.colors.grayNeutral};
  display: block;
  font-size: 1.6rem;
  ${({ value }) => value.length > 0 && LabelTransform}

  &:focus {
    outline: none;

    ${LabelTransform}

    ${LineTransform}
  }
`;

const Line = styled.span`
  position: absolute;
  width: 100%;
  height: 2.2px;
  background-color: transparent;
  bottom: 2rem;
  left: 0;
  transform: scale3d(0,0,0);
  transform-origin: center;
  transition: transform 0.5s;
`;

const Input:FC<Props> = ({ hasError, error, touched, label, value, as, ...rest }) => {
  return (
    <Container>
      <StyledInput
        value={value}
        as={as}
        {...rest}
        isInvalid={hasError}
      />
      <Label htmlFor={rest.id} required={rest.required}>{label}</Label>
      <Line />
      <InputFeedback error={error} touched={touched} />
    </Container>
  );
}

export default Input;
