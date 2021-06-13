import { FC } from "react";
import { Category } from "../../../next-env";
import FilterLink from "./FilterLink";

interface Props {
  category: Category | Category[];
  subcategories?: Category[];
}

const FilterUL: FC<Props> = ({ category, subcategories }) => {
  if (category && Array.isArray(category)) {
    return (
      <ul>
        {category.map((cat) => (
          <FilterLink
            key={cat.id}
            href={`/category/${cat.id}`}
            name={cat.name}
            subcategories={null}
          />
        ))}
      </ul>
    );
  } else if (category && !Array.isArray(category)) {
    return (
      <ul>
        <FilterLink
          key={category.id}
          href={`/category/${category.id}`}
          name={category.name}
          subcategories={subcategories.length ? subcategories : null}
        />
      </ul>
    );
  }

  return null;
};

export default FilterUL;
