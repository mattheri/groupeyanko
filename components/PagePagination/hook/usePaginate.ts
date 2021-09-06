import { useMemo } from "react";

const usePaginate = (
	pageCount:number,
	active:number,
	max:number,
) => {
	const beforeMargin = active - max;
	const afterMargin = (active + 1) + max;

	const endingIndex = useMemo(() => pageCount, []);
	
	const indexes = useMemo(() => {
		const indexes:number[] = [];

		for (let i = 1; i <= pageCount; i++) { 
			if (i !== active && 
				((i !== 1 && i <= beforeMargin) || (i !== endingIndex && i > afterMargin))
			) continue;
			else indexes.push(i);
		}

		return indexes;
	}, [pageCount, active]);

	const beforeMarginArray = useMemo(() => {
		const indexes:number[] = [];

		for (let i = 1; i <= pageCount; i++) { 
			if (i !== active && ((i !== 1 && i <= beforeMargin))) indexes.push(i);
			else continue;
		}

		return indexes;
	}, [pageCount, active]);

	const afterMarginArray = useMemo(() => {
		const indexes:number[] = [];

		for (let i = 1; i <= pageCount; i++) { 
			if (i !== active && (i !== endingIndex && i > afterMargin)) indexes.push(i);
			else continue;
		}

		return indexes;
	}, [pageCount, active]);

	return { indexes, beforeMarginArray, afterMarginArray };
};

export default usePaginate;
