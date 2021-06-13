import { Category } from "../../../next-env";

function useFilterCategories(categories: Category[]) {
  const subCategories = (id:number) => categories.filter((category) => category.parent === id);

  const sortCategories = () =>
    categories
      .map((category) => {
        if (!category.parent) {
          return {
            ref: category.id,
            category: category,
            sub: subCategories(category.id),
          };
        }
      })
      .filter(Boolean);
  return sortCategories();
}

export default useFilterCategories;
