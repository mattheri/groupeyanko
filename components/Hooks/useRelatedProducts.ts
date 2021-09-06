import { Product, RelatedProducts } from "types";
import { useState, useEffect } from "react";
import { ApiResponse } from "services/domain/Api";
import ApiService from "services/ApiService";

const useRelatedProducts = (relatedProducts:RelatedProducts[]):Product[] => {
	const [products, setProducts] = useState<Product[]>([]);

	const getRelatedProduct = async (id:string) => {
		const response:ApiResponse<Product> = await ApiService.get({
			url: `/api/product/${id}`
		});

		return response.data;
	};

	const getRelatedProducts = async (ids:number[]) => {
		const promises = ids.map(async (id:number) => {
			return await getRelatedProduct(id.toString());
		});

		const products = await Promise.all(promises);

		setProducts(products);
	};

	useEffect(
		() => {
			if (!relatedProducts || !relatedProducts.length) return;

			getRelatedProducts(relatedProducts.map(({ id }) => id));
		},
		[relatedProducts]
	);

	return products;
};

export default useRelatedProducts;