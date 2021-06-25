import { AxiosResponse } from "axios";
import { Product } from "next-env";
import { useState, useEffect } from "react";
import ApiService from "services/ApiService";

const useSearchResults = (query:string) => {
	const [results, setResults] = useState<Product[]>([]);

	const fetchResults = async (query:string) => {
		const response:AxiosResponse<Product[]> = await ApiService.post({
			url: '/api/search',
			data: {
				query,
			}
		});

		setResults(response.data);
	}

	useEffect(() => {
		if (!query && results.length) return setResults([]);
		if (!query) return;

		fetchResults(query);
	}, [query]);

	return results;
}

export default useSearchResults;
