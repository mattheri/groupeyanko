import { FC } from "react";
import styled from "styled-components";

interface Props {
	pagination:(...args:any[]) => JSX.Element;
}

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
	max-width: min(100%, 1400px);
	margin: 0 auto;
	width: 100%;
	flex: 1 0 90%;
`;

const Container = styled.section`
	width: 100%;
	padding-right: 15px;
	padding-left: 15px;
	margin-right: auto;
	margin-left: auto;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

const ProductGridContainer:FC<Props> = ({ pagination: Pagination, children }) => {

	return (
		<>
			<Container>
				<Row>
					{children}
				</Row>
				<Pagination />
			</Container>
		</>
	);
};

export default ProductGridContainer;
