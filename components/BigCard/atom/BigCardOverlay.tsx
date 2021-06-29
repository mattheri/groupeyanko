import Link from "components/Link/Link";
import { FC } from "react";
import styled from "styled-components";
import theme from "theme/theme";

interface Props {
	id:number;
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	display: grid;
	place-items: center;
	padding: 1rem;

	&::after {
		content: '';
		width: 100%;
		height: 100%;
		background-color: #00000065;
		position: absolute;
		top: 0;
		left: 0;
	}
`;

const Heading = styled.h2`
	color: white;
	font-weight: bold;
	text-align: center;
	z-index: 1;
	font-size: 3rem;
`;

const DEFAULT_HREF = '/category';

const BigCardOverlay:FC<Props> = ({ id, children }) => {
	return (
		<Link href={`${DEFAULT_HREF}/${id}`}>
			<Container>
				<Heading>
					{children}
				</Heading>
			</Container>
		</Link>
	);
}

export default BigCardOverlay;
