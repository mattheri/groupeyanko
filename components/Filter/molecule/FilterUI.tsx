import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../filter.module.scss";
import Col from "react-bootstrap/Col";
import { Category } from "next-env";
import FilterUL from "components/Filter/molecule/FilterUL";

interface Categories {
  ref: number;
  category: Category;
  sub: Category[];
}

interface Props {
  categories: Categories[];
}

const FilterUI: FC<Props> = ({ categories }) => {
  return (
    <Col
      key={1}
      as={motion.aside}
      layout
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ marginLeft: "5%", x: -50, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      layoutId={""}
      xs={10}
      md={6}
      lg={2}
      className={styles.filter}
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
