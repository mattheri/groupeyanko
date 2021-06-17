import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './overlay.module.scss';

interface Props {
  onClick:() => void;
}

const SearchOverlay:FC<Props> = ({ onClick }) => {
  return <motion.div onClick={onClick} className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}></motion.div>
}

export default SearchOverlay;
