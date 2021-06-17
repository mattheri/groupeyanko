import { FC } from "react";
import styles from './bottom.module.scss';

const MobileNavbarBottom:FC = ({ children }) => {
  
  return(
    <div className={styles.bottom}>
      {children}
    </div>
  );
}

export default MobileNavbarBottom;
