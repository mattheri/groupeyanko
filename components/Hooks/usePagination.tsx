import React from 'react';
import { paginate } from '../../utils/utils';
import { PagePagination } from '../PagePagination/PagePagination';

/**
 * Hook that paginates over an array of element. It keeps an internal state of the page you're at.
 * Returns a Pagination element. Add {...props} to the element otherwise, you will have an error.
 *
 * @param itemsToPaginate array of items to be paginated
 * @param itemsPerPage number of items per page to show
 * @example
 * const { paginatedItems, pagination, props, Pagination } = usePagination(array, 9);
 * ...
 * return(
 *  <>
 *      {paginatedItems[pagination].map(item => <div>{item}</div>)}
 *      <Pagination {...paginationProps} />
 *  </>
 * );
 */
export function usePagination<T>(itemsToPaginate: T[], itemsPerPage: number) {
    const [pagination, setPagination] = React.useState(0);
    const paginatedItems = paginate(itemsToPaginate, itemsPerPage);

    return {
        paginatedItems,
        pagination,
        paginationProps: {
            length: paginatedItems.length,
            active: pagination,
            toggle: setPagination
        },
        Pagination: PagePagination
    }
}