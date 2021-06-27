import { Category } from "next-env";
import { useEffect, useState } from "react";
import ApiService from "services/ApiService";
import { ApiResponse } from "services/domain/Api";
import useFilterCategories from "./useFilteredCategories";

const useCategories = () => {
	const [categories, setCategories] = useState<Category[]>([]);

	const getCategories = async () => {
		const response:ApiResponse<Category[]> = await ApiService.get({
			url: '/api/categories',
		});

		setCategories(response.data);
	}

	useEffect(() => {
		if (!categories.length) getCategories();
	}, []);

	return useFilterCategories(categories);
};

export default useCategories;
