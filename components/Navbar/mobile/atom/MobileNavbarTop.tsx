import { FC } from "react";
import styles from './top.module.scss';

const MobileNavbarTop:FC = ({ children }) => {
  
  return (
    <div className={styles.top}>
      {children}
    </div>
  );
}

export default MobileNavbarTop;

