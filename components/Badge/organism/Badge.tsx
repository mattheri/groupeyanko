import { FC } from 'react';
import styles from './badge.module.scss';

interface Props {
  number: number;
}

export const Badge:FC<Props> = ({ number }) => {
  return (
    <article className={styles.badge}>
      {number}
    </article>
  );
}
