import { FC } from 'react';
import styles from './accordionProduct.module.scss';
import Link from 'next/link';

interface Props {
  image:string;
  productName:string;
  description:string;
  numberOfItems:number;
  id:number;
}

const AccordionProduct:FC<Props> = ({ image, productName, description, numberOfItems, id }) => {

  return (
    <Link href={`/product/${id}`}>
      <a className={styles.product}>
        <div className={styles.product_image_container}>
          <img className={styles.product_image} src={image} alt={productName} />
        </div>
        <div className={styles.product_description_container}>
          <p className={styles.product_description} dangerouslySetInnerHTML={{ __html: description }} />
          <p>
            {numberOfItems}x
          </p>
        </div>
      </a>
    </Link>
  );
};

export default AccordionProduct;
