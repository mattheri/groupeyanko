import { FC } from "react";
import styled from "styled-components";

interface Props {
	title:string;
}

const Title = styled.h3`
	text-transform: capitalize;
`;

const ProductTitle:FC<Props> = ({ title }) => {
	return(
		<Title>{title}</Title>
	);
};

export default ProductTitle;