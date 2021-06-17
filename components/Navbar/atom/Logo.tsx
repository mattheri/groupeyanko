import { FC } from "react";
import styles from './logo.module.scss';

const PROAXION_HOME = 'https://proaxion.ca/en/home/';
const LOGO_PATH = '/uploads/images/logo-PROAXION.png';
const LOGO_DIMENSIONS = {
  width:789,
  height:170,
};
const ALT = 'Proaxion Logo';

const Logo:FC = () => {

  return (
    <a className={styles.logo} href={PROAXION_HOME}>
      <img
        src={LOGO_PATH}
        width={LOGO_DIMENSIONS.width}
        height={LOGO_DIMENSIONS.height}
        alt={ALT}
      />
    </a>
  );
}

export default Logo;
