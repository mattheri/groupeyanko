import styled, { css } from "styled-components";

const Required = css`
  &::after {
    content: '*';
		color: red;
		margin-left: 0.5rem;
  }
`;

const Label = styled.label<{required:boolean}>`
  position: absolute;
  top: 2rem;
  left: 1rem;
  transition: transform 0.2s;
  ${({ required }) => required && Required}
`;

export default Label;
