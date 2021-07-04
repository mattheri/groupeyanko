import React, { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { Product } from 'types';
import Card from 'components/Card/organism/Card';
import usePagination from '../Hooks/usePagination';
import styled from 'styled-components';

interface Props {
  response:Product[];
}

const Row = styled.div`
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  justify-content: center;
`;

const DEFAULT_PLACEHOLDER_IMAGE = "/uploads/images/placeholder.png";

const ProductsGrid:FC<Props> = ({ response }) => {
  const { paginatedItems, pagination, Pagination } = usePagination(
    response,
    9
  );

  return (
    <>
      <Container fluid>
        <Row>
          {paginatedItems[pagination].map((product, i) => (
            <Col
              key={product.id}
              xs={12}
              md={6}
              lg={3}
              className="d-flex flex-wrap justify-content-center p-0"
            >
              <Card
                index={i}
                url={`/product/${product.id}`}
                description={product.name}
                src={
                  product.images.length > 0
                    ? product.images[0].src
                    : DEFAULT_PLACEHOLDER_IMAGE
                }
                product={product}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Pagination />
    </>
  );
};

export default ProductsGrid;
