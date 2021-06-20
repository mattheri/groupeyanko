import styled from "styled-components";

const BigCardImage = styled.article<{backgroundImage:string}>`
	background-image: url(${({ backgroundImage }) => backgroundImage});
	background-position: center;
	background-size: cover;
	width: 100%;
	height: 100%;
	transition: all 1s;
	position: absolute;
	top: 0;
	left: 0;
	background-repeat: no-repeat;
	z-index: -1;
`;

export default BigCardImage;
