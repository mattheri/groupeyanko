import { FC } from 'react';
import { Category } from 'next-env';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'components/Card/organism/Card';
import { usePagination } from 'components/Hooks/usePagination';

interface Props {
  response:Category[];
}

const CategoriesGrid:FC<Props> = ({ response }) => {
  const { paginatedItems, pagination, Pagination } = usePagination(
    response,
    9
  );

  return(
    <>
      <Container>
        <Row>
          {paginatedItems[pagination].map((category) => (
            <Col
              key={category.id}
              xs={12}
              md={6}
              lg={4}
              className="d-flex justify-content-center p-0"
            >
              <Card
                url={`/category/${category.id}`}
                description={
                  category.description ? category.description : category.name
                }
                src={category.image.src}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Pagination />
    </>
  );
};

export default CategoriesGrid;
