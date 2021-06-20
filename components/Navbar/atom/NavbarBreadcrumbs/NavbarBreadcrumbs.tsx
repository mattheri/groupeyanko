import { FC } from "react";
import styles from './breadcrumbs.module.scss';
import { motion } from "framer-motion";

const NavbarBreadcrumbs:FC = ({ children }) => {
  return (
    <motion.section layoutId='breadcrumbs' className={styles.breadcrumbs}>
      {children}
    </motion.section>
  );
}

export default NavbarBreadcrumbs;
