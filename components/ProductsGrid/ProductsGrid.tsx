import React, { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Product } from 'types';
import { Card } from '../Card/organism/Card';
import usePagination from '../Hooks/usePagination';

interface Props {
  response:Product[];
}

const ProductsGrid:FC<Props> = ({ response }) => {
  const { paginatedItems, pagination, Pagination } = usePagination(
    response,
    9
  );

  return (
    <>
      <Container>
        <Row>
          {paginatedItems[pagination].map((product, i) => (
            <Col
              key={product.id}
              xs={12}
              md={6}
              lg={4}
              className="d-flex flex-wrap justify-content-center p-0"
            >
              <Card
                index={i}
                url={`/product/${product.id}`}
                description={product.name}
                src={
                  product.images.length > 0
                    ? product.images[0].src
                    : "/uploads/images/placeholder.png"
                }
                addToCart
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
