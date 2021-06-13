import { FC } from 'react';
import styles from './loading.module.scss';

const LoadingAnimation:FC = () => {

  return (
    <div className={styles.loader} />
  );
};

export default LoadingAnimation;
