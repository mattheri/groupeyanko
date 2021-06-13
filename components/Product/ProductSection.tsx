import { Product } from "../../next-env";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AddToCart } from "../AddToCart/organism/AddToCart";
import styles from "./productsection.module.scss";

type ProductProps = {
  product: Product;
};

export function ProductSection({ product }: ProductProps) {
  return (
    <section className={styles.product}>
      <Row>
        <Col className="py-5" xs={12} md={6}>
          <img
            className={styles.productImage}
            src={
              product.images[0]
                ? product.images[0].src
                : "/uploads/images/placeholder.png"
            }
          />
        </Col>
        <Col className="py-5" xs={12} md={6}>
          <h3>{product.name}</h3>
          <p dangerouslySetInnerHTML={{ __html: product.short_description }} />
          <AddToCart
            useInput
            replaceAmount
            className={styles.addTo}
            product={product}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Description</h3>
          <p dangerouslySetInnerHTML={{ __html: product.description }} />
        </Col>
      </Row>
    </section>
  );
}
