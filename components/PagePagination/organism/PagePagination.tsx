import React from "react";
import FirstPageButton from "../molecule/FirstPageButton";
import LastPageButton from "../molecule/LastPageButton";
import ForwardButton from "../molecule/ForwardButton";
import BackButton from "../molecule/BackButton";
import Indexes from "../molecule/Indexes";
import usePaginate from "../hook/usePaginate";
import PaginationContainer from "../atom/PaginationContainer";

type Selected = number;

type PaginationProps = {
  pageCount: number;
  active: number;
  onPageChange:(selected:Selected) => void;
  className?: string;
  max?: number;
};

export function PagePagination({
  pageCount,
  active,
  onPageChange,
  className,
  max = 3,
}: PaginationProps) {
  const onPreviousClick = () => onPageChange(active - 1);
  const onNextClick = () => onPageChange(active + 1);
  const scrollToTop = () => document.body.scrollTo(0, 0);

  const decoratedOnPageChange = (item:Selected) => {
    onPageChange(item);
    scrollToTop();
  }

  const indexes = usePaginate(pageCount, active, max);

  return (
    <PaginationContainer>
      <FirstPageButton active={active} toggle={decoratedOnPageChange} />
      <BackButton active={active} toggle={onPreviousClick} />
      <Indexes pages={indexes} onPageChange={decoratedOnPageChange} active={active} />
      <ForwardButton active={active} length={pageCount} toggle={onNextClick} />
      <LastPageButton active={active} length={pageCount} toggle={decoratedOnPageChange} />
    </PaginationContainer>
  );
}
