import { FC } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

interface Props {
	pagination:(...args:any[]) => JSX.Element;
}

const Row = styled.div`
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  justify-content: center;
`;

const ProductGridContainer:FC<Props> = ({ pagination: Pagination, children }) => {

	return (
		<>
			<Container fluid>
				<Row>
					{children}
				</Row>
				<Pagination />
			</Container>
		</>
	);
};

export default ProductGridContainer;
