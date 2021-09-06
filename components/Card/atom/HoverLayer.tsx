import styled, { css } from "styled-components";

const Visible = css`
	visibility: visible;
	transform: translate3d(0, 0, 0);
`;

const HoverLayer = styled.div<{isVisible:boolean}>`
	visibility: hidden;
	width: 100%;
	height: auto;
	background: linear-gradient(0deg, rgba(31,40,93,1) 24%, rgba(31,40,93,0.5438550420168067) 100%);
	transform: translate3d(0, 1rem, 0);
	transition: transform 0.35s, opacity 0.35s;
	transform-origin: bottom;
	${({ isVisible }) => isVisible && Visible};
	position: absolute;
	bottom: 0;
`;

export default HoverLayer;
