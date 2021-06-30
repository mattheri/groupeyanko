import { useMemo } from "react";

const usePaginate = (
	pageCount:number,
	active:number,
	max:number = 3,
) => {
	const indexes:number[] = [];

	for (let i = 1; i <= pageCount; i++) { indexes.push(i) }

	return indexes;
};

export default usePaginate;
