import { FC } from "react";
import styled from "styled-components";

interface Props {
	description:string;
}

const Description = styled.p``;

const ProductDescription:FC<Props> = ({ description }) => {

	return(
		<Description dangerouslySetInnerHTML={{ __html: description }} />
	);
};

export default ProductDescription;