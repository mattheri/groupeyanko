import { FC } from "react";
import Link from "next/link";
import { Category } from "../../../next-env";
import FilterUL from "./FilterUL";

interface Props {
  href: string;
  name: string;
  subcategories: Category[] | null;
}

const FilterLink: FC<Props> = ({ href, name, subcategories }) => {
  return (
    <li key={href}>
      <Link href={href}>{name}</Link>
      {subcategories ? <FilterUL category={subcategories} /> : null}
    </li>
  );
};

export default FilterLink;