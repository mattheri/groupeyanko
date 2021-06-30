import React from "react";
import { PagePagination } from "../PagePagination/organism/PagePagination";
import chunk from "lodash/chunk";

export function usePagination<T>(itemsToPaginate: T[], itemsPerPage: number) {
  const [pagination, setPagination] = React.useState(0);
  const paginatedItems = chunk(itemsToPaginate, itemsPerPage);

  React.useDebugValue(paginatedItems);

  interface Props {
    className?: string;
  }

  const handleSetPagination = (selected:number) => {
    console.log(selected);
    setPagination(selected);
  };

  const paginationProps = {
    pageCount: paginatedItems.length,
    active: pagination,
    onPageChange: handleSetPagination,
  };

  return {
    paginatedItems,
    pagination,
    paginationProps: {
      length: paginatedItems.length,
      active: pagination,
      toggle: handleSetPagination,
    },
    Pagination: ({ className }: Props) => (
      <PagePagination className={className} {...paginationProps} />
    ),
  };
}
