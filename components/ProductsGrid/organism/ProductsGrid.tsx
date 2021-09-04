import { FC } from 'react';
import { Product } from 'types';
import usePagination from '../../Hooks/usePagination';
import ProductGridContainer from '../molecule/ProductGridContainer';
import Products from '../molecule/Products';

interface Props {
  response:Product[];
}

const ProductsGrid:FC<Props> = ({ response }) => {
  const { paginatedItems, pagination, Pagination } = usePagination(
    response,
    9
  );

  return (
    <ProductGridContainer pagination={Pagination}>
      <Products products={paginatedItems} pageIndex={pagination} />
    </ProductGridContainer>
  );
};

export default ProductsGrid;
