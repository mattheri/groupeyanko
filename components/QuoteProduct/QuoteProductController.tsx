import { FC } from 'react';
import usePagination from "components/Hooks/usePagination";
import useCart from "components/Hooks/useCart";
import QuoteProductsContainer from "./atom/QuoteProductsContainer";
import QuoteProduct from './molecule/QuoteProduct';

const QuoteProductsController:FC = () => {
  const { cart } = useCart();
  const { Pagination, paginatedItems, pagination } = usePagination(Object.values(cart), 6);
  return (
    <>
      <QuoteProductsContainer>
        {paginatedItems[pagination]?.map((product) => <QuoteProduct product={product} />)}
      </QuoteProductsContainer>
      <Pagination max={3} />
    </>
  );
}

export default QuoteProductsController;
