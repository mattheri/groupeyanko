import { FC } from 'react';
import Link from 'next/link';
import styles from './breadcrumb.module.scss';

interface Props {
  text:string;
  href:string;
}

const Breadcrumb:FC<Props> = ({ text, href }) => {
  return (
    <Link href={href}>
      <a className={styles.breadcrumb}>
        {text}
      </a>
    </Link>
  );
}
