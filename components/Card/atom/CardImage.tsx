import styled from 'styled-components';

const CardImage = styled.div<{backgroundImageSource:string}>`
	width: 100%;
	height: 70%;
	background-color: white;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	background-image: url(${({ backgroundImageSource }) => backgroundImageSource});
`;

export default CardImage;
