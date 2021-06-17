import { FC } from "react";
import styles from './topright.module.scss';

const MobileNavbarTopRightSection:FC = ({ children }) => {
  
  return (
    <div className={styles.topright}>
      {children}
    </div>
  );
}

export default MobileNavbarTopRightSection;
