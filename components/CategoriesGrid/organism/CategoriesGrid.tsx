import { FC } from 'react';
import { Category } from 'types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'components/Card/organism/Card';
import usePagination from 'components/Hooks/usePagination';
import BigCardsController from 'components/BigCard/organism/BigCardsController';

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
      <BigCardsController categories={paginatedItems[pagination]} />
      <Pagination />
    </>
  );
};

export default CategoriesGrid;
