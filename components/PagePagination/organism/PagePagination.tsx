import { FC, useEffect } from "react";
import Indexes from "../molecule/Indexes";
import usePaginate from "../hook/usePaginate";
import PaginationContainer from "../atom/PaginationContainer";
import BackControls from "../molecule/BackControls";
import NextControls from "../molecule/NextControls";

type Selected = number;

type Props = {
  pageCount: number;
  active: number;
  onPageChange:(selected:Selected) => void;
  fullWidth?:boolean;
  max?: number;
};

const PagePagination:FC<Props> = ({
  pageCount,
  active,
  onPageChange,
  fullWidth = false,
  max = 2,
}) => {
  const onPreviousClick = () => onPageChange(active - 1);
  const onNextClick = () => onPageChange(active + 1);
  const onFirstPageRequested = () => onPageChange(0);
  const onLastPageRequested = () => onPageChange(pageCount - 1);
  const onPageChangeRequested = (page:number) => onPageChange(page);

  const { indexes } = usePaginate(pageCount, active, max);

  useEffect(() => {
    if (pageCount === active) onPageChange(pageCount - 1);
  }, [pageCount]);

  return (
    <PaginationContainer fullWidth={fullWidth}>
      <BackControls onFirstPage={onFirstPageRequested} onPreviousPage={onPreviousClick} active={active} />
      <Indexes pages={indexes} onPageChange={onPageChangeRequested} active={active} />
      <NextControls active={active} length={pageCount} onLastPage={onLastPageRequested} onNextPage={onNextClick} />
    </PaginationContainer>
  );
}

export default PagePagination;
