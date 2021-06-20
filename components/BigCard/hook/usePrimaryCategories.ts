import { Category } from "next-env";

const usePrimaryCategories = (categories:Category[]) => {
	return categories.filter((category) => !category._links.up);
}

export default usePrimaryCategories;
