import { FC } from "react";
import styles from "../filter.module.scss";
import Col from "react-bootstrap/Col";
import { Category } from "next-env";
import FilterUL from "components/Filter/molecule/FilterUL";
import cn from 'classnames';

interface Categories {
  ref: number;
  category: Category;
  sub: Category[];
}

interface Props {
  categories: Categories[];
  isOpen:boolean;
}

const FilterUI: FC<Props> = ({ categories, isOpen }) => {
  return (
    <Col
      key={1}
      as='aside'
      xs={10}
      md={6}
      lg={2}
      className={cn([styles.filter, { [styles.open]:isOpen }])}
    >
      {categories.map((category) => (
        <FilterUL
          category={category.category}
          subcategories={category.sub}
        />
      ))}
    </Col>
  );
};

export default FilterUI;
