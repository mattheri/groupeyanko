import styled from "styled-components";

const Container = styled.nav<{isOpen:boolean}>`
	width: min(40rem, 100%);
	overflow-x: hidden;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	background-color: white;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 9998;
	max-height: 100vh;
	transform: translate3d(${({ isOpen }) => isOpen ? '0' : '100%'}, 0, 0);
	transition: transform 0.35s;
	box-shadow: 0 0.2px 0.1px rgba(0, 0, 0, 0.02),
	0 0.4px 0.3px rgba(0, 0, 0, 0.028),
  0 0.7px 0.6px rgba(0, 0, 0, 0.035),
  0 1.1px 1.1px rgba(0, 0, 0, 0.042),
  0 1.9px 2.1px rgba(0, 0, 0, 0.05),
  0 4px 5px rgba(0, 0, 0, 0.07);
`;

export default Container;
