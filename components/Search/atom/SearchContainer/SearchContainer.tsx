import { forwardRef, ForwardedRef, ReactNode, CSSProperties } from "react";
import { motion } from 'framer-motion';
import styles from './container.module.scss';

interface Props {
  children:ReactNode;
  style?:CSSProperties;
}

const SearchContainer = forwardRef(({ style, children }:Props, ref:ForwardedRef<HTMLDivElement>) => {

  return (
    <motion.div style={style} ref={ref} className={styles.searchContainer}>
      {children}
    </motion.div>
  );
});

export default SearchContainer;
