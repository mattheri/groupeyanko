import React from "react";
import PagePagination from "../PagePagination/organism/PagePagination";
import { chunk } from "utils/utils";

function usePagination<T>(itemsToPaginate: T[], itemsPerPage: number) {
  const [pagination, setPagination] = React.useState(0);
  const paginatedItems = chunk(itemsToPaginate, itemsPerPage);

  React.useDebugValue(paginatedItems);

  interface Props {
    fullWidth?:boolean;
    max?:number;
  }

  const onPageChangeRequested = (selected:number) => setPagination(selected);

  const paginationProps = {
    pageCount: paginatedItems.length,
    active: pagination,
    onPageChange: onPageChangeRequested,
  };

  return {
    paginatedItems,
    pagination,
    paginationProps: {
      length: paginatedItems.length,
      active: pagination,
      toggle: onPageChangeRequested,
    },
    Pagination: ({ fullWidth, max }: Props) => (
      <PagePagination fullWidth={fullWidth} max={max} {...paginationProps} />
    ),
  };
}

export default usePagination;
