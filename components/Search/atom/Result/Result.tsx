import { FC } from "react";
import Link from 'next/link';
import styles from './result.module.scss';
import { useRouter } from 'next/router';
export interface ResultProps {
  src:string;
  alt:string;
  name:string;
  id:string;
  onClick:() => void;
}

const DEFAULT_HREF = '/product/';
const DEFAULT_IMAGE_DIMENSIONS = {
  width: 50,
  height: 50,
};

const Result:FC<ResultProps> = ({ src, alt, name, id, onClick }) => {
  const router = useRouter();
  const closeThenNavigateTo = () => {
    onClick();
    router.push(`${DEFAULT_HREF}${id}`);
  }
  
  return (
    <article onClick={closeThenNavigateTo} className={styles.result}>
      <img src={src} alt={alt} width={DEFAULT_IMAGE_DIMENSIONS.width} height={DEFAULT_IMAGE_DIMENSIONS.height} />
      <span>{name}</span>
    </article>
  );
}

export default Result;
