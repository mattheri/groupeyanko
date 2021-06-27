import { FC } from "react";
import styled from "styled-components";
import Link from "components/Link/Link";

interface Props {
	url:string;
}

const Container = styled.a``;

const Inner = styled.article``;

const CategoryContainer:FC<Props> = ({ url, children }) => {
	
	return(
		<Link href={url}>
			<Container>
				<Inner>
					{children}
				</Inner>
			</Container>
		</Link>
	);
}

export default CategoryContainer;
