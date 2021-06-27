import { Category } from "next-env";

export interface FilteredCategories {
  currentCategoryId:number;
  category:Category;
  subCategories:Category[];
}

function useFilterCategories(categories: Category[]):FilteredCategories[] {
  const subCategories = (id:number) => categories.filter((category) => category.parent === id);

  const sortCategories = ():FilteredCategories[] =>
    categories
      .map((category) => {
        if (!category.parent) {
          return {
            currentCategoryId: category.id,
            category: category,
            subCategories: subCategories(category.id),
          };
        }
      })
      .filter(Boolean);
  return sortCategories();
}

export default useFilterCategories;
