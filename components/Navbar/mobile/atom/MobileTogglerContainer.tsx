import { FC } from "react";
import styles from './toggler.module.scss';

const MobileTogglerContainer:FC = ({ children }) => {
  return(
    <button aria-controls='true' className={styles.toggler}>
      {children}
    </button>
  );
}

export default MobileTogglerContainer;

